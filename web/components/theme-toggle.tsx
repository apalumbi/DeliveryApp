"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const THEMES = [
  { value: "default", label: "Deep blue" },
  { value: "navy", label: "Navy" },
] as const;

type Theme = (typeof THEMES)[number]["value"];

/** Repaints tokenized surfaces live by setting data-theme on <html>. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "default") delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-hairline bg-card p-1 shadow-card",
        className,
      )}
    >
      <span className="px-2 text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
        Theme
      </span>
      {THEMES.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => setTheme(t.value)}
          className={cn(
            "cursor-pointer rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
            theme === t.value
              ? "bg-accent-soft text-accent-soft-ink"
              : "text-ink-muted hover:text-ink",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
