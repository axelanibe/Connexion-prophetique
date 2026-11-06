// Modèles de données de l'application CONNEXION PROPHÉTIQUE.
// Extraits de lib/main.dart le 1er nov. 2026 (étape 1 du découpage) :
// déplacement pur, aucun changement de comportement.
// main.dart réexporte ce fichier, donc les écrans qui importent
// main.dart (admin_pages.dart, differe_membre.dart)
// continuent de voir ces classes sans modification.
import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'i18n.dart';

class Member {
  Member(this.name, this.matricule, this.etab, this.since,
      {this.fonction = '', this.ministere = '', this.photoPath = '', this.photoData = '', this.validUntilOverride, this.dateNaissance, this.telephone = '', this.anneeAdhesion});
  final String name, matricule, etab, fonction, ministere, photoPath, telephone;
  // Date de naissance facultative, 29 oct. 2026 : elle ne sert qu'à
  // la carte d'anniversaire du membre lui-même et à la notification
  // locale Android. Seuls le mois et le jour sont comparés, jamais
  // l'année ni un âge, et elle n'est jamais montrée à un autre membre.
  final DateTime? dateNaissance;
  // Photo venue du serveur, en data URL, 28 oct. 2026 : c'est elle
  // qui réapparaît à la connexion, quand le chemin local a disparu
  // avec la déconnexion. Sur le web, c'est aussi elle qui s'affiche,
  // car un chemin de fichier du téléphone n'y existe pas.
  final String photoData;
  final DateTime since;
  // Date de fin de validité venue du serveur quand elle existe.
  // Le serveur n'a pas de colonnes fonction ni ministère : ces deux
  // champs restent conservés sur l'appareil seulement.
  final DateTime? validUntilOverride;
  DateTime get validUntil => validUntilOverride ?? DateTime(since.year + 1, since.month, since.day);
  // Annee d'adhesion modifiable, 4 nov. 2026, tranche carte : champ
  // separe, jamais inscrit_le, qui sert a la carte anniversaire.
  // Sans valeur serveur, l'annee d'inscription s'affiche.
  final int? anneeAdhesion;
  int get anneeAffichee => anneeAdhesion ?? since.year;
  Member withPhoto(String path) => Member(name, matricule, etab, since,
      fonction: fonction, ministere: ministere, photoPath: path, photoData: photoData, validUntilOverride: validUntilOverride, dateNaissance: dateNaissance, telephone: telephone, anneeAdhesion: anneeAdhesion);
  Member withServerPhoto(String dataUrl) => Member(name, matricule, etab, since,
      fonction: fonction, ministere: ministere, photoPath: photoPath, photoData: dataUrl, validUntilOverride: validUntilOverride, dateNaissance: dateNaissance, telephone: telephone, anneeAdhesion: anneeAdhesion);
  bool get hasPhoto => photoData.isNotEmpty || photoPath.isNotEmpty;
}

/// Photo du membre, prête à afficher : la photo serveur d'abord,
/// puis le chemin local, sinon rien. Utilisée partout où la photo
/// s'affiche, en-tête, accueil, profil et carte, pour que les quatre
/// montrent la même photo, au même moment.
ImageProvider? memberPhotoProvider(Member m) {
  if (m.photoData.isNotEmpty) {
    try {
      final comma = m.photoData.indexOf(',');
      final bytes = base64Decode(comma >= 0 ? m.photoData.substring(comma + 1) : m.photoData);
      return MemoryImage(bytes);
    } catch (_) {}
  }
  if (m.photoPath.isNotEmpty) {
    try {
      // Sur le web, un chemin blob d'ImagePicker s'affiche par le
      // réseau, jamais par FileImage, 30 oct. 2026.
      if (kIsWeb && m.photoPath.startsWith('blob:')) return NetworkImage(m.photoPath);
      return FileImage(File(m.photoPath));
    } catch (_) {}
  }
  return null;
}

Widget memberPhotoWidget(Member m, {BoxFit fit = BoxFit.cover}) {
  final provider = memberPhotoProvider(m);
  if (provider == null) return const SizedBox.shrink();
  return Image(image: provider, fit: fit, errorBuilder: (_, __, ___) => const SizedBox.shrink());
}

// Anniversaires, 29 oct. 2026.
//
// Limite franche : sans notification poussée, rien ne peut
// apparaître sur un téléphone complètement fermé. Comme le verset
// du jour, le téléphone programme et le serveur connaît les dates.
// La carte s'affiche à l'ouverture, sur web comme sur iPhone, et
// la notification locale Android part le matin, comme le verset.
bool _isLeapYear(int y) => (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;

/// Vrai si la date de naissance tombe aujourd'hui. Un 29 février
/// est fêté le 28 février les années non bissextiles, pour que
/// personne ne perde son anniversaire trois ans sur quatre.
bool isBirthdayToday(DateTime birth, DateTime today) {
  if (birth.month == 2 && birth.day == 29 && !_isLeapYear(today.year)) {
    return today.month == 2 && today.day == 28;
  }
  return birth.month == today.month && birth.day == today.day;
}

String birthLabel(DateTime d) =>
    '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';

String birthIso(DateTime d) =>
    '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

class Book {
  Book({required this.id, required this.title, required this.author, required this.price,
      this.description = '', this.format = '', this.fileUrl = '', this.serverId = '', this.imagePath = '', this.imageUrl = '', this.fichierId = ''});
  final int id;
  // Identifiant serveur (UUID) quand le livre vient du serveur. Il sert
  // aux achats et au fichier côté serveur ; l'id local ne sert qu'à l'affichage.
  // Mutable : il est rempli après une publication serveur réussie, pour
  // que la synchronisation suivante retrouve ce livre sur tous les
  // appareils, au lieu de rester un livre local sans identifiant.
  String serverId;
  String title, author, description, format, fileUrl;
  // Identifiant du fichier PDF ou EPUB téléversé au serveur à la
  // publication. Les membres, eux, ouvrent le livre par la route
  // /livres/:id/fichier, jamais par cet identifiant direct.
  String fichierId;
  // Image de couverture : chemin local choisi dans l'espace structure,
  // et URL serveur /fichiers/<id> après téléversement, visible par tous.
  String imagePath, imageUrl;
  int price;
}

class Camp {
  Camp({required this.id, required this.name, this.dates = '', this.place = '', this.tariff = '', this.tarifFcfa = 0, this.kairos = false, this.serverId = '', this.imagePath = '', this.imageUrl = '', this.type = 'camp', this.scope = 'Structure', this.description = '', this.dateDebut, this.dateFin, this.nombrePlaces, this.inscrits = 0});
  // Type serveur : 'camp' ou 'retraite', jamais inventé ailleurs.
  // Portée d'affichage : 'Structure' ou le nom d'un établissement.
  final String type, scope;
  final int id;
  // Identifiant serveur (UUID) quand le camp vient du serveur. Il sert
  // à l'inscription côté serveur et au pass ; l'id local ne sert qu'à l'affichage.
  // Mutable, comme pour les livres : il est rempli après une
  // publication serveur réussie, pour que la synchronisation
  // suivante retrouve ce camp sur tous les appareils.
  String serverId;
  String name, dates, place, tariff, description;
  // Tarif numérique du serveur, 31 oct. 2026 : il sert au calcul
  // des versements, le texte tariff restant l'affichage.
  int tarifFcfa;
  // Liste d'attente de camp, tranche 6, 2 nov. 2026 : nombre de
  // places fixé par l'administration, null quand il n'est pas
  // fixé, et nombre d'inscrits compté par le serveur. Le camp
  // n'est complet que si une capacité est fixée et atteinte.
  int? nombrePlaces;
  int inscrits;
  bool get complet => nombrePlaces != null && inscrits >= nombrePlaces!;
  String imagePath, imageUrl;
  bool kairos;
  // Dates structurées du serveur (colonnes date), null quand la
  // structure ne les a pas renseignées : le calendrier ne place
  // jamais un camp sans date sur un jour, il le liste à part.
  DateTime? dateDebut, dateFin;
}

class ActivityItem {
  ActivityItem(this.title, {this.imagePath = '', this.imageUrl = '', this.serverId = ''});
  String title, imagePath, imageUrl, serverId;
}

class Etab {
  Etab(this.name, {this.id = '', this.imagePath = '', this.imageUrl = ''});
  final String name;
  // Identifiant serveur (UUID) quand l'établissement vient du serveur.
  // Il sert à l'inscription du membre côté serveur.
  final String id;
  String imagePath, imageUrl;
  final List<ActivityItem> activities = [];
}

class NewsItem {
  NewsItem(this.title, this.text, this.etab, this.date, {this.etablissementId = '', this.imagePath = '', this.imageUrl = '', this.serverId = '', this.programmeeLe});
  final String title, text, etab;
  final DateTime date;
  final String etablissementId;
  String imagePath, imageUrl;
  String serverId;
  // Programmation façon Facebook, 30 oct. 2026 : date et heure
  // prévues, null pour une publication immédiate.
  DateTime? programmeeLe;
}

class BureauMember {
  BureauMember(this.name, this.role, this.contact, this.consent, {this.imagePath = '', this.etab = 'Structure', this.serverId = '', this.etablissementId = ''});
  // Établissement du responsable, pour les filtres de la page
  // Bureau. Il vient du serveur depuis le 3 nov. 2026, colonne
  // etablissement_id sur bureau_membres. 'Structure' par défaut
  // pour les anciennes entrées sans établissement, 3 nov. 2026 :
  // CONNEXION PROPHÉTIQUE est une structure, pas une communauté.
  // Jamais ISPAM par défaut, jamais forcé quand le serveur en
  // fournit un.
  final String etab;
  final String name, role, contact;
  final bool consent; // le contact ne s'affiche qu'avec l'accord
  String imagePath; // photo locale, le serveur n'a pas de colonne photo pour le Bureau
  String serverId; // identifiant serveur, pour l'édition par l'administrateur général seulement
  String etablissementId; // identifiant serveur de l'établissement, vide pour Structure
}

class Teaching {
  Teaching(this.title, this.speaker, this.url, {this.kind = 'enseignement', this.imagePath = '', this.imageUrl = '', this.audioId = '', this.serverId = '', this.thematique = '', this.format = '', this.duree = '', this.dateTexte = '', this.description = ''});
  String serverId;
  final String title, speaker;
  String url;
  // Identifiant du fichier audio téléversé au serveur. Les
  // membres, eux, écoutent par /fichiers/<id>, jamais par cet
  // identifiant direct.
  String audioId;
  String imagePath, imageUrl; // image locale ; le serveur n'a pas de colonne image pour les enseignements
  // Type choisi par la structure : 'enseignement', 'musique' ou
  // 'podcast', carte 53, 6 nov. 2026. Le serveur ne renvoie pas
  // ce type, il vaut donc 'enseignement' pour les enseignements
  // venus du serveur ; la synchronisation garde le type local
  // quand le titre et l'orateur correspondent.
  final String kind;
  String get kindLabel => kind == 'musique'
      ? tr('Musique')
      : kind == 'podcast'
          ? tr('Podcast')
          : tr('Enseignement');
  IconData get kindIcon => kind == 'musique'
      ? Icons.music_note_outlined
      : kind == 'podcast'
          ? Icons.mic_outlined
          : Icons.headphones_outlined;
  String thematique, format, duree, dateTexte, description;
  String get metaLine => [speaker, thematique, format, duree, dateTexte].where((v) => v.isNotEmpty).join(' · ');
}

/// Annonce audio, 29 oct. 2026 : carte façon Wave sur l'accueil,
/// pour signaler une mise à jour ou expliquer un fonctionnement.
/// Modèle séparé des enseignements, jamais confondu avec eux :
/// ni la liste des enseignements ni leurs fichiers ne sont
/// réutilisés ici, seule l'URL audio résolue est partagée.
class AnnonceAudio {
  AnnonceAudio(this.title, this.text, this.audioUrl, {this.serverId = '', this.publieeLe, this.programmeeLe});
  final String title, text, audioUrl;
  String serverId;
  final DateTime? publieeLe;
  // Programmation façon Facebook, 30 oct. 2026 : date et heure
  // prévues, null pour une publication immédiate.
  DateTime? programmeeLe;
}

/// Carte vidéo, 30 oct. 2026 : carte façon « Regardez la
/// vidéo ! », pour expliquer une fonction de l'application
/// aux membres. Téléphone seulement, jamais sur le web.
/// Modèle séparé des enseignements et des annonces audio :
/// seule l'URL vidéo est partagée, lue dans l'application
/// par LinkViewPage, sans stockage de vidéo en base.
class CarteVideo {
  CarteVideo(this.title, this.explication, this.videoUrl, {this.serverId = ''});
  final String title, explication, videoUrl;
  String serverId;
}

class QuizQ {
  QuizQ(this.character, this.question, this.choices, this.correct, this.ref, this.explanation);
  final String character, question, ref, explanation;
  final List<String> choices;
  final int correct;
}

class PurchaseItem {
  PurchaseItem(this.bookId, this.title, this.author, this.price, {this.serverId = ''});
  int bookId;
  final int price;
  final String title, author; // copie d'origine : le catalogue ne la réécrit pas
  // Identifiant serveur du livre, quand il vient d'une ligne de
  // paiement serveur. Il survit aux changements d'identifiant
  // local, qui ne sont que des numéros d'affichage.
  String serverId;
}

class PayRequest {
  PayRequest(this.ref, this.kind, this.amount, this.items, this.memberName, this.matricule, this.date, {this.method = 'Wave', this.currency = '', this.campName = '', this.numeroVersement = 0, this.evenementId = '', this.campTotal = false, this.donBeneficiaireNom = '', this.donRole = '', this.donateurNom = ''});
  final String ref, kind, memberName, matricule; // kind : 'don' | 'achat' | 'carte' | 'cotisation' | 'camp'
  // Versement du camp, 31 oct. 2026 : nom du camp, numéro du
  // versement de 1 à 6 et identifiant serveur du camp, vides pour
  // les autres types. Modifiables, pour que la synchronisation
  // puisse les compléter sur une demande déjà créée.
  String campName;
  int numeroVersement;
  String evenementId;
  // Don de camp et paiement en une fois, 31 oct. 2026 : solde
  // complet sans numéro, nom du bénéficiaire saisi, rôle du
  // membre qui consulte (offert ou reçu), nom de celui qui offre.
  bool campTotal;
  String donBeneficiaireNom;
  String donRole;
  String donateurNom;
  final String method; // 'Wave' ou 'PayPal', jamais inventé ailleurs
  final String currency; // Devise PayPal choisie, par exemple EUR, vide pour les autres moyens
  final int amount;
  final List<PurchaseItem> items;
  final DateTime date;
  bool confirmed = false;
  DateTime? confirmedAt;
  // Refus explicite par la structure, 28 oct. 2026 : un paiement
  // refusé ne doit plus s'afficher comme en attente côté membre.
  bool refused = false;
  // Date et heure du refus, 3 nov. 2026 : sert au filtre 72 heures
  // de l'historique des refus, jamais à un calcul de total.
  DateTime? refusedAt;
}

class Registration {
  Registration(this.camp, this.member, this.date, {this.codePass = '', this.participants = 1, this.hebergement = '', this.repas = '', this.transport = '', this.tarif = 0, this.montantPaye = 0, this.versementsValides = 0, this.versementsRequis = false, this.passVisible = true, this.montantSuivant, this.versementSuivant, this.versementEnAttenteRef, this.versementEnAttenteMontant, this.versementEnAttenteNumero});
  // Détails saisis par le membre à l'inscription, affichés sur le
  // pass, comme sur la version web. Vides quand le membre ne les
  // a pas renseignés, jamais inventés par l'application.
  final int participants;
  final String hebergement, repas, transport;
  final Camp camp;
  final Member member;
  final DateTime date;
  // Code du pass venu du serveur quand l'inscription est serveur.
  // C'est ce code qui doit figurer dans le QR, pas l'id local du camp.
  final String codePass;
  // Paiement du camp en 6 fois, 31 oct. 2026 : progression mutable,
  // mise à jour à chaque synchronisation. Par défaut, le pass est
  // visible comme avant : seules les inscriptions serveur pour un
  // camp payant, créées après le déploiement, le masquent tant que
  // la totalité n'est pas validée.
  int tarif;
  int montantPaye;
  int versementsValides;
  bool versementsRequis;
  bool passVisible;
  int? montantSuivant;
  int? versementSuivant;
  String? versementEnAttenteRef;
  int? versementEnAttenteMontant;
  int? versementEnAttenteNumero;
  // Le pass est verrouillé : plan en cours, total non atteint.
  bool get passVerrouille => versementsRequis && !passVisible;
  int get montantRestant => tarif > montantPaye ? tarif - montantPaye : 0;
  int get versementsRestants => versementsValides >= 6 ? 0 : 6 - versementsValides;
}

class JournalEntry {
  JournalEntry(this.date, this.text);
  final DateTime date;
  final String text;
}

// ───────────────────────────────────────────────────────────────────
// Cartes 63, 64 et 65, 6 nov. 2026 : Info Emploi ou formation,
// pays de résidence, absences et demandes à la structure.
// Listes reprises EXACTEMENT du modèle Bureau fourni par Axel
// (~/workspace/user/files/Bureau___Connexion_Prophe_tique.html,
// modèle de Claude IA) : PAYS, TYPES, DEM_TYPES et STATUTS y
// sont copiés tels quels, dans le même ordre. Seul le thème
// sombre ardoise du modèle n'est pas repris : l'application
// garde sa palette bleu nuit #0B1F3A, or #D4A72C, fond papier
// #F5F6FA. Aucune offre, aucun pays, aucune demande n'est
// prérempli : les listes démarrent vides, la structure publie,
// le membre choisit. Aucun montant, aucune règle de paiement.
// ───────────────────────────────────────────────────────────────────

/// Pays de résidence, modèle Bureau, liste exacte, même ordre :
/// Côte d'Ivoire d'abord, puis France, Belgique, Canada,
/// Sénégal, Cameroun, Burkina Faso, Mali, Togo, Bénin, Guinée,
/// Suisse, Autre pays. Sert à l'inscription (carte 64) et au
/// pays d'une offre (carte 63). Jamais deviné, jamais déduit
/// du GPS ni de l'indicatif : vide veut dire non renseigné.
const List<String> kPaysResidence = [
  'Côte d’Ivoire',
  'France',
  'Belgique',
  'Canada',
  'Sénégal',
  'Cameroun',
  'Burkina Faso',
  'Mali',
  'Togo',
  'Bénin',
  'Guinée',
  'Suisse',
  'Autre pays',
];

/// Types d'offre, modèle Bureau, liste exacte : Emploi, Stage,
/// Formation, Bourse, Bénévolat. Pas seulement Emploi et
/// Formation comme dans la première demande du 6 nov. 2026.
const List<String> kTypesOffre = [
  'Emploi',
  'Stage',
  'Formation',
  'Bourse',
  'Bénévolat',
];

/// Types de demande, modèle Bureau, libellés exacts :
/// Absence ; Scolarité (paiement, échéancier) ; Documents
/// (attestation, certificat) ; Proposition d'opportunité ;
/// Autre demande. La Scolarité couvre les études et le
/// paiement de scolarité de la première demande, les
/// Documents couvrent le besoin de documents, attestation
/// ou certificat. Aucun type inventé en plus.
const List<String> kTypesDemande = [
  'Absence',
  'Scolarité (paiement, échéancier)',
  'Documents (attestation, certificat)',
  'Proposition d’opportunité',
  'Autre demande',
];

/// Statuts d'une demande, modèle Bureau, liste exacte :
/// Reçue, En cours, Traitée, En attente de validation,
/// Validée, Refusée. Une demande ordinaire naît Reçue, une
/// Proposition d'opportunité naît En attente de validation,
/// jamais publiée directement.
const List<String> kStatutsDemande = [
  'Reçue',
  'En cours',
  'Traitée',
  'En attente de validation',
  'Validée',
  'Refusée',
];

/// Urgence d'une demande, modèle Bureau : Urgente ou Normale.
/// Une demande urgente est marquée en rouge, bordure et
/// libellé, jamais par un autre signal.
const List<String> kUrgencesDemande = ['Urgente', 'Normale'];

/// Offre d'emploi ou de formation, carte 63.
/// Champs du modèle Bureau : pays, type, titre, lieu,
/// description, date de publication ; champs de la demande
/// d'Axel du 6 nov. 2026 gardés en plus : organisme, ville,
/// date limite, description courte, contact. La ville est le
/// lieu du modèle : un seul champ, libellé Ville / lieu.
/// Aucune offre préremplie, aucune valeur inventée : vide
/// veut dire non renseigné par la structure.
class OffreEmploi {
  OffreEmploi({
    required this.id,
    required this.titre,
    required this.type,
    required this.pays,
    this.organisme = '',
    this.ville = '',
    this.dateLimite = '',
    this.description = '',
    this.contact = '',
    required this.publieeLe,
  });
  final String id;
  String titre, type, pays, organisme, ville, dateLimite, description, contact;
  final String publieeLe;

  Map<String, dynamic> toJson() => {
        'id': id,
        'titre': titre,
        'type': type,
        'pays': pays,
        'organisme': organisme,
        'ville': ville,
        'dateLimite': dateLimite,
        'description': description,
        'contact': contact,
        'publieeLe': publieeLe,
      };

  factory OffreEmploi.fromJson(Map<String, dynamic> j) => OffreEmploi(
        id: (j['id'] ?? '').toString(),
        titre: (j['titre'] ?? '').toString(),
        type: (j['type'] ?? 'Emploi').toString(),
        pays: (j['pays'] ?? '').toString(),
        organisme: (j['organisme'] ?? '').toString(),
        ville: (j['ville'] ?? j['lieu'] ?? '').toString(),
        dateLimite: (j['dateLimite'] ?? '').toString(),
        description: (j['description'] ?? j['desc'] ?? '').toString(),
        contact: (j['contact'] ?? '').toString(),
        publieeLe: (j['publieeLe'] ?? j['publiee'] ?? '').toString(),
      );
}

/// Demande d'un membre à la structure, carte 65.
/// Privée, jamais publiée : seul le membre voit ses propres
/// demandes, les administrateurs les voient selon leur
/// périmètre. L'objet est le titre court, la description le
/// détail. Pour une Absence : activité, dates de début et de
/// fin, motif dans la description. Pour une Proposition
/// d'opportunité : type d'offre proposé, lieu, organisme et
/// contact éventuels, pour préremplir la publication. La note
/// interne n'est lue et écrite que par le Bureau, jamais
/// montrée au membre. Aucun montant, aucune promesse.
class DemandeMembre {
  DemandeMembre({
    required this.id,
    required this.matricule,
    required this.nomMembre,
    required this.etablissement,
    required this.type,
    required this.objet,
    this.description = '',
    this.pays = '',
    this.urgence = 'Normale',
    this.statut = 'Reçue',
    required this.date,
    this.activite = '',
    this.debut = '',
    this.fin = '',
    this.typeOffrePropose = '',
    this.lieu = '',
    this.organisme = '',
    this.contact = '',
    this.noteInterne = '',
  });
  final String id, matricule, nomMembre, etablissement, date;
  String type, objet, description, pays, urgence, statut;
  String activite, debut, fin;
  String typeOffrePropose, lieu, organisme, contact;
  String noteInterne;

  bool get estProposition => type.startsWith('Proposition');
  bool get estAbsence => type == 'Absence';
  bool get estUrgente => urgence == 'Urgente';

  Map<String, dynamic> toJson() => {
        'id': id,
        'matricule': matricule,
        'nomMembre': nomMembre,
        'etablissement': etablissement,
        'type': type,
        'objet': objet,
        'description': description,
        'pays': pays,
        'urgence': urgence,
        'statut': statut,
        'date': date,
        'activite': activite,
        'debut': debut,
        'fin': fin,
        'typeOffrePropose': typeOffrePropose,
        'lieu': lieu,
        'organisme': organisme,
        'contact': contact,
        'noteInterne': noteInterne,
      };

  factory DemandeMembre.fromJson(Map<String, dynamic> j) => DemandeMembre(
        id: (j['id'] ?? '').toString(),
        matricule: (j['matricule'] ?? '').toString(),
        nomMembre: (j['nomMembre'] ?? j['nom'] ?? '').toString(),
        etablissement: (j['etablissement'] ?? j['etab'] ?? '').toString(),
        type: (j['type'] ?? 'Autre demande').toString(),
        objet: (j['objet'] ?? j['titre'] ?? '').toString(),
        description: (j['description'] ?? '').toString(),
        pays: (j['pays'] ?? '').toString(),
        urgence: (j['urgence'] ?? 'Normale').toString(),
        statut: (j['statut'] ?? 'Reçue').toString(),
        date: (j['date'] ?? '').toString(),
        activite: (j['activite'] ?? '').toString(),
        debut: (j['debut'] ?? '').toString(),
        fin: (j['fin'] ?? '').toString(),
        typeOffrePropose: (j['typeOffrePropose'] ?? '').toString(),
        lieu: (j['lieu'] ?? j['ville'] ?? '').toString(),
        organisme: (j['organisme'] ?? '').toString(),
        contact: (j['contact'] ?? '').toString(),
        noteInterne: (j['noteInterne'] ?? j['note'] ?? '').toString(),
      );
}
