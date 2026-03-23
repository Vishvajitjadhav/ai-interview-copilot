type Props = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
};

const sizeMap = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-20 w-20 md:h-24 md:w-24",
};

/**
 * Matchstick logo in a rounded tile — matches the Replit-style navbar treatment.
 */
export function BrandLogo({ size = "md", showText = true }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 p-0.5 shadow-lg shadow-violet-900/40 ${sizeMap[size]}`}
      >
        <img
          src="/logo-matchstick.png"
          alt=""
          className="h-full w-full rounded-[10px] object-cover"
        />
      </div>
      {showText && (
        <span className="text-sm font-semibold tracking-tight text-white md:text-base">
          AI Interview Copilot
        </span>
      )}
    </div>
  );
}
