"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { adminRoutes } from "@/lib/admin-routes";

type AdminPageShellProps = {
  children: ReactNode;
  logoutAction: () => Promise<void>;
};

export function AdminPageShell({ children, logoutAction }: AdminPageShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);

  const isLoginPage = pathname === adminRoutes.login;
  const mobileOpen = mobileMenuPath === pathname;

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuPath(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  if (isLoginPage) {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-2xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.04),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(36,21,15,0.03),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.74),_transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.68)_70%,rgba(255,255,255,0.18)_100%)]" />

      <AdminHeader
        onMenuToggle={() => setMobileMenuPath((current) => (current === pathname ? null : pathname))}
        onSidebarToggle={() => setCollapsed((current) => !current)}
        sidebarCollapsed={collapsed}
      />

      <div className="mx-auto flex w-full max-w-6xl gap-5 px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <AdminSidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onClose={() => setMobileMenuPath(null)}
          onToggleCollapse={() => setCollapsed((current) => !current)}
          logoutAction={logoutAction}
        />

        <div className="min-w-0 flex-1 pb-20">{children}</div>
      </div>
    </div>
  );
}
