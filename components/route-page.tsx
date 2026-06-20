type RoutePageProps = {
  title: string;
  description: string;
};

export function RoutePage({ title, description }: RoutePageProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 motion-reveal">
      <section className="max-w-2xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[var(--foreground)]">
          Portfolio Section
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:mt-5 sm:text-lg sm:leading-8">
          {description}
        </p>
      </section>
    </main>
  );
}
