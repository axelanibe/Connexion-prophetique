/// Modèles de données de CONNEXION PROPHÉTIQUE.
///
/// Règles qui traversent tout le code :
/// - Aucune donnée réelle n'est inventée ici. Les listes démarrent vides
///   ou avec les seules valeurs fournies par la structure.
/// - Un paiement n'est jamais « payé » sur le seul numéro, le retour de
///   navigateur ou une capture. Voir [PaymentRequest] et le service Wave.
/// - Les sujets de prière partent par e-mail à la structure. Ils ne sont
///   ni enregistrés ni publiés dans l'application.

enum PaymentStatus { pending, paid, rejected }

enum MemberRole { member, establishmentAdmin, structureAdmin }

class MemberProfile {
  final String id;
  final String firstName;
  final String lastName;
  final String phone;
  final String matricule;
  final String ministry;
  final String establishmentId;
  final bool duesUpToDate;

  const MemberProfile({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.phone,
    required this.matricule,
    required this.ministry,
    required this.establishmentId,
    required this.duesUpToDate,
  });

  String get fullName => '$firstName $lastName';

  /// Données encodées dans le QR de la carte. Vérifiées côté serveur.
  String get qrPayload => '$matricule|$fullName|$ministry';
}

class Establishment {
  final String id;
  final String name;
  final String? presentation;
  final String? address;
  final String? imageUrl;

  const Establishment({
    required this.id,
    required this.name,
    this.presentation,
    this.address,
    this.imageUrl,
  });
}

class EstablishmentNews {
  final String id;
  final String establishmentId;
  final String title;
  final String body;
  final DateTime? date;
  final String? imageUrl;

  const EstablishmentNews({
    required this.id,
    required this.establishmentId,
    required this.title,
    required this.body,
    this.date,
    this.imageUrl,
  });
}

class CampEvent {
  final String id;
  final String title;
  final String? dateLabel;
  final String? place;
  final String? priceLabel;

  /// Dates, lieux et tarifs restent « À confirmer » tant que la
  /// structure ne les a pas fournis. Aucune valeur n'est inventée.
  const CampEvent({
    required this.id,
    required this.title,
    this.dateLabel,
    this.place,
    this.priceLabel,
  });
}

class LibraryBook {
  final String id;
  final String title;
  final String author;
  final String description;
  final int priceFcfa;
  final String format;
  final String? fileUrl;

  const LibraryBook({
    required this.id,
    required this.title,
    required this.author,
    required this.description,
    required this.priceFcfa,
    required this.format,
    this.fileUrl,
  });

  LibraryBook copyWith({
    String? title,
    String? author,
    String? description,
    int? priceFcfa,
    String? format,
    String? fileUrl,
  }) {
    return LibraryBook(
      id: id,
      title: title ?? this.title,
      author: author ?? this.author,
      description: description ?? this.description,
      priceFcfa: priceFcfa ?? this.priceFcfa,
      format: format ?? this.format,
      fileUrl: fileUrl ?? this.fileUrl,
    );
  }
}

class Teaching {
  final String id;
  final String title;
  final String? speaker;
  final DateTime? date;
  final String? audioUrl;

  const Teaching({
    required this.id,
    required this.title,
    this.speaker,
    this.date,
    this.audioUrl,
  });
}

class PaymentRequest {
  final String id;
  final String reference;
  final int amountFcfa;
  final String phone;
  final PaymentStatus status;

  const PaymentRequest({
    required this.id,
    required this.reference,
    required this.amountFcfa,
    required this.phone,
    required this.status,
  });

  bool get isPaid => status == PaymentStatus.paid;
}

class QuizQuestion {
  final String character;
  final String question;
  final List<String> choices;
  final int correctIndex;
  final String verseReference;
  final String explanation;

  const QuizQuestion({
    required this.character,
    required this.question,
    required this.choices,
    required this.correctIndex,
    required this.verseReference,
    required this.explanation,
  });
}

class Quiz {
  final String id;
  final String character;
  final List<QuizQuestion> questions;

  const Quiz({required this.id, required this.character, required this.questions});
}
