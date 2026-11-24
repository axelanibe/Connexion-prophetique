// Correctifs 164, 165 et 166, 23 nov. 2026 : acceptation à
// froid, rattachement du rendu distant, et statistiques WebRTC.
// Aucun canal système, aucun réseau réel, aucun serveur.
import 'dart:convert';

import 'package:flutter_callkit_incoming/entities/entities.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:connexion_prophetique/appels_webrtc.dart';
import 'package:connexion_prophetique/push_notifications.dart';

void main() {
  group('Carte 164, acceptation à froid', () {
    test('le gestionnaire d’arrière-plan persiste l’acceptation', () async {
      SharedPreferences.setMockInitialValues({});
      final parametres = CallKitParams(
        id: 'a1',
        nameCaller: 'Jean',
        type: 1,
        extra: <String, dynamic>{
          'conversation_id': 'c1',
          'type_appel': 'video',
        },
      );
      await gererEvenementAppelArrierePlan(
        CallEventActionCallAccept(parametres),
      );
      final prefs = await SharedPreferences.getInstance();
      final brut = prefs.getString(cleAppelAccepteArrierePlan);
      expect(brut, isNotNull);
      final donnees = jsonDecode(brut!) as Map<String, dynamic>;
      expect(donnees['appel_id'], 'a1');
      expect(donnees['appelant_nom'], 'Jean');
      expect(donnees['conversation_id'], 'c1');
      expect(donnees['type_appel'], 'video');
    });

    test('un refus efface l’acceptation persistée', () async {
      SharedPreferences.setMockInitialValues({
        cleAppelAccepteArrierePlan: '{"appel_id":"a1"}',
      });
      final parametres = CallKitParams(id: 'a1', nameCaller: 'Jean');
      await gererEvenementAppelArrierePlan(
        CallEventActionCallDecline(parametres),
      );
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString(cleAppelAccepteArrierePlan), isNull);
    });

    test('la rejeu émet l’appel accepté, une seule fois', () async {
      SharedPreferences.setMockInitialValues({
        cleAppelAccepteArrierePlan: jsonEncode(<String, dynamic>{
          'appel_id': 'a1',
          'appelant_nom': 'Jean',
          'conversation_id': 'c1',
          'type_appel': 'video',
        }),
      });
      final recus = <Map<String, String>>[];
      final abonnement = PushNotifications.instance.onAppelEntrant.listen(
        recus.add,
      );
      await PushNotifications.instance.rejouerAcceptationArrierePlan();
      // Deuxième rejeu : la clé est effacée, rien ne se rejoue.
      await PushNotifications.instance.rejouerAcceptationArrierePlan();
      await abonnement.cancel();
      expect(recus.length, 1);
      expect(recus.first['appel_id'], 'a1');
      expect(recus.first['appelant_nom'], 'Jean');
      expect(recus.first['conversation_id'], 'c1');
      expect(recus.first['type_appel'], 'video');
      expect(recus.first['accepte_via_callkit'], 'true');
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getString(cleAppelAccepteArrierePlan), isNull);
    });

    test('la rejeu attend l’abonné, puis émet', () async {
      SharedPreferences.setMockInitialValues({
        cleAppelAccepteArrierePlan: jsonEncode(<String, dynamic>{
          'appel_id': 'a2',
          'appelant_nom': 'Marie',
          'conversation_id': 'c2',
          'type_appel': 'audio',
        }),
      });
      // Rejeu avant tout abonnement : rien ne se perd, l'accueil
      // s'abonne après init(), qui tourne sans attendre.
      await PushNotifications.instance.rejouerAcceptationArrierePlan();
      final recus = <Map<String, String>>[];
      final abonnement = PushNotifications.instance.onAppelEntrant.listen(
        recus.add,
      );
      // Laisse l'émission au premier abonné se produire.
      await Future<void>.delayed(Duration.zero);
      await abonnement.cancel();
      expect(recus.length, 1);
      expect(recus.first['appel_id'], 'a2');
      expect(recus.first['accepte_via_callkit'], 'true');
    });

    test('la demande batterie ne bloque jamais', () async {
      SharedPreferences.setMockInitialValues({
        'exemption_batterie_demandee': true,
      });
      // Hors Android, la demande est un non-opération ; le
      // contrat testé ici est qu'elle ne lève jamais.
      await demanderExemptionBatterieAuPremierAppel();
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getBool('exemption_batterie_demandee'), isTrue);
    });
  });

  group('Carte 165, rattachement du rendu distant', () {
    test('sans piste vidéo, jamais', () {
      expect(doitRattacherRenduDistant(null, null), isFalse);
      expect(doitRattacherRenduDistant('v1', null), isFalse);
    });

    test('première piste vidéo, oui', () {
      expect(doitRattacherRenduDistant(null, 'v1'), isTrue);
    });

    test('même piste, non', () {
      expect(doitRattacherRenduDistant('v1', 'v1'), isFalse);
    });

    test('piste changée, oui', () {
      expect(doitRattacherRenduDistant('v1', 'v2'), isTrue);
    });
  });

  group('Carte 166, statistiques WebRTC', () {
    List<StatsReport> rapports() => <StatsReport>[
      StatsReport('c1', 'codec', 1.0, {'mimeType': 'video/VP8'}),
      StatsReport('o1', 'outbound-rtp', 1.0, {
        'kind': 'video',
        'bytesSent': 200000,
        'packetsSent': 1000,
        'framesPerSecond': 24,
        'frameWidth': 640,
        'frameHeight': 480,
      }),
      StatsReport('r1', 'remote-inbound-rtp', 1.0, {
        'kind': 'video',
        'packetsLost': 3,
        'jitter': 0.012,
        'roundTripTime': 0.09,
      }),
      StatsReport('i1', 'inbound-rtp', 1.0, {
        'kind': 'video',
        'packetsLost': 1,
        'jitter': 0.008,
      }),
    ];

    test('résumé des mesures', () {
      final resume = resumerStatistiquesAppel(rapports());
      expect(resume['codecVideo'], 'VP8');
      expect(resume['octetsEnvoyes'], 200000);
      expect(resume['paquetsEnvoyes'], 1000);
      expect(resume['paquetsPerdusEnvoi'], 3);
      expect(resume['paquetsPerdusReception'], 1);
      expect(resume['gigueEnvoiMs'], closeTo(12.0, 0.01));
      expect(resume['gigueReceptionMs'], closeTo(8.0, 0.01));
      expect(resume['allerRetourMs'], closeTo(90.0, 0.01));
      expect(resume['imagesParSeconde'], 24);
      expect(resume['largeur'], 640);
      expect(resume['hauteur'], 480);
      // Sans précédent, pas de débit calculable.
      expect(resume['debitSortantKbitS'], isNull);
    });

    test('débit réel sur la différence des octets', () {
      final precedent = <String, dynamic>{
        'octetsEnvoyes': 100000,
        'horodatageMs':
            DateTime.now().millisecondsSinceEpoch - 10000,
      };
      final resume = resumerStatistiquesAppel(
        rapports(),
        precedent: precedent,
      );
      // 100 000 octets en 10 secondes : 80 kbit/s.
      expect(resume['debitSortantKbitS'], closeTo(80.0, 1.0));
    });

    test('rapports vides, résumé vide sans exception', () {
      final resume = resumerStatistiquesAppel([]);
      expect(resume['codecVideo'], isNull);
      expect(resume['paquetsPerdusEnvoi'], isNull);
      expect(formaterStatistiques(resume), contains('inconnu'));
    });

    test('format lisible et copiable', () {
      final texte = formaterStatistiques(resumerStatistiquesAppel(rapports()));
      expect(texte, contains('Codec vidéo : VP8'));
      expect(texte, contains('Paquets perdus (envoi) : 3'));
      expect(texte, contains('Résolution envoyée : 640x480'));
    });
  });
}
