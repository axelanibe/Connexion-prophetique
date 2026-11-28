// Découvrir des membres, lot 1 Connexion 2.0, salve 28 nov.
// 2026 : sans recherche, les membres les plus actifs du
// réseau ; avec recherche, par mot dès 1 lettre, comme la
// messagerie. Nom et établissement seulement, jamais de
// coordonnée. Suivre et ne plus suivre depuis la liste.
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'modeles_connexion.dart';
import 'palette.dart';

class PageDecouvrir extends StatefulWidget {
  const PageDecouvrir({super.key, required this.service});
  final ServiceConnexion service;

  @override
  State<PageDecouvrir> createState() => _PageDecouvrirState();
}

class _PageDecouvrirState extends State<PageDecouvrir> {
  List<MembreConnexion> _membres = [];
  var _chargement = true;
  var _enEchec = false;
  String _saisie = '';
  Timer? _delai;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  @override
  void dispose() {
    _delai?.cancel();
    super.dispose();
  }

  Future<void> _charger({String? q}) async {
    setState(() => _enEchec = false);
    try {
      final membres = await widget.service.chargerDecouvrir(q: q);
      if (!mounted) return;
      setState(() {
        _membres = membres;
        _chargement = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _enEchec = true;
      });
    }
  }

  void _rechercherEnDirect(String q) {
    _delai?.cancel();
    setState(() => _saisie = q);
    if (q.trim().isEmpty) {
      _charger();
      return;
    }
    _delai = Timer(
      const Duration(milliseconds: 400),
      () => _charger(q: q.trim()),
    );
  }

  Future<void> _basculerSuivi(MembreConnexion m) async {
    try {
      if (m.suiviParMoi) {
        await widget.service.nePlusSuivre(m.id);
      } else {
        await widget.service.suivre(m.id);
      }
      if (!mounted) return;
      setState(() {
        _membres = _membres
            .map((x) => x.id == m.id ? x.avecSuivi(!m.suiviParMoi) : x)
            .toList();
      });
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Le suivi n’a pas pu être fait.')),
      );
    }
  }

  String _initiales(String nom) {
    final mots =
        nom.trim().split(RegExp(r'\s+')).where((m) => m.isNotEmpty).toList();
    if (mots.isEmpty) return '?';
    if (mots.length == 1) return mots.first[0].toUpperCase();
    return (mots[0][0] + mots[1][0]).toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        title: const Text('Découvrir'),
        backgroundColor: Colors.white,
        foregroundColor: PaletteNouvelle.bleuNuit,
        elevation: 1,
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          TextField(
            textInputAction: TextInputAction.search,
            onChanged: _rechercherEnDirect,
            decoration: const InputDecoration(
              hintText: 'Rechercher un membre…',
              helperText: 'Dès 1 lettre, un prénom ou un mot du nom suffit.',
              prefixIcon: Icon(LucideIcons.search),
              border: OutlineInputBorder(),
              filled: true,
              fillColor: Colors.white,
            ),
          ),
          const SizedBox(height: 12),
          if (_chargement)
            const Center(child: CircularProgressIndicator())
          else if (_enEchec)
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'Les membres ne peuvent pas être chargés pour le moment.',
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 12),
                  FilledButton(
                    onPressed: () => _charger(
                        q: _saisie.trim().isEmpty ? null : _saisie.trim()),
                    child: const Text('Réessayer'),
                  ),
                ],
              ),
            )
          else if (_membres.isEmpty)
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 24),
                child: Text(
                  _saisie.trim().isEmpty
                      ? 'Aucun membre pour le moment.'
                      : 'Aucun membre trouvé pour « ${_saisie.trim()} ».',
                  textAlign: TextAlign.center,
                ),
              ),
            )
          else ...[
            if (_saisie.trim().isEmpty)
              const Padding(
                padding: EdgeInsets.only(bottom: 8),
                child: Text(
                  'Membres à découvrir',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit,
                  ),
                ),
              ),
            for (final m in _membres)
              Card(
                color: Colors.white,
                margin: const EdgeInsets.only(bottom: 8),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: PaletteNouvelle.bleuNuit,
                    child: Text(
                      _initiales(m.nomComplet),
                      style: const TextStyle(
                        color: PaletteNouvelle.or,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                  title: Text(
                    m.nomComplet,
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                  subtitle: Text(
                    [
                      if (m.etablissementNom.isNotEmpty) m.etablissementNom,
                      '${m.nbPublications} publications',
                      '${m.nbAbonnes} abonnés',
                    ].join(' · '),
                  ),
                  trailing: FilledButton(
                    onPressed: () => _basculerSuivi(m),
                    style: FilledButton.styleFrom(
                      backgroundColor: m.suiviParMoi
                          ? Colors.white
                          : PaletteNouvelle.bleuNuit,
                      foregroundColor: m.suiviParMoi
                          ? PaletteNouvelle.bleuNuit
                          : Colors.white,
                      side: m.suiviParMoi
                          ? const BorderSide(
                              color: PaletteNouvelle.bleuNuit)
                          : null,
                    ),
                    child: Text(m.suiviParMoi ? 'Suivi' : 'Suivre'),
                  ),
                ),
              ),
          ],
        ],
      ),
    );
  }
}
