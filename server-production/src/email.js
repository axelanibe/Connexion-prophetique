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

// Carte 119, 17 nov. 2026 : les courriels automatiques partaient
// en fragments HTML sans doctype, seul écart relevé au mail-tester
// (8,6/10). Chaque corps HTML est enveloppé dans un document
// propre, sans changer le contenu visible, l'objet ni le
// destinataire. Le titre reprend l'objet du courriel.
export function envelopperHtml(corps, titre) {
  return [
    '<!DOCTYPE html>',
    '<html lang="fr">',
    '<head>',
    '<meta charset="utf-8">',
    `<title>${echapperHtml(titre)}</title>`,
    '</head>',
    '<body style="margin:0;padding:0;">',
    corps,
    '</body>',
    '</html>',
  ].join('');
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
// 2026, texte professionnel refait le 3 nov. 2026 : même transporteur
// que les sujets de prière, mêmes variables SMTP, aucune autre donnée
// personnelle dans le message. Le code ne figure jamais dans l'objet,
// pour ne pas l'exposer sur un écran verrouillé. Le lien
// « Ouvrir l'application avec ce code » ne fait que pré-remplir le
// champ à l'arrivée : il ne valide rien tout seul, le membre doit
// toujours saisir son e-mail, son nouveau mot de passe et le
// confirmer, et le code garde ses limites, 30 minutes, un seul usage.
// Lève une erreur portant le code SMTP_NON_CONFIGURE quand les
// variables SMTP sont absentes, et laisse remonter l'erreur d'envoi
// sinon : la route traduit les deux cas en 503, sans jamais exposer
// le détail au client. Le code lui-même n'est jamais journalisé, ni
// ici ni dans la route.
// Code de réinitialisation, fonction pure testable sans SMTP :
// construit le contenu, envoyerCodeReinitialisation l'envoie.
// Version HTML simple, mêmes informations que le texte, sans image
// externe, sans logo inventé. Le bouton ne valide rien tout seul :
// il renvoie vers l'application avec le code en paramètre, pour
// pré-remplir le champ à l'arrivée seulement.
export function codeReinitialisationCourriel({ code }) {
  const lien = `https://www.connexionprophetique.com/?code=${encodeURIComponent(code)}`;
  const texte = [
    'Bonjour,',
    '',
    'Tu as demandé la réinitialisation du mot de passe de ton compte CONNEXION PROPHETIQUE. Voici ton code de vérification :',
    '',
    code,
    '',
    'Ce code est valable 30 minutes, pour un seul usage. Saisis-le dans l’application, puis choisis ton nouveau mot de passe.',
    '',
    'Ne partage jamais ce code avec personne. Personne de la structure ne te le demandera jamais, ni par téléphone, ni par message, ni par courriel.',
    '',
    'Si ce n’est pas toi qui as fait cette demande, ignore simplement ce message : ton mot de passe reste inchangé.',
    '',
    'Tu peux aussi ouvrir l’application directement avec ce code grâce au lien ci-dessous. Le lien ne change rien tout seul : il pré-remplit seulement le code, et c’est toi qui choisis et confirmes ton nouveau mot de passe.',
    '',
    `Ouvrir l’application avec ce code : ${lien}`,
    '',
    'Besoin d’aide ? Écris à support@connexionprophetique.com.',
    '',
    'Former pour mieux servir.',
    'L’équipe CONNEXION PROPHETIQUE',
  ].join('\n');
  const corps = [
      '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
      '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;">',
      '<div style="background-color:#0B1F3A;padding:24px;text-align:center;">',
      '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#D4A72C;margin:0;">CONNEXION PROPH&Eacute;TIQUE</p>',
      '</div>',
      '<div style="padding:24px;">',
      '<p style="font-size:16px;margin:0 0 24px;">Bonjour,</p>',
      '<p style="font-size:16px;margin:0 0 24px;">Tu as demand&eacute; la r&eacute;initialisation du mot de passe de ton compte CONNEXION PROPHETIQUE. Voici ton code de v&eacute;rification :</p>',
      `<p style="font-size:32px;font-weight:bold;letter-spacing:4px;text-align:center;color:#0B1F3A;background-color:#F5F6FA;padding:16px;margin:0 0 24px;">${echapperHtml(code)}</p>`,
      '<p style="font-size:15px;margin:0 0 8px;">Ce code est valable 30 minutes, pour un seul usage. Saisis-le dans l&rsquo;application, puis choisis ton nouveau mot de passe.</p>',
      '<p style="font-size:15px;margin:0 0 8px;">Ne partage jamais ce code avec personne. Personne de la structure ne te le demandera jamais, ni par t&eacute;l&eacute;phone, ni par message, ni par courriel.</p>',
      '<p style="font-size:15px;margin:0 0 24px;">Si ce n&rsquo;est pas toi qui as fait cette demande, ignore simplement ce message : ton mot de passe reste inchang&eacute;.</p>',
      `<p style="text-align:center;margin:0 0 8px;"><a href="${echapperHtml(lien)}" style="display:inline-block;background-color:#0B1F3A;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:8px;">Ouvrir l&rsquo;application avec ce code</a></p>`,
      '<p style="font-size:13px;color:#475569;text-align:center;margin:0 0 24px;">Ce bouton pr&eacute;-remplit seulement le code. Il ne change rien tout seul.</p>',
      '<p style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;padding-top:16px;margin:0;">Besoin d&rsquo;aide ? &Eacute;cris &agrave; support@connexionprophetique.com.<br>Former pour mieux servir.<br>L&rsquo;&eacute;quipe CONNEXION PROPHETIQUE</p>',
      '</div></div></div>',
    ].join('');
  return { sujet: 'Code de réinitialisation - CONNEXION PROPHETIQUE', texte, html: envelopperHtml(corps, 'Code de réinitialisation - CONNEXION PROPHETIQUE') };
}

export async function envoyerCodeReinitialisation({ email, code }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const contenu = codeReinitialisationCourriel({ code });
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: email,
    subject: contenu.sujet,
    text: contenu.texte,
    html: contenu.html,
  });
}

// Code de vérification d'e-mail à l'inscription, MO-25 (b),
// 22 nov. 2026 : même forme que le code de réinitialisation,
// sans lien de réinitialisation, le code ne sert qu'à vérifier
// l'adresse du nouveau compte, 30 minutes, un seul usage.
export function codeVerificationCourriel({ code }) {
  const texte = [
    'Bonjour,',
    '',
    'Bienvenue sur CONNEXION PROPHETIQUE. Voici ton code de vérification :',
    '',
    code,
    '',
    'Ce code est valable 30 minutes, pour un seul usage. Saisis-le dans l’application pour vérifier ton adresse e-mail et activer ton compte.',
    '',
    'Ne partage jamais ce code avec personne. Personne de la structure ne te le demandera jamais, ni par téléphone, ni par message, ni par courriel.',
    '',
    'Si ce n’est pas toi qui as créé ce compte, ignore simplement ce message.',
    '',
    'Besoin d’aide ? Écris à support@connexionprophetique.com.',
    '',
    'Former pour mieux servir.',
    'L’équipe CONNEXION PROPHETIQUE',
  ].join('\n');
  const corps = [
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
    '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;">',
    '<div style="background-color:#0B1F3A;padding:24px;text-align:center;">',
    '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#D4A72C;margin:0;">CONNEXION PROPH&Eacute;TIQUE</p>',
    '</div>',
    '<div style="padding:24px;">',
    '<p style="font-size:16px;margin:0 0 24px;">Bonjour,</p>',
    '<p style="font-size:16px;margin:0 0 24px;">Bienvenue sur CONNEXION PROPHETIQUE. Voici ton code de v&eacute;rification :</p>',
    `<p style="font-size:32px;font-weight:bold;letter-spacing:4px;text-align:center;color:#0B1F3A;background-color:#F5F6FA;padding:16px;margin:0 0 24px;">${echapperHtml(code)}</p>`,
    '<p style="font-size:15px;margin:0 0 8px;">Ce code est valable 30 minutes, pour un seul usage. Saisis-le dans l&rsquo;application pour v&eacute;rifier ton adresse e-mail et activer ton compte.</p>',
    '<p style="font-size:15px;margin:0 0 8px;">Ne partage jamais ce code avec personne. Personne de la structure ne te le demandera jamais, ni par t&eacute;l&eacute;phone, ni par message, ni par courriel.</p>',
    '<p style="font-size:15px;margin:0 0 24px;">Si ce n&rsquo;est pas toi qui as cr&eacute;&eacute; ce compte, ignore simplement ce message.</p>',
    '<p style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;padding-top:16px;margin:0;">Besoin d&rsquo;aide ? &Eacute;cris &agrave; support@connexionprophetique.com.<br>Former pour mieux servir.<br>L&rsquo;&eacute;quipe CONNEXION PROPHETIQUE</p>',
    '</div></div></div>',
  ].join('');
  return { sujet: 'Code de vérification - CONNEXION PROPHETIQUE', texte, html: envelopperHtml(corps, 'Code de vérification - CONNEXION PROPHETIQUE') };
}

export async function envoyerCodeVerification({ email, code }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const contenu = codeVerificationCourriel({ code });
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: email,
    subject: contenu.sujet,
    text: contenu.texte,
    html: contenu.html,
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

// Message du formulaire de contact de la vitrine, audit de lancement,
// 22 nov. 2026 : fonction pure, testable sans SMTP, construit le
// contenu, envoyerMessageContact l'envoie. Le contenu est échappé
// en HTML, l'adresse de l'expéditeur sert de réponse directe, pour
// que la structure réponde en un clic. Aucun contenu n'est stocké,
// ni journalisé.
export function messageContactCourriel({ nom, email, telephone, sujet, message, actus }) {
  const sujetCourriel = `Contact vitrine : ${sujet} - CONNEXION PROPHETIQUE`;
  const lignes = [
    'Message reçu via le formulaire de contact du site CONNEXION PROPHETIQUE.',
    '',
    `Nom : ${nom}`,
    `E-mail : ${email}`,
    `Téléphone : ${telephone ?? 'Non renseigné'}`,
    `Objet : ${sujet}`,
    `Actualités : ${actus ? 'Oui, souhaite recevoir les actualités, annonces de camps et lettres d’édification.' : 'Non'}`,
    '',
    'Message :',
    message,
  ];
  const texte = lignes.join('\n');
  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
    '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;">',
    '<div style="background-color:#0B1F3A;padding:24px;text-align:center;">',
    '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#D4A72C;margin:0;">CONNEXION PROPH&Eacute;TIQUE</p>',
    '</div>',
    '<div style="padding:24px;">',
    '<p style="font-size:16px;margin:0 0 16px;">Message re&ccedil;u via le formulaire de contact du site.</p>',
    `<p style="font-size:16px;line-height:1.6;margin:0 0 8px;"><strong>Nom :</strong> ${echapperHtml(nom)}</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 8px;"><strong>E-mail :</strong> ${echapperHtml(email)}</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 8px;"><strong>T&eacute;l&eacute;phone :</strong> ${echapperHtml(telephone ?? 'Non renseigné')}</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 8px;"><strong>Objet :</strong> ${echapperHtml(sujet)}</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 16px;"><strong>Actualit&eacute;s :</strong> ${actus ? 'Oui' : 'Non'}</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0;">${echapperHtml(message).replaceAll('\n', '<br>')}</p>`,
    '</div></div></div>',
  ].join('');
  return { sujet: sujetCourriel, texte, html: envelopperHtml(html, sujetCourriel) };
}

// Envoie un message du formulaire de contact à la structure. Mêmes
// règles que les autres envois : sans variables SMTP, erreur
// SMTP_NON_CONFIGURE traduite en 503 par la route, sans envoi simulé.
export async function envoyerMessageContact({ nom, email, telephone, sujet, message, actus }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const contenu = messageContactCourriel({ nom, email, telephone, sujet, message, actus });
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: email,
    to: DESTINATAIRE_PRIERE,
    subject: contenu.sujet,
    text: contenu.texte,
    html: contenu.html,
  });
}

// Courriel d'anniversaire, tranche 5, 4 nov. 2026 : modèle adapté de
// celui décrit par Axel, en-tête bleu nuit #0B1F3A, carte blanche,
// liseré or première conception #D4A72C, salutation personnalisée, vœux,
// remerciement, souhait pour la nouvelle année, signature. Jamais
// la marque Transfergratis de l'exemple reçu par Axel, jamais un
// âge, jamais une année de naissance, jamais une date de naissance.
// Le message d'Axel, modifié le 4 nov. 2026, est repris tel quel,
// avec le prénom du membre : il ne contient plus ni date
// d'intégration ni référence de verset. La référence du verset
// dédié figure toujours dans la ligne qui suit le message, et le
// texte du verset lui-même n'est pas dans le courriel : le serveur
// ne possède pas la Bible, il cite la référence, et le texte se
// lit dans la carte d'anniversaire de l'application.
// Fonction pure, testable sans SMTP : anniversaireCourriel construit
// le contenu, envoyerAnniversaire l'envoie.
export function anniversaireCourriel({ nom, dateIntegration, referenceVerset }) {
  const prenom = String(nom ?? '').trim().split(/\s+/)[0] || 'membre';
  const messageAxel = `Nous sommes heureux de vous compter parmi nous ${prenom} au nom de Connexion Prophétique nous vous souhaitons Joyeux anniversaire.`;
  const texte = [
    `Bonjour ${prenom},`,
    '',
    messageAxel,
    '',
    'Nous te souhaitons une nouvelle année remplie de paix, de santé et de bénédictions.',
    '',
    `Ton verset dédié, ${referenceVerset}, se lit en entier dans ton application, dans la carte d’anniversaire du jour.`,
    '',
    'Besoin d’aide ? Écris à support@connexionprophetique.com.',
    '',
    'Former pour mieux servir.',
    'L’équipe CONNEXION PROPHETIQUE',
  ].join('\n');
  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
    '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;">',
    '<div style="background-color:#0B1F3A;padding:24px;text-align:center;">',
    '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#D4A72C;margin:0;">CONNEXION PROPH&Eacute;TIQUE</p>',
    '</div>',
    '<div style="padding:24px;">',
    `<p style="font-size:16px;margin:0 0 16px;">Bonjour ${echapperHtml(prenom)},</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${echapperHtml(messageAxel)}</p>`,
    '<p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Nous te souhaitons une nouvelle ann&eacute;e remplie de paix, de sant&eacute; et de b&eacute;n&eacute;dictions.</p>',
    `<p style="font-size:15px;line-height:1.6;margin:0 0 24px;">Ton verset d&eacute;di&eacute;, ${echapperHtml(referenceVerset)}, se lit en entier dans ton application, dans la carte d&rsquo;anniversaire du jour.</p>`,
    '<p style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;padding-top:16px;margin:0;">Besoin d&rsquo;aide ? &Eacute;cris &agrave; support@connexionprophetique.com.<br>Former pour mieux servir.<br>L&rsquo;&eacute;quipe CONNEXION PROPHETIQUE</p>',
    '</div></div></div>',
  ].join('');
  return { sujet: 'Joyeux anniversaire - CONNEXION PROPHETIQUE', texte, html: envelopperHtml(html, 'Joyeux anniversaire - CONNEXION PROPHETIQUE') };
}

// Envoie un courriel d'anniversaire à un membre. Mêmes règles que
// les autres envois : sans variables SMTP, erreur SMTP_NON_CONFIGURE
// traduite en 503 par la route, sans envoi simulé. Aucun sujet de
// prière n'est lu, stocké ou joint ici.
export async function envoyerAnniversaire({ email, nom, dateIntegration, referenceVerset }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const contenu = anniversaireCourriel({ nom, dateIntegration, referenceVerset });
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: email,
    subject: contenu.sujet,
    text: contenu.texte,
    html: contenu.html,
  });
}

// Certificat d'adhésion, carte 110, 8 nov. 2026 : le PDF archivé
// part en pièce jointe, jamais régénéré. Même transporteur et même
// expéditeur que les autres envois, même règle : sans variables
// SMTP, erreur SMTP_NON_CONFIGURE, sans envoi simulé. Le nom du
// membre ne figure jamais dans un journal, même en cas d'échec.
// Certificat d'adhésion, fonction pure testable sans SMTP :
// construit le contenu, envoyerCertificatParEmail l'envoie.
export function certificatCourriel({ nom, numero }) {
  const prenom = String(nom ?? '').trim().split(/\s+/)[0] || 'membre';
  const texte = [
    `Bonjour ${prenom},`,
    '',
    `Votre adhésion à CONNEXION PROPHETIQUE a été validée. Votre certificat d'adhésion (${numero}) est joint à ce message.`,
    '',
    'Vous pouvez aussi le télécharger depuis votre profil dans l’application.',
    '',
    'Besoin d’aide ? Écris à support@connexionprophetique.com.',
    '',
    'Former pour mieux servir.',
    'L’équipe CONNEXION PROPHETIQUE',
  ].join('\n');
  const corps = [
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
    '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;">',
    '<div style="background-color:#0B1F3A;padding:24px;text-align:center;">',
    '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#D4A72C;margin:0;">CONNEXION PROPH&Eacute;TIQUE</p>',
    '</div>',
    '<div style="padding:24px;">',
    `<p style="font-size:16px;margin:0 0 16px;">Bonjour ${echapperHtml(prenom)},</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Votre adh&eacute;sion &agrave; CONNEXION PROPHETIQUE a &eacute;t&eacute; valid&eacute;e. Votre certificat d&rsquo;adh&eacute;sion (${echapperHtml(numero)}) est joint &agrave; ce message.</p>`,
    '<p style="font-size:16px;line-height:1.6;margin:0 0 24px;">Vous pouvez aussi le t&eacute;l&eacute;charger depuis votre profil dans l&rsquo;application.</p>',
    '<p style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;padding-top:16px;margin:0;">Besoin d&rsquo;aide ? &Eacute;cris &agrave; support@connexionprophetique.com.<br>Former pour mieux servir.<br>L&rsquo;&eacute;quipe CONNEXION PROPHETIQUE</p>',
    '</div></div></div>',
  ].join('');
  return { sujet: `Votre certificat d'adhésion ${numero} - CONNEXION PROPHETIQUE`, texte, html: envelopperHtml(corps, `Votre certificat d'adhésion ${numero} - CONNEXION PROPHETIQUE`) };
}

export async function envoyerCertificatParEmail({ destinataire, nom, numero, pdf }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const contenu = certificatCourriel({ nom, numero });
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: destinataire,
    subject: contenu.sujet,
    text: contenu.texte,
    html: contenu.html,
    attachments: [{ filename: `${numero}.pdf`, content: pdf, contentType: 'application/pdf' }],
  });
}

// Carte 121, 10 nov. 2026 : envoi d'une attestation en PDF par
// e-mail au membre, quand il choisit « Recevoir par mail » au
// lieu du téléchargement. Même motif que le certificat : texte
// et HTML, PDF en pièce jointe, sans journalisation d'adresse.
export async function envoyerAttestationParEmail({ destinataire, nom, reference, type, pdf }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const libelleType = type === 'participation' ? 'de participation' : 'de bénévolat';
  const prenom = String(nom ?? '').trim().split(/\s+/)[0] || 'membre';
  const texte = [
    `Bonjour ${prenom},`,
    '',
    `Votre attestation ${libelleType} (${reference}) est jointe à ce message.`,
    '',
    'Vous pouvez aussi la télécharger depuis l’application, dans « Mes attestations ».',
    '',
    'Besoin d’aide ? Écris à support@connexionprophetique.com.',
    '',
    'Former pour mieux servir.',
    'L’équipe CONNEXION PROPHETIQUE',
  ].join('\n');
  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
    '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;">',
    '<div style="background-color:#0B1F3A;padding:24px;text-align:center;">',
    '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#D4A72C;margin:0;">CONNEXION PROPH&Eacute;TIQUE</p>',
    '</div>',
    '<div style="padding:24px;">',
    `<p style="font-size:16px;margin:0 0 16px;">Bonjour ${echapperHtml(prenom)},</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Votre attestation ${echapperHtml(libelleType)} (${echapperHtml(reference)}) est jointe &agrave; ce message.</p>`,
    '<p style="font-size:16px;line-height:1.6;margin:0 0 24px;">Vous pouvez aussi la t&eacute;l&eacute;charger depuis l&rsquo;application, dans &laquo; Mes attestations &raquo;.</p>',
    '<p style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;padding-top:16px;margin:0;">Besoin d&rsquo;aide ? &Eacute;cris &agrave; support@connexionprophetique.com.<br>Former pour mieux servir.<br>L&rsquo;&eacute;quipe CONNEXION PROPHETIQUE</p>',
    '</div></div></div>',
  ].join('');
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: destinataire,
    subject: `Votre attestation ${libelleType} ${reference} - CONNEXION PROPHETIQUE`,
    text: texte,
    html,
    attachments: [{ filename: `attestation-${reference}.pdf`, content: pdf, contentType: 'application/pdf' }],
  });
}

// Carte 122, 10 nov. 2026 : envoi automatique du reçu (facture PDF)
// par e-mail au membre, à la validation de son paiement, quel que
// soit le type. Même motif que le certificat : texte et HTML, PDF
// en pièce jointe, sans journalisation d'adresse.
export async function envoyerRecuParEmail({ destinataire, nom, reference, libelle, montant, pdf }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const prenom = String(nom ?? '').trim().split(/\s+/)[0] || 'membre';
  const texte = [
    `Bonjour ${prenom},`,
    '',
    `Votre ${libelle} de ${montant} a été validé par la structure. Votre reçu (F-${reference}) est joint à ce message.`,
    '',
    'Vous pouvez aussi le télécharger depuis l’application, dans votre historique de paiement.',
    '',
    'Besoin d’aide ? Écris à support@connexionprophetique.com.',
    '',
    'Former pour mieux servir.',
    'L’équipe CONNEXION PROPHETIQUE',
  ].join('\n');
  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
    '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;">',
    '<div style="background-color:#0B1F3A;padding:24px;text-align:center;">',
    '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#D4A72C;margin:0;">CONNEXION PROPH&Eacute;TIQUE</p>',
    '</div>',
    '<div style="padding:24px;">',
    `<p style="font-size:16px;margin:0 0 16px;">Bonjour ${echapperHtml(prenom)},</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Votre ${echapperHtml(libelle)} de ${echapperHtml(montant)} a &eacute;t&eacute; valid&eacute; par la structure. Votre re&ccedil;u (F-${echapperHtml(reference)}) est joint &agrave; ce message.</p>`,
    '<p style="font-size:16px;line-height:1.6;margin:0 0 24px;">Vous pouvez aussi le t&eacute;l&eacute;charger depuis l&rsquo;application, dans votre historique de paiement.</p>',
    '<p style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;padding-top:16px;margin:0;">Besoin d&rsquo;aide ? &Eacute;cris &agrave; support@connexionprophetique.com.<br>Former pour mieux servir.<br>L&rsquo;&eacute;quipe CONNEXION PROPHETIQUE</p>',
    '</div></div></div>',
  ].join('');
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: destinataire,
    subject: `Votre reçu F-${reference} - CONNEXION PROPHETIQUE`,
    text: texte,
    html,
    attachments: [{ filename: `F-${reference}.pdf`, content: pdf, contentType: 'application/pdf' }],
  });
}

// Carte 122, 10 nov. 2026 : envoi automatique de la nouvelle carte
// de membre en PDF par e-mail, quand le paiement validé concerne
// la carte. Même motif que le reçu : texte et HTML, PDF en pièce
// jointe, sans journalisation d'adresse.
export async function envoyerCarteParEmail({ destinataire, nom, matricule, pdf }, env = process.env) {
  const transporteur = creerTransporteur(env);
  if (!transporteur) {
    const erreur = new Error('Service e-mail non configuré.');
    erreur.code = 'SMTP_NON_CONFIGURE';
    throw erreur;
  }
  const prenom = String(nom ?? '').trim().split(/\s+/)[0] || 'membre';
  const texte = [
    `Bonjour ${prenom},`,
    '',
    `Votre nouvelle carte de membre (${matricule}) est jointe à ce message.`,
    '',
    'Elle est aussi visible dans l’application, sur la page Carte.',
    '',
    'Besoin d’aide ? Écris à support@connexionprophetique.com.',
    '',
    'Former pour mieux servir.',
    'L’équipe CONNEXION PROPHETIQUE',
  ].join('\n');
  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;background-color:#F5F6FA;padding:24px;">',
    '<div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-top:6px solid #D4A72C;">',
    '<div style="background-color:#0B1F3A;padding:24px;text-align:center;">',
    '<p style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#D4A72C;margin:0;">CONNEXION PROPH&Eacute;TIQUE</p>',
    '</div>',
    '<div style="padding:24px;">',
    `<p style="font-size:16px;margin:0 0 16px;">Bonjour ${echapperHtml(prenom)},</p>`,
    `<p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Votre nouvelle carte de membre (${echapperHtml(matricule)}) est jointe &agrave; ce message.</p>`,
    '<p style="font-size:16px;line-height:1.6;margin:0 0 24px;">Elle est aussi visible dans l&rsquo;application, sur la page Carte.</p>',
    '<p style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;padding-top:16px;margin:0;">Besoin d&rsquo;aide ? &Eacute;cris &agrave; support@connexionprophetique.com.<br>Former pour mieux servir.<br>L&rsquo;&eacute;quipe CONNEXION PROPHETIQUE</p>',
    '</div></div></div>',
  ].join('');
  await transporteur.sendMail({
    from: expediteur(env),
    replyTo: adresseReelle(env),
    to: destinataire,
    subject: 'Votre nouvelle carte de membre - CONNEXION PROPHETIQUE',
    text: texte,
    html,
    attachments: [{ filename: `carte-${matricule}.pdf`, content: pdf, contentType: 'application/pdf' }],
  });
}
