"use client";

import { useEffect, useMemo, useState } from "react";

type LoaderCard = {
  titleWidth: string;
  lineWidths: string[];
  chipCount?: number;
  bodyHeightClassName?: string;
};

type SectionSkeletonsProps = {
  headerLeftWidth: string;
  headerRightWidth: string;
  cards: LoaderCard[];
  columnsClassName?: string;
};

function getLoadDuration() {
  if (typeof navigator === "undefined") {
    return 1600;
  }

  const connection = (navigator as Navigator & {
    connection?: {
      effectiveType?: string;
      saveData?: boolean;
    };
  }).connection as
    | {
        effectiveType?: string;
        saveData?: boolean;
      }
    | undefined;

  if (connection?.saveData) {
    return 2400;
  }

  switch (connection?.effectiveType) {
    case "slow-2g":
    case "2g":
      return 2400;
    case "3g":
      return 2000;
    case "4g":
      return 1400;
    default:
      return 1600;
  }
}

function LoaderBar({
  className,
  duration,
  delay,
}: {
  className: string;
  duration: number;
  delay?: number;
}) {
  return (
    <div
      className={`animate-pulse rounded-full bg-accent/20 ${className}`}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay ?? 0}ms`,
      }}
    />
  );
}

function LoaderCard({ card, duration, index }: { card: LoaderCard; duration: number; index: number }) {
  return (
    <article
      className="rounded-3xl border border-border bg-surface p-4 shadow-sm"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <LoaderBar className={card.titleWidth} duration={duration} />

      <div className="mt-4 grid gap-2">
        {card.lineWidths.map((width, lineIndex) => (
          <LoaderBar
            key={`${width}-${lineIndex}`}
            className={width}
            duration={duration}
            delay={lineIndex * 120}
          />
        ))}
      </div>

      {card.chipCount ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: card.chipCount }).map((_, chipIndex) => (
            <LoaderBar
              key={chipIndex}
              className="h-8 w-20 rounded-full"
              duration={duration}
              delay={chipIndex * 80}
            />
          ))}
        </div>
      ) : null}

      {card.bodyHeightClassName ? (
        <div className={`mt-4 rounded-2xl bg-accent/10 ${card.bodyHeightClassName}`} />
      ) : null}
    </article>
  );
}

export function SectionSkeletons({
  headerLeftWidth,
  headerRightWidth,
  cards,
  columnsClassName = "grid gap-5 lg:grid-cols-2",
}: SectionSkeletonsProps) {
  const [duration, setDuration] = useState(1600);

  useEffect(() => {
    setDuration(getLoadDuration());
  }, []);

  const cardCount = useMemo(() => cards.length, [cards.length]);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-1 py-4">
        <LoaderBar className={headerLeftWidth} duration={duration} />
        <LoaderBar className={headerRightWidth} duration={duration} delay={90} />
      </div>

      <section className={columnsClassName}>
        {cards.slice(0, cardCount).map((card, index) => (
          <LoaderCard key={`${card.titleWidth}-${index}`} card={card} duration={duration} index={index} />
        ))}
      </section>
    </div>
  );
}
