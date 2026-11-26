// Opportunité, tranche T9, 26 nov. 2026.
// Remplace offre d'emploi et formation, en ligne la tuile
// Tremplin professionnel : offres d'emploi, stages et
// formations, selon votre pays. Les offres vivent en stockage
// local, publiées par le Bureau, aucune route serveur.
// Filtres pays et type, comme l'ancien écran.
import 'package:flutter/material.dart';

import '../app_models.dart' show kPaysResidence;
import 'modeles_t9.dart';
import 'palette.dart';
import 'service_t9.dart';

class PageOpportunite extends StatefulWidget {
  const PageOpportunite({super.key, required this.service});
  final ServiceT9 service;

  @override
  State<PageOpportunite> createState() => _PageOpportuniteState();
}

class _PageOpportuniteState extends State<PageOpportunite> {
  var _charge = false;
  var _typeFiltre = 'tous';
  String? _paysFiltre;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    await widget.service.chargerMembre();
    await widget.service.chargerOpportunites();
    if (mounted) {
      setState(() {
        _charge = true;
        _paysFiltre ??= widget.service.paysResidence.isEmpty
            ? 'tous'
            : widget.service.paysResidence;
      });
    }
  }

  List<OffreOpportunite> get _visibles {
    var liste = widget.service.offres;
    final pays = _paysFiltre ?? 'tous';
    if (pays != 'tous') {
      liste = liste.where((o) => o.pays == pays).toList();
    }
    if (_typeFiltre != 'tous') {
      liste = liste.where((o) => o.type == _typeFiltre).toList();
    }
    return liste;
  }

  @override
  Widget build(BuildContext context) {
    if (!_charge) {
      return const Center(child: CircularProgressIndicator());
    }
    final pays = widget.service.paysResidence;
    final visibles = _visibles;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        DropdownButtonFormField<String>(
          value: _paysFiltre,
          isExpanded: true,
          decoration: const InputDecoration(
            labelText: 'Pays',
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(borderSide: BorderSide.none),
          ),
          items: [
            if (pays.isNotEmpty)
              DropdownMenuItem(value: pays, child: Text('Mon pays ($pays)')),
            const DropdownMenuItem(value: 'tous', child: Text('Tous les pays')),
            for (final p in kPaysResidence.where((e) => e != pays))
              DropdownMenuItem(value: p, child: Text(p)),
          ],
          onChanged: (v) => setState(() => _paysFiltre = v ?? 'tous'),
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<String>(
          value: _typeFiltre,
          isExpanded: true,
          decoration: const InputDecoration(
            labelText: 'Type',
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(borderSide: BorderSide.none),
          ),
          items: [
            const DropdownMenuItem(value: 'tous', child: Text('Tous')),
            for (final t in typesOffre)
              DropdownMenuItem(value: t, child: Text(t)),
          ],
          onChanged: (v) => setState(() => _typeFiltre = v ?? 'tous'),
        ),
        const SizedBox(height: 12),
        if (visibles.isEmpty)
          const Card(
            color: Colors.white,
            child: ListTile(
              leading: Icon(Icons.assignment_outlined,
                  color: PaletteNouvelle.bleuNuit),
              title: Text(
                'Aucune offre publiée pour le moment. La structure publie les offres depuis le Bureau, elles apparaissent ici selon votre pays.',
              ),
            ),
          )
        else
          for (final o in visibles) _TuileOffre(o),
      ],
    );
  }
}

class _TuileOffre extends StatelessWidget {
  const _TuileOffre(this.offre);
  final OffreOpportunite offre;

  @override
  Widget build(BuildContext context) {
    final lieu = [
      if (offre.ville.isNotEmpty) offre.ville,
      if (offre.pays.isNotEmpty) offre.pays,
    ].join(', ');
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: const Icon(Icons.assignment_outlined,
            color: PaletteNouvelle.bleuNuit),
        title: Text(offre.titre),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (offre.organisme.isNotEmpty) Text(offre.organisme),
            if (lieu.isNotEmpty) Text(lieu),
            Text(offre.type),
            if (offre.dateLimite.isNotEmpty)
              Text('Date limite : ${offre.dateLimite}'),
            if (offre.description.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(offre.description),
            ],
            if (offre.contact.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text('Contact : ${offre.contact}'),
            ],
          ],
        ),
      ),
    );
  }
}
