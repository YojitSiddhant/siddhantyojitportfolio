import Image from "next/image";
import Link from "next/link";
import { workItems } from "@/data/work";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

const sortedWorkItems = [...workItems].sort((a, b) => a.order - b.order);

// The hairline grid shows its background through empty cells, so close the last row with a filler.
const fillerSpan = {
  sm: sortedWorkItems.length % 2 === 1,
  lg: (4 - (sortedWorkItems.length % 4)) % 4,
};
const lgSpanClassName: Record<number, string> = {
  0: "lg:hidden",
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function WorkGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {sortedWorkItems.map((item, index) => {
        const [primary, ...rest] = item.links;

        return (
          <Reveal as="li" key={item.title} delay={(index % 4) * 60} className="relative bg-surface">
            <div className="group flex h-full flex-col gap-10 p-6 transition-colors duration-300 hover:bg-surface-strong">
              <div className="flex items-start justify-between gap-4">
                {item.logo ? (
                  <span className="logo-tile h-12 w-12 rounded-xl p-1">
                    <Image src={item.logo} alt={`${item.title} logo`} width={48} height={48} className="h-full w-full object-contain" />
                  </span>
                ) : null}
                <ArrowUpRightIcon className="btn-arrow h-5 w-5 text-subtle transition-colors group-hover:text-accent" />
              </div>
              <div>
                <h3 className="text-xl tracking-tight text-foreground">
                  {primary ? (
                    <a href={primary.url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
                      {item.title}
                      <span className="sr-only"> — {primary.label}</span>
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                {primary ? <p className="mt-1 truncate font-mono text-xs text-subtle">{hostname(primary.url)}</p> : null}
                {rest.length > 0 ? (
                  <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                    {rest.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="chip hover:text-foreground">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        );
      })}
      {fillerSpan.lg > 0 || fillerSpan.sm ? (
        <li
          className={`bg-surface ${fillerSpan.sm ? "sm:col-span-1" : "sm:col-span-2"} ${lgSpanClassName[fillerSpan.lg]}`}
        >
          <Link
            href="/experience"
            className="group flex h-full min-h-40 flex-col justify-end gap-2 p-6 text-sm text-muted transition-colors hover:bg-surface-strong hover:text-foreground"
          >
            <span className="font-mono text-xs text-subtle">+ more</span>
            <span className="inline-flex items-center gap-1.5">
              See every client project on the Experience page
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ) : null}
    </ul>
  );
}
