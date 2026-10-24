import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/ui/icons";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  link?: { href: string; label: string };
  id?: string;
};

export function SectionHeading({ index, eyebrow, title, description, link, id }: SectionHeadingProps) {
  return (
    <div className="grid gap-6 border-t border-border pt-6 md:grid-cols-12 md:gap-8 md:pt-8">
      <p className="eyebrow md:col-span-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
        {eyebrow}
      </p>
      <div className="grid gap-4 md:col-span-9">
        <h2 id={id} className="max-w-3xl text-3xl text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description || link ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            {description ? <p className="max-w-2xl text-base text-muted sm:text-lg">{description}</p> : <span />}
            {link ? (
              <Link href={link.href} className="link-arrow shrink-0">
                {link.label}
                <ArrowUpRightIcon className="btn-arrow h-4 w-4" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
