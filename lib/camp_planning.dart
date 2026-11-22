// Programme du camp et planification des cellules, 21 nov. 2026.
//
// Le chronogramme n'existait nulle part : un camp n'avait que
// nom, dates, lieu et tarif. Le programme est lié à l'événement,
// jour par jour, visible par le campeur inscrit et par son
// parent validé, jamais par tous les membres. La structure le
// modifie selon l'année et les changements, et peut appliquer
// le modèle du Word fourni par Axel, dimanche à samedi, 5 h à
// 23 h, sans jamais importer le fichier Word tel quel.
//
// Les cellules se répètent chaque semaine au même jour et à la
// même heure, avec des personnes assignées par rôle, modifiables
// semaine par semaine. La page vit dans la fiche établissement.
// Comme chaine_priere.dart, ce fichier est autonome : Scaffold
// direct, sans les aides de main.dart, pour ne pas créer de
// cycle d'import.
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import 'api.dart';
import 'app_models.dart';
import 'i18n.dart';
import 'presence_culte.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _fond = Color(0xFFF4F6F9);
const _grisTexte = Color(0xFF5E687C);
const _rouge = Color(0xFFE11D48);

/// Jours de la semaine, 0 = dimanche, comme le modèle Word.
const joursSemaineLabels = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

/// Rôles d'une personne assignée à une cellule.
const rolesCellule = [
  'Dirigeant',
  'Louange',
  'Prédication',
  'Accueil',
  'Intercession',
];

/// Types de créneaux du modèle Word, proposés dans le
/// formulaire, jamais imposés.
const typesCreneauModele = [
  'Culte',
  'Enseignement',
  'Atelier',
  'Évangélisation',
  'Prière',
  'Repas',
  'Repos',
  'Partage',
  'Vie quotidienne',
  'Activité',
];

/// Jour en AAAA-MM-JJ.
String jourIso(DateTime d) =>
    '${d.year.toString().padLeft(4, '0')}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

/// Jour AAAA-MM-JJ lu, null quand il n'est pas réel.
DateTime? parseJourIso(String? iso) {
  if (iso == null || iso.isEmpty) return null;
  final parts = iso.split('-');
  if (parts.length != 3) return null;
  final annee = int.tryParse(parts[0]);
  final mois = int.tryParse(parts[1]);
  final jour = int.tryParse(parts[2]);
  if (annee == null || mois == null || jour == null) return null;
  if (mois < 1 || mois > 12 || jour < 1 || jour > 31) return null;
  final d = DateTime(annee, mois, jour);
  if (d.year != annee || d.month != mois || d.day != jour) return null;
  return d;
}

/// Libellé d'un jour : « Lundi 23/08/2027 ».
String libelleJour(DateTime d) =>
    '${joursSemaineLabels[d.weekday % 7]} ${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';

/// Dimanche de la semaine d'un jour.
DateTime dimancheDeSemaine(DateTime d) => d.subtract(Duration(days: d.weekday % 7));

/// Lundi de la semaine d'un jour.
DateTime lundiDeSemaine(DateTime d) => d.subtract(Duration(days: (d.weekday + 6) % 7));

/// Vrai quand l'heure est HH:MM, 00:00 à 23:59.
bool heureValideCamp(String heure) =>
    RegExp(r'^(?:[01]\d|2[0-3]):[0-5]\d$').hasMatch(heure.trim());

/// Heure HH:MM d'un TimeOfDay.
String heureDe(TimeOfDay h) =>
    '${h.hour.toString().padLeft(2, '0')}:${h.minute.toString().padLeft(2, '0')}';

/// Entrées groupées par jour, jours triés, créneaux triés par
/// heure de début. Les jours sans date réelle sont ignorés.
Map<String, List<Map<String, dynamic>>> groupeEntreesParJour(
  List<Map<String, dynamic>> entrees,
) {
  final parJour = <String, List<Map<String, dynamic>>>{};
  for (final e in entrees) {
    final jour = (e['jour'] ?? '').toString();
    if (parseJourIso(jour) == null) continue;
    (parJour[jour] ??= []).add(e);
  }
  for (final liste in parJour.values) {
    liste.sort((a, b) => (a['heure_debut'] ?? '').toString().compareTo((b['heure_debut'] ?? '').toString()));
  }
  final tries = parJour.keys.toList()..sort();
  return {for (final j in tries) j: parJour[j]!};
}

void _message(BuildContext context, String texte) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(texte)));
}

String _erreurLisible(Object e) {
  final texte = '$e';
  return texte.replaceFirst('Exception: ', '');
}

Future<TimeOfDay?> _choisirHeure(BuildContext context, String? initiale) {
  TimeOfDay depart = TimeOfDay.now();
  if (initiale != null) {
    final parties = initiale.split(':');
    final h = int.tryParse(parties[0]);
    final m = parties.length > 1 ? int.tryParse(parties[1]) : 0;
    if (h != null && m != null) depart = TimeOfDay(hour: h, minute: m);
  }
  return showTimePicker(context: context, initialTime: depart);
}

/// Programme d'un camp, jour par jour. Lecture pour le campeur
/// inscrit et pour son parent, saisie pour la structure.
class ChronogrammePage extends StatefulWidget {
  const ChronogrammePage({super.key, required this.camp, required this.peutModifier});
  final Camp camp;
  final bool peutModifier;

  @override
  State<ChronogrammePage> createState() => _ChronogrammePageState();
}

class _ChronogrammePageState extends State<ChronogrammePage> {
  List<Map<String, dynamic>> _entrees = [];
  List<String> _types = typesCreneauModele;
  bool _loading = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    if (widget.camp.serverId.isEmpty || !api.isConnected) {
      setState(() {
        _loading = false;
        _erreur = tr('Programme disponible en ligne seulement, pour un camp publié.');
      });
      return;
    }
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final data = await api.fetchChronogramme(widget.camp.serverId);
      if (!mounted) return;
      final entrees = (data['entrees'] as List? ?? [])
          .whereType<Map>()
          .map((e) => Map<String, dynamic>.from(e))
          .toList();
      final types = (data['types'] as List? ?? [])
          .map((t) => t.toString())
          .where((t) => t.isNotEmpty)
          .toList();
      setState(() {
        _entrees = entrees;
        if (types.isNotEmpty) _types = types;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = _erreurLisible(e);
      });
    }
  }

  Future<void> _appliquerModele() async {
    final debut = widget.camp.dateDebut;
    if (debut == null) return;
    final dimanche = dimancheDeSemaine(debut);
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Appliquer le modèle ?')),
        content: Text(
          tr('Le programme du Word, dimanche à samedi, 5 h à 23 h, sera ajouté pour la semaine du ${jourIso(dimanche)}. Les créneaux déjà saisis sont gardés.'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Appliquer'))),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      final res = await api.appliquerModeleChronogramme(widget.camp.serverId, jourIso(dimanche));
      if (!mounted) return;
      _message(context, tr('${res['inserees'] ?? 0} créneaux ajoutés.'));
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  Future<void> _supprimerEntree(Map<String, dynamic> entree) async {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer ce créneau ?')),
        content: Text('${entree['titre'] ?? ''}'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      await api.supprimerEntreeChronogramme(widget.camp.serverId, (entree['id'] ?? '').toString());
      if (!mounted) return;
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  Future<void> _formulaireEntree({Map<String, dynamic>? existante}) async {
    final titreCtrl = TextEditingController(text: (existante?['titre'] ?? '').toString());
    final lieuCtrl = TextEditingController(text: (existante?['lieu'] ?? '').toString());
    var jour = parseJourIso((existante?['jour'] ?? '').toString()) ??
        widget.camp.dateDebut ??
        DateTime.now();
    var debut = (existante?['heure_debut'] ?? '08:00').toString();
    var fin = (existante?['heure_fin'] ?? '10:30').toString();
    var type = (existante?['type'] ?? '').toString();
    if (type.isNotEmpty && !_types.contains(type)) type = '';
    String? erreur;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setS) => AlertDialog(
          title: Text(existante == null ? tr('Nouveau créneau') : tr('Modifier le créneau')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(tr('Jour')),
                  subtitle: Text(libelleJour(jour)),
                  trailing: const Icon(Icons.calendar_today_outlined),
                  onTap: () async {
                    final choix = await showDatePicker(
                      context: ctx,
                      initialDate: jour,
                      firstDate: DateTime(2020),
                      lastDate: DateTime(2100),
                    );
                    if (choix != null) setS(() => jour = choix);
                  },
                ),
                Row(
                  children: [
                    Expanded(
                      child: ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: Text(tr('Début')),
                        subtitle: Text(debut),
                        onTap: () async {
                          final choix = await _choisirHeure(ctx, debut);
                          if (choix != null) setS(() => debut = heureDe(choix));
                        },
                      ),
                    ),
                    Expanded(
                      child: ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: Text(tr('Fin')),
                        subtitle: Text(fin),
                        onTap: () async {
                          final choix = await _choisirHeure(ctx, fin);
                          if (choix != null) setS(() => fin = heureDe(choix));
                        },
                      ),
                    ),
                  ],
                ),
                TextField(
                  controller: titreCtrl,
                  decoration: InputDecoration(labelText: tr('Titre')),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: type.isEmpty ? null : type,
                  decoration: InputDecoration(labelText: tr('Type')),
                  items: [
                    DropdownMenuItem(value: '', child: Text(tr('Aucun type'))),
                    for (final t in _types) DropdownMenuItem(value: t, child: Text(t)),
                  ],
                  onChanged: (v) => setS(() => type = v ?? ''),
                ),
                TextField(
                  controller: lieuCtrl,
                  decoration: InputDecoration(labelText: '${tr('Lieu')} (${tr('facultatif')})'),
                ),
                if (erreur != null) ...[
                  const SizedBox(height: 8),
                  Text(erreur!, style: const TextStyle(color: _rouge)),
                ],
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(
              onPressed: () {
                final titre = titreCtrl.text.trim();
                if (!heureValideCamp(debut) || !heureValideCamp(fin) || debut.compareTo(fin) >= 0) {
                  setS(() => erreur = tr('Heures invalides : la fin doit être après le début.'));
                  return;
                }
                if (titre.isEmpty) {
                  setS(() => erreur = tr('Renseignez le titre.'));
                  return;
                }
                Navigator.pop(ctx, true);
              },
              child: Text(tr('Enregistrer')),
            ),
          ],
        ),
      ),
    );
    if (ok != true || !mounted) return;
    try {
      if (existante == null) {
        await api.creerEntreeChronogramme(
          widget.camp.serverId,
          jour: jourIso(jour),
          heureDebut: debut,
          heureFin: fin,
          titre: titreCtrl.text.trim(),
          lieu: lieuCtrl.text.trim(),
          type: type,
        );
      } else {
        await api.modifierEntreeChronogramme(
          widget.camp.serverId,
          (existante['id'] ?? '').toString(),
          jour: jourIso(jour),
          heureDebut: debut,
          heureFin: fin,
          titre: titreCtrl.text.trim(),
          lieu: lieuCtrl.text.trim(),
          type: type,
        );
      }
      if (!mounted) return;
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  @override
  Widget build(BuildContext context) {
    final groupes = groupeEntreesParJour(_entrees);
    return Scaffold(
      backgroundColor: _fond,
      appBar: AppBar(
        title: Text(tr('Programme du camp')),
        backgroundColor: _nuit,
        foregroundColor: Colors.white,
      ),
      body: RefreshIndicator(
        onRefresh: _charger,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : _erreur != null
                ? ListView(
                    padding: const EdgeInsets.all(16),
                    children: [Text(_erreur!, style: const TextStyle(color: _grisTexte))],
                  )
                : ListView(
                    padding: const EdgeInsets.all(16),
                    children: [
                      Text(
                        widget.camp.name,
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      if (widget.camp.dates.isNotEmpty) ...[
                        const SizedBox(height: 4),
                        Text(widget.camp.dates, style: const TextStyle(color: _grisTexte)),
                      ],
                      const SizedBox(height: 12),
                      if (widget.peutModifier) ...[
                        SizedBox(
                          width: double.infinity,
                          height: 52,
                          child: FilledButton.icon(
                            onPressed: () => _formulaireEntree(),
                            icon: const Icon(Icons.add_outlined),
                            label: Text(tr('Ajouter un créneau')),
                          ),
                        ),
                        const SizedBox(height: 8),
                        if (widget.camp.dateDebut != null)
                          SizedBox(
                            width: double.infinity,
                            height: 52,
                            child: OutlinedButton.icon(
                              onPressed: _appliquerModele,
                              icon: const Icon(Icons.calendar_month_outlined),
                              label: Text(tr('Appliquer le modèle du Word')),
                            ),
                          ),
                        if (widget.camp.dateDebut != null) const SizedBox(height: 12),
                      ],
                      if (groupes.isEmpty)
                        Text(
                          tr('Aucun créneau pour ce camp. La structure renseigne le programme.'),
                          style: const TextStyle(color: _grisTexte),
                        ),
                      for (final jour in groupes.keys) ...[
                        Text(
                          libelleJour(parseJourIso(jour)!),
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(color: _nuit),
                        ),
                        const SizedBox(height: 4),
                        Card(
                          child: Column(
                            children: [
                              for (final e in groupes[jour]!)
                                ListTile(
                                  leading: SizedBox(
                                    width: 96,
                                    child: Text(
                                      '${e['heure_debut'] ?? ''} - ${e['heure_fin'] ?? ''}',
                                      style: const TextStyle(color: _grisTexte),
                                    ),
                                  ),
                                  title: Text((e['titre'] ?? '').toString()),
                                  subtitle: [
                                    if ((e['type'] ?? '').toString().isNotEmpty) (e['type'] ?? '').toString(),
                                    if ((e['lieu'] ?? '').toString().isNotEmpty) (e['lieu'] ?? '').toString(),
                                  ].isEmpty
                                      ? null
                                      : Text([
                                          if ((e['type'] ?? '').toString().isNotEmpty) (e['type'] ?? '').toString(),
                                          if ((e['lieu'] ?? '').toString().isNotEmpty) (e['lieu'] ?? '').toString(),
                                        ].join(' · ')),
                                  trailing: widget.peutModifier
                                      ? Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            IconButton(
                                              icon: const Icon(Icons.edit_outlined),
                                              onPressed: () => _formulaireEntree(existante: e),
                                            ),
                                            IconButton(
                                              icon: const Icon(Icons.delete_outline, color: _rouge),
                                              onPressed: () => _supprimerEntree(e),
                                            ),
                                          ],
                                        )
                                      : null,
                                ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),
                      ],
                    ],
                  ),
      ),
    );
  }
}

/// Un temps fort du camp : moment publié par la structure sur
/// la page du camp, avec une photo facultative.
class TempsFort {
  TempsFort({
    required this.id,
    this.titre = '',
    this.texte = '',
    this.imageId = '',
    this.publieLe,
  });

  factory TempsFort.fromJson(Map<String, dynamic> j) => TempsFort(
        id: (j['id'] ?? '').toString(),
        titre: (j['titre'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        imageId: (j['image_id'] ?? '').toString(),
        publieLe: j['publie_le'] == null ? null : DateTime.tryParse(j['publie_le'].toString()),
      );

  final String id;
  final String titre;
  final String texte;
  final String imageId;
  final DateTime? publieLe;

  /// Adresse de la photo, vide sans photo.
  String get imageUrl => imageId.isEmpty ? '' : '$kApiBaseUrl/fichiers/$imageId';
}

/// Temps forts d'un camp, sur la fiche du camp : moments
/// publiés par la structure, visibles par tous les membres,
/// avec leurs J'aime et commentaires. La structure ajoute,
/// modifie et supprime. Sans temps fort et sans droit de
/// modification, la section ne montre rien.
class TempsFortsSection extends StatefulWidget {
  const TempsFortsSection({super.key, required this.camp, required this.peutModifier});

  final Camp camp;
  final bool peutModifier;

  @override
  State<TempsFortsSection> createState() => _TempsFortsSectionState();
}

class _TempsFortsSectionState extends State<TempsFortsSection> {
  List<TempsFort> _tempsForts = [];
  bool _charge = false;

  /// Comptes de J'aime, en lot, un seul appel pour la section.
  Map<String, Map<String, dynamic>> _comptes = {};

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    if (widget.camp.serverId.isEmpty || !api.isConnected) {
      setState(() => _charge = true);
      return;
    }
    try {
      final data = await api.fetchTempsForts(widget.camp.serverId);
      if (!mounted) return;
      final tempsForts = ((data['temps_forts'] as List?) ?? [])
          .whereType<Map<String, dynamic>>()
          .map(TempsFort.fromJson)
          .toList();
      setState(() {
        _tempsForts = tempsForts;
        _comptes = {};
        _charge = true;
      });
      if (tempsForts.isNotEmpty) {
        try {
          final comptes = await api.fetchComptesAimes('temps_fort', tempsForts.map((t) => t.id).toList());
          if (!mounted) return;
          final parId = <String, Map<String, dynamic>>{};
          for (final c in ((comptes['comptes'] as List?) ?? []).whereType<Map<String, dynamic>>()) {
            parId[(c['cible_id'] ?? '').toString()] = c;
          }
          setState(() => _comptes = parId);
        } catch (_) {}
      }
    } catch (_) {
      if (!mounted) return;
      setState(() => _charge = true);
    }
  }

  Future<void> _supprimer(TempsFort t) async {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer ce temps fort ?')),
        content: Text(t.titre),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      await api.supprimerTempsFort(widget.camp.serverId, t.id);
      if (!mounted) return;
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  Future<void> _formulaire({TempsFort? existant}) async {
    final titreCtrl = TextEditingController(text: existant?.titre ?? '');
    final texteCtrl = TextEditingController(text: existant?.texte ?? '');
    Uint8List? photoOctets;
    String? photoNom;
    var imageId = existant?.imageId ?? '';
    String? erreur;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setS) => AlertDialog(
          title: Text(existant == null ? tr('Nouveau temps fort') : tr('Modifier le temps fort')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: titreCtrl,
                  decoration: InputDecoration(labelText: tr('Titre')),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: texteCtrl,
                  maxLines: 4,
                  maxLength: 2000,
                  decoration: InputDecoration(labelText: '${tr('Texte')} (${tr('facultatif')})'),
                ),
                const SizedBox(height: 8),
                if (photoOctets != null)
                  Stack(children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.memory(photoOctets!, height: 140, width: double.infinity, fit: BoxFit.cover),
                    ),
                    Positioned(
                      right: 4,
                      top: 4,
                      child: IconButton(
                        tooltip: tr('Retirer la photo'),
                        onPressed: () => setS(() {
                          photoOctets = null;
                          photoNom = null;
                        }),
                        icon: const Icon(Icons.close, color: Colors.white),
                        style: IconButton.styleFrom(backgroundColor: Colors.black54),
                      ),
                    ),
                  ])
                else if (imageId.isNotEmpty)
                  Stack(children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.network(
                        '$kApiBaseUrl/fichiers/$imageId',
                        height: 140,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => const SizedBox.shrink(),
                      ),
                    ),
                    Positioned(
                      right: 4,
                      top: 4,
                      child: IconButton(
                        tooltip: tr('Retirer la photo'),
                        onPressed: () => setS(() => imageId = ''),
                        icon: const Icon(Icons.close, color: Colors.white),
                        style: IconButton.styleFrom(backgroundColor: Colors.black54),
                      ),
                    ),
                  ])
                else
                  OutlinedButton.icon(
                    onPressed: () async {
                      final choix = await ImagePicker().pickImage(source: ImageSource.gallery, maxWidth: 1280, imageQuality: 80);
                      if (choix == null) return;
                      final octets = await choix.readAsBytes();
                      setS(() {
                        photoOctets = octets;
                        photoNom = choix.name;
                      });
                    },
                    icon: const Icon(Icons.photo_outlined),
                    label: Text(tr('Ajouter une photo')),
                  ),
                if (erreur != null) ...[
                  const SizedBox(height: 8),
                  Text(erreur!, style: const TextStyle(color: _rouge)),
                ],
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(
              onPressed: () {
                if (titreCtrl.text.trim().isEmpty) {
                  setS(() => erreur = tr('Renseignez le titre.'));
                  return;
                }
                Navigator.pop(ctx, true);
              },
              child: Text(tr('Enregistrer')),
            ),
          ],
        ),
      ),
    );
    if (ok != true || !mounted) return;
    try {
      if (photoOctets != null) {
        imageId = await api.uploadImageBytes(photoOctets!, photoNom ?? 'temps-fort.jpg');
      }
      if (existant == null) {
        await api.creerTempsFort(
          widget.camp.serverId,
          titre: titreCtrl.text.trim(),
          texte: texteCtrl.text.trim(),
          imageId: imageId,
        );
      } else {
        await api.modifierTempsFort(
          widget.camp.serverId,
          existant.id,
          titre: titreCtrl.text.trim(),
          texte: texteCtrl.text.trim(),
          imageId: imageId,
        );
      }
      if (!mounted) return;
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) return const SizedBox.shrink();
    if (_tempsForts.isEmpty && !widget.peutModifier) return const SizedBox.shrink();
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Expanded(
          child: Text(
            tr('Temps forts'),
            style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
          ),
        ),
        if (widget.peutModifier)
          IconButton(
            tooltip: tr('Ajouter un temps fort'),
            onPressed: () => _formulaire(),
            icon: const Icon(Icons.add_circle_outline),
          ),
      ]),
      const SizedBox(height: 8),
      if (_tempsForts.isEmpty)
        Text(tr('Aucun temps fort publié pour ce camp.'), style: const TextStyle(color: _grisTexte)),
      for (final t in _tempsForts) ...[
        Card(
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (t.imageUrl.isNotEmpty) ...[
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.network(
                      t.imageUrl,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => const SizedBox.shrink(),
                    ),
                  ),
                  const SizedBox(height: 8),
                ],
                Row(children: [
                  Expanded(
                    child: Text(t.titre, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                  ),
                  if (widget.peutModifier) ...[
                    IconButton(
                      tooltip: tr('Modifier'),
                      onPressed: () => _formulaire(existant: t),
                      icon: const Icon(Icons.edit_outlined, size: 20),
                      color: _grisTexte,
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                    ),
                    IconButton(
                      tooltip: tr('Supprimer'),
                      onPressed: () => _supprimer(t),
                      icon: const Icon(Icons.delete_outline, size: 20),
                      color: _grisTexte,
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                    ),
                  ],
                ]),
                if (t.publieLe != null)
                  Text(dateCourteMur(t.publieLe), style: const TextStyle(color: _grisTexte, fontSize: 13)),
                if (t.texte.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(t.texte),
                ],
                const SizedBox(height: 4),
                AimesCommentaires(
                  cibleType: 'temps_fort',
                  cibleId: t.id,
                  nombreInitial: (_comptes[t.id]?['nombre'] as num?)?.toInt(),
                  aAimeInitial: _comptes[t.id]?['a_aime'] == true,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 8),
      ],
    ]);
  }
}

/// Cellules d'un établissement, semaine par semaine. La
/// répétition est hebdomadaire automatique, chaque semaine se
/// modifie par une exception : annulation, autre heure, autre
/// lieu.
class CellulesPage extends StatefulWidget {
  const CellulesPage({
    super.key,
    required this.etablissementId,
    required this.etablissementNom,
    required this.peutModifier,
  });
  final String etablissementId;
  final String etablissementNom;
  final bool peutModifier;

  @override
  State<CellulesPage> createState() => _CellulesPageState();
}

class _CellulesPageState extends State<CellulesPage> {
  List<Map<String, dynamic>> _cellules = [];
  List<String> _roles = rolesCellule;
  DateTime _semaine = lundiDeSemaine(DateTime.now());
  bool _loading = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    if (widget.etablissementId.isEmpty || !api.isConnected) {
      setState(() {
        _loading = false;
        _erreur = tr('Cellules disponibles en ligne seulement, pour un établissement publié.');
      });
      return;
    }
    setState(() {
      _loading = true;
      _erreur = null;
    });
    try {
      final data = await api.fetchCellules(widget.etablissementId, semaine: jourIso(_semaine));
      if (!mounted) return;
      final cellules = (data['cellules'] as List? ?? [])
          .whereType<Map>()
          .map((e) => Map<String, dynamic>.from(e))
          .toList();
      final roles = (data['roles'] as List? ?? [])
          .map((t) => t.toString())
          .where((t) => t.isNotEmpty)
          .toList();
      setState(() {
        _cellules = cellules;
        if (roles.isNotEmpty) _roles = roles;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _erreur = _erreurLisible(e);
      });
    }
  }

  Future<void> _formulaireCellule({Map<String, dynamic>? existante}) async {
    final nomCtrl = TextEditingController(text: (existante?['nom'] ?? '').toString());
    final lieuCtrl = TextEditingController(text: (existante?['lieu'] ?? '').toString());
    var jourSemaine = (existante?['jour_semaine'] as num?)?.toInt() ?? 3;
    var heure = (existante?['heure'] ?? '18:30').toString();
    String? erreur;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setS) => AlertDialog(
          title: Text(existante == null ? tr('Nouvelle cellule') : tr('Modifier la cellule')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(controller: nomCtrl, decoration: InputDecoration(labelText: tr('Nom de la cellule'))),
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  value: jourSemaine,
                  decoration: InputDecoration(labelText: tr('Jour de la semaine')),
                  items: [
                    for (var i = 0; i < 7; i++) DropdownMenuItem(value: i, child: Text(joursSemaineLabels[i])),
                  ],
                  onChanged: (v) => setS(() => jourSemaine = v ?? jourSemaine),
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(tr('Heure')),
                  subtitle: Text(heure),
                  trailing: const Icon(Icons.access_time_outlined),
                  onTap: () async {
                    final choix = await _choisirHeure(ctx, heure);
                    if (choix != null) setS(() => heure = heureDe(choix));
                  },
                ),
                TextField(
                  controller: lieuCtrl,
                  decoration: InputDecoration(labelText: '${tr('Lieu')} (${tr('facultatif')})'),
                ),
                if (erreur != null) ...[
                  const SizedBox(height: 8),
                  Text(erreur!, style: const TextStyle(color: _rouge)),
                ],
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(
              onPressed: () {
                if (nomCtrl.text.trim().isEmpty) {
                  setS(() => erreur = tr('Renseignez le nom.'));
                  return;
                }
                if (!heureValideCamp(heure)) {
                  setS(() => erreur = tr('Heure invalide.'));
                  return;
                }
                Navigator.pop(ctx, true);
              },
              child: Text(tr('Enregistrer')),
            ),
          ],
        ),
      ),
    );
    if (ok != true || !mounted) return;
    try {
      if (existante == null) {
        await api.creerCellule(
          widget.etablissementId,
          nom: nomCtrl.text.trim(),
          jourSemaine: jourSemaine,
          heure: heure,
          lieu: lieuCtrl.text.trim(),
        );
      } else {
        await api.modifierCellule(
          (existante['id'] ?? '').toString(),
          nom: nomCtrl.text.trim(),
          jourSemaine: jourSemaine,
          heure: heure,
          lieu: lieuCtrl.text.trim(),
        );
      }
      if (!mounted) return;
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  Future<void> _supprimerCellule(Map<String, dynamic> cellule) async {
    final confirmer = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer cette cellule ?')),
        content: Text('${cellule['nom'] ?? ''}'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (confirmer != true || !mounted) return;
    try {
      await api.supprimerCellule((cellule['id'] ?? '').toString());
      if (!mounted) return;
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  Future<void> _assigner(Map<String, dynamic> cellule) async {
    final rechercheCtrl = TextEditingController();
    List<Map<String, dynamic>> resultats = [];
    Map<String, dynamic>? choisi;
    var role = _roles.first;
    var recherche = false;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setS) => AlertDialog(
          title: Text(tr('Assigner une personne')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: rechercheCtrl,
                  decoration: InputDecoration(
                    labelText: tr('Nom ou matricule'),
                    suffixIcon: IconButton(
                      icon: const Icon(Icons.search_outlined),
                      onPressed: () async {
                        if (rechercheCtrl.text.trim().length < 3) return;
                        setS(() => recherche = true);
                        try {
                          final trouves = await api.chercherMembresParNomOuMatricule(rechercheCtrl.text.trim());
                          if (ctx.mounted) setS(() {
                            resultats = trouves;
                            recherche = false;
                          });
                        } catch (e) {
                          if (ctx.mounted) setS(() => recherche = false);
                        }
                      },
                    ),
                  ),
                ),
                if (recherche) const Padding(
                  padding: EdgeInsets.only(top: 8),
                  child: CircularProgressIndicator(),
                ),
                for (final m in resultats)
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text((m['nom_complet'] ?? '').toString()),
                    subtitle: Text((m['matricule'] ?? '').toString()),
                    selected: choisi != null && choisi!['id'] == m['id'],
                    onTap: () => setS(() => choisi = m),
                  ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: role,
                  decoration: InputDecoration(labelText: tr('Rôle')),
                  items: [for (final r in _roles) DropdownMenuItem(value: r, child: Text(r))],
                  onChanged: (v) => setS(() => role = v ?? role),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(
              onPressed: choisi == null ? null : () => Navigator.pop(ctx, true),
              child: Text(tr('Assigner')),
            ),
          ],
        ),
      ),
    );
    if (ok != true || choisi == null || !mounted) return;
    try {
      await api.assignerCellule((cellule['id'] ?? '').toString(), (choisi!['id'] ?? '').toString(), role);
      if (!mounted) return;
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  Future<void> _exceptionSemaine(Map<String, dynamic> cellule) async {
    final occurrence = (cellule['occurrence'] as Map?) ?? {};
    final lieuCtrl = TextEditingController(text: (occurrence['lieu'] ?? '').toString());
    final noteCtrl = TextEditingController(text: (occurrence['note'] ?? '').toString());
    var annulee = occurrence['annulee'] == true;
    var heure = (occurrence['heure'] ?? (cellule['heure'] ?? '18:30')).toString();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setS) => AlertDialog(
          title: Text(tr('Cette semaine seulement')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(tr('Annulée cette semaine')),
                  value: annulee,
                  onChanged: (v) => setS(() => annulee = v),
                ),
                if (!annulee) ...[
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text(tr('Heure')),
                    subtitle: Text(heure),
                    trailing: const Icon(Icons.access_time_outlined),
                    onTap: () async {
                      final choix = await _choisirHeure(ctx, heure);
                      if (choix != null) setS(() => heure = heureDe(choix));
                    },
                  ),
                  TextField(
                    controller: lieuCtrl,
                    decoration: InputDecoration(labelText: '${tr('Lieu')} (${tr('facultatif')})'),
                  ),
                ],
                TextField(
                  controller: noteCtrl,
                  decoration: InputDecoration(labelText: '${tr('Note')} (${tr('facultatif')})'),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(tr('Annuler'))),
            FilledButton(onPressed: () => Navigator.pop(ctx, true), child: Text(tr('Enregistrer'))),
          ],
        ),
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await api.definirExceptionCellule(
        (cellule['id'] ?? '').toString(),
        semaine: jourIso(_semaine),
        annulee: annulee,
        heure: annulee ? null : heure,
        lieu: lieuCtrl.text.trim(),
        note: noteCtrl.text.trim(),
      );
      if (!mounted) return;
      _charger();
    } catch (e) {
      if (!mounted) return;
      _message(context, _erreurLisible(e));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _fond,
      appBar: AppBar(
        title: Text(tr('Cellules')),
        backgroundColor: _nuit,
        foregroundColor: Colors.white,
      ),
      body: RefreshIndicator(
        onRefresh: _charger,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : _erreur != null
                ? ListView(
                    padding: const EdgeInsets.all(16),
                    children: [Text(_erreur!, style: const TextStyle(color: _grisTexte))],
                  )
                : ListView(
                    padding: const EdgeInsets.all(16),
                    children: [
                      Text(
                        widget.etablissementNom,
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          IconButton(
                            icon: const Icon(Icons.chevron_left_outlined),
                            onPressed: () {
                              setState(() => _semaine = _semaine.subtract(const Duration(days: 7)));
                              _charger();
                            },
                          ),
                          Expanded(
                            child: Center(
                              child: Text(
                                '${tr('Semaine du')} ${jourIso(_semaine)}',
                                style: Theme.of(context).textTheme.titleMedium,
                              ),
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.chevron_right_outlined),
                            onPressed: () {
                              setState(() => _semaine = _semaine.add(const Duration(days: 7)));
                              _charger();
                            },
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      if (widget.peutModifier) ...[
                        SizedBox(
                          width: double.infinity,
                          height: 52,
                          child: FilledButton.icon(
                            onPressed: () => _formulaireCellule(),
                            icon: const Icon(Icons.add_outlined),
                            label: Text(tr('Nouvelle cellule')),
                          ),
                        ),
                        const SizedBox(height: 12),
                      ],
                      if (_cellules.isEmpty)
                        Text(
                          tr('Aucune cellule pour cet établissement. La structure les crée.'),
                          style: const TextStyle(color: _grisTexte),
                        ),
                      for (final cellule in _cellules) ...[
                        _carteCellule(context, cellule),
                        const SizedBox(height: 12),
                      ],
                    ],
                  ),
      ),
    );
  }

  Widget _carteCellule(BuildContext context, Map<String, dynamic> cellule) {
    final occurrence = (cellule['occurrence'] as Map?) ?? {};
    final dateOccurrence = parseJourIso((occurrence['date'] ?? '').toString());
    final annulee = occurrence['annulee'] == true;
    final assignations = (cellule['assignations'] as List? ?? [])
        .whereType<Map>()
        .map((a) => Map<String, dynamic>.from(a))
        .toList();
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    (cellule['nom'] ?? '').toString(),
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                ),
                if (widget.peutModifier) ...[
                  IconButton(
                    icon: const Icon(Icons.edit_outlined),
                    onPressed: () => _formulaireCellule(existante: cellule),
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete_outline, color: _rouge),
                    onPressed: () => _supprimerCellule(cellule),
                  ),
                ],
              ],
            ),
            Text(
              annulee
                  ? tr('Annulée cette semaine')
                  : dateOccurrence == null
                      ? '${joursSemaineLabels[(cellule['jour_semaine'] as num?)?.toInt() ?? 0]} ${(cellule['heure'] ?? '').toString()}'
                      : '${libelleJour(dateOccurrence)} · ${(occurrence['heure'] ?? '').toString()}${(occurrence['lieu'] ?? '').toString().isNotEmpty ? ' · ${occurrence['lieu']}' : ''}',
              style: TextStyle(color: annulee ? _rouge : _grisTexte),
            ),
            if ((occurrence['note'] ?? '').toString().isNotEmpty) ...[
              const SizedBox(height: 4),
              Text((occurrence['note'] ?? '').toString(), style: const TextStyle(color: _grisTexte)),
            ],
            const SizedBox(height: 8),
            if (assignations.isEmpty)
              Text(tr('Personne assignée.'), style: const TextStyle(color: _grisTexte))
            else
              for (final a in assignations)
                Row(
                  children: [
                    Expanded(
                      child: Text('${(a['role'] ?? '').toString()} : ${(a['nom_complet'] ?? '').toString()}'),
                    ),
                    if (widget.peutModifier)
                      IconButton(
                        icon: const Icon(Icons.close_outlined, size: 18),
                        onPressed: () async {
                          try {
                            await api.retirerAssignationCellule(
                              (cellule['id'] ?? '').toString(),
                              (a['membre_id'] ?? '').toString(),
                            );
                            if (!mounted) return;
                            _charger();
                          } catch (e) {
                            if (!mounted) return;
                            _message(context, _erreurLisible(e));
                          }
                        },
                      ),
                  ],
                ),
            if (widget.peutModifier) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => _assigner(cellule),
                      icon: const Icon(Icons.person_add_outlined),
                      label: Text(tr('Assigner')),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => _exceptionSemaine(cellule),
                      icon: const Icon(Icons.event_outlined),
                      label: Text(tr('Cette semaine')),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}
