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
  whatsapp: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
  phone: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
  linkedin: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
  github: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
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
    <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
      <div className="flex justify-end xl:translate-x-10 xl:translate-y-2">
        <div className="flex h-full w-full max-w-full flex-col xl:max-w-105">
          <div className="flex flex-wrap items-center justify-center gap-3">
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
            className="mx-auto mt-5 w-full max-w-full rounded-3xl border border-border bg-surface-strong px-4 py-3 shadow-sm motion-reveal sm:max-w-95"
            style={{ animationDelay: "420ms" }}
          >
            <p className="text-sm font-black uppercase tracking-wider text-foreground">
              Quick details
            </p>
            <p className="mt-1.5 text-xs leading-5 text-muted">
              Share these details in your message so I can reply quickly and clearly.
            </p>
            <div className="mt-3 grid gap-2.5">
              <div className="flex flex-col gap-1 border-b border-border pb-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <p className="text-xs font-black uppercase tracking-wider text-foreground">
                  Project type
                </p>
                <p className="max-w-none text-left text-xs text-muted sm:max-w-52 sm:text-right">
                  Website, UI redesign, portfolio, or freelance work.
                </p>
              </div>
              <div className="flex flex-col gap-1 border-b border-border pb-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <p className="text-xs font-black uppercase tracking-wider text-foreground">
                  Timeline
                </p>
                <p className="max-w-none text-left text-xs text-muted sm:max-w-52 sm:text-right">
                  Let me know your expected deadline or urgency.
                </p>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <p className="text-xs font-black uppercase tracking-wider text-foreground">
                  Best contact time
                </p>
                <p className="max-w-none text-left text-xs text-muted sm:max-w-52 sm:text-right">
                  Mention the time window that works for you.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <div
              className="mx-auto flex w-full max-w-full flex-col gap-3 rounded-3xl border border-border bg-surface-strong px-4 py-3 shadow-sm motion-reveal sm:max-w-95 sm:flex-row sm:items-center sm:justify-between"
              style={{ animationDelay: "500ms" }}
            >
              <div className="rounded-2xl bg-accent-soft px-3 py-2 text-xs font-black uppercase tracking-wider text-accent">
                Reply fast
              </div>
              <div className="flex-1 text-left sm:text-right">
                <p className="text-xs font-black uppercase tracking-wider text-foreground">
                  Quick reply
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Usually within 1 business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
