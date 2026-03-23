import type { RoadmapPhase } from "@/types/interview";

type Props = {
  phases: RoadmapPhase[];
};

export function RoadmapDisplay({ phases }: Props) {
  if (!phases.length) {
    return (
      <p className="text-sm text-slate-500">No roadmap phases returned — try regenerating with more context.</p>
    );
  }

  return (
    <ol className="space-y-4">
      {phases.map((phase, index) => (
        <li
          key={`${phase.title}-${index}`}
          className="relative rounded-2xl border border-white/10 bg-night-800/40 p-5 pl-12"
        >
          <span className="absolute left-4 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600/30 text-xs font-bold text-violet-200">
            {index + 1}
          </span>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold text-white">{phase.title}</h3>
            <span className="text-xs font-medium uppercase tracking-wide text-violet-300/90">
              {phase.timeframe}
            </span>
          </div>
          {phase.focus && (
            <p className="mt-1 text-sm text-slate-400">
              <span className="text-slate-500">Focus:</span> {phase.focus}
            </p>
          )}
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-300">
            {phase.tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
