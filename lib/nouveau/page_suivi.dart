// Suivi, tranche T9, 26 nov. 2026.
// La page telle que dans la maquette : mes demandes de prière
// avec leur statut et la note de suivi du Bureau, mon parrain
// et mes filleuls. Le Suivi complet avec affectation de
// responsable reste la carte 175, séparée.
import 'package:flutter/material.dart';

import 'modeles_t9.dart';
import 'palette.dart';
import 'service_t9.dart';

class PageSuivi extends StatefulWidget {
  const PageSuivi({super.key, required this.service});
  final ServiceT9 service;

  @override
  State<PageSuivi> createState() => _PageSuiviState();
}

class _PageSuiviState extends State<PageSuivi> {
  var _charge = false;
  var _enCours = false;
  final _texte = TextEditingController();

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _texte.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    await widget.service.chargerSuivi();
    if (mounted) setState(() => _charge = true);
  }

  Future<void> _envoyer() async {
    final texte = _texte.text.trim();
    if (texte.isEmpty || _enCours) return;
    setState(() => _enCours = true);
    final ok = await widget.service.envoyerDemande(texte);
    if (!mounted) return;
    setState(() => _enCours = false);
    if (ok) {
      _texte.clear();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Impossible pour le moment.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.service;
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        const _TitreSection('Mon parrain'),
        if (s.monParrain == null)
          const _Vide('Aucun parrain pour le moment.')
        else
          _TuileParrainage(s.monParrain!, estParrain: true),
        const SizedBox(height: 16),
        const _TitreSection('Mes filleuls'),
        if (s.filleuls.isEmpty)
          const _Vide('Aucun filleul pour le moment.')
        else
          for (final f in s.filleuls) _TuileParrainage(f, estParrain: false),
        const SizedBox(height: 16),
        const _TitreSection('Mes demandes de prière'),
        if (s.demandes.isEmpty)
          const _Vide('Aucune demande pour le moment.')
        else
          for (final d in s.demandes) _TuileDemande(d),
        const SizedBox(height: 16),
        const _TitreSection('Nouvelle demande'),
        TextField(
          controller: _texte,
          maxLines: 3,
          decoration: InputDecoration(
            hintText: 'Écrire ma demande…',
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          width: double.infinity,
          child: FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: PaletteNouvelle.bleuNuit,
            ),
            onPressed: _enCours ? null : _envoyer,
            child: const Text('Envoyer'),
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

class _TuileParrainage extends StatelessWidget {
  const _TuileParrainage(this.p, {required this.estParrain});
  final ParrainageSuivi p;
  final bool estParrain;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(
          estParrain ? Icons.person_outline : Icons.people_outline,
          color: PaletteNouvelle.bleuNuit,
        ),
        title: Text(p.nom.isEmpty ? 'À confirmer' : p.nom),
        subtitle: Text(p.estBaptise ? 'Baptisé' : libelleStatutDemande(p.statut)),
      ),
    );
  }
}

class _TuileDemande extends StatelessWidget {
  const _TuileDemande(this.d);
  final DemandeSuivi d;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        title: Text(d.texte),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text(libelleStatutDemande(d.statut)),
            if (d.noteSuivi.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(d.noteSuivi),
            ],
          ],
        ),
      ),
    );
  }
}
