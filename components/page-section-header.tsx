import type { CSSProperties, ReactNode } from "react";

type PageSectionHeaderProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function PageSectionHeader({ left, right, className = "", style }: PageSectionHeaderProps) {
  return (
    <div
      className={[
        "flex flex-col gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {left}
      {right}
    </div>
  );
}
