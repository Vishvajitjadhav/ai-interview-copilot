import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CompanyInsights } from "@/components/CompanyInsights";
import { FocusAreasPanel } from "@/components/FocusAreasPanel";
import { QuestionsList } from "@/components/QuestionsList";
import { RoadmapDisplay } from "@/components/RoadmapDisplay";
import { fetchInterview } from "@/services/interviewApi";
import type { InterviewDetail } from "@/types/interview";
import { getErrorMessage } from "@/lib/errors";

export function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<InterviewDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("Missing session id");
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchInterview(Number(id));
        if (!cancelled) {
          setDetail(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(getErrorMessage(e, "Could not load this session"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center text-slate-400">Loading results…</div>
    );
  }

  if (error || !detail) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-red-300">{error ?? "Not found"}</p>
        <Link to="/dashboard" className="mt-6 inline-block text-violet-400 hover:text-violet-300">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-violet-400">Prep session</p>
          <h1 className="mt-1 text-2xl font-bold text-white md:text-3xl">
            {detail.companyName}{" "}
            <span className="text-slate-500">·</span> {detail.roleTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Time budget: {detail.timeAvailable}
            {detail.resumeFileName && (
              <>
                {" "}
                · Resume: <span className="text-slate-300">{detail.resumeFileName}</span>
              </>
            )}
          </p>
        </div>
        <Link
          to="/interview/new"
          className="shrink-0 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
        >
          New prep
        </Link>
      </div>

      <div className="space-y-10">
        <CompanyInsights detail={detail} />

        <section className="rounded-2xl border border-white/10 bg-night-800/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Preparation roadmap</h2>
          <RoadmapDisplay phases={detail.roadmap} />
        </section>

        <section className="rounded-2xl border border-white/10 bg-night-800/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Expected interview questions</h2>
          <QuestionsList questions={detail.expectedQuestions} />
        </section>

        <FocusAreasPanel focus={detail.focusAreas} />
      </div>
    </div>
  );
}
