// Carte 119, 17 nov. 2026 : les courriels automatiques partent
// en documents HTML propres (doctype, html, head, body), sans
// changer le contenu visible, l'objet ni le destinataire.
// Tests purs, sans SMTP ni base. Lancer depuis server-production :
//   node --test tests/courriels_119.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  envelopperHtml,
  codeReinitialisationCourriel,
  anniversaireCourriel,
  certificatCourriel,
} from '../src/email.js';

function assertDocumentPropre(html, titre) {
  assert.ok(html.startsWith('<!DOCTYPE html>'), 'le document commence par le doctype');
  assert.match(html, /<html lang="fr">/);
  assert.match(html, /<head>/);
  assert.match(html, /<meta charset="utf-8">/);
  assert.ok(html.includes(`<title>${titre}</title>`), 'le titre reprend l’objet');
  assert.match(html, /<body/);
  assert.match(html, /<\/body>/);
  assert.match(html, /<\/html>/);
}

test('envelopperHtml : document propre, corps repris tel quel', () => {
  const corps = '<p>Bonjour,</p>';
  const html = envelopperHtml(corps, 'Objet du message');
  assertDocumentPropre(html, 'Objet du message');
  assert.ok(html.includes(corps), 'le corps est repris sans changement');
});

test('réinitialisation : sujet, code et lien repris, HTML en document propre', () => {
  const contenu = codeReinitialisationCourriel({ code: '123456' });
  assert.equal(contenu.sujet, 'Code de réinitialisation - CONNEXION PROPHETIQUE');
  assert.match(contenu.texte, /123456/);
  assert.match(contenu.texte, /30 minutes/);
  assertDocumentPropre(contenu.html, 'Code de réinitialisation - CONNEXION PROPHETIQUE');
  assert.match(contenu.html, /123456/);
  assert.match(contenu.html, /code=123456/);
  assert.match(contenu.html, /#0B1F3A/);
});

test('anniversaire : message d’Axel repris, HTML en document propre', () => {
  const contenu = anniversaireCourriel({
    nom: 'Jean-Claude Kouassi',
    dateIntegration: '12 mars 2024',
    referenceVerset: 'Jérémie 29:11',
  });
  assert.equal(contenu.sujet, 'Joyeux anniversaire - CONNEXION PROPHETIQUE');
  assert.match(contenu.texte, /Jean-Claude/);
  assertDocumentPropre(contenu.html, 'Joyeux anniversaire - CONNEXION PROPHETIQUE');
  assert.match(contenu.html, /Jean-Claude/);
  assert.match(contenu.html, /Jérémie 29:11/);
  assert.match(contenu.html, /#D4A72C/);
});

test('certificat : numéro repris, HTML en document propre', () => {
  const contenu = certificatCourriel({ nom: 'Test Membre', numero: 'CERT-000001' });
  assert.equal(contenu.sujet, "Votre certificat d'adhésion CERT-000001 - CONNEXION PROPHETIQUE");
  assert.match(contenu.texte, /CERT-000001/);
  assertDocumentPropre(contenu.html, "Votre certificat d'adhésion CERT-000001 - CONNEXION PROPHETIQUE");
  assert.match(contenu.html, /CERT-000001/);
  assert.match(contenu.html, /#0B1F3A/);
});
