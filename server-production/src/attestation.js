// Attestation, modèle unique, 5 nov. 2026 : le gabarit HTML
// approuvé avec le monogramme CP officiel (src/attestation.html,
// copie exacte du fichier approuvé, seules les données dynamiques
// sont remplacées). Aucune donnée inventée : un champ absent
// disparaît de sa ligne, il ne devient jamais une durée, un lieu
// ou une appréciation. Le sceau du gabarit est en texte, jamais
// le monogramme, et la ligne de signature reste vide, à apposer
// à la main. Les valeurs dynamiques sont échappées, un nom ou
// une activité ne peut jamais casser le modèle ni injecter du HTML.
export function attestationEchapper(v) {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function attestationDateTexte(v) {
  if (!v) return null;
  const s = v instanceof Date ? v.toISOString().slice(0, 10) : String(v).slice(0, 10);
  const [a, m, j] = s.split('-');
  return `${j}/${m}/${a}`;
}

export function attestationHtml(a, gabarit) {
  const champ = (v) => String(v ?? '').trim();
  const nom = champ(a.membre_nom);
  const matricule = champ(a.matricule);
  const etablissement = champ(a.etablissement);
  const activite = champ(a.activite);
  const role = champ(a.role_service);
  const reference = champ(a.reference);
  const benevolat = a.type === 'benevolat';
  const titre = benevolat ? 'Attestation de Bénévolat' : 'Attestation de Participation';
  const corps = benevolat
    ? 'a rendu un service bénévole remarquable au sein de la structure, dans le cadre de l\'activité suivante :'
    : 'a participé à l\'activité suivante :';
  const remerciement = benevolat
    ? `La structure remercie chaleureusement <strong>${attestationEchapper(nom.toUpperCase())}</strong> pour son engagement exemplaire, son dévouement et sa précieuse contribution, et lui exprime sa profonde reconnaissance.`
    : `La structure remercie <strong>${attestationEchapper(nom.toUpperCase())}</strong> pour sa participation et sa contribution, et lui exprime sa reconnaissance.`;
  const debut = attestationDateTexte(a.date_debut);
  const fin = attestationDateTexte(a.date_fin);
  const periode = debut && fin
    ? `<p class="text-xs font-semibold text-slate-700 mt-3">Période : du ${attestationEchapper(debut)} au ${attestationEchapper(fin)}.</p>`
    : debut || fin
      ? `<p class="text-xs font-semibold text-slate-700 mt-3">Date : ${attestationEchapper(debut || fin)}.</p>`
      : '';
  const etablissementLigne = etablissement
    ? `<p class="text-xs font-semibold text-[#99772C] mt-1 tracking-widest font-mono">ÉTABLISSEMENT : ${attestationEchapper(etablissement.toUpperCase())}</p>`
    : '';
  const roleLigne = role
    ? `<p class="text-sm md:text-base font-normal text-slate-700 max-w-lg mx-auto leading-relaxed my-4">Rôle ou service : ${attestationEchapper(role)}.</p>`
    : '';
  const delivre = attestationDateTexte(a.delivre_le);
  return gabarit
    .replaceAll('{{TITRE}}', titre)
    .replaceAll('{{NOM}}', attestationEchapper(nom.toUpperCase()))
    .replaceAll('{{MATRICULE}}', attestationEchapper(matricule))
    .replaceAll('{{ETABLISSEMENT_LIGNE}}', etablissementLigne)
    .replaceAll('{{CORPS_ACTIVITE}}', corps)
    .replaceAll('{{ACTIVITE}}', attestationEchapper(activite))
    .replaceAll('{{ROLE_LIGNE}}', roleLigne)
    .replaceAll('{{REMERCIEMENT}}', remerciement)
    .replaceAll('{{PERIODE_LIGNE}}', periode)
    .replaceAll('{{DELIVRE_LE}}', attestationEchapper(delivre ?? ''))
    .replaceAll('{{REFERENCE}}', attestationEchapper(reference));
}
