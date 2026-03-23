import { Link } from "react-router-dom";

export function LandingHero() {
  return (
    <div className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Soft orbs — premium SaaS depth without heavy assets */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-blue-500/15 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[80px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs font-medium tracking-wide text-violet-200/90 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
          </span>
          Powered by advanced LLMs
        </p>

        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
          Dominate your next interview with{" "}
          <span className="gradient-text font-semibold">AI intelligence</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-slate-200 sm:text-xl">
          Prepare smarter. Interview better. Get hired.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-[1.05rem]">
          Upload your resume, add your target company and role, and get a personalized, time-based
          preparation roadmap, expected questions, and deep insights into what interviewers are
          actually looking for.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-950/50 transition duration-200 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-900/40 active:scale-[0.98]"
          >
            Start Preparing Free →
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.03] px-8 py-3.5 text-base font-semibold text-slate-100 backdrop-blur-sm transition duration-200 hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.98]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
