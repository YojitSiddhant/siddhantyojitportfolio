import { NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_PASSWORD = "123";

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  const passwordValue = formData?.get("password");
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "approved",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
