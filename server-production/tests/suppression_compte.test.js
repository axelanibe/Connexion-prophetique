// Tests purs de la suppression de son propre compte, carte 92,
// 7 nov. 2026, suppression douce, 30 jours : aucun serveur,
// aucune base, aucune donnee reelle. Lancer depuis
// server-production :
//   node --test tests/suppression_compte.test.js
// La logique vit dans src/suppression_compte.js, importe par
// server.js pour les routes DELETE /moi/compte et
// POST /moi/compte/annuler. Les routes elles-memes ne sont pas
// testees ici, faute de base dans ce dossier de tests, et
// l'effacement definitif apres 30 jours est teste a part dans
// tests/effacement_compte.test.js, sur le meme modele pur.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUPPRESSION_DELAI_JOURS,
  dateEffacementDefinitif,
  suppressionAnnulable,
  validerSuppressionPropreCompte,
  validerAnnulationSuppression,
  texteSuppressionPropreCompte,
} from '../src/suppression_compte.js';

test('le delai est de 30 jours', () => {
  assert.equal(SUPPRESSION_DELAI_JOURS, 30);
});

test('la date d effacement est 30 jours apres la demande', () => {
  assert.equal(
    dateEffacementDefinitif('2026-11-07T10:00:00.000Z').toISOString(),
    '2026-12-07T10:00:00.000Z',
  );
  assert.equal(dateEffacementDefinitif('pas une date'), null);
});

test('l annulation est possible avant la date, jamais apres', () => {
  const fin = '2026-12-07T10:00:00.000Z';
  assert.equal(suppressionAnnulable(fin, new Date('2026-11-07T10:00:00.000Z')), true);
  assert.equal(suppressionAnnulable(fin, new Date('2026-12-07T09:59:59.000Z')), true);
  assert.equal(suppressionAnnulable(fin, new Date('2026-12-07T10:00:00.000Z')), false);
  assert.equal(suppressionAnnulable(fin, new Date('2026-12-08T10:00:00.000Z')), false);
  assert.equal(suppressionAnnulable(null), false);
  assert.equal(suppressionAnnulable('pas une date'), false);
});

test('dernier administrateur general refuse, 409', () => {
  const refus = validerSuppressionPropreCompte({
    role: 'admin_general',
    autresAdminsGeneraux: 0,
    motDePasseVerifie: true,
    aHash: true,
  });
  assert.equal(refus.statut, 409);
  assert.equal(refus.message, 'Impossible de supprimer le dernier administrateur général.');
});

test('administrateur general non dernier autorise', () => {
  assert.equal(
    validerSuppressionPropreCompte({
      role: 'admin_general',
      autresAdminsGeneraux: 1,
      motDePasseVerifie: true,
      aHash: true,
    }),
    null,
  );
});

test('membre simple autorise', () => {
  assert.equal(
    validerSuppressionPropreCompte({
      role: 'membre',
      autresAdminsGeneraux: 0,
      motDePasseVerifie: true,
      aHash: true,
    }),
    null,
  );
});

test('mot de passe faux refuse, 401', () => {
  const refus = validerSuppressionPropreCompte({
    role: 'membre',
    autresAdminsGeneraux: 0,
    motDePasseVerifie: false,
    aHash: true,
  });
  assert.equal(refus.statut, 401);
  assert.equal(refus.message, 'Mot de passe incorrect.');
});

test('pas de hash refuse, 403, avant meme le mot de passe', () => {
  const refus = validerSuppressionPropreCompte({
    role: 'membre',
    autresAdminsGeneraux: 0,
    motDePasseVerifie: false,
    aHash: false,
  });
  assert.equal(refus.statut, 403);
  assert.equal(refus.message, 'Suppression impossible pour ce compte.');
});

test('suppression deja demandee refusee, 409', () => {
  assert.equal(
    validerSuppressionPropreCompte({
      role: 'membre',
      autresAdminsGeneraux: 0,
      motDePasseVerifie: true,
      aHash: true,
      suppressionDejaDemandee: true,
    }).statut,
    409,
  );
});

test('annulation autorisee avant la date, refusee apres, ou sans demande', () => {
  assert.equal(
    validerAnnulationSuppression({
      supprimeLe: '2026-12-07T10:00:00.000Z',
      maintenant: new Date('2026-11-07T10:00:00.000Z'),
    }),
    null,
  );
  assert.equal(
    validerAnnulationSuppression({
      supprimeLe: '2026-12-07T10:00:00.000Z',
      maintenant: new Date('2026-12-08T10:00:00.000Z'),
    }).statut,
    409,
  );
  assert.equal(validerAnnulationSuppression({ supprimeLe: null }).statut, 409);
  assert.equal(
    validerAnnulationSuppression({ supprimeLe: undefined }).message,
    'Aucune suppression demandée.',
  );
});

test('le texte decrit la suppression douce, 30 jours', () => {
  const texte = texteSuppressionPropreCompte();
  assert.ok(texte.includes('30 jours'));
  assert.ok(texte.includes('reconnecter pour annuler'));
  assert.ok(texte.includes('compte supprimé'));
  assert.ok(texte.includes('matricule jamais réutilisé'));
});
