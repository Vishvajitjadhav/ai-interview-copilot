import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm, type InterviewFormValues } from "@/components/InputForm";
import { AiLoadingOverlay } from "@/components/AiLoadingOverlay";
import { analyzeInterview } from "@/services/interviewApi";
import { getErrorMessage } from "@/lib/errors";

const initialValues: InterviewFormValues = {
  companyName: "",
  companyWebsite: "",
  roleTitle: "",
  jobDescription: "",
  timePreset: "",
  customTime: "",
  extraContext: "",
  resume: null,
};

export function InterviewFormPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<InterviewFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof InterviewFormValues, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function patchValues(patch: Partial<InterviewFormValues>) {
    setValues((v) => ({ ...v, ...patch }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof InterviewFormValues, string>> = {};
    if (!values.resume) {
      next.resume = "Please upload a PDF resume.";
    }
    if (!values.companyName.trim()) {
      next.companyName = "Company name is required.";
    }
    if (!values.roleTitle.trim()) {
      next.roleTitle = "Role is required.";
    }
    if (!values.timePreset) {
      next.timePreset = "Select how much time you have.";
    }
    if (values.timePreset === "custom" && !values.customTime.trim()) {
      next.customTime = "Describe your available time (e.g. 12 hours over 3 days).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function buildTimeAvailable(): string {
    if (values.timePreset === "custom") {
      return values.customTime.trim();
    }
    return values.timePreset;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate() || !values.resume) {
      return;
    }
    setLoading(true);
    try {
      const detail = await analyzeInterview({
        resume: values.resume,
        companyName: values.companyName.trim(),
        companyWebsite: values.companyWebsite.trim() || undefined,
        roleTitle: values.roleTitle.trim(),
        jobDescription: values.jobDescription.trim() || undefined,
        timeAvailable: buildTimeAvailable(),
        extraContext: values.extraContext.trim() || undefined,
      });
      navigate(`/interview/${detail.sessionId}`, { replace: true });
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <AiLoadingOverlay message="Analyzing your profile…" />}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-white">Interview prep</h1>
        <p className="mt-2 text-slate-400">
          Tell us where you are interviewing — we tailor the roadmap to the company, role, and your resume.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <InputForm values={values} onChange={patchValues} errors={errors} />

          {submitError && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500 disabled:opacity-60 sm:w-auto sm:px-12"
          >
            Generate roadmap
          </button>
        </form>
      </div>
    </>
  );
}
