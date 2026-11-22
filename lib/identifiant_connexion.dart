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

/// Message d'erreur en français, ou null si la frappe peut
/// partir : champ vide, e-mail incomplet ou numéro trop court
/// sont refusés avant l'envoi, jamais un e-mail ou un numéro
/// réel. Fonction pure, même règle que l'envoi de la page de
/// connexion, qui passe la chaîne par tr().
String? erreurIdentifiantConnexion(String saisie, ModeIdentifiant mode) {
  switch (mode) {
    case ModeIdentifiant.neutre:
      return 'Renseignez votre téléphone ou votre e-mail.';
    case ModeIdentifiant.email:
      if (!identifiantEmailValide(saisie)) return 'Vérifiez l’e-mail saisi.';
      return null;
    case ModeIdentifiant.telephone:
      if (!identifiantTelephoneValide(saisie)) {
        return 'Vérifiez le numéro saisi.';
      }
      return null;
  }
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

/// Indices des indicatifs qui correspondent à la recherche,
/// 22 nov. 2026 : sur le pays ou l'indicatif, sans accents,
/// insensible à la casse. Recherche vide : tous les indices,
/// dans l'ordre.
List<int> filtrerIndicatifs(List<(String, String)> codes, String query) {
  final q = _sansAccents(query.trim().toLowerCase());
  if (q.isEmpty) return [for (var i = 0; i < codes.length; i++) i];
  return [
    for (var i = 0; i < codes.length; i++)
      if (_sansAccents('${codes[i].$2} ${codes[i].$1}'.toLowerCase())
          .contains(q))
        i,
  ];
}

String _sansAccents(String v) {
  var out = v.toLowerCase();
  const repl = {'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'î': 'i', 'ï': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c', 'ÿ': 'y'};
  repl.forEach((k, r) => out = out.replaceAll(k, r));
  return out;
}

/// Feuille de choix d'un indicatif, 22 nov. 2026 : la liste des
/// 60 indicatifs ne se défile plus, elle se recherche, comme la
/// fonction à l'inscription (_pickFonction) et comme la capture
/// e-justice.ci, champ en haut et liste filtrée en dessous.
/// Renvoie l'index choisi, ou null si la feuille est fermée.
Future<int?> choisirIndicatif(
    BuildContext context, List<(String, String)> codes, int actuel) async {
  var query = '';
  return showModalBottomSheet<int>(
    context: context,
    isScrollControlled: true,
    backgroundColor: const Color(0xFFF4F6F9),
    shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
    builder: (ctx) => StatefulBuilder(builder: (ctx, setS) {
      final indices = filtrerIndicatifs(codes, query);
      return SizedBox(
        height: MediaQuery.of(ctx).size.height * 0.85,
        child: Padding(
          padding: EdgeInsets.fromLTRB(
              16, 16, 16, MediaQuery.of(ctx).viewInsets.bottom + 16),
          child: Column(children: [
            Text(tr('Indicatif'),
                style: Theme.of(ctx).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                    color: const Color(0xFF0F1C2E))),
            const SizedBox(height: 8),
            TextField(
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search_outlined),
                hintText: tr('Rechercher un pays ou un indicatif'),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14)),
              ),
              onChanged: (v) => setS(() => query = v),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: indices.isEmpty
                  ? Center(child: Text(tr('Aucun pays trouvé.')))
                  : ListView(children: [
                      for (final i in indices)
                        ListTile(
                          title: Text('${codes[i].$1} ${codes[i].$2}',
                              style: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w600,
                                  color: Color(0xFF0F1C2E),
                                  letterSpacing: 0.2)),
                          trailing: i == actuel
                              ? const Icon(Icons.check,
                                  color: Color(0xFFB47B17))
                              : null,
                          onTap: () => Navigator.pop(ctx, i),
                        ),
                    ]),
            ),
          ]),
        ),
      );
    }),
  );
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
          // Indicatif avec recherche, 22 nov. 2026 : 60 entrées,
          // la feuille de recherche remplace le menu déroulant
          // nu, même patron que la fonction à l'inscription.
          child: InkWell(
            onTap: () async {
              final choisi = await choisirIndicatif(
                  context, widget.codes, widget.indicatifIndex);
              if (choisi != null) widget.onIndicatifChanged(choisi);
            },
            borderRadius: BorderRadius.circular(14),
            child: InputDecorator(
              decoration: widget.decoration(tr('Indicatif')),
              child: Row(children: [
                Expanded(
                    child: Text(widget.codes[widget.indicatifIndex].$1,
                        overflow: TextOverflow.ellipsis)),
                const Icon(Icons.keyboard_arrow_down_outlined, size: 20),
              ]),
            ),
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
