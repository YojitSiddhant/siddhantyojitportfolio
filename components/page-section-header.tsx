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
        "flex flex-wrap items-center justify-between gap-4 border-b border-border px-1 py-4",
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
