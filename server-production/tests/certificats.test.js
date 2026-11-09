// Tests des règles de certificat, sans base de données.
// Lancer depuis server-production : node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formaterNumero, empreinte, signer, signatureValide, urlVerification,
  etatCertificat, peutEmettre, escapeHtml, pageVerificationHtml,
} from '../src/certificats.js';

const SECRET = 'x'.repeat(32);
const aujourdhui = new Date(2026, 10, 9); // 9 novembre 2026, heure locale

test('numéro au format CERT-000001', () => {
  assert.equal(formaterNumero(1), 'CERT-000001');
  assert.equal(formaterNumero(1234567), 'CERT-1234567');
});

test('empreinte SHA-256 stable et sensible au moindre octet', () => {
  const a = empreinte(Buffer.from('certificat'));
  assert.match(a, /^[a-f0-9]{64}$/);
  assert.equal(a, empreinte(Buffer.from('certificat')));
  assert.notEqual(a, empreinte(Buffer.from('certificaT')));
});

test('signature valide acceptée, altérée refusée', () => {
  const sig = signer(SECRET, 'CERT-000001', 'CP-AB-0001');
  assert.equal(signatureValide(SECRET, 'CERT-000001', 'CP-AB-0001', sig), true);
  assert.equal(signatureValide(SECRET, 'CERT-000002', 'CP-AB-0001', sig), false);
  assert.equal(signatureValide(SECRET, 'CERT-000001', 'CP-AB-0002', sig), false);
  assert.equal(signatureValide('autre-secret-de-32-caracteres!!', 'CERT-000001', 'CP-AB-0001', sig), false);
  assert.equal(signatureValide(SECRET, 'CERT-000001', 'CP-AB-0001', 'pas-une-signature'), false);
  assert.equal(signatureValide(SECRET, 'CERT-000001', 'CP-AB-0001', undefined), false);
});

test('URL de vérification contient numéro, matricule et signature', () => {
  const url = new URL(urlVerification('https://api.example.org', 'CERT-000007', 'CP-AB-0007', SECRET));
  assert.equal(url.pathname, '/certificats/verification/CERT-000007');
  assert.equal(url.searchParams.get('matricule'), 'CP-AB-0007');
  assert.equal(signatureValide(SECRET, 'CERT-000007', 'CP-AB-0007', url.searchParams.get('signature')), true);
});

test('seule une adhésion validée ouvre le droit au certificat', () => {
  assert.equal(peutEmettre({ statut_adhesion: 'validee' }), true);
  assert.equal(peutEmettre({ statut_adhesion: 'en_attente' }), false);
  assert.equal(peutEmettre({ statut_adhesion: 'suspendue' }), false);
  assert.equal(peutEmettre(null), false);
});

const base = { statut_adhesion: 'validee', actif: true, valide_jusqua: '2027-06-30', revoque_le: null };

test('etat : valide pour un membre validé à jour', () => {
  assert.equal(etatCertificat(base, aujourdhui), 'valide');
});

test('etat : la révocation prime sur tout le reste', () => {
  assert.equal(etatCertificat({ ...base, revoque_le: new Date(), statut_adhesion: 'suspendue' }, aujourdhui), 'revoque');
});

test('etat : suspendu, compte inactif, expiré, introuvable', () => {
  assert.equal(etatCertificat({ ...base, statut_adhesion: 'suspendue' }, aujourdhui), 'suspendu');
  assert.equal(etatCertificat({ ...base, actif: false }, aujourdhui), 'compte_inactif');
  assert.equal(etatCertificat({ ...base, valide_jusqua: '2026-11-08' }, aujourdhui), 'expire');
  assert.equal(etatCertificat(null, aujourdhui), 'introuvable');
});

test('etat : carte valable le jour même de son échéance', () => {
  assert.equal(etatCertificat({ ...base, valide_jusqua: '2026-11-09' }, aujourdhui), 'valide');
});

test('escapeHtml neutralise les balises dans le nom', () => {
  assert.equal(escapeHtml('<script>"a"&\'b\'</script>'),
    '&lt;script&gt;&quot;a&quot;&amp;&#39;b&#39;&lt;/script&gt;');
});

test('page de vérification : nom malveillant échappé, statut affiché', () => {
  const html = pageVerificationHtml({
    etat: 'valide',
    certificat: { nom_complet: '<img src=x onerror=alert(1)>', numero: 'CERT-000001', emis_le: '2026-11-09', revoque_le: null },
  });
  assert.ok(!html.includes('<img src=x'));
  assert.ok(html.includes('Certificat valide'));
});

test('page de vérification : motif de révocation affiché', () => {
  const html = pageVerificationHtml({
    etat: 'revoque',
    certificat: { nom_complet: 'Test', numero: 'CERT-000002', emis_le: '2026-11-09',
      revoque_le: new Date(), motif_revocation: 'Erreur de saisie' },
  });
  assert.ok(html.includes('Certificat révoqué'));
  assert.ok(html.includes('Erreur de saisie'));
});
