import { CONFIG } from "@/data/config";
import { daysInMonth, firstDowOffsetMondayFirst, setRemoteOverrides } from "@/lib/time";
import DayCell from "./DayCell";
import { useMemo, useState, useEffect } from "react";
import { fetchOverrides } from "@/lib/remote";
import Countdown from "./Countdown";

export default function Calendar() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    // Únicamente descargar y aplicar estado global (sin admin ni overrides por URL)
    fetchOverrides().then((map) => {
      setRemoteOverrides(map);
      setVersion((v) => v + 1);
    });
  }, []);

  const monthName = useMemo(
    () =>
      [
        "enero","febrero","marzo","abril","mayo","junio",
        "julio","agosto","septiembre","octubre","noviembre","diciembre"
      ][CONFIG.month],
    []
  );

  const totalDays = daysInMonth(CONFIG.year, CONFIG.month);
  const offset = firstDowOffsetMondayFirst(CONFIG.year, CONFIG.month);
  const dows = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  return (
    <div className="max-w-grid mx-auto px-4 pb-10" key={version}>
      <header className="grid grid-cols-[1fr_auto] gap-4 items-center my-6">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-xl grid place-items-center bg-[conic-gradient(from_210deg,rgba(255,107,0,.25),rgba(124,58,237,.25))] shadow-ring">
            <span className="font-display text-2xl">🎃</span>
          </div>
          <div>
            <h1 className="m-0 font-extrabold tracking-tight text-[clamp(20px,2.4vw,28px)]">Maratón de Octubre</h1>
            <div className="text-muted text-sm">Desbloqueo diario con pistas para adivinar la peli en Discord</div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-end">
          <Countdown year={CONFIG.year} monthIndex0={CONFIG.month} />
          {CONFIG.discordUrl && (
            <a
              href={CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl border border-accent/40 bg-[rgba(255,107,0,.12)] hover:shadow-ring transition font-semibold inline-flex items-center gap-2"
            >
              🕸️ Abrir Discord
            </a>
          )}
        </div>
      </header>

      <div className="grid grid-cols-7 gap-3 mb-1">
        {dows.map((d) => (
          <div key={d} className="text-center font-bold text-muted uppercase tracking-wide text-xs py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} className="rounded-2xl min-h-[110px]" />
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

      <footer className="flex justify-between items-center text-muted text-sm mt-7 flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="w-2.5 h-2.5 rounded-full bg-good inline-block" /> Desbloqueado
          <span className="w-2.5 h-2.5 rounded-full bg-bad inline-block" /> Bloqueado
        </div>
        <div>Hecho con 💀 para noches de cine.</div>
      </footer>
    </div>
  );
}
