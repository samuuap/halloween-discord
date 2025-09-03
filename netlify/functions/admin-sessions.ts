import { hmacSha256, jsonResponse, readCookie } from "./_utils";

const COOKIE_NAME = "AdminSession";

export default async (req: Request) => {
  const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "";
  if (!ADMIN_JWT_SECRET) {
    return jsonResponse(500, { error: "Server misconfigured: set ADMIN_JWT_SECRET" });
  }

  const cookieHeader = req.headers.get("cookie");
  const token = readCookie(cookieHeader, COOKIE_NAME);
  if (!token) return jsonResponse(200, { active: false });

  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return jsonResponse(200, { active: false });

  const payloadStr = Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
  const expectSig = hmacSha256(ADMIN_JWT_SECRET, payloadStr);
  if (sig !== expectSig) return jsonResponse(200, { active: false });

  try {
    const payload = JSON.parse(payloadStr) as { sub: string; exp: number };
    if (payload.sub !== "admin") return jsonResponse(200, { active: false });
    if (payload.exp < Math.floor(Date.now() / 1000)) return jsonResponse(200, { active: false });
    return jsonResponse(200, { active: true, exp: payload.exp });
  } catch {
    return jsonResponse(200, { active: false });
  }
};
