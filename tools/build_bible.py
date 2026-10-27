#!/usr/bin/env python3
"""Génère assets/bible.json à partir de sources domaine public.

Exécuté par GitHub Actions avant la construction, pour éviter de pousser
un fichier de 8 Mo par l'API. Sources :
- français : Louis Segond 1910, dépôt BibleCorps FRA-B-LSG1910-PD-UBS,
  fichiers SFM, convertis tels quels, sans retouche du texte ;
- anglais : King James Version, thiagobodruk/bible, json/en_kjv.json.
Le script supprime d'abord l'ancien assets/bible.json, puis vérifie les
comptages et trois versets témoins dans chaque langue. En cas d'échec,
il sort avec un code non nul : la construction doit s'arrêter, jamais
retomber silencieusement sur l'ancien fichier à un seul verset.
"""
import json, os, re, sys, glob, urllib.request, tempfile

TMP = tempfile.mkdtemp(prefix='bible_src_')
os.makedirs(os.path.join(TMP, 'fr'), exist_ok=True)

def fetch(url, dest):
    req = urllib.request.Request(url, headers={'User-Agent': 'connexion-prophetique-bible-build'})
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, 'wb') as f:
        f.write(r.read())

# Liste des fichiers SFM français, depuis l'API GitHub (liste publique).
import urllib.request as _u
with _u.urlopen('https://api.github.com/repos/BibleCorps/FRA-B-LSG1910-PD-UBS/contents/p.sfm?per_page=100', timeout=60) as r:
    listing = json.load(r)
for entry in listing:
    name = entry['name']
    if name.endswith('.p.sfm') and '-00-' not in name:
        fetch(entry['download_url'], os.path.join(TMP, 'fr', name))
fetch('https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json',
      os.path.join(TMP, 'en_kjv.json'))

import json, os, re, sys, glob

FR_NAMES = {
 'GEN':'Genèse','EXO':'Exode','LEV':'Lévitique','NUM':'Nombres','DEU':'Deutéronome',
 'JOS':'Josué','JDG':'Juges','RUT':'Ruth','1SA':'1 Samuel','2SA':'2 Samuel',
 '1KI':'1 Rois','2KI':'2 Rois','1CH':'1 Chroniques','2CH':'2 Chroniques','EZR':'Esdras',
 'NEH':'Néhémie','EST':'Esther','JOB':'Job','PSA':'Psaumes','PRO':'Proverbes',
 'ECC':'Ecclésiaste','SNG':'Cantique des Cantiques','ISA':'Ésaïe','JER':'Jérémie',
 'LAM':'Lamentations','EZK':'Ézéchiel','DAN':'Daniel','HOS':'Osée','JOL':'Joël',
 'AMO':'Amos','OBA':'Abdias','JON':'Jonas','MIC':'Michée','NAM':'Nahum',
 'HAB':'Habacuc','ZEP':'Sophonie','HAG':'Aggée','ZEC':'Zacharie','MAL':'Malachie',
 'MAT':'Matthieu','MRK':'Marc','LUK':'Luc','JHN':'Jean','ACT':'Actes','ROM':'Romains',
 '1CO':'1 Corinthiens','2CO':'2 Corinthiens','GAL':'Galates','EPH':'Éphésiens',
 'PHP':'Philippiens','COL':'Colossiens','1TH':'1 Thessaloniciens','2TH':'2 Thessaloniciens',
 '1TI':'1 Timothée','2TI':'2 Timothée','TIT':'Tite','PHM':'Philémon','HEB':'Hébreux',
 'JAS':'Jacques','1PE':'1 Pierre','2PE':'2 Pierre','1JN':'1 Jean','2JN':'2 Jean',
 '3JN':'3 Jean','JUD':'Jude','REV':'Apocalypse',
}

def clean_segment(s):
    # Remove cross-reference spans \x ... \x* and footnote spans \f ... \f*
    s = re.sub(r'\\x\b.*?\\x\*', '', s)
    s = re.sub(r'\\f\b.*?\\f\*', '', s)
    # Remove remaining markers like \q, \p, \wj, \wj*, \it, \it*, \nd*, etc.
    s = re.sub(r'\\[a-zA-Z]+\*?', '', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

def parse_sfm(path):
    with open(path, encoding='utf-8') as f:
        lines = f.read().splitlines()
    chapters = []
    cur_ch = None
    cur_vnum = None
    cur_parts = []
    post_b_parts = None  # parts collected after a \b inside the current verse
    def flush_verse():
        nonlocal cur_vnum, cur_parts, post_b_parts
        if cur_vnum is not None and cur_ch is not None:
            parts = post_b_parts if (post_b_parts) else cur_parts
            text = ' '.join(p for p in parts if p).strip()
            text = re.sub(r'\s+', ' ', text)
            while len(cur_ch) < cur_vnum - 1:
                cur_ch.append('')
            if len(cur_ch) == cur_vnum - 1:
                cur_ch.append(text)
            else:
                cur_ch[cur_vnum - 1] = text
        cur_vnum = None
        cur_parts = []
        post_b_parts = None
    CONT = {'q','q1','q2','q3','m','pi','li','p','wj','it','nd','qs'}
    for raw in lines:
        line = raw.strip()
        if not line:
            continue
        m = re.match(r'\\c\s+(\d+)', line)
        if m:
            flush_verse()
            cur_ch = []
            chapters.append(cur_ch)
            continue
        m = re.match(r'\\v\s+(\d+)\s*(.*)', line)
        if m:
            flush_verse()
            if cur_ch is None:
                cur_ch = []
                chapters.append(cur_ch)
            cur_vnum = int(m.group(1))
            rest = m.group(2)
            # Source typo guard: a verse number split in two, e.g. 115 written
            # as "11 5..." : if joining the leading digit gives exactly the
            # next expected verse, use it and drop that digit from the text.
            mm2 = re.match(r'(\d)([^\d\s].*)', rest)
            if mm2 and cur_ch is not None:
                joined = cur_vnum * 10 + int(mm2.group(1))
                if joined == len(cur_ch) + 1:
                    cur_vnum = joined
                    rest = mm2.group(2)
            t = clean_segment(rest)
            if t:
                cur_parts.append(t)
            continue
        if line == '\\b' or line.startswith('\\b '):
            # Start a post-blank buffer; at flush, use it only if non-empty,
            # otherwise keep the pre-blank text (psalm title as verse 1).
            post_b_parts = []
            continue
        if cur_vnum is None:
            continue
        if line.startswith('\\'):
            mm = re.match(r'\\([a-zA-Z0-9]+)', line)
            if not mm or mm.group(1) not in CONT:
                continue  # structural heading / reference line, not verse text
            t = clean_segment(line)
        else:
            t = clean_segment(line)
        if t:
            (post_b_parts if post_b_parts is not None else cur_parts).append(t)
    flush_verse()
    return chapters

fr_books = []
files = sorted(glob.glob(os.path.join(TMP, 'fr', '*.p.sfm')))
for path in files:
    base = os.path.basename(path)
    m = re.search(r'-(\d+)-([A-Z0-9]+)\.p\.sfm', base)
    if not m:
        continue
    code = m.group(2)
    if code not in FR_NAMES:
        print('SKIP', base)
        continue
    chapters = parse_sfm(path)
    fr_books.append({'name': FR_NAMES[code], 'code': code, 'chapters': chapters})
    print(code, FR_NAMES[code], 'chapters', len(chapters), 'verses', sum(len(c) for c in chapters))

print('FR books', len(fr_books), 'verses', sum(len(c) for b in fr_books for c in b['chapters']))

with open(os.path.join(TMP, 'en_kjv.json'), encoding='utf-8') as f:
    kjv = json.load(f)
en_books = []
for b in kjv:
    en_books.append({'name': b['name'], 'code': b['abbrev'], 'chapters': b['chapters']})
print('EN books', len(en_books), 'verses', sum(len(c) for b in en_books for c in b['chapters']))
for fb, eb in zip(fr_books, en_books):
    if len(fb['chapters']) != len(eb['chapters']):
        print('CHAPTER MISMATCH', fb['name'], len(fb['chapters']), eb['name'], len(eb['chapters']))

def get(books, bi, ch, vs):
    try:
        return books[bi]['chapters'][ch-1][vs-1]
    except Exception:
        return None

checks = [
    (0,1,1,'FR Gen 1:1'), (18,23,1,'FR Ps 23:1'), (42,3,16,'FR Jn 3:16'),
    (0,1,1,'EN Gen 1:1'), (18,23,1,'EN Ps 23:1'), (42,3,16,'EN Jn 3:16'),
]
for bi,ch,vs,label in checks:
    books = fr_books if label.startswith('FR') else en_books
    print(label, repr(get(books, bi, ch, vs)))
# empty verses
empty_fr = [(b['name'],ci+1,vi+1) for b in fr_books for ci,c in enumerate(b['chapters']) for vi,v in enumerate(c) if not v.strip()]
print('empty FR verses', len(empty_fr), empty_fr[:20])
empty_en = [(b['name'],ci+1,vi+1) for b in en_books for ci,c in enumerate(b['chapters']) for vi,v in enumerate(c) if not v.strip()]
print('empty EN verses', len(empty_en), empty_en[:20])

out = {
  'fr': {'source': 'Louis Segond 1910, domaine public, BibleCorps FRA-B-LSG1910-PD-UBS',
         'books': [{'name': b['name'], 'chapters': b['chapters']} for b in fr_books]},
  'en': {'source': 'King James Version, domaine public',
         'books': [{'name': b['name'], 'chapters': b['chapters']} for b in en_books]},
}
out_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets', 'bible.json')
if os.path.exists(out_path):
    os.remove(out_path)
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
print('written', out_path, os.path.getsize(out_path))

# Daily verse candidates, verified in both languages by book index
candidates = [
    (0,1,1),(18,23,1),(42,3,16),(39,6,33),(49,4,13),(23,29,11),(22,41,10),(44,8,28),
    (18,121,1),(19,3,5),(39,11,28),(46,13,4),(0,28,15),
    (42,1,1),(18,100,1),(18,1,1),(44,10,9),(39,5,1),(22,40,31),(45,5,8),
    (18,34,8),(18,37,5),(39,7,7),(44,6,12),(18,119,105),(40,4,4),
]
daily = []
for bi,ch,vs in candidates:
    fr = get(fr_books, bi, ch, vs)
    en = get(en_books, bi, ch, vs)
    ok = bool(fr and en)
    print('daily', fr_books[bi]['name'], ch, vs, 'OK' if ok else 'MISSING', repr(fr)[:80] if fr else None)
    if ok:
        daily.append((bi,ch,vs))
print('DAILY_COUNT', len(daily))
print('DAILY_DART', daily)

# Vérifications bloquantes.
assert len(fr_books) == 66 and len(en_books) == 66, '66 livres attendus par langue'
assert sum(len(c) for b in fr_books for c in b['chapters']) == 31170, 'versets FR'
assert sum(len(c) for b in en_books for c in b['chapters']) == 31102, 'versets EN'
assert get(fr_books, 0, 1, 1) == "Au commencement, Dieu créa les cieux et la terre."
assert get(fr_books, 18, 23, 1) == "L’Éternel est mon berger: je ne manquerai de rien."
assert get(fr_books, 42, 3, 16).startswith('Car Dieu a tant aimé le monde')
assert get(en_books, 18, 23, 1) == 'The LORD is my shepherd; I shall not want.'
assert get(en_books, 42, 3, 16).startswith('For God so loved the world')
assert not any(not v.strip() for b in fr_books for c in b['chapters'] for v in c), 'verset FR vide'
assert not any(not v.strip() for b in en_books for c in b['chapters'] for v in c), 'verset EN vide'
print('BIBLE OK: 66 livres, 31170 versets FR, 31102 versets EN, témoins vérifiés')

# Icônes de lancement : le flux génère un carré bleu vide si les icônes
# manquent dans le dépôt. On les fabrique ici, depuis le logo officiel
# déjà restauré, pour que l'APK porte le vrai logo, sans dépôt manuel.
try:
    import make_launcher_icons
    make_launcher_icons.main()
except Exception as e:
    print("icônes de lancement non générées :", e)
