// Carnet de Promesses, 21 nov. 2026, tranches 1 à 3 de
// l'audit du 17 nov. : carnet personnel du membre, il y
// enregistre des promesses, une référence de verset existante,
// une note personnelle et une date. Le carnet n'est visible
// que par son membre, jamais partagé. Aucun verset n'est
// inventé : le texte affiché vient de la Bible embarquée,
// à partir de la référence saisie, sinon le champ texte reste
// saisi par le membre lui-même.
import 'package:flutter/material.dart';

import 'api.dart';
import 'bible.dart';
import 'i18n.dart';

// Palette de l'application, mêmes valeurs que HomeWeb.
const _nuit = Color(0xFF0F1C2E);
const _or = Color(0xFFE5C158);
const _grisTexte = Color(0xFF5E687C);

/// Une promesse du carnet : référence, note, texte saisi.
class Promesse {
  Promesse({
    required this.id,
    required this.reference,
    this.note = '',
    this.texte = '',
    this.creeLe = '',
  });

  factory Promesse.fromJson(Map<String, dynamic> j) => Promesse(
        id: (j['id'] ?? '').toString(),
        reference: (j['reference'] ?? '').toString(),
        note: (j['note'] ?? '').toString(),
        texte: (j['texte'] ?? '').toString(),
        creeLe: (j['cree_le'] ?? '').toString(),
      );

  final String id;
  final String reference;
  final String note;
  final String texte;
  final String creeLe;
}

/// Promesses depuis la réponse du serveur, dans l'ordre renvoyé.
List<Promesse> promessesDepuisReponse(Map<String, dynamic> data) {
  final lignes = data['promesses'];
  if (lignes is! List) return const [];
  return lignes.whereType<Map<String, dynamic>>().map(Promesse.fromJson).toList();
}

/// Référence lue : livre, chapitre et verset, ou null quand la
/// référence ne se lit pas. Fonction pure, testée dans
/// test/carnet_promesses_test.dart. Le livre est le nom le plus
/// long qui commence la référence, sans tenir compte des
/// accents ni de la casse, puis chapitre:verset.
({int livre, int chapitre, int verset})? analyserReferenceVerset(
  String reference,
  List<BibleBook> livres,
) {
  final propre = reference.trim();
  if (propre.isEmpty) return null;
  final normalisee = _sansAccents(propre.toLowerCase());
  var meilleur = -1;
  var meilleurNom = '';
  for (var i = 0; i < livres.length; i++) {
    final nom = _sansAccents(livres[i].name.toLowerCase());
    if (nom.isEmpty) continue;
    if (normalisee.startsWith(nom) && nom.length > meilleurNom.length) {
      meilleur = i;
      meilleurNom = nom;
    }
  }
  if (meilleur < 0) return null;
  final reste = propre.substring(livres[meilleur].name.length).trim();
  final parties = reste.split(':');
  if (parties.length != 2) return null;
  final chapitre = int.tryParse(parties[0].trim());
  final verset = int.tryParse(parties[1].trim());
  if (chapitre == null || verset == null || chapitre < 1 || verset < 1) return null;
  return (livre: meilleur, chapitre: chapitre, verset: verset);
}

String _sansAccents(String texte) {
  const remplacements = {
    'à': 'a', 'â': 'a', 'ä': 'a',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'î': 'i', 'ï': 'i',
    'ô': 'o', 'ö': 'o',
    'ù': 'u', 'û': 'u', 'ü': 'u',
    'ç': 'c',
  };
  final tampon = StringBuffer();
  for (final c in texte.split('')) {
    tampon.write(remplacements[c] ?? c);
  }
  return tampon.toString();
}

/// Page du carnet de promesses du membre.
class CarnetPromessesPage extends StatefulWidget {
  const CarnetPromessesPage({super.key, this.client});

  /// Client injecté pour les tests, le client global sinon.
  final ApiClient? client;

  @override
  State<CarnetPromessesPage> createState() => _CarnetPromessesPageState();
}

class _CarnetPromessesPageState extends State<CarnetPromessesPage> {
  List<Promesse> _promesses = const [];
  bool _charge = false;
  bool _enCours = false;
  bool _biblePrete = false;

  ApiClient get _client => widget.client ?? api;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    // La Bible ne bloque jamais la liste : elle sert seulement
    // à afficher le texte du verset sous la référence, quand
    // elle est prête, sinon seule la référence s'affiche. Son
    // chargement tourne en parallèle, sans attendre.
    _chargerBible();
    try {
      final data = await _client.fetchPromesses();
      if (!mounted) return;
      setState(() {
        _promesses = promessesDepuisReponse(data);
        _charge = true;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _charge = true);
      _annoncer(e.toString());
    }
  }

  Future<void> _chargerBible() async {
    try {
      await BibleService.instance.load();
    } catch (_) {}
    if (!mounted) return;
    setState(() => _biblePrete = BibleService.instance.loaded);
  }

  void _annoncer(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  /// Texte du verset depuis la Bible embarquée, ou null quand
  /// la référence ne se lit pas ou que la Bible n'est pas là.
  /// Jamais inventé : sans texte, seule la référence s'affiche.
  String? _texteVerset(Promesse promesse) {
    if (!_biblePrete) return null;
    final lue = analyserReferenceVerset(promesse.reference, BibleService.instance.books(currentLang));
    if (lue == null) return null;
    return BibleService.instance.verseText(currentLang, lue.livre, lue.chapitre, lue.verset);
  }

  Future<void> _ajouter() async {
    final reference = TextEditingController();
    final note = TextEditingController();
    final texte = TextEditingController();
    final ajoute = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Nouvelle promesse')),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: reference,
                decoration: InputDecoration(labelText: tr('Référence du verset')),
                textCapitalization: TextCapitalization.sentences,
              ),
              const SizedBox(height: 12),
              TextField(
                controller: note,
                maxLines: 3,
                decoration: InputDecoration(labelText: tr('Note personnelle')),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: texte,
                maxLines: 3,
                decoration: InputDecoration(labelText: tr('Texte du verset, si la Bible ne l’affiche pas')),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(
            onPressed: () {
              if (reference.text.trim().isEmpty) return;
              Navigator.of(c).pop(true);
            },
            child: Text(tr('Enregistrer')),
          ),
        ],
      ),
    );
    if (ajoute != true) return;
    setState(() => _enCours = true);
    try {
      await _client.ajouterPromesse(reference.text.trim(), note.text.trim(), texte.text.trim());
      if (mounted) _annoncer(tr('Promesse enregistrée.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  Future<void> _supprimer(Promesse promesse) async {
    final confirme = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text(tr('Supprimer cette promesse ?')),
        content: Text(promesse.reference),
        actions: [
          TextButton(onPressed: () => Navigator.of(c).pop(false), child: Text(tr('Annuler'))),
          TextButton(onPressed: () => Navigator.of(c).pop(true), child: Text(tr('Supprimer'))),
        ],
      ),
    );
    if (confirme != true) return;
    setState(() => _enCours = true);
    try {
      await _client.supprimerPromesse(promesse.id);
      if (mounted) _annoncer(tr('Promesse supprimée.'));
    } catch (e) {
      if (mounted) _annoncer(e.toString());
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
    await _charger();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(tr('Carnet de Promesses'))),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _enCours ? null : _ajouter,
        icon: const Icon(Icons.add),
        label: Text(tr('Nouvelle promesse')),
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : _promesses.isEmpty
              ? RefreshIndicator(
                  onRefresh: _charger,
                  child: ListView(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(32),
                        child: Text(
                          tr('Ton carnet est vide. Enregistre une promesse, sa référence, ta note, et le texte vient de ta Bible quand elle est disponible.'),
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: _grisTexte, fontSize: 15),
                        ),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _charger,
                  child: ListView.builder(
                    itemCount: _promesses.length,
                    itemBuilder: (context, index) {
                      final promesse = _promesses[index];
                      final verset = _texteVerset(promesse);
                      final texteAffiche = verset ?? (promesse.texte.isEmpty ? null : promesse.texte);
                      return Padding(
                        padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                        child: Card(
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        promesse.reference,
                                        style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17, color: _nuit),
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: _enCours ? null : () => _supprimer(promesse),
                                      icon: const Icon(Icons.delete_outlined, color: _grisTexte),
                                      tooltip: tr('Supprimer'),
                                    ),
                                  ],
                                ),
                                if (texteAffiche != null) ...[
                                  const SizedBox(height: 8),
                                  Text(
                                    '« $texteAffiche »',
                                    style: const TextStyle(fontSize: 15, fontStyle: FontStyle.italic),
                                  ),
                                ],
                                if (promesse.note.isNotEmpty) ...[
                                  const SizedBox(height: 8),
                                  Text(promesse.note, style: const TextStyle(fontSize: 14)),
                                ],
                                if (promesse.creeLe.isNotEmpty) ...[
                                  const SizedBox(height: 8),
                                  Text(
                                    promesse.creeLe.length >= 10 ? promesse.creeLe.substring(0, 10) : promesse.creeLe,
                                    style: const TextStyle(color: _or, fontSize: 13),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}
