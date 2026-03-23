import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export function FeatureCard({ title, description, icon }: Props) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition duration-300 hover:border-violet-500/25 hover:from-white/[0.07] hover:shadow-lg hover:shadow-violet-950/20">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-violet-300 transition duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-500/10">
        {icon ?? (
          <span className="text-lg font-semibold text-violet-400" aria-hidden>
            ·
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400 transition duration-300 group-hover:text-slate-300">
        {description}
      </p>
    </article>
  );
}
