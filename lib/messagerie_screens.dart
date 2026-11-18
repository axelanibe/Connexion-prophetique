// Écrans Messagerie et Signalement, 16 nov. 2026, lot application.
// Port du module e-System (spécification v2, sections 2, 6, 10, 11),
// adapté à la structure plate de CONNEXION PROPHÉTIQUE : ce fichier
// importe lib/main.dart pour les aides partagées (couleurs, textes,
// navigation, modèles), comme lib/admin_pages.dart ; le cycle import
// différé / import direct est accepté par Dart. Import différé
// depuis main.dart, par goMessagerie, jamais au démarrage.
// Palette CONNEXION PROPHÉTIQUE partout : bleu nuit #0B1F3A, or
// #D4A72C, fond papier #F5F6FA, jamais le violet et or de e-System.
// Pas de WebSocket côté serveur pour les messages :
// interrogation HTTP toutes les 15 secondes quand la conversation
// est ouverte. Les appels audio et vidéo, eux, ont leur propre
// WebSocket de signalisation (/messagerie/ws, 16 nov. 2026),
// avec interrogation HTTP toutes les 2 secondes en repli. Champs à 16 px
// minimum, cibles tactiles de 48 px minimum, bulles vérifiées
// WCAG AA (blanc sur bleu nuit, bleu nuit sur blanc).
import 'dart:async';

import 'package:flutter/material.dart';

import 'api.dart';
import 'appels.dart';
import 'appels_screens.dart';
import 'i18n.dart';
import 'main.dart';
import 'messagerie.dart';

/// Monogramme CP en filigrane au centre du fond de la messagerie,
/// 18 nov. 2026 : opacité 6 %, taille 240, jamais cliquable, les
/// bulles et les textes passent au-dessus. L'image n'a pas de
/// transparence (carré noir) : à 6 % elle rend un carré gris très
/// clair avec le CP en filigrane, discret, vérifié en aperçu.
class FiligraneMessagerie extends StatelessWidget {
  const FiligraneMessagerie({super.key});

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Opacity(
        opacity: 0.06,
        child: Image.asset(
          'assets/cp_monogram.png',
          width: 240,
          height: 240,
          fit: BoxFit.contain,
          filterQuality: FilterQuality.high,
          errorBuilder: (_, __, ___) => const SizedBox.shrink(),
        ),
      ),
    );
  }
}

/// Liste des conversations, spécification v2, section 6.
/// Filtres Toutes, Directes, Groupes, Pastorale, état vide
/// chaleureux, pastille or de non lus par conversation, aperçu du
/// dernier message. Le serveur ne renvoie ni aperçu ni non lus :
/// ils sont calculés ici, à partir des messages lus pour chaque
/// conversation. La liste se recharge à chaque ouverture et au
/// retour d'une conversation, pour que les lectures marquées
/// remettent le badge à jour.
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

  ApiClient get _api => widget.apiClient ?? api;

  @override
  void initState() {
    super.initState();
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
          final liste = messages
              .map(MessageMessagerie.fromJson)
              .toList();
          enrichies.add(
            conversation.copyWith(
              dernierMessage: liste.isEmpty
                  ? null
                  : liste.last.content,
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
    switch (_filtre) {
      case 'directe':
        return _conversations
            .where((c) => c.type == 'directe')
            .toList();
      case 'groupes':
        return _conversations.where((c) => c.estGroupe).toList();
      case 'pastorale':
        return _conversations
            .where((c) => c.type == 'pastorale')
            .toList();
      default:
        return _conversations;
    }
  }

  /// Nom affiché : titre quand il existe, sinon, pour une directe,
  /// le nom de l'autre membre renvoyé par la route liste, sinon
  /// un libellé neutre. Sans l'autre membre, on ne sait pas avec
  /// qui l'on cause : le libellé générique reste le repli.
  String _nomAffiche(ConversationMessagerie conversation) {
    if (conversation.title != null &&
        conversation.title!.trim().isNotEmpty) {
      return conversation.title!.trim();
    }
    if (conversation.type == 'directe') {
      final autre = conversation.autreNom?.trim();
      if (autre != null && autre.isNotEmpty) return autre;
      return 'Conversation directe';
    }
    if (conversation.type == 'pastorale') return 'Conversation pastorale';
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
    final actions = <Widget>[
      IconButton(
        icon: const Icon(Icons.add_outlined),
        tooltip: tr('Nouvelle conversation'),
        onPressed: _nouvelleConversation,
      ),
      IconButton(
        icon: const Icon(Icons.flag_outlined),
        tooltip: tr('Mes signalements'),
        onPressed: () => go(
          context,
          MesSignalementsScreen(apiClient: widget.apiClient),
        ),
      ),
      if (app.isAdmin)
        IconButton(
          icon: const Icon(Icons.shield_outlined),
          tooltip: tr('Modération'),
          onPressed: () => go(
            context,
            ModerationMessagerieScreen(apiClient: widget.apiClient),
          ),
        ),
    ];
    if (_chargement) {
      return basic(
        tr('Messagerie'),
        [const Center(child: CircularProgressIndicator())],
        actions: actions,
        fond: const FiligraneMessagerie(),
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
        actions: actions,
        fond: const FiligraneMessagerie(),
      );
    }
    return basic(
      tr('Messagerie'),
      [
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              for (final (valeur, libelle) in const [
                ('toutes', 'Toutes'),
                ('directe', 'Directes'),
                ('groupes', 'Groupes'),
                ('pastorale', 'Pastorale'),
              ])
                Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(libelle),
                    selected: _filtre == valeur,
                    onSelected: (_) =>
                        setState(() => _filtre = valeur),
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        if (_filtrees.isEmpty)
          EmptyNote(
            icon: Icons.chat_bubble_outline,
            text: _filtre == 'toutes'
                ? tr(
                    'Aucune conversation pour l’instant.\nÉcrivez à un membre de la structure pour commencer.',
                  )
                : tr('Aucune conversation dans ce filtre.'),
            action: SizedBox(
              width: double.infinity,
              height: 48,
              child: FilledButton(
                onPressed: _nouvelleConversation,
                child: Text(tr('Nouvelle conversation')),
              ),
            ),
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
                  ),
                ],
              ],
            ),
          ),
      ],
      actions: actions,
      fond: const FiligraneMessagerie(),
    );
  }

  /// Création : type, puis membres de la même structure. La liste
  /// des membres vient de l'API, déjà limitée à la structure : un
  /// groupe ne mélange jamais deux structures, il n'y en a qu'une.
  Future<void> _nouvelleConversation() async {
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
      ),
    );
    if (creee != null && mounted) {
      await _ouvrir(creee);
    }
  }
}

/// Une ligne de conversation : avatar neutre, nom, heure, aperçu,
/// pastille or de non lus. Titre gras tant qu'il reste des non lus.
class _TuileConversation extends StatelessWidget {
  const _TuileConversation({
    required this.conversation,
    required this.nom,
    required this.onTap,
  });

  final ConversationMessagerie conversation;
  final String nom;
  final VoidCallback onTap;

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
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
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

  const _FeuilleNouvelleConversation({
    required this.membres,
    required this.apiClient,
  });

  @override
  State<_FeuilleNouvelleConversation> createState() =>
      _FeuilleNouvelleConversationState();
}

class _FeuilleNouvelleConversationState
    extends State<_FeuilleNouvelleConversation> {
  String _type = 'directe';
  final _titreController = TextEditingController();
  final _selection = <String>{};
  bool _tousLesMembres = false;
  bool _enCours = false;
  String? _erreur;

  @override
  void dispose() {
    _titreController.dispose();
    super.dispose();
  }

  /// Membres proposés : pour un groupe d'établissement, seulement
  /// ceux de mon établissement ; sinon tous les membres.
  List<MembreMessagerie> get _proposes {
    if (_type != 'groupe_etablissement') return widget.membres;
    final monEtab = (app.member?.etab ?? '').trim();
    if (monEtab.isEmpty) return widget.membres;
    final filtres = widget.membres
        .where((m) => m.etablissement.trim() == monEtab)
        .toList();
    return filtres.isEmpty ? widget.membres : filtres;
  }

  List<MembreMessagerie> get _selectionnes {
    if (_type == 'groupe_structure' && _tousLesMembres) {
      return widget.membres;
    }
    return widget.membres
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
                        '${widget.membres.length} membres seront ajoutés.',
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
/// conversation ; un appui long sur une bulle signale ce message.
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

  const MessagerieConversationScreen({
    super.key,
    required this.conversation,
    required this.titre,
    this.monMembreId,
    this.nomsMembres = const {},
    this.apiClient,
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
  bool _appelEnCours = false;
  String? _appelEntrantOuvertId;

  ApiClient get _api => widget.apiClient ?? api;

  @override
  void initState() {
    super.initState();
    _monMembreId = widget.monMembreId;
    _charger();
    // Interrogation HTTP toutes les 15 secondes tant que l'écran
    // est ouvert, pas de WebSocket côté serveur.
    _minuteur = Timer.periodic(
      const Duration(seconds: 15),
      (_) => _rafraichirSilencieux(),
    );
  }

  @override
  void dispose() {
    _minuteur?.cancel();
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
      setState(() {
        _messages =
            messages.map(MessageMessagerie.fromJson).toList();
        _chargement = false;
        _erreur = null;
      });
      _marquerLu();
      _defilerEnBas();
      _verifierAppelActif();
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
      final liste = messages.map(MessageMessagerie.fromJson).toList();
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
    } catch (_) {
      if (mounted) {
        setState(() => _rafraichissementEchoue = true);
      }
    }
  }

  /// Appel entrant : vérifié à chaque rafraîchissement (15 s) et
  /// au chargement. Conversations directes seulement, jamais les
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

  /// Appeler l'autre membre de cette conversation directe.
  /// Un seul appel actif à la fois : le serveur renvoie 409 si
  /// l'autre membre est déjà en appel.
  Future<void> _appeler(String type) async {
    if (_appelEnCours) return;
    setState(() => _appelEnCours = true);
    try {
      final brut = await _api.creerAppelConversation(
        widget.conversation.id,
        type: type,
      );
      final appel = AppelMessagerie.fromJson(brut);
      if (!mounted) return;
      setState(() => _appelEnCours = false);
      go(
        context,
        EcranAppelEnCours(
          appelId: appel.id,
          typeAppel: type,
          autreNom: widget.titre,
          suisAppelant: true,
          apiClient: widget.apiClient,
        ),
      );
    } catch (e) {
      if (!mounted) return;
      setState(() => _appelEnCours = false);
      toast(context, e.toString());
    }
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
      _defilementController.jumpTo(
        _defilementController.position.maxScrollExtent,
      );
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

  /// Titre de la conversation : photo et nom de l'autre membre
  /// pour une directe, titre seul sinon. La photo vient de la
  /// liste, qui la reçoit de la route liste.
  Widget _titreConversation() {
    final conversation = widget.conversation;
    if (conversation.type != 'directe') return Text(widget.titre);
    final photo = photoDataUrlProvider(conversation.autrePhoto);
    return Row(
      mainAxisSize: MainAxisSize.min,
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
          child: Text(
            widget.titre,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final reponsesDesactivees = widget.conversation.reponsesDesactivees;
    final sanction = widget.conversation.maSanction;
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
                const Center(child: FiligraneMessagerie()),
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
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 8,
                            ),
                            itemCount: _messages.length,
                            itemBuilder: (context, index) {
                              final message = _messages[index];
                              final mien = _monMembreId != null &&
                                  message.senderId == _monMembreId;
                              final nom = widget.nomsMembres[message.senderId] ??
                                  message.senderNom;
                              return GestureDetector(
                                onLongPress: () =>
                                    _signalerMessage(message),
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
          else
            Container(
              padding: EdgeInsets.only(
                left: 12,
                right: 12,
                top: 8,
                bottom: MediaQuery.of(context).viewInsets.bottom + 8,
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
                    Text(
                      message.content,
                      style: TextStyle(
                        fontSize: 15,
                        color: mien ? Colors.white : Cp.navy,
                      ),
                    ),
                  ],
                ),
              ),
              if (heure.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 2, left: 4, right: 4),
                  child: Text(
                    heure,
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
