// Tiroir de la nouvelle coquille, tranche T1, 26 nov. 2026.
// Plat et blanc façon Facebook, 70 % de largeur, 272 px au plus.
// En haut la carte de membre visuelle, puis la recherche qui
// filtre les entrées localement, sans appel serveur, puis les
// groupes Mon espace et Au quotidien, puis Paramètres, À propos
// et Se déconnecter. Les données du membre viennent de la session.
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../app_models.dart' show Member;
import 'avatar_membre.dart';
import 'destinations.dart';
import 'modeles_t15.dart';
import 'palette.dart';

/// Pastille dorée « En attente de validation », T15, sur la
/// carte du tiroir.
class BadgeCarteEnAttente extends StatelessWidget {
  const BadgeCarteEnAttente({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: PaletteNouvelle.or,
        borderRadius: BorderRadius.circular(20),
      ),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(LucideIcons.clock,
              size: 14, color: PaletteNouvelle.bleuNuit),
          SizedBox(width: 6),
          Flexible(
            child: Text(
              'En attente de validation',
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: PaletteNouvelle.bleuNuit,
                fontSize: 12,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Entree {
  const _Entree(this.titre, this.icone, this.destination);
  final String titre;
  final IconData icone;
  final DestinationNouvelle destination;
}

const _entreesMonEspace = [
  _Entree('Mon profil', LucideIcons.user, DestinationNouvelle.profil),
  _Entree('Journal personnel', LucideIcons.bookOpen, DestinationNouvelle.journal),
  _Entree('Opportunité', LucideIcons.search, DestinationNouvelle.opportunite),
  _Entree('Suivi', LucideIcons.heart, DestinationNouvelle.suivi),
];

const _entreesQuotidien = [
  _Entree('Méditation', LucideIcons.sun, DestinationNouvelle.meditation),
  _Entree('Chaîne de prière', LucideIcons.link, DestinationNouvelle.chainePriere),
];

const _entreesBas = [
  _Entree('Paramètres', LucideIcons.settings, DestinationNouvelle.parametres),
  _Entree('À propos', LucideIcons.info, DestinationNouvelle.aPropos),
];

class TiroirNouveau extends StatefulWidget {
  const TiroirNouveau({
    super.key,
    required this.membre,
    required this.onNaviguer,
    this.onDeconnexion,
    this.etatCarte,
  });
  final Member? membre;
  final void Function(DestinationNouvelle destination) onNaviguer;
  final VoidCallback? onDeconnexion;

  /// État de la carte, T15. Sans lui, la carte s'affiche
  /// comme avant, sans verrou ni badge.
  final EtatCarte? etatCarte;

  @override
  State<TiroirNouveau> createState() => _TiroirNouveauState();
}

class _TiroirNouveauState extends State<TiroirNouveau> {
  String _recherche = '';

  List<_Entree> get _filtrees {
    final toutes = [..._entreesMonEspace, ..._entreesQuotidien, ..._entreesBas];
    final q = _recherche.trim().toLowerCase();
    if (q.isEmpty) return toutes;
    return toutes.where((e) => e.titre.toLowerCase().contains(q)).toList();
  }

  void _aller(DestinationNouvelle destination) {
    Navigator.of(context).pop();
    widget.onNaviguer(destination);
  }

  @override
  Widget build(BuildContext context) {
    final largeur = MediaQuery.sizeOf(context).width;
    final filtrees = _filtrees;
    final rechercheActive = _recherche.trim().isNotEmpty;
    return Drawer(
      width: math.min(largeur * 0.7, 272),
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(),
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          _CarteMembre(
            membre: widget.membre,
            onTap: () => _aller(DestinationNouvelle.carte),
            etatCarte: widget.etatCarte,
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 12, 4),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Rechercher…',
                prefixIcon: const Icon(LucideIcons.search, color: Colors.grey),
                filled: true,
                fillColor: PaletteNouvelle.papier,
                contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 12),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                  borderSide: BorderSide.none,
                ),
              ),
              onChanged: (v) => setState(() => _recherche = v),
            ),
          ),
          if (rechercheActive)
            ...filtrees.map((e) => _TuileEntree(e, onTap: () => _aller(e.destination)))
          else ...[
            const _TitreGroupe('Mon espace'),
            ..._entreesMonEspace.map((e) => _TuileEntree(e, onTap: () => _aller(e.destination))),
            const _TitreGroupe('Au quotidien'),
            ..._entreesQuotidien.map((e) => _TuileEntree(e, onTap: () => _aller(e.destination))),
            const Divider(height: 1),
            ..._entreesBas.map((e) => _TuileEntree(e, onTap: () => _aller(e.destination))),
          ],
          const Divider(height: 1),
          ListTile(
            leading: const Icon(LucideIcons.logOut, color: PaletteNouvelle.bleuNuit),
            title: const Text('Se déconnecter'),
            onTap: () {
              Navigator.of(context).pop();
              widget.onDeconnexion?.call();
            },
          ),
        ],
      ),
    );
  }
}

class _TitreGroupe extends StatelessWidget {
  const _TitreGroupe(this.titre);
  final String titre;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
      child: Text(
        titre,
        style: const TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w700,
          color: Colors.grey,
        ),
      ),
    );
  }
}

class _TuileEntree extends StatelessWidget {
  const _TuileEntree(this.entree, {required this.onTap});
  final _Entree entree;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(entree.icone, color: PaletteNouvelle.bleuNuit),
      title: Text(entree.titre),
      onTap: onTap,
    );
  }
}

/// Carte de membre visuelle en haut du tiroir, bleu nuit et or.
/// Toucher vers Ma carte, visuel seul, jamais vers Mon profil,
/// correction d'Axel du 26 nov. 12 h 46. Établissement sans
/// valeur : « à confirmer ».
/// T15 : verrouillée, la carte s'assombrit avec un cadenas doré ;
/// en attente de validation, elle porte la pastille dorée.
class _CarteMembre extends StatelessWidget {
  const _CarteMembre({
    required this.membre,
    required this.onTap,
    this.etatCarte,
  });
  final Member? membre;
  final VoidCallback onTap;
  final EtatCarte? etatCarte;

  @override
  Widget build(BuildContext context) {
    final m = membre;
    final etat = etatCarte;
    return InkWell(
      onTap: onTap,
      child: Stack(
        children: [
          Container(
            color: PaletteNouvelle.bleuNuit,
            padding: const EdgeInsets.fromLTRB(16, 48, 16, 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    AvatarMembre(m, radius: 24),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            m?.name ?? '',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            m?.matricule ?? '',
                            style: const TextStyle(
                                fontSize: 13, color: PaletteNouvelle.or),
                          ),
                        ],
                      ),
                    ),
                    if (m != null && m.matricule.isNotEmpty)
                      Container(
                        padding: const EdgeInsets.all(4),
                        color: Colors.white,
                        child: QrImageView(data: m.matricule, size: 56),
                      ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  m == null || m.etab.isEmpty ? 'à confirmer' : m.etab,
                  style: const TextStyle(fontSize: 13, color: Colors.white70),
                ),
                const SizedBox(height: 2),
                Text(
                  m == null ? '' : 'Membre depuis ${m.anneeAffichee}',
                  style: const TextStyle(fontSize: 13, color: Colors.white70),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Ma carte',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: PaletteNouvelle.or,
                  ),
                ),
              ],
            ),
          ),
          if (etat == EtatCarte.verrouillee)
            Positioned.fill(
              child: IgnorePointer(
                child: Container(
                  color: Colors.black.withValues(alpha: 0.55),
                  child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(LucideIcons.lock,
                          color: PaletteNouvelle.or, size: 32),
                      SizedBox(height: 4),
                      Text(
                        'Carte verrouillée',
                        style: TextStyle(
                          color: PaletteNouvelle.or,
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          if (etat == EtatCarte.enAttente)
            const Positioned(
              top: 34,
              left: 0,
              right: 0,
              child: IgnorePointer(
                child: Center(child: BadgeCarteEnAttente()),
              ),
            ),
        ],
      ),
    );
  }
}
