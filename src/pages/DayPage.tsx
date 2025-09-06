// src/components/DayPage.tsx

import { Link, useParams } from "react-router-dom";
import { CONFIG } from "@/data/config";
import { isUnlockedDevAware, nowMadrid } from "@/lib/time";
import { useMemo, useState } from "react";
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

export default function DayPage() {
  const params = useParams();
  const day = Number(params.day);
  const cfg: DayConfig | undefined = (CONFIG.days as any)[day];

  // Bloqueo manual opcional, SIN forzar cambios en config.ts
  const manuallyBlocked = (cfg as any)?.blocked === true;

  // Respetamos tu sistema de desbloqueo (admin/overrides) centralizado en lib/time
  const unlocked = useMemo(
    () => isUnlockedDevAware(day, CONFIG.year, CONFIG.month) && !manuallyBlocked,
    [day, manuallyBlocked]
  );

  const [step, setStep] = useState(1);
  const [giveUpOpen, setGiveUpOpen] = useState(false);

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

  const Card = ({
    visible,
    delayMs,
    children,
    className = "",
  }: {
    visible: boolean;
    delayMs: number;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={clsx(
        "transition-all duration-500 ease-in-out opacity-0 translate-y-6",
        visible && "opacity-100 translate-y-0",
        className
      )}
      style={{
        transitionDelay: visible ? `${delayMs}ms` : "0ms",
        pointerEvents: visible ? undefined : "none",
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      className={clsx(
        "max-w-4xl mx-auto my-0 md:my-4 bg-black/95 backdrop-blur-md rounded-none md:rounded-[36px] px-0 md:px-4 py-0 md:py-10 shadow-2xl relative overflow-hidden",
        "md:overflow-visible"
      )}
    >
      {/* ======== MOBILE TOP BAR (solo móviles) ======== */}
      <div className="md:hidden sticky top-0 z-30 bg-black/70 supports-[backdrop-filter]:bg-black/50 backdrop-blur px-4 pt-[env(safe-area-inset-top)] pb-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            aria-label="Volver"
            className="text-2xl font-bold text-white/80 hover:text-white"
          >
            ←
          </Link>
          <div className="text-2xl font-extrabold tracking-tight text-purple-200">
            Noche {day}
          </div>
          <div className="w-6" />
        </div>
        {unlocked && (
          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
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

      {/* ======== STEPPER de puntos (solo desktop) ======== */}
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

      {/* ======== CONTENIDO ======== */}
      <div className="px-4 pb-[96px] md:pb-0"> {/* padding-bottom para dejar espacio a la action bar móvil */}
        {/* Bloqueado (por hora o manual) */}
        {!unlocked && (
          <div className="flex flex-col items-center py-24 gap-6">
            <span className="text-8xl text-gray-600 mb-3">🔒</span>
            <div className="text-3xl text-white mb-2 font-bold">
              {manuallyBlocked ? "Bloqueado por el administrador" : "Bloqueado"}
            </div>
            <p className="text-2xl text-gray-300 text-center">
              {manuallyBlocked
                ? "Este día está bloqueado y no se mostrarán pistas."
                : "Las pistas de este día estarán disponibles automáticamente a la hora programada."}
            </p>
            <Link
              to="/"
              className="inline-block mt-7 px-12 py-5 bg-purple-900 rounded-3xl text-white shadow text-3xl font-bold hover:bg-purple-700 transition"
            >
              ← Volver al calendario
            </Link>
          </div>
        )}

        {/* Desbloqueado */}
        {unlocked && (
          <>
            <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-6 mb-12">
              {/* 1 · Emojis */}
              <Card visible={step >= 1} delayMs={0}>
                <div className="bg-gradient-to-br from-purple-900/80 to-black/70 rounded-3xl px-5 py-6 md:p-5 flex flex-col items-center shadow-xl">
                  <div className="text-[5rem] md:text-7xl drop-shadow-lg mb-4">
                    {cfg?.emojis ?? "❓"}
                  </div>
                  <div className="mt-1 text-3xl md:text-2xl text-purple-100 font-bold">
                    1ª pista · Emojis
                  </div>
                </div>
              </Card>

              {/* 2 · Actores (añade “(doblaje)” si animated=true) */}
              <Card visible={step >= 2} delayMs={60}>
                <div className="bg-gradient-to-br from-orange-800/80 to-black/80 rounded-3xl px-5 py-6 md:p-5 shadow-xl flex flex-col items-center">
                  <div className="text-3xl md:text-2xl font-bold mb-4 text-orange-100">
                    2ª pista · Actores
                  </div>
                  {Array.isArray(cfg?.actors) && cfg.actors.length ? (
                    <div className="flex flex-wrap justify-center gap-3 md:gap-2 mt-1">
                      {cfg.actors.map((a, i) => (
                        <span
                          key={i}
                          className="bg-purple-700 text-white rounded-[2rem] px-6 py-3 md:px-4 md:py-2 text-2xl md:text-xl shadow font-semibold"
                        >
                          {cfg?.animated ? `${a} (doblaje)` : a}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-2xl md:text-xl text-gray-300 mt-2">
                      Sin actores registrados
                    </div>
                  )}
                </div>
              </Card>

              {/* 3 · Póster (blur fuerte) */}
              <Card visible={step >= 3} delayMs={120}>
                <div className="bg-black/90 rounded-3xl px-5 py-6 md:p-5 shadow-xl flex flex-col items-center">
                  <div className="text-3xl md:text-2xl font-bold mb-5 md:mb-2 text-purple-200">
                    3ª pista · Póster
                  </div>
                  {cfg?.poster ? (
                    <img
                      src={cfg.poster}
                      alt="Póster"
                      className="rounded-2xl shadow-xl w-full max-w-xl md:max-w-[300px] max-h-[600px] md:max-h-[400px] object-contain border-4 md:border-2 border-purple-800 blur-2xl scale-110"
                    />
                  ) : (
                    <div className="text-2xl md:text-xl text-gray-400">
                      Sube la URL del póster en config.ts
                    </div>
                  )}
                </div>
              </Card>

              {/* 4 · Frame */}
              <Card visible={step >= 4} delayMs={180}>
                <div className="bg-black/95 rounded-3xl px-5 py-6 md:p-5 shadow-xl flex flex-col items-center">
                  <div className="text-3xl md:text-2xl font-bold mb-5 md:mb-2 text-red-200">
                    4ª pista · Frame clave
                  </div>
                  {cfg?.frame ? (
                    <img
                      src={cfg.frame}
                      alt="Frame clave"
                      className="rounded-2xl shadow-2xl w-full max-w-xl md:max-w-[300px] max-h-[600px] md:max-h-[400px] object-contain border-4 md:border-2 border-red-600"
                    />
                  ) : (
                    <div className="text-2xl md:text-xl text-gray-400">
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

      {/* ======== MOBILE ACTION BAR (solo móviles) ======== */}
      {unlocked && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 bg-gradient-to-t from-black/90 to-black/20 backdrop-blur border-t border-white/10">
          <div className="flex gap-3">
            {step < TOTAL_STEPS ? (
              <button
                onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-black px-6 py-4 rounded-2xl shadow-2xl text-2xl transition-all"
              >
                Siguiente pista →
              </button>
            ) : (
              <button
                onClick={() => setGiveUpOpen(true)}
                className="flex-1 bg-red-700 hover:bg-red-800 text-white font-black px-6 py-4 rounded-2xl shadow-2xl text-2xl transition-all"
              >
                Rendirse 😵
              </button>
            )}
            <Link
              to="/"
              className="px-5 py-4 rounded-2xl bg-gray-800 hover:bg-gray-900 text-white font-semibold shadow-2xl text-2xl transition-all"
              aria-label="Volver al calendario"
            >
              ←
            </Link>
          </div>
        </div>
      )}

      {/* ======== MODAL SOLUCIÓN ======== */}
      {giveUpOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="bg-[#16111e] text-white max-w-2xl w-full rounded-[36px] p-10 md:p-8 shadow-2xl relative border-4 md:border-2 border-purple-900 mx-4">
            <button
              onClick={() => setGiveUpOpen(false)}
              className="absolute right-8 top-8 text-6xl md:text-3xl text-gray-400 hover:text-red-300"
              aria-label="Cerrar solución"
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-10 mt-10 md:mt-6">
              <div className="text-5xl md:text-3xl font-black text-purple-300 mb-2">
                Solución
              </div>
              <div className="text-3xl md:text-2xl font-semibold text-center mb-2">
                {cfg?.finalTitle ?? Title}
              </div>
              {cfg?.finalImage && (
                <img
                  src={cfg.finalImage}
                  alt="Solución"
                  className="rounded-2xl shadow-lg max-h-[600px] md:max-h-[400px] mb-7"
                />
              )}
              <div className="text-2xl md:text-xl text-gray-200 text-center mb-6 whitespace-pre-line px-2">
                {cfg?.synopsis?.trim()
                  ? cfg.synopsis
                  : "Sinopsis no disponible. Añádela en config.ts"}
              </div>
              <button
                onClick={() => setGiveUpOpen(false)}
                className="mt-2 bg-purple-700 hover:bg-purple-800 px-10 py-3 md:px-5 md:py-2 text-white rounded-full shadow-lg text-xl md:text-base transition-all font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
