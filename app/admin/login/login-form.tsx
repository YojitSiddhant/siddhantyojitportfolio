"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/admin/actions";
import { AdminSubmitButton } from "@/components/admin-submit-button";

const initialState: LoginState = {};

export function AdminLoginForm() {
  const [state, action] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="space-y-4 rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
      <div>
        <label htmlFor="password" className="text-sm font-black uppercase tracking-[0.18em] text-[var(--foreground)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          placeholder="Enter admin password"
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}

      <AdminSubmitButton label="Sign In" pendingLabel="Signing in..." className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-strong)] disabled:opacity-60" />
    </form>
  );
}
