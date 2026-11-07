// Ecrans d'administration en chargement differe, 31 oct. 2026 :
// ces ecrans ne sont jamais sur le premier ecran, seuls les
// administrateurs les ouvrent. Ils sont charges a la demande par
// lib/main.dart (import differe), jamais au demarrage. Ce fichier
// importe lib/main.dart pour les aides partagees (couleurs, textes,
// navigation, modeles) ; le cycle import differe / import direct est
// accepte par Dart (verifie par compilation d'un cas minimal).
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'main.dart';
import 'differe_membre.dart' deferred as membre;
import 'emploi_absence.dart' deferred as emploi;
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
import 'ux_global.dart';



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
  const ObjectifDonAdminPage({super.key, this.embedded = false});
  // Mode embarqué dans la Comptabilité unique : pas de Scaffold,
  // juste le formulaire, la page d'origine reste joignable sinon.
  final bool embedded;
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
    final contenu = <Widget>[

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
    ];
    if (!_charge) return const Center(child: UxShimmerList());
    if (widget.embedded) return Column(crossAxisAlignment: CrossAxisAlignment.start, children: contenu);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: Text(tr('Objectif de don')),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(Cp.s2),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: contenu),
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
  void initState() {
    super.initState();
    // Caméra au moment de l'utilisation, carte 71 : demandée ici,
    // quand le scan est sollicité, jamais au lancement, avec une
    // courte explication. Refus : la saisie du matricule reste
    // possible, rien n'est bloqué.
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      if (!mounted || isWindowsDesktop) return;
      final ok = await demanderCameraAuMoment(context);
      if (!mounted) return;
      if (!ok) setState(() => _cameraError = 'Caméra indisponible.');
    });
  }

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
          const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
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

// Liste partagee, tranche 2 restructuration, 4 nov. 2026 : exactement
// la liste que le selecteur d'activite proposait deja, dans le
// meme ordre (camps, puis activites d'etablissement) et avec le
// meme perimetre (general : tous, etablissement : son
// etablissement). Le selecteur et la page Presences la partagent,
// pour ne jamais diverger.
List<_ChoixActivite> _listeChoixActivites() {
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
  return choix;
}

Future<_ChoixActivite?> choisirActivite(BuildContext c) {
  final choix = _listeChoixActivites();
  if (choix.isEmpty) {
    toast(c, tr('Aucune activité sur le serveur pour le moment.'));
    return Future.value(null);
  }
  return pick<_ChoixActivite>(c, tr('Choisir une activité'), choix,
      (a) => a.type == 'evenement' ? '${tr('Camp')} : ${a.nom}' : '${a.etab} : ${a.nom}');
}

// Presences, tranche 2 restructuration, 4 nov. 2026 : une seule
// tuile dans l'Espace structure, qui classe les presents par
// activite. Un toucher sur une activite ouvre directement sa
// liste de presence, sans selecteur intermediaire. Le scanner,
// le rapport du jour et la modification vivent dans la page de
// l'activite elle-meme, pas ici. Donnees reelles du serveur
// seulement, par la liste partagee ci-dessus, jamais inventees.
// Ajouter une activite reste ici, car un ajout ne peut pas vivre
// dans une activite qui n'existe pas encore.
class PresencesParActivitePage extends StatelessWidget {
  const PresencesParActivitePage({super.key});

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final general = app.isAdminGeneral;
    final choix = _listeChoixActivites();
    final children = <Widget>[
      Text(tr('Touchez une activité pour voir ses présents directement.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      Wrap(spacing: 8, runSpacing: 8, children: [
        OutlinedButton.icon(
          icon: const Icon(Icons.assignment_outlined),
          label: Text(tr('Rapports journaliers')),
          onPressed: () => go(context, const RapportsActivitePage()),
        ),
        OutlinedButton.icon(
          icon: const Icon(Icons.add_outlined),
          label: Text(tr('Ajouter une activité')),
          onPressed: () => _ajouterActivite(context, general),
        ),
      ]),
      const SizedBox(height: Cp.s2),
    ];
    // Activités jamais publiées, tranche 2 : elles n'ont pas de
    // liste de présence, donc pas de page d'activité où loger
    // leur modification. Leur page Activités reste ouverte
    // d'ici, pas depuis l'Espace structure.
    children.addAll([
      const SizedBox(height: Cp.s1),
      Text(tr('Une activité jamais publiée n’a pas de liste de présence. Pour la modifier, ouvrir Activités.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      OutlinedButton.icon(
        icon: const Icon(Icons.event_outlined),
        label: Text(tr('Activités')),
        onPressed: () => go(context, const ActivitesPage()),
      ),
      const SizedBox(height: Cp.s2),
    ]);
    if (choix.isEmpty) {
      children.add(EmptyNote(icon: Icons.playlist_add_check_outlined, text: tr('Aucune activité sur le serveur pour le moment.')));
    } else {
      for (final a in choix) {
        children.addAll([
          Card(
            child: ListTile(
              leading: Icon(a.type == 'evenement' ? Icons.event_outlined : Icons.group_outlined, color: Cp.navy),
              title: Text(a.nom, style: t.labelLarge),
              subtitle: Text(a.type == 'evenement' ? tr('Camp') : a.etab, style: t.bodyMedium),
              trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
              onTap: () => go(context, PresenceListPage(activiteId: a.id, activiteNom: a.type == 'evenement' ? a.nom : '${a.etab} : ${a.nom}')),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ]);
      }
    }
    return basic(tr('Présences'), children);
  }
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
  void initState() {
    super.initState();
    // Caméra au moment de l'utilisation, carte 71 : demandée ici,
    // quand le scan de présence est sollicité, jamais au lancement,
    // avec une courte explication. Refus : la saisie du matricule
    // reste possible, rien n'est bloqué.
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      if (!mounted || isWindowsDesktop) return;
      final ok = await demanderCameraAuMoment(context);
      if (!mounted) return;
      if (!ok) setState(() => _cameraError = 'Caméra indisponible.');
    });
  }

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
          const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
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
    // Activite d'etablissement modifiable depuis cette page,
    // tranche 2, 4 nov. 2026 : meme perimetre que la liste
    // partagee (general : tous, etablissement : le sien). Un
    // camp n'a pas de bouton Modifier ici : sa modification
    // existe deja sur sa carte, menu Actions, general seulement.
    Etab? etabModifiable;
    ActivityItem? activiteModifiable;
    final monEtab = app.member == null ? '' : etabDisplayName(app.member!.etab);
    for (final e in app.etabs) {
      if (!app.isAdminGeneral && e.name != monEtab && etabDisplayName(e.name) != monEtab) continue;
      for (final a in e.activities) {
        if (a.serverId.isNotEmpty && a.serverId == widget.activiteId) {
          etabModifiable = e;
          activiteModifiable = a;
        }
      }
    }
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
        // Rapport regroupé avec les présences, tranche 2, 4 nov.
        // 2026 : la page des rapports, inchangée, s'ouvre depuis
        // l'activité elle-même, plus depuis une tuile à part.
        // Libellé identique à l'ancienne tuile, car la page
        // affiche les rapports du mois, pas un seul jour filtré.
        OutlinedButton.icon(
          icon: const Icon(Icons.assignment_outlined),
          label: Text(tr('Rapports journaliers')),
          onPressed: () => go(context, const RapportsActivitePage()),
        ),
        // Modification regroupée dans l'activité, tranche 2 :
        // seulement pour une activité d'établissement, nom et
        // image, locale seulement comme avant, le serveur n'a
        // pas de route de modification d'activité.
        if (etabModifiable != null && activiteModifiable != null)
          OutlinedButton.icon(
            icon: const Icon(Icons.edit_outlined),
            label: Text(tr('Modifier cette activité')),
            onPressed: () => _modifierActiviteCible(context, etabModifiable!, activiteModifiable!),
          ),
      ]),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList())));
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

// Nommer ou révoquer des administrateurs, 1er nov. 2026 :
// administrateur général seul, liste des membres du périmètre
// avec leur rôle actuel. Nommer demande un établissement parmi
// ceux qui existent, puis une fonction clé, carte 75, 7 nov.
// 2026 : modérateur, éditeur, responsable, trésorier, ou aucune,
// et dans ce cas l'administrateur garde tout son établissement.
// Changer la fonction seule est possible, révoquer demande une
// confirmation et remet le rôle membre, sans fonction clé. Le
// serveur refuse un général ciblé et le compte de l'appelant.
class AdministrateursPage extends StatefulWidget {
  const AdministrateursPage({super.key});
  @override
  State<AdministrateursPage> createState() => _AdministrateursPageState();
}

class _AdministrateursPageState extends State<AdministrateursPage> {
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
      final list = await api.fetchAdminMembres(inclureSansEtablissement: true);
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

  // Fonctions clés, carte 75 : la liste locale sert de repli si
  // le serveur est plus ancien et ne connaît pas encore la route
  // GET /admin/fonctions-admin. Le serveur reste la référence
  // pour les droits, cette liste ne fait qu'afficher et nommer.
  static const List<String> _fonctionsCles = ['', 'moderateur', 'editeur', 'responsable', 'tresorier'];

  String _fonctionLabel(String code) {
    if (code == 'moderateur') return tr('Modérateur');
    if (code == 'editeur') return tr('Éditeur');
    if (code == 'responsable') return tr('Responsable');
    if (code == 'tresorier') return tr('Trésorier');
    return tr('Administrateur d’établissement, toutes les actions de son établissement');
  }

  String _roleLabel(Map<String, dynamic> row) {
    final role = (row['role_compte'] ?? 'membre').toString();
    if (role == 'admin_general') return tr('Administrateur général');
    if (role == 'admin_etablissement') {
      final adminId = (row['etablissement_admin_id'] ?? '').toString();
      String? nom;
      for (final e in app.etabs) {
        if (e.id == adminId) nom = e.name;
      }
      final base = nom == null ? tr('Administrateur d’établissement') : '${tr('Administrateur d’établissement')} · $nom';
      final fonction = (row['fonction_admin'] ?? '').toString();
      if (fonction.isEmpty) return base;
      return '$base · ${_fonctionLabel(fonction)}';
    }
    return tr('Membre');
  }

  Future<void> _nommer(Map<String, dynamic> row) async {
    final etabs = app.etabs.where((e) => e.id.isNotEmpty).toList();
    if (etabs.isEmpty) {
      toast(context, tr('Aucun établissement pour le moment.'));
      return;
    }
    final choix = await pick<Etab>(context, tr('Quel établissement ?'), etabs, (e) => e.name);
    if (choix == null) return;
    final fonction = await pick<String>(context, tr('Quelle fonction clé ?'), _fonctionsCles, (c) => _fonctionLabel(c));
    if (fonction == null) return;
    try {
      await api.definirRoleMembre((row['id'] ?? '').toString(), 'admin_etablissement', etablissementId: choix.id, fonctionAdmin: fonction.isEmpty ? null : fonction);
      if (!mounted) return;
      toast(context, tr('Administrateur nommé.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  // Changer la fonction clé seule, carte 75 : même rôle,
  // même établissement, seule la fonction change. Le retrait
  // complet reste la révocation, qui remet le rôle membre.
  Future<void> _changerFonction(Map<String, dynamic> row) async {
    final fonction = await pick<String>(context, tr('Quelle fonction clé ?'), _fonctionsCles, (c) => _fonctionLabel(c));
    if (fonction == null) return;
    final etablissementId = (row['etablissement_admin_id'] ?? '').toString();
    if (etablissementId.isEmpty) {
      toast(context, tr('Aucun établissement pour le moment.'));
      return;
    }
    try {
      await api.definirRoleMembre((row['id'] ?? '').toString(), 'admin_etablissement', etablissementId: etablissementId, fonctionAdmin: fonction.isEmpty ? null : fonction);
      if (!mounted) return;
      toast(context, tr('Fonction clé modifiée.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  Future<void> _revoquer(Map<String, dynamic> row) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Révoquer cet administrateur ?')),
        content: Text(tr('Révoquer cet administrateur ? Il redeviendra simple membre.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Révoquer'))),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await api.definirRoleMembre((row['id'] ?? '').toString(), 'membre');
      if (!mounted) return;
      toast(context, tr('Administrateur révoqué.'));
      _load();
    } catch (e) {
      if (!mounted) return;
      toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return live((c) {
      if (_loading) return basic(tr('Administrateurs'), [const Center(child: UxShimmerList())]);
      if (_error != null) return basic(tr('Administrateurs'), [EmptyNote(icon: Icons.error_outline, text: _error!)]);
      if (_membres.isEmpty) return basic(tr('Administrateurs'), [EmptyNote(icon: Icons.shield_outlined, text: tr('Aucun membre pour le moment.'))]);
      return basic(tr('Administrateurs'), [
        Container(
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Seul l’administrateur général nomme les administrateurs. Une fonction clé restreint l’écriture, jamais la lecture de son établissement.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
            const SizedBox(height: Cp.s1),
            Text(tr('Modérateur : présences, liste d’attente, nouveaux membres.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
            Text(tr('Éditeur : actualités, documents, rapports, activités.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
            Text(tr('Responsable : tout cela, plus plannings, matériel, suivis et attestations, sans l’argent.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
            Text(tr('Trésorier : valider un paiement et enregistrer une cotisation, rien d’autre.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ]),
        ),
        const SizedBox(height: Cp.s1),
        for (final row in _membres) ...[
          Container(
            padding: const EdgeInsets.all(Cp.s2),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text((row['nom_complet'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
              const SizedBox(height: 2),
              Text('${(row['matricule'] ?? '').toString()} · ${_roleLabel(row)}', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
              if ((row['role_compte'] ?? 'membre').toString() != 'admin_general') ...[
                const SizedBox(height: Cp.s1),
                Row(children: [
                  if ((row['role_compte'] ?? 'membre').toString() == 'admin_etablissement') ...[
                    OutlinedButton(onPressed: () => _changerFonction(row), child: Text(tr('Changer la fonction'))),
                    const SizedBox(width: 8),
                    OutlinedButton(onPressed: () => _revoquer(row), child: Text(tr('Révoquer'))),
                  ] else
                    FilledButton(onPressed: () => _nommer(row), child: Text(tr('Nommer'))),
                ]),
              ],
            ]),
          ),
          const SizedBox(height: Cp.s1),
        ],
      ]);
    });
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
      final monoUrl = await _monogrammeDataUrl();
      final membres = <PrintMember>[];
      for (var i = 0; i < liste.length; i++) {
        final row = liste[i];
        final matricule = (row['matricule'] ?? '').toString();
        if (matricule.isEmpty) continue;
        if (!mounted) return;
        setState(() => _preparationTexte = '${tr('Préparation')} ${i + 1} / ${liste.length}');
        final fonction = (row['fonction'] ?? '').toString();
        final inscrit = (row['inscrit_le'] ?? '').toString();
        membres.add(PrintMember(
          name: (row['nom_complet'] ?? '').toString(),
          matricule: matricule,
          fonction: fonction.isEmpty || fonction == 'Aucun' ? tr('Membre') : fonction,
          etab: (row['etablissement'] ?? '').toString(),
          photoDataUrl: (row['photo'] ?? '').toString(),
          valideLabel: _moisAnnee((row['valide_jusqua'] ?? '').toString()),
          qrDataUrl: await _qrDataUrl(matricule),
          membreDepuis: inscrit.length >= 4 ? inscrit.substring(0, 4) : '',
        ));
      }
      if (!mounted) return;
      setState(() => _preparation = false);
      if (membres.isEmpty) {
        toast(context, tr('Aucune carte à imprimer.'));
        return;
      }
      await openPrintDocument('cartes-membres.html', buildCardsHtml(membres, monoUrl));
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
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList())));
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
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList())));
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
    return basic(tr('Toutes les présences'), children, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

String _auditActionLabel(String action) {
  switch (action) {
    case 'paiement.refuse':
      return tr('Paiement refusé');
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
      // Refus, 72 heures, correction 3 nov. 2026 : un refus disparaît
      // aussi du journal d'audit après 72 heures, comme de
      // l'historique des refus et côté membre. Filtre d'affichage
      // seulement : aucune ligne d'audit n'est supprimée
      // physiquement dans cette tranche, une suppression physique
      // serait une étape séparée à confirmer. Les autres entrées
      // ne sont jamais filtrées. Sans horodatage, l'entrée reste
      // visible, car son âge ne peut pas être prouvé.
      final now = DateTime.now();
      final lignes = list.where((a) {
        if ((a['action'] ?? '').toString() != 'paiement.refuse') return true;
        final d = DateTime.tryParse((a['horodatage'] ?? '').toString());
        return d == null || now.difference(d).inHours < 72;
      }).toList();
      setState(() {
        _lignes = lignes;
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
      Text(tr('Les refus disparaissent après 72 heures, comme dans l’historique des refus.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
      const SizedBox(height: Cp.s2),
    ];
    if (_loading) {
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList())));
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
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList())));
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
    // Carte 49, 6 nov. 2026 : ligne tenue à 320 px, libellé
    // sur 2 lignes au plus, valeur réduite sans débordement.
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(children: [
        SizedBox(
          width: 80,
          child: Text(label, maxLines: 2, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Cp.ink)),
        ),
        const SizedBox(width: 6),
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Container(
              height: 20,
              color: Cp.line,
              alignment: Alignment.centerLeft,
              child: FractionallySizedBox(
                widthFactor: fraction.clamp(0.0, 1.0),
                child: Container(color: color),
              ),
            ),
          ),
        ),
        const SizedBox(width: 6),
        SizedBox(
          width: 96,
          child: FittedBox(
            fit: BoxFit.scaleDown,
            alignment: Alignment.centerRight,
            child: Text('$count · ${fcfa(amount)}', maxLines: 1, textAlign: TextAlign.right, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Cp.inkMuted)),
          ),
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
    // Carte 49, 6 nov. 2026 : les barres sont à l'échelle du
    // montant, sur le maximum du groupe. Avant, l'échelle était
    // au nombre, d'où Don à un quart pour 1 000 FCFA et Achat
    // à moitié pour 1 050 FCFA, alors que les deux montants
    // sont presque égaux. Les refusés ne font plus de barre.
    final maxStatut = [amountFor('en_attente'), amountFor('confirme')].fold<int>(0, (m, v) => v > m ? v : m);
    final maxType = [typeAmount('don'), typeAmount('cotisation'), typeAmount('carte'), typeAmount('achat'), typeAmount('camp')].fold<int>(0, (m, v) => v > m ? v : m);
    double frac(int v, int max) => max <= 0 ? 0 : (v <= 0 ? 0 : (v / max).clamp(0.06, 1.0));
    // Carte 49, 6 nov. 2026 : les deux cartes ont la même
    // hauteur, le montant tient sur une seule ligne, réduit
    // sans débordement, à 320 et 360 px. Aucun montant changé.
    Widget totalCard({required Color fond, required Color bordure, required String titre, required Color titreCouleur, required String montant, required Color montantCouleur, required String sous, required Color sousCouleur, required IconData icone}) {
      return Expanded(
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(color: fond, borderRadius: BorderRadius.circular(20), border: Border.all(color: bordure)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Icon(icone, color: montantCouleur, size: 16),
              const SizedBox(width: 8),
              Expanded(child: Text(titre, maxLines: 1, style: TextStyle(color: titreCouleur, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 0.6))),
            ]),
            const SizedBox(height: 16),
            FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text(montant, maxLines: 1, style: TextStyle(color: montantCouleur, fontSize: 26, fontWeight: FontWeight.w800)),
            ),
            const SizedBox(height: 6),
            Text(sous, maxLines: 1, style: TextStyle(color: sousCouleur, fontSize: 13)),
          ]),
        ),
      );
    }
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      heading(context, tr('Chiffres')),
      IntrinsicHeight(
        child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          totalCard(fond: Cp.navy, bordure: Cp.navy, titre: 'TOTAL CONFIRMÉ', titreCouleur: Colors.white70, montant: fcfa(amountFor('confirme')), montantCouleur: const Color(0xFF2FD27A), sous: '${countFor('confirme')} ${tr('paiements')}', sousCouleur: Colors.white70, icone: Icons.check_circle_outlined),
          const SizedBox(width: Cp.s1),
          totalCard(fond: Colors.white, bordure: Cp.gold, titre: 'TOTAL EN ATTENTE', titreCouleur: Cp.inkMuted, montant: fcfa(amountFor('en_attente')), montantCouleur: Cp.goldDeep, sous: '${countFor('en_attente')} ${tr('paiements')}', sousCouleur: Cp.inkMuted, icone: Icons.schedule_outlined),
        ]),
      ),
      const SizedBox(height: 20),
      Card(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tr('Paiements par statut'), style: t.titleMedium),
            const SizedBox(height: 12),
            _ChartBar(label: tr('En attente'), count: countFor('en_attente'), amount: amountFor('en_attente'), fraction: frac(amountFor('en_attente'), maxStatut), color: Cp.gold),
            _ChartBar(label: tr('Confirmés'), count: countFor('confirme'), amount: amountFor('confirme'), fraction: frac(amountFor('confirme'), maxStatut), color: Cp.ok),
            // Refusés, carte 49, 6 nov. 2026 : hors totaux,
            // jamais dans Total confirmé ni Total en attente,
            // en petit, en bas, sans barre, avec le délai de
            // 72 heures, règle du 3 nov. 2026. Avant, leur
            // barre rouge pleine dominait tout l'écran.
            if (countFor('refuse') > 0)
              Padding(
                padding: const EdgeInsets.only(top: 4, bottom: 4),
                child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Icon(Icons.info_outlined, color: Cp.inkMuted, size: 14),
                  const SizedBox(width: 6),
                  Expanded(child: Text(isEn ? 'Refused: ${countFor('refuse')} · ${fcfa(amountFor('refuse'))} · outside totals, cleared after 72 h.' : 'Refusés : ${countFor('refuse')} · ${fcfa(amountFor('refuse'))} · hors totaux, effacés après 72 h.', style: const TextStyle(fontSize: 12, color: Cp.inkMuted))),
                ]),
              ),
            if (countFor('annule') > 0)
              Padding(
                padding: const EdgeInsets.only(top: 4, bottom: 4),
                child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Icon(Icons.info_outlined, color: Cp.inkMuted, size: 14),
                  const SizedBox(width: 6),
                  Expanded(child: Text(isEn ? 'Cancelled: ${countFor('annule')} · ${fcfa(amountFor('annule'))} · outside totals.' : 'Annulés : ${countFor('annule')} · ${fcfa(amountFor('annule'))} · hors totaux.', style: const TextStyle(fontSize: 12, color: Cp.inkMuted))),
                ]),
              ),
            const SizedBox(height: 12),
            Text(tr('Paiements par type'), style: t.titleMedium),
            const SizedBox(height: 12),
            _ChartBar(label: tr('Don'), count: typeCount('don'), amount: typeAmount('don'), fraction: frac(typeAmount('don'), maxType), color: Cp.navy),
            _ChartBar(label: tr('Cotisation'), count: typeCount('cotisation'), amount: typeAmount('cotisation'), fraction: frac(typeAmount('cotisation'), maxType), color: Cp.goldDeep),
            _ChartBar(label: tr('Carte'), count: typeCount('carte'), amount: typeAmount('carte'), fraction: frac(typeAmount('carte'), maxType), color: Cp.navy),
            _ChartBar(label: tr('Achat'), count: typeCount('achat'), amount: typeAmount('achat'), fraction: frac(typeAmount('achat'), maxType), color: Cp.goldDeep),
            _ChartBar(label: tr('Versement du camp'), count: typeCount('camp'), amount: typeAmount('camp'), fraction: frac(typeAmount('camp'), maxType), color: Cp.navy),
            const SizedBox(height: Cp.s1),
            // Recoupement, carte 49 : les chiffres affichés
            // se recoupent, Confirmés 2 000 FCFA pour 2
            // paiements, En attente 0 FCFA, Refusés hors totaux.
            Text(isEn ? 'Confirmed ${countFor('confirme')} · ${fcfa(amountFor('confirme'))} · Pending ${countFor('en_attente')} · ${fcfa(amountFor('en_attente'))} · Refused outside totals.' : 'Confirmés ${countFor('confirme')} · ${fcfa(amountFor('confirme'))} · En attente ${countFor('en_attente')} · ${fcfa(amountFor('en_attente'))} · Refusés hors totaux.', style: const TextStyle(fontSize: 12, color: Cp.inkMuted)),
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
/// Carte 77, qualité d'impression, 7 nov. 2026 : l'ancien rendu
/// demandait 240 px avec un interstice de 0,25 px entre modules
/// (gapless: false). Le pas des modules valait alors 11,25 px, avec
/// des bords à des positions fractionnaires, donc chaque module
/// sortait avec un liseré gris anti-crénelé dans le PNG lui-même,
/// avant même l'impression. Ici le QR est rendu sans interstice,
/// à 28 px par module, taille multiple exact du nombre de modules :
/// chaque module est un carré plein net, sans pixel gris sur les
/// bords. Matricule CP-AA-2526 : version 1, 21 modules, 588 px.
/// Affiché à 16 mm, 588 px valent 933 dpi, largement au-dessus
/// des 300 dpi demandés. Le nombre de modules vient de la
/// validation, pas d'une valeur écrite en dur, donc un matricule
/// plus long, version supérieure, garde des modules entiers.
Future<String> _qrDataUrl(String data) async {
  final validation = QrValidator.validate(
    data: data,
    version: QrVersions.auto,
    errorCorrectionLevel: QrErrorCorrectLevel.L,
  );
  final qr = validation.qrCode;
  if (!validation.isValid || qr == null) return '';
  final painter = QrPainter.withQr(qr: qr, gapless: true);
  final bytes = await painter.toImageData(qr.moduleCount * 28.0);
  if (bytes == null) return '';
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
      final monoUrl = await _monogrammeDataUrl();
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
          membreDepuis: '${m.anneeAffichee}',
        ),
      ], monoUrl);
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
    // Carte 77, qualité d'impression, 7 nov. 2026 : ratio 4 au lieu
    // de 3. La carte affichée fait environ 360 px de large sur un
    // téléphone, le PNG passe d'environ 1080 px à environ 1440 px
    // de large, soit environ 427 dpi imprimé au format CR80
    // (85,6 mm), au lieu d'environ 320 dpi. Les autres PNG de
    // l'application, pass de camp et partage de verset, ne sont
    // pas des cartes de membre, ils gardent leur ratio.
    final image = await boundary.toImage(pixelRatio: 4);
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
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList())));
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
      children.add(const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList())));
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
// existantes en 8 espaces, sans toucher aux ecrans eux-memes
// ni a leurs gardes. Sur ordinateur (Rx.isDesktop), une barre
// laterale permanente liste les 8 espaces et la zone principale
// affiche l'espace selectionne. Sur telephone, les 8 espaces
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
// Or Gemini, 4 nov. 2026 : moins agressif que l'ancien or, bleu nuit
// #0B1F3A garde, desormais palette globale de toute l'application,
// sans theme Emeraude, Rubis ni Saphir, sans #0f172a de Gemini.
const _orGemini = Color(0xFFD4A72C);

// Carte 52, 6 nov. 2026 : ligne compacte derriere
// « Tout voir ». Une seule hauteur, 56 px, icone plus
// libelle, sans sous-titre ni ombre. Meme ligne partout,
// geste du jour et resultats de recherche gardent leurs
// grandes cartes. Le lien, quand il y en a un, est un petit
// bouton texte or a droite, avant le chevron. Fonction de
// niveau fichier, pour que les cartes Gestion et suivi
// l'utilisent aussi.
Widget _ligneCompacte(NavTile tuile, {Widget? indicateur, String? lienLabel, VoidCallback? lienOnTap}) => Container(
      height: 56,
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: Cp.line)),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: tuile.onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(10)),
              child: Icon(tuile.icon, color: _orGemini, size: 18),
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(tuile.label, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy, fontSize: 16))),
            if (indicateur != null) ...[
              indicateur,
              const SizedBox(width: 8),
            ],
            if (lienLabel != null && lienOnTap != null) ...[
              TextButton(
                onPressed: lienOnTap,
                style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 8), minimumSize: const Size(0, 36), tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                child: Text(lienLabel, style: const TextStyle(color: Cp.goldDeep, fontWeight: FontWeight.w800, fontSize: 14)),
              ),
              const SizedBox(width: 4),
            ],
            const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted, size: 20),
          ]),
        ),
      ),
    );

class AdminPage extends StatefulWidget {
  const AdminPage({super.key});

  @override
  State<AdminPage> createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  int _espace = 0;

  // Barre laterale ordinateur, tranche 3 carte 17, 4 nov. 2026 :
  // repliable seulement sur ordinateur, 280 px deployee ou 72 px
  // repliee (icones seules, infobulles avec les titres). Choix
  // conserve sur l'appareil seulement, jamais sur le serveur.
  // Telephone : ce champ n'est jamais lu, aucune disposition
  // telephone ne change.
  bool _sidebarReduite = false;

  // Carte 68, 6 nov. 2026 : les replis telephone des cartes
  // 51 et 57 sont retires, le telephone montre tout a plat,
  // sans groupe, sans Tout voir ni Reduire. Sur ordinateur,
  // la barre laterale garde ses 3 groupes, elle n'est pas
  // touchee.

  // Carte 51, 6 nov. 2026 : tuiles regroupees contre la
  // surcharge. Chaque espace ouvert ne montre d'abord que
  // son geste du jour, le reste est derriere « Tout voir ».
  // L'etat Tout voir est conserve sur l'appareil, en local
  // seulement, jamais sur le serveur. Aucune tuile, aucun
  // onTap, aucun perimetre ne change : seul l'affichage
  // se replie. Meme regle sur ordinateur, dans la barre
  // laterale : 2 entrees par groupe, le reste derriere
  // « Tout voir ».
  final Set<int> _toutVoir = {};
  final Set<String> _sidebarToutVoir = {};
  bool _rechercheOuverte = false;
  String _rechercheGeste = '';
  final TextEditingController _controleRecherche = TextEditingController();

  @override
  void initState() {
    super.initState();
    _chargerReplis();
    SharedPreferences.getInstance().then((prefs) {
      if (mounted) {
        setState(() => _sidebarReduite = prefs.getBool('espace_structure_sidebar_reduite') ?? false);
      }
    });
  }

  @override
  void dispose() {
    _controleRecherche.dispose();
    super.dispose();
  }

  void _basculerSidebar() {
    setState(() => _sidebarReduite = !_sidebarReduite);
    SharedPreferences.getInstance().then((prefs) => prefs.setBool('espace_structure_sidebar_reduite', _sidebarReduite));
  }

  Future<void> _chargerReplis() async {
    final prefs = await SharedPreferences.getInstance();
    // Carte 68, 6 nov. 2026 : les replis telephone sauves ne
    // servent plus, le telephone est a plat. Seul l'etat Tout
    // voir de la branche ordinateur est encore charge.
    final toutVoir = prefs.getStringList('espaces_structure_tout_voir');
    if (toutVoir != null && mounted) {
      setState(() {
        _toutVoir
          ..clear()
          ..addAll(toutVoir.map(int.tryParse).whereType<int>().where((i) => i >= 0 && i < 3));
      });
    }
    final sidebarToutVoir = prefs.getStringList('espaces_structure_sidebar_tout_voir');
    if (sidebarToutVoir != null && mounted) {
      setState(() {
        _sidebarToutVoir
          ..clear()
          ..addAll(sidebarToutVoir);
      });
    }
  }

  void _sauvegarderToutVoir() {
    SharedPreferences.getInstance().then((prefs) => prefs.setStringList(
        'espaces_structure_tout_voir', _toutVoir.map((i) => '$i').toList()));
  }

  void _sauvegarderSidebarToutVoir() {
    SharedPreferences.getInstance().then((prefs) => prefs.setStringList(
        'espaces_structure_sidebar_tout_voir', _sidebarToutVoir.toList()));
  }

  // Carte 57, 6 nov. 2026 : 8 groupes fusionnés en 3,
  // Piloter, Gérer, Animer, déjà utilisés dans la barre
  // latérale ordinateur.
  List<String> _titres() => [
        tr('Piloter'),
        tr('Gérer'),
        tr('Animer'),
      ];

  List<IconData> get _icones => const [
        Icons.grid_view_outlined,
        Icons.manage_accounts_outlined,
        Icons.celebration_outlined,
      ];

  // Tuiles façon artefact, 1er nov. 2026 : chaque tuile est une
  // carte blanche arrondie, avec un carré bleu nuit à icône dorée
  // à gauche, titre en gras, sous-titre gris et chevron à droite,
  // au lieu de la simple liste d'avant. Seule la présentation
  // change : aucune tuile, aucun espace, aucune action n'est
  // supprimée, et les règles d'accès restent exactement celles
  // d'avant.
  List<Widget> _lignes(List<NavTile> tuiles) => [
        for (var i = 0; i < tuiles.length; i++) ...[
          if (i > 0) const SizedBox(height: 8),
          _ligneCompacte(tuiles[i]),
        ],
      ];

  Widget _carteTuile(NavTile tuile, {String? lienLabel, VoidCallback? lienOnTap}) => Container(
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.line), boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 12, offset: const Offset(0, 2))]),
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: tuile.onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: Row(children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(14)),
                child: Icon(tuile.icon, color: _orGemini, size: 20),
              ),
              const SizedBox(width: 16),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(tuile.label, style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy, fontSize: 18)),
                const SizedBox(height: 4),
                Text(tuile.sub, style: const TextStyle(color: Cp.inkMuted, fontSize: 14, height: 1.5)),
                // Carte 52, 6 nov. 2026 : lien dedans, pour
                // une tuile fusionnee. Le geste reste en un
                // toucher, sans deuxieme tuile.
                if (lienLabel != null && lienOnTap != null) ...[
                  const SizedBox(height: 8),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: TextButton(
                      onPressed: lienOnTap,
                      style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), minimumSize: const Size(0, 32), tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                      child: Text(lienLabel, style: const TextStyle(color: Cp.goldDeep, fontWeight: FontWeight.w800, fontSize: 14)),
                    ),
                  ),
                ],
              ])),
              const SizedBox(width: 16),
              const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted, size: 20),
            ]),
          ),
        ),
      );

  List<Widget> _cartes(List<NavTile> tuiles) => [
        for (var i = 0; i < tuiles.length; i++) ...[
          if (i > 0) const SizedBox(height: 12),
          _carteTuile(tuiles[i]),
        ],
      ];

  // Carte 57, 6 nov. 2026 : geste du jour d'un groupe, une
  // seule action visible d'abord, qui ouvre sa page. Piloter :
  // Finance, une seule tuile, qui ouvre la Comptabilité.
  // Gérer : Voir les membres, avec un lien Cartes dedans.
  // Animer : Publier, une seule action pour enseigner,
  // informer et annoncer.
  NavTile? _tuilePrincipale(int i, BuildContext c, bool general, List<dynamic> pending) {
    switch (i) {
      // Carte 57 : une seule tuile Finance, qui ouvre la
      // Comptabilité, et rien d'autre pour la finance. La
      // file de validation, les chiffres, le scanner, les
      // refusés et l'objectif vivent dans la Comptabilité.
      case 0:
        return NavTile(
          icon: Icons.account_balance_outlined,
          label: tr('Finance'),
          sub: tr('Comptabilité, validation, chiffres, scanner'),
          onTap: () => go(c, const ComptabilitePage()),
        );
      case 1:
        return NavTile(
          icon: Icons.group_outlined,
          label: tr('Voir les membres'),
          sub: tr('Liste en lecture seule de votre périmètre.'),
          onTap: () => go(c, const PerimeterMembersPage()),
        );
      case 2:
        return NavTile(
          icon: Icons.publish_outlined,
          label: tr('Publier'),
          sub: tr('Enseignement, actualité, annonce.'),
          onTap: () => go(c, const PublierPage()),
        );
      default:
        return null;
    }
  }

  // Carte 68, 6 nov. 2026 : telephone a plat. Les 3 groupes
  // Piloter, Gerer, Animer, les replis, Tout voir et Reduire
  // sont retires sur telephone : toutes les tuiles des groupes
  // apparaissent en une seule liste, en cartes pleines, dans
  // l'ordre de la photo d'Axel du 6 nov. 2026 a 18 h 04 :
  // Departement scolaire, Administrateurs, Documents, Emploi
  // et demandes, Attestations, apres les trois tuiles
  // principales Finance, Voir les membres, Publier, puis les
  // autres a la suite. Les fusions de la carte 57 sont
  // gardees, aucun geste perdu, aucun montant, aucune regle
  // de paiement, aucun perimetre ne change. La branche
  // ordinateur garde ses 3 groupes, elle n'est pas touchee.
  // Les 9 gestes rares restent en recherche seulement, comme
  // carte 52 : Tableau de bord ordinateur, Mode projection,
  // Exports complets, Imprimer, Fiches sante, Mot de passe
  // oublie d'un membre, Importer ou ajouter un membre, Suivi
  // des nouveaux membres, Inventaire du materiel. Le point
  // orange de conflit du Planning, carte Gemini, n'est pas
  // repris ici, il reste sur ordinateur.
  List<Widget> _tuilesAPlat(BuildContext c, bool general) {
    final tuiles = <Widget>[];
    void carte(NavTile tuile, {String? lienLabel, VoidCallback? lienOnTap}) {
      if (tuiles.isNotEmpty) tuiles.add(const SizedBox(height: 12));
      tuiles.add(_carteTuile(tuile, lienLabel: lienLabel, lienOnTap: lienOnTap));
    }
    carte(NavTile(
      icon: Icons.account_balance_outlined,
      label: tr('Finance'),
      sub: tr('Comptabilité, validation, chiffres, scanner'),
      onTap: () => go(c, const ComptabilitePage()),
    ));
    carte(
      NavTile(
        icon: Icons.group_outlined,
        label: tr('Voir les membres'),
        sub: tr('Liste en lecture seule de votre périmètre.'),
        onTap: () => go(c, const PerimeterMembersPage()),
      ),
      lienLabel: tr('Cartes'),
      lienOnTap: () => go(c, const PerimeterMembersPage()),
    );
    carte(NavTile(
      icon: Icons.publish_outlined,
      label: tr('Publier'),
      sub: tr('Enseignement, actualité, annonce.'),
      onTap: () => go(c, const PublierPage()),
    ));
    // Carte 78, 7 nov. 2026 : Actualites programmees, carte
    // d'information sans action, devient une vraie tuile
    // Actualites vers la page Actualites. Icone article_outlined,
    // deja utilisee pour Actualites dans main.dart, donc deja
    // dans la police servie.
    carte(NavTile(
      icon: Icons.article_outlined,
      label: tr('Actualités'),
      sub: tr('Les nouvelles de la structure.'),
      onTap: () => go(c, const NewsPage()),
    ));
    carte(NavTile(
      icon: Icons.school_outlined,
      label: tr('Département scolaire'),
      sub: tr('Moyennes par trimestre, classes d’examen et alertes, par établissement.'),
      onTap: () => go(c, const ScolairePage()),
    ));
    if (general)
      carte(NavTile(
        icon: Icons.shield_outlined,
        label: tr('Administrateurs'),
        sub: tr('Nommer un administrateur d’établissement ou le révoquer.'),
        onTap: () => go(c, const AdministrateursPage()),
      ));
    if (general)
      carte(NavTile(
        // Carte 76, 7 nov. 2026 : icône check_circle_outlined,
        // déjà utilisée dans l'application, donc déjà dans
        // l'ancienne police en cache, comme la carte 67. La tuile
        // reste visible pour l'administrateur général hors
        // période, pour créer l'élection avant son début ; les
        // membres, eux, ne voient la tuile que pendant la période.
        icon: Icons.check_circle_outlined,
        label: tr('Élections'),
        sub: tr('Créer une élection, ajouter des candidats, voir les résultats.'),
        onTap: () => go(c, const ElectionsAdminPage()),
      ));
    carte(
      NavTile(
        icon: Icons.folder_open_outlined,
        label: tr('Documents'),
        sub: tr('Publier un document pour toute la structure ou pour votre établissement.'),
        onTap: () => go(c, const DocumentsPage()),
      ),
      lienLabel: tr('Imprimer'),
      lienOnTap: () => _ouvrirMenuImpression(c),
    );
    carte(NavTile(
      // Carte 67, 6 nov. 2026, appliquée ici aussi à la liste à
      // plat de la carte 68 : assignment_outlined, glyphe déjà
      // dans l'ancienne police en cache, pas work_outline.
      icon: Icons.assignment_outlined,
      label: tr('Tremplin professionnel'),
      sub: tr('Demandes des membres et offres publiées, selon le pays.'),
      onTap: () => goEmploi(c, () => emploi.BureauEmploiPage()),
    ));
    carte(NavTile(
      icon: Icons.workspace_premium_outlined,
      label: tr('Attestations'),
      sub: tr('Bénévolat et participation, modèle unique avec le monogramme officiel, délivrées par l’administration seulement.'),
      onTap: () => go(c, const AttestationsPage()),
    ));
    carte(NavTile(
      icon: Icons.event_note_outlined,
      label: tr('Planning des responsables'),
      sub: tr('Qui fait quoi, quel jour, avec avertissement en cas de chevauchement, jamais un blocage.'),
      onTap: () => go(c, const PlanningResponsablesPage()),
    ));
    if (general)
      carte(NavTile(
        icon: Icons.history_outlined,
        label: tr('Journal d’audit'),
        sub: tr('Qui a marqué, ajouté ou annulé une présence, et quand.'),
        onTap: () => go(c, const AuditListPage()),
      ));
    carte(NavTile(
      icon: Icons.playlist_add_check_outlined,
      label: tr('Présences'),
      sub: tr('Par activité, scanner, rapports et modification dans l’activité.'),
      onTap: () => go(c, const PresencesParActivitePage()),
    ));
    // Carte 78, 7 nov. 2026 : Inscriptions, carte d'information
    // sans action, devient une vraie tuile Inscriptions vers les
    // listes de presence du camp, meme page que Presences, entree
    // nommee comme l'admin la cherche. Icone group_outlined,
    // deja utilisee dans cet ecran, donc deja dans la police.
    carte(NavTile(
      icon: Icons.group_outlined,
      label: tr('Inscriptions'),
      sub: tr('Inscrits d’un camp, dans les listes de présence.'),
      onTap: () => go(c, const PresencesParActivitePage()),
    ));
    carte(NavTile(
      icon: Icons.badge_outlined,
      label: tr('Badges d’un camp'),
      sub: tr('Badges imprimables des inscrits à un camp, plusieurs par page.'),
      onTap: () => _allerBadges(c),
    ));
    carte(NavTile(
      icon: Icons.event_outlined,
      label: tr('Prochain camp'),
      sub: app.camps.isEmpty ? tr('Aucun camp publié.') : app.camps.first.name,
      onTap: () => go(c, const CampsPage()),
    ));
    return tuiles;
  }

  // Contenu d'un groupe ouvert : geste du jour d'abord, puis
  // le reste derriere un seul toucher « Tout voir », jamais
  // affiche d'avance. Le bouton « Réduire » replie le reste.
  // Carte 57, 6 nov. 2026 : le geste du jour Voir les
  // membres porte un lien Cartes, pour garder chaque geste
  // en un toucher sans deuxieme tuile. Finance ouvre déjà
  // la Comptabilité, Publier ouvre déjà sa page.
  List<Widget> _contenuGroupe(int i, List<Widget> contenu, BuildContext c, bool general, List<dynamic> pending) {
    final principale = _tuilePrincipale(i, c, general, pending);
    final ouvert = _toutVoir.contains(i);
    return [
      if (principale != null) ...[
        _carteTuile(
          principale,
          lienLabel: i == 1 ? tr('Cartes') : null,
          lienOnTap: i == 1 ? () => go(c, const PerimeterMembersPage()) : null,
        ),
        const SizedBox(height: 12),
      ],
      if (!ouvert)
        SizedBox(
          width: double.infinity,
          child: OutlinedButton.icon(
            icon: const Icon(Icons.expand_more_outlined),
            label: Text(tr('Tout voir')),
            onPressed: () {
              setState(() => _toutVoir.add(i));
              _sauvegarderToutVoir();
            },
          ),
        ),
      if (ouvert) ...[
        ...contenu,
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: OutlinedButton.icon(
            icon: const Icon(Icons.expand_less_outlined),
            label: Text(tr('Réduire')),
            onPressed: () {
              setState(() => _toutVoir.remove(i));
              _sauvegarderToutVoir();
            },
          ),
        ),
      ],
    ];
  }

  // Carte 57, 6 nov. 2026 : trois raccourcis du jour en haut,
  // pas plus. Comptabilité, Voir les membres, Prochain camp.
  // Aucun geste en double en haut, aucun raccourci Finance
  // séparé, la Comptabilité est la seule entrée finance.
  Widget _raccourciDuJour(IconData icone, String libelle, String? sousTitre, VoidCallback onTap) => Expanded(
        child: Container(
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.line), boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 12, offset: const Offset(0, 2))]),
          child: InkWell(
            borderRadius: BorderRadius.circular(20),
            onTap: onTap,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
              child: Column(children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(14)),
                  child: Icon(icone, color: _orGemini, size: 20),
                ),
                const SizedBox(height: 8),
                Text(libelle, maxLines: 2, overflow: TextOverflow.ellipsis, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy, fontSize: 12, height: 1.3)),
                if (sousTitre != null) ...[
                  const SizedBox(height: 4),
                  Text(sousTitre, maxLines: 1, overflow: TextOverflow.ellipsis, textAlign: TextAlign.center, style: const TextStyle(color: Cp.inkMuted, fontSize: 11, fontWeight: FontWeight.w700)),
                ],
              ]),
            ),
          ),
        ),
      );

  Widget _raccourcisDuJour(BuildContext c, bool general, List<dynamic> pending) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(tr('Raccourcis du jour'), style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy, fontSize: 16)),
        const SizedBox(height: 12),
        Row(children: [
          _raccourciDuJour(Icons.account_balance_outlined, tr('Finance'), general ? '${pending.length} ${tr('en attente')}' : null, () => go(c, const ComptabilitePage())),
          const SizedBox(width: 12),
          _raccourciDuJour(Icons.group_outlined, tr('Voir les membres'), null, () => go(c, const PerimeterMembersPage())),
          const SizedBox(width: 12),
          _raccourciDuJour(Icons.event_outlined, tr('Prochain camp'), app.camps.isEmpty ? null : app.camps.first.name, () => go(c, const CampsPage())),
        ]),
      ]);

  // Carte 51, 6 nov. 2026 : recherche par geste. Une loupe
  // ouvre le champ « Chercher un geste », la recherche
  // filtre les gestes reels par libelle et sous-titre,
  // sans accent et sans casse. Aucun geste n'est invente,
  // chaque resultat ouvre la page ou l'espace existant.
  // Carte 52 : la recherche est aussi le seul endroit ou
  // vivent les gestes rares, jamais affiches ailleurs.
  // « Cartes de membre » est retire, la recherche « cartes »
  // trouve « Voir les membres », qui porte le lien Cartes.
  // Carte 57 : « Valider les paiements » et « Comptabilité »
  // deviennent une seule entrée « Finance », la recherche
  // « valider » la trouve par son sous-titre ; « Nouvel
  // enseignement » et « Nouvelle annonce » deviennent une
  // seule entrée « Publier ».
  List<NavTile> _gestes(BuildContext c, bool general, List<dynamic> pending) => [
        NavTile(icon: Icons.account_balance_outlined, label: tr('Finance'), sub: tr('Comptabilité, validation, chiffres, scanner'), onTap: () => go(c, const ComptabilitePage())),
        NavTile(icon: Icons.group_outlined, label: tr('Voir les membres'), sub: tr('Gérer, cartes'), onTap: () => go(c, const PerimeterMembersPage())),
        NavTile(icon: Icons.bar_chart_outlined, label: tr('Chiffres'), sub: tr('Finance'), onTap: () => go(c, const ComptabilitePage(sectionInitiale: 'chiffres'))),
        NavTile(icon: Icons.event_outlined, label: tr('Prochain camp'), sub: tr('Animer'), onTap: () => go(c, const CampsPage())),
        NavTile(icon: Icons.publish_outlined, label: tr('Publier'), sub: tr('Enseignement, actualité, annonce'), onTap: () => go(c, const PublierPage())),
        NavTile(icon: Icons.settings_outlined, label: tr('Réglages'), sub: tr('Gérer'), onTap: () => go(c, const NotifSettingsPage())),
        NavTile(icon: Icons.qr_code_scanner_outlined, label: tr('Scanner un paiement'), sub: tr('Finance'), onTap: () => go(c, const ComptabilitePage())),
        NavTile(icon: Icons.playlist_add_check_outlined, label: tr('Présences'), sub: tr('Animer'), onTap: () => go(c, const PresencesParActivitePage())),
        NavTile(icon: Icons.folder_open_outlined, label: tr('Documents'), sub: tr('Gérer'), onTap: () => go(c, const DocumentsPage())),
        NavTile(icon: Icons.history_outlined, label: tr('Journal d’audit'), sub: tr('Piloter'), onTap: () => go(c, const AuditListPage())),
        NavTile(icon: Icons.workspace_premium_outlined, label: tr('Attestations'), sub: tr('Gérer'), onTap: () => go(c, const AttestationsPage())),
        NavTile(icon: Icons.file_download_outlined, label: tr('Exports complets'), sub: tr('Piloter'), onTap: () => go(c, const ExportsPage())),
        NavTile(icon: Icons.school_outlined, label: tr('Département scolaire'), sub: tr('Gérer'), onTap: () => go(c, const ScolairePage())),
        NavTile(icon: Icons.assignment_outlined, label: tr('Tremplin professionnel'), sub: tr('Gérer'), onTap: () => goEmploi(c, () => emploi.BureauEmploiPage())),
        NavTile(icon: Icons.shield_outlined, label: tr('Administrateurs'), sub: tr('Gérer'), onTap: () => go(c, const AdministrateursPage())),
        NavTile(icon: Icons.event_note_outlined, label: tr('Planning des responsables'), sub: tr('Piloter'), onTap: () => go(c, const PlanningResponsablesPage())),
        NavTile(icon: Icons.person_add_alt_1_outlined, label: tr('Suivi des nouveaux membres'), sub: tr('Gérer'), onTap: () => go(c, const NouveauxMembresPage())),
        NavTile(icon: Icons.inventory_2_outlined, label: tr('Inventaire du matériel'), sub: tr('Gérer'), onTap: () => go(c, const InventairePage())),
        NavTile(icon: Icons.list_alt_outlined, label: tr('Liste d’attente de camp'), sub: tr('Animer'), onTap: () => go(c, const ListeAttentePage())),
        NavTile(icon: Icons.badge_outlined, label: tr('Badges d’un camp'), sub: tr('Animer'), onTap: () => _allerBadges(c)),
        NavTile(icon: Icons.key_outlined, label: tr('Mot de passe oublié d’un membre'), sub: tr('Gérer'), onTap: () => go(c, const ResetPasswordPage())),
        NavTile(icon: Icons.group_add_outlined, label: tr('Importer ou ajouter un membre'), sub: tr('Gérer'), onTap: () => go(c, const ImportMembresPage())),
        NavTile(icon: Icons.dashboard_outlined, label: tr('Tableau de bord ordinateur'), sub: tr('Piloter'), onTap: () => go(c, const AdminDashboardPage())),
        // Carte 52 : les trois gestes rares absents de la
        // recherche de la carte 51. Mode projection, web
        // seulement comme avant. Imprimer ouvre le menu des
        // documents imprimables. Fiches santé choisit le camp,
        // comme la tuile retiree de l'espace Événements.
        if (kIsWeb)
          NavTile(icon: Icons.slideshow_outlined, label: tr('Mode projection'), sub: tr('Piloter'), onTap: () => go(c, const ProjectionPage())),
        NavTile(icon: Icons.print_outlined, label: tr('Imprimer'), sub: tr('Documents imprimables'), onTap: () => _ouvrirMenuImpression(c)),
        NavTile(icon: Icons.medical_services_outlined, label: tr('Fiches santé'), sub: tr('Gérer'), onTap: () => _allerFichesSante(c)),
      ];

  Widget _champRechercheGeste() {
    if (!_rechercheOuverte) {
      return SizedBox(
        width: double.infinity,
        child: OutlinedButton.icon(
          icon: const Icon(Icons.search_outlined),
          label: Text(tr('Chercher un geste')),
          onPressed: () => setState(() => _rechercheOuverte = true),
        ),
      );
    }
    return TextField(
      controller: _controleRecherche,
      autofocus: true,
      decoration: InputDecoration(
        prefixIcon: const Icon(Icons.search_outlined),
        hintText: tr('Chercher un geste'),
        suffixIcon: IconButton(
          tooltip: tr('Réduire'),
          icon: const Icon(Icons.close_outlined),
          onPressed: () => setState(() {
            _rechercheOuverte = false;
            _rechercheGeste = '';
            _controleRecherche.clear();
          }),
        ),
      ),
      onChanged: (v) => setState(() => _rechercheGeste = v),
    );
  }

  List<Widget> _resultatsRecherche(BuildContext c, bool general, List<dynamic> pending) {
    final requete = _sansAccent(_rechercheGeste.trim().toLowerCase());
    final trouves = _gestes(c, general, pending)
        .where((g) => _sansAccent('${g.label} ${g.sub}'.toLowerCase()).contains(requete))
        .toList();
    if (trouves.isEmpty) return [Text(tr('Aucun geste trouvé.'), style: Theme.of(c).textTheme.bodyMedium)];
    return _cartes(trouves);
  }

  // Titre de groupe façon artefact : carré bleu nuit à icône dorée,
  // puis titre en gras bleu nuit, comme Finances sur la photo.
  // Carte 50, 6 nov. 2026 : espacement aéré, icône 48,
  // écart 16, comme les en-têtes d'espace.
  Widget _titreGroupe(IconData icone, String titre) => Row(children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(14)),
          child: Icon(icone, color: _orGemini, size: 18),
        ),
        const SizedBox(width: 16),
        Expanded(child: Text(titre, style: const TextStyle(fontWeight: FontWeight.w800, color: Cp.navy, fontSize: 20))),
      ]);

  // Héros de l'Espace structure, carte 56, 6 nov. 2026 : même
  // langage premium bleu nuit et or que la carte Verset du jour,
  // carte 55, fond bleu nuit dégradé, bordure or fine, monogramme
  // en pastille or. Les chiffres sont réels, déjà chargés, jamais
  // inventés : paiements en attente pour l'administrateur général,
  // responsables du Bureau pour l'administrateur d'établissement,
  // camps, établissements et livres. Aucun geste, aucun montant,
  // aucune règle de paiement, aucun périmètre ne change, seul le
  // haut de page gagne ce héros et des espacements plus généreux.
  Widget _herosStructure(BuildContext c, bool general, List<dynamic> pending) {
    Widget chiffre(String valeur, String libelle) => Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(valeur, style: const TextStyle(color: _orGemini, fontSize: 26, fontWeight: FontWeight.w800, height: 1.1)),
            const SizedBox(height: 4),
            Text(libelle, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.w700)),
          ]),
        );
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 18),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Cp.navy, Color(0xFF06101F)],
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: _orGemini, width: 1),
        boxShadow: [BoxShadow(color: Cp.navy.withValues(alpha: 0.25), blurRadius: 16, offset: const Offset(0, 6))],
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(color: _orGemini, borderRadius: BorderRadius.circular(14)),
            child: const Icon(Icons.shield_outlined, color: Cp.navy, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(tr('Espace structure'), style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800, height: 1.15)),
              const SizedBox(height: 2),
              Text(general ? tr('Administrateur général') : tr('Administrateur d’établissement'),
                  style: const TextStyle(color: _orGemini, fontSize: 13, fontWeight: FontWeight.w700)),
            ]),
          ),
        ]),
        const SizedBox(height: 16),
        Container(height: 1, color: _orGemini.withValues(alpha: 0.35)),
        const SizedBox(height: 16),
        Row(children: [
          chiffre(general ? '${pending.length}' : '${app.bureau.length}',
              general ? tr('en attente') : tr('responsables')),
          const SizedBox(width: 12),
          chiffre('${app.camps.length}', tr('camps')),
          const SizedBox(width: 12),
          chiffre('${app.etabs.length}', tr('Établissements')),
          const SizedBox(width: 12),
          chiffre('${app.books.length}', tr('livres')),
        ]),
      ]),
    );
  }

  // Carte 78, 7 nov. 2026 : _infoSection est retiree avec les
  // cartes d'information sans action. Aucune carte ne dit plus
  // seulement qu'une fonction n'existe pas : chaque entree
  // restante est une vraie action ou un vrai lien, sinon elle
  // disparait. E-mails et Configuration n'ont aucune action,
  // elles sont retirees sans remplacement.

  // Tableau de bord : compteurs APK, carte d'alerte des
  // montants en attente en double, vue d'ensemble et membres
  // en ligne (general seulement). Carte 52, 6 nov. 2026 :
  // les tuiles Tableau de bord ordinateur, Exports complets
  // et Mode projection sont retirees d'ici, elles ne vivent
  // plus que dans la recherche par geste.
  List<Widget> _espaceTableauDeBord(BuildContext c, bool general) => [
        // Compteurs APK uniquement, 1er nov. 2026 : visibles
        // seulement dans l'application Android, jamais sur le web,
        // et seulement pour l'administrateur général. Chiffres
        // réels, calculés depuis les données déjà chargées.
        if (!kIsWeb && general)
          Builder(builder: (ctx) {
            final t = Theme.of(ctx).textTheme;
            Widget compteur(String valeur, String libelle) => Expanded(child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.line), boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 12, offset: const Offset(0, 2))]),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(valeur, style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                    const SizedBox(height: 6),
                    Text(libelle, style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
                  ]),
                ));
            return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(14)),
                  child: const Icon(Icons.home_outlined, color: _orGemini, size: 18),
                ),
                const SizedBox(width: 16),
                Expanded(child: Text(tr("Vue d'ensemble"), style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
              ]),
              const SizedBox(height: 12),
              Text(isEn ? 'The organisation at a glance. Payments are only validated after checking the organisation Wave account, with an explicit confirmation, in the Finance screen.' : 'L’activité de la structure en un coup d’œil. Les paiements ne sont validés qu’après le contrôle du compte Wave de la structure, avec une confirmation explicite, dans la Comptabilité.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
              const SizedBox(height: 20),
              Row(children: [
                compteur('${app.requests.where((r) => !r.confirmed).length}', tr('Paiements en attente de validation')),
                const SizedBox(width: 12),
                compteur('${app.camps.length}', tr('Événements publiés')),
              ]),
              const SizedBox(height: 12),
              Row(children: [
                compteur('${app.bureau.length}', tr('Responsables au Bureau')),
                const SizedBox(width: 12),
                compteur('${app.books.length}', tr('Livres au catalogue')),
              ]),
            ]);
          }),
        if (!kIsWeb && general) const SizedBox(height: 32),
        if (general)
          Builder(builder: (ctx) {
            // Restructuration comptabilité, 3 nov. 2026 : la
            // file ne garde que les demandes ni confirmées
            // ni refusées. Un refusé ne reste pas dans la demande.
            final pending = app.requests.where((r) => !r.confirmed && !r.refused).toList();
            final t = Theme.of(ctx).textTheme;
            final counts = <int, int>{};
            for (final r in pending) {
              counts[r.amount] = (counts[r.amount] ?? 0) + 1;
            }
            final doubles = counts.entries.where((e) => e.value > 1).toList();
            return Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.line), boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 12, offset: const Offset(0, 2))]),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Icon(Icons.shield_outlined, color: Cp.goldDeep, size: 20),
                  const SizedBox(width: 12),
                  Expanded(child: Text(isEn ? 'Pending amounts in duplicate' : 'Montants en attente en double', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                ]),
                const SizedBox(height: 12),
                // Carte 49, 6 nov. 2026 : le texte long était
                // coupé en pleine phrase en haut de l'écran.
                // Résumé court, détail au toucher, jamais coupé.
                ExpansionTile(
                  tilePadding: EdgeInsets.zero,
                  childrenPadding: EdgeInsets.zero,
                  title: Text(tr('Le montant seul ne suffit pas.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
                  children: [
                    Text(isEn ? 'When the same exact amount is pending on several requests, the amount alone cannot tell who paid. Reconcile each request by hand with the transaction ID, date and sender, in your Wave account, then validate after checking. No automatic confirmation is made on amount alone.' : 'Quand le même montant exact est en attente sur plusieurs demandes, le montant seul ne permet pas de savoir qui a payé. Rapprochez chaque demande à la main avec l’identifiant de transaction, la date et l’expéditeur, dans votre compte Wave, puis validez après contrôle. Aucune confirmation automatique ne se fait sur le montant seul.', style: t.bodyMedium),
                  ],
                ),
                const SizedBox(height: 12),
                if (doubles.isEmpty)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
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
        if (general) const SizedBox(height: 32),
        if (general) const _AdminChartsSection(),
        if (general) const SizedBox(height: 32),
        if (general) const _OnlineMembersSection(),
      ];

  // Contenus et publications, lecture stricte : annonces
  // (audio, vidéo ou lien, general seulement) seulement ici,
  // pas de doublon dans Communication. Les pages membres
  // (enseignements, actualités, livres) et la création de
  // questions de quiz vivent dans leurs onglets et sur l'accueil.
  // Carte 52, 6 nov. 2026 : lignes compactes derriere
  // « Tout voir », deux gestes au plus. La tuile Documents
  // porte un lien Imprimer dedans, qui ouvre le menu des
  // documents imprimables.
  // Carte 57 : Documents vit dans Gérer, la publication
  // d'annonce vit dans la tuile Publier d'Animer.
  List<Widget> _espaceContenus(BuildContext c, bool general, {bool avecDocuments = true}) => [
        if (avecDocuments) ...[
          _ligneCompacte(
            NavTile(
              icon: Icons.folder_open_outlined,
              label: tr('Documents'),
              sub: tr('Publier un document pour toute la structure ou pour votre établissement.'),
              onTap: () => go(c, const DocumentsPage()),
            ),
            lienLabel: tr('Imprimer'),
            lienOnTap: () => _ouvrirMenuImpression(c),
          ),
          // Tremplin professionnel, carte 82, 7 nov. 2026, ancien nom Emploi et demandes, cartes 63 et 65, 6 nov. 2026 :
          // les offres sont des publications de la structure,
          // comme les documents. Ici, dans Gérer seulement,
          // avecDocuments vrai, jamais dans Animer, pour ne pas
          // l'afficher deux fois. La tuile Publier une annonce
          // de la carte 65 n'est pas reprise, la carte 57 l'a
          // fusionnée dans la tuile Publier d'Animer.
          // Carte 67, 6 nov. 2026 : icône assignment_outlined,
          // pas work_outline. Le glyphe work_outline, 0xe6f4,
          // n'existait pas dans la police servie avant le lot
          // 57 à 65, c678c6f8, il n'est arrivé qu'avec la
          // police 07d6c417, donc un téléphone gardant
          // l'ancienne police en cache voyait un carré vide.
          // assignment_outlined, 0xee98, était déjà dans
          // l'ancienne police, il sort même avec la police
          // en cache, et c'est déjà l'icône de « Mes absences
          // et demandes » côté membre, même famille.
          const SizedBox(height: 8),
          _ligneCompacte(
            NavTile(
              icon: Icons.assignment_outlined,
              label: tr('Tremplin professionnel'),
              sub: tr('Demandes des membres et offres publiées, selon le pays.'),
              onTap: () => goEmploi(c, () => emploi.BureauEmploiPage()),
            ),
          ),
        ],
      ];

  // Structure et membres, carte 52, 6 nov. 2026 : lignes
  // compactes derriere « Tout voir », deux gestes au plus.
  // La tuile Membres est retiree, elle ouvrait la meme page
  // que le geste du jour Voir les membres, qui porte
  // desormais le lien Cartes. Mot de passe oublié d'un
  // membre et Importer des membres ne vivent plus que dans
  // la recherche par geste.
  List<Widget> _espaceStructure(BuildContext c, bool general) => [
        ..._lignes([
          NavTile(
            icon: Icons.school_outlined,
            label: tr('Département scolaire'),
            sub: tr('Moyennes par trimestre, classes d’examen et alertes, par établissement.'),
            onTap: () => go(c, const ScolairePage()),
          ),
          if (general)
            NavTile(
              icon: Icons.shield_outlined,
              label: tr('Administrateurs'),
              sub: tr('Nommer un administrateur d’établissement ou le révoquer.'),
              onTap: () => go(c, const AdministrateursPage()),
            ),
        ]),
      ];

  // Evenements, tranche 2 restructuration, 4 nov. 2026 : une
  // seule tuile Presences. Les tuiles Activites, Listes de
  // presence par activite et Rapports journaliers ne sont plus
  // dans l'Espace structure, leurs acces vivent desormais dans
  // la page Presences (liste par activite, rapports, ajout) et
  // dans la page de l'activite elle-meme (scanner, rapport du
  // jour, modification). Aucune page n'est supprimee, les
  // badges et les fiches sante restent exactement comme avant.
  // Carte 78, 7 nov. 2026 : la carte d'information
  // Inscriptions, qui disait seulement qu'il n'existe pas
  // d'ecran dedie, est remplacee par une vraie tuile
  // Inscriptions vers les listes de presence du camp, meme
  // page que Presences, entree nommee comme l'admin la cherche.
  List<Widget> _espaceEvenements(BuildContext c, bool general) => [
        ..._lignes([
          NavTile(
            icon: Icons.playlist_add_check_outlined,
            label: tr('Présences'),
            sub: tr('Par activité, scanner, rapports et modification dans l’activité.'),
            onTap: () => go(c, const PresencesParActivitePage()),
          ),
          NavTile(
            icon: Icons.badge_outlined,
            label: tr('Badges d’un camp'),
            sub: tr('Badges imprimables des inscrits à un camp, plusieurs par page.'),
            onTap: () => _allerBadges(c),
          ),
          NavTile(
            icon: Icons.group_outlined,
            label: tr('Inscriptions'),
            sub: tr('Inscrits d’un camp, dans les listes de présence.'),
            onTap: () => go(c, const PresencesParActivitePage()),
          ),
        ]),
      ];

  // Gestion et suivi, ecran Gemini Flutter du 4 nov. 2026,
  // corrige et repris ici, sans le code brut : meme structure
  // que le code envoye, cartes blanches, coins 12, ombre douce,
  // icone 48x48 bleu nuit a icone or, titre 15, description 12,
  // chevron a droite, largeur centree a 600 au maximum, comme
  // dans le code. En-tete deja correct dans l'application, il
  // n'est pas refait ici : bleu nuit #0B1F3A, monogramme CP en
  // or #D4A72C, photo reelle du membre connecte si renseignee
  // sinon avatar par defaut, loupe de recherche reelle, langue
  // reelle, jamais de photo pravatar, jamais de #1A233A ni de
  // #D4AF37 dans cette section. Le titre de section n'est pas
  // repete, l'en-tete d'espace de l'Espace structure l'affiche
  // deja, pas de doublon. Seule la presentation change, les
  // pages, les actions et les perimetres restent exactement
  // ceux d'avant, tuiles sorties de Finances le 2 nov. 2026.
  // Carte 52 : deux lignes compactes, Attestations et
  // Planning des responsables, le reste en recherche.
  // Carte 57 : Gestion et suivi est partagé, Planning dans
  // Piloter, Attestations dans Gérer.
  List<Widget> _lignesGestionPiloter(BuildContext c) => [
        const _GestionSuiviGeminiCartes(mode: 'planning'),
      ];

  List<Widget> _lignesGestionGerer(BuildContext c) => [
        const _GestionSuiviGeminiCartes(mode: 'attestations'),
      ];

  // Carte 78, 7 nov. 2026 : _espaceCommunication est retiree.
  // Ses deux cartes d'information sans action disparaissent :
  // E-mails, sans aucune action possible, les sujets de priere
  // ne sont ni listes ni stockes, est retiree sans remplacement ;
  // Actualites programmees devient une vraie tuile Actualites
  // vers la page Actualites, dans le groupe Animer, a la place
  // de l'appel retire, et dans la liste a plat du telephone.

  // Carte 78, 7 nov. 2026 : _espaceParametres est retiree.
  // Ses deux cartes d'information sans action disparaissent :
  // Gestion des administrateurs devient inutile ici, la vraie
  // action existe deja, la tuile Administrateurs, dans
  // l'espace Structure et membres sur ordinateur et dans la
  // liste a plat du telephone, general seulement, meme page,
  // meme perimetre ; Configuration, sans aucune action
  // possible, est retiree sans remplacement. Le journal
  // d'audit, seule vraie action de cette section, reste ou
  // il etait, dans Piloter sur ordinateur, par _ligneJournal,
  // et dans la liste a plat du telephone.
  // Carte 52 : le journal d'audit passe en ligne compacte derriere
  // « Tout voir ».
  // Carte 57 : le journal d'audit vit dans Piloter.
  List<Widget> _ligneJournal(BuildContext c, bool general) => [
        if (general)
          ..._lignes([
            NavTile(
              icon: Icons.history_outlined,
              label: tr('Journal d’audit'),
              sub: tr('Qui a marqué, ajouté ou annulé une présence, et quand.'),
              onTap: () => go(c, const AuditListPage()),
            ),
          ]),
      ];

  // ── Tranche 3, carte 17 ordinateur, 4 nov. 2026 ──────────────
  // Tout ce bloc ne sert que sur ordinateur. Chaque branche
  // appelle Rx.isDesktop avant d'afficher quoi que ce soit de
  // nouveau, donc le telephone garde exactement ses listes et
  // ses tuiles d'avant. Aucune donnee n'est inventee ici :
  // montants, noms, references et dates viennent des demandes
  // reelles deja chargees, et chaque validation garde son
  // dialogue de controle manuel du compte Wave, sans aucune
  // confirmation automatique. Palette or #D4A72C, bleu nuit
  // #0B1F3A, sans theme Emeraude, Rubis ni Saphir, sans
  // #0f172a. Les sujets de priere restent par e-mail seulement,
  // ils ne sont ni listes ni stockes, comme avant.

  // Regroupement de la barre laterale ordinateur en 3 groupes
  // Gemini. Chaque espace apparait exactement une fois.
  // Parametres et securite va avec la Vue principale, car il
  // regle l'espace lui-meme, pas un contenu. Communication va
  // avec Gestion et Documents, car son contenu est gere par la
  // structure, e-mails et actualites programmees.
  // Carte 78, 7 nov. 2026 : la section Communication est
  // retiree, ses cartes d'information sans action aussi.
  // Actualites vit comme tuile dans Animer et dans la liste
  // a plat du telephone, E-mails n'a plus d'entree.
  // Carte 50, 6 nov. 2026 : trois groupes par usage.
  // Piloter : voir et valider, chaque jour. Gérer : les
  // membres, le suivi et les réglages. Animer : les
  // événements, les contenus et les actualités.
  // Carte 57, 6 nov. 2026 : la barre latérale ne liste plus
  // que les 3 groupes, un par un, plus de sous-listes.
  List<(String, List<int>)> _groupesSidebar() => [
        (tr('Piloter'), const [0]),
        (tr('Gérer'), const [1]),
        (tr('Animer'), const [2]),
      ];

  String _sansAccent(String s) {
    const remplacements = {'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'î': 'i', 'ï': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c'};
    var out = s;
    remplacements.forEach((k, v) => out = out.replaceAll(k, v));
    return out;
  }

  Future<void> _allerBadges(BuildContext c) async {
    final camps = app.camps.where((camp) => camp.serverId.isNotEmpty).toList();
    if (camps.isEmpty) {
      toast(c, tr('Aucun camp publié.'));
      return;
    }
    final camp = await pick<Camp>(c, tr('Quel camp ?'), camps, (camp) => camp.name);
    if (camp != null && c.mounted) go(c, CampBadgesPrintPage(camp: camp));
  }

  // Carte 52 : meme choix du camp que la tuile retiree de
  // l'espace Événements, pour la recherche seulement.
  Future<void> _allerFichesSante(BuildContext c) async {
    final camps = app.camps.where((camp) => camp.serverId.isNotEmpty).toList();
    if (camps.isEmpty) {
      toast(c, tr('Aucun camp publié.'));
      return;
    }
    final camp = await pick<Camp>(c, tr('Quel camp ?'), camps, (camp) => camp.name);
    if (camp != null && c.mounted) go(c, FichesSanteAdminListPage(camp: camp));
  }

  // Palette de commande, ordinateur seulement, Ctrl + K.
  // Elle ne navigue que vers des pages existantes, avec leurs
  // perimetres d'avant, elle n'ouvre aucun nouvel ecran.
  Future<void> _ouvrirPalette(BuildContext c, List<int> visibles, List<String> titres) async {
    var filtre = '';
    final actions = <({String label, String sub, IconData icon, VoidCallback action})>[];
    for (var vi = 0; vi < visibles.length; vi++) {
      final idx = vi;
      actions.add((label: titres[visibles[idx]], sub: tr('Espace'), icon: _icones[visibles[idx]], action: () => setState(() => _espace = idx)));
    }
    actions.addAll([
      (label: tr('Comptabilité'), sub: tr('Finance'), icon: Icons.account_balance_outlined, action: () => go(c, const ComptabilitePage())),
      (label: tr('Tableau de bord ordinateur'), sub: tr('Vue principale'), icon: Icons.dashboard_outlined, action: () => go(c, const AdminDashboardPage())),
      (label: tr('Attestations'), sub: tr('Gérer'), icon: Icons.workspace_premium_outlined, action: () => go(c, const AttestationsPage())),
      (label: tr('Planning des responsables'), sub: tr('Piloter'), icon: Icons.event_note_outlined, action: () => go(c, const PlanningResponsablesPage())),
      (label: tr('Suivi des nouveaux membres'), sub: tr('Gérer'), icon: Icons.person_add_alt_1_outlined, action: () => go(c, const NouveauxMembresPage())),
      (label: tr('Inventaire du matériel'), sub: tr('Gérer'), icon: Icons.inventory_2_outlined, action: () => go(c, const InventairePage())),
      (label: tr('Badges d’un camp'), sub: tr('Animer'), icon: Icons.badge_outlined, action: () => _allerBadges(c)),
      (label: tr('Exports complets'), sub: tr('Vue principale'), icon: Icons.file_download_outlined, action: () => go(c, const ExportsPage())),
      // Carte 57 : le scanner vit dans la Comptabilité, la
      // palette y mène, pas sur une page à part.
      (label: tr('Scanner un paiement'), sub: tr('Finance'), icon: Icons.qr_code_scanner_outlined, action: () => go(c, const ComptabilitePage())),
      (label: tr('Imprimer'), sub: tr('Documents imprimables'), icon: Icons.print_outlined, action: () => _ouvrirMenuImpression(c)),
    ]);
    await showDialog<void>(
      context: c,
      builder: (dctx) => StatefulBuilder(
        builder: (dctx, setD) {
          final f = _sansAccent(filtre.toLowerCase());
          final filtrees = actions.where((a) => f.isEmpty || _sansAccent(a.label.toLowerCase()).contains(f) || _sansAccent(a.sub.toLowerCase()).contains(f)).toList();
          return CallbackShortcuts(
            bindings: {SingleActivator(LogicalKeyboardKey.escape): () => Navigator.of(dctx).pop()},
            child: AlertDialog(
              title: Text(tr('Palette de commande')),
              content: SizedBox(
                width: 480,
                height: 420,
                child: Column(children: [
                  TextField(
                    autofocus: true,
                    decoration: InputDecoration(hintText: tr('Rechercher une page ou une action'), prefixIcon: const Icon(Icons.search_outlined), border: const OutlineInputBorder()),
                    onChanged: (v) => setD(() => filtre = v),
                  ),
                  const SizedBox(height: Cp.s1),
                  if (filtrees.isEmpty)
                    Text(tr('Aucun résultat.'), style: Theme.of(dctx).textTheme.bodyMedium)
                  else
                    Flexible(
                      child: ListView(children: [
                        for (final a in filtrees)
                          ListTile(
                            leading: Icon(a.icon, color: Cp.navy),
                            title: Text(a.label),
                            subtitle: Text(a.sub),
                            onTap: () {
                              Navigator.of(dctx).pop();
                              Future.microtask(a.action);
                            },
                          ),
                      ]),
                    ),
                  const SizedBox(height: Cp.s1),
                  Text(tr('Ctrl + K pour ouvrir, Échap pour fermer.'), style: Theme.of(dctx).textTheme.bodySmall),
                ]),
              ),
            ),
          );
        },
      ),
    );
  }

  // Menu Imprimer, ordinateur seulement, Ctrl + P et bouton de
  // la barre d'outils. Il ne fait qu'ouvrir les pages
  // imprimables existantes, avec leurs propres boutons
  // d'impression ou de telechargement. Il ne declenche pas
  // l'impression du navigateur lui-meme, qui reste disponible
  // par le navigateur sur le web.
  Future<void> _ouvrirMenuImpression(BuildContext c) async {
    await showDialog<void>(
      context: c,
      builder: (dctx) => CallbackShortcuts(
        bindings: {SingleActivator(LogicalKeyboardKey.escape): () => Navigator.of(dctx).pop()},
        child: AlertDialog(
          title: Text(tr('Imprimer')),
          content: Column(mainAxisSize: MainAxisSize.min, children: [
            Text(tr('Choisissez un document imprimable. Chaque choix ouvre la page existante, avec ses propres boutons d’impression ou de téléchargement.')),
            ListTile(
              leading: const Icon(Icons.badge_outlined, color: Cp.navy),
              title: Text(tr('Badges d’un camp')),
              subtitle: Text(tr('Badges imprimables, plusieurs par page.')),
              onTap: () {
                Navigator.of(dctx).pop();
                Future.microtask(() => _allerBadges(c));
              },
            ),
            ListTile(
              leading: const Icon(Icons.workspace_premium_outlined, color: Cp.navy),
              title: Text(tr('Attestations')),
              subtitle: Text(tr('Modèle unique à ouvrir et imprimer, une par attestation.')),
              onTap: () {
                Navigator.of(dctx).pop();
                Future.microtask(() => go(c, const AttestationsPage()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.group_outlined, color: Cp.navy),
              title: Text(tr('Cartes de membre')),
              subtitle: Text(tr('Choisir un membre, puis sa carte imprimable.')),
              onTap: () {
                Navigator.of(dctx).pop();
                Future.microtask(() => go(c, const PerimeterMembersPage()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.file_download_outlined, color: Cp.navy),
              title: Text(tr('Exports complets')),
              subtitle: Text(tr('Membres, paiements, présences et inscriptions, en CSV.')),
              onTap: () {
                Navigator.of(dctx).pop();
                Future.microtask(() => go(c, const ExportsPage()));
              },
            ),
          ]),
          actions: [TextButton(onPressed: () => Navigator.of(dctx).pop(), child: Text(tr('Annuler')))],
        ),
      ),
    );
  }

  List<Widget> _espaceContenu(BuildContext c, int i, bool general, List<dynamic> pending, TextTheme t) {
    switch (i) {
      // Carte 57, 6 nov. 2026 : 8 groupes fusionnés en 3.
      // Piloter : tableau de bord, planning, journal. La
      // Finance n'a plus d'espace, elle est la tuile qui
      // ouvre la Comptabilité. Gérer : structure, documents,
      // attestations. Animer :
      // événements, prochain camp, contenus sans documents,
      // actualités. Carte 78 : paramètres sans journal et
      // communication retirés, cartes d'information sans
      // action supprimées.
      case 0:
        return [
          ..._espaceTableauDeBord(c, general),
          ..._lignesGestionPiloter(c),
          ..._ligneJournal(c, general),
        ];
      case 1:
        return [
          ..._espaceStructure(c, general),
          ..._espaceContenus(c, general),
          ..._lignesGestionGerer(c),
        ];
      default:
        return [
          ..._espaceEvenements(c, general),
          ..._lignes([
            NavTile(
              icon: Icons.event_outlined,
              label: tr('Prochain camp'),
              sub: app.camps.isEmpty ? tr('Aucun camp publié.') : app.camps.first.name,
              onTap: () => go(c, const CampsPage()),
            ),
          ]),
          ..._espaceContenus(c, general, avecDocuments: false),
          // Carte 78, 7 nov. 2026 : Actualites programmees,
          // carte d'information sans action, devient une vraie
          // tuile Actualites vers la page Actualites, ou
          // l'administrateur general voit les programmees avec
          // leur date prevue. E-mails n'a pas de tuile ici,
          // retiree sans remplacement.
          ..._lignes([
            NavTile(
              icon: Icons.article_outlined,
              label: tr('Actualités'),
              sub: tr('Les nouvelles de la structure.'),
              onTap: () => go(c, const NewsPage()),
            ),
          ]),
        ];
    }
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      // Restructuration comptabilité, 3 nov. 2026 : la file
      // locale ne garde que les demandes ni confirmées ni
      // refusées. Un refusé ne reste pas dans la demande.
      final pending = app.requests.where((r) => !r.confirmed && !r.refused).toList();

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
      // Carte 57 : une seule colonne, les deux volets de la
      // tranche 3 carte 17 sont retirés, Piloter regroupe
      // déjà le tableau de bord.
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
        // Raccourcis ordinateur, tranche 3 carte 17, enveloppe
        // de la coquille bureau seulement. Ctrl + K ouvre la
        // palette, Ctrl + P ouvre le menu Imprimer, Echap
        // replie la barre laterale quand elle est deployee.
        // Le telephone ne passe jamais par cette branche.
        return Focus(
          autofocus: true,
          child: CallbackShortcuts(
            bindings: {
              SingleActivator(LogicalKeyboardKey.keyK, control: true): () {
                _ouvrirPalette(c, visibles, titres);
              },
              SingleActivator(LogicalKeyboardKey.keyP, control: true): () {
                _ouvrirMenuImpression(c);
              },
              SingleActivator(LogicalKeyboardKey.escape): () {
                if (!_sidebarReduite) _basculerSidebar();
              },
            },
            child: Scaffold(
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
                      style: TextStyle(color: _orGemini, fontSize: 15, fontWeight: FontWeight.w700, letterSpacing: 0.8)),
                  Text(tr('Espace structure'), maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false, style: const TextStyle(color: Colors.white70, fontSize: 14)),
                ]),
              ),
            ]),
            actions: [
              // Raccourcis ordinateur, tranche 3 carte 17 :
              // palette Ctrl + K, impression Ctrl + P.
              IconButton(
                tooltip: tr('Palette de commande (Ctrl + K)'),
                padding: const EdgeInsets.all(14),
                iconSize: 26,
                icon: const Icon(Icons.terminal_outlined, color: Colors.white),
                onPressed: () => _ouvrirPalette(c, visibles, titres),
              ),
              IconButton(
                tooltip: tr('Imprimer (Ctrl + P)'),
                padding: const EdgeInsets.all(14),
                iconSize: 26,
                icon: const Icon(Icons.print_outlined, color: Colors.white),
                onPressed: () => _ouvrirMenuImpression(c),
              ),
              const SearchLoupeAction(),
              Builder(builder: (ctx) {
                return TextButton.icon(
                  style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12), minimumSize: const Size(48, 48)),
                  onPressed: () {
                    verseTts.stop();
                    app.setLang(app.lang == 'fr' ? 'en' : 'fr');
                  },
                  icon: const Icon(Icons.language_outlined, color: _orGemini, size: 20),
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
                          : const CircleAvatar(radius: 20, backgroundColor: _orGemini, child: Icon(Icons.person_outlined, color: Color(0xFF0B1F3A), size: 22)),
                    ),
                  ),
                );
              }),
            ],
          ),
          body: SafeArea(
            child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
              Container(
                width: _sidebarReduite ? 72 : 280,
                decoration: const BoxDecoration(color: Colors.white, border: Border(right: BorderSide(color: Cp.line))),
                child: Column(children: [
                  Expanded(
                    child: ListView(
                      padding: const EdgeInsets.fromLTRB(Cp.s1, Cp.s2, Cp.s1, Cp.s2),
                      children: [
                        // Barre repliable, tranche 3 carte 17 :
                        // bouton chevron en haut, groupes Gemini
                        // en dessous, icones seules quand repliee.
                        Row(children: [
                          if (!_sidebarReduite)
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.fromLTRB(Cp.s1, 0, Cp.s1, Cp.s1),
                                child: Text(tr('Espaces'), style: t.titleMedium?.copyWith(color: Cp.goldDeep)),
                              ),
                            ),
                          IconButton(
                            tooltip: _sidebarReduite ? tr('Déployer la barre latérale') : tr('Réduire la barre latérale'),
                            icon: Icon(_sidebarReduite ? Icons.chevron_right_outlined : Icons.chevron_left_outlined, color: Cp.navy),
                            onPressed: _basculerSidebar,
                          ),
                        ]),
                        for (final groupe in _groupesSidebar())
                          if (groupe.$2.any((id) => visibles.contains(id))) ...[
                            if (!_sidebarReduite)
                              Padding(
                                padding: const EdgeInsets.fromLTRB(Cp.s1, Cp.s1, Cp.s1, Cp.s1),
                                child: Text(groupe.$1, style: t.labelLarge?.copyWith(fontWeight: FontWeight.w800, color: Cp.goldDeep)),
                              ),
                            if (_sidebarReduite) const Divider(height: 16, color: Cp.line),
                            // Carte 51, 6 nov. 2026 : 2 entrees par
                            // groupe, le reste derriere « Tout voir ».
                            // Quand la barre est repliee, icones
                            // seules, la regle ne change rien.
                            for (final id in (_sidebarToutVoir.contains(groupe.$1) || _sidebarReduite
                                ? groupe.$2.where((id) => visibles.contains(id)).toList()
                                : groupe.$2.where((id) => visibles.contains(id)).take(2).toList()))
                              if (visibles.contains(id))
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 4),
                                  child: Material(
                                    color: visibles.indexOf(id) == sel ? _orGemini.withValues(alpha: 0.15) : Colors.transparent,
                                    borderRadius: BorderRadius.circular(16),
                                    child: InkWell(
                                      borderRadius: BorderRadius.circular(16),
                                      onTap: () => setState(() => _espace = visibles.indexOf(id)),
                                      child: Tooltip(
                                        message: titres[id],
                                        child: Padding(
                                          padding: const EdgeInsets.symmetric(horizontal: Cp.s1, vertical: 12),
                                          child: Row(children: [
                                            Icon(_icones[id], color: visibles.indexOf(id) == sel ? Cp.goldDeep : Cp.navy),
                                            if (!_sidebarReduite) ...[
                                              const SizedBox(width: Cp.s1),
                                              Expanded(child: Text(titres[id], style: t.labelLarge?.copyWith(fontWeight: visibles.indexOf(id) == sel ? FontWeight.w800 : FontWeight.w700, color: Cp.navy))),
                                            ],
                                          ]),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                            if (!_sidebarReduite && groupe.$2.where((id) => visibles.contains(id)).length > 2)
                              Padding(
                                padding: const EdgeInsets.only(bottom: 4),
                                child: TextButton(
                                  onPressed: () {
                                    setState(() {
                                      if (_sidebarToutVoir.contains(groupe.$1)) {
                                        _sidebarToutVoir.remove(groupe.$1);
                                      } else {
                                        _sidebarToutVoir.add(groupe.$1);
                                      }
                                    });
                                    _sauvegarderSidebarToutVoir();
                                  },
                                  child: Text(_sidebarToutVoir.contains(groupe.$1) ? tr('Réduire') : tr('Tout voir')),
                                ),
                              ),
                          ],
                      ],
                    ),
                  ),
                  if (_sidebarReduite)
                    Padding(
                      padding: const EdgeInsets.all(Cp.s2),
                      child: IconButton(
                        tooltip: tr('Quitter l’espace structure'),
                        icon: const Icon(Icons.logout_outlined, color: Cp.navy),
                        onPressed: () {
                          app.isAdmin = false;
                          app.isAdminGeneral = false;
                          app.changed();
                          Navigator.of(c).pop();
                        },
                      ),
                    )
                  else
                    Padding(padding: const EdgeInsets.all(Cp.s2), child: quitter()),
                ]),
              ),
              Expanded(
                // Carte 57 : deux volets retirés, Piloter
                // regroupe déjà le tableau de bord, et la
                // Finance vit dans la Comptabilité, pas dans
                // un second volet. Une seule colonne.
                child: SingleChildScrollView(
                        padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          if (!general)
                            Text(tr('Validation des paiements réservée à l’administrateur général.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
                          if (general)
                            Text(isEn ? 'Validation after checking the Wave account.' : 'Validation après contrôle du compte Wave.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
                          const SizedBox(height: 20),
                          _herosStructure(c, general, pending),
                          const SizedBox(height: 24),
                          _titreGroupe(_icones[visibles[sel]], titres[visibles[sel]]),
                          const SizedBox(height: 12),
                          ..._contenuGroupe(visibles[sel], contenus[visibles[sel]], c, general, pending),
                        ]),
                      ),
              ),
            ]),
          ),
        )));
      }
      return basic(tr('Espace structure'), [
        if (!general)
          Text(tr('Validation des paiements réservée à l’administrateur général.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        if (general)
          Text(isEn ? 'Validation after checking the Wave account.' : 'Validation après contrôle du compte Wave.', style: t.bodyMedium?.copyWith(color: Cp.inkMuted, fontSize: 16)),
        const SizedBox(height: 20),
        // Carte 56, 6 nov. 2026 : héros bleu nuit et or avec les
        // chiffres clés, en tête, avant les raccourcis du jour.
        _herosStructure(c, general, pending),
        const SizedBox(height: 24),
        // Carte 51, 6 nov. 2026 : raccourcis du jour et
        // recherche par geste, en haut. Quand une recherche
        // est en cours, seuls ses resultats s'affichent.
        _raccourcisDuJour(c, general, pending),
        const SizedBox(height: 20),
        _champRechercheGeste(),
        const SizedBox(height: 20),
        if (_rechercheGeste.trim().isNotEmpty) ..._resultatsRecherche(c, general, pending),
        if (_rechercheGeste.trim().isEmpty) ...[
        // Carte 68, 6 nov. 2026 : telephone a plat, sans
        // groupe, sans repli, sans Tout voir ni Reduire.
        // Le tableau de bord reste en tete, puis toutes les
        // tuiles. Les textes d'introduction ci-dessus et
        // le bouton Quitter ci-dessous restent hors de tout
        // groupe, donc toujours visibles. Sur ordinateur,
        // la branche bureau ci-dessus garde ses 3 groupes,
        // elle est inchangee.
        // Carte 78, 7 nov. 2026 : les 5 sections d'information
        // sans action sous la liste a plat sont retirees.
        // Inscriptions et Actualites vivent desormais comme
        // vraies tuiles dans _tuilesAPlat, Gestion des
        // administrateurs vit deja dans la tuile
        // Administrateurs, E-mails et Configuration sont
        // retirees sans remplacement. Plus aucune carte ne dit
        // seulement qu'une fonction n'existe pas.
        ..._espaceTableauDeBord(c, general),
        const SizedBox(height: 32),
        ..._tuilesAPlat(c, general),
        ],
        const SizedBox(height: 32),
        quitter(),
      ]);
    });
  }
}

// Cartes Gestion et suivi facon Gemini, 4 nov. 2026 : les
// indicateurs ne sont jamais en dur. Le point d'alerte du
// planning n'apparait que si le serveur a calcule au moins
// un vrai conflit sur une ligne de planning, jamais comme
// decoration. En cas d'erreur de chargement, les tuiles
// restent utilisables, sans indicateur, sans message invente.
// Carte 52, 6 nov. 2026 : deux lignes compactes derriere
// « Tout voir », Attestations et Planning des responsables,
// meme ligne que les autres groupes, sans sous-titre ni
// ombre. Suivi des nouveaux membres et Inventaire du
// materiel ne vivent plus que dans la recherche par geste.
class _GestionSuiviGeminiCartes extends StatefulWidget {
  const _GestionSuiviGeminiCartes({this.mode = 'tout'});

  // Carte 57 : 'tout', 'planning' ou 'attestations', pour
  // partager Gestion et suivi entre Piloter et Gérer.
  final String mode;

  @override
  State<_GestionSuiviGeminiCartes> createState() => _GestionSuiviGeminiCartesState();
}

class _GestionSuiviGeminiCartesState extends State<_GestionSuiviGeminiCartes> {
  bool? _conflitPlanning;

  @override
  void initState() {
    super.initState();
    _chargerIndicateurs();
  }

  Future<void> _chargerIndicateurs() async {
    try {
      final plannings = await api.fetchPlannings();
      if (!mounted) return;
      setState(() {
        _conflitPlanning = plannings.any((p) => _planningConflits(p['conflits']).isNotEmpty);
      });
    } catch (_) {
      // Indicateurs absents, tuiles toujours utilisables.
    }
  }

  // Carte 52 : meme ligne compacte que les autres groupes,
  // 56 px, icone plus libelle, sans sous-titre ni ombre.
  // La description reste en sous-titre de la tuile, non
  // affichee, pour garder l'historique du geste.
  Widget _carteGemini({
    required IconData icone,
    required String titre,
    required String description,
    Widget? indicateur,
    required VoidCallback onTap,
  }) =>
      _ligneCompacte(
        NavTile(icon: icone, label: titre, sub: description, onTap: onTap),
        indicateur: indicateur,
      );

  @override
  Widget build(BuildContext context) {
    final cartes = <Widget>[
      _carteGemini(
        icone: Icons.workspace_premium_outlined,
        titre: tr('Attestations'),
        description: tr('Bénévolat et participation, modèle unique avec le monogramme officiel, délivrées par l’administration seulement.'),
        onTap: () => go(context, const AttestationsPage()),
      ),
      _carteGemini(
        icone: Icons.event_note_outlined,
        titre: tr('Planning des responsables'),
        description: tr('Qui fait quoi, quel jour, avec avertissement en cas de chevauchement, jamais un blocage.'),
        indicateur: _conflitPlanning == true
            ? Container(
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  color: const Color(0xFFF39C12),
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFFF39C12).withValues(alpha: 0.2),
                      blurRadius: 0,
                      spreadRadius: 2,
                    ),
                  ],
                ),
              )
            : null,
        onTap: () => go(context, const PlanningResponsablesPage()),
      ),
    ];
    final visibles = widget.mode == 'planning'
        ? <Widget>[cartes[1]]
        : widget.mode == 'attestations'
            ? <Widget>[cartes[0]]
            : cartes;
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 600),
        child: Column(
          children: [
            for (var i = 0; i < visibles.length; i++) ...[
              if (i > 0) const SizedBox(height: 8),
              visibles[i],
            ],
          ],
        ),
      ),
    );
  }
}

// Activites, 2 nov. 2026 : une seule tuile dans l'espace
// Evenements, deux entrees dans la page de choix. Les corps
// sont ceux des anciennes tuiles Ajouter et Modifier, sans
// changement de comportement.
Future<void> _ajouterActivite(BuildContext c, bool general) async {
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
}

Future<void> _modifierActivite(BuildContext c, bool general) async {
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
}

// Modification d'une activite precise, tranche 2, 4 nov. 2026 :
// meme formulaire et meme sauvegarde que _modifierActivite
// (nom et image, locale seulement, nouvelle publication
// seulement si l'activite n'a jamais ete publiee), sans les
// selecteurs d'etablissement et d'activite, puisque l'activite
// est deja celle de la page ouverte.
Future<void> _modifierActiviteCible(BuildContext c, Etab e, ActivityItem a) async {
  imageFormSheet(c, tr('Modifier l’activité'), [F('a', tr('Activité'), initial: a.title)], tr('Enregistrer'), (v, imagePath) {
    if (imagePath != a.imagePath) {
      a.imagePath = imagePath;
      a.imageUrl = '';
    }
    a.title = v['a']!;
    app.changed();
    if (a.serverId.isEmpty) _publishActivite(c, e, a);
  }, initialImagePath: a.imagePath);
}

// Page Activites conservee, tranche 2, 4 nov. 2026 : elle n'est
// plus ouverte par une tuile de l'Espace structure, ses deux
// actions vivent desormais a leur place, Ajouter dans la page
// Presences, Modifier dans la page de l'activite. La page et
// ses routes ne sont pas supprimees.
class ActivitesPage extends StatelessWidget {
  const ActivitesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final general = app.isAdminGeneral;
    return basic(tr('Activités'), [
      Text(tr('La modification d’une activité est locale seulement : le serveur n’a pas de route de modification d’activité, une nouvelle publication est tentée seulement si l’activité n’a jamais été publiée.')),
      const SizedBox(height: Cp.s2),
      navCard([
        NavTile(
          icon: Icons.playlist_add_check_outlined,
          label: tr('Ajouter une activité'),
          sub: tr('À un établissement existant, avec une image.'),
          onTap: () => _ajouterActivite(context, general),
        ),
        NavTile(
          icon: Icons.edit_outlined,
          label: tr('Modifier une activité'),
          sub: tr('Nom et image d’une activité déjà créée.'),
          onTap: () => _modifierActivite(context, general),
        ),
      ]),
    ]);
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

// Carte 74, 7 nov. 2026 : statut d'une ligne à l'écran de
// relecture, avant publication. Prête veut dire que le serveur
// l'acceptera, doublon qu'elle sera ignorée, jamais écrasée, et
// à corriger qu'elle ne peut pas être publiée telle quelle.
String _statutApercuLabel(String statut) {
  switch (statut) {
    case 'pret':
      return tr('Prêt à importer');
    case 'doublon':
      return tr('Doublon');
    default:
      return tr('À corriger');
  }
}

class _ImportMembresPageState extends State<ImportMembresPage> {
  static const _entetes = ['Nom complet', 'Téléphone', 'Email', 'Établissement', 'Fonction', 'Date de naissance'];
  List<Map<String, dynamic>> _lignes = [];
  String? _fichierNom;
  String? _erreur;
  bool _envoi = false;
  Map<String, dynamic>? _rapport;
  // Carte 74, 7 nov. 2026 : écran de relecture avant publication.
  // _apercu tient les lignes analysées par le serveur, chacune
  // avec son statut (pret, doublon, erreur), son motif et sa case
  // cochée ou non. Seules les lignes prêtes sont cochées par
  // défaut ; un doublon ou une erreur ne se publie jamais tant
  // qu'il n'a pas été corrigé puis revérifié.
  List<Map<String, dynamic>> _apercu = [];
  bool _analyse = false;
  List<Map<String, dynamic>> _etablissements = [];
  // Carte 57, 6 nov. 2026 : ajout d'un seul membre, même
  // écran, même route serveur que l'import, une seule ligne.
  bool _modeUnique = false;
  final _nomCtrl = TextEditingController();
  final _telCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _etabCtrl = TextEditingController();
  final _fonctionCtrl = TextEditingController();
  final _naissanceCtrl = TextEditingController();

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

  @override
  void dispose() {
    _nomCtrl.dispose();
    _telCtrl.dispose();
    _emailCtrl.dispose();
    _etabCtrl.dispose();
    _fonctionCtrl.dispose();
    _naissanceCtrl.dispose();
    super.dispose();
  }

  Future<void> _envoyerUnique() async {
    final nom = _nomCtrl.text.trim();
    if (nom.isEmpty) {
      setState(() => _erreur = tr('Nom complet (obligatoire)'));
      return;
    }
    setState(() {
      _envoi = true;
      _erreur = null;
    });
    try {
      final rapport = await api.importMembres([
        {
          'nom_complet': nom,
          'telephone': _telCtrl.text.trim(),
          'email': _emailCtrl.text.trim(),
          'etablissement': _etabCtrl.text.trim(),
          'fonction': _fonctionCtrl.text.trim(),
          'date_naissance': _naissanceCtrl.text.trim(),
        },
      ]);
      if (mounted) {
        setState(() {
          _rapport = rapport;
          _nomCtrl.clear();
          _telCtrl.clear();
          _emailCtrl.clear();
          _etabCtrl.clear();
          _fonctionCtrl.clear();
          _naissanceCtrl.clear();
        });
        toast(context, tr('Import terminé.'));
      }
    } catch (e) {
      if (mounted) setState(() => _erreur = e.toString());
    }
    if (mounted) setState(() => _envoi = false);
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
      _apercu = [];
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
      // Carte 74 : le fichier n'est jamais publié tel quel, il
      // passe d'abord par l'analyse serveur, qui remplit l'écran
      // de relecture ci-dessous.
      await _analyser();
    } catch (e) {
      if (mounted) setState(() => _erreur = e.toString());
    }
  }

  // Carte 74, 7 nov. 2026 : envoie les lignes au serveur pour la
  // dernière vérification, sans rien créer. L'analyse renvoie le
  // statut de chaque ligne ; seules les lignes prêtes sont
  // cochées. En cas d'échec, rien n'est publié, l'erreur est
  // affichée et la vérification peut être relancée.
  Future<void> _analyser() async {
    if (_lignes.isEmpty) return;
    setState(() {
      _analyse = true;
      _erreur = null;
    });
    try {
      final analyse = await api.analyserMembresImport(_lignes);
      final lignes = (analyse['lignes'] as List? ?? []).whereType<Map<String, dynamic>>().map((m) => {...m, 'choisi': (m['statut'] ?? '') == 'pret'}).toList();
      if (mounted) setState(() => _apercu = lignes);
    } catch (e) {
      if (mounted) setState(() => _erreur = e.toString());
    }
    if (mounted) setState(() => _analyse = false);
  }

  // Carte 74 : après une correction, les lignes corrigées sont
  // renvoyées au serveur pour une nouvelle vérification, au lieu
  // de faire confiance à la correction seule.
  Future<void> _reverifier() async {
    _lignes = _apercu.map((m) => {
          'nom_complet': (m['nom_complet'] ?? '').toString(),
          'telephone': (m['telephone'] ?? '').toString(),
          'email': (m['email'] ?? '').toString(),
          'etablissement': (m['etablissement'] ?? '').toString(),
          'fonction': (m['fonction'] ?? '').toString(),
          'date_naissance': (m['date_naissance'] ?? '').toString(),
        }).toList();
    await _analyser();
  }

  // Carte 74 : corrige une ligne de l'aperçu sur place, sans
  // retoucher le fichier sur l'ordinateur. Les champs reprennent
  // les valeurs analysées par le serveur, la fonction vide veut
  // dire Membre, comme à l'import.
  Future<void> _corrigerLigne(int index) async {
    final m = _apercu[index];
    final nomCtrl = TextEditingController(text: (m['nom_complet'] ?? '').toString());
    final telCtrl = TextEditingController(text: (m['telephone'] ?? '').toString());
    final emailCtrl = TextEditingController(text: (m['email'] ?? '').toString());
    final etabCtrl = TextEditingController(text: (m['etablissement'] ?? '').toString());
    final fonctionCtrl = TextEditingController(text: (m['fonction'] ?? '').toString());
    final naissanceCtrl = TextEditingController(text: (m['date_naissance'] ?? '').toString());
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Corriger la ligne')),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: nomCtrl, decoration: InputDecoration(labelText: tr('Nom complet (obligatoire)'))),
              TextField(controller: telCtrl, decoration: InputDecoration(labelText: tr('Téléphone'))),
              TextField(controller: emailCtrl, decoration: InputDecoration(labelText: tr('Email'))),
              TextField(controller: etabCtrl, decoration: InputDecoration(labelText: tr('Établissement (nom exact, ou vide)'))),
              TextField(controller: fonctionCtrl, decoration: InputDecoration(labelText: tr('Fonction (parmi la liste, ou vide pour Membre)'))),
              TextField(controller: naissanceCtrl, decoration: InputDecoration(labelText: tr('Date de naissance (AAAA-MM-JJ, facultative)'))),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.of(ctx).pop(true), child: Text(tr('Enregistrer'))),
        ],
      ),
    );
    final valeurs = ok == true
        ? {
            'nom_complet': nomCtrl.text.trim(),
            'telephone': telCtrl.text.trim(),
            'email': emailCtrl.text.trim(),
            'etablissement': etabCtrl.text.trim(),
            'fonction': fonctionCtrl.text.trim(),
            'date_naissance': naissanceCtrl.text.trim(),
          }
        : null;
    nomCtrl.dispose();
    telCtrl.dispose();
    emailCtrl.dispose();
    etabCtrl.dispose();
    fonctionCtrl.dispose();
    naissanceCtrl.dispose();
    if (valeurs == null || !mounted) return;
    setState(() {
      _apercu[index] = {...m, ...valeurs};
    });
    await _reverifier();
  }

  // Carte 74, 7 nov. 2026 : publication, dernier geste seulement.
  // Seules les lignes cochées à l'écran de relecture partent, par
  // la route d'import existante, qui revalide chaque ligne côté
  // serveur. Un doublon reste ignoré, jamais écrasé, même si la
  // base a changé entre l'analyse et la publication.
  Future<void> _publier() async {
    final choisies = _apercu
        .where((m) => m['choisi'] == true)
        .map((m) => {
              'nom_complet': (m['nom_complet'] ?? '').toString(),
              'telephone': (m['telephone'] ?? '').toString(),
              'email': (m['email'] ?? '').toString(),
              'etablissement': (m['etablissement'] ?? '').toString(),
              'fonction': (m['fonction'] ?? '').toString(),
              'date_naissance': (m['date_naissance'] ?? '').toString(),
            })
        .toList();
    if (choisies.isEmpty) {
      setState(() => _erreur = tr('Cochez au moins une ligne à importer.'));
      return;
    }
    setState(() {
      _envoi = true;
      _erreur = null;
    });
    try {
      final rapport = await api.importMembres(choisies);
      if (mounted) {
        setState(() {
          _rapport = rapport;
          _lignes = [];
          _apercu = [];
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
    // Carte 74 : compteurs de l'écran de relecture.
    final nbPrets = _apercu.where((m) => (m['statut'] ?? '') == 'pret').length;
    final nbDoublons = _apercu.where((m) => (m['statut'] ?? '') == 'doublon').length;
    final nbErreurs = _apercu.where((m) => (m['statut'] ?? '') == 'erreur').length;
    final nbCoches = _apercu.where((m) => m['choisi'] == true).length;
    return basic(tr('Importer des membres'), [
      Wrap(spacing: 12, runSpacing: 12, children: [
        ChoiceChip(label: Text(tr('Fichier CSV')), selected: !_modeUnique, selectedColor: Cp.gold, onSelected: (_) => setState(() => _modeUnique = false)),
        ChoiceChip(label: Text(tr('Un membre')), selected: _modeUnique, selectedColor: Cp.gold, onSelected: (_) => setState(() => _modeUnique = true)),
      ]),
      const SizedBox(height: Cp.s2),
      if (_modeUnique) ...[
        TextField(controller: _nomCtrl, decoration: InputDecoration(labelText: tr('Nom complet (obligatoire)'))),
        const SizedBox(height: Cp.s1),
        TextField(controller: _telCtrl, decoration: InputDecoration(labelText: tr('Téléphone'))),
        const SizedBox(height: Cp.s1),
        TextField(controller: _emailCtrl, decoration: InputDecoration(labelText: tr('Email'))),
        const SizedBox(height: Cp.s1),
        TextField(controller: _etabCtrl, decoration: InputDecoration(labelText: tr('Établissement (nom exact, ou vide)'))),
        const SizedBox(height: Cp.s1),
        TextField(controller: _fonctionCtrl, decoration: InputDecoration(labelText: tr('Fonction (parmi la liste, ou vide pour Membre)'))),
        const SizedBox(height: Cp.s1),
        TextField(controller: _naissanceCtrl, decoration: InputDecoration(labelText: tr('Date de naissance (AAAA-MM-JJ, facultative)'))),
        const SizedBox(height: Cp.s1),
        FilledButton.icon(onPressed: _envoi ? null : _envoyerUnique, icon: const Icon(Icons.person_add_alt_1_outlined), label: Text(_envoi ? tr('Import en cours…') : tr('Ajouter ce membre')), style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy)),
      ] else ...[
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
      if (_fichierNom != null) Text('${_fichierNom!} : ${_lignes.length} ${tr('lignes lues')}', style: t.bodyMedium),
      if (_analyse) Text(tr('Analyse en cours…'), style: t.bodyMedium),
      if (_lignes.isNotEmpty && _apercu.isEmpty && !_analyse)
        FilledButton.icon(
          onPressed: _analyser,
          icon: const Icon(Icons.visibility_outlined),
          label: Text(tr('Vérifier avant publication')),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
        ),
      // Carte 74, 7 nov. 2026 : écran de relecture avant
      // publication. Rien n'est publié tant que l'administrateur
      // ne touche pas Publier. Chaque ligne montre son statut
      // serveur : prête, doublon ignoré, ou à corriger avec son
      // motif. Une ligne en erreur se corrige sur place, puis
      // elle est revérifiée par le serveur avant de pouvoir être
      // cochée. Seules les lignes cochées sont publiées.
      if (_apercu.isNotEmpty) ...[
        Text(tr('Vérification avant publication'), style: t.titleMedium),
        Text(tr('Rien n’est publié tant que vous ne validez pas.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
        Text(tr('Vérifiez chaque ligne, corrigez ou décochez, puis publiez.'), style: t.bodyMedium),
        Text(isEn
            ? '$nbPrets ready, $nbDoublons duplicates, $nbErreurs to correct'
            : '$nbPrets prêts, $nbDoublons doublons, $nbErreurs à corriger', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
        Row(children: [
          TextButton(onPressed: () => setState(() => _apercu = _apercu.map((m) => {...m, 'choisi': (m['statut'] ?? '') == 'pret'}).toList()), child: Text(tr('Tout sélectionner'))),
          TextButton(onPressed: () => setState(() => _apercu = _apercu.map((m) => {...m, 'choisi': false}).toList()), child: Text(tr('Tout désélectionner'))),
        ]),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: _apercu.length,
          itemBuilder: (c, i) {
            final m = _apercu[i];
            final statut = (m['statut'] ?? '').toString();
            final pret = statut == 'pret';
            final contact = [(m['telephone'] ?? '').toString(), (m['email'] ?? '').toString()].where((s) => s.isNotEmpty).join(' · ');
            final details = [(m['etablissement'] ?? '').toString(), (m['fonction'] ?? '').toString(), (m['date_naissance'] ?? '').toString()].where((s) => s.isNotEmpty).join(' · ');
            return CheckboxListTile(
              value: m['choisi'] == true,
              onChanged: pret ? (v) => setState(() => _apercu[i]['choisi'] = v ?? false) : null,
              title: Text('${m['ligne'] ?? ''} · ${(m['nom_complet'] ?? '').toString()}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (contact.isNotEmpty) Text(contact, style: t.bodyMedium),
                  if (details.isNotEmpty) Text(details, style: t.bodyMedium),
                  Text(
                    pret ? _statutApercuLabel(statut) : '${_statutApercuLabel(statut)} · ${tr((m['motif'] ?? '').toString())}',
                    style: t.bodyMedium?.copyWith(color: pret ? null : erreur, fontWeight: pret ? null : FontWeight.w700),
                  ),
                ],
              ),
              secondary: TextButton(onPressed: () => _corrigerLigne(i), child: Text(tr('Corriger'))),
            );
          },
        ),
        FilledButton.icon(
          onPressed: (_envoi || nbCoches == 0) ? null : _publier,
          icon: const Icon(Icons.upload_outlined),
          label: Text(_envoi ? tr('Import en cours…') : tr('Publier les lignes cochées')),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
        ),
        Text(isEn ? '$nbCoches lines selected for publication' : '$nbCoches lignes sélectionnées pour la publication', style: t.bodyMedium),
      ],
      ],
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

// IMPORT DU BUREAU, 3 nov. 2026 : la structure dépose elle-même
// une liste Word .docx ou PDF texte, voit l'aperçu, puis valide.
// Aucune création sans validation explicite, aucun compte membre,
// aucune carte, aucun paiement, aucune cotisation. Le contact
// n'est jamais public par défaut, un contact vide est accepté,
// un doublon nom et fonction est ignoré, jamais écrasé. Le
// serveur applique les correspondances validées (Présidente des
// chantres vers Responsable chantre, Présidente de
// l'organisation vers Responsable organisation), les autres
// titres sont gardés tels quels, un titre inconnu est gardé tel
// quel et signalé comme à vérifier.
class ImportBureauPage extends StatefulWidget {
  const ImportBureauPage({super.key});

  @override
  State<ImportBureauPage> createState() => _ImportBureauPageState();
}

class _ImportBureauPageState extends State<ImportBureauPage> {
  // Établissement choisi pour tout le lot importé, 3 nov. 2026 :
  // sans ce choix, l'import ISPAM tombait sous Communauté.
  // Vide veut dire Structure, sans établissement, jamais ISPAM
  // par défaut, jamais d'établissement inventé ici.
  String _etablissementId = '';
  String? _fichierNom;
  List<Map<String, dynamic>> _lignes = [];
  List<Map<String, dynamic>> _rejetees = [];
  String? _erreur;
  bool _analyse = false;
  bool _envoi = false;
  Map<String, dynamic>? _rapport;

  Future<void> _choisirFichier() async {
    setState(() {
      _erreur = null;
      _rapport = null;
      _lignes = [];
      _rejetees = [];
    });
    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['docx', 'pdf'],
        withData: true,
      );
      final picked = result?.files.single;
      final bytes = picked?.bytes;
      if (bytes == null) return;
      if (bytes.length > 6 * 1024 * 1024) {
        setState(() => _erreur = tr('Fichier trop volumineux (6 Mo maximum).'));
        return;
      }
      setState(() => _analyse = true);
      final analyse = await api.analyserBureauImport(bytes, picked!.name);
      final lignes = (analyse['lignes'] as List? ?? []).whereType<Map<String, dynamic>>().map((m) => {...m, 'choisi': true}).toList();
      final rejetees = (analyse['rejetees'] as List? ?? []).whereType<Map<String, dynamic>>().toList();
      if (mounted) {
        setState(() {
          _fichierNom = picked.name;
          _lignes = lignes;
          _rejetees = rejetees;
          if (lignes.isEmpty) _erreur = tr('Aucune ligne exploitable dans ce fichier.');
        });
      }
    } catch (e) {
      if (mounted) setState(() => _erreur = e.toString());
    }
    if (mounted) setState(() => _analyse = false);
  }

  Future<void> _envoyer() async {
    final choisies = _lignes.where((m) => m['choisi'] == true).map((m) => {
          'nom': (m['nom'] ?? '').toString(),
          'fonction_brute': (m['fonction_brute'] ?? '').toString(),
          'fonction': (m['fonction'] ?? '').toString(),
          'contact': (m['contact'] ?? '').toString(),
        }).toList();
    if (choisies.isEmpty) {
      setState(() => _erreur = tr('Cochez au moins une ligne à importer.'));
      return;
    }
    setState(() {
      _envoi = true;
      _erreur = null;
    });
    try {
      final rapport = await api.importBureau(choisies, etablissementId: _etablissementId.isEmpty ? null : _etablissementId);
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
      [_csvChamp(tr('Ligne')), _csvChamp(tr('Nom')), _csvChamp(tr('Fonction')), _csvChamp(tr('Statut')), _csvChamp(tr('Motif'))].join(';'),
    ];
    for (final e in (r['lignes'] as List? ?? [])) {
      final m = e as Map<String, dynamic>;
      lignes.add([
        _csvChamp((m['ligne'] ?? '').toString()),
        _csvChamp((m['nom'] ?? '').toString()),
        _csvChamp((m['fonction'] ?? '').toString()),
        _csvChamp(_statutImportLabel((m['statut'] ?? '').toString())),
        _csvChamp(tr((m['motif'] ?? '').toString())),
      ].join(';'));
    }
    final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(lignes.join('\n'))];
    await downloadBytesFile('rapport-import-bureau.csv', bytes, 'text/csv');
    if (mounted) toast(context, tr('Rapport téléchargé.'));
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final erreur = Theme.of(context).colorScheme.error;
    final rapport = _rapport;
    final lignesRapport = rapport == null ? <Map<String, dynamic>>[] : (rapport['lignes'] as List? ?? []).whereType<Map<String, dynamic>>().toList();
    return basic(tr('Importer le Bureau'), [
      Text(tr('Déposez une liste Word .docx avec un tableau, ou un PDF texte, 6 Mo maximum, 500 lignes maximum.'), style: t.bodyMedium),
      Text(tr('Colonnes attendues : N°, Nom et prénom, Fonction, Contact. Le contact peut être vide.'), style: t.bodyMedium),
      Text(tr('Aucun compte membre, aucune carte, aucun paiement n’est créé par cet import.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
      Text(tr('Le contact n’est jamais public par défaut, même s’il figure dans le fichier.'), style: t.bodyMedium),
      Text(tr('Un titre inconnu est gardé tel quel et signalé comme à vérifier, jamais remplacé.'), style: t.bodyMedium),
      Text(tr('Un PDF dont le texte n’est pas extractible sera refusé : utilisez alors le fichier Word.'), style: t.bodyMedium),
      Text(tr('Choisissez un établissement pour ce lot.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
      DropdownButtonFormField<String>(
        value: _etablissementId,
        decoration: InputDecoration(labelText: tr('Établissement')),
        items: [
          DropdownMenuItem(value: '', child: Text(tr('Structure'))),
          for (final e in app.etabs.where((e) => e.id.isNotEmpty)) DropdownMenuItem(value: e.id, child: Text(etabDisplayName(e.name))),
        ],
        onChanged: (v) => setState(() => _etablissementId = v ?? ''),
      ),
      if (_lignes.isNotEmpty)
        Text(
          _etablissementId.isEmpty
              ? tr('Établissement du lot : Structure')
              : '${tr('Établissement du lot : ')}${etabDisplayName(app.etabs.firstWhere((e) => e.id == _etablissementId, orElse: () => Etab('')).name)}',
          style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700),
        ),
      FilledButton.icon(
        onPressed: _analyse ? null : _choisirFichier,
        icon: const Icon(Icons.folder_open_outlined),
        label: Text(_analyse ? tr('Analyse en cours…') : tr('Choisir un fichier Word ou PDF')),
      ),
      if (_fichierNom != null) Text('${_fichierNom!} : ${_lignes.length} ${tr('lignes à vérifier')}', style: t.bodyMedium),
      if (_lignes.isNotEmpty) ...[
        Row(children: [
          TextButton(onPressed: () => setState(() => _lignes = _lignes.map((m) => {...m, 'choisi': true}).toList()), child: Text(tr('Tout sélectionner'))),
          TextButton(onPressed: () => setState(() => _lignes = _lignes.map((m) => {...m, 'choisi': false}).toList()), child: Text(tr('Tout désélectionner'))),
        ]),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: _lignes.length,
          itemBuilder: (c, i) {
            final m = _lignes[i];
            final brute = (m['fonction_brute'] ?? '').toString();
            final fonction = (m['fonction'] ?? '').toString();
            final contact = (m['contact'] ?? '').toString();
            return CheckboxListTile(
              value: m['choisi'] == true,
              onChanged: (v) => setState(() => _lignes[i]['choisi'] = v ?? false),
              title: Text((m['nom'] ?? '').toString(), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
              subtitle: Text(
                '${brute != fonction ? '$brute → ' : ''}$fonction · ${contact.isEmpty ? tr('Aucun contact') : tr('Contact présent')}${m['a_verifier'] == true ? ' · ${tr('À vérifier')}' : ''}',
                style: t.bodyMedium,
              ),
            );
          },
        ),
        FilledButton.icon(
          onPressed: _envoi ? null : _envoyer,
          icon: const Icon(Icons.upload_outlined),
          label: Text(_envoi ? tr('Import en cours…') : tr('Importer les lignes cochées')),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
        ),
      ],
      if (_rejetees.isNotEmpty) ...[
        Text(tr('Lignes rejetées à l’analyse :'), style: t.titleMedium),
        for (final m in _rejetees)
          ListTile(
            title: Text('${m['ligne'] ?? ''} · ${(m['nom'] ?? '').toString()}', style: t.bodyMedium),
            subtitle: Text(tr((m['motif'] ?? '').toString()), style: t.bodyMedium),
          ),
      ],
      if (_erreur != null) Text(_erreur!, style: t.bodyMedium?.copyWith(color: erreur)),
      if (rapport != null) ...[
        Text(tr('Import terminé.'), style: t.titleMedium),
        Text(isEn
            ? '${rapport['importes'] ?? 0} imported, ${rapport['ignores'] ?? 0} skipped, ${rapport['rejetes'] ?? 0} rejected'
            : '${rapport['importes'] ?? 0} importés, ${rapport['ignores'] ?? 0} ignorés, ${rapport['rejetes'] ?? 0} rejetés', style: t.bodyMedium),
        FilledButton.icon(onPressed: _telechargerRapport, icon: const Icon(Icons.file_download_outlined), label: Text(tr('Télécharger le rapport (CSV)'))),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: lignesRapport.length,
          itemBuilder: (c, i) {
            final m = lignesRapport[i];
            final statut = (m['statut'] ?? '').toString();
            return ListTile(
              title: Text('${m['ligne'] ?? ''} · ${m['nom'] ?? ''} · ${m['fonction'] ?? ''}', style: t.bodyMedium),
              subtitle: Text('${_statutImportLabel(statut)}${statut == 'ignore' || statut == 'rejete' ? ' · ${tr((m['motif'] ?? '').toString())}' : ''}', style: t.bodyMedium),
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
          title: Text(tr('Tableau de bord ordinateur')),
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
                        Center(child: Padding(padding: const EdgeInsets.all(Cp.s2), child: Column(children: [const UxShimmerList(itemCount: 3), const SizedBox(height: Cp.s1), Text(tr('Chargement du tableau de bord…'), style: t.bodyMedium)])))
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
        const Center(child: UxShimmerList())
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
  const AdminTransactionHistoryPage({super.key, this.matricule, this.embedded = false});
  final String? matricule;
  // Mode embarqué dans la Comptabilité unique : pas de page,
  // juste le contenu, la page d'origine reste joignable sinon.
  final bool embedded;

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

  // Filtres en déroulants fermés, carte 84 : les aides
  // _choix et _ligneFiltres, rangées de puces, sont retirées.

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
      final note = EmptyNote(icon: Icons.smartphone_outlined, text: tr('Disponible sur téléphone seulement.'));
      if (widget.embedded) return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [note]);
      return basic(tr('Historique des transactions'), [note]);
    }
    if (!app.isAdmin) {
      final note = EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.'));
      if (widget.embedded) return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [note]);
      return basic(tr('Historique des transactions'), [note]);
    }
    final corps = <Widget>[
      if (_matricule != null)
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: Row(children: [
            Expanded(child: Text('${tr('Membre')} : $_matricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
            TextButton.icon(onPressed: () { setState(() => _matricule = null); _load(); }, icon: const Icon(Icons.close_outlined), label: Text(tr('Effacer'))),
          ]),
        ),
      // Filtres en déroulants fermés, carte 84, 7 nov. 2026 :
      // quatre rangées de puces chargeaient l'écran, le choix
      // reste visible, le menu s'ouvre au toucher. Mêmes
      // valeurs, même ordre, même rechargement au changement.
      DropdownButtonFormField<String>(
        value: _type,
        isExpanded: true,
        decoration: InputDecoration(labelText: tr('Type'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem(value: 'tous', child: Text(tr('Tout'))),
          DropdownMenuItem(value: 'don', child: Text(tr('Don'))),
          DropdownMenuItem(value: 'cotisation', child: Text(tr('Cotisation'))),
          DropdownMenuItem(value: 'carte', child: Text(tr('Carte'))),
          DropdownMenuItem(value: 'achat', child: Text(tr('Achat'))),
          DropdownMenuItem(value: 'camp', child: Text(tr('Versement du camp'))),
        ],
        onChanged: (v) { setState(() => _type = v ?? 'tous'); _load(); },
      ),
      const SizedBox(height: Cp.s1),
      DropdownButtonFormField<String>(
        value: _statut,
        isExpanded: true,
        decoration: InputDecoration(labelText: tr('Statut'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem(value: 'tous', child: Text(tr('Tout'))),
          DropdownMenuItem(value: 'en_attente', child: Text(tr('En attente'))),
          DropdownMenuItem(value: 'confirme', child: Text(tr('Validé'))),
          DropdownMenuItem(value: 'refuse', child: Text(tr('Refusé'))),
          DropdownMenuItem(value: 'annule', child: Text(tr('Annulé'))),
        ],
        onChanged: (v) { setState(() => _statut = v ?? 'tous'); _load(); },
      ),
      const SizedBox(height: Cp.s1),
      DropdownButtonFormField<String>(
        value: _periode,
        isExpanded: true,
        decoration: InputDecoration(labelText: tr('Période'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem(value: 'tout', child: Text(tr('Tout'))),
          DropdownMenuItem(value: '30j', child: Text(tr('30 derniers jours'))),
          DropdownMenuItem(value: 'mois', child: Text(tr('Ce mois'))),
        ],
        onChanged: (v) { setState(() => _periode = v ?? 'tout'); _load(); },
      ),
      const SizedBox(height: Cp.s1),
      if (_general && _etablissements.isNotEmpty)
        DropdownButtonFormField<String?>(
          value: _etablissementId,
          isExpanded: true,
          decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les établissements'))),
            for (final e in _etablissements)
              DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) { setState(() => _etablissementId = v); _load(); },
        ),
      const SizedBox(height: Cp.s1),
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
        const Center(child: UxShimmerList())
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
    ];
    if (widget.embedded) return Column(crossAxisAlignment: CrossAxisAlignment.start, children: corps);
    return basic(tr('Historique des transactions'), corps, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
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
  const ChiffresPage({super.key, this.embedded = false});
  // Mode embarqué dans la vue d'ensemble de la Comptabilité.
  final bool embedded;

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
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(children: [
        Icon(icone, color: Cp.goldDeep, size: 20),
        const SizedBox(width: 12),
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
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.line)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(fcfa(_n(_jour, 'total_confirme')), style: t.displaySmall?.copyWith(fontWeight: FontWeight.w900, color: Cp.navy)),
          const SizedBox(height: 12),
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

  // Graphique en barres fl_chart, 4 nov. 2026 : mêmes 7 jours et
  // mêmes totaux confirmés du serveur que les anciennes barres
  // dessinées à la main, seuls les confirmés comptent, jamais un
  // total inventé. L'ancien dessin manuel est remplacé, les
  // chiffres affichés ne changent pas.
  Widget _barres() {
    final t = Theme.of(context).textTheme;
    var maxTotal = 0;
    for (final j in _jours) {
      final v = j['total'] as int;
      if (v > maxTotal) maxTotal = v;
    }
    final joursSemaine = isEn ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.line)),
      child: Column(children: [
        UxBarChart(
          values: [
            for (final j in _jours)
              UxBarValue('${joursSemaine[((j['date'] as DateTime).weekday - 1)]} ${(j['date'] as DateTime).day}', j['total'] as int),
          ],
        ),
        if (maxTotal == 0)
          Padding(
            padding: const EdgeInsets.only(top: Cp.s1),
            child: Text(tr('Aucun encaissement sur les 7 derniers jours.'), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
          ),
      ]),
    );
  }

  // Répartition par statut, 4 nov. 2026 : confirmé, en attente,
  // refusé, depuis les mêmes totaux serveur que la carte totale.
  // C'est une répartition, pas un total : en attente et refusé
  // restent exclus du total encaissé, comme avant.
  Widget _repartitionStatut() {
    return UxSoftCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          UxPieChart(values: [
            UxPieValue(tr('Confirmé'), _n(_periode, 'nombre_confirme'), _n(_periode, 'total_confirme')),
            UxPieValue(tr('En attente de confirmation'), _n(_periode, 'nombre_en_attente'), _n(_periode, 'total_en_attente')),
            UxPieValue(tr('Refusé'), _n(_periode, 'nombre_refuse'), _n(_periode, 'total_refuse')),
          ]),
          const SizedBox(height: Cp.s1),
          Text(
            isEn ? 'Pending and refused amounts are not counted in the collected total.' : 'Les montants en attente et refusés ne sont pas comptés dans le total encaissé.',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Cp.inkMuted),
          ),
        ],
      ),
    );
  }

  // Ventilation par type, 4 nov. 2026 : camembert fl_chart en
  // plus des lignes existantes, mêmes totaux confirmés du serveur
  // par type, seuls les confirmés comptent. Les lignes chiffrées
  // d'avant sont gardées telles quelles sous le graphique.
  Widget _ventilationType() {
    return Container(
      padding: const EdgeInsets.all(Cp.s2),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: Column(children: [
        UxPieChart(values: [
          for (final type in _types)
            UxPieValue(typePaiementLabel(type), _n(_typesPeriode[type] ?? {}, 'nombre_confirme'), _n(_typesPeriode[type] ?? {}, 'total_confirme')),
        ]),
        const SizedBox(height: Cp.s2),
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
      final note = EmptyNote(icon: Icons.smartphone_outlined, text: tr('Disponible sur téléphone seulement.'));
      if (widget.embedded) return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [note]);
      return basic(tr('Chiffres'), [note]);
    }
    if (!app.isAdmin) {
      final note = EmptyNote(icon: Icons.shield_outlined, text: tr('Accès réservé aux administrateurs de la structure.'));
      if (widget.embedded) return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [note]);
      return basic(tr('Chiffres'), [note]);
    }
    final corps = <Widget>[
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
        const Center(child: UxShimmerList())
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
            UxFade(child: _carteTotal()),
            const SizedBox(height: Cp.s2),
            UxFade(child: _carteEnAttente()),
            const SizedBox(height: Cp.s2),
            _titre(isEn ? 'By status' : 'Par statut'),
            const SizedBox(height: Cp.s1),
            UxFade(child: _repartitionStatut()),
            const SizedBox(height: Cp.s2),
            _titre(tr('Résumé du jour')),
            const SizedBox(height: Cp.s1),
            UxFade(child: _resumeJour()),
            const SizedBox(height: Cp.s2),
            _titre(tr('Les 7 derniers jours')),
            const SizedBox(height: Cp.s1),
            UxFade(child: _barres()),
            const SizedBox(height: Cp.s2),
            _titre(tr('Par type')),
            const SizedBox(height: Cp.s1),
            UxFade(child: _ventilationType()),
            if (_general && _etabsPeriode.isNotEmpty) ...[
              const SizedBox(height: Cp.s2),
              _titre(tr('Par établissement')),
              const SizedBox(height: Cp.s1),
              _ventilationEtablissements(),
            ],
          ],
        ),
    ];
    if (widget.embedded) return Column(crossAxisAlignment: CrossAxisAlignment.start, children: corps);
    return basic(tr('Chiffres'), corps, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
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
          ? const Center(child: UxShimmerList())
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
          ? const Center(child: UxShimmerList())
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
          ? const Center(child: UxShimmerList())
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

/// File de validation locale, carte 57, 6 nov. 2026 : les
/// demandes créées sur cet appareil, ni confirmées ni
/// refusées. Mêmes dialogues et mêmes actions que dans
/// l'ancien espace Finances, déplacés ici, dans la
/// Comptabilité, seule entrée finance.
class _ValidationLocaleSection extends StatelessWidget {
  const _ValidationLocaleSection();

  String _libelle(dynamic r) => r.kind == 'don'
      ? 'Don'
      : r.kind == 'carte'
          ? tr('Carte')
          : r.kind == 'cotisation'
              ? 'Cotisation'
              : r.kind == 'camp'
                  ? campRequestLabel(r)
                  : 'Achat';

  // Refus d'un paiement local, dialogue repris tel quel de
  // la liste téléphone, pour que les deux présentations
  // partagent exactement le même texte et le même appel.
  Future<void> _refuser(BuildContext c, dynamic r) async {
    final ok = await showDialog<bool>(
      context: c,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Refuser ce paiement ?')),
        content: Text(tr('Ce paiement refusé disparaît de la file, il ne compte jamais dans les totaux, et le membre est invité à refaire sa demande.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Refuser'))),
        ],
      ),
    );
    if (ok == true) app.refuse(r);
  }

  // Validation d'un paiement local, dialogue repris tel quel
  // de la liste téléphone : validation seulement après
  // contrôle du compte Wave de la structure, jamais
  // automatique.
  Future<void> _valider(BuildContext c, dynamic r) async {
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
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final pending = app.requests.where((r) => !r.confirmed && !r.refused).toList();
      if (pending.isEmpty) {
        return Text(tr('Aucune demande en attente.'), style: t.bodyMedium);
      }
      if (Rx.isDesktop(c)) {
        return SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: DataTable(
            columns: [
              DataColumn(label: Text(tr('Type'))),
              DataColumn(label: Text(tr('Membre'))),
              DataColumn(label: Text(tr('Montant'))),
              DataColumn(label: Text(tr('Moyen'))),
              DataColumn(label: Text(tr('Référence'))),
              DataColumn(label: Text(tr('Date'))),
              DataColumn(label: Text(tr('Actions'))),
            ],
            rows: [
              for (final r in pending)
                DataRow(cells: [
                  DataCell(Text(_libelle(r))),
                  DataCell(Text(r.memberName)),
                  DataCell(Text(fcfa(r.amount))),
                  DataCell(Text(r.method)),
                  DataCell(Text(r.ref)),
                  DataCell(Text(dateFr(r.date))),
                  DataCell(Row(mainAxisSize: MainAxisSize.min, children: [
                    IconButton(tooltip: tr('Vérifier le reçu'), icon: const Icon(Icons.verified_outlined), onPressed: () => go(c, VerifyPaymentPage(request: r))),
                    TextButton(onPressed: () => _refuser(c, r), child: Text(tr('Refuser'))),
                    const SizedBox(width: 4),
                    FilledButton(onPressed: () => _valider(c, r), child: Text(tr('Valider'))),
                  ])),
                ]),
            ],
          ),
        );
      }
      return Card(
        child: Column(children: [
          for (final r in pending)
            ListTile(
              title: Text('${_libelle(r)} · ${fcfa(r.amount)}', style: t.labelLarge),
              subtitle: Text('${r.memberName} · ${r.method} · ${r.ref} · ${dateFr(r.date)}', style: t.bodyMedium),
              trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                IconButton(
                  tooltip: tr('Vérifier le reçu'),
                  icon: const Icon(Icons.verified_outlined),
                  onPressed: () => go(c, VerifyPaymentPage(request: r)),
                ),
                TextButton(
                  onPressed: () => _refuser(c, r),
                  child: Text(tr('Refuser')),
                ),
                const SizedBox(width: 4),
                FilledButton(
                  onPressed: () => _valider(c, r),
                  child: Text(tr('Valider')),
                ),
              ]),
            ),
        ]),
      );
    });
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
  // Restructuration comptabilité, 3 nov. 2026 : la Structure ne
  // montre que les paiements en attente de validation. Validé,
  // le paiement part dans la Comptabilité ; refusé, il part
  // dans l'historique des refus, jamais dans les totaux. Aucun
  // filtre Confirmés, Refusés ou Tous ici, pour ne plus faire
  // une page kilométrique.
  static const String _filter = 'en_attente';
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
      final list = await api.fetchAdminPayments(statut: _filter);
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
      toast(context, tr('Paiement refusé. Le membre est invité à refaire sa demande.'));
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

  // File serveur en tableau, ordinateur seulement, tranche 3
  // carte 17, 4 nov. 2026. Mêmes lignes, mêmes actions que la
  // liste téléphone, validation manuelle après contrôle du
  // paiement reçu, jamais automatique sur le montant seul.
  Widget _tableauServeur(BuildContext context, TextTheme t) => SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          columns: [
            DataColumn(label: Text(tr('Type'))),
            DataColumn(label: Text(tr('Membre'))),
            DataColumn(label: Text(tr('Montant'))),
            DataColumn(label: Text(tr('Référence'))),
            DataColumn(label: Text(tr('Moyen'))),
            DataColumn(label: Text(tr('Date'))),
            DataColumn(label: Text(tr('Actions'))),
          ],
          rows: [
            for (var i = 0; i < _payments.length; i++)
              DataRow(cells: [
                DataCell(Text('${_typeLabel((_payments[i]['type'] ?? '').toString())}${_suffixCampAdmin(_payments[i])}')),
                DataCell(Text(_nomPaiementAffiche(_payments[i]))),
                DataCell(Text(fcfa((_payments[i]['montant_fcfa'] as num?)?.toInt() ?? 0))),
                DataCell(Text((_payments[i]['reference'] ?? '').toString())),
                DataCell(Text('${suffixMoyen((_payments[i]['moyen'] ?? '').toString()).replaceFirst(' · ', '')}${((_payments[i]['wave_transaction_id'] ?? '').toString().isNotEmpty) ? ' · Wave ${_payments[i]['wave_transaction_id']}' : ''}')),
                DataCell(Text(dateFr(DateTime.tryParse((_payments[i]['cree_le'] ?? '').toString()) ?? DateTime.now()))),
                DataCell(Row(mainAxisSize: MainAxisSize.min, children: [
                  if ((_payments[i]['type'] ?? '').toString() == 'achat') IconButton(tooltip: tr('Livres achetés'), icon: const Icon(Icons.auto_stories_outlined), onPressed: () => _showBooks(_payments[i])),
                  TextButton(onPressed: () => _refuse(_payments[i]), child: Text(tr('Refuser'))),
                  const SizedBox(width: 4),
                  FilledButton(onPressed: () => _validate(_payments[i]), child: Text(tr('Valider'))),
                ])),
              ]),
          ],
        ),
      );

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      heading(context, tr('Paiements en attente')),
      Text(tr('Validez seulement après contrôle du paiement reçu.'), style: t.bodyMedium),
      Text(tr('Validé → Comptabilité. Refusé → Refusés, jamais dans les totaux.'), style: t.bodyMedium),
      if (_lastRefresh != null)
        Text(
          tr('Actualisé toutes les 30 s.'),
          style: t.bodyMedium,
        ),
      const SizedBox(height: Cp.s1),
      Align(
        alignment: Alignment.centerRight,
        child: IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load),
      ),
      const SizedBox(height: Cp.s1),
      if (_loading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
      else if (_error != null)
        Text(_error!, style: t.bodyMedium)
      else if (_payments.isEmpty)
        Text(tr('Aucun paiement dans cette catégorie pour le moment.'), style: t.bodyMedium)
      else if (Rx.isDesktop(context))
        _tableauServeur(context, t)
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


// Historique des refus, restructuration comptabilité, 3 nov.
// 2026 : les refusés ne figurent plus dans la demande, ni
// dans la file de validation, ni dans les totaux comptables.
// Ils restent ici, en lecture seule, et dans le journal
// d'audit, avec le membre invité à refaire sa demande côté
// membre. Périmètre serveur inchangé : un administrateur
// d'établissement ne voit que son établissement.
class RefusAdminPage extends StatefulWidget {
  const RefusAdminPage({super.key, this.embedded = false});
  // Mode embarqué dans la Comptabilité unique.
  final bool embedded;
  @override
  State<RefusAdminPage> createState() => _RefusAdminPageState();
}

class _RefusAdminPageState extends State<RefusAdminPage> {
  List<Map<String, dynamic>> _rows = [];
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
      final list = await api.fetchAdminPayments(statut: 'refuse');
      if (!mounted) return;
      // Historique des refus, 72 heures, 3 nov. 2026, corrigé
      // le même soir : un refus disparaît de cette liste après
      // 72 heures, et aussi du journal d'audit en affichage,
      // jamais dans les totaux, sans suppression physique ici.
      // Sans date de refus, la ligne reste visible, car son âge
      // ne peut pas être prouvé, jamais inventé.
      final now = DateTime.now();
      final rows = list.where((r) {
        final d = DateTime.tryParse((r['refuse_le'] ?? '').toString());
        return d == null || now.difference(d).inHours < 72;
      }).toList();
      setState(() {
        _rows = rows;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _rows = [];
        _loading = false;
        _error = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final corps = <Widget>[
      Text(tr('Hors totaux. Le membre est invité à refaire sa demande. Les refus ne restent visibles que 72 heures.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
      else if (_error != null)
        Text(_error!, style: t.bodyMedium)
      else if (_rows.isEmpty)
        Text(tr('Aucun paiement refusé.'), style: t.bodyMedium)
      else
        for (final r in _rows)
          Card(
            child: ListTile(
              title: Text('${_typeLabelSimple((r['type'] ?? '').toString())} · ${fcfa((r['montant_fcfa'] as num?)?.toInt() ?? 0)}', style: t.labelLarge),
              subtitle: Text('${(r['nom_complet'] ?? '').toString()} · ${(r['reference'] ?? '').toString()} · ${dateFr(DateTime.tryParse((r['cree_le'] ?? '').toString()) ?? DateTime.now())}', style: t.bodyMedium),
              trailing: Text(tr('Refusé'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: const Color(0xFFB42318))),
            ),
          ),
    ];
    if (widget.embedded) return Column(crossAxisAlignment: CrossAxisAlignment.start, children: corps);
    return basic(tr('Refusés'), corps, actions: [IconButton(tooltip: tr('Actualiser'), icon: const Icon(Icons.refresh_outlined), onPressed: _load)]);
  }
}

String _typeLabelSimple(String type) {
  switch (type) {
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

// ───────────────────────── Rapports journaliers d'activité, 2 nov. 2026,
// tranche 1, carte blanche d'Axel ─────────────────────────
// Un seul formulaire rempli sur place par le secrétaire : activité
// liée ou libre, orateur, thème, participants, offrande, dépenses,
// observations, et une section incident séparée, réservée à
// l'administration. La liste se filtre par mois et par établissement,
// affiche les totaux du mois pour la trésorerie, et s'exporte en CSV.
// Règles : Espace structure seulement, jamais une tuile membre dans
// Plus ; périmètre contrôlé côté serveur ; validation réservée à
// l'administrateur général ; après validation, modification toujours
// possible par un administrateur, journalisée, mais jamais de
// suppression. L'export CSV ne reprend de l'incident que son type,
// jamais sa description ni les personnes concernées. Aucun PDF :
// l'application ne génère pas de PDF côté client, seul le serveur
// produit des PDF pour les factures, donc CSV seulement ici.
const List<String> _rapportMoisFr = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const List<String> _rapportMoisEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

String _rapportMoisLabel(DateTime m) => isEn ? '${_rapportMoisEn[m.month - 1]} ${m.year}' : '${_rapportMoisFr[m.month - 1]} ${m.year}';

String _rapportMoisParam(DateTime m) => '${m.year}-${m.month.toString().padLeft(2, '0')}';

String _rapportDateAffichage(String iso) {
  final p = iso.split('-');
  if (p.length != 3) return iso;
  return '${p[2]}/${p[1]}/${p[0]}';
}

int _rapportMontant(dynamic v) => (v as num?)?.toInt() ?? 0;

int _rapportDepensesTotal(dynamic depenses) {
  var total = 0;
  for (final d in (depenses as List?) ?? []) {
    if (d is Map) total += _rapportMontant(d['montant']);
  }
  return total;
}

String _rapportMoyenLabel(String? moyen) {
  switch (moyen) {
    case 'especes':
      return tr('Espèces');
    case 'wave':
      return 'Wave';
    case 'orange':
      return 'Orange';
    default:
      return tr('Non précisé');
  }
}

Widget _rapportStatutChip(bool valide) {
  final bg = valide ? const Color(0xFFE6F4EA) : const Color(0xFFFFF3E0);
  final fg = valide ? const Color(0xFF137333) : const Color(0xFF8A6A12);
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(999)),
    child: Text(valide ? tr('Validé') : tr('Brouillon'), style: TextStyle(color: fg, fontWeight: FontWeight.w700, fontSize: 13)),
  );
}

class RapportsActivitePage extends StatefulWidget {
  const RapportsActivitePage({super.key});
  @override
  State<RapportsActivitePage> createState() => _RapportsActivitePageState();
}

class _RapportsActivitePageState extends State<RapportsActivitePage> {
  DateTime _mois = DateTime(DateTime.now().year, DateTime.now().month);
  String? _etabId;
  List<Map<String, dynamic>> _etabs = [];
  List<Map<String, dynamic>> _rapports = [];
  bool _loading = true;
  String? _error;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final rapports = await api.fetchRapportsActivite(mois: _rapportMoisParam(_mois), etablissementId: _etabId);
      List<Map<String, dynamic>> etabs = _etabs;
      if (_general && etabs.isEmpty) etabs = await api.fetchEtablissements();
      if (!mounted) return;
      setState(() {
        _rapports = rapports;
        _etabs = etabs;
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

  void _changerMois(int decalage) {
    setState(() => _mois = DateTime(_mois.year, _mois.month + decalage));
    _charger();
  }

  Future<void> _exporterCsv() async {
    if (_rapports.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final lignes = <String>[
      [tr('Date'), tr('Activité'), tr('Lieu'), tr('Établissement'), tr('Orateur'), tr('Thème'), tr('Participants'), tr('Offrande (FCFA)'), tr('Moyen'), tr('Compté par'), tr('Dépenses (FCFA)'), tr('Net (FCFA)'), tr('Statut'), tr('Incident')].map(_csvChamp).join(';')
    ];
    for (final r in _rapports) {
      final offrande = _rapportMontant(r['offrande_montant']);
      final depenses = _rapportDepensesTotal(r['depenses']);
      lignes.add([
        _csvChamp(_rapportDateAffichage((r['date_rapport'] ?? '').toString().split('T').first)),
        _csvChamp((r['activite_nom'] ?? '').toString()),
        _csvChamp((r['lieu'] ?? '').toString()),
        _csvChamp((r['etablissement'] ?? '').toString()),
        _csvChamp((r['orateur'] ?? '').toString()),
        _csvChamp((r['theme'] ?? '').toString()),
        _csvChamp(r['nombre_participants'] == null ? '' : '${r['nombre_participants']}'),
        _csvChamp('$offrande'),
        _csvChamp(_rapportMoyenLabel((r['offrande_moyen'] ?? '').toString().isEmpty ? null : (r['offrande_moyen'] ?? '').toString())),
        _csvChamp((r['offrande_compte_par'] ?? '').toString()),
        _csvChamp('$depenses'),
        _csvChamp('${offrande - depenses}'),
        _csvChamp((r['statut'] ?? '').toString() == 'valide' ? tr('Validé') : tr('Brouillon')),
        _csvChamp((r['incident_type'] ?? '').toString()),
      ].join(';'));
    }
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(lignes.join('\n'))];
      await downloadBytesFile('rapports-activite-${_rapportMoisParam(_mois)}.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Rapports exportés.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    var totalOffrandes = 0;
    var totalDepenses = 0;
    for (final r in _rapports) {
      totalOffrandes += _rapportMontant(r['offrande_montant']);
      totalDepenses += _rapportDepensesTotal(r['depenses']);
    }
    return basic(tr('Rapports journaliers'), [
      Row(children: [
        IconButton(tooltip: tr('Mois précédent'), icon: const Icon(Icons.chevron_left_outlined), onPressed: () => _changerMois(-1)),
        Expanded(child: Text(_rapportMoisLabel(_mois), textAlign: TextAlign.center, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
        IconButton(tooltip: tr('Mois suivant'), icon: const Icon(Icons.chevron_right_outlined), onPressed: () => _changerMois(1)),
      ]),
      if (_general) ...[
        const SizedBox(height: Cp.s1),
        DropdownButtonFormField<String?>(
          value: _etabId,
          decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les établissements'))),
            for (final e in _etabs) DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) {
            setState(() => _etabId = v);
            _charger();
          },
        ),
      ] else ...[
        const SizedBox(height: Cp.s1),
        Text(tr('Seuls les rapports de votre établissement sont affichés.'), style: t.bodyMedium),
      ],
      const SizedBox(height: Cp.s2),
      Container(
        padding: const EdgeInsets.all(Cp.s2),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(tr('Totaux du mois, pour la trésorerie'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: Cp.s1),
          Text('${tr('Offrandes')} : ${fcfa(totalOffrandes)}', style: t.bodyMedium),
          Text('${tr('Dépenses')} : ${fcfa(totalDepenses)}', style: t.bodyMedium),
          Text('${tr('Net')} : ${fcfa(totalOffrandes - totalDepenses)}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        ]),
      ),
      const SizedBox(height: Cp.s2),
      Row(children: [
        Expanded(
          child: FilledButton.icon(
            onPressed: () async {
              final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => const RapportActiviteFormPage()));
              if (ok == true) _charger();
            },
            icon: const Icon(Icons.add_outlined),
            label: Text(tr('Nouveau rapport')),
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          ),
        ),
        const SizedBox(width: Cp.s1),
        OutlinedButton.icon(onPressed: _exporterCsv, icon: const Icon(Icons.download_outlined), label: Text(tr('Exporter CSV'))),
      ]),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
      else if (_error != null)
        Text(_error!, style: t.bodyMedium)
      else if (_rapports.isEmpty)
        Text(tr('Aucun rapport pour ce mois.'), style: t.bodyMedium)
      else
        for (final r in _rapports) ...[
          Container(
            margin: const EdgeInsets.only(bottom: Cp.s1),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
            child: InkWell(
              borderRadius: BorderRadius.circular(24),
              onTap: () async {
                final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => RapportActiviteFormPage(rapport: r)));
                if (ok == true) _charger();
              },
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Expanded(child: Text('${_rapportDateAffichage((r['date_rapport'] ?? '').toString().split('T').first)} · ${(r['activite_nom'] ?? '').toString().isEmpty ? tr('Activité libre') : (r['activite_nom'] ?? '').toString()}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                    _rapportStatutChip((r['statut'] ?? '').toString() == 'valide'),
                  ]),
                  const SizedBox(height: 4),
                  Text([if ((r['lieu'] ?? '').toString().isNotEmpty) (r['lieu'] ?? '').toString(), if ((r['etablissement'] ?? '').toString().isNotEmpty) (r['etablissement'] ?? '').toString()].join(' · '), style: t.bodyMedium),
                  Text('${tr('Participants')} : ${r['nombre_participants'] == null ? tr('Non renseigné') : '${r['nombre_participants']}'} · ${tr('Offrande')} : ${fcfa(_rapportMontant(r['offrande_montant']))} · ${tr('Dépenses')} : ${fcfa(_rapportDepensesTotal(r['depenses']))} · ${tr('Net')} : ${fcfa(_rapportMontant(r['offrande_montant']) - _rapportDepensesTotal(r['depenses']))}', style: t.bodyMedium),
                  if ((r['incident_type'] ?? '').toString().isNotEmpty) Text('${tr('Incident signalé')} : ${(r['incident_type'] ?? '').toString()}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: const Color(0xFFB42318))),
                ]),
              ),
            ),
          ),
        ],
    ]);
  }
}

// ───────────────────────── Comptabilité mensuelle, 2 nov. 2026,
// tranche 1 des 7 propositions validées par Axel ─────────────────────────
// Synthèse pour la trésorerie, depuis la Comptabilité de l'Espace
// structure seulement, jamais depuis Plus ni un écran membre.
// Seuls les rapports validés et les paiements confirmés, plus les
// cotisations enregistrées, comptent dans les totaux officiels.
// Les rapports brouillon sont montrés à part, hors totaux officiels,
// pour que le trésorier voie ce qui attend validation. Une
// cotisation enregistrée et un paiement de cotisation confirmé pour
// le même membre et le même mois restent deux lignes distinctes,
// signalées par un compteur, jamais fusionnées ni supprimées.
// Export CSV seulement, comme l'export des rapports, avec en-tête
// UTF-8 avec BOM et séparateur point virgule. Aucun PDF, l'application
// ne génère pas de PDF côté client.
String _comptaCategorieLabel(String c) {
  switch (c) {
    case 'don':
      return tr('Don');
    case 'achat':
      return tr('Achat');
    case 'carte':
      return tr('Carte');
    case 'cotisation':
      return tr('Cotisation');
    case 'camp':
      return tr('Camp');
    case 'offrande':
      return tr('Offrande');
    case 'depense':
      return tr('Dépense');
    case 'cotisation_enregistree':
      return tr('Cotisation enregistrée');
    default:
      return c;
  }
}

String _comptaSourceLabel(String s) {
  switch (s) {
    case 'paiement':
      return tr('Paiement');
    case 'cotisation':
      return tr('Cotisation enregistrée');
    case 'rapport_valide':
      return tr('Rapport validé');
    case 'rapport_brouillon':
      return tr('Rapport brouillon');
    default:
      return s;
  }
}

int _comptaMontant(dynamic v) => (v as num?)?.toInt() ?? 0;

List<Map<String, dynamic>> _comptaLignes(dynamic v) {
  final out = <Map<String, dynamic>>[];
  for (final e in (v as List?) ?? []) {
    if (e is Map<String, dynamic>) {
      out.add(e);
    } else if (e is Map) {
      out.add(Map<String, dynamic>.from(e));
    }
  }
  return out;
}

Widget _comptaLigneCarte(TextTheme t, Map<String, dynamic> l) {
  final montant = _comptaMontant(l['montant_fcfa']);
  final estDepense = (l['categorie'] ?? '').toString() == 'depense';
  return Container(
    margin: const EdgeInsets.only(bottom: 12),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.line)),
    child: Padding(
      padding: const EdgeInsets.all(20),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text('${_rapportDateAffichage((l['date'] ?? '').toString())} · ${(l['libelle'] ?? '').toString()}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          Text(estDepense ? '- ${fcfa(montant)}' : fcfa(montant), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: estDepense ? const Color(0xFFB42318) : Cp.navy)),
        ]),
        const SizedBox(height: 6),
        Text('${_comptaCategorieLabel((l['categorie'] ?? '').toString())} · ${_comptaSourceLabel((l['source'] ?? '').toString())}${(l['etablissement'] ?? '').toString().isNotEmpty ? ' · ${(l['etablissement'] ?? '').toString()}' : ''}', style: t.bodyMedium),
        if ((l['reference'] ?? '').toString().isNotEmpty) Text((l['reference'] ?? '').toString(), style: t.bodyMedium),
      ]),
    ),
  );
}

class ComptabilitePage extends StatefulWidget {
  const ComptabilitePage({super.key, this.sectionInitiale});

  // Carte 57, 6 nov. 2026 : section d'ouverture, pour que la
  // recherche par geste ouvre la Comptabilité directement sur
  // À valider ou sur les Chiffres, sans deuxième tuile.
  final String? sectionInitiale;
  @override
  State<ComptabilitePage> createState() => _ComptabilitePageState();
}

class _ComptabilitePageState extends State<ComptabilitePage> {
  DateTime _mois = DateTime(DateTime.now().year, DateTime.now().month);
  String? _etabId;
  List<Map<String, dynamic>> _etabs = [];
  Map<String, dynamic>? _data;
  bool _loading = true;
  String? _error;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    // Carte 57 : section d'ouverture demandée, seulement si
    // elle existe pour ce rôle et cette plateforme, sinon la
    // vue d'ensemble, jamais une page vide.
    final initiale = widget.sectionInitiale;
    if (initiale != null) {
      final generalSeulement = initiale == 'validation' || initiale == 'refuses' || initiale == 'dons';
      final telephoneSeulement = initiale == 'historique' || initiale == 'chiffres';
      if ((!generalSeulement || _general) && (!telephoneSeulement || !kIsWeb)) {
        _section = initiale;
        if (initiale == 'cotisations' || initiale == 'versements') _choisirSection(initiale);
      }
    }
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchComptabilite(mois: _rapportMoisParam(_mois), etablissementId: _etabId);
      List<Map<String, dynamic>> etabs = _etabs;
      if (_general && etabs.isEmpty) etabs = await api.fetchEtablissements();
      if (!mounted) return;
      setState(() {
        _data = data;
        _etabs = etabs;
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

  void _changerMois(int decalage) {
    setState(() => _mois = DateTime(_mois.year, _mois.month + decalage));
    _charger();
  }

  // Sections de la vue unique, restructuration 3 nov. 2026,
  // puis embarquement comptabilité le même soir : vue
  // d'ensemble, cotisations, versements de camp, refusés,
  // historique, dons. Une seule section visible à la fois,
  // pour ne pas refaire une page kilométrique. Les données
  // des sections cotisations et versements ne se chargent
  // qu'à la première ouverture de la section.
  String _section = 'vue';
  List<Map<String, dynamic>> _cotisations = [];
  bool _cotisationsChargees = false;
  bool _cotisationsLoading = false;
  String? _cotisationsErreur;
  String? _campId;
  Map<String, dynamic>? _versements;
  bool _versementsLoading = false;
  String? _versementsErreur;
  bool _soldeSeulement = false;
  final _versementsOuverts = <String>{};

  List<Camp> get _campsVersements => app.camps.where((c) => c.serverId.isNotEmpty).toList();

  // Puces visibles selon le rôle et la plateforme, dans
  // l'ordre : les refusés et les dons sont réservés à
  // l'administrateur général, l'historique est téléphone
  // seulement, comme leurs pages d'origine.
  // Carte 57, 6 nov. 2026 : la Comptabilité est la seule
  // entrée finance, elle porte tout, en onglets : À valider,
  // vue, cotisations, versements, refusés, historique, dons,
  // chiffres. Le scanner est en haut de l'écran, pas en
  // tuile à part.
  List<(String, String)> get _puces {
    final out = <(String, String)>[];
    if (_general) out.add(('validation', tr('À valider')));
    out.addAll([
      ('vue', tr("Vue d'ensemble")),
      ('cotisations', tr('Cotisations')),
      ('versements', tr('Versements de camp')),
    ]);
    if (_general) out.add(('refuses', tr('Refusés')));
    if (!kIsWeb) out.add(('historique', tr('Historique')));
    if (_general) out.add(('dons', tr('Dons')));
    if (!kIsWeb) out.add(('chiffres', tr('Chiffres')));
    return out;
  }

  void _choisirSection(String cle) {
    setState(() => _section = cle);
    if (cle == 'cotisations') _chargerCotisations();
    if (cle == 'versements') _chargerVersements();
    if (!_puces.any((e) => e.$1 == _section)) _section = 'vue';
  }

  Future<void> _chargerCotisations() async {
    if (_cotisationsChargees || _cotisationsLoading) return;
    setState(() {
      _cotisationsLoading = true;
      _cotisationsErreur = null;
    });
    try {
      final list = await api.fetchAdminMembres();
      if (!mounted) return;
      setState(() {
        _cotisations = list;
        _cotisationsChargees = true;
        _cotisationsLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _cotisationsLoading = false;
        _cotisationsErreur = '$e';
      });
    }
  }

  Future<void> _chargerVersements() async {
    final camps = _campsVersements;
    if (camps.isEmpty) return;
    _campId ??= camps.first.serverId;
    final id = _campId;
    if (id == null || id.isEmpty) return;
    setState(() {
      _versementsLoading = true;
      _versementsErreur = null;
    });
    try {
      final data = await api.fetchSuiviVersements(id);
      if (!mounted) return;
      setState(() {
        _versements = data;
        _versementsLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _versementsLoading = false;
        _versementsErreur = '$e';
      });
    }
  }

  List<Map<String, dynamic>> get _membresVersements {
    final out = _comptaLignes(_versements?['membres']);
    if (!_soldeSeulement) return out;
    return out.where((m) => _comptaMontant(m['restant']) > 0).toList();
  }

  Future<void> _exporterVersementsCsv() async {
    final membres = _membresVersements;
    if (membres.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final csv = <String>[
      [tr('Membre'), tr('Matricule'), tr('Établissement'), tr('Versements validés sur 6'), tr('Payé FCFA'), tr('Restant FCFA'), tr('Versement suivant'), tr('Montant suivant FCFA'), tr('Pass')].map(_csvChamp).join(';')
    ];
    for (final m in membres) {
      csv.add([
        _csvChamp((m['nom_complet'] ?? '').toString()),
        _csvChamp((m['matricule'] ?? '').toString()),
        _csvChamp((m['etablissement'] ?? '').toString()),
        _csvChamp('${_comptaMontant(m['versements_valides'])}'),
        _csvChamp('${_comptaMontant(m['paye'])}'),
        _csvChamp('${_comptaMontant(m['restant'])}'),
        _csvChamp(m['versement_suivant'] == null ? '' : '${_comptaMontant(m['versement_suivant'])}'),
        _csvChamp(m['montant_suivant'] == null ? '' : '${_comptaMontant(m['montant_suivant'])}'),
        _csvChamp(m['pass_visible'] == true ? tr('Débloqué') : tr('En attente')),
      ].join(';'));
    }
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(csv.join('\n'))];
      await downloadBytesFile('suivi-versements.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Suivi des versements exporté.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  Future<void> _exporterCsv() async {
    final lignes = [..._comptaLignes(_data?['lignes']), ..._comptaLignes(_data?['brouillon_lignes'])];
    if (lignes.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final csv = <String>[
      [tr('Date'), tr('Catégorie'), tr('Libellé'), tr('Source'), tr('Établissement'), tr('Montant FCFA'), tr('Référence ou Statut')].map(_csvChamp).join(';')
    ];
    for (final l in lignes) {
      csv.add([
        _csvChamp(_rapportDateAffichage((l['date'] ?? '').toString())),
        _csvChamp(_comptaCategorieLabel((l['categorie'] ?? '').toString())),
        _csvChamp((l['libelle'] ?? '').toString()),
        _csvChamp(_comptaSourceLabel((l['source'] ?? '').toString())),
        _csvChamp((l['etablissement'] ?? '').toString()),
        _csvChamp('${_comptaMontant(l['montant_fcfa'])}'),
        _csvChamp((l['reference'] ?? '').toString()),
      ].join(';'));
    }
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(csv.join('\n'))];
      await downloadBytesFile('comptabilite-${_rapportMoisParam(_mois)}.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Comptabilité exportée.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Comptabilité'), [
      // Scanner de paiement, intégré ici, pas en tuile à part.
      FilledButton.icon(
        onPressed: () => go(context, const ScanCardPage()),
        icon: const Icon(Icons.qr_code_scanner_outlined),
        label: Text(tr('Scanner un paiement')),
        style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
      ),
      const SizedBox(height: 20),
      Wrap(spacing: 12, runSpacing: 12, children: [
        for (final puce in _puces)
          ChoiceChip(
            label: Text(puce.$2),
            selected: _section == puce.$1,
            selectedColor: Cp.gold,
            onSelected: (_) => _choisirSection(puce.$1),
          ),
      ]),
      const SizedBox(height: 20),
      if (_section == 'validation') ..._sectionValidation(context, t),
      if (_section == 'vue') ..._vueEnsemble(context, t),
      if (_section == 'cotisations') ..._sectionCotisations(t),
      if (_section == 'versements') ..._sectionVersements(t),
      if (_section == 'refuses') ...[
        Text(tr('Hors totaux, jamais dans les totaux.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        const RefusAdminPage(embedded: true),
      ],
      if (_section == 'historique') ...[
        const AdminTransactionHistoryPage(embedded: true),
      ],
      if (_section == 'chiffres') ...[
        const ChiffresPage(embedded: true),
      ],
      if (_section == 'dons') ...[
        const ObjectifDonGauge(),
        const SizedBox(height: Cp.s2),
        Text(tr('Objectif affiché sur la page Don.'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s1),
        const ObjectifDonAdminPage(embedded: true),
      ],
    ]);
  }

  // Carte 57 : file de validation dans la Comptabilité,
  // serveur puis locale, jamais une tuile Finances à part.
  // Validé, le paiement part en comptabilité ; refusé, il
  // part dans les refusés, hors totaux, jamais dans la file.
  List<Widget> _sectionValidation(BuildContext context, TextTheme t) => [
        Text(tr('Validez seulement après avoir contrôlé le paiement reçu dans le compte Wave de la structure. Aucune validation automatique.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s2),
        const _ServerPaymentsSection(),
        const SizedBox(height: Cp.s2),
        Text(tr('Paiements locaux à valider, sur cet appareil seulement'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s1),
        const _ValidationLocaleSection(),
      ];

  List<Widget> _vueEnsemble(BuildContext context, TextTheme t) {
    final totaux = _data?['totaux'] is Map ? Map<String, dynamic>.from(_data!['totaux'] as Map) : <String, dynamic>{};
    final parCategorie = _data?['par_categorie'] is Map ? Map<String, dynamic>.from(_data!['par_categorie'] as Map) : <String, dynamic>{};
    final lignes = _comptaLignes(_data?['lignes']);
    final brouillons = _comptaLignes(_data?['brouillon_lignes']);
    final doublons = _comptaMontant(_data?['doublons_cotisation_possibles']);
    const ordreCategories = ['don', 'achat', 'carte', 'cotisation', 'camp', 'offrande', 'cotisation_enregistree', 'depense'];
    return [
      Row(children: [
        IconButton(tooltip: tr('Mois précédent'), icon: const Icon(Icons.chevron_left_outlined), onPressed: () => _changerMois(-1)),
        Expanded(child: Text(_rapportMoisLabel(_mois), textAlign: TextAlign.center, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
        IconButton(tooltip: tr('Mois suivant'), icon: const Icon(Icons.chevron_right_outlined), onPressed: () => _changerMois(1)),
      ]),
      if (_general) ...[
        const SizedBox(height: 12),
        DropdownButtonFormField<String?>(
          value: _etabId,
          decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les établissements'))),
            for (final e in _etabs) DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) {
            setState(() => _etabId = v);
            _charger();
          },
        ),
      ] else ...[
        const SizedBox(height: 12),
        Text(tr('Votre établissement seulement.'), style: t.bodyMedium),
      ],
      const SizedBox(height: 20),
      Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Cp.line)),
        child: Row(children: [
          Expanded(child: Column(children: [Text(tr('Entrées'), style: t.bodyMedium), const SizedBox(height: 6), Text(fcfa(_comptaMontant(totaux['entrees'])), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))])),
          const SizedBox(width: 12),
          Expanded(child: Column(children: [Text(tr('Dépenses'), style: t.bodyMedium), const SizedBox(height: 6), Text(fcfa(_comptaMontant(totaux['depenses'])), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))])),
          const SizedBox(width: 12),
          Expanded(child: Column(children: [Text(tr('Solde'), style: t.bodyMedium), const SizedBox(height: 6), Text(fcfa(_comptaMontant(totaux['solde'])), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))])),
        ]),
      ),
      const SizedBox(height: 12),
      Text(tr('Seuls les confirmés comptent.'), style: t.bodyMedium),
      if (doublons > 0) ...[
        const SizedBox(height: 12),
        Text('$doublons ${tr('membres avec cotisation confirmée et enregistrée, à rapprocher.')}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: const Color(0xFFB42318))),
      ],
      const SizedBox(height: 20),
      Text(tr('Par catégorie'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: 12),
      // Carte 50, 6 nov. 2026 : les catégories n'étaient
      // que des lignes de texte, montant collé au libellé.
      // Maintenant, libellé à gauche, montant à droite,
      // alignés, avec de l'air entre les lignes.
      for (final c in ordreCategories)
        if (_comptaMontant(parCategorie[c]) > 0)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 6),
            child: Row(children: [
              Expanded(child: Text(_comptaCategorieLabel(c), style: t.bodyMedium)),
              Text(fcfa(_comptaMontant(parCategorie[c])), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
            ]),
          ),
      const SizedBox(height: 20),
      OutlinedButton.icon(onPressed: _exporterCsv, icon: const Icon(Icons.download_outlined), label: Text(tr('Exporter CSV'))),
      const SizedBox(height: 20),
      Text(tr('Lignes de détail'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: 12),
      if (_loading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
      else if (_error != null)
        Text(_error!, style: t.bodyMedium)
      else if (lignes.isEmpty)
        Text(tr('Aucune ligne pour ce mois.'), style: t.bodyMedium)
      else
        for (final l in lignes) _comptaLigneCarte(t, l),
      const SizedBox(height: 20),
      Text(tr('Brouillons, hors totaux'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: 12),
      if (!_loading && _error == null) ...[
        if (brouillons.isEmpty)
          Text(tr('Aucun brouillon pour ce mois.'), style: t.bodyMedium)
        else
          for (final l in brouillons) _comptaLigneCarte(t, l),
      ],
    ];
  }

  List<Widget> _sectionCotisations(TextTheme t) {
    final confirmes = _cotisations.where((m) => (m['cotisation_statut'] ?? '').toString() == 'confirme').length;
    return [
      Text('${_cotisations.length} ${tr('membres')} · $confirmes ${tr('confirmés')}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: Cp.s1),
      if (_cotisationsLoading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
      else if (_cotisationsErreur != null)
        Text(_cotisationsErreur!, style: t.bodyMedium)
      else if (_cotisations.isEmpty)
        Text(tr('Aucun membre dans votre périmètre.'), style: t.bodyMedium)
      else
        for (final m in _cotisations) ...[
          Card(
            child: ListTile(
              title: Text('${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}', style: t.labelLarge),
              subtitle: Text((m['dernier_paiement_cotisation'] ?? '').toString().isNotEmpty ? dateFr(DateTime.tryParse((m['dernier_paiement_cotisation'] ?? '').toString()) ?? DateTime.now()) : tr('Aucun paiement.'), style: t.bodyMedium),
              trailing: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(color: (m['cotisation_statut'] ?? '').toString() == 'confirme' ? const Color(0xFFE6F4EA) : (m['cotisation_statut'] ?? '').toString() == 'en_attente' ? const Color(0xFFFDF4D8) : const Color(0xFFEFF1F5), borderRadius: BorderRadius.circular(999)),
                child: Text((m['cotisation_statut'] ?? '').toString() == 'confirme' ? tr('Confirmée') : (m['cotisation_statut'] ?? '').toString() == 'en_attente' ? tr('En attente') : tr('Aucune'), style: TextStyle(color: (m['cotisation_statut'] ?? '').toString() == 'confirme' ? const Color(0xFF137333) : (m['cotisation_statut'] ?? '').toString() == 'en_attente' ? Cp.goldDeep : Cp.inkMuted, fontWeight: FontWeight.w700, fontSize: 13)),
              ),
            ),
          ),
          const SizedBox(height: Cp.s1),
        ],
    ];
  }

  List<Widget> _sectionVersements(TextTheme t) {
    final camps = _campsVersements;
    if (camps.isEmpty) return [Text(tr('Aucun camp publié.'), style: t.bodyMedium)];
    final totaux = _versements?['totaux'] is Map ? Map<String, dynamic>.from(_versements!['totaux'] as Map) : <String, dynamic>{};
    final membres = _membresVersements;
    return [
      DropdownButtonFormField<String>(
        value: _campId,
        decoration: InputDecoration(labelText: tr('Camp'), border: const OutlineInputBorder()),
        items: [for (final c in camps) DropdownMenuItem<String>(value: c.serverId, child: Text(c.name))],
        onChanged: (v) {
          if (v == null) return;
          setState(() => _campId = v);
          _chargerVersements();
        },
      ),
      const SizedBox(height: Cp.s1),
      SwitchListTile(
        value: _soldeSeulement,
        title: Text(tr('Solde restant seulement')),
        onChanged: (v) => setState(() => _soldeSeulement = v),
      ),
      const SizedBox(height: Cp.s1),
      Container(
        padding: const EdgeInsets.all(Cp.s2),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
        child: Row(children: [
          Expanded(child: Column(children: [Text(tr('Payé'), style: t.bodyMedium), Text(fcfa(_comptaMontant(totaux['total_paye'])), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))])),
          Expanded(child: Column(children: [Text(tr('Restant'), style: t.bodyMedium), Text(fcfa(_comptaMontant(totaux['total_restant'])), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))])),
          Expanded(child: Column(children: [Text(tr('Pass'), style: t.bodyMedium), Text('${_comptaMontant(totaux['pass_debloques'])}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))])),
        ]),
      ),
      const SizedBox(height: Cp.s2),
      OutlinedButton.icon(onPressed: membres.isEmpty ? null : _exporterVersementsCsv, icon: const Icon(Icons.download_outlined), label: Text(tr('Exporter CSV'))),
      const SizedBox(height: Cp.s2),
      if (_versementsLoading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
      else if (_versementsErreur != null)
        Text(_versementsErreur!, style: t.bodyMedium)
      else if (membres.isEmpty)
        Text(tr('Aucune inscription en versements pour ce camp.'), style: t.bodyMedium)
      else
        for (final m in membres) _versementCarteCourte(t, m),
    ];
  }

  Widget _versementCarteCourte(TextTheme t, Map<String, dynamic> m) {
    final valides = _comptaMontant(m['versements_valides']);
    final pass = m['pass_visible'] == true;
    final cle = (m['matricule'] ?? '').toString().isNotEmpty ? (m['matricule'] ?? '').toString() : (m['nom_complet'] ?? '').toString();
    final ouvert = _versementsOuverts.contains(cle);
    final enAttente = m['versement_en_attente'] is Map ? Map<String, dynamic>.from(m['versement_en_attente'] as Map) : null;
    return Container(
      margin: const EdgeInsets.only(bottom: Cp.s1),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
      child: InkWell(
        borderRadius: BorderRadius.circular(24),
        onTap: () => setState(() => ouvert ? _versementsOuverts.remove(cle) : _versementsOuverts.add(cle)),
        child: Padding(
          padding: const EdgeInsets.all(Cp.s2),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Expanded(child: Text((m['nom_complet'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
              Text(pass ? tr('Pass débloqué') : tr('Pass en attente'), style: t.labelMedium?.copyWith(fontWeight: FontWeight.w800, color: pass ? const Color(0xFF166534) : Cp.inkMuted)),
            ]),
            const SizedBox(height: 4),
            LinearProgressIndicator(value: valides / 6),
            const SizedBox(height: 4),
            Text('$valides / 6 · ${tr('Payé')} : ${fcfa(_comptaMontant(m['paye']))} · ${tr('Restant')} : ${fcfa(_comptaMontant(m['restant']))}', style: t.bodyMedium),
            if (ouvert) ...[
              const SizedBox(height: Cp.s1),
              Text('${(m['matricule'] ?? '').toString()}${(m['etablissement'] ?? '').toString().isNotEmpty ? ' · ${(m['etablissement'] ?? '').toString()}' : ''}', style: t.bodyMedium),
              Text(m['versement_suivant'] == null ? tr('Aucun versement suivant, pass débloqué.') : '${tr('Versement suivant')} : ${tr('N°')} ${_comptaMontant(m['versement_suivant'])} · ${fcfa(_comptaMontant(m['montant_suivant']))}', style: t.bodyMedium),
              if (enAttente != null) Text('${tr('Versement en attente')} : ${(enAttente['reference'] ?? '').toString()} · ${fcfa(_comptaMontant(enAttente['montant_fcfa']))}', style: t.bodyMedium),
              Text('${tr('Rappel mensuel')} : ${(m['rappel_etat'] ?? '').toString() == 'actif' ? tr('Actif') : tr('Arrêté')}', style: t.bodyMedium),
            ],
          ]),
        ),
      ),
    );
  }
}


// Versements de camp, anciennement page séparée, 2 nov. 2026 :
// depuis la restructuration du 3 nov. 2026, ils vivent dans la
// section Versements de la page Comptabilité unique, avec les
// mêmes données serveur, les mêmes totaux et le même export
// CSV, en cartes courtes avec détails au toucher.
class _DepenseLigne {
  _DepenseLigne({String libelle = '', String montant = '', String categorie = 'autre'})
      : libelleCtrl = TextEditingController(text: libelle),
        montantCtrl = TextEditingController(text: montant),
        categorie = categorie;
  final TextEditingController libelleCtrl;
  final TextEditingController montantCtrl;
  String categorie;
  void dispose() {
    libelleCtrl.dispose();
    montantCtrl.dispose();
  }
}

class RapportActiviteFormPage extends StatefulWidget {
  const RapportActiviteFormPage({super.key, this.rapport});
  final Map<String, dynamic>? rapport;
  @override
  State<RapportActiviteFormPage> createState() => _RapportActiviteFormPageState();
}

class _RapportActiviteFormPageState extends State<RapportActiviteFormPage> {
  bool _saving = false;
  bool _general = false;
  final _date = TextEditingController();
  final _lieu = TextEditingController();
  final _activiteNom = TextEditingController();
  final _orateur = TextEditingController();
  final _theme = TextEditingController();
  final _participants = TextEditingController();
  final _offrande = TextEditingController();
  final _comptePar = TextEditingController();
  final _observations = TextEditingController();
  final _incidentType = TextEditingController();
  final _incidentDescription = TextEditingController();
  final _incidentPersonnes = TextEditingController();
  final _incidentAction = TextEditingController();
  final _incidentSuivi = TextEditingController();
  String? _activiteId;
  bool _activiteLibre = false;
  String? _etabId;
  String? _moyen;
  List<Map<String, dynamic>> _etabs = [];
  List<_DepenseLigne> _depenses = [];
  final Map<String, Map<String, String>> _presents = {};

  bool get _edition => widget.rapport != null;
  bool get _valide => (widget.rapport?['statut'] ?? '').toString() == 'valide';

  @override
  void initState() {
    super.initState();
    _general = app.isAdminGeneral;
    final r = widget.rapport;
    if (r == null) {
      _date.text = _dateIso(DateTime.now());
      _depenses = [];
    } else {
      _date.text = (r['date_rapport'] ?? '').toString().split('T').first;
      _lieu.text = (r['lieu'] ?? '').toString();
      _activiteNom.text = (r['activite_nom'] ?? '').toString();
      _orateur.text = (r['orateur'] ?? '').toString();
      _theme.text = (r['theme'] ?? '').toString();
      _participants.text = r['nombre_participants'] == null ? '' : '${r['nombre_participants']}';
      _offrande.text = '${_rapportMontant(r['offrande_montant'])}';
      _comptePar.text = (r['offrande_compte_par'] ?? '').toString();
      _observations.text = (r['observations'] ?? '').toString();
      _incidentType.text = (r['incident_type'] ?? '').toString();
      _incidentDescription.text = (r['incident_description'] ?? '').toString();
      _incidentPersonnes.text = (r['incident_personnes'] ?? '').toString();
      _incidentAction.text = (r['incident_action'] ?? '').toString();
      _incidentSuivi.text = (r['incident_suivi'] ?? '').toString();
      _activiteId = (r['activite_id'] ?? '').toString().isEmpty ? null : (r['activite_id'] ?? '').toString();
      _activiteLibre = _activiteId == null && _activiteNom.text.isNotEmpty;
      _etabId = (r['etablissement_id'] ?? '').toString().isEmpty ? null : (r['etablissement_id'] ?? '').toString();
      final moyen = (r['offrande_moyen'] ?? '').toString();
      _moyen = moyen.isEmpty ? null : moyen;
      for (final d in (r['depenses'] as List?) ?? []) {
        if (d is Map) {
          _depenses.add(_DepenseLigne(libelle: (d['libelle'] ?? '').toString(), montant: '${_rapportMontant(d['montant'])}', categorie: (d['categorie'] ?? 'autre').toString()));
        }
      }
      for (final p in (r['presents'] as List?) ?? []) {
        if (p is Map && (p['membre_id'] ?? '').toString().isNotEmpty) {
          _presents[(p['membre_id'] ?? '').toString()] = {'nom_complet': (p['nom_complet'] ?? '').toString(), 'matricule': (p['matricule'] ?? '').toString()};
        }
      }
    }
    _chargerEtabs();
  }

  Future<void> _chargerEtabs() async {
    try {
      final etabs = await api.fetchEtablissements();
      if (mounted) setState(() => _etabs = etabs);
    } catch (_) {}
  }

  @override
  void dispose() {
    _date.dispose();
    _lieu.dispose();
    _activiteNom.dispose();
    _orateur.dispose();
    _theme.dispose();
    _participants.dispose();
    _offrande.dispose();
    _comptePar.dispose();
    _observations.dispose();
    _incidentType.dispose();
    _incidentDescription.dispose();
    _incidentPersonnes.dispose();
    _incidentAction.dispose();
    _incidentSuivi.dispose();
    for (final d in _depenses) {
      d.dispose();
    }
    super.dispose();
  }

  Widget _champ(TextEditingController c, String label, {int lines = 1, TextInputType? clavier}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: TextField(controller: c, maxLines: lines, keyboardType: clavier, decoration: InputDecoration(labelText: label, border: const OutlineInputBorder())),
    );
  }

  Widget _titreSection(String titre, TextTheme t) => Padding(
        padding: const EdgeInsets.only(bottom: Cp.s1, top: Cp.s1),
        child: Text(titre, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      );

  Future<void> _choisirOrateur() async {
    try {
      final membres = await api.fetchAdminMembres(etablissementId: _etabId, inclureSansEtablissement: true);
      if (!mounted) return;
      if (membres.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final choix = await pick<Map<String, dynamic>>(context, tr('Choisir un orateur'), membres, (m) => '${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}');
      if (choix != null) setState(() => _orateur.text = (choix['nom_complet'] ?? '').toString());
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  Future<void> _reprendrePresences() async {
    if (_activiteId == null) return;
    try {
      final d = await api.fetchPresencesActivite(_activiteId!);
      final entrees = ((d['entrees'] as List?) ?? []).whereType<Map<String, dynamic>>().where((e) => e['statut'] == 'present').toList();
      if (!mounted) return;
      setState(() {
        _participants.text = '${entrees.length}';
        _presents.clear();
        for (final e in entrees) {
          _presents[(e['membre_id'] ?? '').toString()] = {'nom_complet': (e['nom_complet'] ?? '').toString(), 'matricule': (e['matricule'] ?? '').toString()};
        }
      });
      toast(context, tr('Présences reprises.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  Future<void> _choisirPresents() async {
    try {
      final membres = await api.fetchAdminMembres(etablissementId: _etabId, inclureSansEtablissement: true);
      if (!mounted) return;
      if (membres.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final choisis = Set<String>.from(_presents.keys);
      final ok = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(tr('Présents, en option')),
          content: SizedBox(
            width: double.maxFinite,
            height: 420,
            child: StatefulBuilder(
              builder: (ctx2, setDialog) => ListView(children: [
                for (final m in membres)
                  CheckboxListTile(
                    title: Text('${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}'),
                    value: choisis.contains((m['id'] ?? '').toString()),
                    onChanged: (v) => setDialog(() {
                      final id = (m['id'] ?? '').toString();
                      if (v == true) {
                        choisis.add(id);
                      } else {
                        choisis.remove(id);
                      }
                    }),
                  ),
              ]),
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Terminé'))),
          ],
        ),
      );
      if (ok != true) return;
      setState(() {
        _presents.clear();
        for (final m in membres) {
          final id = (m['id'] ?? '').toString();
          if (choisis.contains(id)) _presents[id] = {'nom_complet': (m['nom_complet'] ?? '').toString(), 'matricule': (m['matricule'] ?? '').toString()};
        }
        if (_participants.text.trim().isEmpty) _participants.text = '${_presents.length}';
      });
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  Future<void> _enregistrer() async {
    if (_saving) return;
    final dateTexte = _date.text.trim();
    if (!RegExp(r'^\d{4}-\d{2}-\d{2}$').hasMatch(dateTexte) || DateTime.tryParse(dateTexte) == null) {
      toast(context, tr('La date doit être au format AAAA-MM-JJ.'));
      return;
    }
    int? participants;
    if (_participants.text.trim().isNotEmpty) {
      participants = int.tryParse(_participants.text.trim());
      if (participants == null || participants < 0) {
        toast(context, tr('Le nombre de participants doit être un nombre positif.'));
        return;
      }
    }
    var offrande = 0;
    if (_offrande.text.trim().isNotEmpty) {
      final v = int.tryParse(_offrande.text.trim());
      if (v == null || v < 0) {
        toast(context, tr('Le montant de l’offrande doit être un nombre positif.'));
        return;
      }
      offrande = v;
    }
    final depenses = <Map<String, dynamic>>[];
    for (final d in _depenses) {
      final libelle = d.libelleCtrl.text.trim();
      final montantTexte = d.montantCtrl.text.trim();
      if (libelle.isEmpty && montantTexte.isEmpty) continue;
      final montant = int.tryParse(montantTexte);
      if (libelle.isEmpty || montant == null || montant < 0) {
        toast(context, tr('Chaque dépense demande un libellé et un montant positif.'));
        return;
      }
      depenses.add({'libelle': libelle, 'montant': montant, 'categorie': d.categorie});
    }
    final corps = <String, dynamic>{
      'date_rapport': dateTexte,
      'lieu': _lieu.text.trim().isEmpty ? null : _lieu.text.trim(),
      'activite_id': _activiteLibre ? null : _activiteId,
      'activite_nom': _activiteNom.text.trim().isEmpty ? null : _activiteNom.text.trim(),
      'orateur': _orateur.text.trim().isEmpty ? null : _orateur.text.trim(),
      'theme': _theme.text.trim().isEmpty ? null : _theme.text.trim(),
      'nombre_participants': participants,
      'presents': _presents.entries.map((e) => {'membre_id': e.key, 'nom_complet': e.value['nom_complet'] ?? '', 'matricule': e.value['matricule'] ?? ''}).toList(),
      'offrande_montant': offrande,
      'offrande_moyen': _moyen,
      'offrande_compte_par': _comptePar.text.trim().isEmpty ? null : _comptePar.text.trim(),
      'depenses': depenses,
      'observations': _observations.text.trim().isEmpty ? null : _observations.text.trim(),
      'incident_type': _incidentType.text.trim().isEmpty ? null : _incidentType.text.trim(),
      'incident_description': _incidentDescription.text.trim().isEmpty ? null : _incidentDescription.text.trim(),
      'incident_personnes': _incidentPersonnes.text.trim().isEmpty ? null : _incidentPersonnes.text.trim(),
      'incident_action': _incidentAction.text.trim().isEmpty ? null : _incidentAction.text.trim(),
      'incident_suivi': _incidentSuivi.text.trim().isEmpty ? null : _incidentSuivi.text.trim(),
      'etablissement_id': _general ? _etabId : null,
    };
    setState(() => _saving = true);
    try {
      if (_edition) {
        await api.updateRapportActivite((widget.rapport!['id'] ?? '').toString(), corps);
      } else {
        await api.createRapportActivite(corps);
      }
      if (!mounted) return;
      toast(context, tr('Rapport enregistré.'));
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible d’enregistrer le rapport.'));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _valider() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Valider ce rapport ?')),
        content: Text(tr('Après validation, le rapport reste modifiable par un administrateur, avec une trace, mais il ne sera jamais supprimé.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Valider'))),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await api.validerRapportActivite((widget.rapport!['id'] ?? '').toString());
      if (!mounted) return;
      toast(context, tr('Rapport validé.'));
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de valider le rapport.'));
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(_edition ? tr('Modifier le rapport') : tr('Nouveau rapport'), [
      if (_valide) Text(tr('Rapport validé, toute modification est journalisée.'), style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
      if (_valide) const SizedBox(height: Cp.s1),
      _titreSection(tr('Activité'), t),
      _champ(_date, tr('Date du rapport (AAAA-MM-JJ)')),
      _champ(_lieu, tr('Lieu')),
      if (_general)
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: DropdownButtonFormField<String?>(
            value: _etabId,
            decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
            items: [
              DropdownMenuItem<String?>(value: null, child: Text(tr('Aucun établissement précis'))),
              for (final e in _etabs) DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
            ],
            onChanged: (v) => setState(() => _etabId = v),
          ),
        )
      else
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: Text(tr('Votre établissement sera appliqué par le serveur.'), style: t.bodyMedium),
        ),
      Row(children: [
        Expanded(
          child: OutlinedButton.icon(
            onPressed: () async {
              final choix = await choisirActivite(context);
              if (choix != null) setState(() {
                _activiteId = choix.id;
                _activiteLibre = false;
                _activiteNom.text = choix.nom;
              });
            },
            icon: const Icon(Icons.event_outlined),
            label: Text(tr('Activité existante')),
          ),
        ),
        const SizedBox(width: Cp.s1),
        Expanded(
          child: OutlinedButton.icon(
            onPressed: () => setState(() {
              _activiteLibre = true;
              _activiteId = null;
            }),
            icon: const Icon(Icons.edit_outlined),
            label: Text(tr('Activité libre')),
          ),
        ),
      ]),
      const SizedBox(height: Cp.s1),
      if (_activiteId != null || _activiteLibre)
        Text(_activiteLibre ? '${tr('Activité libre')} : ${_activiteNom.text}' : '${tr('Activité liée')} : ${_activiteNom.text}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
      if (_activiteId != null || _activiteLibre) const SizedBox(height: Cp.s1),
      if (_activiteLibre) _champ(_activiteNom, tr('Nom de l’activité libre')),
      _champ(_orateur, tr('Orateur')),
      Padding(
        padding: const EdgeInsets.only(bottom: Cp.s2),
        child: OutlinedButton.icon(onPressed: _choisirOrateur, icon: const Icon(Icons.person_search_outlined), label: Text(tr('Choisir l’orateur parmi les membres'))),
      ),
      _champ(_theme, tr('Thème')),
      _titreSection(tr('Participants'), t),
      _champ(_participants, tr('Nombre de participants'), clavier: TextInputType.number),
      Text(tr('Vide, le nombre est rempli par les présences scannées, si une activité est liée. Sinon, saisissez le nombre à la main.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s1),
      Row(children: [
        if (_activiteId != null)
          Expanded(child: OutlinedButton.icon(onPressed: _reprendrePresences, icon: const Icon(Icons.qr_code_scanner_outlined), label: Text(tr('Reprendre les présences scannées')))),
        if (_activiteId != null) const SizedBox(width: Cp.s1),
        Expanded(child: OutlinedButton.icon(onPressed: _choisirPresents, icon: const Icon(Icons.group_outlined), label: Text(tr('Cocher les présents')))),
      ]),
      const SizedBox(height: Cp.s1),
      if (_presents.isNotEmpty) Text('${tr('Présents cochés')} : ${_presents.length} · ${_presents.values.map((p) => p['nom_complet'] ?? '').where((n) => n.isNotEmpty).join(', ')}', style: t.bodyMedium),
      if (_presents.isNotEmpty) const SizedBox(height: Cp.s1),
      _titreSection(tr('Offrande du jour'), t),
      _champ(_offrande, tr('Montant de l’offrande (FCFA)'), clavier: TextInputType.number),
      Padding(
        padding: const EdgeInsets.only(bottom: Cp.s2),
        child: DropdownButtonFormField<String?>(
          value: _moyen,
          decoration: InputDecoration(labelText: tr('Moyen'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Non précisé'))),
            DropdownMenuItem<String?>(value: 'especes', child: Text(tr('Espèces'))),
            const DropdownMenuItem<String?>(value: 'wave', child: Text('Wave')),
            const DropdownMenuItem<String?>(value: 'orange', child: Text('Orange')),
          ],
          onChanged: (v) => setState(() => _moyen = v),
        ),
      ),
      _champ(_comptePar, tr('Nom de la personne qui a compté')),
      _titreSection(tr('Dépenses du jour, en option'), t),
      for (var i = 0; i < _depenses.length; i++) ...[
        Row(children: [
          Expanded(flex: 3, child: _champ(_depenses[i].libelleCtrl, tr('Libellé'))),
          const SizedBox(width: Cp.s1),
          Expanded(flex: 2, child: _champ(_depenses[i].montantCtrl, tr('Montant (FCFA)'), clavier: TextInputType.number)),
          IconButton(
            tooltip: tr('Retirer cette dépense'),
            icon: const Icon(Icons.delete_outlined),
            onPressed: () => setState(() {
              _depenses[i].dispose();
              _depenses.removeAt(i);
            }),
          ),
        ]),
        Padding(
          padding: const EdgeInsets.only(bottom: Cp.s2),
          child: DropdownButtonFormField<String>(
            value: _depenses[i].categorie,
            decoration: InputDecoration(labelText: tr('Catégorie'), border: const OutlineInputBorder()),
            items: [
              DropdownMenuItem<String>(value: 'transport', child: Text(tr('Transport'))),
              DropdownMenuItem<String>(value: 'materiel', child: Text(tr('Matériel'))),
              DropdownMenuItem<String>(value: 'autre', child: Text(tr('Autre'))),
            ],
            onChanged: (v) => setState(() => _depenses[i].categorie = v ?? 'autre'),
          ),
        ),
      ],
      Padding(
        padding: const EdgeInsets.only(bottom: Cp.s2),
        child: OutlinedButton.icon(
          onPressed: () => setState(() => _depenses.add(_DepenseLigne())),
          icon: const Icon(Icons.add_outlined),
          label: Text(tr('Ajouter une dépense')),
        ),
      ),
      _champ(_observations, tr('Observations libres'), lines: 3),
      Container(
        padding: const EdgeInsets.all(Cp.s2),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(tr('Incident'), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
          const SizedBox(height: 4),
          Text(tr('Section séparée, réservée à l’administration, jamais visible par les membres.'), style: t.bodyMedium),
          const SizedBox(height: Cp.s1),
          _champ(_incidentType, tr('Type d’incident')),
          _champ(_incidentDescription, tr('Description'), lines: 3),
          _champ(_incidentPersonnes, tr('Personnes concernées'), lines: 2),
          _champ(_incidentAction, tr('Action prise'), lines: 2),
          _champ(_incidentSuivi, tr('Suivi demandé'), lines: 2),
        ]),
      ),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _saving ? null : _enregistrer,
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          child: Text(_saving ? tr('Enregistrement…') : tr('Enregistrer le rapport')),
        ),
      ),
      if (_edition && !_valide && _general) ...[
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton(onPressed: _valider, child: Text(tr('Valider ce rapport'))),
        ),
      ],
      const SizedBox(height: Cp.s1),
      Text(tr('Un rapport validé reste modifiable par un administrateur, avec une trace, mais il n’est jamais supprimé.'), style: t.bodyMedium),
    ]);
  }
}

// ───────────────────────── Département scolaire, 2 nov. 2026,
// tranche 2, carte blanche ─────────────────────────
// Une ligne par membre et par année scolaire, avec une moyenne par
// trimestre de 0 à 20. Saisie et modification réservées aux
// administrateurs, avec périmètre par établissement contrôlé côté
// serveur ; un membre ne voit que ses propres moyennes, par sa
// page dédiée, et ne peut jamais en modifier une. La moyenne
// annuelle n'apparaît que quand les trois trimestres sont
// renseignés. En dessous de 10 sur 20, la fiche porte la mention
// « À accompagner », sans message alarmiste. Aucune suppression :
// une fiche erronée se corrige par modification.
const List<String> _scolaireClasses = ['CP1', 'CP2', 'CE1', 'CE2', 'CM1', 'CM2', '6e', '5e', '4e', '3e', '2nde', '1ère', 'Terminale', 'Université', 'Formation professionnelle', 'Autre'];

String _scolaireAnneeCourante() {
  final maintenant = DateTime.now();
  if (maintenant.month >= 9) return '${maintenant.year}-${maintenant.year + 1}';
  return '${maintenant.year - 1}-${maintenant.year}';
}

double? _scolaireMoyenne(dynamic v) {
  if (v == null) return null;
  if (v is num) return v.toDouble();
  return double.tryParse(v.toString());
}

String _scolaireMoyenneTexte(dynamic v) {
  final d = _scolaireMoyenne(v);
  if (d == null) return '';
  if (d == d.truncateToDouble()) return '${d.toInt()}';
  return d.toStringAsFixed(2);
}

String _scolaireClasse(Map<String, dynamic> r) {
  if ((r['classe'] ?? '').toString() == 'Autre' && (r['classe_libre'] ?? '').toString().isNotEmpty) return (r['classe_libre'] ?? '').toString();
  return (r['classe'] ?? '').toString();
}

bool _scolaireAlerte(Map<String, dynamic> r) {
  for (final v in [r['moyenne_t1'], r['moyenne_t2'], r['moyenne_t3']]) {
    final d = _scolaireMoyenne(v);
    if (d != null && d < 10) return true;
  }
  return false;
}

String _scolaireTypeExamenLabel(String? v) {
  switch (v) {
    case 'bepc':
      return 'BEPC';
    case 'bac':
      return 'BAC';
    case 'autre':
      return tr('Autre');
    default:
      return '';
  }
}

String _scolaireResultatLabel(String? v) {
  switch (v) {
    case 'admis':
      return tr('Admis');
    case 'ajourne':
      return tr('Ajourné');
    default:
      return '';
  }
}

class ScolairePage extends StatefulWidget {
  const ScolairePage({super.key});
  @override
  State<ScolairePage> createState() => _ScolairePageState();
}

class _ScolairePageState extends State<ScolairePage> {
  final _annee = TextEditingController();
  String? _etabId;
  bool _bureau = false;
  List<Map<String, dynamic>> _etabs = [];
  List<Map<String, dynamic>> _suivis = [];
  bool _loading = true;
  String? _error;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _annee.text = _scolaireAnneeCourante();
    _charger();
  }

  @override
  void dispose() {
    _annee.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final annee = _annee.text.trim();
      final suivis = await api.fetchSuivisScolaires(etablissementId: _etabId, anneeScolaire: annee.isEmpty ? null : annee, bureauSeulement: _bureau);
      List<Map<String, dynamic>> etabs = _etabs;
      if (_general && etabs.isEmpty) etabs = await api.fetchEtablissements();
      if (!mounted) return;
      setState(() {
        _suivis = suivis;
        _etabs = etabs;
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

  Future<void> _exporterCsv() async {
    if (_suivis.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final lignes = <String>[
      [tr('Membre'), tr('Matricule'), tr('Établissement'), tr('Classe'), tr('Année scolaire'), tr('Trimestre 1'), tr('Trimestre 2'), tr('Trimestre 3'), tr('Moyenne annuelle'), tr('Classe d’examen'), tr('Type d’examen'), tr('Résultat')].map(_csvChamp).join(';')
    ];
    for (final r in _suivis) {
      lignes.add([
        _csvChamp((r['membre_nom'] ?? '').toString()),
        _csvChamp((r['matricule'] ?? '').toString()),
        _csvChamp((r['etablissement'] ?? '').toString()),
        _csvChamp(_scolaireClasse(r)),
        _csvChamp((r['annee_scolaire'] ?? '').toString()),
        _csvChamp(_scolaireMoyenneTexte(r['moyenne_t1'])),
        _csvChamp(_scolaireMoyenneTexte(r['moyenne_t2'])),
        _csvChamp(_scolaireMoyenneTexte(r['moyenne_t3'])),
        _csvChamp(_scolaireMoyenneTexte(r['moyenne_annuelle'])),
        _csvChamp((r['examen'] ?? false) == true ? tr('Oui') : tr('Non')),
        _csvChamp(_scolaireTypeExamenLabel((r['type_examen'] ?? '').toString().isEmpty ? null : (r['type_examen'] ?? '').toString())),
        _csvChamp(_scolaireResultatLabel((r['resultat_examen'] ?? '').toString().isEmpty ? null : (r['resultat_examen'] ?? '').toString())),
      ].join(';'));
    }
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(lignes.join('\n'))];
      await downloadBytesFile('suivis-scolaires-${_annee.text.trim()}.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Suivis exportés.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final alertes = _suivis.where(_scolaireAlerte).length;
    return basic(tr('Département scolaire'), [
      Text(tr('Les moyennes sont saisies par un responsable de la structure, jamais par le membre lui-même. Elles ne sont visibles que dans ce périmètre, jamais sur une carte ni sur un mur.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      TextField(controller: _annee, decoration: InputDecoration(labelText: tr('Année scolaire'), border: const OutlineInputBorder())),
      const SizedBox(height: Cp.s1),
      if (_general) ...[
        DropdownButtonFormField<String?>(
          value: _etabId,
          decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les établissements'))),
            for (final e in _etabs) DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) {
            setState(() => _etabId = v);
            _charger();
          },
        ),
        const SizedBox(height: Cp.s1),
      ] else ...[
        Text(tr('Seuls les suivis de votre établissement sont affichés.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
      ],
      SwitchListTile(
        title: Text(tr('Membres du Bureau seulement')),
        value: _bureau,
        onChanged: (v) {
          setState(() => _bureau = v);
          _charger();
        },
      ),
      const SizedBox(height: Cp.s1),
      Row(children: [
        Expanded(
          child: FilledButton.icon(
            onPressed: () async {
              final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => const SuiviScolaireFormPage()));
              if (ok == true) _charger();
            },
            icon: const Icon(Icons.add_outlined),
            label: Text(tr('Nouveau suivi')),
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          ),
        ),
        const SizedBox(width: Cp.s1),
        OutlinedButton.icon(onPressed: _exporterCsv, icon: const Icon(Icons.download_outlined), label: Text(tr('Exporter CSV'))),
      ]),
      const SizedBox(height: Cp.s1),
      OutlinedButton.icon(onPressed: _charger, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Afficher'))),
      const SizedBox(height: Cp.s2),
      if (alertes > 0) ...[
        Text(alertes == 1 ? tr('1 suivi à accompagner, avec une moyenne en dessous de 10 sur 20.') : '$alertes ${tr('suivis à accompagner, avec une moyenne en dessous de 10 sur 20.')}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.goldDeep)),
        const SizedBox(height: Cp.s2),
      ],
      if (_loading)
        const Center(child: Padding(padding: EdgeInsets.all(Cp.s2), child: UxShimmerList()))
      else if (_error != null)
        Text(_error!, style: t.bodyMedium)
      else if (_suivis.isEmpty)
        Text(tr('Aucun suivi pour cette année.'), style: t.bodyMedium)
      else
        for (final r in _suivis) ...[
          Container(
            margin: const EdgeInsets.only(bottom: Cp.s1),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
            child: InkWell(
              borderRadius: BorderRadius.circular(24),
              onTap: () async {
                final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => SuiviScolaireFormPage(suivi: r)));
                if (ok == true) _charger();
              },
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Expanded(child: Text('${(r['membre_nom'] ?? '').toString()} · ${(r['matricule'] ?? '').toString()}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                    if (_scolaireAlerte(r))
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: const Color(0xFFFFF3E0), borderRadius: BorderRadius.circular(999)),
                        child: Text(tr('À accompagner'), style: const TextStyle(color: Color(0xFF8A6A12), fontWeight: FontWeight.w700, fontSize: 13)),
                      ),
                  ]),
                  const SizedBox(height: 4),
                  Text('${_scolaireClasse(r)} · ${(r['annee_scolaire'] ?? '').toString()}${(r['etablissement'] ?? '').toString().isEmpty ? '' : ' · ${(r['etablissement'] ?? '').toString()}'}', style: t.bodyMedium),
                  Text('${tr('Trimestre 1')} : ${_scolaireMoyenneTexte(r['moyenne_t1']).isEmpty ? tr('Non noté') : _scolaireMoyenneTexte(r['moyenne_t1'])} · ${tr('Trimestre 2')} : ${_scolaireMoyenneTexte(r['moyenne_t2']).isEmpty ? tr('Non noté') : _scolaireMoyenneTexte(r['moyenne_t2'])} · ${tr('Trimestre 3')} : ${_scolaireMoyenneTexte(r['moyenne_t3']).isEmpty ? tr('Non noté') : _scolaireMoyenneTexte(r['moyenne_t3'])}', style: t.bodyMedium),
                  if (_scolaireMoyenne(r['moyenne_annuelle']) != null) Text('${tr('Moyenne annuelle')} : ${_scolaireMoyenneTexte(r['moyenne_annuelle'])}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
                  if ((r['examen'] ?? false) == true) Text('${tr('Classe d’examen')}${_scolaireTypeExamenLabel((r['type_examen'] ?? '').toString().isEmpty ? null : (r['type_examen'] ?? '').toString()).isEmpty ? '' : ' · ${_scolaireTypeExamenLabel((r['type_examen'] ?? '').toString())}'}${_scolaireResultatLabel((r['resultat_examen'] ?? '').toString().isEmpty ? null : (r['resultat_examen'] ?? '').toString()).isEmpty ? '' : ' · ${_scolaireResultatLabel((r['resultat_examen'] ?? '').toString())}'}', style: t.bodyMedium),
                ]),
              ),
            ),
          ),
        ],
    ]);
  }
}

class SuiviScolaireFormPage extends StatefulWidget {
  const SuiviScolaireFormPage({super.key, this.suivi});
  final Map<String, dynamic>? suivi;
  @override
  State<SuiviScolaireFormPage> createState() => _SuiviScolaireFormPageState();
}

class _SuiviScolaireFormPageState extends State<SuiviScolaireFormPage> {
  bool _saving = false;
  String? _membreId;
  String _membreNom = '';
  String _membreMatricule = '';
  String? _classe;
  final _classeLibre = TextEditingController();
  final _annee = TextEditingController();
  final _t1 = TextEditingController();
  final _t2 = TextEditingController();
  final _t3 = TextEditingController();
  bool _examen = false;
  String? _typeExamen;
  String? _resultat;

  bool get _edition => widget.suivi != null;

  @override
  void initState() {
    super.initState();
    final r = widget.suivi;
    if (r == null) {
      _annee.text = _scolaireAnneeCourante();
    } else {
      _membreId = (r['membre_id'] ?? '').toString().isEmpty ? null : (r['membre_id'] ?? '').toString();
      _membreNom = (r['membre_nom'] ?? '').toString();
      _membreMatricule = (r['matricule'] ?? '').toString();
      _classe = (r['classe'] ?? '').toString().isEmpty ? null : (r['classe'] ?? '').toString();
      _classeLibre.text = (r['classe_libre'] ?? '').toString();
      _annee.text = (r['annee_scolaire'] ?? '').toString();
      _t1.text = _scolaireMoyenneTexte(r['moyenne_t1']);
      _t2.text = _scolaireMoyenneTexte(r['moyenne_t2']);
      _t3.text = _scolaireMoyenneTexte(r['moyenne_t3']);
      _examen = (r['examen'] ?? false) == true;
      _typeExamen = (r['type_examen'] ?? '').toString().isEmpty ? null : (r['type_examen'] ?? '').toString();
      _resultat = (r['resultat_examen'] ?? '').toString().isEmpty ? null : (r['resultat_examen'] ?? '').toString();
    }
  }

  @override
  void dispose() {
    _classeLibre.dispose();
    _annee.dispose();
    _t1.dispose();
    _t2.dispose();
    _t3.dispose();
    super.dispose();
  }

  Widget _champ(TextEditingController c, String label, {TextInputType? clavier}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: TextField(controller: c, keyboardType: clavier, decoration: InputDecoration(labelText: label, border: const OutlineInputBorder())),
    );
  }

  Future<void> _choisirMembre() async {
    try {
      final membres = await api.fetchAdminMembres();
      if (!mounted) return;
      if (membres.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final choix = await pick<Map<String, dynamic>>(context, tr('Choisir un membre'), membres, (m) => '${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}');
      if (choix != null) {
        setState(() {
          _membreId = (choix['id'] ?? '').toString();
          _membreNom = (choix['nom_complet'] ?? '').toString();
          _membreMatricule = (choix['matricule'] ?? '').toString();
        });
      }
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  double? _parseMoyenne(String texte, String trimestre) {
    final brut = texte.trim().replaceAll(',', '.');
    if (brut.isEmpty) return null;
    final v = double.tryParse(brut);
    if (v == null || v < 0 || v > 20) {
      toast(context, tr('Chaque moyenne doit être entre 0 et 20.'));
      return null;
    }
    return v;
  }

  Future<void> _enregistrer() async {
    if (_saving) return;
    if (_membreId == null || _membreId!.isEmpty) {
      toast(context, tr('Choisissez d’abord un membre.'));
      return;
    }
    if (_classe == null || _classe!.isEmpty) {
      toast(context, tr('Choisissez d’abord une classe.'));
      return;
    }
    if (_classe == 'Autre' && _classeLibre.text.trim().isEmpty) {
      toast(context, tr('Précisez la classe libre.'));
      return;
    }
    final annee = _annee.text.trim();
    if (annee.isEmpty) {
      toast(context, tr('L’année scolaire est requise.'));
      return;
    }
    final t1 = _parseMoyenne(_t1.text, 't1');
    final t2 = _parseMoyenne(_t2.text, 't2');
    final t3 = _parseMoyenne(_t3.text, 't3');
    if ((_t1.text.trim().isNotEmpty && t1 == null) || (_t2.text.trim().isNotEmpty && t2 == null) || (_t3.text.trim().isNotEmpty && t3 == null)) return;
    if (_examen && _typeExamen == null) {
      toast(context, tr('Choisissez le type d’examen.'));
      return;
    }
    final corps = <String, dynamic>{
      'membre_id': _membreId,
      'classe': _classe,
      'classe_libre': _classe == 'Autre' ? _classeLibre.text.trim() : null,
      'annee_scolaire': annee,
      'moyenne_t1': t1,
      'moyenne_t2': t2,
      'moyenne_t3': t3,
      'examen': _examen,
      'type_examen': _examen ? _typeExamen : null,
      'resultat_examen': _examen ? _resultat : null,
    };
    setState(() => _saving = true);
    try {
      if (_edition) {
        await api.updateSuiviScolaire((widget.suivi!['id'] ?? '').toString(), corps);
      } else {
        await api.createSuiviScolaire(corps);
      }
      if (!mounted) return;
      toast(context, tr('Suivi enregistré.'));
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible d’enregistrer le suivi.'));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final t1 = _scolaireMoyenne(_t1.text.trim().replaceAll(',', '.'));
    final t2 = _scolaireMoyenne(_t2.text.trim().replaceAll(',', '.'));
    final t3 = _scolaireMoyenne(_t3.text.trim().replaceAll(',', '.'));
    final annuelle = (t1 != null && t2 != null && t3 != null) ? (t1 + t2 + t3) / 3 : null;
    return basic(_edition ? tr('Modifier le suivi') : tr('Nouveau suivi'), [
      if (_edition) ...[
        Text('$_membreNom · $_membreMatricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
        const SizedBox(height: Cp.s2),
      ] else ...[
        if (_membreId == null)
          SizedBox(
            width: double.infinity,
            height: 52,
            child: OutlinedButton.icon(onPressed: _choisirMembre, icon: const Icon(Icons.person_search_outlined), label: Text(tr('Choisir un membre'))),
          )
        else
          Row(children: [
            Expanded(child: Text('$_membreNom · $_membreMatricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
            TextButton(onPressed: _choisirMembre, child: Text(tr('Changer'))),
          ]),
        const SizedBox(height: Cp.s2),
      ],
      DropdownButtonFormField<String?>(
        value: _classe,
        decoration: InputDecoration(labelText: tr('Classe'), border: const OutlineInputBorder()),
        items: [for (final c in _scolaireClasses) DropdownMenuItem<String?>(value: c, child: Text(c))],
        onChanged: (v) => setState(() => _classe = v),
      ),
      const SizedBox(height: Cp.s2),
      if (_classe == 'Autre') _champ(_classeLibre, tr('Classe libre')),
      _champ(_annee, tr('Année scolaire')),
      _champ(_t1, tr('Moyenne du trimestre 1, sur 20'), clavier: const TextInputType.numberWithOptions(decimal: true)),
      _champ(_t2, tr('Moyenne du trimestre 2, sur 20'), clavier: const TextInputType.numberWithOptions(decimal: true)),
      _champ(_t3, tr('Moyenne du trimestre 3, sur 20'), clavier: const TextInputType.numberWithOptions(decimal: true)),
      Text(tr('Laissez vide un trimestre non encore noté. La moyenne annuelle se calcule quand les trois trimestres sont renseignés.'), style: t.bodyMedium),
      if (annuelle != null) ...[
        const SizedBox(height: Cp.s1),
        Text('${tr('Moyenne annuelle')} : ${annuelle == annuelle.truncateToDouble() ? '${annuelle.toInt()}' : annuelle.toStringAsFixed(2)}', style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w700, color: Cp.navy)),
      ],
      const SizedBox(height: Cp.s2),
      SwitchListTile(
        title: Text(tr('Classe d’examen')),
        value: _examen,
        onChanged: (v) => setState(() => _examen = v),
      ),
      if (_examen) ...[
        const SizedBox(height: Cp.s1),
        DropdownButtonFormField<String?>(
          value: _typeExamen,
          decoration: InputDecoration(labelText: tr('Type d’examen'), border: const OutlineInputBorder()),
          items: [
            const DropdownMenuItem<String?>(value: 'bepc', child: Text('BEPC')),
            const DropdownMenuItem<String?>(value: 'bac', child: Text('BAC')),
            DropdownMenuItem<String?>(value: 'autre', child: Text(tr('Autre'))),
          ],
          onChanged: (v) => setState(() => _typeExamen = v),
        ),
        const SizedBox(height: Cp.s2),
        DropdownButtonFormField<String?>(
          value: _resultat,
          decoration: InputDecoration(labelText: tr('Résultat d’examen'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Non renseigné'))),
            DropdownMenuItem<String?>(value: 'admis', child: Text(tr('Admis'))),
            DropdownMenuItem<String?>(value: 'ajourne', child: Text(tr('Ajourné'))),
          ],
          onChanged: (v) => setState(() => _resultat = v),
        ),
        const SizedBox(height: Cp.s2),
      ],
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _saving ? null : _enregistrer,
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          child: Text(_saving ? tr('Enregistrement…') : tr('Enregistrer le suivi')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('Seul un responsable saisit ces moyennes, jamais le membre lui-même. Une fiche ne se supprime pas, elle se corrige par modification.'), style: t.bodyMedium),
    ]);
  }
}

// ───────────────────────── Attestations, 2 nov. 2026,
// tranche 3 des 7 propositions validées ─────────────────────────
// Bénévolat et participation, modèle unique HTML du serveur,
// avec le monogramme CP officiel, à ouvrir et imprimer en PDF
// sur une page A4. Délivrance par l'administration seulement,
// jamais par le membre lui-même. Aucune suppression en première
// version : une attestation délivrée reste consultable, une erreur
// se corrige en délivrant une nouvelle attestation. La page membre
// MesAttestationsPage est définie ici, avec les pages
// d'administration, et sa tuile dans Plus est la seule ligne
// ajoutée dans lib/main.dart, comme pour Mes résultats scolaires :
// sans cette tuile, la page membre serait du code mort.
String _attestationDate(dynamic v) {
  final s = (v ?? '').toString();
  if (s.length < 10) return '';
  final d = s.substring(0, 10).split('-');
  if (d.length != 3) return s.substring(0, 10);
  return '${d[2]}/${d[1]}/${d[0]}';
}

String _attestationTitre(String type) => type == 'benevolat' ? tr('Attestation de bénévolat') : tr('Attestation de participation');

Widget _attestationCarte(BuildContext context, Map<String, dynamic> a, {required Future<void> Function() onTelecharger, bool membre = false}) {
  final t = Theme.of(context).textTheme;
  final type = (a['type'] ?? '').toString();
  final debut = _attestationDate(a['date_debut']);
  final fin = _attestationDate(a['date_fin']);
  return Container(
    margin: const EdgeInsets.only(bottom: Cp.s1),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
    child: Padding(
      padding: const EdgeInsets.all(Cp.s2),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text(_attestationTitre(type), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          IconButton(icon: const Icon(Icons.open_in_new_outlined), tooltip: tr('Ouvrir l’attestation'), onPressed: onTelecharger),
        ]),
        if (!membre) Text('${(a['membre_nom'] ?? '').toString()} · ${(a['matricule'] ?? '').toString()}', style: t.bodyMedium),
        Text((a['activite'] ?? '').toString(), style: t.bodyMedium),
        if ((a['role_service'] ?? '').toString().isNotEmpty) Text('${tr('Rôle ou service rendu')} : ${(a['role_service'] ?? '').toString()}', style: t.bodyMedium),
        if (debut.isNotEmpty || fin.isNotEmpty) Text(debut.isNotEmpty && fin.isNotEmpty ? '${tr('Du')} $debut ${tr('au')} $fin' : '${tr('Date')} : ${debut.isNotEmpty ? debut : fin}', style: t.bodyMedium),
        Text('${tr('Référence')} : ${(a['reference'] ?? '').toString()} · ${tr('Délivrée le')} ${_attestationDate(a['delivre_le'])}', style: t.bodyMedium),
      ]),
    ),
  );
}

class AttestationsPage extends StatefulWidget {
  const AttestationsPage({super.key});
  @override
  State<AttestationsPage> createState() => _AttestationsPageState();
}

class _AttestationsPageState extends State<AttestationsPage> {
  List<Map<String, dynamic>> _liste = [];
  bool _loading = true;
  String? _erreur;
  String? _type;
  // Selection de l'ecran partage ordinateur, -1 veut dire
  // aucune attestation selectionnee. Telephone : jamais lu.
  int _selection = -1;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final liste = await api.fetchAttestations(type: _type);
      if (!mounted) return;
      setState(() {
        _liste = liste;
        _loading = false;
        _selection = liste.isEmpty ? -1 : (_selection < 0 ? 0 : _selection.clamp(0, liste.length - 1));
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  Future<void> _telecharger(Map<String, dynamic> a) async {
    try {
      final html = await api.fetchAttestationHtml((a['id'] ?? '').toString());
      final matricule = (a['matricule'] ?? '').toString().replaceAll(RegExp(r'[^A-Za-z0-9-]'), '');
      await openPrintDocument('attestation-${(a['type'] ?? '').toString()}-$matricule.html', html);
      if (mounted) toast(context, tr('Attestation ouverte, imprimez-la en PDF depuis le navigateur.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    // Ecran partage, ordinateur seulement, tranche 3 carte 17 :
    // liste a gauche, detail a droite, meme donnees serveur et
    // meme modele unique HTML du serveur que la liste
    // telephone, sans tampon officiel pretend ni signature
    // pre-remplie. Echap ferme
    // le detail, sans quitter la page. L'en-tete reste simple,
    // retour et titre, au lieu de l'en-tete complet de basic().
    if (Rx.isDesktop(context)) {
      final selectionnee = _selection >= 0 && _selection < _liste.length ? _liste[_selection] : null;
      return Focus(
        autofocus: true,
        child: CallbackShortcuts(
          bindings: {
            SingleActivator(LogicalKeyboardKey.escape): () {
              if (mounted) setState(() => _selection = -1);
            },
          },
          child: Scaffold(
            appBar: AppBar(backgroundColor: Cp.navy, foregroundColor: Colors.white, title: Text(tr('Attestations'))),
            body: SafeArea(
              child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
                SizedBox(
                  width: 380,
                  child: Column(children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, Cp.s1),
                      child: Column(children: [
                        SizedBox(
                          width: double.infinity,
                          height: 52,
                          child: FilledButton.icon(
                            onPressed: () async {
                              final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => const AttestationFormPage()));
                              if (ok == true) _charger();
                            },
                            icon: const Icon(Icons.add_outlined),
                            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
                            label: Text(tr('Délivrer une attestation')),
                          ),
                        ),
                        const SizedBox(height: Cp.s1),
                        DropdownButtonFormField<String?>(
                          value: _type,
                          decoration: InputDecoration(labelText: tr('Type'), border: const OutlineInputBorder()),
                          items: [
                            DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les types'))),
                            DropdownMenuItem<String?>(value: 'benevolat', child: Text(tr('Attestation de bénévolat'))),
                            DropdownMenuItem<String?>(value: 'participation', child: Text(tr('Attestation de participation'))),
                          ],
                          onChanged: (v) {
                            setState(() => _type = v);
                            _charger();
                          },
                        ),
                      ]),
                    ),
                    Expanded(
                      child: _loading
                          ? const Center(child: UxShimmerList())
                          : _erreur != null
                              ? ListView(children: [
                                  EmptyNote(icon: Icons.workspace_premium_outlined, text: _erreur!),
                                  Padding(
                                    padding: const EdgeInsets.all(Cp.s2),
                                    child: FilledButton.icon(onPressed: _charger, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
                                  ),
                                ])
                              : _liste.isEmpty
                                  ? ListView(children: [EmptyNote(icon: Icons.workspace_premium_outlined, text: tr('Aucune attestation délivrée pour le moment.'))])
                                  : ListView(children: [
                                      for (var i = 0; i < _liste.length; i++)
                                        InkWell(
                                          onTap: () => setState(() => _selection = i),
                                          child: Container(
                                            decoration: BoxDecoration(
                                              border: Border.all(color: _selection == i ? Cp.goldDeep : Colors.transparent, width: 2),
                                              borderRadius: BorderRadius.circular(26),
                                            ),
                                            child: _attestationCarte(context, _liste[i], onTelecharger: () => _telecharger(_liste[i])),
                                          ),
                                        ),
                                    ]),
                    ),
                  ]),
                ),
                const VerticalDivider(width: 1, color: Cp.line),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(Cp.s2),
                    child: selectionnee == null
                        ? Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            EmptyNote(icon: Icons.workspace_premium_outlined, text: tr('Sélectionnez une attestation dans la liste.')),
                            const SizedBox(height: Cp.s1),
                            Text(tr('Échap ferme ce détail, sans quitter la page.'), style: t.bodyMedium),
                          ])
                        : Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            _attestationCarte(context, selectionnee, onTelecharger: () => _telecharger(selectionnee)),
                            const SizedBox(height: Cp.s1),
                            FilledButton.icon(
                              onPressed: () => _telecharger(selectionnee),
                              icon: const Icon(Icons.download_outlined),
                              style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
                              label: Text(tr('Ouvrir l’attestation')),
                            ),
                            const SizedBox(height: Cp.s1),
                            Text(tr('L’attestation ouverte est celle du serveur, modèle unique. Une attestation délivrée reste consultable, elle ne se supprime pas. En cas d’erreur, délivrez-en une nouvelle.'), style: t.bodyMedium),
                            const SizedBox(height: Cp.s1),
                            Text(tr('Échap ferme ce détail, sans quitter la page.'), style: t.bodyMedium),
                          ]),
                  ),
                ),
              ]),
            ),
          ),
        ),
      );
    }
    return basic(tr('Attestations'), [
      Text(tr('Une attestation délivrée reste consultable, elle ne se supprime pas. En cas d’erreur, délivrez-en une nouvelle.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton.icon(
          onPressed: () async {
            final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => const AttestationFormPage()));
            if (ok == true) _charger();
          },
          icon: const Icon(Icons.add_outlined),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          label: Text(tr('Délivrer une attestation')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<String?>(
        value: _type,
        decoration: InputDecoration(labelText: tr('Type'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les types'))),
          DropdownMenuItem<String?>(value: 'benevolat', child: Text(tr('Attestation de bénévolat'))),
          DropdownMenuItem<String?>(value: 'participation', child: Text(tr('Attestation de participation'))),
        ],
        onChanged: (v) {
          setState(() => _type = v);
          _charger();
        },
      ),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: UxShimmerList())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.workspace_premium_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _charger, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_liste.isEmpty)
        EmptyNote(icon: Icons.workspace_premium_outlined, text: tr('Aucune attestation délivrée pour le moment.'))
      else
        for (final a in _liste) _attestationCarte(context, a, onTelecharger: () => _telecharger(a)),
    ]);
  }
}

class AttestationFormPage extends StatefulWidget {
  const AttestationFormPage({super.key});
  @override
  State<AttestationFormPage> createState() => _AttestationFormPageState();
}

class _AttestationFormPageState extends State<AttestationFormPage> {
  bool _saving = false;
  String? _membreId;
  String _membreNom = '';
  String _membreMatricule = '';
  String? _type;
  final _activite = TextEditingController();
  final _debut = TextEditingController();
  final _fin = TextEditingController();
  final _role = TextEditingController();

  @override
  void dispose() {
    _activite.dispose();
    _debut.dispose();
    _fin.dispose();
    _role.dispose();
    super.dispose();
  }

  Future<void> _choisirMembre() async {
    try {
      final membres = await api.fetchAdminMembres();
      if (!mounted) return;
      if (membres.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final choix = await pick<Map<String, dynamic>>(context, tr('Choisir un membre'), membres, (m) => '${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}');
      if (choix != null) {
        setState(() {
          _membreId = (choix['id'] ?? '').toString();
          _membreNom = (choix['nom_complet'] ?? '').toString();
          _membreMatricule = (choix['matricule'] ?? '').toString();
        });
      }
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  bool _dateValide(String s) => s.isEmpty || RegExp(r'^\d{4}-\d{2}-\d{2}$').hasMatch(s);

  Future<void> _enregistrer() async {
    if (_saving) return;
    if (_membreId == null || _membreId!.isEmpty) {
      toast(context, tr('Choisissez d’abord un membre.'));
      return;
    }
    if (_type == null || _type!.isEmpty) {
      toast(context, tr('Choisissez d’abord un type.'));
      return;
    }
    if (_activite.text.trim().isEmpty) {
      toast(context, tr('L’activité ou le service est requis.'));
      return;
    }
    final debut = _debut.text.trim();
    final fin = _fin.text.trim();
    if (!_dateValide(debut) || !_dateValide(fin)) {
      toast(context, tr('Les dates doivent être au format AAAA-MM-JJ.'));
      return;
    }
    if (debut.isNotEmpty && fin.isNotEmpty && fin.compareTo(debut) < 0) {
      toast(context, tr('La date de fin ne peut pas précéder la date de début.'));
      return;
    }
    setState(() => _saving = true);
    try {
      await api.createAttestation({
        'membre_id': _membreId,
        'type': _type,
        'activite': _activite.text.trim(),
        'date_debut': debut.isEmpty ? null : debut,
        'date_fin': fin.isEmpty ? null : fin,
        'role_service': _role.text.trim().isEmpty ? null : _role.text.trim(),
      });
      if (!mounted) return;
      toast(context, tr('Attestation délivrée.'));
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible de délivrer l’attestation.'));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Widget _champ(TextEditingController c, String label, {String? hint}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: TextField(controller: c, decoration: InputDecoration(labelText: label, hintText: hint, border: const OutlineInputBorder())),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Délivrer une attestation'), [
      if (_membreId == null)
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(onPressed: _choisirMembre, icon: const Icon(Icons.person_search_outlined), label: Text(tr('Choisir un membre'))),
        )
      else
        Row(children: [
          Expanded(child: Text('$_membreNom · $_membreMatricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          TextButton(onPressed: _choisirMembre, child: Text(tr('Changer'))),
        ]),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<String?>(
        value: _type,
        decoration: InputDecoration(labelText: tr('Type'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem<String?>(value: 'benevolat', child: Text(tr('Attestation de bénévolat'))),
          DropdownMenuItem<String?>(value: 'participation', child: Text(tr('Attestation de participation'))),
        ],
        onChanged: (v) => setState(() => _type = v),
      ),
      const SizedBox(height: Cp.s2),
      _champ(_activite, tr('Activité ou service')),
      _champ(_debut, tr('Date de début, facultative'), hint: 'AAAA-MM-JJ'),
      _champ(_fin, tr('Date de fin, facultative'), hint: 'AAAA-MM-JJ'),
      _champ(_role, tr('Rôle ou service rendu, facultatif')),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _saving ? null : _enregistrer,
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          child: Text(_saving ? tr('Enregistrement…') : tr('Délivrer l’attestation')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('Seule l’administration délivre une attestation, jamais le membre lui-même. L’attestation ne porte aucune signature inventée.'), style: t.bodyMedium),
    ]);
  }
}

class MesAttestationsPage extends StatefulWidget {
  const MesAttestationsPage({super.key});
  @override
  State<MesAttestationsPage> createState() => _MesAttestationsPageState();
}

class _MesAttestationsPageState extends State<MesAttestationsPage> {
  List<Map<String, dynamic>> _liste = [];
  bool _loading = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final liste = await api.fetchMesAttestations();
      if (!mounted) return;
      setState(() {
        _liste = liste;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  Future<void> _telecharger(Map<String, dynamic> a) async {
    try {
      final html = await api.fetchAttestationHtml((a['id'] ?? '').toString(), membre: true);
      final matricule = (a['matricule'] ?? '').toString().replaceAll(RegExp(r'[^A-Za-z0-9-]'), '');
      await openPrintDocument('attestation-${(a['type'] ?? '').toString()}-$matricule.html', html);
      if (mounted) toast(context, tr('Attestation ouverte, imprimez-la en PDF depuis le navigateur.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Mes attestations'), [
      Text(tr('Ces attestations ont été délivrées par la structure, elles ne se créent pas ici. Seules vos propres attestations sont affichées.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: UxShimmerList())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.workspace_premium_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _charger, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_liste.isEmpty)
        EmptyNote(icon: Icons.workspace_premium_outlined, text: tr('Aucune attestation délivrée pour le moment.'))
      else
        for (final a in _liste) _attestationCarte(context, a, membre: true, onTelecharger: () => _telecharger(a)),
    ]);
  }
}

// ───────────────────────── Planning des responsables, 2 nov. 2026,
// tranche 4 des 7 propositions validées ─────────────────────────
// Espace structure seulement, jamais une vue membre. Une ligne par
// activité confiée à un responsable, un jour, des horaires en
// option. Le serveur calcule les conflits, même jour, horaires qui
// se chevauchent, ou même jour sans horaires, et les renvoie dans
// chaque ligne : la pastille Conflit est un avertissement, jamais
// un blocage, la création et la modification restent possibles.
// Aucune suppression en première version. Export CSV seulement,
// pas de PDF, l'application ne génère pas de PDF côté client.
String _planningHeure(dynamic v) {
  final s = (v ?? '').toString();
  if (s.length < 5) return '';
  return s.substring(0, 5);
}

List<Map<String, dynamic>> _planningConflits(dynamic v) {
  if (v is! List) return [];
  return [for (final c in v) if (c is Map<String, dynamic>) c];
}

Widget _planningCarte(BuildContext context, Map<String, dynamic> p, {required VoidCallback onModifier}) {
  final t = Theme.of(context).textTheme;
  final conflits = _planningConflits(p['conflits']);
  final debut = _planningHeure(p['heure_debut']);
  final fin = _planningHeure(p['heure_fin']);
  return Container(
    margin: const EdgeInsets.only(bottom: Cp.s1),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
    child: Padding(
      padding: const EdgeInsets.all(Cp.s2),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text((p['activite'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          if (conflits.isNotEmpty)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(color: const Color(0xFFFDECEA), borderRadius: BorderRadius.circular(20)),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                const Icon(Icons.warning_amber_outlined, size: 16, color: Color(0xFF9B1C1C)),
                const SizedBox(width: 4),
                Text(tr('Conflit'), style: t.bodySmall?.copyWith(fontWeight: FontWeight.w800, color: const Color(0xFF9B1C1C))),
              ]),
            ),
          IconButton(icon: const Icon(Icons.edit_outlined), tooltip: tr('Modifier'), onPressed: onModifier),
        ]),
        Text('${(p['membre_nom'] ?? '').toString()} · ${(p['matricule'] ?? '').toString()}', style: t.bodyMedium),
        Text('${_attestationDate(p['date'])}${debut.isNotEmpty || fin.isNotEmpty ? ' · $debut${fin.isNotEmpty ? ' - $fin' : ''}' : ''}', style: t.bodyMedium),
        if ((p['role_service'] ?? '').toString().isNotEmpty) Text('${tr('Rôle ou service')} : ${(p['role_service'] ?? '').toString()}', style: t.bodyMedium),
        if ((p['evenement_nom'] ?? '').toString().isNotEmpty) Text('${tr('Événement')} : ${(p['evenement_nom'] ?? '').toString()}', style: t.bodyMedium),
        if ((p['etablissement'] ?? '').toString().isNotEmpty) Text((p['etablissement'] ?? '').toString(), style: t.bodyMedium),
        for (final c in conflits)
          Text('${tr('En conflit avec')} : ${(c['activite'] ?? '').toString()}${_planningHeure(c['heure_debut']).isNotEmpty || _planningHeure(c['heure_fin']).isNotEmpty ? ' (${_planningHeure(c['heure_debut'])}${_planningHeure(c['heure_fin']).isNotEmpty ? ' - ${_planningHeure(c['heure_fin'])}' : ''})' : ''}', style: t.bodyMedium?.copyWith(color: const Color(0xFF9B1C1C))),
      ]),
    ),
  );
}

class PlanningResponsablesPage extends StatefulWidget {
  const PlanningResponsablesPage({super.key});
  @override
  State<PlanningResponsablesPage> createState() => _PlanningResponsablesPageState();
}

class _PlanningResponsablesPageState extends State<PlanningResponsablesPage> {
  DateTime _mois = DateTime(DateTime.now().year, DateTime.now().month);
  String? _etabId;
  String? _membreId;
  List<Map<String, dynamic>> _etabs = [];
  List<Map<String, dynamic>> _membres = [];
  List<Map<String, dynamic>> _liste = [];
  bool _loading = true;
  String? _erreur;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final liste = await api.fetchPlannings(mois: _rapportMoisParam(_mois), etablissementId: _etabId, membreId: _membreId);
      List<Map<String, dynamic>> etabs = _etabs;
      List<Map<String, dynamic>> membres = _membres;
      if (_general && etabs.isEmpty) etabs = await api.fetchEtablissements();
      if (membres.isEmpty) membres = await api.fetchAdminMembres();
      if (!mounted) return;
      setState(() {
        _liste = liste;
        _etabs = etabs;
        _membres = membres;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  void _changerMois(int decalage) {
    setState(() => _mois = DateTime(_mois.year, _mois.month + decalage));
    _charger();
  }

  Future<void> _exporterCsv() async {
    if (_liste.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final csv = <String>[
      [tr('Date'), tr('Responsable'), tr('Matricule'), tr('Établissement'), tr('Activité'), tr('Rôle ou service'), tr('Événement'), tr('Début'), tr('Fin'), tr('Conflit')].map(_csvChamp).join(';')
    ];
    for (final p in _liste) {
      final conflits = _planningConflits(p['conflits']);
      csv.add([
        _csvChamp(_attestationDate(p['date'])),
        _csvChamp((p['membre_nom'] ?? '').toString()),
        _csvChamp((p['matricule'] ?? '').toString()),
        _csvChamp((p['etablissement'] ?? '').toString()),
        _csvChamp((p['activite'] ?? '').toString()),
        _csvChamp((p['role_service'] ?? '').toString()),
        _csvChamp((p['evenement_nom'] ?? '').toString()),
        _csvChamp(_planningHeure(p['heure_debut'])),
        _csvChamp(_planningHeure(p['heure_fin'])),
        _csvChamp(conflits.isEmpty ? tr('Non') : tr('Oui')),
      ].join(';'));
    }
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(csv.join('\n'))];
      await downloadBytesFile('plannings-${_rapportMoisParam(_mois)}.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Planning exporté.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Planning des responsables'), [
      Text(tr('Un avertissement de conflit ne bloque jamais : il signale seulement que le même responsable a déjà une activité le même jour, aux mêmes horaires ou sans horaires.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton.icon(
          onPressed: () async {
            final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => const PlanningFormPage()));
            if (ok == true) _charger();
          },
          icon: const Icon(Icons.add_outlined),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          label: Text(tr('Ajouter au planning')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      Row(children: [
        IconButton(tooltip: tr('Mois précédent'), icon: const Icon(Icons.chevron_left_outlined), onPressed: () => _changerMois(-1)),
        Expanded(child: Text(_rapportMoisLabel(_mois), textAlign: TextAlign.center, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
        IconButton(tooltip: tr('Mois suivant'), icon: const Icon(Icons.chevron_right_outlined), onPressed: () => _changerMois(1)),
      ]),
      if (_general) ...[
        const SizedBox(height: Cp.s1),
        DropdownButtonFormField<String?>(
          value: _etabId,
          decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les établissements'))),
            for (final e in _etabs) DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) {
            setState(() => _etabId = v);
            _charger();
          },
        ),
      ],
      const SizedBox(height: Cp.s1),
      DropdownButtonFormField<String?>(
        value: _membreId,
        decoration: InputDecoration(labelText: tr('Responsable'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les responsables'))),
          for (final m in _membres) DropdownMenuItem<String?>(value: (m['id'] ?? '').toString(), child: Text('${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}')),
        ],
        onChanged: (v) {
          setState(() => _membreId = v);
          _charger();
        },
      ),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: UxShimmerList())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.event_note_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _charger, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_liste.isEmpty)
        EmptyNote(icon: Icons.event_note_outlined, text: tr('Aucun planning pour ce mois.'))
      else ...[
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(onPressed: _exporterCsv, icon: const Icon(Icons.download_outlined), label: Text(tr('Exporter en CSV'))),
        ),
        const SizedBox(height: Cp.s2),
        for (final p in _liste)
          _planningCarte(context, p, onModifier: () async {
            final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => PlanningFormPage(existant: p)));
            if (ok == true) _charger();
          }),
      ],
    ]);
  }
}

class PlanningFormPage extends StatefulWidget {
  const PlanningFormPage({this.existant, super.key});
  final Map<String, dynamic>? existant;
  @override
  State<PlanningFormPage> createState() => _PlanningFormPageState();
}

class _PlanningFormPageState extends State<PlanningFormPage> {
  bool _saving = false;
  String? _membreId;
  String _membreNom = '';
  String _membreMatricule = '';
  String? _evenementId;
  final _activite = TextEditingController();
  final _date = TextEditingController();
  final _debut = TextEditingController();
  final _fin = TextEditingController();
  final _role = TextEditingController();

  bool get _modification => widget.existant != null;

  @override
  void initState() {
    super.initState();
    final e = widget.existant;
    if (e != null) {
      _membreId = (e['membre_id'] ?? '').toString();
      _membreNom = (e['membre_nom'] ?? '').toString();
      _membreMatricule = (e['matricule'] ?? '').toString();
      _evenementId = (e['evenement_id'] ?? '').toString().isEmpty ? null : (e['evenement_id'] ?? '').toString();
      _activite.text = (e['activite'] ?? '').toString();
      _date.text = (e['date'] ?? '').toString().length >= 10 ? (e['date'] ?? '').toString().substring(0, 10) : '';
      _debut.text = _planningHeure(e['heure_debut']);
      _fin.text = _planningHeure(e['heure_fin']);
      _role.text = (e['role_service'] ?? '').toString();
    }
  }

  @override
  void dispose() {
    _activite.dispose();
    _date.dispose();
    _debut.dispose();
    _fin.dispose();
    _role.dispose();
    super.dispose();
  }

  Future<void> _choisirMembre() async {
    try {
      final membres = await api.fetchAdminMembres();
      if (!mounted) return;
      if (membres.isEmpty) {
        toast(context, tr('Aucun membre dans votre périmètre.'));
        return;
      }
      final choix = await pick<Map<String, dynamic>>(context, tr('Choisir un membre'), membres, (m) => '${m['nom_complet'] ?? ''} · ${m['matricule'] ?? ''}');
      if (choix != null) {
        setState(() {
          _membreId = (choix['id'] ?? '').toString();
          _membreNom = (choix['nom_complet'] ?? '').toString();
          _membreMatricule = (choix['matricule'] ?? '').toString();
        });
      }
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  bool _dateValide(String s) => RegExp(r'^\d{4}-\d{2}-\d{2}$').hasMatch(s);
  bool _heureValide(String s) => s.isEmpty || RegExp(r'^\d{2}:\d{2}$').hasMatch(s);

  Future<void> _enregistrer() async {
    if (_saving) return;
    if (_membreId == null || _membreId!.isEmpty) {
      toast(context, tr('Choisissez d’abord un membre.'));
      return;
    }
    if (_activite.text.trim().isEmpty) {
      toast(context, tr('L’activité est requise.'));
      return;
    }
    final date = _date.text.trim();
    if (!_dateValide(date)) {
      toast(context, tr('La date doit être au format AAAA-MM-JJ.'));
      return;
    }
    final debut = _debut.text.trim();
    final fin = _fin.text.trim();
    if (!_heureValide(debut) || !_heureValide(fin)) {
      toast(context, tr('Les heures doivent être au format HH:MM.'));
      return;
    }
    if (debut.isNotEmpty && fin.isNotEmpty && fin.compareTo(debut) < 0) {
      toast(context, tr('L’heure de fin ne peut pas précéder l’heure de début.'));
      return;
    }
    setState(() => _saving = true);
    try {
      final corps = <String, dynamic>{
        'membre_id': _membreId,
        'activite': _activite.text.trim(),
        'evenement_id': _evenementId,
        'date': date,
        'heure_debut': debut.isEmpty ? null : debut,
        'heure_fin': fin.isEmpty ? null : fin,
        'role_service': _role.text.trim().isEmpty ? null : _role.text.trim(),
      };
      final resultat = _modification
          ? await api.updatePlanning((widget.existant!['id'] ?? '').toString(), corps)
          : await api.createPlanning(corps);
      if (!mounted) return;
      final conflits = _planningConflits(resultat['conflits']);
      toast(context, conflits.isEmpty ? tr('Planning enregistré.') : tr('Planning enregistré, avec un avertissement de conflit.'));
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible d’enregistrer le planning.'));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Widget _champ(TextEditingController c, String label, {String? hint}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Cp.s2),
      child: TextField(controller: c, decoration: InputDecoration(labelText: label, hintText: hint, border: const OutlineInputBorder())),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final camps = app.camps.where((c) => c.serverId.isNotEmpty).toList();
    return basic(_modification ? tr('Modifier le planning') : tr('Ajouter au planning'), [
      if (_membreId == null)
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(onPressed: _choisirMembre, icon: const Icon(Icons.person_search_outlined), label: Text(tr('Choisir un membre'))),
        )
      else
        Row(children: [
          Expanded(child: Text('$_membreNom · $_membreMatricule', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          if (!_modification) TextButton(onPressed: _choisirMembre, child: Text(tr('Changer'))),
        ]),
      const SizedBox(height: Cp.s2),
      _champ(_activite, tr('Activité')),
      _champ(_date, tr('Date'), hint: 'AAAA-MM-JJ'),
      _champ(_debut, tr('Heure de début, facultative'), hint: 'HH:MM'),
      _champ(_fin, tr('Heure de fin, facultative'), hint: 'HH:MM'),
      _champ(_role, tr('Rôle ou service, facultatif')),
      DropdownButtonFormField<String?>(
        value: _evenementId,
        decoration: InputDecoration(labelText: tr('Événement, facultatif'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem<String?>(value: null, child: Text(tr('Aucun événement'))),
          for (final c in camps) DropdownMenuItem<String?>(value: c.serverId, child: Text(c.name)),
        ],
        onChanged: (v) => setState(() => _evenementId = v),
      ),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _saving ? null : _enregistrer,
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          child: Text(_saving ? tr('Enregistrement…') : tr('Enregistrer le planning')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('Le responsable ne se change pas en modification : créez un planning pour l’autre responsable. Un conflit signalé ne bloque jamais l’enregistrement.'), style: t.bodyMedium),
    ]);
  }
}

// ───────────────────────── Suivi des nouveaux membres, 2 nov. 2026,
// tranche 5 des 7 propositions validées ─────────────────────────
// Espace structure seulement, jamais une vue membre. La liste vient
// du serveur, avec le statut calculé par lui : Contacté si un contact
// est noté, Rappel 30 jours puis Rappel 7 jours si aucun contact et
// 30 ou 7 jours écoulés depuis l'inscription, sinon En suivi. Les
// deux rappels sont deux niveaux du même état sans contact, pas deux
// notifications séparées, et aucun e-mail ni SMS automatique n'est
// créé ici. Aucune suppression en première version : une erreur se
// corrige en notant un nouveau contact. Export CSV seulement, pas
// de PDF, l'application ne génère pas de PDF côté client.
String _nouveauStatutLabel(String statut) {
  switch (statut) {
    case 'contacte':
      return tr('Contacté');
    case 'rappel_7':
      return tr('Rappel 7 jours');
    case 'rappel_30':
      return tr('Rappel 30 jours');
    default:
      return tr('En suivi');
  }
}

Color _nouveauStatutFond(String statut) {
  switch (statut) {
    case 'contacte':
      return const Color(0xFFEAF5EC);
    case 'rappel_30':
      return const Color(0xFFFDECEA);
    case 'rappel_7':
      return const Color(0xFFFFF4D6);
    default:
      return const Color(0xFFF5F6FA);
  }
}

Color _nouveauStatutTexte(String statut) {
  switch (statut) {
    case 'contacte':
      return const Color(0xFF1E6B2E);
    case 'rappel_30':
      return const Color(0xFF9B1C1C);
    case 'rappel_7':
      return const Color(0xFF7A5A00);
    default:
      return Cp.navy;
  }
}

Widget _nouveauCarte(BuildContext context, Map<String, dynamic> m, {required VoidCallback onNoter}) {
  final t = Theme.of(context).textTheme;
  final statut = (m['statut'] ?? 'en_suivi').toString();
  final jours = m['jours_ecoules'];
  final dernier = (m['dernier_contact'] ?? '').toString();
  return Container(
    margin: const EdgeInsets.only(bottom: Cp.s1),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
    child: Padding(
      padding: const EdgeInsets.all(Cp.s2),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text((m['nom_complet'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(color: _nouveauStatutFond(statut), borderRadius: BorderRadius.circular(20)),
            child: Text(_nouveauStatutLabel(statut), style: t.bodySmall?.copyWith(fontWeight: FontWeight.w800, color: _nouveauStatutTexte(statut))),
          ),
        ]),
        Text((m['matricule'] ?? '').toString(), style: t.bodyMedium),
        if ((m['etablissement'] ?? '').toString().isNotEmpty) Text((m['etablissement'] ?? '').toString(), style: t.bodyMedium),
        Text('${tr('Inscrit le')} ${_attestationDate(m['inscrit_le'])} · ${tr('Jours écoulés')} : ${jours is num ? jours.toInt().toString() : (jours ?? '').toString()}', style: t.bodyMedium),
        Text('${tr('Dernier contact')} : ${dernier.length >= 10 ? _attestationDate(dernier) : tr('Aucun contact noté')}', style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          child: OutlinedButton.icon(onPressed: onNoter, icon: const Icon(Icons.phone_outlined), label: Text(tr('Noter un contact'))),
        ),
      ]),
    ),
  );
}

class NouveauxMembresPage extends StatefulWidget {
  const NouveauxMembresPage({super.key});
  @override
  State<NouveauxMembresPage> createState() => _NouveauxMembresPageState();
}

class _NouveauxMembresPageState extends State<NouveauxMembresPage> {
  String? _statut;
  String? _etabId;
  List<Map<String, dynamic>> _etabs = [];
  List<Map<String, dynamic>> _liste = [];
  bool _loading = true;
  String? _erreur;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final liste = await api.fetchNouveauxMembres(statut: _statut, etablissementId: _etabId);
      List<Map<String, dynamic>> etabs = _etabs;
      if (_general && etabs.isEmpty) etabs = await api.fetchEtablissements();
      if (!mounted) return;
      setState(() {
        _liste = liste;
        _etabs = etabs;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  Future<void> _exporterCsv() async {
    if (_liste.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final csv = <String>[
      [tr('Nom'), tr('Matricule'), tr('Établissement'), tr('Inscrit le'), tr('Jours écoulés'), tr('Dernier contact'), tr('Statut')].map(_csvChamp).join(';')
    ];
    for (final m in _liste) {
      final dernier = (m['dernier_contact'] ?? '').toString();
      csv.add([
        _csvChamp((m['nom_complet'] ?? '').toString()),
        _csvChamp((m['matricule'] ?? '').toString()),
        _csvChamp((m['etablissement'] ?? '').toString()),
        _csvChamp(_attestationDate(m['inscrit_le'])),
        _csvChamp((m['jours_ecoules'] ?? '').toString()),
        _csvChamp(dernier.length >= 10 ? _attestationDate(dernier) : tr('Aucun contact noté')),
        _csvChamp(_nouveauStatutLabel((m['statut'] ?? 'en_suivi').toString())),
      ].join(';'));
    }
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(csv.join('\n'))];
      await downloadBytesFile('nouveaux-membres.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Nouveaux membres exportés.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Suivi des nouveaux membres'), [
      Text(tr('Un rappel affiché n’envoie aucun e-mail ni SMS : c’est une liste à traiter, pas une notification automatique.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<String?>(
        value: _statut,
        decoration: InputDecoration(labelText: tr('Statut'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les statuts'))),
          DropdownMenuItem<String?>(value: 'contacte', child: Text(tr('Contacté'))),
          DropdownMenuItem<String?>(value: 'rappel_7', child: Text(tr('Rappel 7 jours'))),
          DropdownMenuItem<String?>(value: 'rappel_30', child: Text(tr('Rappel 30 jours'))),
          DropdownMenuItem<String?>(value: 'en_suivi', child: Text(tr('En suivi'))),
        ],
        onChanged: (v) {
          setState(() => _statut = v);
          _charger();
        },
      ),
      if (_general) ...[
        const SizedBox(height: Cp.s1),
        DropdownButtonFormField<String?>(
          value: _etabId,
          decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les établissements'))),
            for (final e in _etabs) DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) {
            setState(() => _etabId = v);
            _charger();
          },
        ),
      ],
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: UxShimmerList())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.person_add_alt_1_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _charger, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_liste.isEmpty)
        EmptyNote(icon: Icons.person_add_alt_1_outlined, text: tr('Aucun nouveau membre dans votre périmètre.'))
      else ...[
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(onPressed: _exporterCsv, icon: const Icon(Icons.download_outlined), label: Text(tr('Exporter en CSV'))),
        ),
        const SizedBox(height: Cp.s2),
        for (final m in _liste)
          _nouveauCarte(context, m, onNoter: () async {
            final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => ContactMembreFormPage(membre: m)));
            if (ok == true) _charger();
          }),
      ],
    ]);
  }
}

// ───────────────────────── Liste d'attente de camp, 2 nov. 2026,
// tranche 6 des 7 propositions validées ─────────────────────────
// Espace structure seulement. La file n'existe que si une capacité
// est fixée pour le camp, et seulement quand elle est atteinte.
// Proposer une place ne crée ni inscription ni paiement, elle
// reste une proposition : l'inscription normale reste à faire
// ensuite par le membre ou la structure. Aucune suppression en
// première version, une erreur se corrige en proposant la place
// suivante ou en fixant une nouvelle capacité.
String _attenteStatutLabel(String statut) => statut == 'place_proposee' ? tr('Place proposée') : tr('En attente');

class ListeAttentePage extends StatefulWidget {
  const ListeAttentePage({super.key});
  @override
  State<ListeAttentePage> createState() => _ListeAttentePageState();
}

class _ListeAttentePageState extends State<ListeAttentePage> {
  String? _campId;
  Map<String, dynamic>? _data;
  bool _loading = false;
  String? _error;
  bool _saving = false;
  final _capacite = TextEditingController();

  List<Camp> get _camps => app.camps.where((c) => c.serverId.isNotEmpty).toList();

  @override
  void initState() {
    super.initState();
    final camps = _camps;
    if (camps.isNotEmpty) {
      _campId = camps.first.serverId;
      _charger();
    }
  }

  @override
  void dispose() {
    _capacite.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    final id = _campId;
    if (id == null || id.isEmpty) return;
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await api.fetchListeAttente(id);
      if (!mounted) return;
      final camp = data['camp'] is Map ? Map<String, dynamic>.from(data['camp'] as Map) : <String, dynamic>{};
      final places = (camp['nombre_places'] as num?)?.toInt();
      _capacite.text = places == null ? '' : places.toString();
      setState(() {
        _data = data;
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

  Future<void> _fixerCapacite() async {
    final id = _campId;
    if (id == null || id.isEmpty || _saving) return;
    final texte = _capacite.text.trim();
    int? places;
    if (texte.isNotEmpty) {
      places = int.tryParse(texte);
      if (places == null || places <= 0) {
        toast(context, tr('Le nombre de places doit être un entier positif, ou vide pour le retirer.'));
        return;
      }
    }
    setState(() => _saving = true);
    try {
      await api.fixerCapaciteCamp(id, places);
      if (!mounted) return;
      toast(context, tr('Capacité enregistrée.'));
      setState(() => _saving = false);
      _charger();
    } catch (e) {
      if (!mounted) return;
      setState(() => _saving = false);
      toast(context, '$e');
    }
  }

  Future<void> _proposer(String demandeId) async {
    try {
      await api.proposerPlaceAttente(demandeId);
      if (!mounted) return;
      toast(context, tr('Place proposée, sans inscription ni paiement automatique.'));
      _charger();
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    final camps = _camps;
    final camp = _data?['camp'] is Map ? Map<String, dynamic>.from(_data!['camp'] as Map) : <String, dynamic>{};
    final attente = _comptaLignes(_data?['attente']);
    final places = (camp['nombre_places'] as num?)?.toInt();
    final inscrits = (camp['inscrits'] as num?)?.toInt() ?? 0;
    final restantes = places == null ? null : (places - inscrits < 0 ? 0 : places - inscrits);
    return basic(tr('Liste d’attente de camp'), [
      Text(tr('La liste d’attente n’existe que si l’administration a fixé un nombre de places ; elle ne crée ni inscription ni paiement.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      if (camps.isEmpty)
        EmptyNote(icon: Icons.list_alt_outlined, text: tr('Aucun camp publié.'))
      else ...[
        DropdownButtonFormField<String>(
          value: _campId,
          decoration: InputDecoration(labelText: tr('Camp'), border: const OutlineInputBorder()),
          items: [for (final c in camps) DropdownMenuItem(value: c.serverId, child: Text(c.name))],
          onChanged: (v) {
            setState(() => _campId = v);
            _charger();
          },
        ),
        const SizedBox(height: Cp.s1),
        TextField(
          controller: _capacite,
          keyboardType: TextInputType.number,
          decoration: InputDecoration(labelText: tr('Nombre de places'), hintText: tr('Vide pour retirer le nombre de places'), border: const OutlineInputBorder()),
        ),
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(onPressed: _saving ? null : _fixerCapacite, icon: const Icon(Icons.save_outlined), label: Text(_saving ? tr('Enregistrement…') : tr('Fixer le nombre de places'))),
        ),
        const SizedBox(height: Cp.s2),
        if (_loading)
          const Center(child: UxShimmerList())
        else if (_error != null)
          Column(children: [
            EmptyNote(icon: Icons.list_alt_outlined, text: _error!),
            const SizedBox(height: Cp.s1),
            FilledButton.icon(onPressed: _charger, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
          ])
        else ...[
          Text('${tr('Capacité fixée')} : ${places == null ? tr('Non fixée') : places.toString()}', style: t.bodyMedium),
          Text('${tr('Inscrits')} : $inscrits', style: t.bodyMedium),
          Text('${tr('Places restantes')} : ${restantes == null ? tr('Non fixée') : restantes.toString()}', style: t.bodyMedium),
          const SizedBox(height: Cp.s2),
          if (attente.isEmpty)
            EmptyNote(icon: Icons.list_alt_outlined, text: tr('Aucune personne sur la liste d’attente pour ce camp.'))
          else
            for (final m in attente) ...[
              Container(
                margin: const EdgeInsets.only(bottom: Cp.s1),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
                child: Padding(
                  padding: const EdgeInsets.all(Cp.s2),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Row(children: [
                      Expanded(child: Text((m['nom_complet'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: Cp.card, borderRadius: BorderRadius.circular(20)),
                        child: Text(_attenteStatutLabel((m['statut'] ?? 'en_attente').toString()), style: t.bodySmall?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
                      ),
                    ]),
                    Text((m['matricule'] ?? '').toString(), style: t.bodyMedium),
                    if ((m['etablissement'] ?? '').toString().isNotEmpty) Text((m['etablissement'] ?? '').toString(), style: t.bodyMedium),
                    if ((m['position'] as num?) != null) Text('${tr('Position')} : ${(m['position'] as num).toInt()}', style: t.bodyMedium),
                    Text('${tr('Inscrit le')} ${_attestationDate((m['cree_le'] ?? '').toString())}', style: t.bodyMedium),
                    if ((m['statut'] ?? '').toString() == 'en_attente') ...[
                      const SizedBox(height: Cp.s1),
                      SizedBox(
                        width: double.infinity,
                        child: OutlinedButton.icon(onPressed: () => _proposer((m['id'] ?? '').toString()), icon: const Icon(Icons.check_outlined), label: Text(tr('Proposer une place'))),
                      ),
                    ],
                  ]),
                ),
              ),
            ],
        ],
      ],
    ]);
  }
}

class ContactMembreFormPage extends StatefulWidget {
  const ContactMembreFormPage({required this.membre, super.key});
  final Map<String, dynamic> membre;
  @override
  State<ContactMembreFormPage> createState() => _ContactMembreFormPageState();
}

class _ContactMembreFormPageState extends State<ContactMembreFormPage> {
  bool _saving = false;
  String _canal = 'appel';
  final _date = TextEditingController();
  final _note = TextEditingController();

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _date.text = '${now.year.toString().padLeft(4, '0')}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}';
  }

  @override
  void dispose() {
    _date.dispose();
    _note.dispose();
    super.dispose();
  }

  Future<void> _enregistrer() async {
    if (_saving) return;
    final date = _date.text.trim();
    if (!RegExp(r'^\d{4}-\d{2}-\d{2}$').hasMatch(date)) {
      toast(context, tr('La date du contact doit être au format AAAA-MM-JJ.'));
      return;
    }
    setState(() => _saving = true);
    try {
      await api.noterContactMembre((widget.membre['id'] ?? '').toString(), {
        'date_contact': date,
        'canal': _canal,
        'note': _note.text.trim().isEmpty ? null : _note.text.trim(),
      });
      if (!mounted) return;
      toast(context, tr('Contact noté.'));
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible d’enregistrer le contact.'));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Noter un contact'), [
      Text('${(widget.membre['nom_complet'] ?? '').toString()} · ${(widget.membre['matricule'] ?? '').toString()}', style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy)),
      const SizedBox(height: Cp.s2),
      TextField(controller: _date, decoration: InputDecoration(labelText: tr('Date du contact'), hintText: 'AAAA-MM-JJ', border: const OutlineInputBorder())),
      const SizedBox(height: Cp.s1),
      DropdownButtonFormField<String>(
        value: _canal,
        decoration: InputDecoration(labelText: tr('Canal'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem<String>(value: 'appel', child: Text(tr('Appel'))),
          DropdownMenuItem<String>(value: 'visite', child: Text(tr('Visite'))),
          DropdownMenuItem<String>(value: 'message', child: Text(tr('Message'))),
          DropdownMenuItem<String>(value: 'autre', child: Text(tr('Autre'))),
        ],
        onChanged: (v) {
          if (v != null) setState(() => _canal = v);
        },
      ),
      const SizedBox(height: Cp.s1),
      TextField(controller: _note, maxLines: 3, decoration: InputDecoration(labelText: tr('Note, facultative'), border: const OutlineInputBorder())),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _saving ? null : _enregistrer,
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          child: Text(_saving ? tr('Enregistrement…') : tr('Enregistrer le contact')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('Une erreur se corrige en notant un nouveau contact : l’ancien contact reste dans l’historique, il n’est jamais effacé.'), style: t.bodyMedium),
    ]);
  }
}

// ───────────────────────── Inventaire du matériel, 2 nov. 2026,
// tranche 7 des 7 propositions validées ─────────────────────────
// Espace structure seulement. Une fiche par matériel, sans valeur
// financière dans cette tranche, sans prix inventé. Aucune
// suppression en première version, une erreur se corrige en
// modifiant la fiche.
String _materielEtatLabel(String etat) => etat == 'a_reparer' ? tr('À réparer') : etat == 'hors_service' ? tr('Hors service') : tr('Bon');

Color _materielEtatCouleur(String etat) => etat == 'a_reparer' ? const Color(0xFF9A6A00) : etat == 'hors_service' ? const Color(0xFF9B1C1C) : const Color(0xFF1E6B3A);

Color _materielEtatFond(String etat) => etat == 'a_reparer' ? const Color(0xFFFFF3D6) : etat == 'hors_service' ? const Color(0xFFFDECEA) : const Color(0xFFE7F4E9);

class InventairePage extends StatefulWidget {
  const InventairePage({super.key});
  @override
  State<InventairePage> createState() => _InventairePageState();
}

class _InventairePageState extends State<InventairePage> {
  String? _etat;
  String? _etabId;
  List<Map<String, dynamic>> _etabs = [];
  List<Map<String, dynamic>> _liste = [];
  bool _loading = true;
  String? _erreur;

  bool get _general => app.isAdminGeneral;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final liste = await api.fetchMateriels(etat: _etat, etablissementId: _etabId);
      List<Map<String, dynamic>> etabs = _etabs;
      if (_general && etabs.isEmpty) etabs = await api.fetchEtablissements();
      if (!mounted) return;
      setState(() {
        _liste = liste;
        _etabs = etabs;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  Future<void> _exporterCsv() async {
    if (_liste.isEmpty) {
      toast(context, tr('Aucune ligne à exporter.'));
      return;
    }
    final csv = <String>[
      [tr('Nom'), tr('Catégorie'), tr('Quantité'), tr('État'), tr('Lieu'), tr('Établissement')].map(_csvChamp).join(';')
    ];
    for (final m in _liste) {
      final quantite = m['quantite'];
      csv.add([
        _csvChamp((m['nom'] ?? '').toString()),
        _csvChamp((m['categorie'] ?? '').toString()),
        _csvChamp(quantite == null ? tr('Non précisée') : quantite.toString()),
        _csvChamp(_materielEtatLabel((m['etat'] ?? '').toString())),
        _csvChamp((m['lieu'] ?? '').toString()),
        _csvChamp((m['etablissement'] ?? '').toString()),
      ].join(';'));
    }
    try {
      final bytes = <int>[0xEF, 0xBB, 0xBF, ...utf8.encode(csv.join(String.fromCharCode(10)))];
      await downloadBytesFile('inventaire.csv', bytes, 'text/csv');
      if (mounted) toast(context, tr('Inventaire exporté.'));
    } catch (e) {
      if (mounted) toast(context, '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Inventaire du matériel'), [
      Text(tr('Chaque matériel de la structure, son état et son lieu, sans valeur financière dans cette version.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton.icon(
          onPressed: () async {
            final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => const MaterielFormPage()));
            if (ok == true) _charger();
          },
          icon: const Icon(Icons.add_outlined),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          label: Text(tr('Ajouter un matériel')),
        ),
      ),
      const SizedBox(height: Cp.s2),
      DropdownButtonFormField<String?>(
        value: _etat,
        decoration: InputDecoration(labelText: tr('État'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les états'))),
          DropdownMenuItem<String?>(value: 'bon', child: Text(tr('Bon'))),
          DropdownMenuItem<String?>(value: 'a_reparer', child: Text(tr('À réparer'))),
          DropdownMenuItem<String?>(value: 'hors_service', child: Text(tr('Hors service'))),
        ],
        onChanged: (v) {
          setState(() => _etat = v);
          _charger();
        },
      ),
      if (_general) ...[
        const SizedBox(height: Cp.s1),
        DropdownButtonFormField<String?>(
          value: _etabId,
          decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Tous les établissements'))),
            for (final e in _etabs) DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) {
            setState(() => _etabId = v);
            _charger();
          },
        ),
      ],
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Center(child: UxShimmerList())
      else if (_erreur != null)
        Column(children: [
          EmptyNote(icon: Icons.inventory_2_outlined, text: _erreur!),
          const SizedBox(height: Cp.s1),
          FilledButton.icon(onPressed: _charger, icon: const Icon(Icons.refresh_outlined), label: Text(tr('Actualiser'))),
        ])
      else if (_liste.isEmpty)
        EmptyNote(icon: Icons.inventory_2_outlined, text: tr('Aucun matériel dans l’inventaire.'))
      else ...[
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(onPressed: _exporterCsv, icon: const Icon(Icons.download_outlined), label: Text(tr('Exporter en CSV'))),
        ),
        const SizedBox(height: Cp.s2),
        for (final m in _liste)
          _materielCarte(context, m, onModifier: () async {
            final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => MaterielFormPage(existant: m)));
            if (ok == true) _charger();
          }),
      ],
    ]);
  }
}

Widget _materielCarte(BuildContext context, Map<String, dynamic> m, {required VoidCallback onModifier}) {
  final t = Theme.of(context).textTheme;
  final etat = (m['etat'] ?? '').toString();
  final quantite = m['quantite'];
  return Container(
    margin: const EdgeInsets.only(bottom: Cp.s1),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Cp.line)),
    child: Padding(
      padding: const EdgeInsets.all(Cp.s2),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text((m['nom'] ?? '').toString(), style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(color: _materielEtatFond(etat), borderRadius: BorderRadius.circular(20)),
            child: Text(_materielEtatLabel(etat), style: t.bodySmall?.copyWith(fontWeight: FontWeight.w800, color: _materielEtatCouleur(etat))),
          ),
          IconButton(icon: const Icon(Icons.edit_outlined), tooltip: tr('Modifier'), onPressed: onModifier),
        ]),
        if ((m['categorie'] ?? '').toString().isNotEmpty) Text((m['categorie'] ?? '').toString(), style: t.bodyMedium),
        Text('${tr('Quantité')} : ${quantite == null ? tr('Non précisée') : quantite.toString()}', style: t.bodyMedium),
        if ((m['lieu'] ?? '').toString().isNotEmpty) Text((m['lieu'] ?? '').toString(), style: t.bodyMedium),
        if ((m['etablissement'] ?? '').toString().isNotEmpty) Text((m['etablissement'] ?? '').toString(), style: t.bodyMedium),
      ]),
    ),
  );
}

class MaterielFormPage extends StatefulWidget {
  const MaterielFormPage({this.existant, super.key});
  final Map<String, dynamic>? existant;
  @override
  State<MaterielFormPage> createState() => _MaterielFormPageState();
}

class _MaterielFormPageState extends State<MaterielFormPage> {
  bool _saving = false;
  final _nom = TextEditingController();
  final _categorie = TextEditingController();
  final _quantite = TextEditingController();
  final _lieu = TextEditingController();
  String _etat = 'bon';
  String? _etabId;
  List<Map<String, dynamic>> _etabs = [];

  bool get _general => app.isAdminGeneral;
  bool get _modification => widget.existant != null;

  @override
  void initState() {
    super.initState();
    final e = widget.existant;
    if (e != null) {
      _nom.text = (e['nom'] ?? '').toString();
      _categorie.text = (e['categorie'] ?? '').toString();
      _quantite.text = e['quantite'] == null ? '' : e['quantite'].toString();
      _lieu.text = (e['lieu'] ?? '').toString();
      _etat = (e['etat'] ?? 'bon').toString();
      _etabId = (e['etablissement_id'] as dynamic)?.toString();
    }
    if (_general) {
      api.fetchEtablissements().then((v) {
        if (mounted) setState(() => _etabs = v);
      }).catchError((_) {});
    }
  }

  @override
  void dispose() {
    _nom.dispose();
    _categorie.dispose();
    _quantite.dispose();
    _lieu.dispose();
    super.dispose();
  }

  Future<void> _enregistrer() async {
    if (_nom.text.trim().isEmpty) {
      toast(context, tr('Le nom est requis.'));
      return;
    }
    int? quantite;
    final quantiteTexte = _quantite.text.trim();
    if (quantiteTexte.isNotEmpty) {
      quantite = int.tryParse(quantiteTexte);
      if (quantite == null || quantite <= 0) {
        toast(context, tr('La quantité doit être un entier positif, ou vide pour ne pas la préciser.'));
        return;
      }
    }
    setState(() => _saving = true);
    try {
      // Pour un administrateur d'établissement, l'établissement
      // n'est pas choisi ici : le serveur rattache la fiche à son
      // établissement, et refuse un matériel sans établissement.
      final corps = <String, dynamic>{
        'nom': _nom.text.trim(),
        'categorie': _categorie.text.trim().isEmpty ? null : _categorie.text.trim(),
        'quantite': quantite,
        'etat': _etat,
        'lieu': _lieu.text.trim().isEmpty ? null : _lieu.text.trim(),
        'etablissement_id': _general ? _etabId : null,
      };
      if (_modification) {
        await api.updateMateriel((widget.existant!['id'] ?? '').toString(), corps);
      } else {
        await api.createMateriel(corps);
      }
      if (!mounted) return;
      toast(context, tr('Matériel enregistré.'));
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (mounted) toast(context, e.message);
    } catch (_) {
      if (mounted) toast(context, tr('Impossible d’enregistrer le matériel.'));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr(_modification ? 'Modifier le matériel' : 'Ajouter un matériel'), [
      TextField(controller: _nom, decoration: InputDecoration(labelText: tr('Nom'), border: const OutlineInputBorder())),
      const SizedBox(height: Cp.s1),
      TextField(controller: _categorie, decoration: InputDecoration(labelText: tr('Catégorie, facultative'), border: const OutlineInputBorder())),
      const SizedBox(height: Cp.s1),
      TextField(controller: _quantite, keyboardType: TextInputType.number, decoration: InputDecoration(labelText: tr('Quantité, facultative'), border: const OutlineInputBorder())),
      const SizedBox(height: Cp.s1),
      DropdownButtonFormField<String>(
        value: _etat,
        decoration: InputDecoration(labelText: tr('État'), border: const OutlineInputBorder()),
        items: [
          DropdownMenuItem<String>(value: 'bon', child: Text(tr('Bon'))),
          DropdownMenuItem<String>(value: 'a_reparer', child: Text(tr('À réparer'))),
          DropdownMenuItem<String>(value: 'hors_service', child: Text(tr('Hors service'))),
        ],
        onChanged: (v) {
          if (v != null) setState(() => _etat = v);
        },
      ),
      const SizedBox(height: Cp.s1),
      TextField(controller: _lieu, decoration: InputDecoration(labelText: tr('Lieu, facultatif'), border: const OutlineInputBorder())),
      if (_general) ...[
        const SizedBox(height: Cp.s1),
        DropdownButtonFormField<String?>(
          value: _etabId,
          decoration: InputDecoration(labelText: tr('Établissement'), border: const OutlineInputBorder()),
          items: [
            DropdownMenuItem<String?>(value: null, child: Text(tr('Aucun établissement'))),
            for (final e in _etabs) DropdownMenuItem<String?>(value: (e['id'] ?? '').toString(), child: Text((e['nom'] ?? '').toString())),
          ],
          onChanged: (v) => setState(() => _etabId = v),
        ),
      ] else ...[
        const SizedBox(height: Cp.s1),
        Text(tr('Matériel rattaché à votre établissement.'), style: t.bodyMedium),
      ],
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _saving ? null : _enregistrer,
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          child: Text(_saving ? tr('Enregistrement…') : tr('Enregistrer le matériel')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('Une erreur se corrige en modifiant la fiche : aucun matériel n’est effacé dans cette version.'), style: t.bodyMedium),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════════════
// ÉLECTIONS, CARTE 76, 7 NOV. 2026
// ═══════════════════════════════════════════════════════════════════
// La structure crée l'élection avant son début, avec dates de début
// et de fin et candidats désignés par matricule. Hors période, les
// membres ne voient rien ; la tuile Élections de l'Espace structure,
// elle, reste visible pour l'administrateur général, pour préparer
// l'élection. Pendant le vote, les résultats sont visibles ici pour
// la structure seulement, jamais pour les membres. Un vote par
// membre, imposé côté serveur. Aucune suppression : une élection se
// clôt plus tôt en avançant sa date de fin, une erreur de titre ou
// de dates se corrige avant le début par Modifier.

String electionStatutLabel(String statut) {
  switch (statut) {
    case 'en_cours':
      return tr('En cours');
    case 'terminee':
      return tr('Terminée');
    default:
      return tr('À venir');
  }
}

/// Liste des élections, administrateur général seulement.
class ElectionsAdminPage extends StatefulWidget {
  const ElectionsAdminPage({super.key});
  @override
  State<ElectionsAdminPage> createState() => _ElectionsAdminPageState();
}

class _ElectionsAdminPageState extends State<ElectionsAdminPage> {
  List<Map<String, dynamic>> _liste = [];
  bool _loading = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final liste = await api.fetchElectionsAdmin();
      if (!mounted) return;
      setState(() {
        _liste = liste;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(tr('Élections'), [
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton.icon(
          onPressed: () async {
            final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => const ElectionsCreationPage()));
            if (ok == true) _charger();
          },
          icon: const Icon(Icons.add_outlined),
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          label: Text(tr('Nouvelle élection')),
        ),
      ),
      const SizedBox(height: Cp.s1),
      Text(tr('Une seule élection à la fois : une nouvelle période ne doit pas chevaucher une élection existante.'), style: t.bodyMedium),
      const SizedBox(height: Cp.s2),
      if (_loading)
        const Padding(padding: EdgeInsets.all(24), child: UxShimmerList(itemCount: 3))
      else if (_erreur != null)
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(_erreur!, style: t.bodyMedium),
          const SizedBox(height: Cp.s2),
          SizedBox(height: 52, child: OutlinedButton(onPressed: _charger, child: Text(tr('Réessayer')))),
        ])
      else if (_liste.isEmpty)
        EmptyNote(icon: Icons.check_circle_outlined, text: tr('Aucune élection créée pour le moment.'))
      else
        for (final e in _liste) ...[
          Builder(builder: (_) {
            final id = (e['id'] ?? '').toString();
            final debut = DateTime.tryParse((e['date_debut'] ?? '').toString());
            final fin = DateTime.tryParse((e['date_fin'] ?? '').toString());
            return Card(
              child: ListTile(
                leading: const Icon(Icons.check_circle_outlined, color: Cp.navy),
                title: Text((e['titre'] ?? '').toString(), style: t.titleMedium),
                subtitle: Text(
                  '${electionStatutLabel((e['statut'] ?? '').toString())}'
                  '${(e['poste'] ?? '').toString().isNotEmpty ? ' · ${(e['poste'] ?? '').toString()}' : ''}'
                  '${debut != null && fin != null ? '\n${tr('Du')} ${formatDateHeure(debut)} ${tr('au')} ${formatDateHeure(fin)}' : ''}'
                  '\n${(e['nb_candidats'] as num?)?.toInt() ?? 0} ${tr('candidats')} · ${(e['nb_votes'] as num?)?.toInt() ?? 0} ${tr('votes')}',
                  style: t.bodyMedium,
                ),
                trailing: const Icon(Icons.chevron_right_outlined, color: Cp.inkMuted),
                onTap: () async {
                  await Navigator.of(context).push(MaterialPageRoute(builder: (_) => ElectionsAdminDetailPage(electionId: id)));
                  _charger();
                },
              ),
            );
          }),
        ],
    ], actions: [IconButton(icon: const Icon(Icons.refresh), onPressed: _charger, tooltip: tr('Réessayer'))]);
  }
}

/// Détail d'une élection, avec résultats en direct pour la structure.
class ElectionsAdminDetailPage extends StatefulWidget {
  const ElectionsAdminDetailPage({super.key, required this.electionId});
  final String electionId;
  @override
  State<ElectionsAdminDetailPage> createState() => _ElectionsAdminDetailPageState();
}

class _ElectionsAdminDetailPageState extends State<ElectionsAdminDetailPage> {
  Map<String, dynamic>? _detail;
  bool _loading = true;
  String? _erreur;
  final _matricule = TextEditingController();
  bool _ajout = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _matricule.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final detail = await api.fetchElectionAdmin(widget.electionId);
      if (!mounted) return;
      setState(() {
        _detail = detail;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = '$e';
      });
    }
  }

  Future<void> _ajouterCandidat() async {
    final matricule = _matricule.text.trim().toUpperCase();
    if (matricule.isEmpty) {
      toast(context, tr('Saisissez le matricule du candidat, celui de sa carte de membre.'));
      return;
    }
    setState(() => _ajout = true);
    try {
      await api.ajouterCandidatElection(widget.electionId, matricule);
      if (!mounted) return;
      _matricule.clear();
      toast(context, tr('Candidat ajouté.'));
      _charger();
    } catch (e) {
      if (mounted) toast(context, e is ApiException ? e.message : '$e');
    } finally {
      if (mounted) setState(() => _ajout = false);
    }
  }

  Future<void> _cloreMaintenant() async {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Clore l’élection maintenant')),
        content: Text(tr('Le vote s’arrête aussitôt. Les résultats restent visibles ici pour la structure.')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Clore l’élection'))),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      await api.modifierElection(widget.electionId, {'date_fin': DateTime.now().toUtc().toIso8601String()});
      if (!mounted) return;
      toast(context, tr('Élection clôturée.'));
      _charger();
    } catch (e) {
      if (mounted) toast(context, e is ApiException ? e.message : '$e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    if (_loading) {
      return basic(tr('Élection'), [const Padding(padding: EdgeInsets.all(24), child: UxShimmerList(itemCount: 3))]);
    }
    if (_erreur != null || _detail == null) {
      return basic(tr('Élection'), [
        Text(_erreur ?? tr('Élection introuvable.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s2),
        SizedBox(height: 52, child: OutlinedButton(onPressed: _charger, child: Text(tr('Réessayer')))),
      ]);
    }
    final d = _detail!;
    final statut = (d['statut'] ?? '').toString();
    final candidats = (d['candidats'] as List?) ?? [];
    final total = (d['total_voix'] as num?)?.toInt() ?? 0;
    final debut = DateTime.tryParse((d['date_debut'] ?? '').toString());
    final fin = DateTime.tryParse((d['date_fin'] ?? '').toString());
    String? tete;
    if (statut == 'terminee' && total > 0) {
      var max = -1;
      final premiers = <String>[];
      for (final cand in candidats.whereType<Map>()) {
        final voix = (cand['voix'] as num?)?.toInt() ?? 0;
        if (voix > max) {
          max = voix;
          premiers
            ..clear()
            ..add((cand['nom'] ?? '').toString());
        } else if (voix == max) {
          premiers.add((cand['nom'] ?? '').toString());
        }
      }
      if (premiers.length == 1) {
        tete = '${tr('En tête')} : ${premiers.first} ($max ${tr('voix')})';
      } else if (premiers.length > 1) {
        tete = '${tr('Égalité en tête entre')} ${premiers.join(', ')} ($max ${tr('voix')})';
      }
    }
    return basic((d['titre'] ?? '').toString(), [
      Container(
        width: double.infinity,
        padding: const EdgeInsets.all(Cp.s2),
        decoration: BoxDecoration(color: Cp.navy, borderRadius: BorderRadius.circular(Cp.radiusCard)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(electionStatutLabel(statut), style: t.titleMedium?.copyWith(color: Cp.gold)),
          if ((d['poste'] ?? '').toString().isNotEmpty) ...[
            const SizedBox(height: 4),
            Text((d['poste'] ?? '').toString(), style: t.titleMedium?.copyWith(color: Colors.white)),
          ],
          if ((d['description'] ?? '').toString().isNotEmpty) ...[
            const SizedBox(height: 4),
            Text((d['description'] ?? '').toString(), style: t.bodyMedium?.copyWith(color: Colors.white)),
          ],
          if (debut != null && fin != null) ...[
            const SizedBox(height: 8),
            Text('${tr('Du')} ${formatDateHeure(debut)}', style: t.bodyMedium?.copyWith(color: Colors.white)),
            Text('${tr('Au')} ${formatDateHeure(fin)}', style: t.bodyMedium?.copyWith(color: Colors.white)),
          ],
          const SizedBox(height: 8),
          Text('$total ${tr('votes')}', style: t.bodyMedium?.copyWith(color: Colors.white)),
        ]),
      ),
      const SizedBox(height: Cp.s2),
      if (tete != null)
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(Cp.s2),
          decoration: BoxDecoration(
            color: Cp.gold.withValues(alpha: 0.12),
            borderRadius: BorderRadius.circular(Cp.radiusCard),
            border: Border.all(color: Cp.gold),
          ),
          child: Text(tete, style: t.titleMedium),
        ),
      if (tete != null) const SizedBox(height: Cp.s2),
      Text(tr('Candidats'), style: t.titleMedium),
      const SizedBox(height: Cp.s1),
      if (candidats.isEmpty)
        Text(tr('Aucun candidat pour le moment.'), style: t.bodyMedium)
      else
        for (final cand in candidats.whereType<Map>()) ...[
          Builder(builder: (_) {
            final voix = (cand['voix'] as num?)?.toInt() ?? 0;
            final part = total > 0 ? (voix * 100 / total) : 0.0;
            return Card(
              child: ListTile(
                leading: const Icon(Icons.check_circle_outlined, color: Cp.navy),
                title: Text((cand['nom'] ?? '').toString(), style: t.titleMedium),
                subtitle: Text(
                  '${(cand['fonction'] ?? '').toString().isNotEmpty ? '${(cand['fonction'] ?? '').toString()} · ' : ''}${(cand['matricule'] ?? '').toString()}',
                  style: t.bodyMedium,
                ),
                trailing: Text('$voix ${tr('voix')}${total > 0 ? ' · ${part.toStringAsFixed(0)} %' : ''}', style: t.titleMedium),
              ),
            );
          }),
        ],
      const SizedBox(height: Cp.s2),
      if (statut == 'a_venir') ...[
        Text(tr('Ajouter un candidat'), style: t.titleMedium),
        const SizedBox(height: Cp.s1),
        Text(tr('Par matricule, celui de sa carte de membre. Les candidats ne peuvent plus être ajoutés après le début.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        TextField(
          controller: _matricule,
          textCapitalization: TextCapitalization.characters,
          decoration: InputDecoration(
            labelText: tr('Matricule du candidat'),
            hintText: tr('Par exemple CP-AA-2526'),
            border: const OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: Cp.s1),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton(
            onPressed: _ajout ? null : _ajouterCandidat,
            style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
            child: Text(_ajout ? tr('Ajout…') : tr('Ajouter ce candidat')),
          ),
        ),
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(
            icon: const Icon(Icons.edit_outlined),
            label: Text(tr('Modifier l’élection')),
            onPressed: () async {
              final ok = await Navigator.of(context).push<bool>(MaterialPageRoute(builder: (_) => ElectionsCreationPage(election: d)));
              if (ok == true) _charger();
            },
          ),
        ),
      ],
      if (statut == 'en_cours') ...[
        Text(tr('Élection en cours : les candidats ne peuvent plus être ajoutés. Les résultats sont visibles ici pour la structure seulement, jamais pour les membres pendant le vote.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s2),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(
            icon: const Icon(Icons.check_circle_outlined),
            label: Text(tr('Clore l’élection maintenant')),
            onPressed: _cloreMaintenant,
          ),
        ),
      ],
      if (statut == 'terminee')
        Text(tr('Élection terminée. Les résultats ci-dessus sont ceux de la structure ; pour les annoncer aux membres, publiez une actualité.'), style: t.bodyMedium),
    ], actions: [IconButton(icon: const Icon(Icons.refresh), onPressed: _charger, tooltip: tr('Réessayer'))]);
  }
}

/// Création d'une élection, ou modification avant le début.
/// Les candidats, par matricule, ne se saisissent qu'à la création ;
/// après, ils s'ajoutent depuis le détail, tant que l'élection n'a
/// pas commencé.
class ElectionsCreationPage extends StatefulWidget {
  const ElectionsCreationPage({super.key, this.election});
  final Map<String, dynamic>? election;
  @override
  State<ElectionsCreationPage> createState() => _ElectionsCreationPageState();
}

class _ElectionsCreationPageState extends State<ElectionsCreationPage> {
  final _titre = TextEditingController();
  final _poste = TextEditingController();
  final _description = TextEditingController();
  final _matricules = <TextEditingController>[TextEditingController(), TextEditingController()];
  DateTime? _debut;
  DateTime? _fin;
  bool _saving = false;

  bool get _modification => widget.election != null;

  @override
  void initState() {
    super.initState();
    final e = widget.election;
    if (e != null) {
      _titre.text = (e['titre'] ?? '').toString();
      _poste.text = (e['poste'] ?? '').toString();
      _description.text = (e['description'] ?? '').toString();
      _debut = DateTime.tryParse((e['date_debut'] ?? '').toString());
      _fin = DateTime.tryParse((e['date_fin'] ?? '').toString());
    } else {
      final now = DateTime.now();
      _debut = DateTime(now.year, now.month, now.day, 8, 0).add(const Duration(days: 1));
      _fin = DateTime(now.year, now.month, now.day, 18, 0).add(const Duration(days: 2));
    }
  }

  @override
  void dispose() {
    _titre.dispose();
    _poste.dispose();
    _description.dispose();
    for (final c in _matricules) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _choisirDateHeure({required DateTime? initial, required ValueChanged<DateTime> onChoisi, required String aide}) async {
    final now = DateTime.now();
    final start = initial ?? now;
    final date = await showDatePicker(
      context: context,
      initialDate: start,
      firstDate: DateTime(2020),
      lastDate: DateTime(2100),
      helpText: aide,
      cancelText: tr('Annuler'),
      confirmText: tr('Confirmer'),
      builder: (ctx, child) => Theme(
        data: Theme.of(ctx).copyWith(
          colorScheme: const ColorScheme.light(primary: Cp.navy, onPrimary: Colors.white, surface: Colors.white, onSurface: Cp.navy),
        ),
        child: child!,
      ),
    );
    if (date == null || !mounted) return;
    final time = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.fromDateTime(start),
      helpText: aide,
      cancelText: tr('Annuler'),
      confirmText: tr('Confirmer'),
      builder: (ctx, child) => Theme(
        data: Theme.of(ctx).copyWith(
          colorScheme: const ColorScheme.light(primary: Cp.navy, onPrimary: Colors.white, surface: Colors.white, onSurface: Cp.navy),
        ),
        child: child!,
      ),
    );
    if (time == null || !mounted) return;
    onChoisi(DateTime(date.year, date.month, date.day, time.hour, time.minute));
  }

  Future<void> _enregistrer() async {
    final titre = _titre.text.trim();
    if (titre.isEmpty) {
      toast(context, tr('Saisissez le titre de l’élection.'));
      return;
    }
    if (_debut == null || _fin == null) {
      toast(context, tr('Choisissez les dates de début et de fin.'));
      return;
    }
    if (!(_fin!.isAfter(_debut!))) {
      toast(context, tr('La date de fin doit être après la date de début.'));
      return;
    }
    final matricules = _modification
        ? <String>[]
        : _matricules.map((c) => c.text.trim().toUpperCase()).where((m) => m.isNotEmpty).toList();
    if (!_modification && matricules.isEmpty) {
      toast(context, tr('Ajoutez au moins un candidat, par son matricule.'));
      return;
    }
    setState(() => _saving = true);
    try {
      if (_modification) {
        await api.modifierElection((widget.election!['id'] ?? '').toString(), {
          'titre': titre,
          'description': _description.text.trim(),
          'poste': _poste.text.trim(),
          'date_debut': _debut!.toUtc().toIso8601String(),
          'date_fin': _fin!.toUtc().toIso8601String(),
        });
      } else {
        await api.creerElection(
          titre: titre,
          description: _description.text.trim(),
          poste: _poste.text.trim(),
          debut: _debut!,
          fin: _fin!,
          matricules: matricules,
        );
      }
      if (!mounted) return;
      toast(context, _modification ? tr('Élection modifiée.') : tr('Élection créée.'));
      Navigator.of(context).pop(true);
    } catch (e) {
      if (mounted) toast(context, e is ApiException ? e.message : '$e');
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Widget _ligneDateHeure(String label, DateTime? valeur, ValueChanged<DateTime> onChoisi, String aide) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(label, style: Theme.of(context).textTheme.titleSmall),
      const SizedBox(height: 4),
      Text(valeur == null ? tr('Aucune date choisie.') : formatDateHeure(valeur), style: Theme.of(context).textTheme.bodyMedium),
      TextButton.icon(
        icon: const Icon(Icons.calendar_month_outlined, size: 18),
        label: Text(valeur == null ? tr('Choisir une date et une heure') : tr('Changer la date et l’heure')),
        onPressed: () => _choisirDateHeure(initial: valeur, onChoisi: onChoisi, aide: aide),
      ),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return basic(_modification ? tr('Modifier l’élection') : tr('Nouvelle élection'), [
      TextField(
        controller: _titre,
        decoration: InputDecoration(labelText: tr('Titre'), hintText: tr('Par exemple Élection du Bureau'), border: const OutlineInputBorder()),
      ),
      const SizedBox(height: Cp.s1),
      TextField(
        controller: _poste,
        decoration: InputDecoration(labelText: tr('Poste'), hintText: tr('Par exemple Président'), border: const OutlineInputBorder()),
      ),
      const SizedBox(height: Cp.s1),
      TextField(
        controller: _description,
        maxLines: 3,
        decoration: InputDecoration(labelText: tr('Description'), border: const OutlineInputBorder()),
      ),
      const SizedBox(height: Cp.s2),
      _ligneDateHeure(tr('Début du vote'), _debut, (v) => setState(() => _debut = v), tr('Choisissez la date de début')),
      const SizedBox(height: Cp.s1),
      _ligneDateHeure(tr('Fin du vote'), _fin, (v) => setState(() => _fin = v), tr('Choisissez la date de fin')),
      const SizedBox(height: Cp.s1),
      Text(tr('Le vote est ouvert du début à la fin, bornes comprises. Hors période, les membres ne voient rien.'), style: t.bodyMedium),
      if (!_modification) ...[
        const SizedBox(height: Cp.s2),
        Text(tr('Candidats, par matricule'), style: t.titleMedium),
        const SizedBox(height: Cp.s1),
        Text(tr('Le matricule est celui de la carte de membre. Le nom et la fonction affichés sont ceux du membre.'), style: t.bodyMedium),
        const SizedBox(height: Cp.s1),
        for (var i = 0; i < _matricules.length; i++) ...[
          Row(children: [
            Expanded(
              child: TextField(
                controller: _matricules[i],
                textCapitalization: TextCapitalization.characters,
                decoration: InputDecoration(labelText: '${tr('Matricule du candidat')} ${i + 1}', hintText: tr('Par exemple CP-AA-2526'), border: const OutlineInputBorder()),
              ),
            ),
            if (_matricules.length > 1)
              IconButton(
                icon: const Icon(Icons.close_outlined),
                tooltip: tr('Retirer'),
                onPressed: () => setState(() {
                  _matricules[i].dispose();
                  _matricules.removeAt(i);
                }),
              ),
          ]),
          const SizedBox(height: Cp.s1),
        ],
        TextButton.icon(
          icon: const Icon(Icons.add_outlined),
          label: Text(tr('Ajouter un candidat')),
          onPressed: () => setState(() => _matricules.add(TextEditingController())),
        ),
      ],
      const SizedBox(height: Cp.s2),
      SizedBox(
        width: double.infinity,
        height: 52,
        child: FilledButton(
          onPressed: _saving ? null : _enregistrer,
          style: FilledButton.styleFrom(backgroundColor: Cp.gold, foregroundColor: Cp.navy),
          child: Text(_saving ? tr('Enregistrement…') : (_modification ? tr('Enregistrer les modifications') : tr('Créer l’élection'))),
        ),
      ),
    ]);
  }
}
