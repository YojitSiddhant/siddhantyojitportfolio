import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  maxWidthClassName?: string;
  sectionClassName?: string;
  animated?: boolean;
};

export function PageShell({
  children,
  maxWidthClassName = "",
  sectionClassName = "",
  animated = true,
}: PageShellProps) {
  return (
    <main className="relative isolate overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(60%_100%_at_15%_0%,rgba(37,99,235,0.05),transparent_70%)]"
      />
      <section
        className={[
          "container-page relative z-10 flex flex-col gap-12 pt-12 sm:gap-16 sm:pt-20",
          maxWidthClassName,
          animated ? "motion-reveal" : "",
          sectionClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </section>
    </main>
  );
}
