// Nouvelle Bible, tranche T6, 26 nov. 2026.
// Accueil : deux onglets, Ancien Testament et Nouveau
// Testament, aucune liste de livres avant un toucher, les
// livres n'apparaissent qu'après un toucher. Remise à zéro à
// chaque arrivée : la coquille reconstruit la page avec une
// clé neuve à chaque choix de l'onglet Bible, donc aucun
// onglet actif, aucune liste au retour. Pas de carte Verset
// du jour dans Bible, texte « Version Louis Segond 1910 ».
// 66 livres avec grilles de chapitres, lecture verset par
// verset avec sélection, surlignage, note, étiquette, lien,
// partage, favori, audio, recherche sans accents,
// dictionnaire par mot touché, plan de lecture 365 jours
// avec badges, reprise de lecture, tuiles Recherche,
// Dictionnaire, Favoris, Plan de lecture, Réglages.
// Textes de la Bible réelle seulement, via ServiceBible.
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../bible.dart';
import '../littre.dart';
import '../parcours_bible.dart';
import 'modeles_bible.dart';
import 'palette.dart';
import 'service_bible.dart';

enum _Vue { accueil, chapitres, lecture, recherche, dictionnaire, favoris, plan, reglages }

class PageBibleNouvelle extends StatefulWidget {
  const PageBibleNouvelle({
    super.key,
    this.service,
    this.lang = 'fr',
    this.livreInitial,
    this.chapitreInitial,
  });
  final ServiceBible? service;
  final String lang;

  /// Ouverture directe d'un chapitre, depuis la Prière du
  /// jour ou le plan de lecture, à la bascule T11.
  final int? livreInitial;
  final int? chapitreInitial;

  @override
  State<PageBibleNouvelle> createState() => _PageBibleNouvelleState();
}

class _PageBibleNouvelleState extends State<PageBibleNouvelle> {
  late final ServiceBible _service;
  _Vue _vue = _Vue.accueil;
  bool? _ongletAncien;
  int? _livre;
  int? _chapitre;
  int? _versetSelectionne;
  BibleVerseRef? _reprise;
  List<BibleBook> _livres = const [];
  List<BibleHit> _resultats = const [];
  List<BibleVerseRef> _favoris = const [];
  List<LittreEntry> _definitions = const [];
  Set<int> _joursLus = {};
  Set<int> _surlignes = {};
  bool _favoriSelectionne = false;
  bool _enCoursAudio = false;
  bool _dictionnaireCherche = false;
  double _tailleTexte = 16;
  final _rechercheCtrl = TextEditingController();
  final _dictCtrl = TextEditingController();

  ServiceBible get _svc => _service;
  String get _lang => widget.lang;

  @override
  void initState() {
    super.initState();
    _service = widget.service ?? ServiceBibleReel();
    _charger();
    _chargerTaille();
    if (widget.livreInitial != null && widget.chapitreInitial != null) {
      _livre = widget.livreInitial;
      _chapitre = widget.chapitreInitial;
      _vue = _Vue.lecture;
    } else if (widget.livreInitial != null) {
      _livre = widget.livreInitial;
      _vue = _Vue.chapitres;
    }
  }

  Future<void> _chargerTaille() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final taille = prefs.getDouble('nouveau_bible_taille_texte');
      if (taille != null && mounted) setState(() => _tailleTexte = taille);
    } catch (_) {}
  }

  Future<void> _charger() async {
    await _svc.charger();
    final reprise = await _svc.reprise(_lang);
    if (!mounted) return;
    setState(() {
      _livres = _svc.livres(_lang);
      _reprise = reprise;
    });
  }

  @override
  void dispose() {
    _rechercheCtrl.dispose();
    _dictCtrl.dispose();
    _svc.arreterAudio();
    super.dispose();
  }

  void _retourAccueil() {
    setState(() {
      _vue = _Vue.accueil;
      _ongletAncien = null;
      _livre = null;
      _chapitre = null;
      _versetSelectionne = null;
    });
  }

  void _ouvrirLecture(int livre, int chapitre) {
    final ref = BibleVerseRef(livre, chapitre, 1,
        _svc.texteVerset(_lang, livre, chapitre, 1) ?? '');
    _svc.enregistrerReprise(_lang, ref);
    setState(() {
      _livre = livre;
      _chapitre = chapitre;
      _vue = _Vue.lecture;
      _versetSelectionne = null;
      _reprise = ref;
    });
    _chargerSurlignes();
  }

  String _nomLivre(int livre) =>
      _livres.isNotEmpty && livre < _livres.length
          ? _livres[livre].name
          : _svc.nomLivre(_lang, livre);

  List<String> _versets() {
    if (_livre == null || _chapitre == null) return const [];
    return _svc.versetsChapitre(_lang, _livre!, _chapitre!);
  }

  Future<void> _chargerSurlignes() async {
    if (_livre == null || _chapitre == null) return;
    final versets = _versets();
    final trouves = <int>{};
    for (var i = 0; i < versets.length; i++) {
      final ref = BibleVerseRef(
          _livre!, _chapitre!, i + 1, versets[i]);
      if (await _svc.estSurligne(_lang, ref)) trouves.add(i + 1);
    }
    if (mounted) setState(() => _surlignes = trouves);
  }

  Future<void> _selectionnerVerset(int verset) async {
    final ref = BibleVerseRef(_livre!, _chapitre!, verset,
        _svc.texteVerset(_lang, _livre!, _chapitre!, verset) ?? '');
    final favori = await _svc.estFavori(_lang, ref);
    final surligne = await _svc.estSurligne(_lang, ref);
    if (!mounted) return;
    setState(() {
      _versetSelectionne = verset;
      _favoriSelectionne = favori;
      if (surligne) {
        _surlignes = {..._surlignes, verset};
      } else {
        _surlignes = {..._surlignes}..remove(verset);
      }
    });
  }

  BibleVerseRef? get _refSelectionnee {
    final v = _versetSelectionne;
    if (v == null || _livre == null || _chapitre == null) return null;
    return BibleVerseRef(_livre!, _chapitre!, v,
        _svc.texteVerset(_lang, _livre!, _chapitre!, v) ?? '');
  }

  Future<void> _demanderTexte({
    required String titre,
    required String indication,
    required Future<String?> valeurInitiale,
    required Future<void> Function(String) enregistrer,
  }) async {
    final initiale = await valeurInitiale;
    if (!mounted) return;
    final ctrl = TextEditingController(text: initiale ?? '');
    final saisie = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(titre),
        content: TextField(
          controller: ctrl,
          decoration: InputDecoration(hintText: indication),
          maxLines: 3,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, ctrl.text),
            child: const Text('Enregistrer'),
          ),
        ],
      ),
    );
    if (saisie == null) return;
    final ref = _refSelectionnee;
    if (ref != null) await enregistrer(saisie);
  }

  void _ouvrirDictionnaireMot(String mot) {
    final propre = mot.replaceAll(RegExp(r'[^A-Za-zÀ-ÿœŒæÆ-]'), '');
    if (propre.isEmpty) return;
    showModalBottomSheet<void>(
      context: context,
      builder: (ctx) => FutureBuilder<List<LittreEntry>>(
        future: _svc.definir(propre),
        builder: (context, snap) {
          final entrees = snap.data ?? const <LittreEntry>[];
          return Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(propre,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                if (!snap.hasData)
                  const CircularProgressIndicator()
                else if (entrees.isEmpty)
                  const Text('Aucune entrée trouvée pour ce mot.')
                else
                  Flexible(
                    child: ListView(
                      shrinkWrap: true,
                      children: [
                        for (final e in entrees) ...[
                          Text(e.word,
                              style: const TextStyle(
                                  fontWeight: FontWeight.w700)),
                          if (e.nature.isNotEmpty) Text(e.nature),
                          for (final d in e.definitions)
                            Padding(
                              padding:
                                  const EdgeInsets.only(top: 4),
                              child: Text(d),
                            ),
                        ],
                      ],
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }

  Future<void> _chercherDictionnaire(String mot) async {
    final entrees = await _svc.definir(mot);
    if (!mounted) return;
    setState(() {
      _definitions = entrees;
      _dictionnaireCherche = true;
    });
  }

  Future<void> _chargerFavoris() async {
    final liste = await _svc.favoris(_lang);
    if (mounted) setState(() => _favoris = liste);
  }

  Future<void> _chargerPlan() async {
    final lus = await _svc.joursLusPlan();
    if (mounted) setState(() => _joursLus = lus);
  }

  @override
  Widget build(BuildContext context) {
    return switch (_vue) {
      _Vue.accueil => _accueil(),
      _Vue.chapitres => _chapitres(),
      _Vue.lecture => _lecture(),
      _Vue.recherche => _recherche(),
      _Vue.dictionnaire => _dictionnaire(),
      _Vue.favoris => _favorisVue(),
      _Vue.plan => _plan(),
      _Vue.reglages => _reglages(),
    };
  }

  Widget _entete({required String titre, VoidCallback? onRetour}) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(8, 12, 16, 12),
      child: Row(
        children: [
          if (onRetour != null)
            IconButton(
              icon: const Icon(Icons.arrow_back,
                  color: PaletteNouvelle.bleuNuit),
              onPressed: onRetour,
            ),
          Expanded(
            child: Text(
              titre,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                color: PaletteNouvelle.bleuNuit,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _accueil() {
    final ancien = _ongletAncien;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
      children: [
        const Text(
          'Bible',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w800,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 4),
        const Text(
          'Version Louis Segond 1910',
          style: TextStyle(fontSize: 14, color: Colors.black54),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _boutonOnglet('Ancien Testament', ancien == true,
                  () => setState(() => _ongletAncien = true)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _boutonOnglet('Nouveau Testament', ancien == false,
                  () => setState(() => _ongletAncien = false)),
            ),
          ],
        ),
        if (ancien != null) ...[
          const SizedBox(height: 16),
          for (final groupe in groupesTestament(ancien)) ...[
            Padding(
              padding: const EdgeInsets.only(top: 12, bottom: 4),
              child: Text(
                groupe.titre,
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w800,
                  color: PaletteNouvelle.bleuNuit,
                ),
              ),
            ),
            for (var i = groupe.debut; i <= groupe.fin; i++)
              _tuileLivre(i),
          ],
        ],
        const SizedBox(height: 20),
        if (_reprise != null)
          _tuileAction(
            icone: Icons.bookmark_outlined,
            titre: 'Reprendre la lecture',
            sousTitre:
                '${_nomLivre(_reprise!.book)} ${_reprise!.chapter}:${_reprise!.verse}',
            onTap: () =>
                _ouvrirLecture(_reprise!.book, _reprise!.chapter),
          ),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 2.2,
          children: [
            _tuileGrille(Icons.search, 'Recherche', _Vue.recherche,
                onOuvrir: null),
            _tuileGrille(Icons.book_outlined, 'Dictionnaire',
                _Vue.dictionnaire, onOuvrir: null),
            _tuileGrille(Icons.star_outlined, 'Favoris', _Vue.favoris,
                onOuvrir: () => _chargerFavoris()),
            _tuileGrille(Icons.calendar_month_outlined, 'Plan de lecture',
                _Vue.plan, onOuvrir: () => _chargerPlan()),
            _tuileGrille(Icons.settings_outlined, 'Réglages',
                _Vue.reglages, onOuvrir: null),
          ],
        ),
      ],
    );
  }

  Widget _boutonOnglet(String titre, bool actif, VoidCallback onTap) {
    return FilledButton(
      onPressed: onTap,
      style: FilledButton.styleFrom(
        backgroundColor:
            actif ? PaletteNouvelle.bleuNuit : Colors.white,
        foregroundColor:
            actif ? Colors.white : PaletteNouvelle.bleuNuit,
        side: const BorderSide(color: PaletteNouvelle.bleuNuit),
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12)),
      ),
      child: Text(titre,
          textAlign: TextAlign.center,
          style:
              const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
    );
  }

  Widget _tuileLivre(int livre) {
    final chapitres =
        livre < _livres.length ? _livres[livre].chapters.length : 0;
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        title: Text(_nomLivre(livre),
            style: const TextStyle(fontWeight: FontWeight.w700)),
        subtitle: chapitres > 0
            ? Text('$chapitres chapitres')
            : null,
        trailing: const Icon(Icons.chevron_right,
            color: PaletteNouvelle.bleuNuit),
        onTap: () => setState(() {
          _livre = livre;
          _vue = _Vue.chapitres;
        }),
      ),
    );
  }

  Widget _tuileAction({
    required IconData icone,
    required String titre,
    required String sousTitre,
    required VoidCallback onTap,
  }) {
    return Card(
      color: PaletteNouvelle.bleuNuit,
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(icone, color: PaletteNouvelle.or),
        title: Text(titre,
            style: const TextStyle(
                color: Colors.white, fontWeight: FontWeight.w700)),
        subtitle: Text(sousTitre,
            style: const TextStyle(color: Colors.white70)),
        trailing: const Icon(Icons.chevron_right, color: Colors.white),
        onTap: onTap,
      ),
    );
  }

  Widget _tuileGrille(IconData icone, String titre, _Vue vue,
      {VoidCallback? onOuvrir}) {
    return Card(
      color: Colors.white,
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () {
          onOuvrir?.call();
          setState(() => _vue = vue);
        },
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Icon(icone, color: PaletteNouvelle.bleuNuit),
              const SizedBox(width: 8),
              Expanded(
                child: Text(titre,
                    style: const TextStyle(fontWeight: FontWeight.w700)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _chapitres() {
    final livre = _livre ?? 0;
    final nb = livre < _livres.length ? _livres[livre].chapters.length : 0;
    return Column(
      children: [
        _entete(titre: _nomLivre(livre), onRetour: _retourAccueil),
        Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.all(16),
            gridDelegate:
                const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 5,
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
            ),
            itemCount: nb,
            itemBuilder: (context, i) => FilledButton(
              onPressed: () => _ouvrirLecture(livre, i + 1),
              style: FilledButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: PaletteNouvelle.bleuNuit,
                side: const BorderSide(
                    color: PaletteNouvelle.bleuNuit),
                padding: EdgeInsets.zero,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10)),
              ),
              child: Text('${i + 1}',
                  style: const TextStyle(fontWeight: FontWeight.w700)),
            ),
          ),
        ),
      ],
    );
  }

  Widget _lecture() {
    final livre = _livre ?? 0;
    final chapitre = _chapitre ?? 1;
    final versets = _versets();
    final ref = _refSelectionnee;
    return Column(
      children: [
        _entete(
          titre: '${_nomLivre(livre)} $chapitre',
          onRetour: _retourAccueil,
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
          child: Row(
            children: [
              OutlinedButton.icon(
                onPressed: () async {
                  if (_enCoursAudio) {
                    await _svc.arreterAudio();
                    if (mounted) setState(() => _enCoursAudio = false);
                  } else {
                    setState(() => _enCoursAudio = true);
                    await _svc.ecouterChapitre(_lang, livre, chapitre);
                    if (mounted) setState(() => _enCoursAudio = false);
                  }
                },
                icon: Icon(_enCoursAudio ? Icons.stop : Icons.play_arrow),
                label: Text(_enCoursAudio ? 'Arrêter' : 'Écouter'),
              ),
            ],
          ),
        ),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            itemCount: versets.length,
            itemBuilder: (context, i) {
              final numero = i + 1;
              final selectionne = _versetSelectionne == numero;
              final surligne = _surlignes.contains(numero);
              return GestureDetector(
                key: ValueKey('verset_$numero'),
                onTap: () => _selectionnerVerset(numero),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  color: selectionne
                      ? PaletteNouvelle.or.withValues(alpha: 0.25)
                      : surligne
                          ? PaletteNouvelle.or.withValues(alpha: 0.15)
                          : Colors.transparent,
                  child: RichText(
                    text: TextSpan(
                      style: TextStyle(
                        fontSize: _tailleTexte,
                        color: Colors.black87,
                        height: 1.5,
                      ),
                      children: [
                        TextSpan(
                          text: '$numero ',
                          style: const TextStyle(
                            fontWeight: FontWeight.w800,
                            color: PaletteNouvelle.orFonce,
                          ),
                        ),
                        ..._spansMot(versets[i]),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        if (ref != null) _barreVerset(ref),
      ],
    );
  }

  /// Chaque mot du verset est touchable : un toucher ouvre
  /// le dictionnaire sur ce mot, sans quitter la lecture.
  List<TextSpan> _spansMot(String texte) {
    final mots = texte.split(' ');
    final spans = <TextSpan>[];
    for (var i = 0; i < mots.length; i++) {
      final mot = mots[i];
      spans.add(TextSpan(
        text: mot,
        recognizer: TapGestureRecognizer()
          ..onTap = () => _ouvrirDictionnaireMot(mot),
      ));
      if (i < mots.length - 1) spans.add(const TextSpan(text: ' '));
    }
    return spans;
  }

  Widget _barreVerset(BibleVerseRef ref) {
    final label =
        '${_nomLivre(ref.book)} ${ref.chapter}:${ref.verse}';
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(8, 8, 8, 12),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(label,
              style: const TextStyle(fontWeight: FontWeight.w800)),
          const SizedBox(height: 6),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _actionVerset(Icons.highlight_outlined, 'Surligner',
                    () async {
                  await _svc.basculerSurlignage(_lang, ref);
                  await _chargerSurlignes();
                }),
                _actionVerset(Icons.note_outlined, 'Note', () {
                  _demanderTexte(
                    titre: 'Note',
                    indication: 'Écrire une note…',
                    valeurInitiale: _svc.note(_lang, ref),
                    enregistrer: (v) =>
                        _svc.enregistrerNote(_lang, ref, v),
                  );
                }),
                _actionVerset(Icons.label_outlined, 'Étiquette', () {
                  _demanderTexte(
                    titre: 'Étiquette',
                    indication: 'Étiquette…',
                    valeurInitiale: _svc.etiquette(_lang, ref),
                    enregistrer: (v) =>
                        _svc.enregistrerEtiquette(_lang, ref, v),
                  );
                }),
                _actionVerset(Icons.link_outlined, 'Lien', () {
                  _demanderTexte(
                    titre: 'Lien vers un verset',
                    indication: 'Par exemple Jean 3:16',
                    valeurInitiale: _svc.lien(_lang, ref),
                    enregistrer: (v) =>
                        _svc.enregistrerLien(_lang, ref, v),
                  );
                }),
                _actionVerset(Icons.share_outlined, 'Partager', () {
                  _svc.partager('$label\n${ref.text}');
                }),
                _actionVerset(
                    _favoriSelectionne
                        ? Icons.star
                        : Icons.star_outlined,
                    'Favori', () async {
                  await _svc.basculerFavori(_lang, ref);
                  if (mounted) {
                    setState(() =>
                        _favoriSelectionne = !_favoriSelectionne);
                  }
                }),
                _actionVerset(Icons.play_arrow_outlined, 'Écouter',
                    () async {
                  await _svc.ecouterVerset(_lang, ref);
                }),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _actionVerset(IconData icone, String titre, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icone, color: PaletteNouvelle.bleuNuit),
              Text(titre, style: const TextStyle(fontSize: 11)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _recherche() {
    return Column(
      children: [
        _entete(titre: 'Recherche', onRetour: _retourAccueil),
        Padding(
          padding: const EdgeInsets.all(16),
          child: TextField(
            controller: _rechercheCtrl,
            decoration: const InputDecoration(
              hintText: 'Rechercher un mot, sans accents…',
              prefixIcon: Icon(Icons.search),
              border: OutlineInputBorder(),
              filled: true,
              fillColor: Colors.white,
            ),
            onChanged: (v) {
              setState(() => _resultats = _svc.rechercher(_lang, v));
            },
          ),
        ),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: _resultats.length,
            itemBuilder: (context, i) {
              final hit = _resultats[i];
              return Card(
                color: Colors.white,
                child: ListTile(
                  title: Text(
                    '${_nomLivre(hit.book)} ${hit.chapter}:${hit.verse}',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                  subtitle: Text(hit.text,
                      maxLines: 2, overflow: TextOverflow.ellipsis),
                  onTap: () => _ouvrirLecture(hit.book, hit.chapter),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _dictionnaire() {
    return Column(
      children: [
        _entete(titre: 'Dictionnaire', onRetour: _retourAccueil),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _dictCtrl,
                  decoration: const InputDecoration(
                    hintText: 'Rechercher un mot…',
                    border: OutlineInputBorder(),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                  onSubmitted: _chercherDictionnaire,
                ),
              ),
              const SizedBox(width: 8),
              FilledButton(
                onPressed: () =>
                    _chercherDictionnaire(_dictCtrl.text),
                child: const Text('Chercher'),
              ),
            ],
          ),
        ),
        Expanded(
          child: _dictionnaireCherche && _definitions.isEmpty
              ? const Center(
                  child: Text('Aucune entrée trouvée pour ce mot.'),
                )
              : ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: _definitions.length,
                  itemBuilder: (context, i) {
                    final e = _definitions[i];
                    return Card(
                      color: Colors.white,
                      child: ListTile(
                        title: Text(e.word,
                            style: const TextStyle(
                                fontWeight: FontWeight.w800)),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (e.nature.isNotEmpty) Text(e.nature),
                            for (final d in e.definitions)
                              Padding(
                                padding:
                                    const EdgeInsets.only(top: 4),
                                child: Text(d),
                              ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _favorisVue() {
    return Column(
      children: [
        _entete(titre: 'Favoris', onRetour: _retourAccueil),
        Expanded(
          child: _favoris.isEmpty
              ? const Center(
                  child: Text('Aucun verset favori pour l’instant.'),
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _favoris.length,
                  itemBuilder: (context, i) {
                    final ref = _favoris[i];
                    return Card(
                      color: Colors.white,
                      child: ListTile(
                        title: Text(
                          '${_nomLivre(ref.book)} ${ref.chapter}:${ref.verse}',
                          style: const TextStyle(
                              fontWeight: FontWeight.w700),
                        ),
                        subtitle: Text(ref.text,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis),
                        trailing: const Icon(Icons.star,
                            color: PaletteNouvelle.or),
                        onTap: () =>
                            _ouvrirLecture(ref.book, ref.chapter),
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _plan() {
    final chapitresParLivre =
        _livres.map((b) => b.chapters.length).toList();
    final jours = chapitresParLivre.isEmpty
        ? <List<(int, int)>>[]
        : joursPlanAnnuel(chapitresParLivre);
    final gagnes = badgesLectureGagnes(_joursLus.length);
    return Column(
      children: [
        _entete(titre: 'Plan de lecture', onRetour: _retourAccueil),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Toute la Bible en 365 jours',
                  style: TextStyle(fontWeight: FontWeight.w800)),
              const SizedBox(height: 8),
              LinearProgressIndicator(
                value: _joursLus.length / nbJoursPlanAnnuel,
                color: PaletteNouvelle.or,
                backgroundColor: const Color(0xFFD8DEE8),
                minHeight: 8,
              ),
              const SizedBox(height: 8),
              Text('${_joursLus.length} / $nbJoursPlanAnnuel jours lus'),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: [
                  for (final id in idsBadgesLecture)
                    Chip(
                      label: Text(id),
                      avatar: Icon(
                        gagnes.contains(id)
                            ? Icons.check_circle_outlined
                            : Icons.lock_outlined,
                        size: 18,
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: nbJoursPlanAnnuel,
            itemBuilder: (context, index) {
              final jour = index + 1;
              final chapitres =
                  index < jours.length ? jours[index] : const <(int, int)>[];
              final noms = _livres.map((b) => b.name).toList();
              final libelle =
                  libelleJourPlanAnnuel(chapitres, noms);
              final lu = _joursLus.contains(jour);
              return Card(
                color: Colors.white,
                child: ListTile(
                  title: Text('Jour $jour',
                      style:
                          const TextStyle(fontWeight: FontWeight.w700)),
                  subtitle: libelle.isEmpty ? null : Text(libelle),
                  trailing: lu
                      ? OutlinedButton(
                          onPressed: () async {
                            await _svc.basculerJourPlan(jour);
                            await _chargerPlan();
                          },
                          child: const Text('Lu'),
                        )
                      : FilledButton(
                          onPressed: () async {
                            await _svc.basculerJourPlan(jour);
                            await _chargerPlan();
                          },
                          child: const Text('Marquer lu'),
                        ),
                  onTap: chapitres.isEmpty
                      ? null
                      : () => _ouvrirLecture(
                          chapitres.first.$1, chapitres.first.$2),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _reglages() {
    return Column(
      children: [
        _entete(titre: 'Réglages', onRetour: _retourAccueil),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Version Louis Segond 1910',
                  style: TextStyle(fontWeight: FontWeight.w800)),
              const SizedBox(height: 16),
              Text('Taille du texte : ${_tailleTexte.round()}'),
              Slider(
                value: _tailleTexte,
                min: 13,
                max: 22,
                divisions: 9,
                label: '${_tailleTexte.round()}',
                onChanged: (v) async {
                  setState(() => _tailleTexte = v);
                  try {
                    final prefs =
                        await SharedPreferences.getInstance();
                    await prefs.setDouble(
                        'nouveau_bible_taille_texte', v);
                  } catch (_) {}
                },
              ),
              const SizedBox(height: 8),
              const Text(
                'Favoris, notes, surlignages et progression du plan '
                'restent sur cet appareil.',
                style: TextStyle(color: Colors.black54),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
