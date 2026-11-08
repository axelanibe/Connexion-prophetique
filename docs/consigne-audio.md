# Consigne audio — compresser avant de téléverser

> Chaque Mo téléversé est retéléchargé par chaque membre qui écoute.
> Un sermon de 30 minutes pèse environ 29 Mo en MP3 128 kbps,
> 14 Mo en 64 kbps, 11 Mo en 48 kbps. C'est le débit qui fixe la
> taille, pas le nombre de canaux : à débit égal, un MP3 mono pèse
> autant qu'un MP3 stéréo. Le passage de 29 à 14 Mo vient de la
> division du débit par deux, de 128 à 64 kbps, pas du mono seul.
> Pour de la parole, 64 kbps mono suffit largement, la différence
> avec 128 kbps est à peine perceptible.

## Règle

- **Format : MP3, 64 kbps, mono.** 48 kbps accepté si le fichier reste clair.
- **Ne jamais téléverser de WAV** (environ 11 fois plus lourd qu'un MP3
  à 128 kbps, 22 fois plus qu'à 64 kbps).
- Vérifier la taille avant / après : un sermon de 30 minutes doit faire
  environ 14 Mo, pas environ 29 Mo.

## Avec ffmpeg (recommandé)

```sh
ffmpeg -i entree.mp3 -codec:a libmp3lame -b:a 64k -ac 1 sortie.mp3
```

Remplacer `entree.mp3` par le fichier d'origine (wav, m4a et mp3
fonctionnent en entrée). Pour 48 kbps : `-b:a 48k`.

## Sans ffmpeg

- **Audacity** (gratuit) : importer l'audio, puis Fichier → Exporter →
  Exporter en MP3, débit 64 kbps, canal mono.
- **Convertisseur en ligne** : chercher « mp3 64 kbps mono converter »,
  vérifier que le fichier de sortie fait bien environ 14 Mo pour
  30 minutes avant de le téléverser.

## Pourquoi

- La bande passante Render est facturée au-delà de 5 Go par mois
  (0,15 $/Go). Les audios sont les fichiers les plus lourds servis
  par le serveur : chaque Mo gagné ici est gagné pour chaque écoute.
- L'application met en cache les écoutes et propose le téléchargement
  hors ligne, mais un fichier deux fois plus léger reste deux fois
  moins cher à servir la première fois.

## Le cache, honnêtement

- Une réécoute ne retélécharge pas l'audio, mais le cache n'a ni
  limite de taille ni nettoyage automatique : chaque audio écouté
  laisse un fichier dans le dossier temporaire du téléphone
  (`just_audio_cache/remote`), un par adresse, et l'application ne
  supprime jamais ces fichiers. Le système peut vider le dossier
  temporaire de lui-même, sans garantie. Écouter beaucoup d'audios
  différents fait donc grossir le cache sans limite.
- Sur le web, pas de cache fichier : chaque écoute retélécharge.
- Vider le cache à chaque démarrage n'est pas fait exprès : cela
  obligerait à retélécharger à chaque ouverture, ce qui annulerait
  le cache. Une limite ou un nettoyage, par exemple ne garder que
  les audios récents, reste à construire si le cache devient trop
  lourd.
