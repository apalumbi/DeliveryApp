import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertIcon, PinIcon } from "@/components/ui/icons";

import { DRIVER, POSTINGS, type Posting } from "./data";

function PostingCard({ posting }: { posting: Posting }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[19px] font-semibold tracking-tight tabular-nums">
            {posting.payout}
          </div>
          <div className="mt-0.5 text-[11.5px] text-ink-faint">Your payout</div>
        </div>
        <span className="text-[11.5px] text-ink-faint">{posting.posted}</span>
      </div>

      <div className="mt-3.5 border-t border-hairline-soft pt-3">
        <div className="flex items-start gap-2">
          <PinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" />
          <div className="min-w-0">
            <div className="text-[13px] font-medium">
              {posting.retailer} · {posting.store}
            </div>
            <div className="mt-0.5 text-[12px] text-ink-muted">
              {posting.address}
            </div>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <Badge tone="neutral" bordered>
            {posting.items} items
          </Badge>
          <Badge tone="accent" bordered>
            {posting.note}
          </Badge>
        </div>
      </div>

      <div className="mt-3.5 flex gap-2">
        <Button size="md" className="flex-1">
          Accept
        </Button>
        <Button intent="secondary" size="md" className="flex-1">
          Decline
        </Button>
      </div>
    </Card>
  );
}

function BoardHeader({ count }: { count: number }) {
  return (
    <header className="flex items-start justify-between gap-3 px-5 pt-6 pb-4">
      <div>
        <h1 className="text-[19px] font-semibold tracking-tight">Open jobs</h1>
        <p className="mt-1 text-[12.5px] text-ink-muted">
          {count} available · {DRIVER.name}
        </p>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-[12px] font-semibold text-accent-soft-ink">
        {DRIVER.initials}
      </div>
    </header>
  );
}

function BoardFooter() {
  return (
    <p className="px-5 pt-4 pb-6 text-[11.5px] leading-relaxed text-ink-faint">
      New postings text you too. The customer&apos;s address and drop-off notes
      stay hidden until you accept — the board never shows them.
    </p>
  );
}

export function JobBoard() {
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <BoardHeader count={POSTINGS.length} />
      <section className="flex-1 space-y-3 px-5">
        {POSTINGS.map((posting) => (
          <PostingCard key={posting.number} posting={posting} />
        ))}
      </section>
      <BoardFooter />
    </div>
  );
}

export function JobBoardTaken() {
  const [lost, ...rest] = POSTINGS;
  return (
    <div className="flex min-h-full flex-col bg-surface font-sans text-ink">
      <BoardHeader count={rest.length} />
      <section className="px-5">
        <div className="flex items-start gap-2.5 rounded-card border border-hairline bg-danger-bg px-3.5 py-3">
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-danger-ink" />
          <p className="text-[12.5px] leading-relaxed text-danger-ink">
            Job {lost.number} was taken by another driver just now. First come,
            first served — this board is up to date.
          </p>
        </div>
      </section>
      <section className="mt-3 flex-1 space-y-3 px-5">
        {rest.map((posting) => (
          <PostingCard key={posting.number} posting={posting} />
        ))}
      </section>
      <BoardFooter />
    </div>
  );
}
