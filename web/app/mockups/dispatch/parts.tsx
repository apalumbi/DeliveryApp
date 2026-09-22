import type { ReactNode } from "react";

import { AlertIcon, CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

import { DISPATCHER, NAV, SIZES } from "./data";

/**
 * The console's chrome and primitives. Every screen is a ConsoleShell —
 * sidebar, header, scrolling body — so the frames read as one application.
 */
export function ConsoleShell({
  title,
  note,
  active,
  actions,
  children,
}: {
  title: string;
  note?: string;
  active: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full bg-surface font-sans text-ink">
      <aside className="flex w-50 shrink-0 flex-col border-r border-hairline bg-card-muted px-3 py-4">
        <div className="flex items-center gap-2 px-2 pb-6">
          <div className="flex h-7 w-7 items-center justify-center rounded-control bg-accent text-[11px] font-semibold text-accent-ink">
            D
          </div>
          <span className="text-[13px] font-semibold tracking-tight">
            Dispatch
          </span>
        </div>

        <nav className="space-y-0.5">
          {NAV.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center justify-between rounded-control px-2.5 py-2 text-[12.5px]",
                item.label === active
                  ? "bg-card font-medium text-ink shadow-card"
                  : "text-ink-muted",
              )}
            >
              <span>{item.label}</span>
              {item.badge ? (
                <span className="text-[11px] text-ink-faint tabular-nums">
                  {item.badge}
                </span>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t border-hairline-soft px-2 pt-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-[10.5px] font-semibold text-accent-soft-ink">
            {DISPATCHER.initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-[12px] font-medium">
              {DISPATCHER.name}
            </div>
            <div className="text-[11px] text-ink-faint">Dispatcher</div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-3.5">
          <div className="min-w-0">
            <h1 className="truncate text-[14px] font-semibold tracking-tight">
              {title}
            </h1>
            {note ? (
              <p className="mt-0.5 truncate text-[11.5px] text-ink-muted">
                {note}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export function Th({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-3.5 py-2 text-left text-[10.5px] font-semibold tracking-widest text-ink-faint uppercase",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("px-3.5 py-2 align-middle", className)}>{children}</td>
  );
}

/** A band: numbered step header, optional status, content. */
export function Band({
  title,
  status,
  children,
  className,
}: {
  title: string;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-card border border-hairline bg-card shadow-card",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-hairline-soft bg-card-muted px-3.5 py-2">
        <span className="text-[10.5px] font-semibold tracking-widest text-ink-faint uppercase">
          {title}
        </span>
        {status}
      </div>
      <div className="px-3.5 py-3">{children}</div>
    </section>
  );
}

/** A card with a quiet uppercase header — the console's panel unit. */
export function Panel({
  title,
  note,
  children,
  className,
}: {
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-hairline bg-card shadow-card",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-hairline-soft bg-card-muted px-3.5 py-2.5">
        <span className="text-[10.5px] font-semibold tracking-widest text-ink-faint uppercase">
          {title}
        </span>
        {note ? (
          <span className="text-[11.5px] text-ink-faint">{note}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/** A read-only field: an input the mockup never has to wire up. */
export function Field({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-control border border-hairline bg-card px-2.5 py-1.5 text-[12.5px] text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A label/value row — quotes, price breakdowns, summaries. */
export function Row({
  label,
  value,
  hint,
  strong,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span
        className={cn(
          "text-[12.5px]",
          strong ? "font-semibold text-ink" : "text-ink-muted",
        )}
      >
        {label}
        {hint ? (
          <span className="ml-2 text-[11px] text-ink-faint">{hint}</span>
        ) : null}
      </span>
      <span
        className={cn(
          "tabular-nums",
          strong
            ? "text-[14px] font-semibold text-ink"
            : "text-[12.5px] text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}

/** A fee line: editable-looking, with the distance or reason beside the label. */
export function PriceLine({
  label,
  value,
  hint,
  input,
}: {
  label: string;
  value: string;
  hint?: string;
  input?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <span className="truncate text-[11.5px] text-ink-muted">
        {label}
        {hint ? (
          <span className="ml-1.5 text-[10.5px] text-ink-faint">{hint}</span>
        ) : null}
      </span>
      {input ? (
        <Field className="w-20 px-2 py-1 text-right text-[12px] tabular-nums">
          {value}
        </Field>
      ) : (
        <span className="text-[12px] text-ink tabular-nums">{value}</span>
      )}
    </div>
  );
}

export type CheckState = "pass" | "warn" | "fail" | "todo";

const CHECK_STYLES: Record<CheckState, string> = {
  pass: "bg-success-bg text-success-ink",
  warn: "bg-warning-bg text-warning-ink",
  fail: "bg-danger-bg text-danger-ink",
  todo: "bg-sunken text-ink-faint",
};

export function CheckDot({ state }: { state: CheckState }) {
  return (
    <span
      className={cn(
        "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full",
        CHECK_STYLES[state],
      )}
    >
      {state === "pass" ? (
        <CheckIcon className="h-2.5 w-2.5" />
      ) : state === "todo" ? (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      ) : (
        <AlertIcon className="h-2.5 w-2.5" />
      )}
    </span>
  );
}

/** One verification check — the dispatcher's actual unit of work. */
export function CheckRow({
  state,
  label,
  detail,
  children,
}: {
  state: CheckState;
  label: string;
  detail?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 border-t border-hairline-soft py-2.5 first:border-t-0 first:pt-1">
      <CheckDot state={state} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[12.5px] font-medium text-ink">{label}</span>
        </div>
        {detail ? (
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-muted">
            {detail}
          </p>
        ) : null}
        {children ? <div className="mt-2">{children}</div> : null}
      </div>
    </div>
  );
}

/** Car · Pickup · Truck — the delivery size the fee is keyed to. */
export function SizePicker({
  selected,
  hint,
}: {
  selected: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex gap-1 rounded-control border border-hairline bg-card-muted p-1">
        {SIZES.map((size) => (
          <span
            key={size}
            className={cn(
              "flex-1 rounded-md px-2 py-1.5 text-center text-[11.5px] font-medium",
              size === selected
                ? "bg-card text-ink shadow-card"
                : "text-ink-muted",
            )}
          >
            {size}
          </span>
        ))}
      </div>
      {hint ? (
        <p className="mt-1.5 text-[11px] leading-relaxed text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
