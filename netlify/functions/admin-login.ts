import { hmacSha256, base64url, jsonResponse, safeEqual } from "./_utils";

const COOKIE_NAME = "AdminSession";
const SESSION_SECONDS = 60 * 60; // 1 hora

export default async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method Not Allowed" });
  }

  const ADMIN_PASS = process.env.ADMIN_PASS || "";
  const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "";

  if (!ADMIN_PASS || !ADMIN_JWT_SECRET) {
    return jsonResponse(500, { error: "Server misconfigured: set ADMIN_PASS and ADMIN_JWT_SECRET" });
  }

  let provided = "";
  try {
    const body = await req.json();
    provided = String(body?.code || "");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON" });
  }

  // Comparación en tiempo constante
  if (!provided || !safeEqual(provided, ADMIN_PASS)) {
    return jsonResponse(401, { ok: false, error: "Invalid code" });
  }

  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = JSON.stringify({ sub: "admin", exp });
  const sig = hmacSha256(ADMIN_JWT_SECRET, payload);
  const token = `${base64url(payload)}.${sig}`;

  const cookie = [
    `${COOKIE_NAME}=${token}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${SESSION_SECONDS}`,
  ].join("; ");

  return jsonResponse(200, { ok: true, exp }, { "Set-Cookie": cookie });
};
