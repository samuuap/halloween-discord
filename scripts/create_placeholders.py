#!/usr/bin/env python3
# scripts/create_placeholders.py
# Uso:
#   python scripts/create_placeholders.py
#   python scripts/create_placeholders.py --only=frames
#   python scripts/create_placeholders.py --only=finals
#   python scripts/create_placeholders.py --base-dir public --debug

import argparse
import os
import sys
from pathlib import Path

FRAMES = [
    "/frames/coraline-door.jpg",
    "/frames/getout-teacup.jpg",
    "/frames/terrifier3-art.jpg",
    "/frames/elmstreet-claws.jpg",
    "/frames/wwz-wall.jpg",
    "/frames/conjuring-basement.jpg",
    "/frames/sawx-trap.jpg",
    "/frames/sixth-red-door.jpg",
    "/frames/busan-door.jpg",
    "/frames/heretic-hallway.jpg",
    "/frames/fnaf-animatronic.jpg",
    "/frames/texas-leatherface.jpg",
    "/frames/wellness-tank.jpg",
    "/frames/hanselgretel-crossbow.jpg",
    "/frames/zombieland-clown.jpg",
    "/frames/evildead-rise-elevator.jpg",
    "/frames/chucky-reboot.jpg",
    "/frames/28days-empty-london.jpg",
    "/frames/insidious-red-faced.jpg",
    "/frames/screamvi-subway.jpg",
    "/frames/blair-sticks.jpg",
    "/frames/vanhelsing-castle.jpg",
    "/frames/exorcist-priest.jpg",
    "/frames/it-sewer.jpg",
    "/frames/shining-doors.jpg",
    "/frames/silence-mask.jpg",
    "/frames/friday-machete.jpg",
    "/frames/speakevil-dinner.jpg",
    "/frames/others-candle.jpg",
    "/frames/dayone-nyc.jpg",
    "/frames/nbc-jack-sally.jpg",
]

FINALS = [
    "/final/coraline.jpg",
    "/final/getout.jpg",
    "/final/terrifier3.jpg",
    "/final/elmstreet.jpg",
    "/final/wwz.jpg",
    "/final/conjuring.jpg",
    "/final/sawx.jpg",
    "/final/sixth-sense.jpg",
    "/final/busan.jpg",
    "/final/heretic.jpg",
    "/final/fnaf.jpg",
    "/final/texas-1974.jpg",
    "/final/wellness.jpg",
    "/final/hanselgretel.jpg",
    "/final/zombieland.jpg",
    "/final/evildead-rise.jpg",
    "/final/childsplay-2019.jpg",
    "/final/28days.jpg",
    "/final/insidious.jpg",
    "/final/screamvi.jpg",
    "/final/blair-1999.jpg",
    "/final/vanhelsing.jpg",
    "/final/exorcist.jpg",
    "/final/it-2017.jpg",
    "/final/shining-1980.jpg",
    "/final/silence.jpg",
    "/final/friday2009.jpg",
    "/final/speakevil.jpg",
    "/final/the-others.jpg",
    "/final/dayone.jpg",
    "/final/nbc.jpg",
]

def ensure_empty_file(path: Path, debug: bool=False) -> str:
    """Crea un archivo vacío si no existe. No sobreescribe."""
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        if path.exists():
            return "exists"
        # Crear 0 bytes
        with open(path, "wb") as f:
            pass
        return "created"
    except Exception as e:
        if debug:
            print(f"!! Error creando {path}: {e}", flush=True)
        return "error"

def main():
    ap = argparse.ArgumentParser(description="Crea placeholders vacíos para frames y finales.")
    ap.add_argument("--only", choices=["frames", "finals", "both"], default="both",
                    help="Qué crear (por defecto: both).")
    ap.add_argument("--base-dir", default="public",
                    help="Directorio base donde viven /frames y /final (por defecto: public).")
    ap.add_argument("--debug", action="store_true",
                help="Imprime información detallada.")
    args = ap.parse_args()

    base = Path(args.base_dir)
    targets = []
    if args.only in ("frames", "both"):
        targets.extend(FRAMES)
    if args.only in ("finals", "both"):
        targets.extend(FINALS)

    if args.debug:
        print("=== DEBUG ===")
        print(f"Python: {sys.version}")
        print(f"CWD: {Path.cwd()}")
        print(f"Base dir: {base.resolve()}")
        print(f"Cantidad de archivos a crear: {len(targets)}")
        print("=============\n", flush=True)

    created = 0
    existed = 0
    errored = 0

    for rel in targets:
        rel_clean = rel[1:] if rel.startswith("/") else rel
        out_path = base / rel_clean
        if args.debug:
            print(f"-> {out_path}", flush=True)
        res = ensure_empty_file(out_path, debug=args.debug)
        if res == "created":
            created += 1
            print(f"✔ creado: {out_path}", flush=True)
        elif res == "exists":
            existed += 1
            print(f"• ya existe: {out_path}", flush=True)
        else:
            errored += 1
            print(f"✖ error:   {out_path}", flush=True)

    print(f"\nListo. Creados: {created} | Ya existían: {existed} | Errores: {errored}", flush=True)

if __name__ == "__main__":
    main()
