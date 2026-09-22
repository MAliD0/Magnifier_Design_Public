import { styleCompassCategories } from "@/data/style-compass";

import type {
  StyleCompassSelections,
  StyleCompassStatus,
} from "./types";

type StyleCompassStatusProps = {
  selections: StyleCompassSelections;
  selectedCount: number;
  status: StyleCompassStatus;
};

const copy = {
  empty: {
    title: "Find the thread in what you love.",
    description:
      "Drawn to several styles? Explore the colours, materials and forms you keep coming back to, and find a starting direction for your space.",
    progressLabel: "Ready to explore",
  },
  partial: {
    title: "Your direction is taking shape.",
    description:
      "Your choices are being collected. Continue through the remaining fields to build a complete visual direction.",
    progressLabel: "Preferences collected",
  },
  complete: {
    title: "Your Style Compass is complete.",
    description:
      "All four preference fields are answered. You can now analyse the complete selection set.",
    progressLabel: "Ready to analyse",
  },
} as const;

export function StyleCompassStatus({
  selections,
  selectedCount,
  status,
}: StyleCompassStatusProps) {
  const stateCopy = copy[status];

  return (
    <>
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
        Magnifier Style Compass
      </p>

      <h2 className="mt-5 max-w-[12ch] text-4xl font-normal leading-[1.02] tracking-[-0.035em] sm:text-5xl xl:text-6xl">
        {stateCopy.title}
      </h2>

      <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">
        {stateCopy.description}
      </p>

      <div className="mt-8 border-y border-border py-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            {stateCopy.progressLabel}
          </p>
          <p className="text-xs tabular-nums text-muted">
            {String(selectedCount).padStart(2, "0")} / 04
          </p>
        </div>

        <div
          className="mt-4 grid grid-cols-4 gap-1.5"
          aria-label={
            String(selectedCount) +
            " of 4 Style Compass fields selected"
          }
        >
          {styleCompassCategories.map((category) => (
            <span
              key={category.id}
              className={
                selections[category.id]
                  ? "h-0.5 bg-foreground transition-colors duration-300"
                  : "h-0.5 bg-foreground/20 transition-colors duration-300"
              }
            />
          ))}
        </div>
      </div>

    </>
  );
}
