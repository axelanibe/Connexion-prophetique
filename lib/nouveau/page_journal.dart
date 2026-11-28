// Journal personnel, correctif global 27 nov. 2026 : aligné sur
// la maquette, notes simples, trois boutons Nouvelle note,
// Exporter, Importer. Le modèle ancien est gardé : 4 catégories,
// stockage local, export JSON et import par fusion sans doublon.
import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

import '../meditation_journal.dart';
import '../print_doc.dart';
import 'palette.dart';

class PageJournal extends StatefulWidget {
  const PageJournal({super.key});

  @override
  State<PageJournal> createState() => _PageJournalState();
}

class _PageJournalState extends State<PageJournal> {
  final _magasin = SpiritualJournalStore();
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await _magasin.load();
    if (mounted) setState(() => _charge = true);
  }

  List<(String, Map<String, dynamic>)> get _notes {
    final toutes = _magasin.search('');
    toutes.sort(
      (a, b) => '${b.$2['date']}'.compareTo('${a.$2['date']}'),
    );
    return toutes;
  }

  String _texte(Map<String, dynamic> e) {
    for (final cle in ['recit', 'description', 'accroche']) {
      final t = (e[cle] ?? '').toString().trim();
      if (t.isNotEmpty) return t;
    }
    return '';
  }

  String _date(String iso) {
    if (iso.length < 10) return iso;
    return '${iso.substring(8, 10)}/${iso.substring(5, 7)}/${iso.substring(0, 4)}';
  }

  void _message(String texte) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(texte)),
    );
  }

  Future<void> _nouvelleNote() async {
    final titre = TextEditingController();
    final texte = TextEditingController();
    var categorie = kJournalCategories.first;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: const Text('Nouvelle note'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: titre,
                  decoration: const InputDecoration(
                    labelText: 'Titre',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  value: categorie,
                  decoration: const InputDecoration(
                    labelText: 'Catégorie',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    for (final c in kJournalCategories)
                      DropdownMenuItem(
                        value: c,
                        child: Text(kJournalCategoryLabels[c] ?? c),
                      ),
                  ],
                  onChanged: (v) {
                    if (v != null) setEtat(() => categorie = v);
                  },
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: texte,
                  maxLines: 6,
                  decoration: const InputDecoration(
                    labelText: 'Note',
                    border: OutlineInputBorder(),
                  ),
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
              child: const Text('Enregistrer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    if (titre.text.trim().isEmpty) {
      _message('Le titre est obligatoire.');
      return;
    }
    final entree = <String, dynamic>{
      'id': journalNewId(),
      'date': journalTodayIso(),
      'titre': titre.text.trim(),
      'description': texte.text.trim(),
    };
    if (categorie == 'reves') entree['recit'] = texte.text.trim();
    _magasin.data[categorie]!.add(entree);
    await _magasin.save();
    if (mounted) setState(() {});
  }

  Future<void> _ouvrirNote(
    String categorie,
    Map<String, dynamic> e,
  ) async {
    final supprimer = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text((e['titre'] ?? '').toString()),
        content: SingleChildScrollView(
          child: Text(_texte(e)),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Fermer'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Supprimer'),
          ),
        ],
      ),
    );
    if (supprimer != true) return;
    _magasin.data[categorie]!.remove(e);
    await _magasin.save();
    if (mounted) setState(() {});
  }

  Future<void> _exporter() async {
    await downloadBytesFile(
      'journal.json',
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
      final ajoutees = _magasin.importJson(utf8.decode(octets));
      await _magasin.save();
      if (!mounted) return;
      setState(() {});
      _message(
        ajoutees == 0
            ? 'Aucune note ajoutée.'
            : '$ajoutees note(s) ajoutée(s).',
      );
    } catch (_) {
      if (!mounted) return;
      _message('Fichier illisible.');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final notes = _notes;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
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
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: FilledButton.icon(
                onPressed: _nouvelleNote,
                icon: const Icon(Icons.add_outlined),
                label: const Text('Nouvelle note'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _exporter,
                icon: const Icon(Icons.download_outlined),
                label: const Text('Exporter'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _importer,
                icon: const Icon(Icons.upload_outlined),
                label: const Text('Importer'),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        if (notes.isEmpty)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 12),
            child: Text(
              'Aucune note pour le moment.',
              style: TextStyle(fontSize: 14, color: Colors.black54),
            ),
          )
        else
          for (final (categorie, e) in notes)
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
                  '${kJournalCategoryLabels[categorie] ?? categorie} · ${_date((e['date'] ?? '').toString())}',
                ),
                onTap: () => _ouvrirNote(categorie, e),
              ),
            ),
      ],
    );
  }
}
