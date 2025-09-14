// src/lib/time.ts
// Programación de desbloqueos fija para TODOS los usuarios:
// Serie que empieza el 4/09/2025, 1 día por celda, a las 15:40 Europe/Madrid.

type MadridNow = {
  y: number; // año
  m: number; // mes 1-12
  d: number; // día 1-31
  hh: number;
  mm: number;
  ss: number;
  ms: number;
};

/** ===================== Parámetros de la serie ===================== **/

// Día 1 -> 2025-09-04 15:40 (Europe/Madrid)
// Día N -> (start + (N-1) días) a las 15:40 (Europe/Madrid)
const SERIES_START = { y: 2025, m0: 9, d: 0 }; // m0: 0=enero ... 8=septiembre
const SERIES_TIME = { hh: 0, mm: 0, ss: 0 };

/** ===== Overrides remotos y de desarrollo (opcionales) ===== **/

let remoteOverrides: Record<number, boolean> = {};

const LS_KEY = "oct-dev-overrides";
function readDevOverrides(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Record<number, boolean>) : {};
  } catch {
    return {};
  }
}
function writeDevOverrides(map: Record<number, boolean>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(map));
  } catch {}
}

/** ===================== Helpers de calendario ===================== **/

export function daysInMonth(year: number, monthIndex0: number): number {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

/** Lunes como primer día de semana */
export function firstDowOffsetMondayFirst(year: number, monthIndex0: number): number {
  const dow = new Date(year, monthIndex0, 1).getDay(); // 0=Dom ... 6=Sáb
  return (dow + 6) % 7; // 0=Lun ... 6=Dom
}

/** ===================== Zona horaria Europe/Madrid ===================== **/

export function nowMadrid(): MadridNow {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = fmt.formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");
  return {
    y: get("year"),
    m: get("month"),
    d: get("day"),
    hh: get("hour"),
    mm: get("minute"),
    ss: get("second"),
    ms: now.getMilliseconds()
  };
}

/** Ms hasta la próxima medianoche en Madrid (para contadores de UI) */
export function msUntilNextMadridMidnight(): number {
  const cur = nowMadrid();
  const elapsedSec = cur.hh * 3600 + cur.mm * 60 + cur.ss;
  const remainingSec = 24 * 3600 - elapsedSec;
  return Math.max(0, remainingSec * 1000 - cur.ms);
}

/** ===================== Conversión de "hora Madrid" -> epoch ===================== **/

const TZ = "Europe/Madrid";

/** Offset de zona en un instante (ms) usando Intl (robusto frente a DST) */
function tzOffsetMsAt(dateUtc: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const parts = dtf.formatToParts(dateUtc);
  const map: Record<string, string> = {};
  for (const { type, value } of parts) {
    if (type !== "literal") map[type] = value;
  }
  const asUTC = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second)
  );
  return asUTC - dateUtc.getTime();
}

/** Convierte fecha/hora “pared” de Madrid -> epoch UTC (ms), corrigiendo DST */
function madridWallTimeToEpoch(year: number, monthIndex0: number, day: number, hh = 0, mm = 0, ss = 0): number {
  // Intento 1: aproximación
  const guess = Date.UTC(year, monthIndex0, day, hh, mm, ss);
  const off1 = tzOffsetMsAt(new Date(guess), TZ);
  const t1 = guess - off1;
  const off2 = tzOffsetMsAt(new Date(t1), TZ);
  return off2 === off1 ? t1 : guess - off2;
}

/** ===================== Cálculo de la serie diaria ===================== **/

/** Devuelve la fecha (Y, M0, D) correspondiente al día N de calendario dentro de la serie */
function getSeriesDateForDay(day: number): { y: number; m0: number; d: number } {
  // Usamos UTC solo para sumar días de forma calendárica; luego convertimos a “pared” Madrid
  const baseUtc = new Date(Date.UTC(SERIES_START.y, SERIES_START.m0, SERIES_START.d));
  const targetUtc = new Date(baseUtc.getTime() + (day - 1) * 24 * 60 * 60 * 1000);
  return {
    y: targetUtc.getUTCFullYear(),
    m0: targetUtc.getUTCMonth(),
    d: targetUtc.getUTCDate()
  };
}

/** ===================== API pública: overrides y desbloqueos ===================== **/

export function setRemoteOverrides(map: Record<number, boolean>) {
  remoteOverrides = map || {};
}

export function getDevOverrides(): Record<number, boolean> {
  return readDevOverrides();
}

export function setDevOverride(day: number, on: boolean) {
  const map = readDevOverrides();
  if (on) map[day] = true;
  else delete map[day];
  writeDevOverrides(map);
}

/**
 * Epoch UTC de desbloqueo del día N según la serie:
 * (start + (N-1) días) a las SERIES_TIME.hh:mm:ss hora Madrid.
 */
export function getUnlockEpoch(day: number, _year: number, _monthIndex0: number): number {
  const { y, m0, d } = getSeriesDateForDay(day);
  return madridWallTimeToEpoch(y, m0, d, SERIES_TIME.hh, SERIES_TIME.mm, SERIES_TIME.ss);
}

/**
 * ¿Está desbloqueado el día N a "ahora"?
 * Considera:
 *  1) Override dev (local)
 *  2) Override remoto (backend)
 *  3) Serie fija (4/09/2025 15:40 + (N-1) días)
 */
export function isUnlockedDevAware(day: number, year: number, monthIndex0: number): boolean {
  const dev = readDevOverrides();
  if (dev[day]) return true;
  if (remoteOverrides && remoteOverrides[day]) return true;

  const unlockAt = getUnlockEpoch(day, year, monthIndex0);
  return Date.now() >= unlockAt;
}

/**
 * Próximo desbloqueo pendiente (para el contador global).
 * Devuelve { day, msRemaining } o null si ya no quedan pendientes.
 */
export function getNextUnlockInfo(year: number, monthIndex0: number, daysCount = 31): { day: number; msRemaining: number } | null {
  const now = Date.now();
  let best: { day: number; msRemaining: number } | null = null;

  for (let day = 1; day <= daysCount; day++) {
    if (isUnlockedDevAware(day, year, monthIndex0)) continue;
    const unlockAt = getUnlockEpoch(day, year, monthIndex0);
    const msRemaining = unlockAt - now;
    if (msRemaining > 0) {
      if (!best || msRemaining < best.msRemaining) best = { day, msRemaining };
    }
  }
  return best;
}
