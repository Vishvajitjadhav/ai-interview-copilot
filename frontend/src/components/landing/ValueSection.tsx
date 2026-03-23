import { SectionShell } from "./SectionShell";

export function ValueSection() {
  return (
    <SectionShell className="py-20 md:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-950/40 via-night-900/80 to-blue-950/30 px-8 py-14 sm:px-12 md:py-16">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Stop guessing. Start preparing with clarity.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Most candidates waste time on random topics. AI Interview Copilot gives you a focused
            roadmap so you prepare exactly what matters.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
