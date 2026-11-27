// Activités à venir, tranche T2, 26 nov. 2026.
// Camps et retraites en cours ou à venir, données serveur.
// Carte bleu nuit plus profonde, le compte à rebours
// « Prochaine activité dans » dans un encadré doré
// translucide, animé chaque seconde, sur la prochaine
// activité à commencer. Une activité en cours porte
// « En cours », sans date elle porte « À confirmer ».
import 'dart:async';

import 'package:flutter/material.dart';

import '../api.dart';
import 'page_accueil.dart' show ActiviteAVenir;
import 'palette.dart';

/// Événements serveur (GET /evenements) vers les activités de
/// l'accueil, T11 : camps et retraites seulement, triés par date,
/// terminés écartés par la page. L'image vient de image_id.
/// Sans date, l'activité porte « À confirmer ».
List<ActiviteAVenir> activitesDepuisEvenements(
    List<Map<String, dynamic>> lignes) {
  final activites = <ActiviteAVenir>[];
  for (final ligne in lignes) {
    final type = (ligne['type'] ?? '').toString();
    if (type != 'camp' && type != 'retraite') continue;
    final titre = (ligne['nom'] ?? '').toString();
    if (titre.isEmpty) continue;
    final debutRaw = (ligne['date_debut'] ?? '').toString();
    final finRaw = (ligne['date_fin'] ?? '').toString();
    final imageId = (ligne['image_id'] ?? '').toString();
    final lieu = (ligne['lieu'] ?? '').toString();
    final pays = (ligne['pays'] ?? '').toString();
    activites.add(ActiviteAVenir(
      titre: titre,
      evenementId: (ligne['id'] ?? '').toString(),
      type: type,
      description: (ligne['description'] ?? '').toString(),
      tarifFcfa: (ligne['tarif_fcfa'] as num?)?.toInt() ?? 0,
      inscrits: (ligne['inscrits'] as num?)?.toInt() ?? 0,
      nombrePlaces: (ligne['nombre_places'] as num?)?.toInt() ?? 0,
      dateDebut: debutRaw.isEmpty ? null : DateTime.tryParse(debutRaw),
      dateFin: finRaw.isEmpty ? null : DateTime.tryParse(finRaw),
      lieu: [lieu, pays].where((s) => s.isNotEmpty).join(', '),
      imageUrl:
          imageId.isEmpty ? '' : '$kApiBaseUrl/fichiers/$imageId',
    ));
  }
  activites.sort((a, b) {
    final da = a.dateDebut;
    final db = b.dateDebut;
    if (da == null && db == null) return a.titre.compareTo(b.titre);
    if (da == null) return 1;
    if (db == null) return -1;
    return da.compareTo(db);
  });
  return activites;
}

class ActivitesAVenir extends StatelessWidget {
  const ActivitesAVenir({super.key, required this.activites});
  final List<ActiviteAVenir> activites;

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    ActiviteAVenir? prochaine;
    for (final a in activites) {
      final debut = a.dateDebut;
      if (debut == null || !debut.isAfter(now)) continue;
      if (prochaine == null || debut.isBefore(prochaine.dateDebut!)) {
        prochaine = a;
      }
    }
    return Column(
      children: [
        for (var i = 0; i < activites.length; i++) ...[
          if (i > 0) const SizedBox(height: 12),
          _CarteActivite(
            activite: activites[i],
            avecCompteARebours: identical(activites[i], prochaine),
          ),
        ],
      ],
    );
  }
}

class _CarteActivite extends StatelessWidget {
  const _CarteActivite({required this.activite, required this.avecCompteARebours});
  final ActiviteAVenir activite;
  final bool avecCompteARebours;

  /// Bleu nuit plus profond que la palette, carte de l'activité.
  static const _bleuProfond = Color(0xFF081627);

  @override
  Widget build(BuildContext context) {
    final a = activite;
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: a.onTap,
      child: Container(
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: _bleuProfond,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.15),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (a.imageUrl.isNotEmpty)
              Image.network(
                a.imageUrl,
                height: 120,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => const SizedBox.shrink(),
              ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    a.titre,
                    style: const TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(Icons.event_outlined, size: 16, color: Colors.white70),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          _ligneDates(a),
                          style: const TextStyle(color: Colors.white70, fontSize: 14),
                        ),
                      ),
                    ],
                  ),
                  if (a.lieu.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        const Icon(Icons.location_on_outlined, size: 16, color: Colors.white70),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            a.lieu,
                            style: const TextStyle(color: Colors.white70, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ],
                  if (a.enCours) ...[
                    const SizedBox(height: 10),
                    _Pastille('En cours'),
                  ],
                  if (avecCompteARebours && a.dateDebut != null) ...[
                    const SizedBox(height: 10),
                    _CompteARebours(cible: a.dateDebut!),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// Dates de l'activité, « À confirmer » sans date serveur.
  static String _ligneDates(ActiviteAVenir a) {
    final debut = a.dateDebut;
    if (debut == null) return 'À confirmer';
    final texte = '${_dateCourte(debut)} · ${_heureCourte(debut)}';
    final fin = a.dateFin;
    if (fin == null || _memeJour(debut, fin)) return texte;
    return '$texte – ${_dateCourte(fin)}';
  }

  static bool _memeJour(DateTime a, DateTime b) =>
      a.year == b.year && a.month == b.month && a.day == b.day;
}

String _dateCourte(DateTime d) {
  const jours = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  return '${jours[d.weekday % 7]} ${d.day} ${mois[d.month - 1]}';
}

String _heureCourte(DateTime d) =>
    '${d.hour.toString().padLeft(2, '0')}h${d.minute.toString().padLeft(2, '0')}';

class _Pastille extends StatelessWidget {
  const _Pastille(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: PaletteNouvelle.or.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        texte,
        style: const TextStyle(color: PaletteNouvelle.or, fontSize: 12, fontWeight: FontWeight.w800),
      ),
    );
  }
}

/// Compte à rebours « Prochaine activité dans », animé chaque
/// seconde, même patron que le compte à rebours Kairos. Le temps
/// restant est décrémenté une fois par seconde tant que la page
/// est ouverte, il est recalculé quand la cible change.
/// La cible atteinte, il affiche « En cours ».
class _CompteARebours extends StatefulWidget {
  const _CompteARebours({required this.cible});
  final DateTime cible;

  @override
  State<_CompteARebours> createState() => _CompteAReboursState();
}

class _CompteAReboursState extends State<_CompteARebours> {
  Timer? _timer;
  late Duration _restant;

  @override
  void initState() {
    super.initState();
    _restant = widget.cible.difference(DateTime.now());
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() => _restant -= const Duration(seconds: 1));
    });
  }

  @override
  void didUpdateWidget(covariant _CompteARebours oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.cible != widget.cible) {
      _restant = widget.cible.difference(DateTime.now());
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final restant = _restant;
    return Container(
      key: const ValueKey('compteARebours'),
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: PaletteNouvelle.or.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: PaletteNouvelle.or.withValues(alpha: 0.4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Prochaine activité dans',
            style: TextStyle(color: PaletteNouvelle.or, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 1),
          ),
          const SizedBox(height: 4),
          Text(
            restant.isNegative ? 'En cours' : _formatDuree(restant),
            key: const ValueKey('compteAReboursValeur'),
            style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w800),
          ),
        ],
      ),
    );
  }
}

String _formatDuree(Duration d) {
  final jours = d.inDays;
  final heures = (d.inHours % 24).toString().padLeft(2, '0');
  final minutes = (d.inMinutes % 60).toString().padLeft(2, '0');
  final secondes = (d.inSeconds % 60).toString().padLeft(2, '0');
  return jours > 0 ? '$jours j $heures h $minutes min $secondes s' : '$heures h $minutes min $secondes s';
}
