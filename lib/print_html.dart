// Documents imprimables pour l'administration, 30 oct. 2026.
// Chaque document est une page HTML autonome, avec un bouton
// Imprimer visible à l'écran et masqué à l'impression. Les images
// sont intégrées en data URL, pour que le fichier s'imprime seul,
// sans dépendre du serveur. Le logo et le monogramme ne sont
// définis qu'une seule fois dans le style, même pour beaucoup de
// cartes ou de badges, pour garder un fichier raisonnable.

String escapeHtml(String s) {
  return s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
}

/// Une carte de membre, telle qu'elle s'imprime.
class PrintMember {
  PrintMember({
    required this.name,
    required this.matricule,
    required this.fonction,
    required this.etab,
    required this.photoDataUrl,
    required this.valideLabel,
    required this.qrDataUrl,
  });

  final String name;
  final String matricule;
  final String fonction;
  final String etab;
  final String photoDataUrl;
  final String valideLabel;
  final String qrDataUrl;
}

/// Un badge de camp, tel qu'il s'imprime.
class PrintBadge {
  PrintBadge({
    required this.name,
    required this.role,
    required this.matricule,
    required this.etab,
    required this.photoDataUrl,
    required this.campName,
    required this.campDates,
    required this.campLieu,
    required this.qrDataUrl,
  });

  final String name;
  final String role;
  final String matricule;
  final String etab;
  final String photoDataUrl;
  final String campName;
  final String campDates;
  final String campLieu;
  final String qrDataUrl;
}

/// Une ligne de la fiche des membres.
class PrintFiche {
  PrintFiche({
    required this.nom,
    required this.matricule,
    required this.telephone,
    required this.email,
    required this.etablissement,
    required this.fonction,
    required this.inscritLe,
    required this.valideJusqua,
    required this.cotisation,
  });

  final String nom;
  final String matricule;
  final String telephone;
  final String email;
  final String etablissement;
  final String fonction;
  final String inscritLe;
  final String valideJusqua;
  final String cotisation;
}

String _printShell(String titre, String css, String corps, {String lang = 'fr'}) {
  return '<!DOCTYPE html>\n<html lang="$lang">\n<head>\n<meta charset="utf-8">\n'
      '<title>${escapeHtml(titre)}</title>\n<style>\n'
      'body{font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;margin:24px}\n'
      '.barre{margin:0 0 20px}\n'
      '.barre button{background:#D4A72C;color:#0B1F3A;border:0;border-radius:8px;padding:12px 20px;font-size:16px;font-weight:700;cursor:pointer}\n'
      '$css\n'
      '@media print{.barre{display:none}body{margin:0}}\n'
      '</style>\n</head>\n<body>\n'
      '<div class="barre"><button onclick="window.print()">Imprimer</button></div>\n'
      '$corps\n'
      '</body>\n</html>\n';
}

String _photoBloc(String photoDataUrl, String initial) {
  final propre = photoDataUrl.replaceAll(RegExp(r'\s'), '');
  if (propre.isEmpty) {
    return '<div class="photo init">${escapeHtml(initial)}</div>';
  }
  return '<div class="photo"><img src="${escapeHtml(propre)}" alt=""></div>';
}

String _initiale(String nom) {
  final propre = nom.trim();
  if (propre.isEmpty) return '?';
  return propre[0].toUpperCase();
}

String buildCardsHtml(List<PrintMember> membres, String logoDataUrl) {
  const css = '.cp-logo{height:40px;width:230px;background-size:contain;background-repeat:no-repeat;margin-bottom:10px}\n'
      '.carte{background:#0B1F3A;border:1px solid #8A6A12;border-radius:16px;color:#fff;padding:14px;margin:0 0 16px;page-break-inside:avoid}\n'
      '.carte .ligne{display:flex;gap:10px}\n'
      '.carte .infos{flex:1}\n'
      '.photo{width:96px;height:122px;border:1.5px solid #D4A72C;border-radius:10px;overflow:hidden;flex-shrink:0}\n'
      '.photo img{width:100%;height:100%;object-fit:cover}\n'
      '.photo.init{background:#D4A72C;color:#0B1F3A;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700}\n'
      '.etiq{color:#D4A72C;font-size:10px;font-weight:700;letter-spacing:1px}\n'
      '.valeur{color:#fff;font-size:14px;font-weight:700}\n'
      '.valeur.or{color:#D4A72C;font-size:19px;font-weight:800}\n'
      '.bas{display:flex;align-items:flex-end;gap:8px;margin-top:10px}\n'
      '.pastille{border:1px solid #34D399;color:#34D399;border-radius:20px;padding:6px 10px;font-size:11px;font-weight:700}\n'
      '.qr{width:56px;height:56px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-left:auto}\n'
      '.qr img{width:48px;height:48px}\n';
  final cssLogo = '.cp-logo{background-image:url($logoDataUrl)}\n$css';
  final buf = StringBuffer();
  for (final m in membres) {
    buf.write('<div class="carte">');
    buf.write('<div class="cp-logo"></div>');
    buf.write('<div class="ligne">');
    buf.write(_photoBloc(m.photoDataUrl, _initiale(m.name)));
    buf.write('<div class="infos">');
    buf.write('<div class="etiq">MEMBRE NUMÉRO</div><div class="valeur or">${escapeHtml(m.matricule)}</div>');
    buf.write('<div class="etiq">NOM COMPLET</div><div class="valeur">${escapeHtml(m.name)}</div>');
    buf.write('<div class="etiq">FONCTION</div><div class="valeur">${escapeHtml(m.fonction)}</div>');
    buf.write('<div class="etiq">ÉTABLISSEMENT</div><div class="valeur">${escapeHtml(m.etab)}</div>');
    buf.write('</div></div>');
    buf.write('<div class="bas">');
    buf.write('<div><div class="etiq">VALIDE JUSQU’AU</div><div class="valeur">${escapeHtml(m.valideLabel)}</div></div>');
    buf.write('<div><div class="etiq">DURÉE</div><div class="valeur">1 an</div></div>');
    // La pastille fait partie de la carte telle qu'elle existe
    // aujourd'hui, elle est reproduite à l'identique.
    buf.write('<div class="pastille">Cotisation à jour</div>');
    buf.write('<div class="qr"><img src="${escapeHtml(m.qrDataUrl)}" alt=""></div>');
    buf.write('</div></div>');
  }
  return _printShell('Cartes de membre', cssLogo, buf.toString());
}

String buildBadgesHtml(List<PrintBadge> badges, String monogrammeDataUrl) {
  // Même design premium que le badge à l'écran, 31 oct. 2026 : or uni
  // #D4AF37 en repli de l'or feuille, et print-color-adjust exact pour
  // que les fonds bleu nuit et or s'impriment vraiment au lieu de
  // sortir pâles.
  const css = '@media print{.badge{-webkit-print-color-adjust:exact;print-color-adjust:exact}}\n'
      '.badges{display:grid;grid-template-columns:1fr 1fr;gap:16px}\n'
      '.badge{position:relative;overflow:hidden;background:#0B1F3A;border:1.5px solid #D4AF37;border-radius:20px;color:#fff;padding:20px;text-align:center;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact}\n'
      '.reflet{position:absolute;top:0;bottom:0;left:0;right:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,0.08) 45%,transparent 60%);pointer-events:none}\n'
      '.cp-ring{width:72px;height:72px;border:2px solid #D4AF37;border-radius:50%;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;background:#000}\n'
      '.cp-mono{width:60px;height:60px;border-radius:50%;background-size:cover;background-repeat:no-repeat}\n'
      '.badge .titre{color:#D4AF37;font-size:16px;font-weight:800;letter-spacing:1px;white-space:nowrap}\n'
      '.badge .camp{color:#D4AF37;font-size:28px;font-weight:900;letter-spacing:1px;margin-top:12px}\n'
      '.badge .photo-centre{display:flex;justify-content:center;margin:16px 0 12px}\n'
      '.photo{width:96px;height:122px;border:1.5px solid #D4AF37;border-radius:10px;overflow:hidden;flex-shrink:0}\n'
      '.photo img{width:100%;height:100%;object-fit:cover}\n'
      '.photo.init{background:#D4AF37;color:#0B1F3A;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700}\n'
      '.badge .nom{color:#FAF6E9;font-size:24px;font-weight:800}\n'
      '.badge .role{color:#D4AF37;font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-top:4px}\n'
      '.ligne-mat{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:10px}\n'
      '.badge .matricule{color:#D4AF37;font-size:18px;font-weight:800;letter-spacing:1px}\n'
      '.badge .inscrit{display:inline-block;background:#123B2A;color:#2FD27A;border-radius:20px;padding:6px 12px;font-size:12px;font-weight:700}\n'
      '.badge .etab{color:#C7D0DE;font-size:14px;font-weight:700;margin-top:6px}\n'
      '.badge .dates{color:#C7D0DE;font-size:14px;font-weight:700;margin-top:8px}\n'
      '.badge .qr{position:relative;width:152px;height:152px;background:#fff;border:2px solid #D4AF37;border-radius:14px;margin:16px auto 0;display:flex;align-items:center;justify-content:center}\n'
      '.badge .qr img{width:128px;height:128px}\n'
      '.badge .coche{position:absolute;right:6px;bottom:6px;width:28px;height:28px;border-radius:50%;background:#D4AF37;color:#0B1F3A;border:2px solid #0B1F3A;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800}\n'
      '.badge .verification{color:#F2DC9B;font-size:11px;font-weight:700;letter-spacing:1px;margin-top:8px}\n'
      '.diamant{width:8px;height:8px;background:#D4AF37;transform:rotate(45deg);margin:14px auto}\n'
      '.badge .slogan{color:#93A5C0;font-size:12px;font-style:italic;margin-top:14px}\n';
  final cssMono = '.cp-mono{background-image:url($monogrammeDataUrl)}\n$css';
  final buf = StringBuffer('<div class="badges">');
  for (final b in badges) {
    final datesLieu = [b.campDates, b.campLieu].where((s) => s.isNotEmpty).join(' · ');
    final etab = b.etab.trim();
    buf.write('<div class="badge">');
    buf.write('<div class="reflet"></div>');
    buf.write('<div class="cp-ring"><div class="cp-mono"></div></div>');
    buf.write('<div class="titre">CONNEXION PROPHÉTIQUE</div>');
    buf.write('<div class="camp">${escapeHtml(b.campName)}</div>');
    buf.write('<div class="photo-centre">');
    buf.write(_photoBloc(b.photoDataUrl, _initiale(b.name)));
    buf.write('</div>');
    buf.write('<div class="nom">${escapeHtml(b.name)}</div>');
    buf.write('<div class="role">${escapeHtml(b.role)}</div>');
    buf.write('<div class="ligne-mat">');
    buf.write('<div class="matricule">${escapeHtml(b.matricule)}</div>');
    buf.write('<div class="inscrit">✓ Inscrit</div>');
    buf.write('</div>');
    if (etab.isNotEmpty && etab.toLowerCase() != 'autre') {
      buf.write('<div class="etab">${escapeHtml(b.etab)}</div>');
    }
    if (datesLieu.isNotEmpty) {
      buf.write('<div class="dates">${escapeHtml(datesLieu)}</div>');
    }
    buf.write('<div class="qr"><img src="${escapeHtml(b.qrDataUrl)}" alt=""><div class="coche">✓</div></div>');
    buf.write('<div class="verification">Vérification officielle</div>');
    buf.write('<div class="diamant"></div>');
    buf.write('<div class="slogan">Bâtir ensemble pour un impact durable</div>');
    buf.write('</div>');
  }
  buf.write('</div>');
  return _printShell('Badges de camp', cssMono, buf.toString());
}

String buildFichesHtml(String titre, List<PrintFiche> fiches) {
  const css = 'h1{font-size:22px}\n'
      'table{width:100%;border-collapse:collapse;font-size:13px}\n'
      'th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}\n'
      'thead{display:table-header-group}\n'
      'th{background:#0B1F3A;color:#fff}\n'
      'tr{page-break-inside:avoid}\n';
  final buf = StringBuffer();
  buf.write('<h1>${escapeHtml(titre)}</h1>');
  buf.write('<table><thead><tr>');
  for (final h in ['Nom', 'Matricule', 'Téléphone', 'E-mail', 'Établissement', 'Fonction', 'Inscrit le', 'Valide jusqu’au', 'Cotisation']) {
    buf.write('<th>${escapeHtml(h)}</th>');
  }
  buf.write('</tr></thead><tbody>');
  for (final f in fiches) {
    buf.write('<tr>');
    for (final v in [f.nom, f.matricule, f.telephone, f.email, f.etablissement, f.fonction, f.inscritLe, f.valideJusqua, f.cotisation]) {
      buf.write('<td>${escapeHtml(v)}</td>');
    }
    buf.write('</tr>');
  }
  buf.write('</tbody></table>');
  return _printShell(titre, css, buf.toString());
}

/// Un certificat de participation, tel qu'il s'imprime. Les dates et
/// le lieu viennent des champs du camp, jamais complétés : une
/// valeur vide ne s'affiche simplement pas.
class PrintCertificate {
  PrintCertificate({
    required this.name,
    required this.matricule,
    required this.campName,
    required this.campDates,
    required this.campLieu,
  });

  final String name;
  final String matricule;
  final String campName;
  final String campDates;
  final String campLieu;
}

String buildCertificateHtml(PrintCertificate c, {bool isEnglish = false}) {
  const css = '.certificat{max-width:640px;margin:40px auto;border:3px solid #D4A72C;border-radius:20px;padding:40px 32px;text-align:center;page-break-inside:avoid}\n'
      '.certificat .communaute{color:#D4A72C;font-size:16px;font-weight:800;letter-spacing:2px}\n'
      '.certificat h1{color:#0B1F3A;font-size:30px;margin:24px 0 8px}\n'
      '.certificat .regle{width:64px;height:3px;background:#D4A72C;margin:16px auto}\n'
      '.certificat .mention{color:#0B1F3A;font-size:16px;line-height:1.6}\n'
      '.certificat .nom{color:#0B1F3A;font-size:26px;font-weight:800;margin:16px 0 4px}\n'
      '.certificat .matricule{color:#8A6A12;font-size:15px;font-weight:700;letter-spacing:1px}\n'
      '.certificat .camp{color:#0B1F3A;font-size:22px;font-weight:800;margin-top:24px}\n'
      '.certificat .details{color:#0B1F3A;font-size:15px;margin-top:8px}\n';
  final buf = StringBuffer();
  buf.write('<div class="certificat">');
  buf.write('<div class="communaute">CONNEXION PROPHETIQUE</div>');
  buf.write('<h1>${escapeHtml(isEnglish ? 'Certificate of Participation' : 'Certificat de participation')}</h1>');
  buf.write('<div class="regle"></div>');
  buf.write('<div class="mention">${escapeHtml(isEnglish ? 'This certificate confirms that' : 'Ce certificat atteste que')}</div>');
  buf.write('<div class="nom">${escapeHtml(c.name)}</div>');
  buf.write('<div class="matricule">${escapeHtml(isEnglish ? 'Member number ${c.matricule}' : 'Matricule ${c.matricule}')}</div>');
  buf.write('<div class="mention">${escapeHtml(isEnglish ? 'took part in the camp' : 'a pris part au camp')}</div>');
  buf.write('<div class="camp">${escapeHtml(c.campName)}</div>');
  final details = [c.campDates, c.campLieu].where((s) => s.isNotEmpty).join(' · ');
  if (details.isNotEmpty) {
    buf.write('<div class="details">${escapeHtml(details)}</div>');
  }
  buf.write('</div>');
  return _printShell(isEnglish ? 'Certificate of Participation' : 'Certificat de participation', css, buf.toString(), lang: isEnglish ? 'en' : 'fr');
}
