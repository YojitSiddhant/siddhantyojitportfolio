import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  maxWidthClassName?: string;
  sectionClassName?: string;
  animated?: boolean;
};

export function PageShell({
  children,
  maxWidthClassName = "max-w-6xl",
  sectionClassName = "",
  animated = true,
}: PageShellProps) {
  return (
    <main className="relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-background" />

      <section
        className={[
          "relative z-10 mx-auto flex w-full flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8",
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
