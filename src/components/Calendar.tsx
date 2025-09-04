// src/components/Calendar.tsx
import { CONFIG } from "@/data/config";
import { daysInMonth, firstDowOffsetMondayFirst, setRemoteOverrides } from "@/lib/time";
import DayCell from "./DayCell";
import { useState, useEffect } from "react";
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
  const dows = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  return (
    <div className="max-w-grid mx-auto px-3 sm:px-4 pb-10" key={version}>
      {/* Header responsivo */}
      <header className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_auto] sm:items-center my-4 sm:my-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl grid place-items-center bg-[conic-gradient(from_210deg,rgba(255,107,0,.25),rgba(124,58,237,.25))] shadow-ring">
            <span className="font-display text-2xl">🎃</span>
          </div>
          <div>
            <h1 className="m-0 font-extrabold tracking-tight text-[clamp(18px,5vw,28px)]">
              Maratón de Octubre
            </h1>
            <div className="text-muted text-xs sm:text-sm">
              Desbloqueo diario con pistas para adivinar la peli en Discord
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-start sm:justify-end">
          {/* 🔥 ÚNICO contador global */}
          <Countdown year={CONFIG.year} monthIndex0={CONFIG.month} />
          {CONFIG.discordUrl && (
            <a
              href={CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl border border-accent/40 bg-[rgba(255,107,0,.12)] hover:shadow-ring transition font-semibold inline-flex items-center gap-2 text-sm"
            >
              🕸️ Abrir Discord
            </a>
          )}
        </div>
      </header>

      {/* Cabecera de días de la semana (oculta en móvil) */}
      <div className="hidden sm:grid grid-cols-7 gap-3 mb-1">
        {dows.map((d) => (
          <div key={d} className="text-center font-bold text-muted uppercase tracking-wide text-xs py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Grid responsivo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
        {/* Offset solo desde sm para no romper móvil */}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} className="hidden sm:block rounded-2xl min-h-[110px]" />
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
