// src/components/DayPage.tsx

import { Link, useParams } from "react-router-dom";
import { CONFIG } from "@/data/config";
import { isUnlockedDevAware, nowMadrid } from "@/lib/time";
import { useMemo, useState, useEffect, useRef } from "react";
import clsx from "clsx";

type DayConfig = {
  title?: string;
  emojis?: string;
  actors?: string[];
  poster?: string;
  frame?: string;
  finalTitle?: string;
  finalImage?: string;
  synopsis?: string;
  animated?: boolean;
  // OJO: NO requerimos 'blocked' en config.ts. Si algún día lo añades, lo respetamos dinámicamente con (cfg as any).blocked
};

const TOTAL_STEPS = 4;

/** Detecta swipe izquierda/derecha en mobile sin interferir con el scroll vertical */
function useSwipe(opts: {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minDistance?: number;  // píxeles
  maxOffAxis?: number;   // píxeles
  maxDurationMs?: number;
}) {
  const startRef = useRef<{ x: number; y: number; t: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    startRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const s = startRef.current;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    const dt = Date.now() - s.t;

    const minDistance = opts.minDistance ?? 48;
    const maxOffAxis = opts.maxOffAxis ?? 80;
    const maxDurationMs = opts.maxDurationMs ?? 1000;

    if (Math.abs(dy) > maxOffAxis || dt > maxDurationMs) return;

    if (dx <= -minDistance) opts.onSwipeLeft?.();
    else if (dx >= minDistance) opts.onSwipeRight?.();
  };

  return { onTouchStart, onTouchEnd };
}

export default function DayPage() {
  const params = useParams();
  const day = Number(params.day);
  const cfg: DayConfig | undefined = (CONFIG.days as any)[day];

  const manuallyBlocked = (cfg as any)?.blocked === true;

  const unlocked = useMemo(
    () => isUnlockedDevAware(day, CONFIG.year, CONFIG.month) && !manuallyBlocked,
    [day, manuallyBlocked]
  );

  const [step, setStep] = useState(1);
  const [giveUpOpen, setGiveUpOpen] = useState(false);

  // Refs a cada tarjeta para autoscroll en móvil
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Swipe para siguiente pista (móvil)
  const canNext = unlocked && step < TOTAL_STEPS;
  const swipe = useSwipe({
    onSwipeLeft: () => {
      if (canNext) {
        const newStep = Math.min(TOTAL_STEPS, step + 1);
        setStep(newStep);
        autoScrollToCard(newStep);
      }
      setShowHint(false);
    },
  });

  // Banner de ayuda (se oculta al cabo de unos segundos o al primer avance)
  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    if (!canNext) { setShowHint(false); return; }
    const id = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(id);
  }, [canNext, step]);

  // Autoscroll a la nueva tarjeta (sólo móvil)
  function isMobileViewport() {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  }
  function autoScrollToCard(targetStep: number) {
    if (!isMobileViewport()) return;
    requestAnimationFrame(() => {
      const el = cardRefs.current[targetStep - 1];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      }
    });
  }
  function revealNextByButton() {
    if (!canNext) return;
    const newStep = Math.min(TOTAL_STEPS, step + 1);
    setStep(newStep);
    setShowHint(false);
    autoScrollToCard(newStep);
  }

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8">
        <div className="text-5xl text-red-300 font-bold">Día no válido</div>
        <div className="text-2xl text-gray-400">
          La ruta no corresponde a un día de octubre.
        </div>
        <Link
          to="/"
          className="inline-block px-10 py-5 mt-8 bg-purple-900 rounded-3xl text-3xl text-white shadow hover:bg-purple-700 transition"
        >
          ← Volver al calendario
        </Link>
      </div>
    );
  }

  const Title = cfg?.title ?? `Noche ${day}`;
  const today = nowMadrid();
  const isToday =
    today.y === CONFIG.year &&
    today.m === CONFIG.month + 1 &&
    today.d === day;

  const progressPct = Math.max(0, Math.min(100, Math.round((step / TOTAL_STEPS) * 100)));

  type CardProps = {
    visible: boolean;
    delayMs: number;
    children: React.ReactNode;
    className?: string;
    refIndex: number;      // 0..3
    isLastVisible: boolean;
    canNext: boolean;
    onNext: () => void;
    onGiveUp: () => void;
  };

  const Card = ({
    visible,
    delayMs,
    children,
    className = "",
    refIndex,
    isLastVisible,
    canNext,
    onNext,
    onGiveUp,
  }: CardProps) => (
    <div
      ref={(el) => (cardRefs.current[refIndex] = el)}
      className={clsx(
        // scroll-mt compensa la barra superior sticky en móvil
        "scroll-mt-[88px] md:scroll-mt-0 transition-all duration-500 ease-in-out opacity-0 translate-y-6",
        visible && "opacity-100 translate-y-0",
        className
      )}
      style={{
        transitionDelay: visible ? `${delayMs}ms` : "0ms",
        pointerEvents: visible ? undefined : "none",
      }}
    >
      {children}

      {/* CTA inline justo debajo de la ÚLTIMA pista visible (solo móvil) */}
      {isLastVisible && (
        <div className="mt-3 md:hidden flex items-center justify-between gap-3">
          {canNext ? (
            <>
              <div className="text-[13px] text-white/80">
                <span className="opacity-90">Desliza a la izquierda</span>
                <span className="opacity-60"> o pulsa</span>
              </div>
              <button
                onClick={onNext}
                className="shrink-0 px-3 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow"
              >
                Nueva pista →
              </button>
            </>
          ) : (
            <div className="ml-auto">
              <button
                onClick={onGiveUp}
                className="px-3 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-sm font-bold shadow"
              >
                Rendirse 😵
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // ---------- AUTOSCROLL EN EL MODAL DE RESULTADO (MÓVIL) ----------
  const mobileModalScrollRef = useRef<HTMLDivElement | null>(null);
  const [finalImageLoaded, setFinalImageLoaded] = useState(false);

  // Cuando se abre el modal en móvil, hacemos scroll automático hasta el final
  useEffect(() => {
    if (!giveUpOpen || !isMobileViewport()) return;
    const el = mobileModalScrollRef.current;
    if (!el) return;

    // función que realiza el scroll automático de "tour" hacia toda la info
    const doAutoScroll = () => {
      // coloca al principio por si había una posición previa
      el.scrollTo({ top: 0, behavior: "auto" });
      // tras un pequeño delay para asegurar alturas correctas, baja suavemente hasta el final
      setTimeout(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      }, 200);
    };

    // si hay imagen final, esperamos a que cargue para tener la altura real
    if (cfg?.finalImage) {
      if (finalImageLoaded) doAutoScroll();
    } else {
      doAutoScroll();
    }
  }, [giveUpOpen, finalImageLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // reset flag al cerrar
  useEffect(() => {
    if (!giveUpOpen) setFinalImageLoaded(false);
  }, [giveUpOpen]);

  return (
    <div
      className={clsx(
        // Móvil compacto (rounded none / padding reducido) · Desktop como antes
        "max-w-4xl mx-auto my-0 md:my-4 bg-black/95 backdrop-blur-md rounded-none md:rounded-[36px] px-0 md:px-4 py-0 md:py-10 shadow-2xl relative overflow-hidden",
        "md:overflow-visible"
      )}
    >
      {/* ======== BARRA SUPERIOR MÓVIL (compacta) ======== */}
      <div className="md:hidden sticky top-0 z-30 bg-black/70 supports-[backdrop-filter]:bg-black/50 backdrop-blur px-4 pt-[env(safe-area-inset-top)] pb-2 border-b border-white/10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            aria-label="Volver"
            className="text-xl font-bold text-white/80 hover:text-white"
          >
            ←
          </Link>
          <div className="text-xl font-extrabold tracking-tight text-purple-200">
            Noche {day}
          </div>
          <div className="w-6" />
        </div>
        {unlocked && (
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </div>

      {/* ======== HEADER (solo desktop) ======== */}
      <div className="hidden md:flex mb-10 flex-col md:flex-row items-center md:items-end md:justify-between gap-4 md:gap-8 px-4">
        <span
          className={clsx(
            "text-6xl md:text-3xl font-black tracking-wide text-purple-200 drop-shadow",
            isToday && "animate-pulse"
          )}
        >
          Noche {day}
        </span>
      </div>

      {/* ======== STEPPER (solo desktop) ======== */}
      {unlocked && (
        <div className="hidden md:flex justify-center items-center gap-2 mb-8 px-4">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                "w-6 h-2 rounded-full",
                i < step ? "bg-orange-400 shadow-orange-300 shadow-lg" : "bg-gray-700/60"
              )}
            />
          ))}
        </div>
      )}

      {/* ======== CONTENIDO (captura swipe en móvil) ======== */}
      <div
        className="px-4 pb-6 md:pb-0 select-none md:select-auto"
        onTouchStart={swipe.onTouchStart}
        onTouchEnd={swipe.onTouchEnd}
        style={{ touchAction: "pan-y" }}
        role="presentation"
      >
        {/* Bloqueado */}
        {!unlocked && (
          <div className="flex flex-col items-center py-16 md:py-24 gap-4 md:gap-6">
            <span className="text-6xl md:text-8xl text-gray-600 mb-1 md:mb-3">🔒</span>
            <div className="text-2xl md:text-3xl text-white mb-1 font-bold">
              {manuallyBlocked ? "Bloqueado por el administrador" : "Bloqueado"}
            </div>
            <p className="text-lg md:text-2xl text-gray-300 text-center px-2">
              {manuallyBlocked
                ? "Este día está bloqueado y no se mostrarán pistas."
                : "Las pistas de este día estarán disponibles automáticamente a la hora programada."}
            </p>
            <Link
              to="/"
              className="inline-block mt-5 md:mt-7 px-6 md:px-12 py-3 md:py-5 bg-purple-900 rounded-2xl md:rounded-3xl text-white shadow text-lg md:text-3xl font-bold hover:bg-purple-700 transition"
            >
              ← Volver
            </Link>
          </div>
        )}

        {/* Desbloqueado */}
        {unlocked && (
          <>
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 mb-10 md:mb-12">
              {/* 1 · Emojis */}
              <Card
                visible={step >= 1}
                delayMs={0}
                refIndex={0}
                isLastVisible={step === 1}
                canNext={canNext}
                onNext={revealNextByButton}
                onGiveUp={() => setGiveUpOpen(true)}
              >
                <div className="bg-gradient-to-br from-purple-900/80 to-black/70 rounded-3xl px-4 py-5 md:p-5 flex flex-col items-center shadow-xl">
                  <div className="text-[3.5rem] md:text-7xl drop-shadow-lg mb-3 md:mb-4">
                    {cfg?.emojis ?? "❓"}
                  </div>
                  <div className="mt-1 text-2xl md:text-2xl text-purple-100 font-bold">
                    1ª pista · Emojis
                  </div>
                </div>
              </Card>

              {/* 2 · Actores */}
              <Card
                visible={step >= 2}
                delayMs={60}
                refIndex={1}
                isLastVisible={step === 2}
                canNext={canNext}
                onNext={revealNextByButton}
                onGiveUp={() => setGiveUpOpen(true)}
              >
                <div className="bg-gradient-to-br from-orange-800/80 to-black/80 rounded-3xl px-4 py-5 md:p-5 shadow-xl flex flex-col items-center">
                  <div className="text-2xl md:text-2xl font-bold mb-3 md:mb-4 text-orange-100">
                    2ª pista · Actores
                  </div>
                  {Array.isArray(cfg?.actors) && cfg.actors.length ? (
                    <div className="flex flex-wrap justify-center gap-2 md:gap-2 mt-1">
                      {cfg.actors.map((a, i) => (
                        <span
                          key={i}
                          className="bg-purple-700 text-white rounded-[2rem] px-4 py-2 md:px-4 md:py-2 text-xl md:text-xl shadow font-semibold"
                        >
                          {cfg?.animated ? `${a} (doblaje)` : a}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xl md:text-xl text-gray-300 mt-1">
                      Sin actores registrados
                    </div>
                  )}
                </div>
              </Card>

              {/* 3 · Póster (blur fuerte) */}
              <Card
                visible={step >= 3}
                delayMs={120}
                refIndex={2}
                isLastVisible={step === 3}
                canNext={canNext}
                onNext={revealNextByButton}
                onGiveUp={() => setGiveUpOpen(true)}
              >
                <div className="bg-black/90 rounded-3xl px-4 py-5 md:p-5 shadow-xl flex flex-col items-center">
                  <div className="text-2xl md:text-2xl font-bold mb-3 md:mb-2 text-purple-200">
                    3ª pista · Póster
                  </div>
                  {cfg?.poster ? (
                    <img
                      src={cfg.poster}
                      alt="Póster"
                      className="rounded-2xl shadow-xl w-full max-w-[240px] md:max-w-[300px] max-h-[360px] md:max-h-[400px] object-contain border-2 md:border-2 border-purple-800 blur scale-105 md:scale-110"
                    />
                  ) : (
                    <div className="text-xl md:text-xl text-gray-400">
                      Sube la URL del póster en config.ts
                    </div>
                  )}
                </div>
              </Card>

              {/* 4 · Frame */}
              <Card
                visible={step >= 4}
                delayMs={180}
                refIndex={3}
                isLastVisible={step === 4}
                canNext={false}
                onNext={revealNextByButton}
                onGiveUp={() => setGiveUpOpen(true)}
              >
                <div className="bg-black/95 rounded-3xl px-4 py-5 md:p-5 shadow-xl flex flex-col items-center">
                  <div className="text-2xl md:text-2xl font-bold mb-3 md:mb-2 text-red-200">
                    4ª pista · Frame clave
                  </div>
                  {cfg?.frame ? (
                    <img
                      src={cfg.frame}
                      alt="Frame clave"
                      className="rounded-2xl shadow-2xl w-full max-w-[240px] md:max-w-[300px] max-h-[360px] md:max-h-[400px] object-contain border-2 md:border-2 border-red-600"
                    />
                  ) : (
                    <div className="text-xl md:text-xl text-gray-400">
                      Sube la URL del frame en config.ts
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* ======== ACCIONES DESKTOP ======== */}
            <div className="hidden md:flex flex-row gap-6 justify-end items-center mt-10">
              {step < TOTAL_STEPS ? (
                <button
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-black px-5 py-2 rounded-3xl shadow-2xl text-lg transition-all"
                >
                  Siguiente pista →
                </button>
              ) : (
                <button
                  onClick={() => setGiveUpOpen(true)}
                  className="bg-red-700 hover:bg-red-800 text-white font-black px-5 py-2 rounded-3xl shadow-2xl text-lg transition-all"
                >
                  Rendirse 😵
                </button>
              )}
              <Link
                to="/"
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-5 py-2 rounded-3xl shadow-2xl text-lg transition-all"
              >
                ← Volver
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ======== HINT flotante adicional (sólo primeros segundos) ======== */}
      {unlocked && showHint && canNext && (
        <div className="md:hidden fixed pointer-events-none inset-x-0 bottom-4 z-40 px-4">
          <div className="mx-auto w-max max-w-[92vw] rounded-full bg-white/10 text-white/90 text-sm font-semibold px-3 py-2 shadow backdrop-blur border border-white/15 animate-pulse">
            Desliza a la izquierda o pulsa “Nueva pista”
          </div>
        </div>
      )}

      {/* ======== MODAL SOLUCIÓN ======== */}
      {giveUpOpen && (
        <>
          {/* --- MÓVIL: SCROLL automático y recuadro morado --- */}
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/85 backdrop-blur overflow-y-auto [overscroll-behavior:contain]"
            role="dialog"
            aria-modal="true"
            style={{ touchAction: "pan-y" }}
            ref={mobileModalScrollRef}
          >
            <div className="min-h-[100dvh] flex flex-col px-4 pt-[calc(env(safe-area-inset-top)+8px)] pb-[calc(env(safe-area-inset-bottom)+16px)]">
              {/* Header sticky con botón cerrar */}
              <div className="sticky top-0 z-10 -mx-4 px-4 pt-2 pb-2 bg-gradient-to-b from-black/85 to-transparent">
                <button
                  onClick={() => setGiveUpOpen(false)}
                  className="ml-auto block text-4xl text-gray-300 hover:text-red-300"
                  aria-label="Cerrar solución"
                >
                  ×
                </button>
              </div>

              {/* Contenido desplazable */}
              <div className="flex-1 flex flex-col items-center text-center gap-4">
                {cfg?.finalImage && (
                  <img
                    src={cfg.finalImage}
                    alt="Solución"
                    className="max-h-[58vh] w-auto rounded-2xl shadow-2xl object-contain"
                    onLoad={() => setFinalImageLoaded(true)}
                  />
                )}

                {/* Recuadro morado para título + sinopsis */}
                <div className="w-full max-w-[680px] rounded-3xl bg-gradient-to-b from-purple-900/40 to-purple-800/20 border border-purple-800/60 p-4 shadow-2xl">
                  <div className="text-2xl font-bold text-purple-200">
                    {cfg?.finalTitle ?? Title}
                  </div>
                  <div className="mt-2 text-base text-gray-200 whitespace-pre-line">
                    {cfg?.synopsis?.trim()
                      ? cfg.synopsis
                      : "Sinopsis no disponible. Añádela en config.ts"}
                  </div>
                </div>

                <button
                  onClick={() => setGiveUpOpen(false)}
                  className="mt-2 bg-purple-700 hover:bg-purple-800 px-6 py-2 text-white rounded-full shadow-lg text-base font-bold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>

          {/* --- DESKTOP: tarjeta con scroll si hace falta --- */}
          <div
            className="hidden md:flex fixed z-50 inset-0 items-center justify-center bg-black/80 backdrop-blur"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-[#16111e] text-white max-w-2xl w-full rounded-[36px] p-0 shadow-2xl border-2 border-purple-900 mx-4">
              {/* Contenedor con scroll */}
              <div className="max-h-[90vh] overflow-y-auto [overscroll-behavior:contain] rounded-[36px]">
                <div className="relative p-8 text-center">
                  <button
                    onClick={() => setGiveUpOpen(false)}
                    className="absolute right-6 top-6 text-3xl text-gray-400 hover:text-red-300"
                    aria-label="Cerrar solución"
                  >
                    ×
                  </button>
                  <div className="flex flex-col items-center gap-6 mt-6">
                    <div className="text-3xl font-black text-purple-300">Solución</div>
                    <div className="text-2xl font-semibold">
                      {cfg?.finalTitle ?? Title}
                    </div>
                    {cfg?.finalImage && (
                      <img
                        src={cfg.finalImage}
                        alt="Solución"
                        className="rounded-2xl shadow-lg max-h-[400px] mb-4 object-contain"
                      />
                    )}
                    <div className="w-full max-w-[680px] rounded-3xl bg-gradient-to-b from-purple-900/40 to-purple-800/20 border border-purple-800/60 p-4 shadow-2xl text-left">
                      <div className="text-xl text-gray-200 whitespace-pre-line">
                        {cfg?.synopsis?.trim()
                          ? cfg.synopsis
                          : "Sinopsis no disponible. Añádela en config.ts"}
                      </div>
                    </div>
                    <button
                      onClick={() => setGiveUpOpen(false)}
                      className="mt-2 bg-purple-700 hover:bg-purple-800 px-5 py-2 text-white rounded-full shadow-lg text-base font-bold"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
