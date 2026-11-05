// Tests purs de l'attestation, modèle unique, 5 nov. 2026 : aucun
// serveur, aucune base, aucune donnée réelle. Lancer depuis
// server-production :
//   node --test tests/attestation.test.js
// Le gabarit est la copie exacte du fichier approuvé avec le
// monogramme CP officiel, seules les données dynamiques sont des
// jetons {{...}}, et la signature simulée du fichier d'origine
// est retirée, ligne vide à apposer à la main.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { attestationHtml, attestationEchapper, attestationDateTexte } from '../src/attestation.js';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const gabarit = fs.readFileSync(path.join(dossier, '..', 'src', 'attestation.html'), 'utf8');

const complete = {
  type: 'benevolat',
  membre_nom: 'Anibe Adja Maurice Axel',
  matricule: 'CP-AA-2526',
  etablissement: 'Groupe Scolaire Céleste',
  activite: 'Camp National Kairos',
  role_service: 'Organisateur',
  date_debut: '2027-08-22',
  date_fin: '2027-08-28',
  delivre_le: '2026-11-05',
  reference: 'ATT-2026-0001',
};

const minimale = {
  type: 'participation',
  membre_nom: 'Membre Test',
  matricule: 'CP-AA-9999',
  etablissement: null,
  activite: 'Retraite',
  role_service: null,
  date_debut: null,
  date_fin: null,
  delivre_le: '2026-11-05',
  reference: 'ATT-2026-0002',
};

test('le gabarit garde le monogramme officiel en base64, 56 px, bordure or', () => {
  const m = gabarit.match(/<img src="data:image\/png;base64,([A-Za-z0-9+/=]+)"[^>]*class="w-14 h-14 rounded-xl border-2 border-\[#C9A84C\] shadow-md">/);
  assert.ok(m, 'image du monogramme, w-14 h-14, bordure or');
  const png = Buffer.from(m[1], 'base64');
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'signature PNG');
  assert.equal(png.readUInt32BE(16), 256, 'largeur 256 px');
  assert.equal(png.readUInt32BE(20), 256, 'hauteur 256 px');
});

test('le gabarit ne contient plus aucune donnée d’exemple ni signature dessinée', () => {
  for (const interdit of ['KOUAME', 'CP-KK-2531', 'CAMP NATIONAL', '03/11/2026', 'ATT-2026-0001', 'Simulated Calligraphic', 'calligraphic']) {
    assert.ok(!gabarit.includes(interdit), interdit);
  }
  assert.ok(gabarit.includes('Ligne de signature vide, à apposer à la main'), 'ligne vide');
  assert.ok(gabarit.includes('Sceau Officiel'), 'sceau en texte gardé');
  assert.ok(gabarit.includes('page-a4'), 'page A4');
  assert.ok(gabarit.includes('window.print()'), 'bouton Imprimer du modèle');
});

test('le rendu bénévolat complet remplit chaque champ, sans jeton restant', () => {
  const html = attestationHtml(complete, gabarit);
  assert.ok(!html.includes('{{'), 'aucun jeton restant');
  assert.ok(html.includes('Attestation de Bénévolat'), 'titre');
  assert.ok(html.includes('ANIBE ADJA MAURICE AXEL'), 'nom en majuscules');
  assert.ok(html.includes('MATRICULE : CP-AA-2526'), 'matricule');
  assert.ok(html.includes('ÉTABLISSEMENT : GROUPE SCOLAIRE CÉLESTE'), 'établissement');
  assert.ok(html.includes('Camp National Kairos'), 'activité');
  assert.ok(html.includes('Rôle ou service : Organisateur.'), 'rôle');
  assert.ok(html.includes('Période : du 22/08/2027 au 28/08/2027.'), 'période');
  assert.ok(html.includes('Fait et délivré le'), 'délivrance');
  assert.ok(html.includes('05/11/2026'), 'date de délivrance');
  assert.ok(html.includes('Référence : ATT-2026-0001'), 'référence');
  assert.ok(html.includes('a rendu un service bénévole remarquable'), 'corps bénévolat');
});

test('le rendu participation minimal omet établissement, rôle et période', () => {
  const html = attestationHtml(minimale, gabarit);
  assert.ok(!html.includes('{{'), 'aucun jeton restant');
  assert.ok(html.includes('Attestation de Participation'), 'titre');
  assert.ok(html.includes('MEMBRE TEST'), 'nom');
  assert.ok(!html.includes('ÉTABLISSEMENT'), 'pas d’établissement');
  assert.ok(!html.includes('Rôle ou service'), 'pas de rôle');
  assert.ok(!html.includes('Période'), 'pas de période');
  assert.ok(!html.includes('Date :'), 'pas de date d’activité');
  assert.ok(html.includes('a participé à l'), 'corps participation');
});

test('les valeurs dynamiques sont échappées, jamais injectées', () => {
  const html = attestationHtml({ ...minimale, membre_nom: '<script>alert(1)</script>', activite: 'Camp & Retraite' }, gabarit);
  assert.ok(!html.includes('<script>alert(1)</script>'), 'pas de script injecté');
  assert.ok(!html.includes('<script>'), 'aucune balise script restante');
  assert.ok(html.includes('&lt;SCRIPT&gt;'), 'nom échappé, en majuscules comme dans le modèle');
  assert.ok(html.includes('Camp &amp; Retraite'), 'activité échappée');
  assert.equal(attestationEchapper('a"b\'c'), 'a&quot;b&#39;c');
  assert.equal(attestationDateTexte('2027-08-22'), '22/08/2027');
  assert.equal(attestationDateTexte(null), null);
});
