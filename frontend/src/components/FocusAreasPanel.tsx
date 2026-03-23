import type { FocusAreas } from "@/types/interview";

type Props = {
  focus: FocusAreas;
};

function ChipList({ title, items, tone }: { title: string; items: string[]; tone: "good" | "warn" | "accent" }) {
  const toneClass =
    tone === "good"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : tone === "warn"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-100"
        : "border-violet-500/30 bg-violet-500/10 text-violet-100";

  if (!items.length) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-slate-300">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClass}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FocusAreasPanel({ focus }: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-night-800/50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Key focus areas</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <ChipList title="Strengths to lean on" items={focus.strengths ?? []} tone="good" />
        <ChipList title="Gaps to tighten" items={focus.weaknesses ?? []} tone="warn" />
        <ChipList title="Priority topics" items={focus.priorityTopics ?? []} tone="accent" />
      </div>
    </section>
  );
}
