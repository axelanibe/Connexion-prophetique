// Croissance spirituelle, tranche T9, 26 nov. 2026.
// Ex Mon épanouissement : plan de lecture de 365 jours et
// badges, comme l'ancien parcours. Les jours lus restent en
// stockage local, jamais envoyés au serveur. Le jour du plan
// est le jour de l'année, 1 à 365.
import 'package:flutter/material.dart';

import '../parcours_bible.dart';
import 'palette.dart';
import 'service_t9.dart';

class PageCroissance extends StatefulWidget {
  const PageCroissance({super.key, required this.service});
  final ServiceT9 service;

  @override
  State<PageCroissance> createState() => _PageCroissanceState();
}

class _PageCroissanceState extends State<PageCroissance> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerCroissance();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _basculer() async {
    await widget.service.basculerJour(widget.service.jourPlanAujourdhui);
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final lus = s.joursLus.length;
    final jour = s.jourPlanAujourdhui;
    final luAujourdhui = s.joursLus.contains(jour);
    final badges = badgesLectureGagnes(lus);
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Card(
          color: PaletteNouvelle.bleuNuit,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Plan de lecture, 365 jours',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '$lus jour${lus > 1 ? 's' : ''} lu${lus > 1 ? 's' : ''} sur $nbJoursPlanAnnuel',
                  style: const TextStyle(color: Colors.white70, fontSize: 14),
                ),
                const SizedBox(height: 12),
                LinearProgressIndicator(
                  value: lus / nbJoursPlanAnnuel,
                  backgroundColor: Colors.white24,
                  color: PaletteNouvelle.or,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Aujourd’hui',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w800,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 8),
        if (s.chapitresAujourdHui.isEmpty)
          const Card(
            color: Colors.white,
            child: ListTile(title: Text('À confirmer')),
          )
        else
          Card(
            color: Colors.white,
            child: ListTile(
              leading: const Icon(Icons.menu_book_outlined,
                  color: PaletteNouvelle.bleuNuit),
              title: Text(
                s.chapitresAujourdHui
                    .map((c) => '${c.$1} ${c.$2}')
                    .join(', '),
              ),
              subtitle: Text('Jour $jour du plan'),
              trailing: FilledButton(
                style: FilledButton.styleFrom(
                  backgroundColor: luAujourdhui
                      ? Colors.grey
                      : PaletteNouvelle.bleuNuit,
                ),
                onPressed: _basculer,
                child: Text(luAujourdhui ? 'Lu' : 'Marquer lu'),
              ),
            ),
          ),
        const SizedBox(height: 16),
        const Text(
          'Badges',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w800,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final id in idsBadgesLecture)
              _PastilleBadge(
                libelle: _libelleBadge(id),
                gagne: badges.contains(id),
              ),
          ],
        ),
      ],
    );
  }

  static String _libelleBadge(String id) => switch (id) {
        'jours_7' => '7 jours',
        'jours_30' => '30 jours',
        'jours_100' => '100 jours',
        'jours_365' => '365 jours',
        'termine' => 'Plan terminé',
        _ => id,
      };
}

class _PastilleBadge extends StatelessWidget {
  const _PastilleBadge({required this.libelle, required this.gagne});
  final String libelle;
  final bool gagne;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: gagne ? PaletteNouvelle.or.withValues(alpha: 0.2) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: gagne ? PaletteNouvelle.or : Colors.grey.shade300,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.emoji_events_outlined,
            size: 16,
            color: gagne ? PaletteNouvelle.orFonce : Colors.grey,
          ),
          const SizedBox(width: 6),
          Text(libelle),
        ],
      ),
    );
  }
}
