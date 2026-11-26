// Nouvelle coquille, tranche T1, 26 nov. 2026.
// En-tête blanc, plat : hamburger à gauche, pastille monogramme
// CP bleu nuit et nom CONNEXION PROPHÉTIQUE en Cinzel sur une
// seule ligne, messagerie avec le vrai nombre de non lus en
// pastille rouge, cloche, photo vers Mon profil. Barre du bas,
// 5 onglets : Accueil, Bible, Connexion, Librairie, Plus.
// Branchée dans lib/main.dart à la bascule T11, par la racine
// lib/nouveau/racine.dart, qui fournit toutes les pages.
import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../app_models.dart' show Member;
import 'avatar_membre.dart';
import 'destinations.dart';
import 'modeles_t15.dart';
import 'page_neutre.dart';
import 'page_parametres.dart';
import 'page_plus.dart';
import 'palette.dart';
import 'tiroir.dart';
import 'veille_reseau.dart';

class NouvelleCoquille extends StatefulWidget {
  const NouvelleCoquille({
    super.key,
    required this.membre,
    this.nonLus,
    this.onMessagerie,
    this.onDeconnexion,
    this.onSupprimerCompte,
    this.accueil,
    this.connexion,
    this.messagerie,
    this.bible,
    this.librairie,
    this.profil,
    this.carte,
    this.chainePriere,
    this.suivi,
    this.opportunite,
    this.documents,
    this.croissance,
    this.fonctions,
    this.abonnement,
    this.galerie,
    this.espaceStructure,
    this.structure,
    this.veille,
    this.boutonFlottant,
    this.notifications,
    this.journal,
    this.meditation,
    this.aPropos,
    this.presences,
    this.aide,
    this.cotisations,
    this.paroleVivante,
    this.etatCarte,
  });
  final Member? membre;

  /// État de la carte, T15, pour la carte du tiroir. Sans
  /// lui, la carte du tiroir s'affiche comme avant.
  final EtatCarte? etatCarte;

  /// Nombre de messages non lus, même source que l'ancienne
  /// bulle (MessagerieLectureService.instance.nonLusNotifier).
  /// Pastille rouge affichée seulement si supérieur à 0.
  final ValueListenable<int>? nonLus;
  final VoidCallback? onMessagerie;
  final VoidCallback? onDeconnexion;
  final VoidCallback? onSupprimerCompte;

  /// Page Accueil fournie par l'application, tranche T2.
  /// Sans elle, l'onglet Accueil reste en état neutre.
  /// L'application la construit avec ses données et ses
  /// rappels, à la bascule T11.
  final Widget? accueil;

  /// Page Connexion fournie par l'application, tranche T3.
  /// Plein écran : ni en-tête ni barre du bas quand l'onglet
  /// Connexion est actif, la page porte sa propre bande avec
  /// retour. Sans elle, l'onglet reste en état neutre.
  final Widget? connexion;

  /// Page Messagerie fournie par l'application, tranche T4.
  /// Ouverte par la bulle de l'en-tête ou par la destination
  /// Messagerie, elle porte ses propres onglets Appels et
  /// Discussions. Sans elle, la destination reste neutre.
  final Widget? messagerie;

  /// Page Bible fournie par l'application, tranche T6.
  /// Sans elle, l'onglet Bible reste en état neutre.
  final Widget? bible;

  /// Page Librairie fournie par l'application, tranche T7.
  /// Sans elle, l'onglet Librairie reste en état neutre.
  final Widget? librairie;

  /// Page Mon profil fournie par l'application, tranche T8.
  /// Ouverte par la photo de l'en-tête et par la carte du
  /// tiroir. Sans elle, la destination reste en état neutre.
  final Widget? profil;

  /// Page Ma carte fournie par l'application, tranche T8.
  /// Sans elle, la destination reste en état neutre.
  final Widget? carte;

  /// Pages nouvelles et retenues, tranche T9. Sans elles, les
  /// destinations restent en état neutre.
  final Widget? chainePriere;
  final Widget? suivi;
  final Widget? opportunite;
  final Widget? documents;
  final Widget? croissance;
  final Widget? fonctions;
  final Widget? abonnement;
  final Widget? galerie;
  final Widget? espaceStructure;
  final Widget? structure;

  /// Destinations sans page dédiée pour l'instant, T11 :
  /// notifications, journal, méditation, à propos, présences,
  /// aide, cotisations, Parole vivante (T13). Sans elles,
  /// l'état neutre, titre seulement, aucun contenu inventé.
  final Widget? notifications;
  final Widget? journal;
  final Widget? meditation;
  final Widget? aPropos;
  final Widget? presences;
  final Widget? aide;
  final Widget? cotisations;
  final Widget? paroleVivante;

  /// Bouton flottant, T11 : l'Assistant, présent sur toutes
  /// les pages de la coquille.
  final Widget? boutonFlottant;

  /// Veille réseau, tranche T10. Sans elle, l'instance partagée
  /// sert : une seule écoute pour la coquille et les pages.
  final VeilleReseau? veille;

  @override
  State<NouvelleCoquille> createState() => NouvelleCoquilleState();
}

/// État public, T11 : la racine pilote la navigation (retour à
/// l'accueil depuis la bande Connexion, ouverture de la Bible
/// depuis la Prière du jour, tuiles de l'accueil) par la clé.
class NouvelleCoquilleState extends State<NouvelleCoquille> {
  int _onglet = 0;
  DestinationNouvelle? _destination;
  late final VeilleReseau _veille;

  /// Retour à l'accueil, quel que soit l'onglet ou la destination.
  void allerAccueil() {
    setState(() {
      _onglet = 0;
      _destination = null;
    });
  }

  /// Ouverture d'un onglet, 0 Accueil, 1 Bible, 2 Connexion,
  /// 3 Librairie, 4 Plus. La Bible se reconstruit à chaque arrivée.
  void allerOnglet(int index) {
    setState(() {
      _onglet = index;
      _destination = null;
      if (_onglets[index] == DestinationNouvelle.bible) _cleBible++;
    });
  }

  /// Ouverture d'une destination du tiroir ou de la page Plus.
  void ouvrirDestination(DestinationNouvelle destination) {
    _ouvrir(destination);
  }

  @override
  void initState() {
    super.initState();
    _veille = widget.veille ?? VeilleReseau.partage;
    _veille.enLigne.addListener(_surChangementLigne);
    _veille.demarrer();
  }

  @override
  void dispose() {
    _veille.enLigne.removeListener(_surChangementLigne);
    unawaited(_veille.arreter());
    super.dispose();
  }

  /// Toast transitoire à la perte du réseau seulement, jamais
  /// de bandeau, jamais sur 401 ou 429 : la veille ne lit que
  /// l'état du réseau, pas les réponses HTTP.
  void _surChangementLigne() {
    if (!_veille.enLigne.value && mounted) {
      VeilleReseau.toastHorsLigne(context);
    }
  }

  /// Clé de la page Bible, tranche T6 : chaque arrivée sur
  /// l'onglet Bible reconstruit la page, donc aucun onglet
  /// actif, aucune liste, remise à zéro à chaque arrivée.
  int _cleBible = 0;

  static const _onglets = [
    DestinationNouvelle.accueil,
    DestinationNouvelle.bible,
    DestinationNouvelle.connexion,
    DestinationNouvelle.librairie,
    DestinationNouvelle.plus,
  ];

  static const _iconesOnglets = [
    Icons.home_outlined,
    Icons.menu_book_outlined,
    Icons.groups_outlined,
    Icons.local_library_outlined,
    Icons.grid_view_outlined,
  ];

  void _allerAccueil() {
    setState(() {
      _onglet = 0;
      _destination = null;
    });
  }

  void _ouvrir(DestinationNouvelle destination) {
    setState(() => _destination = destination);
  }

  void _choisirOnglet(int index) {
    setState(() {
      _onglet = index;
      _destination = null;
      if (_onglets[index] == DestinationNouvelle.bible) _cleBible++;
    });
  }

  Widget _pagePour(DestinationNouvelle destination) {
    return switch (destination) {
      DestinationNouvelle.parametres =>
        PageParametres(onSupprimerCompte: widget.onSupprimerCompte),
      DestinationNouvelle.plus => PagePlus(onNaviguer: _ouvrir),
      DestinationNouvelle.messagerie when widget.messagerie != null =>
        widget.messagerie!,
      DestinationNouvelle.profil when widget.profil != null =>
        widget.profil!,
      DestinationNouvelle.carte when widget.carte != null => widget.carte!,
      DestinationNouvelle.chainePriere when widget.chainePriere != null =>
        widget.chainePriere!,
      DestinationNouvelle.suivi when widget.suivi != null => widget.suivi!,
      DestinationNouvelle.opportunite when widget.opportunite != null =>
        widget.opportunite!,
      DestinationNouvelle.documents when widget.documents != null =>
        widget.documents!,
      DestinationNouvelle.croissance when widget.croissance != null =>
        widget.croissance!,
      DestinationNouvelle.fonctions when widget.fonctions != null =>
        widget.fonctions!,
      DestinationNouvelle.abonnement when widget.abonnement != null =>
        widget.abonnement!,
      DestinationNouvelle.galerie when widget.galerie != null =>
        widget.galerie!,
      DestinationNouvelle.espaceStructure when widget.espaceStructure != null =>
        widget.espaceStructure!,
      DestinationNouvelle.structure when widget.structure != null =>
        widget.structure!,
      DestinationNouvelle.notifications when widget.notifications != null =>
        widget.notifications!,
      DestinationNouvelle.journal when widget.journal != null =>
        widget.journal!,
      DestinationNouvelle.meditation when widget.meditation != null =>
        widget.meditation!,
      DestinationNouvelle.aPropos when widget.aPropos != null =>
        widget.aPropos!,
      DestinationNouvelle.presences when widget.presences != null =>
        widget.presences!,
      DestinationNouvelle.aide when widget.aide != null => widget.aide!,
      DestinationNouvelle.cotisations when widget.cotisations != null =>
        widget.cotisations!,
      DestinationNouvelle.paroleVivante when widget.paroleVivante != null =>
        widget.paroleVivante!,
      _ => PageNeutre(destination.titre),
    };
  }

  Widget get _corps {
    final destination = _destination;
    if (destination != null) return _pagePour(destination);
    final onglet = _onglets[_onglet];
    if (onglet == DestinationNouvelle.plus)
      return PagePlus(onNaviguer: _ouvrir);
    if (onglet == DestinationNouvelle.accueil && widget.accueil != null) {
      return widget.accueil!;
    }
    if (onglet == DestinationNouvelle.bible && widget.bible != null) {
      return KeyedSubtree(
        key: ValueKey('bible$_cleBible'),
        child: widget.bible!,
      );
    }
    if (onglet == DestinationNouvelle.connexion && widget.connexion != null) {
      return widget.connexion!;
    }
    if (onglet == DestinationNouvelle.librairie && widget.librairie != null) {
      return widget.librairie!;
    }
    return PageNeutre(onglet.titre);
  }

  /// Plein écran Connexion, tranche T3 : ni en-tête ni barre
  /// du bas, la page porte sa propre bande avec retour.
  bool get _pleinEcranConnexion =>
      _destination == null &&
      _onglets[_onglet] == DestinationNouvelle.connexion &&
      widget.connexion != null;

  /// Plein écran Parole vivante, tranche T13 : même règle que
  /// Connexion, la page porte sa propre bande avec retour et
  /// sa propre barre d'onglets, plus le mini-lecteur flottant.
  bool get _pleinEcranParole =>
      _destination == DestinationNouvelle.paroleVivante &&
      widget.paroleVivante != null;

  @override
  Widget build(BuildContext context) {
    final surPage = _destination != null;
    final pleinEcran = _pleinEcranConnexion || _pleinEcranParole;
    // Retour système, tranche T10 : les destinations ne passent
    // pas par le navigateur, le bouton retour du téléphone doit
    // donc revenir en arrière au lieu de quitter. Une destination
    // ouverte revient à l'onglet, un onglet autre que l'accueil
    // revient à l'accueil, sur l'accueil le retour quitte.
    // Transitions standard seulement, MaterialPageRoute partout.
    return PopScope(
      canPop: _destination == null && _onglet == 0,
      onPopInvokedWithResult: (aPop, _) {
        if (aPop) return;
        if (_destination != null) {
          setState(() => _destination = null);
        } else if (_onglet != 0) {
          _allerAccueil();
        }
      },
      child: Scaffold(
      backgroundColor: PaletteNouvelle.papier,
      drawer: TiroirNouveau(
        membre: widget.membre,
        onNaviguer: _ouvrir,
        onDeconnexion: widget.onDeconnexion,
        etatCarte: widget.etatCarte,
      ),
      appBar: pleinEcran
          ? null
          : AppBar(
              backgroundColor: Colors.white,
              elevation: 1,
              leading: surPage
                  ? IconButton(
                      icon: const Icon(Icons.arrow_back,
                          color: PaletteNouvelle.bleuNuit),
                      onPressed: () => setState(() => _destination = null),
                    )
                  : Builder(
                      builder: (ctx) => IconButton(
                        icon: const Icon(Icons.menu,
                            color: PaletteNouvelle.bleuNuit),
                        onPressed: () => Scaffold.of(ctx).openDrawer(),
                      ),
                    ),
              title: GestureDetector(
                onTap: _allerAccueil,
                child: Row(
                  children: [
                    Container(
                      width: 30,
                      height: 30,
                      alignment: Alignment.center,
                      decoration: const BoxDecoration(
                        color: PaletteNouvelle.bleuNuit,
                        shape: BoxShape.circle,
                      ),
                      child: const Text(
                        'CP',
                        style: TextStyle(
                          fontFamily: 'Cinzel',
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: PaletteNouvelle.or,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: FittedBox(
                        alignment: Alignment.centerLeft,
                        fit: BoxFit.scaleDown,
                        child: Text(
                          'CONNEXION PROPHÉTIQUE',
                          maxLines: 1,
                          style: const TextStyle(
                            fontFamily: 'Cinzel',
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: PaletteNouvelle.bleuNuit,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              actions: [
                _BoutonMessagerie(
                  nonLus: widget.nonLus,
                  onTap: () {
                    if (widget.onMessagerie != null) {
                      widget.onMessagerie!();
                    } else {
                      _ouvrir(DestinationNouvelle.messagerie);
                    }
                  },
                ),
                IconButton(
                  tooltip: 'Notifications',
                  padding: const EdgeInsets.all(6),
                  constraints:
                      const BoxConstraints(minWidth: 36, minHeight: 36),
                  style: IconButton.styleFrom(
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                  icon: const Icon(Icons.notifications_outlined,
                      color: PaletteNouvelle.bleuNuit, size: 22),
                  onPressed: () => _ouvrir(DestinationNouvelle.notifications),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 8, left: 2),
                  child: InkWell(
                    key: const ValueKey('avatarEntete'),
                    customBorder: const CircleBorder(),
                    onTap: () => _ouvrir(DestinationNouvelle.profil),
                    child: AvatarMembre(widget.membre),
                  ),
                ),
              ],
            ),
      // T17, 26 nov. 2026 : marge basse de 80 px, le bouton
      // flottant Assistant occupe une bande de 64 px en bas
      // du corps, les listes s'arrêtent au-dessus de lui.
      body: Padding(padding: const EdgeInsets.only(bottom: 80), child: _corps),
      // Sur Parole vivante le bouton flottant Assistant est
      // masqué : il recouvrirait le mini-lecteur, tranche T13.
      floatingActionButton:
          _pleinEcranParole ? null : widget.boutonFlottant,
      bottomNavigationBar: pleinEcran
          ? null
          : BottomNavigationBar(
              currentIndex: _onglet,
              onTap: _choisirOnglet,
              type: BottomNavigationBarType.fixed,
              backgroundColor: Colors.white,
              selectedItemColor: PaletteNouvelle.bleuNuit,
              unselectedItemColor: Colors.grey,
              selectedFontSize: 11,
              unselectedFontSize: 11,
              items: [
                for (var i = 0; i < _onglets.length; i++)
                  BottomNavigationBarItem(
                    icon: Icon(_iconesOnglets[i]),
                    label: _onglets[i].titre,
                  ),
              ],
            ),
      ),
    );
  }
}

/// Bulle messagerie, même logique que l'ancienne (BoutonMessagerie,
/// home_web.dart) : le vrai nombre de non lus, pastille rouge de la
/// maquette, masquée à 0, 99+ au-delà de 99. Importer l'ancienne
/// entraînerait tout l'ancien écran, la logique est reprise ici.
class _BoutonMessagerie extends StatelessWidget {
  const _BoutonMessagerie({required this.onTap, this.nonLus});
  final VoidCallback onTap;
  final ValueListenable<int>? nonLus;

  @override
  Widget build(BuildContext context) {
    final bouton = IconButton(
      tooltip: 'Messagerie',
      padding: const EdgeInsets.all(6),
      constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
      style:
          IconButton.styleFrom(tapTargetSize: MaterialTapTargetSize.shrinkWrap),
      iconSize: 22,
      icon: const Icon(Icons.message_outlined, color: PaletteNouvelle.bleuNuit),
      onPressed: onTap,
    );
    final source = nonLus;
    if (source == null) return bouton;
    return ValueListenableBuilder<int>(
      valueListenable: source,
      builder: (context, n, _) {
        if (n <= 0) return bouton;
        return Stack(
          clipBehavior: Clip.none,
          children: [
            bouton,
            Positioned(
              right: 2,
              top: 4,
              child: Container(
                constraints: const BoxConstraints(minWidth: 18, minHeight: 18),
                padding: const EdgeInsets.symmetric(horizontal: 4),
                decoration: BoxDecoration(
                  color: PaletteNouvelle.rougeBadge,
                  borderRadius: BorderRadius.circular(9),
                ),
                alignment: Alignment.center,
                child: Text(
                  n > 99 ? '99+' : '$n',
                  style: const TextStyle(
                      color: Colors.white,
                      fontSize: 11,
                      fontWeight: FontWeight.w800),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
