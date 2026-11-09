// Test de fumée : génère un certificat d'exemple et vérifie le fichier.
// À lancer après npm install :  node scripts/smoke_certificat_pdf.js
import fs from 'node:fs';
import { genererCertificatPdf } from '../src/generer_certificat_pdf.js';

const pdf = await genererCertificatPdf({
  numero: 'CERT-000001',
  matricule: 'CP-AB-0001',
  nom_complet: 'Marie-Claire Kouassi',
  url: `https://api.example.org/certificats/verification/CERT-000001?matricule=CP-AB-0001&signature=${'a'.repeat(64)}`,
  inscrit_le: '2026-10-01',
  valide_jusqua: '2027-10-01',
  emis_le: new Date('2026-11-09T10:00:00Z'),
});

const sortie = process.argv[2] ?? '/tmp/certificat-exemple.pdf';
fs.writeFileSync(sortie, pdf);

const texte = pdf.toString('latin1');
const pages = (texte.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
const verifs = [
  ['en-tête PDF', pdf.subarray(0, 5).toString() === '%PDF-'],
  ['taille raisonnable', pdf.length > 3000 && pdf.length < 2_000_000],
  ['une seule page', pages === 1],
  ['titre renseigné', texte.includes('/Title')],
];
for (const [nom, ok] of verifs) console.log(`${ok ? 'OK ' : 'ERREUR'} ${nom}`);
console.log(`Fichier : ${sortie} (${pdf.length} octets)`);
if (verifs.some(([, ok]) => !ok)) process.exit(1);
