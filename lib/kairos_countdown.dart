// Compte à rebours Kairos, 3 nov. 2026 : affichage seulement,
// jamais une notification ni un rappel. Il se lit quand
// l'application est ouverte, sur la fiche du Camp National Kairos
// dans l'onglet Camps et sur sa carte en direct à l'accueil.
// Cible : date_debut du camp côté serveur si elle est présente,
// sinon repli sur 2027-08-22, la date déjà affichée en texte
// pour Kairos (22 au 28 août 2027, Bonoua). Aucune autre donnée
// du camp n'est changée, aucun camp n'est créé, aucun prix
// n'est modifié. Hors connexion, il fonctionne avec les données
// du camp déjà chargées, sans appel réseau supplémentaire.
import 'dart:async';

import 'package:flutter/material.dart';

import 'i18n.dart';

/// Date cible du compte à rebours quand le serveur n'a pas
/// renseigné de date de début pour Kairos.
final kairosFallbackDate = DateTime(2027, 8, 22);

/// Fin de repli quand le serveur n'a rien renseigné : le texte
/// déjà affiché pour Kairos donne 22 au 28 août 2027.
final kairosFallbackEndDate = DateTime(2027, 8, 28);

/// Cible effective : la date serveur si elle est présente,
/// sinon le repli du 22 août 2027.
DateTime kairosCountdownTarget(DateTime? dateDebut) =>
    dateDebut ?? kairosFallbackDate;

class KairosCountdown extends StatefulWidget {
  const KairosCountdown({super.key, this.dateDebut, this.dateFin});

  /// Date de début venue du serveur, null si non renseignée.
  final DateTime? dateDebut;

  /// Date de fin venue du serveur, null si non renseignée.
  /// Elle sert seulement à distinguer « a commencé » de
  /// « est terminé » une fois la date cible atteinte.
  final DateTime? dateFin;

  @override
  State<KairosCountdown> createState() => _KairosCountdownState();
}

class _KairosCountdownState extends State<KairosCountdown> {
  Timer? _timer;
  late DateTime _target;

  @override
  void initState() {
    super.initState();
    _target = kairosCountdownTarget(widget.dateDebut);
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() {});
    });
  }

  @override
  void didUpdateWidget(KairosCountdown oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.dateDebut != widget.dateDebut) {
      _target = kairosCountdownTarget(widget.dateDebut);
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Widget _unit(String value, String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
        decoration: BoxDecoration(
          color: const Color(0xFF0B1F3A),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              value,
              style: const TextStyle(
                color: Color(0xFFD4A72C),
                fontSize: 18,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(color: Colors.white70, fontSize: 11),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    final remaining = _target.difference(now);
    if (remaining <= Duration.zero) {
      // Après la cible : jamais un compte négatif, jamais un
      // plantage. Fin connue : « a commencé » jusqu'à la fin
      // de la journée de fin, « est terminé » après. Fin
      // inconnue avec la cible de repli : fin de repli du
      // 28 août 2027. Fin inconnue avec une date serveur :
      // on ne peut pas affirmer que le camp est terminé,
      // donc « a commencé ».
      final fin = widget.dateFin ??
          (widget.dateDebut == null ? kairosFallbackEndDate : null);
      final enCours = fin == null ||
          !now.isAfter(DateTime(fin.year, fin.month, fin.day, 23, 59, 59));
      return Text(
        tr(enCours ? 'Le camp a commencé.' : 'Le camp est terminé.'),
        style: const TextStyle(
          color: Color(0xFF0B1F3A),
          fontSize: 15,
          fontWeight: FontWeight.w700,
        ),
      );
    }
    final jours = remaining.inDays;
    final heures = remaining.inHours % 24;
    final minutes = remaining.inMinutes % 60;
    final secondes = remaining.inSeconds % 60;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          tr('Compte à rebours'),
          style: const TextStyle(
            color: Color(0xFF0B1F3A),
            fontSize: 15,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            _unit('$jours', tr('Jours')),
            const SizedBox(width: 8),
            _unit(heures.toString().padLeft(2, '0'), tr('Heures')),
            const SizedBox(width: 8),
            _unit(minutes.toString().padLeft(2, '0'), tr('Minutes')),
            const SizedBox(width: 8),
            _unit(secondes.toString().padLeft(2, '0'), tr('Secondes')),
          ],
        ),
      ],
    );
  }
}
