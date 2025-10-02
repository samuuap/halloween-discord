#!/usr/bin/env python3
# scripts/create_placeholders.py
# Uso:
#   python scripts/create_placeholders.py
#   python scripts/create_placeholders.py --only=frames
#   python scripts/create_placeholders.py --only=finals
#   python scripts/create_placeholders.py --only=posters
#   python scripts/create_placeholders.py --only=all
#   python scripts/create_placeholders.py --base-dir public --debug

import argparse
import os
import re
import sys
from pathlib import Path

CONFIG_FILE = "src/data/config.ts"

def parse_config(config_path: Path):
    """Lee config.ts y extrae posters, frames y finals."""
    text = config_path.read_text(encoding="utf-8")

    # Regex para capturar rutas
    poster_paths = re.findall(r'poster:\s*"([^"]+)"', text)
    frame_paths = re.findall(r'frame:\s*"([^"]+)"', text)
    final_paths = re.findall(r'finalImage:\s*"([^"]+)"', text)

    return poster_paths, frame_paths, final_paths


def ensure_empty_file(path: Path, debug: bool=False) -> str:
    """Crea un archivo vacío si no existe. No sobreescribe."""
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        if path.exists():
            return "exists"
        with open(path, "wb") as f:
            pass
        return "created"
    except Exception as e:
        if debug:
            print(f"!! Error creando {path}: {e}", flush=True)
        return "error"


def main():
    ap = argparse.ArgumentParser(description="Crea placeholders vacíos basados en config.ts (posters, frames, finals).")
    ap.add_argument("--only", choices=["frames", "finals", "posters", "all"], default="all",
                    help="Qué crear (por defecto: all).")
    ap.add_argument("--base-dir", default="public",
                    help="Directorio base donde viven /frames, /final, /posters (por defecto: public).")
    ap.add_argument("--debug", action="store_true",
                help="Imprime información detallada.")
    args = ap.parse_args()

    config_path = Path(CONFIG_FILE)
    if not config_path.exists():
        print(f"✖ No se encontró {CONFIG_FILE}. Ejecuta desde la raíz del proyecto.", flush=True)
        sys.exit(1)

    posters, frames, finals = parse_config(config_path)

    targets = []
    if args.only in ("posters", "all"):
        targets.extend(posters)
    if args.only in ("frames", "all"):
        targets.extend(frames)
    if args.only in ("finals", "all"):
        targets.extend(finals)

    base = Path(args.base_dir)

    if args.debug:
        print("=== DEBUG ===")
        print(f"Python: {sys.version}")
        print(f"CWD: {Path.cwd()}")
        print(f"Base dir: {base.resolve()}")
        print(f"Posters encontrados: {len(posters)}")
        print(f"Frames encontrados: {len(frames)}")
        print(f"Finals encontrados: {len(finals)}")
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
