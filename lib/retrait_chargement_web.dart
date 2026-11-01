import 'dart:html' as html;
import 'package:flutter/widgets.dart';

// Web seulement : apres la premiere image, retire l'element #chargement
// si le script externe ne l'a pas deja fait. Sans effet si l'element est
// deja absent, et sans effet sur le contenu de l'application elle-meme.
void retirerIndicateurChargementApresPremierRendu() {
  WidgetsBinding.instance.addPostFrameCallback((_) {
    html.document.getElementById('chargement')?.remove();
  });
}
