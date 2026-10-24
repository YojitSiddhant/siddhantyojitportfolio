import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact-form-section";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { contactLinks } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact | Siddhant Yojit",
  description: "Contact page for Siddhant Yojit.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageSectionHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="text-accent">connect</span>
          </>
        }
        description="Tell me about the opportunity, project, or how I can help — I usually reply within 24 hours."
      />

      <ContactFormSection links={contactLinks} />
    </PageShell>
  );
}
