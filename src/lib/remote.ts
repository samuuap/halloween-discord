export type OverridesMap = Record<number, boolean>;
const FN_URL = "/.netlify/functions/calendar-state";

export async function fetchOverrides(): Promise<OverridesMap> {
  try {
    const res = await fetch(FN_URL, { method: "GET" });
    if (!res.ok) return {};
    const data = (await res.json()) as { overrides?: OverridesMap };
    return data.overrides || {};
  } catch {
    return {};
  }
}

export async function setOverrides(
  { unlock = [], lock = [] }: { unlock?: number[]; lock?: number[] },
  adminPass: string
): Promise<OverridesMap | null> {
  try {
    const res = await fetch(FN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pass": adminPass
      },
      body: JSON.stringify({ unlock, lock })
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { overrides?: OverridesMap };
    return data.overrides || {};
  } catch {
    return null;
  }
}

export async function clearOverrides(adminPass: string): Promise<boolean> {
  try {
    const res = await fetch(FN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pass": adminPass
      },
      body: JSON.stringify({ action: "clear" })
    });
    return res.ok;
  } catch {
    return false;
  }
}
