"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  StyleCompassAnalyzeHandler,
  StyleCompassCategoryId,
  StyleCompassCompleteHandler,
  StyleCompassCompleteSelections,
  StyleCompassOptionId,
  StyleCompassSelections,
  StyleCompassStatus,
} from "./types";

export const STYLE_COMPASS_COMPLETE_EVENT =
  "style-compass:complete";

export const STYLE_COMPASS_ANALYZE_EVENT =
  "style-compass:analyze";

const EMPTY_SELECTIONS: StyleCompassSelections = {
  colour: null,
  form: null,
  texture: null,
  feeling: null,
};

type UseStyleCompassOptions = {
  onComplete?: StyleCompassCompleteHandler;
  onAnalyze?: StyleCompassAnalyzeHandler;
};

export function useStyleCompass({
  onComplete,
  onAnalyze,
}: UseStyleCompassOptions = {}) {
  const [selections, setSelections] =
    useState<StyleCompassSelections>(EMPTY_SELECTIONS);
  const lastEmittedSignatureRef = useRef<string | null>(null);

  const selectedCount = useMemo(
    () =>
      Object.values(selections).filter(
        (selection) => selection !== null,
      ).length,
    [selections],
  );

  const status: StyleCompassStatus =
    selectedCount === 0
      ? "empty"
      : selectedCount === 4
        ? "complete"
        : "partial";

  const completeSignature =
    status === "complete"
      ? [
          selections.colour,
          selections.form,
          selections.texture,
          selections.feeling,
        ].join("|")
      : null;

  const selectOption = useCallback(
    (
      categoryId: StyleCompassCategoryId,
      optionId: StyleCompassOptionId,
    ) => {
      setSelections((current) => {
        if (current[categoryId] === optionId) {
          return current;
        }

        return {
          ...current,
          [categoryId]: optionId,
        };
      });
    },
    [],
  );

  const clearOption = useCallback(
    (categoryId: StyleCompassCategoryId) => {
      setSelections((current) => {
        if (current[categoryId] === null) {
          return current;
        }

        return {
          ...current,
          [categoryId]: null,
        };
      });
    },
    [],
  );

  const analyze = useCallback(() => {
    if (status !== "complete") {
      return;
    }

    const completeSelections =
      selections as StyleCompassCompleteSelections;

    onAnalyze?.(completeSelections);

    window.dispatchEvent(
      new CustomEvent<StyleCompassCompleteSelections>(
        STYLE_COMPASS_ANALYZE_EVENT,
        {
          detail: completeSelections,
        },
      ),
    );
  }, [onAnalyze, selections, status]);

  useEffect(() => {
    if (!completeSignature) {
      lastEmittedSignatureRef.current = null;
      return;
    }

    if (
      lastEmittedSignatureRef.current === completeSignature
    ) {
      return;
    }

    lastEmittedSignatureRef.current = completeSignature;

    const completeSelections =
      selections as StyleCompassCompleteSelections;

    onComplete?.(completeSelections);

    window.dispatchEvent(
      new CustomEvent<StyleCompassCompleteSelections>(
        STYLE_COMPASS_COMPLETE_EVENT,
        {
          detail: completeSelections,
        },
      ),
    );
  }, [completeSignature, onComplete, selections]);

  return {
    selections,
    selectedCount,
    status,
    selectOption,
    clearOption,
    analyze,
    isComplete: status === "complete",
  };
}
