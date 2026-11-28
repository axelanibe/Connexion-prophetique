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
style = marker + "\n  <style>@font-face { font-family: 'MaterialIcons'; src: url(data:font/otf;base64,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AADkkQAA5JEAAACZAADklwAA5JcAAACaAADkywAA5MsAAACgAADkzQAA5M0AAACiAADk0gAA5NIAAACkAADk/AAA5PwAAACnAADlVgAA5VYAAACqAADlYQAA5WEAAACtAADlZwAA5WcAAACuAADlkwAA5ZMAAACxAADlvQAA5b4AAAC2AADlxgAA5cYAAAC4AADl+QAA5fkAAAC5AADmBgAA5gYAAAC7AADmCAAA5ggAAAC9AADmKwAA5isAAAC+AADmmQAA5pkAAADEAADmmgAA5poAAADGAADmqAAA5qkAAADHAADmxQAA5sUAAADNAADm9AAA5vQAAADPAADnkgAA55IAAAARAADnkwAA55MAAAAUAADnmgAA55oAAAAbAADnmwAA55sAAAAeAADplQAA6ZUAAABbAADplgAA6ZYAAABfAADqRwAA6kcAAABvAADq+gAA6voAAACGAADq/QAA6v0AAACKAADsiwAA7IsAAAC0AADuMgAA7jIAAAADAADuRwAA7kcAAAAGAADuUwAA7lMAAAAHAADuZwAA7mcAAAAJAADucgAA7nIAAAAKAADudAAA7nQAAAALAADuhAAA7oQAAAAPAADuhQAA7oUAAAASAADujAAA7owAAAAZAADujQAA7o0AAAAcAADukwAA7pMAAAAhAADumAAA7pgAAAAiAADurwAA7q8AAAAmAADuuAAA7rgAAAAoAADu0QAA7tEAAAApAADu3wAA7t8AAAAqAADu/wAA7v8AAAArAADvDwAA7w8AAAAsAADvJwAA7ycAAAAxAADvKAAA7ygAAAAzAADvSAAA70gAAAA3AADvTgAA708AAAA6AADvUwAA71MAAAA9AADvWAAA71gAAAA/AADvWgAA71oAAABBAADvXwAA718AAABCAADvYgAA72IAAABDAADvbgAA724AAABEAADvqgAA76oAAABHAADvrgAA764AAABIAADv8gAA7/IAAABLAADwDQAA8A0AAABOAADwGAAA8BgAAABPAADwGgAA8BoAAABQAADwLwAA8C8AAABTAADwRgAA8EYAAABVAADwhwAA8IcAAABZAADwiAAA8IgAAABdAADwkQAA8JEAAABhAADw2QAA8NkAAABiAADw2wAA8NsAAABjAADw7QAA8O0AAABkAADw/wAA8P8AAABlAADxAgAA8QIAAABmAADxBwAA8QcAAABnAADxEQAA8REAAABoAADxFwAA8RgAAABpAADxIAAA8SAAAABrAADxOAAA8TgAAABtAADxPQAA8T0AAABxAADxRAAA8UQAAABzAADxTQAA8U0AAAB0AADxaQAA8WkAAAB2AADxkwAA8ZMAAAB3AADxlwAA8ZcAAAB6AADxqgAA8aoAAAB8AADxwgAA8cIAAAB+AADxygAA8csAAACBAADx5wAA8ecAAACEAADx6gAA8eoAAACIAADx+wAA8fsAAACNAADyMAAA8jAAAACPAADyNwAA8jcAAACQAADyPAAA8jwAAACRAADyQgAA8kIAAACSAADyZgAA8mYAAACUAADybAAA8mwAAACWAADycgAA8nIAAACXAADyeAAA8ngAAACYAADyewAA8nsAAACbAADykAAA8pAAAACcAADymwAA8psAAACdAADynQAA8p4AAACeAADyrgAA8q4AAAChAADysQAA8rEAAACjAADyzgAA8s4AAAClAADy2gAA8toAAACmAADy8AAA8vAAAACoAADzCgAA8woAAACpAADzOQAA8zkAAACrAADzPAAA8zwAAACsAADzSwAA80sAAACvAADzVQAA81UAAACwAADzeAAA83gAAACyAADzeQAA83kAAAC1AADz4AAA8+AAAAC6AADz6QAA8+kAAAC8AAD0GgAA9BoAAAC/AAD0LAAA9CwAAADAAAD0QAAA9EAAAADBAAD0eAAA9HkAAADCAAD0fAAA9HwAAADFAAD0iwAA9IwAAADJAAD0oAAA9KEAAADLAAD0qQAA9KkAAADOAAD1cAAA9XAAAAAOAAD1cQAA9XEAAAAQAAD1cgAA9XIAAAATAAD1eQAA9XkAAAAaAAD1egAA9XoAAAAdAAD3dAAA93QAAABaAAD3dQAA93UAAABeAAD4JgAA+CYAAABuAAD42QAA+NkAAACFAAD43AAA+NwAAACJAA8BagAPAWoAAACzAA8FHwAPBR8AAAAtAA8FvwAPBb8AAAAkAA8FyAAPBcgAAAA8AA8GOAAPBjgAAACLAA8GOQAPBjkAAACOAA8GoQAPBqEAAADQAAQFngAAAVYBAAAHAFYAIOA64EfgUOB24JPgmOCc4J7goOCx4LfgyOEi4SfhOeFW4VnhX+Fo4Wrhn+G74fbiAeIG4hriOOJG4lzinOKk403jU+NW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3QzrDPgNAw0SDSQNOg1NDVoNZw10DYgNog24Dc4N4g3zDgcOFg4nDjgOTg5fDnQOiQ6aDrEOxA7WDvEPBg8gQWxsM1BJY29ucy1SZWd1bGFydW5pMDAyMGFjY2Vzc190aW1lX2Jhc2VsaW5lYWNjb3VudF9iYWxhbmNlX291dGxpbmVkYWRkX2Jhc2VsaW5lYWRkX2NpcmNsZV9vdXRsaW5lX2Jhc2VsaW5lYWRkX291dGxpbmVkYWRtaW5fcGFuZWxfc2V0dGluZ3Nfb3V0bGluZWRhbGJ1bV9iYXNlbGluZWFsYnVtX291dGxpbmVkYWx0ZXJuYXRlX2VtYWlsX291dGxpbmVkYW5hbHl0aWNzX291dGxpbmVkYXJyb3dfYmFja19iYXNlbGluZWFycm93X2JhY2tfaW9zX2Jhc2VsaW5lYXJyb3dfYmFja19pb3NfbmV3X3JvdW5kZWRhcnJvd19iYWNrX2lvc19vdXRsaW5lZGFycm93X2JhY2tfaW9zX3JvdW5kZWRhcnJvd19iYWNrX2lvc19zaGFycGFycm93X2JhY2tfb3V0bGluZWRhcnJvd19iYWNrX3JvdW5kZWRhcnJvd19iYWNrX3NoYXJwYXJyb3dfZHJvcF9kb3duX2Jhc2VsaW5lYXJyb3dfZHJvcF91cF9iYXNlbGluZWFycm93X2ZvcndhcmRfYmFzZWxpbmVhcnJvd19mb3J3YXJkX2lvc19iYXNlbGluZWFycm93X2ZvcndhcmRfaW9zX291dGxpbmVkYXJyb3dfZm9yd2FyZF9pb3Nfcm91bmRlZGFycm93X2ZvcndhcmRfaW9zX3NoYXJwYXJyb3dfZm9yd2FyZF9vdXRsaW5lZGFycm93X2ZvcndhcmRfcm91bmRlZGFycm93X2ZvcndhcmRfc2hhcnBhcnJvd19yaWdodF9iYXNlbGluZWFycm93X3Vwd2FyZF9iYXNlbGluZWFydGljbGVfb3V0bGluZWRhc3NpZ25tZW50X291dGxpbmVkYXR0YWNoX2ZpbGVfYmFzZWxpbmVhdWRpb19maWxlX291dGxpbmVkYXV0b19hd2Vzb21lX2Jhc2VsaW5lYXV0b19zdG9yaWVzX291dGxpbmVkYmFkZ2VfYmFzZWxpbmViYWRnZV9vdXRsaW5lZGJsb2NrX291dGxpbmVkYm9va19vdXRsaW5lZGJyb2tlbl9pbWFnZV9vdXRsaW5lZGNha2Vfb3V0bGluZWRjYWxlbmRhcl9tb250aF9vdXRsaW5lZGNhbGVuZGFyX3RvZGF5X2Jhc2VsaW5lY2FsbF9iYXNlbGluZWNhbGxfZW5kX2Jhc2VsaW5lY2FtcGFpZ25fb3V0bGluZWRjYW5jZWxfYmFzZWxpbmVjYW5jZWxfb3V0bGluZWRjaGF0X2J1YmJsZV9vdXRsaW5lX2Jhc2VsaW5lY2hlY2tfYmFzZWxpbmVjaGVja19jaXJjbGVfYmFzZWxpbmVjaGVja19jaXJjbGVfb3V0bGluZWRjaGV2cm9uX2xlZnRfYmFzZWxpbmVjaGV2cm9uX3JpZ2h0X2Jhc2VsaW5lY2hldnJvbl9yaWdodF9vdXRsaW5lZGNoaWxkX2NhcmVfb3V0bGluZWRjaHVyY2hfb3V0bGluZWRjaXJjbGVfb3V0bGluZWRjbGVhcl9iYXNlbGluZWNsZWFyX291dGxpbmVkY2xvc2VfYmFzZWxpbmVjbG9zZV9vdXRsaW5lZGNsb3VkX2RvbmVfb3V0bGluZWRjbG91ZF9vdXRsaW5lZGNvbW1lbnRfb3V0bGluZWRjcmVkaXRfY2FyZF9iYXNlbGluZWRlbGV0ZV9vdXRsaW5lX2Jhc2VsaW5lZGVsZXRlX291dGxpbmVkZGVzY3JpcHRpb25fb3V0bGluZWRkb25lX2Jhc2VsaW5lZG93bmxvYWRfYmFzZWxpbmVkb3dubG9hZF9vdXRsaW5lZGRyYWdfaGFuZGxlX2Jhc2VsaW5lZWRpdF9iYXNlbGluZWVkaXRfb3V0bGluZWRlbWFpbF9vdXRsaW5lZGVtb2ppX2V2ZW50c19vdXRsaW5lZGVycm9yX2Jhc2VsaW5lZXJyb3Jfb3V0bGluZV9iYXNlbGluZWV2ZW50X291dGxpbmVkZXhwYW5kX21vcmVfYmFzZWxpbmVmYW1pbHlfcmVzdHJvb21fb3V0bGluZWRmYXZvcml0ZV9iYXNlbGluZWZhdm9yaXRlX2JvcmRlcl9iYXNlbGluZWZsaXBfY2FtZXJhX2FuZHJvaWRfYmFzZWxpbmVmbGlwX2NhbWVyYV9hbmRyb2lkX291dGxpbmVkZmxpcF9jYW1lcmFfYW5kcm9pZF9yb3VuZGVkZmxpcF9jYW1lcmFfYW5kcm9pZF9zaGFycGZsaXBfY2FtZXJhX2lvc19iYXNlbGluZWZsaXBfY2FtZXJhX2lvc19vdXRsaW5lZGZsaXBfY2FtZXJhX2lvc19yb3VuZGVkZmxpcF9jYW1lcmFfaW9zX3NoYXJwZm9sZGVyX29wZW5fYmFzZWxpbmVmb2xkZXJfb3V0bGluZWRncm91cF9vdXRsaW5lZGdyb3Vwc19vdXRsaW5lZGhlYWRwaG9uZXNfb3V0bGluZWRoaWdobGlnaHRfb3V0bGluZWRoaXN0b3J5X291dGxpbmVkaG9tZV9vdXRsaW5lZGhvdXJnbGFzc19lbXB0eV9vdXRsaW5lZGhvd190b19yZWdfb3V0bGluZWRob3dfdG9fdm90ZV9vdXRsaW5lZGltYWdlX291dGxpbmVkaW9zX3NoYXJlX2Jhc2VsaW5laW9zX3NoYXJlX291dGxpbmVkaW9zX3NoYXJlX3JvdW5kZWRpb3Nfc2hhcmVfc2hhcnBrZXlib2FyZF9hcnJvd19kb3duX2Jhc2VsaW5la2V5Ym9hcmRfYXJyb3dfZG93bl9vdXRsaW5lZGtleWJvYXJkX2Fycm93X3VwX2Jhc2VsaW5la2V5Ym9hcmRfb3V0bGluZWRsYWJlbF9vdXRsaW5lZGxpYnJhcnlfbXVzaWNfYmFzZWxpbmVsaW5rX291dGxpbmVkbG9jYXRpb25fb25fb3V0bGluZWRsb2NrX2Jhc2VsaW5lbG9ja19vcGVuX2Jhc2VsaW5lbG9ja19vdXRsaW5lZGxvZ2luX2Jhc2VsaW5lbWFpbF9vdXRsaW5lZG1lbnVfYmFzZWxpbmVtZW51X2Jvb2tfb3V0bGluZWRtaWNfYmFzZWxpbmVtaWNfb2ZmX2Jhc2VsaW5lbWljX29mZl9vdXRsaW5lZG1pY19vdXRsaW5lZG1vcmVfaG9yaXpfYmFzZWxpbmVtb3JlX2hvcml6X291dGxpbmVkbW9yZV9ob3Jpel9yb3VuZGVkbW9yZV9ob3Jpel9zaGFycG1vcmVfdmVydF9iYXNlbGluZW1vcmVfdmVydF9vdXRsaW5lZG1vcmVfdmVydF9yb3VuZGVkbW9yZV92ZXJ0X3NoYXJwbW92ZV91cF9vdXRsaW5lZG11c2ljX25vdGVfYmFzZWxpbmVtdXNpY19ub3RlX291dGxpbmVkbmV3c3BhcGVyX291dGxpbmVkbm90ZV9vdXRsaW5lZG5vdGlmaWNhdGlvbnNfb3V0bGluZWRvbmRlbWFuZF92aWRlb19vdXRsaW5lZG9wZW5faW5fbmV3X291dGxpbmVkcGF1c2VfYmFzZWxpbmVwYXltZW50c19vdXRsaW5lZHBlb3BsZV9vdXRsaW5lX2Jhc2VsaW5lcGVvcGxlX291dGxpbmVkcGVybV9tZWRpYV9vdXRsaW5lZHBlcnNvbl9hZGRfb3V0bGluZWRwZXJzb25fYmFzZWxpbmVwZXJzb25fb3V0bGluZV9iYXNlbGluZXBlcnNvbl9vdXRsaW5lZHBob25lX291dGxpbmVkcGhvdG9fY2FtZXJhX291dGxpbmVkcGhvdG9fbGlicmFyeV9vdXRsaW5lZHBob3RvX291dGxpbmVkcGxheV9hcnJvd19iYXNlbGluZXBsYXlfYXJyb3dfb3V0bGluZWRwbGF5X2NpcmNsZV9maWxsZWRfYmFzZWxpbmVwbGF5X2NpcmNsZV9vdXRsaW5lZHBsYXlsaXN0X2FkZF9iYXNlbGluZXByaW50X291dGxpbmVkcXJfY29kZV9zY2FubmVyX291dGxpbmVkcXVldWVfbXVzaWNfYmFzZWxpbmVyZWNlaXB0X291dGxpbmVkcmVwbGF5X291dGxpbmVkc2NoZWR1bGVfYmFzZWxpbmVzY2hlZHVsZV9vdXRsaW5lZHNjaG9vbF9vdXRsaW5lZHNjcmVlbl9zaGFyZV9iYXNlbGluZXNlYXJjaF9iYXNlbGluZXNlYXJjaF9vdXRsaW5lZHNlbmRfb3V0bGluZWRzaGFyZV9iYXNlbGluZXNoYXJlX291dGxpbmVkc2hhcmVfcm91bmRlZHNoYXJlX3NoYXJwc2hpZWxkX291dGxpbmVkc2tpcF9uZXh0X2Jhc2VsaW5lc2tpcF9wcmV2aW91c19iYXNlbGluZXNtYXJ0cGhvbmVfYmFzZWxpbmVzdGFyX2Jhc2VsaW5lc3Rhcl9vdXRsaW5lZHN0b3BfYmFzZWxpbmVzdG9wX2NpcmNsZV9vdXRsaW5lZHN0b3Bfc2NyZWVuX3NoYXJlX2Jhc2VsaW5lc3dpdGNoX2NhbWVyYV9iYXNlbGluZXN5c3RlbV91cGRhdGVfb3V0bGluZWR0ZXh0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) format('opentype'); }</style>\n"
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
