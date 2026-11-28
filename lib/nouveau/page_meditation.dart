// Page Méditation, salve 28 nov. 2026 : remplace l'état neutre.
// La carte du jour (méditation du jour, rotation de 7 jours,
// verset lu dans la Bible embarquée, jamais inventé), le plan
// de lecture 365 jours avec la lecture du jour, et le journal :
// les boutons ouvrent le journal prérempli, comme dans
// l'ancienne version, révélation ou message. Aucune écriture
// serveur, jours lus et journal en stockage local seulement.
import 'package:flutter/material.dart';

import '../bible.dart';
import '../meditation_journal.dart';
import '../parcours_bible.dart';
import 'palette.dart';
import 'service_bible.dart';

class PageMeditation extends StatefulWidget {
  const PageMeditation({
    super.key,
    required this.serviceBible,
    required this.onNoter,
    required this.onOuvrirJournal,
    required this.onOuvrirChapitre,
  });
  final ServiceBible serviceBible;

  /// Ouvre le journal prérempli, onglet et champs donnés.
  final void Function({
    required int onglet,
    Map<String, dynamic>? prefill,
  }) onNoter;

  /// Ouvre le journal, sans préremplissage.
  final VoidCallback onOuvrirJournal;

  /// Ouvre un chapitre dans la Bible, depuis le plan.
  final void Function(int livre, int chapitre) onOuvrirChapitre;

  @override
  State<PageMeditation> createState() => _PageMeditationState();
}

class _PageMeditationState extends State<PageMeditation> {
  var _charge = false;
  var _joursLus = <int>{};
  var _ecoute = false;

  DailyMeditation get _meditation => dailyMeditation();

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.serviceBible.charger();
    final lus = await widget.serviceBible.joursLusPlan();
    if (!mounted) return;
    setState(() {
      _joursLus = lus;
      _charge = true;
    });
  }

  int get _jourAnnee {
    final maintenant = DateTime.now();
    final jour =
        maintenant.difference(DateTime(maintenant.year, 1, 1)).inDays + 1;
    return jour.clamp(1, nbJoursPlanAnnuel);
  }

  Future<void> _basculerJour() async {
    await widget.serviceBible.basculerJourPlan(_jourAnnee);
    final lus = await widget.serviceBible.joursLusPlan();
    if (mounted) setState(() => _joursLus = lus);
  }

  void _ouvrirPlan() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => Scaffold(
          backgroundColor: PaletteNouvelle.papier,
          appBar: AppBar(
            title: const Text(
              'Plan de lecture',
              style: TextStyle(color: PaletteNouvelle.bleuNuit),
            ),
            backgroundColor: Colors.white,
            foregroundColor: PaletteNouvelle.bleuNuit,
          ),
          body: ParcoursBiblePage(
            lang: 'fr',
            joursLus: _joursLus,
            onBasculerJour: (jour) async {
              await widget.serviceBible.basculerJourPlan(jour);
              final lus = await widget.serviceBible.joursLusPlan();
              if (mounted) setState(() => _joursLus = lus);
            },
            onOuvrirChapitre: (livre, chapitre) {
              Navigator.of(context).pop();
              widget.onOuvrirChapitre(livre, chapitre);
            },
          ),
        ),
      ),
    );
  }

  Future<void> _ecouter() async {
    final med = _meditation;
    final ref = BibleVerseRef(med.book, med.chapter, med.verse, '');
    if (_ecoute) {
      await widget.serviceBible.arreterAudio();
      if (mounted) setState(() => _ecoute = false);
      return;
    }
    setState(() => _ecoute = true);
    await widget.serviceBible.ecouterVerset('fr', ref);
    if (mounted) setState(() => _ecoute = false);
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final med = _meditation;
    final texteVerset =
        widget.serviceBible.texteVerset('fr', med.book, med.chapter, med.verse) ??
            '';
    final reference =
        '${widget.serviceBible.nomLivre('fr', med.book)} ${med.chapter}:${med.verse}';
    final livres = widget.serviceBible.livres('fr');
    final chapitresParLivre =
        livres.map((l) => l.chapters.length).toList();
    final jours = joursPlanAnnuel(chapitresParLivre);
    final nomsLivres =
        livres.map((l) => l.name).toList();
    final lectureJour = _jourAnnee <= jours.length
        ? jours[_jourAnnee - 1]
        : const <(int, int)>[];
    final luAujourdhui = _joursLus.contains(_jourAnnee);
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        const Text(
          'Méditation',
          style: TextStyle(
            fontFamily: 'Cinzel',
            fontSize: 28,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 12),
        Card(
          color: Colors.white,
          margin: EdgeInsets.zero,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'MÉDITATION DU JOUR',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 2,
                    color: PaletteNouvelle.orFonce,
                  ),
                ),
                const SizedBox(height: 12),
                if (texteVerset.isNotEmpty)
                  Text(
                    '« $texteVerset »',
                    style: const TextStyle(
                      fontSize: 17,
                      height: 1.5,
                      color: PaletteNouvelle.bleuNuit,
                    ),
                  ),
                const SizedBox(height: 8),
                Text(
                  '$reference · Louis Segond',
                  style: const TextStyle(
                    color: PaletteNouvelle.orFonce,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  med.title,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit,
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'RÉFLEXION',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.5,
                    color: PaletteNouvelle.orFonce,
                  ),
                ),
                const SizedBox(height: 4),
                Text(med.reflection, style: const TextStyle(height: 1.5)),
                const SizedBox(height: 12),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: PaletteNouvelle.papier,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: PaletteNouvelle.or.withValues(alpha: 0.4),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'PRIÈRE',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1.5,
                          color: PaletteNouvelle.orFonce,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        med.prayer,
                        style: const TextStyle(
                          fontStyle: FontStyle.italic,
                          height: 1.5,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'QUESTION DU JOUR',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.5,
                    color: PaletteNouvelle.orFonce,
                  ),
                ),
                const SizedBox(height: 4),
                Text(med.question, style: const TextStyle(height: 1.5)),
                const SizedBox(height: 12),
                const Text(
                  'PETIT PAS',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.5,
                    color: PaletteNouvelle.orFonce,
                  ),
                ),
                const SizedBox(height: 4),
                Text(med.step, style: const TextStyle(height: 1.5)),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    FilledButton.icon(
                      onPressed: _ecouter,
                      icon: Icon(
                        _ecoute ? Icons.stop_outlined : Icons.play_arrow_outlined,
                      ),
                      label: Text(_ecoute ? 'Arrêter' : 'Écouter'),
                    ),
                    OutlinedButton.icon(
                      onPressed: () => widget.serviceBible.partager(
                        meditationShareText(med, texteVerset, reference),
                      ),
                      icon: const Icon(Icons.share_outlined),
                      label: const Text('Partager'),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    OutlinedButton.icon(
                      onPressed: () => widget.onNoter(
                        onglet: 2,
                        prefill: {
                          'type': 'Révélation',
                          'titre': 'Suite à $reference',
                          'description': '',
                          'horizon': 'Court terme',
                          'statut': 'En attente',
                          'confirme': '',
                        },
                      ),
                      icon: const Icon(Icons.lightbulb_outlined),
                      label: const Text('Noter une révélation'),
                    ),
                    OutlinedButton.icon(
                      onPressed: () => widget.onNoter(
                        onglet: 3,
                        prefill: {
                          'titre': 'Message : ${med.title}',
                          'public': '',
                          'duree': '',
                          'theme': reference,
                          'accroche': med.reflection,
                          'points': '',
                          'illustration': '',
                          'conclusion': '',
                          'lien': '',
                        },
                      ),
                      icon: const Icon(Icons.edit_outlined),
                      label: const Text('Préparer un message'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Plan de lecture',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w800,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 8),
        Card(
          color: Colors.white,
          margin: EdgeInsets.zero,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Jour $_jourAnnee sur $nbJoursPlanAnnuel',
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  libelleJourPlanAnnuel(lectureJour, nomsLivres),
                  style: const TextStyle(fontSize: 15),
                ),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: _joursLus.length / nbJoursPlanAnnuel,
                    minHeight: 8,
                    backgroundColor: Colors.black12,
                    valueColor: const AlwaysStoppedAnimation(
                      PaletteNouvelle.or,
                    ),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${_joursLus.length} / $nbJoursPlanAnnuel jours lus',
                  style: const TextStyle(color: Colors.black54, fontSize: 13),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _basculerJour,
                        icon: Icon(
                          luAujourdhui
                              ? Icons.check_circle_outlined
                              : Icons.check_outlined,
                        ),
                        label: Text(
                          luAujourdhui ? 'Jour lu' : 'Marquer lu',
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _ouvrirPlan,
                        icon: const Icon(Icons.calendar_month_outlined),
                        label: const Text('Voir tout le plan'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(
            onPressed: widget.onOuvrirJournal,
            icon: const Icon(Icons.book_outlined),
            label: const Text('Ouvrir mon journal'),
          ),
        ),
      ],
    );
  }
}
