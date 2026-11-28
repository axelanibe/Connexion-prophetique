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
import 'package:flutter_svg/flutter_svg.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

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

// Marge basse de la coquille, point 17, 28 nov. 2026 : 120 px
// pour que le bas de chaque liste reste au-dessus du bouton
// flottant Assistant. Elle vit DANS le contenu défilant, via
// la marge MediaQuery du corps, jamais hors de lui : hors du
// défilement, elle peignait une bande opaque au-dessus de la
// barre du bas. Les listes la reprennent en bas, soit par
// leur marge par défaut, soit par MediaQuery.paddingOf.
const double margeBasseCoquille = 120.0;

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
    this.etablissements,
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
    this.elections,
    this.camps,
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
  final Widget? etablissements;

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
  final Widget? elections;

  /// Page Camps, tranche T20.
  final Widget? camps;

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
    LucideIcons.home,
    LucideIcons.bookOpen,
    LucideIcons.users,
    LucideIcons.shoppingBag,
    LucideIcons.ellipsis,
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
      DestinationNouvelle.profil when widget.profil != null => widget.profil!,
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
      DestinationNouvelle.etablissements when widget.etablissements != null =>
        widget.etablissements!,
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
      DestinationNouvelle.elections when widget.elections != null =>
        widget.elections!,
      DestinationNouvelle.camps when widget.camps != null => widget.camps!,
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
                        icon: const Icon(LucideIcons.chevronLeft,
                            color: PaletteNouvelle.bleuNuit),
                        onPressed: () => setState(() => _destination = null),
                      )
                    : Builder(
                        builder: (ctx) => IconButton(
                          icon: const Icon(LucideIcons.menu,
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
                    icon: const Icon(LucideIcons.bell,
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
        // Point 17, 28 nov. 2026 : la marge basse vit dans le
        // contenu défilant, pas hors de lui. La marge MediaQuery
        // du corps porte les 120 px : chaque liste les reprend
        // en bas, le texte reste visible pendant tout le
        // défilement et ne disparaît que derrière la barre du
        // bas elle-même. Parole vivante est plein écran, sans
        // barre ni bouton flottant, elle n'en a pas besoin.
        body: _pleinEcranParole
            ? _corps
            : MediaQuery(
                data: MediaQuery.of(context).copyWith(
                  padding: MediaQuery.of(context).padding.copyWith(
                        bottom: MediaQuery.of(context).padding.bottom +
                            margeBasseCoquille,
                      ),
                ),
                child: _corps,
              ),
        // Sur Parole vivante le bouton flottant Assistant est
        // masqué : il recouvrirait le mini-lecteur, tranche T13.
        floatingActionButton: _pleinEcranParole ? null : widget.boutonFlottant,
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

/// Bulle Messenger exacte de la maquette, correctif global
/// 27 nov. 2026 : bulle pleine avec éclair, récupérée telle
/// quelle du fichier svg-exact-messagerie-maquette.svg. La
/// tuile Témoignages garde la bulle contour Lucide, les deux
/// icônes ne se confondent plus.
const _svgMessagerie =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.25.35.25.57l.05 1.78c.02.57.61.94 1.13.71l1.98-.87c.17-.08.36-.09.54-.03.88.25 1.8.38 2.91.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6.02 7.46-3.17 5.03c-.47.74-1.48.92-2.25.42l-2.36-1.9a.6.6 0 0 0-.75 0l-3.3 2.64c-.42.34-.97-.18-.71-.66l3.17-5.03c.47-.74 1.48-.92 2.25-.42l2.36 1.9c.22.18.53.18.75 0l3.3-2.64c.42-.34.97.18.71.66Z"/></svg>';

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
      icon: SvgPicture.string(
        _svgMessagerie,
        width: 22,
        height: 22,
        colorFilter: const ColorFilter.mode(
          PaletteNouvelle.bleuNuit,
          BlendMode.srcIn,
        ),
      ),
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
