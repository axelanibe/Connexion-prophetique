// Nouvelle Connexion, tranche T3, 26 nov. 2026.
// Carte d'une publication du fil, partagée par le fil, le
// détail, le profil et les enregistrements. Réactions J'aime,
// Amen, Prière, commentaires, partage interne par la feuille
// du système, enregistrement, signalement sans masquage
// immédiat. Vidéo lue paresseusement, au toucher seulement.
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:video_player/video_player.dart';

import '../api.dart' show kApiBaseUrl;
import '../magnetophone.dart';
import 'modeles_connexion.dart';
import 'palette.dart';

/// Date courte, JJ/MM/AAAA, sans rien inventer quand elle manque.
String formaterDateConnexion(DateTime? date) {
  if (date == null) return '';
  final j = date.day.toString().padLeft(2, '0');
  final m = date.month.toString().padLeft(2, '0');
  return '$j/$m/${date.year}';
}

/// Octets d'une adresse de données, null sinon.
Uint8List? octetsDataUrl(String? data) {
  if (data == null) return null;
  final i = data.indexOf('base64,');
  if (i < 0) return null;
  try {
    return base64Decode(data.substring(i + 7));
  } catch (_) {
    return null;
  }
}

/// Avatar rond : photo de l'auteur quand elle est connue,
/// initiales sinon. Jamais de photo inventée.
class AvatarConnexion extends StatelessWidget {
  const AvatarConnexion(
      {super.key, this.photo, this.nom = '', this.taille = 40});
  final String? photo;
  final String nom;
  final double taille;

  @override
  Widget build(BuildContext context) {
    final octets = octetsDataUrl(photo);
    if (octets != null) {
      return ClipOval(
        child: Image.memory(octets,
            width: taille,
            height: taille,
            fit: BoxFit.cover,
            errorBuilder: (c, e, s) => _Initiales(nom: nom, taille: taille)),
      );
    }
    return _Initiales(nom: nom, taille: taille);
  }
}

class _Initiales extends StatelessWidget {
  const _Initiales({required this.nom, required this.taille});
  final String nom;
  final double taille;

  @override
  Widget build(BuildContext context) {
    final initiales = nom
        .trim()
        .split(RegExp(r'\s+'))
        .where((m) => m.isNotEmpty)
        .take(2)
        .map((m) => m[0].toUpperCase())
        .join();
    return Container(
      width: taille,
      height: taille,
      alignment: Alignment.center,
      decoration: const BoxDecoration(
          color: PaletteNouvelle.bleuNuit, shape: BoxShape.circle),
      child: Text(
        initiales.isEmpty ? '?' : initiales,
        style: TextStyle(
            color: PaletteNouvelle.or,
            fontSize: taille * 0.38,
            fontWeight: FontWeight.w800),
      ),
    );
  }
}

/// Carte d'une publication. Les actions remontent au parent,
/// qui appelle le service : la carte ne fait que présenter.
class CartePublicationConnexion extends StatelessWidget {
  const CartePublicationConnexion({
    super.key,
    required this.publication,
    this.photoAuteur,
    this.onAuteur,
    this.onReaction,
    this.onCommentaires,
    this.onPartager,
    this.onEnregistrer,
    this.onSignaler,
    this.onSupprimer,
    this.onSuivre,
  });
  final PublicationConnexion publication;
  final String? photoAuteur;
  final VoidCallback? onAuteur;
  final ValueChanged<TypeReaction>? onReaction;
  final VoidCallback? onCommentaires;
  final VoidCallback? onPartager;
  final VoidCallback? onEnregistrer;
  final VoidCallback? onSignaler;
  final VoidCallback? onSupprimer;

  /// Suivre l'auteur, bouton de la maquette, absent de la
  /// carte jusqu'ici. Jamais pour mes propres publications,
  /// jamais pour une actualité sans auteur.
  final VoidCallback? onSuivre;

  @override
  Widget build(BuildContext context) {
    final p = publication;
    if (p.epinglee) {
      return _CarteEpinglee(
        publication: p,
        onReaction: onReaction,
        onCommentaires: onCommentaires,
        onPartager: onPartager,
      );
    }
    final date = formaterDateConnexion(p.creeLe);
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 12, 12, 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE3E7EE)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              InkWell(
                customBorder: const CircleBorder(),
                onTap: onAuteur,
                child: AvatarConnexion(photo: photoAuteur, nom: p.auteurNom),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: InkWell(
                  onTap: onAuteur,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        p.auteurNom,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                            color: PaletteNouvelle.bleuNuit,
                            fontSize: 15,
                            fontWeight: FontWeight.w800),
                      ),
                      if (p.etablissementNom.isNotEmpty || date.isNotEmpty)
                        Text(
                          [
                            if (p.etablissementNom.isNotEmpty)
                              p.etablissementNom,
                            if (date.isNotEmpty) date
                          ].join(' · '),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style:
                              const TextStyle(color: Colors.grey, fontSize: 12),
                        ),
                    ],
                  ),
                ),
              ),
              if (onSuivre != null && !p.estAuteur && p.auteurId.isNotEmpty)
                TextButton(
                  onPressed: onSuivre,
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    minimumSize: const Size(0, 36),
                  ),
                  child: Text(
                    p.suiviParMoi ? 'Suivi' : 'Suivre',
                    style: TextStyle(
                      color: p.suiviParMoi
                          ? Colors.grey
                          : PaletteNouvelle.bleuNuit,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              IconButton(
                tooltip: p.enregistre
                    ? 'Retirer des enregistrements'
                    : 'Enregistrer',
                icon: Icon(
                  p.enregistre ? LucideIcons.bookmark : LucideIcons.bookmark,
                  color: p.enregistre
                      ? PaletteNouvelle.orFonce
                      : PaletteNouvelle.bleuNuit,
                ),
                onPressed: onEnregistrer,
              ),
              PopupMenuButton<String>(
                tooltip: 'Options',
                icon: const Icon(LucideIcons.ellipsisVertical,
                    color: PaletteNouvelle.bleuNuit),
                onSelected: (v) {
                  if (v == 'signaler') onSignaler?.call();
                  if (v == 'supprimer') onSupprimer?.call();
                },
                itemBuilder: (_) => [
                  const PopupMenuItem(
                      value: 'signaler', child: Text('Signaler')),
                  if (p.estAuteur)
                    const PopupMenuItem(
                        value: 'supprimer', child: Text('Supprimer')),
                ],
              ),
            ],
          ),
          if (p.texte.isNotEmpty) ...[
            const SizedBox(height: 10),
            Text(p.texte,
                style: const TextStyle(
                    color: PaletteNouvelle.bleuNuit,
                    fontSize: 15,
                    height: 1.4)),
          ],
          if (p.photo != null) ...[
            const SizedBox(height: 10),
            _PhotoPublication(photo: p.photo!),
          ],
          if (p.videoUrl != null) ...[
            const SizedBox(height: 10),
            _TuileVideo(url: p.videoUrl!),
          ],
          if (p.audioUrl != null) ...[
            const SizedBox(height: 10),
            _TuileAudio(url: p.audioUrl!),
          ],
          const SizedBox(height: 8),
          _LigneReactions(
            publication: p,
            onReaction: onReaction,
            onCommentaires: onCommentaires,
            onPartager: onPartager,
          ),
        ],
      ),
    );
  }
}

/// Réactions J'aime, Amen, Prière avec compteurs, commentaires
/// et partage. La même ligne sert aux publications du fil et
/// aux publications épinglées, qui l'avaient perdue.
class _LigneReactions extends StatelessWidget {
  const _LigneReactions({
    required this.publication,
    this.onReaction,
    this.onCommentaires,
    this.onPartager,
  });
  final PublicationConnexion publication;
  final ValueChanged<TypeReaction>? onReaction;
  final VoidCallback? onCommentaires;
  final VoidCallback? onPartager;

  @override
  Widget build(BuildContext context) {
    final p = publication;
    return Row(
      children: [
        Expanded(
          child: Wrap(
            children: [
              for (final type in TypeReaction.values)
                _BoutonReaction(
                  type: type,
                  nombre: switch (type) {
                    TypeReaction.jaime => p.nbJaime,
                    TypeReaction.amen => p.nbAmen,
                    TypeReaction.priere => p.nbPriere,
                  },
                  actif: p.monType == type.code,
                  onTap: onReaction == null ? null : () => onReaction!(type),
                ),
            ],
          ),
        ),
        TextButton.icon(
          style: TextButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 4)),
          onPressed: onCommentaires,
          icon: const Icon(LucideIcons.messageCircle,
              size: 18, color: PaletteNouvelle.bleuNuit),
          label: Text(
            '${p.nbCommentaires}',
            style: const TextStyle(
                color: PaletteNouvelle.bleuNuit, fontWeight: FontWeight.w700),
          ),
        ),
        IconButton(
          tooltip: 'Partager',
          padding: const EdgeInsets.all(4),
          constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
          icon: const Icon(LucideIcons.share2, color: PaletteNouvelle.bleuNuit),
          onPressed: onPartager,
        ),
      ],
    );
  }
}

class _BoutonReaction extends StatelessWidget {
  const _BoutonReaction(
      {required this.type,
      required this.nombre,
      required this.actif,
      this.onTap});
  final TypeReaction type;
  final int nombre;
  final bool actif;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final icone = switch (type) {
      TypeReaction.jaime => LucideIcons.heart,
      TypeReaction.amen => LucideIcons.sparkles,
      TypeReaction.priere => LucideIcons.flame,
    };
    return TextButton.icon(
      style: TextButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 4),
        foregroundColor:
            actif ? PaletteNouvelle.orFonce : PaletteNouvelle.bleuNuit,
      ),
      onPressed: onTap,
      icon: Icon(icone,
          size: 16,
          color: actif ? PaletteNouvelle.orFonce : PaletteNouvelle.bleuNuit),
      label: Text(
        '${type.libelle} · $nombre',
        style: TextStyle(
          color: actif ? PaletteNouvelle.orFonce : PaletteNouvelle.bleuNuit,
          fontWeight: actif ? FontWeight.w800 : FontWeight.w600,
          fontSize: 12,
        ),
      ),
    );
  }
}

class _PhotoPublication extends StatelessWidget {
  const _PhotoPublication({required this.photo});
  final String photo;

  @override
  Widget build(BuildContext context) {
    final octets = octetsDataUrl(photo);
    Widget image;
    if (octets != null) {
      image = Image.memory(octets,
          fit: BoxFit.cover,
          errorBuilder: (c, e, s) => const SizedBox.shrink());
    } else if (photo.startsWith('http')) {
      image = Image.network(photo,
          fit: BoxFit.cover,
          errorBuilder: (c, e, s) => const SizedBox.shrink());
    } else {
      return const SizedBox.shrink();
    }
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxHeight: 320),
        child: SizedBox(width: double.infinity, child: image),
      ),
    );
  }
}

/// Tuile vidéo : lecture paresseuse, le lecteur ne se crée
/// qu'au toucher, comme les stories.
/// Tuile audio d'une annonce, correction de suivi 27 nov.
/// 2026 : l'audio s'écoute dans le fil, comme un message
/// vocal, sans quitter la publication.
class _TuileAudio extends StatelessWidget {
  const _TuileAudio({required this.url});
  final String url;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF4F6F9),
        borderRadius: BorderRadius.circular(12),
      ),
      child: LecteurAudio(
        chargerSource: () async => AudioSource.uri(Uri.parse(url)),
        duree: Duration.zero,
        couleur: PaletteNouvelle.bleuNuit,
        couleurTexte: PaletteNouvelle.bleuNuit,
      ),
    );
  }
}

class _TuileVideo extends StatelessWidget {
  const _TuileVideo({required this.url});
  final String url;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(12),
      onTap: () => showDialog<void>(
        context: context,
        builder: (_) => _LecteurVideo(url: url),
      ),
      child: Container(
        height: 180,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: PaletteNouvelle.bleuNuit,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(LucideIcons.circlePlay, color: PaletteNouvelle.or, size: 48),
            SizedBox(height: 8),
            Text('Vidéo',
                style: TextStyle(
                    color: Colors.white, fontWeight: FontWeight.w700)),
          ],
        ),
      ),
    );
  }
}

class _LecteurVideo extends StatefulWidget {
  const _LecteurVideo({required this.url});
  final String url;

  @override
  State<_LecteurVideo> createState() => _LecteurVideoState();
}

class _LecteurVideoState extends State<_LecteurVideo> {
  VideoPlayerController? _controleur;
  String? _erreur;

  @override
  void initState() {
    super.initState();
    final uri = widget.url.startsWith('http')
        ? Uri.parse(widget.url)
        : Uri.parse('$kApiBaseUrl${widget.url}');
    final controleur = VideoPlayerController.networkUrl(uri);
    _controleur = controleur;
    controleur.initialize().then((_) {
      if (!mounted) return;
      setState(() {});
      controleur.play();
    }).catchError((Object e) {
      if (!mounted) return;
      setState(() => _erreur = 'La vidéo ne peut pas être lue pour le moment.');
    });
  }

  @override
  void dispose() {
    _controleur?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final controleur = _controleur;
    return Dialog(
      backgroundColor: Colors.black,
      insetPadding: const EdgeInsets.all(12),
      child: AspectRatio(
        aspectRatio: controleur != null && controleur.value.isInitialized
            ? controleur.value.aspectRatio
            : 16 / 9,
        child: Stack(
          alignment: Alignment.center,
          children: [
            if (_erreur != null)
              Padding(
                padding: const EdgeInsets.all(16),
                child: Text(_erreur!,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Colors.white)),
              )
            else if (controleur == null || !controleur.value.isInitialized)
              const CircularProgressIndicator(color: PaletteNouvelle.or)
            else
              GestureDetector(
                onTap: () => setState(() {
                  if (controleur.value.isPlaying) {
                    controleur.pause();
                  } else {
                    controleur.play();
                  }
                }),
                child: VideoPlayer(controleur),
              ),
            Positioned(
              top: 4,
              right: 4,
              child: IconButton(
                icon: const Icon(LucideIcons.x, color: Colors.white),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Actualité de la structure, épinglée en tête du fil : titre
/// et texte seulement, sans réactions, sans auteur à suivre.
/// Actualité épinglée de la structure. Sans réactions quand
/// elle vient des actualités (identifiant factice, aucun
/// compteur côté serveur), avec réactions quand c'est une
/// vraie publication du mur épinglée.
class _CarteEpinglee extends StatelessWidget {
  const _CarteEpinglee({
    required this.publication,
    this.onReaction,
    this.onCommentaires,
    this.onPartager,
  });
  final PublicationConnexion publication;
  final ValueChanged<TypeReaction>? onReaction;
  final VoidCallback? onCommentaires;
  final VoidCallback? onPartager;

  @override
  Widget build(BuildContext context) {
    final date = formaterDateConnexion(publication.creeLe);
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: PaletteNouvelle.or.withValues(alpha: 0.6)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Flexible(
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: PaletteNouvelle.or.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Flexible(
                        child: Text(
                          publication.estActualite
                              ? 'Actualité de la structure · Épinglée'
                              : 'Épinglée',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                              color: PaletteNouvelle.orFonce,
                              fontSize: 12,
                              fontWeight: FontWeight.w800),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              if (date.isNotEmpty)
                Text(date,
                    style: const TextStyle(color: Colors.grey, fontSize: 12)),
            ],
          ),
          if (publication.titre != null && publication.titre!.isNotEmpty) ...[
            const SizedBox(height: 10),
            Text(
              publication.titre!,
              style: const TextStyle(
                  color: PaletteNouvelle.bleuNuit,
                  fontSize: 16,
                  fontWeight: FontWeight.w800),
            ),
          ],
          if (publication.texte.isNotEmpty) ...[
            const SizedBox(height: 6),
            Text(publication.texte,
                style: const TextStyle(
                    color: PaletteNouvelle.bleuNuit,
                    fontSize: 15,
                    height: 1.4)),
          ],
          if (onReaction != null ||
              onCommentaires != null ||
              onPartager != null) ...[
            const SizedBox(height: 8),
            _LigneReactions(
              publication: publication,
              onReaction: onReaction,
              onCommentaires: onCommentaires,
              onPartager: onPartager,
            ),
          ],
        ],
      ),
    );
  }
}
