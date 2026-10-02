import { StyleCompassMedia } from "@/features/style-compass/media/style-compass-media";

import styles from "./style-compass.module.css";
import type {
  StyleCompassCategory,
  StyleCompassCategoryId,
  StyleCompassSelections,
} from "./types";

type StyleCompassGridProps = {
  categories: readonly StyleCompassCategory[];
  selections: StyleCompassSelections;
  activeCategoryId: StyleCompassCategoryId | null;
  mediaActive: boolean;
  onOpen: (
    categoryId: StyleCompassCategoryId,
    source: HTMLButtonElement,
  ) => void;
};

export function StyleCompassGrid({
  categories,
  selections,
  activeCategoryId,
  mediaActive,
  onOpen,
}: StyleCompassGridProps) {
  return (
    <div className={styles.grid}>
      {categories.map((category) => {
        const isActive =
          category.id === activeCategoryId;
        const selectedOptionId =
          selections[category.id];
        const selectedOption =
          category.options.find(
            (option) =>
              option.id === selectedOptionId,
          );

        return (
          <button
            key={category.id}
            type="button"
            data-style-compass-category={category.id}
            data-active={isActive}
            data-selected={Boolean(selectedOption)}
            data-texture={category.id === "texture"}
            data-tone={category.tone}
            data-shape={category.shape}
            onClick={(event) =>
              onOpen(
                category.id,
                event.currentTarget,
              )
            }
            aria-pressed={isActive}
            className={styles.category}
          >
            {selectedOption ? (
              <StyleCompassMedia
                option={selectedOption}
                fallbackTone={category.tone}
                active={mediaActive}
                className={styles.selectedVisual}
              />
            ) : null}

            <span className={styles.categoryLabel}>
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
