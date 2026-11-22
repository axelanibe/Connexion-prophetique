/* Configuration de compilation Tailwind pour website/espace-structure.html.
   Reprend exactement la configuration en ligne de la page (darkMode class,
   couleurs étendues). À relancer après chaque modification des classes de
   la page : voir website/tailwind-espace-structure.css, en-tête du fichier. */
module.exports = {
  content: ['./website/espace-structure.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0f172a',
        'accent-gold': 'var(--accent-color, #cbb26a)',
        'accent-gold-dark': '#a88f4b',
        'bg-body': '#f4f6f9',
      },
    },
  },
  corePlugins: { preflight: true },
};
