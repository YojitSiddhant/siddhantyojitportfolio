import type { ContactLinks } from "@/components/contact-form-utils";
import {
  GitHubIcon,
  LinkedInIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/contact-form-icons";
import { iconToneClassName } from "@/components/contact-form-icons";

type CardTone = "whatsapp" | "phone" | "linkedin" | "github";

type QuickAction = {
  label: string;
  href: string;
  Icon: ({ className }: { className?: string }) => React.JSX.Element;
  iconClassName: string;
  tone: CardTone;
};

const buttonToneClassName: Record<CardTone, string> = {
  whatsapp: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent hover:text-white",
  phone: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent hover:text-white",
  linkedin: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent hover:text-white",
  github: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent hover:text-white",
};

type ContactFormSidebarProps = {
  links: ContactLinks;
};

export function ContactFormSidebar({ links }: ContactFormSidebarProps) {
  const quickActions: QuickAction[] = [
    {
      label: "WhatsApp",
      href: links.whatsapp,
      Icon: WhatsAppIcon,
      iconClassName: iconToneClassName.whatsapp,
      tone: "whatsapp",
    },
    {
      label: "Call",
      href: `tel:${links.phone.replace(/\s+/g, "")}`,
      Icon: PhoneIcon,
      iconClassName: iconToneClassName.phone,
      tone: "phone",
    },
    {
      label: "LinkedIn",
      href: links.linkedin,
      Icon: LinkedInIcon,
      iconClassName: iconToneClassName.linkedin,
      tone: "linkedin",
    },
    {
      label: "GitHub",
      href: links.github,
      Icon: GitHubIcon,
      iconClassName: iconToneClassName.github,
      tone: "github",
    },
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
    <div className="flex h-full flex-col gap-4 motion-reveal" style={{ animationDelay: "160ms" }}>
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6">
        <p className="text-sm font-black uppercase tracking-wider text-foreground">Connect</p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {quickActions.map(({ label, href, Icon, iconClassName, tone }, index) => {
            const isExternal = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                aria-label={label}
                className={`group flex flex-col items-center gap-2 rounded-xl border px-2 py-4 text-xs font-black uppercase tracking-wider transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md motion-reveal ${buttonToneClassName[tone]}`}
                style={{ animationDelay: `${220 + index * 90}ms` }}
              >
                <Icon className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${iconClassName}`} />
                <span className="hidden sm:block">{label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6 motion-reveal" style={{ animationDelay: "420ms" }}>
        <p className="text-sm font-black uppercase tracking-wider text-foreground">Quick details</p>
        <p className="mt-1.5 text-sm leading-6 text-muted">
          Share these details in your message so I can reply quickly and clearly.
        </p>
        <div className="mt-3 flex flex-1 flex-col">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex flex-1 flex-col justify-center gap-1 border-t border-border py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <p className="shrink-0 text-xs font-black uppercase tracking-wider text-foreground">{item.label}</p>
              <p className="text-left text-sm text-muted sm:max-w-80 sm:text-right">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
