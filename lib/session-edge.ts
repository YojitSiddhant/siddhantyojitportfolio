export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";

type SessionPayload = {
  sub: "admin";
  exp: number;
};

function base64UrlEncode(input: ArrayBuffer | Uint8Array) {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function importKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function verifyAdminSessionToken(token: string, secret: string) {
  const [encodedPayload, encodedSignature] = token.split(".");
  if (!encodedPayload || !encodedSignature) {
    return null;
  }

  try {
    const payloadBytes = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as SessionPayload;
    if (payload.sub !== "admin" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    const key = await importKey(secret);
    const signature = base64UrlDecode(encodedSignature);
    const valid = await crypto.subtle.verify("HMAC", key, signature, payloadBytes);
    return valid ? payload : null;
  } catch {
    return null;
  }
}

export async function createAdminSessionToken(secret: string) {
  const payload: SessionPayload = {
    sub: "admin",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };

  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const key = await importKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, payloadBytes);
  return `${base64UrlEncode(payloadBytes)}.${base64UrlEncode(signature)}`;
}
