import { getNextUnlockInfo, nowMadrid } from "@/lib/time";
import { useEffect, useState } from "react";

export default function Countdown({ year, monthIndex0 }: { year: number; monthIndex0: number }) {
  const [text, setText] = useState("—");

  useEffect(() => {
    const tick = () => {
      const next = getNextUnlockInfo(year, monthIndex0, 31);

      if (!next) {
        setText("No quedan desbloqueos pendientes.");
        return;
      }

      const ms = Math.max(0, next.msRemaining);
      const totalSec = Math.floor(ms / 1000);
      const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
      const s = String(totalSec % 60).padStart(2, "0");

      setText(`Siguiente desbloqueo (día ${next.day}) en ${h}:${m}:${s}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [year, monthIndex0]);

  return (
    <div
      className="font-bold tabular-nums bg-white/5 border border-white/10 px-3 py-2 rounded-lg"
      aria-live="polite"
      title="Cuenta atrás hasta el próximo día que se abre"
    >
      {text}
    </div>
  );
}
