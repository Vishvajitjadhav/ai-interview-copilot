/**
 * Themed loading state: simple crosshair-style pulse (pairs with the FOCUS aesthetic).
 */
export function AiLoadingOverlay({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/85 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full border border-violet-400/40" />
          <div className="absolute inset-2 rounded-full border-2 border-white/30" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/40" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/40" />
        </div>
        <div>
          <p className="text-lg font-medium text-white">{message}</p>
          <p className="mt-1 text-sm text-slate-400">Building your roadmap and question bank…</p>
        </div>
      </div>
    </div>
  );
}
