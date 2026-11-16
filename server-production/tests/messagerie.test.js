// Tests d'intégration : Messagerie et Signalement, 16 nov. 2026.
// Port du module e-System Church (spécification v2) vers une seule
// structure : tables sans church_id, contrôle d'accès applicatif,
// signalement avec preuve figée, file de modération, recours,
// limite de débit, notification sans compte de service FCM.
// Le serveur réel est lancé en processus enfant sur une base
// PostgreSQL de test (ne JAMAIS pointer vers la production).
//
// Lancer :  TEST_DATABASE_URL="postgresql://..." TEST_JWT_SECRET="..." node --test tests/messagerie.test.js
// ou simplement : npm test   (avec .env.test, voir ci-dessous)
import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import pg from 'pg';
import argon2 from 'argon2';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3462;
const BASE = `http://127.0.0.1:${PORT}`;
const DATABASE_URL = process.env.TEST_DATABASE_URL;
const JWT_SECRET = process.env.TEST_JWT_SECRET || 'secret-de-test-32-caracteres-minimum!!';

if (!DATABASE_URL) {
  console.error('TEST_DATABASE_URL manquant : les tests d’intégration sont ignorés.');
  process.exit(0);
}

const MDP = 'MotDePasseTest123';
const SUFFIXE = Date.now().toString(36);

let server;
async function attendreSante(delaiMaxMs = 60000) {
  const debut = Date.now();
  for (;;) {
    try {
      const r = await fetch(`${BASE}/sante`);
      if (r.ok) return;
    } catch (_) {}
    if (Date.now() - debut > delaiMaxMs) throw new Error('Le serveur de test ne démarre pas.');
    await new Promise((r) => setTimeout(r, 500));
  }
}

async function post(chemin, corps, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(jeton ? { authorization: `Bearer ${jeton}` } : {}),
    },
    body: corps === undefined ? undefined : JSON.stringify(corps),
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function get(chemin, jeton) {
  const r = await fetch(`${BASE}${chemin}`, {
    headers: jeton ? { authorization: `Bearer ${jeton}` } : {},
  });
  let data = null;
  try { data = await r.json(); } catch (_) {}
  return { statut: r.status, data };
}

async function connexion(email) {
  const { statut, data } = await post('/auth/connexion', { identifiant: email, mot_de_passe: MDP });
  assert.equal(statut, 200, `connexion de ${email}`);
  return data.access;
}

// Comptes de test, créés directement en base (le fichier ne dépend
// d'aucun compte préexistant). E-mails uniques par exécution.
const comptes = {};
let client;
let etabIspam;
let etabCeleste;

async function creerCompte(clientPg, { email, role, etablissementAdminId, nom, etablissementMembreId }) {
  const hash = await argon2.hash(MDP, { type: argon2.argon2id });
  const u = (
    await clientPg.query(
      `INSERT INTO utilisateurs (email, mot_de_passe_hash, role, etablissement_admin_id) VALUES ($1,$2,$3,$4) RETURNING id`,
      [email, hash, role, etablissementAdminId ?? null],
    )
  ).rows[0];
  let membre = null;
  if (etablissementMembreId !== undefined) {
    membre = (
      await clientPg.query(
        `INSERT INTO membres (utilisateur_id, nom_complet, etablissement_id, fonction) VALUES ($1,$2,$3,'Membre') RETURNING id, matricule`,
        [u.id, nom, etablissementMembreId],
      )
    ).rows[0];
  }
  return { utilisateurId: u.id, membreId: membre?.id ?? null, matricule: membre?.matricule ?? null };
}

test.before(async () => {
  server = fork(path.join(DIR, '..', 'server.js'), {
    env: { ...process.env, PORT: String(PORT), DATABASE_URL, JWT_SECRET, DATABASE_SSL: 'false' },
    silent: true,
  });
  await attendreSante();

  client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  // Établissements semés par schema.sql sur une base neuve.
  etabIspam = (await client.query(`SELECT id FROM etablissements WHERE nom = 'ISPAM'`)).rows[0];
  etabCeleste = (await client.query(`SELECT id FROM etablissements WHERE nom = 'Céleste'`)).rows[0];
  if (!etabIspam) etabIspam = (await client.query(`INSERT INTO etablissements (nom) VALUES ('ISPAM') RETURNING id`)).rows[0];
  if (!etabCeleste) etabCeleste = (await client.query(`INSERT INTO etablissements (nom) VALUES ('Céleste') RETURNING id`)).rows[0];

  comptes.adminG = await creerCompte(client, { email: `ag-msg-${SUFFIXE}@test.ci`, role: 'admin_general', nom: 'Admin General Test', etablissementMembreId: etabIspam.id });
  comptes.adminIspam = await creerCompte(client, { email: `ae-ispam-msg-${SUFFIXE}@test.ci`, role: 'admin_etablissement', etablissementAdminId: etabIspam.id, nom: 'Admin Ispam Test', etablissementMembreId: etabIspam.id });
  comptes.adminCeleste = await creerCompte(client, { email: `ae-celeste-msg-${SUFFIXE}@test.ci`, role: 'admin_etablissement', etablissementAdminId: etabCeleste.id, nom: 'Admin Celeste Test', etablissementMembreId: etabCeleste.id });
  comptes.a = await creerCompte(client, { email: `membre-a-msg-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre A Test', etablissementMembreId: etabIspam.id });
  comptes.b = await creerCompte(client, { email: `membre-b-msg-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre B Test', etablissementMembreId: etabIspam.id });
  comptes.c = await creerCompte(client, { email: `membre-c-msg-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre C Test', etablissementMembreId: etabCeleste.id });
  comptes.d = await creerCompte(client, { email: `membre-d-msg-${SUFFIXE}@test.ci`, role: 'membre', nom: 'Membre D Test', etablissementMembreId: etabIspam.id });

  comptes.jetonAdminG = await connexion(`ag-msg-${SUFFIXE}@test.ci`);
  comptes.jetonAdminIspam = await connexion(`ae-ispam-msg-${SUFFIXE}@test.ci`);
  comptes.jetonAdminCeleste = await connexion(`ae-celeste-msg-${SUFFIXE}@test.ci`);
  comptes.jetonA = await connexion(`membre-a-msg-${SUFFIXE}@test.ci`);
  comptes.jetonB = await connexion(`membre-b-msg-${SUFFIXE}@test.ci`);
  comptes.jetonC = await connexion(`membre-c-msg-${SUFFIXE}@test.ci`);
  comptes.jetonD = await connexion(`membre-d-msg-${SUFFIXE}@test.ci`);
});

test.after(async () => {
  if (client) await client.end().catch(() => {});
  if (server) server.kill('SIGTERM');
});

let convAB;
let msgB;
let signalementR1;
let actionR1;

async function creerConversation(jeton, corps) {
  const { statut, data } = await post('/messagerie/conversations', corps, jeton);
  assert.equal(statut, 201, `création de conversation ${JSON.stringify(corps)} : ${JSON.stringify(data)}`);
  return data;
}

// ── Tables ───────────────────────────────────────────────────
test('tables : les 9 tables de messagerie existent, avec la colonne de suspension', async () => {
  const tables = (
    await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
        AND table_name IN ('conversations','conversation_participants','messages','message_attachments','reports','moderation_actions','appeals','blocks','minor_flags')`,
    )
  ).rows.map((r) => r.table_name);
  assert.equal(tables.length, 9, `tables manquantes : ${tables.join(',')}`);
  const colonne = (
    await client.query(
      `SELECT 1 FROM information_schema.columns WHERE table_name = 'membres' AND column_name = 'messagerie_suspendu_jusquau'`,
    )
  ).rows;
  assert.equal(colonne.length, 1, 'colonne membres.messagerie_suspendu_jusquau');
});

// ── Création et lecture en tant que membre ────────────────────
test('membre : créer une conversation directe, envoyer et lire un message', async () => {
  convAB = await creerConversation(comptes.jetonA, { type: 'directe', participant_member_ids: [comptes.b.membreId] });
  assert.ok(convAB.id, 'conversation créée');
  const lecture = await get(`/messagerie/conversations/${convAB.id}`, comptes.jetonB);
  assert.equal(lecture.statut, 200, 'le second participant lit la conversation');
  assert.equal(lecture.data.participants.length, 2, 'deux participants');
  const envoi = await post(`/messagerie/conversations/${convAB.id}/messages`, { content: 'Bonjour, premier message de test.' }, comptes.jetonB);
  assert.equal(envoi.statut, 201, `envoi du message : ${JSON.stringify(envoi.data)}`);
  msgB = envoi.data;
  const liste = await get('/messagerie/conversations', comptes.jetonA);
  assert.equal(liste.statut, 200);
  assert.ok(liste.data.some((c) => c.id === convAB.id), 'la conversation apparaît dans la liste du membre');
  const messages = await get(`/messagerie/conversations/${convAB.id}/messages`, comptes.jetonA);
  assert.equal(messages.statut, 200);
  assert.equal(messages.data.length, 1, 'un message lu');
  assert.equal(messages.data[0].content, 'Bonjour, premier message de test.');
});

// ── Notification sans compte de service FCM ──────────────────
test('notification : la cloche prévient le destinataire sans FCM configuré', async () => {
  // Aucune variable FIREBASE_SERVICE_ACCOUNT_JSON pour ce serveur :
  // l'envoi du message ci-dessus a réussi quand même (201), et la
  // cloche interne porte la notification.
  const cloche = await get('/notifications', comptes.jetonA);
  assert.equal(cloche.statut, 200);
  assert.ok(
    cloche.data.notifications.some((n) => n.type === 'nouveau_message' && n.lien_id === convAB.id),
    'notification nouveau_message dans la cloche du destinataire',
  );
});

// ── Isolation ────────────────────────────────────────────────
test('isolation : non participant et admin_general ne voient pas le contenu', async () => {
  const pourC = await get(`/messagerie/conversations/${convAB.id}`, comptes.jetonC);
  assert.equal(pourC.statut, 404, 'membre non participant : 404, sans révéler l’existence');
  const messagesC = await get(`/messagerie/conversations/${convAB.id}/messages`, comptes.jetonC);
  assert.equal(messagesC.statut, 404, 'messages pour un non participant : 404');
  const listeC = await get('/messagerie/conversations', comptes.jetonC);
  assert.ok(!listeC.data.some((c) => c.id === convAB.id), 'la conversation n’apparaît pas dans la liste du non participant');
  const envoiC = await post(`/messagerie/conversations/${convAB.id}/messages`, { content: 'Intrus.' }, comptes.jetonC);
  assert.equal(envoiC.statut, 404, 'envoi par un non participant : 404');
  const pourAdminG = await get(`/messagerie/conversations/${convAB.id}`, comptes.jetonAdminG);
  assert.equal(pourAdminG.statut, 404, 'admin_general non participant : 404, jamais d’accès au contenu');
  const messagesAdminG = await get(`/messagerie/conversations/${convAB.id}/messages`, comptes.jetonAdminG);
  assert.equal(messagesAdminG.statut, 404, 'messages pour l’admin_general non participant : 404');
  const sansJeton = await get(`/messagerie/conversations/${convAB.id}`);
  assert.equal(sansJeton.statut, 401, 'sans jeton : 401');
});

// ── Règles de création ───────────────────────────────────────
test('règles : groupe de structure et pastorale', async () => {
  const groupeMembre = await post('/messagerie/conversations', { type: 'groupe_structure', title: 'Annonces', participant_member_ids: [comptes.b.membreId] }, comptes.jetonA);
  assert.equal(groupeMembre.statut, 403, 'un membre ne crée pas de groupe de structure');
  const groupe = await creerConversation(comptes.jetonAdminG, { type: 'groupe_structure', title: 'Annonces', participant_member_ids: [comptes.a.membreId, comptes.b.membreId], replies_disabled: true });
  assert.equal(groupe.type, 'groupe_structure');
  const reponse = await post(`/messagerie/conversations/${groupe.id}/messages`, { content: 'Réponse interdite.' }, comptes.jetonA);
  assert.equal(reponse.statut, 403, 'réponses désactivées dans le groupe d’annonces');
  const pastoraleKo = await post('/messagerie/conversations', { type: 'pastorale', participant_member_ids: [comptes.b.membreId] }, comptes.jetonA);
  assert.equal(pastoraleKo.statut, 400, 'pastorale sans administrateur général : 400');
  const pastorale = await creerConversation(comptes.jetonA, { type: 'pastorale', participant_member_ids: [comptes.adminG.membreId] });
  assert.equal(pastorale.type, 'pastorale');
  const groupeEtabKo = await post('/messagerie/conversations', { type: 'groupe_etablissement', participant_member_ids: [comptes.c.membreId] }, comptes.jetonA);
  assert.equal(groupeEtabKo.statut, 400, 'groupe d’établissement mélangeant deux établissements : 400');
});

// ── Signalement avec preuve figée ────────────────────────────
test('signalement : preuve figée et empreinte vérifiable', async () => {
  const tropLong = await post('/messagerie/signalements', { target_type: 'message', target_id: msgB.id, reason: 'harassment', description: 'x'.repeat(501) }, comptes.jetonA);
  assert.equal(tropLong.statut, 400, 'description de plus de 500 caractères : 400');
  const { statut, data } = await post('/messagerie/signalements', { target_type: 'message', target_id: msgB.id, reason: 'harassment', description: 'Message agressif.' }, comptes.jetonA);
  assert.equal(statut, 201, `signalement créé : ${JSON.stringify(data)}`);
  signalementR1 = data;
  assert.equal(data.routed_to, 'local', 'routage local par défaut');
  const enBase = (await client.query(`SELECT evidence_snapshot, evidence_hash FROM reports WHERE id = $1`, [data.id])).rows[0];
  assert.equal(enBase.evidence_snapshot.message.content, 'Bonjour, premier message de test.', 'le contenu est figé dans le cliché');
  // L'empreinte est calculée sur la forme canonique du cliché
  // (clés triées), la même que le serveur : elle se vérifie donc
  // après le passage par jsonb.
  const canonique = (v) => {
    if (Array.isArray(v)) return `[${v.map(canonique).join(',')}]`;
    if (v && typeof v === 'object') return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${canonique(v[k])}`).join(',')}}`;
    return JSON.stringify(v) ?? 'null';
  };
  const recalculee = crypto.createHash('sha256').update(canonique(enBase.evidence_snapshot)).digest('hex');
  assert.equal(enBase.evidence_hash, recalculee, 'l’empreinte correspond au cliché');
  const signale = (await client.query(`SELECT is_reported FROM messages WHERE id = $1`, [msgB.id])).rows[0];
  assert.equal(signale.is_reported, true, 'le message est marqué signalé');
  const journal = (await client.query(`SELECT COUNT(*)::int AS n FROM journal_audit WHERE action = 'signalement.cree' AND entite_id = $1`, [data.id])).rows[0].n;
  assert.equal(journal, 1, 'le signalement est journalisé');
});

// ── File de modération ───────────────────────────────────────
test('modération : file visible par l’admin général et l’admin de l’établissement, pas par les membres', async () => {
  const fileAdminG = await get('/messagerie/moderation', comptes.jetonAdminG);
  assert.equal(fileAdminG.statut, 200);
  const vu = fileAdminG.data.find((r) => r.id === signalementR1.id);
  assert.ok(vu, 'l’admin général voit le signalement');
  assert.equal(vu.evidence_snapshot.message.content, 'Bonjour, premier message de test.', 'la file renvoie le cliché figé');
  const fileIspam = await get('/messagerie/moderation', comptes.jetonAdminIspam);
  assert.ok(fileIspam.data.some((r) => r.id === signalementR1.id), 'l’admin de l’établissement voit sa file locale');
  const fileCeleste = await get('/messagerie/moderation', comptes.jetonAdminCeleste);
  assert.ok(!fileCeleste.data.some((r) => r.id === signalementR1.id), 'l’admin d’un autre établissement ne voit pas le signalement');
  const fileMembre = await get('/messagerie/moderation', comptes.jetonA);
  assert.equal(fileMembre.statut, 403, 'un membre n’accède pas à la file de modération');
});

// ── Circuit protection de l'enfance et escalade ─────────────
test('routage : sécurité d’un enfant hors file ordinaire, escalade vers le Bureau national', async () => {
  const enfant = await post('/messagerie/signalements', { target_type: 'message', target_id: msgB.id, reason: 'child_safety', description: 'Inquiétude pour un enfant.' }, comptes.jetonA);
  assert.equal(enfant.statut, 201);
  assert.equal(enfant.data.routed_to, 'child_safety_referent', 'la sécurité d’un enfant va au référent');
  const fileAdminG = await get('/messagerie/moderation', comptes.jetonAdminG);
  assert.ok(!fileAdminG.data.some((r) => r.id === enfant.data.id), 'le signalement enfant n’apparaît jamais dans la file ordinaire');
  const fileIspam = await get('/messagerie/moderation', comptes.jetonAdminIspam);
  assert.ok(!fileIspam.data.some((r) => r.id === enfant.data.id), 'le signalement enfant n’apparaît pas non plus dans la file locale');
  const escalade = await post('/messagerie/signalements', { target_type: 'message', target_id: msgB.id, reason: 'spam', escalader: true }, comptes.jetonA);
  assert.equal(escalade.statut, 201);
  assert.equal(escalade.data.routed_to, 'national', 'escalade vers le Bureau national');
  const fileIspam2 = await get('/messagerie/moderation', comptes.jetonAdminIspam);
  assert.ok(!fileIspam2.data.some((r) => r.id === escalade.data.id), 'un signalement escaladé quitte la file locale');
  const fileAdminG2 = await get('/messagerie/moderation', comptes.jetonAdminG);
  assert.ok(fileAdminG2.data.some((r) => r.id === escalade.data.id), 'l’admin général voit le signalement escaladé');
});

// ── Conflit d'intérêts ──────────────────────────────────────
test('modération : aucune sanction par la personne qui a signalé', async () => {
  const convAdmin = await creerConversation(comptes.jetonAdminIspam, { type: 'directe', participant_member_ids: [comptes.a.membreId] });
  const msgA = await post(`/messagerie/conversations/${convAdmin.id}/messages`, { content: 'Message à signaler par l’admin.' }, comptes.jetonA);
  assert.equal(msgA.statut, 201);
  const signalement = await post('/messagerie/signalements', { target_type: 'message', target_id: msgA.data.id, reason: 'spam' }, comptes.jetonAdminIspam);
  assert.equal(signalement.statut, 201);
  const tentative = await post(`/messagerie/moderation/${signalement.data.id}/action`, { action: 'avertir', note: 'Je me sanctionne moi-même.' }, comptes.jetonAdminIspam);
  assert.equal(tentative.statut, 409, 'le rapporteur ne peut pas décider sur son propre signalement');
  const decision = await post(`/messagerie/moderation/${signalement.data.id}/action`, { action: 'avertir', note: 'Avertissement décidé par l’administrateur général.' }, comptes.jetonAdminG);
  assert.equal(decision.statut, 201, 'une autre personne peut décider');
  const sansNote = await post(`/messagerie/moderation/${signalementR1.id}/action`, { action: 'rejeter', note: '' }, comptes.jetonAdminIspam);
  assert.equal(sansNote.statut, 400, 'une décision sans note motivée est refusée');
});

// ── Décision locale et recours ───────────────────────────────
test('modération et recours : décision locale, recours par la personne sanctionnée seulement', async () => {
  const decision = await post(`/messagerie/moderation/${signalementR1.id}/action`, { action: 'avertir', note: 'Avertissement pour message agressif.' }, comptes.jetonAdminIspam);
  assert.equal(decision.statut, 201, `décision locale : ${JSON.stringify(decision.data)}`);
  actionR1 = decision.data;
  const rapport = (await client.query(`SELECT status FROM reports WHERE id = $1`, [signalementR1.id])).rows[0];
  assert.equal(rapport.status, 'resolved', 'le signalement est clos après décision');
  const journal = (await client.query(`SELECT COUNT(*)::int AS n FROM journal_audit WHERE action = 'moderation.action' AND entite_id = $1`, [signalementR1.id])).rows[0].n;
  assert.equal(journal, 1, 'la décision est journalisée');

  const recoursA = await post('/messagerie/recours', { report_id: signalementR1.id, moderation_action_id: actionR1.id, reason: 'Je conteste.' }, comptes.jetonA);
  assert.equal(recoursA.statut, 403, 'le rapporteur n’est pas la personne sanctionnée');
  const recours = await post('/messagerie/recours', { report_id: signalementR1.id, moderation_action_id: actionR1.id, reason: 'Je n’ai rien fait d’agressif.' }, comptes.jetonB);
  assert.equal(recours.statut, 201, `recours déposé : ${JSON.stringify(recours.data)}`);
  assert.ok(recours.data.repondre_avant, 'délai de réponse de 30 jours enregistré');
  const doublon = await post('/messagerie/recours', { report_id: signalementR1.id, moderation_action_id: actionR1.id, reason: 'Encore.' }, comptes.jetonB);
  assert.equal(doublon.statut, 409, 'un seul recours en cours par décision');
  const rapportAppeal = (await client.query(`SELECT status FROM reports WHERE id = $1`, [signalementR1.id])).rows[0];
  assert.equal(rapportAppeal.status, 'appealed', 'le signalement passe en recours');
  const journalRecours = (await client.query(`SELECT COUNT(*)::int AS n FROM journal_audit WHERE action = 'recours.cree'`)).rows[0].n;
  assert.equal(journalRecours, 1, 'le recours est journalisé');

  // Délai de 15 jours dépassé : la décision devient incontestable.
  await client.query(`UPDATE moderation_actions SET created_at = NOW() - interval '16 days' WHERE id = $1`, [actionR1.id]);
  const tardif = await post('/messagerie/recours', { report_id: signalementR1.id, moderation_action_id: actionR1.id, reason: 'Trop tard.' }, comptes.jetonB);
  assert.equal(tardif.statut, 422, 'recours après 15 jours : 422');
});

// ── Suspension ───────────────────────────────────────────────
test('suspension : le membre suspendu ne peut plus envoyer de message', async () => {
  const msgB2 = await post(`/messagerie/conversations/${convAB.id}/messages`, { content: 'Second message à signaler.' }, comptes.jetonB);
  assert.equal(msgB2.statut, 201);
  const signalement = await post('/messagerie/signalements', { target_type: 'message', target_id: msgB2.data.id, reason: 'threat' }, comptes.jetonA);
  assert.equal(signalement.statut, 201);
  const suspension = await post(`/messagerie/moderation/${signalement.data.id}/action`, { action: 'suspendre', note: 'Suspension d’une heure pour menace.', duree_heures: 1 }, comptes.jetonAdminG);
  assert.equal(suspension.statut, 201, `suspension décidée : ${JSON.stringify(suspension.data)}`);
  const membreB = (await client.query(`SELECT messagerie_suspendu_jusquau FROM membres WHERE id = $1`, [comptes.b.membreId])).rows[0];
  assert.ok(membreB.messagerie_suspendu_jusquau, 'la suspension est enregistrée sur le membre');
  assert.ok(new Date(membreB.messagerie_suspendu_jusquau) > new Date(), 'la suspension court encore');
  const envoi = await post(`/messagerie/conversations/${convAB.id}/messages`, { content: 'Je suis suspendu.' }, comptes.jetonB);
  assert.equal(envoi.statut, 403, 'le membre suspendu ne peut pas envoyer de message');
});

// ── Annuaire, mes signalements et mes sanctions ─────────────
test('annuaire et mes données : membres sans coordonnées, mes signalements, mes sanctions', async () => {
  const membres = await get('/messagerie/membres', comptes.jetonA);
  assert.equal(membres.statut, 200, 'annuaire accessible à un membre');
  const membreA = membres.data.find((m) => m.id === comptes.a.membreId);
  assert.ok(membreA, 'le membre A figure dans l’annuaire');
  assert.equal(membreA.nom_complet, 'Membre A Test');
  assert.equal(membreA.etablissement, 'ISPAM');
  assert.ok(membreA.matricule, 'matricule présent');
  assert.ok(!('email' in membreA) && !('telephone' in membreA), 'aucune coordonnée de contact dans l’annuaire');

  const mesSignalements = await get('/messagerie/signalements', comptes.jetonA);
  assert.equal(mesSignalements.statut, 200);
  assert.ok(mesSignalements.data.some((r) => r.id === signalementR1.id), 'le rapporteur voit son signalement');
  const signalementsC = await get('/messagerie/signalements', comptes.jetonC);
  assert.ok(!signalementsC.data.some((r) => r.id === signalementR1.id), 'un autre membre ne voit pas le signalement d’autrui');

  const sanctionsB = await get('/messagerie/mes-sanctions', comptes.jetonB);
  assert.equal(sanctionsB.statut, 200);
  const sanctionR1 = sanctionsB.data.find((s) => s.report_id === signalementR1.id);
  assert.ok(sanctionR1, 'la personne sanctionnée voit sa sanction');
  assert.equal(sanctionR1.moderation_action_id, actionR1.id, 'action d’origine renvoyée pour le recours');
  assert.equal(sanctionR1.action, 'avertir');
  const sanctionsA = await get('/messagerie/mes-sanctions', comptes.jetonA);
  assert.ok(!sanctionsA.data.some((s) => s.report_id === signalementR1.id), 'le rapporteur ne voit pas la sanction d’un tiers comme sienne');
  const sanctionsC = await get('/messagerie/mes-sanctions', comptes.jetonC);
  assert.equal(sanctionsC.data.length, 0, 'un membre jamais sanctionné n’a aucune sanction');
});

// ── Nom de l'expéditeur dans les messages ───────────────────
test('messages : le nom de l’expéditeur est renvoyé (sender_nom)', async () => {
  const messages = await get(`/messagerie/conversations/${convAB.id}/messages`, comptes.jetonA);
  assert.equal(messages.statut, 200);
  assert.equal(messages.data[0].sender_nom, 'Membre B Test', 'le nom de l’expéditeur est lisible par l’application');
});

// ── Transfert en conflit d'intérêts ─────────────────────────
test('transfert : dossier remis en file par un modérateur, jamais par un membre', async () => {
  // Conversation A-D : B est suspendu par le test précédent (1 h),
  // il ne peut plus envoyer de message.
  const convAD = await creerConversation(comptes.jetonA, { type: 'directe', participant_member_ids: [comptes.d.membreId] });
  const msgD = await post(`/messagerie/conversations/${convAD.id}/messages`, { content: 'Message à signaler, par D.' }, comptes.jetonD);
  assert.equal(msgD.statut, 201);
  const signalement = await post('/messagerie/signalements', { target_type: 'message', target_id: msgD.data.id, reason: 'spam' }, comptes.jetonA);
  assert.equal(signalement.statut, 201);
  const id = signalement.data.id;
  const parMembre = await post(`/messagerie/moderation/${id}/transfert`, { note: 'Je transfère.' }, comptes.jetonA);
  assert.equal(parMembre.statut, 403, 'un membre ne transfère pas un dossier');
  const sansNote = await post(`/messagerie/moderation/${id}/transfert`, { note: '' }, comptes.jetonAdminIspam);
  assert.equal(sansNote.statut, 400, 'un transfert sans note motivée est refusé');
  const transfert = await post(`/messagerie/moderation/${id}/transfert`, { note: 'Conflit d’intérêts, je me retire du dossier.' }, comptes.jetonAdminIspam);
  assert.equal(transfert.statut, 201, `transfert accepté : ${JSON.stringify(transfert.data)}`);
  assert.equal(transfert.data.status, 'pending', 'le dossier repart en file');
  const ligne = (await client.query(`SELECT action, notes FROM moderation_actions WHERE report_id = $1 AND action = 'transfert'`, [id])).rows[0];
  assert.ok(ligne, 'le transfert est enregistré dans moderation_actions');
  assert.equal(ligne.notes, 'Conflit d’intérêts, je me retire du dossier.');
  const journal = (await client.query(`SELECT COUNT(*)::int AS n FROM journal_audit WHERE action = 'moderation.transfert' AND entite_id = $1`, [id])).rows[0].n;
  assert.equal(journal, 1, 'le transfert est journalisé');

  const enfant = await post('/messagerie/signalements', { target_type: 'message', target_id: msgD.data.id, reason: 'child_safety', description: 'Inquiétude.' }, comptes.jetonA);
  assert.equal(enfant.statut, 201);
  const transfertEnfant = await post(`/messagerie/moderation/${enfant.data.id}/transfert`, { note: 'Transfert interdit.' }, comptes.jetonAdminG);
  assert.equal(transfertEnfant.statut, 404, 'un dossier du circuit enfant ne se transfère pas par la file ordinaire');
});

// ── Limite de débit ──────────────────────────────────────────
test('limite de débit : 30 messages par minute, 429 au-delà', async () => {
  // Membre C : il n'a encore envoyé aucun message dans cette
  // exécution, la limite de 30 par minute part de zéro.
  const conv = await creerConversation(comptes.jetonC, { type: 'directe', participant_member_ids: [comptes.a.membreId] });
  for (let i = 0; i < 30; i += 1) {
    const r = await post(`/messagerie/conversations/${conv.id}/messages`, { content: `Message ${i + 1} du test de débit.` }, comptes.jetonC);
    assert.equal(r.statut, 201, `message ${i + 1} accepté`);
  }
  const trop = await post(`/messagerie/conversations/${conv.id}/messages`, { content: 'Message 31, trop.' }, comptes.jetonC);
  assert.equal(trop.statut, 429, '31e message dans la minute : 429');
  assert.equal(trop.data.code, 'rate_limited', 'code rate_limited renvoyé');
});
