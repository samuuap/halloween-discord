// src/components/DayPage.tsx

import { Link, useParams } from "react-router-dom";
import { CONFIG } from "@/data/config";
import { isUnlockedDevAware, nowMadrid } from "@/lib/time";
import { useMemo, useState } from "react";
import clsx from "clsx";

type DayConfig = {
  title?: string;
  emojis?: string; // pista 1
  actors?: string[]; // pista 2
  poster?: string; // pista 3 (blur fuerte)
  frame?: string; // pista 4 (frame clave)
  finalTitle?: string; // solución
  finalImage?: string; // imagen solución
  synopsis?: string; // overlay “Rendirse”
  animated?: boolean; // si true, añade “(doblaje)” a actores
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
  const [step, setStep] = useState(1);
  const [giveUpOpen, setGiveUpOpen] = useState(false);

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-5">
        <div className="text-3xl text-red-300 font-bold">Día no válido</div>
        <div className="text-gray-400">
          La ruta no corresponde a un día de octubre.
        </div>
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-4 bg-purple-900 rounded-lg text-white shadow hover:bg-purple-700 transition"
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
        "transition-all duration-500 ease-in-out opacity-0 translate-y-4",
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
    <div className="max-w-xl mx-auto my-10 bg-black/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Cabecera SOLO con número de noche */}
      <div className="flex items-center gap-4 mb-6">
        <span className={clsx(
          "text-3xl font-black tracking-wide text-purple-300 drop-shadow",
          isToday && "animate-pulse"
        )}>
          Noche {day}
        </span>
      </div>

      {/* Stepper visual */}
      <div className="flex justify-center items-center gap-2 mb-7">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "w-6 h-2 rounded-full transition-all duration-300",
              i < step
                ? "bg-orange-400 shadow-md scale-110"
                : "bg-gray-700/60"
            )}
          />
        ))}
      </div>

      {/* Bloqueado */}
      {!unlocked && (
        <div className="flex flex-col items-center py-16">
          <span className="text-5xl text-gray-600 mb-3">🔒</span>
          <div className="text-lg text-white mb-2 font-semibold">
            Bloqueado
          </div>
          <p className="text-gray-400 text-center">Las pistas de este día estarán disponibles automáticamente a la hora programada.</p>
          <Link
            to="/"
            className="inline-block mt-7 px-4 py-2 bg-purple-900 rounded-lg text-white shadow hover:bg-purple-700 transition"
          >
            ← Volver al calendario
          </Link>
        </div>
      )}

      {/* Desbloqueado: Pistas y acciones */}
      {unlocked && (
        <>
          <div className={clsx(
            "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          )}>
            {/* 1 · Emojis */}
            <Card visible={step >= 1} delayMs={0}>
              <div className="bg-gradient-to-br from-purple-900/70 to-black/70 rounded-xl p-5 flex flex-col items-center shadow-lg h-full">
                <div className="text-6xl drop-shadow-lg mb-3">{cfg?.emojis ?? "❓"}</div>
                <div className="text-sm text-purple-200">1ª pista · Emojis</div>
              </div>
            </Card>

            {/* 2 · Actores */}
            <Card visible={step >= 2} delayMs={80}>
              <div className="bg-gradient-to-br from-orange-900/80 to-black/90 rounded-xl p-5 shadow-lg h-full">
                <div className="text-md font-semibold mb-2 text-orange-200">2ª pista · Actores</div>
                {Array.isArray(cfg?.actors) && cfg.actors.length ? (
                  <div className="flex flex-wrap gap-2">
                    {cfg.actors.map((a, i) => (
                      <span
                        key={i}
                        className="bg-purple-700 text-white rounded-full px-3 py-1 text-xs shadow"
                      >
                        {cfg?.animated ? `${a} (doblaje)` : a}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400">Sin actores registrados</div>
                )}
              </div>
            </Card>

            {/* 3 · Póster */}
            <Card visible={step >= 3} delayMs={120}>
              <div className="bg-black/85 rounded-xl p-5 shadow-lg flex flex-col items-center h-full">
                <div className="text-md font-semibold mb-2 text-purple-300">
                  3ª pista · Póster
                </div>
                {cfg?.poster ? (
                  <img
                    src={cfg.poster}
                    alt="Póster"
                    className="rounded-lg shadow-xl w-auto max-h-64 object-contain border-2 border-purple-800 filter blur"
                  />
                ) : (
                  <div className="text-gray-400">Sube la URL del póster en config.ts</div>
                )}
              </div>
            </Card>

            {/* 4 · Frame */}
            <Card visible={step >= 4} delayMs={160}>
              <div className="bg-black/90 rounded-xl p-5 shadow-lg flex flex-col items-center h-full">
                <div className="text-md font-semibold mb-2 text-red-300">4ª pista · Frame clave</div>
                {cfg?.frame ? (
                  <img
                    src={cfg.frame}
                    alt="Frame clave"
                    className="rounded-lg shadow-2xl w-auto max-h-64 object-contain border-2 border-red-800"
                  />
                ) : (
                  <div className="text-gray-400">Sube la URL del frame en config.ts</div>
                )}
              </div>
            </Card>
          </div>

          {/* Acciones abajo */}
          <div className="flex gap-4 justify-end mt-8">
            {step < TOTAL_STEPS ? (
              <button
                onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2 rounded-lg shadow transition-all text-lg"
              >
                Siguiente pista →
              </button>
            ) : (
              <button
                onClick={() => setGiveUpOpen(true)}
                className="bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2 rounded-lg shadow transition-all text-lg"
              >
                Rendirse 😵
              </button>
            )}
            <Link
              to="/"
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-5 py-2 rounded-lg shadow transition-all text-lg"
            >
              ← Volver
            </Link>
          </div>

          {/* Overlay de solución */}
          {giveUpOpen && (
            <div className="fixed z-30 inset-0 flex items-center justify-center bg-black/80 backdrop-blur">
              <div className="bg-[#16111e] text-white max-w-lg w-full rounded-xl p-8 shadow-2xl relative border-2 border-purple-900">
                <button
                  onClick={() => setGiveUpOpen(false)}
                  className="absolute right-4 top-4 text-xl text-gray-400 hover:text-red-300"
                >
                  ×
                </button>
                <div className="flex flex-col items-center gap-3 mt-6">
                  <div className="text-2xl font-black text-purple-300 mb-2">
                    Solución
                  </div>
                  <div className="text-lg font-semibold text-center mb-2">
                    {cfg?.finalTitle ?? Title}
                  </div>
                  {cfg?.finalImage && (
                    <img
                      src={cfg.finalImage}
                      alt="Solución"
                      className="rounded-lg shadow-lg max-h-56 mb-3"
                    />
                  )}
                  <div className="text-sm text-gray-200 text-center mb-4 whitespace-pre-line">
                    {cfg?.synopsis?.trim()
                      ? cfg.synopsis
                      : "Sinopsis no disponible. Añádela en config.ts"}
                  </div>
                  <button
                    onClick={() => setGiveUpOpen(false)}
                    className="mt-2 bg-purple-700 hover:bg-purple-800 px-5 py-2 text-white rounded-full shadow transition-all"
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
