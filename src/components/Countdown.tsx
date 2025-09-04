// src/components/Countdown.tsx
import { getNextUnlockInfo } from "@/lib/time";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Countdown({ year, monthIndex0 }: { year: number; monthIndex0: number }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [text, setText] = useState("—");

  // --- Singleton por DOM: solo el PRIMERO permanece visible ---
  useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    // Marcamos este nodo y vemos si hay más contadores
    const el = rootRef.current;
    if (!el) return;

    // Buscamos todos los contadores globales
    const nodes = Array.from(document.querySelectorAll('[data-oct-counter="global"]')) as HTMLDivElement[];

    // Si ya hay uno antes en el DOM, ocultamos este
    if (nodes.length > 0) {
      const first = nodes[0];
      // Si nosotros no somos el primero, nos ocultamos
      if (first !== el) setVisible(false);
    }

    // Si no existía ninguno aún, este será el primero y queda visible
  }, []);

  useEffect(() => {
    if (!visible) return;

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
  }, [visible, year, monthIndex0]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      data-oct-counter="global"
      className="font-bold tabular-nums bg-white/5 border border-white/10 px-3 py-2 rounded-lg"
      aria-live="polite"
      title="Cuenta atrás hasta el próximo día que se abre"
    >
      {text}
    </div>
  );
}
