// Lógica de fechas + overrides locales y remotos
const DEV_KEY = "oct-dev-overrides";

export function nowMadrid() {
  // Nota: simplificado (no DST), válido para nuestro uso: usamos la hora local del navegador.
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return { y, m, d: day };
}

export function daysInMonth(year: number, month0: number) {
  return new Date(year, month0 + 1, 0).getDate();
}

export function firstDowOffsetMondayFirst(year: number, month0: number) {
  // 0=domingo en JS. Convertimos para que 0=lunes
  const dow = new Date(year, month0, 1).getDay();
  const mondayFirst = (dow + 6) % 7;
  return mondayFirst;
}

// === Overrides locales (dev) ===
export function getDevOverrides(): Record<number, boolean> {
  try {
    const v = localStorage.getItem(DEV_KEY);
    return v ? (JSON.parse(v) as Record<number, boolean>) : {};
  } catch {
    return {};
  }
}

export function setDevOverride(day: number, val: boolean) {
  const cur = getDevOverrides();
  cur[day] = val;
  localStorage.setItem(DEV_KEY, JSON.stringify(cur));
}

export function clearDevOverrides() {
  localStorage.removeItem(DEV_KEY);
}

// === Overrides remotos (globales) en memoria ===
let remoteOverrides: Record<number, boolean> = {};
export function setRemoteOverrides(map: Record<number, boolean>) {
  remoteOverrides = map || {};
}
export function getRemoteOverrides() {
  return remoteOverrides;
}

// == Desbloqueo natural por fecha (día corriente del mes)
export function isNaturallyUnlocked(day: number, year: number, month0: number) {
  const n = nowMadrid();
  // Nota: month0 (0=enero). Comparamos año y mes.
  const currentMonth = n.y === year && n.m === month0 + 1;
  if (!currentMonth) {
    // Si ya pasó el mes, todo desbloqueado; si es antes del mes, nada desbloqueado.
    if (n.y > year || (n.y === year && n.m > month0 + 1)) return true;
    return false;
  }
  return n.d >= day;
}

// === Función única que decide si está desbloqueado
export function isUnlockedDevAware(day: number, year: number, month0: number): boolean {
  const natural = isNaturallyUnlocked(day, year, month0);
  const dev = getDevOverrides()[day];
  const remote = remoteOverrides[day];
  // Si alguno dice true → desbloqueado. Si alguno dice false → bloqueado forzado.
  if (dev === false || remote === false) return false;
  if (dev === true || remote === true) return true;
  return natural;
}

// Utilidades varias (usadas en otras partes)
export function msUntilNextMadridMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}
