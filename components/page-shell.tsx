import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  maxWidthClassName?: string;
  sectionClassName?: string;
  animated?: boolean;
};

export function PageShell({
  children,
  maxWidthClassName = "max-w-none",
  sectionClassName = "",
  animated = true,
}: PageShellProps) {
  return (
    <main className="relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-background" />

      <section
        className={[
          "relative z-10 mx-auto flex w-full flex-col gap-4 px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-3 lg:px-8 lg:pt-4",
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
