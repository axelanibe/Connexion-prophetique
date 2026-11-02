// Envoi de notifications poussées Android par Firebase Cloud
// Messaging, API HTTP v1, 2 nov. 2026.
//
// Règles dures, calquées sur wave.js et email.js :
// - Aucune clé, aucun secret, aucun compte de service en dur,
//   jamais dans le dépôt, jamais dans le chat. La seule source est
//   la variable d'environnement FIREBASE_SERVICE_ACCOUNT_JSON,
//   saisie dans Render seulement, contenant le JSON complet du
//   compte de service Firebase, tel que téléchargé depuis la
//   console Firebase. Sans cette variable, l'envoi est ignoré
//   silencieusement, la cloche interne continue, et aucune erreur
//   ne remonte vers l'action principale.
// - Aucune dépendance nouvelle : l'échange OAuth2 est fait à la
//   main avec node:crypto et fetch, comme la signature Wave, pour
//   ne pas ajouter de surface de dépendance au serveur.
// - Le serveur ne fait jamais transiter de contenu sensible : ni
//   sujet de prière, ni mot de passe, ni montant privé. Les
//   poussées ne portent que titre, message court et lien déjà
//   présents dans la cloche, sans email, sans téléphone.
// - Un jeton invalide, UNREGISTERED ou INVALID_ARGUMENT, est
//   désactivé par l'appelant, sans planter l'envoi aux autres.
// - Le message porte toujours notification et data : notification
//   pour que Android affiche la bannière quand l'application est
//   fermée, data pour que le toucher ouvre la bonne page, avec
//   type, lien_type et lien_id, jamais de jeton, jamais de secret.
import crypto from 'node:crypto';

const FCM_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const FCM_TOKEN_URL = 'https://oauth2.googleapis.com/token';

let cachedAccessToken = null;
let cachedAccessTokenExpire = 0;

// Lecture du compte de service, sans jamais le journaliser, sans
// jamais le renvoyer. Retourne null si absent ou invalide.
export function fcmServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.client_email || !parsed.private_key || !parsed.project_id) return null;
    return parsed;
  } catch {
    return null;
  }
}

function base64Url(buffer) {
  return Buffer.from(buffer)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

// Jeton d'accès OAuth2, mis en cache jusqu'à 5 minutes avant son
// expiration, pour ne pas signer à chaque envoi. En cas d'échec,
// l'erreur remonte à l'appelant, qui l'ignore au mieux.
export async function fcmAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  if (cachedAccessToken && cachedAccessTokenExpire > now + 300) return cachedAccessToken;
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64Url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: FCM_SCOPE,
      aud: FCM_TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claims}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key);
  const assertion = `${unsigned}.${base64Url(signature)}`;
  const res = await fetch(FCM_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }).toString(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) throw new Error('FCM : échange OAuth2 refusé.');
  cachedAccessToken = data.access_token;
  cachedAccessTokenExpire = now + Number(data.expires_in ?? 3600);
  return cachedAccessToken;
}

// Envoi à un seul jeton. Retourne { ok: true } ou
// { ok: false, invalide: true } si le jeton doit être désactivé.
// Toute autre erreur remonte, pour être ignorée au mieux par
// l'appelant, sans jamais faire échouer l'action principale.
export async function fcmSendOne(serviceAccount, accessToken, jeton, titre, message, data) {
  const url = `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      message: {
        token: jeton,
        notification: { title: titre, body: message },
        data: {
          type: data.type ?? '',
          lien_type: data.lien_type ?? '',
          lien_id: data.lien_id ?? '',
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
        android: {
          priority: 'high',
          notification: { channel_id: 'push_connexion', sound: 'default' },
        },
      },
    }),
  });
  if (res.ok) return { ok: true };
  const body = await res.json().catch(() => ({}));
  const status = body?.error?.status ?? '';
  const details = Array.isArray(body?.error?.details) ? body.error.details : [];
  const reason = details
    .flatMap((d) => (Array.isArray(d.errorCode) ? d.errorCode : []))
    .join(' ');
  if (status === 'UNREGISTERED' || status === 'INVALID_ARGUMENT' || reason.includes('UNREGISTERED')) {
    return { ok: false, invalide: true };
  }
  throw new Error(`FCM : envoi refusé, statut ${status || res.status}.`);
}
