import type { ReactNode } from "react";
import { AdminPageShell } from "@/components/admin/page-shell";
import { logoutAdmin } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AdminPageShell logoutAction={logoutAdmin}>{children}</AdminPageShell>;
}
