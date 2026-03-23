import { ResumeUpload } from "./ResumeUpload";

const TIME_PRESETS = [
  { value: "", label: "Select rough timeline…" },
  { value: "1 weekend (2 days)", label: "1 weekend (~2 days)" },
  { value: "1 week part-time", label: "1 week (part-time)" },
  { value: "2 weeks part-time", label: "2 weeks (part-time)" },
  { value: "1 month", label: "About 1 month" },
  { value: "custom", label: "Custom (use box below)" },
];

export type InterviewFormValues = {
  companyName: string;
  companyWebsite: string;
  roleTitle: string;
  jobDescription: string;
  timePreset: string;
  customTime: string;
  extraContext: string;
  resume: File | null;
};

type Props = {
  values: InterviewFormValues;
  onChange: (patch: Partial<InterviewFormValues>) => void;
  errors: Partial<Record<keyof InterviewFormValues, string>>;
};

/**
 * All structured inputs for a prep session (resume + company + role + time).
 */
export function InputForm({ values, onChange, errors }: Props) {
  return (
    <div className="space-y-6">
      <ResumeUpload
        file={values.resume}
        onChange={(f) => onChange({ resume: f })}
        error={errors.resume}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Company name" error={errors.companyName}>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Stripe"
            value={values.companyName}
            onChange={(e) => onChange({ companyName: e.target.value })}
          />
        </Field>
        <Field label="Company website (optional)" error={errors.companyWebsite}>
          <input
            type="url"
            className="input-field"
            placeholder="https://"
            value={values.companyWebsite}
            onChange={(e) => onChange({ companyWebsite: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Target role" error={errors.roleTitle}>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. Backend Engineer"
          value={values.roleTitle}
          onChange={(e) => onChange({ roleTitle: e.target.value })}
        />
      </Field>

      <Field label="Job description (optional)" error={errors.jobDescription}>
        <textarea
          className="input-field min-h-[120px] resize-y"
          placeholder="Paste the JD — helps tailor questions and roadmap."
          value={values.jobDescription}
          onChange={(e) => onChange({ jobDescription: e.target.value })}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Time available" error={errors.timePreset}>
          <select
            className="input-field"
            value={values.timePreset}
            onChange={(e) => onChange({ timePreset: e.target.value })}
          >
            {TIME_PRESETS.map((o) => (
              <option key={o.value || "empty"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        {values.timePreset === "custom" && (
          <Field label="Custom time" error={errors.customTime}>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. 12 hours over 3 days"
              value={values.customTime}
              onChange={(e) => onChange({ customTime: e.target.value })}
            />
          </Field>
        )}
      </div>

      <Field label="Additional context" error={errors.extraContext}>
        <textarea
          className="input-field min-h-[100px] resize-y"
          placeholder='e.g. "Focus on DSA", "startup culture", "first FAANG loop"'
          value={values.extraContext}
          onChange={(e) => onChange({ extraContext: e.target.value })}
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
