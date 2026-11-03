// Envoi e-mail SMTP, 31 oct. 2026 : sujets de prière envoyés directement
// par le serveur, sans passer par la messagerie du membre.
// Règles dures : aucune donnée de prière n’est enregistrée, ni en base,
// ni dans un journal ; le contenu, le nom et le contact ne sont jamais
// journalisés, même en cas d’échec. Sans variables SMTP, l’envoi est
// impossible et la route répond 503, sans repli ni envoi simulé.
import nodemailer from 'nodemailer';

export const DESTINATAIRE_PRIERE = 'support@connexionprophetique.com';

export function smtpConfigure(env = process.env) {
  return Boolean(env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS && env.SMTP_FROM);
}

function creerTransporteur(env = process.env) {
  if (!smtpConfigure(env)) return null;
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: Number(env.SMTP_PORT) === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
}

// Envoie un code de réinitialisation de mot de passe au membre, 2 nov.
// 2026 : même transporteur que les sujets de prière, mêmes variables
// SMTP, aucune autre donnée personnelle dans le message. Lève une
// erreur portant le code SMTP_NON_CONFIGURE quand les variables SMTP
// sont absentes, et laisse remonter l'erreur d'envoi sinon : la route
// traduit les deux cas en 503, sans jamais exposer le détail au client.
// Le code lui-même n'est jamais journalisé, ni ici ni dans la route.
export async function envoyerCodeReinitialisation({ email, code }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  await transporteur.sendMail({
    from: env.SMTP_FROM,
    to: email,
    subject: 'Code de réinitialisation - CONNEXION PROPHETIQUE',
    text: [
      'Voici ton code de réinitialisation pour CONNEXION PROPHETIQUE :',
      '',
      code,
      '',
      'Ce code est valable 15 minutes, pour un seul usage. Si tu n’as pas demandé cette réinitialisation, ignore ce message.',
    ].join('\n'),
  });
}

// Envoie un sujet de prière à la structure. Lève une erreur portant le
// code SMTP_NON_CONFIGURE quand les variables SMTP sont absentes, et
// laisse remonter l’erreur d’envoi sinon : la route traduit les deux
// cas en 503, sans jamais exposer le détail au client.
export async function envoyerSujetPriere({ nom, contact, sujet }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const lignes = [
    'Sujet de prière reçu via l’application CONNEXION PROPHETIQUE.',
    '',
    `Nom : ${nom ?? 'Non renseigné'}`,
    `Contact : ${contact}`,
    '',
    'Sujet :',
    sujet,
  ];
  await transporteur.sendMail({
    from: env.SMTP_FROM,
    to: DESTINATAIRE_PRIERE,
    subject: 'Sujet de prière - CONNEXION PROPHETIQUE',
    text: lignes.join('\n'),
  });
}
