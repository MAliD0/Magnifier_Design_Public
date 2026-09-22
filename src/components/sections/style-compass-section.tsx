"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { StyleCompassExplorer } from "@/components/sections/style-compass/style-compass-explorer";
import { StyleCompassGrid } from "@/components/sections/style-compass/style-compass-grid";
import { StyleCompassStatus } from "@/components/sections/style-compass/style-compass-status";
import type {
  StyleCompassAnalyzeHandler,
  StyleCompassCategoryId,
  StyleCompassCompleteHandler,
  StyleCompassOptionId,
  StyleCompassSelections,
} from "@/components/sections/style-compass/types";
import { useStyleCompass } from "@/components/sections/style-compass/use-style-compass";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { styleCompassCategories } from "@/data/style-compass";

type StyleCompassSectionProps = {
  index?: string;
  title?: string;
  onComplete?: StyleCompassCompleteHandler;
  onAnalyze?: StyleCompassAnalyzeHandler;
};

type CategoryGeometry = {
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius: string;
  expandedBorderRadius: string;
};

const EXPLORER_TRANSITION_MS = 560;
const SELECTION_CONFIRMATION_DELAY_MS = 300;

function getNextUnansweredCategory(
  currentCategoryId: StyleCompassCategoryId,
  selections: StyleCompassSelections,
) {
  const currentIndex = styleCompassCategories.findIndex(
    (category) => category.id === currentCategoryId,
  );

  for (
    let offset = 1;
    offset <= styleCompassCategories.length;
    offset += 1
  ) {
    const category =
      styleCompassCategories[
        (currentIndex + offset) %
          styleCompassCategories.length
      ];

    if (selections[category.id] === null) {
      return category;
    }
  }

  return null;
}

function visibleCornerRadius(
  value: string,
  width: number,
  height: number,
  scale: number,
) {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    return value;
  }

  return `${Math.min(parsed, width, height) * scale}px`;
}

export function StyleCompassSection({
  index = "04",
  title = "Style Compass",
  onComplete,
  onAnalyze,
}: StyleCompassSectionProps) {
  const compassRef = useRef<HTMLDivElement>(null);
  const closeTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const selectionDelayTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingCategoryRef =
    useRef<StyleCompassCategoryId | null>(null);

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

  const [displayedCategoryId, setDisplayedCategoryId] =
    useState<StyleCompassCategoryId | null>(null);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [optionIndex, setOptionIndex] = useState(0);
  const [collapsedBox, setCollapsedBox] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [collapsedBorderRadius, setCollapsedBorderRadius] =
    useState("0");
  const [expandedBorderRadius, setExpandedBorderRadius] =
    useState("0 0 0 0");

  const displayedCategory =
    styleCompassCategories.find(
      (category) => category.id === displayedCategoryId,
    ) ?? null;

  const nextUnansweredCategory =
    styleCompassCategories.find(
      (category) => selections[category.id] === null,
    ) ?? styleCompassCategories[0];

  const clearPendingClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const clearPendingOpen = useCallback(() => {
    if (openFrameRef.current !== null) {
      cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
  }, []);

  const clearSelectionDelay = useCallback(() => {
    if (selectionDelayTimerRef.current) {
      clearTimeout(selectionDelayTimerRef.current);
      selectionDelayTimerRef.current = null;
    }
  }, []);

  const measureCategoryGeometry = useCallback(
    (
      categoryId: StyleCompassCategoryId,
      source?: HTMLButtonElement,
    ): CategoryGeometry | null => {
      const compass = compassRef.current;

      if (!compass) {
        return null;
      }

      const sourceButton =
        source ??
        compass.querySelector<HTMLButtonElement>(
          `[data-style-compass-category="${categoryId}"]`,
        );

      if (!sourceButton) {
        return null;
      }

      const compassRect = compass.getBoundingClientRect();
      const sourceRect = sourceButton.getBoundingClientRect();
      const sourceStyle = window.getComputedStyle(sourceButton);
      const visualScale =
        sourceButton.offsetWidth === 0
          ? 1
          : sourceRect.width / sourceButton.offsetWidth;

      const sourceCornerRadii = [
        sourceStyle.borderTopLeftRadius,
        sourceStyle.borderTopRightRadius,
        sourceStyle.borderBottomRightRadius,
        sourceStyle.borderBottomLeftRadius,
      ].map((radius) =>
        visibleCornerRadius(
          radius,
          sourceButton.offsetWidth,
          sourceButton.offsetHeight,
          visualScale,
        ),
      );

      const borderRadius = sourceCornerRadii.join(" ");

      const formButton =
        compass.querySelector<HTMLButtonElement>(
          '[data-style-compass-category="form"]',
        );
      const feelingButton =
        compass.querySelector<HTMLButtonElement>(
          '[data-style-compass-category="feeling"]',
        );

      let expandedRadius = "0 0 0 0";

      if (formButton && feelingButton) {
        const topRightRadius = Math.min(
          formButton.offsetWidth,
          formButton.offsetHeight,
        );
        const feelingStyle = window.getComputedStyle(feelingButton);

        expandedRadius =
          `0 ${topRightRadius}px ` +
          `${feelingStyle.borderBottomRightRadius} 0`;
      }

      return {
        left: sourceRect.left - compassRect.left,
        top: sourceRect.top - compassRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
        borderRadius,
        expandedBorderRadius: expandedRadius,
      };
    },
    [],
  );

  const startOpen = useCallback(
    (
      categoryId: StyleCompassCategoryId,
      source?: HTMLButtonElement,
    ) => {
      clearPendingClose();
      clearPendingOpen();
      clearSelectionDelay();

      const geometry = measureCategoryGeometry(
        categoryId,
        source,
      );

      if (geometry) {
        setCollapsedBox({
          left: geometry.left,
          top: geometry.top,
          width: geometry.width,
          height: geometry.height,
        });
        setCollapsedBorderRadius(geometry.borderRadius);
        setExpandedBorderRadius(
          geometry.expandedBorderRadius,
        );
      }

      const category = styleCompassCategories.find(
        (item) => item.id === categoryId,
      );
      const selectedOptionId = selections[categoryId];
      const selectedIndex = category?.options.findIndex(
        (option) => option.id === selectedOptionId,
      );

      setOptionIndex(
        selectedIndex !== undefined && selectedIndex >= 0
          ? selectedIndex
          : 0,
      );
      setDisplayedCategoryId(categoryId);
      setExplorerOpen(false);

      openFrameRef.current = requestAnimationFrame(() => {
        setExplorerOpen(true);
        openFrameRef.current = null;
      });
    },
    [
      clearPendingClose,
      clearPendingOpen,
      clearSelectionDelay,
      measureCategoryGeometry,
      selections,
    ],
  );

  const beginClose = useCallback(
    (categoryId: StyleCompassCategoryId) => {
      clearPendingOpen();
      clearPendingClose();
      clearSelectionDelay();

      // Measure again while the source tile is no longer hovered.
      // Opening uses the hovered rectangle; closing returns to the
      // stable resting rectangle.
      const restingGeometry =
        measureCategoryGeometry(categoryId);

      if (restingGeometry) {
        setCollapsedBox({
          left: restingGeometry.left,
          top: restingGeometry.top,
          width: restingGeometry.width,
          height: restingGeometry.height,
        });
        setCollapsedBorderRadius(
          restingGeometry.borderRadius,
        );
      }

      setExplorerOpen(false);

      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null;
        setDisplayedCategoryId(null);

        const pendingCategory =
          pendingCategoryRef.current;
        pendingCategoryRef.current = null;

        if (!pendingCategory) {
          return;
        }

        openFrameRef.current = requestAnimationFrame(() => {
          openFrameRef.current = null;
          startOpen(pendingCategory);
        });
      }, EXPLORER_TRANSITION_MS);
    },
    [
      clearPendingClose,
      clearPendingOpen,
      clearSelectionDelay,
      measureCategoryGeometry,
      startOpen,
    ],
  );

  function openCategory(
    categoryId: StyleCompassCategoryId,
    source?: HTMLButtonElement,
  ) {
    if (displayedCategoryId) {
      if (
        displayedCategoryId === categoryId &&
        explorerOpen
      ) {
        return;
      }

      // Never swap category geometry while an explorer is
      // animating. Keep only the latest requested category and
      // open it after the current explorer has fully collapsed.
      pendingCategoryRef.current = categoryId;

      if (explorerOpen) {
        beginClose(displayedCategoryId);
      }

      return;
    }

    startOpen(categoryId, source);
  }

  function closeCategory() {
    if (!displayedCategoryId || !explorerOpen) {
      return;
    }

    clearSelectionDelay();
    pendingCategoryRef.current = null;
    beginClose(displayedCategoryId);
  }

  function handleSelectOption(optionId: StyleCompassOptionId) {
    if (!displayedCategoryId || !explorerOpen) {
      return;
    }

    const categoryId = displayedCategoryId;

    clearSelectionDelay();
    selectOption(categoryId, optionId);

    const nextSelections: StyleCompassSelections = {
      ...selections,
      [categoryId]: optionId,
    };
    const nextCategory = getNextUnansweredCategory(
      categoryId,
      nextSelections,
    );

    pendingCategoryRef.current = null;

    selectionDelayTimerRef.current = setTimeout(() => {
      selectionDelayTimerRef.current = null;
      pendingCategoryRef.current = nextCategory?.id ?? null;
      beginClose(categoryId);
    }, SELECTION_CONFIRMATION_DELAY_MS);
  }

  function stepOption(direction: -1 | 1) {
    if (!displayedCategory) {
      return;
    }

    setOptionIndex(
      (current) =>
        (current + direction + displayedCategory.options.length) %
        displayedCategory.options.length,
    );
  }

  useEffect(() => {
    if (!displayedCategoryId || !explorerOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (
        !(target instanceof Node) ||
        !compassRef.current ||
        compassRef.current.contains(target)
      ) {
        return;
      }

      pendingCategoryRef.current = null;
      beginClose(displayedCategoryId);
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [
    beginClose,
    displayedCategoryId,
    explorerOpen,
  ]);

  useEffect(
    () => () => {
      clearPendingClose();
      clearPendingOpen();
      clearSelectionDelay();
      pendingCategoryRef.current = null;
    },
    [
      clearPendingClose,
      clearPendingOpen,
      clearSelectionDelay,
    ],
  );

  return (
    <Section
      id="style-compass"
      className="scroll-mt-24 bg-background text-foreground transition-colors duration-200"
    >
      <Container>
        <SectionHeading
          index={index}
          title={title}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(20rem,1.08fr)] lg:items-center xl:gap-16">
          <div
            ref={compassRef}
            className="relative aspect-[6/5] min-h-0 overflow-visible"
          >
            <StyleCompassGrid
              categories={styleCompassCategories}
              selections={selections}
              activeCategoryId={displayedCategoryId}
              onOpen={openCategory}
            />

            {displayedCategory ? (
              <StyleCompassExplorer
                key={displayedCategory.id}
                category={displayedCategory}
                optionIndex={optionIndex}
                open={explorerOpen}
                collapsedBox={collapsedBox}
                collapsedBorderRadius={collapsedBorderRadius}
                expandedBorderRadius={expandedBorderRadius}
                selectedOptionId={selections[displayedCategory.id]}
                onSelect={handleSelectOption}
                onPrevious={() => stepOption(-1)}
                onNext={() => stepOption(1)}
                onClose={closeCategory}
              />
            ) : null}
          </div>

          <div className="max-w-2xl lg:pl-4">
            <StyleCompassStatus
              selections={selections}
              selectedCount={selectedCount}
              status={status}
            />

            <div className="mt-6 flex flex-wrap items-center gap-5 sm:gap-6">
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={analyze}
                disabled={
                  status !== "complete" ||
                  displayedCategoryId !== null
                }
                className={
                  status === "complete" &&
                  displayedCategoryId === null
                    ? "select-none border border-foreground px-5 py-3 text-xs font-medium uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                    : "cursor-not-allowed select-none border border-foreground/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.08em] text-foreground/30"
                }
              >
                Analyze my style
              </button>

              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() =>
                  openCategory(
                    status === "complete"
                      ? displayedCategory?.id ??
                          styleCompassCategories[0].id
                      : nextUnansweredCategory.id,
                  )
                }
                className="select-none border-b border-foreground/65 pb-1 text-xs font-medium tracking-[0.04em] transition-opacity hover:opacity-60"
              >
                {status === "empty"
                  ? "Explore Style Compass ↗"
                  : status === "partial"
                    ? "Continue with " +
                      nextUnansweredCategory.label +
                      " ↗"
                    : "Review selections ↗"}
              </button>
            </div>

            <p className="mt-5 text-xs leading-5 text-muted">
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
