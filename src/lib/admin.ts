// src/lib/admin.ts
// Gestion segura del modo admin (sesion via cookie HttpOnly verificada en servidor)

const KEY = "admin-active"; // cache local para UI; la verdad la dice el servidor

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  } catch {
    return false;
  }
}

function setLocalActive(v: boolean) {
  if (canUseStorage()) localStorage.setItem(KEY, v ? "1" : "0");
}

function getLocalActive(): boolean {
  if (!canUseStorage()) return false;
  return localStorage.getItem(KEY) === "1";
}

/** === Sesion admin (cliente) === */
export async function getAdminSession(): Promise<boolean> {
  const res = await fetch("/api/admin-session", { credentials: "include" });
  if (!res.ok) return false;
  const data = await res.json();
  const active = !!data?.active;
  setLocalActive(active);
  return active;
}

export async function loginAdmin(code: string): Promise<boolean> {
  const res = await fetch("/api/admin-login", {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  const ok = !!data?.ok;
  setLocalActive(ok);
  return ok;
}

export async function logoutAdmin(): Promise<void> {
  await fetch("/api/admin-logout", { method: "POST", credentials: "include" });
  setLocalActive(false);
}

/** === API sincronica legacy para tus componentes === */
export function isAdminActive(): boolean {
  // Lee cache local (se refresca con getAdminSession()/ensureAdmin())
  return getLocalActive();
}

/** Llama a este en un useEffect de alto nivel para sincronizar sesion */
export async function ensureAdmin(): Promise<void> {
  if (typeof window === "undefined") return;
  await getAdminSession(); // NO lee ni aplica querystrings, solo servidor
}

/** === applyQueryOverrides (se mantiene igual que antes) === */
export function applyQueryOverrides(): boolean;
export function applyQueryOverrides<T extends Record<string, any>>(initial: T): T;

export function applyQueryOverrides<T extends Record<string, any>>(initial?: T): T | boolean {
  if (typeof window === "undefined") {
    return initial === undefined ? false : initial;
  }
  const params = new URLSearchParams(window.location.search);
  const hasParams = [...params.keys()].length > 0;

  if (initial === undefined) return hasParams;
  if (!hasParams) return initial;

  const out: T = { ...initial };

  params.forEach((rawValue, key) => {
    if (!(key in out)) return;

    let v: any = rawValue;
    const low = rawValue.toLowerCase();

    if (low === "true") v = true;
    else if (low === "false") v = false;
    else if (!isNaN(Number(rawValue)) && rawValue.trim() !== "") v = Number(rawValue);
    else {
      try {
        const parsed = JSON.parse(rawValue);
        if (typeof parsed === "object" || Array.isArray(parsed)) v = parsed;
      } catch {}
    }
    (out as any)[key] = v;
  });

  return out;
}
