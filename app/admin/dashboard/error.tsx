"use client";

import { useEffect } from "react";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error({
      source: "app/admin/dashboard/error.tsx",
      message: error.message,
      stack: error.stack,
      cause: error.cause,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-900">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-red-700">Dashboard Error</p>
      <h2 className="mt-2 text-xl font-bold">Dashboard render failed</h2>
      <p className="mt-3 text-sm leading-7">
        The server component crashed while rendering this route. The error has been logged with stack details.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-red-900 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white"
      >
        Retry
      </button>
    </div>
  );
}

