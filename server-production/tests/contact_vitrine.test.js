// Formulaire de contact de la vitrine, audit de lancement, 22 nov. 2026 :
// tests purs, sans SMTP ni base. Lancer depuis server-production :
//   node --test tests/contact_vitrine.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { SUJETS_CONTACT, validerMessageContact } from '../src/contact.js';
import { messageContactCourriel, envoyerMessageContact } from '../src/email.js';

const valide = {
  nom: 'Jean Kouassi',
  email: 'jean@example.com',
  telephone: '+225 07 00 00 00',
  sujet: 'Camps',
  message: 'Bonjour, je voudrais des renseignements sur le prochain camp.',
  actus: true,
  site: '',
};

test('validation : corps valide accepté, quatre sujets fermés', () => {
  assert.equal(SUJETS_CONTACT.length, 4);
  const b = validerMessageContact(valide);
  assert.equal(b.nom, 'Jean Kouassi');
  assert.equal(b.email, 'jean@example.com');
  assert.equal(b.sujet, 'Camps');
  assert.equal(b.actus, true);
  assert.equal(b.site, '');
});

test('validation : e-mail invalide, sujet inconnu, message trop court, nom trop court rejetés', () => {
  assert.throws(() => validerMessageContact({ ...valide, email: 'pas-un-email' }));
  assert.throws(() => validerMessageContact({ ...valide, sujet: 'Autre' }));
  assert.throws(() => validerMessageContact({ ...valide, message: 'court' }));
  assert.throws(() => validerMessageContact({ ...valide, nom: 'A' }));
});

test('validation : champ piège accepté par la validation, la route le traite', () => {
  const b = validerMessageContact({ ...valide, site: 'http://spam.example' });
  assert.equal(b.site, 'http://spam.example');
});

test('courriel : objet, contenu repris, HTML échappé, document propre', () => {
  const contenu = messageContactCourriel({ ...valide, message: '<script>alert(1)</script> Bonjour' });
  assert.equal(contenu.sujet, 'Contact vitrine : Camps - CONNEXION PROPHETIQUE');
  assert.match(contenu.texte, /Jean Kouassi/);
  assert.match(contenu.texte, /jean@example.com/);
  assert.match(contenu.texte, /Camps/);
  assert.match(contenu.texte, /Actualités : Oui/);
  assert.ok(!contenu.html.includes('<script>alert(1)</script>'), 'le contenu est échappé');
  assert.match(contenu.html, /&lt;script&gt;/);
  assert.ok(contenu.html.startsWith('<!DOCTYPE html>'), 'le document commence par le doctype');
});

test('courriel : sans actualités, la mention dit Non', () => {
  const contenu = messageContactCourriel({ ...valide, actus: false });
  assert.match(contenu.texte, /Actualités : Non/);
});

test('envoi : sans SMTP, erreur SMTP_NON_CONFIGURE, sans envoi simulé', async () => {
  await assert.rejects(
    () => envoyerMessageContact(valide, {}),
    (e) => e.code === 'SMTP_NON_CONFIGURE',
  );
});
