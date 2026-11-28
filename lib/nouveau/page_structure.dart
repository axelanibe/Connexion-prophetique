// Structure, tranche T9, 26 nov. 2026, refonte T18, 27 nov. 2026.
// Le Bureau, accessible depuis Structure par « Voir tout le
// Bureau », la section Liaison parents et enfants, la section
// Nos établissements, et l'entrée Espace structure, réservée
// aux administrateurs. L'Espace structure affiche les 6 chiffres
// de la maquette, les 3 actions, puis les entrées des lots 1 et 2.
import 'package:flutter/material.dart';

import 'modeles_t14.dart';
import 'modeles_t18.dart';
import 'modeles_t9.dart';
import 'page_espace_admin.dart';
import 'page_etablissements.dart';
import '../print_doc.dart';
import 'page_fiche_membre.dart';
import 'palette.dart';
import 'service_t14.dart';
import 'service_t18.dart';
import 'service_t9.dart';

class PageStructure extends StatefulWidget {
  const PageStructure({
    super.key,
    required this.service,
    this.serviceT14,
    this.serviceT18,
    this.onOuvrirCamps,
    this.onOuvrirEtablissements,
  });
  final ServiceT9 service;

  /// Service T14, fiche membre côté Bureau, transmis à
  /// l'Espace structure.
  final ServiceT14? serviceT14;

  /// Service T18, pour les établissements et l'Espace structure.
  final ServiceT18? serviceT18;

  /// Ouverture de la destination Camps, pour « Prochain camp ».
  final VoidCallback? onOuvrirCamps;

  /// Ouverture de la destination Nos établissements, pour
  /// « Voir les établissements » : la barre du bas reste
  /// visible, au lieu d'une page poussée qui la cachait.
  final VoidCallback? onOuvrirEtablissements;

  @override
  State<PageStructure> createState() => _PageStructureState();
}

class _PageStructureState extends State<PageStructure> {
  var _charge = false;
  // Correctif global, 27 nov. 2026 : la page est en onglets
  // visibles, 0 Le Bureau, 1 Établissements, 2 Liaison.
  var _onglet = 0;
  final _recherche = TextEditingController();
  var _resultats = <EnfantLie>[];
  var _rechercheEnCours = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _recherche.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await widget.service.chargerStructure();
    if (widget.serviceT18 != null) {
      await widget.serviceT18!.chargerEtablissements();
      // Transparence financière, onglet Le Bureau, pour les
      // administrateurs seulement.
      if (widget.service.accesAdmin) {
        await widget.serviceT18!.chargerComptabilite();
      }
    }
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _chercher() async {
    final saisie = _recherche.text.trim();
    if (saisie.isEmpty) return;
    setState(() => _rechercheEnCours = true);
    final resultats = await widget.service.chercherEnfant(saisie);
    if (mounted) {
      setState(() {
        _resultats = resultats;
        _rechercheEnCours = false;
      });
    }
  }

  Future<void> _demanderLien(EnfantLie enfant) async {
    final ok = await widget.service.demanderLien(enfant.id);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(ok
            ? 'Demande envoyée. Un responsable la valide.'
            : 'Impossible pour le moment.'),
      ),
    );
    if (ok) setState(() => _resultats = []);
  }

  void _ouvrirBureau({String? filtreInitial}) {
    final serviceT18 = widget.serviceT18;
    if (serviceT18 == null) return;
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => PageBureau(
          serviceT18: serviceT18,
          filtreInitial: filtreInitial,
        ),
      ),
    );
  }

  /// Transparence financière, correctif global 27 nov. 2026 :
  /// la carte de la maquette, remplie par les totaux du mois
  /// de la Comptabilité, pour les administrateurs seulement.
  /// Toucher ouvre la Comptabilité.
  Widget _carteTransparence(ServiceT18 service) {
    final totaux = service.comptabilite!.totaux;
    int montant(String cle) => (totaux[cle] as num?)?.toInt() ?? 0;
    return Card(
      color: Colors.white,
      margin: EdgeInsets.zero,
      child: InkWell(
        onTap: () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => PageComptabiliteAdmin(service: service),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const _TitreSection('Transparence financière'),
              Row(
                children: [
                  for (final (libelle, cle, couleur)
                      in <(String, String, Color)>[
                    ('Entrées', 'entrees', const Color(0xFF15803D)),
                    ('Dépenses', 'depenses', const Color(0xFFB91C1C)),
                    ('Solde', 'solde', PaletteNouvelle.bleuNuit),
                  ])
                    Expanded(
                      child: Column(
                        children: [
                          Text(
                            formaterFcfa(montant(cle)),
                            style: TextStyle(
                              fontFamily: 'Cinzel',
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                              color: couleur,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            libelle,
                            style: const TextStyle(
                              fontSize: 12,
                              color: Colors.black54,
                            ),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    final serviceT18 = widget.serviceT18;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    return Column(
      children: [
        // Correctif global, 27 nov. 2026 : onglets visibles,
        // l'onglet actif est marqué, bleu nuit plein.
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
          child: Row(
            children: [
              for (var i = 0; i < 3; i++)
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(left: i == 0 ? 0 : 6),
                    child: _OngletStructure(
                      libelle: const [
                        'Le Bureau',
                        'Établissements',
                        'Liaison',
                      ][i],
                      actif: _onglet == i,
                      onTap: () => setState(() => _onglet = i),
                    ),
                  ),
                ),
            ],
          ),
        ),
        Expanded(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
            children: [
              if (_onglet == 0) ...[
                const _TitreSection('Le Bureau'),
                if (s.bureau.isEmpty)
                  const _Vide('À confirmer.')
                else
                  for (final m in s.bureau.take(3)) _TuileBureau(m),
                TextButton.icon(
                  onPressed: () => _ouvrirBureau(),
                  icon: const Icon(Icons.groups_outlined),
                  label: const Text('Voir tout le Bureau'),
                ),
                const SizedBox(height: 8),
                // Correctif global, 27 nov. 2026 : la carte Espace
                // structure est retirée de la page Structure, elle
                // reste dans Plus. La carte Transparence financière
                // de la maquette prend sa place, pour les admins.
                if (s.accesAdmin &&
                    serviceT18 != null &&
                    serviceT18.comptabilite != null)
                  _carteTransparence(serviceT18),
              ],
              if (_onglet == 1) ...[
                if (serviceT18 != null) ...[
                  const _TitreSection('Nos établissements'),
                  if (serviceT18.etablissements.isEmpty)
                    const _Vide('Aucun établissement pour le moment.')
                  else
                    for (final e in serviceT18.etablissements.take(3))
                      Card(
                        color: Colors.white,
                        margin: const EdgeInsets.only(bottom: 8),
                        child: ListTile(
                          leading: const Icon(Icons.school_outlined,
                              color: PaletteNouvelle.bleuNuit),
                          title: Text(e.nom),
                          subtitle: Text(e.compteurs),
                        ),
                      ),
                  TextButton.icon(
                    onPressed: () {
                      if (widget.onOuvrirEtablissements != null) {
                        widget.onOuvrirEtablissements!();
                        return;
                      }
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => PageEtablissements(
                            service: serviceT18,
                            onOuvrirStructure: () =>
                                _ouvrirBureau(filtreInitial: 'Structure'),
                            poussee: true,
                          ),
                        ),
                      );
                    },
                    icon: const Icon(Icons.school_outlined),
                    label: const Text('Voir les établissements'),
                  ),
                ],
              ],
              if (_onglet == 2) ...[
                const _TitreSection('Liaison parents et enfants'),
                const Text(
                  'Le parent lié au compte de son enfant suit ses résultats et ses autres informations.',
                  style: TextStyle(color: Colors.grey, fontSize: 14),
                ),
                const SizedBox(height: 8),
                if (s.enfants.isEmpty && s.liens.isEmpty)
                  const _Vide('Aucun enfant lié pour le moment.')
                else ...[
                  for (final e in s.enfants)
                    Card(
                      color: Colors.white,
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        leading: const Icon(Icons.child_care_outlined,
                            color: PaletteNouvelle.bleuNuit),
                        title: Text(e.nom),
                        subtitle: Text(e.matricule),
                      ),
                    ),
                  for (final l in s.liens.where((e) => e.statut != 'valide'))
                    Card(
                      color: Colors.white,
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        leading: const Icon(Icons.hourglass_empty_outlined,
                            color: PaletteNouvelle.bleuNuit),
                        title: Text(l.nom),
                        subtitle: Text('En attente de validation'),
                        trailing: IconButton(
                          icon: const Icon(Icons.close_outlined),
                          onPressed: () => s.retirerLien(l.id).then((_) {
                            if (mounted) setState(() {});
                          }),
                        ),
                      ),
                    ),
                ],
                const SizedBox(height: 12),
                TextField(
                  controller: _recherche,
                  decoration: InputDecoration(
                    hintText: 'Nom ou matricule de l’enfant…',
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide.none,
                    ),
                    suffixIcon: IconButton(
                      icon: const Icon(Icons.search),
                      onPressed: _rechercheEnCours ? null : _chercher,
                    ),
                  ),
                  onSubmitted: (_) => _chercher(),
                ),
                const SizedBox(height: 8),
                if (_resultats.isEmpty && _recherche.text.trim().isNotEmpty)
                  const _Vide('Aucun membre trouvé.')
                else
                  for (final e in _resultats)
                    Card(
                      color: Colors.white,
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        title: Text(e.nom),
                        subtitle: Text(e.matricule),
                        trailing: TextButton(
                          onPressed: () => _demanderLien(e),
                          child: const Text('Demander le lien'),
                        ),
                      ),
                    ),
              ],
            ],
          ),
        ),
      ],
    );
  }
}

/// Onglet visible de la page Structure, correctif global
/// 27 nov. 2026 : l'onglet actif est marqué, bleu nuit plein,
/// les autres sont blancs avec le texte bleu nuit.
class _OngletStructure extends StatelessWidget {
  const _OngletStructure({
    required this.libelle,
    required this.actif,
    required this.onTap,
  });
  final String libelle;
  final bool actif;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return FilledButton(
      onPressed: onTap,
      style: FilledButton.styleFrom(
        backgroundColor: actif ? PaletteNouvelle.bleuNuit : Colors.white,
        foregroundColor: actif ? Colors.white : PaletteNouvelle.bleuNuit,
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
      child: Text(
        libelle,
        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
        textAlign: TextAlign.center,
      ),
    );
  }
}

/// Initiales d'un nom, pour le cercle du Bureau.
String _initiales(String nom) {
  final mots =
      nom.trim().split(RegExp(r'\s+')).where((m) => m.isNotEmpty).toList();
  if (mots.isEmpty) return '?';
  if (mots.length == 1) return mots.first[0].toUpperCase();
  return (mots[0][0] + mots[1][0]).toUpperCase();
}

/// Tout le Bureau, tranche T18. Filtres en pastilles : Tous,
/// Structure, puis les établissements du serveur. Le serveur ne
/// renvoie pas de photo pour le Bureau : initiales en cercle 56.
class PageBureau extends StatefulWidget {
  const PageBureau({
    super.key,
    required this.serviceT18,
    this.filtreInitial,
  });
  final ServiceT18 serviceT18;

  /// Filtre initial : 'Structure', ou l'identifiant d'un
  /// établissement. Sans lui, « Tous ».
  final String? filtreInitial;

  @override
  State<PageBureau> createState() => _PageBureauState();
}

class _PageBureauState extends State<PageBureau> {
  var _charge = false;
  String? _filtre;

  @override
  void initState() {
    super.initState();
    _filtre = widget.filtreInitial;
    _charger();
  }

  Future<void> _charger() async {
    await widget.serviceT18.chargerBureau(
      etablissementId: _estEtablissement(_filtre) ? _filtre : null,
    );
    await widget.serviceT18.chargerEtablissements();
    await widget.serviceT18.chargerAccesAdmin();
    if (mounted) setState(() => _charge = true);
  }

  bool _estEtablissement(String? filtre) =>
      filtre != null && filtre != 'Structure';

  List<MembreBureau> get _visibles {
    final tous = widget.serviceT18.bureau;
    if (_filtre == null) return tous;
    if (_filtre == 'Structure') {
      return tous.where((m) => m.etablissement.trim().isEmpty).toList();
    }
    return tous;
  }

  Future<void> _ajouter() async {
    final nom = TextEditingController();
    final fonction = TextEditingController();
    final contact = TextEditingController();
    var contactPublic = false;
    String? etablissementId;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: const Text('Ajouter un responsable'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nom,
                  decoration: const InputDecoration(labelText: 'Nom'),
                ),
                TextField(
                  controller: fonction,
                  decoration: const InputDecoration(labelText: 'Fonction'),
                ),
                TextField(
                  controller: contact,
                  decoration: const InputDecoration(
                    labelText: 'Contact (facultatif)',
                  ),
                ),
                CheckboxListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Contact affiché publiquement'),
                  value: contactPublic,
                  onChanged: (v) => setEtat(() => contactPublic = v ?? false),
                ),
                DropdownButtonFormField<String?>(
                  value: etablissementId,
                  decoration: const InputDecoration(
                    labelText: 'Établissement (facultatif)',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    const DropdownMenuItem(
                      value: null,
                      child: Text('Structure'),
                    ),
                    for (final e in widget.serviceT18.etablissements)
                      DropdownMenuItem(value: e.id, child: Text(e.nom)),
                  ],
                  onChanged: (v) => setEtat(() => etablissementId = v),
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
              child: const Text('Ajouter'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    if (nom.text.trim().isEmpty || fonction.text.trim().isEmpty) return;
    final ajoute = await widget.serviceT18.ajouterResponsable(
      nom: nom.text.trim(),
      fonction: fonction.text.trim(),
      contact: contact.text.trim().isEmpty ? null : contact.text.trim(),
      contactPublic: contactPublic,
      etablissementId: etablissementId,
    );
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(ajoute ? 'Responsable ajouté.' : 'Ajout impossible.'),
      ),
    );
    if (ajoute) _charger();
  }

  /// Import par collage de lignes : une ligne par responsable,
  /// « Nom ; Fonction ; Établissement ; Contact ». Sans création
  /// de compte membre. L'ancienne analyse Word et PDF n'est pas
  /// reconstruite.
  Future<void> _importer() async {
    final lignes = TextEditingController();
    String? etablissementId;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: const Text('Importer un fichier'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Colle une ligne par responsable :\n'
                  'Nom ; Fonction ; Établissement ; Contact',
                  style: TextStyle(fontSize: 13, color: Colors.black54),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: lignes,
                  maxLines: 8,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String?>(
                  value: etablissementId,
                  decoration: const InputDecoration(
                    labelText: 'Établissement (facultatif)',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    const DropdownMenuItem(
                      value: null,
                      child: Text('Structure'),
                    ),
                    for (final e in widget.serviceT18.etablissements)
                      DropdownMenuItem(value: e.id, child: Text(e.nom)),
                  ],
                  onChanged: (v) => setEtat(() => etablissementId = v),
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
              child: const Text('Importer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    final importees = <Map<String, dynamic>>[];
    for (final ligne in lignes.text.split('\n')) {
      final champs = ligne
          .split(';')
          .map((c) => c.trim())
          .where((c) => c.isNotEmpty)
          .toList();
      if (champs.length < 2) continue;
      importees.add({
        'nom': champs[0],
        'fonction': champs[1],
        if (champs.length > 2) 'etablissement': champs[2],
        if (champs.length > 3) 'contact': champs[3],
      });
    }
    if (importees.isEmpty) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Aucune ligne valable.')),
      );
      return;
    }
    final importe = await widget.serviceT18.importerBureau(
      importees,
      etablissementId: etablissementId,
    );
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          importe
              ? '${importees.length} responsable(s) importé(s).'
              : 'Import impossible.',
        ),
      ),
    );
    if (importe) _charger();
  }

  Future<void> _deplacer() async {
    String? sourceId;
    String? destinationId;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setEtat) => AlertDialog(
          title: const Text('Déplacer ce bureau'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              DropdownButtonFormField<String?>(
                value: sourceId,
                decoration: const InputDecoration(
                  labelText: 'Bureau à déplacer',
                  border: OutlineInputBorder(),
                ),
                items: [
                  const DropdownMenuItem(
                    value: null,
                    child: Text('Structure'),
                  ),
                  for (final e in widget.serviceT18.etablissements)
                    DropdownMenuItem(value: e.id, child: Text(e.nom)),
                ],
                onChanged: (v) => setEtat(() => sourceId = v),
              ),
              const SizedBox(height: 8),
              DropdownButtonFormField<String?>(
                value: destinationId,
                decoration: const InputDecoration(
                  labelText: 'Destination',
                  border: OutlineInputBorder(),
                ),
                items: [
                  const DropdownMenuItem(
                    value: null,
                    child: Text('Structure'),
                  ),
                  for (final e in widget.serviceT18.etablissements)
                    DropdownMenuItem(value: e.id, child: Text(e.nom)),
                ],
                onChanged: (v) => setEtat(() => destinationId = v),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Déplacer'),
            ),
          ],
        ),
      ),
    );
    if (ok != true) return;
    final deplace = await widget.serviceT18.deplacerBureau(
      sourceEtablissementId: sourceId,
      destinationEtablissementId: destinationId,
    );
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          deplace ? 'Bureau déplacé.' : 'Déplacement impossible.',
        ),
      ),
    );
    if (deplace) _charger();
  }

  @override
  Widget build(BuildContext context) {
    final service = widget.serviceT18;
    final visibles = _visibles;
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text(
          'Le Bureau',
          style: TextStyle(color: PaletteNouvelle.bleuNuit),
        ),
        iconTheme: const IconThemeData(color: PaletteNouvelle.bleuNuit),
      ),
      body: !_charge
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(16, 20, 16, 24),
              children: [
                const Text(
                  'Le Bureau',
                  style: TextStyle(
                    fontFamily: 'Cinzel',
                    fontSize: 28,
                    fontWeight: FontWeight.w700,
                    color: PaletteNouvelle.bleuNuit,
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Contacts affichés avec accord.',
                  style: TextStyle(fontSize: 14, color: Colors.black54),
                ),
                const SizedBox(height: 16),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      for (final (valeur, libelle) in [
                        (null, 'Tous'),
                        ('Structure', 'Structure'),
                        for (final e in service.etablissements) (e.id, e.nom),
                      ])
                        Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: ChoiceChip(
                            label: Text(libelle),
                            selected: _filtre == valeur,
                            onSelected: (_) {
                              setState(() => _filtre = valeur);
                              _charger();
                            },
                          ),
                        ),
                    ],
                  ),
                ),
                if (service.accesAdmin) ...[
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      FilledButton.icon(
                        onPressed: _ajouter,
                        icon: const Icon(Icons.person_add_outlined),
                        label: const Text('Ajouter'),
                      ),
                      OutlinedButton.icon(
                        onPressed: _importer,
                        icon: const Icon(Icons.upload_file_outlined),
                        label: const Text('Importer un fichier'),
                      ),
                      OutlinedButton.icon(
                        onPressed: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) => PageNominationsAdmin(
                                service: service,
                              ),
                            ),
                          );
                        },
                        icon: const Icon(Icons.badge_outlined),
                        label: const Text('Nominations'),
                      ),
                      OutlinedButton.icon(
                        onPressed: _deplacer,
                        icon: const Icon(Icons.move_up_outlined),
                        label: const Text('Déplacer ce bureau'),
                      ),
                    ],
                  ),
                ],
                const SizedBox(height: 16),
                if (visibles.isEmpty)
                  const _Vide('Aucun responsable pour ce filtre.')
                else
                  for (final m in visibles)
                    Card(
                      color: Colors.white,
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        leading: CircleAvatar(
                          radius: 28,
                          backgroundColor: PaletteNouvelle.bleuNuit,
                          child: Text(
                            _initiales(m.nom),
                            style: const TextStyle(
                              color: PaletteNouvelle.or,
                              fontWeight: FontWeight.w700,
                              fontSize: 16,
                            ),
                          ),
                        ),
                        title: Text(m.nom),
                        subtitle: Text(
                          [
                            if (m.fonction.isNotEmpty) m.fonction,
                            if (m.etablissement.isNotEmpty) m.etablissement,
                            if (m.contact.isNotEmpty) m.contact,
                          ].join(' · '),
                        ),
                      ),
                    ),
              ],
            ),
    );
  }
}

/// Espace structure, administrateurs seulement. Les lectures
/// échouent en 403 hors périmètre, la page le dit alors.
/// T18 : les 6 chiffres de la maquette, les 3 actions, puis les
/// entrées des lots 1 et 2, puis les sections existantes.
class PageEspaceStructure extends StatefulWidget {
  const PageEspaceStructure({
    super.key,
    required this.service,
    this.serviceT14,
    this.serviceT18,
    this.onOuvrirCamps,
    this.poussee = false,
  });
  final ServiceT9 service;

  /// Service T14, fiche membre côté Bureau. Sans lui, la
  /// section Membres n'apparaît pas.
  final ServiceT14? serviceT14;

  /// Service T18, chiffres et pages administrateurs.
  final ServiceT18? serviceT18;

  /// Ouverture de la destination Camps, pour « Prochain camp ».
  final VoidCallback? onOuvrirCamps;

  /// Vrai quand la page est poussée depuis la page Structure :
  /// une AppBar avec flèche retour s'affiche alors. En
  /// destination (Plus, tiroir), le chevron de la coquille
  /// suffit, pas de double barre.
  final bool poussee;

  @override
  State<PageEspaceStructure> createState() => _PageEspaceStructureState();
}

class _PageEspaceStructureState extends State<PageEspaceStructure> {
  var _charge = false;
  final _defilement = ScrollController();

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _defilement.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await widget.service.chargerEspaceStructure();
    await widget.serviceT18?.chargerTableauDeBord();
    if (mounted) setState(() => _charge = true);
  }

  void _ouvrir(Widget page) {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => page),
    );
  }

  /// Toucher d'une carte du tableau de bord : chaque chiffre
  /// s'ouvre sur son détail, correction de suivi 27 nov. 2026.
  void _ouvrirChiffre(int index) {
    final serviceT18 = widget.serviceT18;
    if (serviceT18 == null) return;
    switch (index) {
      case 0:
        final serviceT14 = widget.serviceT14;
        if (serviceT14 == null) return;
        _ouvrir(PageGererMembres(
          serviceT14: serviceT14,
          serviceT18: serviceT18,
        ));
      case 1:
        _ouvrir(PagePresencesAdmin(service: serviceT18));
      case 2:
        _ouvrir(PageDetailCotisationsAdmin(service: serviceT18));
      case 3:
        _ouvrir(PageInscriptionsCamp(service: serviceT18));
      case 4:
        _ouvrir(PageLiensAdmin(service: serviceT18));
      case 5:
        _ouvrir(PageEtablissements(service: serviceT18, poussee: true));
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    final serviceT18 = widget.serviceT18;
    final Widget contenu;
    if (!_charge) {
      contenu = const Center(child: CircularProgressIndicator());
    } else if (!s.accesAdmin) {
      contenu = const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text(
            'Espace structure, réservé aux administrateurs.',
            textAlign: TextAlign.center,
          ),
        ),
      );
    } else {
      contenu = ListView(
        controller: _defilement,
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          if (serviceT18 != null) ...[
            // Correction de suivi, 27 nov. 2026 : les chiffres
            // sont en haut de l'Espace structure, et seulement
            // ici. Chaque carte s'ouvre sur son détail.
            const _TitreSection('En chiffres'),
            GrilleChiffresAdmin(
              chiffres: serviceT18.chiffres,
              onOuvrir: _ouvrirChiffre,
            ),
            const SizedBox(height: 16),
            _ActionAdmin(
              icone: Icons.verified_outlined,
              libelle: 'Valider les paiements',
              onTap: () => _ouvrir(
                PageComptabiliteAdmin(service: serviceT18),
              ),
            ),
            _ActionAdmin(
              icone: Icons.group_outlined,
              libelle: 'Gérer les membres',
              onTap: () {
                final serviceT14 = widget.serviceT14;
                if (serviceT14 == null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content:
                          Text('Gérer les membres n’est pas disponible.'),
                    ),
                  );
                  return;
                }
                _ouvrir(PageGererMembres(
                  serviceT14: serviceT14,
                  serviceT18: serviceT18,
                ));
              },
            ),
            _ActionAdmin(
              icone: Icons.campaign_outlined,
              libelle: 'Publier une actualité',
              onTap: () => _ouvrir(
                PagePublierActualite(service: serviceT18),
              ),
            ),
            const SizedBox(height: 16),
            const _TitreSection('Quotidien'),
            for (final (titre, icone, page) in _entreesLot1(serviceT18).take(3))
              _EntreeAdmin(
                titre: titre,
                icone: icone,
                onTap: () => _ouvrir(page),
              ),
            if (widget.onOuvrirCamps != null)
              _EntreeAdmin(
                titre: 'Prochain camp',
                icone: Icons.event_outlined,
                onTap: widget.onOuvrirCamps!,
              ),
            for (final (titre, icone, page) in _entreesLot1(serviceT18).skip(3))
              _EntreeAdmin(
                titre: titre,
                icone: icone,
                onTap: () => _ouvrir(page),
              ),
            const SizedBox(height: 16),
            const _TitreSection('Gouvernance et réglages'),
            for (final (titre, icone, page) in _entreesLot2(serviceT18))
              _EntreeAdmin(
                titre: titre,
                icone: icone,
                onTap: () => _ouvrir(page),
              ),
            const SizedBox(height: 16),
          ],
          const _TitreSection('Demandes de prière à suivre'),
          if (s.demandesBureau.isEmpty)
            const _Vide('Aucune demande pour le moment.')
          else
            for (final d in s.demandesBureau)
              Card(
                color: Colors.white,
                margin: const EdgeInsets.only(bottom: 8),
                child: ListTile(
                  title: Text(d.texte),
                  subtitle: Text(libelleStatutDemande(d.statut)),
                ),
              ),
        ],
      );
    }
    if (!widget.poussee) return contenu;
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        title: const Text(
          'Espace structure',
          style: TextStyle(color: PaletteNouvelle.bleuNuit),
        ),
        backgroundColor: Colors.white,
        foregroundColor: PaletteNouvelle.bleuNuit,
      ),
      body: contenu,
    );
  }

  /// Entrées du lot 1, sauf « Prochain camp » qui ouvre la
  /// destination Camps.
  List<(String, IconData, Widget)> _entreesLot1(ServiceT18 service) => [
        (
          'Comptabilité',
          Icons.account_balance_outlined,
          PageComptabiliteAdmin(service: service),
        ),
        (
          'Actualités',
          Icons.newspaper_outlined,
          PageActualitesAdmin(service: service),
        ),
        (
          'Inscriptions au camp',
          Icons.how_to_reg_outlined,
          PageInscriptionsCamp(service: service),
        ),
        (
          'Badges du camp',
          Icons.badge_outlined,
          PageBadgesCamp(service: service),
        ),
        (
          'Présences',
          Icons.check_circle_outlined,
          PagePresencesAdmin(service: service),
        ),
        (
          'Documents',
          Icons.folder_outlined,
          PageDocumentsAdmin(service: service),
        ),
        (
          'Attestations',
          Icons.workspace_premium_outlined,
          PageAttestationsAdmin(service: service),
        ),
        (
          'Journal d’audit',
          Icons.history_outlined,
          PageAuditAdmin(service: service),
        ),
        (
          'Exports complets',
          Icons.download_outlined,
          PageExportsAdmin(
            service: service,
            serviceT14: widget.serviceT14 ?? ServiceT14Reel(),
          ),
        ),
      ];

  /// Entrées du lot 2.
  List<(String, IconData, Widget)> _entreesLot2(ServiceT18 service) => [
        (
          'Administrateurs',
          Icons.admin_panel_settings_outlined,
          PageAdministrateurs(service: service),
        ),
        (
          'Nominations',
          Icons.badge_outlined,
          PageNominationsAdmin(service: service),
        ),
        (
          'Élections',
          Icons.how_to_vote_outlined,
          PageElectionsAdmin(service: service),
        ),
        (
          'Liens parent-enfant',
          Icons.family_restroom_outlined,
          PageLiensAdmin(service: service),
        ),
        (
          'Département scolaire',
          Icons.school_outlined,
          PageDepartementScolaire(service: service),
        ),
        (
          'Tremplin professionnel',
          Icons.work_outline,
          PageTremplinBureau(service: service),
        ),
        (
          'Planning des responsables',
          Icons.calendar_month_outlined,
          PagePlanningResponsables(service: service),
        ),
        (
          'Réglages des notifications',
          Icons.notifications_outlined,
          const PageReglagesNotifications(),
        ),
      ];
}

/// Une des 3 actions de la maquette, en ligne.
class _ActionAdmin extends StatelessWidget {
  const _ActionAdmin({
    required this.icone,
    required this.libelle,
    required this.onTap,
  });
  final IconData icone;
  final String libelle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(icone, color: PaletteNouvelle.bleuNuit),
        title: Text(
          libelle,
          style: const TextStyle(fontWeight: FontWeight.w700),
        ),
        trailing: const Icon(Icons.chevron_right, color: Colors.grey),
        onTap: onTap,
      ),
    );
  }
}

/// Une entrée de l'Espace structure, lot 1 ou lot 2.
class _EntreeAdmin extends StatelessWidget {
  const _EntreeAdmin({
    required this.titre,
    required this.icone,
    required this.onTap,
  });
  final String titre;
  final IconData icone;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(icone, color: PaletteNouvelle.bleuNuit),
        title: Text(titre),
        trailing: const Icon(Icons.chevron_right, color: Colors.grey),
        onTap: onTap,
      ),
    );
  }
}

/// Membres de l'administration, tranche T14 : liste chargée
/// depuis GET /admin/membres, recherche locale par nom ou
/// matricule, toucher un membre ouvre sa fiche avec Corriger
/// Gérer les membres, une seule page, correction de suivi
/// 27 nov. 2026 : la longue liste ne vit plus en bas de
/// l'Espace structure. Recherche, impression de la liste,
/// modification et carte du membre depuis la fiche.
class PageGererMembres extends StatefulWidget {
  const PageGererMembres({
    super.key,
    required this.serviceT14,
    required this.serviceT18,
  });
  final ServiceT14 serviceT14;
  final ServiceT18 serviceT18;

  @override
  State<PageGererMembres> createState() => _PageGererMembresState();
}

class _PageGererMembresState extends State<PageGererMembres> {
  var _occupe = false;

  Future<void> _imprimer() async {
    setState(() => _occupe = true);
    final octets = await widget.serviceT18.telechargerExport(
      'membres',
      format: 'pdf',
    );
    if (!mounted) return;
    setState(() => _occupe = false);
    if (octets == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Impression impossible.')),
      );
      return;
    }
    await downloadBytesFile('membres.pdf', octets, 'application/pdf');
  }

  @override
  Widget build(BuildContext context) {
    return PageAdmin(
      titre: 'Gérer les membres',
      enfant: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          Align(
            alignment: Alignment.centerRight,
            child: OutlinedButton.icon(
              onPressed: _occupe ? null : _imprimer,
              icon: const Icon(Icons.print_outlined),
              label: Text(_occupe ? 'Impression…' : 'Imprimer la liste'),
            ),
          ),
          const SizedBox(height: 12),
          SectionMembresAdmin(service: widget.serviceT14),
        ],
      ),
    );
  }
}

/// Liste des membres pour le Bureau, avec recherche, fiche
/// et l'adhésion.
class SectionMembresAdmin extends StatefulWidget {
  const SectionMembresAdmin({super.key, required this.service});
  final ServiceT14 service;

  @override
  State<SectionMembresAdmin> createState() => _SectionMembresAdminState();
}

class _SectionMembresAdminState extends State<SectionMembresAdmin> {
  var _charge = false;
  final _recherche = TextEditingController();
  var _filtre = '';

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _recherche.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await widget.service.chargerMembresAdmin();
    if (mounted) setState(() => _charge = true);
  }

  List<MembreAdmin> get _visibles {
    final saisie = _filtre.trim().toLowerCase();
    final tous = widget.service.membresAdmin;
    if (saisie.isEmpty) return tous;
    return tous
        .where((m) =>
            m.nomComplet.toLowerCase().contains(saisie) ||
            m.matricule.toLowerCase().contains(saisie))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Card(
        color: Colors.white,
        margin: EdgeInsets.zero,
        child: ListTile(title: Text('Chargement des membres…')),
      );
    }
    if (!widget.service.accesAdminMembres) {
      return const _Vide('La liste des membres n’est pas accessible.');
    }
    final visibles = _visibles;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextField(
          controller: _recherche,
          decoration: InputDecoration(
            hintText: 'Nom ou matricule du membre…',
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
            suffixIcon: const Icon(Icons.search),
          ),
          onChanged: (v) => setState(() => _filtre = v),
        ),
        const SizedBox(height: 8),
        if (visibles.isEmpty)
          const _Vide('Aucun membre trouvé.')
        else
          for (final m in visibles)
            Card(
              color: Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: const Icon(Icons.person_outline,
                    color: PaletteNouvelle.bleuNuit),
                title: Text(m.nomComplet),
                subtitle: Text([
                  m.matricule,
                  if (m.etablissement.isNotEmpty) m.etablissement,
                ].join(' · ')),
                trailing: const Icon(Icons.chevron_right, color: Colors.grey),
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) => PageFicheMembreAdmin(
                        service: widget.service,
                        membreId: m.id,
                        nomInitial: m.nomComplet,
                      ),
                    ),
                  );
                },
              ),
            ),
      ],
    );
  }
}

class _TitreSection extends StatelessWidget {
  const _TitreSection(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        texte,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w800,
          color: PaletteNouvelle.bleuNuit,
        ),
      ),
    );
  }
}

class _Vide extends StatelessWidget {
  const _Vide(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: EdgeInsets.zero,
      child: ListTile(title: Text(texte)),
    );
  }
}

class _TuileBureau extends StatelessWidget {
  const _TuileBureau(this.m);
  final MembreBureau m;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading:
            const Icon(Icons.person_outline, color: PaletteNouvelle.bleuNuit),
        title: Text(m.nom),
        subtitle: Text(
          [
            if (m.fonction.isNotEmpty) m.fonction,
            if (m.etablissement.isNotEmpty) m.etablissement,
          ].join(' · '),
        ),
      ),
    );
  }
}
