// Visite guidée interactive, carte 90, 7 nov. 2026 :
// ce n'est pas la présentation de première installation de la
// carte 71, 8 écrans défilants avant la connexion. Ici, la visite
// se fait dans l'application, après la connexion, sur les vrais
// écrans : chaque étape amène le membre sur l'onglet de la
// fonction, et un encadré en bas explique, en une phrase courte,
// à quoi elle sert, avec Suivant, Passer et Terminer. Une seule
// fois, à la première connexion, puis revoir depuis Plus, À propos
// et Aide. Elle ne bloque jamais l'application : Passer ferme la
// visite à tout moment, et le drapeau est marqué comme vu.
// Aucun contenu de fonction n'est changé, aucune règle de
// paiement, ni la carte seule, ni le Profil seul.
// Détection sans GPS, sans serveur : le drapeau est local, comme
// celui de la présentation de la carte 71.
import 'package:flutter/material.dart';

import 'i18n.dart';

// Drapeau local, une seule fois, comme
// presentation_premiere_installation_vue, carte 71.
const String kVisiteGuideeFlag = 'visite_guidee_vue';

// Demande de revoir la visite, depuis Plus, À propos et Aide :
// on incrémente, l'AppShell écoute et relance la visite.
final ValueNotifier<int> demandeVisiteGuidee = ValueNotifier<int>(0);

// Une étape : l'onglet réel où elle se passe, une icône, un titre
// court et une seule phrase courte, style Max it et Desjardins,
// règle du 3 nov. 2026, jamais un long paragraphe.
class VisiteGuideeEtape {
  const VisiteGuideeEtape({required this.tab, required this.icone, required this.titre, required this.texte});
  final int tab;
  final IconData icone;
  final String titre;
  final String texte;
}

// Étapes dans l'ordre, Accueil, Bible, Librairie, Structure,
// Carte, Plus, puis les fonctions à l'intérieur. L'étape
// Comptabilité n'existe que pour les administrateurs, jamais
// pour un membre ordinaire, qui ne la voit pas dans l'application.
List<VisiteGuideeEtape> etapesVisiteGuidee({required bool admin}) {
  final etapes = <VisiteGuideeEtape>[
    VisiteGuideeEtape(tab: 0, icone: Icons.home_outlined, titre: tr('Accueil'), texte: tr('Tout commence ici : ta méditation du jour et tes actualités.')),
    VisiteGuideeEtape(tab: 0, icone: Icons.local_fire_department_outlined, titre: tr('Méditation Quotidienne'), texte: tr('Lis, écoute et partage le verset du jour.')),
    VisiteGuideeEtape(tab: 1, icone: Icons.menu_book_outlined, titre: tr('Bible'), texte: tr('Lis en texte continu, cherche un passage, mets-le en favori.')),
    VisiteGuideeEtape(tab: 1, icone: Icons.search_outlined, titre: tr('Un mot touché'), texte: tr('Touche un mot : son sens s’affiche, Strong ou Littré.')),
    VisiteGuideeEtape(tab: 2, icone: Icons.play_circle_outlined, titre: tr('Enseignements et librairie'), texte: tr('Écoute un enseignement, achète un livre.')),
    VisiteGuideeEtape(tab: 3, icone: Icons.groups_outlined, titre: tr('Structure'), texte: tr('Établissements, camps et présences, tout est ici.')),
    VisiteGuideeEtape(tab: 3, icone: Icons.event_outlined, titre: tr('Camps'), texte: tr('Inscris-toi : ton pass se crée quand le total est payé.')),
    VisiteGuideeEtape(tab: 4, icone: Icons.credit_card_outlined, titre: tr('Carte de membre'), texte: tr('Ta carte, ton matricule et ton QR, rien d’autre.')),
    VisiteGuideeEtape(tab: 5, icone: Icons.more_horiz_outlined, titre: tr('Plus'), texte: tr('Ton profil, ton journal et tes réglages sont ici.')),
    VisiteGuideeEtape(tab: 5, icone: Icons.edit_outlined, titre: tr('Mon journal'), texte: tr('Rêves, projets et messages, privés, sur ton appareil.')),
    VisiteGuideeEtape(tab: 5, icone: Icons.timer_outlined, titre: tr('Minuteur de prière'), texte: tr('Choisis 1, 5, 10 ou 15 minutes : la cloche sonne au départ.')),
    VisiteGuideeEtape(tab: 5, icone: Icons.volunteer_activism_outlined, titre: tr('Dons et sujets de prière'), texte: tr('Donne par Wave. Ton sujet de prière part par e-mail seulement.')),
    VisiteGuideeEtape(tab: 3, icone: Icons.more_vert_outlined, titre: tr('Fonctions cachées'), texte: tr('Les trois points modifient sur place. La loupe cherche, les filtres sont en déroulant.')),
  ];
  if (admin) {
    etapes.insert(
      etapes.length - 1,
      VisiteGuideeEtape(tab: 3, icone: Icons.account_balance_wallet_outlined, titre: tr('Comptabilité'), texte: tr('Paiements à valider, chiffres et scanner, pour la structure.')),
    );
  }
  return etapes;
}
