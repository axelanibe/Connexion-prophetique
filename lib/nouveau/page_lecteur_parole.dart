// Lecteur plein écran Parole vivante, tranche T13, 26 nov. 2026.
// Pochette décidée par Axel le 26 nov. à 10 h 32 : le monogramme
// CP de l'en-tête en grand, CP en or Cinzel centré sur le fond
// bleu nuit, fin anneau doré, sans tuile, sans carré, sans fond
// noir. Lecture réelle seulement, jamais de son synthétisé.
import 'dart:async';

import 'package:flutter/material.dart';

import 'modeles_parole.dart';
import 'page_parole.dart';
import 'palette.dart';
import 'service_parole.dart';

class PageLecteurParole extends StatefulWidget {
  const PageLecteurParole({super.key, required this.service});
  final ServiceParoleVivante service;

  @override
  State<PageLecteurParole> createState() => _PageLecteurParoleState();
}

class _PageLecteurParoleState extends State<PageLecteurParole> {
  StreamSubscription<AudioParoleVivante?>? _pisteEcoute;
  StreamSubscription<bool>? _lectureEcoute;

  ServiceParoleVivante get _service => widget.service;

  @override
  void initState() {
    super.initState();
    _pisteEcoute = _service.pisteCouranteStream.listen((_) {
      if (mounted) setState(() {});
    });
    _lectureEcoute = _service.enLecture.listen((_) {
      if (mounted) setState(() {});
    });
  }

  @override
  void dispose() {
    _pisteEcoute?.cancel();
    _lectureEcoute?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final piste = _service.pisteCourante;
    if (piste == null) {
      return Scaffold(
        backgroundColor: PaletteNouvelle.bleuNuit,
        body: SafeArea(
          child: Column(
            children: [
              _bande(context),
              const Expanded(
                child: Center(
                  child: Text('Aucun audio en lecture.',
                      style: TextStyle(color: Colors.white)),
                ),
              ),
            ],
          ),
        ),
      );
    }
    return Scaffold(
      backgroundColor: PaletteNouvelle.bleuNuit,
      body: SafeArea(
        child: Column(
          children: [
            _bande(context),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(24, 8, 24, 24),
                children: [
                  _pochette(piste),
                  const SizedBox(height: 24),
                  Text(
                    piste.titre,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                        height: 1.2),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    piste.orateur,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: 14, color: Colors.white.withOpacity(0.75)),
                  ),
                  if (piste.description.isNotEmpty) ...[
                    const SizedBox(height: 12),
                    Text(
                      piste.description,
                      textAlign: TextAlign.center,
                      maxLines: 3,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontSize: 13,
                          color: Colors.white.withOpacity(0.6)),
                    ),
                  ],
                  const SizedBox(height: 24),
                  _progression(),
                  const SizedBox(height: 24),
                  _commandes(piste),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      IconButton(
                        icon: Icon(Icons.favorite,
                            color: _service.estFavori(piste)
                                ? PaletteNouvelle.or
                                : Colors.white.withOpacity(0.6),
                            size: 26),
                        onPressed: () async {
                          await _service.basculerFavori(piste);
                          if (mounted) setState(() {});
                        },
                      ),
                      IconButton(
                        icon: Icon(Icons.add_circle_outline,
                            color: Colors.white.withOpacity(0.85), size: 26),
                        onPressed: () async {
                          await feuilleAjoutPlaylistParole(
                              context, _service, piste);
                          if (mounted) setState(() {});
                        },
                      ),
                      IconButton(
                        icon: Icon(Icons.queue_music,
                            color: Colors.white.withOpacity(0.85), size: 26),
                        onPressed: () => _fileAttente(context),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _bande(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(8, 8, 16, 8),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.keyboard_arrow_down,
                color: Colors.white, size: 32),
            onPressed: () => Navigator.pop(context),
          ),
          const Text(
            'En lecture',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  Widget _pochette(AudioParoleVivante piste) {
    return Center(
      child: Container(
        width: 270,
        height: 270,
        decoration: BoxDecoration(
          color: PaletteNouvelle.bleuNuit,
          shape: BoxShape.circle,
          border: Border.all(
            color: PaletteNouvelle.or.withOpacity(0.55),
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.45),
              blurRadius: 28,
              offset: const Offset(0, 12),
            ),
          ],
        ),
        alignment: Alignment.center,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'CP',
              style: TextStyle(
                fontFamily: 'Cinzel',
                fontSize: 64,
                fontWeight: FontWeight.w700,
                color: PaletteNouvelle.or,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              piste.categorie.toUpperCase(),
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: 3,
                color: Colors.white.withOpacity(0.65),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _progression() {
    return StreamBuilder<Duration>(
      stream: _service.position,
      initialData: Duration.zero,
      builder: (context, position) {
        final dureeConnue = _service.dureeConnue;
        final totale = dureeConnue ?? _service.dureeEstimee();
        final pos = position.data ?? Duration.zero;
        return Column(
          children: [
            SliderTheme(
              data: SliderTheme.of(context).copyWith(
                activeTrackColor: PaletteNouvelle.or,
                inactiveTrackColor: Colors.white.withOpacity(0.2),
                thumbColor: PaletteNouvelle.or,
                overlayColor: PaletteNouvelle.or.withOpacity(0.1),
                trackHeight: 4,
                thumbShape:
                    const RoundSliderThumbShape(enabledThumbRadius: 7),
              ),
              child: Slider(
                value: totale.inSeconds == 0
                    ? 0.0
                    : (pos.inSeconds / totale.inSeconds).clamp(0.0, 1.0),
                onChanged: (v) {
                  if (totale.inSeconds == 0) return;
                  _service.chercher(
                      Duration(seconds: (v * totale.inSeconds).round()));
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(formaterDuree(pos),
                      style: TextStyle(
                          fontSize: 12,
                          color: Colors.white.withOpacity(0.75))),
                  Text(
                      dureeConnue == null &&
                              _service.pisteCourante?.dureeTexte != null
                          ? _service.pisteCourante!.dureeTexte!
                          : formaterDuree(totale),
                      style: TextStyle(
                          fontSize: 12,
                          color: Colors.white.withOpacity(0.75))),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _commandes(AudioParoleVivante piste) {
    return StreamBuilder<bool>(
      stream: _service.enLecture,
      initialData: false,
      builder: (context, lecture) {
        final enLecture = lecture.data ?? false;
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            TextButton(
              onPressed: () => _service.reculer15(),
              child: Text('−15 s',
                  style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: Colors.white.withOpacity(0.85))),
            ),
            IconButton(
              icon: const Icon(Icons.skip_previous,
                  color: Colors.white, size: 36),
              onPressed: () => _service.precedent(),
            ),
            Container(
              width: 72,
              height: 72,
              decoration: const BoxDecoration(
                color: PaletteNouvelle.or,
                shape: BoxShape.circle,
              ),
              child: IconButton(
                icon: Icon(
                    enLecture ? Icons.pause : Icons.play_arrow,
                    color: PaletteNouvelle.bleuNuit,
                    size: 36),
                onPressed: () => _service.basculerLecture(),
              ),
            ),
            IconButton(
              icon: const Icon(Icons.skip_next,
                  color: Colors.white, size: 36),
              onPressed: () => _service.suivant(),
            ),
            TextButton(
              onPressed: () => _service.avancer15(),
              child: Text('+15 s',
                  style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: Colors.white.withOpacity(0.85))),
            ),
          ],
        );
      },
    );
  }

  Future<void> _fileAttente(BuildContext context) async {
    final file = _service.fileAttente;
    final courante = _service.pisteCourante;
    await showModalBottomSheet<void>(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: PaletteNouvelle.bleuNuit.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 12),
            const Text('File d’attente',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: PaletteNouvelle.bleuNuit)),
            const SizedBox(height: 12),
            if (file.isEmpty)
              const Text('File d’attente vide.',
                  style: TextStyle(fontSize: 13, color: Colors.grey))
            else
              SizedBox(
                height: 300,
                child: ListView.builder(
                  itemCount: file.length,
                  itemBuilder: (_, index) {
                    final audio = file[index];
                    final actif = audio.id == courante?.id;
                    return ListTile(
                      contentPadding: EdgeInsets.zero,
                      leading: Icon(
                          actif ? Icons.volume_up : Icons.music_note,
                          color: actif
                              ? PaletteNouvelle.or
                              : PaletteNouvelle.bleuNuit),
                      title: Text(audio.titre,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                              fontWeight:
                                  actif ? FontWeight.w800 : FontWeight.w600,
                              color: PaletteNouvelle.bleuNuit)),
                      subtitle: Text(
                          '${audio.orateur}${audio.dureeTexte == null ? '' : ' • ${audio.dureeTexte}'}',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis),
                      onTap: () async {
                        await _service.jouer(audio, file: file);
                        if (ctx.mounted) Navigator.pop(ctx);
                      },
                    );
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}
