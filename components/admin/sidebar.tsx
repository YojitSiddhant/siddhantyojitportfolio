"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems, adminRoutes } from "@/lib/admin-routes";

type AdminSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
  logoutAction: () => Promise<void>;
};

function initials(label: string) {
  return label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function AdminSidebar({ collapsed, mobileOpen, onClose, onToggleCollapse, logoutAction }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === adminRoutes.site ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-4 top-20 z-40 h-[calc(100dvh-6rem)] overflow-hidden rounded-[2rem] border border-black/5 bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-[transform,width,opacity] duration-300 lg:sticky lg:top-24 lg:z-20 ${
          mobileOpen ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"
        } ${collapsed ? "lg:w-[72px]" : "lg:w-[260px]"} w-[min(20rem,calc(100vw-2rem))]`}
      >
        <div className="flex h-full flex-col p-3">
          <div
            className={`rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(241,245,249,0.9)_100%)] p-4 ${
              collapsed ? "lg:px-2 lg:py-3" : ""
            }`}
          >
            <div className={`flex items-center gap-3 ${collapsed ? "lg:justify-center" : ""}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-sm font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                SY
              </div>
              {!collapsed ? (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted)]">Admin Shell</p>
                  <p className="text-lg font-bold tracking-tight text-[var(--foreground)]">Portfolio CMS</p>
                </div>
              ) : null}
            </div>

            {!collapsed ? (
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                A compact internal workspace for editing the portfolio with the same calm visual language as the public site.
              </p>
            ) : null}
          </div>

          <div className="mt-4 flex-1 overflow-y-auto pr-1">
            <nav className="grid gap-1.5">
              {adminNavItems.map((item) => {
                const active = isActive(item.href);
                const short = initials(item.label);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors ${
                      collapsed ? "lg:justify-center lg:px-2" : ""
                    } ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-transparent text-[var(--foreground)] hover:border-black/5 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-[0.18em] ${
                        active ? "bg-white text-[var(--accent)]" : "bg-slate-100 text-[var(--muted)] group-hover:bg-white"
                      }`}
                    >
                      {short}
                    </span>
                    {!collapsed ? <span className="truncate">{item.label}</span> : null}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-4 space-y-2 border-t border-black/5 pt-4">
            <Link
              href={adminRoutes.site}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-3 rounded-2xl border border-black/5 px-3 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] ${
                collapsed ? "lg:justify-center lg:px-2" : ""
              }`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                VS
              </span>
              {!collapsed ? <span>View Site</span> : null}
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className={`flex w-full items-center gap-3 rounded-2xl border border-black/5 px-3 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] ${
                  collapsed ? "lg:justify-center lg:px-2" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                  LO
                </span>
                {!collapsed ? <span>Logout</span> : null}
              </button>
            </form>
          </div>

          <div className="mt-4 hidden lg:block">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="flex w-full items-center justify-center rounded-full border border-black/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {collapsed ? "Expand" : "Collapse"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
