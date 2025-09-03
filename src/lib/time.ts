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
 * Ejemplo solicitado:
 *  - Día 1 => 2025-09-04 01:15:00 Europe/Madrid
 */
const CUSTOM_UNLOCKS: Record<number, string> = {
  1: "2025-09-04T01:15:00+02:00"
  // Puedes añadir más, p.ej.:
  // 2: "2025-10-02T00:00:00+02:00",
  // 3: "2025-10-03T00:00:00+02:00",
};

/**
 * Overrides remotos: si un día está en true aquí, se considera desbloqueado.
 * Se establece desde el frontend con setRemoteOverrides(fetchOverrides()).
 */
let remoteOverrides: Record<number, boolean> = {};

/**
 * Overrides locales de desarrollo (almacenados en localStorage).
 * Si un día está a true aquí, se considera desbloqueado en ese navegador.
 */
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
 * (Aproximación robusta: se basa en reloj de Madrid actual)
 */
export function msUntilNextMadridMidnight(): number {
  const cur = nowMadrid();
  // Segundos transcurridos en el día de Madrid
  const elapsedSec = cur.hh * 3600 + cur.mm * 60 + cur.ss;
  const remainingSec = 24 * 3600 - elapsedSec;
  const remainingMs = remainingSec * 1000 - cur.ms;
  return Math.max(0, remainingMs);
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
 * ¿Está desbloqueado el día N, teniendo en cuenta:
 *  1) Overrides de desarrollo (localStorage)
 *  2) Overrides remotos (backend)
 *  3) Desbloqueos absolutos por fecha/hora (CUSTOM_UNLOCKS)
 *  4) Regla estándar: en el mes objetivo, cada día se abre en su fecha (Europe/Madrid)
 *
 * @param day Día 1..31
 * @param year Año del calendario (p.ej., 2025)
 * @param monthIndex0 Mes 0..11 (p.ej., 9 para octubre)
 */
export function isUnlockedDevAware(day: number, year: number, monthIndex0: number): boolean {
  // 1) Forzado dev (local)
  const dev = readDevOverrides();
  if (dev[day]) return true;

  // 2) Remoto
  if (remoteOverrides && remoteOverrides[day]) return true;

  // 3) Desbloqueo absoluto si existe
  const iso = CUSTOM_UNLOCKS[day];
  if (iso) {
    const unlockAtUtc = Date.parse(iso); // ISO con offset -> UTC epoch
    if (!Number.isNaN(unlockAtUtc)) {
      if (Date.now() >= unlockAtUtc) return true;
      // Si aún no ha llegado la hora absoluta, continúa y podría seguir bloqueado
    }
  }

  // 4) Regla estándar por fecha (Europe/Madrid):
  //    - Antes del mes objetivo: todo bloqueado
  //    - En el mes objetivo: desbloqueado si hoy.d >= day
  //    - Después del mes objetivo: todo desbloqueado
  const tm = nowMadrid(); // fecha actual en Madrid
  if (tm.y < year || (tm.y === year && tm.m < monthIndex0 + 1)) {
    return false; // todavía no hemos llegado al mes objetivo
  }
  if (tm.y > year || (tm.y === year && tm.m > monthIndex0 + 1)) {
    return true; // ya pasó el mes objetivo: todo abierto
  }
  // estamos dentro del mes objetivo
  return tm.d >= day;
}
