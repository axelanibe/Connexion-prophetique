// Fonctions Wave pures, testables sans base de données ni serveur.
// Premier module extrait de server.js, dans le cadre du découpage progressif
// de l'API. Les règles ne changent pas : montant exact en FCFA, signature
// HMAC SHA256 vérifiée à temps constant, horodatage rejeté après 5 minutes.
import crypto from 'node:crypto';

// Construit le lien Wave avec le montant exact, en nombre entier, en FCFA.
// Retourne null si le lien de base n'est pas configuré.
export function waveUrl(baseUrl, amount) {
  if (!baseUrl) return null;
  const u = new URL(baseUrl);
  u.searchParams.set('amount', String(amount));
  return u.toString();
}

// Vérifie la signature d'un webhook Wave.
// En-tête attendu : t=<timestamp>,v1=<hmac>, avec
// hmac = HMAC-SHA256(secret, timestamp + corps brut).
export function verifyWaveSignature(header, raw, secret) {
  if (!header || typeof raw !== 'string' || !secret) return false;
  const parts = String(header).split(',');
  const t = parts.find((p) => p.startsWith('t='))?.slice(2);
  const sigs = parts.filter((p) => p.startsWith('v1=')).map((p) => p.slice(3));
  const ts = Number(t);
  if (!t || !Number.isFinite(ts) || sigs.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - ts) > 300) return false;
  const expected = Buffer.from(crypto.createHmac('sha256', secret).update(t + raw).digest('hex'), 'hex');
  return sigs.some((s) => {
    let b;
    try {
      b = Buffer.from(s, 'hex');
    } catch {
      return false;
    }
    return b.length === expected.length && crypto.timingSafeEqual(b, expected);
  });
}

// Règle de rapprochement : un paiement en attente ne peut jamais être
// confirmé sur le montant seul. Si plusieurs paiements en attente partagent
// le même montant, le rapprochement passe en manuel, avec identifiant de
// transaction, date et numéro de l'expéditeur, puis validation explicite
// de la structure après contrôle de son compte Wave.
export function hasDuplicatePendingAmount(pendingAmounts, amount) {
  return pendingAmounts.filter((a) => a === amount).length > 1;
}
