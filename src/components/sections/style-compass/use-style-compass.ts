"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { createEmptyStyleCompassSelections } from "@/features/style-compass/domain/validate-style-compass";
import {
  readStyleCompassSession,
  writeStyleCompassSession,
} from "@/features/style-compass/state/style-compass-session";

import type {
  StyleCompassAnalyzeHandler,
  StyleCompassCategoryId,
  StyleCompassCompleteHandler,
  StyleCompassCompleteSelections,
  StyleCompassOptionId,
  StyleCompassResult,
  StyleCompassSelections,
  StyleCompassStatus,
} from "./types";

export const STYLE_COMPASS_COMPLETE_EVENT =
  "style-compass:complete";

export const STYLE_COMPASS_ANALYZE_EVENT =
  "style-compass:analyze";

type UseStyleCompassOptions = {
  onComplete?: StyleCompassCompleteHandler;
  onAnalyze?: StyleCompassAnalyzeHandler;
};

export function useStyleCompass({
  onComplete,
  onAnalyze,
}: UseStyleCompassOptions = {}) {
  const [selections, setSelections] =
    useState<StyleCompassSelections>(
      createEmptyStyleCompassSelections,
    );
  const [sessionReady, setSessionReady] =
    useState(false);
  const lastEmittedSignatureRef =
    useRef<string | null>(null);

  useEffect(() => {
    const restored = readStyleCompassSession();

    if (restored) {
      setSelections(restored);
    }

    setSessionReady(true);
  }, []);

  useEffect(() => {
    if (!sessionReady) {
      return;
    }

    writeStyleCompassSession(selections);
  }, [selections, sessionReady]);

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

  const analyze = useCallback(async () => {
    if (status !== "complete") {
      return null;
    }

    const completeSelections =
      selections as StyleCompassCompleteSelections;
    const { calculateStyleDirection } =
      await import(
        "@/features/style-compass/domain/calculate-style-direction"
      );
    const result: StyleCompassResult =
      calculateStyleDirection(
        completeSelections,
      );

    onAnalyze?.(result);

    window.dispatchEvent(
      new CustomEvent<StyleCompassResult>(
        STYLE_COMPASS_ANALYZE_EVENT,
        {
          detail: result,
        },
      ),
    );

    return result;
  }, [onAnalyze, selections, status]);

  useEffect(() => {
    if (!completeSignature) {
      lastEmittedSignatureRef.current = null;
      return;
    }

    if (
      lastEmittedSignatureRef.current ===
      completeSignature
    ) {
      return;
    }

    lastEmittedSignatureRef.current =
      completeSignature;

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
  }, [
    completeSignature,
    onComplete,
    selections,
  ]);

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
