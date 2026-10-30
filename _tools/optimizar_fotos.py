"""Convierte fotos (JPG/PNG/HEIC no) a WebP liviano para la sección 2026.

Uso (desde la carpeta del repo):
    pip install pillow
    python3 _tools/optimizar_fotos.py ~/Desktop/fotos-dia-13          # fotos del festival
    python3 _tools/optimizar_fotos.py ~/Desktop/fotos-coros coros     # fotos de los coros

Genera los .webp (ancho máximo 1600 px, calidad 80) en assets/img/2026/
(o en assets/img/2026/coros/ si agregás la palabra "coros").
Después sólo hay que anotar cada foto en _data/edicion2026.yml.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

MAX_WIDTH = 1600
QUALITY = 80
BASE = Path(__file__).resolve().parent.parent / "assets" / "img" / "2026"

def main():
    if len(sys.argv) not in (2, 3) or (len(sys.argv) == 3 and sys.argv[2] != "coros"):
        sys.exit("Uso: python3 _tools/optimizar_fotos.py CARPETA_CON_FOTOS [coros]")
    DESTINO = BASE / "coros" if len(sys.argv) == 3 else BASE
    origen = Path(sys.argv[1]).expanduser()
    if not origen.is_dir():
        sys.exit(f"No existe la carpeta: {origen}")
    DESTINO.mkdir(parents=True, exist_ok=True)

    fotos = sorted(p for p in origen.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"})
    if not fotos:
        sys.exit("No encontré fotos .jpg o .png en esa carpeta.")

    for foto in fotos:
        with Image.open(foto) as im:
            im = ImageOps.exif_transpose(im)  # respeta la rotación del celular
            if im.width > MAX_WIDTH:
                alto = round(im.height * MAX_WIDTH / im.width)
                im = im.resize((MAX_WIDTH, alto), Image.LANCZOS)
            salida = DESTINO / (foto.stem.lower().replace(" ", "-") + ".webp")
            im.convert("RGB").save(salida, "WEBP", quality=QUALITY)
            print(f"{foto.name} -> {salida.name} ({salida.stat().st_size // 1024} KB)")

if __name__ == "__main__":
    main()
