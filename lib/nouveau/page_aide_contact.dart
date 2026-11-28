// Page Aide et contact, salve 28 nov. 2026 : remplace l'état
// neutre. Contacts de la structure, repris d'À propos, et un
// moyen de la contacter : appel au secrétariat, courrier à
// l'adresse de la structure. Aucune donnée inventée.
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'palette.dart';

class PageAideContact extends StatelessWidget {
  const PageAideContact({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 24 + MediaQuery.paddingOf(context).bottom),
      children: [
        const Text(
          'Aide et contact',
          style: TextStyle(
            fontFamily: 'Cinzel',
            fontSize: 28,
            fontWeight: FontWeight.w700,
            color: PaletteNouvelle.bleuNuit,
          ),
        ),
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
                title: const Text(
                  'support@connexionprophetique.com',
                  style: TextStyle(fontSize: 14),
                ),
                subtitle: const Text('Courrier électronique'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => launchUrl(
                  Uri.parse('mailto:support@connexionprophetique.com'),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: FilledButton.icon(
            onPressed: () => launchUrl(
              Uri.parse(
                'mailto:support@connexionprophetique.com'
                '?subject=Contact%20-%20CONNEXION%20PROPH%C3%89TIQUE',
              ),
            ),
            icon: const Icon(Icons.mail_outlined),
            label: const Text('Écrire à la structure'),
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: OutlinedButton.icon(
            onPressed: () => launchUrl(
              Uri.parse('tel:+2250787406387'),
            ),
            icon: const Icon(Icons.phone_outlined),
            label: const Text('Appeler le secrétariat'),
          ),
        ),
      ],
    );
  }
}
