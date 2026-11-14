// Analyse d'un import de membres par CSV, carte 74, 7 nov. 2026.
// Objectif : la dernière vérification avant publication, demandée
// par Axel le 7 nov. 2026. Le fichier préparé sur ordinateur est
// lu dans l'application, envoyé ici en JSON, et cette analyse
// renvoie le statut de chaque ligne, sans rien créer : ni compte,
// ni matricule, ni mot de passe temporaire, ni carte, ni paiement,
// ni cotisation. La publication, elle, passe par la route
// d'import existante POST /admin/membres/import, qui revalide
// chaque ligne côté serveur : l'analyse est un aperçu, jamais
// une autorisation de créer.
//
// Règles reprises trait pour trait de la route d'import, 31 oct.
// 2026, pour que l'aperçu ne promette jamais ce que la
// publication refuserait ensuite :
// - nom complet de 2 à 120 caractères, téléphone ou e-mail requis,
//   téléphone de 6 à 20 caractères, e-mail valide, date de
//   naissance réelle au format AAAA-MM-JJ, fonction parmi la liste
//   des 16 (vide veut dire Membre), établissement résolu par nom
//   exact, sans tenir compte de la casse.
// - périmètre : un administrateur d'établissement n'importe que
//   pour son propre établissement, toute autre ligne est une
//   erreur avec son motif, comme à l'import.
// - doublon ignoré, jamais écrasé : téléphone ou e-mail déjà dans
//   la base, ou déjà vu sur une ligne précédente du même fichier
//   qui a passé toutes les validations. Un doublon est signalé,
//   pas créé, et la ligne reste décochée par défaut côté
//   application.
// - aucune donnée réelle n'est inventée : les lignes en erreur
//   gardent leur motif, pour que rien ne disparaisse en silence.
//
// Ce module est pur, sans base ni réseau : la route lui fournit
// les établissements, les fonctions, le périmètre et les contacts
// déjà existants, déjà normalisés. Il est testé sans serveur par
// tests/membres_import.test.js.

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function dateReelle(valeur) {
  if (!DATE_RE.test(valeur)) return false;
  const [y, mo, d] = valeur.split('-').map(Number);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d;
}

// Normalise un téléphone pour la comparaison seulement, avec la
// fonction fournie par l'appelant (normalizePhoneServer côté
// serveur). Sans fonction fournie, la valeur est reprise telle
// quelle, sans inventer de règle ici.
function normaliserTel(contexte, telephone) {
  const fn = contexte.normaliserTelephone;
  return typeof fn === 'function' ? fn(telephone) : String(telephone ?? '');
}

// Variantes d'un téléphone pour la comparaison, avec la fonction
// fournie par l'appelant (phoneVariantsServer côté serveur) : la
// forme affichée et la forme canonique, pour que +225074... et
// +22574... se reconnaissent comme le même numéro.
function variantesTel(contexte, telephone) {
  const fn = contexte.variantesTelephone;
  if (typeof fn === 'function') return fn(telephone);
  return [String(telephone ?? '')];
}

export function analyserMembresImport(lignes, contexte = {}) {
  const etablissements = contexte.etablissements ?? [];
  const fonctions = contexte.fonctions ?? [];
  const perimetreEtablissementId = contexte.perimetreEtablissementId ?? null;
  const telephonesExistants = contexte.telephonesExistants ?? new Set();
  const emailsExistants = contexte.emailsExistants ?? new Set();
  const nomParMinuscules = new Map();
  for (const e of etablissements) {
    const nom = String(e.nom ?? '').trim().toLowerCase();
    if (nom && !nomParMinuscules.has(nom)) nomParMinuscules.set(nom, e.id ?? null);
  }

  const resultats = [];
  let prets = 0;
  let doublons = 0;
  let erreurs = 0;
  const vusTelephone = new Set();
  const vusEmail = new Set();

  for (let i = 0; i < (lignes ?? []).length; i++) {
    const l = lignes[i] ?? {};
    const base = { ligne: i + 1, nom_complet: String(l.nom_complet ?? '').trim() };
    const erreur = (motif, champs) => {
      erreurs++;
      resultats.push({ ...base, ...champs, statut: 'erreur', motif, choisi: false });
    };
    const doublon = (motif, champs) => {
      doublons++;
      resultats.push({ ...base, ...champs, statut: 'doublon', motif, choisi: false });
    };

    const nom = base.nom_complet;
    const telephoneBrut = String(l.telephone ?? '').trim();
    const emailBrut = String(l.email ?? '').trim().toLowerCase();
    const dateBrute = String(l.date_naissance ?? '').trim();
    const fonctionBrute = String(l.fonction ?? '').trim();
    const fonction = fonctionBrute === '' ? 'Membre' : fonctionBrute;
    const etabNom = String(l.etablissement ?? '').trim();
    const telephone = telephoneBrut ? String(contexte.afficherTelephone ? contexte.afficherTelephone(telephoneBrut) : telephoneBrut) : '';
    const email = emailBrut || '';
    const champs = {
      telephone,
      email,
      etablissement: etabNom,
      fonction,
      date_naissance: dateBrute,
    };

    if (nom.length < 2 || nom.length > 120) {
      erreur('Nom complet invalide.', champs);
      continue;
    }
    if (!telephoneBrut && !emailBrut) {
      erreur('Un téléphone ou un e-mail est requis.', champs);
      continue;
    }
    if (telephoneBrut && (telephoneBrut.length < 6 || telephoneBrut.length > 20)) {
      erreur('Téléphone invalide.', champs);
      continue;
    }
    if (emailBrut && !EMAIL_RE.test(emailBrut)) {
      erreur('E-mail invalide.', champs);
      continue;
    }
    if (dateBrute && !dateReelle(dateBrute)) {
      erreur('Date de naissance invalide.', champs);
      continue;
    }
    if (!fonctions.includes(fonction)) {
      erreur('Fonction inconnue.', champs);
      continue;
    }
    let etablissementId = null;
    if (etabNom) {
      if (!nomParMinuscules.has(etabNom.toLowerCase())) {
        erreur('Établissement inconnu.', champs);
        continue;
      }
      etablissementId = nomParMinuscules.get(etabNom.toLowerCase());
    }
    if (perimetreEtablissementId && etablissementId !== perimetreEtablissementId) {
      erreur('Cet établissement ne fait pas partie de votre périmètre.', champs);
      continue;
    }
    // Doublon dans le fichier lui-même : le contact a déjà été
    // rencontré sur une ligne précédente du même fichier, qui a
    // passé toutes les validations ci-dessus.
    const telNormalise = telephoneBrut ? normaliserTel(contexte, telephone) : '';
    if ((telephoneBrut && vusTelephone.has(telNormalise)) || (emailBrut && vusEmail.has(emailBrut))) {
      doublon('Déjà existant dans ce fichier.', champs);
      continue;
    }
    if (telephoneBrut) vusTelephone.add(telNormalise);
    if (emailBrut) vusEmail.add(emailBrut);
    const dejaEnBase =
      (telephoneBrut && variantesTel(contexte, telephone).some((v) => telephonesExistants.has(v))) ||
      (emailBrut && emailsExistants.has(emailBrut));
    if (dejaEnBase) {
      doublon('Déjà existant.', champs);
      continue;
    }
    prets++;
    resultats.push({ ...base, ...champs, statut: 'pret', motif: '', choisi: true });
  }

  return { lignes: resultats, prets, doublons, erreurs, total: resultats.length };
}
