// Tests de la présence au culte, tranches 2 à 5, 21 nov. 2026.
// Aides pures de lib/presence_culte.dart et modèle TempsFort de
// lib/camp_planning.dart, sans serveur ni réseau.
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/camp_planning.dart';
import 'package:connexion_prophetique/presence_culte.dart';

void main() {
  group('extraitTexte', () {
    test('texte court inchangé, texte long coupé avec …', () {
      expect(extraitTexte('Bonjour', 280), 'Bonjour');
      expect(extraitTexte('x' * 280, 280), 'x' * 280);
      expect(extraitTexte('x' * 281, 280), '${'x' * 280}…');
      expect(extraitTexte('abc def   ', 7), 'abc def…');
    });
  });

  group('texteCommentaireValide', () {
    test('1 à 1000 caractères', () {
      expect(texteCommentaireValide(''), isFalse);
      expect(texteCommentaireValide('   '), isFalse);
      expect(texteCommentaireValide('Amen !'), isTrue);
      expect(texteCommentaireValide('x' * 1000), isTrue);
      expect(texteCommentaireValide('x' * 1001), isFalse);
      expect(longueurMaxTexteCommentaire, 1000);
    });
  });

  group('textePartageMur', () {
    test('un texte par kind, jamais vide', () {
      expect(
        textePartageMur(ElementMur(kind: 'enseignement', id: '1', titre: 'La foi', auteurNom: 'Pasteur Test')),
        'La foi — Pasteur Test\nCONNEXION PROPHETIQUE',
      );
      expect(
        textePartageMur(ElementMur(kind: 'actualite', id: '1', titre: 'Rentrée des cellules')),
        'Rentrée des cellules\nCONNEXION PROPHETIQUE',
      );
      expect(
        textePartageMur(ElementMur(kind: 'annonce', id: '1', titre: 'Culte spécial')),
        'Culte spécial\nCONNEXION PROPHETIQUE',
      );
      expect(
        textePartageMur(ElementMur(kind: 'camp', id: '1', titre: 'Kairos', lieu: 'Bingerville')),
        'Camp Kairos — Bingerville\nCONNEXION PROPHETIQUE',
      );
      expect(
        textePartageMur(ElementMur(kind: 'temoignage', id: '1', texte: 'Dieu m’a relevé.', auteurNom: 'Marie Test')),
        '« Dieu m’a relevé. » — Marie Test\nCONNEXION PROPHETIQUE',
      );
      expect(
        textePartageMur(ElementMur(kind: 'temoignage', id: '1', texte: 'Dieu m’a relevé.')),
        '« Dieu m’a relevé. »\nCONNEXION PROPHETIQUE',
      );
    });
  });

  group('ElementMur.fromJson', () {
    test('cinq kinds, champs manquants en vide', () {
      final e = ElementMur.fromJson({'kind': 'camp', 'id': 'abc', 'titre': 'Kairos', 'date': '2027-08-22'});
      expect(e.kind, 'camp');
      expect(e.id, 'abc');
      expect(e.titre, 'Kairos');
      expect(e.texte, '');
      expect(e.date, DateTime(2027, 8, 22));
      expect(e.auteurNom, '');
      expect(e.lieu, '');
      final vide = ElementMur.fromJson({});
      expect(vide.kind, '');
      expect(vide.id, '');
      expect(vide.date, isNull);
    });
  });

  group('CommentaireMur.fromJson', () {
    test('auteur, texte, est_auteur', () {
      final c = CommentaireMur.fromJson({
        'id': 'c1',
        'auteur_nom': 'Marie Test',
        'texte': 'Merci !',
        'cree_le': '2026-11-21T20:00:00.000Z',
        'est_auteur': true,
      });
      expect(c.auteurNom, 'Marie Test');
      expect(c.texte, 'Merci !');
      expect(c.estAuteur, isTrue);
      expect(c.creeLe, DateTime.utc(2026, 11, 21, 20));
      expect(c.parentId, isNull);
      expect(CommentaireMur.fromJson({}).estAuteur, isFalse);
    });

    test('parent_id lu pour une réponse', () {
      final c = CommentaireMur.fromJson({
        'id': 'c2',
        'parent_id': 'c1',
        'auteur_nom': 'Grace L',
        'texte': 'Amen',
        'cree_le': '2026-11-21T20:00:00.000Z',
        'est_auteur': false,
      });
      expect(c.parentId, 'c1');
      expect(c.estAuteur, isFalse);
    });
  });

  group('dateCourteMur', () {
    test('jour/mois/année', () {
      expect(dateCourteMur(DateTime(2027, 8, 22)), '22/08/2027');
      expect(dateCourteMur(DateTime(2026, 1, 5)), '05/01/2026');
      expect(dateCourteMur(null), '');
    });
  });

  group('TempsFort', () {
    test('fromJson et adresse de la photo', () {
      final t = TempsFort.fromJson({
        'id': 'tf1',
        'titre': 'Soirée d’édification',
        'texte': 'Un beau moment.',
        'image_id': 'img-123',
        'publie_le': '2026-11-21T20:00:00.000Z',
      });
      expect(t.titre, 'Soirée d’édification');
      expect(t.texte, 'Un beau moment.');
      expect(t.imageUrl, 'https://connexion-prophetique.onrender.com/fichiers/img-123');
      expect(t.publieLe, DateTime.utc(2026, 11, 21, 20));
      expect(TempsFort.fromJson({'id': 'tf2'}).imageUrl, '');
    });
  });
}
