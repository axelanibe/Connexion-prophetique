#!/usr/bin/env python3
# Sons d'appel, etape 2, 20 nov. 2026 : sonnerie (appele) et tonalite
# d'attente (appelant), generes localement, sans enregistrement
# externe. Deterministe : memes octets a chaque execution.
# Sonnerie : cycle de 4 s, deux bips 880 Hz, comme une sonnerie de
# telephone. Tonalite, 21 nov. 2026, decision d'Axel : 440 Hz doux
# et continu, volume modere, en boucle, comme un appel normal, en
# remplacement des salves intermittentes (deux salves de 1 s dans
# un cycle de 4 s), inaudibles sur l'APK 47. PCM 16 bits, mono,
# 22050 Hz.
# Attention, 21 nov. 2026 : assets/audio/sonnerie-appel.wav est
# finalise avec le trille classique choisi par Axel, ce script
# regenere l'ancienne sonnerie a deux bips. Ne pas l'executer
# pour la sonnerie : apres un lancement, recopier le trille
# classique sur sonnerie-appel.wav, avec verification sha256.
import math
import struct
import sys
from pathlib import Path

FREQUENCE = 22050


def _echantillons(duree_s, segments, amplitude=0.6):
    """segments : liste de (debut_s, fin_s, frequence_hz)."""
    total = int(duree_s * FREQUENCE)
    out = []
    for i in range(total):
        t = i / FREQUENCE
        valeur = 0.0
        for debut, fin, freq in segments:
            if debut <= t < fin:
                # Enveloppe de 20 ms contre les clics.
                montee = min(1.0, (t - debut) / 0.02)
                descente = min(1.0, (fin - t) / 0.02)
                valeur += math.sin(2 * math.pi * freq * t) * montee * descente
        # Deux frequences au plus : on divise pour rester sous 1.
        out.append(max(-1.0, min(1.0, valeur * amplitude)))
    return out


def _ecrire_wav(chemin, echantillons):
    donnees = b"".join(
        struct.pack("<h", int(v * 32767)) for v in echantillons
    )
    with open(chemin, "wb") as f:
        f.write(b"RIFF")
        f.write(struct.pack("<I", 36 + len(donnees)))
        f.write(b"WAVEfmt ")
        f.write(struct.pack("<IHHIIHH", 16, 1, 1, FREQUENCE, FREQUENCE * 2, 2, 16))
        f.write(b"data")
        f.write(struct.pack("<I", len(donnees)))
        f.write(donnees)


def main():
    racine = Path(__file__).resolve().parent.parent
    audio = racine / "assets" / "audio"
    audio.mkdir(parents=True, exist_ok=True)
    sonnerie = _echantillons(
        4.0,
        [(0.0, 0.8, 880.0), (1.2, 2.0, 880.0)],
    )
    # Tonalite d'attente, 21 nov. 2026 : 440 Hz doux et continu
    # sur tout le cycle de 4 s, volume modere (amplitude 0,35),
    # jouee en boucle par just_audio comme un appel normal.
    tonalite = _echantillons(4.0, [(0.0, 4.0, 440.0)], amplitude=0.35)
    _ecrire_wav(audio / "sonnerie-appel.wav", sonnerie)
    _ecrire_wav(audio / "tonalite-appel.wav", tonalite)
    for nom in ("sonnerie-appel.wav", "tonalite-appel.wav"):
        p = audio / nom
        print(nom, p.stat().st_size, "octets")


if __name__ == "__main__":
    sys.exit(main())
