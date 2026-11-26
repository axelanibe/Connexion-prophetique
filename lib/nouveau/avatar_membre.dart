// Photo et initiales du membre, tranche T1, 26 nov. 2026.
// La photo vient de la session, jamais codée en dur.
import 'package:flutter/material.dart';

import '../app_models.dart' show Member, memberPhotoProvider;
import 'palette.dart';

/// Initiales, deux mots au plus : première lettre du premier
/// et du dernier mot, en capitales.
String initialesDe(String nom) {
  final mots = nom.trim().split(RegExp(r'\s+')).where((m) => m.isNotEmpty).toList();
  if (mots.isEmpty) return '';
  if (mots.length == 1) return mots.first.characters.first.toUpperCase();
  return (mots.first.characters.first + mots.last.characters.first).toUpperCase();
}

class AvatarMembre extends StatelessWidget {
  const AvatarMembre(this.membre, {super.key, this.radius = 15});
  final Member? membre;
  final double radius;

  @override
  Widget build(BuildContext context) {
    final m = membre;
    final photo = m == null ? null : memberPhotoProvider(m);
    if (photo != null) {
      return CircleAvatar(radius: radius, backgroundImage: photo);
    }
    return CircleAvatar(
      radius: radius,
      backgroundColor: PaletteNouvelle.or,
      child: m == null
          ? Icon(Icons.person, size: radius, color: PaletteNouvelle.bleuNuit)
          : Text(
              initialesDe(m.name),
              style: TextStyle(
                fontSize: radius * 0.8,
                fontWeight: FontWeight.w800,
                color: PaletteNouvelle.bleuNuit,
              ),
            ),
    );
  }
}
