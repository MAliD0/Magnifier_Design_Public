"use client";

import type { CSSProperties } from "react";

import { StyleCompassExplorer } from "@/components/sections/style-compass/style-compass-explorer";
import { StyleCompassGrid } from "@/components/sections/style-compass/style-compass-grid";
import { StyleCompassStatus } from "@/components/sections/style-compass/style-compass-status";
import type {
  StyleCompassAnalyzeHandler,
  StyleCompassCompleteHandler,
} from "@/components/sections/style-compass/types";
import { useStyleCompass } from "@/components/sections/style-compass/use-style-compass";
import { useStyleCompassExplorer } from "@/components/sections/style-compass/use-style-compass-explorer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { styleCompassConfig } from "@/data/home";
import { styleCompassCategories } from "@/data/style-compass";

import styles from "./style-compass.module.css";

type StyleCompassSectionProps = {
  index?: string;
  title?: string;
  onComplete?: StyleCompassCompleteHandler;
  onAnalyze?: StyleCompassAnalyzeHandler;
};

type StyleCompassCssVariables = CSSProperties & {
  "--style-compass-explorer-transition": string;
  "--style-compass-content-enter-delay": string;
  "--style-compass-content-enter-duration": string;
  "--style-compass-content-exit-duration": string;
  "--style-compass-media-close-delay": string;
  "--style-compass-media-close-duration": string;
};

const sectionStyle: StyleCompassCssVariables = {
  "--style-compass-explorer-transition":
    `${styleCompassConfig.explorerTransitionMs}ms`,
  "--style-compass-content-enter-delay":
    `${styleCompassConfig.contentEnterDelayMs}ms`,
  "--style-compass-content-enter-duration":
    `${styleCompassConfig.contentEnterDurationMs}ms`,
  "--style-compass-content-exit-duration":
    `${styleCompassConfig.contentExitDurationMs}ms`,
  "--style-compass-media-close-delay":
    `${styleCompassConfig.mediaCloseDelayMs}ms`,
  "--style-compass-media-close-duration":
    `${styleCompassConfig.mediaCloseDurationMs}ms`,
};

export function StyleCompassSection({
  index = "04",
  title = "Style Compass",
  onComplete,
  onAnalyze,
}: StyleCompassSectionProps) {
  const {
    selections,
    selectedCount,
    status,
    selectOption,
    analyze,
  } = useStyleCompass({
    onComplete,
    onAnalyze,
  });

  const explorer = useStyleCompassExplorer({
    selections,
    selectOption,
  });

  const canAnalyze =
    status === "complete" &&
    explorer.displayedCategoryId === null;

  return (
    <Section
      id="style-compass"
      variant="interactive"
      data-site-section="style-compass"
      className={styles.section}
      style={sectionStyle}
    >
      <Container>
        <SectionHeading index={index} title={title} />

        <div className={styles.layout}>
          <div
            ref={explorer.compassRef}
            className={styles.compass}
          >
            <StyleCompassGrid
              categories={styleCompassCategories}
              selections={selections}
              activeCategoryId={explorer.displayedCategoryId}
              onOpen={explorer.openCategory}
            />

            {explorer.displayedCategory ? (
              <StyleCompassExplorer
                key={explorer.displayedCategory.id}
                category={explorer.displayedCategory}
                optionIndex={explorer.optionIndex}
                open={explorer.explorerOpen}
                collapsedBox={explorer.collapsedBox}
                collapsedBorderRadius={
                  explorer.collapsedBorderRadius
                }
                expandedBorderRadius={
                  explorer.expandedBorderRadius
                }
                selectedOptionId={
                  selections[explorer.displayedCategory.id]
                }
                onSelect={explorer.selectDisplayedOption}
                onPrevious={() => explorer.stepOption(-1)}
                onNext={() => explorer.stepOption(1)}
                onClose={explorer.closeCategory}
              />
            ) : null}
          </div>

          <div className={styles.statusColumn}>
            <StyleCompassStatus
              selections={selections}
              selectedCount={selectedCount}
              status={status}
            />

            <div className={styles.actions}>
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={analyze}
                disabled={!canAnalyze}
                className={styles.analyzeButton}
                data-enabled={canAnalyze}
              >
                Analyze my style
              </button>

              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() =>
                  explorer.openCategory(
                    status === "complete"
                      ? explorer.displayedCategory?.id ??
                        styleCompassCategories[0].id
                      : explorer.nextUnansweredCategory.id,
                  )
                }
                className={styles.reviewButton}
              >
                {status === "empty"
                  ? "Explore Style Compass ↗"
                  : status === "partial"
                    ? "Continue with " +
                      explorer.nextUnansweredCategory.label +
                      " ↗"
                    : "Review selections ↗"}
              </button>
            </div>

            <p className={styles.note}>
              {status === "complete"
                ? "Review any field before analysis if you want to change the final selection set."
                : "Select one option in each field. Your progress is shown above."}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
