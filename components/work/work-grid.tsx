import Image from "next/image";
import Link from "next/link";
import { workItems } from "@/data/work";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

const sortedWorkItems = [...workItems].sort((a, b) => a.order - b.order);

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function WorkGrid() {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
      {sortedWorkItems.map((item, index) => {
        const [primary, ...rest] = item.links;

        return (
          <Reveal
            as="article"
            key={item.title}
            delay={(index % 3) * 70}
            className="group card card-interactive relative flex w-72 shrink-0 snap-start flex-col gap-10 p-6 sm:w-80 lg:w-auto"
          >
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
          </Reveal>
        );
      })}

      <Link
        href="/experience"
        className="group flex w-72 shrink-0 snap-start flex-col justify-between gap-4 rounded-[1.25rem] border border-dashed border-border-strong p-6 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground sm:w-80 lg:w-auto"
      >
        <span className="font-mono text-xs text-subtle">+ more</span>
        <span className="inline-flex items-center gap-1.5 text-base">
          See every client project on the Experience page
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}
