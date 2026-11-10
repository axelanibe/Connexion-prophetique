// Signature de l'administrateur, carte 95, 8 nov. 2026.
//
// L'administrateur dessine sa signature au doigt sur l'écran, ou à
// la souris sur le web, et elle est enregistrée pour son compte, pour
// être posée ensuite sur les attestations et les certificats qu'il
// délivre, sans la redessiner. Elle est modifiable et supprimable à
// tout moment, depuis le même écran.
//
// Portée honnête, dite dans l'application : c'est une signature
// visuelle, pour les documents internes de la structure, pas une
// signature électronique certifiée au sens juridique, avec certificat
// et horodatage d'un tiers. Aucun libellé ne prétend le contraire.
//
// Stockage local d'abord, carte 95 : la signature est gardée dans
// SharedPreferences, en PNG base64, sous la clé
// signature_admin_<matricule>, rattachée au compte qui l'a dessinée.
//
// Carte 96, 8 nov. 2026 : la signature est aussi gardée côté
// serveur, en base, sur utilisateurs.signature_admin, pour suivre
// l'administrateur sur tous ses appareils et apparaître sur
// l'attestation ouverte par le membre lui-même. Le local reste
// une copie de secours, affichée en attendant la réponse du
// serveur, et hors ligne. La copie locale ne remonte au serveur
// qu'une seule fois, à la première ouverture après la mise à jour,
// jamais à chaque ouverture : le drapeau
// signature_admin_migree_<matricule> marque cette migration.
// Si le serveur n'a plus de signature alors que la migration a
// déjà eu lieu, c'est qu'elle a été supprimée ailleurs : la copie
// locale est alors effacée, pour ne jamais faire revenir une
// signature supprimée.
//
// Dessin sans dépendance : un CustomPainter simple, pas de paquet
// de signature, pour ne rien ajouter de lourd. Carte 117, 9 nov.
// 2026 : le dessin passe par un Listener, événements pointeur
// bruts, et l'export par exporterDataUrl, data URL PNG directe,
// limite serveur 200 Ko. Le trait garde le bleu nuit de la
// structure, et l'export marche sur le web comme sur téléphone.
import 'dart:convert';
import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'i18n.dart';

// Bleu nuit et or, palette première conception, mêmes valeurs que
// Cp dans main.dart, redéfinies ici pour éviter un import de
// main.dart depuis ce fichier.
const _navy = Color(0xFF0B1F3A);
const _gold = Color(0xFFD4A72C);

String _cleSignature(String matricule) => 'signature_admin_$matricule';

/// Signature enregistrée de l'administrateur, en base64 PNG sans
/// préfixe, ou null si aucune signature n'est enregistrée.
Future<String?> chargerSignatureAdmin(String matricule) async {
  try {
    final prefs = await SharedPreferences.getInstance();
    final v = prefs.getString(_cleSignature(matricule));
    return (v == null || v.isEmpty) ? null : v;
  } catch (_) {
    return null;
  }
}

String _cleSignatureMigree(String matricule) => 'signature_admin_migree_$matricule';

/// Signature effective de l'administrateur, serveur d'abord, local
/// en repli. En ligne, la signature du serveur est la référence :
/// elle est gardée en local comme copie de secours. Si le serveur
/// n'en a pas encore et qu'une copie locale existe, elle est
/// envoyée au serveur une seule fois, puis le drapeau de migration
/// est posé. Hors ligne ou si le serveur refuse, la copie locale
/// est renvoyée telle quelle, sans jamais bloquer l'affichage.
Future<String?> synchroniserSignatureAdmin(String matricule) async {
  if (matricule.isEmpty) return chargerSignatureAdmin(matricule);
  String? locale;
  bool migree = false;
  try {
    final prefs = await SharedPreferences.getInstance();
    final v = prefs.getString(_cleSignature(matricule));
    locale = (v == null || v.isEmpty) ? null : v;
    migree = prefs.getBool(_cleSignatureMigree(matricule)) ?? false;
  } catch (_) {
    locale = null;
  }
  try {
    final serveur = await api.fetchSignatureAdmin();
    final prefs = await SharedPreferences.getInstance();
    if (serveur != null && serveur.isNotEmpty) {
      final base64 = base64DepuisDataUrl(serveur);
      await prefs.setString(_cleSignature(matricule), base64);
      await prefs.setBool(_cleSignatureMigree(matricule), true);
      return base64;
    }
    if (locale != null && !migree) {
      final ok = await api.saveSignatureAdmin(signatureDataUrl(locale));
      if (ok) await prefs.setBool(_cleSignatureMigree(matricule), true);
      return locale;
    }
    if (locale != null && migree) {
      // Supprimée ailleurs depuis la migration : la copie locale
      // ne doit pas revenir, elle est effacée.
      await prefs.remove(_cleSignature(matricule));
      return null;
    }
    return null;
  } catch (_) {
    return locale;
  }
}

Future<void> enregistrerSignatureAdmin(String matricule, Uint8List png) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString(_cleSignature(matricule), base64Encode(png));
}

Future<void> supprimerSignatureAdmin(String matricule) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.remove(_cleSignature(matricule));
}

/// Adresse d'image utilisable dans un document HTML imprimable.
String signatureDataUrl(String base64Png) => 'data:image/png;base64,$base64Png';

/// Base64 nu d'une signature, que le serveur la renvoie en data
/// URL ou en base64 nu : les deux formes sont acceptées, pour ne
/// jamais stocker un préfixe dans la copie locale.
String base64DepuisDataUrl(String signature) {
  final v = signature.trim();
  if (!v.startsWith('data:')) return v;
  final virgule = v.indexOf(',');
  return virgule >= 0 ? v.substring(virgule + 1) : v;
}

/// Dessine les traits sur une toile, pour l'écran comme pour
/// l'export PNG. Un trait est une liste de points, un point null
/// n'est jamais stocké : chaque trait est sa propre liste.
void dessinerTraits(ui.Canvas canvas, List<List<Offset>> traits, {double largeur = 3}) {
  final peinture = Paint()
    ..color = _navy
    ..strokeWidth = largeur
    ..strokeCap = StrokeCap.round
    ..strokeJoin = StrokeJoin.round
    ..style = PaintingStyle.stroke;
  for (final trait in traits) {
    if (trait.length == 1) {
      canvas.drawPoints(ui.PointMode.points, trait, peinture);
    } else {
      for (var i = 0; i + 1 < trait.length; i++) {
        canvas.drawLine(trait[i], trait[i + 1], peinture);
      }
    }
  }
}

/// Zone de dessin de la signature, doigt sur téléphone, souris sur
/// le web. Taille fixe, pour que l'export PNG ait toujours la même
/// proportion, quelle que soit la taille de l'écran.
///
/// Carte 117, 9 nov. 2026 : le GestureDetector est remplacé par un
/// Listener, événements pointeur bruts. La liste de la page volait
/// le trait vertical au doigt, seul un petit point sortait. Les
/// événements pointeur contournent l'arène des gestes, et le parent
/// bloque le défilement de la liste pendant le tracé, par
/// onDessinEnCours. L'export passe par exporterDataUrl, data URL
/// PNG directe, limite serveur 200 Ko, repli à pixelRatio 1.0 si le
/// rendu à 2.0 dépasse la limite. La bordure reste hors de la
/// frontière de capture, pour ne pas apparaître sur l'image
/// exportée, et le trait garde le bleu nuit de la structure.
class ZoneSignature extends StatefulWidget {
  const ZoneSignature({super.key, required this.onDessinEnCours});

  /// Prévient le parent qu'un trait est en cours, pour bloquer le défilement.
  final ValueChanged<bool> onDessinEnCours;

  @override
  State<ZoneSignature> createState() => ZoneSignatureState();
}

class ZoneSignatureState extends State<ZoneSignature> {
  // Limite du serveur, src/signature_admin.js : 200 Ko maximum.
  static const int _limiteOctets = 200 * 1024;

  final GlobalKey _frontiere = GlobalKey();
  final List<List<Offset>> _traits = [];
  List<Offset>? _traitEnCours;

  bool get estVide => _traits.isEmpty;

  void effacer() => setState(_traits.clear);

  /// Retire le dernier trait, bouton Effacer de la page.
  void retirerDernierTrait() {
    if (_traits.isEmpty) return;
    setState(() => _traits.removeLast());
  }

  void _bas(PointerDownEvent e) {
    widget.onDessinEnCours(true);
    setState(() {
      _traitEnCours = [e.localPosition];
      _traits.add(_traitEnCours!);
    });
  }

  void _mouvement(PointerMoveEvent e) {
    if (_traitEnCours == null) return;
    setState(() => _traitEnCours!.add(e.localPosition));
  }

  void _haut(PointerEvent e) {
    _traitEnCours = null;
    widget.onDessinEnCours(false);
  }

  /// Exporte la signature en data URL PNG, ou null si illisible ou
  /// trop lourde, même après le repli à pixelRatio 1.0.
  Future<String?> exporterDataUrl() async {
    final contexte = _frontiere.currentContext;
    if (contexte == null) return null;
    final rendu = contexte.findRenderObject() as RenderRepaintBoundary?;
    if (rendu == null) return null;
    try {
      var image = await rendu.toImage(pixelRatio: 2.0);
      var octets = await image.toByteData(format: ui.ImageByteFormat.png);
      if (octets == null) return null;
      if (octets.lengthInBytes > _limiteOctets) {
        image = await rendu.toImage(pixelRatio: 1.0);
        octets = await image.toByteData(format: ui.ImageByteFormat.png);
        if (octets == null || octets.lengthInBytes > _limiteOctets) return null;
      }
      return 'data:image/png;base64,${base64Encode(octets.buffer.asUint8List())}';
    } catch (_) {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 180,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: _gold, width: 2),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Listener(
        behavior: HitTestBehavior.opaque,
        onPointerDown: _bas,
        onPointerMove: _mouvement,
        onPointerUp: _haut,
        onPointerCancel: _haut,
        child: RepaintBoundary(
          key: _frontiere,
          child: CustomPaint(
            painter: _TracePainter(_traits),
            size: Size.infinite,
            child: _traits.isEmpty
                ? Center(
                    child: Text(
                      tr('Dessinez votre signature ici.'),
                      style: const TextStyle(color: Colors.grey, fontSize: 14),
                    ),
                  )
                : null,
          ),
        ),
      ),
    );
  }
}

class _TracePainter extends CustomPainter {
  _TracePainter(this.traits);
  final List<List<Offset>> traits;

  @override
  void paint(Canvas canvas, Size size) {
    // Fond blanc, comme l'export d'origine : l'image posée sur
    // l'attestation n'a pas de fond transparent.
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), Paint()..color = Colors.white);
    dessinerTraits(canvas, traits);
  }

  @override
  bool shouldRepaint(covariant _TracePainter ancien) => true;
}

/// Page de la signature de l'administrateur, carte 95. Accessible
/// aux administrateurs seulement, depuis la page Attestations. Elle
/// montre la signature enregistrée si elle existe, la zone de dessin,
/// et les boutons Effacer, Recommencer, Enregistrer et Supprimer.
class SignaturePage extends StatefulWidget {
  const SignaturePage({super.key, required this.matricule});
  final String matricule;

  @override
  State<SignaturePage> createState() => _SignaturePageState();
}

class _SignaturePageState extends State<SignaturePage> {
  final _zoneKey = GlobalKey<ZoneSignatureState>();
  bool _dessinEnCours = false;
  String? _enregistree;
  bool _charge = false;
  bool _enregistrement = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    // Carte 96 : la signature du serveur est la référence, le
    // local n'est qu'une copie de secours ou une migration unique.
    final v = await synchroniserSignatureAdmin(widget.matricule);
    if (mounted) setState(() => _enregistree = v == null ? null : signatureDataUrl(v));
    if (mounted) setState(() => _charge = true);
  }

  void _message(String texte) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(texte)));
  }

  Future<void> _enregistrer() async {
    final zone = _zoneKey.currentState;
    if (zone == null || zone.estVide) {
      _message(tr('Dessinez votre signature avant d’enregistrer.'));
      return;
    }
    setState(() => _enregistrement = true);
    // Carte 117 : l'export rend directement la data URL, limite
    // serveur 200 Ko, repli à pixelRatio 1.0 si trop lourde.
    final dataUrl = await zone.exporterDataUrl();
    if (dataUrl == null) {
      setState(() => _enregistrement = false);
      _message(tr('Signature illisible ou trop lourde. Redessinez-la plus simplement.'));
      return;
    }
    final png = base64Decode(base64DepuisDataUrl(dataUrl));
    await enregistrerSignatureAdmin(widget.matricule, png);
    // Carte 96 : la signature est envoyée au serveur, pour suivre
    // l'administrateur sur tous ses appareils. Hors ligne ou si le
    // serveur refuse, la copie locale reste et la synchronisation
    // sera retentée à la prochaine ouverture. Carte 117 : le
    // message dit clairement que l'envoi a échoué, au lieu de
    // prétendre que tout est enregistré.
    bool envoye = false;
    try {
      envoye = await api.saveSignatureAdmin(dataUrl);
      if (envoye) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setBool(_cleSignatureMigree(widget.matricule), true);
      }
    } catch (_) {
      envoye = false;
    }
    zone.effacer();
    if (!mounted) return;
    setState(() {
      _enregistrement = false;
      _enregistree = dataUrl;
    });
    _message(envoye ? tr('Signature enregistrée.') : tr('Signature gardée sur cet appareil seulement, envoi au serveur impossible.'));
  }

  Future<void> _supprimer() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer ma signature')),
        content: Text(tr('Supprimer la signature enregistrée ?')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (ok != true) return;
    // Carte 96 : la suppression se propage au serveur, pour
    // disparaître partout. Elle n'est effacée en local que si le
    // serveur confirme : hors ligne, la copie locale est gardée
    // et la suppression sera retentée à la prochaine ouverture,
    // sans jamais faire revenir une signature déjà supprimée.
    bool supprimeeServeur = false;
    try {
      supprimeeServeur = await api.deleteSignatureAdmin();
    } catch (_) {
      supprimeeServeur = false;
    }
    if (!supprimeeServeur) {
      _message(tr('Impossible de supprimer la signature pour le moment.'));
      return;
    }
    await supprimerSignatureAdmin(widget.matricule);
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool(_cleSignatureMigree(widget.matricule), false);
    } catch (_) {}
    if (!mounted) return;
    setState(() => _enregistree = null);
    _message(tr('Signature supprimée.'));
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Scaffold(
      appBar: AppBar(backgroundColor: _navy, foregroundColor: Colors.white, title: Text(tr('Ma signature'))),
      body: SafeArea(
        child: ListView(
          // Carte 117 : pendant le tracé, la liste ne défile plus,
          // pour ne pas voler le trait vertical au doigt.
          physics: _dessinEnCours
              ? const NeverScrollableScrollPhysics()
              : const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(16),
          children: [
            Text(tr('Dessinez votre signature au doigt ou à la souris.'), style: t.bodyMedium),
            const SizedBox(height: 8),
            Text(
              tr('Signature visuelle, pour les documents internes de la structure. Ce n’est pas une signature électronique certifiée.'),
              style: t.bodyMedium?.copyWith(fontStyle: FontStyle.italic),
            ),
            const SizedBox(height: 16),
            if (_charge && _enregistree != null) ...[
              Text(tr('Signature enregistrée'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: _navy)),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: Colors.white, border: Border.all(color: _gold), borderRadius: BorderRadius.circular(16)),
                child: Image.network(_enregistree!, height: 56, fit: BoxFit.contain),
              ),
              const SizedBox(height: 8),
              OutlinedButton.icon(
                onPressed: _supprimer,
                icon: const Icon(Icons.delete_outlined),
                label: Text(tr('Supprimer ma signature')),
              ),
              const SizedBox(height: 16),
            ],
            Text(tr('Nouvelle signature'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: _navy)),
            const SizedBox(height: 8),
            ZoneSignature(
              key: _zoneKey,
              onDessinEnCours: (actif) => setState(() => _dessinEnCours = actif),
            ),
            const SizedBox(height: 12),
            Row(children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: (_zoneKey.currentState?.estVide ?? true)
                      ? null
                      : () {
                            _zoneKey.currentState?.retirerDernierTrait();
                            setState(() {});
                          },
                  child: Text(tr('Effacer')),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: OutlinedButton(
                  onPressed: (_zoneKey.currentState?.estVide ?? true)
                      ? null
                      : () {
                            _zoneKey.currentState?.effacer();
                            setState(() {});
                          },
                  child: Text(tr('Recommencer')),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: FilledButton(
                  onPressed: _enregistrement ? null : _enregistrer,
                  style: FilledButton.styleFrom(backgroundColor: _gold, foregroundColor: _navy),
                  child: Text(_enregistrement ? tr('Enregistrement…') : tr('Enregistrer')),
                ),
              ),
            ]),
            const SizedBox(height: 12),
            Text(
              tr('La signature enregistrée est gardée côté serveur : elle vous suit sur tous vos appareils et apparaît sur les attestations et les certificats, à la place de la ligne vide.'),
              style: t.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
