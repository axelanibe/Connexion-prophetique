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
style = marker + "\n  <style>@font-face { font-family: 'MaterialIcons'; src: url(data:font/otf;base64,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ix6gAZUxJf+LiwwHi4v4lPiUBR0AABKfDxwAAB0AAAAAEh0AABKjEQDkAgABABMAGgAuAEYAZQBxAIwAmACmALQAzADeAPEBCAEiATkBTwFjAXYBiAGYAbABxgHcAfYCEAIpAkACVgJrAn4CkgKnArcCygLdAvIDBwMVAyMDMQM+A08DZwN4A40DngO1A8wD4wPwBAEEEwQpBDoESQRYBHAEjASaBK8EzAThBPYFDAUiBTUFRAVTBWEFbwV9BYsFngWsBbwF0AXnBfYGCgYXBigGOQZNBloGZwZ1BooGmAauBrwG0AbkBvUHDQceBysHRwdjB34HlwevB8cH3gfzCAcIFgglCDMIRQhTCGIIdQiKCJwIqQjBCM8I5Aj2CQgJGQkoCUQJYAl6CYsJmQmvCbwJ0gnmCfMKBQoSCiAKLwo8Ck4KXgpqCnsKiwqXCqoKvQrPCt8K8QsDCxQLIws2C0kLVgtsC4MLlwulC7YLzQvcC+8L/gwVDCQMMgxADFUMawx5DIwMnwy6DM4M4wz0DQgNFQ0lDTQNSA1ZDWoNfw2ODZ0Nqg23DcgN1g3kDfEN/A4LDhoOLw5FDlcObQ6ADowOmQ6mDrMOwA7aDvAPBg8aDysPPw9TD2QPdQ+LD5wPsQ/GD9cP7hABEBMQJRBAEE4QYxB9QWxsM1BJY29ucy1SZWd1bGFydW5pMDAyMGFjY2Vzc190aW1lX2Jhc2VsaW5lYWNjb3VudF9iYWxhbmNlX291dGxpbmVkYWNjb3VudF9iYWxhbmNlX3dhbGxldF9iYXNlbGluZWFkZF9iYXNlbGluZWFkZF9jaXJjbGVfb3V0bGluZV9iYXNlbGluZWFkZF9vdXRsaW5lZGFsYnVtX2Jhc2VsaW5lYWxidW1fb3V0bGluZWRhbHRlcm5hdGVfZW1haWxfb3V0bGluZWRhbmFseXRpY3Nfb3V0bGluZWRhcnJvd19iYWNrX2Jhc2VsaW5lYXJyb3dfYmFja19pb3NfYmFzZWxpbmVhcnJvd19iYWNrX2lvc19uZXdfcm91bmRlZGFycm93X2JhY2tfaW9zX291dGxpbmVkYXJyb3dfYmFja19pb3Nfcm91bmRlZGFycm93X2JhY2tfaW9zX3NoYXJwYXJyb3dfYmFja19vdXRsaW5lZGFycm93X2JhY2tfcm91bmRlZGFycm93X2JhY2tfc2hhcnBhcnJvd19kcm9wX2Rvd25fYmFzZWxpbmVhcnJvd19kcm9wX3VwX2Jhc2VsaW5lYXJyb3dfZm9yd2FyZF9iYXNlbGluZWFycm93X2ZvcndhcmRfaW9zX2Jhc2VsaW5lYXJyb3dfZm9yd2FyZF9pb3Nfb3V0bGluZWRhcnJvd19mb3J3YXJkX2lvc19yb3VuZGVkYXJyb3dfZm9yd2FyZF9pb3Nfc2hhcnBhcnJvd19mb3J3YXJkX291dGxpbmVkYXJyb3dfZm9yd2FyZF9yb3VuZGVkYXJyb3dfZm9yd2FyZF9zaGFycGFycm93X3JpZ2h0X2Jhc2VsaW5lYXJyb3dfdXB3YXJkX2Jhc2VsaW5lYXJ0aWNsZV9vdXRsaW5lZGFzc2lnbm1lbnRfb3V0bGluZWRhdWRpb19maWxlX291dGxpbmVkYXV0b19hd2Vzb21lX2Jhc2VsaW5lYXV0b19zdG9yaWVzX291dGxpbmVkYmFkZ2VfYmFzZWxpbmViYWRnZV9vdXRsaW5lZGJsb2NrX291dGxpbmVkYm9va19vdXRsaW5lZGJvb2ttYXJrX2Jhc2VsaW5lYm9va21hcmtfYm9yZGVyX2Jhc2VsaW5lYm9va21hcmtfb3V0bGluZWRicm9rZW5faW1hZ2Vfb3V0bGluZWRidXNpbmVzc19vdXRsaW5lZGNhbGVuZGFyX21vbnRoX2Jhc2VsaW5lY2FsZW5kYXJfbW9udGhfb3V0bGluZWRjYWxlbmRhcl90b2RheV9iYXNlbGluZWNhbGxfYmFzZWxpbmVjYWxsX2VuZF9iYXNlbGluZWNhbGxfbWFkZV9iYXNlbGluZWNhbGxfcmVjZWl2ZWRfYmFzZWxpbmVjYW1wYWlnbl9vdXRsaW5lZGNhbmNlbF9iYXNlbGluZWNhbmNlbF9vdXRsaW5lZGNhcmRfbWVtYmVyc2hpcF9vdXRsaW5lZGNoYXRfYnViYmxlX291dGxpbmVfYmFzZWxpbmVjaGVja19iYXNlbGluZWNoZWNrX2NpcmNsZV9iYXNlbGluZWNoZWNrX2NpcmNsZV9vdXRsaW5lX2Jhc2VsaW5lY2hlY2tfY2lyY2xlX291dGxpbmVkY2hldnJvbl9sZWZ0X2Jhc2VsaW5lY2hldnJvbl9yaWdodF9iYXNlbGluZWNoZXZyb25fcmlnaHRfb3V0bGluZWRjaGlsZF9jYXJlX291dGxpbmVkY2h1cmNoX2Jhc2VsaW5lY2lyY2xlX291dGxpbmVkY2xlYXJfYmFzZWxpbmVjbGVhcl9vdXRsaW5lZGNsb3NlX2Jhc2VsaW5lY2xvc2Vfb3V0bGluZWRjbG91ZF9kb25lX291dGxpbmVkY2xvdWRfb3V0bGluZWRjb21tZW50X291dGxpbmVkY3JlZGl0X2NhcmRfYmFzZWxpbmVkZWxldGVfb3V0bGluZV9iYXNlbGluZWRlbGV0ZV9vdXRsaW5lZGRlc2NyaXB0aW9uX291dGxpbmVkZG9uZV9iYXNlbGluZWRvd25sb2FkX2Jhc2VsaW5lZG93bmxvYWRfb3V0bGluZWRkcmFnX2hhbmRsZV9iYXNlbGluZWVkaXRfYmFzZWxpbmVlZGl0X291dGxpbmVkZW1haWxfb3V0bGluZWRlbW9qaV9ldmVudHNfb3V0bGluZWRlcnJvcl9iYXNlbGluZWVycm9yX291dGxpbmVfYmFzZWxpbmVldmVudF9vdXRsaW5lZGV4cGFuZF9sZXNzX2Jhc2VsaW5lZXhwYW5kX21vcmVfYmFzZWxpbmVmYXZvcml0ZV9iYXNlbGluZWZhdm9yaXRlX2JvcmRlcl9iYXNlbGluZWZhdm9yaXRlX291dGxpbmVkZmxhZ19vdXRsaW5lZGZsaXBfY2FtZXJhX2FuZHJvaWRfYmFzZWxpbmVmbGlwX2NhbWVyYV9hbmRyb2lkX291dGxpbmVkZmxpcF9jYW1lcmFfYW5kcm9pZF9yb3VuZGVkZmxpcF9jYW1lcmFfYW5kcm9pZF9zaGFycGZsaXBfY2FtZXJhX2lvc19iYXNlbGluZWZsaXBfY2FtZXJhX2lvc19vdXRsaW5lZGZsaXBfY2FtZXJhX2lvc19yb3VuZGVkZmxpcF9jYW1lcmFfaW9zX3NoYXJwZm9sZGVyX29wZW5fYmFzZWxpbmVmb2xkZXJfb3V0bGluZWRmb3Jlc3RfYmFzZWxpbmVmb3J1bV9vdXRsaW5lZGdyaWRfdmlld19vdXRsaW5lZGdyb3VwX291dGxpbmVkZ3JvdXBzX291dGxpbmVkaGVhZHBob25lc19vdXRsaW5lZGhlbHBfb3V0bGluZV9iYXNlbGluZWhpZ2hsaWdodF9vdXRsaW5lZGhvbWVfb3V0bGluZWRob3VyZ2xhc3NfZW1wdHlfb3V0bGluZWRpbWFnZV9vdXRsaW5lZGluZm9fb3V0bGluZV9iYXNlbGluZWlvc19zaGFyZV9iYXNlbGluZWlvc19zaGFyZV9vdXRsaW5lZGlvc19zaGFyZV9yb3VuZGVkaW9zX3NoYXJlX3NoYXJwa2V5Ym9hcmRfYXJyb3dfZG93bl9iYXNlbGluZWtleWJvYXJkX2Fycm93X2Rvd25fb3V0bGluZWRrZXlib2FyZF9hcnJvd191cF9iYXNlbGluZWtleWJvYXJkX291dGxpbmVkbGFiZWxfb3V0bGluZWRsaWJyYXJ5X211c2ljX2Jhc2VsaW5lbGlua19vdXRsaW5lZGxvY2FsX2xpYnJhcnlfb3V0bGluZWRsb2NhdGlvbl9vbl9vdXRsaW5lZGxvY2tfYmFzZWxpbmVsb2NrX29wZW5fYmFzZWxpbmVsb2NrX291dGxpbmVkbG9naW5fYmFzZWxpbmVsb2dvdXRfb3V0bGluZWRtZW51X2Jhc2VsaW5lbWVudV9ib29rX291dGxpbmVkbWVzc2FnZV9vdXRsaW5lZG1pY19iYXNlbGluZW1pY19ub25lX291dGxpbmVkbWljX29mZl9iYXNlbGluZW1pY19vdXRsaW5lZG1vcmVfaG9yaXpfYmFzZWxpbmVtb3JlX2hvcml6X291dGxpbmVkbW9yZV9ob3Jpel9yb3VuZGVkbW9yZV9ob3Jpel9zaGFycG1vcmVfdmVydF9iYXNlbGluZW1vcmVfdmVydF9vdXRsaW5lZG1vcmVfdmVydF9yb3VuZGVkbW9yZV92ZXJ0X3NoYXJwbXVzaWNfbm90ZV9iYXNlbGluZW11c2ljX25vdGVfb3V0bGluZWRub3RlX291dGxpbmVkbm90aWZpY2F0aW9uc19vdXRsaW5lZG9uZGVtYW5kX3ZpZGVvX291dGxpbmVkb3Blbl9pbl9uZXdfb3V0bGluZWRwYXVzZV9iYXNlbGluZXBheW1lbnRzX291dGxpbmVkcGVvcGxlX291dGxpbmVfYmFzZWxpbmVwZW9wbGVfb3V0bGluZWRwZXJzb25fYWRkX291dGxpbmVkcGVyc29uX2Jhc2VsaW5lcGVyc29uX291dGxpbmVfYmFzZWxpbmVwZXJzb25fb3V0bGluZWRwaG9uZV9iYXNlbGluZXBob25lX291dGxpbmVkcGhvdG9fY2FtZXJhX291dGxpbmVkcGhvdG9fbGlicmFyeV9vdXRsaW5lZHBob3RvX291dGxpbmVkcGxheV9hcnJvd19iYXNlbGluZXBsYXlfYXJyb3dfb3V0bGluZWRwbGF5X2NpcmNsZV9maWxsZWRfYmFzZWxpbmVwbGF5X2NpcmNsZV9vdXRsaW5lZHBsYXlsaXN0X2FkZF9iYXNlbGluZXB1c2hfcGluX2Jhc2VsaW5lcXVldWVfbXVzaWNfYmFzZWxpbmVxdWl6X291dGxpbmVkcmVjZWlwdF9vdXRsaW5lZHJlcGxheV9vdXRsaW5lZHJlc3RhcnRfYWx0X2Jhc2VsaW5lc2NoZWR1bGVfYmFzZWxpbmVzY2hlZHVsZV9vdXRsaW5lZHNjcmVlbl9zaGFyZV9iYXNlbGluZXNlYXJjaF9iYXNlbGluZXNlYXJjaF9vdXRsaW5lZHNlbmRfYmFzZWxpbmVzZW5kX291dGxpbmVkc2V0dGluZ3Nfb3V0bGluZWRzaGFyZV9iYXNlbGluZXNoYXJlX291dGxpbmVkc2hhcmVfcm91bmRlZHNoYXJlX3NoYXJwc2hpZWxkX2Jhc2VsaW5lc2hpZWxkX291dGxpbmVkc2hvcHBpbmdfYmFnX291dGxpbmVkc2hvcHBpbmdfY2FydF9vdXRsaW5lZHNraXBfbmV4dF9iYXNlbGluZXNraXBfcHJldmlvdXNfYmFzZWxpbmVzbWFydHBob25lX2Jhc2VsaW5lc3BhX291dGxpbmVkc3Rhcl9iYXNlbGluZXN0YXJfb3V0bGluZWRzdG9wX2Jhc2VsaW5lc3RvcF9vdXRsaW5lZHN0b3Bfc2NyZWVuX3NoYXJlX2Jhc2VsaW5lc3dpdGNoX2NhbWVyYV9iYXNlbGluZXN5c3RlbV91cGRhdGVfb3V0bGluZWR0ZXh0X2ZpZWxkc19vdXRsaW5lZHRodW1iX3VwX291dGxpbmVkdHJlbmRpbmdfdXBfb3V0bGluZWR1cGxvYWRfZmlsZV9vdXRsaW5lZHZlcmlmaWVkX2Jhc2VsaW5ldmVyaWZpZWRfb3V0bGluZWR2ZXJpZmllZF91c2VyX2Jhc2VsaW5ldmlkZW9jYW1fYmFzZWxpbmV2aWRl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) format('opentype'); }</style>\n"
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
