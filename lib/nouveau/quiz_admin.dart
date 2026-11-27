// Gestion des questions de quiz par la structure, tranche T20.
// Même formulaire que l'ancienne version : personnage,
// question, choix A-D, bonne réponse, référence du verset,
// courte explication facultative. Seules les questions
// ajoutées sont gérées ici, jamais la banque de départ.
import 'package:flutter/material.dart';

import 'palette.dart';
import 'quiz_ajoutes.dart';

/// Ajouter une question, administrateur général seulement.
/// La feuille valide comme l'ancienne version, puis appelle
/// [onChange] pour que l'accueil recharge sa rotation.
Future<void> ajouterQuestionQuiz(
  BuildContext context, {
  required VoidCallback onChange,
}) async {
  final ajoutee = await _feuilleQuestion(context, null);
  if (ajoutee == null) return;
  await QuestionsQuizAjoutees.ajouter(ajoutee);
  onChange();
}

/// Gérer les questions ajoutées : liste, Modifier et
/// Supprimer avec confirmation pour chacune.
Future<void> gererQuestionsQuiz(
  BuildContext context, {
  required VoidCallback onChange,
}) async {
  final questions = await QuestionsQuizAjoutees.charger();
  if (!context.mounted) return;
  await showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
    ),
    builder: (ctx) => Padding(
      padding: EdgeInsets.fromLTRB(
        16,
        16,
        16,
        MediaQuery.of(ctx).viewInsets.bottom + 16,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Questions ajoutées',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: PaletteNouvelle.bleuNuit,
            ),
          ),
          const SizedBox(height: 6),
          const Text(
            'Seules les questions ajoutées par la structure apparaissent ici. Les questions de la banque ne sont jamais modifiées.',
            style: TextStyle(color: Colors.grey, fontSize: 14),
          ),
          const SizedBox(height: 12),
          if (questions.isEmpty)
            const Text('Aucune question ajoutée pour le moment.')
          else
            SizedBox(
              height: MediaQuery.of(ctx).size.height * 0.6,
              child: ListView.builder(
                itemCount: questions.length,
                itemBuilder: (_, i) {
                  final q = questions[i];
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text(q.question),
                    subtitle: Text('Personnage : ${q.personnage}'),
                    trailing: PopupMenuButton<String>(
                      onSelected: (choix) async {
                        if (choix == 'modifier') {
                          final modifiee =
                              await _feuilleQuestion(ctx, q);
                          if (modifiee == null) return;
                          await QuestionsQuizAjoutees.modifier(
                            q.id,
                            modifiee,
                          );
                          if (ctx.mounted) Navigator.of(ctx).pop();
                          onChange();
                        } else if (choix == 'supprimer') {
                          final confirmer = await showDialog<bool>(
                            context: ctx,
                            builder: (dctx) => AlertDialog(
                              title: const Text('Supprimer la question ?'),
                              content: Text(q.question),
                              actions: [
                                TextButton(
                                  onPressed: () =>
                                      Navigator.of(dctx).pop(false),
                                  child: const Text('Annuler'),
                                ),
                                FilledButton(
                                  onPressed: () =>
                                      Navigator.of(dctx).pop(true),
                                  child: const Text('Supprimer'),
                                ),
                              ],
                            ),
                          );
                          if (confirmer != true) return;
                          await QuestionsQuizAjoutees.supprimer(q.id);
                          if (ctx.mounted) Navigator.of(ctx).pop();
                          onChange();
                        }
                      },
                      itemBuilder: (_) => const [
                        PopupMenuItem(
                          value: 'modifier',
                          child: Text('Modifier'),
                        ),
                        PopupMenuItem(
                          value: 'supprimer',
                          child: Text('Supprimer'),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
        ],
      ),
    ),
  );
}

/// Formulaire d'une question, pré-rempli pour une
/// modification, vide pour un ajout. Retourne la question
/// validée, null si annulé.
Future<QuestionQuizAjoutee?> _feuilleQuestion(
  BuildContext context,
  QuestionQuizAjoutee? existante,
) {
  final personnage = TextEditingController(text: existante?.personnage ?? '');
  final question = TextEditingController(text: existante?.question ?? '');
  final choix = [
    for (var i = 0; i < 4; i++)
      TextEditingController(text: existante?.choix[i] ?? ''),
  ];
  final bonneReponse = TextEditingController(
    text: existante == null
        ? ''
        : 'ABCD'[existante.bonneReponse],
  );
  final reference =
      TextEditingController(text: existante?.reference ?? '');
  final explication =
      TextEditingController(text: existante?.explication ?? '');
  var erreur = '';
  return showModalBottomSheet<QuestionQuizAjoutee>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
    ),
    builder: (ctx) => StatefulBuilder(
      builder: (ctx, setFeuille) => Padding(
        padding: EdgeInsets.fromLTRB(
          16,
          16,
          16,
          MediaQuery.of(ctx).viewInsets.bottom + 16,
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                existante == null
                    ? 'Nouvelle question'
                    : 'Modifier la question',
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: PaletteNouvelle.bleuNuit,
                ),
              ),
              const SizedBox(height: 12),
              _Champ(controller: personnage, label: 'Personnage'),
              const SizedBox(height: 8),
              _Champ(
                controller: question,
                label: 'Question',
                lignes: 2,
              ),
              const SizedBox(height: 8),
              for (var i = 0; i < 4; i++) ...[
                _Champ(
                  controller: choix[i],
                  label: 'Choix ${'ABCD'[i]}',
                ),
                const SizedBox(height: 8),
              ],
              _Champ(
                controller: bonneReponse,
                label: 'Bonne réponse (A, B, C ou D)',
              ),
              const SizedBox(height: 8),
              _Champ(
                controller: reference,
                label: 'Référence du verset',
              ),
              const SizedBox(height: 8),
              _Champ(
                controller: explication,
                label: 'Courte explication (facultative)',
                lignes: 2,
              ),
              if (erreur.isNotEmpty) ...[
                const SizedBox(height: 8),
                Text(
                  erreur,
                  style: const TextStyle(color: Colors.red, fontSize: 14),
                ),
              ],
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton(
                  style: FilledButton.styleFrom(
                    backgroundColor: PaletteNouvelle.bleuNuit,
                  ),
                  onPressed: () {
                    final probleme = validerQuestionQuizAjoutee(
                      personnage: personnage.text,
                      question: question.text,
                      choix: choix.map((c) => c.text).toList(),
                      bonneReponse: bonneReponse.text,
                    );
                    if (probleme != null) {
                      setFeuille(() => erreur = probleme);
                      return;
                    }
                    Navigator.of(ctx).pop(
                      QuestionQuizAjoutee(
                        id: existante?.id ?? '',
                        personnage: personnage.text.trim(),
                        question: question.text.trim(),
                        choix: choix.map((c) => c.text.trim()).toList(),
                        bonneReponse: 'ABCD'.indexOf(
                          bonneReponse.text.trim().toUpperCase(),
                        ),
                        reference: reference.text.trim(),
                        explication: explication.text.trim(),
                      ),
                    );
                  },
                  child: Text(
                    existante == null ? 'Ajouter' : 'Enregistrer',
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}

class _Champ extends StatelessWidget {
  const _Champ({
    required this.controller,
    required this.label,
    this.lignes = 1,
  });
  final TextEditingController controller;
  final String label;
  final int lignes;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      maxLines: lignes,
      decoration: InputDecoration(
        labelText: label,
        filled: true,
        fillColor: const Color(0xFFF5F6FA),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }
}
