// Structure, tranche T9, 26 nov. 2026.
// Le Bureau, accessible depuis Structure par « Voir tout le
// Bureau », la section Liaison parents et enfants, et l'entrée
// Espace structure, réservée aux administrateurs. L'Espace
// structure garde ses lectures d'administration : demandes de
// prière à suivre et liens parent-enfant en attente.
import 'package:flutter/material.dart';

import 'modeles_t14.dart';
import 'modeles_t9.dart';
import 'page_fiche_membre.dart';
import 'palette.dart';
import 'service_t14.dart';
import 'service_t9.dart';

class PageStructure extends StatefulWidget {
  const PageStructure({super.key, required this.service});
  final ServiceT9 service;

  @override
  State<PageStructure> createState() => _PageStructureState();
}

class _PageStructureState extends State<PageStructure> {
  var _charge = false;
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

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        const _TitreSection('Le Bureau'),
        if (s.bureau.isEmpty)
          const _Vide('À confirmer.')
        else
          for (final m in s.bureau.take(3)) _TuileBureau(m),
        TextButton.icon(
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => PageBureau(bureau: s.bureau),
              ),
            );
          },
          icon: const Icon(Icons.groups_outlined),
          label: const Text('Voir tout le Bureau'),
        ),
        const SizedBox(height: 8),
        Card(
          color: Colors.white,
          margin: EdgeInsets.zero,
          child: ListTile(
            leading: const Icon(Icons.business_outlined,
                color: PaletteNouvelle.bleuNuit),
            title: const Text('Espace structure'),
            subtitle: const Text('Administrateurs'),
            trailing: const Icon(Icons.chevron_right, color: Colors.grey),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => PageEspaceStructure(service: s),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 16),
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
    );
  }
}

/// Tout le Bureau, ordre du serveur.
class PageBureau extends StatelessWidget {
  const PageBureau({super.key, required this.bureau});
  final List<MembreBureau> bureau;

  @override
  Widget build(BuildContext context) {
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
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          if (bureau.isEmpty)
            const _Vide('À confirmer.')
          else
            for (final m in bureau) _TuileBureau(m),
        ],
      ),
    );
  }
}

/// Espace structure, administrateurs seulement. Les lectures
/// échouent en 403 hors périmètre, la page le dit alors.
class PageEspaceStructure extends StatefulWidget {
  const PageEspaceStructure({super.key, required this.service, this.serviceT14});
  final ServiceT9 service;

  /// Service T14, fiche membre côté Bureau. Sans lui, la
  /// section Membres n'apparaît pas.
  final ServiceT14? serviceT14;

  @override
  State<PageEspaceStructure> createState() => _PageEspaceStructureState();
}

class _PageEspaceStructureState extends State<PageEspaceStructure> {
  var _charge = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerEspaceStructure();
    if (mounted) setState(() => _charge = true);
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    if (!s.accesAdmin) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text(
            'Espace structure, réservé aux administrateurs.',
            textAlign: TextAlign.center,
          ),
        ),
      );
    }
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
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
        const SizedBox(height: 16),
        const _TitreSection('Liens parent-enfant en attente'),
        if (s.liensEnAttente.isEmpty)
          const _Vide('Aucun lien en attente.')
        else
          for (final l in s.liensEnAttente)
            Card(
              color: Colors.white,
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                title: Text(l.nom),
                subtitle: Text(l.matricule),
              ),
            ),
        if (widget.serviceT14 != null) ...[
          const SizedBox(height: 16),
          const _TitreSection('Membres'),
          SectionMembresAdmin(service: widget.serviceT14!),
        ],
      ],
    );
  }
}

/// Membres de l'administration, tranche T14 : liste chargée
/// depuis GET /admin/membres, recherche locale par nom ou
/// matricule, toucher un membre ouvre sa fiche avec Corriger
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
                trailing:
                    const Icon(Icons.chevron_right, color: Colors.grey),
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
        leading: const Icon(Icons.person_outline,
            color: PaletteNouvelle.bleuNuit),
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
