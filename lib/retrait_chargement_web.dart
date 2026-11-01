// Version web seulement : après le premier rendu, l'élément
// #chargement est retiré, même si le script externe de l'indicateur
// a été bloqué (par exemple par la politique de sécurité) ou est
// absent. Si le script a déjà retiré l'élément, il n'y a rien à
// faire.
import 'dart:html' as html;
import 'package:flutter/widgets.dart';

void retirerIndicateurChargementApresPremierRendu() {
  WidgetsBinding.instance.addPostFrameCallback((_) {
    html.document.getElementById('chargement')?.remove();
  });
}
