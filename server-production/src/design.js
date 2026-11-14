// Configuration design pilotée par le serveur, carte 47, 6 nov. 2026.
// Parallèle à /config, distincte : couleurs de la palette, titres
// d'accueil et ordre des entrées de la barre du bas. Aucun prix,
// aucun paiement, aucun texte biblique ne passe par cette config.
// Les valeurs par défaut sont exactement les valeurs actuelles de
// l'application, rien n'est inventé : sans config serveur, le thème
// et la navigation restent identiques à aujourd'hui.
// Module pur, sans base : il est testé sans PostgreSQL, et server.js
// l'importe pour les routes GET /config/design et PUT /admin/design.
export const DEFAULT_DESIGN_CONFIG = {
  bleuNuit: '#0B1F3A',
  or: '#D4A72C',
  orFonce: '#8A6A12',
  fond: '#F5F6FA',
  titreVieSpirituelle: 'Ma vie spirituelle',
  titreExplorer: 'Explorer',
  titreDecouvrir: 'Découvrir',
  titreRendezVous: 'Prochains rendez-vous',
  titreActualites: 'Actualités de la structure',
  ordreSections: ['accueil', 'bible', 'librairie', 'structure', 'carte', 'plus'],
};

export const DESIGN_COLOR_KEYS = ['bleuNuit', 'or', 'orFonce', 'fond'];
export const DESIGN_TITLE_KEYS = [
  'titreVieSpirituelle',
  'titreExplorer',
  'titreDecouvrir',
  'titreRendezVous',
  'titreActualites',
];
export const DESIGN_NAV_KEYS = ['accueil', 'bible', 'librairie', 'structure', 'carte', 'plus'];
export const DESIGN_KNOWN_KEYS = [...DESIGN_COLOR_KEYS, ...DESIGN_TITLE_KEYS, 'ordreSections'];

const HEX_COULEUR = /^#[0-9A-Fa-f]{6}$/;

export function designCouleurValide(v) {
  return typeof v === 'string' && HEX_COULEUR.test(v);
}

export function designTitreValide(v) {
  return typeof v === 'string' && v.trim().length > 0 && v.length <= 120;
}

export function designOrdreValide(v) {
  if (!Array.isArray(v) || v.length !== DESIGN_NAV_KEYS.length) return false;
  const vues = new Set(v);
  if (vues.size !== v.length) return false;
  return v.every((k) => DESIGN_NAV_KEYS.includes(k));
}

// Copie neuve des défauts, pour ne jamais modifier la constante.
export function designDefauts() {
  return { ...DEFAULT_DESIGN_CONFIG, ordreSections: [...DEFAULT_DESIGN_CONFIG.ordreSections] };
}

// Fusion d'un objet lu (serveur ou base) sur les défauts : les clés
// inconnues sont ignorées, les valeurs invalides aussi, chaque champ
// invalide retombe sur son défaut, jamais sur une erreur.
export function mergeDesignConfig(json) {
  const merged = designDefauts();
  if (!json || typeof json !== 'object' || Array.isArray(json)) return merged;
  for (const k of DESIGN_COLOR_KEYS) {
    if (designCouleurValide(json[k])) merged[k] = json[k];
  }
  for (const k of DESIGN_TITLE_KEYS) {
    if (designTitreValide(json[k])) merged[k] = json[k];
  }
  if (designOrdreValide(json.ordreSections)) merged.ordreSections = [...json.ordreSections];
  return merged;
}

// Erreur 422, même forme que httpError dans server.js.
function designErreur(message) {
  return Object.assign(new Error(message), { statusCode: 422 });
}

// Validation d'un corps PUT : clés connues seulement, aucun champ
// vide. Renvoie les seules clés fournies, nettoyées. Lève une
// erreur 422 sur clé inconnue ou valeur invalide, 400 si aucune
// clé connue n'est fournie.
export function validateDesignPatch(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw Object.assign(new Error('Corps JSON objet requis.'), { statusCode: 400 });
  }
  const unknown = Object.keys(body).filter((k) => !DESIGN_KNOWN_KEYS.includes(k));
  if (unknown.length) throw designErreur(`Clés inconnues : ${unknown.join(', ')}.`);
  const updates = {};
  for (const k of DESIGN_COLOR_KEYS) {
    if (body[k] === undefined) continue;
    if (!designCouleurValide(body[k])) {
      throw designErreur(`La clé ${k} doit être une couleur hexadécimale #RRGGBB.`);
    }
    updates[k] = body[k];
  }
  for (const k of DESIGN_TITLE_KEYS) {
    if (body[k] === undefined) continue;
    if (!designTitreValide(body[k])) {
      throw designErreur(`La clé ${k} doit être un texte non vide de 120 caractères maximum.`);
    }
    updates[k] = body[k];
  }
  if (body.ordreSections !== undefined) {
    if (!designOrdreValide(body.ordreSections)) {
      throw designErreur('ordreSections doit contenir les 6 clés connues, sans doublon.');
    }
    updates.ordreSections = [...body.ordreSections];
  }
  if (!Object.keys(updates).length) {
    throw Object.assign(new Error('Aucune clé connue à modifier.'), { statusCode: 400 });
  }
  return updates;
}
