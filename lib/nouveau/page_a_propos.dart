// Page À propos, tranche T18, 27 nov. 2026.
// Structure Dorik et Squarespace, contenu exact de la vitrine
// (website/vitrine.html), rien inventé. Les valeurs viennent
// de l'objet statutaire seulement. L'équipe renvoie vers la
// page Le Bureau, sans noms en dur, sans photo ni bio.
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'palette.dart';

/// Page À propos de CONNEXION PROPHÉTIQUE.
class PageAPropos extends StatelessWidget {
  const PageAPropos({super.key, this.onOuvrirBureau});

  /// Ouverture de la page Le Bureau, pour la section équipe.
  final VoidCallback? onOuvrirBureau;

  static const _vision = 'Former pour mieux servir, depuis 2019 '
      'en Côte d’Ivoire.';
  static const _mission = 'Une association chrétienne, créée en '
      '2019 en Côte d’Ivoire, pour la jeunesse et les communautés '
      'qui en ont le plus besoin.';
  static const _objet = 'Notre objet, tel que défini dans nos '
      'statuts : amener la jeunesse à Dieu, créer des jeunes '
      'entrepreneurs, amener la jeunesse à prendre conscience du '
      'potentiel qu’elle possède, resserrer les liens amicaux entre '
      'les membres, et protéger les valeurs de la nation. '
      'Siège : Bingerville, Côte d’Ivoire.';

  /// Les 4 axes de la vitrine, avec leur ligne.
  static const _axes = [
    (
      'Formation spirituelle',
      'Enseignements, prière et lecture de la Bible, pour grandir '
          'dans la foi.',
    ),
    (
      'Lutte contre les grossesses en milieu scolaire',
      'Agir contre les grossesses en milieu scolaire et accompagner '
          'les élèves.',
    ),
    (
      'Réinsertion des jeunes en dépendance',
      'Accompagner les jeunes en dépendance vers une vie nouvelle.',
    ),
    (
      'Scolarisation d’enfants défavorisés',
      'Aider des enfants défavorisés à aller à l’école et à y rester.',
    ),
  ];

  /// Les valeurs, celles de l'objet statutaire seulement.
  static const _valeurs = [
    'Foi',
    'Entrepreneuriat',
    'Fraternité',
    'Valeurs de la nation',
  ];

  /// Chiffres de la vitrine.
  static const _chiffres = [
    ('200+', 'membres actifs'),
    ('8', 'camps et formations'),
    ('3', 'établissements partenaires'),
    ('2019', 'année de création'),
  ];

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 24, 20, 32),
      children: [
        const Text(
          'À propos',
          style: TextStyle(
            fontFamily: 'Cinzel',
            fontSize: 28,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Notre vision',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w700,
            letterSpacing: 1.2,
            color: PaletteNouvelle.orFonce,
          ),
        ),
        const SizedBox(height: 6),
        const Text(
          _vision,
          style: TextStyle(
            fontFamily: 'Cinzel',
            fontSize: 20,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
        const SizedBox(height: 12),
        const Text(
          _mission,
          style: TextStyle(fontSize: 16, height: 1.5),
        ),
        const SizedBox(height: 28),
        const _TitreSection('Notre histoire'),
        const SizedBox(height: 8),
        const Text(
          _objet,
          style: TextStyle(fontSize: 15, height: 1.6),
        ),
        const SizedBox(height: 28),
        const _TitreSection('Nos axes'),
        const SizedBox(height: 12),
        for (final (titre, ligne) in _axes) ...[
          _CarteAxe(titre: titre, ligne: ligne),
          const SizedBox(height: 10),
        ],
        const SizedBox(height: 28),
        const _TitreSection('Nos valeurs'),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final valeur in _valeurs)
              Chip(
                label: Text(valeur),
                backgroundColor: Colors.white,
                side: const BorderSide(color: PaletteNouvelle.or),
                labelStyle: const TextStyle(
                  color: PaletteNouvelle.bleuNuit,
                  fontWeight: FontWeight.w600,
                ),
              ),
          ],
        ),
        const SizedBox(height: 28),
        const _TitreSection('En chiffres'),
        const SizedBox(height: 12),
        LayoutBuilder(
          builder: (context, contraintes) {
            final largeur = (contraintes.maxWidth - 10) / 2;
            return Wrap(
              spacing: 10,
              runSpacing: 10,
              children: [
                for (final (nombre, libelle) in _chiffres)
                  SizedBox(
                    width: largeur,
                    child: Card(
                      elevation: 0,
                      color: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              nombre,
                              style: const TextStyle(
                                fontFamily: 'Cinzel',
                                fontSize: 24,
                                fontWeight: FontWeight.w700,
                                color: PaletteNouvelle.bleuNuit,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              libelle,
                              style: const TextStyle(
                                fontSize: 13,
                                color: Colors.black54,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
              ],
            );
          },
        ),
        const SizedBox(height: 28),
        const _TitreSection('Notre équipe'),
        const SizedBox(height: 8),
        const Text(
          'Le Bureau de la structure, avec ses responsables.',
          style: TextStyle(fontSize: 15, height: 1.5),
        ),
        const SizedBox(height: 12),
        OutlinedButton.icon(
          onPressed: onOuvrirBureau,
          icon: const Icon(Icons.group_outlined),
          label: const Text('Voir le Bureau'),
        ),
        const SizedBox(height: 28),
        const _TitreSection('Nous contacter'),
        const SizedBox(height: 12),
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            children: [
              ListTile(
                leading: const Icon(
                  Icons.phone_outlined,
                  color: PaletteNouvelle.bleuNuit,
                ),
                title: const Text('+225 07 87 40 63 87'),
                subtitle: const Text('Secrétariat et Appels, Côte d’Ivoire'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => launchUrl(
                  Uri.parse('tel:+2250787406387'),
                ),
              ),
              const Divider(height: 1),
              ListTile(
                leading: const Icon(
                  Icons.mail_outlined,
                  color: PaletteNouvelle.bleuNuit,
                ),
                title: const Text('support@connexionprophetique.com'),
                subtitle: const Text('Courrier électronique'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => launchUrl(
                  Uri.parse('mailto:support@connexionprophetique.com'),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

/// Titre de section avec barre dorée à gauche, comme la maquette.
class _TitreSection extends StatelessWidget {
  const _TitreSection(this.texte);
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 18,
          height: 4,
          decoration: BoxDecoration(
            color: PaletteNouvelle.or,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        const SizedBox(width: 8),
        Text(
          texte,
          style: const TextStyle(
            fontFamily: 'Cinzel',
            fontSize: 18,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
      ],
    );
  }
}

class _CarteAxe extends StatelessWidget {
  const _CarteAxe({required this.titre, required this.ligne});
  final String titre;
  final String ligne;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              titre,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: PaletteNouvelle.bleuNuit,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              ligne,
              style: const TextStyle(fontSize: 14, height: 1.5),
            ),
          ],
        ),
      ),
    );
  }
}
