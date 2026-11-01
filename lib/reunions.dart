// Réunions en ligne, 1er nov. 2026 : espace de visioconférence de
// la communauté, intégré à l'application via Jitsi (téléphone) ou
// meet.jit.si dans le navigateur (web, Windows).
//
// Ecran en chargement différé, même modèle que lib/admin_pages.dart
// et lib/differe_membre.dart : ce fichier importe lib/main.dart pour
// les aides partagées (couleurs, textes, navigation, modèles) ; le
// cycle import différé / import direct est accepté par Dart.
//
// Données : les réunions sont des événements serveur de type
// 'reunion' (table evenements, colonnes salle_visio et heure_debut),
// publiés par l'administrateur général. Hors ligne, la dernière
// liste reçue est gardée, comme les autres contenus.
import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'i18n.dart';
import 'main.dart';
import 'notifications.dart';
import 'reunion_join.dart';

/// Une réunion en ligne, lue depuis un événement serveur de type
/// 'reunion'. La date vient de date_debut, l'heure de heure_debut
/// (HH:MM), la salle de salle_visio.
class Reunion {
  Reunion({
    required this.id,
    required this.nom,
    this.description = '',
    this.dateDebut,
    this.heureDebut = '',
    this.salleVisio = '',
  });

  final String id;
  final String nom;
  final String description;
  final DateTime? dateDebut;
  final String heureDebut;
  final String salleVisio;

  static Reunion fromMap(Map<String, dynamic> m) {
    DateTime? d;
    final ds = (m['date_debut'] ?? '').toString();
    if (ds.isNotEmpty) d = DateTime.tryParse(ds);
    return Reunion(
      id: (m['id'] ?? '').toString(),
      nom: (m['nom'] ?? '').toString(),
      description: (m['description'] ?? '').toString(),
      dateDebut: d,
      heureDebut: (m['heure_debut'] ?? '').toString(),
      salleVisio: (m['salle_visio'] ?? '').toString(),
    );
  }

  Map<String, dynamic> toMap() => {
        'id': id,
        'nom': nom,
        'description': description,
        'date_debut': dateDebut == null
            ? ''
            : '${dateDebut!.year.toString().padLeft(4, '0')}-${dateDebut!.month.toString().padLeft(2, '0')}-${dateDebut!.day.toString().padLeft(2, '0')}',
        'heure_debut': heureDebut,
        'salle_visio': salleVisio,
        'type': 'reunion',
      };

  /// Début combiné date + heure, pour le badge et le rappel.
  DateTime? get debut {
    if (dateDebut == null) return null;
    final parts = heureDebut.split(':');
    final h = parts.isNotEmpty ? int.tryParse(parts[0]) ?? 0 : 0;
    final min = parts.length > 1 ? int.tryParse(parts[1]) ?? 0 : 0;
    return DateTime(dateDebut!.year, dateDebut!.month, dateDebut!.day, h, min);
  }

  /// avenir : pas encore commencée ; direct : commencée depuis
  /// moins de 3 heures ; terminee : au-delà ; bientot : sans date.
  String get statut {
    final d = debut;
    if (d == null) return 'bientot';
    final now = DateTime.now();
    if (now.isBefore(d)) return 'avenir';
    if (now.isBefore(d.add(const Duration(hours: 3)))) return 'direct';
    return 'terminee';
  }
}

/// Lecture des réunions : le serveur d'abord, puis le cache local
/// en cas d'échec, jamais une liste inventée.
Future<List<Reunion>> fetchReunions() async {
  try {
    final maps = await api.fetchEvenements();
    final list = [
      for (final m in maps)
        if ((m['type'] ?? '').toString() == 'reunion') Reunion.fromMap(m)
    ];
    list.sort((a, b) {
      final da = a.debut;
      final db = b.debut;
      if (da == null && db == null) return a.nom.compareTo(b.nom);
      if (da == null) return 1;
      if (db == null) return -1;
      return da.compareTo(db);
    });
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('reunions_cache_v1', jsonEncode([for (final r in list) r.toMap()]));
    return list;
  } catch (_) {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString('reunions_cache_v1');
    if (raw == null || raw.isEmpty) rethrow;
    final decoded = jsonDecode(raw) as List;
    return [
      for (final m in decoded) Reunion.fromMap((m as Map).cast<String, dynamic>()),
    ];
  }
}

/// Nom de salle Jitsi unique et lisible, ex. cp-a1b2c3.
String genererSalleVisio() {
  const lettres = 'abcdefghjkmnpqrstuvwxyz23456789';
  final r = Random.secure();
  return 'cp-${List.generate(6, (_) => lettres[r.nextInt(lettres.length)]).join()}';
}

class ReunionsPage extends StatefulWidget {
  const ReunionsPage({super.key, this.scrollController});
  final ScrollController? scrollController;

  @override
  State<ReunionsPage> createState() => _ReunionsPageState();
}

class _ReunionsPageState extends State<ReunionsPage> {
  List<Reunion> _reunions = [];
  bool _loading = true;
  String? _error;

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
      final list = await fetchReunions();
      if (!mounted) return;
      setState(() {
        _reunions = list;
        _loading = false;
      });
      // Rappel local 15 minutes avant chaque réunion à venir.
      final rappels = [
        for (final r in list)
          if (r.debut != null && r.statut == 'avenir') (nom: r.nom, debut: r.debut!),
      ];
      await DailyVerseNotifications.instance.scheduleReunionReminders(currentLang, rappels);
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = 'offline';
      });
    }
  }

  String _quand(Reunion r) {
    final d = r.dateDebut;
    if (d == null) return tr('Date à confirmer');
    final fmt = DateFormat('d MMM yyyy', currentLang);
    final h = r.heureDebut.length >= 5 ? r.heureDebut.substring(0, 5) : r.heureDebut;
    final sep = isEn ? 'at' : 'à';
    return h.isEmpty ? fmt.format(d) : '${fmt.format(d)} $sep $h';
  }

  Future<void> _rejoindre(BuildContext c, Reunion r) async {
    if (r.salleVisio.isEmpty) {
      toast(c, tr('Salle de réunion non configurée. Contactez la structure.'));
      return;
    }
    toast(c, tr('Ouverture de la réunion…'));
    try {
      await joinReunionSalle(salle: r.salleVisio, nomAffiche: app.member?.name ?? '');
    } catch (_) {
      if (c.mounted) toast(c, tr('Impossible d’ouvrir la réunion. Vérifiez votre connexion.'));
    }
  }

  /// Planification par l'administrateur général, 1er nov. 2026 :
  /// titre, description, date et heure ; la salle Jitsi est
  /// générée, puis la réunion est publiée sur le serveur comme un
  /// événement de type 'reunion'. Hors connexion, refus clair.
  Future<void> _planifier(BuildContext c) async {
    if (!api.isConnected) {
      toast(c, tr('Connectez-vous au serveur avec un compte administrateur général pour planifier une réunion.'));
      return;
    }
    final titreCtrl = TextEditingController();
    final descCtrl = TextEditingController();
    DateTime? date;
    TimeOfDay? heure;
    final ok = await showModalBottomSheet<bool>(
      context: c,
      isScrollControlled: true,
      backgroundColor: Cp.paper,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(Cp.radiusCard)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setS) => Padding(
          padding: EdgeInsets.fromLTRB(Cp.s2, Cp.s2, Cp.s2, MediaQuery.of(ctx).viewInsets.bottom + Cp.s2),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(tr('Nouvelle réunion en ligne'), style: Theme.of(ctx).textTheme.titleLarge),
                const SizedBox(height: Cp.s2),
                TextField(
                  controller: titreCtrl,
                  decoration: InputDecoration(
                    labelText: tr('Titre de la réunion'),
                    filled: true,
                    fillColor: Cp.card,
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                  ),
                ),
                const SizedBox(height: Cp.s1),
                TextField(
                  controller: descCtrl,
                  maxLines: 3,
                  decoration: InputDecoration(
                    labelText: tr('Description (facultatif)'),
                    filled: true,
                    fillColor: Cp.card,
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(Cp.radiusTile)),
                  ),
                ),
                const SizedBox(height: Cp.s1),
                Row(children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final p = await showDatePicker(
                          context: ctx,
                          initialDate: date ?? DateTime.now(),
                          firstDate: DateTime.now().subtract(const Duration(days: 1)),
                          lastDate: DateTime.now().add(const Duration(days: 365)),
                        );
                        if (p != null) setS(() => date = p);
                      },
                      icon: const Icon(Icons.calendar_today_outlined),
                      label: Text(date == null ? tr('Date') : DateFormat('d MMM yyyy', currentLang).format(date!)),
                    ),
                  ),
                  const SizedBox(width: Cp.s1),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final p = await showTimePicker(context: ctx, initialTime: heure ?? TimeOfDay.now());
                        if (p != null) setS(() => heure = p);
                      },
                      icon: const Icon(Icons.schedule_outlined),
                      label: Text(heure == null ? tr('Heure') : heure!.format(ctx)),
                    ),
                  ),
                ]),
                const SizedBox(height: Cp.s2),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton(
                    onPressed: () => Navigator.of(ctx).pop(true),
                    child: Text(tr('Publier')),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
    if (ok != true || !c.mounted) return;
    final titre = titreCtrl.text.trim();
    if (titre.isEmpty || date == null || heure == null) {
      toast(c, tr('Le titre, la date et l’heure sont requis.'));
      return;
    }
    final salle = genererSalleVisio();
    final hh = heure!.hour.toString().padLeft(2, '0');
    final mm = heure!.minute.toString().padLeft(2, '0');
    try {
      await api.createEvenement(
        type: 'reunion',
        nom: titre,
        description: descCtrl.text.trim().isEmpty ? null : descCtrl.text.trim(),
        dateDebut: '${date!.year.toString().padLeft(4, '0')}-${date!.month.toString().padLeft(2, '0')}-${date!.day.toString().padLeft(2, '0')}',
        heureDebut: '$hh:$mm',
        salleVisio: salle,
      );
      if (!c.mounted) return;
      toast(c, tr('Réunion planifiée et publiée.'));
      await _charger();
    } catch (e) {
      // Message non traduit quand il contient l'erreur, comme les
      // autres publications (_publishCamp) : tr() ne trouverait
      // jamais la clé interpolée.
      if (c.mounted) toast(c, 'Publication refusée ($e). La route /admin/evenements est réservée au compte administrateur général.');
    }
  }

  Future<void> _retirer(BuildContext c, Reunion r) async {
    final confirmer = await showDialog<bool>(
      context: c,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Retirer')),
        content: Text(tr('Retirer cette réunion ? Elle ne sera plus visible par les membres.')),
        actions: [
          TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.of(ctx).pop(true), child: Text(tr('Retirer'))),
        ],
      ),
    );
    if (confirmer != true || !c.mounted) return;
    try {
      await api.updateEvenement(r.id, publie: false);
      if (!c.mounted) return;
      toast(c, tr('Réunion retirée.'));
      await _charger();
    } catch (e) {
      if (c.mounted) toast(c, 'Retrait refusé ($e).');
    }
  }

  Widget _badge(String statut, TextTheme t) {
    final label = statut == 'direct'
        ? tr('En direct')
        : statut == 'avenir'
            ? tr('À venir')
            : statut == 'terminee'
                ? tr('Terminée')
                : tr('Bientôt');
    final color = statut == 'direct'
        ? Colors.red
        : statut == 'avenir'
            ? Cp.gold
            : Cp.inkMuted;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(color: color.withValues(alpha: 0.12), borderRadius: BorderRadius.circular(20)),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Container(width: 8, height: 8, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 6),
        Text(label, style: t.labelMedium?.copyWith(color: color, fontWeight: FontWeight.w800)),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    return live((c) {
      final t = Theme.of(c).textTheme;
      final aVenir = _reunions.where((r) => r.statut == 'avenir' || r.statut == 'direct' || r.statut == 'bientot').toList();
      final passees = _reunions.where((r) => r.statut == 'terminee').toList();
      Widget carte(Reunion r) {
        final direct = r.statut == 'direct';
        return Card(
          margin: const EdgeInsets.only(bottom: Cp.s1),
          child: Padding(
            padding: const EdgeInsets.all(Cp.s2),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Expanded(child: Text(r.nom, style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Cp.navy))),
                _badge(r.statut, t),
              ]),
              const SizedBox(height: 4),
              Row(children: [
                const Icon(Icons.schedule_outlined, size: 16, color: Cp.inkMuted),
                const SizedBox(width: 6),
                Text(_quand(r), style: t.bodyMedium?.copyWith(color: Cp.inkMuted)),
              ]),
              if (r.description.isNotEmpty) ...[
                const SizedBox(height: 6),
                Text(r.description, style: t.bodyMedium),
              ],
              const SizedBox(height: Cp.s1),
              Row(children: [
                if (!direct && r.statut != 'terminee')
                  Expanded(
                    child: FilledButton.icon(
                      onPressed: () => _rejoindre(c, r),
                      icon: const Icon(Icons.videocam_outlined),
                      label: Text(tr('Rejoindre')),
                    ),
                  ),
                if (direct)
                  Expanded(
                    child: FilledButton.icon(
                      onPressed: () => _rejoindre(c, r),
                      style: FilledButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white),
                      icon: const Icon(Icons.videocam),
                      label: Text(tr('Rejoindre — en direct')),
                    ),
                  ),
                if (app.isAdminGeneral) ...[
                  const SizedBox(width: 8),
                  IconButton(
                    tooltip: tr('Retirer'),
                    onPressed: () => _retirer(c, r),
                    icon: const Icon(Icons.delete_outline, color: Cp.inkMuted),
                  ),
                ],
              ]),
            ]),
          ),
        );
      }

      return basic(
        tr('Réunions en ligne'),
        [
          pageTitleRow(
            Theme.of(c),
            tr('Réunions en ligne'),
            tr('Rejoignez nos réunions en vidéo, en direct dans l’application.'),
            action: app.isAdminGeneral
                ? goldButton(icon: Icons.add, label: tr('Planifier'), onPressed: () => _planifier(c))
                : null,
          ),
          const SizedBox(height: Cp.s2),
          if (_loading)
            const Center(child: Padding(padding: EdgeInsets.all(32), child: CircularProgressIndicator()))
          else if (_error != null)
            Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Column(children: [
                  Text(tr('Connexion impossible et aucune réunion en cache. Réessayez avec internet.')),
                  const SizedBox(height: Cp.s1),
                  OutlinedButton(onPressed: _charger, child: Text(tr('Réessayer'))),
                ]),
              ),
            )
          else if (_reunions.isEmpty)
            Card(
              child: Padding(
                padding: const EdgeInsets.all(Cp.s2),
                child: Text(tr('Aucune réunion planifiée pour le moment.')),
              ),
            )
          else ...[
            for (final r in aVenir) carte(r),
            if (passees.isNotEmpty) ...[
              const SizedBox(height: Cp.s1),
              Text(tr('Réunions passées'), style: t.titleSmall?.copyWith(color: Cp.inkMuted, fontWeight: FontWeight.w700)),
              const SizedBox(height: Cp.s1),
              for (final r in passees) carte(r),
            ],
          ],
        ],
        controller: widget.scrollController,
      );
    });
  }
}
