import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact-form-section";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Contact | Siddhant Yojit",
  description: "Contact page for Siddhant Yojit.",
};

const contactLinks = {
  email: "sid.mailconnect@gmail.com",
  phone: "+91 7899304430",
  whatsapp: "https://wa.me/917899304430",
  linkedin: "https://www.linkedin.com/in/siddhant-yojit-ab805327b/",
  github: "https://github.com/YojitSiddhant",
};

export default function ContactPage() {
  return (
    <PageShell sectionClassName="gap-4 pb-8 pt-4 sm:pb-10 sm:pt-5 lg:pt-6">
      <PageSectionHeader
        className="motion-reveal"
        style={{ animationDelay: "80ms" }}
        left={
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-accent" fill="none">
              <path
                d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="m5.5 7.5 6.5 5 6.5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Contact
          </div>
        }
        right={<div className="text-sm font-black text-foreground">Form and options</div>}
      />

      <div className="motion-reveal" style={{ animationDelay: "160ms" }}>
        <ContactFormSection links={contactLinks} />
      </div>
    </PageShell>
  );
}
