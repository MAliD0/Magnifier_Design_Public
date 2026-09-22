import { ProgressBar } from "@/components/ui/progress-bar";
import { styleCompassCategories } from "@/data/style-compass";

import styles from "./style-compass.module.css";
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
  const completedIndices = styleCompassCategories.flatMap(
    (category, index) =>
      selections[category.id] ? [index] : [],
  );
  const currentIndex = Math.min(
    selectedCount,
    styleCompassCategories.length - 1,
  );

  return (
    <>
      <p className={styles.statusEyebrow}>
        Magnifier Style Compass
      </p>

      <h2 className={styles.statusTitle}>
        {stateCopy.title}
      </h2>

      <p className={styles.statusDescription}>
        {stateCopy.description}
      </p>

      <div className={styles.statusProgress}>
        <ProgressBar
          currentIndex={currentIndex}
          totalItems={styleCompassCategories.length}
          completedIndices={completedIndices}
          ariaLabel={
            String(selectedCount) +
            " of 4 Style Compass fields selected"
          }
          startLabel={stateCopy.progressLabel}
          endLabel={
            String(selectedCount).padStart(2, "0") + " / 04"
          }
        />
      </div>
    </>
  );
}
