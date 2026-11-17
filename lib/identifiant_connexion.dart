// Connexion automatique, 17 nov. 2026 : champ unique intelligent,
// comme Facebook, et pays de la carte SIM, comme WhatsApp.
//
// Champ unique : une lettre tapée, c'est un e-mail (clavier
// e-mail, indicatif masqué, validation e-mail) ; un chiffre ou
// un + tapé, c'est un numéro (clavier numérique, indicatif
// affiché, validation numéro). Champ vidé, retour neutre. La
// détection suit la saisie en direct, depuis le premier
// caractère non vide : elle ne bloque jamais la saisie et
// n'efface jamais ce qui est tapé, le champ et son contrôleur
// restent les mêmes dans les trois modes, seul l'habillage
// change (indicatif, clavier, libellé).
//
// Pays de la carte SIM : le pays de la SIM tranche avant les
// langues préférées, puis le fuseau IANA, puis le fuseau
// nord-américain, puis le repli +225, comme les cartes 86 et
// 87. Sans nouvelle dépendance : le canal natif
// « connexionprophetique/app » existe déjà pour les secrets de
// session (carte 116), on y ajoute une méthode. Android
// téléphone seulement : iOS ne l'expose plus
// (CTTelephonyNetworkInfo déprécié, vide dès iOS 16) et le web
// n'a pas de SIM, la lecture renvoie alors null sans erreur.
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'i18n.dart';
import 'indicatif_pays.dart';
import 'indicatif_zone.dart';

/// Mode du champ d'identifiant, déduit de la saisie en direct.
enum ModeIdentifiant { neutre, email, telephone }

/// Mode déduit du premier caractère non vide, fonction pure :
/// champ vide ou que des espaces, neutre ; chiffre ou +,
/// numéro ; tout autre premier caractère, e-mail. Une lettre
/// effacée jusqu'à ne laisser qu'une lettre revient donc en
/// mode e-mail, comme un champ vidé revient en neutre.
ModeIdentifiant modeIdentifiant(String saisie) {
  final texte = saisie.trimLeft();
  if (texte.isEmpty) return ModeIdentifiant.neutre;
  final premier = texte[0];
  if (premier == '+' || int.tryParse(premier) != null) {
    return ModeIdentifiant.telephone;
  }
  return ModeIdentifiant.email;
}

/// E-mail plausible, vérification légère : quelque chose avant
/// et après un seul @, sans espace. Elle ne sert qu'à signaler
/// une frappe incomplète, jamais à refuser un e-mail réel.
bool identifiantEmailValide(String saisie) {
  final texte = saisie.trim();
  if (texte.isEmpty || texte.contains(' ')) return false;
  final parties = texte.split('@');
  return parties.length == 2 && parties[0].isNotEmpty && parties[1].isNotEmpty;
}

/// Numéro plausible, vérification légère : après retrait des
/// espaces, tirets, points et parenthèses, et du + ou du 00
/// initial, il ne reste que des chiffres, au moins 6. Un
/// numéro local trop court ou des lettres glissées dedans sont
/// refusés avant l'envoi, jamais un vrai numéro.
bool identifiantTelephoneValide(String saisie) {
  var nettoye = saisie.replaceAll(RegExp(r'[\s\-\.\(\)]'), '');
  if (nettoye.startsWith('+')) {
    nettoye = nettoye.substring(1);
  } else if (nettoye.startsWith('00')) {
    nettoye = nettoye.substring(2);
  }
  if (nettoye.length < 6) return false;
  return RegExp(r'^[0-9]+$').hasMatch(nettoye);
}

/// Pays de la carte SIM, Android téléphone seulement, null
/// partout ailleurs ou sans SIM, sans jamais lever d'erreur.
Future<String?> paysSimAppareil() async {
  if (kIsWeb || defaultTargetPlatform != TargetPlatform.android) return null;
  try {
    const canal = MethodChannel('connexionprophetique/app');
    final iso = await canal.invokeMethod<String>('paysSim');
    final code = (iso ?? '').trim().toUpperCase();
    return code.isEmpty ? null : code;
  } catch (_) {
    return null;
  }
}

/// Détection d'indicatif avec la SIM en premier, comme
/// WhatsApp : le pays de la carte SIM tranche avant les
/// langues préférées, puis le fuseau IANA, puis le fuseau
/// nord-américain, puis le repli +225. Une SIM absente, vide
/// ou d'un pays hors de la liste ne change rien : la détection
/// existante, sans SIM, fait foi.
Future<DetectionIndicatif> indicatifDetecteAppareilAvecSim() async {
  final sim = await paysSimAppareil();
  if (sim != null && codePaysConnu(sim)) {
    final locales = WidgetsBinding.instance.platformDispatcher.locales;
    final maintenant = DateTime.now();
    return detecterIndicatifDetaille(
      codesPaysLangues: [sim, for (final l in locales) l.countryCode ?? ''],
      fuseauIana: fuseauIanaAppareil(),
      decalageMinutes: maintenant.timeZoneOffset.inMinutes,
      nomFuseau: maintenant.timeZoneName,
    );
  }
  return indicatifDetecteAppareil();
}

/// Champ d'identifiant de connexion, un seul champ pour
/// l'e-mail et le numéro, comme Facebook. Le contrôleur vient
/// du parent, qui garde le texte et l'envoie ; le menu
/// d'indicatif vient du parent aussi, qui garde l'index choisi.
/// Le widget ne possède que le mode, déduit du texte : il
/// prévient le parent à chaque changement, pour le libellé
/// d'aide et la validation à l'envoi.
class ChampIdentifiantConnexion extends StatefulWidget {
  const ChampIdentifiantConnexion({
    super.key,
    required this.controller,
    required this.codes,
    required this.indicatifIndex,
    required this.onIndicatifChanged,
    required this.onModeChanged,
    required this.decoration,
  });

  /// Contrôleur du parent, jamais remplacé : le texte tapé
  /// survit à tous les changements de mode.
  final TextEditingController controller;

  /// Liste des indicatifs, (indicatif, pays), ordre du parent.
  final List<(String, String)> codes;

  /// Index de l'entrée choisie, dans [codes].
  final int indicatifIndex;

  /// Appelé quand l'utilisateur choisit un autre indicatif.
  final ValueChanged<int> onIndicatifChanged;

  /// Appelé à chaque changement de mode déduit de la saisie.
  final ValueChanged<ModeIdentifiant> onModeChanged;

  /// Décoration du parent, même champ que les autres écrans.
  final InputDecoration Function(String label) decoration;

  @override
  State<ChampIdentifiantConnexion> createState() =>
      _ChampIdentifiantConnexionState();
}

class _ChampIdentifiantConnexionState extends State<ChampIdentifiantConnexion> {
  late ModeIdentifiant _mode;

  @override
  void initState() {
    super.initState();
    _mode = modeIdentifiant(widget.controller.text);
    widget.controller.addListener(_surSaisie);
    if (_mode != ModeIdentifiant.neutre) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) widget.onModeChanged(_mode);
      });
    }
  }

  @override
  void dispose() {
    widget.controller.removeListener(_surSaisie);
    super.dispose();
  }

  void _surSaisie() {
    final nouveau = modeIdentifiant(widget.controller.text);
    if (nouveau == _mode) return;
    setState(() => _mode = nouveau);
    widget.onModeChanged(nouveau);
  }

  @override
  Widget build(BuildContext context) {
    final enEmail = _mode == ModeIdentifiant.email;
    final label = switch (_mode) {
      ModeIdentifiant.email => tr('E-mail'),
      ModeIdentifiant.telephone => tr('Numéro'),
      ModeIdentifiant.neutre => tr('E-mail ou numéro'),
    };
    final clavier = switch (_mode) {
      ModeIdentifiant.email => TextInputType.emailAddress,
      ModeIdentifiant.telephone => TextInputType.phone,
      ModeIdentifiant.neutre => TextInputType.text,
    };
    return Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      // L'indicatif ne sert qu'à un numéro : masqué en mode
      // e-mail, comme avec le choix manuel d'avant. Visibility
      // garde le menu dans l'arbre à la même place, le champ
      // ne change pas de place et le clavier ne se referme pas.
      Visibility(
        visible: !enEmail,
        maintainState: true,
        child: SizedBox(
          width: 132,
          child: DropdownButtonFormField<int>(
            value: widget.indicatifIndex,
            selectedItemBuilder: (context) => [
              for (final c in widget.codes)
                Text(c.$1, overflow: TextOverflow.ellipsis),
            ],
            items: [
              for (var i = 0; i < widget.codes.length; i++)
                DropdownMenuItem(
                  value: i,
                  child: Text(
                    '${widget.codes[i].$1} ${widget.codes[i].$2}',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
            ],
            onChanged: (v) {
              if (v != null) widget.onIndicatifChanged(v);
            },
            decoration: widget.decoration(tr('Indicatif')),
          ),
        ),
      ),
      Visibility(
        visible: !enEmail,
        maintainState: true,
        child: const SizedBox(width: 8),
      ),
      Expanded(
        child: TextField(
          controller: widget.controller,
          keyboardType: clavier,
          decoration: widget.decoration(label),
        ),
      ),
    ]);
  }
}
