// Chaîne de prière en direct, 21 nov. 2026, tranche 1 puis
// refonte d'après la maquette interactive d'Axel, même jour.
// Décision d'Axel : 24 créneaux d'une heure, un membre par
// créneau, un créneau par membre et par jour. La page vit dans
// le tiroir, section La structure. La maquette donne la forme :
// carte hero bleu nuit avec navigation de date, compteur des
// heures couvertes avec barre et anneau, filtres Nuit, Matin,
// Après-midi et Soir, bascule liste ou grille, créneaux Libre,
// Couvert ou Votre créneau en ambre, badge En cours sur
// l'heure en cours, modales réserver, déplacer et libérer. Les
// noms dans la maquette sont des exemples, jamais des données
// réelles : les prénoms viennent du serveur, jamais inventés.
// Navigation ouverte vers d'autres jours, réservation
// aujourd'hui et jours à venir, jours passés en lecture seule.
import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb, plus
// l'ambre de la maquette pour le créneau du membre.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _ambre = Color(0xFFF59E0B);
const _ambreClair = Color(0xFFFFF7E0);
const _fond = Color(0xFFF4F6F9);
const _grisTexte = Color(0xFF5E687C);
const _bordure = Color(0xFFE2E8F0);
const _vertFond = Color(0xFFECFDF5);
const _vertTexte = Color(0xFF047857);
const _vertBordure = Color(0xFFA7F3D0);
const _rose = Color(0xFFE11D48);

/// Nombre de créneaux dans une journée, un par heure.
const nbCreneauxPriere = 24;

/// Moment de la journée d'un créneau, comme les filtres de
/// la maquette : Nuit 0h-6h, Matin 6h-12h, Après-midi 12h-18h,
/// Soir 18h-0h.
enum MomentChaine { nuit, matin, apresMidi, soir }

/// Moment d'une heure, 0 à 23.
MomentChaine momentChaine(int heure) {
  if (heure < 6) return MomentChaine.nuit;
  if (heure < 12) return MomentChaine.matin;
  if (heure < 18) return MomentChaine.apresMidi;
  return MomentChaine.soir;
}

/// Libellé d'un moment pour l'en-tête de section, par
/// exemple « Nuit • 0h – 6h ».
String libelleMomentChaine(MomentChaine moment) {
  switch (moment) {
    case MomentChaine.nuit:
      return '${tr('Nuit')} • 0h – 6h';
    case MomentChaine.matin:
      return '${tr('Matin')} • 6h – 12h';
    case MomentChaine.apresMidi:
      return '${tr('Après-midi')} • 12h – 18h';
    case MomentChaine.soir:
      return '${tr('Soir')} • 18h – 0h';
  }
}

/// Un créneau de la chaîne : son heure, le membre qui l'a
/// pris, ou rien quand il est libre.
class CreneauPriere {
  CreneauPriere({required this.heure, this.membreId, this.prenom = ''});

  factory CreneauPriere.fromJson(Map<String, dynamic> j) => CreneauPriere(
        heure: j['heure'] is int ? j['heure'] as int : int.tryParse((j['heure'] ?? '').toString()) ?? 0,
        membreId: (j['membre_id'] ?? '').toString().isEmpty ? null : (j['membre_id'] ?? '').toString(),
        prenom: (j['prenom'] ?? '').toString(),
      );

  final int heure;
  final String? membreId;
  final String prenom;

  bool get estLibre => membreId == null;
  bool estMien(String? monMembreId) => !estLibre && monMembreId != null && membreId == monMembreId;
}

/// Les 24 créneaux du jour, dans l'ordre, depuis la réponse
/// du serveur. Un créneau absent de la réponse est libre.
List<CreneauPriere> creneauxPriereDepuisReponse(Map<String, dynamic> data) {
  final parHeure = <int, CreneauPriere>{};
  final lignes = data['creneaux'];
  if (lignes is List) {
    for (final ligne in lignes) {
      if (ligne is Map<String, dynamic>) {
        final c = CreneauPriere.fromJson(ligne);
        if (c.heure >= 0 && c.heure < nbCreneauxPriere && !parHeure.containsKey(c.heure)) {
          parHeure[c.heure] = c;
        }
      }
    }
  }
  return List.generate(
    nbCreneauxPriere,
    (heure) => parHeure[heure] ?? CreneauPriere(heure: heure),
  );
}

/// Nombre d'heures couvertes sur 24, pour l'en-tête.
int heuresCouvertesPriere(List<CreneauPriere> creneaux) =>
    creneaux.where((c) => !c.estLibre).length;

/// Libellé d'un créneau, par exemple « 8 h – 9 h ».
String libelleCreneauPriere(int heure) {
  final suivante = (heure + 1) % 24;
  return '$heure h – $suivante h';
}

/// Jour en AAAA-MM-JJ, pour la demande au serveur.
String jourIsoChaine(DateTime jour) =>
    '${jour.year}-${jour.month.toString().padLeft(2, '0')}-${jour.day.toString().padLeft(2, '0')}';

/// Jour seul, sans l'heure, pour comparer deux jours.
DateTime jourSeulChaine(DateTime jour) => DateTime(jour.year, jour.month, jour.day);

/// Date en « Samedi 21 nov. 2026 », comme la maquette.
String libelleDateChaine(DateTime jour) {
  const joursFr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const joursEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const moisFr = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const moisEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  final jours = isEn ? joursEn : joursFr;
  final mois = isEn ? moisEn : moisFr;
  return '${jours[jour.weekday - 1]} ${jour.day} ${mois[jour.month - 1]} ${jour.year}';
}

/// Position du jour par rapport à aujourd'hui :
/// « Aujourd'hui », « Demain », « Hier », « Dans 3 jours »,
/// « Il y a 2 jours ».
String libelleRelatifChaine(DateTime jour, DateTime aujourdHui) {
  final ecart = jourSeulChaine(jour).difference(jourSeulChaine(aujourdHui)).inDays;
  if (ecart == 0) return tr("Aujourd'hui");
  if (ecart == 1) return tr('Demain');
  if (ecart == -1) return tr('Hier');
  if (ecart > 1) return tr('Dans {n} jours').replaceAll('{n}', '$ecart');
  return tr('Il y a {n} jours').replaceAll('{n}', '${-ecart}');
}

/// Initiales d'un nom pour l'avatar, par exemple « SM » pour
/// Sarah M., « VO » pour Vous. Jamais inventées, elles
/// viennent du prénom servi.
String initialesDepuisNom(String nom) {
  final mots = nom.trim().split(RegExp(r'\s+')).where((m) => m.isNotEmpty).toList();
  if (mots.isEmpty) return '';
  if (mots.length == 1) {
    final mot = mots.first;
    return mot.length == 1 ? mot.toUpperCase() : mot.substring(0, 2).toUpperCase();
  }
  return (mots[0][0] + mots[1][0]).toUpperCase();
}

/// Vrai quand le jour demandé est avant aujourd'hui côté
/// serveur, donc en lecture seule. La comparaison de chaînes
/// suffit en AAAA-MM-JJ.
bool estJourPasseChaine(String jourIso, String? aujourdHuiIso) =>
    aujourdHuiIso != null && jourIso.compareTo(aujourdHuiIso) < 0;

/// Créneaux du moment choisi, tous quand le filtre est nul.
List<CreneauPriere> creneauxFiltresChaine(List<CreneauPriere> creneaux, MomentChaine? moment) {
  if (moment == null) return creneaux;
  return creneaux.where((c) => momentChaine(c.heure) == moment).toList();
}

/// Teinte pastel de l'avatar d'un membre, stable pour le
/// même identifiant. La maquette varie les teintes, jamais
/// au hasard à chaque ouverture.
(Color, Color) teinteAvatarChaine(String? membreId) {
  const teintes = [
    (Color(0xFFE0E7FF), Color(0xFF4338CA)),
    (Color(0xFFD1FAE5), Color(0xFF047857)),
    (Color(0xFFEDE9FE), Color(0xFF6D28D9)),
    (Color(0xFFE0F2FE), Color(0xFF0369A1)),
    (Color(0xFFFFE4E6), Color(0xFFBE123C)),
    (Color(0xFFCCFBF1), Color(0xFF0F766E)),
    (Color(0xFFFCE7F3), Color(0xFFBE185D)),
    (Color(0xFFDBEAFE), Color(0xFF1D4ED8)),
  ];
  var empreinte = 0;
  for (final unite in (membreId ?? '').codeUnits) {
    empreinte = (empreinte * 31 + unite) & 0x7fffffff;
  }
  return teintes[empreinte % teintes.length];
}

/// Point doré entouré d'un halo, pour le badge « En cours »
/// de la maquette. Statique, sans animation, pour ne pas
/// bloquer les tests : le badge porte le sens, le halo le
/// signale.
class _PointEnCours extends StatelessWidget {
  const _PointEnCours();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 16,
      height: 16,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Container(
            width: 16,
            height: 16,
            decoration: BoxDecoration(
              color: _ambre.withValues(alpha: 0.25),
              shape: BoxShape.circle,
            ),
          ),
          Container(
            width: 8,
            height: 8,
            decoration: const BoxDecoration(color: _ambre, shape: BoxShape.circle),
          ),
        ],
      ),
    );
  }
}

/// Badge « En cours » de la maquette, pastille ambre avec
/// le point qui respire.
Widget _pastilleEnCours() {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
    decoration: BoxDecoration(
      color: const Color(0xFFFEF3C7),
      borderRadius: BorderRadius.circular(999),
      border: Border.all(color: const Color(0xFFFDE68A)),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const _PointEnCours(),
        const SizedBox(width: 5),
        Text(
          tr('En cours'),
          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF92400E)),
        ),
      ],
    ),
  );
}

/// Page de la chaîne de prière, refonte d'après la maquette.
class ChainePrierePage extends StatefulWidget {
  const ChainePrierePage({super.key, this.client, this.membreId, this.jourInitial});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  /// Identifiant de ma fiche membre injecté pour les tests, le
  /// jeton sinon.
  final String? membreId;

  /// Jour affiché au départ, pour les tests, aujourd'hui sinon.
  final DateTime? jourInitial;

  @override
  State<ChainePrierePage> createState() => _ChainePrierePageState();
}

class _ChainePrierePageState extends State<ChainePrierePage> {
  late DateTime _selection;
  List<CreneauPriere> _creneaux = List.generate(nbCreneauxPriere, (h) => CreneauPriere(heure: h));
  String? _aujourdHuiIso;
  bool _charge = false;
  bool _enCours = false;
  MomentChaine? _filtre;
  bool _grille = false;

  ApiClient get _client => widget.client ?? api;
  String? get _monMembreId => widget.membreId ?? _client.membreId;

  String get _selectionIso => jourIsoChaine(_selection);
  bool get _estPasse => estJourPasseChaine(_selectionIso, _aujourdHuiIso);
  bool get _estAujourdHui => _aujourdHuiIso == _selectionIso;

  DateTime get _aujourdHuiDate {
    final serveur = _aujourdHuiIso == null ? null : DateTime.tryParse(_aujourdHuiIso!);
    return serveur ?? DateTime.now();
  }

  CreneauPriere? get _monCreneau {
    for (final c in _creneaux) {
      if (c.estMien(_monMembreId)) return c;
    }
    return null;
  }

  @override
  void initState() {
    super.initState();
    _selection = jourSeulChaine(widget.jourInitial ?? DateTime.now());
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await _client.fetchChainePriere(jour: _selectionIso);
      if (!mounted) return;
      setState(() {
        _creneaux = creneauxPriereDepuisReponse(data);
        final aujourdHui = (data['aujourd_hui'] ?? data['jour'] ?? '').toString();
        _aujourdHuiIso = aujourdHui.isEmpty ? null : aujourdHui;
        _charge = true;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _charge = true);
      _annoncer(e.toString());
    }
  }

  void _annoncer(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  Future<void> _changerJour(int delta) async {
    if (_enCours) return;
    setState(() {
      _selection = jourSeulChaine(_selection.add(Duration(days: delta)));
      _charge = false;
    });
    await _charger();
  }

  Future<void> _toucher(CreneauPriere creneau) async {
    if (_enCours) return;
    if (_estPasse) {
      _annoncer(tr('Ce jour est passé, lecture seule.'));
      return;
    }
    if (!creneau.estLibre && !creneau.estMien(_monMembreId)) {
      _annoncer(tr('Ce créneau est déjà couvert par {prenom}.').replaceAll('{prenom}', creneau.prenom));
      return;
    }
    if (creneau.estMien(_monMembreId)) {
      await _liberer(creneau);
      return;
    }
    final mien = _monCreneau;
    if (mien != null) {
      await _deplacer(mien, creneau);
      return;
    }
    await _reserver(creneau);
  }

  Future<void> _reserver(CreneauPriere creneau) async {
    final heure = libelleCreneauPriere(creneau.heure);
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Réserver {heure} ?').replaceAll('{heure}', heure)),
        content: Text(tr('Vous vous engagez à prier durant le créneau de {heure} pour le {date}.')
            .replaceAll('{heure}', heure)
            .replaceAll('{date}', libelleDateChaine(_selection))),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr("M'inscrire"))),
        ],
      ),
    );
    if (confirmer != true) return;
    setState(() => _enCours = true);
    try {
      await _client.engagerCreneauPriere(creneau.heure, jour: _selectionIso);
      if (mounted) _annoncer(tr('Inscription confirmée pour {heure} !').replaceAll('{heure}', heure));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _deplacer(CreneauPriere ancien, CreneauPriere nouveau) async {
    final ancienLibelle = libelleCreneauPriere(ancien.heure);
    final nouveauLibelle = libelleCreneauPriere(nouveau.heure);
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Déplacer votre créneau ?')),
        content: Text(tr('La règle limite à un créneau par jour. Voulez-vous déplacer votre engagement de {ancien} vers {nouveau} ?')
            .replaceAll('{ancien}', ancienLibelle)
            .replaceAll('{nouveau}', nouveauLibelle)),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr('Déplacer ici'))),
        ],
      ),
    );
    if (confirmer != true) return;
    setState(() => _enCours = true);
    try {
      await _client.engagerCreneauPriere(nouveau.heure, jour: _selectionIso, deplacer: true);
      if (mounted) _annoncer(tr('Créneau déplacé à {heure} !').replaceAll('{heure}', nouveauLibelle));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _liberer(CreneauPriere creneau) async {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Libérer votre créneau ?')),
        content: Text(tr('Ton créneau redeviendra libre pour un autre membre.')),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(
            onPressed: () => Navigator.of(c).pop(true),
            style: TextButton.styleFrom(foregroundColor: _rose),
            child: Text(tr('Libérer le créneau')),
          ),
        ],
      ),
    );
    if (confirmer != true) return;
    setState(() => _enCours = true);
    try {
      await _client.libererCreneauPriere(jour: _selectionIso);
      if (mounted) _annoncer(tr('Créneau libéré.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _afficherRegle() async {
    await showDialog<void>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Fonctionnement')),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(tr('Pour assurer une couverture continue de 24 heures dans la prière, la règle suivante s’applique :')),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: _fond,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: _bordure),
              ),
              child: Text(
                tr('Un membre par créneau, un créneau par membre et par jour.'),
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(), child: Text(tr("J'ai compris"))),
        ],
      ),
    );
  }

  Widget _hero() {
    final couverts = heuresCouvertesPriere(_creneaux);
    final restants = nbCreneauxPriere - couverts;
    final progression = couverts / nbCreneauxPriere;
    final sousTitre = restants == 0
        ? tr('Tous les créneaux sont couverts.')
        : restants == 1
            ? tr(_estAujourdHui
                ? 'Encore 1 créneau disponible aujourd’hui.'
                : 'Encore 1 créneau disponible ce jour-là.')
            : tr(_estAujourdHui
                    ? 'Encore {n} créneaux disponibles aujourd’hui.'
                    : 'Encore {n} créneaux disponibles ce jour-là.')
                .replaceAll('{n}', '$restants');
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [_nuit, Color(0xFF1E293B)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.05),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
              ),
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.chevron_left, color: Colors.white70),
                    onPressed: () => _changerJour(-1),
                    tooltip: tr('Jour précédent'),
                  ),
                  Expanded(
                    child: Column(
                      children: [
                        Text(
                          libelleDateChaine(_selection),
                          style: const TextStyle(color: _or, fontWeight: FontWeight.w700, fontSize: 14),
                        ),
                        Text(
                          libelleRelatifChaine(_selection, _aujourdHuiDate),
                          style: const TextStyle(color: Colors.white70, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.chevron_right, color: Colors.white70),
                    onPressed: () => _changerJour(1),
                    tooltip: tr('Jour suivant'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text.rich(
                        TextSpan(
                          children: [
                            TextSpan(
                              text: '$couverts',
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 30),
                            ),
                            TextSpan(
                              text: ' h ${tr('couvertes sur 24')}',
                              style: const TextStyle(color: Colors.white, fontSize: 14),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(sousTitre, style: const TextStyle(color: Colors.white70, fontSize: 12)),
                      const SizedBox(height: 14),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(999),
                        child: LinearProgressIndicator(
                          value: progression,
                          minHeight: 8,
                          backgroundColor: Colors.white.withValues(alpha: 0.1),
                          valueColor: const AlwaysStoppedAnimation<Color>(_ambre),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                SizedBox(
                  width: 64,
                  height: 64,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      SizedBox(
                        width: 64,
                        height: 64,
                        child: CircularProgressIndicator(
                          value: progression,
                          strokeWidth: 5.5,
                          backgroundColor: Colors.white.withValues(alpha: 0.1),
                          valueColor: const AlwaysStoppedAnimation<Color>(_ambre),
                        ),
                      ),
                      Text(
                        '${(progression * 100).round()}%',
                        style: const TextStyle(color: _ambre, fontWeight: FontWeight.w800, fontSize: 12),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  bool _estEnCours(CreneauPriere creneau) =>
      _estAujourdHui && creneau.heure == DateTime.now().hour;

  Widget _avatar(CreneauPriere creneau, bool mien, {double taille = 40}) {
    if (creneau.estLibre) {
      return Container(
        width: taille,
        height: taille,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: const Color(0xFFCBD5E1), width: 1.5),
          color: Colors.white,
        ),
        child: const Icon(Icons.add, color: _grisTexte, size: 20),
      );
    }
    if (mien) {
      return Container(
        width: taille,
        height: taille,
        decoration: const BoxDecoration(shape: BoxShape.circle, color: _ambre),
        alignment: Alignment.center,
        child: Text(
          initialesDepuisNom(tr('Vous')),
          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 12),
        ),
      );
    }
    final (fond, texte) = teinteAvatarChaine(creneau.membreId);
    return Container(
      width: taille,
      height: taille,
      decoration: BoxDecoration(shape: BoxShape.circle, color: fond),
      alignment: Alignment.center,
      child: Text(
        initialesDepuisNom(creneau.prenom),
        style: TextStyle(color: texte, fontWeight: FontWeight.w800, fontSize: 12),
      ),
    );
  }

  Widget _carteListe(CreneauPriere creneau) {
    final mien = creneau.estMien(_monMembreId);
    final enCours = _estEnCours(creneau);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
      child: InkWell(
        onTap: () => _toucher(creneau),
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: mien ? _ambreClair : Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: mien ? _ambre : _bordure, width: mien ? 2 : 1),
          ),
          child: Row(
            children: [
              _avatar(creneau, mien),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          libelleCreneauPriere(creneau.heure),
                          style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14),
                        ),
                        if (enCours) ...[const SizedBox(width: 8), _pastilleEnCours()],
                      ],
                    ),
                    const SizedBox(height: 2),
                    if (mien)
                      Text(
                        '${tr('Votre créneau')} • ${tr('Engagé')}',
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF92400E)),
                      )
                    else if (creneau.estLibre)
                      Text(tr('Créneau libre'), style: const TextStyle(fontSize: 12, color: _grisTexte))
                    else
                      Text(creneau.prenom, style: const TextStyle(fontSize: 12, color: _grisTexte)),
                  ],
                ),
              ),
              if (!_estPasse) ...[
                if (mien)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: const Color(0xFFFCD34D)),
                    ),
                    child: Text(
                      tr('Gérer'),
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF92400E)),
                    ),
                  )
                else if (creneau.estLibre)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                    decoration: BoxDecoration(
                      color: _fond,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(
                      tr('Choisir'),
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: _nuit),
                    ),
                  )
                else
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: _vertFond,
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: _vertBordure),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.check, size: 12, color: _vertTexte),
                        const SizedBox(width: 4),
                        Text(
                          tr('Couvert'),
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _vertTexte),
                        ),
                      ],
                    ),
                  ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _carteGrille(CreneauPriere creneau) {
    final mien = creneau.estMien(_monMembreId);
    final enCours = _estEnCours(creneau);
    return InkWell(
      onTap: () => _toucher(creneau),
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: mien ? _ambreClair : Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: mien ? _ambre : _bordure, width: mien ? 2 : 1),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  libelleCreneauPriere(creneau.heure),
                  style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
                ),
                if (enCours) const _PointEnCours(),
              ],
            ),
            const SizedBox(height: 8),
            if (mien)
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    tr('Vous'),
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF92400E)),
                  ),
                  if (!_estPasse)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(color: _ambre, borderRadius: BorderRadius.circular(999)),
                      child: Text(
                        tr('Gérer'),
                        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.white),
                      ),
                    ),
                ],
              )
            else if (creneau.estLibre)
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(tr('Libre'), style: const TextStyle(fontSize: 11, color: _grisTexte)),
                  if (!_estPasse)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: _fond, borderRadius: BorderRadius.circular(999)),
                      child: Text(
                        '+ ${tr('Choisir')}',
                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _nuit),
                      ),
                    ),
                ],
              )
            else
              Row(
                children: [
                  _avatar(creneau, false, taille: 24),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      creneau.prenom,
                      style: const TextStyle(fontSize: 12, color: _grisTexte),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }

  Widget _enTeteSection(MomentChaine moment) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 2),
      child: Row(
        children: [
          Text(
            libelleMomentChaine(moment).toUpperCase(),
            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Color(0xFF94A3B8)),
          ),
          const SizedBox(width: 8),
          const Expanded(child: Divider(color: _bordure, height: 1)),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final filtres = creneauxFiltresChaine(_creneaux, _filtre);
    final enfants = <Widget>[];
    if (!_grille) {
      for (final c in filtres) {
        if (_filtre == null && (c.heure == 0 || c.heure == 6 || c.heure == 12 || c.heure == 18)) {
          enfants.add(_enTeteSection(momentChaine(c.heure)));
        }
        enfants.add(_carteListe(c));
      }
      enfants.add(const SizedBox(height: 24));
    }
    return Scaffold(
      backgroundColor: _fond,
      appBar: AppBar(
        title: Text(tr('Chaîne de prière')),
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            tooltip: tr('Règle'),
            onPressed: _afficherRegle,
          ),
        ],
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _charger,
              child: CustomScrollView(
                slivers: [
                  SliverToBoxAdapter(child: _hero()),
                  SliverPersistentHeader(
                    pinned: true,
                    delegate: _BarreFiltresChaine(
                      filtre: _filtre,
                      grille: _grille,
                      onFiltre: (m) => setState(() => _filtre = m),
                      onGrille: (g) => setState(() => _grille = g),
                    ),
                  ),
                  if (_grille)
                    SliverPadding(
                      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
                      sliver: SliverGrid(
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          mainAxisSpacing: 10,
                          crossAxisSpacing: 10,
                          childAspectRatio: 1.7,
                        ),
                        delegate: SliverChildBuilderDelegate(
                          (context, index) => _carteGrille(filtres[index]),
                          childCount: filtres.length,
                        ),
                      ),
                    )
                  else
                    SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, index) => enfants[index],
                        childCount: enfants.length,
                      ),
                    ),
                ],
              ),
            ),
    );
  }
}

/// Barre de filtres épinglée de la maquette, avec la bascule
/// liste ou grille.
class _BarreFiltresChaine extends SliverPersistentHeaderDelegate {
  _BarreFiltresChaine({
    required this.filtre,
    required this.grille,
    required this.onFiltre,
    required this.onGrille,
  });

  final MomentChaine? filtre;
  final bool grille;
  final ValueChanged<MomentChaine?> onFiltre;
  final ValueChanged<bool> onGrille;

  @override
  double get minExtent => 56;

  @override
  double get maxExtent => 56;

  Widget _pastille(BuildContext context, String libelle, MomentChaine? moment) {
    final actif = filtre == moment;
    return Padding(
      padding: const EdgeInsets.only(right: 6),
      child: GestureDetector(
        onTap: () => onFiltre(moment),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
          decoration: BoxDecoration(
            color: actif ? _nuit : Colors.white,
            borderRadius: BorderRadius.circular(999),
            border: actif ? null : Border.all(color: _bordure),
          ),
          child: Text(
            libelle,
            style: TextStyle(
              fontSize: 12,
              fontWeight: actif ? FontWeight.w700 : FontWeight.w500,
              color: actif ? Colors.white : _grisTexte,
            ),
          ),
        ),
      ),
    );
  }

  Widget _boutonVue(IconData icone, bool actif, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(6),
        decoration: BoxDecoration(
          color: actif ? _nuit : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icone, size: 18, color: actif ? Colors.white : _grisTexte),
      ),
    );
  }

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Container(
      height: maxExtent,
      color: _fond,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _pastille(context, '${tr('Tout')} (24)', null),
                  _pastille(context, '${tr('Nuit')} (0h-6h)', MomentChaine.nuit),
                  _pastille(context, '${tr('Matin')} (6h-12h)', MomentChaine.matin),
                  _pastille(context, '${tr('Après-midi')} (12h-18h)', MomentChaine.apresMidi),
                  _pastille(context, '${tr('Soir')} (18h-0h)', MomentChaine.soir),
                ],
              ),
            ),
          ),
          const SizedBox(width: 8),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: _bordure),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _boutonVue(Icons.list_outlined, !grille, () => onGrille(false)),
                _boutonVue(Icons.grid_view_outlined, grille, () => onGrille(true)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  bool shouldRebuild(covariant _BarreFiltresChaine ancien) =>
      ancien.filtre != filtre || ancien.grille != grille;
}
