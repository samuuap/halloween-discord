// src/components/DayCell.tsx
import { CONFIG } from "@/data/config";
import { isUnlockedDevAware, nowMadrid } from "@/lib/time";
import clsx from "clsx";
import { Link } from "react-router-dom";

/** Tipo local para describir los datos de un día (coincide con config.ts) */
type DayDataLocal = {
  title?: string;
  poster?: string;
  pistas?: string[]; // nombre que usas en config.ts
  clues?: string[];  // admitimos también 'clues' por compatibilidad
} | undefined;

export default function DayCell({
  day,
  data,
  spoilersHidden // no usado en portada, pero mantenemos la prop por compat
}: {
  day: number;
  data?: DayDataLocal;
  spoilersHidden: boolean;
}) {
  const unlocked = isUnlockedDevAware(day, CONFIG.year, CONFIG.month);

  const tm = nowMadrid();
  const isToday = tm.y === CONFIG.year && tm.m === CONFIG.month + 1 && tm.d === day;

  const title = data?.title ?? `Noche ${day}`;
  const posterSrc = data?.poster || "/haunted-house.png";

  // ====== Caja visual de la celda (imagen + overlay ícono centrado) ======
  const CellBox = (
    <div
      className={clsx(
        // group para permitir efectos hover desde hijos (lupa con borde)
        "relative rounded-2xl border overflow-hidden group",
        "min-h-[130px] md:min-h-[150px]",
        unlocked ? "border-white/10" : "border-white/10",
        isToday && "outline outline-2 outline-dashed outline-[rgba(255,107,0,.5)]"
      )}
    >
      {/* Imagen */}
      <img
        src={posterSrc}
        alt=""
        className={clsx(
          "absolute inset-0 w-full h-full object-contain select-none",
          unlocked ? "opacity-100" : "opacity-90 blur-[2px] brightness-75"
        )}
        draggable={false}
        loading="lazy"
      />

      {/* Oscurecido general */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Ícono centrado:
          - 🔎 cuando está desbloqueado (con borde que se pone verde al hover)
          - 🔒 cuando está bloqueado
      */}
      <div className="absolute inset-0 grid place-items-center z-[1]" aria-hidden>
        {unlocked ? (
          <div
            className={clsx(
              // círculo contenedor para borde de la lupa
              "rounded-full border-2 border-transparent p-2 transition-colors duration-150",
              // al pasar el ratón por la celda (group-hover), pone borde verde
              "group-hover:border-green-400"
            )}
          >
            <span className="text-4xl md:text-5xl drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]">
              🔎
            </span>
          </div>
        ) : (
          <div className="text-4xl md:text-5xl drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]">🔒</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {/* ====== FRANJA SUPERIOR: SOLO TÍTULO (sin CTA) ====== */}
      <div className="h-7 flex items-center justify-between gap-2">
        <div
          className="font-extrabold text-[13px] md:text-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
          title={title}
        >
          {title}
        </div>
        {/* Sin botón "Ver pistas": lo guiamos con la lupa */}
      </div>

      {/* ====== CELDA:
            - Si está desbloqueado: toda la caja es clicable a /day/:day
            - Si está bloqueado: solo se muestra como caja normal
      ====== */}
      {unlocked ? (
        <Link
          to={`/day/${day}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded-2xl"
          aria-label={`Ver pistas del día ${day}`}
          title="Ver pistas"
        >
          {CellBox}
        </Link>
      ) : (
        CellBox
      )}
    </div>
  );
}
