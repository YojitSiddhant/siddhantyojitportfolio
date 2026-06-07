import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin-shell";
import { logoutAdmin } from "@/app/admin/actions";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AdminShell logoutAction={logoutAdmin}>{children}</AdminShell>;
}
