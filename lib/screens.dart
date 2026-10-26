import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'models.dart';
import 'services.dart';

const navyDark = Color(0xFF0F172A);
const navy = Color(0xFF1E293B);
const gold = Color(0xFFD97706);
const goldLight = Color(0xFFF59E0B);

/// Écran d'accueil, sans le texte d'accueil retiré par la structure.
/// La section Quiz Bible remplace cet espace.
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Quiz? _currentQuiz;
  int _questionIndex = 0;
  int _score = 0;
  int? _selectedIndex;
  bool _finished = false;

  @override
  void initState() {
    super.initState();
    _currentQuiz = QuizService.quizOfTheDay(
      QuizService.seedQuizzesFr,
      DateTime.now(),
    );
  }

  void _answer(int index) {
    if (_selectedIndex != null || _currentQuiz == null) return;
    final question = _currentQuiz!.questions[_questionIndex];
    setState(() {
      _selectedIndex = index;
      if (index == question.correctIndex) _score++;
    });
  }

  void _next() {
    final quiz = _currentQuiz!;
    if (_questionIndex + 1 < quiz.questions.length) {
      setState(() {
        _questionIndex++;
        _selectedIndex = null;
      });
    } else {
      setState(() => _finished = true);
    }
  }

  void _playAnother() {
    setState(() {
      _currentQuiz = QuizService.nextQuiz(
        QuizService.seedQuizzesFr,
        _currentQuiz!,
      );
      _questionIndex = 0;
      _score = 0;
      _selectedIndex = null;
      _finished = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final quiz = _currentQuiz;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Card(
          color: navyDark,
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'CONNEXION PROPHÉTIQUE',
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
          ),
        ),
        const SizedBox(height: 12),
        if (quiz == null)
          const Card(child: Padding(
            padding: EdgeInsets.all(16),
            child: Text('Aucun quiz disponible pour le moment.'),
          ))
        else if (_finished)
          Card(
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Quiz terminé : ${quiz.character}',
                      style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: 8),
                  Text('Score : $_score / ${quiz.questions.length}'),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: _playAnother,
                    child: const Text('Jouer un autre quiz'),
                  ),
                ],
              ),
            ),
          )
        else ...[
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Quiz Bible : ${quiz.character}',
                      style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: 4),
                  Text(
                    'Question ${_questionIndex + 1} / ${quiz.questions.length}',
                  ),
                  const SizedBox(height: 12),
                  Text(
                    quiz.questions[_questionIndex].question,
                    style: Theme.of(context).textTheme.titleSmall,
                  ),
                  const SizedBox(height: 12),
                  for (var i = 0;
                      i < quiz.questions[_questionIndex].choices.length;
                      i++)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: ElevatedButton(
                        onPressed: () => _answer(i),
                        child: Text(
                          quiz.questions[_questionIndex].choices[i],
                        ),
                      ),
                    ),
                  if (_selectedIndex != null) ...[
                    const SizedBox(height: 8),
                    Text(
                      _selectedIndex ==
                              quiz.questions[_questionIndex].correctIndex
                          ? 'Bonne réponse.'
                          : 'Mauvaise réponse.',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    Text(
                      '${quiz.questions[_questionIndex].verseReference} — '
                      '${quiz.questions[_questionIndex].explanation}',
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton(
                      onPressed: _next,
                      child: const Text('Question suivante'),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
        const SizedBox(height: 12),
        const Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Établissements : Groupe Scolaire ISPAM, '
              'Groupe Scolaire Céleste, Collège La Silhouette. '
              'D’autres établissements peuvent être ajoutés '
              'par la structure, avec leurs actualités.',
            ),
          ),
        ),
      ],
    );
  }
}

/// Carte de membre : photo, matricule, QR. Validité 1 an.
/// Cotisation mensuelle : 1 000 FCFA. Aucune donnée réelle ici.
class MemberCardScreen extends StatelessWidget {
  final MemberProfile? profile;
  const MemberCardScreen({super.key, this.profile});

  @override
  Widget build(BuildContext context) {
    if (profile == null) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Text(
            'Connectez-vous avec votre numéro et votre matricule '
            'pour voir votre carte de membre.',
            textAlign: TextAlign.center,
          ),
        ),
      );
    }
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          color: navyDark,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Text(profile!.fullName,
                    style: const TextStyle(color: Colors.white, fontSize: 20)),
                const SizedBox(height: 4),
                Text('Matricule : ${profile!.matricule}',
                    style: const TextStyle(color: goldLight)),
                const SizedBox(height: 4),
                Text(profile!.ministry,
                    style: const TextStyle(color: Colors.white70)),
                const SizedBox(height: 16),
                Container(
                  color: Colors.white,
                  padding: const EdgeInsets.all(12),
                  child: QrImageView(data: profile!.qrPayload, size: 180),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class BibleScreen extends StatelessWidget {
  const BibleScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: const [
        Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Bible Louis Segond en français, King James en anglais. '
              'Livre, chapitre, verset, recherche par mot-clé, '
              'verset du jour, favoris par verset, reprise de la '
              'dernière lecture. Les chapitres déjà consultés '
              'restent disponibles hors ligne.',
            ),
          ),
        ),
      ],
    );
  }
}

class CampsScreen extends StatelessWidget {
  const CampsScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: const [
        Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Camps et retraites. Dates, lieux et tarifs « À confirmer » '
              'tant que la structure ne les a pas fournis. '
              'Inscription avec badge numérique pour le '
              'Camp National Kairos. L’inscription exige internet.',
            ),
          ),
        ),
      ],
    );
  }
}

class LibraryScreen extends StatelessWidget {
  const LibraryScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: const [
        Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Librairie. Catalogue créé par la structure, aucun '
              'titre, auteur, prix ni fichier inventé. La structure '
              'peut modifier un livre déjà publié, sans changer '
              'les achats déjà payés ni leurs factures. Achat '
              'Wave direct, jamais payé sans confirmation vérifiée.',
            ),
          ),
        ),
      ],
    );
  }
}

/// Dons et contributions : Wave Business direct, sans agrégateur.
/// La demande reste en attente, jamais payée sur le seul lien.
class GivingScreen extends StatelessWidget {
  const GivingScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Contributions par Wave, en lien avec montant exact. '
              'La demande reste en attente de confirmation Wave. '
              'La facture PDF ou JPG est générée seulement après '
              'confirmation vérifiée ou validation explicite de '
              'la structure après contrôle de son compte Wave.',
            ),
          ),
        ),
        const SizedBox(height: 12),
        ElevatedButton(
          onPressed: () {
            const request = PaymentRequest(
              id: 'exemple',
              reference: 'CP-PAY-EXEMPLE',
              amountFcfa: 1000,
              phone: '',
              status: PaymentStatus.pending,
            );
            WavePaymentService.openPayment(request);
          },
          child: const Text('Payer avec Wave (exemple 1 000 FCFA)'),
        ),
      ],
    );
  }
}

/// Sujets de prière : e-mail seulement, sans enregistrement, sans mur.
class PrayerScreen extends StatefulWidget {
  const PrayerScreen({super.key});
  @override
  State<PrayerScreen> createState() => _PrayerScreenState();
}

class _PrayerScreenState extends State<PrayerScreen> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final controller = _controller;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Votre sujet de prière part par e-mail à la structure. '
              'Il reste privé. Il n’est ni enregistré ni publié '
              'dans l’application.',
            ),
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: controller,
          maxLines: 6,
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            labelText: 'Votre sujet de prière',
          ),
        ),
        const SizedBox(height: 12),
        ElevatedButton(
          onPressed: () => PrayerService.openPrayerEmail(controller.text),
          child: const Text('Envoyer par e-mail'),
        ),
      ],
    );
  }
}
