// Choix des sons dans Paramètres, 21 nov. 2026, décision d'Axel.
// Le membre choisit seulement la sonnerie d'appel entrant et le
// son des messages, comme dans WhatsApp, avec écoute avant de
// choisir, et peut en changer quand il veut. La tonalité
// d'attente est prédéfinie par la structure, pas de choix ici, et
// le son du verset du jour et des rappels est prédéfini aussi, le
// carillon est gardé : ce fichier ne touche ni à l'un ni à
// l'autre. Les choix sont gardés seulement sur le téléphone, dans
// SharedPreferences, jamais synchronisés au compte.
//
// Sons, seulement les fichiers du chantier en cours : trois
// variantes de sonnerie, deux variantes de son des messages.
// Chaque variante a un nom stable : asset audio pour l'écoute et
// la sonnerie en cours d'appel, ressource brute Android pour la
// sonnerie CallKit et le son du canal de notification.
//
// Son par défaut, choisi par Axel le 21 nov. 2026 : trille
// classique pour la sonnerie, trois notes pour les messages. Le
// carillon est écarté pour les messages, trop long et déjà utilisé
// pour le verset du jour.
import 'package:flutter/foundation.dart';
import 'package:just_audio/just_audio.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Une variante de son : identifiant stable, libellé, asset
/// audio Flutter et ressource brute Android (sans extension).
class VarianteSon {
  const VarianteSon({
    required this.id,
    required this.libelle,
    required this.assetAudio,
    required this.ressourceRaw,
  });

  final String id;
  final String libelle;
  final String assetAudio;
  final String ressourceRaw;
}

/// Sonneries d'appel entrant, trois variantes du chantier.
// La variante classique est le fichier finalisé, sonnerie-appel.wav
// en asset et sonnerie_appel_cp en ressource brute, même contenu.
const variantesSonnerieAppel = <VarianteSon>[
  VarianteSon(
    id: 'classique',
    libelle: 'Trille classique',
    assetAudio: 'assets/audio/sonnerie-appel.wav',
    ressourceRaw: 'sonnerie_appel_cp',
  ),
  VarianteSon(
    id: 'cp-melodie',
    libelle: 'Mélodie ascendante',
    assetAudio: 'assets/audio/sonnerie-appel-cp-melodie.wav',
    ressourceRaw: 'sonnerie_appel_cp_melodie',
  ),
  VarianteSon(
    id: 'cp-carillon',
    libelle: 'Carillon doux',
    assetAudio: 'assets/audio/sonnerie-appel-cp-carillon.wav',
    ressourceRaw: 'sonnerie_appel_cp_carillon',
  ),
];

/// Sons des messages, deux variantes du chantier. Le carillon
/// existant n'est pas proposé ici, trop long et déjà utilisé
/// pour le verset du jour. La variante trois notes est le
/// fichier finalisé, son_message_cp en ressource brute. Le défaut
/// est en tête de liste : un identifiant inconnu y retombe.
const variantesSonMessage = <VarianteSon>[
  VarianteSon(
    id: 'trois-notes',
    libelle: 'Trois notes',
    assetAudio: 'assets/audio/son-message-trois-notes.wav',
    ressourceRaw: 'son_message_cp',
  ),
  VarianteSon(
    id: 'ding-dong',
    libelle: 'Ding-dong',
    assetAudio: 'assets/audio/son-message-ding-dong.wav',
    ressourceRaw: 'son_message_ding_dong',
  ),
];

/// Lecteur d'écoute d'une variante, avant de choisir.
abstract class LecteurApercuSon {
  /// Joue l'asset une fois. Ne lève jamais.
  Future<void> ecouter(String asset);
}

/// Implémentation réelle, just_audio.
class LecteurApercuJustAudio implements LecteurApercuSon {
  AudioPlayer? _lecteur;

  @override
  Future<void> ecouter(String asset) async {
    try {
      _lecteur ??= AudioPlayer();
      await _lecteur!.stop();
      await _lecteur!.setAsset(asset);
      await _lecteur!.setLoopMode(LoopMode.off);
      await _lecteur!.setVolume(1.0);
      await _lecteur!.play();
    } catch (e) {
      debugPrint('Écoute son : lecture impossible ($asset) : $e');
    }
  }
}

/// Choix des sons du membre, gardés sur le téléphone seulement.
class ChoixSons extends ChangeNotifier {
  /// Sonnerie par défaut, choisie par Axel le 21 nov. 2026 :
  /// le trille classique, le plus proche d'une sonnerie
  /// classique, reconnaissable tout de suite comme un appel.
  static const String sonnerieParDefautId = 'classique';

  /// Son des messages par défaut, choisi par Axel le 21 nov.
  /// 2026 : les trois notes, le plus distinctif des deux sons
  /// courts, montant et reconnaissable.
  static const String messageParDefautId = 'trois-notes';

  static const String cleSonnerie = 'son_sonnerie_appel';
  static const String cleMessage = 'son_message';
  static const String cleCanalMessagesApplique =
      'canal_messages_son_applique';

  String _sonnerieId = sonnerieParDefautId;
  String _messageId = messageParDefautId;

  /// Son du canal des messages déjà appliqué, pour ne recréer
  /// le canal que quand le son change vraiment.
  String? _canalMessagesApplique;

  bool _charge = false;

  String get sonnerieId => _sonnerieId;
  String get messageId => _messageId;
  bool get charge => _charge;
  String? get canalMessagesApplique => _canalMessagesApplique;

  VarianteSon get sonnerieChoisie =>
      _variante(variantesSonnerieAppel, _sonnerieId);
  VarianteSon get messageChoisi =>
      _variante(variantesSonMessage, _messageId);

  static VarianteSon _variante(List<VarianteSon> variantes, String id) =>
      variantes.firstWhere(
        (v) => v.id == id,
        orElse: () => variantes.first,
      );

  /// Ressource brute Android d'une sonnerie, pour CallKit
  /// (ringtonePath) et le gestionnaire d'arrière-plan.
  static String ressourceSonneriePour(String id) =>
      _variante(variantesSonnerieAppel, id).ressourceRaw;

  /// Ressource brute Android d'un son de message, pour le canal.
  static String ressourceMessagePour(String id) =>
      _variante(variantesSonMessage, id).ressourceRaw;

  /// Recréation du canal des messages, branchée par
  /// PushNotifications (Android seulement) : le canal est
  /// supprimé puis recréé avec le son choisi. Injectée en tests.
  Future<void> Function(String ressourceRaw)? surChangementMessage;

  /// Lecteur d'écoute, injecté en tests ; sinon just_audio.
  LecteurApercuSon? lecteurApercu;

  final LecteurApercuSon _lecteurReel = LecteurApercuJustAudio();

  /// Lit les choix gardés sur le téléphone, ou les défauts
  /// choisis par Axel quand rien n'est choisi. Un identifiant
  /// inconnu, d'une ancienne version, retombe sur le défaut.
  Future<void> charger() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _sonnerieId =
          _variante(
            variantesSonnerieAppel,
            prefs.getString(cleSonnerie) ?? sonnerieParDefautId,
          ).id;
      _messageId =
          _variante(
            variantesSonMessage,
            prefs.getString(cleMessage) ?? messageParDefautId,
          ).id;
      _canalMessagesApplique = prefs.getString(cleCanalMessagesApplique);
    } catch (_) {
      // Sans stockage local, les défauts restent en mémoire.
    }
    _charge = true;
    notifyListeners();
  }

  /// Choisis la sonnerie d'appel entrant, gardée sur le téléphone.
  Future<void> choisirSonnerie(String id) async {
    final variante = _variante(variantesSonnerieAppel, id);
    if (variante.id == _sonnerieId && _charge) return;
    _sonnerieId = variante.id;
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(cleSonnerie, _sonnerieId);
    } catch (_) {}
  }

  /// Choisis le son des messages, gardé sur le téléphone, et
  /// recrée le canal de notification avec le nouveau son.
  Future<void> choisirMessage(String id) async {
    final variante = _variante(variantesSonMessage, id);
    final change = variante.id != _messageId;
    _messageId = variante.id;
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(cleMessage, _messageId);
    } catch (_) {}
    if (change) await appliquerCanalMessages();
  }

  /// Recrée le canal des messages avec le son choisi, seulement
  /// quand le son appliqué diffère : sur Android, un canal déjà
  /// créé ne se met jamais à jour, il faut le supprimer puis le
  /// recréer. Sans branchement (web, tests sans plateforme),
  /// rien n'est fait.
  Future<void> appliquerCanalMessages() async {
    final ressource = messageChoisi.ressourceRaw;
    if (_canalMessagesApplique == ressource) return;
    final recreer = surChangementMessage;
    if (recreer == null) return;
    try {
      await recreer(ressource);
      _canalMessagesApplique = ressource;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(cleCanalMessagesApplique, ressource);
    } catch (_) {}
  }

  /// Écoute une sonnerie avant de la choisir.
  Future<void> ecouterSonnerie(String id) async {
    await _ecouter(_variante(variantesSonnerieAppel, id));
  }

  /// Écoute un son de message avant de le choisir.
  Future<void> ecouterMessage(String id) async {
    await _ecouter(_variante(variantesSonMessage, id));
  }

  Future<void> _ecouter(VarianteSon variante) async {
    try {
      final lecteur = lecteurApercu ?? _lecteurReel;
      await lecteur.ecouter(variante.assetAudio);
    } catch (_) {}
  }
}

/// Choix des sons du membre, partagés par les écrans.
final choixSons = ChoixSons();
