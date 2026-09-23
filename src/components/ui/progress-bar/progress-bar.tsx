"use client";

import { useEffect, useRef } from "react";
import type {
  CSSProperties,
  ReactNode,
} from "react";

import { progressBarConfig } from "./progress-bar.config";
import styles from "./progress-bar.module.css";

type ProgressBarProps = {
  currentIndex: number | null;
  totalItems: number;
  completedIndices?: readonly number[];
  ariaLabel: string;
  startLabel?: ReactNode;
  endLabel?: ReactNode;
  onSelect?: (index: number) => void;
  getItemLabel?: (index: number) => string;
  className?: string;
};

type ProgressDirection = "idle" | "forward" | "backward";

type ProgressTrackStyle = CSSProperties & {
  "--progress-count": number;
  "--progress-gap": string;
  "--progress-segment-height": string;
  "--progress-active-height": string;
  "--progress-indicator-left": string;
  "--progress-indicator-right": string;
  "--progress-motion-duration": string;
  "--progress-leading-easing": string;
  "--progress-trailing-easing": string;
};

export function ProgressBar({
  currentIndex,
  totalItems,
  completedIndices = [],
  ariaLabel,
  startLabel,
  endLabel,
  onSelect,
  getItemLabel,
  className = "",
}: ProgressBarProps) {
  const safeTotal = Math.max(totalItems, 1);
  const safeCurrent =
    currentIndex === null
      ? null
      : Math.min(Math.max(currentIndex, 0), safeTotal - 1);

  const previousIndexRef = useRef<number | null>(safeCurrent);

  let direction: ProgressDirection = "idle";
  if (
    safeCurrent !== null &&
    previousIndexRef.current !== null
  ) {
    if (safeCurrent > previousIndexRef.current) {
      direction = "forward";
    } else if (safeCurrent < previousIndexRef.current) {
      direction = "backward";
    }
  }

  useEffect(() => {
    previousIndexRef.current = safeCurrent;
  }, [safeCurrent]);

  const activeIndex = safeCurrent ?? 0;
  const gapRem = progressBarConfig.layout.gapRem;
  const indicatorLeftPercent =
    (activeIndex * 100) / safeTotal;
  const indicatorLeftGapRem =
    (activeIndex * gapRem) / safeTotal;
  const indicesAfterActive = safeTotal - activeIndex - 1;
  const indicatorRightPercent =
    (indicesAfterActive * 100) / safeTotal;
  const indicatorRightGapRem =
    (indicesAfterActive * gapRem) / safeTotal;

  const trackStyle: ProgressTrackStyle = {
    "--progress-count": safeTotal,
    "--progress-gap":
      `${progressBarConfig.layout.gapRem}rem`,
    "--progress-segment-height":
      `${progressBarConfig.layout.segmentHeightRem}rem`,
    "--progress-active-height":
      `${progressBarConfig.layout.activeHeightRem}rem`,
    "--progress-indicator-left":
      `calc(${indicatorLeftPercent}% + ${indicatorLeftGapRem}rem)`,
    "--progress-indicator-right":
      `calc(${indicatorRightPercent}% + ${indicatorRightGapRem}rem)`,
    "--progress-motion-duration":
      `${progressBarConfig.motion.durationMs}ms`,
    "--progress-leading-easing":
      progressBarConfig.motion.leadingEasing,
    "--progress-trailing-easing":
      progressBarConfig.motion.trailingEasing,
  };

  const completed = new Set(completedIndices);
  const showMeta =
    startLabel !== undefined || endLabel !== undefined;

  return (
    <div
      className={`${styles.root} ${className}`}
      data-transition-fade
      aria-label={ariaLabel}
    >
      {showMeta ? (
        <div className={styles.meta}>
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      ) : null}

      <div
        className={styles.track}
        style={trackStyle}
        data-has-current={safeCurrent !== null}
        data-has-meta={showMeta}
        data-direction={direction}
      >
        <div className={styles.items}>
          {Array.from({ length: safeTotal }, (_, index) => {
            const isCurrent = index === safeCurrent;
            const isComplete = completed.has(index);

            if (onSelect) {
              return (
                <button
                  key={index}
                  type="button"
                  className={styles.itemButton}
                  aria-label={
                    getItemLabel?.(index) ??
                    `Go to item ${index + 1}`
                  }
                  aria-current={isCurrent ? "true" : undefined}
                  onClick={() => onSelect(index)}
                >
                  <span
                    className={styles.segment}
                    data-complete={isComplete}
                  />
                </button>
              );
            }

            return (
              <span
                key={index}
                className={styles.item}
                aria-hidden="true"
              >
                <span
                  className={styles.segment}
                  data-complete={isComplete}
                />
              </span>
            );
          })}
        </div>

        <span
          className={styles.activeIndicator}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
