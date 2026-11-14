// Routes des certificats d'adhésion.
// Branchement dans server.js : voir INTEGRATION.md.
import {
  formaterNumero, empreinte, urlVerification, signatureValide,
  etatCertificat, peutEmettre, pageVerificationHtml,
} from './certificats.js';

// d : dépendances fournies par server.js
// { z, q, tx, guard, audit, httpError, membreG, genererPdf, envoyerCertificat,
//   publicBaseUrl, certSecret }
export function registerCertificatRoutes(app, d) {
  const { z, q, tx, guard, audit, httpError, membreG, genererPdf, envoyerCertificat, publicBaseUrl, certSecret } = d;

  // Carte 110, 8 nov. 2026 : sans CERT_SECRET (au moins 32
  // caractères, saisi par Axel dans Render, jamais en chat), le
  // serveur démarre quand même et les routes certificats
  // répondent indisponible, 503, jamais 500, jamais de QR signé
  // avec un secret vide. Dès que le secret est saisi, un
  // redéploiement Render active les routes.
  if (!certSecret || certSecret.length < 32) {
    const indisponible = async (req, reply) =>
      reply.code(503).send({ erreur: 'Certificats indisponibles pour le moment.' });
    app.post('/admin/membres/:id/valider-adhesion', indisponible);
    app.post('/admin/membres/:id/suspendre-adhesion', indisponible);
    app.post('/admin/certificats/:numero/revoquer', indisponible);
    app.get('/moi/certificat-adhesion', indisponible);
    app.post('/moi/certificat-adhesion/envoyer', indisponible);
    app.get('/certificats/verification/:numero', async (req, reply) =>
      reply.code(503).type('text/html; charset=utf-8').send(
        '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Vérification indisponible</title></head>' +
        '<body><main><h1>Vérification indisponible</h1><p>La vérification des certificats est indisponible pour le moment.</p></main></body></html>'));
    return;
  }

  const adminAdhesionG = guard('admin_general', 'admin_etablissement');
  const adminGeneralG = guard('admin_general');

  // Émet le certificat dans la transaction appelante. Le membre doit déjà être verrouillé (FOR UPDATE).
  // Idempotent : renvoie le certificat actif s'il existe déjà.
  async function emettre(c, req, membreId, parUtilisateurId) {
    const existant = (await c.query(
      `SELECT id, numero, membre_id, matricule, nom_complet FROM certificats
        WHERE membre_id = $1 AND revoque_le IS NULL`, [membreId])).rows[0];
    if (existant) return existant;

    const m = (await c.query(
      'SELECT matricule, nom_complet, inscrit_le, valide_jusqua FROM membres WHERE id = $1', [membreId])).rows[0];
    if (!m) throw httpError(404, 'Membre introuvable.');

    const n = (await c.query("SELECT nextval('seq_certificat') AS n")).rows[0].n;
    const numero = formaterNumero(n);
    const url = urlVerification(publicBaseUrl, numero, m.matricule, certSecret);
    const pdf = await genererPdf({ numero, url, ...m });

    const row = (await c.query(
      `INSERT INTO certificats (numero, membre_id, matricule, nom_complet, emis_par, pdf, empreinte)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, numero, membre_id, matricule, nom_complet`,
      [numero, membreId, m.matricule, m.nom_complet, parUtilisateurId ?? null, pdf, empreinte(pdf)],
    )).rows[0];
    await audit(c, req, 'certificat.emis', 'certificats', row.id, { numero });
    return row;
  }

  // Validation par le Bureau : c'est elle qui déclenche l'émission automatique.
  app.post('/admin/membres/:id/valider-adhesion', { preHandler: adminAdhesionG }, async (req) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
    const certificat = await tx(async (c) => {
      const m = (await c.query(
        'SELECT etablissement_id, statut_adhesion FROM membres WHERE id = $1 FOR UPDATE', [id])).rows[0];
      if (!m) throw httpError(404, 'Membre introuvable.');
      if (req.user.role === 'admin_etablissement' && m.etablissement_id !== req.user.eid) {
        throw httpError(403, 'Accès refusé.');
      }
      if (m.statut_adhesion === 'validee') throw httpError(409, 'Adhésion déjà validée.');
      await c.query("UPDATE membres SET statut_adhesion = 'validee' WHERE id = $1", [id]);
      await audit(c, req, 'adhesion.validee', 'membres', id);
      return emettre(c, req, id, req.user.sub);
    });
    // Envoi par e-mail après le commit, pour qu'un échec SMTP ne bloque pas la validation.
    envoyerCertificat(certificat).catch((e) => app.log.error(e));
    return { statut_adhesion: 'validee', certificat: certificat.numero };
  });

  // Suspension : l'adhésion passe en suspendue et le certificat actif est révoqué.
  app.post('/admin/membres/:id/suspendre-adhesion', { preHandler: adminAdhesionG }, async (req) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
    const { motif } = z.object({ motif: z.string().trim().min(3).max(300) }).parse(req.body ?? {});
    await tx(async (c) => {
      const m = (await c.query(
        'SELECT etablissement_id FROM membres WHERE id = $1 FOR UPDATE', [id])).rows[0];
      if (!m) throw httpError(404, 'Membre introuvable.');
      if (req.user.role === 'admin_etablissement' && m.etablissement_id !== req.user.eid) {
        throw httpError(403, 'Accès refusé.');
      }
      await c.query("UPDATE membres SET statut_adhesion = 'suspendue' WHERE id = $1", [id]);
      await c.query(
        `UPDATE certificats SET revoque_le = now(), motif_revocation = $2
          WHERE membre_id = $1 AND revoque_le IS NULL`,
        [id, `Adhésion suspendue : ${motif}`]);
      await audit(c, req, 'adhesion.suspendue', 'membres', id, { motif });
    });
    return { statut_adhesion: 'suspendue' };
  });

  // Révocation d'un certificat précis (erreur, fraude suspectée). Réservé à l'administrateur général.
  app.post('/admin/certificats/:numero/revoquer', { preHandler: adminGeneralG }, async (req) => {
    const { numero } = z.object({ numero: z.string().regex(/^CERT-\d{6,}$/) }).parse(req.params);
    const { motif } = z.object({ motif: z.string().trim().min(3).max(300) }).parse(req.body ?? {});
    const revoque = await tx(async (c) => {
      const row = (await c.query(
        `UPDATE certificats SET revoque_le = now(), motif_revocation = $2
          WHERE numero = $1 AND revoque_le IS NULL RETURNING id`,
        [numero, motif])).rows[0];
      if (!row) throw httpError(404, 'Certificat introuvable ou déjà révoqué.');
      await audit(c, req, 'certificat.revoque', 'certificats', row.id, { numero, motif });
      return row;
    });
    return { numero, revoque: true, id: revoque.id };
  });

  // Téléchargement par le membre : renvoie le PDF archivé, jamais un PDF régénéré.
  app.get('/moi/certificat-adhesion', { preHandler: membreG }, async (req, reply) => {
    const membre = (await q('SELECT id, statut_adhesion FROM membres WHERE id = $1', [req.user.mid])).rows[0];
    if (!membre) throw httpError(404, 'Profil introuvable.');
    if (!peutEmettre(membre)) {
      throw httpError(403, "Votre adhésion n'est pas encore validée par la structure.");
    }
    let cert = (await q(
      'SELECT id, matricule FROM certificats WHERE membre_id = $1 AND revoque_le IS NULL', [membre.id])).rows[0];
    if (!cert) {
      // Cas de rattrapage (membre validé avant cette version) : émission à la demande, verrouillée.
      cert = await tx(async (c) => {
        await c.query('SELECT 1 FROM membres WHERE id = $1 FOR UPDATE', [membre.id]);
        return emettre(c, req, membre.id, null);
      });
    }
    const { pdf } = (await q('SELECT pdf FROM certificats WHERE id = $1', [cert.id])).rows[0];
    return reply
      .type('application/pdf')
      .header('Content-Disposition', `attachment; filename="certificat-adhesion-${cert.matricule}.pdf"`)
      .send(pdf);
  });

  // Carte 121, 10 nov. 2026 : le membre reçoit son certificat
  // par mail, au lieu de le télécharger. Même émission de
  // rattrapage que le téléchargement pour un membre validé avant
  // cette version. Sans adresse e-mail sur son compte, 409.
  // Sans envoi possible, 503, pour ne jamais promettre un
  // courriel qui n'est pas parti.
  app.post('/moi/certificat-adhesion/envoyer', { preHandler: membreG }, async (req) => {
    const membre = (await q('SELECT id, statut_adhesion FROM membres WHERE id = $1', [req.user.mid])).rows[0];
    if (!membre) throw httpError(404, 'Profil introuvable.');
    if (!peutEmettre(membre)) {
      throw httpError(403, "Votre adhésion n'est pas encore validée par la structure.");
    }
    const courriel = (await q(
      'SELECT u.email FROM membres m JOIN utilisateurs u ON u.id = m.utilisateur_id WHERE m.id = $1',
      [membre.id])).rows[0]?.email;
    if (!courriel) {
      throw httpError(409, 'Aucune adresse e-mail sur votre compte : le certificat ne peut pas être envoyé par mail.');
    }
    let cert = (await q(
      'SELECT id, matricule FROM certificats WHERE membre_id = $1 AND revoque_le IS NULL', [membre.id])).rows[0];
    if (!cert) {
      cert = await tx(async (c) => {
        await c.query('SELECT 1 FROM membres WHERE id = $1 FOR UPDATE', [membre.id]);
        return emettre(c, req, membre.id, null);
      });
    }
    const envoye = await envoyerCertificat(cert);
    if (!envoye) throw httpError(503, 'Envoi par mail impossible pour le moment.');
    return { envoye: true, numero: cert.numero };
  });

  // Page publique ouverte par le QR code. Aucune recherche libre : numéro + matricule + signature obligatoires.
  app.get('/certificats/verification/:numero', async (req, reply) => {
    const { numero } = z.object({ numero: z.string().regex(/^CERT-\d{6,}$/) }).parse(req.params);
    const { matricule, signature } = z.object({
      matricule: z.string().regex(/^CP-[A-Z]{2}-\d{4,}$/),
      signature: z.string().regex(/^[a-f0-9]{64}$/),
    }).parse(req.query);
    const signatureOk = signatureValide(certSecret, numero, matricule, signature);
    const row = signatureOk ? (await q(
      `SELECT c.numero, c.nom_complet, c.emis_le, c.revoque_le, c.motif_revocation,
              m.valide_jusqua, m.statut_adhesion, u.actif
         FROM certificats c
         JOIN membres m ON m.id = c.membre_id
         JOIN utilisateurs u ON u.id = m.utilisateur_id
        WHERE c.numero = $1 AND c.matricule = $2`, [numero, matricule])).rows[0] : null;
    const etat = etatCertificat(row ?? null);
    return reply
      .status(etat === 'introuvable' ? 404 : 200)
      .type('text/html; charset=utf-8')
      .send(pageVerificationHtml({ etat, certificat: row ?? null }));
  });
}
