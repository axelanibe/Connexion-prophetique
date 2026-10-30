import 'dart:html' as html;

// Web seulement : met à jour le titre de l'onglet du navigateur.
void setBrowserTabTitle(String title) {
  html.document.title = title;
}
