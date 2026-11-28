// Journal personnel, salve 28 nov. 2026 : retour au journal du
// 25 novembre (arbre 0629962, SpiritualJournalPage), avec la
// palette nouvelle. Cinq onglets : Rêves, Projets, Orientations,
// Messages, Notes libres. Formulaires structurés par catégorie,
// création, modification, suppression avec confirmation,
// recherche par mot, date et catégorie, bilan privé, boutons
// Reprendre, Copier le texte, Lier à un message, préremplissage
// depuis la méditation. Modèle de données identique
// (SpiritualJournalStore, 4 catégories, stockage local), les
// anciennes notes se chargent, leurs champs structurés
// s'affichent de nouveau. Aucune écriture serveur, tout reste
// sur l'appareil.
import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../meditation_journal.dart';
import '../print_doc.dart';
import 'palette.dart';

class PageJournal extends StatefulWidget {
  const PageJournal({
    super.key,
    this.initialTab = 0,
    this.prefill,
    this.openForm = false,
  });

  /// Onglet initial, 0 à 4, pour l'ouverture depuis la méditation.
  final int initialTab;

  /// Champs préremplis du formulaire, depuis la méditation.
  final Map<String, dynamic>? prefill;

  /// Ouvre le formulaire dès le chargement, avec le préremplissage.
  final bool openForm;

  @override
  State<PageJournal> createState() => _PageJournalState();
}

class _PageJournalState extends State<PageJournal> {
  final _magasin = SpiritualJournalStore();
  final _formulaire = GlobalKey<FormState>();
  final _rechercheControleur = TextEditingController();
  var _charge = false;
  var _onglet = 0;
  var _recherche = '';
  var _rechercheToutes = false;
  var _formulaireOuvert = false;
  var _formulaireCategorie = 'reves';
  String? _modificationId;
  Map<String, String> _formulaireChamps = {};
  var _repriseEtape = '';

  static const _libellesOnglets = [
    'Rêves',
    'Projets',
    'Orientations',
    'Messages',
    'Notes libres',
  ];
  static const _libellesAjout = {
    'reves': 'Noter un rêve ou un songe',
    'projets': 'Noter un projet',
    'orientations': 'Noter une orientation ou une révélation',
    'messages': 'Préparer un message',
  };
  static const _horizons = ['Court terme', 'Moyen terme', 'Long terme'];
  static const _statuts = ['En attente', 'En cours', 'Accompli'];

  @override
  void initState() {
    super.initState();
    _onglet = widget.initialTab.clamp(0, 4);
    _charger();
  }

  @override
  void dispose() {
    _rechercheControleur.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await _magasin.load();
    if (!mounted) return;
    setState(() {
      _charge = true;
      if (widget.openForm && widget.prefill != null && _onglet <= 3) {
        _ouvrirFormulaire(
          kJournalCategories[_onglet],
          prefill: widget.prefill,
        );
      }
    });
  }

  void _message(String texte) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(texte)),
    );
  }

  Map<String, String> _defauts(String categorie) {
    final aujourdHui = journalTodayIso();
    switch (categorie) {
      case 'projets':
        return {
          'titre': '',
          'description': '',
          'horizon': 'Court terme',
          'statut': 'En attente',
          'date': aujourdHui,
        };
      case 'orientations':
        return {
          'type': 'Orientation',
          'titre': '',
          'description': '',
          'horizon': 'Court terme',
          'statut': 'En attente',
          'confirme': '',
          'date': aujourdHui,
        };
      case 'messages':
        return {
          'titre': '',
          'public': '',
          'duree': '',
          'theme': '',
          'accroche': '',
          'points': '',
          'illustration': '',
          'conclusion': '',
          'lien': '',
          'date': aujourdHui,
        };
      case 'reves':
      default:
        return {
          'titre': '',
          'date': aujourdHui,
          'recit': '',
          'symboles': '',
          'interp': '',
        };
    }
  }

  void _ouvrirFormulaire(
    String categorie, {
    Map<String, dynamic>? entree,
    Map<String, dynamic>? prefill,
    String repriseEtape = '',
  }) {
    final base = _defauts(categorie);
    if (entree != null) {
      for (final cle in base.keys) {
        base[cle] = (entree[cle] ?? '').toString();
      }
    }
    if (prefill != null) {
      prefill.forEach((cle, valeur) {
        base[cle.toString()] = (valeur ?? '').toString();
      });
    }
    setState(() {
      _formulaireCategorie = categorie;
      _formulaireChamps = base;
      _modificationId = entree == null ? null : '${entree['id']}';
      _formulaireOuvert = true;
      _repriseEtape = repriseEtape;
    });
  }

  void _fermerFormulaire() {
    setState(() {
      _formulaireOuvert = false;
      _modificationId = null;
      _repriseEtape = '';
    });
  }

  void _enregistrerFormulaire() {
    if (!(_formulaire.currentState?.validate() ?? false)) return;
    final categorie = _formulaireCategorie;
    final titre = (_formulaireChamps['titre'] ?? '').trim();
    final date = (_formulaireChamps['date'] ?? '').trim();
    final entree = <String, dynamic>{
      ..._formulaireChamps,
      'id': _modificationId ?? journalNewId(),
      'titre': titre,
      'date': date.isEmpty ? journalTodayIso() : date,
    };
    final liste = _magasin.data[categorie]!;
    final index =
        liste.indexWhere((e) => '${e['id']}' == '${entree['id']}');
    if (index >= 0) {
      liste[index] = entree;
    } else {
      liste.insert(0, entree);
    }
    _magasin.save();
    _fermerFormulaire();
    _message('Enregistré.');
  }

  Future<void> _confirmerSuppression(
    String categorie,
    Map<String, dynamic> entree,
  ) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Supprimer cette entrée ?'),
        content: Text((entree['titre'] ?? '').toString()),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Supprimer'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    _magasin.data[categorie]!
        .removeWhere((x) => '${x['id']}' == '${entree['id']}');
    await _magasin.save();
    if (mounted) setState(() {});
  }

  /// Lier à un message : crée un message à partir d'un rêve ou
  /// d'une orientation, et ouvre son brouillon à la première
  /// étape encore vide.
  void _lierAMessage(String categorie, Map<String, dynamic> entree) {
    final message =
        SpiritualJournalStore.messageFromEntry(categorie, entree);
    _magasin.data['messages']!.insert(0, message);
    _magasin.save();
    setState(() => _onglet = 3);
    _ouvrirFormulaire(
      'messages',
      entree: message,
      repriseEtape:
          SpiritualJournalStore.firstIncompleteMessageSection(message),
    );
    _message('Message créé à partir de cette entrée.');
  }

  /// Reprendre : rouvre le brouillon du message à la première
  /// étape encore vide, là où il s'était arrêté.
  void _reprendreMessage(Map<String, dynamic> entree) {
    _ouvrirFormulaire(
      'messages',
      entree: entree,
      repriseEtape:
          SpiritualJournalStore.firstIncompleteMessageSection(entree),
    );
  }

  Future<void> _exporter() async {
    if (_magasin.total == 0) {
      _message('Journal vide, rien à exporter.');
      return;
    }
    await downloadBytesFile(
      'journal-spirituel-connexion-prophetique.json',
      utf8.encode(_magasin.exportJson()),
      'application/json',
    );
  }

  Future<void> _importer() async {
    final choix = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: const ['json'],
      withData: true,
    );
    final f = choix?.files.single;
    final octets = f?.bytes;
    if (octets == null || octets.isEmpty) return;
    try {
      final brut = utf8.decode(octets);
      final decode = jsonDecode(brut);
      if (decode is! Map ||
          (decode['type'] != 'journal-spirituel' &&
              !decode.containsKey('reves') &&
              !decode.containsKey('messages'))) {
        _message('Ce fichier n’est pas une sauvegarde de journal.');
        return;
      }
      final ajoutees = _magasin.importJson(brut);
      await _magasin.save();
      if (!mounted) return;
      setState(() {});
      _message(
        ajoutees == 0
            ? 'Aucune nouvelle entrée à importer.'
            : '$ajoutees entrée(s) importée(s).',
      );
    } catch (_) {
      if (!mounted) return;
      _message('Fichier illisible.');
    }
  }

  String _date(String iso) {
    if (iso.length < 10) return iso;
    return '${iso.substring(8, 10)}/${iso.substring(5, 7)}/${iso.substring(0, 4)}';
  }

  /// Premier texte d'une entrée, pour la liste simple des
  /// Notes libres.
  String _texteSimple(Map<String, dynamic> e) {
    for (final cle in ['recit', 'description', 'accroche']) {
      final t = (e[cle] ?? '').toString().trim();
      if (t.isNotEmpty) return t;
    }
    return '';
  }

  Widget _etiquetteChamp(String texte) => Padding(
        padding: const EdgeInsets.only(bottom: 4),
        child: Text(
          texte,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w800,
            color: Colors.black54,
          ),
        ),
      );

  Widget _champTexte(String libelle, String cle, {int lignes = 1}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _etiquetteChamp(libelle),
        TextFormField(
          key: ValueKey(
              '${_modificationId ?? 'nouveau'}-$cle-${_formulaireChamps[cle]}'),
          initialValue: _formulaireChamps[cle] ?? '',
          maxLines: lignes,
          minLines: lignes > 1 ? lignes : 1,
          autofocus: _repriseEtape.isNotEmpty && _repriseEtape == libelle,
          onChanged: (v) => _formulaireChamps[cle] = v,
          validator: cle == 'titre'
              ? (v) =>
                  (v ?? '').trim().isEmpty ? 'Le titre est obligatoire.' : null
              : null,
          decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        const SizedBox(height: 12),
      ],
    );
  }

  Widget _champChoix(
    String libelle,
    String cle,
    List<String> options,
  ) {
    final valeur =
        options.contains(_formulaireChamps[cle]) ? _formulaireChamps[cle]! : options.first;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _etiquetteChamp(libelle),
        DropdownButtonFormField<String>(
          value: valeur,
          isExpanded: true,
          items: options
              .map((o) => DropdownMenuItem(value: o, child: Text(o)))
              .toList(),
          onChanged: (v) {
            if (v != null) _formulaireChamps[cle] = v;
          },
          decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        const SizedBox(height: 12),
      ],
    );
  }

  Widget _champDate() {
    final choisie = DateTime.tryParse(_formulaireChamps['date'] ?? '');
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _etiquetteChamp('Date'),
        TextFormField(
          key: ValueKey('date-${_formulaireChamps['date']}'),
          readOnly: true,
          initialValue: choisie == null
              ? (_formulaireChamps['date'] ?? '')
              : _date(_formulaireChamps['date']!),
          onTap: () async {
            final actuelle =
                DateTime.tryParse(_formulaireChamps['date'] ?? '') ??
                    DateTime.now();
            final choisieDate = await showDatePicker(
              context: context,
              initialDate: actuelle,
              firstDate: DateTime(2000),
              lastDate: DateTime(2100),
            );
            if (choisieDate != null) {
              setState(() => _formulaireChamps['date'] =
                  choisieDate.toIso8601String().substring(0, 10));
            }
          },
          decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white,
            suffixIcon: const Icon(Icons.calendar_today_outlined),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        const SizedBox(height: 12),
      ],
    );
  }

  Widget _champLien() {
    final options = <DropdownMenuItem<String>>[
      const DropdownMenuItem(value: '', child: Text('Aucun')),
      for (final e in _magasin.data['reves'] ?? const [])
        DropdownMenuItem(
          value: 'reves:${e['id']}',
          child: Text('Rêve : ${e['titre']}'),
        ),
      for (final e in (_magasin.data['orientations'] ?? const [])
          .where((e) => (e['type'] ?? '') == 'Révélation'))
        DropdownMenuItem(
          value: 'orientations:${e['id']}',
          child: Text('Révélation : ${e['titre']}'),
        ),
    ];
    final valeur = options.any((o) => o.value == _formulaireChamps['lien'])
        ? (_formulaireChamps['lien'] ?? '')
        : '';
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _etiquetteChamp('Lié à une entrée du journal'),
        DropdownButtonFormField<String>(
          value: valeur,
          isExpanded: true,
          items: options,
          onChanged: (v) {
            if (v != null) _formulaireChamps['lien'] = v;
          },
          decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        const SizedBox(height: 12),
      ],
    );
  }

  List<Widget> _champsFormulaire() {
    switch (_formulaireCategorie) {
      case 'projets':
        return [
          _champTexte('Titre *', 'titre'),
          _champTexte('Description', 'description', lignes: 3),
          _champChoix('Horizon', 'horizon', _horizons),
          _champChoix('Statut', 'statut', _statuts),
          _champDate(),
        ];
      case 'orientations':
        return [
          _champChoix('Type', 'type', const ['Orientation', 'Révélation']),
          _champTexte('Titre *', 'titre'),
          _champTexte('Description', 'description', lignes: 3),
          _champChoix('Horizon', 'horizon', _horizons),
          _champChoix('Statut', 'statut', _statuts),
          _champTexte(
            'Confirmé par (parole, conseil, témoignage)',
            'confirme',
          ),
          _champDate(),
        ];
      case 'messages':
        return [
          _champTexte('Titre *', 'titre'),
          _champTexte('Public visé', 'public'),
          _champTexte('Durée estimée (minutes)', 'duree'),
          _champTexte('Thème et passages clés', 'theme'),
          _champTexte('Accroche et introduction', 'accroche', lignes: 3),
          _champTexte('Points principaux', 'points', lignes: 3),
          _champTexte('Illustration', 'illustration', lignes: 3),
          _champTexte('Conclusion', 'conclusion', lignes: 3),
          _champLien(),
          _champDate(),
        ];
      case 'reves':
      default:
        return [
          _champTexte('Titre *', 'titre'),
          _champDate(),
          _champTexte('Récit : ce qui a été vu', 'recit', lignes: 4),
          _champTexte('Symboles et versets associés', 'symboles'),
          _champTexte(
            'Interprétation (à compléter plus tard)',
            'interp',
            lignes: 3,
          ),
        ];
    }
  }

  Widget _pastille(String texte) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: PaletteNouvelle.or.withValues(alpha: 0.12),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          texte,
          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700),
        ),
      );

  /// Petit bilan privé, en haut du journal, sans rien envoyer,
  /// sans rien publier.
  Widget _carteBilan() {
    const icones = {
      'reves': Icons.nightlight_outlined,
      'projets': Icons.flag_outlined,
      'orientations': Icons.explore_outlined,
      'messages': Icons.edit_outlined,
    };
    const libelles = {
      'reves': 'Rêves',
      'projets': 'Projets',
      'orientations': 'Orientations',
      'messages': 'Messages',
    };
    return Card(
      color: Colors.white,
      margin: EdgeInsets.zero,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(
                  Icons.lock_outlined,
                  size: 20,
                  color: PaletteNouvelle.orFonce,
                ),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Bilan privé',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: PaletteNouvelle.bleuNuit,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            const Text(
              'Sur cet appareil seulement, rien n’est envoyé ni publié.',
              style: TextStyle(color: Colors.black54),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final cat in kJournalCategories)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: PaletteNouvelle.or.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: PaletteNouvelle.or.withValues(alpha: 0.4),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          icones[cat]!,
                          size: 18,
                          color: PaletteNouvelle.orFonce,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          '${_magasin.count(cat)}',
                          style: const TextStyle(
                            fontWeight: FontWeight.w800,
                            color: PaletteNouvelle.bleuNuit,
                          ),
                        ),
                        const SizedBox(width: 6),
                        Text(libelles[cat]!),
                      ],
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              'Orientations accomplies : ${_magasin.accomplishedOrientations}',
              style: const TextStyle(fontWeight: FontWeight.w700),
            ),
          ],
        ),
      ),
    );
  }

  Widget _carteEntree(String categorie, Map<String, dynamic> e) {
    final dateBrute = (e['date'] ?? '').toString();
    final analysee = DateTime.tryParse(dateBrute);
    final dateLibelle = analysee == null ? dateBrute : _date(dateBrute);
    final pastilles = <Widget>[];
    if (categorie == 'orientations') {
      pastilles.add(_pastille((e['type'] ?? '').toString()));
      pastilles.add(_pastille((e['horizon'] ?? '').toString()));
      pastilles.add(_pastille((e['statut'] ?? '').toString()));
    } else if (categorie == 'projets') {
      pastilles.add(_pastille((e['horizon'] ?? '').toString()));
      pastilles.add(_pastille((e['statut'] ?? '').toString()));
    }
    Widget ligneCorps(String libelle, String valeur) => valeur.isEmpty
        ? const SizedBox.shrink()
        : Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text.rich(
              TextSpan(
                children: [
                  TextSpan(
                    text: '$libelle : ',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                  TextSpan(text: valeur),
                ],
              ),
            ),
          );
    final corps = <Widget>[];
    if (categorie == 'reves') {
      corps.add(Text((e['recit'] ?? '').toString()));
      corps.add(ligneCorps('Symboles', (e['symboles'] ?? '').toString()));
      if ((e['interp'] ?? '').toString().isNotEmpty) {
        corps.add(
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              'Interprétation : ${(e['interp'] ?? '').toString()}',
              style: const TextStyle(fontStyle: FontStyle.italic),
            ),
          ),
        );
      }
    } else if (categorie == 'projets' || categorie == 'orientations') {
      corps.add(Text((e['description'] ?? '').toString()));
      corps.add(ligneCorps('Confirmé par', (e['confirme'] ?? '').toString()));
    } else {
      final meta = [
        if ((e['public'] ?? '').toString().isNotEmpty)
          'Public : ${e['public']}',
        if ((e['duree'] ?? '').toString().isNotEmpty) '${e['duree']} min',
      ].join(' · ');
      if (meta.isNotEmpty) {
        corps.add(
          Text(meta, style: const TextStyle(color: Colors.black54)),
        );
      }
      if ((e['theme'] ?? '').toString().isNotEmpty) {
        corps.add(
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              (e['theme'] ?? '').toString(),
              style: const TextStyle(
                color: PaletteNouvelle.orFonce,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        );
      }
      corps.add(ligneCorps('Accroche', (e['accroche'] ?? '').toString()));
      corps.add(ligneCorps('Points', (e['points'] ?? '').toString()));
      corps.add(
        ligneCorps('Illustration', (e['illustration'] ?? '').toString()),
      );
      corps.add(ligneCorps('Conclusion', (e['conclusion'] ?? '').toString()));
      final lien = (e['lien'] ?? '').toString();
      if (lien.isNotEmpty) {
        final cible = journalLinkLabel(_magasin.data, lien);
        if (cible.isNotEmpty) {
          corps.add(
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(
                'Lié à : $cible',
                style: const TextStyle(color: Colors.black54, fontSize: 13),
              ),
            ),
          );
        }
      }
    }
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    (e['titre'] ?? '').toString(),
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: PaletteNouvelle.bleuNuit,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  dateLibelle,
                  style: const TextStyle(color: Colors.black54, fontSize: 13),
                ),
              ],
            ),
            if (pastilles.isNotEmpty) ...[
              const SizedBox(height: 8),
              Wrap(spacing: 6, runSpacing: 6, children: pastilles),
            ],
            const SizedBox(height: 8),
            ...corps,
            const SizedBox(height: 8),
            Wrap(
              spacing: 4,
              runSpacing: 4,
              alignment: WrapAlignment.end,
              children: [
                if (categorie == 'messages') ...[
                  TextButton.icon(
                    onPressed: () => _reprendreMessage(e),
                    icon: const Icon(Icons.play_arrow_outlined, size: 18),
                    label: const Text('Reprendre'),
                  ),
                  TextButton.icon(
                    onPressed: () async {
                      await Clipboard.setData(
                        ClipboardData(text: journalMessageText(e)),
                      );
                      if (mounted) _message('Copié.');
                    },
                    icon: const Icon(Icons.copy_outlined, size: 18),
                    label: const Text('Copier le texte'),
                  ),
                ],
                if (categorie == 'reves' || categorie == 'orientations')
                  TextButton.icon(
                    onPressed: () => _lierAMessage(categorie, e),
                    icon: const Icon(Icons.link_outlined, size: 18),
                    label: const Text('Lier à un message'),
                  ),
                TextButton.icon(
                  onPressed: () => _ouvrirFormulaire(categorie, entree: e),
                  icon: const Icon(Icons.edit_outlined, size: 18),
                  label: const Text('Modifier'),
                ),
                TextButton.icon(
                  onPressed: () => _confirmerSuppression(categorie, e),
                  icon: const Icon(Icons.delete_outline, size: 18),
                  label: const Text('Supprimer'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _ouvrirNoteLibre(
    String categorie,
    Map<String, dynamic> e,
  ) async {
    final choix = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text((e['titre'] ?? '').toString()),
        content: SingleChildScrollView(
          child: Text(_texteSimple(e)),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop('fermer'),
            child: const Text('Fermer'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop('modifier'),
            child: const Text('Modifier'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop('supprimer'),
            child: const Text('Supprimer'),
          ),
        ],
      ),
    );
    if (choix == 'supprimer') {
      await _confirmerSuppression(categorie, e);
    } else if (choix == 'modifier') {
      setState(() => _onglet = kJournalCategories.indexOf(categorie));
      _ouvrirFormulaire(categorie, entree: e);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final categorie =
        _onglet <= 3 ? kJournalCategories[_onglet] : null;
    final resultats = _magasin.search(
      _recherche,
      category: _rechercheToutes ? null : categorie,
    );
    final enRecherche = _recherche.trim().isNotEmpty;
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        const Text(
          'Journal personnel',
          style: TextStyle(
            fontFamily: 'Cinzel',
            fontSize: 28,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 4),
        const Text(
          'Votre journal spirituel, pour vous seul. Il reste sur votre appareil, il n’est pas envoyé au serveur et n’est jamais partagé.',
          style: TextStyle(color: Colors.black54),
        ),
        const SizedBox(height: 12),
        _carteBilan(),
        const SizedBox(height: 12),
        TextField(
          controller: _rechercheControleur,
          onChanged: (v) => setState(() => _recherche = v),
          decoration: InputDecoration(
            hintText: 'Rechercher par mot, par date, par catégorie…',
            prefixIcon: const Icon(Icons.search_outlined),
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
          ),
        ),
        if (enRecherche) ...[
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: Text(
                  '${resultats.length} ${resultats.length == 1 ? 'résultat' : 'résultats'}',
                ),
              ),
              TextButton(
                onPressed: () =>
                    setState(() => _rechercheToutes = !_rechercheToutes),
                child: Text(
                  _rechercheToutes
                      ? 'Toutes les catégories'
                      : 'Cet onglet seulement',
                ),
              ),
            ],
          ),
        ],
        const SizedBox(height: 12),
        SingleChildScrollView(
          padding: EdgeInsets.zero,
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              for (var i = 0; i < _libellesOnglets.length; i++)
                Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(_libellesOnglets[i]),
                    selected: _onglet == i,
                    selectedColor: PaletteNouvelle.bleuNuit,
                    labelStyle: TextStyle(
                      color: _onglet == i
                          ? Colors.white
                          : PaletteNouvelle.bleuNuit,
                      fontWeight: FontWeight.w700,
                    ),
                    onSelected: (_) => setState(() {
                      _onglet = i;
                      _formulaireOuvert = false;
                    }),
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        if (_onglet == 4) ...[
          const Text(
            'Toutes les notes, en liste simple. Un toucher ouvre la note, avec sa modification et sa suppression.',
            style: TextStyle(color: Colors.black54),
          ),
          const SizedBox(height: 12),
          if (resultats.isEmpty)
            Text(
              enRecherche
                  ? 'Aucun résultat pour cette recherche.'
                  : 'Aucune note pour le moment.',
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.black54),
            )
          else
            for (final (cat, e) in resultats)
              Card(
                color: Colors.white,
                margin: const EdgeInsets.only(bottom: 8),
                child: ListTile(
                  leading: const Icon(
                    Icons.book_outlined,
                    color: PaletteNouvelle.bleuNuit,
                  ),
                  title: Text((e['titre'] ?? '').toString()),
                  subtitle: Text(
                    '${kJournalCategoryLabels[cat] ?? cat} · ${_date((e['date'] ?? '').toString())}',
                  ),
                  onTap: () => _ouvrirNoteLibre(cat, e),
                ),
              ),
        ],
        if (_onglet <= 3) ...[
          if (!_formulaireOuvert)
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: () => _ouvrirFormulaire(categorie!),
                icon: const Icon(Icons.add_outlined),
                label: Text(_libellesAjout[categorie]!),
              ),
            )
          else
            Card(
              key: ValueKey(
                  '${_modificationId ?? 'nouveau'}-$_formulaireCategorie'),
              color: Colors.white,
              margin: EdgeInsets.zero,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Form(
                  key: _formulaire,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${_modificationId == null ? 'Nouveau' : 'Modifier'} : ${kJournalCategoryLabels[_formulaireCategorie]}',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                          color: PaletteNouvelle.bleuNuit,
                        ),
                      ),
                      if (_repriseEtape.isNotEmpty) ...[
                        const SizedBox(height: 8),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: PaletteNouvelle.or.withValues(alpha: 0.12),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: PaletteNouvelle.or.withValues(alpha: 0.4),
                            ),
                          ),
                          child: Text(
                            'Reprise : prochaine étape, $_repriseEtape.',
                            style: const TextStyle(fontWeight: FontWeight.w700),
                          ),
                        ),
                      ],
                      const SizedBox(height: 12),
                      ..._champsFormulaire(),
                      Row(
                        children: [
                          Expanded(
                            child: SizedBox(
                              height: 52,
                              child: FilledButton(
                                onPressed: _enregistrerFormulaire,
                                child: const Text('Enregistrer'),
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          SizedBox(
                            height: 52,
                            child: OutlinedButton(
                              onPressed: _fermerFormulaire,
                              child: const Text('Annuler'),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          const SizedBox(height: 16),
          if (resultats.isEmpty)
            Text(
              enRecherche
                  ? 'Aucun résultat pour cette recherche.'
                  : 'Aucune entrée pour le moment.',
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.black54),
            )
          else ...[
            if (!enRecherche)
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Text(
                  '${resultats.length} ${resultats.length == 1 ? 'entrée' : 'entrées'}',
                  style: const TextStyle(color: Colors.black54),
                ),
              ),
            for (final (catEntree, e) in resultats) ...[
              if (enRecherche && _rechercheToutes)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Text(
                    kJournalCategoryLabels[catEntree]!,
                    style: const TextStyle(
                      fontSize: 12,
                      color: PaletteNouvelle.orFonce,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              _carteEntree(catEntree, e),
            ],
          ],
        ],
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: SizedBox(
                height: 52,
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.upload_outlined),
                  label: const Text('Exporter'),
                  onPressed: _exporter,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: SizedBox(
                height: 52,
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.download_outlined),
                  label: const Text('Importer'),
                  onPressed: _importer,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        const Text(
          'Sauvegarde : exportez votre journal, gardez le fichier dans Drive ou Fichiers, puis importez-le sur un nouvel appareil. Rien n’est envoyé automatiquement.',
          style: TextStyle(color: Colors.black54),
        ),
      ],
    );
  }
}
