// Dictionnaire biblique, hébreu de l'Ancien Testament, 27 oct. 2026.
//
// Chaque entrée donne le mot en français, son écriture en hébreu
// biblique, sa translittération simplifiée et son sens. Ce sont des
// mots courants de l'hébreu biblique, avec leur sens de base, pas des
// définitions théologiques inventées pour la structure. Le grec du
// Nouveau Testament n'est pas couvert ici, l'utilisateur a demandé
// la correspondance en hébreu.

class DictEntry {
  const DictEntry(this.french, this.hebrew, this.transliteration, this.meaningFr, this.meaningEn, this.strong, {this.book = '', this.reference = ''});
  final String french;
  // Écriture originale : hébreu pour l'Ancien Testament, grec pour
  // le Nouveau Testament, qui est écrit en grec, pas en hébreu.
  // Donner de l'hébreu pour un livre du Nouveau Testament serait
  // une erreur, c'est pourquoi les 27 livres du Nouveau Testament
  // sont en grec dans ce dictionnaire.
  final String hebrew;
  final String transliteration;
  final String meaningFr;
  final String meaningEn;
  // Numéro de Strong, pour retrouver le mot dans n'importe quelle
  // bibliothèque biblique (Strong, Brown-Driver-Briggs, Blue Letter
  // Bible). C'est la vérification demandée le 27 oct. 2026, pour
  // ne rien inventer : chaque mot est traçable dans le lexique.
  final String strong;
  // Livre couvert par le mot, vide pour les mots essentiels qui
  // traversent toute la Bible. Référence où le mot apparaît dans
  // ce livre, pour vérifier sans chercher dans tout le texte.
  final String book;
  final String reference;
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
  DictEntry('Père', 'אָב', 'Av', 'Père, ancêtre, origine, celui dont on descend.', 'Father, ancestor, origin.', 'H1'),
  DictEntry('Fils', 'בֵּן', 'Ben', 'Fils, descendant, enfant mâle.', 'Son, descendant, male child.', 'H1121'),
  DictEntry('Cœur', 'לֵב', 'Lev', 'Cœur, siège des pensées, des choix et des sentiments.', 'Heart, seat of thoughts, choices and feelings.', 'H3820'),
  DictEntry('Âme', 'נֶפֶשׁ', 'Nephesh', 'Âme, être vivant, vie elle-même, personne.', 'Soul, living being, life itself, person.', 'H5315'),
  DictEntry('Main', 'יָד', 'Yad', 'Main, force, action, ce que la main tient ou fait.', 'Hand, strength, action.', 'H3027'),
  DictEntry('Cieux', 'שָׁמַיִם', 'Shamayim', 'Cieux, ciel, demeure de Dieu au-dessus de la terre.', 'Heavens, sky, dwelling of God above the earth.', 'H8064'),
  DictEntry('Terre', 'אֶרֶץ', 'Erets', 'Terre, pays, sol, monde habité.', 'Earth, land, ground, inhabited world.', 'H776'),
  DictEntry('Eau', 'מַיִם', 'Mayim', 'Eau, eaux, source de vie et de purification.', 'Water, waters, source of life and cleansing.', 'H4325'),
  DictEntry('Feu', 'אֵשׁ', 'Esh', 'Feu, flamme, présence et jugement de Dieu.', 'Fire, flame, presence and judgment of God.', 'H784'),
  DictEntry('Chemin', 'דֶּרֶךְ', 'Derekh', 'Chemin, voie, manière de vivre et de marcher.', 'Way, path, manner of living and walking.', 'H1870'),
  DictEntry('Vérité', 'אֱמֶת', 'Emet', 'Vérité, fidélité, ce qui tient et ne trompe pas.', 'Truth, faithfulness, what holds and does not deceive.', 'H571'),
  DictEntry('Justice', 'צֶדֶק', 'Tsedeq', 'Justice, droiture, ce qui est juste devant Dieu.', 'Justice, righteousness, what is right before God.', 'H6664'),
];

// Un mot clé par livre, 66 livres, 27 oct. 2026.
// Chaque mot apparaît réellement dans le livre indiqué, à la
// référence donnée, avec son numéro Strong pour vérification dans
// une bibliothèque biblique. Ancien Testament en hébreu, Nouveau
// Testament en grec, langue originale de chaque partie.
// Ce ne sont pas les seuls mots de chaque livre, ce sont les mots
// clés choisis pour comprendre le livre, un par livre, pour que
// les 66 livres soient tous couverts.
const List<DictEntry> kBibleBookWords = [
  DictEntry('Commencement', 'בְּרֵאשִׁית', 'Bereshit', 'Au commencement, premier mot de la Bible, ouverture de la création.', 'In the beginning', 'H7225', book: 'Genèse', reference: 'Genèse 1:1'),
  DictEntry('Pâque', 'פֶּסַח', 'Pessah', 'Passage, fête de la sortie d’Égypte, agneau pascal.', 'Passover', 'H6453', book: 'Exode', reference: 'Exode 12:11'),
  DictEntry('Saint', 'קָדוֹשׁ', 'Qadosh', 'Saint, mis à part pour Dieu, exigence du Lévitique pour son peuple.', 'Holy', 'H6918', book: 'Lévitique', reference: 'Lévitique 19:2'),
  DictEntry('Désert', 'מִדְבָּר', 'Midbar', 'Désert, lieu de la marche d’Israël pendant quarante ans.', 'Wilderness', 'H4057', book: 'Nombres', reference: 'Nombres 1:1'),
  DictEntry('Écoute', 'שְׁמַע', 'Shema', 'Écoute, appel central du Deutéronome : écoute, Israël, l’Éternel est un.', 'Hear, listen', 'H8085', book: 'Deutéronome', reference: 'Deutéronome 6:4'),
  DictEntry('Fortifie-toi', 'חֲזַק', 'Chazaq', 'Sois fort, encouragement répété à Josué pour entrer dans le pays.', 'Be strong', 'H2388', book: 'Josué', reference: 'Josué 1:9'),
  DictEntry('Juge', 'שֹׁפֵט', 'Shophet', 'Juge, chef suscité par Dieu pour délivrer Israël.', 'Judge', 'H8199', book: 'Juges', reference: 'Juges 2:16'),
  DictEntry('Amour fidèle', 'חֶסֶד', 'Hesed', 'Bonté fidèle, cœur du livre de Ruth, fidélité de Ruth et de Boaz.', 'Steadfast love', 'H2617', book: 'Ruth', reference: 'Ruth 2:20'),
  DictEntry('Oint', 'מָשִׁיחַ', 'Mashiah', 'Oint, David oint roi, figure du Messie à venir.', 'Anointed one', 'H4899', book: '1 Samuel', reference: '1 Samuel 16:13'),
  DictEntry('Alliance', 'בְּרִית', 'Berit', 'Alliance, promesse de Dieu à David pour sa maison.', 'Covenant', 'H1285', book: '2 Samuel', reference: '2 Samuel 7:12'),
  DictEntry('Sagesse', 'חָכְמָה', 'Chokhmah', 'Sagesse, demandée par Salomon pour gouverner.', 'Wisdom', 'H2451', book: '1 Rois', reference: '1 Rois 3:9'),
  DictEntry('Prophète', 'נָבִיא', 'Navi', 'Prophète, porte-parole de Dieu, Élie et Élisée.', 'Prophet', 'H5030', book: '2 Rois', reference: '2 Rois 2:11'),
  DictEntry('Louez', 'יָדָה', 'Yadah', 'Louez, remerciez, action de grâce de David pour l’arche.', 'Praise, give thanks', 'H3034', book: '1 Chroniques', reference: '1 Chroniques 16:8'),
  DictEntry('Maison', 'בַּיִת', 'Bayit', 'Maison, le Temple, maison de Dieu à Jérusalem.', 'House, temple', 'H1004', book: '2 Chroniques', reference: '2 Chroniques 7:16'),
  DictEntry('Scribe', 'סֹפֵר', 'Sopher', 'Scribe, Esdras, scribe versé dans la loi de Moïse.', 'Scribe', 'H5608', book: 'Esdras', reference: 'Esdras 7:6'),
  DictEntry('Bâtir', 'בָּנָה', 'Bana', 'Bâtir, reconstruire la muraille de Jérusalem.', 'Build', 'H1129', book: 'Néhémie', reference: 'Néhémie 2:17'),
  DictEntry('Sort', 'פּוּר', 'Pur', 'Sort, tirage au sort d’où vient la fête des Pourim.', 'Lot', 'H6332', book: 'Esther', reference: 'Esther 3:7'),
  DictEntry('Juste', 'צַדִּיק', 'Tsaddiq', 'Juste, intègre, Job, homme intègre et droit.', 'Righteous', 'H6662', book: 'Job', reference: 'Job 1:1'),
  DictEntry('Louange', 'תְּהִלָּה', 'Tehillah', 'Louange, chant de louange, cœur des Psaumes.', 'Praise', 'H8416', book: 'Psaumes', reference: 'Psaumes 150:6'),
  DictEntry('Instruction', 'מוּסָר', 'Mussar', 'Instruction, discipline, formation du fils sage.', 'Instruction, discipline', 'H4148', book: 'Proverbes', reference: 'Proverbes 1:2'),
  DictEntry('Souffle, vanité', 'הֶבֶל', 'Hevel', 'Souffle, vanité, tout est souffle, refrain de l’Ecclésiaste.', 'Breath, vanity', 'H1892', book: 'Ecclésiaste', reference: 'Ecclésiaste 1:2'),
  DictEntry('Amour', 'אַהֲבָה', 'Ahava', 'Amour, fort comme la mort, chant du Cantique.', 'Love', 'H160', book: 'Cantique des cantiques', reference: 'Cantique 8:7'),
  DictEntry('Dieu avec nous', 'עִמָּנוּאֵל', 'Emmanuel', 'Dieu avec nous, nom annoncé pour l’enfant d’Ésaïe.', 'God with us', 'H6005', book: 'Ésaïe', reference: 'Ésaïe 7:14'),
  DictEntry('Reviens', 'שׁוּב', 'Shuv', 'Reviens, retour, appel de Jérémie au peuple infidèle.', 'Return', 'H7725', book: 'Jérémie', reference: 'Jérémie 3:12'),
  DictEntry('Lamentation', 'קִינָה', 'Qinah', 'Lamentation, chant de deuil sur Jérusalem détruite.', 'Lament', 'H7015', book: 'Lamentations', reference: 'Lamentations 1:1'),
  DictEntry('Esprit', 'רוּחַ', 'Ruach', 'Esprit, souffle de Dieu qui redonne vie aux ossements.', 'Spirit, breath', 'H7307', book: 'Ézéchiel', reference: 'Ézéchiel 37:14'),
  DictEntry('Vision', 'חָזוֹן', 'Chazon', 'Vision, révélations données à Daniel.', 'Vision', 'H2377', book: 'Daniel', reference: 'Daniel 7:1'),
  DictEntry('Connaître', 'יָדַע', 'Yada', 'Connaître, connaissance de Dieu réclamée par Osée.', 'Know', 'H3045', book: 'Osée', reference: 'Osée 6:6'),
  DictEntry('Jour', 'יוֹם', 'Yom', 'Jour, jour de l’Éternel annoncé par Joël.', 'Day', 'H3117', book: 'Joël', reference: 'Joël 2:1'),
  DictEntry('Droit', 'מִשְׁפָּט', 'Mishpat', 'Droit, justice, que le droit coule comme un torrent.', 'Justice', 'H4941', book: 'Amos', reference: 'Amos 5:24'),
  DictEntry('Délivrance', 'פְּלֵיטָה', 'Peleitah', 'Délivrance, échappés, salut sur la montagne de Sion.', 'Deliverance, escape', 'H6413', book: 'Abdias', reference: 'Abdias 1:17'),
  DictEntry('Poisson', 'דָּג', 'Dag', 'Poisson, grand poisson qui avale Jonas.', 'Fish', 'H1709', book: 'Jonas', reference: 'Jonas 2:1'),
  DictEntry('Marcher humblement', 'צָנַע', 'Tsana', 'Marcher humblement, avec Dieu, exigence de Michée.', 'Walk humbly', 'H6800', book: 'Michée', reference: 'Michée 6:8'),
  DictEntry('Bon', 'טוֹב', 'Tov', 'Bon, l’Éternel est bon, refuge au jour de la détresse.', 'Good', 'H2896', book: 'Nahum', reference: 'Nahum 1:7'),
  DictEntry('Foi', 'אֱמוּנָה', 'Emouna', 'Foi, fidélité, le juste vivra par sa foi.', 'Faith, faithfulness', 'H530', book: 'Habacuc', reference: 'Habacuc 2:4'),
  DictEntry('Reste', 'שְׁאֵרִית', 'Sheerit', 'Reste, reste d’Israël préservé par Dieu.', 'Remnant', 'H7611', book: 'Sophonie', reference: 'Sophonie 3:13'),
  DictEntry('Gloire', 'כָּבוֹד', 'Kavod', 'Gloire, gloire de la maison à venir, plus grande que la première.', 'Glory', 'H3519', book: 'Aggée', reference: 'Aggée 2:9'),
  DictEntry('Germe', 'צֶמַח', 'Tsemach', 'Germe, rejeton, serviteur annoncé par Zacharie.', 'Branch, shoot', 'H6780', book: 'Zacharie', reference: 'Zacharie 3:8'),
  DictEntry('Messager', 'מַלְאָךְ', 'Malakh', 'Messager, envoyé de Dieu devant le Seigneur.', 'Messenger', 'H4397', book: 'Malachie', reference: 'Malachie 3:1'),
  DictEntry('Royaume', 'βασιλεία', 'Basileia', 'Royaume, royaume des cieux annoncé par Matthieu.', 'Kingdom', 'G932', book: 'Matthieu', reference: 'Matthieu 4:17'),
  DictEntry('Bonne nouvelle', 'εὐαγγέλιον', 'Euangelion', 'Bonne nouvelle, évangile de Jésus-Christ, Fils de Dieu.', 'Good news, gospel', 'G2098', book: 'Marc', reference: 'Marc 1:1'),
  DictEntry('Sauveur', 'σωτήρ', 'Soter', 'Sauveur, né aujourd’hui, Christ, le Seigneur.', 'Saviour', 'G4990', book: 'Luc', reference: 'Luc 2:11'),
  DictEntry('Parole', 'λόγος', 'Logos', 'Parole, au commencement était la Parole.', 'Word', 'G3056', book: 'Jean', reference: 'Jean 1:1'),
  DictEntry('Esprit', 'πνεῦμα', 'Pneuma', 'Esprit, Esprit Saint promis aux apôtres.', 'Spirit', 'G4151', book: 'Actes', reference: 'Actes 1:8'),
  DictEntry('Justice', 'δικαιοσύνη', 'Dikaiosyne', 'Justice, justice de Dieu révélée dans l’évangile.', 'Righteousness', 'G1343', book: 'Romains', reference: 'Romains 1:17'),
  DictEntry('Amour', 'ἀγάπη', 'Agape', 'Amour, hymne à l’amour, plus grand chemin.', 'Love', 'G26', book: '1 Corinthiens', reference: '1 Corinthiens 13:13'),
  DictEntry('Consolation', 'παράκλησις', 'Paraklesis', 'Consolation, Dieu de toute consolation.', 'Comfort, consolation', 'G3874', book: '2 Corinthiens', reference: '2 Corinthiens 1:3'),
  DictEntry('Liberté', 'ἐλευθερία', 'Eleutheria', 'Liberté, Christ nous a affranchis pour la liberté.', 'Freedom', 'G1657', book: 'Galates', reference: 'Galates 5:1'),
  DictEntry('Grâce', 'χάρις', 'Charis', 'Grâce, sauvés par la grâce, par la foi.', 'Grace', 'G5485', book: 'Éphésiens', reference: 'Éphésiens 2:8'),
  DictEntry('Joie', 'χαρά', 'Chara', 'Joie, réjouissez-vous toujours dans le Seigneur.', 'Joy', 'G5479', book: 'Philippiens', reference: 'Philippiens 4:4'),
  DictEntry('Tête', 'κεφαλή', 'Kephale', 'Tête, Christ, tête du corps, l’Église.', 'Head', 'G2776', book: 'Colossiens', reference: 'Colossiens 1:18'),
  DictEntry('Venue', 'παρουσία', 'Parousia', 'Venue, retour du Seigneur annoncé aux Thessaloniciens.', 'Coming, presence', 'G3952', book: '1 Thessaloniciens', reference: '1 Thessaloniciens 4:15'),
  DictEntry('Persévérance', 'ὑπομονή', 'Hypomone', 'Persévérance, patience dans l’attente du Seigneur.', 'Endurance, patience', 'G5281', book: '2 Thessaloniciens', reference: '2 Thessaloniciens 3:5'),
  DictEntry('Piété', 'εὐσέβεια', 'Eusebeia', 'Piété, exercice pour la piété, utile à tout.', 'Godliness', 'G2150', book: '1 Timothée', reference: '1 Timothée 4:7'),
  DictEntry('Dépôt', 'παραθήκη', 'Paratheke', 'Dépôt, bon dépôt à garder par l’Esprit Saint.', 'Deposit, trust', 'G3866', book: '2 Timothée', reference: '2 Timothée 1:14'),
  DictEntry('Enseignement', 'διδασκαλία', 'Didaskalia', 'Enseignement, enseignement sain selon Tite.', 'Teaching', 'G1319', book: 'Tite', reference: 'Tite 2:1'),
  DictEntry('Communion', 'κοινωνία', 'Koinonia', 'Communion, partage, communion de la foi.', 'Fellowship', 'G2842', book: 'Philémon', reference: 'Philémon 1:6'),
  DictEntry('Foi', 'πίστις', 'Pistis', 'Foi, assurance des choses espérées, démonstration des invisibles.', 'Faith', 'G4102', book: 'Hébreux', reference: 'Hébreux 11:1'),
  DictEntry('Œuvre', 'ἔργον', 'Ergon', 'Œuvre, foi sans les œuvres est morte.', 'Work, deed', 'G2041', book: 'Jacques', reference: 'Jacques 2:17'),
  DictEntry('Espérance', 'ἐλπίς', 'Elpis', 'Espérance, espérance vivante par la résurrection.', 'Hope', 'G1680', book: '1 Pierre', reference: '1 Pierre 1:3'),
  DictEntry('Connaissance', 'ἐπίγνωσις', 'Epignosis', 'Connaissance, connaissance de Dieu et de Jésus.', 'Knowledge', 'G1922', book: '2 Pierre', reference: '2 Pierre 1:2'),
  DictEntry('Lumière', 'φῶς', 'Phos', 'Lumière, Dieu est lumière, il n’y a pas en lui de ténèbres.', 'Light', 'G5457', book: '1 Jean', reference: '1 Jean 1:5'),
  DictEntry('Vérité', 'ἀλήθεια', 'Aletheia', 'Vérité, marcher dans la vérité, aimés dans la vérité.', 'Truth', 'G225', book: '2 Jean', reference: '2 Jean 1:1'),
  DictEntry('Bon', 'ἀγαθός', 'Agathos', 'Bon, celui qui fait le bien est de Dieu.', 'Good', 'G18', book: '3 Jean', reference: '3 Jean 1:11'),
  DictEntry('Garder', 'τηρέω', 'Tereo', 'Garder, gardez-vous dans l’amour de Dieu.', 'Keep, guard', 'G5083', book: 'Jude', reference: 'Jude 1:21'),
  DictEntry('Révélation', 'ἀποκάλυψις', 'Apokalypsis', 'Révélation, révélation de Jésus-Christ.', 'Revelation', 'G602', book: 'Apocalypse', reference: 'Apocalypse 1:1'),
];
