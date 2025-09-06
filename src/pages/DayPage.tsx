// src/components/DayPage.tsx
import { Link, useParams } from "react-router-dom";
import { CONFIG } from "@/data/config";
import { isUnlockedDevAware, nowMadrid } from "@/lib/time";
import { useMemo, useState } from "react";
import clsx from "clsx";

type DayConfig = {
  title?: string;
  emojis?: string;     // pista 1
  actors?: string[];   // pista 2
  poster?: string;     // pista 3 (blur fuerte)
  frame?: string;      // pista 4 (frame clave)
  finalTitle?: string; // solución
  finalImage?: string; // imagen solución
  synopsis?: string;   // overlay “Rendirse”
  animated?: boolean;  // si true, añade “(doblaje)” a actores
};

const TOTAL_STEPS = 4;

export default function DayPage() {
  const params = useParams();
  const day = Number(params.day);
  const cfg: DayConfig | undefined = (CONFIG.days as any)[day];

  const unlocked = useMemo(
    () => isUnlockedDevAware(day, CONFIG.year, CONFIG.month),
    [day]
  );

  // Progreso SIEMPRE reseteado al entrar
  const [step, setStep] = useState<number>(1);
  const [giveUpOpen, setGiveUpOpen] = useState<boolean>(false);

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return (
      <div className="max-w-grid mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold">Día no válido</h1>
        <p className="text-muted">La ruta no corresponde a un día de octubre.</p>
        <Link className="inline-block mt-4 px-3 py-2 rounded-xl border border-white/15 hover:shadow-ring" to="/">
          ← Volver al calendario
        </Link>
      </div>
    );
  }

  const monthName = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre"
  ][CONFIG.month];
  const Title = cfg?.title ?? `Noche ${day}`;

  const today = nowMadrid();
  const isToday =
    today.y === CONFIG.year && today.m === CONFIG.month + 1 && today.d === day;

  const onNext = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const onGiveUp = () => setGiveUpOpen(true);
  const onCloseGiveUp = () => setGiveUpOpen(false);

  // Tarjeta con animación y estilos; importante: display:block para columnas
  const Card: React.FC<{
    visible: boolean;
    delayMs: number;
    children: React.ReactNode;
    className?: string;
  }> = ({ visible, delayMs, children, className }) => (
    <section
      className={clsx(
        "block break-inside-avoid rounded-2xl border bg-white/[.04] border-white/10 overflow-hidden",
        "transition-all duration-500",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-3 scale-[.98]",
        className
      )}
      style={
        visible
          ? { animation: "cardIn .45s ease-out both", animationDelay: `${delayMs}ms` }
          : undefined
      }
    >
      <div className="p-3">{children}</div>
    </section>
  );

  return (
    <div className="max-w-grid mx-auto px-4 py-8">
      <header className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-xl grid place-items-center bg-[conic-gradient(from_210deg,rgba(255,107,0,.25),rgba(124,58,237,.25))] shadow-ring">
            <span className="font-display text-2xl">🎃</span>
          </div>
          <div>
            <h1 className="m-0 font-extrabold tracking-tight text-[clamp(20px,2.4vw,28px)]">
              Pistas — {day} de {monthName} {CONFIG.year}
            </h1>
            <div className="text-muted text-sm">
              {unlocked
                ? (isToday ? "¡Hoy es el día, suerte adivinando!" : "Día ya desbloqueado.")
                : "Este día aún está bloqueado. Vuelve cuando se desbloquee."}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Link
            to="/"
            className="px-3 py-2 rounded-xl border border-white/20 hover:shadow-ring transition font-semibold"
          >
            ← Volver
          </Link>
        </div>
      </header>

      {/* BLOQUEADO: sin pistas ni rendirse */}
      {!unlocked && (
        <div className="p-4 rounded-2xl border bg-white/[.04] border-white/10 mb-2">
          <div className="flex items-center gap-2 text-sm font-semibold mb-1">
            <span className="text-ink/90">🔒 Bloqueado</span>
          </div>
          <p className="text-sm text-muted m-0">
            Las pistas de este día estarán disponibles automáticamente a la hora programada.
          </p>
        </div>
      )}

      {/* DESBLOQUEADO */}
      {unlocked && (
        <>
          {/* Barra de acciones y progreso ARRIBA */}
          <div className={clsx("mb-3 flex items-center justify-between gap-3", giveUpOpen && "blur-[2px]")}>
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                const active = i < step;
                return (
                  <div
                    key={i}
                    className={clsx(
                      "h-2 rounded-full transition-all",
                      active ? "bg-good w-10" : "bg-white/10 w-6"
                    )}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {step < TOTAL_STEPS ? (
                <button
                  onClick={onNext}
                  className="px-3 py-2 rounded-xl border border-accent/40 bg-[rgba(255,107,0,.12)] hover:shadow-ring transition font-semibold"
                >
                  Siguiente pista →
                </button>
              ) : (
                <button
                  onClick={onGiveUp}
                  className="px-3 py-2 rounded-xl border border-white/20 bg-white/[.05] hover:shadow-ring transition font-semibold"
                >
                  Rendirse 😵
                </button>
              )}
            </div>
          </div>

          {/* Masonry con CSS columns:
              - cada tarjeta es "break-inside-avoid" para no cortarse
              - columnas se adaptan a ancho; alturas independientes por item
          */}
          <div
            className={clsx(
              giveUpOpen && "blur-[4px]",
              "columns-1 sm:columns-2 lg:columns-3 gap-4"
            )}
          >
            {/* 1 · Emojis */}
            <Card visible={step >= 1} delayMs={0}>
              <h3 className="m-0 text-xs font-bold text-muted mb-2">1ª pista · Emojis</h3>
              <div className="text-3xl md:text-4xl leading-none">{cfg?.emojis ?? "❓"}</div>
            </Card>

            {/* 2 · Actores */}
            <Card visible={step >= 2} delayMs={80}>
              <h3 className="m-0 text-xs font-bold text-muted mb-2">2ª pista · Actores</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(cfg?.actors) && cfg!.actors.length > 0 ? (
                  cfg!.actors.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-lg border border-white/15 bg-white/5 text-sm"
                    >
                      {cfg?.animated ? `${a} (doblaje)` : a}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted">(Añade actores en config.ts)</span>
                )}
              </div>
            </Card>

            {/* 3 · Póster (blur fuerte + tope de altura para que no desborde) */}
            <Card visible={step >= 3} delayMs={120}>
              <h3 className="m-0 text-xs font-bold text-muted mb-2">3ª pista · Póster</h3>
              {cfg?.poster ? (
                <img
                  src={cfg.poster}
                  alt="Póster"
                  className={clsx(
                    "rounded-xl border border-white/10 w-full h-auto",
                    "blur-[14px] brightness-75 select-none pointer-events-none",
                    "max-h-[420px] object-contain"
                  )}
                  loading="lazy"
                />
              ) : (
                <div className="rounded-xl border border-dashed border-white/15 w-full min-h-[160px] grid place-items-center text-muted">
                  Sube la URL del póster en config.ts
                </div>
              )}
            </Card>

            {/* 4 · Frame (independiente con su propio tope de altura) */}
            <Card visible={step >= 4} delayMs={160}>
              <h3 className="m-0 text-xs font-bold text-muted mb-2">4ª pista · Frame clave</h3>
              {cfg?.frame ? (
                <img
                  src={cfg.frame}
                  alt="Frame clave"
                  className="rounded-xl border border-white/10 w-full h-auto max-h-[420px] object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="rounded-xl border border-dashed border-white/15 w-full min-h-[160px] grid place-items-center text-muted">
                  Sube la URL del frame en config.ts
                </div>
              )}
            </Card>
          </div>

          {/* Overlay “Rendirse” (solución) */}
          {giveUpOpen && (
            <div className="fixed inset-0 z-50 grid place-items-center" aria-modal="true" role="dialog">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
                onClick={onCloseGiveUp}
                aria-hidden
              />
              <div className="relative z-10 w-[min(92vw,720px)] rounded-2xl border border-white/15 bg-panel/95 shadow-ring p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="m-0 text-xl font-extrabold">Solución</h2>
                  <button
                    onClick={onCloseGiveUp}
                    className="px-2 py-1 rounded-lg border border-white/15 hover:shadow-ring text-sm"
                    aria-label="Cerrar"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="text-lg font-bold mb-2">
                      {cfg?.finalTitle ?? Title}
                    </div>
                    <p className="text-sm leading-relaxed text-ink/90">
                      {cfg?.synopsis?.trim()
                        ? cfg.synopsis
                        : "Sinopsis no disponible. Añádela en config.ts"}
                    </p>
                  </div>
                  {cfg?.finalImage && (
                    <div className="w-full md:w-56 shrink-0">
                      <img
                        src={cfg.finalImage}
                        alt="Imagen final"
                        className="rounded-xl border border-white/10 w-full"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={onCloseGiveUp}
                    className="px-3 py-2 rounded-xl border border-accent/40 bg-[rgba(255,107,0,.12)] hover:shadow-ring transition font-semibold"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
