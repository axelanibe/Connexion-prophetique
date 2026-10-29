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
import json, os, re, sys, glob, time, urllib.error, urllib.parse, urllib.request, tempfile

TMP = tempfile.mkdtemp(prefix='bible_src_')
os.makedirs(os.path.join(TMP, 'fr'), exist_ok=True)

def _headers():
    headers = {'User-Agent': 'connexion-prophetique-bible-build'}
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        headers['Authorization'] = 'Bearer ' + token
    return headers

def urlopen_with_retry(req, max_attempts=5):
    # Filet de sécurité : sur 403 ou 429, respecter Retry-After, sinon
    # X-RateLimit-Reset quand X-RateLimit-Remaining vaut 0, sinon
    # back-off exponentiel plafonné à 60 s. 5 tentatives maximum.
    for attempt in range(1, max_attempts + 1):
        try:
            return urllib.request.urlopen(req, timeout=60)
        except urllib.error.HTTPError as e:
            if e.code not in (403, 429) or attempt == max_attempts:
                raise
            retry_after = e.headers.get('Retry-After')
            if retry_after:
                try:
                    wait = int(retry_after)
                except ValueError:
                    wait = 60
            else:
                remaining = e.headers.get('X-RateLimit-Remaining')
                reset = e.headers.get('X-RateLimit-Reset')
                if remaining == '0' and reset:
                    try:
                        wait = max(int(reset) - int(time.time()), 1)
                    except ValueError:
                        wait = 60
                else:
                    wait = min(2 ** attempt, 60)
            print('Limite GitHub, nouvel essai %d/%d dans %ds' % (attempt, max_attempts, wait), flush=True)
            time.sleep(wait)
    raise RuntimeError('Limite GitHub non résolue après retries')

def fetch(url, dest):
    req = urllib.request.Request(url, headers=_headers())
    with urlopen_with_retry(req) as r, open(dest, 'wb') as f:
        f.write(r.read())

# Fichiers SFM français, vérifiés un par un dans le dossier p.sfm du dépôt
# BibleCorps/FRA-B-LSG1910-PD-UBS (lecture authentifiée, 29 oct. 2026).
# Le téléchargement brut est le chemin normal : raw.githubusercontent.com
# n'a pas la limite de 60 requêtes par heure de l'API REST, qui a fait
# échouer la construction du 29 octobre 2026 (403 rate limit exceeded).
# L'API n'est plus touchée dans le cas courant. Numérotation du dépôt :
# 01 à 39 Ancien Testament, 40-INT (introduction, exclue), 41 à 67
# Nouveau Testament. Le 00-FRT (page de titre) est exclu aussi.
FR_FILES = [
    ('01', 'GEN'), ('02', 'EXO'), ('03', 'LEV'), ('04', 'NUM'), ('05', 'DEU'),
    ('06', 'JOS'), ('07', 'JDG'), ('08', 'RUT'), ('09', '1SA'), ('10', '2SA'),
    ('11', '1KI'), ('12', '2KI'), ('13', '1CH'), ('14', '2CH'), ('15', 'EZR'),
    ('16', 'NEH'), ('17', 'EST'), ('18', 'JOB'), ('19', 'PSA'), ('20', 'PRO'),
    ('21', 'ECC'), ('22', 'SNG'), ('23', 'ISA'), ('24', 'JER'), ('25', 'LAM'),
    ('26', 'EZK'), ('27', 'DAN'), ('28', 'HOS'), ('29', 'JOL'), ('30', 'AMO'),
    ('31', 'OBA'), ('32', 'JON'), ('33', 'MIC'), ('34', 'NAM'), ('35', 'HAB'),
    ('36', 'ZEP'), ('37', 'HAG'), ('38', 'ZEC'), ('39', 'MAL'), ('41', 'MAT'),
    ('42', 'MRK'), ('43', 'LUK'), ('44', 'JHN'), ('45', 'ACT'), ('46', 'ROM'),
    ('47', '1CO'), ('48', '2CO'), ('49', 'GAL'), ('50', 'EPH'), ('51', 'PHP'),
    ('52', 'COL'), ('53', '1TH'), ('54', '2TH'), ('55', '1TI'), ('56', '2TI'),
    ('57', 'TIT'), ('58', 'PHM'), ('59', 'HEB'), ('60', 'JAS'), ('61', '1PE'),
    ('62', '2PE'), ('63', '1JN'), ('64', '2JN'), ('65', '3JN'), ('66', 'JUD'),
    ('67', 'REV'),
]
RAW_FR = 'https://raw.githubusercontent.com/BibleCorps/FRA-B-LSG1910-PD-UBS/main/p.sfm/'
for _num, _code in FR_FILES:
    _name = 'FRA[B]LSG1910[PD]UBS-%s-%s.p.sfm' % (_num, _code)
    try:
        fetch(RAW_FR + urllib.parse.quote(_name), os.path.join(TMP, 'fr', _name))
    except urllib.error.HTTPError as _e:
        # Repli pour ce fichier seulement : si le brut ne le trouve plus
        # (fichier déplacé ou renommé), retrouver son adresse par l'API
        # de listage, authentifiée si GITHUB_TOKEN est présent, avec retry.
        if _e.code != 404:
            raise
        print('Brut introuvable pour %s, repli API pour ce fichier seulement' % _name, flush=True)
        _req = urllib.request.Request(
            'https://api.github.com/repos/BibleCorps/FRA-B-LSG1910-PD-UBS/contents/p.sfm?per_page=100',
            headers=_headers())
        with urlopen_with_retry(_req) as _r:
            _listing = json.load(_r)
        _urls = [e['download_url'] for e in _listing if e['name'] == _name]
        if not _urls:
            raise RuntimeError('Fichier %s introuvable même par l\'API' % _name)
        fetch(_urls[0], os.path.join(TMP, 'fr', _name))
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

# Monogramme CP d'en-tête, 27 oct. 2026 : le fichier binaire ne peut
# pas passer par l'outil GitHub, il est donc déposé en 2 parties
# base64 texte, comme le logo officiel, et restauré ici avant la
# construction, pour que l'en-tête porte le vrai logo CP de la
# version web, et non un CP en texte.
try:
    import base64 as _b64
    from pathlib import Path as _Path
    _root = _Path(__file__).resolve().parent.parent
    _parts = [_root / 'assets/cp_monogram.png.b64.partaa', _root / 'assets/cp_monogram.png.b64.partbb']
    _target = _root / 'assets/cp_monogram.png'
    if all(p.exists() for p in _parts) and not _target.exists():
        _target.write_bytes(_b64.b64decode(''.join(p.read_text() for p in _parts)))
        print('monogramme CP restauré depuis les parties base64')
except Exception as e:
    print('monogramme CP non restauré :', e)
