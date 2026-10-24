import Link from "next/link";
import type { Metadata } from "next";
import { EducationList } from "@/components/education/education-list";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Education | Siddhant Yojit",
  description: "Education details for Siddhant Yojit.",
};

export default function EducationPage() {
  return (
    <PageShell>
      <PageSectionHeader
        eyebrow="Education"
        title={
          <>
            Academic <span className="text-accent">background</span>
          </>
        }
        aside={
          <Link href="/certificate" className="link-arrow">
            View certificates
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        }
      />

      <EducationList />
    </PageShell>
  );
}
