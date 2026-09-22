"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  styleCompassCategories,
} from "@/data/style-compass";
import { styleCompassConfig } from "@/data/home";

import type {
  StyleCompassCategoryId,
  StyleCompassOptionId,
  StyleCompassSelections,
} from "./types";

type CategoryGeometry = {
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius: string;
  expandedBorderRadius: string;
};

type SelectOption = (
  categoryId: StyleCompassCategoryId,
  optionId: StyleCompassOptionId,
) => void;

type UseStyleCompassExplorerArgs = {
  selections: StyleCompassSelections;
  selectOption: SelectOption;
};

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
        (currentIndex + offset) % styleCompassCategories.length
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

export function useStyleCompassExplorer({
  selections,
  selectOption,
}: UseStyleCompassExplorerArgs) {
  const compassRef = useRef<HTMLDivElement>(null);
  const closeTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const selectionDelayTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingCategoryRef =
    useRef<StyleCompassCategoryId | null>(null);

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
        borderRadius: sourceCornerRadii.join(" "),
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
      }, styleCompassConfig.explorerTransitionMs);
    },
    [
      clearPendingClose,
      clearPendingOpen,
      clearSelectionDelay,
      measureCategoryGeometry,
      startOpen,
    ],
  );

  const openCategory = useCallback(
    (
      categoryId: StyleCompassCategoryId,
      source?: HTMLButtonElement,
    ) => {
      if (displayedCategoryId) {
        if (
          displayedCategoryId === categoryId &&
          explorerOpen
        ) {
          pendingCategoryRef.current = null;
          beginClose(displayedCategoryId);
          return;
        }

        pendingCategoryRef.current = categoryId;

        if (explorerOpen) {
          beginClose(displayedCategoryId);
        }

        return;
      }

      startOpen(categoryId, source);
    },
    [
      beginClose,
      displayedCategoryId,
      explorerOpen,
      startOpen,
    ],
  );

  const closeCategory = useCallback(() => {
    if (!displayedCategoryId || !explorerOpen) {
      return;
    }

    clearSelectionDelay();
    pendingCategoryRef.current = null;
    beginClose(displayedCategoryId);
  }, [
    beginClose,
    clearSelectionDelay,
    displayedCategoryId,
    explorerOpen,
  ]);

  const selectDisplayedOption = useCallback(
    (optionId: StyleCompassOptionId) => {
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
      }, styleCompassConfig.selectionConfirmationDelayMs);
    },
    [
      beginClose,
      clearSelectionDelay,
      displayedCategoryId,
      explorerOpen,
      selectOption,
      selections,
    ],
  );

  const stepOption = useCallback(
    (direction: -1 | 1) => {
      if (!displayedCategory) {
        return;
      }

      setOptionIndex(
        (current) =>
          (current +
            direction +
            displayedCategory.options.length) %
          displayedCategory.options.length,
      );
    },
    [displayedCategory],
  );

  useEffect(() => {
    if (!displayedCategoryId || !explorerOpen) {
      return;
    }

    const categoryId = displayedCategoryId;

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
      beginClose(categoryId);
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

  return {
    compassRef,
    displayedCategoryId,
    displayedCategory,
    explorerOpen,
    optionIndex,
    collapsedBox,
    collapsedBorderRadius,
    expandedBorderRadius,
    nextUnansweredCategory,
    openCategory,
    closeCategory,
    selectDisplayedOption,
    stepOption,
  };
}
