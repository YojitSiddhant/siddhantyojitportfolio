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

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6 motion-reveal" style={{ animationDelay: "160ms" }}>
      <div className="flex h-full">
        <div className="flex h-full w-full flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            {quickActions.map(({ label, href, Icon, iconClassName, tone }, index) => {
              const isExternal = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  aria-label={label}
                  className={`group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:shadow-xl motion-reveal sm:h-14 sm:w-14 ${buttonToneClassName[tone]}`}
                  style={{ animationDelay: `${220 + index * 90}ms` }}
                >
                  <Icon className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 sm:h-7 sm:w-7 ${iconClassName}`} />
                </a>
              );
            })}
          </div>

          <div
            className="flex w-full flex-1 flex-col justify-between rounded-xl border border-border bg-background p-4 motion-reveal"
            style={{ animationDelay: "420ms" }}
          >
            <p className="text-sm font-black uppercase tracking-wider text-foreground">
              Quick details
            </p>
            <p className="mt-1.5 text-xs leading-5 text-muted">
              Share these details in your message so I can reply quickly and clearly.
            </p>
            <div className="mt-3 grid flex-1 content-between gap-3">
              <div className="flex flex-col gap-1 border-b border-border pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <p className="text-xs font-black uppercase tracking-wider text-foreground">
                  Availability
                </p>
                <p className="max-w-none text-left text-xs text-muted sm:max-w-80 sm:text-right">
                  Open to Full-Time Software Engineer, Frontend Developer, React Developer, Next.js Developer, and Full Stack Developer opportunities.
                </p>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <p className="text-xs font-black uppercase tracking-wider text-foreground">
                  Preferred Location
                </p>
                <p className="max-w-none text-left text-xs text-muted sm:max-w-80 sm:text-right">
                  Bengaluru, Karnataka
                </p>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <p className="text-xs font-black uppercase tracking-wider text-foreground">
                  Response Time
                </p>
                <p className="max-w-none text-left text-xs text-muted sm:max-w-80 sm:text-right">
                  Usually within 24 hours.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
