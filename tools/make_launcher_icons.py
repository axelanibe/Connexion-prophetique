#!/usr/bin/env python3
"""Fabrique les icônes de lancement Android depuis assets/logo.png.

Bibliothèque standard uniquement : décode le PNG du logo, le réduit
par plus proche voisin, le pose centré sur un fond bleu nuit, et écrit
les icônes mipmap. Appelé par le flux GitHub Actions, après la
restauration de assets/logo.png. Si le logo manque, ne fait rien :
le flux génère alors son espace réservé comme avant.
"""
import os
import struct
import sys
import zlib

NAVY = (11, 31, 58, 255)


def chunk(kind, data):
    c = struct.pack(">I", len(data)) + kind + data
    return c + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)


def read_png(path):
    data = open(path, "rb").read()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", "pas un PNG"
    pos, w, h, bitdepth, colortype = 8, 0, 0, 0, 0
    idat = b""
    plte = None
    trns = None
    while pos < len(data):
        ln = struct.unpack(">I", data[pos:pos + 4])[0]
        kind = data[pos + 4:pos + 8]
        body = data[pos + 8:pos + 8 + ln]
        if kind == b"IHDR":
            w, h, bitdepth, colortype = struct.unpack(">IIBB", body[:10])
        elif kind == b"PLTE":
            plte = body
        elif kind == b"tRNS":
            trns = body
        elif kind == b"IDAT":
            idat += body
        pos += 12 + ln
    assert bitdepth == 8, "profondeur non supportée"
    raw = zlib.decompress(idat)
    # Nombre de canaux et octets par pixel.
    channels = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[colortype]
    stride = w * channels
    pixels = []
    prev = bytearray(stride)
    p = 0
    for y in range(h):
        f = raw[p]
        p += 1
        line = bytearray(raw[p:p + stride])
        p += stride
        if f == 1:
            for i in range(channels, stride):
                line[i] = (line[i] + line[i - channels]) & 0xFF
        elif f == 2:
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 0xFF
        elif f == 3:
            for i in range(stride):
                a = line[i - channels] if i >= channels else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 0xFF
        elif f == 4:
            for i in range(stride):
                a = line[i - channels] if i >= channels else 0
                b = prev[i]
                c = prev[i - channels] if i >= channels else 0
                pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 0xFF
        prev = line
        row = []
        for x in range(w):
            v = line[x * channels:(x + 1) * channels]
            if colortype == 6:
                row.append(tuple(v))
            elif colortype == 2:
                row.append((v[0], v[1], v[2], 255))
            elif colortype == 4:
                row.append((v[0], v[0], v[0], v[1]))
            elif colortype == 0:
                row.append((v[0], v[0], v[0], 255))
            elif colortype == 3:
                r, g, b = plte[v[0] * 3:v[0] * 3 + 3]
                a = trns[v[0]] if trns and v[0] < len(trns) else 255
                row.append((r, g, b, a))
        pixels.append(row)
    return w, h, pixels


def write_png(path, size, pixels):
    raw = b"".join(b"\x00" + b"".join(bytes(px) for px in row) for row in pixels)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    data = b"\x89PNG\r\n\x1a\n"
    data += chunk(b"IHDR", ihdr)
    data += chunk(b"IDAT", zlib.compress(raw))
    data += chunk(b"IEND", b"")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "wb").write(data)


def main():
    logo_path = "assets/logo.png"
    if not os.path.exists(logo_path) or os.path.getsize(logo_path) < 1000:
        print("logo manquant, icônes non générées")
        return 0
    w, h, pixels = read_png(logo_path)
    # Recadre les bords transparents.
    minx, miny, maxx, maxy = w, h, -1, -1
    for y in range(h):
        for x in range(w):
            if pixels[y][x][3] > 10:
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)
    if maxx < 0:
        print("logo entièrement transparent")
        return 0
    cw, ch = maxx - minx + 1, maxy - miny + 1
    for size, dpi in [(48, "mdpi"), (72, "hdpi"), (96, "xhdpi"), (144, "xxhdpi"), (192, "xxxhdpi")]:
        # Logo à 86 % de la largeur, hauteur limitée à 50 % du carré.
        lw = int(size * 0.86)
        lh = int(ch * lw / cw)
        if lh > size // 2:
            lh = size // 2
            lw = int(cw * lh / ch)
        ox, oy = (size - lw) // 2, (size - lh) // 2
        out = [[NAVY for _ in range(size)] for _ in range(size)]
        for y in range(lh):
            sy = miny + int(y * ch / lh)
            for x in range(lw):
                sx = minx + int(x * cw / lw)
                r, g, b, a = pixels[sy][sx]
                if a == 0:
                    continue
                br, bg, bb, _ = out[oy + y][ox + x]
                if a == 255:
                    out[oy + y][ox + x] = (r, g, b, 255)
                else:
                    out[oy + y][ox + x] = (
                        (r * a + br * (255 - a)) // 255,
                        (g * a + bg * (255 - a)) // 255,
                        (b * a + bb * (255 - a)) // 255,
                        255,
                    )
        write_png(f"android/app/src/main/res/mipmap-{dpi}/ic_launcher.png", size, out)
        print(f"icône {dpi} {size}x{size} écrite")
    return 0


if __name__ == "__main__":
    sys.exit(main())
