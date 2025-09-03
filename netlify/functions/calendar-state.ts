import { BlobStore, getStore } from "@netlify/blobs";

// === Config ===
const STORE_NAME = "calendar";
const KEY = "overrides.json";

// Estructura guardada: { overrides: { [day:number]: boolean } }
type State = { overrides: Record<number, boolean> };

function cors(headers: Headers) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, x-admin-pass");
}

// Util: lee estado
async function readState(store: BlobStore): Promise<State> {
  const json = await store.get(KEY, { type: "json" });
  if (json && typeof json === "object" && "overrides" in json) {
    return json as State;
  }
  return { overrides: {} };
}

// Util: guarda estado
async function writeState(store: BlobStore, state: State) {
  await store.setJSON(KEY, state);
}

// Verifica pass admin
function checkAdminPass(req: Request): boolean {
  const pass = req.headers.get("x-admin-pass") || "";
  const expected = process.env.ADMIN_PASS || "";
  return expected.length > 0 && pass === expected;
}

export default async (req: Request) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  cors(headers);

  if (req.method === "OPTIONS") {
    return new Response("", { status: 204, headers });
  }

  const store = getStore(STORE_NAME);

  if (req.method === "GET") {
    const state = await readState(store);
    return new Response(JSON.stringify(state), { status: 200, headers });
  }

  if (req.method === "POST") {
    if (!checkAdminPass(req)) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers
      });
    }
    const body = (await req.json().catch(() => ({}))) as {
      action?: "set" | "clear";
      unlock?: number[];
      lock?: number[];
      overrides?: Record<number, boolean>;
    };

    const state = await readState(store);

    if (body.action === "clear") {
      await writeState(store, { overrides: {} });
      return new Response(JSON.stringify({ ok: true, overrides: {} }), {
        status: 200,
        headers
      });
    }

    if (body.action === "set" && body.overrides && typeof body.overrides === "object") {
      await writeState(store, { overrides: body.overrides });
      return new Response(JSON.stringify({ ok: true, overrides: body.overrides }), {
        status: 200,
        headers
      });
    }

    const add = (nums: number[] | undefined, val: boolean) => {
      (nums || [])
        .map((n) => Number(n))
        .filter((n) => Number.isInteger(n) && n >= 1 && n <= 31)
        .forEach((d) => {
          state.overrides[d] = val;
        });
    };

    add(body.unlock, true);
    add(body.lock, false);

    await writeState(store, state);
    return new Response(JSON.stringify({ ok: true, overrides: state.overrides }), {
      status: 200,
      headers
    });
  }

  return new Response(JSON.stringify({ error: "method not allowed" }), {
    status: 405,
    headers
  });
};
