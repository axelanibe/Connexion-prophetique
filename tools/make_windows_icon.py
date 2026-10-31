#!/usr/bin/env python3
"""Icone Windows depuis le monogramme CP, 30 oct. 2026.

Genere windows/runner/resources/app_icon.ico en embarquant le PNG
256x256 de assets/cp_monogram.png, sans changer la reference dans
Runner.rc. Evite de pousser un binaire : l'etape Windows du flux
lance ce script avant la construction, donc l'exe porte le
monogramme meme si le fichier ico du depot reste celui par defaut
de Flutter. Python pur, aucune dependance.
Usage, depuis la racine du depot : python tools/make_windows_icon.py
"""
import os
import struct
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main() -> None:
    src = os.path.join(ROOT, "assets", "cp_monogram.png")
    dst = os.path.join(ROOT, "windows", "runner", "resources", "app_icon.ico")
    with open(src, "rb") as f:
        png = f.read()
    if not png.startswith(b"\x89PNG"):
        sys.exit("cp_monogram.png n'est pas un PNG")
    header = struct.pack("<HHH", 0, 1, 1)
    entry = struct.pack("<BBBBHHII", 0, 0, 0, 0, 1, 32, len(png), 6 + 16)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "wb") as f:
        f.write(header + entry + png)
    print(f"app_icon.ico ecrit ({len(png)} octets PNG) -> {dst}")


if __name__ == "__main__":
    main()
