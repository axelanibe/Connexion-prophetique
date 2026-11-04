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

// Présentation d'expéditeur anti-indésirables, 3 nov. 2026 : nom
// d'affichage fixe, adresse réelle extraite de SMTP_FROM sans jamais
// la changer vers une autre adresse, Reply-To vers la même adresse.
// Si SMTP_FROM contient déjà un nom d'affichage, seule l'adresse entre
// chevrons est reprise, pour éviter un double nom.
function adresseReelle(env = process.env) {
  const brut = String(env.SMTP_FROM ?? '').trim();
  const entreChevrons = brut.match(/<([^<>]+)>/);
  return (entreChevrons ? entreChevrons[1] : brut).trim();
}

function expediteur(env = process.env) {
  return `"CONNEXION PROPHETIQUE" <${adresseReelle(env)}>`;
}

function echapperHtml(texte) {
  return String(texte)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
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
  const texte = [
    'Voici ton code de réinitialisation pour CONNEXION PROPHETIQUE :',
    '',
    code,
    '',
    'Ce code est valable 15 minutes, pour un seul usage. Si tu n’as pas demandé cette réinitialisation, ignore ce message.',
  ].join('\n');
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: email,
    subject: 'Code de réinitialisation - CONNEXION PROPHETIQUE',
    text: texte,
    // Version HTML simple, mêmes informations que le texte, sans image
    // externe, sans logo inventé, sans lien cliquable vers une
    // réinitialisation : le code seul, à recopier dans l'application.
    html: [
      '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
      '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;padding:24px;">',
      '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;margin:0 0 4px;">CONNEXION PROPH&Eacute;TIQUE</p>',
      '<p style="font-size:16px;margin:0 0 24px;">Voici ton code de r&eacute;initialisation pour CONNEXION PROPHETIQUE :</p>',
      `<p style="font-size:32px;font-weight:bold;letter-spacing:4px;text-align:center;color:#0B1F3A;background-color:#F5F6FA;padding:16px;margin:0 0 24px;">${echapperHtml(code)}</p>`,
      '<p style="font-size:15px;margin:0 0 8px;">Ce code est valable 15 minutes, pour un seul usage.</p>',
      '<p style="font-size:15px;margin:0 0 24px;">Si tu n&rsquo;as pas demand&eacute; cette r&eacute;initialisation, ignore ce message.</p>',
      '<p style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;padding-top:16px;margin:0;">support@connexionprophetique.com</p>',
      '</div></div>',
    ].join(''),
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
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: DESTINATAIRE_PRIERE,
    subject: 'Sujet de prière - CONNEXION PROPHETIQUE',
    text: lignes.join('\n'),
  });
}
