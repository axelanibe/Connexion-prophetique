// Règles des certificats d'adhésion, sans base de données ni serveur.
// Utilisé par routes_certificats.js et couvert par tests/certificats.test.js.
import crypto from 'node:crypto';

// Numéro public : CERT-000001. Séquentiel, unique, imprimé sur le PDF.
export function formaterNumero(n) {
  return `CERT-${String(n).padStart(6, '0')}`;
}

// Empreinte SHA-256 du PDF archivé, pour prouver qu'un fichier n'a pas été altéré.
export function empreinte(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

// Signature HMAC du couple numéro + matricule, avec un secret dédié (CERT_SECRET).
// Ne pas utiliser JWT_SECRET : sa rotation invaliderait tous les QR déjà imprimés.
export function signer(secret, numero, matricule) {
  return crypto.createHmac('sha256', secret).update(`${numero}|${matricule}`).digest('hex');
}

export function signatureValide(secret, numero, matricule, signature) {
  if (typeof signature !== 'string' || !/^[a-f0-9]{64}$/.test(signature)) return false;
  const attendue = Buffer.from(signer(secret, numero, matricule), 'hex');
  const fournie = Buffer.from(signature, 'hex');
  return attendue.length === fournie.length && crypto.timingSafeEqual(attendue, fournie);
}

export function urlVerification(baseUrl, numero, matricule, secret) {
  const url = new URL(`/certificats/verification/${encodeURIComponent(numero)}`, baseUrl);
  url.searchParams.set('matricule', matricule);
  url.searchParams.set('signature', signer(secret, numero, matricule));
  return url.toString();
}

// Date locale au format AAAA-MM-JJ, pour comparer sans décalage horaire.
function jourISO(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Un certificat n'est valide que si l'adhésion est validée, le compte actif
// et la carte non expirée. L'ordre des tests compte : la révocation prime.
export function etatCertificat(row, aujourdhui = new Date()) {
  if (!row) return 'introuvable';
  if (row.revoque_le) return 'revoque';
  if (row.statut_adhesion !== 'validee') return 'suspendu';
  if (!row.actif) return 'compte_inactif';
  const fin = typeof row.valide_jusqua === 'string'
    ? row.valide_jusqua.slice(0, 10)
    : jourISO(new Date(row.valide_jusqua));
  if (fin < jourISO(aujourdhui)) return 'expire';
  return 'valide';
}

// Seule une adhésion validée par le Bureau donne droit à un certificat.
export function peutEmettre(membre) {
  return membre?.statut_adhesion === 'validee';
}

export function escapeHtml(valeur) {
  return String(valeur ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const LIBELLES = {
  valide: { titre: 'Certificat valide', couleur: '#1b7f3b' },
  expire: { titre: 'Certificat expiré', couleur: '#8a6d00' },
  revoque: { titre: 'Certificat révoqué', couleur: '#b00020' },
  suspendu: { titre: 'Adhésion suspendue', couleur: '#b00020' },
  compte_inactif: { titre: 'Compte inactif', couleur: '#b00020' },
  introuvable: { titre: 'Certificat introuvable', couleur: '#555555' },
};

// Page lisible sur téléphone : c'est ce que voit une personne qui scanne le QR.
export function pageVerificationHtml({ etat, certificat }) {
  const { titre, couleur } = LIBELLES[etat] ?? LIBELLES.introuvable;
  const detail = certificat
    ? `<dl>
        <dt>Nom</dt><dd>${escapeHtml(certificat.nom_complet)}</dd>
        <dt>Numéro</dt><dd>${escapeHtml(certificat.numero)}</dd>
        <dt>Émis le</dt><dd>${escapeHtml(new Date(certificat.emis_le).toLocaleDateString('fr-FR'))}</dd>
        ${certificat.revoque_le ? `<dt>Motif de révocation</dt><dd>${escapeHtml(certificat.motif_revocation)}</dd>` : ''}
      </dl>`
    : '';
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vérification de certificat - Connexion Prophétique</title>
<style>
  body { font-family: system-ui, sans-serif; background: #f5f6f8; color: #0B1F3A; margin: 0; padding: 24px; }
  main { max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
  h1 { font-size: 20px; color: ${couleur}; margin: 0 0 16px; }
  dl { display: grid; grid-template-columns: max-content 1fr; gap: 8px 16px; margin: 0; }
  dt { font-weight: 600; color: #555; }
  dd { margin: 0; word-break: break-word; }
  footer { margin-top: 20px; font-size: 13px; color: #666; }
</style></head>
<body><main>
  <h1>${escapeHtml(titre)}</h1>
  ${detail}
  <footer>Connexion Prophétique — vérification officielle de l'adhésion.</footer>
</main></body></html>`;
}
