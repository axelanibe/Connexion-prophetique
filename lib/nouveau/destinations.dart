// Destinations de la nouvelle coquille, tranche T1, 26 nov. 2026.
// Les pages pas encore construites (T2 à T9) s'affichent en
// état neutre, titre seulement, aucun contenu inventé.
enum DestinationNouvelle {
  accueil('Accueil'),
  bible('Bible'),
  connexion('Connexion'),
  librairie('Librairie'),
  plus('Plus'),
  profil('Mon profil'),
  carte('Ma carte'),
  journal('Journal personnel'),
  opportunite('Opportunité'),
  suivi('Suivi'),
  meditation('Méditation'),
  chainePriere('Chaîne de prière'),
  parametres('Paramètres'),
  aPropos('À propos'),
  croissance('Croissance spirituelle'),
  galerie('Galerie'),
  fonctions('Mes fonctions'),
  abonnement('Abonnement'),
  espaceStructure('Espace structure'),
  presences('Mes présences'),
  aide('Aide et contact'),
  documents('Mes documents'),
  notifications('Notifications'),
  messagerie('Messagerie'),
  structure('Structure'),
  bureau('Le Bureau'),
  cotisations('Cotisations'),
  paroleVivante('Parole vivante');

  const DestinationNouvelle(this.titre);
  final String titre;
}
