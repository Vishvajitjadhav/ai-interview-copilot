import { SectionShell } from "./SectionShell";

const STEPS = [
  { step: 1, title: "Upload Your Resume" },
  { step: 2, title: "Add Company & Role" },
  { step: 3, title: "Get Your AI Roadmap" },
] as const;

export function HowItWorks() {
  return (
    <SectionShell className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Get interview-ready in 3 simple steps
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-4xl">
        {/* Connector line — desktop only */}
        <div
          className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
          aria-hidden
        />

        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map(({ step, title }) => (
            <li key={step} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/40 to-indigo-600/30 text-lg font-bold text-white shadow-lg shadow-violet-950/40 ring-4 ring-night-950">
                {step}
              </div>
              <p className="mt-5 text-base font-medium text-white">{title}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
