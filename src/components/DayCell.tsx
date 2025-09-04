// src/components/DayCell.tsx
import { CONFIG } from "@/data/config";
import { isUnlockedDevAware, nowMadrid } from "@/lib/time";
import clsx from "clsx";
import { Link } from "react-router-dom";

type DayDataLocal = {
  title?: string;
  poster?: string;
  pistas?: string[];
  clues?: string[];
} | undefined;

export default function DayCell({
  day,
  data,
  spoilersHidden
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

  const box = (
    <div
      className={clsx(
        "relative rounded-2xl border overflow-hidden group touch-manipulation",
        "min-h-[72px] sm:min-h-[100px] md:min-h-[130px]",
        "border-white/10",
        isToday && "outline outline-2 outline-dashed outline-[rgba(255,107,0,.5)]",
        unlocked &&
          "md:transition-all md:duration-300 md:ease-out md:hover:border-green-400 md:hover:shadow-[0_0_15px_rgba(0,255,0,0.35)]"
      )}
    >
      {/* Imagen de fondo */}
      <img
        src={posterSrc}
        alt=""
        className={clsx(
          "absolute inset-0 w-full h-full object-contain select-none",
          unlocked
            ? "opacity-100 md:transition-transform md:duration-300 md:ease-out md:group-hover:scale-105"
            : "opacity-90 blur-[2px] brightness-75"
        )}
        draggable={false}
        loading="lazy"
      />

      {/* Oscurecido para contraste */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Candado centrado si está bloqueado */}
      {!unlocked && (
        <div
          className="absolute inset-0 grid place-items-center z-[1] cursor-pointer select-none"
          aria-hidden
        >
          <img
            src="/lock.png"
            alt="Bloqueado"
            className={clsx(
              "w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]",
              "motion-safe:md:group-hover:animate-lock-jiggle motion-safe:active:animate-lock-jiggle-active"
            )}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-1">
      {/* Franja superior: título */}
      <div className="h-5 sm:h-6 md:h-7 flex items-center justify-between gap-2">
        <div
          className="font-extrabold text-[10px] sm:text-[12px] md:text-[13px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
          title={title}
        >
          {title}
        </div>
      </div>

      {/* Toda la celda es clicable, tanto bloqueada como desbloqueada */}
      <Link
        to={`/day/${day}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded-2xl active:scale-[1.01] active:transition-transform active:duration-150"
        aria-label={`Ver pistas del día ${day}`}
      >
        {box}
      </Link>
    </div>
  );
}
