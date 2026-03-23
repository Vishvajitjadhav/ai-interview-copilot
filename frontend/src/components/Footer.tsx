export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-night-950/90 py-10 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:px-6">
        <img
          src="/logo-matchstick.png"
          alt=""
          className="h-8 w-8 rounded-md opacity-90 ring-1 ring-white/10"
        />
        <p className="max-w-md text-sm font-medium text-slate-400">
          Built for serious candidates who want real results.
        </p>
        <p className="text-xs text-slate-600">
          Made by <span className="text-slate-500">Vishvajit Jadhav</span>
        </p>
      </div>
    </footer>
  );
}
