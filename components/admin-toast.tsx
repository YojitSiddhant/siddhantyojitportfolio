"use client";

import { useEffect, useState } from "react";

type AdminToastProps = {
  message?: string | null;
};

export function AdminToast({ message }: AdminToastProps) {
  const [visible, setVisible] = useState(Boolean(message));

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
    <div className="fixed right-4 top-4 z-[60] max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-[0_14px_36px_rgba(36,21,15,0.08)] backdrop-blur-sm">
      <p className="text-sm font-semibold text-[var(--foreground)]">{message}</p>
    </div>
  );
}
