// src/lib/time.ts
// Utilidades de tiempo con soporte de desbloqueos absolutos (Europe/Madrid)

type MadridNow = {
  y: number; // año
  m: number; // mes 1-12
  d: number; // día 1-31
  hh: number;
  mm: number;
  ss: number;
  ms: number;
};

/**
 * 🔓 Desbloqueos absolutos por día (clave = día del calendario)
 * Formato: ISO con offset de zona. Para Europe/Madrid en septiembre 2025 es +02:00 (CEST).
 *
 * Día 1 => 2025-09-04 01:15:00 Europe/Madrid (pedido por ti)
 */
const CUSTOM_UNLOCKS: Record<number, string> = {
  1: "2025-09-04T01:15:00+02:00"
  // Añade más si quieres, p.ej.:
  // 2: "2025-10-02T00:00:00+02:00",
  // 3: "2025-10-03T00:00:00+02:00",
};

/** ===== Overrides remotos y de desarrollo ===== **/

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
  // monthIndex0: 0=enero ... 11=diciembre
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

/**
 * Offset para cuadrícula con lunes como primer día de semana.
 * Devuelve cuántas celdas vacías colocar antes del día 1.
 */
export function firstDowOffsetMondayFirst(year: number, monthIndex0: number): number {
  const dow = new Date(year, monthIndex0, 1).getDay(); // 0=Dom ... 6=Sáb
  // Convertimos a 0=Lun ... 6=Dom
  const dowMondayFirst = (dow + 6) % 7;
  return dowMondayFirst;
}

/** ===================== Zona horaria Europe/Madrid ===================== **/

/**
 * Devuelve la fecha/hora actual en Europe/Madrid desglosada.
 * Usa Intl.DateTimeFormat para respetar DST.
 */
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

/**
 * Milisegundos hasta la próxima medianoche en Europe/Madrid.
 * (Aproximación robusta basada en reloj local de Madrid)
 */
export function msUntilNextMadridMidnight(): number {
  const cur = nowMadrid();
  const elapsedSec = cur.hh * 3600 + cur.mm * 60 + cur.ss;
  const remainingSec = 24 * 3600 - elapsedSec;
  const remainingMs = remainingSec * 1000 - cur.ms;
  return Math.max(0, remainingMs);
}

/** ===================== Conversión de "hora Madrid" -> epoch ===================== **/

const TZ = "Europe/Madrid";

/**
 * Offset (ms) de la zona horaria target en un instante dado.
 * Técnica estándar usando Intl para evitar errores por DST.
 */
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

/**
 * Devuelve el epoch UTC (ms) correspondiente a la hora "wall-clock" de Madrid.
 * Hace un ajuste iterativo para transiciones DST.
 */
function madridWallTimeToEpoch(year: number, monthIndex0: number, day: number, hh = 0, mm = 0, ss = 0): number {
  // Primer intento: suposición UTC del mismo valor numérico
  const guess = Date.UTC(year, monthIndex0, day, hh, mm, ss);
  const off1 = tzOffsetMsAt(new Date(guess), TZ);
  const t1 = guess - off1;
  const off2 = tzOffsetMsAt(new Date(t1), TZ);
  return off2 === off1 ? t1 : guess - off2;
}

/** ===================== Overrides (remoto / dev) ===================== **/

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

/** ===================== Lógica de desbloqueo ===================== **/

/**
 * ¿Epoch de desbloqueo del día N?
 * - Si hay CUSTOM_UNLOCKS: usa esa fecha/hora exacta.
 * - Si no: 00:00 del día N del mes objetivo en Madrid.
 */
export function getUnlockEpoch(day: number, year: number, monthIndex0: number): number {
  const iso = CUSTOM_UNLOCKS[day];
  if (iso) {
    const t = Date.parse(iso);
    if (!Number.isNaN(t)) return t;
  }
  return madridWallTimeToEpoch(year, monthIndex0, day, 0, 0, 0);
}

/**
 * ¿Está desbloqueado el día N a "ahora"?
 * Considera:
 *  1) Overrides dev (localStorage)
 *  2) Overrides remotos (backend)
 *  3) Desbloqueos absolutos (CUSTOM_UNLOCKS)
 *  4) Regla estándar: en el mes objetivo, cada día se abre a su 00:00 (Madrid)
 */
export function isUnlockedDevAware(day: number, year: number, monthIndex0: number): boolean {
  const dev = readDevOverrides();
  if (dev[day]) return true;

  if (remoteOverrides && remoteOverrides[day]) return true;

  const unlockAt = getUnlockEpoch(day, year, monthIndex0);
  return Date.now() >= unlockAt;
}

/**
 * Próximo desbloqueo pendiente:
 * Devuelve el próximo día aún bloqueado y cuántos ms faltan. Si no hay pendientes, devuelve null.
 */
export function getNextUnlockInfo(year: number, monthIndex0: number, daysCount = 31): { day: number; msRemaining: number } | null {
  const now = Date.now();
  let best: { day: number; msRemaining: number } | null = null;

  for (let day = 1; day <= daysCount; day++) {
    // Si ya está desbloqueado, saltamos
    if (isUnlockedDevAware(day, year, monthIndex0)) continue;

    const unlockAt = getUnlockEpoch(day, year, monthIndex0);
    const msRemaining = unlockAt - now;
    if (msRemaining > 0) {
      if (!best || msRemaining < best.msRemaining) {
        best = { day, msRemaining };
      }
    }
  }
  return best;
}
