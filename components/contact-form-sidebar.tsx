import type { ContactLinks } from "@/components/contact-form-utils";
import { WhatsAppIcon } from "@/components/contact-form-icons";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";

type QuickAction = {
  label: string;
  href: string;
  icon: ({ className }: { className?: string }) => React.JSX.Element;
};

type ContactFormSidebarProps = {
  links: ContactLinks;
};

export function ContactFormSidebar({ links }: ContactFormSidebarProps) {
  const quickActions: QuickAction[] = [
    { label: "WhatsApp", href: links.whatsapp, icon: WhatsAppIcon },
    { label: "Call", href: `tel:${links.phone.replace(/\s+/g, "")}`, icon: PhoneIcon },
    { label: "LinkedIn", href: links.linkedin, icon: LinkedInIcon },
    { label: "GitHub", href: links.github, icon: GitHubIcon },
  ];

  const details = [
    { label: "Email", value: links.email },
    { label: "Phone", value: links.phone },
    {
      label: "Availability",
      value:
        "Open to Full-Time Software Engineer, Frontend Developer, React Developer, Next.js Developer, and Full Stack Developer opportunities.",
    },
    { label: "Preferred Location", value: "Bengaluru, Karnataka" },
    { label: "Response Time", value: "Usually within 24 hours." },
  ];

  return (
    <aside className="flex h-full flex-col gap-4 lg:col-span-5" aria-label="Contact details">
      <a
        href={`mailto:${links.email}`}
        className="group card card-interactive flex items-center justify-between gap-4 p-5 sm:p-6"
      >
        <span className="min-w-0">
          <span className="eyebrow">Email directly</span>
          <span className="mt-2 block truncate text-lg tracking-tight text-foreground group-hover:text-accent">
            {links.email}
          </span>
        </span>
        <MailIcon className="h-5 w-5 shrink-0 text-subtle group-hover:text-accent" />
      </a>

      <div className="card p-5 sm:p-6">
        <p className="eyebrow">Connect</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {quickActions.map(({ label, href, icon: Icon }) => {
            const isExternal = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-sm text-foreground transition-colors duration-200 hover:border-border-strong hover:bg-surface-hover"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                  {label}
                </span>
                <ArrowUpRightIcon className="btn-arrow h-3.5 w-3.5 text-subtle" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="card flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow">Quick details</p>
        <p className="mt-2 text-sm text-muted">
          Share these details in your message so I can reply quickly and clearly.
        </p>
        <dl className="mt-4 flex flex-1 flex-col">
          {details.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 border-t border-border py-3.5 sm:flex-row sm:justify-between sm:gap-6">
              <dt className="shrink-0 text-sm text-foreground">{item.label}</dt>
              <dd className="text-sm text-muted sm:max-w-72 sm:text-right">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
