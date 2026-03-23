import { useRef } from "react";

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

export function ResumeUpload({ file, onChange, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">Resume (PDF)</label>
      <div
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-8 transition hover:border-violet-400/50 hover:bg-white/[0.02] ${
          error ? "border-red-400/60" : "border-white/20"
        }`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            onChange(f);
          }}
        />
        <p className="text-sm text-slate-400">
          {file ? (
            <span className="text-violet-300">{file.name}</span>
          ) : (
            <>Click to upload your resume PDF</>
          )}
        </p>
        <p className="mt-1 text-xs text-slate-500">Max 10 MB · text-based PDFs work best</p>
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
