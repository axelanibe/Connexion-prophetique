// Écrans Messagerie et Signalement, 16 nov. 2026, lot application.
// Port du module e-System (spécification v2, sections 2, 6, 10, 11),
// adapté à la structure plate de CONNEXION PROPHÉTIQUE : ce fichier
// importe lib/main.dart pour les aides partagées (couleurs, textes,
// navigation, modèles), comme lib/admin_pages.dart ; le cycle import
// différé / import direct est accepté par Dart. Import différé
// depuis main.dart, par goMessagerie, jamais au démarrage.
// Palette CONNEXION PROPHÉTIQUE partout : bleu nuit #0F1C2E, or
// #E5C158, fond papier #F4F6F9, jamais le violet et or de e-System.
// Pas de WebSocket côté serveur pour les messages :
// interrogation HTTP toutes les 15 secondes quand la conversation
// est ouverte. Les appels entrants sont vérifiés toutes les
// 3 secondes, étape 2, 20 nov. 2026, pour que l'écran d'appel
// entrant apparaisse vite. Les appels audio et vidéo, eux, ont leur propre
// WebSocket de signalisation (/messagerie/ws, 16 nov. 2026),
// avec interrogation HTTP toutes les 2 secondes en repli. Champs à 16 px
// minimum, cibles tactiles de 48 px minimum, bulles vérifiées
// WCAG AA (blanc sur bleu nuit, bleu nuit sur blanc).
import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import 'package:just_audio/just_audio.dart';

import 'api.dart';
import 'appels.dart';
import 'appels_screens.dart';
import 'home_web.dart';
import 'i18n.dart';
import 'magnetophone.dart';
import 'main.dart';
import 'messagerie.dart';
import 'tiroir_intelligent.dart';

// Filigrane retiré, 19 nov. 2026 : le logo en arrière-plan de la
// Messagerie sort, décision d'Axel. Le monogramme CP reste ailleurs
// (carte, tiroir, écran d'ouverture), jamais en fond de la liste
// des conversations ni derrière les bulles.

/// Liste des conversations, spécification v2, section 6.
/// Liste façon WhatsApp, 18 nov. 2026 : grand titre, recherche
/// intégrée, pastilles Toutes, Non lues, Favoris, Groupes,
/// Pastorale, état vide chaleureux, pastille or de non lus par
/// conversation, aperçu du dernier message. Le serveur ne renvoie
/// ni aperçu ni non lus : ils sont calculés ici, à partir des
/// messages lus pour chaque conversation. La liste se recharge à
/// chaque ouverture et au retour d'une conversation, pour que les
/// lectures marquées remettent le badge à jour. Le bouton
/// d'écriture flotte en bas à droite, au-dessus de la pilule, et
/// suit la même règle qu'elle : masqué pendant le défilement, de
/// retour quand on remonte et quand le défilement s'arrête après
/// une descente.
class MessagerieListeScreen extends StatefulWidget {
  const MessagerieListeScreen({
    super.key,
    this.apiClient,
    this.ouvrirConversationId,
  });

  /// Client injecté (tests) ; sinon le client global.
  final ApiClient? apiClient;

  /// Conversation à ouvrir après le chargement (notification
  /// poussée touchée). Ouverte une seule fois.
  final String? ouvrirConversationId;

  @override
  State<MessagerieListeScreen> createState() =>
      _MessagerieListeScreenState();
}

class _MessagerieListeScreenState extends State<MessagerieListeScreen> {
  String _filtre = 'toutes';
  List<ConversationMessagerie> _conversations = [];
  Map<String, String> _nomsMembres = {};
  String? _monMembreId;
  bool _chargement = true;
  String? _erreur;
  String? _aOuvrir;
  // Recherche intégrée, 18 nov. 2026 : filtre la liste par le
  // nom affiché et par l'aperçu du dernier message.
  final _rechercheController = TextEditingController();
  String _recherche = '';
  // Bouton d'écriture, 18 nov. 2026 : même règle que la pilule,
  // masqué pendant le défilement, de retour quand on remonte et
  // quand le défilement s'arrête après une descente.
  final _masquage = ControleurMasquagePilule();

  ApiClient get _api => widget.apiClient ?? api;

  @override
  void dispose() {
    _rechercheController.dispose();
    _masquage.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    // Pastille « Nouveau », 19 nov. 2026 : l'ouverture de la
    // fonctionnalité, par le tiroir ou par la bulle de l'en-tête,
    // fait disparaître la pastille du tiroir.
    unawaited(NouveautesVues.instance.marquerVue('messagerie'));
    _aOuvrir = widget.ouvrirConversationId;
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _chargement = true;
      _erreur = null;
    });
    try {
      await MessagerieLectureService.instance.charger();
      final conversations = await _api.fetchConversationsMessagerie();
      // Mon identifiant de membre, pour distinguer mes messages :
      // /moi le renvoie quand il est présent, sinon null, et mes
      // messages sont reconnus quand j'en envoie un.
      String? monMembreId;
      try {
        final moi = await _api.fetchMoi();
        monMembreId =
            (moi['id'] ?? moi['membre_id'] ?? moi['member_id'])
                ?.toString();
      } catch (_) {
        monMembreId = null;
      }
      // Noms des membres de la structure, pour les titres des
      // directes et les noms d'expéditeurs : une seule lecture.
      // Sans elle, les noms s'affichent par défaut.
      var nomsMembres = <String, String>{};
      try {
        final membres = await _api.fetchMembresMessagerie();
        nomsMembres = {
          for (final m in membres)
            MembreMessagerie.fromJson(m).id:
                MembreMessagerie.fromJson(m).nomComplet,
        };
      } catch (_) {
        nomsMembres = {};
      }
      // Aperçu et non lus, conversation par conversation : un échec
      // sur l'une n'empêche pas les autres de s'afficher.
      final lecture = MessagerieLectureService.instance;
      final enrichies = <ConversationMessagerie>[];
      for (final raw in conversations) {
        final conversation = ConversationMessagerie.fromJson(raw);
        try {
          final messages = await _api.fetchMessagesConversation(
            conversation.id,
          );
          // Suppression « pour moi », 21 nov. 2026, carte 3 : un
          // message masqué ne compte plus, ni dans l'aperçu, ni
          // dans les non lus, sur cet appareil seulement.
          final masques = await lireMessagesMasques(conversation.id);
          final liste = messages
              .map(MessageMessagerie.fromJson)
              .where((m) => !masques.contains(m.id))
              .toList();
          enrichies.add(
            conversation.copyWith(
              dernierMessage: liste.isEmpty
                  ? null
                  : apercuMessage(liste.last, monMembreId),
              nonLus: compterMessagesNonLus(
                liste,
                monMembreId,
                lecture.luLe(conversation.id),
              ),
            ),
          );
        } catch (_) {
          enrichies.add(conversation);
        }
      }
      if (!mounted) return;
      setState(() {
        _conversations = enrichies;
        _nomsMembres = nomsMembres;
        _monMembreId = monMembreId;
        _chargement = false;
      });
      lecture.recalculerNonLus(enrichies);
      final aOuvrir = _aOuvrir;
      if (aOuvrir != null && aOuvrir.isNotEmpty) {
        _aOuvrir = null;
        final cible = enrichies.where((c) => c.id == aOuvrir).toList();
        if (cible.isNotEmpty) {
          WidgetsBinding.instance.addPostFrameCallback(
            (_) => _ouvrir(cible.first),
          );
        }
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur = e.toString();
      });
    }
  }

  List<ConversationMessagerie> get _filtrees {
    final parFiltre = switch (_filtre) {
      'non-lues' => _conversations
          .where((c) => c.nonLus > 0)
          .toList(),
      'favoris' => _conversations
          .where((c) => c.estFavori)
          .toList(),
      'groupes' => _conversations.where((c) => c.estGroupe).toList(),
      'pastorale' => _conversations
          .where((c) => c.type == 'pastorale')
          .toList(),
      _ => _conversations,
    };
    final recherche = _recherche.trim().toLowerCase();
    if (recherche.isEmpty) return parFiltre;
    return parFiltre.where((c) {
      final nom = _nomAffiche(c).toLowerCase();
      final apercu = (c.dernierMessage ?? '').toLowerCase();
      return nom.contains(recherche) || apercu.contains(recherche);
    }).toList();
  }

  /// Nombre de conversations par filtre, pour la pastille du
  /// filtre, façon WhatsApp : le nombre ne s'affiche que quand
  /// il y en a.
  int _compteFiltre(String filtre) {
    switch (filtre) {
      case 'non-lues':
        return _conversations.where((c) => c.nonLus > 0).length;
      case 'favoris':
        return _conversations.where((c) => c.estFavori).length;
      case 'groupes':
        return _conversations.where((c) => c.estGroupe).length;
      case 'pastorale':
        return _conversations.where((c) => c.type == 'pastorale').length;
      default:
        return _conversations.length;
    }
  }

  /// Nom affiché : titre quand il existe, sinon, pour une
  /// conversation entre deux membres, le nom de l'autre membre
  /// renvoyé par la route liste, sinon son matricule, sinon un
  /// libellé neutre. Sans l'autre membre, on ne sait pas avec
  /// qui l'on cause : le libellé générique reste le repli.
  String _nomAffiche(ConversationMessagerie conversation) {
    if (conversation.title != null &&
        conversation.title!.trim().isNotEmpty) {
      return conversation.title!.trim();
    }
    if (conversation.type == 'directe') {
      final autre = conversation.autreNom?.trim();
      if (autre != null && autre.isNotEmpty) return autre;
      final matricule = conversation.autreMatricule?.trim();
      if (matricule != null && matricule.isNotEmpty) return matricule;
      return 'Membre de la structure';
    }
    if (conversation.type == 'pastorale') return 'Conversation pastorale';
    if (conversation.type == 'aide') {
      return conversation.title?.trim().isNotEmpty == true
          ? conversation.title!.trim()
          : 'Aide de la structure';
    }
    return 'Groupe';
  }

  Future<void> _ouvrir(ConversationMessagerie conversation) async {
    await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => MessagerieConversationScreen(
          conversation: conversation,
          titre: _nomAffiche(conversation),
          monMembreId: _monMembreId,
          nomsMembres: _nomsMembres,
          apiClient: widget.apiClient,
        ),
      ),
    );
    // Retour : la lecture vient d'être marquée, on rafraîchit.
    if (mounted) _charger();
  }

  @override
  Widget build(BuildContext context) {
    // Bouton d'écriture, 18 nov. 2026 : le plus de l'en-tête est
    // retiré, le bouton flotte en bas à droite, au-dessus de la
    // pilule, avec le menu Nouveau message et Créer un groupe.
    // Menu trois points retiré, 19 nov. 2026 : Mes signalements et
    // Modération vivent dans le tiroir, section Sécurité, décision
    // d'Axel. L'en-tête de la Messagerie n'a plus d'actions.
    if (_chargement) {
      return basic(
        tr('Messagerie'),
        [const Center(child: CircularProgressIndicator())],
      );
    }
    if (_erreur != null) {
      return basic(
        tr('Messagerie'),
        [
          EmptyNote(
            icon: Icons.cloud_off_outlined,
            text: tr(
              'La messagerie est indisponible pour l’instant. Vérifiez votre connexion, puis réessayez.',
            ),
            action: SizedBox(
              width: double.infinity,
              height: 48,
              child: FilledButton(
                onPressed: _charger,
                child: Text(tr('Réessayer')),
              ),
            ),
          ),
        ],
      );
    }
    final page = basic(
      tr('Messagerie'),
      [
        // Grand titre, façon WhatsApp, 18 nov. 2026.
        Padding(
          padding: const EdgeInsets.only(top: 8, bottom: 12),
          child: Text(
            tr('Messagerie'),
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                  color: Cp.navy,
                ),
          ),
        ),
        // Recherche intégrée, juste sous le titre.
        TextField(
          controller: _rechercheController,
          onChanged: (valeur) => setState(() => _recherche = valeur),
          style: const TextStyle(fontSize: 16),
          decoration: InputDecoration(
            hintText: tr('Rechercher une conversation…'),
            prefixIcon: const Icon(Icons.search_outlined),
            suffixIcon: _recherche.isEmpty
                ? null
                : IconButton(
                    tooltip: tr('Effacer la recherche'),
                    icon: const Icon(Icons.clear_outlined),
                    onPressed: () {
                      _rechercheController.clear();
                      setState(() => _recherche = '');
                    },
                  ),
            filled: true,
            fillColor: Colors.black.withValues(alpha: 0.06),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(24),
              borderSide: BorderSide.none,
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 12,
            ),
          ),
        ),
        const SizedBox(height: 12),
        // Pastilles compactes, 19 nov. 2026 : les 5 visibles à 390 px
        // sans défiler (358 px utiles). Police 12, paddings réduits :
        // 323,8 px mesurés en Roboto avec compteurs, 337,3 px avec
        // deux compteurs à deux chiffres. Wrap plutôt que Row : sur
        // un écran plus étroit, les pastilles passent à la ligne
        // au lieu de déborder, et elles restent toutes visibles.
        Wrap(
          spacing: 4,
          runSpacing: 4,
          children: [
            for (final (valeur, libelle) in const [
              ('toutes', 'Toutes'),
              ('non-lues', 'Non lues'),
              ('favoris', 'Favoris'),
              ('groupes', 'Groupes'),
              ('pastorale', 'Pastorale'),
            ])
              ChoiceChip(
                label: Text(
                  _compteFiltre(valeur) > 0
                      ? '$libelle ${_compteFiltre(valeur)}'
                      : libelle,
                  style: const TextStyle(fontSize: 12),
                  overflow: TextOverflow.ellipsis,
                ),
                labelPadding: const EdgeInsets.symmetric(horizontal: 3),
                padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 4),
                visualDensity: VisualDensity.compact,
                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                selected: _filtre == valeur,
                onSelected: (_) =>
                    setState(() => _filtre = valeur),
              ),
          ],
        ),
        const SizedBox(height: 8),
        if (_filtrees.isEmpty)
          EmptyNote(
            icon: Icons.chat_bubble_outline,
            text: _texteVide(),
            action: _filtre == 'toutes' && _recherche.trim().isEmpty
                ? SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: FilledButton(
                      onPressed: () => _nouvelleConversation(),
                      child: Text(tr('Nouvelle conversation')),
                    ),
                  )
                : null,
          )
        else
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.line),
            ),
            child: Column(
              children: [
                for (var i = 0; i < _filtrees.length; i++) ...[
                  if (i > 0) const Divider(height: 1, color: Cp.line),
                  _TuileConversation(
                    conversation: _filtrees[i],
                    nom: _nomAffiche(_filtrees[i]),
                    onTap: () => _ouvrir(_filtrees[i]),
                    onBasculerFavori: () =>
                        _basculerFavori(_filtrees[i]),
                  ),
                ],
              ],
            ),
          ),
      ],
      boutonFlottant: _boutonMessage(),
    );
    // Le bouton d'écriture suit le défilement, comme la pilule.
    return NotificationListener<ScrollNotification>(
      onNotification: _masquage.surNotification,
      child: page,
    );
  }

  /// Texte de l'état vide, selon le filtre et la recherche.
  String _texteVide() {
    if (_recherche.trim().isNotEmpty) {
      return tr('Aucune conversation ne correspond à votre recherche.');
    }
    switch (_filtre) {
      case 'non-lues':
        return tr('Aucun message non lu.');
      case 'favoris':
        return tr(
          'Aucune conversation en favori.\nTouchez l’étoile d’une conversation pour la retrouver ici.',
        );
      case 'groupes':
        return tr(
          'Aucun groupe pour l’instant.\nUn groupe se crée automatiquement quand vous vous inscrivez à un camp ou une retraite.',
        );
      case 'pastorale':
        return tr('Aucune conversation pastorale.');
      default:
        return tr(
          'Aucune conversation pour l’instant.\nÉcrivez à un membre de la structure pour commencer.',
        );
    }
  }

  /// Favori, 18 nov. 2026 : bascule l'étoile de la conversation,
  /// pour moi seulement. La liste se met à jour aussitôt, sans
  /// recharger : le filtre Favoris suit.
  Future<void> _basculerFavori(ConversationMessagerie conversation) async {
    final nouveau = !conversation.estFavori;
    try {
      final confirme = await _api.basculerFavoriConversation(
        conversation.id,
        favori: nouveau,
      );
      if (!mounted) return;
      setState(() {
        _conversations = _conversations
            .map(
              (c) => c.id == conversation.id
                  ? c.copyWith(estFavori: confirme)
                  : c,
            )
            .toList();
      });
    } catch (e) {
      if (mounted) toast(context, e.toString());
    }
  }

  /// Bouton d'écriture, 18 nov. 2026 : rond, bleu nuit uni, sans
  /// dégradé, liseré or, icône blanche bulle avec crayon, en bas
  /// à droite au-dessus de la pilule, à portée du pouce. Le menu
  /// s'ouvre vers le haut, Nouveau message ou Créer un groupe.
  /// Masqué pendant le défilement, de retour quand on remonte et
  /// quand le défilement s'arrête après une descente, comme la
  /// pilule.
  Widget _boutonMessage() {
    return AnimatedBuilder(
      animation: _masquage,
      builder: (context, child) => AnimatedSlide(
        offset: _masquage.cachee ? const Offset(0, 1.6) : Offset.zero,
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeOut,
        child: AnimatedOpacity(
          opacity: _masquage.cachee ? 0 : 1,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
          child: child,
        ),
      ),
      child: PopupMenuButton<String>(
        tooltip: tr('Écrire un message'),
        onSelected: (choix) {
          if (choix == 'groupe') {
            _nouvelleConversation(typeInitial: 'groupe_etablissement');
          } else {
            _nouvelleConversation();
          }
        },
        itemBuilder: (context) => [
          PopupMenuItem(
            value: 'message',
            child: Row(children: [
              const Icon(Icons.chat_bubble_outline),
              const SizedBox(width: 12),
              Text(tr('Nouveau message')),
            ]),
          ),
          PopupMenuItem(
            value: 'groupe',
            child: Row(children: [
              const Icon(Icons.group_outlined),
              const SizedBox(width: 12),
              Text(tr('Créer un groupe')),
            ]),
          ),
        ],
        child: Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            color: Cp.navy,
            shape: BoxShape.circle,
            border: Border.all(color: Cp.gold, width: 2),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.25),
                blurRadius: 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: const Center(child: _IconeMessage()),
        ),
      ),
    );
  }

  /// Création : type, puis membres de la même structure. La liste
  /// des membres vient de l'API, déjà limitée à la structure : un
  /// groupe ne mélange jamais deux structures, il n'y en a qu'une.
  /// Le type est préréglé par le menu du bouton d'écriture,
  /// 18 nov. 2026 : Nouveau message ouvre une conversation entre
  /// deux membres, Créer un groupe ouvre un groupe.
  Future<void> _nouvelleConversation({String typeInitial = 'directe'}) async {
    List<MembreMessagerie> membres;
    try {
      final bruts = await _api.fetchMembresMessagerie();
      membres = bruts.map(MembreMessagerie.fromJson).toList();
    } catch (e) {
      if (mounted) toast(context, e.toString());
      return;
    }
    if (!mounted) return;
    final creee = await showModalBottomSheet<ConversationMessagerie>(
      context: context,
      isScrollControlled: true,
      builder: (context) => _FeuilleNouvelleConversation(
        membres: membres,
        apiClient: _api,
        typeInitial: typeInitial,
      ),
    );
    if (creee != null && mounted) {
      await _ouvrir(creee);
    }
  }
}

/// Icône bulle avec crayon, 18 nov. 2026 : aucun glyphe
/// MaterialIcons ne combine les deux, la bulle et le crayon sont
/// composés. Blanche sur bleu nuit, comme le bouton d'écriture.
class _IconeMessage extends StatelessWidget {
  const _IconeMessage();

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      width: 28,
      height: 28,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Icon(Icons.chat_bubble_outline, color: Colors.white, size: 28),
          Positioned(
            right: -2,
            bottom: -2,
            child: Icon(Icons.edit_outlined, color: Colors.white, size: 15),
          ),
        ],
      ),
    );
  }
}

/// Une ligne de conversation : avatar neutre, nom, heure, aperçu,
/// pastille or de non lus. Titre gras tant qu'il reste des non lus.
class _TuileConversation extends StatelessWidget {
  const _TuileConversation({
    required this.conversation,
    required this.nom,
    required this.onTap,
    required this.onBasculerFavori,
  });

  final ConversationMessagerie conversation;
  final String nom;
  final VoidCallback onTap;

  /// Bascule du favori, 18 nov. 2026 : l'étoile est sur la tuile,
  /// pour moi seulement.
  final VoidCallback onBasculerFavori;

  @override
  Widget build(BuildContext context) {
    // Photo de l'autre membre pour une directe, initiales sinon :
    // on voit avec qui l'on cause avant d'ouvrir.
    final photo = conversation.type == 'directe'
        ? photoDataUrlProvider(conversation.autrePhoto)
        : null;
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: Cp.s2,
          vertical: 12,
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (photo != null)
              CircleAvatar(backgroundImage: photo)
            else
              CircleAvatar(
                backgroundColor: Cp.navy,
                foregroundColor: Colors.white,
                child: Text(
                  initialesNom(nom),
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
              ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          nom,
                          // Règle professionnelle, 18 nov. 2026 : aucun
                          // nom coupé, il tient sur deux lignes.
                          maxLines: 2,
                          overflow: TextOverflow.visible,
                          style: TextStyle(
                            fontWeight: conversation.nonLus > 0
                                ? FontWeight.bold
                                : FontWeight.normal,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        heureCourteConversation(
                          conversation.lastMessageAt,
                        ),
                        style: const TextStyle(
                          fontSize: 12,
                          color: Cp.inkMuted,
                        ),
                      ),
                    ],
                  ),
                  // Pastille éphémère, 21 nov. 2026, carte 3 : durée
                  // en jours, conversations privées seulement.
                  if (conversation.ephemere != null) ...[
                    const SizedBox(height: 2),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 3,
                      ),
                      decoration: BoxDecoration(
                        color: Cp.navy.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(
                            Icons.timer_outlined,
                            size: 12,
                            color: Cp.navy,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            libelleEphemere(conversation.ephemere),
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: Cp.navy,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                  const SizedBox(height: 2),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          conversation.dernierMessage ??
                              libelleTypeConversation(
                                conversation.type,
                              ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 13),
                        ),
                      ),
                      if (conversation.nonLus > 0) ...[
                        const SizedBox(width: 8),
                        Container(
                          constraints: const BoxConstraints(
                            minWidth: 20,
                            minHeight: 20,
                          ),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 6,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: Cp.gold,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            '${conversation.nonLus}',
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: Cp.navy,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 4),
            IconButton(
              tooltip: conversation.estFavori
                  ? tr('Retirer des favoris')
                  : tr('Mettre en favori'),
              iconSize: 20,
              onPressed: onBasculerFavori,
              icon: Icon(
                conversation.estFavori
                    ? Icons.star
                    : Icons.star_border,
                color:
                    conversation.estFavori ? Cp.gold : Cp.inkMuted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Feuille de création d'une conversation : type, titre pour les
/// groupes, sélection de membres de la structure.
class _FeuilleNouvelleConversation extends StatefulWidget {
  final List<MembreMessagerie> membres;
  final ApiClient apiClient;

  /// Type préréglé par le menu du bouton d'écriture, 18 nov.
  /// 2026 : 'directe' pour Nouveau message, 'groupe_etablissement'
  /// pour Créer un groupe. L'utilisateur peut encore changer de
  /// type dans la feuille.
  final String typeInitial;

  const _FeuilleNouvelleConversation({
    required this.membres,
    required this.apiClient,
    this.typeInitial = 'directe',
  });

  @override
  State<_FeuilleNouvelleConversation> createState() =>
      _FeuilleNouvelleConversationState();
}

class _FeuilleNouvelleConversationState
    extends State<_FeuilleNouvelleConversation> {
  late String _type;
  final _titreController = TextEditingController();
  final _rechercheController = TextEditingController();
  final _selection = <String>{};
  bool _tousLesMembres = false;
  bool _enCours = false;
  String? _erreur;
  // Recherche par préfixe, 22 nov. 2026 : la liste initiale ne
  // porte que les contacts, la recherche interroge le serveur
  // dès 3 caractères et ajoute les résultats aux proposés.
  List<MembreMessagerie> _resultatsRecherche = [];
  bool _rechercheEnCours = false;

  @override
  void initState() {
    super.initState();
    _type = widget.typeInitial;
  }

  @override
  void dispose() {
    _titreController.dispose();
    _rechercheController.dispose();
    super.dispose();
  }

  /// Tous les membres connus ici : contacts chargés au départ,
  /// plus les résultats de la recherche, sans doublon.
  List<MembreMessagerie> get _connus {
    final parId = <String, MembreMessagerie>{
      for (final m in widget.membres) m.id: m,
      for (final m in _resultatsRecherche) m.id: m,
    };
    return parId.values.toList();
  }

  Future<void> _rechercher(String saisie) async {
    final texte = saisie.trim();
    if (texte.length < 3) {
      if (_resultatsRecherche.isNotEmpty) {
        setState(() => _resultatsRecherche = []);
      }
      return;
    }
    setState(() => _rechercheEnCours = true);
    try {
      final bruts = await widget.apiClient.fetchMembresMessagerie(q: texte);
      if (!mounted) return;
      setState(() {
        _resultatsRecherche = bruts.map(MembreMessagerie.fromJson).toList();
        _rechercheEnCours = false;
      });
    } catch (_) {
      if (mounted) setState(() => _rechercheEnCours = false);
    }
  }

  /// Membres proposés : pour un groupe d'établissement, seulement
  /// ceux de mon établissement ; sinon tous les membres.
  List<MembreMessagerie> get _proposes {
    final liste = _connus;
    if (_type != 'groupe_etablissement') return liste;
    final monEtab = (app.member?.etab ?? '').trim();
    if (monEtab.isEmpty) return liste;
    final filtres = liste
        .where((m) => m.etablissement.trim() == monEtab)
        .toList();
    return filtres.isEmpty ? liste : filtres;
  }

  List<MembreMessagerie> get _selectionnes {
    if (_type == 'groupe_structure' && _tousLesMembres) {
      return _connus;
    }
    return _connus
        .where((m) => _selection.contains(m.id))
        .toList();
  }

  bool get _valide {
    if (_type == 'directe') return _selection.length == 1;
    return _selectionnes.isNotEmpty &&
        _titreController.text.trim().isNotEmpty;
  }

  Future<void> _creer() async {
    if (!_valide || _enCours) return;
    setState(() {
      _enCours = true;
      _erreur = null;
    });
    try {
      final raw = await widget.apiClient.creerConversationMessagerie(
        type: _type,
        title: _type == 'directe'
            ? null
            : _titreController.text.trim(),
        participantIds: _selectionnes.map((m) => m.id).toList(),
      );
      if (mounted) {
        Navigator.of(context).pop(
          ConversationMessagerie.fromJson(raw),
        );
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _enCours = false;
          _erreur = e.toString();
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final estGroupe = _type != 'directe';
    return Padding(
      padding: EdgeInsets.only(
        left: 16,
        right: 16,
        top: 16,
        bottom: MediaQuery.of(context).viewInsets.bottom + 16,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            tr('Nouvelle conversation'),
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            children: [
              for (final (valeur, libelle) in [
                ('directe', tr('Directe')),
                ('groupe_etablissement', tr('Groupe d’établissement')),
                if (app.isAdmin)
                  (
                    'groupe_structure',
                    tr('Groupe de la structure'),
                  ),
              ])
                ChoiceChip(
                  label: Text(libelle),
                  selected: _type == valeur,
                  onSelected: (_) => setState(() {
                    _type = valeur;
                    _selection.clear();
                    _tousLesMembres = false;
                  }),
                ),
            ],
          ),
          if (estGroupe) ...[
            const SizedBox(height: 12),
            TextField(
              controller: _titreController,
              // 16 px minimum : Safari iPhone ne zoome pas.
              style: const TextStyle(fontSize: 16),
              decoration: InputDecoration(
                labelText: tr('Nom du groupe'),
                hintText: tr('Par exemple : Chorale'),
              ),
              onChanged: (_) => setState(() {}),
            ),
          ],
          if (_type == 'groupe_structure') ...[
            const SizedBox(height: 8),
            CheckboxListTile(
              contentPadding: EdgeInsets.zero,
              title: Text(tr('Tous les membres de la structure')),
              value: _tousLesMembres,
              onChanged: (valeur) => setState(
                () => _tousLesMembres = valeur ?? false,
              ),
            ),
          ],
          const SizedBox(height: 8),
          TextField(
            controller: _rechercheController,
            style: const TextStyle(fontSize: 16),
            decoration: InputDecoration(
              labelText: tr('Rechercher un membre'),
              hintText: tr('Nom ou matricule, 3 caractères au moins'),
              prefixIcon: const Icon(Icons.search_outlined),
            ),
            onChanged: _rechercher,
          ),
          if (_rechercheEnCours) ...[
            const SizedBox(height: 8),
            const LinearProgressIndicator(),
          ],
          const SizedBox(height: 8),
          Text(
            _type == 'directe'
                ? tr('Choisissez un membre de la structure.')
                : tr('Choisissez les membres du groupe.'),
            style: const TextStyle(fontSize: 13),
          ),
          const SizedBox(height: 4),
          SizedBox(
            height: 280,
            child: _tousLesMembres && _type == 'groupe_structure'
                ? Center(
                    child: Text(
                      tr(
                        '${_connus.length} membres seront ajoutés.',
                      ),
                      style: const TextStyle(fontSize: 14),
                    ),
                  )
                : _proposes.isEmpty
                    ? Center(
                        child: Text(
                          tr('Aucun membre dans la structure.'),
                          style: const TextStyle(fontSize: 14),
                        ),
                      )
                    : ListView.builder(
                        itemCount: _proposes.length,
                        itemBuilder: (context, index) {
                          final membre = _proposes[index];
                          final choisi =
                              _selection.contains(membre.id);
                          return CheckboxListTile(
                            contentPadding: EdgeInsets.zero,
                            title: Text(membre.nomComplet),
                            subtitle: Text(
                              membre.matricule.isNotEmpty
                                  ? '${membre.matricule} · ${membre.etablissement}'
                                  : membre.etablissement,
                            ),
                            value: choisi,
                            onChanged: (valeur) => setState(() {
                              if (_type == 'directe') {
                                _selection.clear();
                                if (valeur ?? false) {
                                  _selection.add(membre.id);
                                }
                              } else if (valeur ?? false) {
                                _selection.add(membre.id);
                              } else {
                                _selection.remove(membre.id);
                              }
                            }),
                          );
                        },
                      ),
          ),
          if (_erreur != null) ...[
            const SizedBox(height: 8),
            Text(
              _erreur!,
              style: const TextStyle(
                fontSize: 13,
                color: Cp.danger,
              ),
            ),
          ],
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: FilledButton(
              onPressed: _valide && !_enCours ? _creer : null,
              child: _enCours
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : Text(tr('Créer la conversation')),
            ),
          ),
        ],
      ),
    );
  }
}

/// Une conversation, spécification v2, section 6.
/// Bulles contrastées (blanc sur bleu nuit, bleu nuit sur blanc),
/// zone de saisie fixe en bas, cibles tactiles de 48 px minimum,
/// champs à 16 px minimum sur iPhone. Sans WebSocket côté serveur,
/// l'écran interroge le serveur par HTTP toutes les 15 secondes.
/// Le bouton « Signaler » ouvre la modale de signalement pour la
/// conversation ; un appui long sur une bulle ouvre le menu du
/// message, Modifier et Supprimer sur mes propres bulles,
/// Signaler sur toutes, 21 nov. 2026, carte 3.
class MessagerieConversationScreen extends StatefulWidget {
  final ConversationMessagerie conversation;

  /// Titre affiché (résolu par la liste : titre ou nom de l'autre membre).
  final String titre;

  /// Identifiant de ma fiche membre, quand la liste l'a résolu.
  final String? monMembreId;

  /// Noms des membres de la structure, par identifiant.
  final Map<String, String> nomsMembres;

  /// Client injecté (tests) ; sinon le client global.
  final ApiClient? apiClient;

  /// Enregistreur vocal injecté (tests) ; sinon l'enregistreur réel.
  final EnregistreurAudio? enregistreurVocal;

  /// Demande d'aide, 21 nov. 2026, carte 4 : vrai quand l'appelant
  /// est un responsable du Bureau, qui peut changer le statut de
  /// la demande et écrire même quand elle est résolue. Faux pour
  /// le membre qui l'a ouverte.
  final bool estResponsable;

  const MessagerieConversationScreen({
    super.key,
    required this.conversation,
    required this.titre,
    this.monMembreId,
    this.nomsMembres = const {},
    this.apiClient,
    this.enregistreurVocal,
    this.estResponsable = false,
  });

  @override
  State<MessagerieConversationScreen> createState() =>
      _MessagerieConversationScreenState();
}

class _MessagerieConversationScreenState
    extends State<MessagerieConversationScreen> {
  final _saisieController = TextEditingController();
  final _defilementController = ScrollController();
  List<MessageMessagerie> _messages = [];
  bool _chargement = true;
  String? _erreur;
  bool _envoiEnCours = false;
  bool _rafraichissementEchoue = false;
  String? _monMembreId;
  Timer? _minuteur;
  Timer? _minuteurAppel;
  bool _appelEnCours = false;
  String? _appelEntrantOuvertId;

  /// Présence de l'autre membre, 20 nov. 2026 : vrai quand il a
  /// signalé son activité dans les 10 dernières minutes.
  bool _autreEnLigne = false;

  /// Messages éphémères, 21 nov. 2026, carte 3 : durée en jours
  /// quand le mode est actif, null quand il est désactivé.
  int? _ephemereJours;

  /// Aide de la structure, 21 nov. 2026, carte 4 : statut de la
  /// demande, ouvert, en cours ou résolu, quand le fil est une
  /// demande d'aide. Mis à jour quand le statut change ici.
  String? _aideStatut;

  /// Action sur le statut ou réouverture en cours.
  bool _actionAideEnCours = false;

  // Message vocal, 18 nov. 2026 : enregistrement dans la saisie,
  // réécoute avant l'envoi, son sur R2 côté serveur.
  bool _enregistrementVocal = false;
  SonEnregistre? _vocalApercu;
  EnregistreurAudio? _enregistreurVocal;
  Timer? _minuteurVocal;
  Duration _ecouleVocal = Duration.zero;
  List<double> _niveauxVocal = [];
  StreamSubscription<double>? _abonnementNiveauxVocal;
  bool _envoiVocalEnCours = false;

  ApiClient get _api => widget.apiClient ?? api;

  @override
  void initState() {
    super.initState();
    _monMembreId = widget.monMembreId;
    _ephemereJours = widget.conversation.ephemere;
    _aideStatut = widget.conversation.aideStatut;
    _charger();
    // Interrogation HTTP toutes les 15 secondes tant que l'écran
    // est ouvert, pas de WebSocket côté serveur.
    _minuteur = Timer.periodic(
      const Duration(seconds: 15),
      (_) => _rafraichirSilencieux(),
    );
    // Appels entrants vérifiés toutes les 3 secondes, étape 2 :
    // avant, ils n'étaient vérifiés qu'à chaque rafraîchissement
    // des messages, toutes les 15 secondes, donc jusqu'à 15
    // secondes de retard avant l'écran d'appel entrant.
    _minuteurAppel = Timer.periodic(
      delaiVerificationAppelEntrant,
      (_) => _verifierAppelActif(),
    );
  }

  @override
  void dispose() {
    _minuteur?.cancel();
    _minuteurAppel?.cancel();
    _minuteurVocal?.cancel();
    _abonnementNiveauxVocal?.cancel();
    _enregistreurVocal?.liberer();
    _saisieController.dispose();
    _defilementController.dispose();
    super.dispose();
  }

  Future<void> _charger() async {
    try {
      final messages = await _api.fetchMessagesConversation(
        widget.conversation.id,
      );
      if (!mounted) return;
      // Suppression « pour moi », 21 nov. 2026, carte 3 : les
      // messages masqués ne s'affichent plus, sur cet appareil.
      final masques = await lireMessagesMasques(widget.conversation.id);
      if (!mounted) return;
      setState(() {
        _messages = messages
            .map(MessageMessagerie.fromJson)
            .where((m) => !masques.contains(m.id))
            .toList();
        _chargement = false;
        _erreur = null;
      });
      _marquerLu();
      _defilerEnBas();
      _verifierAppelActif();
      _verifierPresence();
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur = e.toString();
      });
    }
  }

  /// Rafraîchissement silencieux : ne remplace que les messages,
  /// sans toucher au champ de saisie. Un échec affiche un bandeau
  /// discret, le minuteur réessaiera.
  Future<void> _rafraichirSilencieux() async {
    if (!mounted) return;
    try {
      final messages = await _api.fetchMessagesConversation(
        widget.conversation.id,
      );
      if (!mounted) return;
      final masques = await lireMessagesMasques(widget.conversation.id);
      if (!mounted) return;
      final liste = messages
          .map(MessageMessagerie.fromJson)
          .where((m) => !masques.contains(m.id))
          .toList();
      setState(() => _rafraichissementEchoue = false);
      if (liste.length != _messages.length ||
          (liste.isNotEmpty &&
              _messages.isNotEmpty &&
              liste.last.id != _messages.last.id)) {
        setState(() => _messages = liste);
        _marquerLu();
        _defilerEnBas();
      }
      _verifierAppelActif();
      _verifierPresence();
    } catch (_) {
      if (mounted) {
        setState(() => _rafraichissementEchoue = true);
      }
    }
  }

  /// Appel entrant : vérifié toutes les 3 secondes par son propre
  /// minuteur, et au chargement. Conversations directes seulement, jamais les
  /// groupes. L'écran entrant ne s'ouvre qu'une fois par appel :
  /// la garde se libère quand il se ferme, et l'appel est alors
  /// terminé ou en cours, donc il ne se rouvrira pas.
  Future<void> _verifierAppelActif() async {
    if (!mounted) return;
    if (widget.conversation.type != 'directe') return;
    if (_appelEntrantOuvertId != null) return;
    try {
      final brut = await _api.fetchAppelActifConversation(
        widget.conversation.id,
      );
      final appel = brut['appel'];
      if (!mounted || appel == null) return;
      final appelActif = AppelMessagerie.fromJson(
        appel as Map<String, dynamic>,
      );
      if (!appelActif.sonne) return;
      if (appelActif.appelantId == _monMembreId) return;
      _appelEntrantOuvertId = appelActif.id;
      final autreNom = appelActif.appelantNom.isEmpty
          ? widget.titre
          : appelActif.appelantNom;
      unawaited(
        Navigator.of(context)
            .push(
              MaterialPageRoute(
                builder: (_) => EcranAppelEntrant(
                  appelId: appelActif.id,
                  appelantNom: autreNom,
                  typeAppel: appelActif.type,
                  conversationId: widget.conversation.id,
                  monMembreId: _monMembreId,
                  apiClient: widget.apiClient,
                ),
              ),
            )
            .then((_) => _appelEntrantOuvertId = null),
      );
    } catch (_) {
      // Le prochain rafraîchissement réessaiera, sans rien afficher.
    }
  }

  /// Présence de l'autre membre, 20 nov. 2026 : directe seulement,
  /// rafraîchie avec les messages toutes les 15 secondes. Un échec
  /// ne change rien à l'affichage, le prochain rafraîchissement
  /// réessaiera.
  Future<void> _verifierPresence() async {
    if (!mounted || widget.conversation.type != 'directe') return;
    try {
      final presence = await _api.fetchPresenceConversation(
        widget.conversation.id,
      );
      if (!mounted) return;
      final enLigne = presence['en_ligne'] == true;
      if (enLigne != _autreEnLigne) {
        setState(() => _autreEnLigne = enLigne);
      }
    } catch (_) {}
  }

  /// Appeler l'autre membre de cette conversation directe.
  /// Un seul appel actif à la fois : le serveur renvoie 409 si
  /// l'autre membre est déjà en appel. Étape 2 : l'écran d'appel
  /// s'ouvre aussitôt après le tap, la création de l'appel se
  /// fait en arrière-plan, l'écran attend son identifiant.
  Future<void> _appeler(String type) async {
    if (_appelEnCours) return;
    // Carte 155 : le micro et la caméra sont demandés avant
    // d'ouvrir l'écran d'appel, pour que les fenêtres système
    // ne mangent pas les 30 secondes de sonnerie. Refus : on
    // affiche le message et on ne lance pas l'appel.
    final autorise =
        await demanderAutorisationsAppel(video: type == 'video');
    if (!autorise) {
      if (mounted) {
        toast(
          context,
          type == 'video'
              ? tr('Micro ou caméra refusé : autorise le micro et la caméra dans les réglages pour appeler en vidéo.')
              : tr('Micro refusé : autorise le micro dans les réglages pour appeler.'),
        );
      }
      return;
    }
    setState(() => _appelEnCours = true);
    final creation = _api.creerAppelConversation(
      widget.conversation.id,
      type: type,
    );
    setState(() => _appelEnCours = false);
    if (!mounted) {
      // Écran non ouvert : la création en échec ne doit pas
      // rester sans écouteur d'erreur.
      unawaited(creation.catchError((_) => <String, dynamic>{}));
      return;
    }
    go(
      context,
      EcranAppelEnCours(
        appelId: '',
        typeAppel: type,
        autreNom: widget.titre,
        autrePhoto: photoDataUrlProvider(widget.conversation.autrePhoto),
        suisAppelant: true,
        apiClient: widget.apiClient,
        appelFutur: creation,
      ),
    );
  }

  void _marquerLu() {
    final lecture = MessagerieLectureService.instance;
    final avant = lecture.luLe(widget.conversation.id);
    final avaitNonLus = compterMessagesNonLus(
          _messages,
          _monMembreId,
          avant,
        ) >
        0;
    final dernier = _messages.isEmpty ? null : _messages.last.createdAt;
    unawaited(
      lecture.marquerLu(
        widget.conversation.id,
        dernier ?? DateTime.now(),
      ),
    );
    if (avaitNonLus) {
      final notifier = lecture.nonLusNotifier;
      if (notifier.value > 0) notifier.value = notifier.value - 1;
    }
  }

  void _defilerEnBas() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_defilementController.hasClients) return;
      // Liste inversée : le bas, les derniers messages, est à 0.
      _defilementController.jumpTo(0);
    });
  }

  Future<void> _envoyer() async {
    final contenu = _saisieController.text.trim();
    if (contenu.isEmpty || _envoiEnCours) return;
    setState(() => _envoiEnCours = true);
    try {
      final raw = await _api.envoyerMessageConversation(
        widget.conversation.id,
        content: contenu,
      );
      final message = MessageMessagerie.fromJson(raw);
      if (!mounted) return;
      _saisieController.clear();
      setState(() {
        _messages = [..._messages, message];
        // Le serveur renvoie mon identifiant d'expéditeur : mes
        // messages sont reconnus dès cet envoi.
        _monMembreId = message.senderId;
        _envoiEnCours = false;
      });
      _marquerLu();
      _defilerEnBas();
    } catch (e) {
      if (!mounted) return;
      setState(() => _envoiEnCours = false);
      toast(context, e.toString());
    }
  }

  /// Message vocal, 18 nov. 2026 : le micro ouvre
  /// l'enregistrement dans la saisie, 5 minutes au plus, puis
  /// l'arrêt ouvre la réécoute avant l'envoi. Le son part sur R2
  /// côté serveur, comme une story ; sans clés R2, le serveur
  /// refuse en 503 et le texte n'est pas touché.
  Future<void> _demarrerVocal() async {
    if (_enregistrementVocal || _vocalApercu != null) return;
    final enregistreur = widget.enregistreurVocal ?? EnregistreurAudioRecord();
    final ok = await enregistreur.demarrer();
    if (!mounted) {
      await enregistreur.liberer();
      return;
    }
    if (!ok) {
      await enregistreur.liberer();
      toast(context, tr('Autorise le micro pour enregistrer.'));
      return;
    }
    _enregistreurVocal = enregistreur;
    _niveauxVocal = [];
    _abonnementNiveauxVocal = enregistreur.niveaux.listen((niveau) {
      _niveauxVocal.add(niveau);
      if (_niveauxVocal.length > 200) {
        _niveauxVocal.removeRange(0, _niveauxVocal.length - 200);
      }
      if (mounted) setState(() {});
    });
    _ecouleVocal = Duration.zero;
    _minuteurVocal?.cancel();
    _minuteurVocal = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() => _ecouleVocal += const Duration(seconds: 1));
      if (_ecouleVocal >= dureeMaxMessageVocal) _arreterVocal();
    });
    setState(() => _enregistrementVocal = true);
  }

  /// Arrêt de l'enregistrement : ouvre la réécoute, l'envoi se
  /// fait par le bouton envoyer. Un vocal trop court est jeté.
  Future<void> _arreterVocal() async {
    final enregistreur = _enregistreurVocal;
    if (enregistreur == null) return;
    final son = await enregistreur.arreter();
    _minuteurVocal?.cancel();
    // Le cancel ne s'attend pas, voir le magnétophone.
    _abonnementNiveauxVocal?.cancel();
    _abonnementNiveauxVocal = null;
    await enregistreur.liberer();
    _enregistreurVocal = null;
    if (!mounted) return;
    setState(() {
      _enregistrementVocal = false;
      _vocalApercu = (son == null || son.dureeMs < 500) ? null : son;
      _ecouleVocal = Duration.zero;
    });
    if (_vocalApercu == null) {
      toast(context, tr('Message vocal trop court.'));
    }
  }

  /// Jette l'enregistrement en cours ou l'aperçu, sans envoyer.
  Future<void> _annulerVocal() async {
    final enregistreur = _enregistreurVocal;
    _minuteurVocal?.cancel();
    _abonnementNiveauxVocal?.cancel();
    _abonnementNiveauxVocal = null;
    if (enregistreur != null) {
      await enregistreur.annuler();
      await enregistreur.liberer();
    }
    _enregistreurVocal = null;
    if (!mounted) return;
    setState(() {
      _enregistrementVocal = false;
      _vocalApercu = null;
      _ecouleVocal = Duration.zero;
      _niveauxVocal = [];
    });
  }

  Future<void> _envoyerVocal() async {
    final apercu = _vocalApercu;
    if (apercu == null || _envoiVocalEnCours) return;
    setState(() => _envoiVocalEnCours = true);
    try {
      final raw = await _api.envoyerMessageVocal(
        widget.conversation.id,
        bytes: apercu.octets,
        filename: 'message-vocal.${extensionDepuisMime(apercu.mime)}',
        dureeSecondes:
            (apercu.dureeMs / 1000).round().clamp(1, 300),
      );
      final message = MessageMessagerie.fromJson(raw);
      if (!mounted) return;
      setState(() {
        _messages = [..._messages, message];
        _monMembreId = message.senderId;
        _vocalApercu = null;
        _niveauxVocal = [];
        _envoiVocalEnCours = false;
      });
      _marquerLu();
      _defilerEnBas();
    } catch (e) {
      if (!mounted) return;
      setState(() => _envoiVocalEnCours = false);
      toast(context, e.toString());
    }
  }

  Future<void> _signalerConversation() async {
    await ouvrirFeuilleSignalement(
      context,
      apiClient: _api,
      cibleType: 'conversation',
      cibleId: widget.conversation.id,
      contenuFige: widget.titre,
    );
  }

  Future<void> _signalerMessage(MessageMessagerie message) async {
    await ouvrirFeuilleSignalement(
      context,
      apiClient: _api,
      cibleType: 'message',
      cibleId: message.id,
      contenuFige: message.content,
    );
  }

  /// Appui long sur une bulle, 21 nov. 2026, carte 3 : mes propres
  /// bulles proposent Modifier et Supprimer, les autres bulles ne
  /// proposent que Signaler, comme avant. Un message supprimé ne
  /// propose plus que Signaler, il n'y a plus rien à modifier.
  Future<void> _menuMessage(MessageMessagerie message, bool mien) async {
    if (!mien || message.supprime) {
      await _signalerMessage(message);
      return;
    }
    final choix = await showModalBottomSheet<String>(
      context: context,
      builder: (ctx) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (message.type == 'text')
              ListTile(
                leading: const Icon(Icons.edit_outlined),
                title: Text(tr('Modifier')),
                onTap: () => Navigator.of(ctx).pop('modifier'),
              ),
            ListTile(
              leading: const Icon(Icons.delete_outline),
              title: Text(tr('Supprimer')),
              onTap: () => Navigator.of(ctx).pop('supprimer'),
            ),
            ListTile(
              leading: const Icon(Icons.flag_outlined),
              title: Text(tr('Signaler')),
              onTap: () => Navigator.of(ctx).pop('signaler'),
            ),
          ],
        ),
      ),
    );
    if (!mounted) return;
    if (choix == 'modifier') {
      await _modifierMessage(message);
    } else if (choix == 'supprimer') {
      await _supprimerMessage(message);
    } else if (choix == 'signaler') {
      await _signalerMessage(message);
    }
  }

  /// Modification d'un message texte, 21 nov. 2026, carte 3 : le
  /// texte est prérempli, 5000 caractères au plus, l'auteur
  /// seulement côté serveur. La bulle est remplacée par la ligne
  /// renvoyée, avec edited_at, qui affiche « Modifié ».
  Future<void> _modifierMessage(MessageMessagerie message) async {
    final controleur = TextEditingController(text: message.content);
    final nouveau = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Modifier le message')),
        content: TextField(
          controller: controleur,
          autofocus: true,
          maxLines: null,
          maxLength: 5000,
          decoration: InputDecoration(
            border: const OutlineInputBorder(),
            hintText: tr('Message'),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: Text(tr('Annuler')),
          ),
          FilledButton(
            onPressed: () => Navigator.of(ctx).pop(controleur.text.trim()),
            child: Text(tr('Enregistrer')),
          ),
        ],
      ),
    );
    controleur.dispose();
    if (nouveau == null || nouveau.isEmpty || nouveau == message.content) {
      return;
    }
    try {
      final brut = await _api.modifierMessage(
        widget.conversation.id,
        message.id,
        content: nouveau,
      );
      if (!mounted) return;
      final modifie = MessageMessagerie.fromJson(brut);
      setState(() {
        _messages =
            _messages.map((m) => m.id == message.id ? modifie : m).toList();
      });
      toast(context, tr('Message modifié.'));
    } catch (_) {
      if (mounted) {
        toast(context, tr('Modification impossible. Réessayez.'));
      }
    }
  }

  /// Suppression d'un message, 21 nov. 2026, carte 3 : pour tout
  /// le monde, le serveur met deleted_at et la bulle devient
  /// « Message supprimé » ; pour moi, le message est seulement
  /// masqué sur cet appareil, les autres le voient toujours.
  Future<void> _supprimerMessage(MessageMessagerie message) async {
    final choix = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr('Supprimer ce message ?')),
        content: Text(
          tr(
            'Pour tout le monde, le message devient « Message supprimé ». Pour moi, il disparaît seulement sur cet appareil.',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: Text(tr('Annuler')),
          ),
          TextButton(
            onPressed: () => Navigator.of(ctx).pop('moi'),
            child: Text(tr('Pour moi')),
          ),
          FilledButton(
            onPressed: () => Navigator.of(ctx).pop('tous'),
            child: Text(tr('Pour tout le monde')),
          ),
        ],
      ),
    );
    if (choix == null || !mounted) return;
    if (choix == 'moi') {
      await masquerMessagePourMoi(widget.conversation.id, message.id);
      if (!mounted) return;
      setState(
        () => _messages =
            _messages.where((m) => m.id != message.id).toList(),
      );
      toast(context, tr('Message masqué pour toi.'));
      return;
    }
    try {
      final brut = await _api.supprimerMessage(
        widget.conversation.id,
        message.id,
      );
      if (!mounted) return;
      final supprime = MessageMessagerie.fromJson(brut);
      setState(() {
        _messages =
            _messages.map((m) => m.id == message.id ? supprime : m).toList();
      });
      toast(context, tr('Message supprimé.'));
    } catch (_) {
      if (mounted) {
        toast(context, tr('Suppression impossible. Réessayez.'));
      }
    }
  }

  /// Réglage éphémère, 21 nov. 2026, carte 3 : 7 jours par défaut,
  /// 1 ou 30 jours, ou désactivé. Privé seulement, le bouton
  /// n'existe pas sur les groupes.
  Future<void> _choisirEphemere() async {
    final choix = await showDialog<String>(
      context: context,
      builder: (ctx) => SimpleDialog(
        title: Text(tr('Messages éphémères')),
        children: [
          SimpleDialogOption(
            onPressed: () => Navigator.of(ctx).pop('off'),
            child: Text(tr('Désactivés')),
          ),
          SimpleDialogOption(
            onPressed: () => Navigator.of(ctx).pop('1'),
            child: Text(tr('1 jour')),
          ),
          SimpleDialogOption(
            onPressed: () => Navigator.of(ctx).pop('7'),
            child: Text(tr('7 jours')),
          ),
          SimpleDialogOption(
            onPressed: () => Navigator.of(ctx).pop('30'),
            child: Text(tr('30 jours')),
          ),
        ],
      ),
    );
    if (choix == null || !mounted) return;
    final jours = choix == 'off' ? null : int.parse(choix);
    if (jours == _ephemereJours) return;
    try {
      await _api.reglerEphemereConversation(
        widget.conversation.id,
        jours: jours,
      );
      if (!mounted) return;
      setState(() => _ephemereJours = jours);
      toast(
        context,
        jours == null
            ? tr('Messages éphémères désactivés.')
            : tr('Messages éphémères : $jours jours.'),
      );
    } catch (_) {
      if (mounted) {
        toast(context, tr('Réglage impossible. Réessayez.'));
      }
    }
  }

  /// Changement de statut d'une demande d'aide, 21 nov. 2026,
  /// carte 4 : le responsable choisit ouvert, en cours ou résolu.
  /// Le serveur prévient le membre du nouveau statut.
  Future<void> _choisirStatutAide() async {
    final choix = await showDialog<String>(
      context: context,
      builder: (ctx) => SimpleDialog(
        title: Text(tr('Statut de la demande')),
        children: [
          for (final statut in statutsAide)
            SimpleDialogOption(
              onPressed: () => Navigator.of(ctx).pop(statut),
              child: Text(libelleStatutAide(statut)),
            ),
        ],
      ),
    );
    if (choix == null || !mounted || choix == _aideStatut) return;
    setState(() => _actionAideEnCours = true);
    try {
      final brut = await _api.changerStatutDemandeAide(
        widget.conversation.id,
        statut: choix,
      );
      if (!mounted) return;
      setState(() {
        _aideStatut =
            (brut['statut'] ?? brut['aide_statut'])?.toString() ?? choix;
        _actionAideEnCours = false;
      });
      toast(context, tr('Statut : ${libelleStatutAide(_aideStatut ?? choix)}.'));
    } catch (_) {
      if (!mounted) return;
      setState(() => _actionAideEnCours = false);
      toast(context, tr('Changement de statut impossible. Réessayez.'));
    }
  }

  /// Réouverture d'une demande résolue, 21 nov. 2026, carte 4 :
  /// le membre rouvre sa demande, qui repasse en ouvert, et peut
  /// écrire de nouveau.
  Future<void> _rouvrirDemande() async {
    if (_actionAideEnCours) return;
    setState(() => _actionAideEnCours = true);
    try {
      final brut = await _api.rouvrirDemandeAide(widget.conversation.id);
      if (!mounted) return;
      setState(() {
        _aideStatut =
            (brut['statut'] ?? brut['aide_statut'])?.toString() ?? 'ouvert';
        _actionAideEnCours = false;
      });
      toast(context, tr('Demande rouverte.'));
    } catch (_) {
      if (!mounted) return;
      setState(() => _actionAideEnCours = false);
      toast(context, tr('Réouverture impossible. Réessayez.'));
    }
  }

  /// Titre de la conversation : photo et nom de l'autre membre
  /// pour une directe, titre seul sinon. La photo vient de la
  /// liste, qui la reçoit de la route liste.
  /// Nom du contact, 19 nov. 2026 : le nom tient sur une seule
  /// ligne avec points de suspension, il ne se dessine plus
  /// par-dessus les icônes d'appel. La règle des deux lignes
  /// du 18 nov. est remplacée : un nom long en capitales ne
  /// tient pas sur deux lignes à 390 px avec trois actions.
  Widget _titreConversation() {
    final conversation = widget.conversation;
    if (conversation.type != 'directe') {
      return Text(
        widget.titre,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      );
    }
    final photo = photoDataUrlProvider(conversation.autrePhoto);
    return Row(
      mainAxisSize: MainAxisSize.max,
      children: [
        if (photo != null)
          CircleAvatar(radius: 16, backgroundImage: photo)
        else
          CircleAvatar(
            radius: 16,
            backgroundColor: Colors.white,
            foregroundColor: Cp.navy,
            child: Text(
              initialesNom(widget.titre),
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 12,
              ),
            ),
          ),
        const SizedBox(width: 8),
        Flexible(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                widget.titre,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              if (_autreEnLigne)
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(
                        color: Colors.greenAccent,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      tr('En ligne'),
                      style: const TextStyle(fontSize: 11),
                    ),
                  ],
                ),
            ],
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final reponsesDesactivees = widget.conversation.reponsesDesactivees;
    final sanction = widget.conversation.maSanction;
    // Aide de la structure, 21 nov. 2026, carte 4 : une demande
    // résolue n'accepte plus de message du membre, il rouvre
    // d'abord ; le responsable peut changer le statut et écrire
    // même quand elle est résolue.
    final estAide = widget.conversation.estAide;
    final aideResolue = estAide && _aideStatut == 'resolu';
    final aideSansEcriture =
        estAide && aideResolue && !widget.estResponsable;
    // Bas de la saisie, 19 nov. 2026 : la barre système de la tablette
    // recouvrait le champ, rendu trop bas pour répondre. Le clavier
    // le recouvre quand il est ouvert. Le plus grand des deux suffit,
    // jamais la somme.
    final basSaisie = math.max(
      MediaQuery.of(context).viewPadding.bottom,
      MediaQuery.of(context).viewInsets.bottom,
    ) + 8;
    return Scaffold(
      backgroundColor: Cp.paper,
      appBar: AppBar(
        backgroundColor: Cp.navy,
        foregroundColor: Colors.white,
        title: _titreConversation(),
        actions: [
          // Appels à deux seulement : conversations directes.
          if (widget.conversation.type == 'directe')
            IconButton(
              icon: const Icon(Icons.call),
              tooltip: tr('Appel audio'),
              onPressed:
                  _appelEnCours ? null : () => _appeler('audio'),
            ),
          if (widget.conversation.type == 'directe')
            IconButton(
              icon: const Icon(Icons.videocam),
              tooltip: tr('Appel vidéo'),
              onPressed:
                  _appelEnCours ? null : () => _appeler('video'),
            ),
          // Messages éphémères, 21 nov. 2026, carte 3 : privé
          // seulement, directe et pastorale, jamais les groupes.
          // L'icône passe en or quand le mode est actif.
          if (widget.conversation.type == 'directe' ||
              widget.conversation.type == 'pastorale')
            IconButton(
              icon: Icon(
                Icons.timer_outlined,
                color: _ephemereJours != null ? Cp.gold : null,
              ),
              tooltip: tr('Messages éphémères'),
              onPressed: _choisirEphemere,
            ),
          // Aide de la structure, 21 nov. 2026, carte 4 : pas de
          // signalement d'une demande d'aide, elle est déjà avec
          // la structure.
          if (widget.conversation.type != 'aide')
            IconButton(
              icon: const Icon(Icons.flag_outlined),
              tooltip: tr('Signaler'),
              onPressed: _signalerConversation,
            ),
        ],
      ),
      body: Column(
        children: [
          if (_rafraichissementEchoue)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 6,
              ),
              color: Cp.gold.withValues(alpha: 0.25),
              child: Text(
                tr(
                  'Messages non actualisés, connexion faible.',
                ),
                style: const TextStyle(fontSize: 12),
              ),
            ),
          // Messages éphémères, 21 nov. 2026, carte 3 : rappel
          // de la disparition, tant que le mode est actif.
          if (_ephemereJours != null)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 6,
              ),
              color: Cp.navy.withValues(alpha: 0.06),
              child: Text(
                tr(
                  'Messages éphémères : ils disparaissent ${_ephemereJours == 1 ? '1 jour' : '$_ephemereJours jours'} après l’envoi.',
                ),
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 12),
              ),
            ),
          // Aide de la structure, 21 nov. 2026, carte 4 : motif
          // et statut de la demande, avec le changement de statut
          // pour le responsable et la réouverture pour le membre
          // quand elle est résolue.
          if (estAide)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 10,
              ),
              color: Cp.navy.withValues(alpha: 0.06),
              child: Row(
                children: [
                  const Icon(
                    Icons.help_outline,
                    color: Cp.navy,
                    size: 20,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      '${libelleMotifAide(widget.conversation.aideMotif ?? 'probleme')} · ${libelleStatutAide(_aideStatut ?? 'ouvert')}',
                      style: const TextStyle(fontSize: 13),
                    ),
                  ),
                  if (widget.estResponsable)
                    TextButton(
                      onPressed: _actionAideEnCours
                          ? null
                          : _choisirStatutAide,
                      child: Text(tr('Statut')),
                    )
                  else if (aideResolue)
                    TextButton(
                      onPressed: _actionAideEnCours
                          ? null
                          : _rouvrirDemande,
                      child: Text(tr('Rouvrir ma demande')),
                    ),
                ],
              ),
            ),
          if (sanction != null)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 10,
              ),
              color: Cp.gold.withValues(alpha: 0.25),
              child: Row(
                children: [
                  const Icon(
                    Icons.info_outlined,
                    color: Cp.navy,
                    size: 20,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      tr(
                        'Votre accès à cette conversation est restreint (${libelleActionModeration(sanction)}).',
                      ),
                      style: const TextStyle(fontSize: 13),
                    ),
                  ),
                  TextButton(
                    onPressed: () => go(
                      context,
                      MesSignalementsScreen(apiClient: widget.apiClient),
                    ),
                    child: Text(tr('Contester')),
                  ),
                ],
              ),
            ),
          Expanded(
            child: Stack(
              children: [
                _chargement
                    ? const Center(child: CircularProgressIndicator())
                : _erreur != null
                    ? EmptyNote(
                        icon: Icons.cloud_off_outlined,
                        text: tr(
                          'Les messages sont indisponibles pour l’instant. Vérifiez votre connexion, puis réessayez.',
                        ),
                        action: SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: FilledButton(
                            onPressed: _charger,
                            child: Text(tr('Réessayer')),
                          ),
                        ),
                      )
                    : _messages.isEmpty
                        ? EmptyNote(
                            icon: Icons.chat_bubble_outline,
                            text: tr(
                              'Aucun message pour l’instant.\nÉcrivez le premier.',
                            ),
                          )
                        : ListView.builder(
                            controller: _defilementController,
                            // Messages ancrés en bas, 19 nov. 2026 :
                            // comme WhatsApp, une courte conversation
                            // se lit en bas, au dessus du champ, pas
                            // en haut avec un grand vide en dessous.
                            reverse: true,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 8,
                            ),
                            itemCount: _messages.length,
                            itemBuilder: (context, index) {
                              final message =
                                  _messages[_messages.length - 1 - index];
                              final mien = _monMembreId != null &&
                                  message.senderId == _monMembreId;
                              final nom = widget.nomsMembres[message.senderId] ??
                                  message.senderNom;
                              if (message.type == 'appel_manque') {
                                return _LigneAppelManque(
                                  message: message,
                                  suisAppelant: _monMembreId != null &&
                                      message.senderId == _monMembreId,
                                  onRappeler: () => _appeler(
                                    message.content == 'video'
                                        ? 'video'
                                        : 'audio',
                                  ),
                                );
                              }
                              return GestureDetector(
                                onLongPress: () =>
                                    _menuMessage(message, mien),
                                child: _Bulle(
                                  message: message,
                                  mien: mien,
                                  nomExpediteur:
                                      widget.conversation.estGroupe &&
                                              !mien
                                          ? nom
                                          : null,
                                ),
                              );
                            },
                          ),
              ],
            ),
          ),
          if (reponsesDesactivees)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 12,
              ),
              color: Cp.paper,
              child: Text(
                tr('Les réponses sont désactivées sur ce canal.'),
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 13),
              ),
            )
          // Aide de la structure, 21 nov. 2026, carte 4 : demande
          // résolue, le membre rouvre avant d'écrire de nouveau.
          else if (aideSansEcriture)
            Container(
              width: double.infinity,
              padding: EdgeInsets.only(
                left: 16,
                right: 16,
                top: 8,
                bottom: basSaisie,
              ),
              color: Cp.paper,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    tr('Cette demande est résolue. Rouvre-la pour écrire de nouveau.'),
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 13),
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: FilledButton(
                      onPressed: _actionAideEnCours
                          ? null
                          : _rouvrirDemande,
                      child: Text(tr('Rouvrir ma demande')),
                    ),
                  ),
                ],
              ),
            )
          else if (_enregistrementVocal || _vocalApercu != null)
            Container(
              padding: EdgeInsets.only(
                left: 12,
                right: 12,
                top: 8,
                bottom: basSaisie,
              ),
              color: Cp.paper,
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.delete_outline),
                    tooltip: tr('Jeter'),
                    color: Cp.danger,
                    onPressed: _annulerVocal,
                  ),
                  if (_vocalApercu != null)
                    Expanded(
                      child: LecteurAudio(
                        chargerSource: () async => AudioSource.uri(
                          Uri.dataFromBytes(
                            _vocalApercu!.octets,
                            mimeType: _vocalApercu!.mime,
                          ),
                        ),
                        duree: Duration(milliseconds: _vocalApercu!.dureeMs),
                        niveaux: _niveauxVocal,
                        couleur: Cp.navy,
                        couleurTexte: Cp.inkMuted,
                      ),
                    )
                  else ...[
                    Container(
                      width: 10,
                      height: 10,
                      decoration: const BoxDecoration(
                        color: Colors.red,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      formaterDureeMagnetophone(_ecouleVocal),
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: Cp.navy,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: FormeOnde(
                        niveaux: _niveauxVocal,
                        couleur: Cp.navy,
                        hauteur: 32,
                      ),
                    ),
                    const SizedBox(width: 8),
                    SizedBox(
                      width: 48,
                      height: 48,
                      child: IconButton(
                        icon: const Icon(Icons.stop),
                        tooltip: tr('Arrêter'),
                        color: Colors.white,
                        style: IconButton.styleFrom(
                          backgroundColor: Cp.navy,
                        ),
                        onPressed: _arreterVocal,
                      ),
                    ),
                  ],
                  if (_vocalApercu != null)
                    SizedBox(
                      width: 48,
                      height: 48,
                      child: IconButton(
                        icon: const Icon(Icons.send),
                        tooltip: tr('Envoyer'),
                        color: Colors.white,
                        style: IconButton.styleFrom(
                          backgroundColor: Cp.navy,
                        ),
                        onPressed:
                            _envoiVocalEnCours ? null : _envoyerVocal,
                      ),
                    ),
                ],
              ),
            )
          else
            Container(
              padding: EdgeInsets.only(
                left: 12,
                right: 12,
                top: 8,
                bottom: basSaisie,
              ),
              color: Cp.paper,
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _saisieController,
                      // 16 px minimum : Safari iPhone ne zoome pas.
                      style: const TextStyle(fontSize: 16),
                      decoration: InputDecoration(
                        hintText: tr('Écrire un message…'),
                        border: const OutlineInputBorder(),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 12,
                        ),
                      ),
                      minLines: 1,
                      maxLines: 4,
                      textInputAction: TextInputAction.send,
                      onSubmitted: (_) => _envoyer(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  SizedBox(
                    width: 48,
                    height: 48,
                    child: IconButton(
                      icon: const Icon(Icons.mic_outlined),
                      tooltip: tr('Message vocal'),
                      color: Cp.navy,
                      onPressed: _envoiEnCours ? null : _demarrerVocal,
                    ),
                  ),
                  const SizedBox(width: 8),
                  SizedBox(
                    width: 48,
                    height: 48,
                    child: IconButton(
                      icon: const Icon(Icons.send),
                      tooltip: tr('Envoyer'),
                      color: Colors.white,
                      style: IconButton.styleFrom(
                        backgroundColor: Cp.navy,
                      ),
                      onPressed: _envoiEnCours ? null : _envoyer,
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

/// Une bulle de message : à droite sur bleu nuit pour mes messages,
/// à gauche sur blanc pour les autres. L'heure est sous la bulle,
/// en bleu nuit atténué sur fond papier, jamais en blanc atténué
/// sur bleu nuit. Contrastes WCAG AA : blanc sur bleu nuit, bleu
/// nuit sur blanc.
class _Bulle extends StatelessWidget {
  final MessageMessagerie message;
  final bool mien;
  final String? nomExpediteur;

  const _Bulle({
    required this.message,
    required this.mien,
    this.nomExpediteur,
  });

  @override
  Widget build(BuildContext context) {
    final heure = message.createdAt == null
        ? ''
        : heureCourteConversation(message.createdAt);
    return Align(
      alignment: mien ? Alignment.centerRight : Alignment.centerLeft,
      child: ConstrainedBox(
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.78,
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 3),
          child: Column(
            crossAxisAlignment:
                mien ? CrossAxisAlignment.end : CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
                decoration: BoxDecoration(
                  color: mien ? Cp.navy : Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: mien
                      ? null
                      : Border.all(color: Cp.navy.withValues(alpha: 0.2)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (nomExpediteur != null) ...[
                      Text(
                        nomExpediteur!,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Cp.navy,
                        ),
                      ),
                      const SizedBox(height: 2),
                    ],
                    if (message.type == 'audio' &&
                        !message.supprime &&
                        message.audioUrl != null &&
                        message.audioUrl!.isNotEmpty)
                      // Largeur adaptée à la bulle, 240 au plus : le
                      // lecteur ne déborde jamais, même sur un petit
                      // écran ou avec une longue durée.
                      LayoutBuilder(
                        builder: (context, contraintes) => SizedBox(
                          width: math.min(
                            240,
                            contraintes.maxWidth.isFinite
                                ? contraintes.maxWidth
                                : 240,
                          ),
                          child: LecteurAudio(
                            chargerSource: () async => AudioSource.uri(
                              Uri.parse(message.audioUrl!),
                            ),
                            duree: Duration(
                              seconds: message.dureeSecondes ?? 0,
                            ),
                            couleur: mien ? Colors.white : Cp.navy,
                            couleurTexte:
                                mien ? Colors.white70 : Cp.inkMuted,
                          ),
                        ),
                      )
                    else
                      Text(
                        // Message supprimé, 21 nov. 2026, carte 3 :
                        // le contenu d'origine ne s'affiche plus,
                        // seulement « Message supprimé », en italique.
                        message.supprime
                            ? tr('Message supprimé')
                            : message.content,
                        style: TextStyle(
                          fontSize: 15,
                          fontStyle: message.supprime
                              ? FontStyle.italic
                              : FontStyle.normal,
                          color: message.supprime
                              ? (mien ? Colors.white70 : Cp.inkMuted)
                              : (mien ? Colors.white : Cp.navy),
                        ),
                      ),
                  ],
                ),
              ),
              if (heure.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 2, left: 4, right: 4),
                  child: Text(
                    // Message modifié, 21 nov. 2026, carte 3.
                    message.modifie ? '$heure · ${tr('Modifié')}' : heure,
                    style: const TextStyle(
                      fontSize: 11,
                      color: Cp.inkMuted,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Ligne d'appel manqué, façon WhatsApp : centrée, pas une bulle,
/// pas de signalement au toucher long. L'appelé voit « Appel
/// manqué » en rouge, l'appelant « Appel sans réponse », avec
/// l'heure et un bouton Rappeler du même type d'appel.
class _LigneAppelManque extends StatelessWidget {
  final MessageMessagerie message;
  final bool suisAppelant;
  final VoidCallback onRappeler;

  const _LigneAppelManque({
    required this.message,
    required this.suisAppelant,
    required this.onRappeler,
  });

  @override
  Widget build(BuildContext context) {
    final heure = message.createdAt == null
        ? ''
        : heureCourteConversation(message.createdAt);
    final manque = !suisAppelant;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Center(
        child: Container(
          padding: const EdgeInsets.fromLTRB(8, 6, 6, 6),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(999),
            boxShadow: [
              BoxShadow(
                color: Cp.navy.withValues(alpha: 0.08),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: manque
                      ? Cp.danger.withValues(alpha: 0.12)
                      : Cp.navy.withValues(alpha: 0.10),
                ),
                child: Icon(
                  Icons.call,
                  size: 15,
                  color: manque ? Cp.danger : Cp.navy,
                ),
              ),
              const SizedBox(width: 6),
              Text(
                manque ? tr('Appel manqué') : tr('Appel sans réponse'),
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: manque ? Cp.danger : Cp.navy,
                ),
              ),
              if (heure.isNotEmpty) ...[
                const SizedBox(width: 6),
                Text(
                  heure,
                  style: const TextStyle(fontSize: 12, color: Cp.inkMuted),
                ),
              ],
              const SizedBox(width: 8),
              TextButton(
                onPressed: onRappeler,
                style: TextButton.styleFrom(
                  backgroundColor: Cp.gold,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  minimumSize: Size.zero,
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(999)),
                  ),
                ),
                child: Text(
                  tr('Rappeler'),
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: Cp.navy,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Modale de signalement, spécification v2, sections 5.1 et 6.
/// Motif, description facultative de 500 caractères maximum,
/// destinataire (établissement ou administrateur général), avec
/// une phrase qui explique clairement qui verra le signalement
/// avant l'envoi. Le contenu visé est copié au moment du
/// signalement : une suppression ultérieure par l'auteur ne fait
/// pas disparaître la preuve.
Future<void> ouvrirFeuilleSignalement(
  BuildContext context, {
  required ApiClient apiClient,
  required String cibleType,
  required String cibleId,
  required String contenuFige,
}) async {
  await showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    builder: (context) => _FeuilleSignalement(
      apiClient: apiClient,
      cibleType: cibleType,
      cibleId: cibleId,
      contenuFige: contenuFige,
    ),
  );
}

class _FeuilleSignalement extends StatefulWidget {
  final ApiClient apiClient;
  final String cibleType;
  final String cibleId;
  final String contenuFige;

  const _FeuilleSignalement({
    required this.apiClient,
    required this.cibleType,
    required this.cibleId,
    required this.contenuFige,
  });

  @override
  State<_FeuilleSignalement> createState() => _FeuilleSignalementState();
}

class _FeuilleSignalementState extends State<_FeuilleSignalement> {
  String _motif = 'harcelement';
  String _destinataire = 'etablissement';
  final _descriptionController = TextEditingController();
  bool _enCours = false;
  String? _erreur;

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _envoyer() async {
    if (_enCours) return;
    setState(() {
      _enCours = true;
      _erreur = null;
    });
    try {
      await widget.apiClient.signalerContenu(
        cibleType: widget.cibleType,
        cibleId: widget.cibleId,
        motif: _motif,
        description: _descriptionController.text.trim().isEmpty
            ? null
            : _descriptionController.text.trim(),
        destinataire: _destinataire,
      );
      if (!mounted) return;
      Navigator.of(context).pop();
      toast(context, tr('Signalement envoyé. Merci.'));
    } catch (e) {
      if (mounted) {
        setState(() {
          _enCours = false;
          _erreur = e.toString();
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: 16,
        right: 16,
        top: 16,
        bottom: MediaQuery.of(context).viewInsets.bottom + 16,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            tr('Signaler'),
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Cp.paper,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Cp.line),
            ),
            child: Text(
              widget.contenuFige,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontSize: 14),
            ),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            value: _motif,
            // 16 px minimum : Safari iPhone ne zoome pas.
            style: const TextStyle(fontSize: 16, color: Cp.ink),
            decoration: InputDecoration(labelText: tr('Motif')),
            items: [
              for (final motif in motifsSignalement)
                DropdownMenuItem(
                  value: motif,
                  child: Text(libelleMotifSignalement(motif)),
                ),
            ],
            onChanged: (valeur) => setState(
              () => _motif = valeur ?? 'autre',
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _descriptionController,
            // 16 px minimum : Safari iPhone ne zoome pas.
            style: const TextStyle(fontSize: 16),
            decoration: InputDecoration(
              labelText: tr('Description (facultative)'),
              hintText: tr('Précisez ce qui s’est passé.'),
            ),
            maxLength: 500,
            minLines: 1,
            maxLines: 4,
          ),
          Text(
            tr('Destinataire'),
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
          for (final destinataire in destinatairesSignalement)
            RadioListTile<String>(
              contentPadding: EdgeInsets.zero,
              title: Text(
                libelleDestinataireSignalement(destinataire),
              ),
              value: destinataire,
              groupValue: _destinataire,
              onChanged: (valeur) => setState(
                () => _destinataire = valeur ?? 'etablissement',
              ),
            ),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Cp.gold.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              phraseVisibiliteSignalement(_destinataire, _motif),
              style: const TextStyle(fontSize: 13),
            ),
          ),
          if (_erreur != null) ...[
            const SizedBox(height: 8),
            Text(
              _erreur!,
              style: const TextStyle(fontSize: 13, color: Cp.danger),
            ),
          ],
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: FilledButton(
              onPressed: _enCours ? null : _envoyer,
              child: _enCours
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : Text(tr('Envoyer le signalement')),
            ),
          ),
        ],
      ),
    );
  }
}

/// File de modération, spécification v2, section 6.
/// Administrateurs de la structure. Le serveur délimite la
/// file : file locale pour l'administrateur d'établissement,
/// file nationale pour l'administrateur général. File triée
/// par motif et statut, contexte figé du signalement, actions avec
/// note obligatoire, bouton « Dossier en conflit d’intérêts »
/// pour transférer.
class ModerationMessagerieScreen extends StatefulWidget {
  const ModerationMessagerieScreen({super.key, this.apiClient});

  /// Client injecté (tests) ; sinon le client global.
  final ApiClient? apiClient;

  @override
  State<ModerationMessagerieScreen> createState() =>
      _ModerationMessagerieScreenState();
}

class _ModerationMessagerieScreenState
    extends State<ModerationMessagerieScreen> {
  List<Signalement> _signalements = [];
  String? _filtreMotif;
  String? _filtreStatut;
  bool _chargement = true;
  String? _erreur;

  ApiClient get _api => widget.apiClient ?? api;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _chargement = true;
      _erreur = null;
    });
    try {
      final bruts = await _api.fetchSignalementsModeration(
        motif: _filtreMotif,
        statut: _filtreStatut,
      );
      final liste = bruts.map(Signalement.fromJson).toList();
      // Tri par date, le plus récent d'abord.
      liste.sort((a, b) {
        final da = a.createdAt ?? DateTime.fromMillisecondsSinceEpoch(0);
        final db = b.createdAt ?? DateTime.fromMillisecondsSinceEpoch(0);
        return db.compareTo(da);
      });
      if (!mounted) return;
      setState(() {
        _signalements = liste;
        _chargement = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur = e.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!app.isAdmin) {
      return basic(
        tr('Modération'),
        [
          EmptyNote(
            icon: Icons.shield_outlined,
            text: tr(
              'Accès réservé aux administrateurs de la structure.',
            ),
          ),
        ],
      );
    }
    if (_chargement) {
      return basic(
        tr('Modération'),
        [const Center(child: CircularProgressIndicator())],
      );
    }
    if (_erreur != null) {
      return basic(
        tr('Modération'),
        [
          EmptyNote(
            icon: Icons.cloud_off_outlined,
            text: tr(
              'La file de modération est indisponible pour l’instant. Vérifiez votre connexion, puis réessayez.',
            ),
            action: SizedBox(
              width: double.infinity,
              height: 48,
              child: FilledButton(
                onPressed: _charger,
                child: Text(tr('Réessayer')),
              ),
            ),
          ),
        ],
      );
    }
    return basic(
      tr('Modération'),
      [
        Row(
          children: [
            Expanded(
              child: DropdownButtonFormField<String?>(
                value: _filtreMotif,
                style: const TextStyle(fontSize: 16, color: Cp.ink),
                decoration: InputDecoration(
                  labelText: tr('Motif'),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                ),
                items: [
                  DropdownMenuItem<String?>(
                    value: null,
                    child: Text(tr('Tous les motifs')),
                  ),
                  for (final motif in motifsSignalement)
                    DropdownMenuItem<String?>(
                      value: motif,
                      child: Text(
                        libelleMotifSignalement(motif),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                ],
                onChanged: (valeur) => setState(() {
                  _filtreMotif = valeur;
                  _charger();
                }),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: DropdownButtonFormField<String?>(
                value: _filtreStatut,
                style: const TextStyle(fontSize: 16, color: Cp.ink),
                decoration: InputDecoration(
                  labelText: tr('Statut'),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                ),
                items: [
                  DropdownMenuItem<String?>(
                    value: null,
                    child: Text(tr('Tous les statuts')),
                  ),
                  for (final statut in [
                    'en_attente',
                    'en_cours',
                    'resolu',
                    'rejete',
                    'escalade',
                    'conteste',
                  ])
                    DropdownMenuItem<String?>(
                      value: statut,
                      child: Text(
                        libelleStatutSignalement(statut),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                ],
                onChanged: (valeur) => setState(() {
                  _filtreStatut = valeur;
                  _charger();
                }),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        if (_signalements.isEmpty)
          EmptyNote(
            icon: Icons.shield_outlined,
            text: tr('Aucun signalement dans cette file.'),
          )
        else
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.line),
            ),
            child: Column(
              children: [
                for (var i = 0; i < _signalements.length; i++) ...[
                  if (i > 0) const Divider(height: 1, color: Cp.line),
                  _TuileSignalement(
                    signalement: _signalements[i],
                    onTap: () async {
                      await _ouvrirDossier(_signalements[i]);
                      if (mounted) _charger();
                    },
                  ),
                ],
              ],
            ),
          ),
      ],
    );
  }

  Future<void> _ouvrirDossier(Signalement signalement) async {
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (context) => _FeuilleActionModeration(
        apiClient: _api,
        signalement: signalement,
      ),
    );
  }
}

/// Une ligne de la file : motif, statut, date, rapporteur,
/// aperçu du contenu figé.
class _TuileSignalement extends StatelessWidget {
  const _TuileSignalement({
    required this.signalement,
    required this.onTap,
  });

  final Signalement signalement;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final rapporteur = [
      if ((signalement.rapporteurNom ?? '').isNotEmpty)
        signalement.rapporteurNom!,
      if ((signalement.rapporteurMatricule ?? '').isNotEmpty)
        signalement.rapporteurMatricule!,
    ].join(' · ');
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: Cp.s2,
          vertical: 12,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: Cp.navy,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    libelleMotifSignalement(signalement.motif),
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: Cp.gold,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    libelleStatutSignalement(signalement.statut),
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Cp.navy,
                    ),
                  ),
                ),
                const Spacer(),
                Text(
                  dateCourteConversation(signalement.createdAt),
                  style: const TextStyle(
                    fontSize: 12,
                    color: Cp.inkMuted,
                  ),
                ),
              ],
            ),
            if (signalement.evidenceContenu.isNotEmpty) ...[
              const SizedBox(height: 6),
              Text(
                signalement.evidenceContenu,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 14),
              ),
            ],
            if (rapporteur.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(
                tr('Signalé par $rapporteur'),
                style: const TextStyle(
                  fontSize: 12,
                  color: Cp.inkMuted,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// Dossier de modération : contexte figé, actions avec note
/// obligatoire, transfert en cas de conflit d'intérêts.
class _FeuilleActionModeration extends StatefulWidget {
  final ApiClient apiClient;
  final Signalement signalement;

  const _FeuilleActionModeration({
    required this.apiClient,
    required this.signalement,
  });

  @override
  State<_FeuilleActionModeration> createState() =>
      _FeuilleActionModerationState();
}

class _FeuilleActionModerationState
    extends State<_FeuilleActionModeration> {
  String _action = 'avertir';
  int _dureeHeures = 24;
  final _noteController = TextEditingController();
  bool _enCours = false;
  String? _erreur;

  @override
  void dispose() {
    _noteController.dispose();
    super.dispose();
  }

  bool get _dureeRequise =>
      _action == 'sourdine' || _action == 'suspendre';

  bool get _valide => _noteController.text.trim().isNotEmpty;

  Future<void> _appliquer() async {
    if (!_valide || _enCours) return;
    setState(() {
      _enCours = true;
      _erreur = null;
    });
    try {
      await widget.apiClient.traiterSignalement(
        widget.signalement.id,
        action: _action,
        dureeHeures: _dureeRequise ? _dureeHeures : null,
        notes: _noteController.text.trim(),
      );
      if (!mounted) return;
      Navigator.of(context).pop();
      toast(context, tr('Décision enregistrée.'));
    } catch (e) {
      if (mounted) {
        setState(() {
          _enCours = false;
          _erreur = e.toString();
        });
      }
    }
  }

  Future<void> _transferer() async {
    final transfere = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      builder: (context) => _FeuilleTransfert(
        apiClient: widget.apiClient,
        signalement: widget.signalement,
      ),
    );
    if (transfere == true && mounted) {
      Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.signalement;
    return Padding(
      padding: EdgeInsets.only(
        left: 16,
        right: 16,
        top: 16,
        bottom: MediaQuery.of(context).viewInsets.bottom + 16,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            libelleMotifSignalement(s.motif),
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            tr(
              'Signalé le ${dateCourteConversation(s.createdAt)} · ${libelleStatutSignalement(s.statut)}',
            ),
            style: const TextStyle(fontSize: 13, color: Cp.inkMuted),
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Cp.paper,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Cp.line),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  tr('Contenu figé au moment du signalement'),
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: Cp.goldDeep,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  s.evidenceContenu.isNotEmpty
                      ? s.evidenceContenu
                      : tr('Contenu non disponible.'),
                  style: const TextStyle(fontSize: 14),
                ),
                if (s.evidenceAuteur.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(
                    tr(
                      'Auteur : ${s.evidenceAuteur} · ${dateCourteConversation(s.evidenceDate)}',
                    ),
                    style: const TextStyle(
                      fontSize: 12,
                      color: Cp.inkMuted,
                    ),
                  ),
                ],
              ],
            ),
          ),
          if ((s.description ?? '').isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(s.description!, style: const TextStyle(fontSize: 14)),
          ],
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            children: [
              for (final action in actionsModeration)
                ChoiceChip(
                  label: Text(libelleActionModeration(action)),
                  selected: _action == action,
                  onSelected: (_) =>
                      setState(() => _action = action),
                ),
            ],
          ),
          if (_dureeRequise) ...[
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: [
                for (final heures in dureesModerationHeures)
                  ChoiceChip(
                    label: Text(libelleDureeModeration(heures)),
                    selected: _dureeHeures == heures,
                    onSelected: (_) => setState(
                      () => _dureeHeures = heures,
                    ),
                  ),
              ],
            ),
          ],
          const SizedBox(height: 12),
          TextField(
            controller: _noteController,
            // 16 px minimum : Safari iPhone ne zoome pas.
            style: const TextStyle(fontSize: 16),
            decoration: InputDecoration(
              labelText: tr('Note motivée (obligatoire)'),
              hintText: tr('Pourquoi cette décision ?'),
            ),
            maxLines: 3,
            minLines: 1,
            onChanged: (_) => setState(() {}),
          ),
          if (_erreur != null) ...[
            const SizedBox(height: 8),
            Text(
              _erreur!,
              style: const TextStyle(fontSize: 13, color: Cp.danger),
            ),
          ],
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: FilledButton(
              onPressed: _valide && !_enCours ? _appliquer : null,
              child: _enCours
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : Text(tr('Appliquer la décision')),
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: OutlinedButton.icon(
              icon: const Icon(Icons.swap_horiz_outlined),
              label: Text(tr('Dossier en conflit d’intérêts')),
              onPressed: _enCours ? null : _transferer,
            ),
          ),
        ],
      ),
    );
  }
}

/// Transfert d'un dossier en conflit d'intérêts : aucune sanction
/// ne peut être prise par la personne qui a signalé le contenu ou
/// qui est concernée par celui-ci. Le serveur route le dossier
/// vers un autre responsable désigné par la structure.
class _FeuilleTransfert extends StatefulWidget {
  final ApiClient apiClient;
  final Signalement signalement;

  const _FeuilleTransfert({
    required this.apiClient,
    required this.signalement,
  });

  @override
  State<_FeuilleTransfert> createState() => _FeuilleTransfertState();
}

class _FeuilleTransfertState extends State<_FeuilleTransfert> {
  final _noteController = TextEditingController();
  bool _enCours = false;
  String? _erreur;

  @override
  void dispose() {
    _noteController.dispose();
    super.dispose();
  }

  Future<void> _transferer() async {
    final note = _noteController.text.trim();
    if (note.isEmpty || _enCours) return;
    setState(() {
      _enCours = true;
      _erreur = null;
    });
    try {
      await widget.apiClient.transfererSignalement(
        widget.signalement.id,
        notes: note,
      );
      if (!mounted) return;
      Navigator.of(context).pop(true);
      toast(context, tr('Dossier transféré.'));
    } catch (e) {
      if (mounted) {
        setState(() {
          _enCours = false;
          _erreur = e.toString();
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: 16,
        right: 16,
        top: 16,
        bottom: MediaQuery.of(context).viewInsets.bottom + 16,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            tr('Dossier en conflit d’intérêts'),
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(
              'Le dossier est transféré à un autre responsable désigné par la structure. Vous ne pourrez plus décider sur ce dossier.',
            ),
            style: const TextStyle(fontSize: 14),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _noteController,
            // 16 px minimum : Safari iPhone ne zoome pas.
            style: const TextStyle(fontSize: 16),
            decoration: InputDecoration(
              labelText: tr('Motif du transfert (obligatoire)'),
            ),
            maxLines: 3,
            minLines: 1,
            onChanged: (_) => setState(() {}),
          ),
          if (_erreur != null) ...[
            const SizedBox(height: 8),
            Text(
              _erreur!,
              style: const TextStyle(fontSize: 13, color: Cp.danger),
            ),
          ],
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: FilledButton(
              onPressed:
                  _noteController.text.trim().isNotEmpty && !_enCours
                      ? _transferer
                      : null,
              child: _enCours
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : Text(tr('Transférer le dossier')),
            ),
          ),
        ],
      ),
    );
  }
}

/// Mes signalements et mes sanctions, spécification v2, section 5.5.
/// Le rapporteur est informé de la clôture, sans détail des
/// sanctions prises à l'égard d'un tiers. Toute sanction peut être
/// contestée dans les 15 jours, depuis cet écran.
class MesSignalementsScreen extends StatefulWidget {
  const MesSignalementsScreen({super.key, this.apiClient});

  /// Client injecté (tests) ; sinon le client global.
  final ApiClient? apiClient;

  @override
  State<MesSignalementsScreen> createState() =>
      _MesSignalementsScreenState();
}

class _MesSignalementsScreenState extends State<MesSignalementsScreen> {
  List<Signalement> _signalements = [];
  List<SanctionMessagerie> _sanctions = [];
  bool _chargement = true;
  String? _erreur;

  ApiClient get _api => widget.apiClient ?? api;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _chargement = true;
      _erreur = null;
    });
    try {
      final brutsSignalements = await _api.fetchMesSignalements();
      final brutsSanctions = await _api.fetchMesSanctions();
      if (!mounted) return;
      setState(() {
        _signalements =
            brutsSignalements.map(Signalement.fromJson).toList();
        _sanctions =
            brutsSanctions.map(SanctionMessagerie.fromJson).toList();
        _chargement = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur = e.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_chargement) {
      return basic(
        tr('Mes signalements'),
        [const Center(child: CircularProgressIndicator())],
      );
    }
    if (_erreur != null) {
      return basic(
        tr('Mes signalements'),
        [
          EmptyNote(
            icon: Icons.cloud_off_outlined,
            text: tr(
              'Vos signalements sont indisponibles pour l’instant. Vérifiez votre connexion, puis réessayez.',
            ),
            action: SizedBox(
              width: double.infinity,
              height: 48,
              child: FilledButton(
                onPressed: _charger,
                child: Text(tr('Réessayer')),
              ),
            ),
          ),
        ],
      );
    }
    return basic(
      tr('Mes signalements'),
      [
        Text(
          tr('Mes signalements'),
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        if (_signalements.isEmpty)
          EmptyNote(
            icon: Icons.flag_outlined,
            text: tr('Vous n’avez envoyé aucun signalement.'),
          )
        else
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.line),
            ),
            child: Column(
              children: [
                for (var i = 0; i < _signalements.length; i++) ...[
                  if (i > 0) const Divider(height: 1, color: Cp.line),
                  _TuileMonSignalement(
                    signalement: _signalements[i],
                  ),
                ],
              ],
            ),
          ),
        const SizedBox(height: 16),
        Text(
          tr('Sanctions me concernant'),
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        if (_sanctions.isEmpty)
          EmptyNote(
            icon: Icons.shield_outlined,
            text: tr('Aucune sanction ne vous concerne.'),
          )
        else
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.line),
            ),
            child: Column(
              children: [
                for (var i = 0; i < _sanctions.length; i++) ...[
                  if (i > 0) const Divider(height: 1, color: Cp.line),
                  _TuileMaSanction(
                    sanction: _sanctions[i],
                    apiClient: _api,
                    onConteste: _charger,
                  ),
                ],
              ],
            ),
          ),
      ],
    );
  }
}

/// Une ligne de mes signalements : motif, statut, date.
class _TuileMonSignalement extends StatelessWidget {
  const _TuileMonSignalement({required this.signalement});

  final Signalement signalement;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: Cp.s2,
        vertical: 12,
      ),
      child: Row(
        children: [
          const Icon(Icons.flag_outlined, color: Cp.navy, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  libelleMotifSignalement(signalement.motif),
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 2),
                Text(
                  '${libelleStatutSignalement(signalement.statut)} · ${dateCourteConversation(signalement.createdAt)}',
                  style: const TextStyle(
                    fontSize: 12,
                    color: Cp.inkMuted,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Une sanction me concernant, avec le recours dans les 15 jours.
class _TuileMaSanction extends StatelessWidget {
  const _TuileMaSanction({
    required this.sanction,
    required this.apiClient,
    required this.onConteste,
  });

  final SanctionMessagerie sanction;
  final ApiClient apiClient;
  final VoidCallback onConteste;

  @override
  Widget build(BuildContext context) {
    final contestable = sanction.contestable;
    final jours = sanction.date == null
        ? 0
        : joursRestantsRecours(sanction.date!);
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: Cp.s2,
        vertical: 12,
      ),
      child: Row(
        children: [
          const Icon(Icons.gavel_outlined, color: Cp.navy, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  libelleActionModeration(sanction.action),
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 2),
                Text(
                  sanction.date == null
                      ? ''
                      : '${dateCourteConversation(sanction.date)}'
                          '${contestable ? ' · ${tr('Recours possible encore $jours jour(s)')}': ' · ${tr('Délai de recours dépassé')}'}',
                  style: const TextStyle(
                    fontSize: 12,
                    color: Cp.inkMuted,
                  ),
                ),
              ],
            ),
          ),
          if (contestable)
            SizedBox(
              height: 48,
              child: OutlinedButton(
                onPressed: () async {
                  await ouvrirFeuilleContester(
                    context,
                    apiClient: apiClient,
                    sanction: sanction,
                  );
                  onConteste();
                },
                child: Text(tr('Contester')),
              ),
            ),
        ],
      ),
    );
  }
}

/// Feuille de recours, spécification v2, section 5.5 : toute
/// sanction peut être contestée dans les 15 jours, le recours est
/// traité par une personne différente de celle qui a décidé.
Future<void> ouvrirFeuilleContester(
  BuildContext context, {
  required ApiClient apiClient,
  required SanctionMessagerie sanction,
}) async {
  await showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    builder: (context) => _FeuilleContester(
      apiClient: apiClient,
      sanction: sanction,
    ),
  );
}

class _FeuilleContester extends StatefulWidget {
  final ApiClient apiClient;
  final SanctionMessagerie sanction;

  const _FeuilleContester({
    required this.apiClient,
    required this.sanction,
  });

  @override
  State<_FeuilleContester> createState() => _FeuilleContesterState();
}

class _FeuilleContesterState extends State<_FeuilleContester> {
  final _motifController = TextEditingController();
  bool _enCours = false;
  String? _erreur;

  @override
  void dispose() {
    _motifController.dispose();
    super.dispose();
  }

  Future<void> _envoyer() async {
    final motif = _motifController.text.trim();
    if (motif.isEmpty || _enCours) return;
    setState(() {
      _enCours = true;
      _erreur = null;
    });
    try {
      await widget.apiClient.contesterSanction(
        reportId: widget.sanction.signalementId,
        actionId: widget.sanction.actionId,
        motif: motif,
      );
      if (!mounted) return;
      Navigator.of(context).pop();
      toast(
        context,
        tr(
          'Recours envoyé. Une autre personne que celle qui a décidé le traitera.',
        ),
      );
    } catch (e) {
      if (mounted) {
        setState(() {
          _enCours = false;
          _erreur = e.toString();
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final jours = widget.sanction.date == null
        ? 0
        : joursRestantsRecours(widget.sanction.date!);
    return Padding(
      padding: EdgeInsets.only(
        left: 16,
        right: 16,
        top: 16,
        bottom: MediaQuery.of(context).viewInsets.bottom + 16,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            tr('Contester la sanction'),
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(
              'Vous pouvez contester cette sanction (${libelleActionModeration(widget.sanction.action)}) encore $jours jour(s). Le recours est traité par une personne différente de celle qui a décidé, avec une réponse sous 30 jours.',
            ),
            style: const TextStyle(fontSize: 14),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _motifController,
            // 16 px minimum : Safari iPhone ne zoome pas.
            style: const TextStyle(fontSize: 16),
            decoration: InputDecoration(
              labelText: tr('Pourquoi contestez-vous ?'),
              hintText: tr('Expliquez votre recours.'),
            ),
            maxLines: 4,
            minLines: 2,
            onChanged: (_) => setState(() {}),
          ),
          if (_erreur != null) ...[
            const SizedBox(height: 8),
            Text(
              _erreur!,
              style: const TextStyle(fontSize: 13, color: Cp.danger),
            ),
          ],
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: FilledButton(
              onPressed:
                  _motifController.text.trim().isNotEmpty && !_enCours
                      ? _envoyer
                      : null,
              child: _enCours
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : Text(tr('Envoyer le recours')),
            ),
          ),
        ],
      ),
    );
  }
}

/// Aide de la structure, 21 nov. 2026, carte 4 : le chat d'aide
/// avec la structure, qui remplace « Signaler un problème » et
/// « Signalements ». Un membre ouvre une demande avec un motif
/// simple, problème ou abus, et son message. Le Bureau voit la
/// file des demandes, ouvre le fil, répond dans le fil, et change
/// le statut : ouvert, en cours, résolu. Le fil lui-même est
/// l'écran de conversation de la Messagerie, même envoi, mêmes
/// notifications. Une demande résolue reste lisible, sans nouveau
/// message du membre sauf réouverture.
class AideScreen extends StatefulWidget {
  const AideScreen({super.key, this.apiClient});

  /// Client injecté (tests) ; sinon le client global.
  final ApiClient? apiClient;

  @override
  State<AideScreen> createState() => _AideScreenState();
}

class _AideScreenState extends State<AideScreen> {
  List<DemandeAide> _demandes = [];
  String? _filtreStatut;
  bool _chargement = true;
  String? _erreur;
  String? _monMembreId;

  ApiClient get _api => widget.apiClient ?? api;

  /// Vrai quand l'appelant est un responsable du Bureau : il voit
  /// la file des demandes, le membre voit seulement les siennes.
  bool get _estResponsable => app.isAdmin;

  @override
  void initState() {
    super.initState();
    _charger();
  }

  Future<void> _charger() async {
    setState(() {
      _chargement = true;
      _erreur = null;
    });
    try {
      final bruts = _estResponsable
          ? await _api.fetchFileAide(statut: _filtreStatut)
          : await _api.fetchMesDemandesAide();
      String? monMembreId;
      try {
        final moi = await _api.fetchMoi();
        monMembreId =
            (moi['id'] ?? moi['membre_id'] ?? moi['member_id'])
                ?.toString();
      } catch (_) {
        monMembreId = null;
      }
      if (!mounted) return;
      setState(() {
        _demandes = bruts.map(DemandeAide.fromJson).toList();
        _monMembreId = monMembreId;
        _chargement = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        _erreur = e.toString();
      });
    }
  }

  Future<void> _ouvrir(DemandeAide demande) async {
    try {
      // Le responsable qui ouvre une demande devient participant
      // du fil côté serveur, pour pouvoir y répondre.
      if (_estResponsable) {
        await _api.fetchDemandeAide(demande.id);
      }
    } catch (_) {
      // Sans la jonction, le fil reste ouvrable quand le
      // responsable est déjà participant, le serveur tranchera.
    }
    if (!mounted) return;
    final conversation = demande.toConversation();
    await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => MessagerieConversationScreen(
          conversation: conversation,
          titre: conversation.title ?? tr('Aide de la structure'),
          monMembreId: _monMembreId,
          apiClient: widget.apiClient,
          estResponsable: _estResponsable,
        ),
      ),
    );
    if (mounted) _charger();
  }

  Future<void> _nouvelleDemande() async {
    final creee = await _dialogueNouvelleDemande();
    if (creee == null || !mounted) return;
    final demande = DemandeAide.fromJson(creee);
    await _charger();
    if (mounted) _ouvrir(demande);
  }

  /// Formulaire d'ouverture : motif simple et message. Renvoie
  /// la demande créée par le serveur, ou null quand le membre
  /// ferme sans envoyer.
  Future<Map<String, dynamic>?> _dialogueNouvelleDemande() async {
    var motif = 'probleme';
    final message = TextEditingController();
    var enCours = false;
    String? erreur;
    final sortie = await showDialog<Map<String, dynamic>>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setDialog) => AlertDialog(
          title: Text(tr('Nouvelle demande d’aide')),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  tr('Un problème ou un abus, la structure vous répond dans ce fil.'),
                  style: const TextStyle(fontSize: 14),
                ),
                const SizedBox(height: 12),
                for (final choix in motifsAide)
                  RadioListTile<String>(
                    contentPadding: EdgeInsets.zero,
                    title: Text(libelleMotifAide(choix)),
                    value: choix,
                    groupValue: motif,
                    onChanged: (valeur) =>
                        setDialog(() => motif = valeur ?? 'probleme'),
                  ),
                TextField(
                  controller: message,
                  style: const TextStyle(fontSize: 16),
                  decoration: InputDecoration(
                    labelText: tr('Votre message'),
                    hintText: tr('Décrivez ce qui s’est passé.'),
                  ),
                  minLines: 3,
                  maxLines: 6,
                  maxLength: 5000,
                ),
                if (erreur != null) ...[
                  const SizedBox(height: 8),
                  Text(
                    erreur!,
                    style: const TextStyle(
                      fontSize: 13,
                      color: Cp.danger,
                    ),
                  ),
                ],
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(ctx).pop(),
              child: Text(tr('Annuler')),
            ),
            FilledButton(
              onPressed: enCours
                  ? null
                  : () async {
                      final texte = message.text.trim();
                      if (texte.isEmpty) {
                        setDialog(
                          () => erreur = tr('Écris ton message avant d’envoyer.'),
                        );
                        return;
                      }
                      setDialog(() {
                        enCours = true;
                        erreur = null;
                      });
                      try {
                        final brut = await _api.creerDemandeAide(
                          motif: motif,
                          message: texte,
                        );
                        if (ctx.mounted) Navigator.of(ctx).pop(brut);
                      } catch (e) {
                        if (ctx.mounted) {
                          setDialog(() {
                            enCours = false;
                            erreur = e.toString();
                          });
                        }
                      }
                    },
              child: Text(tr('Envoyer')),
            ),
          ],
        ),
      ),
    );
    message.dispose();
    return sortie;
  }

  @override
  Widget build(BuildContext context) {
    if (_chargement) {
      return basic(
        tr('Aide de la structure'),
        [const Center(child: CircularProgressIndicator())],
      );
    }
    if (_erreur != null) {
      return basic(
        tr('Aide de la structure'),
        [
          EmptyNote(
            icon: Icons.cloud_off_outlined,
            text: tr(
              'Vos demandes sont indisponibles pour l’instant. Vérifiez votre connexion, puis réessayez.',
            ),
            action: SizedBox(
              width: double.infinity,
              height: 48,
              child: FilledButton(
                onPressed: _charger,
                child: Text(tr('Réessayer')),
              ),
            ),
          ),
        ],
      );
    }
    return basic(
      tr('Aide de la structure'),
      [
        Text(
          _estResponsable
              ? tr('Demandes des membres, par statut. Ouvrez un fil pour répondre et changer son statut.')
              : tr('Un problème ou un abus, écrivez à la structure. Elle vous répond dans ce fil.'),
          style: const TextStyle(fontSize: 14),
        ),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: FilledButton(
            onPressed: _nouvelleDemande,
            child: Text(tr('Nouvelle demande')),
          ),
        ),
        const SizedBox(height: 12),
        if (_estResponsable) ...[
          DropdownButtonFormField<String>(
            value: _filtreStatut,
            style: const TextStyle(fontSize: 16, color: Cp.ink),
            decoration: InputDecoration(labelText: tr('Statut')),
            items: [
              DropdownMenuItem<String>(
                value: null,
                child: Text(tr('Tous les statuts')),
              ),
              for (final statut in statutsAide)
                DropdownMenuItem<String>(
                  value: statut,
                  child: Text(libelleStatutAide(statut)),
                ),
            ],
            onChanged: (valeur) {
              setState(() => _filtreStatut = valeur);
              _charger();
            },
          ),
          const SizedBox(height: 12),
        ],
        if (_demandes.isEmpty)
          EmptyNote(
            icon: Icons.help_outline,
            text: _estResponsable
                ? tr('Aucune demande d’aide pour le moment.')
                : tr('Vous n’avez envoyé aucune demande d’aide.'),
          )
        else
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Cp.line),
            ),
            child: Column(
              children: [
                for (var i = 0; i < _demandes.length; i++) ...[
                  if (i > 0) const Divider(height: 1, color: Cp.line),
                  _TuileDemandeAide(
                    demande: _demandes[i],
                    montreDemandeur: _estResponsable,
                    onTap: () => _ouvrir(_demandes[i]),
                  ),
                ],
              ],
            ),
          ),
      ],
    );
  }
}

/// Une ligne de demande d'aide : motif, statut, demandeur pour le
/// Bureau, date du dernier message.
class _TuileDemandeAide extends StatelessWidget {
  const _TuileDemandeAide({
    required this.demande,
    required this.montreDemandeur,
    required this.onTap,
  });

  final DemandeAide demande;
  final bool montreDemandeur;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: Cp.s2,
          vertical: 12,
        ),
        child: Row(
          children: [
            const Icon(Icons.help_outline, color: Cp.navy, size: 20),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    demande.titre ??
                        libelleMotifAide(demande.motif),
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${libelleStatutAide(demande.statut)}'
                    '${montreDemandeur && demande.demandeurNom != null ? ' · ${demande.demandeurNom}' : ''}'
                    ' · ${dateCourteConversation(demande.lastMessageAt ?? demande.createdAt)}',
                    style: const TextStyle(
                      fontSize: 12,
                      color: Cp.inkMuted,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.chevron_right_outlined,
              color: Colors.black38,
              size: 20,
            ),
          ],
        ),
      ),
    );
  }
}
