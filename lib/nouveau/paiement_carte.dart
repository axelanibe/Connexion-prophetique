// Paiement de la carte de membre, T11, 26 nov. 2026.
// Feuille de paiement, T15, d'après le fichier d'Axel du
// 26 nov. 12 h 52 : récapitulatif 1 000 FCFA, quatre moyens,
// Wave, MTN MoMo, Orange Money, carte bancaire. T16 : la
// liste des moyens vient du serveur, GET /paiements/moyens,
// selon la configuration, et la création passe par
// POST /paiements/:reference/payer, qui appelle le prestataire
// choisi. Wave reste le seul qui encaisse vraiment tant que
// les autres n'ont pas leurs identifiants. Un moyen non
// disponible ne crée jamais de demande et n'affiche jamais
// un paiement comme fait. La demande est créée côté serveur
// (POST /paiements/carte, 1 000 FCFA, montant imposé par le
// serveur), puis le prestataire s'ouvre, avec le montant exact
// affiché avant l'ouverture. L'ouverture ne marque jamais
// un paiement comme payé : la structure valide après contrôle
// de son compte, ou le prestataire confirme par vérification
// côté serveur, la page de vérification montre la référence.
// Sans serveur, pas de demande locale : la structure ne
// pourrait jamais la voir, la carte n'apparaîtrait jamais.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:url_launcher/url_launcher.dart';

import '../api.dart';
import 'page_verification_paiement.dart';
import 'palette.dart';

/// Montant unique de la carte de membre, imposé par le serveur.
const int kMontantCarteFcfa = 1000;

String fcfa(int n) {
  final s = n.toString();
  final b = StringBuffer();
  for (var i = 0; i < s.length; i++) {
    final fromEnd = s.length - i;
    b.write(s[i]);
    if (fromEnd > 1 && fromEnd % 3 == 1) b.write('\u202F');
  }
  return '$b FCFA';
}

/// Ouvre la page de paiement du prestataire dans le navigateur.
Future<bool> ouvrirUrlPaiement(String url) async {
  try {
    return await launchUrl(Uri.parse(url),
        mode: LaunchMode.externalApplication);
  } catch (_) {
    return false;
  }
}

/// Moyen de paiement de la carte, T15, liste locale de repli.
/// T16 : l'identifiant est celui du serveur, 'wave', 'mtn',
/// 'orange', 'cinetpay', et la liste vient de
/// GET /paiements/moyens quand le serveur répond.
class MoyenPaiementCarte {
  const MoyenPaiementCarte({
    required this.id,
    required this.label,
    required this.icone,
    required this.disponible,
  });
  final String id;
  final String label;
  final IconData icone;
  final bool disponible;

  factory MoyenPaiementCarte.depuisServeur(Map<String, dynamic> m) {
    final id = (m['id'] ?? '').toString();
    final icone = switch (id) {
      'mtn' => LucideIcons.smartphone,
      'orange' => LucideIcons.wallet,
      'cinetpay' => LucideIcons.creditCard,
      _ => LucideIcons.waves,
    };
    return MoyenPaiementCarte(
      id: id,
      label: (m['label'] ?? id).toString(),
      icone: icone,
      disponible: m['disponible'] == true,
    );
  }

  static List<MoyenPaiementCarte> listeDepuisServeur(
      List<Map<String, dynamic>> liste) {
    return liste
        .map(MoyenPaiementCarte.depuisServeur)
        .where((m) => m.id.isNotEmpty)
        .toList();
  }
}

const moyensPaiementCarte = <MoyenPaiementCarte>[
  MoyenPaiementCarte(
      id: 'wave',
      label: 'Wave',
      icone: LucideIcons.waves,
      disponible: true),
  MoyenPaiementCarte(
      id: 'mtn',
      label: 'MTN MoMo',
      icone: LucideIcons.smartphone,
      disponible: false),
  MoyenPaiementCarte(
      id: 'orange',
      label: 'Orange Money',
      icone: LucideIcons.wallet,
      disponible: false),
  MoyenPaiementCarte(
      id: 'cinetpay',
      label: 'Carte bancaire',
      icone: LucideIcons.creditCard,
      disponible: false),
];

/// Feuille de paiement de la carte, en bas : récapitulatif
/// 1 000 FCFA et quatre moyens. Retourne l'identifiant du
/// moyen choisi quand il encaisse vraiment, null sinon.
/// Un moyen non disponible ne ferme jamais la feuille avec
/// un succès : il dit seulement qu'il arrive bientôt.
/// Sans liste fournie, la liste locale de repli, Wave seul
/// disponible.
Future<String?> choisirMoyenPaiementFeuille(
  BuildContext c, {
  required String nomMembre,
  List<MoyenPaiementCarte>? moyens,
}) {
  return showModalBottomSheet<String>(
    context: c,
    isScrollControlled: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
    ),
    builder: (_) =>
        _FeuillePaiementCarte(nomMembre: nomMembre, moyens: moyens),
  );
}

class _FeuillePaiementCarte extends StatefulWidget {
  const _FeuillePaiementCarte({required this.nomMembre, this.moyens});
  final String nomMembre;
  final List<MoyenPaiementCarte>? moyens;

  @override
  State<_FeuillePaiementCarte> createState() => _FeuillePaiementCarteState();
}

class _FeuillePaiementCarteState extends State<_FeuillePaiementCarte> {
  // Liste du serveur, ou liste locale de repli quand le
  // serveur n'en renvoie aucune.
  late final List<MoyenPaiementCarte> _moyens =
      (widget.moyens == null || widget.moyens!.isEmpty)
          ? moyensPaiementCarte
          : widget.moyens!;
  late var _choisi = _moyens
      .firstWhere((m) => m.disponible, orElse: () => _moyens.first)
      .id;
  var _messageBientot = false;

  MoyenPaiementCarte get _moyen =>
      _moyens.firstWhere((m) => m.id == _choisi);

  void _confirmer() {
    if (_moyen.disponible) {
      Navigator.of(context).pop(_moyen.id);
      return;
    }
    setState(() => _messageBientot = true);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Encaissement ${_moyen.label} bientôt disponible. '
          'Pour activer votre carte maintenant, payez par Wave.',
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24, 12, 24, 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
            Center(
              child: Container(
                width: 44,
                height: 6,
                decoration: BoxDecoration(
                  color: PaletteNouvelle.bleuNuit.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(3),
                ),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 3),
                        decoration: BoxDecoration(
                          color:
                              PaletteNouvelle.or.withValues(alpha: 0.20),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Text(
                          'Activation membre',
                          style: TextStyle(
                            color: PaletteNouvelle.bleuNuit,
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 1,
                          ),
                        ),
                      ),
                      const SizedBox(height: 6),
                      const Text(
                        'Créer ma carte membre',
                        style: TextStyle(
                          color: PaletteNouvelle.bleuNuit,
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const Text(
                        'Émission officielle avec identifiant unique et QR code.',
                        style: TextStyle(color: Colors.grey, fontSize: 12),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.of(context).pop(),
                  icon: const Icon(LucideIcons.x),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: PaletteNouvelle.papier,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.nomMembre.isEmpty
                              ? 'Carte de membre'
                              : widget.nomMembre,
                          style: const TextStyle(
                            color: PaletteNouvelle.bleuNuit,
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const Text(
                          'Frais de création de carte • Sans abonnement',
                          style: TextStyle(color: Colors.grey, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: PaletteNouvelle.or.withValues(alpha: 0.25),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      fcfa(kMontantCarteFcfa),
                      style: const TextStyle(
                        color: PaletteNouvelle.bleuNuit,
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Moyen de paiement',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: Colors.grey,
                letterSpacing: 1,
              ),
            ),
            const SizedBox(height: 8),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              childAspectRatio: 2.4,
              children: [
                for (final moyen in _moyens)
                  _TuileMoyen(
                    moyen: moyen,
                    choisi: moyen.id == _choisi,
                    onTap: () => setState(() {
                      _choisi = moyen.id;
                      _messageBientot = false;
                    }),
                  ),
              ],
            ),
            if (_messageBientot) ...[
              const SizedBox(height: 12),
              Text(
                'Encaissement ${_moyen.label} bientôt disponible. '
                'Pour activer votre carte maintenant, payez par Wave.',
                style: const TextStyle(
                  color: PaletteNouvelle.orFonce,
                  fontSize: 12,
                ),
              ),
            ],
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: _confirmer,
                style: FilledButton.styleFrom(
                  backgroundColor: PaletteNouvelle.bleuNuit,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
                icon: const Icon(LucideIcons.shieldCheck,
                    color: PaletteNouvelle.or, size: 18),
                label: Text(
                    'Confirmer le paiement • ${fcfa(kMontantCarteFcfa)}'),
              ),
            ),
          ],
        ),
      ),
      ),
    );
  }
}

class _TuileMoyen extends StatelessWidget {
  const _TuileMoyen({
    required this.moyen,
    required this.choisi,
    required this.onTap,
  });
  final MoyenPaiementCarte moyen;
  final bool choisi;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: choisi
              ? PaletteNouvelle.or.withValues(alpha: 0.10)
              : Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: choisi
                ? PaletteNouvelle.or
                : PaletteNouvelle.bleuNuit.withValues(alpha: 0.12),
            width: choisi ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            Icon(
              moyen.icone,
              color: choisi ? PaletteNouvelle.orFonce : Colors.grey,
              size: 20,
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    moyen.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: PaletteNouvelle.bleuNuit,
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  if (!moyen.disponible)
                    const Text(
                      'Bientôt',
                      style: TextStyle(
                        color: PaletteNouvelle.orFonce,
                        fontSize: 10,
                      ),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Crée la demande carte côté serveur, crée le paiement chez
/// le prestataire choisi, ouvre sa page, puis la page de
/// vérification avec la référence. Retourne la référence
/// créée, null si annulé ou impossible. Seul un moyen
/// disponible passe ici ; les autres ne créent jamais de
/// demande. Pour MTN, pas de page à ouvrir : le membre
/// autorise sur son téléphone.
Future<String?> payerCarte(BuildContext c, {String nomMembre = ''}) async {
  void dire(String m) {
    if (c.mounted) {
      ScaffoldMessenger.of(c).showSnackBar(SnackBar(content: Text(m)));
    }
  }

  if (!api.isConnected) {
    dire('Serveur injoignable. Vérifiez votre connexion, puis réessayez.');
    return null;
  }
  var moyens = moyensPaiementCarte;
  try {
    final lus = await api.fetchMoyensPaiement();
    final depuisServeur = MoyenPaiementCarte.listeDepuisServeur(lus);
    if (depuisServeur.isNotEmpty) moyens = depuisServeur;
  } catch (_) {
    // Sans serveur, la liste locale : Wave seul disponible.
  }
  final method = await choisirMoyenPaiementFeuille(c,
      nomMembre: nomMembre, moyens: moyens);
  if (method == null) return null;
  String? reference;
  try {
    final cree = await api.createCarte(kMontantCarteFcfa);
    reference = (cree['reference'] ?? '').toString();
    if (reference.isEmpty) reference = null;
  } catch (_) {
    reference = null;
  }
  if (reference == null) {
    dire('Demande impossible pour le moment. Réessaie plus tard.');
    return null;
  }
  String? url;
  try {
    final paye = await api.payerPaiement(reference, method);
    url = (paye['url'] ?? '').toString();
    if (url.isEmpty) url = null;
  } catch (_) {
    dire('Paiement impossible pour le moment. Réessaie plus tard.');
    return reference;
  }
  if (url != null) {
    final ok = await ouvrirUrlPaiement(url);
    if (!ok && c.mounted) {
      dire('Impossible d’ouvrir la page de paiement. Vérifiez votre connexion.');
    }
  } else if (method == 'mtn' && c.mounted) {
    dire('Validez le paiement sur votre téléphone MTN MoMo.');
  }
  if (!c.mounted) return reference;
  await Navigator.of(c).push(
    MaterialPageRoute(
      builder: (_) => PageVerificationPaiement(
        reference: reference!,
        montant: kMontantCarteFcfa,
        moyen: method,
      ),
    ),
  );
  return reference;
}
