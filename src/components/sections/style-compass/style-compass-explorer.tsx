import {
  type MouseEvent,
  useEffect,
  useState,
} from "react";

import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ProgressBar } from "@/components/ui/progress-bar";

import styles from "./style-compass.module.css";
import type {
  StyleCompassCategory,
  StyleCompassOptionId,
} from "./types";

type StyleCompassExplorerProps = {
  category: StyleCompassCategory;
  optionIndex: number;
  open: boolean;
  collapsedBox: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  collapsedBorderRadius: string;
  expandedBorderRadius: string;
  selectedOptionId: StyleCompassOptionId | null;
  onSelect: (optionId: StyleCompassOptionId) => void;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
};

export function StyleCompassExplorer({
  category,
  optionIndex,
  open,
  collapsedBox,
  collapsedBorderRadius,
  expandedBorderRadius,
  selectedOptionId,
  onSelect,
  onPrevious,
  onNext,
  onClose,
}: StyleCompassExplorerProps) {
  const [hasOpened, setHasOpened] = useState(open);
  const option = category.options[optionIndex] ?? category.options[0];
  const isSelected = selectedOptionId === option.id;
  const closing = hasOpened && !open;

  useEffect(() => {
    if (open) {
      setHasOpened(true);
    }
  }, [open]);

  function handleActiveFieldClick(
    event: MouseEvent<HTMLDivElement>,
  ) {
    const target = event.target;

    if (
      !(target instanceof Element) ||
      target.closest(
        "button, a, input, select, textarea, [role='button']",
      )
    ) {
      return;
    }

    onClose();
  }

  return (
    <div
      onClick={handleActiveFieldClick}
      className={styles.explorer}
      data-open={open}
      data-tone={option.tone}
      style={{
        left: open ? 0 : collapsedBox.left,
        top: open ? 0 : collapsedBox.top,
        width: open ? "100%" : collapsedBox.width,
        height: open ? "100%" : collapsedBox.height,
        borderRadius: open
          ? expandedBorderRadius
          : collapsedBorderRadius,
      }}
    >
      <div
        className={styles.explorerMedia}
        data-closing={closing}
      >
        <PlaceholderImage
          key={option.id}
          label={option.label}
          tone={option.tone}
          className={styles.explorerImage}
        />
      </div>

      <div
        className={styles.explorerContent}
        data-open={open}
      >
        <p className={styles.explorerEyebrow}>
          Style Compass
        </p>

        <div className={styles.explorerBottom}>
          <div className={styles.controls}>
            <div className={styles.controlLabelGroup}>
              <span className={styles.explorerCategoryLabel}>
                {category.label}
              </span>
            </div>

            <div className={styles.controlActionsGroup}>
              <button
                type="button"
                onClick={onPrevious}
                className={styles.controlButton}
                aria-label={`Previous ${category.label} option`}
              >
                ←
              </button>
              <button
                type="button"
                onClick={onNext}
                className={styles.controlButton}
                aria-label={`Next ${category.label} option`}
              >
                →
              </button>

              <button
                type="button"
                onClick={() => onSelect(option.id)}
                aria-pressed={isSelected}
                className={styles.selectButton}
                data-selected={isSelected}
              >
                {isSelected ? "Selected ✓" : "Select"}
              </button>
            </div>
          </div>

          <div className={styles.progress}>
            <ProgressBar
              currentIndex={optionIndex}
              totalItems={category.options.length}
              ariaLabel={`${category.label} options`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
