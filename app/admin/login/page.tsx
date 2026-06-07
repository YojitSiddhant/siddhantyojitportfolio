import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/app/admin/login/login-form";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin Login | Siddhant Yojit",
  description: "Admin login for the portfolio CMS.",
};

async function isAuthenticated() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return false;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return false;
  }

  return Boolean(await verifyAdminSessionToken(token, secret));
}

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-2xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="w-full space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[var(--foreground)]">Admin Access</p>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">Portfolio CMS</h1>
            <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
              Sign in to update the site content, manage portfolio sections, and publish changes without touching code.
            </p>
          </div>

          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
