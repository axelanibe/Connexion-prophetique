#!/usr/bin/env python3
"""Recharge la police MaterialIcons dans la version web, 28 oct. 2026.
La police binaire ne peut pas être déposée dans le dépôt par l'outil
GitHub, qui n'accepte que du texte, donc la version web l'embarque
ici en base64, dans la page elle-même, pour que les icônes
s'affichent comme dans l'originale, même sans le fichier .otf.
À relancer après chaque `flutter build web`, avant la poussée,
car la construction écrase website/index.html.
Depuis le 30 oct. 2026, l'application vit à la racine du domaine,
donc ce script corrige la page racine (le nom historique du fichier
est gardé pour ne rien casser).
"""
import pathlib
import re
import json
p = pathlib.Path(__file__).resolve().parent.parent / 'website/index.html'
s = p.read_text()
marker = '<!-- MaterialIcons web, 28 oct. 2026 -->'
# Fond bleu nuit avant chargement, 28 oct. 2026 : sans lui, la page
# web restait blanche pendant le chargement du moteur Flutter, puis
# passait au bleu nuit de l'écran de démarrage, puis au fond clair
# de l'accueil, ce qui scintillait. Le fond est bleu nuit dès la
# page, comme l'écran de démarrage, pour une transition continue.
bg_marker = '<!-- Fond demarrage bleu nuit, 28 oct. 2026 -->'
if bg_marker not in s:
    s = s.replace('</head>', bg_marker + "\n  <style>html,body{background:#0B1F3A}</style>\n</head>", 1)
    print('Fond bleu nuit ajouté à index.html.')
# Aperçu du lien partagé, 30 oct. 2026 : titre, description et
# balises Open Graph, pour que le partage du lien affiche la
# communauté au lieu des textes par défaut de Flutter. Le titre
# et la description reprennent le texte « Qui sommes-nous »
# déjà vérifié, sans rien inventer. L'image est le logo officiel
# blanc sur fond bleu nuit (website/og-image.png), bien visible sur
# les cartes claires des messageries, 30 oct. 2026.
og_marker = '<!-- Apercu lien partage, 30 oct. 2026 -->'
og_title = 'CONNEXION PROPHETIQUE'
og_desc = "Structure chrétienne créée en 2019 en Côte d'Ivoire : formation spirituelle, lutte contre les grossesses en milieu scolaire, réinsertion des jeunes en dépendance et scolarisation d'enfants défavorisés."
og_image = 'https://www.connexionprophetique.com/og-image.png'
if og_marker not in s:
    s = re.sub(r'<title>[^<]*</title>', '<title>' + og_title + '</title>', s, count=1)
    s = re.sub(r'<meta name="apple-mobile-web-app-title" content="[^"]*">', '<meta name="apple-mobile-web-app-title" content="' + og_title + '">', s, count=1)
    if re.search(r'<meta name="description"[^>]*>', s):
        s = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="' + og_desc + '">', s, count=1)
    else:
        s = s.replace('</head>', '<meta name="description" content="' + og_desc + '">\n</head>', 1)
    og_tags = (
        og_marker + '\n'
        '  <meta property="og:title" content="' + og_title + '">\n'
        '  <meta property="og:description" content="' + og_desc + '">\n'
        '  <meta property="og:type" content="website">\n'
        '  <meta property="og:url" content="https://www.connexionprophetique.com/">\n'
        '  <meta property="og:image" content="' + og_image + '">\n'
    )
    s = s.replace('</head>', og_tags + '</head>', 1)
    print('Titre, description et balises Open Graph ajoutés à index.html.')
# Indicateur de chargement, 31 oct. 2026 : le premier chargement
# prend une trentaine de secondes sans rien afficher, donc la page
# montre dès l'ouverture le nom, un anneau doré animé en CSS et un
# court texte. Le bloc est retiré à la première image de Flutter
# (événement flutter-first-frame, vérifié dans le moteur web de
# Flutter 3.27), jamais avant, donc il ne reste jamais par-dessus
# l'application. Il ne concerne que le premier chargement : les
# navigations internes ne rechargent pas la page, donc il ne
# réapparaît pas. Aucune image externe, aucun texte inventé.
# Depuis le 31 oct. 2026 au soir, le script vit dans chargement.js.
# Carte 164, 23 nov. 2026 : l'indicateur actuel porte une barre de
# progression, son commentaire ne correspond plus au marqueur
# ci-dessous, donc on ne l'ajoute que si la page n'a vraiment aucun
# indicateur. Sans ce garde, chaque passage du script dupliquait
# l'indicateur, deux div id="chargement" et deux chargement.js.
charge_marker = '<!-- Indicateur chargement, 31 oct. 2026 -->'
if charge_marker not in s and 'id="chargement"' not in s:
    charge_style = """<!-- Indicateur chargement, 31 oct. 2026 -->
  <style>
  #chargement{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:#0B1F3A;color:#F5F6FA;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center;padding:24px}
  #chargement .nom{color:#D4A72C;font-size:22px;font-weight:700;letter-spacing:2px}
  #chargement .anneau{width:48px;height:48px;border-radius:50%;border:4px solid rgba(212,167,44,.25);border-top-color:#D4A72C;animation:chargement-tourne 1s linear infinite}
  @keyframes chargement-tourne{to{transform:rotate(360deg)}}
  #chargement .texte{font-size:16px}
  </style>
"""
    s = s.replace('</head>', charge_style + '</head>', 1)
    charge_body = """<!-- Indicateur chargement, 31 oct. 2026 -->
  <div id="chargement">
    <div class="nom">CONNEXION PROPHETIQUE</div>
    <div class="anneau" aria-hidden="true"></div>
    <div class="texte" id="chargement-texte">Chargement…</div>
  </div>
  <script src="chargement.js"></script>
"""
    boot = '<script src="flutter_bootstrap.js" async></script>'
    if boot in s:
        s = s.replace(boot, charge_body + '  ' + boot, 1)
    elif '</body>' in s:
        s = s.replace('</body>', charge_body + '</body>', 1)
    print('Indicateur de chargement ajouté à index.html.')
# Script de chargement externe, 31 oct. 2026 au soir : le petit script de
# l'indicateur vivait dans la page, ce qui exigeait unsafe-inline dans la
# politique de securite. Il vit desormais dans chargement.js, charge depuis
# la meme origine. Sur une page deja patchee, l'ancien bloc interne est
# remplace par la balise externe ; sur une page neuve, le bloc ci-dessus
# injecte deja la balise externe. Idempotent : apres migration, l'ancien
# texte a disparu.
ancien_script = """  <script>
  (function(){
    var t = document.getElementById('chargement-texte');
    if (t && (navigator.language || '').toLowerCase().indexOf('en') === 0) { t.textContent = 'Loading…'; }
    window.addEventListener('flutter-first-frame', function(){
      var el = document.getElementById('chargement');
      if (el) { el.remove(); }
    });
  })();
  </script>
"""
if ancien_script in s:
    s = s.replace(ancien_script, '  <script src="chargement.js"></script>\n', 1)
    print('Script de chargement deplace vers chargement.js.')
# Référencement, 31 oct. 2026 : la coquille index.html est la seule chose
# que les moteurs de recherche voient (le contenu de l'application est
# rendu sur toile, pas dans le document), donc on y ajoute le lien
# canonique, l'indication robots et des données structurées avec les
# seules données vérifiées, sans page nouvelle ni donnée inventée.
# Placé avant le repli police : sinon, sur une page déjà patchée, le
# repli sortirait avant l'injection et le référencement manquerait.
seo_marker = '<!-- Referencement, 31 oct. 2026 -->'
if seo_marker not in s:
    seo_data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "CONNEXION PROPHETIQUE",
                "url": "https://www.connexionprophetique.com/",
                "logo": "https://www.connexionprophetique.com/logo.png",
                "description": og_desc,
            },
            {
                "@type": "WebSite",
                "name": "CONNEXION PROPHETIQUE",
                "url": "https://www.connexionprophetique.com/",
            },
        ],
    }
    seo_tags = (
        seo_marker + '\n'
        '  <link rel="canonical" href="https://www.connexionprophetique.com/">\n'
        '  <meta name="robots" content="index, follow">\n'
        '  <script type="application/ld+json">\n'
        + json.dumps(seo_data, ensure_ascii=False, indent=2) + '\n'
        '  </script>\n'
    )
    s = s.replace('</head>', seo_tags + '</head>', 1)
    print('Référencement ajouté à index.html.')
# Retouches referencement, 31 oct. 2026 : suite a l'analyse externe
# du site, petits complements sans reconstruction. Titre enrichi
# (le nom reste Connexion Prophetique en premier), description
# courte pour s'afficher en entier dans les resultats, langue fr,
# viewport, couleur theme or, balises Twitter et Open Graph
# manquantes, pays dans les donnees structurees, et bloc noscript
# avec nom, description et liens, pour les lecteurs sans
# JavaScript. Aucune donnee inventee : aucun reseau social, aucune
# adresse, aucun telephone ni e-mail, aucun contact ajoute.
seo2_marker = '<!-- Retouches referencement, 31 oct. 2026 -->'
if seo2_marker not in s:
    new_title = 'Connexion Prophétique, Structure chrétienne en Côte d\'Ivoire'
    short_desc = 'Structure chrétienne en Côte d\'Ivoire depuis 2019 : formation spirituelle, lutte contre les grossesses en milieu scolaire et réinsertion des jeunes.'
    s = s.replace('<html>', '<html lang="fr">', 1)
    if 'name="viewport"' not in s:
        s = s.replace('</head>', '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>', 1)
    if 'name="theme-color"' not in s:
        s = s.replace('</head>', '  <meta name="theme-color" content="#D4A72C">\n</head>', 1)
    s = re.sub(r'<title>[^<]*</title>', '<title>' + new_title + '</title>', s, count=1)
    s = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="' + short_desc + '">', s, count=1)
    s = re.sub(r'<meta property="og:title" content="[^"]*">', '<meta property="og:title" content="' + new_title + '">', s, count=1)
    s = re.sub(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="' + short_desc + '">', s, count=1)
    seo2_tags = (
        seo2_marker + '\n'
        '  <meta property="og:site_name" content="CONNEXION PROPHETIQUE">\n'
        '  <meta property="og:locale" content="fr_FR">\n'
        '  <meta property="og:image:width" content="1200">\n'
        '  <meta property="og:image:height" content="630">\n'
        '  <meta property="og:image:alt" content="Logo CONNEXION PROPHETIQUE">\n'
        '  <meta name="twitter:card" content="summary_large_image">\n'
        '  <meta name="twitter:title" content="' + new_title + '">\n'
        '  <meta name="twitter:description" content="' + short_desc + '">\n'
        '  <meta name="twitter:image" content="' + og_image + '">\n'
    )
    s = s.replace('</head>', seo2_tags + '</head>', 1)
    seo2_data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "CONNEXION PROPHETIQUE",
                "url": "https://www.connexionprophetique.com/",
                "logo": "https://www.connexionprophetique.com/logo.png",
                "description": og_desc,
                "areaServed": {"@type": "Country", "name": "Côte d'Ivoire"},
            },
            {
                "@type": "WebSite",
                "name": "CONNEXION PROPHETIQUE",
                "url": "https://www.connexionprophetique.com/",
            },
        ],
    }
    s = re.sub(r'<script type="application/ld\+json">.*?</script>',
               lambda m: '<script type="application/ld+json">\n' + json.dumps(seo2_data, ensure_ascii=False, indent=2) + '\n  </script>',
               s, count=1, flags=re.DOTALL)
    noscript_body = (
        seo2_marker + '\n'
        '  <noscript>\n'
        '    <h1>CONNEXION PROPHETIQUE</h1>\n'
        '    <p>' + short_desc + '</p>\n'
        '    <p><a href="https://www.connexionprophetique.com/">Ouvrir l\'application CONNEXION PROPHETIQUE</a></p>\n'
        '    <p><a href="https://www.connexionprophetique.com/privacy.html">Confidentialité</a></p>\n'
        '  </noscript>\n'
    )
    if '<body>' in s:
        s = s.replace('<body>', '<body>\n  ' + noscript_body, 1)
    elif '</body>' in s:
        s = s.replace('</body>', noscript_body + '</body>', 1)
    print('Retouches referencement ajoutees a index.html.')
# Contacts dans le bloc noscript, 31 oct. 2026 : contacts publics
# fournis par Axel (secretariat et e-mail de la structure), ajoutes
# au bloc noscript existant, sans toucher aux autres balises. Le
# texte reprend la description courte, defini ici pour que cette
# section fonctionne seule, meme sur une page deja patchee ou la
# section retouches est ignoree.
contact_marker = '<!-- Contacts noscript, 31 oct. 2026 -->'
if contact_marker not in s:
    contact_desc = 'Structure chrétienne en Côte d\'Ivoire depuis 2019 : formation spirituelle, lutte contre les grossesses en milieu scolaire et réinsertion des jeunes.'
    noscript_new = (
        contact_marker + '\n'
        '  <noscript>\n'
        '    <h1>CONNEXION PROPHETIQUE</h1>\n'
        '    <p>' + contact_desc + '</p>\n'
        '    <p>Secrétariat : <a href="tel:+225787406387">0787406387</a></p>\n'
        '    <p>E-mail : <a href="mailto:support@connexionprophetique.com">support@connexionprophetique.com</a></p>\n'
        '    <p><a href="https://www.connexionprophetique.com/">Ouvrir l\'application CONNEXION PROPHETIQUE</a></p>\n'
        '    <p><a href="https://www.connexionprophetique.com/privacy.html">Confidentialité</a></p>\n'
        '  </noscript>'
    )
    s = re.sub(r'<noscript>.*?</noscript>', lambda m: noscript_new, s, count=1, flags=re.DOTALL)
    print('Contacts ajoutes au bloc noscript.')
# Correction contact noscript, 31 oct. 2026 : l'adresse de la
# structure devient support@connexionprophetique.com et remplace
# info@, sur les pages deja patchees comme sur les neuves.
contact2_marker = '<!-- Correction contact noscript, 31 oct. 2026 -->'
if contact2_marker not in s:
    contact2_desc = 'Structure chrétienne en Côte d\'Ivoire depuis 2019 : formation spirituelle, lutte contre les grossesses en milieu scolaire et réinsertion des jeunes.'
    noscript_new2 = (
        contact2_marker + '\n'
        '  <noscript>\n'
        '    <h1>CONNEXION PROPHETIQUE</h1>\n'
        '    <p>' + contact2_desc + '</p>\n'
        '    <p>Secrétariat : <a href="tel:+225787406387">0787406387</a></p>\n'
        '    <p>E-mail : <a href="mailto:support@connexionprophetique.com">support@connexionprophetique.com</a></p>\n'
        '    <p><a href="https://www.connexionprophetique.com/">Ouvrir l\'application CONNEXION PROPHETIQUE</a></p>\n'
        '    <p><a href="https://www.connexionprophetique.com/privacy.html">Confidentialité</a></p>\n'
        '  </noscript>'
    )
    s = re.sub(r'<noscript>.*?</noscript>', lambda m: noscript_new2, s, count=1, flags=re.DOTALL)
    print('Contact noscript corrige vers support@.')
style = marker + "\n  <style>@font-face { font-family: 'MaterialIcons'; src: url(data:font/otf;base64,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AADkywAAAJwAAOTNAADkzQAAAJ4AAOTSAADk0gAAAKAAAOT8AADk/AAAAKEAAOVWAADlVgAAAKQAAOVhAADlYQAAAKcAAOVnAADlZwAAAKgAAOWTAADlkwAAAKsAAOW9AADlvgAAALAAAOXGAADlxgAAALIAAOX5AADl+QAAALMAAOYGAADmBgAAALUAAOYIAADmCAAAALYAAOYrAADmKwAAALcAAOaZAADmmQAAALwAAOaaAADmmgAAAL4AAOaoAADmqQAAAL8AAObFAADmxQAAAMUAAOb0AADm9AAAAMcAAOeSAADnkgAAABAAAOeTAADnkwAAABMAAOeaAADnmgAAABoAAOebAADnmwAAAB0AAOmVAADplQAAAFkAAOmWAADplgAAAF0AAOpHAADqRwAAAG0AAOr6AADq+gAAAIMAAOr9AADq/QAAAIcAAOyLAADsiwAAAK4AAO4yAADuMgAAAAMAAO5TAADuUwAAAAYAAO5nAADuZwAAAAgAAO5yAADucgAAAAkAAO50AADudAAAAAoAAO6EAADuhAAAAA4AAO6FAADuhQAAABEAAO6MAADujAAAABgAAO6NAADujQAAABsAAO6TAADukwAAACAAAO6YAADumAAAACEAAO6vAADurwAAACQAAO64AADuuAAAACYAAO7RAADu0QAAACcAAO7fAADu3wAAACgAAO7/AADu/wAAACkAAO8LAADvCwAAACoAAO8nAADvJwAAAC8AAO8oAADvKAAAADEAAO9IAADvSAAAADUAAO9OAADvTwAAADgAAO9TAADvUwAAADoAAO9YAADvWAAAADwAAO9aAADvWgAAAD4AAO9fAADvXwAAAD8AAO9iAADvYgAAAEAAAO9uAADvbgAAAEEAAO+hAADvoQAAAEMAAO+qAADvqgAAAEUAAO+uAADvrgAAAEYAAO/yAADv8gAAAEkAAPANAADwDQAAAEwAAPAYAADwGAAAAE0AAPAaAADwGgAAAE4AAPAvAADwLwAAAFEAAPBGAADwRgAAAFMAAPCHAADwhwAAAFcAAPCIAADwiAAAAFsAAPCRAADwkQAAAF8AAPDZAADw2QAAAGAAAPDbAADw2wAAAGEAAPDtAADw7QAAAGIAAPD/AADw/wAAAGMAAPECAADxAgAAAGQAAPEHAADxBwAAAGUAAPERAADxEQAAAGYAAPEX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YWRkX2NpcmNsZV9vdXRsaW5lX2Jhc2VsaW5lYWRtaW5fcGFuZWxfc2V0dGluZ3Nfb3V0bGluZWRhbGJ1bV9iYXNlbGluZWFsYnVtX291dGxpbmVkYWx0ZXJuYXRlX2VtYWlsX291dGxpbmVkYW5hbHl0aWNzX291dGxpbmVkYXJyb3dfYmFja19iYXNlbGluZWFycm93X2JhY2tfaW9zX2Jhc2VsaW5lYXJyb3dfYmFja19pb3NfbmV3X3JvdW5kZWRhcnJvd19iYWNrX2lvc19vdXRsaW5lZGFycm93X2JhY2tfaW9zX3JvdW5kZWRhcnJvd19iYWNrX2lvc19zaGFycGFycm93X2JhY2tfb3V0bGluZWRhcnJvd19iYWNrX3JvdW5kZWRhcnJvd19iYWNrX3NoYXJwYXJyb3dfZHJvcF9kb3duX2Jhc2VsaW5lYXJyb3dfZHJvcF91cF9iYXNlbGluZWFycm93X2ZvcndhcmRfYmFzZWxpbmVhcnJvd19mb3J3YXJkX2lvc19iYXNlbGluZWFycm93X2ZvcndhcmRfaW9zX291dGxpbmVkYXJyb3dfZm9yd2FyZF9pb3Nfcm91bmRlZGFycm93X2ZvcndhcmRfaW9zX3NoYXJwYXJyb3dfZm9yd2FyZF9vdXRsaW5lZGFycm93X2ZvcndhcmRfcm91bmRlZGFycm93X2ZvcndhcmRfc2hhcnBhcnJvd19yaWdodF9iYXNlbGluZWFycm93X3Vwd2FyZF9iYXNlbGluZWFydGljbGVfb3V0bGluZWRhc3NpZ25tZW50X291dGxpbmVkYXVkaW9fZmlsZV9vdXRsaW5lZGF1dG9fYXdlc29tZV9iYXNlbGluZWF1dG9fc3Rvcmllc19vdXRsaW5lZGJhZGdlX2Jhc2VsaW5lYmFkZ2Vfb3V0bGluZWRibG9ja19vdXRsaW5lZGJvb2tfb3V0bGluZWRicm9rZW5faW1hZ2Vfb3V0bGluZWRidXNpbmVzc19vdXRsaW5lZGNhbGVuZGFyX21vbnRoX291dGxpbmVkY2FsZW5kYXJfdG9kYXlfYmFzZWxpbmVjYWxsX2Jhc2VsaW5lY2FsbF9lbmRfYmFzZWxpbmVjYW1wYWlnbl9vdXRsaW5lZGNhbmNlbF9iYXNlbGluZWNhbmNlbF9vdXRsaW5lZGNoYXRfYnViYmxlX291dGxpbmVfYmFzZWxpbmVjaGVja19iYXNlbGluZWNoZWNrX2NpcmNsZV9iYXNlbGluZWNoZWNrX2NpcmNsZV9vdXRsaW5lZGNoZXZyb25fbGVmdF9iYXNlbGluZWNoZXZyb25fcmlnaHRfYmFzZWxpbmVjaGV2cm9uX3JpZ2h0X291dGxpbmVkY2hpbGRfY2FyZV9vdXRsaW5lZGNpcmNsZV9vdXRsaW5lZGNsZWFyX2Jhc2VsaW5lY2xlYXJfb3V0bGluZWRjbG9zZV9iYXNlbGluZWNsb3NlX291dGxpbmVkY2xvdWRfZG9uZV9vdXRsaW5lZGNsb3VkX291dGxpbmVkY29tbWVudF9vdXRsaW5lZGNyZWRpdF9jYXJkX2Jhc2VsaW5lZGFzaGJvYXJkX291dGxpbmVkZGVsZXRlX291dGxpbmVfYmFzZWxpbmVkZWxldGVfb3V0bGluZWRkZXNjcmlwdGlvbl9vdXRsaW5lZGRvbmVfYmFzZWxpbmVkb3dubG9hZF9iYXNlbGluZWRvd25sb2FkX291dGxpbmVkZHJhZ19oYW5kbGVfYmFzZWxpbmVlZGl0X2Jhc2VsaW5lZWRpdF9vdXRsaW5lZGVtYWlsX291dGxpbmVkZW1vamlfZXZlbnRzX291dGxpbmVkZXJyb3JfYmFzZWxpbmVlcnJvcl9vdXRsaW5lX2Jhc2VsaW5lZXZlbnRfb3V0bGluZWRleHBhbmRfbW9yZV9iYXNlbGluZWZhbWlseV9yZXN0cm9vbV9vdXRsaW5lZGZhdm9yaXRlX2Jhc2VsaW5lZmF2b3JpdGVfYm9yZGVyX2Jhc2VsaW5lZmxpcF9jYW1lcmFfYW5kcm9pZF9iYXNlbGluZWZsaXBfY2FtZXJhX2FuZHJvaWRfb3V0bGluZWRmbGlwX2NhbWVyYV9hbmRyb2lkX3JvdW5kZWRmbGlwX2NhbWVyYV9hbmRyb2lkX3NoYXJwZmxpcF9jYW1lcmFfaW9zX2Jhc2VsaW5lZmxpcF9jYW1lcmFfaW9zX291dGxpbmVkZmxpcF9jYW1lcmFfaW9zX3JvdW5kZWRmbGlwX2NhbWVyYV9pb3Nfc2hhcnBmb2xkZXJfb3Blbl9iYXNlbGluZWZvbGRlcl9vdXRsaW5lZGdyb3VwX291dGxpbmVkZ3JvdXBzX291dGxpbmVkaGVhZHBob25lc19vdXRsaW5lZGhpZ2hsaWdodF9vdXRsaW5lZGhpc3Rvcnlfb3V0bGluZWRob21lX291dGxpbmVkaG91cmdsYXNzX2VtcHR5X291dGxpbmVkaG93X3RvX3JlZ19vdXRsaW5lZGhvd190b192b3RlX291dGxpbmVkaW1hZ2Vfb3V0bGluZWRpb3Nfc2hhcmVfYmFzZWxpbmVpb3Nfc2hhcmVfb3V0bGluZWRpb3Nfc2hhcmVfcm91bmRlZGlvc19zaGFyZV9zaGFycGtleWJvYXJkX2Fycm93X2Rvd25fYmFzZWxpbmVrZXlib2FyZF9hcnJvd19kb3duX291dGxpbmVka2V5Ym9hcmRfYXJyb3dfdXBfYmFzZWxpbmVrZXlib2FyZF9vdXRsaW5lZGxhYmVsX291dGxpbmVkbGlicmFyeV9tdXNpY19iYXNlbGluZWxpbmtfb3V0bGluZWRsb2NhdGlvbl9vbl9vdXRsaW5lZGxvY2tfYmFzZWxpbmVsb2NrX29wZW5fYmFzZWxpbmVsb2NrX291dGxpbmVkbG9naW5fYmFzZWxpbmVtYWlsX291dGxpbmVkbWVudV9iYXNlbGluZW1lbnVfYm9va19vdXRsaW5lZG1pY19iYXNlbGluZW1pY19vZmZfYmFzZWxpbmVtaWNfb3V0bGluZWRtb3JlX2hvcml6X2Jhc2VsaW5lbW9yZV9ob3Jpel9vdXRsaW5lZG1vcmVfaG9yaXpfcm91bmRlZG1vcmVfaG9yaXpfc2hhcnBtb3JlX3ZlcnRfYmFzZWxpbmVtb3JlX3ZlcnRfb3V0bGluZWRtb3JlX3ZlcnRfcm91bmRlZG1vcmVfdmVydF9zaGFycG1vdmVfdXBfb3V0bGluZWRtdXNpY19ub3RlX2Jhc2VsaW5lbXVzaWNfbm90ZV9vdXRsaW5lZG5ld3NwYXBlcl9vdXRsaW5lZG5vdGVfb3V0bGluZWRub3RpZmljYXRpb25zX291dGxpbmVkb25kZW1hbmRfdmlkZW9fb3V0bGluZWRvcGVuX2luX25ld19vdXRsaW5lZHBhdXNlX2Jhc2VsaW5lcGF5bWVudHNfb3V0bGluZWRwZW9wbGVfb3V0bGluZV9iYXNlbGluZXBlb3BsZV9vdXRsaW5lZHBlcnNvbl9hZGRfb3V0bGluZWRwZXJzb25fYmFzZWxpbmVwZXJzb25fb3V0bGluZV9iYXNlbGluZXBlcnNvbl9vdXRsaW5lZHBob25lX291dGxpbmVkcGhvdG9fY2FtZXJhX291dGxpbmVkcGhvdG9fbGlicmFyeV9vdXRsaW5lZHBob3RvX291dGxpbmVkcGxheV9hcnJvd19iYXNlbGluZXBsYXlfYXJyb3dfb3V0bGluZWRwbGF5X2NpcmNsZV9maWxsZWRfYmFzZWxpbmVwbGF5X2NpcmNsZV9vdXRsaW5lZHBsYXlsaXN0X2FkZF9iYXNlbGluZXF1ZXVlX211c2ljX2Jhc2VsaW5lcmVjZWlwdF9vdXRsaW5lZHJlcGxheV9vdXRsaW5lZHNjaGVkdWxlX2Jhc2VsaW5lc2NoZWR1bGVfb3V0bGluZWRzY2hvb2xfb3V0bGluZWRzY3JlZW5fc2hhcmVfYmFzZWxpbmVzZWFyY2hfYmFzZWxpbmVzZWFyY2hfb3V0bGluZWRzZW5kX291dGxpbmVkc2hhcmVfYmFzZWxpbmVzaGFyZV9vdXRsaW5lZHNoYXJlX3JvdW5kZWRzaGFyZV9zaGFycHNoaWVsZF9vdXRsaW5lZHNraXBfbmV4dF9iYXNlbGluZXNraXBfcHJldmlvdXNfYmFzZWxpbmVzbWFydHBob25lX2Jhc2VsaW5lc3Rhcl9iYXNlbGluZXN0YXJfb3V0bGluZWRzdG9wX2Jhc2VsaW5lc3RvcF9zY3JlZW5fc2hhcmVfYmFzZWxpbmVzd2l0Y2hfY2FtZXJhX2Jhc2VsaW5lc3lzdGVtX3VwZGF0ZV9vdXRsaW5lZHRleHRfZmllbGRzX291dGxpbmVkdGh1bWJfdXBfb3V0bGluZWR1cGxvYWRfZmlsZV9vdXRsaW5lZHZlcmlmaWVkX2Jhc2VsaW5ldmVyaWZpZWRfb3V0bGluZWR2ZXJpZmllZF91c2VyX2Jhc2VsaW5ldmlkZW9jYW1fYmFzZWxpbmV2aWRlb2NhbV9vZmZfYmFzZWxpbmV2aWRlb2NhbV9vZmZfb3V0bGluZWR2aWRlb2NhbV9vdXRsaW5lZHZpc2liaWxpdHlfb2ZmX291dGxpbmVkdmlzaWJpbGl0eV9vdXRsaW5lZHZvbHVtZV91cF9iYXNlbGluZXZvbHVudGVlcl9hY3Rpdmlz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) format('opentype'); }</style>\n"
if marker in s:
    nouveau_b64 = re.search(r'data:font/otf;base64,([A-Za-z0-9+/=]+)', style).group(1)
    s2 = re.sub(r'data:font/otf;base64,[A-Za-z0-9+/=]+', 'data:font/otf;base64,' + nouveau_b64, s, count=1)
    if s2 != s:
        s = s2
        print('Police MaterialIcons mise à jour dans index.html.')
    else:
        print('Police déjà présente dans index.html.')
    p.write_text(s)
    raise SystemExit(0)
s = s.replace('</head>', style + '</head>', 1)
p.write_text(s)
print('Police MaterialIcons ajoutée à index.html.')
