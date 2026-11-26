// Nouvelle Messagerie, tranche T4, 26 nov. 2026.
// Écran d'une conversation : en-tête avec la présence de
// l'autre membre, mention « Échanges modérés par la structure »,
// messages en bulles, message vocal affiché par son libellé,
// appel manqué en ligne rouge, barre d'écriture blanche, champ
// « Écrire un message » blanc bordé, bouton d'envoi bleu nuit.
// Les réponses désactivées masquent la saisie, comme le canal
// d'annonces de la structure. L'envoi d'un message vocal
// reste dans l'ancien écran, il n'est pas repris ici.
import 'package:flutter/material.dart';

import '../messagerie.dart' hide motifsSignalement;
import 'modeles_connexion.dart';
import 'modeles_messagerie.dart';
import 'palette.dart';
import 'veille_reseau.dart';

class PageConversationMessagerie extends StatefulWidget {
  const PageConversationMessagerie({
    super.key,
    required this.service,
    required this.conversation,
    required this.titre,
    this.monMembreId,
  });
  final ServiceMessagerie service;
  final ConversationMessagerie conversation;
  final String titre;
  final String? monMembreId;

  @override
  State<PageConversationMessagerie> createState() =>
      _PageConversationMessagerieState();
}

class _PageConversationMessagerieState
    extends State<PageConversationMessagerie> {
  final _texte = TextEditingController();
  List<MessageMessagerie> _messages = [];
  bool _chargement = true;
  bool _envoiEnCours = false;
  bool _enLigne = false;
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
    _texte.dispose();
    super.dispose();
  }

  /// Rechargement à la reprise du réseau, tranche T10 : sans
  /// vider les messages, sans marquer de nouveau comme lu,
  /// la discussion déjà affichée reste en place.
  Future<void> _recharger() => _charger(silencieux: true);

  Future<void> _charger({bool silencieux = false}) async {
    final contenuDejaLa = _messages.isNotEmpty;
    if (!silencieux || !contenuDejaLa) {
      setState(() {
        _chargement = true;
        _erreur = null;
      });
    }
    try {
      final messages =
          await widget.service.chargerMessages(widget.conversation.id);
      var enLigne = false;
      if (widget.conversation.type == 'directe') {
        final presence = await widget.service
            .chargerPresence([widget.conversation]);
        enLigne = presence[widget.conversation.id] ?? false;
      }
      if (!silencieux) await widget.service.marquerLue(widget.conversation.id);
      if (!mounted) return;
      setState(() {
        _messages = messages;
        _enLigne = enLigne;
        _chargement = false;
        _erreur = null;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _chargement = false;
        // Les messages déjà affichés restent en place,
        // l'écran d'erreur ne sort que quand il n'y a rien.
        if (!contenuDejaLa) {
          _erreur = 'La discussion ne peut pas être chargée pour le moment.';
        }
      });
    }
  }

  Future<void> _envoyer() async {
    final texte = _texte.text.trim();
    if (texte.isEmpty || _envoiEnCours) return;
    setState(() => _envoiEnCours = true);
    try {
      final message = await widget.service.envoyerMessage(
        widget.conversation.id,
        texte,
      );
      if (!mounted) return;
      setState(() {
        _messages = [..._messages, message];
        _texte.clear();
        _envoiEnCours = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _envoiEnCours = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Le message n’a pas pu être envoyé.')),
      );
    }
  }

  Future<void> _signaler() async {
    final motif = await showModalBottomSheet<String>(
      context: context,
      builder: (_) => _FeuilleMotifs(titre: 'Signaler cette discussion'),
    );
    if (motif == null || !mounted) return;
    try {
      await widget.service.signaler(
        cibleType: 'conversation',
        cibleId: widget.conversation.id,
        motif: motif,
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Signalement envoyé. La structure va l’examiner.')),
      );
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Le signalement n’a pas pu être envoyé.')),
      );
    }
  }

  Future<void> _appeler() async {
    try {
      await widget.service
          .appeler(widget.conversation.id, type: 'audio');
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

  String _initiales(String nom) {
    final mots =
        nom.trim().split(RegExp(r'\s+')).where((m) => m.isNotEmpty).toList();
    if (mots.isEmpty) return '?';
    if (mots.length == 1) return mots.first[0].toUpperCase();
    return (mots.first[0] + mots[1][0]).toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    final conversation = widget.conversation;
    return Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          tooltip: 'Retour',
          icon: const Icon(Icons.arrow_back,
              color: PaletteNouvelle.bleuNuit),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Row(
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                CircleAvatar(
                  radius: 18,
                  backgroundColor: PaletteNouvelle.bleuNuit,
                  child: Text(
                    _initiales(widget.titre),
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w800),
                  ),
                ),
                if (_enLigne)
                  Positioned(
                    right: 0,
                    bottom: 0,
                    child: Container(
                      width: 10,
                      height: 10,
                      decoration: BoxDecoration(
                        color: Colors.green,
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white, width: 2),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    widget.titre,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                        color: PaletteNouvelle.bleuNuit,
                        fontSize: 16,
                        fontWeight: FontWeight.w800),
                  ),
                  if (_enLigne)
                    const Text(
                      'En ligne',
                      style: TextStyle(
                          color: Colors.green,
                          fontSize: 12,
                          fontWeight: FontWeight.w600),
                    ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          if (conversation.type == 'directe')
            IconButton(
              tooltip: 'Appeler',
              icon: const Icon(Icons.phone,
                  color: PaletteNouvelle.bleuNuit),
              onPressed: _appeler,
            ),
          IconButton(
            tooltip: 'Signaler',
            icon: const Icon(Icons.flag_outlined,
                color: PaletteNouvelle.bleuNuit),
            onPressed: _signaler,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              width: double.infinity,
              color: Colors.white,
              padding:
                  const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.shield_outlined,
                      size: 14, color: Colors.grey),
                  SizedBox(width: 6),
                  Text(
                    'Échanges modérés par la structure',
                    style: TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                ],
              ),
            ),
            Expanded(
              child: _chargement
                  ? const Center(
                      child: CircularProgressIndicator(
                          color: PaletteNouvelle.bleuNuit))
                  : _erreur != null
                      ? Center(
                          child: Padding(
                            padding: const EdgeInsets.all(24),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(_erreur!,
                                    textAlign: TextAlign.center),
                                const SizedBox(height: 12),
                                FilledButton(
                                  style: FilledButton.styleFrom(
                                      backgroundColor:
                                          PaletteNouvelle.bleuNuit),
                                  onPressed: _charger,
                                  child: const Text('Réessayer'),
                                ),
                              ],
                            ),
                          ),
                        )
                      : _messages.isEmpty
                          ? const Center(
                              child: Text('Aucun message pour le moment.'))
                          : ListView.builder(
                              padding: const EdgeInsets.fromLTRB(
                                  12, 12, 12, 12),
                              itemCount: _messages.length,
                              itemBuilder: (_, i) =>
                                  _BulleMessage(
                                message: _messages[i],
                                monMembreId: widget.monMembreId,
                              ),
                            ),
            ),
            if (conversation.reponsesDesactivees)
              Container(
                width: double.infinity,
                color: Colors.white,
                padding: const EdgeInsets.all(12),
                child: const Text(
                  'Les réponses sont désactivées dans cette discussion.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey, fontSize: 13),
                ),
              )
            else
              _BarreEcriture(
                controleur: _texte,
                enCours: _envoiEnCours,
                onEnvoyer: _envoyer,
              ),
          ],
        ),
      ),
    );
  }
}

class _BulleMessage extends StatelessWidget {
  const _BulleMessage({required this.message, required this.monMembreId});
  final MessageMessagerie message;
  final String? monMembreId;

  @override
  Widget build(BuildContext context) {
    if (message.type == 'appel_manque') {
      final manque =
          monMembreId == null || message.senderId != monMembreId;
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: Center(
          child: Text(
            manque ? 'Appel manqué' : 'Appel sans réponse',
            style: TextStyle(
              color: manque
                  ? PaletteNouvelle.rougeBadge
                  : Colors.grey,
              fontSize: 13,
              fontWeight: manque ? FontWeight.w700 : FontWeight.w400,
            ),
          ),
        ),
      );
    }
    final mien =
        monMembreId != null && message.senderId == monMembreId;
    final estVocal = message.type == 'audio';
    return Align(
      alignment: mien ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width * 0.75),
        margin: const EdgeInsets.only(bottom: 8),
        padding:
            const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: mien ? PaletteNouvelle.bleuNuit : Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: mien
              ? null
              : Border.all(color: const Color(0xFFE3E7EE)),
        ),
        child: estVocal
            ? Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.mic_none_outlined,
                      size: 18,
                      color: mien ? Colors.white : PaletteNouvelle.bleuNuit),
                  const SizedBox(width: 6),
                  Flexible(
                    child: Text(
                      message.content.isNotEmpty
                          ? message.content
                          : 'Message vocal',
                      style: TextStyle(
                          color: mien
                              ? Colors.white
                              : PaletteNouvelle.bleuNuit),
                    ),
                  ),
                ],
              )
            : Text(
                message.content,
                style: TextStyle(
                    color: mien ? Colors.white : PaletteNouvelle.bleuNuit),
              ),
      ),
    );
  }
}

/// Barre d'écriture blanche : champ blanc bordé, bouton
/// d'envoi bleu nuit.
class _BarreEcriture extends StatelessWidget {
  const _BarreEcriture(
      {required this.controleur,
      required this.enCours,
      required this.onEnvoyer});
  final TextEditingController controleur;
  final bool enCours;
  final VoidCallback onEnvoyer;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: controleur,
              textInputAction: TextInputAction.send,
              onSubmitted: (_) => onEnvoyer(),
              decoration: InputDecoration(
                hintText: 'Écrire un message',
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide:
                      const BorderSide(color: Color(0xFFD5DAE3)),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide:
                      const BorderSide(color: Color(0xFFD5DAE3)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: const BorderSide(
                      color: PaletteNouvelle.bleuNuit),
                ),
                contentPadding: const EdgeInsets.symmetric(
                    horizontal: 14, vertical: 10),
              ),
            ),
          ),
          const SizedBox(width: 8),
          IconButton(
            key: const ValueKey('boutonEnvoyerMessage'),
            tooltip: 'Envoyer',
            style: IconButton.styleFrom(
                backgroundColor: PaletteNouvelle.bleuNuit),
            icon: const Icon(Icons.send, color: Colors.white, size: 20),
            onPressed: enCours ? null : onEnvoyer,
          ),
        ],
      ),
    );
  }
}

/// Feuille de signalement : un motif, sans masquage immédiat,
/// la structure examine ensuite. Même liste que Connexion.
class _FeuilleMotifs extends StatelessWidget {
  const _FeuilleMotifs({required this.titre});
  final String titre;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: Text(titre,
                style: const TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit)),
          ),
          for (final (code, libelle) in motifsSignalement)
            ListTile(
              title: Text(libelle),
              onTap: () => Navigator.of(context).pop(code),
            ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}
