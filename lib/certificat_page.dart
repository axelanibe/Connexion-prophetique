import 'dart:typed_data';

import 'package:flutter/material.dart';

import 'api.dart';
import 'i18n.dart';
import 'pdf_view.dart';
import 'print_doc.dart';
import 'responsive.dart';

// Mon certificat d'adhésion, carte 121, 10 nov. 2026 : le
// certificat s'affiche dans l'application, comme la page Carte
// montre la carte de membre, au lieu d'être seulement
// téléchargeable depuis le Profil. Le PDF vient du serveur,
// carte 110, jamais régénéré. Sur téléphone, le visualiseur
// natif l'affiche ; sur le web, le navigateur l'affiche dans un
// cadre intégré ; sur ordinateur Windows, pas de visualiseur
// intégré, le certificat se télécharge. Couleurs de la charte,
// sans import de main.dart pour éviter un cycle, comme
// link_view.dart.
const _navy = Color(0xFF0B1F3A);
const _gold = Color(0xFFD4A72C);

void _toast(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(message)),
  );
}

/// Choix au toucher, carte 121, 10 nov. 2026 : quand une
/// personne clique sur son certificat ou sur une attestation, le
/// système lui demande si elle veut le télécharger ou le
/// recevoir par mail. Renvoie null quand la personne annule.
enum ChoixDocument { telecharger, recevoirParMail }

Future<ChoixDocument?> choisirDocumentAction(BuildContext context) {
  return showDialog<ChoixDocument>(
    context: context,
    builder: (ctx) => AlertDialog(
      title: Text(tr('Télécharger ou recevoir par mail')),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonalIcon(
              onPressed: () => Navigator.of(ctx).pop(ChoixDocument.telecharger),
              icon: const Icon(Icons.download_outlined),
              label: Text(tr('Télécharger')),
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonalIcon(
              onPressed: () =>
                  Navigator.of(ctx).pop(ChoixDocument.recevoirParMail),
              icon: const Icon(Icons.mail_outlined),
              label: Text(tr('Recevoir par mail')),
            ),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(ctx).pop(),
          child: Text(tr('Annuler')),
        ),
      ],
    ),
  );
}

class MonCertificatPage extends StatefulWidget {
  const MonCertificatPage({super.key, required this.matricule});

  // Matricule du membre, pour le nom du fichier téléchargé,
  // comme le téléchargement depuis le Profil, carte 110.
  final String matricule;

  @override
  State<MonCertificatPage> createState() => _MonCertificatPageState();
}

class _MonCertificatPageState extends State<MonCertificatPage> {
  Uint8List? _octets;
  String? _erreur;
  bool _charge = true;
  bool _enCours = false;
  bool _affichageEchoue = false;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  String get _nomFichier {
    final matricule =
        widget.matricule.replaceAll(RegExp(r'[^A-Za-z0-9-]'), '');
    return matricule.isEmpty
        ? 'certificat-adhesion.pdf'
        : 'certificat-adhesion-$matricule.pdf';
  }

  Future<void> _charger() async {
    setState(() {
      _charge = true;
      _erreur = null;
      _affichageEchoue = false;
    });
    try {
      final octets = await api.telechargerCertificatAdhesion();
      if (!mounted) return;
      setState(() {
        _octets = octets;
        _charge = false;
      });
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _erreur = e.message;
        _charge = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _erreur = tr('Impossible d’afficher le certificat.');
        _charge = false;
      });
    }
  }

  Future<void> _choisir() async {
    final choix = await choisirDocumentAction(context);
    if (choix == null || !mounted) return;
    if (choix == ChoixDocument.telecharger) {
      await _telecharger();
    } else {
      await _envoyerParMail();
    }
  }

  // Le PDF ne va pas dans l'album CONNEXION PROPHETIQUE : la
  // galerie ne prend que des images, carte et badge de camp.
  // Comme les autres PDF de l'application, certificat carte
  // 110, attestation carte 120 et facture, il passe par
  // Téléchargements, avec partage sur téléphone.
  Future<void> _telecharger() async {
    final octets = _octets;
    if (octets == null) return;
    setState(() => _enCours = true);
    try {
      await downloadBytesFile(_nomFichier, octets, 'application/pdf');
      if (mounted) _toast(context, tr('Certificat téléchargé.'));
    } catch (_) {
      if (mounted) {
        _toast(context, tr('Impossible de télécharger le certificat.'));
      }
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
  }

  Future<void> _envoyerParMail() async {
    setState(() => _enCours = true);
    try {
      await api.envoyerCertificatAdhesionParMail();
      if (mounted) _toast(context, tr('Certificat envoyé par mail.'));
    } on ApiException catch (e) {
      if (mounted) _toast(context, e.message);
    } catch (_) {
      if (mounted) {
        _toast(context, tr('Impossible d’envoyer le certificat par mail.'));
      }
    } finally {
      if (mounted) setState(() => _enCours = false);
    }
  }

  Widget _erreurVue(String message, {bool proposerTelechargement = false}) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.workspace_premium_outlined,
                size: 48, color: _navy),
            const SizedBox(height: 16),
            Text(message, textAlign: TextAlign.center),
            const SizedBox(height: 16),
            if (proposerTelechargement && _octets != null)
              FilledButton.icon(
                onPressed: _enCours ? null : _telecharger,
                icon: const Icon(Icons.download_outlined),
                label: Text(tr('Télécharger le certificat')),
              )
            else
              FilledButton.icon(
                onPressed: _charger,
                icon: const Icon(Icons.refresh_outlined),
                label: Text(tr('Actualiser')),
              ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final corps = _charge
        ? const Center(child: CircularProgressIndicator())
        : _erreur != null
            ? _erreurVue(_erreur!)
            : _affichageEchoue
                ? _erreurVue(tr('Impossible d’afficher le certificat.'),
                    proposerTelechargement: true)
                : isWindowsDesktop
                    ? _erreurVue(
                        tr('Le visualiseur PDF n’est pas disponible sur cet appareil.'),
                        proposerTelechargement: true,
                      )
                    : PdfDocumentView(
                        bytes: _octets!,
                        onError: (_) {
                          if (mounted) {
                            setState(() => _affichageEchoue = true);
                          }
                        },
                      );
    return Scaffold(
      appBar: AppBar(
        backgroundColor: _navy,
        foregroundColor: Colors.white,
        title: Text(
          tr('Mon certificat d’adhésion'),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ),
      body: corps,
      bottomNavigationBar: _octets == null
          ? null
          : SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: FilledButton.icon(
                    onPressed: _enCours ? null : _choisir,
                    style: FilledButton.styleFrom(
                      backgroundColor: _gold,
                      foregroundColor: _navy,
                    ),
                    icon: const Icon(Icons.download_outlined),
                    label: Text(tr('Télécharger ou recevoir par mail')),
                  ),
                ),
              ),
            ),
    );
  }
}
