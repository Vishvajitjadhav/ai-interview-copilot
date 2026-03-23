import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHistory } from "@/services/interviewApi";
import type { InterviewSessionSummary } from "@/types/interview";
import { getErrorMessage } from "@/lib/errors";

export function DashboardPage() {
  const [sessions, setSessions] = useState<InterviewSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchHistory();
        if (!cancelled) {
          setSessions(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(getErrorMessage(e));
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
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-slate-400">Your saved prep sessions and quick actions.</p>
        </div>
        <Link
          to="/interview/new"
          className="inline-flex justify-center rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500"
        >
          New interview prep
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-white">History</h2>

        {loading && <p className="mt-4 text-sm text-slate-500">Loading sessions…</p>}
        {error && (
          <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        {!loading && !error && sessions.length === 0 && (
          <p className="mt-4 text-sm text-slate-500">
            No sessions yet. Start your first prep run — it only takes a minute.
          </p>
        )}

        <ul className="mt-4 space-y-3">
          {sessions.map((s) => (
            <li key={s.id}>
              <Link
                to={`/interview/${s.id}`}
                className="flex flex-col rounded-xl border border-white/10 bg-night-800/40 px-4 py-4 transition hover:border-violet-500/40 hover:bg-night-800/70 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-white">{s.companyName}</p>
                  <p className="text-sm text-slate-400">{s.roleTitle}</p>
                </div>
                <div className="mt-2 text-xs text-slate-500 sm:mt-0 sm:text-right">
                  <p>{s.timeAvailable}</p>
                  <p>{new Date(s.createdAt).toLocaleString()}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
