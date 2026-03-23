import type { InterviewDetail } from "@/types/interview";

type Props = {
  detail: Pick<InterviewDetail, "companyOverview" | "hiringPsychology">;
};

export function CompanyInsights({ detail }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-2xl border border-white/10 bg-night-800/50 p-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Company overview</h2>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
          {detail.companyOverview}
        </p>
      </section>
      <section className="rounded-2xl border border-white/10 bg-night-800/50 p-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Hiring psychology</h2>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
          {detail.hiringPsychology}
        </p>
      </section>
    </div>
  );
}
