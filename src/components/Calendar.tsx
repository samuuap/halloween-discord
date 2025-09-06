// src/components/Calendar.tsx
import { CONFIG } from "@/data/config";
import { daysInMonth, firstDowOffsetMondayFirst, setRemoteOverrides } from "@/lib/time";
import DayCell from "./DayCell";
import { useState, useEffect, useMemo } from "react";
import { fetchOverrides } from "@/lib/remote";
import Countdown from "./Countdown";

export default function Calendar() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    fetchOverrides().then((map) => {
      setRemoteOverrides(map);
      setVersion((v) => v + 1);
    });
  }, []);

  const totalDays = daysInMonth(CONFIG.year, CONFIG.month);
  const offset = firstDowOffsetMondayFirst(CONFIG.year, CONFIG.month);
  const dows = useMemo(() => ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], []);

  return (
    <div className="max-w-grid mx-auto px-2 sm:px-3 md:px-4 pb-8" key={version}>
      {/* Header */}
      <header className="grid grid-cols-[1fr_auto] gap-3 items-start sm:items-center my-4 sm:my-6">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl grid place-items-center bg-[conic-gradient(from_210deg,rgba(255,107,0,.25),rgba(124,58,237,.25))] shadow-ring">
              <span className="font-display text-2xl sm:text-4xl">🎃</span>
            </div>
            <div>
              <h1 className="m-0 font-extrabold tracking-tight text-[clamp(22px,6vw,42px)]">
                Maratón de Octubre
              </h1>
              <div className="text-muted text-sm sm:text-base">
                Desbloqueo diario de películas de Halloween
              </div>
            </div>
          </div>

        <div className="flex items-center gap-2 sm:gap-3 justify-end flex-wrap">
          {/* ÚNICO contador global */}
          <Countdown year={CONFIG.year} monthIndex0={CONFIG.month} />
          {CONFIG.discordUrl && (
            <a
              href={CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 sm:px-3 py-2 rounded-xl border border-accent/40 bg-[rgba(255,107,0,.12)] hover:shadow-ring transition font-semibold inline-flex items-center gap-2 text-sm sm:text-base"
            >
              🕸️ Abrir Discord
            </a>
          )}
        </div>
      </header>

      {/* Cabecera de días de la semana: 7 columnas SIEMPRE */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4 mb-1">
        {dows.map((d) => (
          <div
            key={d}
            className="text-center font-bold text-muted uppercase tracking-wide text-[10px] sm:text-[11px] md:text-xs py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid SIEMPRE de 7 columnas */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4">
        {/* Huecos de offset para alinear el día 1 con su DOW */}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} className="rounded-2xl min-h-[72px] sm:min-h-[100px] md:min-h-[130px]" />
        ))}

        {Array.from({ length: totalDays }).map((_, idx) => {
          const day = idx + 1;
          const data = (CONFIG.days as any)[day];
          return (
            <DayCell
              key={day}
              day={day}
              data={data}
              spoilersHidden={false}
            />
          );
        })}
      </div>
    </div>
  );
}
