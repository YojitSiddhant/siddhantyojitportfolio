import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact-form-section";

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
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5 lg:px-8 lg:pt-6 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-1 py-3 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[var(--accent)]" fill="none">
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
          <div className="text-sm font-black text-[var(--foreground)]">Form and options</div>
        </div>

        <div className="motion-reveal" style={{ animationDelay: "160ms" }}>
          <ContactFormSection links={contactLinks} />
        </div>
      </section>
    </main>
  );
}
