import type { ExpectedQuestions } from "@/types/interview";

type Props = {
  questions: ExpectedQuestions;
};

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) {
    return null;
  }
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-300/90">{title}</h3>
      <ul className="space-y-2">
        {items.map((q) => (
          <li
            key={q}
            className="rounded-lg border border-white/10 bg-night-900/60 px-4 py-3 text-sm text-slate-200"
          >
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function QuestionsList({ questions }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <List title="Technical" items={questions.technical ?? []} />
      <List title="HR / behavioral" items={questions.behavioral ?? []} />
    </div>
  );
}
