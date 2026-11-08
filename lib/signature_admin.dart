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
// Aucune route serveur simple n'existe pour le profil, les routes
// /moi/... sont par champ, donc aucune route serveur n'a été créée
// pour cette carte. Conséquence honnête : la signature apparaît sur
// les documents ouverts et imprimés depuis l'appareil de
// l'administrateur qui l'a enregistrée, jamais sur un document ouvert
// depuis un autre appareil, et jamais sur l'attestation qu'un membre
// ouvre lui-même depuis son compte, puisque le serveur ne la connaît
// pas. Une route serveur, avec colonne en base, serait un chantier
// à part, à décider ensuite si la structure le veut.
//
// Dessin sans dépendance : un CustomPainter simple, pas de paquet
// de signature, pour ne rien ajouter de lourd. L'export PNG passe
// par PictureRecorder, fond blanc, trait bleu nuit, et marche sur
// le web comme sur téléphone.
import 'dart:convert';
import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

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

/// Bloc image de la signature, pour un document HTML, ou vide si
/// aucune signature n'est enregistrée. Le style fixe la hauteur
/// pour que le tracé garde sa proportion à l'impression.
String blocSignatureHtml(String? dataUrl) {
  if (dataUrl == null || dataUrl.isEmpty) return '';
  return '<img src="$dataUrl" style="height:56px;max-width:220px;object-fit:contain" alt="Signature">';
}

/// Ligne vide du gabarit d'attestation du serveur, telle qu'elle
/// est écrite dans server-production/src/attestation.html. C'est
/// cette ligne exacte qui est remplacée par la signature.
const ligneVideAttestation = '<div class="h-14 w-full border-b border-slate-800"></div>';

/// Pose la signature dans le HTML d'une attestation, à la place de
/// la ligne vide, au même endroit que la ligne vide. Sans signature,
/// ou si la ligne vide n'est pas trouvée, le HTML est renvoyé tel
/// quel, la ligne vide reste à signer à la main.
String insererSignatureAttestation(String html, String? dataUrl) {
  if (dataUrl == null || dataUrl.isEmpty) return html;
  if (!html.contains(ligneVideAttestation)) return html;
  final bloc = '<div class="h-14 w-full flex items-end justify-center border-b border-slate-800">'
      '${blocSignatureHtml(dataUrl)}</div>';
  return html.replaceFirst(ligneVideAttestation, bloc);
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

class _PeintreSignature extends CustomPainter {
  _PeintreSignature(this.traits);
  final List<List<Offset>> traits;

  @override
  void paint(Canvas canvas, Size size) {
    dessinerTraits(canvas, traits);
  }

  @override
  bool shouldRepaint(covariant _PeintreSignature ancien) => ancien.traits != traits;
}

/// Zone de dessin de la signature, doigt sur téléphone, souris sur
/// le web. Taille fixe, pour que l'export PNG ait toujours la même
/// proportion, quelle que soit la taille de l'écran.
class ZoneSignature extends StatefulWidget {
  const ZoneSignature({super.key, required this.surTraits});
  final ValueChanged<List<List<Offset>>> surTraits;

  @override
  State<ZoneSignature> createState() => _ZoneSignatureState();
}

class _ZoneSignatureState extends State<ZoneSignature> {
  final List<List<Offset>> _traits = [];

  void _annoncer() => widget.surTraits(List<List<Offset>>.unmodifiable(_traits.map((t) => List<Offset>.unmodifiable(t))));

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
      child: GestureDetector(
        onPanStart: (details) {
          setState(() => _traits.add([details.localPosition]));
          _annoncer();
        },
        onPanUpdate: (details) {
          setState(() => _traits.last.add(details.localPosition));
          _annoncer();
        },
        onPanEnd: (_) => _annoncer(),
        child: CustomPaint(
          painter: _PeintreSignature(_traits),
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
    );
  }
}

/// Exporte les traits en PNG, fond blanc, même proportion que la
/// zone de dessin, pour l'enregistrement et pour les documents.
Future<Uint8List?> exporterSignaturePng(List<List<Offset>> traits, {double largeur = 340, double hauteur = 180}) async {
  if (traits.isEmpty || traits.every((t) => t.isEmpty)) return null;
  try {
    final enregistreur = ui.PictureRecorder();
    final toile = ui.Canvas(enregistreur);
    toile.drawRect(Rect.fromLTWH(0, 0, largeur, hauteur), Paint()..color = const ui.Color(0xFFFFFFFF));
    dessinerTraits(toile, traits);
    final image = await enregistreur.endRecording().toImage(largeur.toInt(), hauteur.toInt());
    final donnees = await image.toByteData(format: ui.ImageByteFormat.png);
    return donnees?.buffer.asUint8List();
  } catch (_) {
    return null;
  }
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
  List<List<Offset>> _traits = [];
  String? _enregistree;
  bool _charge = false;
  bool _enregistrement = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    final v = await chargerSignatureAdmin(widget.matricule);
    if (mounted) setState(() => _enregistree = v == null ? null : signatureDataUrl(v));
    if (mounted) setState(() => _charge = true);
  }

  void _message(String texte) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(texte)));
  }

  Future<void> _enregistrer() async {
    if (_traits.isEmpty || _traits.every((t) => t.isEmpty)) {
      _message(tr('Dessinez d’abord votre signature.'));
      return;
    }
    setState(() => _enregistrement = true);
    final png = await exporterSignaturePng(_traits);
    if (png == null) {
      setState(() => _enregistrement = false);
      _message(tr('Impossible d’enregistrer la signature.'));
      return;
    }
    await enregistrerSignatureAdmin(widget.matricule, png);
    if (!mounted) return;
    setState(() {
      _enregistrement = false;
      _traits = [];
      _enregistree = signatureDataUrl(base64Encode(png));
    });
    _message(tr('Signature enregistrée.'));
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
    await supprimerSignatureAdmin(widget.matricule);
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
            ZoneSignature(surTraits: (traits) => _traits = traits),
            const SizedBox(height: 12),
            Row(children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: _traits.isEmpty
                      ? null
                      : () => setState(() {
                            if (_traits.isNotEmpty) _traits.removeLast();
                          }),
                  child: Text(tr('Effacer')),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: OutlinedButton(
                  onPressed: _traits.isEmpty ? null : () => setState(() => _traits = []),
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
              tr('La signature enregistrée est posée sur les attestations et les certificats délivrés depuis cet appareil, à la place de la ligne vide.'),
              style: t.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
