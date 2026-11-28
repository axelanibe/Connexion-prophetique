// Programme du camp, correctif global 27 nov. 2026 : lecture
// pour les campeurs inscrits et leurs parents, gestion par la
// structure. Les routes existent déjà côté serveur, la page ne
// fait que les brancher. Le serveur refuse la lecture à qui
// n'est ni inscrit, ni parent validé, ni administrateur.
import 'package:flutter/material.dart';

import '../api.dart';
import 'modeles_t18.dart';
import 'palette.dart';
import 'service_t18.dart';

const _joursSemaine = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
];
const _mois = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

String jourLong(String iso) {
  final d = DateTime.tryParse(iso);
  if (d == null) return iso;
  return '${_joursSemaine[d.weekday - 1]} ${d.day} ${_mois[d.month - 1]} ${d.year}';
}

void _dire(BuildContext context, String texte) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(texte)),
  );
}

Future<bool> _confirmer(
  BuildContext context,
  String titre,
  String texte,
) async {
  final ok = await showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(titre),
      content: Text(texte),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(false),
          child: const Text('Annuler'),
        ),
        FilledButton(
          onPressed: () => Navigator.of(context).pop(true),
          child: const Text('Confirmer'),
        ),
      ],
    ),
  );
  return ok == true;
}

bool _heureValide(String s) => RegExp(r'^([01]\d|2[0-3]):[0-5]\d$').hasMatch(s);

bool _jourValide(String s) =>
    RegExp(r'^\d{4}-\d{2}-\d{2}$').hasMatch(s) && DateTime.tryParse(s) != null;

/// Entrées groupées par jour, jour en titre, créneaux triés par
/// heure. La même liste sert à la lecture et à la gestion.
class ListeChronogramme extends StatelessWidget {
  const ListeChronogramme({
    super.key,
    required this.entrees,
    this.trailing,
  });
  final List<EntreeChronogramme> entrees;
  final Widget Function(EntreeChronogramme)? trailing;

  @override
  Widget build(BuildContext context) {
    final jours = <String, List<EntreeChronogramme>>{};
    for (final e in entrees) {
      (jours[e.jour] ??= []).add(e);
    }
    final tries = jours.keys.toList()..sort();
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
      children: [
        for (final jour in tries) ...[
          Text(
            jourLong(jour),
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w800,
              color: PaletteNouvelle.bleuNuit,
            ),
          ),
          const SizedBox(height: 8),
          for (final e in [
            ...jours[jour]!
          ]..sort((a, b) => a.heureDebut.compareTo(b.heureDebut)))
            Card(
              color: Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                title: Text(e.titre),
                subtitle: Text(
                  [
                    e.plage,
                    if (e.lieu.isNotEmpty) e.lieu,
                    if (e.type.isNotEmpty) e.type,
                  ].join(' · '),
                ),
                trailing: trailing?.call(e),
              ),
            ),
          const SizedBox(height: 8),
        ],
      ],
    );
  }
}

/// Lecture du programme, pour un campeur inscrit ou son parent.
class PageChronogrammeLecture extends StatefulWidget {
  const PageChronogrammeLecture({
    super.key,
    required this.evenementId,
    required this.titre,
  });
  final String evenementId;
  final String titre;

  @override
  State<PageChronogrammeLecture> createState() =>
      _PageChronogrammeLectureState();
}

class _PageChronogrammeLectureState extends State<PageChronogrammeLecture> {
  var _charge = false;
  String? _erreur;
  var _entrees = <EntreeChronogramme>[];

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    try {
      final data = await api.fetchChronogramme(widget.evenementId);
      final lignes = data['entrees'];
      if (!mounted) return;
      setState(() {
        _entrees = [
          if (lignes is List)
            for (final l in lignes)
              if (l is Map<String, dynamic>) EntreeChronogramme.depuisJson(l),
        ];
        _charge = true;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _charge = true;
        _erreur = e is ApiException ? e.message : 'Programme indisponible.';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Programme · ${widget.titre}'),
        foregroundColor: PaletteNouvelle.bleuNuit,
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : _erreur != null
              ? Center(child: Text(_erreur!))
              : _entrees.isEmpty
                  ? const Center(
                      child: Text('Aucun programme pour ce camp.'),
                    )
                  : ListeChronogramme(entrees: _entrees),
    );
  }
}

/// Gestion du programme, pour la structure.
class PageChronogrammeAdmin extends StatefulWidget {
  const PageChronogrammeAdmin({
    super.key,
    required this.service,
    required this.evenementId,
    required this.nomCamp,
  });
  final ServiceT18 service;
  final String evenementId;
  final String nomCamp;

  @override
  State<PageChronogrammeAdmin> createState() => _PageChronogrammeAdminState();
}

class _PageChronogrammeAdminState extends State<PageChronogrammeAdmin> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerChronogramme(widget.evenementId);
    if (mounted) setState(() => _charge = true);
  }

  String _dimancheDe(String iso) {
    final d = DateTime.tryParse(iso);
    if (d == null) return iso;
    return d
        .subtract(Duration(days: d.weekday % 7))
        .toIso8601String()
        .substring(0, 10);
  }

  Future<void> _appliquerModele() async {
    final debut = widget.service.chronogrammeDebut ?? '';
    final dimanche = TextEditingController(
      text: debut.isNotEmpty ? _dimancheDe(debut) : '',
    );
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Appliquer le modèle'),
        content: TextField(
          controller: dimanche,
          decoration: const InputDecoration(
            labelText: 'Dimanche de la semaine (AAAA-MM-JJ)',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Appliquer'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    final valeur = dimanche.text.trim();
    if (!_jourValide(valeur)) {
      if (mounted) _dire(context, 'Dimanche invalide : un jour AAAA-MM-JJ.');
      return;
    }
    final applique = await widget.service.appliquerModeleChronogramme(
      widget.evenementId,
      valeur,
    );
    if (!mounted) return;
    _dire(
      context,
      applique ? 'Modèle appliqué.' : 'Application impossible.',
    );
    if (applique) setState(() {});
  }

  Future<void> _formulaire({EntreeChronogramme? existante}) async {
    final jour = TextEditingController(
      text: existante?.jour ??
          widget.service.chronogrammeDebut ??
          DateTime.now().toIso8601String().substring(0, 10),
    );
    final debut = TextEditingController(text: existante?.heureDebut ?? '05:00');
    final fin = TextEditingController(text: existante?.heureFin ?? '06:00');
    final titre = TextEditingController(text: existante?.titre ?? '');
    final lieu = TextEditingController(text: existante?.lieu ?? '');
    String? type = existante?.type.isNotEmpty == true ? existante!.type : null;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: Text(
            existante == null ? 'Ajouter un créneau' : 'Modifier le créneau',
          ),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: jour,
                  decoration: const InputDecoration(
                    labelText: 'Jour (AAAA-MM-JJ)',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: debut,
                        decoration: const InputDecoration(
                          labelText: 'Début (HH:MM)',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        controller: fin,
                        decoration: const InputDecoration(
                          labelText: 'Fin (HH:MM)',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: titre,
                  decoration: const InputDecoration(
                    labelText: 'Titre',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: lieu,
                  decoration: const InputDecoration(
                    labelText: 'Lieu (facultatif)',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String?>(
                  value: type,
                  isExpanded: true,
                  decoration: const InputDecoration(
                    labelText: 'Type (facultatif)',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    const DropdownMenuItem(
                      value: null,
                      child: Text('Sans type'),
                    ),
                    for (final t in widget.service.chronogrammeTypes)
                      DropdownMenuItem(value: t, child: Text(t)),
                  ],
                  onChanged: (v) => setEtat(() => type = v),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: Text(existante == null ? 'Ajouter' : 'Enregistrer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    final jourValeur = jour.text.trim();
    final debutValeur = debut.text.trim();
    final finValeur = fin.text.trim();
    if (!_jourValide(jourValeur)) {
      if (mounted) _dire(context, 'Jour invalide : un jour AAAA-MM-JJ.');
      return;
    }
    if (!_heureValide(debutValeur) || !_heureValide(finValeur)) {
      if (mounted) _dire(context, 'Heures invalides : des heures HH:MM.');
      return;
    }
    if (debutValeur.compareTo(finValeur) >= 0) {
      if (mounted) _dire(context, 'La fin doit être après le début.');
      return;
    }
    if (titre.text.trim().isEmpty) {
      if (mounted) _dire(context, 'Le titre est obligatoire.');
      return;
    }
    final fait = existante == null
        ? await widget.service.creerEntreeChronogramme(
            widget.evenementId,
            jour: jourValeur,
            heureDebut: debutValeur,
            heureFin: finValeur,
            titre: titre.text.trim(),
            lieu: lieu.text.trim().isEmpty ? null : lieu.text.trim(),
            type: type,
          )
        : await widget.service.modifierEntreeChronogramme(
            widget.evenementId,
            existante.id,
            jour: jourValeur,
            heureDebut: debutValeur,
            heureFin: finValeur,
            titre: titre.text.trim(),
            lieu: lieu.text.trim().isEmpty ? null : lieu.text.trim(),
            type: type,
          );
    if (!mounted) return;
    _dire(
      context,
      fait
          ? existante == null
              ? 'Créneau ajouté.'
              : 'Créneau modifié.'
          : 'Enregistrement impossible.',
    );
    if (fait) setState(() {});
  }

  Future<void> _supprimer(EntreeChronogramme e) async {
    final ok = await _confirmer(
      context,
      'Retirer ce créneau',
      '« ${e.titre} » (${e.plage}) ne sera plus au programme.',
    );
    if (!ok) return;
    final supprime = await widget.service.supprimerEntreeChronogramme(
      widget.evenementId,
      e.id,
    );
    if (!mounted) return;
    _dire(
      context,
      supprime ? 'Créneau retiré.' : 'Suppression impossible.',
    );
    if (supprime) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    return Scaffold(
      appBar: AppBar(
        title: Text('Programme · ${widget.nomCamp}'),
        foregroundColor: PaletteNouvelle.bleuNuit,
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                  child: Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: _appliquerModele,
                          child: const Text('Appliquer le modèle'),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: FilledButton(
                          onPressed: () => _formulaire(),
                          child: const Text('Ajouter un créneau'),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: service.chronogramme.isEmpty
                      ? const Center(
                          child: Text('Aucun créneau pour ce camp.'),
                        )
                      : ListeChronogramme(
                          entrees: service.chronogramme,
                          trailing: (e) => Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              IconButton(
                                icon: const Icon(Icons.edit_outlined),
                                onPressed: () => _formulaire(existante: e),
                              ),
                              IconButton(
                                icon: const Icon(Icons.delete_outlined),
                                onPressed: () => _supprimer(e),
                              ),
                            ],
                          ),
                        ),
                ),
              ],
            ),
    );
  }
}
