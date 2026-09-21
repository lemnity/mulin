import type { ReactNode } from "react";

export function SectionHeading({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-lg font-bold text-ink">
      <span className="text-blue">{icon}</span>
      {children}
    </h2>
  );
}
