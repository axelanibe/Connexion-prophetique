// Fiche Sens et origine d'un mot tapé dans un verset, carte 54,
// 6 nov. 2026. Partagée par la carte Verset du jour de
// l'accueil et par la lecture d'un chapitre, sans dépendre de
// main.dart, pour que home_web.dart puisse l'utiliser aussi.
import 'package:flutter/material.dart';

import 'bible.dart';
import 'dictionary.dart';
import 'i18n.dart';
import 'littre.dart';
import 'strong_lexicon.dart';
import 'ux_global.dart';
import 'verse_words.dart';

// Fiche Sens et origine d'un mot tapé dans un verset, carte 54,
// 6 nov. 2026 : un toucher simple ouvre la fiche, un toucher long
// souligne le mot, sans conflit entre les deux gestes. La fiche
// montre d'abord l'entrée du dictionnaire existant, 114 entrées,
// quand elle existe, sinon la mention honnête Mot non encore dans
// le dictionnaire, sans jamais inventer un sens ni un numéro
// Strong. Le mot tapé en français ou en anglais n'a pas de
// correspondance Strong automatique : la Bible de l'application
// n'est pas étiquetée mot à mot, et deviner un numéro serait
// inventer. La fiche propose Souligner ce mot et Voir dans le
// dictionnaire, où le lexique de Strong, 8 674 entrées en hébreu
// et 5 523 en grec, se cherche par numéro, translittération ou
// mot anglais. Carte 58 : quand l'entrée du dictionnaire porte
// un seul numéro Strong, H7965 ou G26 par exemple, la fiche
// montre aussi l'entrée du lexique, hébreu ou grec selon la
// lettre, avec sa définition en anglais telle que dans la
// source, jamais traduite. Un numéro composé, H1984 + H3050
// par exemple, n'ouvre pas une entrée unique, il se cherche
// dans le dictionnaire. Carte 60 : la fiche montre aussi le
// premier sens du dictionnaire Littré pour le mot touché,
// avec repli sur son lemme, tel que dans la source.
Future<void> showWordSenseSheet(
  BuildContext context,
  String word,
  BibleVerseRef? ref,
  String lang,
  bool highlighted,
  int wordIndex,
  Future<void> Function(int index)? onToggleWord,
  VoidCallback? onOpenDictionary,
) async {
  final entries = [...kBibleDictionary, ...kBibleBookWords];
  final entry = findDictionaryEntry<DictEntry>(entries, (e) => e.french, word);
  await showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
    ),
    builder: (c) {
      final t = Theme.of(c).textTheme;
      return Padding(
        padding: EdgeInsets.fromLTRB(20, 16, 20, 24 + MediaQuery.of(c).viewInsets.bottom),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(tr('Sens et origine'), style: t.titleLarge?.copyWith(fontWeight: FontWeight.w800, color: Ux.navy)),
            const SizedBox(height: 4),
            Text(word, style: Ux.bible(size: 22, height: 1.3, color: Ux.ink)),
            if (ref != null) ...[
              const SizedBox(height: 4),
              Text(
                BibleService.instance.label(lang, ref.book, ref.chapter, ref.verse),
                style: t.bodyMedium?.copyWith(color: Ux.goldDeep, fontWeight: FontWeight.w700),
              ),
            ],
            const SizedBox(height: 12),
            if (entry != null) ...[
              if (entry.hebrew.isNotEmpty)
                Text(entry.hebrew, textDirection: TextDirection.rtl, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700, color: Ux.navy)),
              const SizedBox(height: 4),
              Text(entry.transliteration, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Ux.goldDeep)),
              const SizedBox(height: 4),
              Text('Strong ${entry.strong}', style: t.bodyMedium?.copyWith(color: Ux.inkMuted, fontWeight: FontWeight.w700)),
              const SizedBox(height: 8),
              Text(lang == 'fr' ? entry.meaningFr : entry.meaningEn, style: t.bodyLarge),
              if (entry.reference.isNotEmpty) ...[
                const SizedBox(height: 8),
                Text(entry.reference, style: t.bodyMedium?.copyWith(color: Ux.goldDeep, fontWeight: FontWeight.w700)),
              ],
              // Carte 58 : entrée du lexique de Strong, hébreu ou
              // grec selon la lettre du numéro, chargée à la
              // demande seulement, définition en anglais telle
              // que dans la source, jamais traduite.
              if (RegExp(r'^[HG][0-9]+$').hasMatch(entry.strong.trim()))
                FutureBuilder<StrongEntry?>(
                  future: StrongLexicon.instance.byStrong(entry.strong.trim()),
                  builder: (context, snap) {
                    final strong = snap.data;
                    if (strong == null || strong.strongsDef.isEmpty) return const SizedBox.shrink();
                    return Padding(
                      padding: const EdgeInsets.only(top: 12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${tr('Lexique de Strong')} : Strong ${strong.strong}',
                            style: t.bodyMedium?.copyWith(color: Ux.goldDeep, fontWeight: FontWeight.w700),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            tr('Définition en anglais, telle que dans le lexique de Strong'),
                            style: t.bodySmall?.copyWith(color: Ux.goldDeep, fontWeight: FontWeight.w700),
                          ),
                          Text(strong.strongsDef, style: t.bodyMedium),
                        ],
                      ),
                    );
                  },
                ),
            ] else ...[
              Text(tr('Mot non encore dans le dictionnaire'),
                  style: t.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: Ux.navy)),
              const SizedBox(height: 4),
              Text(
                tr('Ce mot n’a pas encore d’entrée dans le dictionnaire de l’application. Aucun sens inventé, cherchez-le par son numéro Strong dans le dictionnaire, ou demandez à la structure de l’ajouter.'),
                style: t.bodyMedium,
              ),
            ],
            // Carte 60 : premier sens du dictionnaire Littré
            // pour le mot touché, avec repli sur son lemme quand
            // c'est une forme fléchie, chargé à la demande
            // seulement, tel que dans la source, jamais traduit
            // ni inventé. Rien ne s'affiche si le Littré ne
            // connaît pas ce mot, la mention honnête au-dessus
            // reste.
            FutureBuilder<List<LittreEntry>>(
              future: LittreLexicon.instance.lookup(word),
              builder: (context, snap) {
                final found = snap.data ?? [];
                if (found.isEmpty || found.first.definitions.isEmpty) return const SizedBox.shrink();
                final first = found.first;
                return Padding(
                  padding: const EdgeInsets.only(top: 12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${tr('Dictionnaire Littré')} : ${first.word}${first.nature.isEmpty ? '' : ' (${first.nature})'}',
                        style: t.bodyMedium?.copyWith(color: Ux.goldDeep, fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(height: 4),
                      Text(first.definitions.first, style: t.bodyMedium),
                    ],
                  ),
                );
              },
            ),
            const SizedBox(height: 16),
            Wrap(spacing: 8, runSpacing: 8, children: [
              if (onToggleWord != null && ref != null)
                FilledButton.icon(
                  onPressed: () async {
                    Navigator.of(c).pop();
                    await onToggleWord(wordIndex);
                  },
                  icon: const Icon(Icons.format_underline_outlined),
                  label: Text(highlighted ? tr('Retirer le soulignement') : tr('Souligner ce mot')),
                ),
              if (onOpenDictionary != null)
                OutlinedButton.icon(
                  onPressed: () {
                    Navigator.of(c).pop();
                    onOpenDictionary();
                  },
                  icon: const Icon(Icons.menu_book_outlined),
                  label: Text(tr('Voir dans le dictionnaire')),
                ),
            ]),
          ],
        ),
      );
    },
  );
}

