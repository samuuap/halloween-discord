import { msUntilNextMadridMidnight, nowMadrid } from "@/lib/time";
import { useEffect, useState } from "react";

export default function Countdown({ year, monthIndex0 }: { year: number; monthIndex0: number }) {
  const [text, setText] = useState("—");

  useEffect(() => {
    const tick = () => {
      const now = nowMadrid();
      const inTargetMonth = now.y === year && now.m === monthIndex0 + 1;

      if (!inTargetMonth) {
        if (now.y < year || (now.y === year && now.m < monthIndex0 + 1)) {
          const eta = new Date(year, monthIndex0, 1).toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" });
          setText(`Empieza el ${eta}.`);
          return;
        } else {
          setText(`Octubre ${year} ha terminado. ¡Gracias por jugar!`);
          return;
        }
      }

      const ms = msUntilNextMadridMidnight();
      const totalSec = Math.max(0, Math.floor(ms / 1000));
      const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
      const s = String(totalSec % 60).padStart(2, "0");
      const nextDay = Math.min(31, now.d + 1);
      setText(`Siguiente desbloqueo (día ${nextDay}) en ${h}:${m}:${s}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [year, monthIndex0]);

  return (
    <div className="font-bold tabular-nums bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
      {text}
    </div>
  );
}
