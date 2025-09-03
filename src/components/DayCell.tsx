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

  return (
    <div className="flex flex-col gap-2">
      {/* ====== FRANJA SUPERIOR: SOLO TÍTULO + CTA ====== */}
      <div className="h-7 flex items-center justify-between gap-2">
        <div
          className="font-extrabold text-[13px] md:text-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
          title={title}
        >
          {title}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {unlocked ? (
            <Link
              to={`/day/${day}`}
              className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border font-semibold
                         border-green-400 bg-green-500/20 text-green-300 hover:bg-green-500/30 hover:shadow-ring transition"
              title="Ver pistas en página dedicada"
            >
              ✅ Ver pistas
            </Link>
          ) : null}
        </div>
      </div>

      {/* ====== CELDA = SOLO IMAGEN; BLOQUEADO: CANDADO CENTRADO ====== */}
      <div
        className={clsx(
          "relative rounded-2xl border overflow-hidden",
          "min-h-[130px] md:min-h-[150px]",
          unlocked ? "border-green-500/30" : "border-white/10",
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

        {/* Tinte verde si desbloqueado */}
        {unlocked && <div className="absolute inset-0 bg-green-500/10 pointer-events-none" />}

        {/* 🔒 Candado CENTRADO cuando está bloqueado */}
        {!unlocked && (
          <div
            className="absolute inset-0 grid place-items-center z-[1] pointer-events-none"
            aria-hidden
          >
            <div className="text-4xl md:text-5xl drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]">🔒</div>
          </div>
        )}
      </div>
    </div>
  );
}
