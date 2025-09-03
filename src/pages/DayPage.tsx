import { Link, useParams } from "react-router-dom";
import { CONFIG } from "@/data/config";
import { getDevOverrides, isUnlockedDevAware, msUntilNextMadridMidnight, nowMadrid } from "@/lib/time";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

const SPOILERS_KEY = "oct-spoilers-hidden";

export default function DayPage() {
  const params = useParams();
  const day = Number(params.day);
  const data: any = (CONFIG.days as any)[day];

  const [spoilersHidden, setSpoilersHidden] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem(SPOILERS_KEY) ?? "false"); }
    catch { return false; }
  });
  const [countdown, setCountdown] = useState<string>("");

  const unlocked = useMemo(
    () => isUnlockedDevAware(day, CONFIG.year, CONFIG.month),
    [day]
  );

  const pistas: string[] = (Array.isArray(data?.pistas) ? data.pistas : (Array.isArray(data?.clues) ? data.clues : [])) as string[];

  useEffect(() => {
    if (unlocked) return;
    const tick = () => {
      const ms = msUntilNextMadridMidnight();
      const totalSec = Math.max(0, Math.floor(ms / 1000));
      const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
      const s = String(totalSec % 60).padStart(2, "0");
      setCountdown(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [unlocked]);

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return (
      <div className="max-w-grid mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold">Día no válido</h1>
        <p className="text-muted">La ruta no corresponde a un día de octubre.</p>
        <Link className="inline-block mt-4 px-3 py-2 rounded-xl border border-white/15 hover:shadow-ring" to="/">← Volver al calendario</Link>
      </div>
    );
  }

  const monthName = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre"
  ][CONFIG.month];

  const today = nowMadrid();
  const isToday = (today.y === CONFIG.year && today.m === CONFIG.month + 1 && today.d === day);
  const devForced = !!getDevOverrides()[day];

  return (
    <div className="max-w-grid mx-auto px-4 py-8">
      <header className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-xl grid place-items-center bg-[conic-gradient(from_210deg,rgba(255,107,0,.25),rgba(124,58,237,.25))] shadow-ring">
            <span className="font-display text-2xl">🎃</span>
          </div>
          <div>
            <h1 className="m-0 font-extrabold tracking-tight text-[clamp(20px,2.4vw,28px)]">
              Pistas — {day} de {monthName} {CONFIG.year}
            </h1>
            <div className="text-muted text-sm">
              {unlocked ? (isToday ? "¡Hoy es el día, suerte adivinando!" : "Día ya desbloqueado.") : "Este día aún está bloqueado."}
              {unlocked && devForced && <span className="ml-2 text-[11px] opacity-80">[forzado]</span>}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/" className="px-3 py-2 rounded-xl border border-white/20 hover:shadow-ring transition font-semibold">
            ← Volver
          </Link>
          <button
            onClick={() => {
              const next = !spoilersHidden;
              setSpoilersHidden(next);
              localStorage.setItem(SPOILERS_KEY, JSON.stringify(next));
            }}
            className="px-3 py-2 rounded-xl border border-accent2/40 bg-[rgba(124,58,237,.08)] hover:shadow-ring transition font-semibold"
          >
            {spoilersHidden ? "👀 Mostrar pistas" : "🙈 Ocultar pistas"}
          </button>
          {CONFIG.discordUrl && unlocked && (
            <a
              href={CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl border border-accent/40 bg-[rgba(255,107,0,.12)] hover:shadow-ring transition font-semibold inline-flex items-center gap-2"
            >
              💬 Abrir Discord
            </a>
          )}
        </div>
      </header>

      {!unlocked && (
        <div className="mb-6 p-4 rounded-2xl border border-white/10 bg-white/5">
          <div className="font-semibold mb-1">🔒 Bloqueado</div>
          <div className="text-sm text-muted">
            Se desbloqueará a medianoche (Europe/Madrid). Cuenta atrás: <span className="font-bold tabular-nums">{countdown || "…"}</span>
          </div>
        </div>
      )}

      <div
        className={clsx(
          "relative p-4 rounded-2xl border bg-white/[.04] border-white/10 overflow-hidden",
          !unlocked && "saturate-[.4] contrast-90 opacity-85"
        )}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className={clsx("text-xs px-2 py-1 rounded-full border w-fit mb-2",
              unlocked ? "bg-good/20 border-white/20 text-good" : "bg-[#1b1b25] border-[#303044] text-[#8b8ba3]")}>
              {unlocked ? "🔓 Desbloqueado" : "🔒 Bloqueado"}
            </div>

            <h2 className="text-lg font-extrabold mb-2">{data?.title ?? `Noche ${day}`}</h2>

            <div className={clsx("flex flex-col gap-2", spoilersHidden && unlocked && "blur-[6px] select-none")}>
              {unlocked ? (
                Array.isArray(pistas) && pistas.length ? (
                  pistas.map((p: string, i: number) => (
                    <div key={i} className="p-2 rounded-lg border border-white/20 border-dashed bg-white/5 text-sm">🕵️ {p}</div>
                  ))
                ) : (
                  <div className="p-2 rounded-lg border border-white/20 border-dashed bg-white/5 text-sm">(Añade pistas en config.ts)</div>
                )
              ) : (
                <div className="p-2 rounded-lg border border-white/20 border-dashed bg-white/5 text-sm">Las pistas se mostrarán al desbloquear el día.</div>
              )}
            </div>
          </div>

          {data?.poster && (
            <div className="w-full md:w-48 shrink-0">
              <img src={data.poster} alt="" className="rounded-xl border border-white/10 w-full" loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
