// Nouvelle Messagerie, tranche T4, 26 nov. 2026.
// Onglets Appels à gauche, Discussions à droite, ouverture
// directement sur Discussions, même après un passage par les
// Appels. Filtre en pastilles Messages, Groupes, Tous : les
// groupes sont à part, avec leur nombre, jamais mélangés aux
// messages, sauf la discussion de la structure, épinglée en
// haut du filtre Messages. Rangée des membres en ligne,
// masquée dans le filtre Groupes. Boutons flottants, un par
// volet, en bas à droite au-dessus de la barre de navigation :
// Discussions, rond bleu nuit discussion et plus, pour démarrer
// une nouvelle discussion ; Appels, rond vert téléphone, pour
// lancer un nouvel appel. Chaque bouton suit son onglet,
// jamais ensemble, ils disparaissent dès qu'on quitte la
// Messagerie, le bouton vivant dans cette page seulement.
// Section Appels à part, dans son propre volet : effectués,
// reçus et manqués en rouge, chacun avec un bouton pour
// rappeler, badge rouge des manqués sur l'onglet Appels.
import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../messagerie.dart';
import 'modeles_messagerie.dart';
import 'page_conversation_messagerie.dart';
import 'palette.dart';
import 'veille_reseau.dart';

class PageMessagerie extends StatefulWidget {
  const PageMessagerie({super.key, required this.service, this.onRetour});
  final ServiceMessagerie service;

  /// Retour vers l'accueil, fourni par la coquille à la bascule.
  final VoidCallback? onRetour;

  @override
  State<PageMessagerie> createState() => _PageMessagerieState();
}

class _PageMessagerieState extends State<PageMessagerie> {
  static const _vertAppel = Color(0xFF188038);

  VoletMessagerie _volet = VoletMessagerie.discussions;
  FiltreMessagerie _filtre = FiltreMessagerie.messages;
  List<ConversationMessagerie> _conversations = [];
  Map<String, bool> _enLigne = {};
  List<AppelMessagerie> _appels = [];
  String? _monMembreId;
  bool _chargement = true;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    VeilleReseau.partage.ajouterReprise(_recharger);
    _charger();
  }

  @override
  void dispose() {
    VeilleReseau.partage.retirerReprise(_recharger);
    super.dispose();
  }

  /// Rechargement à la reprise du réseau, tranche T10 : sans
  /// vider les discussions, le contenu déjà affiché reste en
  /// place et se met à jour quand la réponse arrive.
  Future<void> _recharger() => _charger(silencieux: true);

  Future<void> _charger({bool silencieux = false}) async {
    final contenuDejaLa = _conversations.isNotEmpty;
    if (!silencieux || !contenuDejaLa) {
      setState(() {
        _chargement = true;
        _erreur = null;
      });
    }
    try {
      final monId = await widget.service.monMembreId();
      final conversations = await widget.service.chargerConversations();
      final enLigne = await widget.service.chargerPresence(conversations);
      final appels = await widget.service.chargerAppels();
      if (!mounted) return;
      setState(() {
        _monMembreId = monId;
        _conversations = conversations;
        _enLigne = enLigne;
        _appels = appels;
        _chargement = false;
        _erreur = null;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        // Les discussions déjà affichées restent en place,
        // l'écran d'erreur ne sort que quand il n'y a rien.
        if (!contenuDejaLa) {
          _erreur = 'La messagerie ne peut pas être chargée pour le moment.';
        }
      });
    }
  }

  /// Manqués : badge rouge sur l'onglet Appels. Sans marqueur
  /// de lecture des appels côté serveur, le badge compte les
  /// manqués de l'historique chargé, 50 derniers au plus.
  int get _nbManques => _appels.where((a) => a.manque).length;

  /// Discussion épinglée de la structure, en tête du filtre
  /// Messages et du filtre Tous.
  List<ConversationMessagerie> get _epinglees =>
      _conversations.where((c) => c.estDiscussionStructure).toList();

  List<ConversationMessagerie> get _filtrees {
    final liste = switch (_filtre) {
      FiltreMessagerie.messages => _conversations
          .where((c) => !c.estGroupe || c.estDiscussionStructure)
          .toList(),
      FiltreMessagerie.groupes => _conversations
          .where((c) => c.estGroupe && !c.estDiscussionStructure)
          .toList(),
      FiltreMessagerie.tous => List.of(_conversations),
    };
    final epinglees = _epinglees.where(liste.contains).toList();
    final autres = liste.where((c) => !c.estDiscussionStructure).toList();
    return [...epinglees, ...autres];
  }

  /// Membres en ligne : les autres participants des directes
  /// dont la présence répond en ligne. La rangée se masque
  /// dans le filtre Groupes et dans le volet Appels.
  List<ConversationMessagerie> get _enLigneDirectes => _conversations
      .where((c) => c.type == 'directe' && (_enLigne[c.id] ?? false))
      .toList();

  String _nomAffiche(ConversationMessagerie c) {
    if (c.title != null && c.title!.trim().isNotEmpty) {
      return c.title!.trim();
    }
    if (c.type == 'directe') {
      final autre = c.autreNom?.trim();
      if (autre != null && autre.isNotEmpty) return autre;
      final matricule = c.autreMatricule?.trim();
      if (matricule != null && matricule.isNotEmpty) return matricule;
      return 'Membre de la structure';
    }
    if (c.type == 'pastorale') return 'Conversation pastorale';
    if (c.type == 'aide') return 'Aide de la structure';
    return 'Groupe';
  }

  String _prenom(String nom) {
    final premier = nom.trim().split(RegExp(r'\s+')).firstOrNull ?? '';
    return premier.isEmpty ? nom : premier;
  }

  String _initiales(String nom) {
    final mots =
        nom.trim().split(RegExp(r'\s+')).where((m) => m.isNotEmpty).toList();
    if (mots.isEmpty) return '?';
    if (mots.length == 1) return mots.first[0].toUpperCase();
    return (mots.first[0] + mots[1][0]).toUpperCase();
  }

  String _dateCourte(DateTime? date) {
    if (date == null) return '';
    final maintenant = DateTime.now();
    final jour = DateTime(date.year, date.month, date.day);
    final aujourdHui =
        DateTime(maintenant.year, maintenant.month, maintenant.day);
    if (jour == aujourdHui) {
      final h = date.hour.toString().padLeft(2, '0');
      final m = date.minute.toString().padLeft(2, '0');
      return '$h:$m';
    }
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}';
  }

  Future<void> _ouvrir(ConversationMessagerie conversation) async {
    await Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => PageConversationMessagerie(
          service: widget.service,
          conversation: conversation,
          titre: _nomAffiche(conversation),
          monMembreId: _monMembreId,
        ),
      ),
    );
    if (mounted) _charger();
  }

  /// Directe existante avec ce membre, par matricule puis par
  /// nom : la création serveur ne dédoublonne pas, on rouvre
  /// la conversation existante au lieu d'en créer une seconde.
  ConversationMessagerie? _directeExistante(MembreMessagerie membre) {
    for (final c in _conversations) {
      if (c.type != 'directe') continue;
      final matricule = membre.matricule.trim();
      if (matricule.isNotEmpty && c.autreMatricule == matricule) return c;
      if (c.autreNom?.trim() == membre.nomComplet.trim() &&
          membre.nomComplet.trim().isNotEmpty) {
        return c;
      }
    }
    return null;
  }

  Future<ConversationMessagerie?> _directePour(
      MembreMessagerie membre) async {
    final existante = _directeExistante(membre);
    if (existante != null) return existante;
    try {
      return await widget.service.creerConversationDirecte(membre.id);
    } catch (_) {
      if (!mounted) return null;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('La discussion n’a pas pu être créée.')),
      );
      return null;
    }
  }

  Future<void> _nouvelleDiscussion() async {
    final membre = await showModalBottomSheet<MembreMessagerie>(
      context: context,
      isScrollControlled: true,
      builder: (ctx) => _FeuilleMembres(
        titre: 'Nouvelle discussion',
        onRechercher: widget.service.rechercherMembres,
      ),
    );
    if (membre == null || !mounted) return;
    final conversation = await _directePour(membre);
    if (conversation == null || !mounted) return;
    _ouvrir(conversation);
  }

  Future<void> _nouvelAppel() async {
    final membre = await showModalBottomSheet<MembreMessagerie>(
      context: context,
      isScrollControlled: true,
      builder: (ctx) => _FeuilleMembres(
        titre: 'Nouvel appel',
        onRechercher: widget.service.rechercherMembres,
      ),
    );
    if (membre == null || !mounted) return;
    final conversation = await _directePour(membre);
    if (conversation == null || !mounted) return;
    await _appeler(conversation, 'audio');
    if (!mounted) return;
    _ouvrir(conversation);
  }

  Future<void> _appeler(
      ConversationMessagerie conversation, String type) async {
    try {
      await widget.service.appeler(conversation.id, type: type);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Appel lancé.')),
      );
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('L’appel n’a pas pu être lancé.')),
      );
    }
  }

  Future<void> _rappeler(AppelMessagerie appel) async {
    final conversation = _conversations
        .where((c) => c.id == appel.conversationId)
        .firstOrNull;
    if (conversation == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('La discussion de cet appel est introuvable.')),
      );
      return;
    }
    await _appeler(conversation, appel.type);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      floatingActionButton: _chargement || _erreur != null
          ? null
          : _volet == VoletMessagerie.discussions
              ? FloatingActionButton(
                  key: const ValueKey('fabNouvelleDiscussion'),
                  tooltip: 'Nouvelle discussion',
                  backgroundColor: PaletteNouvelle.bleuNuit,
                  onPressed: _nouvelleDiscussion,
                  child: const Icon(LucideIcons.messageCirclePlus,
                      color: Colors.white, size: 26),
                )
              : FloatingActionButton(
                  key: const ValueKey('fabNouvelAppel'),
                  tooltip: 'Nouvel appel',
                  backgroundColor: _vertAppel,
                  onPressed: _nouvelAppel,
                  child: const Icon(LucideIcons.phone, color: Colors.white),
                ),
      body: SafeArea(
        child: Column(
          children: [
            _Bande(onRetour: widget.onRetour),
            _Onglets(
              volet: _volet,
              nbManques: _nbManques,
              onChoisir: (v) => setState(() => _volet = v),
            ),
            Expanded(
              child: _chargement
                  ? const Center(
                      child: CircularProgressIndicator(
                          color: PaletteNouvelle.bleuNuit))
                  : _erreur != null
                      ? _EtatErreur(message: _erreur!, onReessayer: _charger)
                      : _volet == VoletMessagerie.discussions
                          ? _VoletDiscussions(
                              filtre: _filtre,
                              onFiltre: (f) =>
                                  setState(() => _filtre = f),
                              enLigne: _volet == VoletMessagerie.discussions &&
                                      _filtre != FiltreMessagerie.groupes
                                  ? _enLigneDirectes
                                  : const [],
                              conversations: _filtrees,
                              presence: _enLigne,
                              nomAffiche: _nomAffiche,
                              prenom: _prenom,
                              initiales: _initiales,
                              dateCourte: _dateCourte,
                              onOuvrir: _ouvrir,
                            )
                          : _VoletAppels(
                              appels: _appels,
                              monMembreId: _monMembreId,
                              initiales: _initiales,
                              dateCourte: _dateCourte,
                              onRappeler: _rappeler,
                            ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Bande propre : retour à gauche, titre Messagerie.
class _Bande extends StatelessWidget {
  const _Bande({required this.onRetour});
  final VoidCallback? onRetour;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
      child: Row(
        children: [
          IconButton(
            tooltip: 'Retour',
            icon: const Icon(LucideIcons.chevronLeft, color: PaletteNouvelle.bleuNuit),
            onPressed: onRetour,
          ),
          const Expanded(
            child: Text(
              'Messagerie',
              style: TextStyle(
                  color: PaletteNouvelle.bleuNuit,
                  fontSize: 20,
                  fontWeight: FontWeight.w800),
            ),
          ),
        ],
      ),
    );
  }
}

/// Onglets Appels à gauche, Discussions à droite, le badge
/// rouge des manqués sur l'onglet Appels.
class _Onglets extends StatelessWidget {
  const _Onglets(
      {required this.volet, required this.nbManques, required this.onChoisir});
  final VoletMessagerie volet;
  final int nbManques;
  final ValueChanged<VoletMessagerie> onChoisir;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          for (final v in VoletMessagerie.values)
            Expanded(
              child: InkWell(
                key: ValueKey(v == VoletMessagerie.appels
                    ? 'ongletAppels'
                    : 'ongletDiscussions'),
                onTap: () => onChoisir(v),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          v == VoletMessagerie.appels
                              ? LucideIcons.phone
                              : LucideIcons.messageCircle,
                          size: 18,
                          color: PaletteNouvelle.bleuNuit,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          v.libelle,
                          style: TextStyle(
                            color: PaletteNouvelle.bleuNuit,
                            fontSize: 16,
                            fontWeight: v == volet
                                ? FontWeight.w800
                                : FontWeight.w500,
                          ),
                        ),
                        if (v == VoletMessagerie.appels && nbManques > 0) ...[
                          const SizedBox(width: 6),
                          Container(
                            key: const ValueKey('badgeAppelsManques'),
                            constraints: const BoxConstraints(
                                minWidth: 18, minHeight: 18),
                            padding:
                                const EdgeInsets.symmetric(horizontal: 4),
                            decoration: BoxDecoration(
                              color: PaletteNouvelle.rougeBadge,
                              borderRadius: BorderRadius.circular(9),
                            ),
                            alignment: Alignment.center,
                            child: Text(
                              '$nbManques',
                              style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 11,
                                  fontWeight: FontWeight.w800),
                            ),
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: 6),
                    Container(
                      height: 3,
                      color: v == volet
                          ? PaletteNouvelle.or
                          : Colors.transparent,
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _VoletDiscussions extends StatelessWidget {
  const _VoletDiscussions({
    required this.filtre,
    required this.onFiltre,
    required this.enLigne,
    required this.conversations,
    required this.presence,
    required this.nomAffiche,
    required this.prenom,
    required this.initiales,
    required this.dateCourte,
    required this.onOuvrir,
  });
  final FiltreMessagerie filtre;
  final ValueChanged<FiltreMessagerie> onFiltre;
  final List<ConversationMessagerie> enLigne;
  final List<ConversationMessagerie> conversations;
  final Map<String, bool> presence;
  final String Function(ConversationMessagerie) nomAffiche;
  final String Function(String) prenom;
  final String Function(String) initiales;
  final String Function(DateTime?) dateCourte;
  final ValueChanged<ConversationMessagerie> onOuvrir;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(12, 12, 12, 16),
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final f in FiltreMessagerie.values)
              ChoiceChip(
                label: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (f == FiltreMessagerie.messages)
                      Icon(LucideIcons.messageCircle,
                          size: 16,
                          color: filtre == f
                              ? Colors.white
                              : PaletteNouvelle.bleuNuit),
                    if (f == FiltreMessagerie.groupes)
                      Icon(LucideIcons.users,
                          size: 16,
                          color: filtre == f
                              ? Colors.white
                              : PaletteNouvelle.bleuNuit),
                    if (f != FiltreMessagerie.tous)
                      const SizedBox(width: 6),
                    Text(f.libelle),
                  ],
                ),
                selected: filtre == f,
                selectedColor: PaletteNouvelle.bleuNuit,
                labelStyle: TextStyle(
                  color: filtre == f ? Colors.white : PaletteNouvelle.bleuNuit,
                  fontWeight: FontWeight.w700,
                ),
                onSelected: (_) => onFiltre(f),
              ),
          ],
        ),
        if (enLigne.isNotEmpty) ...[
          const SizedBox(height: 16),
          const Text(
            'En ligne',
            style: TextStyle(
                color: PaletteNouvelle.bleuNuit,
                fontSize: 14,
                fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 8),
          SizedBox(
            height: 72,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: enLigne.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (_, i) {
                final c = enLigne[i];
                final nom = nomAffiche(c);
                return InkWell(
                  key: ValueKey('enLigne-${c.id}'),
                  onTap: () => onOuvrir(c),
                  child: SizedBox(
                    width: 56,
                    child: Column(
                      children: [
                        Stack(
                          clipBehavior: Clip.none,
                          children: [
                            CircleAvatar(
                              radius: 24,
                              backgroundColor: PaletteNouvelle.bleuNuit,
                              child: Text(
                                initiales(nom),
                                style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w800),
                              ),
                            ),
                            Positioned(
                              right: 0,
                              bottom: 0,
                              child: Container(
                                width: 12,
                                height: 12,
                                decoration: BoxDecoration(
                                  color: Colors.green,
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                      color: PaletteNouvelle.papier,
                                      width: 2),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          prenom(nom),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 12),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
        const SizedBox(height: 8),
        if (conversations.isEmpty)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 32),
            child: Center(
                child: Text('Aucune conversation pour le moment.')),
          ),
        for (final c in conversations)
          _LigneConversation(
            conversation: c,
            nom: nomAffiche(c),
            initiales: initiales(nomAffiche(c)),
            enLigne: presence[c.id] ?? false,
            date: dateCourte(c.lastMessageAt),
            onOuvrir: () => onOuvrir(c),
          ),
      ],
    );
  }
}

class _LigneConversation extends StatelessWidget {
  const _LigneConversation({
    required this.conversation,
    required this.nom,
    required this.initiales,
    required this.enLigne,
    required this.date,
    required this.onOuvrir,
  });
  final ConversationMessagerie conversation;
  final String nom;
  final String initiales;
  final bool enLigne;
  final String date;
  final VoidCallback onOuvrir;

  @override
  Widget build(BuildContext context) {
    final apercu = conversation.dernierMessage ?? '';
    return Card(
      color: Colors.white,
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 8),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: Color(0xFFE3E7EE)),
      ),
      child: ListTile(
        onTap: onOuvrir,
        leading: Stack(
          clipBehavior: Clip.none,
          children: [
            CircleAvatar(
              backgroundColor: conversation.estDiscussionStructure
                  ? PaletteNouvelle.or
                  : PaletteNouvelle.bleuNuit,
              child: Text(initiales,
                  style: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.w800)),
            ),
            if (enLigne)
              Positioned(
                right: 0,
                bottom: 0,
                child: Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: Colors.green,
                    shape: BoxShape.circle,
                    border:
                        Border.all(color: Colors.white, width: 2),
                  ),
                ),
              ),
          ],
        ),
        title: Row(
          children: [
            if (conversation.estDiscussionStructure)
              const Padding(
                padding: EdgeInsets.only(right: 4),
                child: Text('ÉPINGLÉE',
                    style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: PaletteNouvelle.orFonce)),
              ),
            Expanded(
              child: Text(
                nom,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                    fontWeight: conversation.nonLus > 0
                        ? FontWeight.w800
                        : FontWeight.w600,
                    color: PaletteNouvelle.bleuNuit),
              ),
            ),
            if (date.isNotEmpty)
              Text(date,
                  style: const TextStyle(color: Colors.grey, fontSize: 12)),
          ],
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (apercu.isNotEmpty)
              Text(apercu,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                      fontWeight: conversation.nonLus > 0
                          ? FontWeight.w700
                          : FontWeight.w400)),
            if (conversation.estGroupe &&
                conversation.nbMembres != null)
              Text(
                '${conversation.nbMembres} membres',
                style:
                    const TextStyle(color: Colors.grey, fontSize: 12),
              ),
          ],
        ),
        trailing: conversation.nonLus > 0
            ? Container(
                constraints:
                    const BoxConstraints(minWidth: 20, minHeight: 20),
                padding: const EdgeInsets.symmetric(horizontal: 5),
                decoration: BoxDecoration(
                  color: PaletteNouvelle.or,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '${conversation.nonLus}',
                  style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w800),
                ),
              )
            : null,
      ),
    );
  }
}

class _VoletAppels extends StatelessWidget {
  const _VoletAppels({
    required this.appels,
    required this.monMembreId,
    required this.initiales,
    required this.dateCourte,
    required this.onRappeler,
  });
  final List<AppelMessagerie> appels;
  final String? monMembreId;
  final String Function(String) initiales;
  final String Function(DateTime?) dateCourte;
  final ValueChanged<AppelMessagerie> onRappeler;

  @override
  Widget build(BuildContext context) {
    if (appels.isEmpty) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text('Aucun appel pour le moment.'),
        ),
      );
    }
    return ListView.builder(
      // T17 : bas ramené de 96 à 16, la coquille ajoute
      // déjà 80 px, sinon 176 px de vide en bas de liste.
      padding: const EdgeInsets.fromLTRB(12, 12, 12, 16),
      itemCount: appels.length,
      itemBuilder: (_, i) {
        final appel = appels[i];
        final nom = appel.autreNom.isNotEmpty
            ? appel.autreNom
            : 'Membre de la structure';
        final sortant = appel.estSortant(monMembreId);
        return Card(
          color: Colors.white,
          elevation: 0,
          margin: const EdgeInsets.only(bottom: 8),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: const BorderSide(color: Color(0xFFE3E7EE)),
          ),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: PaletteNouvelle.bleuNuit,
              child: Text(initiales(nom),
                  style: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.w800)),
            ),
            title: Text(
              nom,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                  fontWeight: FontWeight.w600,
                  color: appel.manque
                      ? PaletteNouvelle.rougeBadge
                      : PaletteNouvelle.bleuNuit),
            ),
            subtitle: Row(
              children: [
                Icon(
                  sortant ? LucideIcons.arrowUpRight : LucideIcons.arrowDownLeft,
                  size: 14,
                  color: appel.manque
                      ? PaletteNouvelle.rougeBadge
                      : Colors.grey,
                ),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    '${appel.libelle(monMembreId)} · ${dateCourte(appel.creeLe)}',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        color: appel.manque
                            ? PaletteNouvelle.rougeBadge
                            : Colors.grey),
                  ),
                ),
              ],
            ),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  appel.estVideo
                      ? LucideIcons.video
                      : LucideIcons.phone,
                  color: PaletteNouvelle.bleuNuit,
                  size: 20,
                ),
                IconButton(
                  key: ValueKey('rappeler-${appel.id}'),
                  tooltip: 'Rappeler',
                  icon: const Icon(LucideIcons.phone,
                      color: PaletteNouvelle.bleuNuit),
                  onPressed: () => onRappeler(appel),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

/// Feuille de choix d'un membre, pour une nouvelle discussion
/// ou un nouvel appel : recherche par nom ou matricule, 3
/// caractères au moins, comme la recherche messagerie du serveur.
class _FeuilleMembres extends StatefulWidget {
  const _FeuilleMembres({required this.titre, required this.onRechercher});
  final String titre;
  final Future<List<MembreMessagerie>> Function(String q) onRechercher;

  @override
  State<_FeuilleMembres> createState() => _FeuilleMembresState();
}

class _FeuilleMembresState extends State<_FeuilleMembres> {
  List<MembreMessagerie> _resultats = [];
  bool _rechercheEnCours = false;

  Future<void> _rechercher(String q) async {
    final saisie = q.trim();
    if (saisie.length < 3) return;
    setState(() => _rechercheEnCours = true);
    try {
      final resultats = await widget.onRechercher(saisie);
      if (!mounted) return;
      setState(() {
        _resultats = resultats;
        _rechercheEnCours = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _rechercheEnCours = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
          left: 16,
          right: 16,
          top: 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(widget.titre,
              style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w800,
                  color: PaletteNouvelle.bleuNuit)),
          const SizedBox(height: 12),
          TextField(
            autofocus: true,
            textInputAction: TextInputAction.search,
            onSubmitted: _rechercher,
            decoration: const InputDecoration(
              hintText: 'Rechercher un membre…',
              prefixIcon: Icon(LucideIcons.search),
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 8),
          if (_rechercheEnCours)
            const LinearProgressIndicator(color: PaletteNouvelle.bleuNuit),
          ConstrainedBox(
            constraints: const BoxConstraints(maxHeight: 320),
            child: ListView(
              shrinkWrap: true,
              children: [
                for (final m in _resultats)
                  ListTile(
                    title: Text(m.nomComplet),
                    subtitle: m.matricule.isNotEmpty
                        ? Text(m.matricule)
                        : null,
                    onTap: () => Navigator.of(context).pop(m),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}

class _EtatErreur extends StatelessWidget {
  const _EtatErreur({required this.message, required this.onReessayer});
  final String message;
  final VoidCallback onReessayer;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(message, textAlign: TextAlign.center),
            const SizedBox(height: 12),
            FilledButton(
              style: FilledButton.styleFrom(
                  backgroundColor: PaletteNouvelle.bleuNuit),
              onPressed: onReessayer,
              child: const Text('Réessayer'),
            ),
          ],
        ),
      ),
    );
  }
}
