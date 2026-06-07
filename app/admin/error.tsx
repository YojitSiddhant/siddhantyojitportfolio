"use client";

import { useEffect } from "react";

type AdminErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error({
      source: "app/admin/error.tsx",
      message: error.message,
      stack: error.stack,
      cause: error.cause,
      digest: error.digest,
    });
  }, [error]);

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />
      <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-2xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="w-full rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Admin Error</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Admin area failed to load</h1>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            The dashboard hit an unexpected server error. The details were logged server-side and can be retried.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-strong)]"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

