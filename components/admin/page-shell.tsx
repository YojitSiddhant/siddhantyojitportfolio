"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { adminRoutes } from "@/lib/admin-routes";

type AdminPageShellProps = {
  children: ReactNode;
  logoutAction: () => Promise<void>;
};

function getRouteTitle(pathname: string) {
  switch (pathname) {
    case adminRoutes.dashboard:
      return { title: "Dashboard", description: "A calm overview of the portfolio CMS, recent changes, and quick entry points." };
    case adminRoutes.home:
      return { title: "Home", description: "Edit the landing page copy, quick notes, and top-of-page profile content." };
    case adminRoutes.education:
      return { title: "Education", description: "Manage education records and their media without leaving the CMS shell." };
    case adminRoutes.skills:
      return { title: "Skills", description: "Keep the skill badges and links crisp, ordered, and easy to update." };
    case adminRoutes.projects:
      return { title: "Projects", description: "Maintain featured projects, links, ordering, and imagery in one place." };
    case adminRoutes.myWork:
      return { title: "My Work", description: "Update the work showcase with concise cards and preview-friendly content." };
    case adminRoutes.certificates:
      return { title: "Certificates", description: "Manage certificate details, images, and verification links." };
    case adminRoutes.experience:
      return { title: "Experience", description: "Keep the career timeline polished and consistent with the rest of the portfolio." };
    case adminRoutes.settings:
      return { title: "Settings", description: "Session and CMS workspace preferences for the admin area." };
    case adminRoutes.login:
      return { title: "Portfolio CMS", description: "Sign in to manage the portfolio content." };
    default:
      return { title: "Portfolio CMS", description: "Internal content management for the portfolio site." };
  }
}

export function AdminPageShell({ children, logoutAction }: AdminPageShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);

  const isLoginPage = pathname === adminRoutes.login;
  const route = useMemo(() => getRouteTitle(pathname), [pathname]);
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
        title={route.title}
        description={route.description}
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
