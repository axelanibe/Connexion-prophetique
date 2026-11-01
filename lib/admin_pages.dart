// Ecrans d'administration en chargement differe, 31 oct. 2026 :
// ces ecrans ne sont jamais sur le premier ecran, seuls les
// administrateurs les ouvrent. Ils sont charges a la demande par
// lib/main.dart (import differe), jamais au demarrage. Ce fichier
// importe lib/main.dart pour les aides partagees (couleurs, textes,
// navigation, modeles) ; le cycle import differe / import direct est
// accepte par Dart (verifie par compilation d'un cas minimal).
import 'package:flutter/material.dart';
import 'main.dart';
import 'differe_membre.dart' deferred as membre;
import 'dart:async';
import 'dart:convert';
import 'dart:ui' as ui;
import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';
import 'api.dart';
import 'bible.dart';
import 'i18n.dart';
import 'print_doc.dart';
import 'print_html.dart';
import 'projection_plein_ecran.dart';
import 'responsive.dart';



// Liste des paiements du membre, point d'entrée de la vérification
// depuis Plus et depuis la page Dons : chaque demande, même en
// attente, a son bouton Vérifier, avec sa référence affichée.
class VerifyPaymentsListPage extends StatelessWidget {
  const VerifyPaymentsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final m = app.member;
      final mine = m == null ? <PayRequest>[] : app.requests.where((r) => r.matricule == m.matricule).toList();
      return basic(tr('Vérifier mon paiement'), [
        if (mine.isEmpty)
          EmptyNote(icon: Icons.receipt_long_outlined, text: tr('Aucun paiement pour le moment.'))
        else
          Card(
            child: Column(children: [
              for (final r in mine)
                ListTile(
                  title: Text('${r.kind == 'don' ? tr('Don') : r.kind == 'cotisation' ? tr('Cotisation mensuelle') : r.kind == 'carte' ? tr('Carte') : r.kind == 'camp' ? campRequestLabel(r) : tr('Achat')} · ${fcfa(r.amount)}', style: t.labelLarge),
                  subtitle: Text('${dateFr(r.date)} · ${r.method} · ${r.ref} · ${r.confirmed ? tr('Paiement confirmé') : tr('En attente de confirmation')}', style: t.bodyMedium),
                  trailing: TextButton(
                    onPressed: () => go(c, VerifyPaymentPage(request: r)),
                    child: Text(tr('Vérifier')),
                  ),
                ),
            ]),
          ),
      ]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 11. DONS (Wave Business direct)
// ═══════════════════════════════════════════════════════════════════

// Réglage de l'objectif de don, administrateur général seulement.
// Créer un objectif désactive les précédents et recommence le
// comptage ; modifier le libellé ou la cible ne remet pas le compteur
// à zéro ; désactiver retire la jauge sans effacer l'objectif ni les
// dons.
class ObjectifDonAdminPage extends StatefulWidget {
  const ObjectifDonAdminPage({super.key});
  @override
  State<ObjectifDonAdminPage> createState() => _ObjectifDonAdminPageState();
}

class _ObjectifDonAdminPageState extends State<ObjectifDonAdminPage> {
  final _libelle = TextEditingController();
  final _cible = TextEditingController();
  String? _id;
  bool _actif = false;
  bool _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await api.getObjectifDon();
      if (!mounted) return;
      setState(() {
        _charge = true;
        if (data != null && data['actif'] == true) {
          _id = (data['id'] ?? '').toString();
          _libelle.text = (data['libelle'] ?? '').toString();
          _cible.text = ((data['cible_fcfa'] as num?)?.toInt() ?? 0).toString();
          _actif = true;
        }
      });
    } catch (_) {
      if (mounted) setState(() => _charge = true);
    }
  }

  Future<void> _enregistrer() async {
    final libelle = _libelle.text.trim();
    final cible = int.tryParse(_cible.text.replaceAll(RegExp(r'[^0-9]'), ''));
    if (libelle.isEmpty || cible == null || cible <= 0) {
      toast(context, tr('Le montant cible doit être supérieur à zéro.'));
      return;
    }
    try {
      if (_id != null) {
        await api.modifierObjectifDon(_id!, libelle, cible);
      } else {
        final cree = await api.creerObjectifDon(libelle, cible);
        _id = (cree['id'] ?? '').toString();
      }
      if (!mounted) return;
      setState(() => _actif = true);
      toast(context, tr('Objectif enregistré.'));
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    }
  }

  Future<void> _desactiver() async {
    if (_id == null) return;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Désactiver cet objectif ?')),
        content: Text(tr('La jauge disparaîtra de la page Don. Les dons déjà reçus ne sont pas effacés.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Désactiver'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.desactiverObjectifDon(_id!);
      if (!mounted) return;
      setState(() {
        _id = null;
        _actif = false;
        _libelle.clear();
        _cible.clear();
      });
      toast(context, tr('Objectif désactivé.'));
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Objectif de don')),
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(Cp.s2),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                if (!_actif) Text(tr('Aucun objectif de don actif.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                if (!_actif) const SizedBox(height: Cp.s2),
                Padding(
                  padding: const EdgeInsets.only(bottom: Cp.s2),
                  child: TextField(
                    controller: _libelle,
                    decoration: InputDecoration(labelText: tr('Libellé de l’objectif'), border: const OutlineInputBorder()),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: Cp.s2),
                  child: TextField(
                    controller: _cible,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(labelText: tr('Montant cible (FCFA)'), border: const OutlineInputBorder()),
                  ),
                ),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton(onPressed: _enregistrer, child: Text(tr('Enregistrer l’objectif'))),
                ),
                if (_actif) const SizedBox(height: Cp.s1),
                if (_actif)
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton(onPressed: _desactiver, child: Text(tr('Désactiver l’objectif'))),
                  ),
              ]),
            ),
    );
  }
}
class ScanCardPage extends StatefulWidget {
  const ScanCardPage({super.key});
  @override
  State<ScanCardPage> createState() => _ScanCardPageState();
}

class _ScanCardPageState extends State<ScanCardPage> {
  final _matCtrl = TextEditingController();
  final _scannerCtrl = MobileScannerController();
  String? _matricule;
  List<Map<String, dynamic>> _payments = [];
  bool _loading = false;
  bool _scanning = true;
  String? _error;
  String? _cameraError;

  @override
  void dispose() {
    _matCtrl.dispose();
    _scannerCtrl.dispose();
    super.dispose();
  }

  String? _extractMatricule(String raw) {
    final m = RegExp(r'CP-(?:[A-Z]{2}-[0-9]{4}|[0-9][0-9-]*)').firstMatch(raw.trim().toUpperCase());
    return m?.group(0);
  }

  Future<void> _load(String matricule) async {
    setState(() {
      _matricule = matricule;
      _scanning = false;
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchAdminPayments(matricule: matricule);
      if (!mounted) return;
      list.sort((a, b) {
        final sa = (a['statut'] ?? '').toString();
        final sb = (b['statut'] ?? '').toString();
        if ((sa == 'en_attente') != (sb == 'en_attente')) return sa == 'en_attente' ? -1 : 1;
        return (b['cree_le'] ?? '').toString().compareTo((a['cree_le'] ?? '').toString());
      });
      setState(() {
        _payments = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _payments = [];
        _loading = false;
        _error = 'Achats indisponibles : $e';
      });
    }
  }

  void _onDetect(BarcodeCapture capture) {
    if (!_scanning) return;
    for (final b in capture.barcodes) {
      final mat = b.rawValue == null ? null : _extractMatricule(b.rawValue!);
      if (mat != null) {
        _load(mat);
        return;
      }
    }
  }

  Future<void> _validate(Map<String, dynamic> pay) async {
    final id = (pay['id'] ?? '').toString();
    final ref = (pay['reference'] ?? '').toString();
    final amount = (pay['montant_fcfa'] as num?)?.toInt() ?? 0;
    final waveCtrl = TextEditingController();
    String? moyen;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setD) => AlertDialog(
          title: Text(tr('Valider ce paiement ?')),
          content: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(isEn ? 'Only confirm after checking the payment received: ${fcfa(amount)} for reference $ref.' : 'Validez seulement après avoir contrôlé le paiement reçu : ${fcfa(amount)} pour la référence $ref.'),
            const SizedBox(height: Cp.s1),
            Text(tr('Moyen de paiement'), style: const TextStyle(fontWeight: FontWeight.w700)),
            for (final m in const [('especes', 'Espèces'), ('wave', 'Wave'), ('orange_money', 'Orange Money'), ('paypal', 'PayPal')])
              RadioListTile<String>(
                title: Text(tr(m.$2)),
                value: m.$1,
                groupValue: moyen,
                onChanged: (v) => setD(() => moyen = v),
                contentPadding: EdgeInsets.zero,
                dense: true,
              ),
            if (moyen == 'wave')
              TextField(
                controller: waveCtrl,
                decoration: InputDecoration(
                  hintText: tr('Identifiant Wave, facultatif'),
                  filled: true,
                  fillColor: Cp.card,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                ),
              ),
          ]),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(onPressed: moyen == null ? null : () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
          ],
        ),
      ),
    );
    final waveId = waveCtrl.text.trim();
    waveCtrl.dispose();
    if (ok != true || !mounted || _matricule == null) return;
    try {
      await api.validateAdminPayment(id, waveTransactionId: moyen == 'wave' && waveId.length >= 6 ? waveId : null, moyen: moyen);
      if (!mounted) return;
      toast(context, tr('Paiement validé côté serveur, facture générée.'));
      await _load(_matricule!);
    } catch (e) {
      if (mounted) toast(context, 'Validation impossible : $e');
    }
  }

  Future<void> _enregistrerEspeces() async {
    if (_matricule == null) return;
    final name = _payments.isEmpty ? '' : (_payments.first['nom_complet'] ?? '').toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Enregistrer un règlement en espèces ?')),
        content: Text(isEn ? 'Record a cash payment of 1000 FCFA for this month’s contribution for ${name.isNotEmpty ? '$name · ' : ''}$_matricule? The member’s monthly reminder will disappear.' : 'Enregistrer un règlement en espèces de 1000 FCFA pour la cotisation du mois pour ${name.isNotEmpty ? '$name · ' : ''}$_matricule ? Le rappel de cotisation du mois disparaîtra.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Enregistrer'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.enregistrerCotisationEspeces(_matricule!);
      if (!mounted) return;
      toast(context, tr('Règlement en espèces enregistré.'));
      await _load(_matricule!);
    } catch (e) {
      if (!mounted) return;
      if ('$e'.contains('déjà enregistrée')) {
        toast(context, tr('Cotisation du mois déjà enregistrée.'));
      } else {
        toast(context, 'Enregistrement impossible : $e');
      }
    }
  }

  Future<void> _refuse(Map<String, dynamic> pay) async {
    final id = (pay['id'] ?? '').toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Refuser ce paiement ?')),
        content: Text(tr('Le membre le verra comme refusé au prochain chargement, pas comme en attente.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Refuser'))),
        ],
      ),
    );
    if (ok != true || !mounted || _matricule == null) return;
    try {
      await api.refuseAdminPayment(id);
      if (!mounted) return;
      toast(context, tr('Paiement refusé.'));
      await _load(_matricule!);
    } catch (e) {
      if (mounted) toast(context, 'Refus impossible : $e');
    }
  }

  Future<void> _showBooks(Map<String, dynamic> pay) async {
    try {
      final detail = await api.fetchAdminPayment((pay['id'] ?? '').toString());
      if (!mounted) return;
      final lignes = detail['lignes'];
      final items = lignes is List ? lignes : const [];
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(tr('Livres achetés')),
          content: items.isEmpty
              ? Text(tr('Aucun livre détaillé pour ce paiement.'))
              : Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
                  for (final l in items) Text('${l['titre'] ?? ''} · ${fcfa((l['prix_fcfa'] as num?)?.toInt() ?? 0)}'),
                ]),
          actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer')))],
        ),
      );
    } catch (e) {
      if (mounted) toast(context, 'Détail indisponible : $e');
    }
  }

  String _typeLabel(String type) {
    switch (type) {
      case 'achat':
        return 'Achat';
      case 'carte':
        return 'Carte';
      case 'cotisation':
        return 'Cotisation';
      default:
        return 'Don';
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final hasPendingCotisation = _payments.any((p) => (p['type'] ?? '').toString() == 'cotisation' && (p['statut'] ?? '').toString() == 'en_attente');
    final children = <Widget>[
      Text(isWindowsDesktop ? (isEn ? 'On Windows, type the member number below. The server then shows that member’s purchases.' : 'Sur Windows, saisissez le matricule ci-dessous. Le serveur affiche ensuite les achats de ce membre.') : (isEn ? 'Point the camera at a member card QR code. The code holds only the member number, and the server then shows that member’s purchases.' : 'Pointez la caméra vers le QR code de la carte d’un membre. Le code ne contient que le matricule, et le serveur affiche ensuite les achats de ce membre.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
    ];
    if (_matricule == null) {
      if (_cameraError == null && !isWindowsDesktop) {
        children.addAll([
          SizedBox(
            height: 280,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: MobileScanner(
                controller: _scannerCtrl,
                onDetect: _onDetect,
                errorBuilder: (ctx, err, child) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    if (mounted && _cameraError == null) setState(() => _cameraError = 'Caméra indisponible.');
                  });
                  return Container(color: Cp.navy, child: Center(child: Text(tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: const TextStyle(color: Colors.white), textAlign: TextAlign.center)));
                },
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      } else {
        children.add(Text(isWindowsDesktop ? (isEn ? 'On Windows, type the member number below.' : 'Sur Windows, saisissez le matricule ci-dessous.') : tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: t.bodyMedium));
      }
      children.addAll([
        TextField(
          controller: _matCtrl,
          decoration: InputDecoration(
            hintText: tr('Matricule, par exemple CP-AA-2526'),
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
        FilledButton(
          onPressed: () {
            final mat = _extractMatricule(_matCtrl.text);
            if (mat == null) {
              toast(context, tr('Matricule non reconnu.'));
              return;
            }
            _load(mat);
          },
          child: Text(tr('Voir ses achats')),
        ),
      ]);
    } else {
      final name = _payments.isEmpty ? '' : (_payments.first['nom_complet'] ?? '').toString();
      children.addAll([
        Row(children: [
          Expanded(child: Text('${name.isNotEmpty ? '$name · ' : ''}$_matricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          TextButton(
            onPressed: () => setState(() {
              _matricule = null;
              _payments = [];
              _scanning = true;
              _cameraError = null;
            }),
            child: Text(isWindowsDesktop ? (isEn ? 'Find another member' : 'Chercher un autre membre') : tr('Scanner une autre carte')),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        // Règlement en espèces du mois, 29 oct. 2026 : proposé quand
        // aucune demande de cotisation n'est en attente, donc aussi
        // quand le membre n'a aucune demande du tout. Le serveur
        // refuse proprement si le mois est déjà enregistré.
        if (!hasPendingCotisation)
          FilledButton.icon(
            onPressed: _enregistrerEspeces,
            icon: const Icon(Icons.payments_outlined),
            label: Text(tr('Enregistrer un règlement en espèces')),
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          ),
        if (!hasPendingCotisation) const SizedBox(height: Cp.s1),
        if (_loading)
          const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator()))
        else if (_error != null)
          Text(_error!, style: t.bodyMedium)
        else if (_payments.isEmpty)
          Text(tr('Aucun achat en ligne pour ce membre pour le moment.'), style: t.bodyMedium)
        else
          Card(
            child: Column(children: [
              for (var i = 0; i < _payments.length; i++) ...[
                if (i > 0) const Divider(height: 1),
                ListTile(
                  title: Text('${_typeLabel((_payments[i]['type'] ?? '').toString())} · ${fcfa((_payments[i]['montant_fcfa'] as num?)?.toInt() ?? 0)}', style: t.labelLarge),
                  subtitle: Text('${_payments[i]['reference'] ?? ''} · ${dateFr(DateTime.tryParse((_payments[i]['cree_le'] ?? '').toString()) ?? DateTime.now())}${((_payments[i]['wave_transaction_id'] ?? '').toString().isNotEmpty) ? ' · Wave ${_payments[i]['wave_transaction_id']}' : ''}${suffixMoyen((_payments[i]['moyen'] ?? '').toString())}', style: t.bodyMedium),
                  trailing: (_payments[i]['statut'] ?? '').toString() == 'en_attente'
                      ? Row(mainAxisSize: MainAxisSize.min, children: [
                          if ((_payments[i]['type'] ?? '').toString() == 'achat')
                            IconButton(tooltip: tr('Livres achetés'), icon: const Icon(Icons.auto_stories_outlined), onPressed: () => _showBooks(_payments[i])),
                          // Le refus reste réservé à l'administrateur
                          // général côté serveur : le bouton est masqué
                          // pour l'administrateur d'établissement.
                          if (!app.isAdminEtablissement)
                            TextButton(onPressed: () => _refuse(_payments[i]), child: Text(tr('Refuser'))),
                          const SizedBox(width: 4),
                          FilledButton(onPressed: () => _validate(_payments[i]), child: Text(tr('Valider'))),
                        ])
                      : Text((_payments[i]['statut'] ?? '').toString() == 'confirme' ? tr('Confirmé') : tr('Refusé'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: (_payments[i]['statut'] ?? '').toString() == 'confirme' ? Cp.ok : const Color(0xFFB42318))),
                ),
              ],
            ]),
          ),
      ]);
    }
    return basic(tr('Scanner une carte'), children);
  }
}


// ───────────────────────── Présences, phase 1, 29 oct. 2026 ─────────────────────────
// Page de scan de présence SÉPARÉE de la page de scan de paiement : jamais
// de bascule entre les deux. Le scan lit le QR de la carte (matricule),
// comme le scan de paiement, puis le serveur marque la présence, refuse
// le doublon et contrôle le périmètre. L'application affiche le message
// renvoyé par le serveur, sans détail technique. Une présence annulée
// reste visible comme annulée, elle n'est jamais effacée.
class _ChoixActivite {
  _ChoixActivite(this.id, this.nom, this.type, this.etab);
  final String id, nom, type, etab;
}

Future<_ChoixActivite?> choisirActivite(BuildContext c) {
  final choix = <_ChoixActivite>[];
  for (final camp in app.camps) {
    if (camp.serverId.isNotEmpty) choix.add(_ChoixActivite(camp.serverId, camp.name, 'evenement', ''));
  }
  final monEtab = app.member == null ? '' : etabDisplayName(app.member!.etab);
  for (final e in app.etabs) {
    if (app.isAdminGeneral || e.name == monEtab || etabDisplayName(e.name) == monEtab) {
      for (final a in e.activities) {
        if (a.serverId.isNotEmpty) choix.add(_ChoixActivite(a.serverId, a.title, 'activite_etablissement', e.name));
      }
    }
  }
  if (choix.isEmpty) {
    toast(c, tr('Aucune activité sur le serveur pour le moment.'));
    return Future.value(null);
  }
  return pick<_ChoixActivite>(c, tr('Choisir une activité'), choix,
      (a) => a.type == 'evenement' ? '${tr('Camp')} : ${a.nom}' : '${a.etab} : ${a.nom}');
}

String _statutPresenceLabel(String s) => s == 'present' ? tr('Présent') : s == 'annule' ? tr('Annulé') : tr('Absent');

Widget _statutPresenceChip(String s) {
  final bg = s == 'present' ? const Color(0xFFE6F4EA) : s == 'annule' ? const Color(0xFFFDECEA) : const Color(0xFFEFF1F5);
  final fg = s == 'present' ? const Color(0xFF137333) : s == 'annule' ? const Color(0xFFB42318) : Cp.inkMuted;
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(999)),
    child: Text(_statutPresenceLabel(s), style: TextStyle(color: fg, fontWeight: FontWeight.w700, fontSize: 13)),
  );
}

String _dateIso(DateTime d) => '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

String _csvChamp(String v) => '"${v.replaceAll('"', '""')}"';

class PresenceScanPage extends StatefulWidget {
  const PresenceScanPage({super.key, required this.activiteId, required this.activiteNom});
  final String activiteId, activiteNom;
  @override
  State<PresenceScanPage> createState() => _PresenceScanPageState();
}

class _PresenceScanPageState extends State<PresenceScanPage> {
  final _matCtrl = TextEditingController();
  final _scannerCtrl = MobileScannerController();
  String? _matricule;
  Map<String, dynamic>? _resultat;
  bool _loading = false;
  bool _scanning = true;
  String? _error;
  String? _cameraError;

  @override
  void dispose() {
    _matCtrl.dispose();
    _scannerCtrl.dispose();
    super.dispose();
  }

  String? _extractMatricule(String raw) {
    final m = RegExp(r'CP-(?:[A-Z]{2}-[0-9]{4}|[0-9][0-9-]*)').firstMatch(raw.trim().toUpperCase());
    return m?.group(0);
  }

  Future<void> _load(String matricule) async {
    setState(() {
      _matricule = matricule;
      _scanning = false;
      _loading = true;
      _error = null;
      _resultat = null;
    });
    try {
      final r = await api.scanPresence(activiteId: widget.activiteId, matricule: matricule);
      if (!mounted) return;
      setState(() {
        _resultat = r;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  void _onDetect(BarcodeCapture capture) {
    if (!_scanning) return;
    for (final b in capture.barcodes) {
      final mat = b.rawValue == null ? null : _extractMatricule(b.rawValue!);
      if (mat != null) {
        _load(mat);
        return;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(widget.activiteNom, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: Cp.s1),
      Text(isWindowsDesktop ? (isEn ? 'On Windows, type the member number below. The server marks the attendance, refuses a duplicate, and checks your perimeter.' : 'Sur Windows, saisissez le matricule ci-dessous. Le serveur marque la présence, refuse le doublon et contrôle votre périmètre.') : (isEn ? 'Point the camera at a member card QR code. The server marks the attendance, refuses a duplicate, and checks your perimeter.' : 'Pointez la caméra vers le QR code de la carte d’un membre. Le serveur marque la présence, refuse le doublon et contrôle votre périmètre.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
    ];
    if (_matricule == null) {
      if (_cameraError == null && !isWindowsDesktop) {
        children.addAll([
          SizedBox(
            height: 280,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: MobileScanner(
                controller: _scannerCtrl,
                onDetect: _onDetect,
                errorBuilder: (ctx, err, child) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    if (mounted && _cameraError == null) setState(() => _cameraError = 'Caméra indisponible.');
                  });
                  return Container(color: Cp.navy, child: Center(child: Text(tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: const TextStyle(color: Colors.white), textAlign: TextAlign.center)));
                },
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      } else {
        children.add(Text(isWindowsDesktop ? (isEn ? 'On Windows, type the member number below.' : 'Sur Windows, saisissez le matricule ci-dessous.') : tr('Caméra indisponible, saisissez le matricule ci-dessous.'), style: t.bodyMedium));
      }
      children.addAll([
        TextField(
          controller: _matCtrl,
          decoration: InputDecoration(
            hintText: tr('Matricule, par exemple CP-AA-2526'),
            filled: true,
            fillColor: Cp.card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
          ),
        ),
        const SizedBox(height: Cp.s1),
        FilledButton(
          onPressed: () {
            final mat = _extractMatricule(_matCtrl.text);
            if (mat == null) {
              toast(context, tr('Matricule non reconnu.'));
              return;
            }
            _load(mat);
          },
          child: Text(tr('Marquer présent')),
        ),
      ]);
    } else {
      final nom = (_resultat?['nom_complet'] ?? '').toString();
      children.addAll([
        Row(children: [
          Expanded(child: Text('${nom.isNotEmpty ? '$nom · ' : ''}$_matricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          TextButton(
            onPressed: () => setState(() {
              _matricule = null;
              _resultat = null;
              _scanning = true;
              _cameraError = null;
            }),
            child: Text(isWindowsDesktop ? (isEn ? 'Find another member' : 'Chercher un autre membre') : tr('Scanner une autre carte')),
          ),
        ]),
        const SizedBox(height: Cp.s1),
        if (_loading)
          const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator()))
        else if (_error != null)
          Text(_error!, style: t.bodyMedium)
        else if (_resultat != null) ...[
          Card(
            child: ListTile(
              leading: const Icon(Icons.check_circle_outlined, color: Cp.ok),
              title: Text(tr('Présence marquée'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
              subtitle: Text('${_resultat!['nom_complet'] ?? ''} · ${_resultat!['matricule'] ?? ''}', style: t.bodyMedium),
            ),
          ),
          const SizedBox(height: Cp.s1),
          OutlinedButton.icon(
            icon: const Icon(Icons.playlist_add_check_outlined),
            label: Text(tr('Voir la liste')),
            onPressed: () => go(context, PresenceListPage(activiteId: widget.activiteId, activiteNom: widget.activiteNom)),
          ),
        ],
      ]);
    }
    return basic(tr('Scanner une présence'), children);
  }
}

class PresenceListPage extends StatefulWidget {
  const PresenceListPage({super.key, required this.activiteId, required this.activiteNom});
  final String activiteId, activiteNom;
  @override
  State<PresenceListPage> createState() => _PresenceListPageState();
}

class _PresenceListPageState extends State<PresenceListPage> {
  List<Map<String, dynamic>> _entrees = [];
  bool _loading = true;
  String? _error;
  String _activiteType = '';
  Map<String, dynamic>? _taux;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
      _taux = null;
    });
    try {
      final d = await api.fetchPresencesActivite(widget.activiteId);
      if (!mounted) return;
      setState(() {
        _entrees = ((d['entrees'] as List?) ?? []).map((e) => e as Map<String, dynamic>).toList();
        _activiteType = ((d['activite'] as Map?) ?? {})['type']?.toString() ?? '';
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
    // Taux, lot 1, 31 oct. 2026 : calcul serveur, dans le même
    // périmètre que la liste. En cas d'échec, la carte reste
    // masquée et la liste reste utilisable.
    if (_error == null) {
      try {
        final taux = await api.fetchTauxPresence(widget.activiteId);
        if (!mounted) return;
        setState(() => _taux = taux);
      } catch (_) {
        // Carte masquée, sans erreur visible.
      }
    }
  }

  Future<void> _ajouterManuel() async {
    try {
      final membres = await api.fetchAdminMembres(inclureSansEtablissement: true);
      if (!mounted) return;
      if (membres.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      // Ne proposer que les personnes qu'il reste à marquer, 30 oct.
      // 2026 : celles qui sont déjà présentes ne peuvent pas être
      // ajoutées une deuxième fois, le serveur les refuse, le sélecteur
      // ne les propose donc plus. Les absents et les annulés restent
      // proposés, les annulés sont ainsi rétablis par l'ajout.
      final dejaPresents = _entrees.where((e) => e['statut'] == 'present').map((e) => (e['membre_id'] ?? '').toString()).toSet();
      final candidats = membres.where((m) => !dejaPresents.contains((m['id'] ?? '').toString())).toList();
      if (candidats.isEmpty) {
        toast(context, tr('Tous les membres de votre périmètre sont déjà présents.'));
        return;
      }
      final choix = await pick<Map<String, dynamic>>(context, tr('Choisir un membre'), candidats, (m) => '${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}');
      if (choix == null) return;
      await api.addPresenceManuel(activiteId: widget.activiteId, membreId: (choix['id'] ?? '').toString());
      if (!mounted) return;
      toast(context, tr('Présence marquée.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Future<void> _marquerPresent(Map<String, dynamic> entree) async {
    try {
      await api.addPresenceManuel(activiteId: widget.activiteId, membreId: (entree['membre_id'] ?? '').toString());
      if (!mounted) return;
      toast(context, tr('Présence marquée.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Future<void> _annuler(Map<String, dynamic> entree) async {
    final id = (entree['presence_id'] ?? '').toString();
    if (id.isEmpty) return;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Annuler cette présence ?')),
        content: Text(tr('La présence restera visible comme annulée, elle ne sera pas effacée.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Confirmer'))),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await api.annulerPresence(id);
      if (!mounted) return;
      toast(context, tr('Présence annulée.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  // Certificat de participation, lot 1, 31 oct. 2026 : les dates et
  // le lieu viennent du camp synchronisé, tels que le serveur les
  // contient. Sans camp retrouvé, le certificat ne montre que le
  // nom, sans rien compléter.
  Future<void> _certificat(Map<String, dynamic> entree) async {
    Camp? camp;
    for (final c in app.camps) {
      if (c.serverId == widget.activiteId) camp = c;
    }
    final html = buildCertificateHtml(PrintCertificate(
      name: (entree['nom_complet'] ?? '').toString(),
      matricule: (entree['matricule'] ?? '').toString(),
      campName: widget.activiteNom,
      campDates: camp?.dates ?? '',
      campLieu: camp?.place ?? '',
    ), isEnglish: isEn);
    final base = 'certificat-${(entree['matricule'] ?? '').toString()}'.replaceAll(RegExp(r'[^A-Za-z0-9_-]'), '');
    try {
      await openPrintDocument('${base.isEmpty ? 'certificat' : base}.html', html);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de créer le certificat.'));
    }
  }

  Future<void> _exporter() async {
    if (_entrees.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final lignes = <String>[_csvChamp(tr('Nom')) + ';' + _csvChamp(tr('Matricule')) + ';' + _csvChamp(tr('Statut')) + ';' + _csvChamp(tr('Inscrit')) + ';' + _csvChamp(tr('Date et heure')) + ';' + _csvChamp(tr('Méthode'))];
    for (final e in _entrees) {
      final statut = (e['statut'] ?? '').toString();
      final methode = (e['methode'] ?? '').toString();
      lignes.add([
        _csvChamp((e['nom_complet'] ?? '').toString()),
        _csvChamp((e['matricule'] ?? '').toString()),
        _csvChamp(_statutPresenceLabel(statut)),
        _csvChamp(e['inscrit'] == true ? tr('Oui') : tr('Non')),
        _csvChamp(dateHeure((e['scanne_le'] ?? '').toString())),
        _csvChamp(methode == 'scan' ? tr('Scan') : methode == 'manuel' ? tr('Manuel') : ''),
      ].join(';'));
    }
    final contenu = lignes.join('\n');
    final titre = widget.activiteNom.replaceAll(RegExp(r'[^A-Za-z0-9 _-]'), '').trim().replaceAll(' ', '_');
    final nom = 'presences-${titre.isEmpty ? 'activite' : titre}.csv';
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(contenu)];
      final fichier = await saveToDownloads(bytes, nom);
      if (!mounted) return;
      toast(context, '${tr('Exporté')} : ${fichier.path.split('/').last}');
      await Share.shareXFiles([XFile(fichier.path)], text: widget.activiteNom);
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final presents = _entrees.where((e) => e['statut'] == 'present').length;
    final absents = _entrees.where((e) => e['statut'] == 'absent').length;
    final annules = _entrees.where((e) => e['statut'] == 'annule').length;
    final inscrits = _entrees.where((e) => e['inscrit'] == true).length;
    final children = <Widget>[
      Text(widget.activiteNom, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: Cp.s1),
      if (!_loading && _error == null)
        Text(isEn ? '$presents present, $absents absent, $annules cancelled, out of $inscrits registered.' : '$presents présents, $absents absents, $annules annulés, sur $inscrits inscrits.', style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      // Carte du taux, lot 1, 31 oct. 2026 : seulement pour un camp,
      // jamais pour une activité d'établissement, qui n'a pas
      // d'inscriptions.
      if (!_loading && _error == null && _activiteType == 'evenement' && _taux != null) ...[
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(tr('Taux de présence'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
              const SizedBox(height: 4),
              if ((_taux!['taux'] as num?) != null) ...[
                Text('${_taux!['taux']} %', style: const TextStyle(color: Cp.navy, fontSize: 32, fontWeight: FontWeight.w800)),
                const SizedBox(height: 2),
                Text(isEn ? '${_taux!['presents']} present out of ${_taux!['inscrits']} registered.' : '${_taux!['presents']} présents sur ${_taux!['inscrits']} inscrits.', style: t.bodyMedium),
              ] else
                Text(tr('Aucun inscrit pour le moment.'), style: t.bodyMedium),
            ]),
          ),
        ),
        const SizedBox(height: Cp.s1),
      ],
      Wrap(spacing: 8, runSpacing: 8, children: [
        FilledButton.icon(
          icon: const Icon(Icons.qr_code_scanner_outlined),
          label: Text(tr('Scanner')),
          onPressed: () => go(context, PresenceScanPage(activiteId: widget.activiteId, activiteNom: widget.activiteNom)),
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.person_add_outlined),
          label: Text(tr('Ajouter')),
          onPressed: _ajouterManuel,
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.share_outlined),
          label: Text(tr('Exporter CSV')),
          onPressed: _exporter,
        ),
      ]),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([
        Text(_error!, style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        OutlinedButton(onPressed: _load, child: Text(tr('Réessayer'))),
      ]);
    } else if (_entrees.isEmpty) {
      children.add(EmptyNote(icon: Icons.playlist_add_check_outlined, text: tr('Aucune présence pour le moment. Scannez une carte ou ajoutez un membre à la main.')));
    } else {
      for (final e in _entrees) {
        final statut = (e['statut'] ?? '').toString();
        final methode = (e['methode'] ?? '').toString();
        children.addAll([
          Card(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              ListTile(
                title: Text('${e['nom_complet'] ?? ''} · ${e['matricule'] ?? ''}', style: t.labelLarge),
                subtitle: Text([
                  if ((e['scanne_le'] ?? '').toString().isNotEmpty) dateHeure((e['scanne_le'] ?? '').toString()),
                  if (methode == 'scan') tr('Scan') else if (methode == 'manuel') tr('Manuel'),
                  if (e['inscrit'] != true) tr('Sans inscription'),
                ].join(' · '),
                    style: t.bodyMedium),
                trailing: _statutPresenceChip(statut),
              ),
              if (statut == 'present')
                Padding(
                  padding: const EdgeInsets.only(left: 16, bottom: 8),
                  child: Wrap(spacing: 8, children: [
                    TextButton(onPressed: () => _annuler(e), child: Text(tr('Annuler cette présence'))),
                    // Certificat, lot 1, 31 oct. 2026 : seulement pour
                    // un camp, et seulement pour un membre présent.
                    if (_activiteType == 'evenement')
                      TextButton(onPressed: () => _certificat(e), child: Text(tr('Certificat'))),
                  ]),
                ),
              if (statut == 'absent')
                Padding(
                  padding: const EdgeInsets.only(left: 16, bottom: 8),
                  child: FilledButton(onPressed: () => _marquerPresent(e), child: Text(tr('Marquer présent'))),
                ),
            ]),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Liste de présence'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

class PerimeterMembersPage extends StatefulWidget {
  const PerimeterMembersPage({super.key});
  @override
  State<PerimeterMembersPage> createState() => _PerimeterMembersPageState();
}

class _PerimeterMembersPageState extends State<PerimeterMembersPage> {
  List<Map<String, dynamic>> _membres = [];
  String? _etablissementId;
  bool _preparation = false;
  String _preparationTexte = '';
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchAdminMembres(etablissementId: _etablissementId);
      if (!mounted) return;
      setState(() {
        _membres = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  Future<void> _choisirPerimetre() async {
    final etabs = app.etabs.where((e) => e.id.isNotEmpty).toList();
    final choix = await pick<Etab>(context, tr('Périmètre'), [Etab(tr('Tous les établissements')), ...etabs], (e) => e.name);
    if (choix == null) return;
    setState(() {
      _etablissementId = choix.id.isEmpty ? null : choix.id;
    });
    _load();
  }

  String _nomEtablissement(String id) {
    for (final e in app.etabs) {
      if (e.id == id) return e.name;
    }
    return tr('Établissement');
  }

  Future<List<Map<String, dynamic>>> _detailsActuels() {
    return api.fetchAdminMembres(etablissementId: _etablissementId, details: true);
  }

  List<PrintFiche> _fichesDepuis(List<Map<String, dynamic>> liste) {
    return [
      for (final row in liste)
        PrintFiche(
          nom: (row['nom_complet'] ?? '').toString(),
          matricule: (row['matricule'] ?? '').toString(),
          telephone: (row['telephone'] ?? '').toString(),
          email: (row['email'] ?? '').toString(),
          etablissement: (row['etablissement'] ?? '').toString(),
          fonction: (row['fonction'] ?? '').toString(),
          inscritLe: _dateCourte((row['inscrit_le'] ?? '').toString()),
          valideJusqua: _dateCourte((row['valide_jusqua'] ?? '').toString()),
          cotisation: (row['cotisation_statut'] ?? '').toString() == 'confirme'
              ? tr('Confirmée')
              : (row['cotisation_statut'] ?? '').toString() == 'en_attente'
                  ? tr('En attente')
                  : tr('Aucune'),
        ),
    ];
  }

  Future<void> _imprimerCartes() async {
    setState(() {
      _preparation = true;
      _preparationTexte = tr('Préparation des cartes…');
    });
    try {
      final liste = await _detailsActuels();
      if (!mounted) return;
      if (liste.isEmpty) {
        setState(() => _preparation = false);
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final logoUrl = await _logoDataUrl();
      final membres = <PrintMember>[];
      for (var i = 0; i < liste.length; i++) {
        final row = liste[i];
        final matricule = (row['matricule'] ?? '').toString();
        if (matricule.isEmpty) continue;
        if (!mounted) return;
        setState(() => _preparationTexte = '${tr('Préparation')} ${i + 1} / ${liste.length}');
        final fonction = (row['fonction'] ?? '').toString();
        membres.add(PrintMember(
          name: (row['nom_complet'] ?? '').toString(),
          matricule: matricule,
          fonction: fonction.isEmpty || fonction == 'Aucun' ? tr('Membre') : fonction,
          etab: (row['etablissement'] ?? '').toString(),
          photoDataUrl: (row['photo'] ?? '').toString(),
          valideLabel: _moisAnnee((row['valide_jusqua'] ?? '').toString()),
          qrDataUrl: await _qrDataUrl(matricule),
        ));
      }
      if (!mounted) return;
      setState(() => _preparation = false);
      if (membres.isEmpty) {
        toast(context, tr('Aucune carte à imprimer.'));
        return;
      }
      await openPrintDocument('cartes-membres.html', buildCardsHtml(membres, logoUrl));
    } catch (e) {
      if (!mounted) return;
      setState(() => _preparation = false);
      toast(context, '$e');
    }
  }

  Future<void> _exporterFichesCsv() async {
    setState(() {
      _preparation = true;
      _preparationTexte = tr('Préparation des fiches…');
    });
    try {
      final liste = await _detailsActuels();
      if (!mounted) return;
      setState(() => _preparation = false);
      if (liste.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final fiches = _fichesDepuis(liste);
      final lignes = <String>[[
        tr('Nom'),
        tr('Matricule'),
        tr('Téléphone'),
        tr('E-mail'),
        tr('Établissement'),
        tr('Fonction'),
        tr('Inscrit le'),
        tr('Valide jusqu’au'),
        tr('Cotisation'),
      ].map(_csvChamp).join(';')];
      for (final f in fiches) {
        lignes.add([
          _csvChamp(f.nom),
          _csvChamp(f.matricule),
          _csvChamp(f.telephone),
          _csvChamp(f.email),
          _csvChamp(f.etablissement),
          _csvChamp(f.fonction),
          _csvChamp(f.inscritLe),
          _csvChamp(f.valideJusqua),
          _csvChamp(f.cotisation),
        ].join(';'));
      }
      final contenu = lignes.join('\n');
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(contenu)];
      await downloadBytesFile('fiches-membres.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Fiches exportées.'));
    } catch (e) {
      if (!mounted) return;
      setState(() => _preparation = false);
      toast(context, '$e');
    }
  }

  Future<void> _imprimerFiches() async {
    setState(() {
      _preparation = true;
      _preparationTexte = tr('Préparation des fiches…');
    });
    try {
      final liste = await _detailsActuels();
      if (!mounted) return;
      setState(() => _preparation = false);
      if (liste.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final titre = _etablissementId == null
          ? tr('Fiches des membres')
          : '${tr('Fiches des membres')} · ${_nomEtablissement(_etablissementId!)}';
      await openPrintDocument('fiches-membres.html', buildFichesHtml(titre, _fichesDepuis(liste)));
    } catch (e) {
      if (!mounted) return;
      setState(() => _preparation = false);
      toast(context, '$e');
    }
  }

  // Suppression définitive de compte, 31 oct. 2026 : dialogue
  // nommant le membre et ses conséquences, puis rechargement.
  Future<void> _supprimerMembre(Map<String, dynamic> m) async {
    final id = (m['id'] ?? '').toString();
    final nom = (m['nom_complet'] ?? '').toString();
    final mat = (m['matricule'] ?? '').toString();
    if (id.isEmpty) return;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer ce compte ?')),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('$nom ($mat)', style: Theme.of(ctx).textTheme.labelLarge),
            const SizedBox(height: Cp.s1),
            Text(tr('Ce compte sera définitivement supprimé. Ses paiements et ses traces restent visibles sous « Compte supprimé », et son matricule ne sera jamais réutilisé.')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.supprimerMembre(id);
      if (!mounted) return;
      toast(context, tr('Compte supprimé.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Lecture seule : cette liste ne permet ni de créer, ni de modifier un membre.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Wrap(spacing: 8, runSpacing: 8, children: [
        if (app.isAdminGeneral)
          OutlinedButton.icon(
            icon: const Icon(Icons.filter_list_outlined),
            label: Text(_etablissementId == null ? tr('Tous les établissements') : _nomEtablissement(_etablissementId!)),
            onPressed: _choisirPerimetre,
          ),
        FilledButton.icon(
          icon: const Icon(Icons.print_outlined),
          label: Text(tr('Toutes les cartes')),
          onPressed: _preparation ? null : _imprimerCartes,
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.table_chart_outlined),
          label: Text(tr('Exporter les fiches (CSV)')),
          onPressed: _preparation ? null : _exporterFichesCsv,
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.print_outlined),
          label: Text(tr('Fiches imprimables')),
          onPressed: _preparation ? null : _imprimerFiches,
        ),
      ]),
      const SizedBox(height: Cp.s2),
      if (_preparation)
        Row(children: [
          const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)),
          const SizedBox(width: 8),
          Expanded(child: Text(_preparationTexte, style: t.bodyMedium)),
        ]),
      if (_preparation) const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_membres.isEmpty) {
      children.add(EmptyNote(icon: Icons.group_outlined, text: tr('Aucun membre dans votre périmètre.')));
    } else {
      for (final m in _membres) {
        children.addAll([
          Card(
            child: ListTile(
              title: Text('${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}', style: t.labelLarge),
              subtitle: Text([
                if ((m['fonction'] ?? '').toString().isNotEmpty) (m['fonction'] ?? '').toString(),
                if ((m['etablissement'] ?? '').toString().isNotEmpty) (m['etablissement'] ?? '').toString(),
              ].join(' · '),
                  style: t.bodyMedium),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    tooltip: tr('Voir la carte'),
                    icon: const Icon(Icons.badge_outlined),
                    onPressed: () {
                      final id = (m['id'] ?? '').toString();
                      if (id.isEmpty) return;
                      go(context, AdminMemberCardPage(membreId: id, nom: (m['nom_complet'] ?? '').toString()));
                    },
                  ),
                  if (app.isAdminGeneral)
                    IconButton(
                      tooltip: tr('Supprimer ce compte'),
                      icon: const Icon(Icons.person_remove_outlined),
                      onPressed: () => _supprimerMembre(m),
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Membres'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

class PerimeterCotisationsPage extends StatefulWidget {
  const PerimeterCotisationsPage({super.key});
  @override
  State<PerimeterCotisationsPage> createState() => _PerimeterCotisationsPageState();
}

class _PerimeterCotisationsPageState extends State<PerimeterCotisationsPage> {
  List<Map<String, dynamic>> _membres = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchAdminMembres();
      if (!mounted) return;
      setState(() {
        _membres = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(isEn ? 'Status from existing payments only: a confirmed payment counts, a pending one stays pending. No payment rule changes here.' : 'Statut calculé sur les paiements existants seulement : un paiement confirmé compte, un paiement en attente reste en attente. Aucune règle de paiement ne change ici.', style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_membres.isEmpty) {
      children.add(EmptyNote(icon: Icons.group_outlined, text: tr('Aucun membre dans votre périmètre.')));
    } else {
      for (final m in _membres) {
        final statut = (m['cotisation_statut'] ?? '').toString();
        final label = statut == 'confirme' ? tr('Confirmée') : statut == 'en_attente' ? tr('En attente') : tr('Aucune');
        final dernier = (m['dernier_paiement_cotisation'] ?? '').toString();
        children.addAll([
          Card(
            child: ListTile(
              title: Text('${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}', style: t.labelLarge),
              subtitle: Text(dernier.isNotEmpty ? '${tr('Dernier paiement')} : ${dateFr(DateTime.tryParse(dernier) ?? DateTime.now())}' : tr('Aucun paiement de cotisation.'), style: t.bodyMedium),
              trailing: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(color: statut == 'confirme' ? const Color(0xFFE6F4EA) : statut == 'en_attente' ? const Color(0xFFFDF4D8) : const Color(0xFFEFF1F5), borderRadius: BorderRadius.circular(999)),
                child: Text(label, style: TextStyle(color: statut == 'confirme' ? const Color(0xFF137333) : statut == 'en_attente' ? Cp.goldDeep : Cp.inkMuted, fontWeight: FontWeight.w700, fontSize: 13)),
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Cotisations'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

class PerimeterPresencesPage extends StatefulWidget {
  const PerimeterPresencesPage({super.key});
  @override
  State<PerimeterPresencesPage> createState() => _PerimeterPresencesPageState();
}

class _PerimeterPresencesPageState extends State<PerimeterPresencesPage> {
  List<Map<String, dynamic>> _presences = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchPresences();
      if (!mounted) return;
      setState(() {
        _presences = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Toutes les présences de votre périmètre, les plus récentes d’abord.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_presences.isEmpty) {
      children.add(EmptyNote(icon: Icons.playlist_add_check_outlined, text: tr('Aucune présence pour le moment.')));
    } else {
      for (final p in _presences) {
        final statut = (p['statut'] ?? '').toString();
        final methode = (p['methode'] ?? '').toString();
        children.addAll([
          Card(
            child: ListTile(
              title: Text((p['activite_nom'] ?? '').toString(), style: t.labelLarge),
              subtitle: Text([
                '${p['nom_complet'] ?? ''} · ${p['matricule'] ?? ''}',
                dateHeure((p['scanne_le'] ?? '').toString()),
                if (methode == 'scan') tr('Scan') else if (methode == 'manuel') tr('Manuel'),
                if ((p['scanne_par_nom'] ?? '').toString().isNotEmpty) '${tr('Par')} ${(p['scanne_par_nom'] ?? '')}',
              ].where((s) => s.isNotEmpty).join(' · '),
                  style: t.bodyMedium),
              trailing: _statutPresenceChip(statut),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Présences'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

String _auditActionLabel(String action) {
  switch (action) {
    case 'presence.scan':
      return tr('Présence scannée');
    case 'presence.manuel':
      return tr('Présence ajoutée à la main');
    case 'presence.reprise':
      return tr('Présence rétablie');
    case 'presence.annuler':
      return tr('Présence annulée');
    default:
      return action;
  }
}

class AuditListPage extends StatefulWidget {
  const AuditListPage({super.key});
  @override
  State<AuditListPage> createState() => _AuditListPageState();
}

class _AuditListPageState extends State<AuditListPage> {
  List<Map<String, dynamic>> _lignes = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final list = await api.fetchAudit();
      if (!mounted) return;
      setState(() {
        _lignes = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Qui a marqué, ajouté ou annulé une présence, et quand. Réservé à l’administrateur général.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_lignes.isEmpty) {
      children.add(EmptyNote(icon: Icons.history_outlined, text: tr('Aucune entrée dans le journal pour le moment.')));
    } else {
      for (final a in _lignes) {
        final details = a['details'];
        final d = details is Map<String, dynamic> ? details : <String, dynamic>{};
        final acteur = (a['acteur_nom'] ?? '').toString();
        final matricule = (a['acteur_matricule'] ?? '').toString();
        children.addAll([
          Card(
            child: ListTile(
              title: Text(_auditActionLabel((a['action'] ?? '').toString()), style: t.labelLarge),
              subtitle: Text([
                dateHeure((a['horodatage'] ?? '').toString()),
                if (acteur.isNotEmpty) '$acteur${matricule.isNotEmpty ? ' · $matricule' : ''}',
                if ((d['activite_nom'] ?? '').toString().isNotEmpty) (d['activite_nom'] ?? '').toString(),
                if ((d['membre_nom'] ?? '').toString().isNotEmpty) '${d['membre_nom']} · ${d['matricule'] ?? ''}',
              ].where((s) => s.isNotEmpty).join(' · '),
                  style: t.bodyMedium),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Journal d’audit'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

// Anniversaires, 29 oct. 2026 : liste du jour et du mois, jour et
// mois seulement, jamais l'année de naissance ni un âge, pour
// aucun membre. Périmètre serveur : l'admin général voit tout,
// l'admin d'établissement voit son établissement.
class AnniversairesPage extends StatefulWidget {
  const AnniversairesPage({super.key});
  @override
  State<AnniversairesPage> createState() => _AnniversairesPageState();
}

class _AnniversairesPageState extends State<AnniversairesPage> {
  List<Map<String, dynamic>> _jour = [];
  List<Map<String, dynamic>> _mois = [];
  bool _loading = true;
  String? _error;

  static const _nomsMois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  String _jourMois(Map<String, dynamic> a) {
    final jour = (a['jour'] as num?)?.toInt() ?? 0;
    final mois = (a['mois'] as num?)?.toInt() ?? 0;
    final nom = (mois >= 1 && mois <= 12) ? _nomsMois[mois - 1] : '';
    return '$jour $nom';
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchAdminAnniversaires();
      if (!mounted) return;
      List<Map<String, dynamic>> asList(dynamic v) {
        if (v is List) return v.whereType<Map<String, dynamic>>().toList();
        return [];
      }

      setState(() {
        _jour = asList(data['jour']);
        _mois = asList(data['mois']);
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(tr('Anniversaires du jour et du mois, jour et mois seulement. Aucune année de naissance, aucun âge n’est jamais affiché.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else {
      children.add(Text(tr('Aujourd’hui'), style: t.titleMedium));
      children.add(const SizedBox(height: Cp.s1));
      if (_jour.isEmpty) {
        children.add(Text(tr('Aucun anniversaire aujourd’hui.'), style: t.bodyMedium));
      } else {
        for (final a in _jour) {
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.cake_outlined, color: Cp.goldDeep),
              title: Text((a['nom_complet'] ?? '').toString(), style: t.labelLarge),
              subtitle: Text('${(a['matricule'] ?? '').toString()}${(a['etablissement'] ?? '').toString().isEmpty ? '' : ' · ${(a['etablissement'] ?? '').toString()}'}', style: t.bodyMedium),
              trailing: Text(_jourMois(a), style: t.labelLarge),
            ),
          ));
        }
      }
      children.add(const SizedBox(height: Cp.s2));
      children.add(Text(tr('Ce mois-ci'), style: t.titleMedium));
      children.add(const SizedBox(height: Cp.s1));
      if (_mois.isEmpty) {
        children.add(Text(tr('Aucun autre anniversaire ce mois-ci.'), style: t.bodyMedium));
      } else {
        for (final a in _mois) {
          children.add(Card(
            child: ListTile(
              leading: const Icon(Icons.calendar_month_outlined, color: Cp.goldDeep),
              title: Text((a['nom_complet'] ?? '').toString(), style: t.labelLarge),
              subtitle: Text('${(a['matricule'] ?? '').toString()}${(a['etablissement'] ?? '').toString().isEmpty ? '' : ' · ${(a['etablissement'] ?? '').toString()}'}', style: t.bodyMedium),
              trailing: Text(_jourMois(a), style: t.labelLarge),
            ),
          ));
        }
      }
    }
    return basic(tr('Anniversaires'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

class _ChartBar extends StatelessWidget {
  const _ChartBar({required this.label, required this.count, required this.amount, required this.fraction, required this.color});
  final String label;
  final int count;
  final int amount;
  final double fraction;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(children: [
        SizedBox(
          width: 92,
          child: Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Cp.ink)),
        ),
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Container(
              height: 22,
              color: Cp.line,
              alignment: Alignment.centerLeft,
              child: FractionallySizedBox(
                widthFactor: fraction.clamp(0.0, 1.0),
                child: Container(color: color),
              ),
            ),
          ),
        ),
        const SizedBox(width: 8),
        SizedBox(
          width: 108,
          child: Text('$count · ${fcfa(amount)}', textAlign: TextAlign.right, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Cp.inkMuted)),
        ),
      ]),
    );
  }
}

class _AdminChartsSection extends StatefulWidget {
  const _AdminChartsSection();

  @override
  State<_AdminChartsSection> createState() => _AdminChartsSectionState();
}

class _AdminChartsSectionState extends State<_AdminChartsSection> {
  List<Map<String, dynamic>> _payments = [];
  bool _loading = true;
  String? _error;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _load();
    _timer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted) _load(silent: true);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _load({bool silent = false}) async {
    if (!silent) setState(() => _loading = true);
    try {
      final payments = await api.fetchAdminPayments();
      if (!mounted) return;
      setState(() {
        _payments = payments;
        _loading = false;
        _error = null;
      });
    } catch (e) {
      if (silent) return;
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = e.toString().contains('(403)')
            ? 'Vue réservée à l’administrateur général.'
            : 'Vue indisponible : $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    if (_loading) return Text(tr('Chargement…'), style: t.bodyMedium);
    if (_error != null) {
      return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(_error!, style: t.bodyMedium),
        TextButton(onPressed: () => _load(), child: Text(tr('Réessayer'))),
      ]);
    }
    int countFor(String statut) => _payments.where((p) => (p['statut'] ?? '') == statut).length;
    int amountFor(String statut) => _payments.where((p) => (p['statut'] ?? '') == statut).fold<int>(0, (sum, p) => sum + ((p['montant_fcfa'] as num?)?.toInt() ?? 0));
    int typeCount(String type) => _payments.where((p) => (p['type'] ?? '') == type).length;
    int typeAmount(String type) => _payments.where((p) => (p['type'] ?? '') == type).fold<int>(0, (sum, p) => sum + ((p['montant_fcfa'] as num?)?.toInt() ?? 0));
    final maxStatut = [countFor('en_attente'), countFor('confirme'), countFor('refuse'), countFor('annule')].fold<int>(0, (m, v) => v > m ? v : m);
    final maxType = [typeCount('don'), typeCount('cotisation'), typeCount('carte'), typeCount('achat'), typeCount('camp')].fold<int>(0, (m, v) => v > m ? v : m);
    double frac(int v, int max) => max <= 0 ? 0 : (v <= 0 ? 0 : (v / max).clamp(0.06, 1.0));
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      heading(context, tr('Vue d’ensemble')),
      Row(children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('TOTAL CONFIRMÉ', style: TextStyle(color: Colors.white70, fontSize: 13, fontWeight: FontWeight.w600, letterSpacing: 1.2)),
              const SizedBox(height: 12),
              Text(fcfa(amountFor('confirme')), style: const TextStyle(color: Color(0xFF2FD27A), fontSize: 30, fontWeight: FontWeight.w800)),
              const SizedBox(height: 4),
              Text('${countFor('confirme')} ${tr('paiements')}', style: const TextStyle(color: Colors.white70, fontSize: 13)),
            ]),
          ),
        ),
        const SizedBox(width: Cp.s1),
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.gold)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('TOTAL EN ATTENTE', style: TextStyle(color: Cp.inkMuted, fontSize: 13, fontWeight: FontWeight.w600, letterSpacing: 1.2)),
              const SizedBox(height: 12),
              Text(fcfa(amountFor('en_attente')), style: const TextStyle(color: Cp.goldDeep, fontSize: 30, fontWeight: FontWeight.w800)),
              const SizedBox(height: 4),
              Text('${countFor('en_attente')} ${tr('paiements')}', style: const TextStyle(color: Cp.inkMuted, fontSize: 13)),
            ]),
          ),
        ),
      ]),
      const SizedBox(height: Cp.s2),
      Card(
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Paiements par statut'), style: t.titleMedium),
            const SizedBox(height: Cp.s1),
            _ChartBar(label: tr('En attente'), count: countFor('en_attente'), amount: amountFor('en_attente'), fraction: frac(countFor('en_attente'), maxStatut), color: Cp.gold),
            _ChartBar(label: tr('Confirmés'), count: countFor('confirme'), amount: amountFor('confirme'), fraction: frac(countFor('confirme'), maxStatut), color: Cp.ok),
            _ChartBar(label: tr('Refusés'), count: countFor('refuse'), amount: amountFor('refuse'), fraction: frac(countFor('refuse'), maxStatut), color: Cp.danger),
            if (countFor('annule') > 0) _ChartBar(label: tr('Annulés'), count: countFor('annule'), amount: amountFor('annule'), fraction: frac(countFor('annule'), maxStatut), color: Cp.inkMuted),
            const SizedBox(height: Cp.s1),
            Text(tr('Paiements par type'), style: t.titleMedium),
            const SizedBox(height: Cp.s1),
            _ChartBar(label: tr('Don'), count: typeCount('don'), amount: typeAmount('don'), fraction: frac(typeCount('don'), maxType), color: Cp.navy),
            _ChartBar(label: tr('Cotisation'), count: typeCount('cotisation'), amount: typeAmount('cotisation'), fraction: frac(typeCount('cotisation'), maxType), color: Cp.goldDeep),
            _ChartBar(label: tr('Carte'), count: typeCount('carte'), amount: typeAmount('carte'), fraction: frac(typeCount('carte'), maxType), color: Cp.navy),
            _ChartBar(label: tr('Achat'), count: typeCount('achat'), amount: typeAmount('achat'), fraction: frac(typeCount('achat'), maxType), color: Cp.goldDeep),
            _ChartBar(label: tr('Versement du camp'), count: typeCount('camp'), amount: typeAmount('camp'), fraction: frac(typeCount('camp'), maxType), color: Cp.navy),
            const SizedBox(height: Cp.s1),
            Row(children: [
              Expanded(child: Text(tr('Actualisé toutes les 30 secondes.'), style: t.bodyMedium)),
              TextButton(onPressed: () => _load(), child: Text(tr('Actualiser'))),
            ]),
          ]),
        ),
      ),
    ]);
  }
}

class _OnlineMembersSection extends StatefulWidget {
  const _OnlineMembersSection();

  @override
  State<_OnlineMembersSection> createState() => _OnlineMembersSectionState();
}

class _OnlineMembersSectionState extends State<_OnlineMembersSection> {
  List<Map<String, dynamic>> _members = [];
  bool _loading = true;
  String? _error;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _load();
    _timer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted) _load(silent: true);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _load({bool silent = false}) async {
    if (!silent) setState(() => _loading = true);
    try {
      final list = await api.fetchOnlineMembers();
      if (!mounted) return;
      setState(() {
        _members = list;
        _loading = false;
        _error = null;
      });
    } catch (e) {
      if (silent) return;
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = e.toString().contains('(403)')
            ? 'Liste réservée à l’administrateur général.'
            : 'Liste indisponible : $e';
      });
    }
  }

  String _ago(String raw) {
    final d = DateTime.tryParse(raw);
    if (d == null) return '';
    final m = DateTime.now().difference(d).inMinutes;
    if (m <= 0) return tr('à l’instant');
    return tr('il y a $m min');
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      heading(context, tr('Membres en ligne')),
      Card(
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            if (_loading)
              Text(tr('Chargement…'), style: t.bodyMedium)
            else if (_error != null) ...[
              Text(_error!, style: t.bodyMedium),
              TextButton(onPressed: () => _load(), child: Text(tr('Réessayer'))),
            ] else ...[
              Text(
                _members.isEmpty
                    ? tr('Aucun membre en ligne pour le moment.')
                    : '${_members.length} ${tr('membre(s) en ligne')}',
                style: t.titleMedium,
              ),
              const SizedBox(height: Cp.s1),
              Text(tr('Un membre apparaît quand il ouvre l’application. Actualisation toutes les 30 secondes.'), style: t.bodyMedium),
              for (final m in _members) ...[
                const SizedBox(height: Cp.s1),
                Row(children: [
                  Expanded(child: Text((m['nom_complet'] ?? '').toString(), style: t.labelLarge)),
                  Text('${(m['matricule'] ?? '').toString()} · ${_ago((m['derniere_activite'] ?? '').toString())}', style: t.bodyMedium),
                ]),
              ],
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(onPressed: () => _load(), child: Text(tr('Actualiser'))),
              ),
            ],
          ]),
        ),
      ),
    ]);
  }
}


// ─────────────── CARTES ET BADGES POUR L'ADMINISTRATION, 30 oct. 2026 ───────────────

/// Mois et année d'une date serveur, sans décalage de fuseau : la
/// date est lue telle quelle, jamais convertie en instant.
String _moisAnnee(String iso) {
  final propre = iso.contains('T') ? iso.split('T').first : iso;
  final parties = propre.split('-');
  if (parties.length >= 2 && parties[0].length == 4) return '${parties[1]}/${parties[0]}';
  return propre;
}

/// Jour, mois et année d'une date serveur, sans décalage de fuseau.
String _dateCourte(String iso) {
  final propre = iso.contains('T') ? iso.split('T').first : iso;
  final parties = propre.split('-');
  if (parties.length >= 3 && parties[0].length == 4) return '${parties[2]}/${parties[1]}/${parties[0]}';
  return propre;
}

String _nomFichier(String titre) {
  final propre = titre.replaceAll(RegExp(r'[^A-Za-z0-9 _-]'), '').trim().replaceAll(' ', '_');
  return propre.isEmpty ? 'document' : propre;
}

/// QR en image PNG, encodé en data URL, pour les documents imprimés.
Future<String> _qrDataUrl(String data) async {
  final painter = QrPainter(data: data, version: QrVersions.auto, gapless: false);
  final bytes = await painter.toImageData(240);
  if (bytes == null) return '';
  return 'data:image/png;base64,${base64Encode(bytes.buffer.asUint8List())}';
}

Future<String> _logoDataUrl() async {
  final bytes = await rootBundle.load('assets/logo.png');
  return 'data:image/png;base64,${base64Encode(bytes.buffer.asUint8List())}';
}

Future<String> _monogrammeDataUrl() async {
  final bytes = await rootBundle.load('assets/cp_monogram.png');
  return 'data:image/png;base64,${base64Encode(bytes.buffer.asUint8List())}';
}

/// Membre reconstruit depuis la fiche administrateur : mêmes champs
/// que la carte du membre, pour afficher exactement la même carte.
Member _membreDepuisDetail(Map<String, dynamic> d) {
  DateTime? parseDate(String? s) {
    if (s == null || s.isEmpty) return null;
    final propre = s.contains('T') ? s.split('T').first : s;
    final parties = propre.split('-');
    if (parties.length == 3) {
      final y = int.tryParse(parties[0]);
      final mo = int.tryParse(parties[1]);
      final j = int.tryParse(parties[2]);
      if (y != null && mo != null && j != null) return DateTime(y, mo, j);
    }
    try {
      return DateTime.parse(s);
    } catch (_) {
      return null;
    }
  }

  return Member(
    (d['nom_complet'] ?? '').toString(),
    (d['matricule'] ?? '').toString(),
    (d['etablissement'] ?? '').toString(),
    parseDate((d['inscrit_le'] ?? '').toString()) ?? DateTime.now(),
    fonction: (d['fonction'] ?? '').toString(),
    photoData: (d['photo'] ?? '').toString(),
    validUntilOverride: parseDate((d['valide_jusqua'] ?? '').toString()),
  );
}

class AdminMemberCardPage extends StatefulWidget {
  const AdminMemberCardPage({super.key, required this.membreId, required this.nom});
  final String membreId;
  final String nom;

  @override
  State<AdminMemberCardPage> createState() => _AdminMemberCardPageState();
}

class _AdminMemberCardPageState extends State<AdminMemberCardPage> {
  final _cardKey = GlobalKey();
  Map<String, dynamic>? _detail;
  bool _loading = true;
  String? _error;
  bool _preparation = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final detail = await api.fetchAdminMembreDetail(widget.membreId);
      if (!mounted) return;
      setState(() {
        _detail = detail;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  Member? get _membre {
    final d = _detail;
    if (d == null) return null;
    return _membreDepuisDetail(d);
  }

  Future<void> _imprimer() async {
    final m = _membre;
    if (m == null) return;
    setState(() => _preparation = true);
    try {
      final logoUrl = await _logoDataUrl();
      final fonction = m.fonction.isEmpty || m.fonction == 'Aucun' ? tr('Membre') : m.fonction;
      final html = buildCardsHtml([
        PrintMember(
          name: m.name,
          matricule: m.matricule,
          fonction: fonction,
          etab: m.etab,
          photoDataUrl: m.photoData,
          valideLabel: _moisAnnee('${m.validUntil.year.toString().padLeft(4, '0')}-${m.validUntil.month.toString().padLeft(2, '0')}-01'),
          qrDataUrl: await _qrDataUrl(m.matricule),
        ),
      ], logoUrl);
      await openPrintDocument('carte-${m.matricule}.html', html);
    } catch (e) {
      if (mounted) toast(context, '$e');
    } finally {
      if (mounted) setState(() => _preparation = false);
    }
  }

  Future<void> _telechargerPng() async {
    final m = _membre;
    if (m == null) return;
    final boundary = _cardKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) {
      if (mounted) toast(context, tr('La carte n’est pas encore affichée.'));
      return;
    }
    final image = await boundary.toImage(pixelRatio: 3);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    final png = bytes?.buffer.asUint8List();
    if (png == null || png.isEmpty) {
      if (mounted) toast(context, tr('Impossible de créer l’image de la carte.'));
      return;
    }
    await downloadBytesFile('carte-${m.matricule}.png', png, 'image/png');
    if (mounted) toast(context, tr('Carte téléchargée.'));
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final m = _membre;
    final telephone = ((_detail?['telephone'] ?? '').toString());
    final email = ((_detail?['email'] ?? '').toString());
    final children = <Widget>[];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (m == null) {
      children.add(EmptyNote(icon: Icons.badge_outlined, text: tr('Membre introuvable.')));
    } else {
      children.addAll([
        Center(child: RepaintBoundary(key: _cardKey, child: MemberCardView(m: m))),
        const SizedBox(height: Cp.s2),
        Text(
          isEn
              ? 'Validity: 1 year, created ${m.since.month.toString().padLeft(2, '0')}/${m.since.year}, valid until ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}.'
              : 'Validité : 1 an, créée en ${m.since.month.toString().padLeft(2, '0')}/${m.since.year}, valide jusqu’au ${m.validUntil.month.toString().padLeft(2, '0')}/${m.validUntil.year}.',
          style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        const SizedBox(height: Cp.s2),
        if (telephone.isNotEmpty || email.isNotEmpty)
          Card(
            child: Column(children: [
              if (telephone.isNotEmpty)
                ListTile(
                  leading: const Icon(Icons.phone_outlined),
                  title: Text(tr('Téléphone'), style: t.labelLarge),
                  subtitle: Text(telephone, style: t.bodyMedium),
                ),
              if (email.isNotEmpty)
                ListTile(
                  leading: const Icon(Icons.email_outlined),
                  title: Text(tr('E-mail'), style: t.labelLarge),
                  subtitle: Text(email, style: t.bodyMedium),
                ),
            ]),
          ),
        if (telephone.isNotEmpty || email.isNotEmpty) const SizedBox(height: Cp.s2),
        Wrap(spacing: 8, runSpacing: 8, children: [
          FilledButton.icon(
            icon: const Icon(Icons.print_outlined),
            label: Text(_preparation ? tr('Préparation…') : tr('Imprimer')),
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
            onPressed: _preparation ? null : _imprimer,
          ),
          OutlinedButton.icon(
            icon: const Icon(Icons.download_outlined),
            label: Text(tr('Carte PNG')),
            onPressed: _telechargerPng,
          ),
        ]),
      ]);
    }
    return basic('Carte de ${widget.nom}', children);
  }
}

class CampBadgesPrintPage extends StatefulWidget {
  const CampBadgesPrintPage({super.key, required this.camp});
  final Camp camp;

  @override
  State<CampBadgesPrintPage> createState() => _CampBadgesPrintPageState();
}

class _CampBadgesPrintPageState extends State<CampBadgesPrintPage> {
  List<Map<String, dynamic>> _inscrits = [];
  bool _loading = true;
  String? _error;
  bool _preparation = false;
  String _preparationTexte = '';

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchPresencesActivite(widget.camp.serverId);
      final entrees = (data['entrees'] as List?) ?? [];
      final inscrits = <Map<String, dynamic>>[];
      for (final e in entrees) {
        if (e is Map && e['inscrit'] == true) {
          inscrits.add(Map<String, dynamic>.from(e));
        }
      }
      if (!mounted) return;
      setState(() {
        _inscrits = inscrits;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = '$e';
      });
    }
  }

  Future<void> _imprimerBadges() async {
    if (_inscrits.isEmpty) {
      toast(context, tr('Aucun inscrit pour ce camp.'));
      return;
    }
    setState(() {
      _preparation = true;
      _preparationTexte = tr('Préparation des badges…');
    });
    try {
      final monoUrl = await _monogrammeDataUrl();
      final badges = <PrintBadge>[];
      var manquants = 0;
      for (var i = 0; i < _inscrits.length; i++) {
        final inscrit = _inscrits[i];
        if (!mounted) return;
        setState(() => _preparationTexte = '${tr('Préparation')} ${i + 1} / ${_inscrits.length}');
        try {
          final detail = await api.fetchAdminMembreDetail((inscrit['membre_id'] ?? '').toString());
          final matricule = (detail['matricule'] ?? inscrit['matricule'] ?? '').toString();
          if (matricule.isEmpty) {
            manquants++;
            continue;
          }
          badges.add(PrintBadge(
            name: (detail['nom_complet'] ?? inscrit['nom_complet'] ?? '').toString(),
            role: badgeRole((detail['fonction'] ?? '').toString()),
            matricule: matricule,
            etab: (detail['etablissement'] ?? '').toString(),
            photoDataUrl: (detail['photo'] ?? '').toString(),
            campName: widget.camp.name,
            campDates: widget.camp.dates,
            campLieu: widget.camp.place,
            qrDataUrl: await _qrDataUrl(matricule),
          ));
        } catch (_) {
          manquants++;
        }
      }
      if (!mounted) return;
      setState(() => _preparation = false);
      if (badges.isEmpty) {
        toast(context, tr('Impossible de préparer les badges.'));
        return;
      }
      await openPrintDocument('badges-${_nomFichier(widget.camp.name)}.html', buildBadgesHtml(badges, monoUrl));
      if (mounted && manquants > 0) toast(context, '${tr('Badges non préparés')} : $manquants');
    } catch (e) {
      if (!mounted) return;
      setState(() => _preparation = false);
      toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final children = <Widget>[
      Text(widget.camp.name, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      if (widget.camp.dates.isNotEmpty || widget.camp.place.isNotEmpty)
        Text([widget.camp.dates, widget.camp.place].where((s) => s.isNotEmpty).join(' · '), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Wrap(spacing: 8, runSpacing: 8, children: [
        FilledButton.icon(
          icon: const Icon(Icons.print_outlined),
          label: Text(_preparation ? tr('Préparation…') : tr('Imprimer les badges')),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          onPressed: (_loading || _preparation) ? null : _imprimerBadges,
        ),
      ]),
      const SizedBox(height: Cp.s2),
      if (_preparation)
        Row(children: [
          const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)),
          const SizedBox(width: 8),
          Expanded(child: Text(_preparationTexte, style: t.bodyMedium)),
        ]),
      if (_preparation) const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator())));
    } else if (_error != null) {
      children.addAll([Text(_error!, style: t.bodyMedium), const SizedBox(height: Cp.s1), OutlinedButton(onPressed: _load, child: Text(tr('Réessayer')))]);
    } else if (_inscrits.isEmpty) {
      children.add(EmptyNote(icon: Icons.badge_outlined, text: tr('Aucun inscrit pour ce camp.')));
    } else {
      for (final inscrit in _inscrits) {
        children.addAll([
          Card(
            child: ListTile(
              title: Text('${inscrit['nom_complet'] ?? ''} · ${inscrit['matricule'] ?? ''}', style: t.labelLarge),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic('Badges : ${widget.camp.name}', children);
  }
}

// Refonte de l'espace administrateur, etape 1, 1er nov. 2026 :
// coquille de navigation centralisee, sans aucune fonction
// supprimee ni modifiee. La page AdminPage regroupe les tuiles
// existantes en 7 espaces, sans toucher aux ecrans eux-memes
// ni a leurs gardes. Sur ordinateur (Rx.isDesktop), une barre
// laterale permanente liste les 7 espaces et la zone principale
// affiche l'espace selectionne. Sur telephone, les 7 espaces
// sont les sections d'une seule liste defilante, comme les
// groupes precedents, sans barre laterale. L'entree reste
// l'onglet Plus, Espace structure, et le chargement differe
// (admin_pages.dart, porte goAdmin) est inchange. Chaque tuile
// existante arrive dans exactement un espace, sans oubli ni
// doublon. Les fonctions qui vivent hors de l'Espace structure
// sont jointes par une tuile de navigation vers l'ecran existant
// reel, sans modifier cet ecran. Quand une fonction n'a aucun
// ecran existant vers lequel naviguer, elle est presentee comme
// une section d'information sans controle, jamais comme un
// bouton factice : inscriptions (pas d'ecran dedie), recus et
// factures (depuis le detail de l'historique), e-mails et
// actualites programmees (Communication), gestion des
// administrateurs et configuration serveur (Parametres).
// Les placements des tuiles non nommees par la correspondance
// imposee sont : exports complets et mode projection dans
// Tableau de bord (outils d'ordinateur, comme avant), question
// de quiz dans Contenus et publications, scanner une carte dans
// Finances (validation par carte, comme avant).
class AdminPage extends StatefulWidget {
  const AdminPage({super.key});

  @override
  State<AdminPage> createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  int _espace = 0;

  List<String> _titres() => [
        tr('Tableau de bord'),
        tr('Contenus et publications'),
        tr('Communauté et membres'),
        tr('Événements'),
        tr('Finances'),
        tr('Communication'),
        tr('Paramètres et sécurité'),
      ];

  List<IconData> get _icones => const [
        Icons.dashboard_outlined,
        Icons.article_outlined,
        Icons.group_outlined,
        Icons.event_outlined,
        Icons.account_balance_wallet_outlined,
        Icons.notifications_outlined,
        Icons.settings_outlined,
      ];

  // Section d'information sans controle, pour une fonction sans
  // ecran existant : titre et texte seulement, aucun bouton.
  Widget _infoSection(BuildContext c, String titre, String texte) {
    final t = Theme.of(c).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(titre, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s1),
        Text(texte, style: t.bodyMedium),
      ]),
    );
  }

  // Tableau de bord : tableau de bord existant (ordinateur
  // seulement), exports et projection (ordinateur seulement),
  // carte d'alerte des montants en attente en double, vue
  // d'ensemble et membres en ligne (general seulement).
  List<Widget> _espaceTableauDeBord(BuildContext c, bool general) => [
        if (Rx.isDesktop(c))
          navCard([
            NavTile(
              icon: Icons.dashboard_outlined,
              label: tr('Tableau de bord'),
              sub: tr('Vue large pour ordinateur, chiffres réels et accès rapide aux pages existantes.'),
              onTap: () => go(c, const AdminDashboardPage()),
            ),
            NavTile(
              icon: Icons.file_download_outlined,
              label: tr('Exports complets'),
              sub: tr('Membres, paiements, présences et inscriptions par camp, au format CSV.'),
              onTap: () => go(c, const ExportsPage()),
            ),
            if (kIsWeb)
              NavTile(
                icon: Icons.slideshow_outlined,
                label: tr('Mode projection'),
                sub: tr('Diapositives plein écran pour une assemblée : verset du jour, camps et actualités, rien que du contenu public.'),
                onTap: () => go(c, const ProjectionPage()),
              ),
          ]),
        if (Rx.isDesktop(c) && general) const SizedBox(height: Cp.s3),
        if (general)
          Builder(builder: (ctx) {
            final pending = app.requests.where((r) => !r.confirmed).toList();
            final t = Theme.of(ctx).textTheme;
            final counts = <int, int>{};
            for (final r in pending) {
              counts[r.amount] = (counts[r.amount] ?? 0) + 1;
            }
            final doubles = counts.entries.where((e) => e.value > 1).toList();
            return Container(
              padding: const EdgeInsets.all(Cp.s2),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Icon(Icons.shield_outlined, color: Cp.goldDeep, size: 28),
                  const SizedBox(width: Cp.s1),
                  Expanded(child: Text(isEn ? 'Pending amounts in duplicate' : 'Montants en attente en double', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                ]),
                const SizedBox(height: Cp.s1),
                Text(isEn ? 'When the same exact amount is pending on several requests, the amount alone cannot tell who paid. Reconcile each request by hand with the transaction ID, date and sender, in your Wave account, then validate after checking. No automatic confirmation is made on amount alone.' : 'Quand le même montant exact est en attente sur plusieurs demandes, le montant seul ne permet pas de savoir qui a payé. Rapprochez chaque demande à la main avec l’identifiant de transaction, la date et l’expéditeur, dans votre compte Wave, puis validez après contrôle. Aucune confirmation automatique ne se fait sur le montant seul.', style: t.bodyMedium),
                const SizedBox(height: Cp.s1),
                if (doubles.isEmpty)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(color: const Color(0xFFDCFCE7), borderRadius: BorderRadius.circular(20)),
                    child: Text(isEn ? 'No pending amount is present more than once for the moment.' : 'Aucun montant en attente n’est présent plus d’une fois pour le moment.', style: t.bodyMedium?.copyWith(color: const Color(0xFF166534), fontWeight: FontWeight.w700)),
                  )
                else
                  Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    for (final d in doubles)
                      Text(isEn ? '${fcfa(d.key)} pending on ${d.value} requests: reconcile by hand before validating.' : '${fcfa(d.key)} en attente sur ${d.value} demandes : rapprochez à la main avant de valider.', style: t.bodyMedium?.copyWith(color: const Color(0xFFB45309), fontWeight: FontWeight.w700)),
                  ]),
              ]),
            );
          }),
        if (general) const SizedBox(height: Cp.s3),
        if (general) const _AdminChartsSection(),
        if (general) const SizedBox(height: Cp.s3),
        if (general) const _OnlineMembersSection(),
      ];

  // Contenus et publications : annonces (audio, vidéo ou lien)
  // (general seulement, ici seulement, pas de doublon dans
  // Communication), enseignements, espace audio, actualites,
  // livres et question de quiz.
  List<Widget> _espaceContenus(BuildContext c, bool general) => [
        navCard([
          if (general)
            NavTile(
              icon: Icons.campaign_outlined,
              label: tr('Publier une annonce'),
              sub: tr('Audio, vidéo ou lien pour les membres : une seule publication, cartes sur l’accueil.'),
              onTap: () => go(c, const AnnoncesPage()),
            ),
          NavTile(
            icon: Icons.play_circle_outline,
            label: tr('Enseignements'),
            sub: tr('Musique et enseignements, ajout et modification pour l’administrateur général.'),
            onTap: () => go(c, const TeachingsPage()),
          ),
          if (general)
            NavTile(
              icon: Icons.library_music_outlined,
              label: tr('Espace audio'),
              sub: tr('Audios des enseignements, ajout et modification pour l’administrateur général.'),
              onTap: () => goAdmin(c, () => AudioSpacePage()),
            ),
          NavTile(
            icon: Icons.chat_bubble_outline,
            label: tr('Actualités'),
            sub: tr('Les nouvelles de la structure.'),
            onTap: () => go(c, const NewsPage()),
          ),
          NavTile(
            icon: Icons.book_outlined,
            label: tr('Livres'),
            sub: tr('Catalogue de la librairie, ajout et modification pour l’administrateur général.'),
            onTap: () => go(c, const LibrairiePage()),
          ),
          if (general)
            NavTile(
              icon: Icons.quiz_outlined,
              label: tr('Ajouter une question de quiz'),
              sub: tr('Quatre choix, une seule bonne réponse.'),
              onTap: () => ajouterQuestionQuiz(c),
            ),
        ]),
      ];

  // Communaute et membres : membres du perimetre, anniversaires,
  // reinitialisation assistee (general seulement), import en
  // masse (ordinateur seulement), Bureau et etablissements.
  List<Widget> _espaceCommunaute(BuildContext c, bool general) => [
        navCard([
          NavTile(
            icon: Icons.group_outlined,
            label: tr('Membres'),
            sub: tr('Liste en lecture seule de votre périmètre.'),
            onTap: () => go(c, const PerimeterMembersPage()),
          ),
          NavTile(
            icon: Icons.cake_outlined,
            label: tr('Anniversaires'),
            sub: tr('Anniversaires du jour et du mois, jour et mois seulement, jamais l’année ni l’âge.'),
            onTap: () => go(c, const AnniversairesPage()),
          ),
          if (general)
            NavTile(
              icon: Icons.key_outlined,
              label: tr('Mot de passe oublié d’un membre'),
              sub: tr('Génère un mot de passe temporaire, affiché une seule fois, à transmettre hors application.'),
              onTap: () => go(c, const ResetPasswordPage()),
            ),
          if (Rx.isDesktop(c))
            NavTile(
              icon: Icons.group_add_outlined,
              label: tr('Importer des membres'),
              sub: tr('Créer des comptes en masse depuis un fichier CSV, avec rapport ligne par ligne.'),
              onTap: () => go(c, const ImportMembresPage()),
            ),
          NavTile(
            icon: Icons.people_outlined,
            label: tr('Bureau'),
            sub: tr('Les responsables de la structure.'),
            onTap: () => go(c, const BureauPage()),
          ),
          NavTile(
            icon: Icons.apartment_outlined,
            label: tr('Établissements'),
            sub: tr('Activités et actualités de chaque établissement.'),
            onTap: () => go(c, const EtabsPage()),
          ),
        ]),
      ];

  // Evenements : camps, activites, inscriptions (section
  // d'information, pas d'ecran dedie), scanner et listes de
  // presence, presences, badges et fiches sante.
  List<Widget> _espaceEvenements(BuildContext c, bool general) => [
        navCard([
          NavTile(
            icon: Icons.change_history_outlined,
            label: tr('Camps et retraites'),
            sub: tr('Inscription et pass numérique.'),
            onTap: () => go(c, const CampsPage()),
          ),
          NavTile(
            icon: Icons.playlist_add_check_outlined,
            label: tr('Ajouter une activité'),
            sub: tr('À un établissement existant, avec une image.'),
            onTap: () async {
              final myEtab = app.member?.etab ?? '';
              final visibleEtabs = general ? app.etabs : app.etabs.where((e) => e.name == myEtab || etabDisplayName(e.name) == etabDisplayName(myEtab)).toList();
              if (!general && visibleEtabs.isEmpty) {
                toast(c, tr('Votre compte n’est rattaché à aucun établissement.'));
                return;
              }
              final e = await pick<Etab>(c, tr('Quel établissement ?'), visibleEtabs, (e) => e.name);
              if (e == null || !c.mounted) return;
              imageFormSheet(c, tr('Nouvelle activité'), [F('a', tr('Activité'))], tr('Ajouter'), (v, imagePath) {
                final activity = ActivityItem(v['a']!, imagePath: imagePath);
                e.activities.add(activity);
                app.changed();
                _publishActivite(c, e, activity);
              });
            },
          ),
          NavTile(
            icon: Icons.edit_outlined,
            label: tr('Modifier une activité'),
            sub: tr('Nom et image d’une activité déjà créée.'),
            onTap: () async {
              final myEtab = app.member?.etab ?? '';
              final visibleEtabs = general ? app.etabs : app.etabs.where((e) => e.name == myEtab || etabDisplayName(e.name) == etabDisplayName(myEtab)).toList();
              if (!general && visibleEtabs.isEmpty) {
                toast(c, tr('Votre compte n’est rattaché à aucun établissement.'));
                return;
              }
              final e = await pick<Etab>(c, tr('Quel établissement ?'), visibleEtabs, (e) => e.name);
              if (e == null || !c.mounted) return;
              if (e.activities.isEmpty) {
                toast(c, tr('Aucune activité pour cet établissement.'));
                return;
              }
              final a = await pick<ActivityItem>(c, tr('Quelle activité ?'), e.activities, (a) => a.title);
              if (a == null || !c.mounted) return;
              imageFormSheet(c, tr('Modifier l’activité'), [F('a', tr('Activité'), initial: a.title)], tr('Enregistrer'), (v, imagePath) {
                if (imagePath != a.imagePath) {
                  a.imagePath = imagePath;
                  a.imageUrl = '';
                }
                a.title = v['a']!;
                app.changed();
                // Le serveur n'a pas de route de modification d'activité :
                // la modification est locale, et une nouvelle publication
                // est tentée seulement si l'activité n'a jamais été publiée.
                if (a.serverId.isEmpty) _publishActivite(c, e, a);
              }, initialImagePath: a.imagePath);
            },
          ),
        ]),
        const SizedBox(height: Cp.s3),
        navCard([
          NavTile(
            icon: Icons.qr_code_scanner_outlined,
            label: tr('Scanner une présence'),
            sub: tr('Page séparée du scan de paiement : le QR de la carte marque la présence.'),
            onTap: () async {
              final choix = await choisirActivite(c);
              if (choix != null && c.mounted) go(c, PresenceScanPage(activiteId: choix.id, activiteNom: choix.type == 'evenement' ? choix.nom : '${choix.etab} : ${choix.nom}'));
            },
          ),
          NavTile(
            icon: Icons.playlist_add_check_outlined,
            label: tr('Listes de présence'),
            sub: tr('Inscrits pré-remplis, ajout manuel, annulation, export CSV.'),
            onTap: () async {
              final choix = await choisirActivite(c);
              if (choix != null && c.mounted) go(c, PresenceListPage(activiteId: choix.id, activiteNom: choix.type == 'evenement' ? choix.nom : '${choix.etab} : ${choix.nom}'));
            },
          ),
          NavTile(
            icon: Icons.fact_check_outlined,
            label: tr('Présences'),
            sub: tr('Toutes les présences de votre périmètre, les plus récentes d’abord.'),
            onTap: () => go(c, const PerimeterPresencesPage()),
          ),
          NavTile(
            icon: Icons.badge_outlined,
            label: tr('Badges d’un camp'),
            sub: tr('Badges imprimables des inscrits à un camp, plusieurs par page.'),
            onTap: () async {
              final camps = app.camps.where((camp) => camp.serverId.isNotEmpty).toList();
              if (camps.isEmpty) {
                toast(c, tr('Aucun camp publié.'));
                return;
              }
              final camp = await pick<Camp>(c, tr('Quel camp ?'), camps, (camp) => camp.name);
              if (camp != null && c.mounted) go(c, CampBadgesPrintPage(camp: camp));
            },
          ),
          NavTile(
            icon: Icons.medical_services_outlined,
            label: tr('Fiches santé'),
            sub: tr('Fiches santé des inscrits, par camp. Lecture journalisée.'),
            onTap: () async {
              final camps = app.camps.where((camp) => camp.serverId.isNotEmpty).toList();
              if (camps.isEmpty) {
                toast(c, tr('Aucun camp publié.'));
                return;
              }
              final camp = await pick<Camp>(c, tr('Quel camp ?'), camps, (camp) => camp.name);
              if (camp != null && c.mounted) go(c, FichesSanteAdminListPage(camp: camp));
            },
          ),
        ]),
        const SizedBox(height: Cp.s3),
        _infoSection(c, tr('Inscriptions'), tr('Il n’existe pas d’écran d’administration dédié aux inscriptions dans l’application. Les inscrits d’un camp se retrouvent dans les listes de présence, et les inscriptions par camp s’exportent depuis les exports complets, sur ordinateur seulement.')),
      ];

  // Finances : verification des paiements (serveur et locaux,
  // general seulement), scanner une carte, cotisations, objectif
  // de don (general seulement), historique des transactions et
  // chiffres (condition actuelle exacte : pas sur le web), recus
  // et factures depuis le detail de l'historique.
  List<Widget> _espaceFinances(BuildContext c, bool general, List<dynamic> pending, TextTheme t) => [
        if (app.isAdmin)
          FilledButton.icon(
            onPressed: () => go(c, const ScanCardPage()),
            icon: const Icon(Icons.qr_code_scanner_outlined),
            label: Text(tr('Scanner une carte')),
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          ),
        if (app.isAdmin) const SizedBox(height: Cp.s1),
        if (general) const _ServerPaymentsSection(),
        if (general) const SizedBox(height: Cp.s3),
        if (general) heading(c, 'Paiements locaux à valider, sur cet appareil seulement (${pending.length})'),
        if (general) ...[
          if (pending.isEmpty)
            Text(tr('Aucune demande en attente.'), style: t.bodyMedium)
          else
            Card(
              child: Column(children: [
                for (final r in pending)
                  ListTile(
                    title: Text('${r.kind == 'don' ? 'Don' : r.kind == 'carte' ? tr('Carte') : r.kind == 'cotisation' ? 'Cotisation' : r.kind == 'camp' ? campRequestLabel(r) : 'Achat'} · ${fcfa(r.amount)}', style: t.labelLarge),
                    subtitle: Text('${r.memberName} · ${r.method} · ${r.ref} · ${dateFr(r.date)}', style: t.bodyMedium),
                    trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                      IconButton(
                        tooltip: tr('Vérifier le reçu'),
                        icon: const Icon(Icons.verified_outlined),
                        onPressed: () => go(c, VerifyPaymentPage(request: r)),
                      ),
                      FilledButton(
                        onPressed: () async {
                          final ok = await showDialog<bool>(
                            context: c,
                            builder: (ctx) => AlertDialog(
                              title: Text(tr('Valider ce paiement ?')),
                              content: Text(isEn ? 'Only confirm after checking your ${r.method} account: ${fcfa(r.amount)} received for reference ${r.ref}.' : 'Validez seulement après avoir contrôlé votre compte ${r.method} : ${fcfa(r.amount)} reçus pour la référence ${r.ref}.'),
                              actions: [
                                TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
                                FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
                              ],
                            ),
                          );
                          if (ok == true) app.confirm(r);
                        },
                        child: Text(tr('Valider')),
                      ),
                    ]),
                  ),
              ]),
            ),
        ],
        if (general) const SizedBox(height: Cp.s3),
        navCard([
          NavTile(
            icon: Icons.account_balance_wallet_outlined,
            label: tr('Cotisations'),
            sub: tr('Statut confirmé ou en attente, depuis les paiements existants.'),
            onTap: () => go(c, const PerimeterCotisationsPage()),
          ),
          if (general)
            NavTile(
              icon: Icons.flag_outlined,
              label: tr('Objectif de don'),
              sub: tr('Libellé et montant cible de la jauge affichée sur la page Don.'),
              onTap: () => go(c, const ObjectifDonAdminPage()),
            ),
          if (!kIsWeb)
            NavTile(
              icon: Icons.receipt_long_outlined,
              label: tr('Historique des transactions'),
              sub: tr('Toutes les opérations de votre périmètre, filtrables, avec totaux et export.'),
              onTap: () => go(c, const AdminTransactionHistoryPage()),
            ),
          if (!kIsWeb)
            NavTile(
              icon: Icons.table_chart_outlined,
              label: tr('Chiffres'),
              sub: tr('Total encaissé, résumé du jour et comparaison des derniers jours, par type et par établissement.'),
              onTap: () => go(c, const ChiffresPage()),
            ),
        ]),
        const SizedBox(height: Cp.s3),
        _infoSection(c, tr('Reçus et factures'), tr('Pour une opération confirmée, le reçu et la facture s’ouvrent depuis le détail de l’opération, dans l’historique des transactions.')),
      ];

  // Communication : notifications (ecran existant reel), e-mails
  // et actualites programmees (sections d'information sans
  // controle). Regle dure : les sujets de priere ne sont jamais
  // listes ni stockes, seul le canal e-mail est presente. Les
  // annonces audio et les cartes video ne sont pas dupliquees
  // ici, elles vivent dans Contenus et publications seulement.
  List<Widget> _espaceCommunication(BuildContext c) => [
        navCard([
          NavTile(
            icon: Icons.notifications_outlined,
            label: tr('Notifications'),
            sub: tr('Liste des notifications, chaque notification ouvre sa destination.'),
            onTap: () => go(c, const NotificationsPage()),
          ),
        ]),
        const SizedBox(height: Cp.s3),
        _infoSection(c, tr('E-mails'), tr('Les sujets de prière arrivent par e-mail à la structure. Ils ne sont ni listés ni stockés dans l’application, et ne sont jamais publiés.')),
        const SizedBox(height: Cp.s3),
        _infoSection(c, tr('Actualités programmées'), tr('L’administrateur général les voit dans la page Actualités, avec leur date prévue.')),
      ];

  // Parametres et securite : journal d'audit (general seulement),
  // destinataire Wave attendu (general seulement, reglage affiche
  // sur la page Don), gestion des administrateurs et
  // configuration serveur (sections d'information, pas d'ecran
  // existant, donc aucun bouton).
  List<Widget> _espaceParametres(BuildContext c, bool general) => [
        if (general)
          navCard([
            NavTile(
              icon: Icons.history_outlined,
              label: tr('Journal d’audit'),
              sub: tr('Qui a marqué, ajouté ou annulé une présence, et quand.'),
              onTap: () => go(c, const AuditListPage()),
            ),
            NavTile(
              icon: Icons.search_outlined,
              label: tr('Destinataire Wave attendu'),
              sub: tr('Réglage affiché sur la page Don, pour l’administrateur général.'),
              onTap: () => go(c, const DonsPage()),
            ),
          ]),
        if (general) const SizedBox(height: Cp.s3),
        _infoSection(c, tr('Gestion des administrateurs'), tr('Il n’existe pas d’écran de gestion des administrateurs dans l’application. Les rôles sont attribués côté serveur, aucun compte administrateur ne se crée ni ne se modifie depuis l’application.')),
        const SizedBox(height: Cp.s3),
        _infoSection(c, tr('Configuration'), tr('La configuration de la structure lue depuis le serveur ne se modifie pas depuis l’application.')),
      ];

  List<Widget> _espaceContenu(BuildContext c, int i, bool general, List<dynamic> pending, TextTheme t) {
    switch (i) {
      case 0:
        return _espaceTableauDeBord(c, general);
      case 1:
        return _espaceContenus(c, general);
      case 2:
        return _espaceCommunaute(c, general);
      case 3:
        return _espaceEvenements(c, general);
      case 4:
        return _espaceFinances(c, general, pending, t);
      case 5:
        return _espaceCommunication(c);
      default:
        return _espaceParametres(c, general);
    }
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final pending = app.requests.where((r) => !r.confirmed).toList();

      if (!app.isAdmin) {
        return basic(tr('Espace structure'), [
          EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.')),
        ]);
      }
      final general = app.isAdminGeneral;
      final titres = _titres();
      final desktop = Rx.isDesktop(c);
      final contenus = <List<Widget>>[
        for (var i = 0; i < titres.length; i++) _espaceContenu(c, i, general, pending, t),
      ];
      // Ordinateur : barre latérale permanente (Scaffold).
      // La barre ne défile plus avec le contenu : elle vit hors
      // de la liste de basic(), avec Quitter épinglé en bas.
      final visibles = <int>[for (var i = 0; i < titres.length; i++) if (contenus[i].isNotEmpty) i];
      final sel = _espace.clamp(0, visibles.length - 1);
      Widget quitter() => SizedBox(
            height: 52,
            child: OutlinedButton(
              onPressed: () {
                app.isAdmin = false;
                app.isAdminGeneral = false;
                app.changed();
                Navigator.of(c).pop();
              },
              child: Text(tr('Quitter l’espace structure')),
            ),
          );
      if (desktop && app.member != null && visibles.isNotEmpty) {
        final m = app.member!;
        return Scaffold(
          appBar: AppBar(
            backgroundColor: Cp.navy,
            foregroundColor: Colors.white,
            toolbarHeight: 72,
            titleSpacing: 12,
            leadingWidth: 40,
            title: Row(children: [
              Builder(
                builder: (ctx) => Tooltip(
                  message: tr('Accueil'),
                  child: InkWell(
                    customBorder: RoundedRectangleBorder(borderRadius: BorderRadius.circular(9)),
                    onTap: () {
                      app.requestHome();
                      Navigator.of(ctx).popUntil((r) => r.isFirst);
                    },
                    child: cpMonogram(size: 48),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
                  const Text('CONNEXION PROPHÉTIQUE',
                      maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false,
                      style: TextStyle(color: Color(0xFFD4A72C), fontSize: 15, fontWeight: FontWeight.w700, letterSpacing: 0.8)),
                  Text(tr('Espace structure'), maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false, style: const TextStyle(color: Colors.white70, fontSize: 14)),
                ]),
              ),
            ]),
            actions: [
              Builder(builder: (ctx) {
                return TextButton.icon(
                  style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12), minimumSize: const Size(48, 48)),
                  onPressed: () {
                    verseTts.stop();
                    app.setLang(app.lang == 'fr' ? 'en' : 'fr');
                  },
                  icon: const Icon(Icons.language_outlined, color: Color(0xFFD4A72C), size: 20),
                  label: Text(app.lang == 'fr' ? 'FR' : 'EN', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14)),
                );
              }),
              Builder(builder: (ctx) {
                return IconButton(
                  tooltip: tr('Mes achats'),
                  padding: const EdgeInsets.all(14),
                  iconSize: 26,
                  icon: const Icon(Icons.shopping_bag_outlined, color: Colors.white),
                  onPressed: () => go(ctx, const MyPurchasesPage()),
                );
              }),
              Builder(builder: (ctx) {
                return Padding(
                  padding: const EdgeInsets.only(right: 4),
                  child: InkWell(
                    customBorder: const CircleBorder(),
                    onTap: () => go(ctx, const ProfilePage()),
                    child: Padding(
                      padding: const EdgeInsets.all(9),
                      child: memberPhotoProvider(m) != null
                          ? CircleAvatar(radius: 20, backgroundImage: memberPhotoProvider(m))
                          : const CircleAvatar(radius: 20, backgroundColor: Color(0xFFD4A72C), child: Icon(Icons.person_outlined, color: Color(0xFF0B1F3A), size: 22)),
                    ),
                  ),
                );
              }),
            ],
          ),
          body: SafeArea(
            child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
              Container(
                width: 280,
                decoration: const BoxDecoration(color: Colors.white, border: Border(right: BorderSide(color: Cp.line))),
                child: Column(children: [
                  Expanded(
                    child: ListView(
                      padding: const EdgeInsets.fromLTRB(Cp.s1, Cp.s2, Cp.s1, Cp.s2),
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(Cp.s1, 0, Cp.s1, Cp.s1),
                          child: Text(tr('Espaces'), style: t.titleMedium?.copyWith(color: Cp.goldDeep)),
                        ),
                        for (var i = 0; i < visibles.length; i++)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 4),
                            child: Material(
                              color: i == sel ? Cp.gold.withValues(alpha: 0.15) : Colors.transparent,
                              borderRadius: BorderRadius.circular(16),
                              child: InkWell(
                                borderRadius: BorderRadius.circular(16),
                                onTap: () => setState(() => _espace = i),
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(horizontal: Cp.s1, vertical: 12),
                                  child: Row(children: [
                                    Icon(_icones[visibles[i]], color: i == sel ? Cp.goldDeep : Cp.navy),
                                    const SizedBox(width: Cp.s1),
                                    Expanded(child: Text(titres[visibles[i]], style: t.labelLarge?.copyWith(fontWeight: i == sel ? FontWeight.w800 : FontWeight.w700, color: Cp.navy))),
                                  ]),
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                  Padding(padding: const EdgeInsets.all(Cp.s2), child: quitter()),
                ]),
              ),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, Cp.s3),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        if (!general)
          Text(tr('Votre compte administre un établissement : vous pouvez publier une actualité et une activité pour votre établissement. La validation des paiements et les autres publications sont réservées à l’administrateur général.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        if (general)
          Text(isEn ? 'Payments are validated only after checking the structure’s Wave account, with an explicit confirmation: open Don to find each request, its declared ID and its screenshot, then validate from its history.' : 'Les paiements ne sont validés qu’après le contrôle du compte Wave de la structure, avec une confirmation explicite : ouvrez Don pour retrouver chaque demande, son identifiant déclaré et sa capture, puis validez depuis son historique.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
                    const SizedBox(height: Cp.s2),
                    heading(c, titres[visibles[sel]]),
                    ...contenus[visibles[sel]],
                  ]),
                ),
              ),
            ]),
          ),
        );
      }
      return basic(tr('Espace structure'), [
        if (!general)
          Text(tr('Votre compte administre un établissement : vous pouvez publier une actualité et une activité pour votre établissement. La validation des paiements et les autres publications sont réservées à l’administrateur général.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        if (general)
          Text(isEn ? 'Payments are validated only after checking the structure’s Wave account, with an explicit confirmation: open Don to find each request, its declared ID and its screenshot, then validate from its history.' : 'Les paiements ne sont validés qu’après le contrôle du compte Wave de la structure, avec une confirmation explicite : ouvrez Don pour retrouver chaque demande, son identifiant déclaré et sa capture, puis validez depuis son historique.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: Cp.s2),
        ...[
          for (var i = 0; i < titres.length; i++)
            if (contenus[i].isNotEmpty) ...[
              heading(c, titres[i]),
              ...contenus[i],
              const SizedBox(height: Cp.s3),
            ],
        ],
        const SizedBox(height: Cp.s3),
        quitter(),
      ]);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// MOT DE PASSE TEMPORAIRE, 29 oct. 2026
// ═══════════════════════════════════════════════════════════════════

// Réinitialisation assistée, 29 oct. 2026 : l'administrateur général
// seul choisit un membre et génère un temporaire, affiché une seule
// fois, à transmettre hors application, en personne ou par appel.
// Le temporaire n'est jamais stocké sur l'appareil, ni dans
// l'application, ni dans un journal. L'ancien mot de passe cesse de
// fonctionner dès la génération, et le membre doit en choisir un
// nouveau à sa première connexion avec le temporaire.
// IMPORT DE MEMBRES PAR CSV, 31 oct. 2026, ordinateur seulement.
// Page ouverte depuis l'Espace structure. Le fichier CSV est lu
// par octets sur le web (jamais par chemin), découpé côté client,
// puis envoyé en JSON à la route d'import. Le rapport ligne par
// ligne affiche les temporaires une seule fois : ils ne sont
// jamais journalisés côté serveur, l'administrateur les transmet
// hors application, comme pour la réinitialisation assistée.
// MODE PROJECTION, 31 oct. 2026, web ordinateur seulement.
// Page plein écran de la même application, pour projeter devant
// une assemblée : fond bleu nuit, textes très grands, sans barre
// du bas ni en-tête de l'application. Le plein écran du navigateur
// passe par projection_plein_ecran.dart (web seulement, repli
// propre ailleurs) ; la touche Échap sort du plein écran
// d'elle-même, et la page reste affichée en grand.
// RÈGLE DE CONFIDENTIALITÉ DURE : la projection ne montre QUE du
// contenu public, verset du jour, camps publiés, actualités
// publiques. Jamais de nom de membre, jamais de matricule, jamais
// de montant encaissé, jamais de paiement en attente, jamais de
// présence, jamais de fiche santé, jamais de contenu réservé aux
// membres. Les trois sources ci-dessous sont toutes publiques.
// Diapositives, dans cet ordre : verset du jour, puis chaque camp
// publié à venir, puis chaque actualité publique. Une source vide
// donne simplement aucune diapositive, jamais de texte inventé.
// Défilement automatique toutes les 20 secondes, boutons
// Précédent et Suivant, flèches gauche et droite du clavier. Les
// flèches passent par un Focus ancêtre de la page, donc elles
// fonctionnent même si le focus est sur un bouton.
class ProjectionPage extends StatefulWidget {
  const ProjectionPage({super.key});

  @override
  State<ProjectionPage> createState() => _ProjectionPageState();
}

class _ProjectionPageState extends State<ProjectionPage> {
  static const _blancChaud = Color(0xFFFAF6E9);
  static const _duree = Duration(seconds: 20);

  bool _loading = true;
  String? _erreur;
  List<Widget> _diapos = [];
  int _index = 0;
  Timer? _minuteur;

  String _texte(Map<String, dynamic> m, String key) =>
      (m[key] ?? '').toString();

  int _num(Map<String, dynamic> m, String key) =>
      (m[key] as num?)?.toInt() ?? 0;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _minuteur?.cancel();
    super.dispose();
  }

  void _relancerMinuteur() {
    _minuteur?.cancel();
    if (_diapos.length < 2) return;
    _minuteur = Timer.periodic(_duree, (_) {
      if (!mounted || _diapos.isEmpty) return;
      setState(() => _index = (_index + 1) % _diapos.length);
    });
  }

  void _precedent() {
    if (_diapos.isEmpty) return;
    setState(() => _index = (_index - 1 + _diapos.length) % _diapos.length);
    _relancerMinuteur();
  }

  void _suivant() {
    if (_diapos.isEmpty) return;
    setState(() => _index = (_index + 1) % _diapos.length);
    _relancerMinuteur();
  }

  Future<void> _charger() async {
    final diapos = <Widget>[];
    var erreur = false;
    try {
      final ref = await BibleService.instance.rotatingVerse(app.lang);
      if (ref.text.isNotEmpty) {
        final reference =
            BibleService.instance.label(app.lang, ref.book, ref.chapter, ref.verse);
        diapos.add(_diapoVerset(ref.text, reference));
      }
    } catch (_) {
      erreur = true;
    }
    try {
      final camps = await api.fetchEvenements();
      final maintenant = DateTime.now();
      final aujourdHui =
          DateTime(maintenant.year, maintenant.month, maintenant.day);
      final aVenir = camps.where((camp) {
        final finRaw = _texte(camp, 'date_fin');
        if (finRaw.isEmpty) return true;
        final fin = DateTime.tryParse(finRaw);
        if (fin == null) return true;
        return !DateTime(fin.year, fin.month, fin.day).isBefore(aujourdHui);
      }).toList();
      aVenir.sort((a, b) {
        final da = _texte(a, 'date_debut');
        final db = _texte(b, 'date_debut');
        if (da.isEmpty && db.isEmpty) {
          return _texte(a, 'nom').compareTo(_texte(b, 'nom'));
        }
        if (da.isEmpty) return 1;
        if (db.isEmpty) return -1;
        final cmp = da.compareTo(db);
        return cmp != 0 ? cmp : _texte(a, 'nom').compareTo(_texte(b, 'nom'));
      });
      for (final camp in aVenir) {
        final nom = _texte(camp, 'nom');
        if (nom.isEmpty) continue;
        final details = [
          if (_texte(camp, 'dates_texte').isNotEmpty)
            _texte(camp, 'dates_texte'),
          if (_texte(camp, 'lieu').isNotEmpty) _texte(camp, 'lieu'),
          _num(camp, 'tarif_fcfa') > 0
              ? fcfa(_num(camp, 'tarif_fcfa'))
              : tr('À confirmer'),
        ];
        diapos.add(_diapoCamp(nom, details.join(' · ')));
      }
    } catch (_) {
      erreur = true;
    }
    try {
      final actus = await api.fetchActualites();
      for (final actu in actus) {
        final titre = _texte(actu, 'titre');
        final texte = _texte(actu, 'texte');
        if (titre.isEmpty && texte.isEmpty) continue;
        diapos.add(_diapoActualite(titre, texte));
      }
    } catch (_) {
      erreur = true;
    }
    if (!mounted) return;
    setState(() {
      _diapos = diapos;
      _erreur = erreur ? tr('Certains contenus n’ont pas pu être chargés.') : null;
      _loading = false;
      _index = 0;
    });
    _relancerMinuteur();
  }

  Widget _diapoVerset(String texte, String reference) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          texte,
          textAlign: TextAlign.center,
          style: const TextStyle(
            color: _blancChaud,
            fontSize: 46,
            fontWeight: FontWeight.w700,
            height: 1.3,
          ),
        ),
        const SizedBox(height: 32),
        Text(
          reference,
          textAlign: TextAlign.center,
          style: const TextStyle(
            color: Cp.gold,
            fontSize: 28,
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    );
  }

  Widget _diapoCamp(String nom, String details) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          nom,
          textAlign: TextAlign.center,
          style: const TextStyle(
            color: Cp.gold,
            fontSize: 56,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 32),
        Text(
          details,
          textAlign: TextAlign.center,
          style: const TextStyle(color: _blancChaud, fontSize: 30, height: 1.4),
        ),
      ],
    );
  }

  Widget _diapoActualite(String titre, String texte) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (titre.isNotEmpty)
          Text(
            titre,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Cp.gold,
              fontSize: 48,
              fontWeight: FontWeight.w800,
            ),
          ),
        if (titre.isNotEmpty && texte.isNotEmpty) const SizedBox(height: 28),
        if (texte.isNotEmpty)
          Text(
            texte,
            textAlign: TextAlign.center,
            style: const TextStyle(color: _blancChaud, fontSize: 30, height: 1.4),
          ),
      ],
    );
  }

  Widget _diapoVide() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const Text(
          'CONNEXION PROPHETIQUE',
          textAlign: TextAlign.center,
          style: TextStyle(
            color: Cp.gold,
            fontSize: 40,
            fontWeight: FontWeight.w800,
            letterSpacing: 2,
          ),
        ),
        const SizedBox(height: 32),
        Text(
          tr('Aucun contenu à projeter pour le moment.'),
          textAlign: TextAlign.center,
          style: const TextStyle(color: _blancChaud, fontSize: 30),
        ),
      ],
    );
  }

  KeyEventResult _touches(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    final pressed = HardwareKeyboard.instance.logicalKeysPressed;
    if (pressed.contains(LogicalKeyboardKey.controlLeft) ||
        pressed.contains(LogicalKeyboardKey.controlRight) ||
        pressed.contains(LogicalKeyboardKey.metaLeft) ||
        pressed.contains(LogicalKeyboardKey.metaRight) ||
        pressed.contains(LogicalKeyboardKey.altLeft) ||
        pressed.contains(LogicalKeyboardKey.altRight)) {
      return KeyEventResult.ignored;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowLeft) {
      _precedent();
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowRight) {
      _suivant();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  Future<void> _quitter() async {
    await quitterPleinEcran();
    if (mounted) Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final boutonStyle = FilledButton.styleFrom(
      backgroundColor: Cp.gold,
      foregroundColor: Cp.navy,
      padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 18),
      textStyle: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
    );
    return Focus(
      autofocus: true,
      onKeyEvent: _touches,
      child: Scaffold(
        backgroundColor: Cp.navy,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 24),
            child: Column(
              children: [
                Row(
                  children: [
                    const Text(
                      'CONNEXION PROPHETIQUE',
                      style: TextStyle(
                        color: Cp.gold,
                        fontSize: 22,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 2,
                      ),
                    ),
                    const Spacer(),
                    if (kIsWeb)
                      FilledButton.icon(
                        onPressed: () async {
                          final ok = await demanderPleinEcran();
                          if (!ok && mounted) {
                            toast(
                              context,
                              tr('Le plein écran n’est pas disponible dans ce navigateur.'),
                            );
                          }
                        },
                        icon: const Icon(Icons.fullscreen_outlined),
                        label: Text(tr('Plein écran')),
                        style: boutonStyle,
                      ),
                    if (kIsWeb) const SizedBox(width: 16),
                    FilledButton.icon(
                      onPressed: _quitter,
                      icon: const Icon(Icons.close_outlined),
                      label: Text(tr('Quitter')),
                      style: boutonStyle,
                    ),
                  ],
                ),
                if (_erreur != null) ...[
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.error_outline, color: Cp.gold),
                      const SizedBox(width: 8),
                      Flexible(
                        child: Text(
                          _erreur!,
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: _blancChaud, fontSize: 18),
                        ),
                      ),
                    ],
                  ),
                ],
                Expanded(
                  child: Center(
                    child: SingleChildScrollView(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 1100),
                        child: _loading
                            ? const CircularProgressIndicator(color: Cp.gold)
                            : _diapos.isEmpty
                                ? _diapoVide()
                                : _diapos[_index],
                      ),
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    FilledButton.icon(
                      onPressed: _diapos.length < 2 ? null : _precedent,
                      icon: const Icon(Icons.arrow_back_outlined),
                      label: Text(tr('Précédent')),
                      style: boutonStyle,
                    ),
                    const SizedBox(width: 32),
                    if (_diapos.isNotEmpty)
                      Text(
                        '${_index + 1} / ${_diapos.length}',
                        style: const TextStyle(color: _blancChaud, fontSize: 20),
                      ),
                    const SizedBox(width: 32),
                    FilledButton.icon(
                      onPressed: _diapos.length < 2 ? null : _suivant,
                      icon: const Icon(Icons.arrow_forward_outlined),
                      label: Text(tr('Suivant')),
                      style: boutonStyle,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class ImportMembresPage extends StatefulWidget {
  const ImportMembresPage({super.key});

  @override
  State<ImportMembresPage> createState() => _ImportMembresPageState();
}

List<List<String>> _decouperCsv(String texte) {
  final lignes = <List<String>>[];
  var champs = <String>[];
  final courant = StringBuffer();
  var guillemets = false;
  var i = 0;
  void finirChamp() {
    champs.add(courant.toString());
    courant.clear();
  }

  void finirLigne() {
    finirChamp();
    lignes.add(champs);
    champs = <String>[];
  }

  while (i < texte.length) {
    final c = texte[i];
    if (guillemets) {
      if (c == '"') {
        if (i + 1 < texte.length && texte[i + 1] == '"') {
          courant.write('"');
          i += 2;
          continue;
        }
        guillemets = false;
        i++;
        continue;
      }
      courant.write(c);
      i++;
      continue;
    }
    if (c == '"') {
      guillemets = true;
      i++;
      continue;
    }
    if (c == ';') {
      finirChamp();
      i++;
      continue;
    }
    if (c == '\n') {
      finirLigne();
      i++;
      continue;
    }
    if (c == '\r') {
      i++;
      continue;
    }
    courant.write(c);
    i++;
  }
  if (courant.isNotEmpty || champs.isNotEmpty) finirLigne();
  return lignes;
}

String _statutImportLabel(String statut) {
  switch (statut) {
    case 'importe':
      return tr('Importé');
    case 'ignore':
      return tr('Ignoré');
    default:
      return tr('Rejeté');
  }
}

class _ImportMembresPageState extends State<ImportMembresPage> {
  static const _entetes = ['Nom complet', 'Téléphone', 'Email', 'Établissement', 'Fonction', 'Date de naissance'];
  List<Map<String, dynamic>> _lignes = [];
  String? _fichierNom;
  String? _erreur;
  bool _envoi = false;
  Map<String, dynamic>? _rapport;
  List<Map<String, dynamic>> _etablissements = [];

  @override
  void initState() {
    super.initState();
    _chargerEtablissements();
  }

  Future<void> _chargerEtablissements() async {
    try {
      final liste = await api.fetchEtablissements();
      if (mounted) setState(() => _etablissements = liste);
    } catch (_) {}
  }

  Future<void> _telechargerModele() async {
    final contenu = [
      _entetes.map(_csvChamp).join(';'),
      [
        _csvChamp('Exemple Fictif'),
        _csvChamp('+2250700000000'),
        _csvChamp('exemple@exemple.ci'),
        _csvChamp(''),
        _csvChamp('Membre'),
        _csvChamp('1990-01-01'),
      ].join(';'),
    ].join('\n');
    final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(contenu)];
    await downloadBytesFile('modele-import-membres.csv', bytes, 'text/csv');
    if (mounted) toast(context, tr('Modèle téléchargé.'));
  }

  Future<void> _choisirFichier() async {
    setState(() {
      _erreur = null;
      _rapport = null;
    });
    try {
      final result = await FilePicker.platform.pickFiles(type: FileType.custom, allowedExtensions: ['csv'], withData: true);
      final picked = result?.files.single;
      final bytes = picked?.bytes;
      if (bytes == null) return;
      var texte = utf8.decode(bytes);
      if (texte.startsWith('\uFEFF')) texte = texte.substring(1);
      final decoupe = _decouperCsv(texte);
      final utiles = decoupe.where((r) => r.any((c) => c.trim().isNotEmpty)).toList();
      if (utiles.isEmpty) {
        setState(() => _erreur = tr('Le fichier est vide.'));
        return;
      }
      final entetes = utiles.first.map((c) => c.trim().toLowerCase()).toList();
      final attendus = _entetes.map((e) => e.toLowerCase()).toList();
      if (entetes.length != attendus.length || !List.generate(attendus.length, (i) => entetes[i] == attendus[i]).every((v) => v)) {
        setState(() => _erreur = tr('Les en-têtes ne correspondent pas au modèle attendu.'));
        return;
      }
      final lignes = <Map<String, dynamic>>[];
      for (final r in utiles.skip(1)) {
        final champs = [...r, '', '', '', '', '', ''].sublist(0, 6);
        lignes.add({
          'nom_complet': champs[0].trim(),
          'telephone': champs[1].trim(),
          'email': champs[2].trim(),
          'etablissement': champs[3].trim(),
          'fonction': champs[4].trim(),
          'date_naissance': champs[5].trim(),
        });
      }
      if (lignes.isEmpty) {
        setState(() => _erreur = tr('Aucune ligne à importer.'));
        return;
      }
      if (lignes.length > 500) {
        setState(() => _erreur = tr('Le fichier dépasse 500 lignes.'));
        return;
      }
      setState(() {
        _lignes = lignes;
        _fichierNom = picked!.name;
      });
    } catch (e) {
      if (mounted) setState(() => _erreur = e.toString());
    }
  }

  Future<void> _envoyer() async {
    setState(() {
      _envoi = true;
      _erreur = null;
    });
    try {
      final rapport = await api.importMembres(_lignes);
      if (mounted) {
        setState(() {
          _rapport = rapport;
          _lignes = [];
          _fichierNom = null;
        });
        toast(context, tr('Import terminé.'));
      }
    } catch (e) {
      if (mounted) setState(() => _erreur = e.toString());
    }
    if (mounted) setState(() => _envoi = false);
  }

  Future<void> _telechargerRapport() async {
    final r = _rapport;
    if (r == null) return;
    final lignes = <String>[
      [_csvChamp(tr('Ligne')), _csvChamp(tr('Nom')), _csvChamp(tr('Statut')), _csvChamp(tr('Matricule')), _csvChamp(tr('Mot de passe temporaire')), _csvChamp(tr('Motif'))].join(';'),
    ];
    for (final e in (r['lignes'] as List? ?? [])) {
      final m = e as Map<String, dynamic>;
      lignes.add([
        _csvChamp((m['ligne'] ?? '').toString()),
        _csvChamp((m['nom'] ?? '').toString()),
        _csvChamp(_statutImportLabel((m['statut'] ?? '').toString())),
        _csvChamp((m['matricule'] ?? '').toString()),
        _csvChamp((m['mot_de_passe_temporaire'] ?? '').toString()),
        _csvChamp(tr((m['motif'] ?? '').toString())),
      ].join(';'));
    }
    final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(lignes.join('\n'))];
    await downloadBytesFile('rapport-import-membres.csv', bytes, 'text/csv');
    if (mounted) toast(context, tr('Rapport téléchargé.'));
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final erreur = Theme.of(context).colorScheme.error;
    final rapport = _rapport;
    final lignesRapport = rapport == null ? <Map<String, dynamic>>[] : (rapport['lignes'] as List? ?? []).whereType<Map<String, dynamic>>().toList();
    final nomsEtablissements = _etablissements.map((e) => (e['nom'] ?? '').toString()).where((n) => n.isNotEmpty).join(', ');
    return basic(tr('Importer des membres'), [
      Text(tr('Format du fichier CSV'), style: t.titleMedium),
      Text(tr('Le fichier utilise le point-virgule comme séparateur, avec une première ligne d’en-têtes.'), style: t.bodyMedium),
      Text('Nom complet;Téléphone;Email;Établissement;Fonction;Date de naissance', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
      Text(tr('Nom complet (obligatoire)'), style: t.bodyMedium),
      Text(tr('Téléphone ou Email (au moins un des deux)'), style: t.bodyMedium),
      Text(tr('Établissement (nom exact, ou vide)'), style: t.bodyMedium),
      Text(tr('Fonction (parmi la liste, ou vide pour Membre)'), style: t.bodyMedium),
      Text(tr('Date de naissance (AAAA-MM-JJ, facultative)'), style: t.bodyMedium),
      if (nomsEtablissements.isNotEmpty) Text('${tr('Établissements connus')} : $nomsEtablissements', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
      Text(tr('La ligne d’exemple du modèle est fictive, supprimez-la avant d’importer.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
      Text(tr('Un membre déjà existant (téléphone ou e-mail) est ignoré, jamais écrasé.'), style: t.bodyMedium),
      if (!app.isAdminGeneral) Text(tr('Votre périmètre : seules les lignes de votre établissement seront importées.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
      Wrap(spacing: 12, runSpacing: 12, children: [
        FilledButton.icon(onPressed: _telechargerModele, icon: const Icon(Icons.file_download_outlined), label: Text(tr('Télécharger le modèle'))),
        FilledButton.icon(onPressed: _choisirFichier, icon: const Icon(Icons.folder_open_outlined), label: Text(tr('Choisir un fichier CSV'))),
      ]),
      if (_fichierNom != null) Text('${_fichierNom!} : ${_lignes.length} ${tr('lignes prêtes à importer')}', style: t.bodyMedium),
      if (_lignes.isNotEmpty)
        FilledButton.icon(
          onPressed: _envoi ? null : _envoyer,
          icon: const Icon(Icons.upload_outlined),
          label: Text(_envoi ? tr('Import en cours…') : tr('Importer ces membres')),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
        ),
      if (_erreur != null) Text(_erreur!, style: t.bodyMedium?.copyWith(color: erreur)),
      if (rapport != null) ...[
        Text(tr('Import terminé.'), style: t.titleMedium),
        Text(isEn
            ? '${rapport['importes'] ?? 0} imported, ${rapport['ignores'] ?? 0} skipped, ${rapport['rejetes'] ?? 0} rejected'
            : '${rapport['importes'] ?? 0} importés, ${rapport['ignores'] ?? 0} ignorés, ${rapport['rejetes'] ?? 0} rejetés', style: t.bodyMedium),
        Text(tr('Les temporaires ne s’affichent qu’ici, transmettez-les hors application.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
        FilledButton.icon(onPressed: _telechargerRapport, icon: const Icon(Icons.file_download_outlined), label: Text(tr('Télécharger le rapport (CSV)'))),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: lignesRapport.length,
          itemBuilder: (c, i) {
            final m = lignesRapport[i];
            final statut = (m['statut'] ?? '').toString();
            final detail = statut == 'importe'
                ? '${m['matricule'] ?? ''} · ${m['mot_de_passe_temporaire'] ?? ''}'
                : tr((m['motif'] ?? '').toString());
            return ListTile(
              title: Text('${m['ligne'] ?? ''} · ${m['nom'] ?? ''}', style: t.bodyMedium),
              subtitle: Text('${_statutImportLabel(statut)} · $detail', style: t.bodyMedium),
            );
          },
        ),
      ],
    ]);
  }
}

// EXPORTS COMPLETS, 31 oct. 2026, ordinateur seulement.
// Page ouverte depuis l'Espace structure. Les exports reprennent
// exactement les colonnes des exports existants (fiches des
// membres, historique des transactions, présences), au format
// CSV avec guillemets et point-virgule, téléchargés par
// downloadBytesFile. Les listes viennent des routes existantes,
// sauf les inscriptions par camp, qui ont leur propre route
// d'administration. Aucune donnée médicale dans ces exports,
// jamais : ni fiches santé, ni fiches de présence sur place.
class ExportsPage extends StatefulWidget {
  const ExportsPage({super.key});

  @override
  State<ExportsPage> createState() => _ExportsPageState();
}

class _ExportsPageState extends State<ExportsPage> {
  List<Map<String, dynamic>> _camps = [];
  String? _campId;
  String? _occupe;

  @override
  void initState() {
    super.initState();
    _chargerCamps();
  }

  Future<void> _chargerCamps() async {
    try {
      final camps = await api.fetchEvenements();
      if (mounted) {
        setState(() {
          _camps = camps;
          if (camps.isNotEmpty) _campId = (camps.first['id'] ?? '').toString();
        });
      }
    } catch (_) {}
  }

  String _nomFichier(String base) {
    final d = DateTime.now();
    return '$base-${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}.csv';
  }

  Future<void> _telecharger(String nom, List<String> lignes) async {
    final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(lignes.join('\n'))];
    await downloadBytesFile(nom, bytes, 'text/csv');
    if (mounted) toast(context, tr('Export téléchargé.'));
  }

  Future<void> _exporterMembres() async {
    setState(() => _occupe = tr('Exporter les membres du périmètre'));
    try {
      final liste = await api.fetchAdminMembres(details: true);
      if (liste.isEmpty) {
        if (mounted) toast(context, tr('Aucune donnée à exporter.'));
        return;
      }
      final lignes = <String>[
        [_csvChamp(tr('Nom')), _csvChamp(tr('Matricule')), _csvChamp(tr('Téléphone')), _csvChamp(tr('E-mail')), _csvChamp(tr('Établissement')), _csvChamp(tr('Fonction')), _csvChamp(tr('Inscrit le')), _csvChamp(tr('Valide jusqu’au')), _csvChamp(tr('Cotisation'))].join(';'),
      ];
      for (final row in liste) {
        lignes.add([
          _csvChamp((row['nom_complet'] ?? '').toString()),
          _csvChamp((row['matricule'] ?? '').toString()),
          _csvChamp((row['telephone'] ?? '').toString()),
          _csvChamp((row['email'] ?? '').toString()),
          _csvChamp((row['etablissement'] ?? '').toString()),
          _csvChamp((row['fonction'] ?? '').toString()),
          _csvChamp(_dateCourte((row['inscrit_le'] ?? '').toString())),
          _csvChamp(_dateCourte((row['valide_jusqua'] ?? '').toString())),
          _csvChamp((row['cotisation_statut'] ?? '').toString() == 'confirme'
              ? tr('Confirmée')
              : (row['cotisation_statut'] ?? '').toString() == 'en_attente'
                  ? tr('En attente')
                  : tr('Aucune')),
        ].join(';'));
      }
      await _telecharger(_nomFichier('membres'), lignes);
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
    if (mounted) setState(() => _occupe = null);
  }

  Future<void> _exporterPaiements() async {
    setState(() => _occupe = tr('Exporter les paiements du périmètre'));
    try {
      final liste = await api.fetchAdminPayments();
      if (liste.isEmpty) {
        if (mounted) toast(context, tr('Aucune donnée à exporter.'));
        return;
      }
      final lignes = <String>[
        [_csvChamp(tr('Date et heure')), _csvChamp(tr('Référence')), _csvChamp(tr('Membre')), _csvChamp(tr('Matricule')), _csvChamp(tr('Établissement')), _csvChamp(tr('Type')), _csvChamp(tr('Moyen')), _csvChamp(tr('Montant')), _csvChamp(tr('Statut')), _csvChamp(tr('Validé le')), _csvChamp(tr('Refusé le')), _csvChamp(tr('Validé par')), _csvChamp(tr('Refusé par'))].join(';'),
      ];
      for (final row in liste) {
        final moyen = (row['moyen'] ?? '').toString();
        lignes.add([
          _csvChamp(dateHeure((row['cree_le'] ?? '').toString())),
          _csvChamp((row['reference'] ?? '').toString()),
          _csvChamp((row['nom_complet'] ?? '').toString()),
          _csvChamp((row['matricule'] ?? '').toString()),
          _csvChamp((row['etablissement_nom'] ?? '').toString()),
          _csvChamp(typePaiementLabel((row['type'] ?? '').toString())),
          _csvChamp(moyenPaiementLabel(moyen.isEmpty ? null : moyen)),
          _csvChamp(((row['montant_fcfa'] as num?)?.toInt() ?? 0).toString()),
          _csvChamp(statutPaiementLabel((row['statut'] ?? '').toString())),
          _csvChamp(dateHeure((row['confirme_le'] ?? '').toString())),
          _csvChamp(dateHeure((row['refuse_le'] ?? '').toString())),
          _csvChamp((row['confirme_par_nom'] ?? '').toString()),
          _csvChamp((row['refuse_par_nom'] ?? '').toString()),
        ].join(';'));
      }
      await _telecharger(_nomFichier('paiements'), lignes);
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
    if (mounted) setState(() => _occupe = null);
  }

  Future<void> _exporterPresences() async {
    final campId = _campId;
    if (campId == null || campId.isEmpty) {
      toast(context, tr('Aucun camp publié.'));
      return;
    }
    setState(() => _occupe = tr('Exporter les présences du camp'));
    try {
      final data = await api.fetchPresencesActivite(campId);
      final entrees = (data['entrees'] as List? ?? []).whereType<Map<String, dynamic>>().toList();
      if (entrees.isEmpty) {
        if (mounted) toast(context, tr('Aucune donnée à exporter.'));
        return;
      }
      final lignes = <String>[
        [_csvChamp(tr('Nom')), _csvChamp(tr('Matricule')), _csvChamp(tr('Statut')), _csvChamp(tr('Inscrit')), _csvChamp(tr('Date et heure')), _csvChamp(tr('Méthode'))].join(';'),
      ];
      for (final e in entrees) {
        final methode = (e['methode'] ?? '').toString();
        lignes.add([
          _csvChamp((e['nom_complet'] ?? '').toString()),
          _csvChamp((e['matricule'] ?? '').toString()),
          _csvChamp(_statutPresenceLabel((e['statut'] ?? '').toString())),
          _csvChamp(e['inscrit'] == true ? tr('Oui') : tr('Non')),
          _csvChamp(dateHeure((e['scanne_le'] ?? '').toString())),
          _csvChamp(methode == 'scan' ? tr('Scan') : methode == 'manuel' ? tr('Manuel') : ''),
        ].join(';'));
      }
      await _telecharger(_nomFichier('presences'), lignes);
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
    if (mounted) setState(() => _occupe = null);
  }

  Future<void> _exporterInscriptions() async {
    final campId = _campId;
    if (campId == null || campId.isEmpty) {
      toast(context, tr('Aucun camp publié.'));
      return;
    }
    setState(() => _occupe = tr('Exporter les inscriptions du camp'));
    try {
      final liste = await api.fetchAdminInscriptions(campId);
      if (liste.isEmpty) {
        if (mounted) toast(context, tr('Aucune donnée à exporter.'));
        return;
      }
      final lignes = <String>[
        [_csvChamp(tr('Camp')), _csvChamp(tr('Membre')), _csvChamp(tr('Matricule')), _csvChamp(tr('Date d’inscription')), _csvChamp(tr('Statut du pass'))].join(';'),
      ];
      for (final row in liste) {
        lignes.add([
          _csvChamp((row['camp'] ?? '').toString()),
          _csvChamp((row['nom_complet'] ?? '').toString()),
          _csvChamp((row['matricule'] ?? '').toString()),
          _csvChamp(_dateCourte((row['inscrit_le'] ?? '').toString())),
          _csvChamp(row['pass_visible'] == true ? tr('Pass disponible') : tr('Paiement en cours')),
        ].join(';'));
      }
      await _telecharger(_nomFichier('inscriptions'), lignes);
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
    if (mounted) setState(() => _occupe = null);
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final occupe = _occupe != null;
    return basic(tr('Exports complets'), [
      Text(tr('Les listes serveur sont plafonnées (membres 500, paiements 200).'), style: t.bodyMedium),
      Text(tr('Aucune donnée médicale dans ces exports.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
      FilledButton.icon(onPressed: occupe ? null : _exporterMembres, icon: const Icon(Icons.file_download_outlined), label: Text(occupe ? tr('Export en cours…') : tr('Exporter les membres du périmètre'))),
      FilledButton.icon(onPressed: occupe ? null : _exporterPaiements, icon: const Icon(Icons.file_download_outlined), label: Text(occupe ? tr('Export en cours…') : tr('Exporter les paiements du périmètre'))),
      if (_camps.isEmpty)
        Text(tr('Aucun camp publié.'), style: t.bodyMedium)
      else ...[
        Text(tr('Choisissez un camp pour les exports par camp.'), style: t.bodyMedium),
        DropdownButton<String>(
          value: _campId,
          isExpanded: true,
          items: [
            for (final camp in _camps)
              DropdownMenuItem(value: (camp['id'] ?? '').toString(), child: Text((camp['nom'] ?? '').toString())),
          ],
          onChanged: (v) => setState(() => _campId = v),
        ),
        FilledButton.icon(onPressed: occupe ? null : _exporterPresences, icon: const Icon(Icons.file_download_outlined), label: Text(occupe ? tr('Export en cours…') : tr('Exporter les présences du camp'))),
        FilledButton.icon(onPressed: occupe ? null : _exporterInscriptions, icon: const Icon(Icons.file_download_outlined), label: Text(occupe ? tr('Export en cours…') : tr('Exporter les inscriptions du camp'))),
      ],
    ]);
  }
}

// TABLEAU DE BORD ADMINISTRATEUR, 31 oct. 2026, ordinateur seulement.
// Page de consultation large, ouverte depuis l'Espace structure. Elle
// ne gère rien elle-même : chaque carte renvoie vers la page
// existante correspondante, et la validation des paiements se fait
// dans l'Espace structure, après contrôle du paiement reçu. Tous les
// chiffres viennent des routes serveur existantes, jamais inventés.
// Sur téléphone, la tuile n'existe pas dans l'Espace structure, et
// la page, si elle est ouverte malgré tout, se replie en une seule
// colonne. La disposition large dépasse la colonne centrée de
// 1100 px des autres pages : jusqu'à 1440 px sur ordinateur, pour
// afficher les sections côte à côte dans la même application.
class AdminDashboardPage extends StatefulWidget {
  const AdminDashboardPage({super.key});

  @override
  State<AdminDashboardPage> createState() => _AdminDashboardPageState();
}

class _AdminDashboardPageState extends State<AdminDashboardPage> {
  final _scroll = ScrollController();
  bool _loading = true;
  Map<String, dynamic>? _totaux;
  String? _totauxError;
  List<Map<String, dynamic>> _enAttente = [];
  String? _enAttenteError;
  List<Map<String, dynamic>> _enLigne = [];
  String? _enLigneError;
  bool _enLigneReserve = false;
  List<Map<String, dynamic>> _annivJour = [];
  List<Map<String, dynamic>> _annivMois = [];
  String? _annivError;
  List<Map<String, dynamic>> _membres = [];
  String? _membresError;
  List<Map<String, dynamic>> _camps = [];
  String? _campsError;

  static const _nomsMois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _scroll.dispose();
    super.dispose();
  }

  int _num(Map<String, dynamic> m, String key) => (m[key] as num?)?.toInt() ?? 0;

  String _texte(Map<String, dynamic> m, String key) => (m[key] ?? '').toString();

  List<Map<String, dynamic>> _liste(dynamic v) {
    if (v is List) return v.whereType<Map<String, dynamic>>().toList();
    return [];
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _totauxError = null;
      _enAttenteError = null;
      _enLigneError = null;
      _enLigneReserve = false;
      _annivError = null;
      _membresError = null;
      _campsError = null;
    });
    try {
      final t = await api.fetchAdminPaymentsTotaux();
      if (mounted) _totaux = t;
    } catch (e) {
      if (mounted) _totauxError = e.toString();
    }
    try {
      final list = await api.fetchAdminPayments(statut: 'en_attente');
      if (mounted) _enAttente = list;
    } catch (e) {
      if (mounted) _enAttenteError = e.toString();
    }
    try {
      final list = await api.fetchOnlineMembers();
      if (mounted) _enLigne = list;
    } catch (e) {
      if (mounted) {
        if (e.toString().contains('(403)')) {
          _enLigneReserve = true;
        } else {
          _enLigneError = e.toString();
        }
      }
    }
    try {
      final data = await api.fetchAdminAnniversaires();
      if (mounted) {
        _annivJour = _liste(data['jour']);
        _annivMois = _liste(data['mois']);
      }
    } catch (e) {
      if (mounted) _annivError = e.toString();
    }
    try {
      final list = await api.fetchAdminMembres();
      if (mounted) _membres = list;
    } catch (e) {
      if (mounted) _membresError = e.toString();
    }
    try {
      final list = await api.fetchEvenements();
      if (mounted) _camps = list;
    } catch (e) {
      if (mounted) _campsError = e.toString();
    }
    if (mounted) setState(() => _loading = false);
  }

  String _typeLabel(Map<String, dynamic> pay) {
    switch (_texte(pay, 'type')) {
      case 'achat':
        return 'Achat';
      case 'carte':
        return 'Carte';
      case 'cotisation':
        return 'Cotisation';
      case 'camp':
        return 'Camp';
      default:
        return 'Don';
    }
  }

  String _suffixCamp(Map<String, dynamic> pay) {
    if (_texte(pay, 'type') != 'camp') return '';
    final parts = <String>[];
    final campNom = _texte(pay, 'camp_nom');
    if (campNom.isNotEmpty) parts.add(campNom);
    final benefNom = _texte(pay, 'beneficiaire_membre_nom').isNotEmpty
        ? _texte(pay, 'beneficiaire_membre_nom')
        : _texte(pay, 'beneficiaire_nom');
    if (benefNom.isNotEmpty) {
      parts.add('${tr('Don pour')} $benefNom');
    } else {
      final numero = _num(pay, 'numero_versement');
      if (numero > 0) {
        parts.add('${tr('Versement')} $numero ${tr('sur 6')}');
      } else {
        parts.add(tr('Paiement en une fois'));
      }
    }
    if (parts.isEmpty) return '';
    return ' · ${parts.join(' · ')}';
  }

  String _nomPaiement(Map<String, dynamic> pay) {
    final nom = _texte(pay, 'nom_complet');
    if (nom.isNotEmpty) {
      final mat = _texte(pay, 'matricule');
      return mat.isEmpty ? nom : '$nom · $mat';
    }
    return tr('Compte supprimé');
  }

  String _dateTexte(String iso) {
    final d = DateTime.tryParse(iso);
    if (d == null) return iso;
    return dateFr(d);
  }

  String _ago(String raw) {
    final d = DateTime.tryParse(raw);
    if (d == null) return '';
    final m = DateTime.now().difference(d).inMinutes;
    if (m <= 0) return tr('à l’instant');
    return isEn ? '$m min ago' : 'il y a $m min';
  }

  List<Map<String, dynamic>> _campsAVenir() {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final list = _camps.where((camp) {
      final finRaw = _texte(camp, 'date_fin');
      if (finRaw.isEmpty) return true;
      final fin = DateTime.tryParse(finRaw);
      if (fin == null) return true;
      return !DateTime(fin.year, fin.month, fin.day).isBefore(today);
    }).toList();
    list.sort((a, b) {
      final da = _texte(a, 'date_debut');
      final db = _texte(b, 'date_debut');
      if (da.isEmpty && db.isEmpty) return _texte(a, 'nom').compareTo(_texte(b, 'nom'));
      if (da.isEmpty) return 1;
      if (db.isEmpty) return -1;
      final cmp = da.compareTo(db);
      return cmp != 0 ? cmp : _texte(a, 'nom').compareTo(_texte(b, 'nom'));
    });
    return list;
  }

  Widget _summaryCard(IconData icon, String label, String value, String sub, double width) {
    final t = Theme.of(context).textTheme;
    return SizedBox(
      width: width,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Icon(icon, color: Cp.goldDeep, size: 26),
              const SizedBox(width: Cp.s1),
              Expanded(child: Text(label, style: t.labelLarge, maxLines: 2)),
            ]),
            const SizedBox(height: Cp.s1),
            Text(value, style: t.titleLarge, maxLines: 2),
            const SizedBox(height: 4),
            Text(sub, style: t.bodyMedium),
          ]),
        ),
      ),
    );
  }

  Widget _sectionCard(String title, IconData icon, List<Widget> children, {String? actionLabel, VoidCallback? onAction}) {
    final t = Theme.of(context).textTheme;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Cp.s2),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Icon(icon, color: Cp.goldDeep, size: 26),
            const SizedBox(width: Cp.s1),
            Expanded(child: Text(title, style: t.titleMedium)),
          ]),
          const SizedBox(height: Cp.s1),
          ...children,
          if (actionLabel != null && onAction != null) ...[
            const SizedBox(height: Cp.s1),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(onPressed: onAction, child: Text(actionLabel)),
            ),
          ],
        ]),
      ),
    );
  }

  Widget _errorRow(String? error) {
    if (error == null) return const SizedBox.shrink();
    final t = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s1),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(tr('Liste indisponible pour le moment.'), style: t.bodyMedium),
        const SizedBox(height: 4),
        TextButton(onPressed: _load, child: Text(tr('Réessayer'))),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      if (!app.isAdmin) {
        return basic(tr('Tableau de bord'), [
          EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.')),
        ]);
      }
      final totalConfirme = _totaux == null ? 0 : _num(_totaux!, 'total_confirme');
      final nombreConfirme = _totaux == null ? 0 : _num(_totaux!, 'nombre_confirme');
      final nombreEnAttente = _totaux == null ? 0 : _num(_totaux!, 'nombre_en_attente');
      final totalEnAttente = _totaux == null ? 0 : _num(_totaux!, 'total_en_attente');
      final campsAVenir = _campsAVenir();
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Cp.navy,
          foregroundColor: Colors.white,
          title: Text(tr('Tableau de bord')),
          actions: [
            IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load),
          ],
        ),
        body: SafeArea(
          child: LayoutBuilder(builder: (ctx, cons) {
            final large = cons.maxWidth > 1000;
            final contentW = large ? (cons.maxWidth < 1440.0 ? cons.maxWidth : 1440.0) : cons.maxWidth;
            final padding = large ? 24.0 : 16.0;
            final cols = large ? 3 : (cons.maxWidth >= 600 ? 2 : 1);
            final cardW = (contentW - padding * 2 - 16.0 * (cols - 1)) / cols;
            final summary = <Widget>[
              _summaryCard(
                Icons.account_balance_wallet_outlined,
                tr('Total encaissé'),
                _totauxError != null || _totaux == null ? tr('Chiffre indisponible pour le moment.') : fcfa(totalConfirme),
                _totaux == null ? '' : '$nombreConfirme ${tr('paiements confirmés')}',
                cardW,
              ),
              _summaryCard(
                Icons.pending_actions_outlined,
                tr('Paiements en attente'),
                _totauxError != null || _totaux == null ? tr('Chiffre indisponible pour le moment.') : '$nombreEnAttente ${tr('à valider')}',
                _totaux == null ? '' : fcfa(totalEnAttente),
                cardW,
              ),
              _summaryCard(
                Icons.group_outlined,
                tr('Membres en ligne'),
                _enLigneReserve
                    ? tr('Réservé à l’administrateur général.')
                    : (_enLigneError != null ? tr('Chiffre indisponible pour le moment.') : '${_enLigne.length} ${tr('membre(s) en ligne')}'),
                _enLigneReserve ? '' : tr('Un membre apparaît quand il ouvre l’application.'),
                cardW,
              ),
              _summaryCard(
                Icons.cake_outlined,
                tr('Anniversaires'),
                _annivError != null
                    ? tr('Chiffre indisponible pour le moment.')
                    : (isEn ? '${_annivJour.length} today, ${_annivMois.length} this month' : '${_annivJour.length} aujourd’hui, ${_annivMois.length} ce mois-ci'),
                tr('Anniversaires du jour et du mois, jour et mois seulement, jamais l’année ni l’âge.'),
                cardW,
              ),
              _summaryCard(
                Icons.event_outlined,
                tr('Camps publiés'),
                _campsError != null ? tr('Chiffre indisponible pour le moment.') : '${_camps.length}',
                tr('Camps publiés sur le serveur, dans votre périmètre.'),
                cardW,
              ),
              _summaryCard(
                Icons.people_outlined,
                tr('Membres du périmètre'),
                _membresError != null ? tr('Chiffre indisponible pour le moment.') : '${_membres.length}',
                tr('Liste en lecture seule de votre périmètre.'),
                cardW,
              ),
            ];
            final pendingSection = _sectionCard(
              tr('Derniers paiements en attente'),
              Icons.pending_actions_outlined,
              [
                if (_enAttenteError != null)
                  _errorRow(_enAttenteError)
                else if (_enAttente.isEmpty)
                  Text(tr('Aucun paiement en attente.'), style: t.bodyMedium)
                else ...[
                  for (final pay in _enAttente.take(5))
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text('${_typeLabel(pay)}${_suffixCamp(pay)} · ${fcfa(_num(pay, 'montant_fcfa'))}', style: t.labelLarge),
                      subtitle: Text('${_nomPaiement(pay)} · ${_texte(pay, 'reference')} · ${_dateTexte(_texte(pay, 'cree_le'))}', style: t.bodyMedium),
                    ),
                  if (nombreEnAttente > 5)
                    Text(isEn ? 'And ${nombreEnAttente - 5} more pending.' : 'Et ${nombreEnAttente - 5} autres en attente.', style: t.bodyMedium),
                ],
                Text(tr('La validation se fait dans l’Espace structure, après contrôle du paiement reçu.'), style: t.bodyMedium),
              ],
              actionLabel: tr('Ouvrir la validation'),
              onAction: () => Navigator.of(c).pop(),
            );
            final onlineSection = _sectionCard(
              tr('Membres en ligne'),
              Icons.group_outlined,
              [
                if (_enLigneReserve)
                  Text(tr('Réservé à l’administrateur général.'), style: t.bodyMedium)
                else if (_enLigneError != null)
                  _errorRow(_enLigneError)
                else if (_enLigne.isEmpty)
                  Text(tr('Aucun membre en ligne pour le moment.'), style: t.bodyMedium)
                else ...[
                  for (final m in _enLigne.take(5))
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(_texte(m, 'nom_complet'), style: t.labelLarge),
                      subtitle: Text('${_texte(m, 'matricule')} · ${_ago(_texte(m, 'derniere_activite'))}', style: t.bodyMedium),
                    ),
                ],
              ],
              actionLabel: tr('Voir les membres'),
              onAction: () => go(c, const PerimeterMembersPage()),
            );
            final annivSection = _sectionCard(
              tr('Prochains anniversaires'),
              Icons.cake_outlined,
              [
                if (_annivError != null)
                  _errorRow(_annivError)
                else if (_annivJour.isEmpty && _annivMois.isEmpty)
                  Text(tr('Aucun anniversaire aujourd’hui ni ce mois-ci.'), style: t.bodyMedium)
                else ...[
                  for (final a in [..._annivJour, ..._annivMois].take(8))
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      leading: const Icon(Icons.cake_outlined, color: Cp.goldDeep),
                      title: Text(_texte(a, 'nom_complet'), style: t.labelLarge),
                      subtitle: Text('${_texte(a, 'matricule')}${_texte(a, 'etablissement').isEmpty ? '' : ' · ${_texte(a, 'etablissement')}'}', style: t.bodyMedium),
                      trailing: Text('${_num(a, 'jour')} ${_num(a, 'mois') >= 1 && _num(a, 'mois') <= 12 ? _nomsMois[_num(a, 'mois') - 1] : ''}', style: t.labelLarge),
                    ),
                ],
              ],
              actionLabel: tr('Voir les anniversaires'),
              onAction: () => go(c, const AnniversairesPage()),
            );
            final campsSection = _sectionCard(
              tr('Camps à venir'),
              Icons.event_outlined,
              [
                if (_campsError != null)
                  _errorRow(_campsError)
                else if (campsAVenir.isEmpty)
                  Text(tr('Aucun camp publié pour le moment.'), style: t.bodyMedium)
                else ...[
                  for (final camp in campsAVenir.take(5))
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(_texte(camp, 'nom'), style: t.labelLarge),
                      subtitle: Text(
                        [
                          if (_texte(camp, 'dates_texte').isNotEmpty) _texte(camp, 'dates_texte'),
                          if (_texte(camp, 'lieu').isNotEmpty) _texte(camp, 'lieu'),
                          _num(camp, 'tarif_fcfa') > 0 ? fcfa(_num(camp, 'tarif_fcfa')) : tr('À confirmer'),
                        ].join(' · '),
                        style: t.bodyMedium,
                      ),
                    ),
                ],
              ],
              actionLabel: tr('Voir les camps'),
              onAction: () => go(c, const CampsPage()),
            );
            Widget pair(Widget a, Widget b) {
              if (!large) return Column(children: [a, const SizedBox(height: Cp.s2), b]);
              return Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Expanded(child: a),
                const SizedBox(width: Cp.s2),
                Expanded(child: b),
              ]);
            }
            return Align(
              alignment: Alignment.topCenter,
              child: SizedBox(
                width: contentW,
                child: KeyboardScroll(
                  controller: _scroll,
                  child: SingleChildScrollView(
                    controller: _scroll,
                    padding: EdgeInsets.fromLTRB(padding, padding, padding, padding + Rx.bottomClearance(ctx)),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(tr('Vue d’ensemble de votre périmètre, avec les chiffres réels du serveur.'), style: t.bodyMedium),
                      const SizedBox(height: Cp.s2),
                      if (_loading)
                        Center(child: Padding(padding: const EdgeInsets.all(Cp.s2), child: Column(children: [const CircularProgressIndicator(), const SizedBox(height: Cp.s1), Text(tr('Chargement du tableau de bord…'), style: t.bodyMedium)])))
                      else ...[
                        Wrap(spacing: 16, runSpacing: 16, children: summary),
                        const SizedBox(height: Cp.s2),
                        pair(pendingSection, onlineSection),
                        const SizedBox(height: Cp.s2),
                        pair(annivSection, campsSection),
                      ],
                    ]),
                  ),
                ),
              ),
            );
          }),
        ),
      );
    });
  }
}

class ResetPasswordPage extends StatefulWidget {
  const ResetPasswordPage({super.key});
  @override
  State<ResetPasswordPage> createState() => _ResetPasswordPageState();
}

class _ResetPasswordPageState extends State<ResetPasswordPage> {
  final _search = TextEditingController();
  List<Map<String, dynamic>> _membres = [];
  bool _loading = true;
  String? _error;
  Map<String, dynamic>? _genere;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    try {
      final list = await api.fetchAdminMembres();
      if (!mounted) return;
      setState(() {
        _membres = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _membres = [];
        _loading = false;
        _error = 'Membres indisponibles : $e';
      });
    }
  }

  List<Map<String, dynamic>> get _filtres {
    final q = _search.text.trim().toUpperCase();
    if (q.isEmpty) return _membres;
    return _membres.where((m) {
      final nom = (m['nom_complet'] ?? '').toString().toUpperCase();
      final mat = (m['matricule'] ?? '').toString().toUpperCase();
      return nom.contains(q) || mat.contains(q);
    }).toList();
  }

  Future<void> _generer(Map<String, dynamic> membre) async {
    final nom = (membre['nom_complet'] ?? '').toString();
    final mat = (membre['matricule'] ?? '').toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Générer un mot de passe temporaire ?')),
        content: Text(isEn
            ? 'For $nom ($mat). The old password will stop working at once. The temporary password is valid for 24 hours.'
            : 'Pour $nom ($mat). L’ancien mot de passe ne fonctionnera plus dès maintenant. Le temporaire est valable 24 heures.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Générer'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final res = await api.generateTempPassword((membre['id'] ?? '').toString());
      if (!mounted) return;
      setState(() {
        _loading = false;
        _genere = res;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = 'Génération impossible : $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!app.isAdminGeneral) {
      return basic(tr('Mot de passe oublié'), [
        EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé à l’administrateur général.')),
      ]);
    }
    final t = Theme.of(context).textTheme;
    if (_genere != null) {
      final g = _genere!;
      final temp = (g['mot_de_passe_temporaire'] ?? '').toString();
      return basic(tr('Mot de passe temporaire'), [
        Text('${g['nom_complet']} · ${g['matricule']}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s2),
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(20)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Mot de passe temporaire'), style: t.bodyMedium?.copyWith(color: Colors.white70)),
            const SizedBox(height: Cp.s1),
            SelectableText(temp, style: t.titleLarge?.copyWith(color: Cp.gold, fontWeight: FontWeight.w800, letterSpacing: 1.5)),
          ]),
        ),
        const SizedBox(height: Cp.s2),
        Text(tr('Ce mot de passe ne s’affichera plus après fermeture. Transmets-le en personne ou par appel, puis touche J’ai transmis. L’ancien mot de passe ne fonctionne plus, et ce temporaire est valable 24 heures.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: FilledButton.icon(
            onPressed: () async {
              await Clipboard.setData(ClipboardData(text: temp));
              if (context.mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(tr('Copié.'))));
            },
            icon: const Icon(Icons.copy_outlined),
            label: Text(tr('Copier')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          height: 52,
          child: OutlinedButton(
            onPressed: () => setState(() => _genere = null),
            child: Text(tr('J’ai transmis, effacer')),
          ),
        ),
      ]);
    }
    return basic(tr('Mot de passe oublié'), [
      Text(tr('Choisis un membre, puis génère un mot de passe temporaire à lui transmettre hors application. Son ancien mot de passe cessera de fonctionner dès la génération.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      TextField(
        controller: _search,
        onChanged: (_) => setState(() {}),
        decoration: InputDecoration(
          labelText: tr('Rechercher par nom ou matricule'),
          filled: true,
          fillColor: Cp.card,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
        ),
      ),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_error != null)
        Text(_error!, style: const TextStyle(color: Cp.danger))
      else if (_filtres.isEmpty)
        Text(tr('Aucun membre trouvé.'), style: t.bodyMedium)
      else
        for (final m in _filtres)
          Card(
            child: ListTile(
              title: Text((m['nom_complet'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
              subtitle: Text('${m['matricule']} · ${(m['etablissement'] ?? '').toString()}', style: t.bodyMedium),
              trailing: const Icon(Icons.key_outlined, color: Cp.goldDeep),
              onTap: () => _generer(m),
            ),
          ),
    ]);
  }
}

// Historique des transactions côté administration.
class AdminTransactionHistoryPage extends StatefulWidget {
  const AdminTransactionHistoryPage({super.key, this.matricule});
  final String? matricule;

  @override
  State<AdminTransactionHistoryPage> createState() => _AdminTransactionHistoryPageState();
}

class _AdminTransactionHistoryPageState extends State<AdminTransactionHistoryPage> {
  List<Map<String, dynamic>> _rows = [];
  List<Map<String, dynamic>> _etablissements = [];
  Map<String, dynamic> _totaux = {};
  String _type = 'tous';
  String _statut = 'tous';
  String _periode = 'tout';
  String? _etablissementId;
  String? _matricule;
  bool _loading = true;
  String? _erreur;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _matricule = widget.matricule;
    _load();
  }

  String? _debut() {
    final now = DateTime.now();
    if (_periode == '30j') return _dateIso(now.subtract(const Duration(days: 30)));
    if (_periode == 'mois') return _dateIso(DateTime(now.year, now.month, 1));
    return null;
  }

  String? _fin() => _periode == 'tout' ? null : _dateIso(DateTime.now());

  Future<void> _load() async {
    if (kIsWeb || !app.isAdmin) {
      setState(() => _loading = false);
      return;
    }
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final rows = await api.fetchAdminPayments(
        statut: _statut == 'tous' ? null : _statut,
        matricule: _matricule,
        type: _type == 'tous' ? null : _type,
        etablissementId: _general ? _etablissementId : null,
        debut: _debut(),
        fin: _fin(),
      );
      final totaux = await api.fetchAdminPaymentsTotaux(
        matricule: _matricule,
        type: _type == 'tous' ? null : _type,
        etablissementId: _general ? _etablissementId : null,
        debut: _debut(),
        fin: _fin(),
      );
      var etabs = _etablissements;
      if (_general && etabs.isEmpty) {
        try {
          etabs = await api.fetchEtablissements();
        } catch (_) {
          etabs = [];
        }
      }
      if (!mounted) return;
      setState(() {
        _rows = rows;
        _totaux = totaux;
        _etablissements = etabs;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _erreur = tr('Impossible de charger l’historique.');
        _loading = false;
      });
    }
  }

  Widget _choix(String label, bool selected, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(right: Cp.s1),
      child: ChoiceChip(
        label: Text(label),
        selected: selected,
        selectedColor: Cp.navy,
        backgroundColor: Cp.card,
        labelStyle: TextStyle(fontWeight: FontWeight.w800, color: selected ? Colors.white : Cp.navy),
        onSelected: (_) => onTap(),
      ),
    );
  }

  Widget _ligneFiltres(String titre, List<Widget> chips) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(titre, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s1),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(children: chips),
        ),
        const SizedBox(height: Cp.s2),
      ],
    );
  }

  int _nombre(String k) => (_totaux[k] as num?)?.toInt() ?? 0;

  Widget _carteTotaux() {
    final t = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(tr('Total encaissé'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text(fcfa(_nombre('total_confirme')), style: t.displaySmall?.copyWith(fontWeight: FontWeight.w900, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text('${tr('Validé')} : ${_nombre('nombre_confirme')} · ${fcfa(_nombre('total_confirme'))}', style: t.bodyMedium),
          Text('${tr('En attente')} : ${_nombre('nombre_en_attente')} · ${fcfa(_nombre('total_en_attente'))}', style: t.bodyMedium),
          Text('${tr('Refusé')} : ${_nombre('nombre_refuse')} · ${fcfa(_nombre('total_refuse'))}', style: t.bodyMedium),
          if (_nombre('nombre_annule') > 0)
            Text('${tr('Annulé')} : ${_nombre('nombre_annule')} · ${fcfa(_nombre('total_annule'))}', style: t.bodyMedium),
          const SizedBox(height: Cp.s1),
          Text(tr('Les totaux couvrent toutes les opérations de la sélection, la liste en affiche 200 au maximum.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ],
      ),
    );
  }

  Future<void> _exporterCsv() async {
    final lignes = <String>[
      [_csvChamp(tr('Date et heure')), _csvChamp(tr('Référence')), _csvChamp(tr('Membre')), _csvChamp(tr('Matricule')), _csvChamp(tr('Établissement')), _csvChamp(tr('Type')), _csvChamp(tr('Moyen')), _csvChamp(tr('Montant')), _csvChamp(tr('Statut')), _csvChamp(tr('Validé le')), _csvChamp(tr('Refusé le')), _csvChamp(tr('Validé par')), _csvChamp(tr('Refusé par'))].join(';'),
    ];
    for (final row in _rows) {
      final moyen = (row['moyen'] ?? '').toString();
      lignes.add([
        _csvChamp(dateHeure((row['cree_le'] ?? '').toString())),
        _csvChamp((row['reference'] ?? '').toString()),
        _csvChamp((row['nom_complet'] ?? '').toString()),
        _csvChamp((row['matricule'] ?? '').toString()),
        _csvChamp((row['etablissement_nom'] ?? '').toString()),
        _csvChamp(typePaiementLabel((row['type'] ?? '').toString())),
        _csvChamp(moyenPaiementLabel(moyen.isEmpty ? null : moyen)),
        _csvChamp(((row['montant_fcfa'] as num?)?.toInt() ?? 0).toString()),
        _csvChamp(statutPaiementLabel((row['statut'] ?? '').toString())),
        _csvChamp(dateHeure((row['confirme_le'] ?? '').toString())),
        _csvChamp(dateHeure((row['refuse_le'] ?? '').toString())),
        _csvChamp((row['confirme_par_nom'] ?? '').toString()),
        _csvChamp((row['refuse_par_nom'] ?? '').toString()),
      ].join(';'));
    }
    final contenu = lignes.join('\n');
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(contenu)];
      final fichier = await saveToDownloads(bytes, 'transactions.csv');
      if (!mounted) return;
      toast(context, '${tr('Exporté')} : ${fichier.path.split('/').last}');
      await Share.shareXFiles([XFile(fichier.path)], text: tr('Historique des transactions'));
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Future<void> _ouvrirFiche(BuildContext c, Map<String, dynamic> row) async {
    final matricule = (row['matricule'] ?? '').toString();
    await showModalBottomSheet<void>(
      context: c,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (sheetCtx) => TransactionDetailSheet(
        row: row,
        isAdmin: true,
        onFacture: row['statut'] == 'confirme'
            ? () {
                Navigator.of(sheetCtx).pop();
                goMembre(c, () => membre.InvoicePage(request: payRequestFromRow(row, isAdmin: true)));
              }
            : null,
        onAutresOperations: matricule.isNotEmpty
            ? () {
                Navigator.of(sheetCtx).pop();
                go(c, AdminTransactionHistoryPage(matricule: matricule));
              }
            : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    if (kIsWeb) {
      return basic(tr('Historique des transactions'), [
        EmptyNote(icon: Icons.smartphone_outlined, text: tr('Disponible sur téléphone seulement.')),
      ]);
    }
    if (!app.isAdmin) {
      return basic(tr('Historique des transactions'), [
        EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.')),
      ]);
    }
    return basic(tr('Historique des transactions'), [
      if (_matricule != null)
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: Row(children: [
            Expanded(child: Text('${tr('Membre')} : $_matricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
            TextButton.icon(onPressed: () { setState(() => _matricule = null); _load(); }, icon: const Icon(Icons.close_outlined), label: Text(tr('Effacer'))),
          ]),
        ),
      _ligneFiltres(tr('Type'), [
        _choix(tr('Tout'), _type == 'tous', () { setState(() => _type = 'tous'); _load(); }),
        _choix(tr('Don'), _type == 'don', () { setState(() => _type = 'don'); _load(); }),
        _choix(tr('Cotisation'), _type == 'cotisation', () { setState(() => _type = 'cotisation'); _load(); }),
        _choix(tr('Carte'), _type == 'carte', () { setState(() => _type = 'carte'); _load(); }),
        _choix(tr('Achat'), _type == 'achat', () { setState(() => _type = 'achat'); _load(); }),
        _choix(tr('Versement du camp'), _type == 'camp', () { setState(() => _type = 'camp'); _load(); }),
      ]),
      _ligneFiltres(tr('Statut'), [
        _choix(tr('Tout'), _statut == 'tous', () { setState(() => _statut = 'tous'); _load(); }),
        _choix(tr('En attente'), _statut == 'en_attente', () { setState(() => _statut = 'en_attente'); _load(); }),
        _choix(tr('Validé'), _statut == 'confirme', () { setState(() => _statut = 'confirme'); _load(); }),
        _choix(tr('Refusé'), _statut == 'refuse', () { setState(() => _statut = 'refuse'); _load(); }),
        _choix(tr('Annulé'), _statut == 'annule', () { setState(() => _statut = 'annule'); _load(); }),
      ]),
      _ligneFiltres(tr('Période'), [
        _choix(tr('Tout'), _periode == 'tout', () { setState(() => _periode = 'tout'); _load(); }),
        _choix(tr('30 derniers jours'), _periode == '30j', () { setState(() => _periode = '30j'); _load(); }),
        _choix(tr('Ce mois'), _periode == 'mois', () { setState(() => _periode = 'mois'); _load(); }),
      ]),
      if (_general && _etablissements.isNotEmpty)
        _ligneFiltres(tr('Établissement'), [
          _choix(tr('Tous les établissements'), _etablissementId == null, () { setState(() => _etablissementId = null); _load(); }),
          for (final e in _etablissements)
            _choix((e['nom'] ?? '').toString(), _etablissementId == (e['id'] ?? '').toString(), () { setState(() => _etablissementId = (e['id'] ?? '').toString()); _load(); }),
        ]),
      if (!_general)
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: Text(tr('Opérations de votre établissement.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ),
      _carteTotaux(),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 56,
        child: OutlinedButton.icon(
          onPressed: _rows.isEmpty ? null : _exporterCsv,
          icon: const Icon(Icons.download_outlined),
          label: Text(tr('Exporter CSV')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.receipt_long_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_rows.isEmpty)
        EmptyNote(icon: Icons.receipt_long_outlined, text: tr('Aucune opération pour le moment.'))
      else
        for (final row in _rows)
          Padding(
            padding: const EdgeInsets.only(bottom: Cp.s1),
            child: carteOperation(context, row, isAdmin: true, onTap: () => _ouvrirFiche(context, row)),
          ),
    ], actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

// ───────────────────────── Chiffres ─────────────
// 30 oct. 2026, téléphone seulement : statistiques d'encaissement
// de l'administration, depuis la route totaux déjà livrée par
// l'historique. Seuls les paiements confirmés comptent dans le
// total encaissé, les demandes en attente s'affichent à part,
// jamais dans le total. Aucun paiement de camp n'existe
// aujourd'hui, la ventilation ne compte que don, cotisation,
// carte et achat. Pas de vue membre : la route membre est
// plafonnée à 100 lignes, un total calculé côté téléphone
// pourrait être faux, alors que la route totaux agrège côté
// serveur sans plafond.
class ChiffresPage extends StatefulWidget {
  const ChiffresPage({super.key});

  @override
  State<ChiffresPage> createState() => _ChiffresPageState();
}

class _ChiffresPageState extends State<ChiffresPage> {
  static const _types = ['don', 'cotisation', 'carte', 'achat', 'camp'];

  String _onglet = 'jour';
  List<Map<String, dynamic>> _etablissements = [];
  Map<String, dynamic> _periode = {};
  Map<String, Map<String, dynamic>> _typesPeriode = {};
  List<Map<String, dynamic>> _etabsPeriode = [];
  Map<String, dynamic> _jour = {};
  Map<String, Map<String, dynamic>> _typesJour = {};
  List<Map<String, dynamic>> _jours = [];
  bool _loading = true;
  bool _loadingPeriode = false;
  String? _erreur;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _load();
  }

  String _aujourdHui() => _dateIso(DateTime.now());

  (String, String) _bornes() {
    final now = DateTime.now();
    if (_onglet == 'semaine') return (_dateIso(now.subtract(const Duration(days: 6))), _aujourdHui());
    if (_onglet == 'mois') return (_dateIso(DateTime(now.year, now.month, 1)), _aujourdHui());
    return (_aujourdHui(), _aujourdHui());
  }

  int _n(Map<String, dynamic> m, String k) => (m[k] as num?)?.toInt() ?? 0;

  String _periodeLabel() {
    final (debut, fin) = _bornes();
    final d = dateFr(DateTime.parse(debut));
    final f = dateFr(DateTime.parse(fin));
    if (_onglet == 'jour') return isEn ? 'Today, $d' : 'Aujourd’hui, $d';
    return isEn ? 'From $d to $f' : 'Du $d au $f';
  }

  Future<void> _load() async {
    if (kIsWeb || !app.isAdmin) {
      setState(() => _loading = false);
      return;
    }
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      var etabs = <Map<String, dynamic>>[];
      if (_general) {
        try {
          etabs = await api.fetchEtablissements();
        } catch (_) {
          etabs = [];
        }
      }
      final aujourdHui = _aujourdHui();
      final jour = await api.fetchAdminPaymentsTotaux(debut: aujourdHui, fin: aujourdHui);
      final typesJour = <String, Map<String, dynamic>>{};
      for (final type in _types) {
        typesJour[type] = await api.fetchAdminPaymentsTotaux(type: type, debut: aujourdHui, fin: aujourdHui);
      }
      final jours = <Map<String, dynamic>>[];
      final now = DateTime.now();
      for (var i = 6; i >= 0; i--) {
        final d = DateTime(now.year, now.month, now.day - i);
        final iso = _dateIso(d);
        final tot = await api.fetchAdminPaymentsTotaux(debut: iso, fin: iso);
        jours.add({'date': d, 'total': (tot['total_confirme'] as num?)?.toInt() ?? 0});
      }
      if (!mounted) return;
      setState(() {
        _etablissements = etabs;
        _jour = jour;
        _typesJour = typesJour;
        _jours = jours;
        _loading = false;
      });
      await _loadPeriode(premiere: true);
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _erreur = tr('Impossible de charger les chiffres.');
        _loading = false;
      });
    }
  }

  Future<void> _loadPeriode({bool premiere = false}) async {
    final (debut, fin) = _bornes();
    setState(() => _loadingPeriode = true);
    try {
      final periode = await api.fetchAdminPaymentsTotaux(debut: debut, fin: fin);
      final types = <String, Map<String, dynamic>>{};
      for (final type in _types) {
        types[type] = await api.fetchAdminPaymentsTotaux(type: type, debut: debut, fin: fin);
      }
      final etabs = <Map<String, dynamic>>[];
      if (_general) {
        for (final e in _etablissements) {
          final id = (e['id'] ?? '').toString();
          if (id.isEmpty) continue;
          final tot = await api.fetchAdminPaymentsTotaux(etablissementId: id, debut: debut, fin: fin);
          etabs.add({'nom': (e['nom'] ?? '').toString(), 'totaux': tot});
        }
      }
      if (!mounted) return;
      setState(() {
        _periode = periode;
        _typesPeriode = types;
        _etabsPeriode = etabs;
        _loadingPeriode = false;
      });
    } catch (_) {
      if (!mounted) return;
      if (premiere) {
        setState(() {
          _erreur = tr('Impossible de charger les chiffres.');
          _loadingPeriode = false;
        });
      } else {
        setState(() => _loadingPeriode = false);
        toast(context, tr('Impossible de charger les chiffres.'));
      }
    }
  }

  Widget _choix(String label, bool selected, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(right: Cp.s1),
      child: ChoiceChip(
        label: Text(label),
        selected: selected,
        selectedColor: Cp.navy,
        backgroundColor: Cp.card,
        labelStyle: TextStyle(fontWeight: FontWeight.w800, color: selected ? Colors.white : Cp.navy),
        onSelected: (_) => onTap(),
      ),
    );
  }

  Widget _titre(String s) {
    return Text(s, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy));
  }

  Widget _carteTotal() {
    final t = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Expanded(child: Text(tr('Total encaissé'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
            if (_loadingPeriode) const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)),
          ]),
          const SizedBox(height: Cp.s1),
          Text(fcfa(_n(_periode, 'total_confirme')), style: t.displaySmall?.copyWith(fontWeight: FontWeight.w900, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text('${tr('Paiements confirmés')} : ${_n(_periode, 'nombre_confirme')}', style: t.bodyMedium),
          Text(_periodeLabel(), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ],
      ),
    );
  }

  Widget _carteEnAttente() {
    final t = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: const Color(0xFFFEF3C7), borderRadius: BorderRadius.circular(24), border: Border.all(color: const Color(0xFFEBD98E))),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('${tr('En attente de confirmation')} : ${_n(_periode, 'nombre_en_attente')} · ${fcfa(_n(_periode, 'total_en_attente'))}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.goldDeep)),
          const SizedBox(height: Cp.s1),
          Text(tr('Ces montants ne sont pas comptés dans le total encaissé.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          if (_n(_periode, 'nombre_refuse') > 0)
            Padding(
              padding: const EdgeInsets.only(top: Cp.s1),
              child: Text('${tr('Refusé')} : ${_n(_periode, 'nombre_refuse')} · ${fcfa(_n(_periode, 'total_refuse'))}', style: t.bodyMedium),
            ),
        ],
      ),
    );
  }

  Widget _ligneVentilation(IconData icone, String label, int nombre, int total) {
    final t = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(children: [
        Icon(icone, color: Cp.goldDeep),
        const SizedBox(width: Cp.s1),
        Expanded(child: Text(label, style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy))),
        Text('$nombre · ${fcfa(total)}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
      ]),
    );
  }

  Widget _resumeJour() {
    final t = Theme.of(context).textTheme;
    final lignes = <Widget>[];
    for (final type in _types) {
      final tot = _typesJour[type] ?? {};
      if (_n(tot, 'nombre_confirme') > 0) {
        lignes.add(_ligneVentilation(typePaiementIcone(type), typePaiementLabel(type), _n(tot, 'nombre_confirme'), _n(tot, 'total_confirme')));
      }
    }
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(fcfa(_n(_jour, 'total_confirme')), style: t.displaySmall?.copyWith(fontWeight: FontWeight.w900, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text('${tr('Paiements confirmés')} : ${_n(_jour, 'nombre_confirme')}', style: t.bodyMedium),
          if (_n(_jour, 'nombre_en_attente') > 0)
            Text('${tr('En attente')} : ${_n(_jour, 'nombre_en_attente')} · ${fcfa(_n(_jour, 'total_en_attente'))}', style: t.bodyMedium?.copyWith(color: Cp.goldDeep)),
          if (lignes.isNotEmpty) ...[
            const SizedBox(height: Cp.s2),
            ...lignes,
          ] else
            Padding(
              padding: const EdgeInsets.only(top: Cp.s2),
              child: Text(tr('Aucun encaissement aujourd’hui.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
            ),
        ],
      ),
    );
  }

  Widget _barres() {
    final t = Theme.of(context).textTheme;
    var maxTotal = 0;
    for (final j in _jours) {
      final v = j['total'] as int;
      if (v > maxTotal) maxTotal = v;
    }
    final joursSemaine = isEn ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(children: [
        SizedBox(
          height: 160,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              for (final j in _jours)
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        FittedBox(
                          fit: BoxFit.scaleDown,
                          child: Text((j['total'] as int) > 0 ? fcfa(j['total'] as int) : '', style: t.bodySmall?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
                        ),
                        const SizedBox(height: 4),
                        Container(
                          height: maxTotal > 0 ? 8 + ((j['total'] as int) / maxTotal * 100) : 2,
                          decoration: BoxDecoration(
                            color: (j['total'] as int) > 0 ? Cp.gold : Cp.line,
                            borderRadius: BorderRadius.circular(4),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text('${joursSemaine[((j['date'] as DateTime).weekday - 1)]} ${(j['date'] as DateTime).day}', style: t.bodySmall?.copyWith(color: Cp.inkMuted)),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
        if (maxTotal == 0)
          Padding(
            padding: const EdgeInsets.only(top: Cp.s1),
            child: Text(tr('Aucun encaissement sur les 7 derniers jours.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ),
      ]),
    );
  }

  Widget _ventilationType() {
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(children: [
        for (final type in _types)
          _ligneVentilation(typePaiementIcone(type), typePaiementLabel(type), _n(_typesPeriode[type] ?? {}, 'nombre_confirme'), _n(_typesPeriode[type] ?? {}, 'total_confirme')),
      ]),
    );
  }

  Widget _ventilationEtablissements() {
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(children: [
        for (final e in _etabsPeriode)
          _ligneVentilation(Icons.apartment_outlined, (e['nom'] ?? '').toString(), _n((e['totaux'] as Map<String, dynamic>? ?? {}), 'nombre_confirme'), _n((e['totaux'] as Map<String, dynamic>? ?? {}), 'total_confirme')),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    if (kIsWeb) {
      return basic(tr('Chiffres'), [
        EmptyNote(icon: Icons.smartphone_outlined, text: tr('Disponible sur téléphone seulement.')),
      ]);
    }
    if (!app.isAdmin) {
      return basic(tr('Chiffres'), [
        EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.')),
      ]);
    }
    return basic(tr('Chiffres'), [
      SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(children: [
          _choix(tr('Aujourd’hui'), _onglet == 'jour', () { setState(() => _onglet = 'jour'); _loadPeriode(); }),
          _choix(tr('Semaine'), _onglet == 'semaine', () { setState(() => _onglet = 'semaine'); _loadPeriode(); }),
          _choix(tr('Mois'), _onglet == 'mois', () { setState(() => _onglet = 'mois'); _loadPeriode(); }),
        ]),
      ),
      const SizedBox(height: Cp.s2),
      if (!_general)
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: Text(tr('Opérations de votre établissement.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
        ),
      if (_loading)
        const Center(child: CircularProgressIndicator())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.table_chart_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _carteTotal(),
            const SizedBox(height: Cp.s2),
            _carteEnAttente(),
            const SizedBox(height: Cp.s2),
            _titre(tr('Résumé du jour')),
            const SizedBox(height: Cp.s1),
            _resumeJour(),
            const SizedBox(height: Cp.s2),
            _titre(tr('Les 7 derniers jours')),
            const SizedBox(height: Cp.s1),
            _barres(),
            const SizedBox(height: Cp.s2),
            _titre(tr('Par type')),
            const SizedBox(height: Cp.s1),
            _ventilationType(),
            if (_general && _etabsPeriode.isNotEmpty) ...[
              const SizedBox(height: Cp.s2),
              _titre(tr('Par établissement')),
              const SizedBox(height: Cp.s1),
              _ventilationEtablissements(),
            ],
          ],
        ),
    ], actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

// Liste administrateur des fiches d'un camp : nom du membre et date
// de remplissage seulement, jamais de contenu dans une liste.
class FichesSanteAdminListPage extends StatefulWidget {
  const FichesSanteAdminListPage({super.key, required this.camp});
  final Camp camp;

  @override
  State<FichesSanteAdminListPage> createState() => _FichesSanteAdminListPageState();
}

class _FichesSanteAdminListPageState extends State<FichesSanteAdminListPage> {
  bool _loading = true;
  String? _error;
  List<Map<String, dynamic>> _fiches = [];
  List<Map<String, dynamic>> _presences = [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  String _jour(dynamic v) {
    final s = v is String ? v : '';
    return s.length >= 10 ? s.substring(0, 10) : s;
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchFichesSanteAdmin(widget.camp.serverId);
      if (!mounted) return;
      final raw = data['fiches'];
      final rawPresences = data['presences'];
      setState(() {
        _fiches = raw is List ? raw.whereType<Map<String, dynamic>>().toList() : [];
        _presences = rawPresences is List ? rawPresences.whereType<Map<String, dynamic>>().toList() : [];
        _loading = false;
      });
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = e.message;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = tr('Impossible de charger la fiche santé.');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Fiches santé')),
        actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                      Text(_error!, style: t.bodyMedium, textAlign: TextAlign.center),
                      const SizedBox(height: Cp.s2),
                      FilledButton(onPressed: _load, child: Text(tr('Réessayer'))),
                    ]),
                  ),
                )
              : ListView(
                  padding: const EdgeInsets.all(Cp.s2),
                  children: [
                    Text(widget.camp.name, style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                    const SizedBox(height: Cp.s1),
                    Text(tr('La lecture d’une fiche par un administrateur est journalisée.'), style: t.bodyMedium),
                    const SizedBox(height: Cp.s2),
                    SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: FilledButton(
                        onPressed: () async {
                          await Navigator.of(context).push(MaterialPageRoute(builder: (_) => FichePresenceFormPage(camp: widget.camp)));
                          if (mounted) _load();
                        },
                        child: Text(tr('Fiche de présence sur place')),
                      ),
                    ),
                    const SizedBox(height: Cp.s2),
                    if (_fiches.isEmpty && _presences.isEmpty) Text(tr('Aucune fiche santé pour ce camp.'), style: t.bodyMedium),
                    for (final f in _fiches)
                      Card(
                        child: ListTile(
                          title: Text((f['nom_complet'] as String?) ?? ''),
                          subtitle: Text('${tr('Remplie le')} ${_jour(f['modifie_le'])}'),
                          trailing: const Icon(Icons.chevron_right_outlined),
                          onTap: () => go(
                            context,
                            FicheSanteAdminDetailPage(
                              camp: widget.camp,
                              membreId: (f['membre_id'] as String?) ?? '',
                              nomComplet: (f['nom_complet'] as String?) ?? '',
                            ),
                          ),
                        ),
                      ),
                    if (_presences.isNotEmpty) ...[
                      const SizedBox(height: Cp.s2),
                      Text(tr('Fiches de présence sur place'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                      const SizedBox(height: Cp.s1),
                      for (final p in _presences)
                        Card(
                          child: ListTile(
                            title: Text((p['nom_complet'] as String?) ?? ''),
                            subtitle: Text('${tr('Sur place')} · ${tr('Remplie le')} ${_jour(p['modifie_le'])}'),
                            trailing: const Icon(Icons.chevron_right_outlined),
                            onTap: () async {
                              await Navigator.of(context).push(MaterialPageRoute(
                                  builder: (_) => FichePresenceAdminDetailPage(
                                        camp: widget.camp,
                                        ficheId: (p['id'] as String?) ?? '',
                                        nomComplet: (p['nom_complet'] as String?) ?? '',
                                      )));
                              if (mounted) _load();
                            },
                          ),
                        ),
                    ],
                  ],
                ),
    );
  }
}

// Détail administrateur d'une fiche : lecture journalisée côté
// serveur, suppression manuelle possible.
class FicheSanteAdminDetailPage extends StatefulWidget {
  const FicheSanteAdminDetailPage({super.key, required this.camp, required this.membreId, required this.nomComplet});
  final Camp camp;
  final String membreId;
  final String nomComplet;

  @override
  State<FicheSanteAdminDetailPage> createState() => _FicheSanteAdminDetailPageState();
}

class _FicheSanteAdminDetailPageState extends State<FicheSanteAdminDetailPage> {
  bool _loading = true;
  String? _error;
  Map<String, dynamic>? _data;

  @override
  void initState() {
    super.initState();
    _load();
  }

  String _val(String key) {
    final v = _data?[key];
    return v is String && v.isNotEmpty ? v : tr('Non renseigné');
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchFicheSanteAdmin(widget.camp.serverId, widget.membreId);
      if (!mounted) return;
      setState(() {
        _data = data;
        _loading = false;
      });
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = e.message;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = tr('Impossible de charger la fiche santé.');
      });
    }
  }

  Future<void> _delete() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer cette fiche ?')),
        content: Text(tr('Cette fiche sera définitivement supprimée.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.supprimerFicheSanteAdmin(widget.camp.serverId, widget.membreId);
      if (!mounted) return;
      toast(context, tr('Fiche santé supprimée.'));
      Navigator.pop(context);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    }
  }

  Widget _ligne(String label, String key) {
    final t = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(label, style: t.titleSmall?.copyWith(fontWeight: FontWeight.w700, color: Cp.goldDeep)),
        Text(_val(key), style: t.bodyMedium),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Fiche santé')),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                      Text(_error!, style: t.bodyMedium, textAlign: TextAlign.center),
                      const SizedBox(height: Cp.s2),
                      FilledButton(onPressed: _load, child: Text(tr('Réessayer'))),
                    ]),
                  ),
                )
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(widget.nomComplet, style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                    Text(widget.camp.name, style: t.bodyMedium),
                    const SizedBox(height: Cp.s2),
                    _ligne(tr('Allergies'), 'allergies'),
                    _ligne(tr('Traitement médical en cours'), 'traitement'),
                    _ligne(tr('Problème de santé ou handicap à signaler'), 'probleme'),
                    _ligne(tr('Contact d’urgence (nom et téléphone)'), 'contact_urgence'),
                    _ligne(tr('Remarque libre'), 'remarque'),
                    const SizedBox(height: Cp.s1),
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: OutlinedButton(onPressed: _delete, child: Text(tr('Supprimer cette fiche'))),
                    ),
                  ]),
                ),
    );
  }
}

// Fiche de présence sur place, 31 oct. 2026 : une personne sans
// compte, remplie par la structure sur place. Mêmes champs santé
// que la fiche membre, même chiffrement côté serveur, aucune
// inscription, aucun pass ni badge.
class FichePresenceFormPage extends StatefulWidget {
  const FichePresenceFormPage({super.key, required this.camp});
  final Camp camp;

  @override
  State<FichePresenceFormPage> createState() => _FichePresenceFormPageState();
}

class _FichePresenceFormPageState extends State<FichePresenceFormPage> {
  bool _saving = false;
  final _nom = TextEditingController();
  final _contact = TextEditingController();
  final _allergies = TextEditingController();
  final _traitement = TextEditingController();
  final _probleme = TextEditingController();
  final _contactUrgence = TextEditingController();
  final _remarque = TextEditingController();

  @override
  void dispose() {
    _nom.dispose();
    _contact.dispose();
    _allergies.dispose();
    _traitement.dispose();
    _probleme.dispose();
    _contactUrgence.dispose();
    _remarque.dispose();
    super.dispose();
  }

  Widget _champ(TextEditingController c, String label, {int lines = 1}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: TextField(
        controller: c,
        maxLines: lines,
        decoration: InputDecoration(labelText: label, border: const OutlineInputBorder()),
      ),
    );
  }

  Future<void> _save() async {
    if (_saving) return;
    if (_nom.text.trim().isEmpty) {
      toast(context, tr('Le nom complet est requis.'));
      return;
    }
    setState(() => _saving = true);
    try {
      await api.creerFichePresence(widget.camp.serverId, {
        'nom_complet': _nom.text.trim(),
        'contact': _contact.text.trim(),
        'allergies': _allergies.text,
        'traitement': _traitement.text,
        'probleme': _probleme.text,
        'contact_urgence': _contactUrgence.text,
        'remarque': _remarque.text,
      });
      if (!mounted) return;
      toast(context, tr('Fiche de présence enregistrée.'));
      Navigator.pop(context);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible d’enregistrer la fiche de présence.'));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Fiche de présence sur place')),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(Cp.s2),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(widget.camp.name, style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text(tr('Renseignez le nom de la personne, puis les champs santé.'), style: t.bodyMedium),
          Text(tr('Aucun compte n’est créé pour cette personne, aucun pass n’est donné.'), style: t.bodyMedium),
          const SizedBox(height: Cp.s2),
          _champ(_nom, tr('Nom complet')),
          _champ(_contact, tr('Contact (téléphone ou e-mail, facultatif)')),
          _champ(_allergies, tr('Allergies'), lines: 2),
          _champ(_traitement, tr('Traitement médical en cours'), lines: 2),
          _champ(_probleme, tr('Problème de santé ou handicap à signaler'), lines: 2),
          _champ(_contactUrgence, tr('Contact d’urgence (nom et téléphone)')),
          _champ(_remarque, tr('Remarque libre'), lines: 3),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton(
              onPressed: _saving ? null : _save,
              child: Text(tr('Enregistrer la fiche de présence')),
            ),
          ),
        ]),
      ),
    );
  }
}

// Détail administrateur d'une fiche de présence : lecture
// journalisée côté serveur, suppression manuelle possible.
class FichePresenceAdminDetailPage extends StatefulWidget {
  const FichePresenceAdminDetailPage({super.key, required this.camp, required this.ficheId, required this.nomComplet});
  final Camp camp;
  final String ficheId;
  final String nomComplet;

  @override
  State<FichePresenceAdminDetailPage> createState() => _FichePresenceAdminDetailPageState();
}

class _FichePresenceAdminDetailPageState extends State<FichePresenceAdminDetailPage> {
  bool _loading = true;
  String? _error;
  Map<String, dynamic>? _data;

  @override
  void initState() {
    super.initState();
    _load();
  }

  String _val(String key) {
    final v = _data?[key];
    return v is String && v.isNotEmpty ? v : tr('Non renseigné');
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchFichePresenceAdmin(widget.camp.serverId, widget.ficheId);
      if (!mounted) return;
      setState(() {
        _data = data;
        _loading = false;
      });
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = e.message;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = tr('Impossible de charger la fiche de présence.');
      });
    }
  }

  Future<void> _delete() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer cette fiche de présence ?')),
        content: Text(tr('Cette fiche sera définitivement supprimée.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.supprimerFichePresenceAdmin(widget.camp.serverId, widget.ficheId);
      if (!mounted) return;
      toast(context, tr('Fiche de présence supprimée.'));
      Navigator.pop(context);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    }
  }

  Widget _ligne(String label, String key) {
    final t = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(label, style: t.titleSmall?.copyWith(fontWeight: FontWeight.w700, color: Cp.goldDeep)),
        Text(_val(key), style: t.bodyMedium),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Fiche de présence sur place')),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                      Text(_error!, style: t.bodyMedium, textAlign: TextAlign.center),
                      const SizedBox(height: Cp.s2),
                      FilledButton(onPressed: _load, child: Text(tr('Réessayer'))),
                    ]),
                  ),
                )
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(widget.nomComplet, style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                    Text(widget.camp.name, style: t.bodyMedium),
                    Text(tr('Sur place'), style: t.bodyMedium?.copyWith(color: Cp.goldDeep, fontWeight: FontWeight.w700)),
                    const SizedBox(height: Cp.s2),
                    _ligne(tr('Contact de la personne'), 'contact'),
                    _ligne(tr('Allergies'), 'allergies'),
                    _ligne(tr('Traitement médical en cours'), 'traitement'),
                    _ligne(tr('Problème de santé ou handicap à signaler'), 'probleme'),
                    _ligne(tr('Contact d’urgence (nom et téléphone)'), 'contact_urgence'),
                    _ligne(tr('Remarque libre'), 'remarque'),
                    const SizedBox(height: Cp.s1),
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: OutlinedButton(onPressed: _delete, child: Text(tr('Supprimer cette fiche'))),
                    ),
                  ]),
                ),
    );
  }
}

/// Publication d'une activité depuis l'espace structure, 27 oct. 2026 :
/// avant, Ajouter une activité ne faisait que ajouter une chaîne de
/// caractères, donc sans image, sans modification possible, et sans
/// publication serveur. L'activité est d'abord ajoutée en local, puis
/// publiée via POST /admin/etablissements/:id/activites si l'établissement
/// a un identifiant serveur et si l'application est connectée, avec son
/// image téléversée si présente. Sinon, elle reste locale seulement.
Future<void> _publishActivite(BuildContext c, Etab etab, ActivityItem activity) async {
  if (!api.isConnected || etab.id.isEmpty) {
    toast(c, tr('Activité ajoutée en local sur cet appareil seulement. Elle sera publiée pour tous les membres quand l’établissement viendra du serveur et que vous serez connecté avec un compte administrateur.'));
    return;
  }
  if (activity.imageUrl.isEmpty) activity.imageUrl = await uploadContentImage(c, activity.imagePath);
  try {
    final created = await api.createActivite(etablissementId: etab.id, titre: activity.title, imageId: fileIdFromUrl(activity.imageUrl));
    final id = (created['id'] ?? '').toString();
    if (id.isNotEmpty) activity.serverId = id;
    app.changed();
    toast(c, tr('Activité publiée sur le serveur : visible pour les membres connectés avec internet.'));
  } catch (e) {
    toast(c, 'Activité conservée en local sur cet appareil seulement. Publication serveur refusée ($e).');
  }
}

// Tous les paiements des membres, côté serveur, 28 oct. 2026 :
// quand un membre clique sur Payer, sa demande est créée côté
// serveur en attente, elle apparaît ici, et l'administrateur la
// valide ou la refuse après contrôle de son compte Wave. La
// validation serveur génère la facture et débloque le livre, et
// l'application du membre se met à jour au prochain chargement.
// Réservé à l'administrateur général, comme la route serveur.
class _ServerPaymentsSection extends StatefulWidget {
  const _ServerPaymentsSection();

  @override
  State<_ServerPaymentsSection> createState() => _ServerPaymentsSectionState();
}

class _ServerPaymentsSectionState extends State<_ServerPaymentsSection> {
  String _filter = 'en_attente';
  List<Map<String, dynamic>> _payments = [];
  bool _loading = true;
  String? _error;
  Timer? _timer;
  DateTime? _lastRefresh;

  @override
  void initState() {
    super.initState();
    _load();
    _timer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted) _load(silent: true);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _load({bool silent = false}) async {
    if (!silent) {
      setState(() {
        _loading = true;
        _error = null;
      });
    }
    try {
      final list = await api.fetchAdminPayments(statut: _filter == 'tous' ? null : _filter);
      if (!mounted) return;
      setState(() {
        _payments = list;
        _loading = false;
        _lastRefresh = DateTime.now();
        if (!silent) _error = null;
      });
    } catch (e) {
      if (silent) return;
      if (!mounted) return;
      setState(() {
        _payments = [];
        _loading = false;
        _error = e.toString().contains('(403)')
            ? 'Liste serveur réservée à l’administrateur général. Un administrateur d’établissement ne la voit pas.'
            : 'Liste serveur indisponible : $e';
      });
    }
  }

  String _trace(Map<String, dynamic> pay) {
    final statut = (pay['statut'] ?? '').toString();
    String contact(String emailKey, String telKey) {
      final email = (pay[emailKey] ?? '').toString();
      if (email.isNotEmpty) return email;
      return (pay[telKey] ?? '').toString();
    }
    if (statut == 'confirme') {
      final d = DateTime.tryParse((pay['confirme_le'] ?? '').toString());
      final mode = (pay['mode_confirmation'] ?? '').toString();
      if (mode != 'validation_structure') return ' · ${tr('Confirmation automatique')}';
      final c = contact('confirme_par_email', 'confirme_par_telephone');
      return ' · ${tr('Validé le')} ${d == null ? '' : dateFr(d)}${c.isEmpty ? '' : ' · ${tr('par')} $c'}';
    }
    if (statut == 'refuse') {
      final d = DateTime.tryParse((pay['refuse_le'] ?? '').toString());
      if (d == null) return ' · ${tr('Refusé, date non enregistrée avant ce correctif')}';
      final c = contact('refuse_par_email', 'refuse_par_telephone');
      return ' · ${tr('Refusé le')} ${dateFr(d)}${c.isEmpty ? '' : ' · ${tr('par')} $c'}';
    }
    return '';
  }

  String _typeLabel(String type) {
    switch (type) {
      case 'achat':
        return 'Achat';
      case 'carte':
        return 'Carte';
      case 'cotisation':
        return 'Cotisation';
      default:
        return 'Don';
    }
  }

  // Paiement d'un compte supprimé, 31 oct. 2026 : le nom et le
  // matricule sont vides côté serveur, on affiche « Compte supprimé ».
  String _nomPaiementAffiche(Map<String, dynamic> row) {
    final nom = (row['nom_complet'] ?? '').toString();
    if (nom.isNotEmpty) {
      final mat = (row['matricule'] ?? '').toString();
      return mat.isEmpty ? nom : '$nom · $mat';
    }
    return tr('Compte supprimé');
  }

  // Don de camp et paiement en une fois, 31 oct. 2026 : suffixe
  // d'une ligne de paiement de camp dans la section admin, avec
  // le nom du camp et, pour un don, le bénéficiaire.
  String _suffixCampAdmin(Map<String, dynamic> row) {
    if ((row['type'] ?? '').toString() != 'camp') return '';
    final parts = <String>[];
    final campNom = (row['camp_nom'] ?? '').toString();
    if (campNom.isNotEmpty) parts.add(campNom);
    final benefNom = (row['beneficiaire_membre_nom'] ?? '').toString().isNotEmpty
        ? (row['beneficiaire_membre_nom'] ?? '').toString()
        : (row['beneficiaire_nom'] ?? '').toString();
    if (benefNom.isNotEmpty) {
      parts.add('${tr('Don pour')} $benefNom');
    } else {
      final numero = (row['numero_versement'] as num?)?.toInt() ?? 0;
      if (numero > 0) {
        parts.add('${tr('Versement')} $numero ${tr('sur 6')}');
      } else {
        parts.add(tr('Paiement en une fois'));
      }
    }
    if (parts.isEmpty) return '';
    return ' · ${parts.join(' · ')}';
  }

  Future<void> _validate(Map<String, dynamic> pay) async {
    final id = (pay['id'] ?? '').toString();
    final ref = (pay['reference'] ?? '').toString();
    final amount = (pay['montant_fcfa'] as num?)?.toInt() ?? 0;
    final waveCtrl = TextEditingController();
    String? moyen;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setD) => AlertDialog(
          title: Text(tr('Valider ce paiement ?')),
          content: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(isEn ? 'Only confirm after checking the payment received: ${fcfa(amount)} for reference $ref.' : 'Validez seulement après avoir contrôlé le paiement reçu : ${fcfa(amount)} pour la référence $ref.'),
            const SizedBox(height: Cp.s1),
            Text(tr('Moyen de paiement'), style: const TextStyle(fontWeight: FontWeight.w700)),
            for (final m in const [('especes', 'Espèces'), ('wave', 'Wave'), ('orange_money', 'Orange Money'), ('paypal', 'PayPal')])
              RadioListTile<String>(
                title: Text(tr(m.$2)),
                value: m.$1,
                groupValue: moyen,
                onChanged: (v) => setD(() => moyen = v),
                contentPadding: EdgeInsets.zero,
                dense: true,
              ),
            if (moyen == 'wave')
              TextField(
                controller: waveCtrl,
                decoration: InputDecoration(
                  hintText: tr('Identifiant Wave, facultatif'),
                  filled: true,
                  fillColor: Cp.card,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                ),
              ),
          ]),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(onPressed: moyen == null ? null : () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
          ],
        ),
      ),
    );
    final waveId = waveCtrl.text.trim();
    waveCtrl.dispose();
    if (ok != true || !mounted) return;
    try {
      await api.validateAdminPayment(id, waveTransactionId: moyen == 'wave' && waveId.length >= 6 ? waveId : null, moyen: moyen);
      if (!mounted) return;
      toast(context, tr('Paiement validé côté serveur, facture générée.'));
      _load();
    } catch (e) {
      if (mounted) toast(context, 'Validation impossible : $e');
    }
  }

  Future<void> _refuse(Map<String, dynamic> pay) async {
    final id = (pay['id'] ?? '').toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Refuser ce paiement ?')),
        content: Text(tr('Le membre le verra comme refusé au prochain chargement, pas comme en attente.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Refuser'))),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.refuseAdminPayment(id);
      if (!mounted) return;
      toast(context, tr('Paiement refusé.'));
      _load();
    } catch (e) {
      if (mounted) toast(context, 'Refus impossible : $e');
    }
  }

  Future<void> _showBooks(Map<String, dynamic> pay) async {
    try {
      final detail = await api.fetchAdminPayment((pay['id'] ?? '').toString());
      if (!mounted) return;
      final lignes = detail['lignes'];
      final items = lignes is List ? lignes : const [];
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(tr('Livres achetés')),
          content: items.isEmpty
              ? Text(tr('Aucun livre détaillé pour ce paiement.'))
              : Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
                  for (final l in items) Text('${l['titre'] ?? ''} · ${fcfa((l['prix_fcfa'] as num?)?.toInt() ?? 0)}'),
                ]),
          actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text(tr('Fermer')))],
        ),
      );
    } catch (e) {
      if (mounted) toast(context, 'Détail indisponible : $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      heading(context, tr('Tous les paiements des membres')),
      Text(
        tr('Quand un membre clique sur Payer, sa demande apparaît ici en attente de validation. Validez seulement après avoir contrôlé le paiement reçu, en choisissant le moyen réellement utilisé, puis l’application du membre se met à jour au prochain chargement, avec la facture si le paiement est confirmé.'),
        style: t.bodyMedium,
      ),
      if (_lastRefresh != null)
        Text(
          tr('Liste actualisée automatiquement toutes les 30 secondes, dernière actualisation à ${_lastRefresh!.hour.toString().padLeft(2, '0')}:${_lastRefresh!.minute.toString().padLeft(2, '0')}.'),
          style: t.bodyMedium,
        ),
      const SizedBox(height: Cp.s1),
      Wrap(spacing: Cp.s1, children: [
        for (final f in const [('en_attente', 'En attente'), ('confirme', 'Confirmés'), ('refuse', 'Refusés'), ('tous', 'Tous')])
          ChoiceChip(
            label: Text(tr(f.$2)),
            selected: _filter == f.$1,
            selectedColor: Cp.gold,
            onSelected: (_) {
              if (_filter == f.$1) return;
              setState(() => _filter = f.$1);
              _load();
            },
          ),
        IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load),
      ]),
      const SizedBox(height: Cp.s1),
      if (_loading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: CircularProgressIndicator()))
      else if (_error != null)
        Text(_error!, style: t.bodyMedium)
      else if (_payments.isEmpty)
        Text(tr('Aucun paiement dans cette catégorie pour le moment.'), style: t.bodyMedium)
      else
        Card(
          child: Column(children: [
            for (var i = 0; i < _payments.length; i++) ...[
              if (i > 0) const Divider(height: 1),
              ListTile(
                title: Text('${_typeLabel((_payments[i]['type'] ?? '').toString())} · ${fcfa((_payments[i]['montant_fcfa'] as num?)?.toInt() ?? 0)}', style: t.labelLarge),
                subtitle: Text('${_nomPaiementAffiche(_payments[i])} · ${_payments[i]['reference'] ?? ''} · ${dateFr(DateTime.tryParse((_payments[i]['cree_le'] ?? '').toString()) ?? DateTime.now())}${((_payments[i]['wave_transaction_id'] ?? '').toString().isNotEmpty) ? ' · Wave ${_payments[i]['wave_transaction_id']}' : ''}${suffixMoyen((_payments[i]['moyen'] ?? '').toString())}${_trace(_payments[i])}${_suffixCampAdmin(_payments[i])}', style: t.bodyMedium),
                trailing: _filter == 'en_attente'
                    ? Row(mainAxisSize: MainAxisSize.min, children: [
                        if ((_payments[i]['type'] ?? '').toString() == 'achat')
                          IconButton(tooltip: tr('Livres achetés'), icon: const Icon(Icons.auto_stories_outlined), onPressed: () => _showBooks(_payments[i])),
                        TextButton(onPressed: () => _refuse(_payments[i]), child: Text(tr('Refuser'))),
                        const SizedBox(width: 4),
                        FilledButton(onPressed: () => _validate(_payments[i]), child: Text(tr('Valider'))),
                      ])
                    : Text((_payments[i]['statut'] ?? '').toString() == 'confirme' ? tr('Confirmé') : tr('Refusé'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: (_payments[i]['statut'] ?? '').toString() == 'confirme' ? Cp.ok : const Color(0xFFB42318))),
              ),
            ],
          ]),
        ),
    ]);
  }
}

