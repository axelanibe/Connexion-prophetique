// Carte 117, 9 nov. 2026 : la signature se dessine, la liste ne
// vole plus le trait vertical. Listener et événements pointeur
// bruts, défilement bloqué pendant le tracé, export en data URL
// PNG avec limite 200 Ko. Ces tests vérifient la zone et le
// branchement avec la liste, sans serveur : le message distinct
// selon l'issue de l'envoi et l'enregistrement lui-même se
// vérifient sur le téléphone, la page appelant l'API globale.
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:connexion_prophetique/signature_admin.dart';

/// Trace un trait vertical au doigt, comme le ferait un membre.
Future<void> _tracerTraitVertical(WidgetTester tester, Offset centre) async {
  final geste = await tester.startGesture(centre);
  await geste.moveBy(const Offset(0, 20));
  await geste.moveBy(const Offset(3, 20));
  await geste.moveBy(const Offset(-3, 20));
  await geste.moveBy(const Offset(0, 20));
  await geste.up();
  await tester.pump();
}

Future<void> _pomperZone(
  WidgetTester tester,
  GlobalKey<ZoneSignatureState> cle, {
  ValueChanged<bool>? onDessinEnCours,
}) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: ZoneSignature(
          key: cle,
          onDessinEnCours: onDessinEnCours ?? (_) {},
        ),
      ),
    ),
  );
  await tester.pump();
}

/// Liste et zone branchées comme sur la page Ma signature : le
/// défilement est bloqué pendant le tracé, libre sinon.
class _ListeEtZoneTest extends StatefulWidget {
  const _ListeEtZoneTest();

  @override
  State<_ListeEtZoneTest> createState() => _ListeEtZoneTestState();
}

class _ListeEtZoneTestState extends State<_ListeEtZoneTest> {
  bool _dessinEnCours = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: ListView(
          physics: _dessinEnCours
              ? const NeverScrollableScrollPhysics()
              : const AlwaysScrollableScrollPhysics(),
          children: [
            ZoneSignature(
              onDessinEnCours: (actif) => setState(() => _dessinEnCours = actif),
            ),
            const SizedBox(height: 2000),
          ],
        ),
      ),
    );
  }
}

void main() {
  testWidgets('un trait vertical au doigt enregistre des points', (tester) async {
    var dessinEnCours = false;
    final cle = GlobalKey<ZoneSignatureState>();
    await _pomperZone(tester, cle, onDessinEnCours: (actif) => dessinEnCours = actif);
    final zone = cle.currentState!;
    expect(zone.estVide, isTrue);

    final centre = tester.getCenter(find.byType(ZoneSignature));
    final geste = await tester.startGesture(centre);
    expect(dessinEnCours, isTrue);
    await geste.moveBy(const Offset(0, 20));
    await geste.moveBy(const Offset(2, 20));
    await geste.moveBy(const Offset(-2, 20));
    await geste.up();
    await tester.pump();

    expect(dessinEnCours, isFalse);
    expect(zone.estVide, isFalse);
  });

  testWidgets('un simple toucher laisse un point, la zone n’est plus vide', (tester) async {
    final cle = GlobalKey<ZoneSignatureState>();
    await _pomperZone(tester, cle);
    final zone = cle.currentState!;
    final centre = tester.getCenter(find.byType(ZoneSignature));
    final geste = await tester.startGesture(centre);
    await geste.up();
    await tester.pump();
    expect(zone.estVide, isFalse);
    // toImage passe par le moteur, en asynchrone réel : hors de la
    // fausse zone asynchrone des tests, sans runAsync, il n'aboutit
    // jamais. Sur le téléphone, aucun runAsync n'est nécessaire.
    final dataUrl = await tester.runAsync(() => zone.exporterDataUrl());
    expect(dataUrl, startsWith('data:image/png;base64,'));
  });

  testWidgets('effacer vide la zone, retirer le dernier trait ne retire qu’un trait', (tester) async {
    final cle = GlobalKey<ZoneSignatureState>();
    await _pomperZone(tester, cle);
    final zone = cle.currentState!;
    final centre = tester.getCenter(find.byType(ZoneSignature));
    await _tracerTraitVertical(tester, centre);
    await _tracerTraitVertical(tester, centre.translate(40, 0));
    expect(zone.estVide, isFalse);

    zone.retirerDernierTrait();
    await tester.pump();
    expect(zone.estVide, isFalse);

    zone.effacer();
    await tester.pump();
    expect(zone.estVide, isTrue);
  });

  testWidgets('exporterDataUrl rend une data URL PNG valide, sous la limite de 200 Ko', (tester) async {
    final cle = GlobalKey<ZoneSignatureState>();
    await _pomperZone(tester, cle);
    final zone = cle.currentState!;
    final centre = tester.getCenter(find.byType(ZoneSignature));
    await _tracerTraitVertical(tester, centre);

    final dataUrl = await tester.runAsync(() => zone.exporterDataUrl());
    expect(dataUrl, isNotNull);
    expect(dataUrl, startsWith('data:image/png;base64,'));
    final octets = base64Decode(dataUrl!.substring('data:image/png;base64,'.length));
    // Signature PNG : 89 50 4E 47.
    expect(octets.sublist(0, 4), [0x89, 0x50, 0x4E, 0x47]);
    expect(octets.length, lessThan(200 * 1024));
  });

  testWidgets('la liste ne défile pas pendant le tracé, elle défile après', (tester) async {
    await tester.pumpWidget(const _ListeEtZoneTest());
    await tester.pump();
    expect(
      tester.widget<ListView>(find.byType(ListView)).physics,
      isA<AlwaysScrollableScrollPhysics>(),
    );

    final centre = tester.getCenter(find.byType(ZoneSignature));
    final geste = await tester.startGesture(centre);
    await tester.pump();
    expect(
      tester.widget<ListView>(find.byType(ListView)).physics,
      isA<NeverScrollableScrollPhysics>(),
    );

    await geste.moveBy(const Offset(0, 30));
    await geste.up();
    await tester.pump();
    expect(
      tester.widget<ListView>(find.byType(ListView)).physics,
      isA<AlwaysScrollableScrollPhysics>(),
    );
  });
}
