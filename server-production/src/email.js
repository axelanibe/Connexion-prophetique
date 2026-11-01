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
