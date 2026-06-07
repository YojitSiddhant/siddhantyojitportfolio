type TextEntry =
  | string
  | {
      icon?: string;
      label?: string;
      title?: string;
      value?: string;
      description?: string;
      name?: string;
      src?: string;
      iconClassName?: string;
      url?: string;
    };

export function toTextAreaValue(
  items: TextEntry[],
  kind: "notes" | "value-cards" | "working-style" | "stack" | "links" | "strings",
) {
  if (kind === "notes") {
    return items
      .map((item) => (typeof item === "string" ? item : `${item.icon ?? ""}|${item.label ?? ""}|${item.value ?? ""}`.trim()))
      .join("\n");
  }

  if (kind === "value-cards") {
    return items
      .map((item) => (typeof item === "string" ? item : `${item.icon ?? ""}|${item.title ?? ""}|${item.description ?? ""}`.trim()))
      .join("\n");
  }

  if (kind === "working-style") {
    return items
      .map((item) => (typeof item === "string" ? item : `${item.icon ?? ""}|${item.title ?? ""}`.trim()))
      .join("\n");
  }

  if (kind === "stack") {
    return items
      .map((item) =>
        typeof item === "string" ? item : `${item.name ?? ""}|${item.src ?? ""}|${item.iconClassName ?? ""}`.trim(),
      )
      .join("\n");
  }

  if (kind === "links") {
    return items
      .map((item) => (typeof item === "string" ? item : `${item.label ?? ""}|${item.url ?? ""}`.trim()))
      .join("\n");
  }

  return items.map((item) => (typeof item === "string" ? item : item.title ?? item.url ?? item.name ?? "")).join("\n");
}

