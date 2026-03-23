import { Link } from "react-router-dom";
import { SectionShell } from "./SectionShell";

export function LandingFinalCta() {
  return (
    <SectionShell className="pb-24 pt-4 md:pb-32">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night-900/60 px-8 py-14 text-center shadow-2xl shadow-black/40 sm:px-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-600/10 via-transparent to-blue-600/5"
          aria-hidden
        />
        <div className="relative mx-auto max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Your next offer starts here.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Don&apos;t leave your interview success to chance.
          </p>
          <Link
            to="/signup"
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-violet-950/50 transition duration-200 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-900/40 active:scale-[0.98]"
          >
            Start Preparing Free →
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
