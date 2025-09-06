// src/components/Countdown.tsx
import { getNextUnlockInfo } from "@/lib/time";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Singleton visual:
 * - Solo el PRIMERO que aparece en el DOM se muestra.
 * - El resto de instancias devuelven null.
 * - useLayoutEffect garantiza que decidimos la visibilidad antes del pintado final (evita parpadeo).
 */
export default function Countdown({ year, monthIndex0 }: { year: number; monthIndex0: number }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("—");

  // Decidir si esta instancia es la "primera" del DOM
  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    const el = rootRef.current;
    if (!el) return;

    // Nota: en el primer render ya existen todos los nodos en el DOM (layout effect).
    const nodes = Array.from(
      document.querySelectorAll<HTMLDivElement>('[data-oct-counter="global"]')
    );

    // Si este es el primero por orden de documento => visible
    if (nodes.length > 0 && nodes[0] === el) {
      setVisible(true);
    } else {
      setVisible(false);
    }
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

  if (!visible) {
    // Importante: el nodo debe existir para poder formar parte del "orden del documento".
    // Devolvemos un div vacío con display:none para participar en el layoutEffect anterior.
    return <div ref={rootRef} data-oct-counter="global" style={{ display: "none" }} />;
  }

  return (
    <div
      ref={rootRef}
      data-oct-counter="global"
      className="font-bold tabular-nums bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-base sm:text-lg"
      aria-live="polite"
      title="Cuenta atrás hasta el próximo día que se abre"
    >
      {text}
    </div>
  );
}
