import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/** Consistent horizontal padding and max width for landing sections. */
export function SectionShell({ children, className = "", id }: Props) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}
