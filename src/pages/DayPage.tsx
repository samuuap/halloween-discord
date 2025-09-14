// src/components/DayPage.tsx

import { Link, useParams } from "react-router-dom";
import { CONFIG } from "@/data/config";
import { isUnlockedDevAware, nowMadrid } from "@/lib/time";
import { useMemo, useRef, useEffect, useState } from "react";
import clsx from "clsx";

/* === Tipado flexible para respetar tu config.ts actual === */
type ActorItem = { name: string; photo?: string };
type DayConfig = {
  title?: string;
  emojis?: string;
  actors?: string[];
  actorsV2?: ActorItem[];
  actorPhotos?: string[];
  poster?: string;      // 9:16 (1080x1920)
  frame?: string;       // 16:9 (1920x1080)
  finalTitle?: string;
  finalImage?: string;
  synopsis?: string;
  animated?: boolean;
  [k: string]: any;     // p.e. blocked
};

const TOTAL_STEPS = 4;

export default function DayPage() {
  const params = useParams();
  const day = Number(params.day);
  const cfg: DayConfig | undefined = (CONFIG.days as any)[day];

  const manuallyBlocked = cfg?.blocked === true;
  const unlocked = useMemo(
    () => isUnlockedDevAware(day, CONFIG.year, CONFIG.month) && !manuallyBlocked,
    [day, manuallyBlocked]
  );

  const Title = cfg?.title ?? `Noche ${day}`;
  const today = nowMadrid();
  const isToday =
    today.y === CONFIG.year && today.m === CONFIG.month + 1 && today.d === day;

  const [step, setStep] = useState(1);
  const [showSolution, setShowSolution] = useState(false);

  const topRef = useRef<HTMLDivElement | null>(null);
  const isMobile = () =>
    (typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const progressPct = Math.round((step / TOTAL_STEPS) * 100);

  function goNext() {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
    if (isMobile())
      requestAnimationFrame(() =>
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
  }
  function goPrev() {
    setStep((s) => Math.max(1, s - 1));
    if (isMobile())
      requestAnimationFrame(() =>
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
  }

  // Cerrar con ESC cuando el modal esté abierto
  useEffect(() => {
    if (!showSolution) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSolution(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSolution]);

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

  // --- Normalización de actores (con fotos) ---
  const actorsNormalized: ActorItem[] = (() => {
    if (Array.isArray(cfg?.actorsV2) && cfg!.actorsV2!.length) return cfg!.actorsV2!;
    if (Array.isArray(cfg?.actors) && cfg!.actors!.length) {
      const photos = Array.isArray(cfg?.actorPhotos) ? cfg!.actorPhotos! : [];
      return cfg!.actors!.slice(0, 3).map((name, i) => ({ name, photo: photos[i] }));
    }
    return [];
  })().slice(0, 3);

  // -------- Tarjeta base (desktop y móvil), con controles ARRIBA --------
  function Shell({ children }: { children: React.ReactNode }) {
    return (
      <div
        ref={topRef}
        className={clsx(
          "max-w-3xl md:max-w-4xl mx-auto my-0 md:my-8 bg-black rounded-none md:rounded-[28px] px-0 md:px-6 py-0 md:py-6 shadow-2xl",
          "overflow-hidden"
        )}
      >
        {/* ======= ENCABEZADO MÓVIL (sticky arriba, con controles) ======= */}
        <div className="md:hidden sticky top-0 z-30 bg-black backdrop-blur px-4 pt-[env(safe-area-inset-top)] pb-2 border-b border-white/10">
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

          {/* Controles arriba (móvil) */}
          {unlocked && (
            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                onClick={goPrev}
                disabled={step === 1}
                className={clsx(
                  "px-3 py-1.5 rounded-xl border border-white/15 text-white/90 hover:bg-white/5 text-sm transition",
                  step === 1 && "opacity-40 cursor-not-allowed"
                )}
              >
                ← Anterior
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  onClick={goNext}
                  className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow"
                >
                  Siguiente pista →
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowSolution(true);
                    requestAnimationFrame(() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    );
                  }}
                  className="px-4 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-sm font-bold shadow"
                >
                  Rendirse 😵
                </button>
              )}
            </div>
          )}

          {/* Progreso */}
          {unlocked && (
            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                style={{ width: `${Math.max(0, Math.min(100, progressPct))}%` }}
              />
            </div>
          )}
        </div>

        {/* ======= ENCABEZADO DESKTOP con controles ARRIBA ======= */}
        <div className="hidden md:flex items-start md:items-end justify-between px-2 mb-5">
          <h1
            className={clsx(
              "text-[34px] leading-none text-ink",
              isToday && "animate-pulse"
            )}
          >
            Noche {day}
          </h1>

          {unlocked ? (
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm text-muted">
                Pista {step} de {TOTAL_STEPS}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  disabled={step === 1}
                  className={clsx(
                    "px-4 py-2 rounded-2xl border border-white/15 text-white/90 hover:bg-white/5 transition",
                    step === 1 && "opacity-40 cursor-not-allowed"
                  )}
                >
                  ← Anterior
                </button>
                {step < TOTAL_STEPS ? (
                  <button
                    onClick={goNext}
                    className="px-5 py-2 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow"
                  >
                    Siguiente pista →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowSolution(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-5 py-2 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold shadow"
                  >
                    Rendirse 😵
                  </button>
                )}
                <Link
                  to="/"
                  className="px-4 py-2 rounded-2xl bg-gray-800 hover:bg-gray-900 text-white font-semibold shadow"
                >
                  ← Volver
                </Link>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* Contenido */}
        <div className="px-4 md:px-2">{children}</div>
      </div>
    );
  }

  // --------- Vistas de pista una a una ---------
  function StepEmoji() {
    return (
      <div className="mx-auto max-w-[720px] rounded-[24px] bg-gradient-to-br from-purple-900 to-purple-700 ring-1 ring-purple-800 p-6 md:p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,.55)]">
        <div className="text-2xl md:text-[20px] font-bold text-purple-100 mb-4">
          1ª pista · Emojis
        </div>
        <div className="text-[72px] md:text-[84px] leading-none drop-shadow-lg">
          {cfg?.emojis ?? "❓"}
        </div>
        <p className="mt-4 text-sm md:text-base text-white/80">
          Emojis <span className="font-bold">muy descriptivos</span> de la
          película.
        </p>
      </div>
    );
  }

  function StepActors() {
    return (
      <div className="mx-auto max-w-[820px] rounded-[24px] bg-gradient-to-br from-orange-900 via-amber-900 to-black ring-1 ring-orange-800 p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,.55)]">
        <div className="text-2xl md:text-[20px] font-bold text-ink/95 mb-5 text-center">
          2ª pista · Actores
        </div>

        {actorsNormalized.length ? (
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {actorsNormalized.map((a, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="size-24 md:size-32 rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 shadow-lg">
                  {a.photo ? (
                    <img
                      src={a.photo}
                      alt={a.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50">
                      <span className="text-xl md:text-2xl">👤</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-base md:text-lg font-semibold text-ink">
                  {cfg?.animated ? `${a.name} (voz.)` : a.name}
                </div>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 3 - actorsNormalized.length) }).map(
              (_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex flex-col items-center text-center opacity-40"
                >
                  <div className="size-24 md:size-32 rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10" />
                  <div className="mt-2 text-base md:text-lg">—</div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-center text-white/70">
            Añade actores en config.ts (con foto opcional).
          </div>
        )}
      </div>
    );
  }

  function StepPoster() {
    // 1080x1920 → 9:16, con BLUR marcado
    return (
      <div className="mx-auto max-w-[820px] rounded-[24px] bg-gradient-to-br from-purple-900 to-purple-700 ring-1 ring-purple-800 p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,.55)]">
        <div className="text-2xl md:text-[20px] font-bold text-purple-100 mb-5 text-center">
          3ª pista · Póster 
        </div>

        {cfg?.poster ? (
          <div className="mx-auto w-full max-w-[360px] md:max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden ring-1 ring-purple-800/60 shadow-2xl bg-black">
            <img
              src={cfg.poster}
              alt="Póster (desenfocado)"
              className="w-full h-full object-cover blur-[10px] scale-[1.06] brightness-90"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="text-center text-white/70">
            Sube la URL del póster (9:16) a config.ts
          </div>
        )}
      </div>
    );
  }

  function StepFrame() {
    // 1920x1080 → 16:9
    return (
      <div className="mx-auto max-w-[980px] rounded-[24px] bg-gradient-to-br from-orange-900 via-amber-900 to-black ring-1 ring-orange-800 p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,.55)]">
        <div className="text-2xl md:text-[20px] font-bold text-ink/95 mb-5 text-center">
          4ª pista · Frame clave 
        </div>

        {cfg?.frame ? (
          <div className="mx-auto w-full max-w-[920px] aspect-[16/9] rounded-2xl overflow-hidden ring-2 ring-red-500/70 shadow-2xl bg-black">
            <img src={cfg.frame} alt="Frame clave" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ) : (
          <div className="text-center text-white/70">
            Sube la URL del frame (16:9) a config.ts
          </div>
        )}
      </div>
    );
  }

  // -------- Render principal --------
  return (
    <Shell>
      {!unlocked ? (
        <div className="flex flex-col items-center py-16 md:py-20 gap-4">
          <span className="text-6xl md:text-8xl text-gray-600">🔒</span>
          <div className="text-2xl md:text-3xl text-white font-bold">
            {manuallyBlocked ? "Bloqueado por el administrador" : "Bloqueado"}
          </div>
          <p className="text-lg md:text-2xl text-gray-300 text-center px-2">
            {manuallyBlocked
              ? "Este día está bloqueado y no se mostrarán pistas."
              : "Las pistas de este día estarán disponibles automáticamente a la hora programada."}
          </p>
          <Link
            to="/"
            className="inline-block mt-5 md:mt-6 px-6 md:px-10 py-3 bg-purple-900 rounded-2xl text-white shadow text-lg md:text-xl font-bold hover:bg-purple-700 transition"
          >
            ← Volver
          </Link>
        </div>
      ) : (
        <>
          <div className="py-6 md:py-2">
            {step === 1 && <StepEmoji />}
            {step === 2 && <StepActors />}
            {step === 3 && <StepPoster />}
            {step === 4 && <StepFrame />}
          </div>
        </>
      )}

      {/* ===== Modal SOLUCIÓN — compacto y centrado, imagen pequeña, ajustes para móvil ===== */}
      {showSolution && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) setShowSolution(false);
          }}
        >
          <div className="w-full max-w-[680px] rounded-[24px] bg-gradient-to-b from-[#2a1840] to-[#1c1230] ring-1 ring-purple-700 shadow-[0_20px_70px_rgba(0,0,0,.6)]">
            {/* Contenido con scroll si hiciera falta */}
            <div className="max-h-[90dvh] overflow-y-auto [overscroll-behavior:contain] p-4 sm:p-7">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSolution(false)}
                  className="text-3xl text-gray-300 hover:text-red-300 leading-none"
                  aria-label="Cerrar solución"
                >
                  ×
                </button>
              </div>

              <div className="mt-1 text-center space-y-4 sm:space-y-5">
                <div className="text-lg sm:text-xl font-extrabold text-purple-200 tracking-wide">
                  Solución
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-ink">
                  {cfg?.finalTitle ?? Title}
                </h2>

                {cfg?.finalImage && (
                  <img
                    src={cfg.finalImage}
                    alt="Película"
                    className="mx-auto rounded-2xl shadow-xl object-contain max-w-[300px] sm:max-w-[360px] max-h-[32dvh] sm:max-h-[34dvh]"
                  />
                )}

                <div className="mx-auto max-w-[560px] rounded-2xl bg-purple-800/25 border border-purple-500/35 px-4 py-3 text-sm sm:text-base leading-relaxed text-ink/95 whitespace-pre-line">
                  {cfg?.synopsis?.trim()
                    ? cfg.synopsis
                    : "Sinopsis no disponible. Añádela en config.ts"}
                </div>

                <button
                  onClick={() => setShowSolution(false)}
                  className="mt-1 inline-flex items-center justify-center px-5 py-2 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold shadow"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
