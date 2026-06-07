"use client";

import { useEffect, useState } from "react";

type AdminToastProps = {
  message?: string | null;
};

export function AdminToast({ message }: AdminToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [message]);

  if (!message || !visible) {
    return null;
  }

  return (
    <div className="fixed right-4 top-4 z-[60] max-w-sm rounded-2xl border border-[var(--border)] bg-white px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
      <p className="text-sm font-semibold text-[var(--foreground)]">{message}</p>
    </div>
  );
}
