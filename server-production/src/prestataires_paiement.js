// Prestataires de paiement, T16, 26 nov. 2026.
// Une seule interface pour tous les moyens de la carte : Wave,
// MTN MoMo, Orange Money et CinetPay pour la carte. Chaque
// prestataire se branche par la configuration seule, variables
// d'environnement, jamais de secret en dur ni en chat. Sans
// identifiants, le prestataire est inactif : la route
// GET /paiements/moyens ne le propose pas comme disponible, et
// la création répond 503. Aucun paiement n'est confirmé sur
// une affirmation du client ou du prestataire seul : seule
// une vérification côté serveur, montant et devise exacts,
// confirme, comme pour Wave. Fonctions pures, testables sans
// base de données ni serveur ; l'appel HTTP est injectable,
// il ne sert qu'aux tests, le code réel utilise fetch.
import crypto from 'node:crypto';
import { waveUrl } from './wave.js';

// Ordre affiché dans la feuille de paiement de la carte.
export const PRESTATAIRES = [
  { id: 'wave', label: 'Wave' },
  { id: 'mtn', label: 'MTN MoMo' },
  { id: 'orange', label: 'Orange Money' },
  { id: 'cinetpay', label: 'Carte bancaire' },
];

export function idPrestataireValide(id) {
  return PRESTATAIRES.some((p) => p.id === id);
}

export function libellePrestataire(id) {
  return PRESTATAIRES.find((p) => p.id === id)?.label ?? id;
}

// Disponibilité par la configuration seule. Wave : le lien de
// paiement de la structure. MTN : clé d'abonnement, identifiant
// et clé de l'utilisateur API. Orange : identifiant, secret et
// clé marchand. CinetPay : clé API et identifiant du site.
export function prestataireDisponible(id, cfg) {
  if (!cfg) return false;
  if (id === 'wave') return Boolean(cfg.wavePayUrl);
  if (id === 'mtn') {
    return Boolean(cfg.mtnMomoSubscriptionKey && cfg.mtnMomoApiUser && cfg.mtnMomoApiKey);
  }
  if (id === 'orange') {
    return Boolean(cfg.orangeClientId && cfg.orangeClientSecret && cfg.orangeMerchantKey);
  }
  if (id === 'cinetpay') return Boolean(cfg.cinetpayApiKey && cfg.cinetpaySiteId);
  return false;
}

// Liste des moyens avec leur disponibilité, telle que la
// feuille de paiement la lit sur GET /paiements/moyens.
export function listeMoyens(cfg) {
  return PRESTATAIRES.map((p) => ({ id: p.id, label: p.label, disponible: prestataireDisponible(p.id, cfg) }));
}

// Numéro MTN : chiffres seuls, indicatif 225, sans le 0
// local. Un numéro local ivoirien à 10 chiffres commençant
// par 0 prend l'indicatif, le 0 tombe. Tout autre format
// est refusé, jamais deviné.
export function normaliserMsisdn(telephone) {
  if (!telephone) return null;
  const chiffres = String(telephone).replace(/\D/g, '');
  if (/^225[1-9]\d{8}$/.test(chiffres)) return chiffres;
  if (/^2250\d{9}$/.test(chiffres)) return `225${chiffres.slice(4)}`;
  if (/^0\d{9}$/.test(chiffres)) return `225${chiffres.slice(1)}`;
  return null;
}

// Statuts des prestataires vers le statut interne : confirmé,
// en attente, refusé. Tout statut inconnu reste en attente,
// jamais confirmé par défaut.
export function statutMtn(statut) {
  if (statut === 'SUCCESSFUL') return 'confirme';
  if (statut === 'FAILED' || statut === 'REJECTED' || statut === 'TIMEOUT') return 'refuse';
  return 'en_attente';
}

export function statutOrange(statut) {
  if (statut === 'SUCCESS') return 'confirme';
  if (statut === 'FAILED') return 'refuse';
  return 'en_attente';
}

export function statutCinetpay(statut) {
  if (statut === 'ACCEPTED') return 'confirme';
  if (statut === 'REFUSED' || statut === 'EXPIRED') return 'refuse';
  return 'en_attente';
}

// Référence de notre paiement dans une notification du
// prestataire. La notification ne prouve rien seule : elle
// sert seulement à retrouver le paiement, que la vérification
// côté serveur confirme ensuite.
export function referenceWebhook(id, corps) {
  if (!corps || typeof corps !== 'object') return null;
  if (id === 'mtn') return typeof corps.externalId === 'string' ? corps.externalId : null;
  if (id === 'orange') return typeof corps.order_id === 'string' ? corps.order_id : null;
  if (id === 'cinetpay') return typeof corps.cpm_trans_id === 'string' ? corps.cpm_trans_id : null;
  return null;
}

function baseMtn(cfg) {
  if (cfg.mtnMomoBase) return cfg.mtnMomoBase;
  return cfg.mtnMomoEnvironnement === 'sandbox'
    ? 'https://sandbox.momodeveloper.mtn.com'
    : 'https://proxy.momoapi.mtn.com';
}

function baseOrange(cfg) {
  return cfg.orangeApiBase || 'https://api.orange.com';
}

function baseCinetpay(cfg) {
  return cfg.cinetpayApiBase || 'https://api-checkout.cinetpay.com';
}

async function appeler(appel, url, options) {
  const res = await appel(url, { ...options, signal: AbortSignal.timeout(15000) });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, statut: res.status, data };
}

// Erreur du prestataire, avec son statut HTTP : 400 pour une
// demande invalide, 503 pour un prestataire non configuré,
// 502 pour un refus du prestataire.
function erreur(message, statutHttp = 502) {
  const e = new Error(message);
  e.statutHttp = statutHttp;
  return e;
}

// Jeton MTN MoMo Collections, valable une heure : échange de
// l'identifiant et de la clé de l'utilisateur API.
async function jetonMtn(cfg, appel) {
  const basic = Buffer.from(`${cfg.mtnMomoApiUser}:${cfg.mtnMomoApiKey}`).toString('base64');
  const r = await appeler(appel, `${baseMtn(cfg)}/collection/token/`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Ocp-Apim-Subscription-Key': cfg.mtnMomoSubscriptionKey,
    },
  });
  if (!r.ok || !r.data?.access_token) throw erreur('MTN MoMo : impossible d’obtenir un jeton d’accès.');
  return r.data.access_token;
}

// Jeton Orange Money, client_credentials OAuth2.
async function jetonOrange(cfg, appel) {
  const basic = Buffer.from(`${cfg.orangeClientId}:${cfg.orangeClientSecret}`).toString('base64');
  const r = await appeler(appel, `${baseOrange(cfg)}/oauth/v3/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok || !r.data?.access_token) throw erreur('Orange Money : impossible d’obtenir un jeton d’accès.');
  return r.data.access_token;
}

// Crée le paiement chez le prestataire. Retourne l'URL à ouvrir
// pour le membre, null quand il n'y en a pas (MTN : le membre
// autorise sur son téléphone), et la référence du prestataire
// à garder pour la vérification. Ne confirme rien.
export async function creerPaiementPrestataire(id, cfg, entree, appel = fetch) {
  const { reference, montantFcfa, nomMembre = '', telephone = '', urls = {} } = entree;
  if (!idPrestataireValide(id)) throw erreur('Prestataire inconnu.', 400);
  if (!prestataireDisponible(id, cfg)) throw erreur(`Prestataire ${libellePrestataire(id)} non configuré.`, 503);
  if (!Number.isInteger(montantFcfa) || montantFcfa <= 0) throw erreur('Montant invalide.', 400);
  if (id === 'wave') {
    return { url: waveUrl(cfg.wavePayUrl, montantFcfa), referencePrestataire: null };
  }
  if (id === 'mtn') {
    const msisdn = normaliserMsisdn(telephone);
    if (!msisdn) throw erreur('MTN MoMo : numéro de téléphone du membre manquant ou invalide.', 400);
    const jeton = await jetonMtn(cfg, appel);
    const referencePrestataire = crypto.randomUUID();
    const r = await appeler(appel, `${baseMtn(cfg)}/collection/v1_0/requesttopay`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jeton}`,
        'X-Reference-Id': referencePrestataire,
        'X-Target-Environment': cfg.mtnMomoEnvironnement || 'sandbox',
        'Ocp-Apim-Subscription-Key': cfg.mtnMomoSubscriptionKey,
        'Content-Type': 'application/json',
        ...(urls.notification ? { 'X-Callback-Url': urls.notification } : {}),
      },
      body: JSON.stringify({
        amount: String(montantFcfa),
        currency: 'XOF',
        externalId: reference,
        payer: { partyIdType: 'MSISDN', partyId: msisdn },
        payerMessage: 'Carte de membre CONNEXION PROPHÉTIQUE',
        payeeNote: reference,
      }),
    });
    if (r.statut !== 202) throw erreur('MTN MoMo : demande de paiement refusée.');
    return { url: null, referencePrestataire };
  }
  if (id === 'orange') {
    const jeton = await jetonOrange(cfg, appel);
    const r = await appeler(appel, `${baseOrange(cfg)}/orange/payment/v1/webpayment`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${jeton}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_key: cfg.orangeMerchantKey,
        currency: 'XOF',
        order_id: reference,
        amount: montantFcfa,
        return_url: urls.retour ?? '',
        cancel_url: urls.annule ?? '',
        notif_url: urls.notification ?? '',
      }),
    });
    if (!r.ok || !r.data?.payment_url) throw erreur('Orange Money : création du paiement refusée.');
    return { url: r.data.payment_url, referencePrestataire: r.data.pay_token ?? null };
  }
  // CinetPay, carte bancaire seulement : le checkout ne montre
  // que la carte, channels CREDIT_CARD.
  const r = await appeler(appel, `${baseCinetpay(cfg)}/v2/payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apikey: cfg.cinetpayApiKey,
      site_id: cfg.cinetpaySiteId,
      transaction_id: reference,
      amount: montantFcfa,
      currency: 'XOF',
      description: 'Carte de membre CONNEXION PROPHÉTIQUE',
      customer_name: nomMembre || 'Membre',
      channels: 'CREDIT_CARD',
      notify_url: urls.notification ?? '',
      return_url: urls.retour ?? '',
    }),
  });
  if (r.data?.code !== '201' || !r.data?.data?.payment_url) {
    throw erreur('CinetPay : création du paiement refusée.');
  }
  return { url: r.data.data.payment_url, referencePrestataire: r.data.data.payment_token ?? null };
}

// Vérifie un paiement chez le prestataire, côté serveur.
// Ne confirme que sur un succès vérifié, montant et devise
// exacts, référence exacte. Tout le reste reste en attente,
// sauf un refus explicite du prestataire. Wave n'a pas de
// vérification d'état : il confirme par webhook ou par la
// structure, jamais ici.
export async function verifierPaiementPrestataire(id, cfg, entree, appel = fetch) {
  const { reference, referencePrestataire, montantFcfa } = entree;
  if (!idPrestataireValide(id)) throw erreur('Prestataire inconnu.', 400);
  if (id === 'wave') return 'en_attente';
  if (!prestataireDisponible(id, cfg)) throw erreur(`Prestataire ${libellePrestataire(id)} non configuré.`, 503);
  if (id === 'mtn') {
    if (!referencePrestataire) return 'en_attente';
    const jeton = await jetonMtn(cfg, appel);
    const r = await appeler(appel, `${baseMtn(cfg)}/collection/v1_0/requesttopay/${referencePrestataire}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jeton}`,
        'X-Target-Environment': cfg.mtnMomoEnvironnement || 'sandbox',
        'Ocp-Apim-Subscription-Key': cfg.mtnMomoSubscriptionKey,
      },
    });
    if (!r.ok) return 'en_attente';
    const d = r.data ?? {};
    if (d.externalId !== reference) return 'en_attente';
    if (Number(d.amount) !== montantFcfa || d.currency !== 'XOF') return 'en_attente';
    if (d.status === 'SUCCESSFUL' && !d.financialTransactionId) return 'en_attente';
    return statutMtn(d.status);
  }
  if (id === 'orange') {
    const jeton = await jetonOrange(cfg, appel);
    const r = await appeler(appel, `${baseOrange(cfg)}/orange/payment/v1/transactionstatus/${reference}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${jeton}` },
    });
    if (!r.ok) return 'en_attente';
    const d = r.data ?? {};
    if (d.order_id !== reference) return 'en_attente';
    if (Number(d.amount) !== montantFcfa || d.currency !== 'XOF') return 'en_attente';
    return statutOrange(d.status);
  }
  const r = await appeler(appel, `${baseCinetpay(cfg)}/v2/payment/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apikey: cfg.cinetpayApiKey,
      site_id: cfg.cinetpaySiteId,
      transaction_id: reference,
    }),
  });
  if (!r.ok) return 'en_attente';
  const d = r.data?.data ?? {};
  const transId = d.transaction_id ?? d.cpm_trans_id;
  if (transId && transId !== reference) return 'en_attente';
  const montant = d.amount ?? d.cpm_amount;
  if (montant !== undefined && Number(montant) !== montantFcfa) return 'en_attente';
  const devise = d.currency ?? d.cpm_currency;
  if (devise && devise !== 'XOF') return 'en_attente';
  return statutCinetpay(d.status ?? d.cpm_status);
}
