// Nouvel Assistant, tranche T5, 26 nov. 2026.
// Chatbox local, sans serveur : les réponses sont écrites
// ici, avec les vraies données CP seulement. Rien d'inventé :
// ni membre, ni date, ni lieu, ni prix, ni enseignement, ni
// texte de Bible hors le verset ci-dessous, Louis Segond 1910,
// déjà validé pour la Prière du jour. Seule la demande de
// prière privée quitte le téléphone, par la route existante
// POST /prieres, qui envoie l'e-mail sans rien conserver.
import 'package:flutter/material.dart';

/// Verset de la réponse prière, Philippiens 4, 6, Louis Segond 1910.
const versetPriereAssistant =
    '« Ne vous inquiétez de rien; mais en toute chose faites connaître '
    'vos besoins à Dieu par des prières et des supplications, avec des '
    'actions de grâces. » (Philippiens 4, 6)';

/// Un sujet fréquent, sa réponse écrite et ses mots-clés pour
/// la recherche dans une question libre.
class SujetAssistant {
  const SujetAssistant({
    required this.id,
    required this.titre,
    required this.icone,
    required this.reponse,
    this.motsCles = const [],
  });
  final String id;
  final String titre;
  final IconData icone;
  final String reponse;
  final List<String> motsCles;
}

/// Les six sujets de la maquette, titres et icônes repris tels
/// quels. Les réponses du prototype, elles, étaient inventées,
/// numéro de carte, dates et thème du camp, horaires, et ne
/// sont pas reprises : seules les données CP ci-dessous comptent.
const sujetsFrequentsAssistant = <SujetAssistant>[
  SujetAssistant(
    id: 'carte',
    titre: 'Carte de membre',
    icone: Icons.badge_outlined,
    reponse:
        'La carte de membre coûte 1 000 FCFA, par Wave. Elle s’affiche '
        'une fois ton paiement validé par la structure.',
    motsCles: ['carte', 'membre', 'matricule'],
  ),
  SujetAssistant(
    id: 'camp',
    titre: 'Camp National Kairos',
    icone: Icons.forest,
    reponse:
        'À l’inscription au Camp National Kairos, ton badge est créé '
        'automatiquement, avec ton nom, ta photo si elle est renseignée, '
        'ton matricule et un QR d’accès. Les dates et le lieu du camp '
        'sont à confirmer.',
    motsCles: ['camp', 'kairos', 'badge'],
  ),
  SujetAssistant(
    id: 'cotisations',
    titre: 'Cotisations',
    icone: Icons.volunteer_activism_outlined,
    reponse:
        'La cotisation du mois est de 1 000 FCFA. Elle est marquée par '
        'scan QR, sans demande préalable.',
    motsCles: ['cotisation', 'cotisations', 'don', 'payer', 'paiement'],
  ),
  SujetAssistant(
    id: 'priere',
    titre: 'Demande de prière privée',
    icone: Icons.church,
    reponse:
        'Ton sujet de prière reste privé, il est transmis à la structure '
        'par e-mail, sans affichage public. Écris-le ci-dessous.\n\n'
        '$versetPriereAssistant',
    motsCles: ['priere', 'prier', 'intercession'],
  ),
  SujetAssistant(
    id: 'programmes',
    titre: 'Programmes et activités',
    icone: Icons.calendar_month,
    reponse:
        'Les activités à venir, camps et retraites en cours, sont sur '
        'l’accueil, dans Activités à venir.',
    motsCles: ['programme', 'programmes', 'activite', 'activites', 'culte', 'horaire'],
  ),
  SujetAssistant(
    id: 'structure',
    titre: 'Parler à la structure',
    icone: Icons.forum_outlined,
    reponse:
        'Pour parler à la structure, écris dans la Messagerie : la '
        'discussion de la structure est en haut de la liste.',
    motsCles: ['structure', 'contact', 'pasteur', 'parler', 'secretariat'],
  ),
];

/// Un message de la conversation, utilisateur ou assistant.
class MessageAssistant {
  const MessageAssistant({
    required this.texte,
    required this.estUtilisateur,
    required this.creeLe,
  });
  final String texte;
  final bool estUtilisateur;
  final DateTime creeLe;
}

/// Réponse de repli, quand aucune réponse écrite ne couvre la
/// question : on ne répond jamais au hasard, on renvoie vers
/// les sujets ou vers la Messagerie.
const reponseRepliAssistant =
    'Je n’ai pas de réponse écrite pour cette question. Essaie un sujet '
    'fréquent, ou écris à la structure dans la Messagerie.';

String _sansAccents(String texte) {
  const remplacements = {
    'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'î': 'i', 'ï': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u',
    'ç': 'c',
  };
  final tampon = StringBuffer();
  for (final rune in texte.toLowerCase().runes) {
    final lettre = String.fromCharCode(rune);
    tampon.write(remplacements[lettre] ?? lettre);
  }
  return tampon.toString();
}

/// Sujet dont un mot-clé apparaît dans la question, sinon nul.
SujetAssistant? trouverSujetParTexte(String question) {
  final normalisee = _sansAccents(question);
  for (final sujet in sujetsFrequentsAssistant) {
    for (final mot in sujet.motsCles) {
      if (normalisee.contains(mot)) return sujet;
    }
  }
  return null;
}
