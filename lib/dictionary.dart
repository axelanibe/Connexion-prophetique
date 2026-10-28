// Dictionnaire biblique, hébreu de l'Ancien Testament, 27 oct. 2026.
//
// Chaque entrée donne le mot en français, son écriture en hébreu
// biblique, sa translittération simplifiée et son sens. Ce sont des
// mots courants de l'hébreu biblique, avec leur sens de base, pas des
// définitions théologiques inventées pour la structure. Le grec du
// Nouveau Testament n'est pas couvert ici, l'utilisateur a demandé
// la correspondance en hébreu.

class DictEntry {
  const DictEntry(this.french, this.hebrew, this.transliteration, this.meaningFr, this.meaningEn, this.strong);
  final String french;
  final String hebrew;
  final String transliteration;
  final String meaningFr;
  final String meaningEn;
  // Numéro de Strong, pour retrouver le mot dans n'importe quelle
  // bibliothèque biblique (Strong, Brown-Driver-Briggs, Blue Letter
  // Bible). C'est la vérification demandée le 27 oct. 2026, pour
  // ne rien inventer : chaque mot est traçable dans le lexique.
  final String strong;
}

const List<DictEntry> kBibleDictionary = [
  DictEntry('Paix', 'שָׁלוֹם', 'Shalom', 'Paix, plénitude, bien-être, état complet et en bon ordre.', 'Peace, wholeness, well-being, a complete and sound state.', 'H7965'),
  DictEntry('Ainsi soit-il', 'אָמֵן', 'Amen', 'C’est vrai, qu’il en soit ainsi, parole de confirmation et de confiance.', 'Truly, so be it, a word of confirmation and trust.', 'H543'),
  DictEntry('Louez le Seigneur', 'הַלְלוּיָהּ', 'Hallelu Yah', 'Louez Yah, louez le Seigneur, cri de louange.', 'Praise Yah, praise the Lord, a cry of praise.', 'H1984 + H3050'),
  DictEntry('Messie', 'מָשִׁיחַ', 'Mashiah', 'Oint, celui qui est oint pour une mission, roi ou prêtre consacré par l’onction.', 'Anointed one, set apart for a mission by anointing.', 'H4899'),
  DictEntry('Enseignement', 'תּוֹרָה', 'Torah', 'Enseignement, instruction, loi donnée pour guider la vie.', 'Teaching, instruction, law given to guide life.', 'H8451'),
  DictEntry('Esprit, souffle', 'רוּחַ', 'Ruach', 'Souffle, vent, esprit, force de vie qui anime.', 'Breath, wind, spirit, the life force that animates.', 'H7307'),
  DictEntry('Amour fidèle', 'חֶסֶד', 'Hesed', 'Bonté fidèle, miséricorde constante, amour qui ne lâche pas.', 'Steadfast love, constant mercy, love that does not let go.', 'H2617'),
  DictEntry('Dieu', 'אֱלֹהִים', 'Elohim', 'Dieu, nom courant de Dieu dans la Bible hébraïque.', 'God, the common name for God in the Hebrew Bible.', 'H430'),
  DictEntry('Éternel', 'יְהוָה', 'Yahvé', 'Nom propre de Dieu, révélé comme « Je suis », souvent rendu par Éternel.', 'The personal name of God, revealed as “I am”, often rendered as the LORD.', 'H3068'),
  DictEntry('Sabbat', 'שַׁבָּת', 'Shabbat', 'Repos, cessation du travail, septième jour mis à part.', 'Rest, ceasing from work, the seventh day set apart.', 'H7676'),
  DictEntry('Pâque', 'פֶּסַח', 'Pessah', 'Passage, passer par-dessus, fête de la sortie d’Égypte.', 'Passover, passing over, feast of the departure from Egypt.', 'H6453'),
  DictEntry('Alliance', 'בְּרִית', 'Berit', 'Alliance, pacte, engagement solennel entre Dieu et son peuple.', 'Covenant, pact, solemn commitment between God and his people.', 'H1285'),
  DictEntry('Foi, fidélité', 'אֱמוּנָה', 'Emouna', 'Fidélité, fermeté, confiance stable dans le temps.', 'Faithfulness, firmness, steady trust over time.', 'H530'),
  DictEntry('Grâce', 'חֵן', 'Hen', 'Faveur, grâce, bienveillance accordée sans mérite.', 'Favour, grace, kindness given without merit.', 'H2580'),
  DictEntry('Gloire', 'כָּבוֹד', 'Kavod', 'Poids, honneur, gloire, présence majestueuse de Dieu.', 'Weight, honour, glory, the majestic presence of God.', 'H3519'),
  DictEntry('Saint', 'קָדוֹשׁ', 'Kadosh', 'Saint, mis à part, séparé pour Dieu.', 'Holy, set apart, separated for God.', 'H6918'),
  DictEntry('Salut, délivrance', 'יְשׁוּעָה', 'Yeshoua', 'Délivrance, salut, secours qui sauve d’un danger.', 'Deliverance, salvation, rescue from danger.', 'H3444'),
  DictEntry('Amour', 'אַהֲבָה', 'Ahava', 'Amour, attachement profond, affection et choix.', 'Love, deep attachment, affection and choice.', 'H160'),
  DictEntry('Lumière', 'אוֹר', 'Or', 'Lumière, clarté, ce qui éclaire et révèle.', 'Light, brightness, what illuminates and reveals.', 'H216'),
  DictEntry('Parole', 'דָּבָר', 'Davar', 'Parole, chose, événement, parole qui agit.', 'Word, thing, event, a word that acts.', 'H1697'),
  DictEntry('Vie', 'חַיִּים', 'Hayim', 'Vie, existence vivante, au pluriel en hébreu.', 'Life, living existence, plural in Hebrew.', 'H2416'),
  DictEntry('Commencement', 'בְּרֵאשִׁית', 'Bereshit', 'Au commencement, au début de toute chose.', 'In the beginning, at the start of all things.', 'H7225'),
  DictEntry('Prière', 'תְּפִלָּה', 'Tefillah', 'Prière, demande et dialogue adressés à Dieu.', 'Prayer, request and dialogue addressed to God.', 'H8605'),
  DictEntry('Louange', 'תְּהִלָּה', 'Tehillah', 'Louange, chant de louange adressé à Dieu.', 'Praise, song of praise addressed to God.', 'H8416'),
];
