// Parcours Bible 1 an et badges de lecture, 21 nov. 2026,
// tranche 8 de l'audit du 17 nov. : un plan de 365 jours dont
// le calendrier est généré à partir de la structure
// livres/chapitres de la Bible déjà dans l'application, aucun
// texte inventé, aucun plan pré-écrit jour par jour à la main.
// La progression suit le modèle du plan de 21 jours de Mon
// épanouissement : un ensemble de jours lus, enregistré sur
// l'appareil seulement, jamais envoyé au serveur. Les badges
// se déduisent du nombre de jours lus : 7, 30, 100, 365 jours,
// et plan terminé quand les 365 jours sont lus.
import 'package:flutter/material.dart';

import 'bible.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Nombre de jours du parcours.
const nbJoursPlanAnnuel = 365;

/// Seuils de jours lus pour les badges, dans l'ordre.
const seuilsBadgesLecture = [7, 30, 100, 365];

/// Identifiants des badges, dans l'ordre d'affichage : jours
/// lus, puis plan terminé.
const List<String> idsBadgesLecture = ['jours_7', 'jours_30', 'jours_100', 'jours_365', 'termine'];

/// Badges gagnés pour ce nombre de jours lus.
List<String> badgesLectureGagnes(int joursLus) {
  final gagnes = <String>[];
  for (final seuil in seuilsBadgesLecture) {
    if (joursLus >= seuil) gagnes.add('jours_$seuil');
  }
  if (joursLus >= nbJoursPlanAnnuel) gagnes.add('termine');
  return gagnes;
}

/// Génère le calendrier du parcours à partir du nombre de
/// chapitres de chaque livre, dans l'ordre canonique : tous
/// les chapitres, dans l'ordre, répartis sur 365 jours aussi
/// également que possible. Chaque jour est la liste de ses
/// chapitres, (livre, chapitre), livre 0 à 65, chapitre à
/// partir de 1. Fonction pure, testée dans
/// test/parcours_bible_test.dart.
List<List<(int, int)>> joursPlanAnnuel(List<int> chapitresParLivre) {
  final chapitres = <(int, int)>[];
  for (var livre = 0; livre < chapitresParLivre.length; livre++) {
    for (var chapitre = 1; chapitre <= chapitresParLivre[livre]; chapitre++) {
      chapitres.add((livre, chapitre));
    }
  }
  final total = chapitres.length;
  final jours = List<List<(int, int)>>.generate(nbJoursPlanAnnuel, (_) => []);
  if (total == 0) return jours;
  final base = total ~/ nbJoursPlanAnnuel;
  final reste = total % nbJoursPlanAnnuel;
  var position = 0;
  for (var jour = 0; jour < nbJoursPlanAnnuel; jour++) {
    final nombre = base + (jour < reste ? 1 : 0);
    if (nombre == 0 || position >= total) break;
    final fin = (position + nombre).clamp(0, total);
    jours[jour] = chapitres.sublist(position, fin);
    position = fin;
  }
  return jours;
}

/// Libellé d'un jour du parcours : « Genèse 1–3 », ou
/// « Genèse 50 · Exode 1–2 » quand le jour passe d'un livre à
/// l'autre. Les noms de livres viennent de la Bible embarquée,
/// jamais recopiés en dur.
String libelleJourPlanAnnuel(List<(int, int)> jour, List<String> nomsLivres) {
  if (jour.isEmpty) return '';
  final parties = <String>[];
  var livreCourant = jour.first.$1;
  var debut = jour.first.$2;
  var fin = jour.first.$2;
  String nom(int livre) => livre >= 0 && livre < nomsLivres.length ? nomsLivres[livre] : '';
  void fermer() {
    final nomLivre = nom(livreCourant);
    parties.add(debut == fin ? '$nomLivre $debut' : '$nomLivre $debut–$fin');
  }

  for (var i = 1; i < jour.length; i++) {
    final (livre, chapitre) = jour[i];
    if (livre == livreCourant && chapitre == fin + 1) {
      fin = chapitre;
    } else {
      fermer();
      livreCourant = livre;
      debut = chapitre;
      fin = chapitre;
    }
  }
  fermer();
  return parties.join(' · ');
}

/// Page du parcours Bible 1 an : progression, badges et les
/// 365 jours, un toucher ouvre le premier chapitre du jour
/// dans la Bible, un bouton marque le jour comme lu. La
/// progression vient de l'application, la structure des livres
// de la Bible embarquée, sauf en test où elle est injectée.
class ParcoursBiblePage extends StatefulWidget {
  const ParcoursBiblePage({
    super.key,
    required this.lang,
    required this.joursLus,
    required this.onBasculerJour,
    required this.onOuvrirChapitre,
    this.chapitresParLivre,
    this.nomsLivres,
  });

  /// Langue de la Bible embarquée, 'fr' ou 'en'.
  final String lang;

  /// Jours déjà lus, 1 à 365.
  final Set<int> joursLus;

  /// Marquer un jour lu, ou retirer sa marque.
  final void Function(int jour) onBasculerJour;

  /// Ouvrir un chapitre dans la Bible, livre 0 à 65.
  final void Function(int livre, int chapitre) onOuvrirChapitre;

  /// Structure injectée pour les tests seulement : nombre de
  /// chapitres par livre et noms des livres.
  final List<int>? chapitresParLivre;
  final List<String>? nomsLivres;

  @override
  State<ParcoursBiblePage> createState() => _ParcoursBiblePageState();
}

class _ParcoursBiblePageState extends State<ParcoursBiblePage> {
  late Set<int> _lus;
  List<List<(int, int)>>? _jours;
  List<String> _noms = const [];

  @override
  void initState() {
    super.initState();
    _lus = Set.of(widget.joursLus);
    if (widget.chapitresParLivre != null) {
      _jours = joursPlanAnnuel(widget.chapitresParLivre!);
      _noms = widget.nomsLivres ?? const [];
    } else {
      BibleService.instance.load().then((_) {
        if (!mounted) return;
        final livres = BibleService.instance.books(widget.lang);
        setState(() {
          _jours = joursPlanAnnuel(livres.map((b) => b.chapters.length).toList());
          _noms = livres.map((b) => b.name).toList();
        });
      });
    }
  }

  @override
  void didUpdateWidget(covariant ParcoursBiblePage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.joursLus != oldWidget.joursLus) {
      setState(() => _lus = Set.of(widget.joursLus));
    }
  }

  void _basculer(int jour) {
    setState(() {
      if (_lus.contains(jour)) {
        _lus.remove(jour);
      } else {
        _lus.add(jour);
      }
    });
    widget.onBasculerJour(jour);
  }

  String _libelleBadge(String id) {
    switch (id) {
      case 'jours_7':
        return tr('7 jours');
      case 'jours_30':
        return tr('30 jours');
      case 'jours_100':
        return tr('100 jours');
      case 'jours_365':
        return tr('365 jours');
      case 'termine':
        return tr('Plan terminé');
      default:
        return id;
    }
  }

  @override
  Widget build(BuildContext context) {
    final jours = _jours;
    final gagnes = badgesLectureGagnes(_lus.length);
    return Scaffold(
      appBar: AppBar(title: Text(tr('Parcours Bible 1 an'))),
      body: jours == null
          ? const Center(child: CircularProgressIndicator())
          : Column(children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(
                    tr('Toute la Bible en 1 an, quelques chapitres par jour, dans l’ordre. Touchez un jour pour lire, puis marquez-le comme lu.'),
                    style: const TextStyle(fontSize: 14),
                  ),
                  const SizedBox(height: 12),
                  Row(children: [
                    Expanded(child: Text(tr('Votre progression'), style: Theme.of(context).textTheme.titleMedium)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(color: _or, borderRadius: BorderRadius.circular(20)),
                      child: Text(
                        '${_lus.length} / $nbJoursPlanAnnuel',
                        style: Theme.of(context).textTheme.labelLarge?.copyWith(color: _nuit, fontWeight: FontWeight.w800),
                      ),
                    ),
                  ]),
                  const SizedBox(height: 8),
                  LinearProgressIndicator(
                    value: _lus.length / nbJoursPlanAnnuel,
                    color: _or,
                    backgroundColor: const Color(0xFFD8DEE8),
                    minHeight: 8,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  const SizedBox(height: 12),
                  Text(tr('Badges de lecture'), style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      for (final id in idsBadgesLecture)
                        Chip(
                          avatar: Icon(
                            gagnes.contains(id) ? Icons.check_circle_outlined : Icons.lock_outlined,
                            size: 18,
                            color: gagnes.contains(id) ? _nuit : _grisTexte,
                          ),
                          label: Text(_libelleBadge(id)),
                          backgroundColor: gagnes.contains(id) ? _or : const Color(0xFFEAF0F6),
                        ),
                    ],
                  ),
                ]),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: nbJoursPlanAnnuel,
                  itemBuilder: (context, index) {
                    final jour = index + 1;
                    final chapitres = jours[index];
                    final lu = _lus.contains(jour);
                    final libelle = libelleJourPlanAnnuel(chapitres, _noms);
                    return ListTile(
                      title: Text('${tr('Jour')} $jour', style: const TextStyle(fontWeight: FontWeight.w700)),
                      subtitle: libelle.isEmpty ? null : Text(libelle, maxLines: 2, overflow: TextOverflow.ellipsis),
                      trailing: lu
                          ? OutlinedButton(
                              onPressed: () => _basculer(jour),
                              style: OutlinedButton.styleFrom(minimumSize: const Size(0, 36)),
                              child: Text(tr('Lu')),
                            )
                          : FilledButton(
                              onPressed: () => _basculer(jour),
                              style: FilledButton.styleFrom(minimumSize: const Size(0, 36)),
                              child: Text(tr('Marquer lu')),
                            ),
                      onTap: chapitres.isEmpty
                          ? null
                          : () => widget.onOuvrirChapitre(chapitres.first.$1, chapitres.first.$2),
                    );
                  },
                ),
              ),
            ]),
    );
  }
}
