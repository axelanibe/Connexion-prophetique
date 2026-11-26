// Nouvel Assistant, tranche T5, 26 nov. 2026.
// Chatbox local, sans serveur. Bouton flottant Assistant CP,
// feuille en bas immersive avec poignée, toucher ou glisser
// vers le bas pour fermer. En-tête compact, avatar bleu nuit,
// Assistant CP, pastille IA telle que dans la maquette, statut
// En ligne avec point vert pulsant, réinitialiser et fermer.
// Horodatage discret, bulle d'accueil courte gris perle, grille
// 2x3 Sujets fréquents : une fois une carte touchée, les six
// cartes disparaissent en fondu, puis tout le bloc se retire,
// il ne reste que le message et la réponse, simplement, et le
// bouton réinitialiser ramène les six cartes. Indicateur de
// frappe à trois points, bulles utilisateur bleu nuit à droite,
// barre de saisie arrondie blanche avec micro et envoi bleu
// nuit, mention Échanges confidentiels. La pastille IA reste
// telle que validée : si Axel choisit le chatbox, elle sera
// retirée plus tard, pas dans cette tranche.
import 'package:flutter/material.dart';

import 'modeles_assistant.dart';
import 'palette.dart';
import 'service_assistant.dart';

/// Gris perle des bulles de l'assistant, maquette.
const _grisPerle = Color(0xFFF1F2F6);

/// Ouvre la feuille Assistant. Le bouton flottant sert à la
/// rouvrir quand elle est fermée.
Future<void> ouvrirAssistant(
  BuildContext context, {
  required ServiceAssistant service,
  String? prenomMembre,
}) {
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
    ),
    builder: (_) => FractionallySizedBox(
      heightFactor: 0.85,
      child: FeuilleAssistant(
        service: service,
        prenomMembre: prenomMembre,
      ),
    ),
  );
}

/// Bouton flottant Assistant CP, pastille bleu nuit avec point
/// vert, à poser dans la coquille à la bascule T11.
class BoutonFlottantAssistant extends StatelessWidget {
  const BoutonFlottantAssistant({super.key, required this.onPressed});
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton.extended(
      key: const ValueKey('fabAssistant'),
      tooltip: 'Assistant CP',
      backgroundColor: PaletteNouvelle.bleuNuit,
      onPressed: onPressed,
      icon: Container(
        width: 10,
        height: 10,
        decoration: const BoxDecoration(
          color: Colors.green,
          shape: BoxShape.circle,
        ),
      ),
      label: const Text(
        'Assistant CP',
        style: TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class FeuilleAssistant extends StatefulWidget {
  const FeuilleAssistant({
    super.key,
    required this.service,
    this.prenomMembre,
    this.onFermer,
    this.delaiReponse = const Duration(milliseconds: 600),
  });
  final ServiceAssistant service;

  /// Prénom du membre pour la bulle d'accueil, absent tant que
  /// la coquille ne le fournit pas.
  final String? prenomMembre;

  /// Fermeture, fournie par l'appelant en test, sinon la feuille
  /// se referme elle-même.
  final VoidCallback? onFermer;

  /// Délai avant la réponse, pour les tests seulement.
  final Duration delaiReponse;

  @override
  State<FeuilleAssistant> createState() => _FeuilleAssistantState();
}

class _FeuilleAssistantState extends State<FeuilleAssistant> {
  final _messages = <MessageAssistant>[];
  final _saisie = TextEditingController();
  final _defilement = ScrollController();
  bool _sujetsVisibles = true;
  bool _sujetsRetires = false;
  bool _enTrainDEcrire = false;
  bool _attendSujetPriere = false;

  @override
  void dispose() {
    _saisie.dispose();
    _defilement.dispose();
    super.dispose();
  }

  String get _accueil {
    final prenom = widget.prenomMembre?.trim();
    if (prenom != null && prenom.isNotEmpty) {
      return 'Shalom $prenom, je suis l’assistant CP. '
          'Choisis un sujet ou écris ta question.';
    }
    return 'Shalom, je suis l’assistant CP. '
        'Choisis un sujet ou écris ta question.';
  }

  String get _horodatage {
    final maintenant = DateTime.now();
    final h = maintenant.hour.toString().padLeft(2, '0');
    final m = maintenant.minute.toString().padLeft(2, '0');
    return 'Aujourd’hui • $h:$m';
  }

  void _defilerBas() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_defilement.hasClients) return;
      _defilement.animateTo(
        _defilement.position.maxScrollExtent,
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOut,
      );
    });
  }

  void _ajouterMessage(String texte, bool estUtilisateur) {
    setState(() {
      _messages.add(MessageAssistant(
        texte: texte,
        estUtilisateur: estUtilisateur,
        creeLe: DateTime.now(),
      ));
    });
    _defilerBas();
  }

  /// Après le choix d'un sujet, les six cartes disparaissent
  /// en fondu, puis tout le bloc des sujets se retire.
  void _retirerSujets() {
    setState(() => _sujetsVisibles = false);
  }

  Future<void> _repondre(String texte) async {
    setState(() => _enTrainDEcrire = true);
    _defilerBas();
    await Future<void>.delayed(widget.delaiReponse);
    if (!mounted) return;
    setState(() => _enTrainDEcrire = false);
    _ajouterMessage(texte, false);
  }

  Future<void> _choisirSujet(SujetAssistant sujet) async {
    _ajouterMessage(sujet.titre, true);
    _retirerSujets();
    if (sujet.id == 'priere') _attendSujetPriere = true;
    await _repondre(sujet.reponse);
  }

  Future<void> _envoyer() async {
    final texte = _saisie.text.trim();
    if (texte.isEmpty) return;
    _saisie.clear();
    _ajouterMessage(texte, true);
    if (_attendSujetPriere) {
      _attendSujetPriere = false;
      setState(() => _enTrainDEcrire = true);
      _defilerBas();
      try {
        await widget.service.envoyerSujetPriere(texte);
        if (!mounted) return;
        setState(() => _enTrainDEcrire = false);
        _ajouterMessage(
          'Ton sujet de prière a été transmis à la structure, en privé.',
          false,
        );
      } catch (_) {
        if (!mounted) return;
        setState(() => _enTrainDEcrire = false);
        _ajouterMessage(
          'La transmission n’a pas abouti, réessaie plus tard.',
          false,
        );
      }
      return;
    }
    final sujet = trouverSujetParTexte(texte);
    await _repondre(sujet?.reponse ?? reponseRepliAssistant);
  }

  void _reinitialiser() {
    setState(() {
      _messages.clear();
      _sujetsVisibles = true;
      _sujetsRetires = false;
      _enTrainDEcrire = false;
      _attendSujetPriere = false;
    });
  }

  void _fermer() {
    if (widget.onFermer != null) {
      widget.onFermer!();
    } else {
      Navigator.of(context).maybePop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
          key: const ValueKey('poigneeAssistant'),
          onTap: _fermer,
          behavior: HitTestBehavior.opaque,
          child: Padding(
            padding: const EdgeInsets.only(top: 10, bottom: 4),
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: const Color(0xFFE3E7EE),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
        ),
        _EnTete(onReinitialiser: _reinitialiser, onFermer: _fermer),
        Expanded(
          child: ListView(
            controller: _defilement,
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
            children: [
              Center(
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF1F2F6),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    _horodatage,
                    style: const TextStyle(color: Colors.grey, fontSize: 11),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              _BulleAssistant(texte: _accueil),
              const SizedBox(height: 12),
              if (!_sujetsRetires)
                AnimatedOpacity(
                  opacity: _sujetsVisibles ? 1 : 0,
                  duration: const Duration(milliseconds: 300),
                  onEnd: () {
                    if (!_sujetsVisibles && mounted) {
                      setState(() => _sujetsRetires = true);
                    }
                  },
                  child: _GrilleSujets(onChoisir: _choisirSujet),
                ),
              for (final message in _messages) ...[
                const SizedBox(height: 10),
                if (message.estUtilisateur)
                  _BulleUtilisateur(texte: message.texte)
                else
                  _BulleAssistant(texte: message.texte),
              ],
              if (_enTrainDEcrire) ...[
                const SizedBox(height: 10),
                const _IndicateurFrappe(),
              ],
            ],
          ),
        ),
        _BarreSaisie(
          controleur: _saisie,
          onEnvoyer: _envoyer,
          onMicro: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('La saisie vocale n’est pas encore disponible.'),
              ),
            );
          },
        ),
      ],
    );
  }
}

/// En-tête compact : avatar bleu nuit, Assistant CP, pastille
/// IA, En ligne avec point vert pulsant, réinitialiser, fermer.
class _EnTete extends StatelessWidget {
  const _EnTete({required this.onReinitialiser, required this.onFermer});
  final VoidCallback onReinitialiser;
  final VoidCallback onFermer;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 6, 8, 10),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Color(0xFFF1F2F6))),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 22,
            backgroundColor: PaletteNouvelle.bleuNuit,
            child: Icon(
              Icons.auto_awesome,
              color: PaletteNouvelle.or,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      'Assistant CP',
                      style: TextStyle(
                        color: PaletteNouvelle.bleuNuit,
                        fontSize: 15,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    SizedBox(width: 6),
                    _PastilleIa(),
                  ],
                ),
                SizedBox(height: 2),
                Row(
                  children: [
                    _PointPulsant(),
                    SizedBox(width: 6),
                    Text(
                      'En ligne',
                      style: TextStyle(color: Colors.green, fontSize: 12),
                    ),
                  ],
                ),
              ],
            ),
          ),
          IconButton(
            key: const ValueKey('reinitialiserAssistant'),
            tooltip: 'Réinitialiser',
            icon: const Icon(Icons.restart_alt, color: Colors.grey),
            onPressed: onReinitialiser,
          ),
          IconButton(
            key: const ValueKey('fermerAssistant'),
            tooltip: 'Fermer',
            icon: const Icon(Icons.close, color: PaletteNouvelle.bleuNuit),
            onPressed: onFermer,
          ),
        ],
      ),
    );
  }
}

/// Pastille IA telle que dans la maquette validée.
class _PastilleIa extends StatelessWidget {
  const _PastilleIa();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: const Color(0xFFFBF3D9),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: const Color(0xFFEAD9A0)),
      ),
      child: const Text(
        'IA',
        style: TextStyle(
          color: PaletteNouvelle.orFonce,
          fontSize: 10,
          fontWeight: FontWeight.w800,
        ),
      ),
    );
  }
}

class _PointPulsant extends StatefulWidget {
  const _PointPulsant();

  @override
  State<_PointPulsant> createState() => _PointPulsantState();
}

class _PointPulsantState extends State<_PointPulsant>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controleur;

  @override
  void initState() {
    super.initState();
    _controleur = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controleur.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controleur,
      builder: (_, __) {
        final echelle = 1 + 0.5 * _controleur.value;
        return Container(
          width: 8 * echelle,
          height: 8 * echelle,
          decoration: const BoxDecoration(
            color: Colors.green,
            shape: BoxShape.circle,
          ),
        );
      },
    );
  }
}

/// Grille 2x3 des sujets fréquents, cartes blanches avec icône.
class _GrilleSujets extends StatelessWidget {
  const _GrilleSujets({required this.onChoisir});
  final ValueChanged<SujetAssistant> onChoisir;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 4, bottom: 10),
          child: Text(
            'Sujets fréquents',
            style: TextStyle(
              color: Colors.grey,
              fontSize: 11,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
            childAspectRatio: 2.4,
          ),
          itemCount: sujetsFrequentsAssistant.length,
          itemBuilder: (_, i) {
            final sujet = sujetsFrequentsAssistant[i];
            return InkWell(
              key: ValueKey('sujet-${sujet.id}'),
              onTap: () => onChoisir(sujet),
              borderRadius: BorderRadius.circular(16),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFEAD9A0)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      width: 32,
                      height: 32,
                      decoration: BoxDecoration(
                        color: const Color(0xFFFBF3D9),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Icon(
                        sujet.icone,
                        color: PaletteNouvelle.orFonce,
                        size: 18,
                      ),
                    ),
                    Text(
                      sujet.titre,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: PaletteNouvelle.bleuNuit,
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}

class _BulleAssistant extends StatelessWidget {
  const _BulleAssistant({required this.texte});
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const CircleAvatar(
          radius: 14,
          backgroundColor: PaletteNouvelle.bleuNuit,
          child: Icon(
            Icons.auto_awesome,
            color: PaletteNouvelle.or,
            size: 14,
          ),
        ),
        const SizedBox(width: 10),
        Flexible(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: _grisPerle,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(4),
                topRight: Radius.circular(16),
                bottomLeft: Radius.circular(16),
                bottomRight: Radius.circular(16),
              ),
              border: Border.all(color: const Color(0xFFE3E7EE)),
            ),
            child: Text(
              texte,
              style: const TextStyle(
                color: PaletteNouvelle.bleuNuit,
                fontSize: 13,
                height: 1.4,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _BulleUtilisateur extends StatelessWidget {
  const _BulleUtilisateur({required this.texte});
  final String texte;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Flexible(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: const BoxDecoration(
              color: PaletteNouvelle.bleuNuit,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(16),
                topRight: Radius.circular(4),
                bottomLeft: Radius.circular(16),
                bottomRight: Radius.circular(16),
              ),
            ),
            child: Text(
              texte,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 13,
                height: 1.4,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

/// Indicateur de frappe à trois points.
class _IndicateurFrappe extends StatelessWidget {
  const _IndicateurFrappe();

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const CircleAvatar(
          radius: 14,
          backgroundColor: PaletteNouvelle.bleuNuit,
          child: Icon(
            Icons.auto_awesome,
            color: PaletteNouvelle.or,
            size: 14,
          ),
        ),
        const SizedBox(width: 10),
        Container(
          key: const ValueKey('indicateurFrappe'),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: BoxDecoration(
            color: _grisPerle,
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(4),
              topRight: Radius.circular(16),
              bottomLeft: Radius.circular(16),
              bottomRight: Radius.circular(16),
            ),
            border: Border.all(color: const Color(0xFFE3E7EE)),
          ),
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _PointFrappe(delai: 0),
              SizedBox(width: 4),
              _PointFrappe(delai: 150),
              SizedBox(width: 4),
              _PointFrappe(delai: 300),
            ],
          ),
        ),
      ],
    );
  }
}

class _PointFrappe extends StatefulWidget {
  const _PointFrappe({required this.delai});
  final int delai;

  @override
  State<_PointFrappe> createState() => _PointFrappeState();
}

class _PointFrappeState extends State<_PointFrappe>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controleur;

  @override
  void initState() {
    super.initState();
    _controleur = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat();
    Future<void>.delayed(Duration(milliseconds: widget.delai), () {
      if (mounted) _controleur.forward();
    });
  }

  @override
  void dispose() {
    _controleur.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controleur,
      builder: (_, __) {
        final t = _controleur.value;
        final decalage = t < 0.4 ? -4 * (t / 0.4) : 0.0;
        return Transform.translate(
          offset: Offset(0, decalage),
          child: Container(
            width: 6,
            height: 6,
            decoration: const BoxDecoration(
              color: PaletteNouvelle.bleuNuit,
              shape: BoxShape.circle,
            ),
          ),
        );
      },
    );
  }
}

/// Barre de saisie arrondie blanche, micro et envoi bleu nuit,
/// mention Échanges confidentiels en dessous.
class _BarreSaisie extends StatelessWidget {
  const _BarreSaisie({
    required this.controleur,
    required this.onEnvoyer,
    required this.onMicro,
  });
  final TextEditingController controleur;
  final VoidCallback onEnvoyer;
  final VoidCallback onMicro;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(28),
              border: Border.all(color: const Color(0xFFE3E7EE)),
            ),
            padding: const EdgeInsets.only(left: 16, right: 6, top: 6, bottom: 6),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: controleur,
                    textInputAction: TextInputAction.send,
                    onSubmitted: (_) => onEnvoyer(),
                    decoration: const InputDecoration(
                      hintText: 'Écris ta question…',
                      border: InputBorder.none,
                    ),
                  ),
                ),
                IconButton(
                  key: const ValueKey('microAssistant'),
                  tooltip: 'Message vocal',
                  icon: const Icon(Icons.mic_none_outlined, color: Colors.grey),
                  onPressed: onMicro,
                ),
                CircleAvatar(
                  backgroundColor: PaletteNouvelle.bleuNuit,
                  child: IconButton(
                    key: const ValueKey('boutonEnvoyerAssistant'),
                    tooltip: 'Envoyer',
                    icon: const Icon(Icons.send, color: Colors.white, size: 18),
                    onPressed: onEnvoyer,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.lock, size: 10, color: PaletteNouvelle.orFonce),
              SizedBox(width: 4),
              Text(
                'Échanges confidentiels',
                style: TextStyle(color: Colors.grey, fontSize: 10),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
