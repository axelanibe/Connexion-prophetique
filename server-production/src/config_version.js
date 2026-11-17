// Configuration de version pilotée par le serveur, 16 nov. 2026.
// GET /api/config renvoie ces constantes, sans table ni interface
// admin pour cette v1 : minAppVersion et updateUrl ne sont pas du
// contenu éditable comme les textes de /config, une faute de frappe
// ici bloquerait tous les membres. Une interface admin pourra les
// reprendre plus tard, avec validation. configVersion s'incrémente
// quand la forme de cette réponse change, jamais pour un simple
// changement de valeur.
export const VERSION_CONFIG = Object.freeze({
  configVersion: 1,
  minAppVersion: '1.0.1',
  updateUrl: 'https://www.connexionprophetique.com/',
});
