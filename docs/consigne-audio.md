# Consigne audio — compresser avant de téléverser

> Chaque Mo téléversé est retéléchargé par chaque membre qui écoute.
> Un sermon de 30 minutes pèse environ 28 Mo en MP3 128 kbps stéréo,
> 14 Mo en 64 kbps mono, 10 Mo en 48 kbps mono. Pour de la parole,
> 64 kbps mono suffit largement — aucune différence audible.

## Règle

- **Format : MP3, 64 kbps, mono.** 48 kbps accepté si le fichier reste clair.
- **Ne jamais téléverser de WAV** (environ 10 fois plus lourd qu'un MP3).
- Vérifier la taille avant / après : un sermon de 30 minutes doit faire
  environ 14 Mo, pas 30 Mo.

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
