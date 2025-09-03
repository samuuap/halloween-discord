import { jsonResponse } from "./_utils";
const COOKIE_NAME = "AdminSession";

export default async (_req: Request) => {
  const cookie = [
    `${COOKIE_NAME}=`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    "Max-Age=0",
  ].join("; ");

  return jsonResponse(200, { ok: true }, { "Set-Cookie": cookie });
};
