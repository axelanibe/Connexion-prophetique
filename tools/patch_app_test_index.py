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
style = marker + "\n  <style>@font-face { font-family: 'MaterialIcons'; src: url(data:font/otf;base64,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AADkiAAA5IgAAACZAADkkQAA5JEAAACdAADklwAA5JcAAACeAADkywAA5MsAAACkAADkzQAA5M0AAACmAADk0gAA5NIAAACoAADk/AAA5PwAAACrAADlVgAA5VYAAACvAADlYQAA5WEAAACyAADlZwAA5WcAAACzAADlkwAA5ZMAAAC2AADlvQAA5b4AAAC7AADlxgAA5cYAAAC9AADl+QAA5fkAAAC+AADmBgAA5gYAAADAAADmCAAA5ggAAADDAADmKwAA5isAAADEAADmmQAA5pkAAADJAADmmgAA5poAAADLAADmqAAA5qkAAADMAADmxQAA5sUAAADSAADm9AAA5vQAAADUAADnkgAA55IAAAAQAADnkwAA55MAAAATAADnmgAA55oAAAAaAADnmwAA55sAAAAdAADplQAA6ZUAAABeAADplgAA6ZYAAABiAADqRwAA6kcAAABxAADq+gAA6voAAACJAADq/QAA6v0AAACNAADsiwAA7IsAAAC5AADuMgAA7jIAAAADAADuRwAA7kcAAAAGAADuUwAA7lMAAAAHAADuZwAA7mcAAAAJAADudAAA7nQAAAAKAADuhAAA7oQAAAAOAADuhQAA7oUAAAARAADujAAA7owAAAAYAADujQAA7o0AAAAbAADukwAA7pMAAAAgAADumAAA7pgAAAAhAADurwAA7q8AAAAlAADuuAAA7rgAAAAnAADu0QAA7tEAAAAoAADu3wAA7t8AAAApAADu/wAA7v8AAAAqAADvDwAA7w8AAAArAADvEQAA7xEAAAAuAADvJwAA7ycAAAAxAADvKAAA7ygAAAAzAADvSAAA70kAAAA3AADvTgAA708AAAA7AADvUwAA71MAAAA+AADvWAAA71gAAABAAADvWgAA71oAAABCAADvXwAA718AAABDAADvYgAA72IAAABEAADvfwAA738AAABFAADvqgAA76oAAABIAADvrgAA764AAABJAADv8gAA7/IAAABMAADwDQAA8A0AAABPAADwGAAA8BgAAABQAADwGgAA8BoAAABRAADwLwAA8C8AAABUAADwNwAA8DcAAABWAADwRgAA8EYAAABXAADwewAA8HsAAABaAADwhwAA8IcAAABcAADwiAAA8IgAAABgAADwkQAA8JEAAABkAADw2QAA8NkAAABlAADw2wAA8NsAAABmAADw7QAA8O0AAABnAADw/wAA8P8AAABoAADxAgAA8QIAAABpAADxBwAA8QcAAABqAADxEQAA8REAAABrAADxGAAA8RgAAABsAADxIAAA8SAAAABtAADxOAAA8TgAAABvAADxPQAA8T0AAABzAADxRAAA8UQAAAB1AADxTQAA8U0AAAB2AADxZAAA8WQAAAB4AADxaQAA8WkAAAB5AADxkwAA8ZMAAAB6AADxlwAA8ZcAAAB9AADxqgAA8aoAAAB/AADxwgAA8cIAAACBAADxygAA8csAAACEAADx5wAA8ecAAACHAADx6gAA8eoAAACLAADx+wAA8fsAAACQAADyFAAA8hQAAACSAADyMAAA8jAAAACTAADyNwAA8jcAAACUAADyPAAA8jwAAACVAADyQgAA8kIAAACWAADyZgAA8mYAAACYAADybAAA8mwAAACaAADycgAA8nIAAACbAADyeAAA8ngAAACcAADyewAA8nsAAACfAADykAAA8pAAAACgAADymwAA8psAAAChAADynQAA8p4AAACiAADyrgAA8q4AAAClAADysQAA8rEAAACnAADyzgAA8s4AAACpAADy2gAA8toAAACqAADy8AAA8vAAAACsAADy9wAA8vcAAACtAADzCgAA8woAAACuAADzOQAA8zkAAACwAADzPAAA8zwAAACxAADzSwAA80sAAAC0AADzVQAA81UAAAC1AADzeAAA83gAAAC3AADzeQAA83kAAAC6AADz4AAA8+AAAAC/AADz6QAA8+oAAADBAAD0GgAA9BoAAADFAAD0LAAA9CwAAADGAAD0eAAA9HkAAADHAAD0fAAA9HwAAADKAAD0iwAA9IwAAADOAAD0oAAA9KEAAADQAAD0qQAA9KkAAADTAAD1cAAA9XAAAAANAAD1cQAA9XEAAAAPAAD1cgAA9XIAAAASAAD1eQAA9XkAAAAZAAD1egAA9XoAAAAcAAD3dAAA93QAAABdAAD3dQAA93UAAABhAAD4JgAA+CYAAABwAAD42QAA+NkAAACIAAD43AAA+NwAAACMAA8BagAPAWoAAAC4AA8FHwAPBR8AAAAsAA8FvwAPBb8AAAAjAA8FyAAPBcgAAAA9AA8GOAAPBjgAAACOAA8GOQAPBjkAAACRAA8GoQAPBqEAAADVAAQFvgAAAV4BAAAHAF4AIOA64EfgUOB2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pAm0CcAJ0wnmCfgKCAoaCiwKPQpMClwKbwqCCpQKpwq0CsoK4Qr1CwMLFAsrCzoLTQtgC28LhguVC6MLuAvOC9wL7wwCDB0MMQxGDFQMbAyADJAMoAyvDMAM0QzgDPUNBA0TDSANLg08DUkNVA1jDXUNiw2eDasNuA3FDdkN5g4ADhYOLA5ADlQOYw50DoUOmw6sDsEO1g7nDv4PEQ8jDz4PUw9tQWxsM1BJY29ucy1SZWd1bGFydW5pMDAyMGFjY2Vzc190aW1lX2Jhc2VsaW5lYWNjb3VudF9iYWxhbmNlX291dGxpbmVkYWRkX2Jhc2VsaW5lYWRkX2NpcmNsZV9vdXRsaW5lX2Jhc2VsaW5lYWRkX291dGxpbmVkYWRtaW5fcGFuZWxfc2V0dGluZ3Nfb3V0bGluZWRhbGJ1bV9iYXNlbGluZWFsYnVtX291dGxpbmVkYW5hbHl0aWNzX291dGxpbmVkYXJyb3dfYmFja19iYXNlbGluZWFycm93X2JhY2tfaW9zX2Jhc2VsaW5lYXJyb3dfYmFja19pb3NfbmV3X3JvdW5kZWRhcnJvd19iYWNrX2lvc19vdXRsaW5lZGFycm93X2JhY2tfaW9zX3JvdW5kZWRhcnJvd19iYWNrX2lvc19zaGFycGFycm93X2JhY2tfb3V0bGluZWRhcnJvd19iYWNrX3JvdW5kZWRhcnJvd19iYWNrX3NoYXJwYXJyb3dfZHJvcF9kb3duX2Jhc2VsaW5lYXJyb3dfZHJvcF91cF9iYXNlbGluZWFycm93X2ZvcndhcmRfYmFzZWxpbmVhcnJvd19mb3J3YXJkX2lvc19iYXNlbGluZWFycm93X2ZvcndhcmRfaW9zX291dGxpbmVkYXJyb3dfZm9yd2FyZF9pb3Nfcm91bmRlZGFycm93X2ZvcndhcmRfaW9zX3NoYXJwYXJyb3dfZm9yd2FyZF9vdXRsaW5lZGFycm93X2ZvcndhcmRfcm91bmRlZGFycm93X2ZvcndhcmRfc2hhcnBhcnJvd19yaWdodF9iYXNlbGluZWFycm93X3Vwd2FyZF9iYXNlbGluZWFydGljbGVfb3V0bGluZWRhc3NpZ25tZW50X291dGxpbmVkYXR0YWNoX2ZpbGVfYmFzZWxpbmVhdWRpb19maWxlX291dGxpbmVkYXV0b19hd2Vzb21lX2Jhc2VsaW5lYXV0b19zdG9yaWVzX291dGxpbmVkYmFkZ2VfYmFzZWxpbmViYWRnZV9vdXRsaW5lZGJsb2NrX291dGxpbmVkYm9va19vdXRsaW5lZGJyb2tlbl9pbWFnZV9vdXRsaW5lZGNha2Vfb3V0bGluZWRjYWxlbmRhcl9tb250aF9vdXRsaW5lZGNhbGVuZGFyX3RvZGF5X2Jhc2VsaW5lY2FsZW5kYXJfdG9kYXlfb3V0bGluZWRjYWxsX2Jhc2VsaW5lY2FsbF9lbmRfYmFzZWxpbmVjYW1wYWlnbl9vdXRsaW5lZGNhbmNlbF9iYXNlbGluZWNhbmNlbF9vdXRsaW5lZGNoYXRfYnViYmxlX291dGxpbmVfYmFzZWxpbmVjaGVja19iYXNlbGluZWNoZWNrX2NpcmNsZV9iYXNlbGluZWNoZWNrX2NpcmNsZV9vdXRsaW5lZGNoZWNrX291dGxpbmVkY2hldnJvbl9sZWZ0X2Jhc2VsaW5lY2hldnJvbl9yaWdodF9iYXNlbGluZWNoZXZyb25fcmlnaHRfb3V0bGluZWRjaGlsZF9jYXJlX291dGxpbmVkY2h1cmNoX291dGxpbmVkY2lyY2xlX291dGxpbmVkY2xlYXJfYmFzZWxpbmVjbGVhcl9vdXRsaW5lZGNsb3NlX2Jhc2VsaW5lY2xvc2Vfb3V0bGluZWRjbG91ZF9kb25lX291dGxpbmVkY2xvdWRfb3V0bGluZWRjb250ZW50X2NvcHlfb3V0bGluZWRjcmVkaXRfY2FyZF9iYXNlbGluZWRlbGV0ZV9vdXRsaW5lX2Jhc2VsaW5lZGVsZXRlX291dGxpbmVkZGVzY3JpcHRpb25fb3V0bGluZWRkb25lX2Jhc2VsaW5lZG93bmxvYWRfYmFzZWxpbmVkb3dubG9hZF9vdXRsaW5lZGRyYWdfaGFuZGxlX2Jhc2VsaW5lZWRpdF9iYXNlbGluZWVkaXRfb3V0bGluZWRlbWFpbF9vdXRsaW5lZGVtb2ppX2V2ZW50c19vdXRsaW5lZGVycm9yX2Jhc2VsaW5lZXJyb3Jfb3V0bGluZV9iYXNlbGluZWV2ZW50X291dGxpbmVkZXhwYW5kX21vcmVfYmFzZWxpbmVleHBsb3JlX291dGxpbmVkZmFtaWx5X3Jlc3Ryb29tX291dGxpbmVkZmF2b3JpdGVfYmFzZWxpbmVmYXZvcml0ZV9ib3JkZXJfYmFzZWxpbmVmbGFnX291dGxpbmVkZmxpcF9jYW1lcmFfYW5kcm9pZF9iYXNlbGluZWZsaXBfY2FtZXJhX2FuZHJvaWRfb3V0bGluZWRmbGlwX2NhbWVyYV9hbmRyb2lkX3JvdW5kZWRmbGlwX2NhbWVyYV9hbmRyb2lkX3NoYXJwZmxpcF9jYW1lcmFfaW9zX2Jhc2VsaW5lZmxpcF9jYW1lcmFfaW9zX291dGxpbmVkZmxpcF9jYW1lcmFfaW9zX3JvdW5kZWRmbGlwX2NhbWVyYV9pb3Nfc2hhcnBmb2xkZXJfb3Blbl9iYXNlbGluZWZvbGRlcl9vdXRsaW5lZGdyb3VwX291dGxpbmVkZ3JvdXBzX291dGxpbmVkaGVhZHBob25lc19vdXRsaW5lZGhpZ2hsaWdodF9vdXRsaW5lZGhpc3Rvcnlfb3V0bGluZWRob21lX291dGxpbmVkaG91cmdsYXNzX2VtcHR5X291dGxpbmVkaG93X3RvX3ZvdGVfb3V0bGluZWRpbWFnZV9vdXRsaW5lZGlvc19zaGFyZV9iYXNlbGluZWlvc19zaGFyZV9vdXRsaW5lZGlvc19zaGFyZV9yb3VuZGVkaW9zX3NoYXJlX3NoYXJwa2V5Ym9hcmRfYXJyb3dfZG93bl9iYXNlbGluZWtleWJvYXJkX2Fycm93X2Rvd25fb3V0bGluZWRrZXlib2FyZF9hcnJvd191cF9iYXNlbGluZWtleWJvYXJkX291dGxpbmVkbGFiZWxfb3V0bGluZWRsaWJyYXJ5X211c2ljX2Jhc2VsaW5lbGlnaHRidWxiX291dGxpbmVkbGlua19vdXRsaW5lZGxvY2F0aW9uX29uX291dGxpbmVkbG9ja19iYXNlbGluZWxvY2tfb3Blbl9iYXNlbGluZWxvY2tfb3V0bGluZWRsb2dpbl9iYXNlbGluZW1haWxfb3V0bGluZWRtZW51X2Jhc2VsaW5lbWVudV9ib29rX291dGxpbmVkbWljX2Jhc2VsaW5lbWljX29mZl9iYXNlbGluZW1pY19vZmZfb3V0bGluZWRtaWNfb3V0bGluZWRtb3JlX2hvcml6X2Jhc2VsaW5lbW9yZV9ob3Jpel9vdXRsaW5lZG1vcmVfaG9yaXpfcm91bmRlZG1vcmVfaG9yaXpfc2hhcnBtb3JlX3ZlcnRfYmFzZWxpbmVtb3JlX3ZlcnRfb3V0bGluZWRtb3JlX3ZlcnRfcm91bmRlZG1vcmVfdmVydF9zaGFycG1vdmVfdXBfb3V0bGluZWRtdXNpY19ub3RlX2Jhc2VsaW5lbXVzaWNfbm90ZV9vdXRsaW5lZG5ld3NwYXBlcl9vdXRsaW5lZG5pZ2h0bGlnaHRfb3V0bGluZWRub3RlX291dGxpbmVkbm90aWZpY2F0aW9uc19vdXRsaW5lZG9uZGVtYW5kX3ZpZGVvX291dGxpbmVkb3Blbl9pbl9uZXdfb3V0bGluZWRwYXVzZV9iYXNlbGluZXBheW1lbnRzX291dGxpbmVkcGVvcGxlX291dGxpbmVfYmFzZWxpbmVwZW9wbGVfb3V0bGluZWRwZXJtX21lZGlhX291dGxpbmVkcGVyc29uX2FkZF9vdXRsaW5lZHBlcnNvbl9iYXNlbGluZXBlcnNvbl9vdXRsaW5lX2Jhc2VsaW5lcGVyc29uX291dGxpbmVkcGhvbmVfb3V0bGluZWRwaG90b19jYW1lcmFfb3V0bGluZWRwaG90b19saWJyYXJ5X291dGxpbmVkcGhvdG9fb3V0bGluZWRwbGF5X2Fycm93X2Jhc2VsaW5lcGxheV9hcnJvd19vdXRsaW5lZHBsYXlfY2lyY2xlX2ZpbGxlZF9iYXNlbGluZXBsYXlfY2lyY2xlX291dGxpbmVkcGxheWxpc3RfYWRkX2Jhc2VsaW5lcHJpbnRfb3V0bGluZWRxcl9jb2RlX3NjYW5uZXJfb3V0bGluZWRxdWV1ZV9tdXNpY19iYXNlbGluZXJlY2VpcHRfb3V0bGluZWRyZWZyZXNoX291dGxpbmVkcmVwbGF5X291dGxpbmVkc2NoZWR1bGVfYmFzZWxpbmVzY2hlZHVsZV9vdXRsaW5lZHNjaG9vbF9vdXRsaW5lZHNjcmVlbl9zaGFyZV9iYXNlbGluZXNlYXJjaF9iYXNlbGluZXNlYXJjaF9vdXRsaW5lZHNlbmRfb3V0bGluZWRzaGFyZV9iYXNlbGluZXNoYXJlX291dGxpbmVkc2hhcmVfcm91bmRlZHNoYXJlX3NoYXJwc2hpZWxkX291dGxpbmVkc2tpcF9uZXh0X2Jhc2VsaW5lc2tpcF9wcmV2aW91c19iYXNlbGluZXNtYXJ0cGhvbmVfYmFzZWxpbmVzdGFyX2Jhc2VsaW5lc3Rhcl9vdXRsaW5lZHN0b3BfYmFzZWxpbmVzdG9wX2NpcmNsZV9vdXRsaW5lZHN0b3Bfb3V0bGluZWRzdG9wX3NjcmVlbl9zaGFyZV9iYXNlbGluZXN3aXRjaF9jYW1lcmFfYmFzZWxpbmVzeXN0ZW1fdXBkYXRlX291dGxpbmVkdGV4dF9maWVsZHNfb3V0bGluZWR1cGxvYWRfZmlsZV9vdXRsaW5lZHVwbG9hZF9vdXRsaW5lZHZlcmlmaWVkX2Jhc2VsaW5ldmVyaWZpZWRfb3V0bGluZWR2ZXJpZmllZF91c2VyX2Jhc2VsaW5ldmlkZW9jYW1fYmFzZWxpbmV2aWRlb2NhbV9vZmZfYmFzZWxpbmV2aWRlb2NhbV9vZmZfb3V0bGluZWR2aWRlb2NhbV9vdXRsaW5lZHZpc2liaWxpdHlfb2ZmX291dGxpbmVkdmlzaWJpbGl0eV9vdXRsaW5lZHZvbHVtZV91cF9iYXNlbGluZXZvbHVudGVlcl9hY3RpdmlzbV9vdXRsaW5lZHdvcmtfb3V0bGluZV9iYXNlbGluZXdvcmtzcGFjZV9wcmVtaXVtX291dGxpbmVkAAABAYjUANYCAAEABAAHAE8AnQC6AP8BHAG6AgMCYAK5At0C+gM0A1EDiwOoA8wEEQQ1BEUEVQR5BJUEsQTqBQYFKgVuBZIFogXFBhYGswcKB2EHrQhMCMQJZgm8CgoKWwr7C3ALrAvyDD4Msg1PDY0N3w4VDjAOZg6wDssO5A79DxYQGhCLEMAQ8REiEVMRhBH1ElESmRLXExETTROZE7QT2BQQFCsUXBSlFOsVXhWRFdgWJxZAFpwXPRdsF8cX/BhkGN8ZiBnwGmwa/xubHAAcOhx5HQEd1h4fHm0euB7vHzEfpx/rIDQgfSDwIR4hNyFQIWkh8yIxIowi8CM8I4Yj4yRFJK4k6iUwJVEmKiZsJuInYiejJ+QoJShmKKco5yknKWcppyn6Kh8qWSq3KwYrPiuSK9gsHSw3LJ0tQC3ILjMuly7DLxYvaS/nMFUwrzDzMQcxKDFXMZkxzTI3MuUzKjOUM9Ez/jRGNI402TUfNWM1pzXfNkg28TdaN8M4ATgh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) format('opentype'); }</style>\n"
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
