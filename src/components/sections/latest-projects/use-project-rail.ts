"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import { latestProjectsConfig } from "@/data/home";

import type { LatestProjectItem } from "./types";

export type RailProject = {
  project: LatestProjectItem;
  projectIndex: number;
  copyIndex: number;
};

type ProgrammaticTarget = {
  projectIndex: number;
  renderIndex: number;
};

const RAIL_COPY_COUNT = latestProjectsConfig.railCopyCount;
const CENTER_COPY_INDEX = Math.floor(RAIL_COPY_COUNT / 2);
const SCROLL_SETTLE_DELAY_MS =
  latestProjectsConfig.scrollSettleDelayMs;

type UseProjectRailArgs = {
  projects: readonly LatestProjectItem[];
  activeIndex: number;
  onSelect: (projectIndex: number) => boolean;
};

export function useProjectRail({
  projects,
  activeIndex,
  onSelect,
}: UseProjectRailArgs) {
  const initialRenderIndex =
    CENTER_COPY_INDEX * projects.length + activeIndex;

  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmaticTargetRef = useRef<ProgrammaticTarget | null>(null);
  const suppressScrollRef = useRef(false);
  const skipActiveEffectRef = useRef<number | null>(null);
  const initializedRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  const centeredRenderIndexRef = useRef(initialRenderIndex);

  activeIndexRef.current = activeIndex;

  const railProjects = useMemo<RailProject[]>(
    () =>
      Array.from(
        { length: RAIL_COPY_COUNT },
        (_, copyIndex) => copyIndex,
      ).flatMap((copyIndex) =>
        projects.map((project, projectIndex) => ({
          project,
          projectIndex,
          copyIndex,
        })),
      ),
    [projects],
  );

  const clearScrollTimer = useCallback(() => {
    if (!scrollTimerRef.current) {
      return;
    }

    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = null;
  }, []);

  const getRailAlignment = useCallback(() => {
    const rail = railRef.current;

    if (!rail || typeof window === "undefined") {
      return "center";
    }

    return window
      .getComputedStyle(rail)
      .getPropertyValue("--project-align")
      .trim() === "start"
      ? "start"
      : "center";
  }, []);

  const getCardPosition = useCallback(
    (card: HTMLButtonElement, rail: HTMLDivElement) => {
      const railRect = rail.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const left =
        rail.scrollLeft + (cardRect.left - railRect.left);

      return {
        left,
        center: left + cardRect.width / 2,
        width: cardRect.width,
      };
    },
    [],
  );

  const alignCard = useCallback(
    (renderIndex: number, behavior: ScrollBehavior = "smooth") => {
      const rail = railRef.current;
      const card = cardRefs.current[renderIndex];

      if (!rail || !card) {
        return;
      }

      const alignment = getRailAlignment();
      const position = getCardPosition(card, rail);

      rail.scrollTo({
        left:
          alignment === "start"
            ? position.left
            : position.center - rail.clientWidth / 2,
        behavior,
      });
    },
    [getCardPosition, getRailAlignment],
  );

  const findNearestRenderIndex = useCallback(
    (projectIndex: number) => {
      const rail = railRef.current;
      const centerRenderIndex =
        CENTER_COPY_INDEX * projects.length + projectIndex;

      if (!rail) {
        return centerRenderIndex;
      }

      const alignment = getRailAlignment();
      const alignmentPoint =
        alignment === "start"
          ? rail.scrollLeft
          : rail.scrollLeft + rail.clientWidth / 2;
      let nearestIndex = centerRenderIndex;
      let nearestDistance = Number.POSITIVE_INFINITY;

      railProjects.forEach((item, renderIndex) => {
        if (item.projectIndex !== projectIndex) {
          return;
        }

        const card = cardRefs.current[renderIndex];

        if (!card) {
          return;
        }

        const position = getCardPosition(card, rail);
        const cardAlignmentPoint =
          alignment === "start"
            ? position.left
            : position.center;
        const distance = Math.abs(
          cardAlignmentPoint - alignmentPoint,
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = renderIndex;
        }
      });

      return nearestIndex;
    },
    [
      getCardPosition,
      getRailAlignment,
      projects.length,
      railProjects,
    ],
  );

  const rebaseToCenterCopy = useCallback(
    (renderIndex: number, projectIndex: number) => {
      const rail = railRef.current;
      const sourceCard = cardRefs.current[renderIndex];
      const centerRenderIndex =
        CENTER_COPY_INDEX * projects.length + projectIndex;
      const centerCardElement = cardRefs.current[centerRenderIndex];

      if (
        !rail ||
        !sourceCard ||
        !centerCardElement ||
        renderIndex === centerRenderIndex
      ) {
        return;
      }

      suppressScrollRef.current = true;
      rail.style.scrollSnapType = "none";
      const sourcePosition = getCardPosition(sourceCard, rail);
      const centerPosition = getCardPosition(
        centerCardElement,
        rail,
      );

      rail.scrollLeft +=
        centerPosition.left - sourcePosition.left;
      centeredRenderIndexRef.current = centerRenderIndex;

      requestAnimationFrame(() => {
        rail.style.scrollSnapType = "";

        requestAnimationFrame(() => {
          suppressScrollRef.current = false;
        });
      });
    },
    [getCardPosition, projects.length],
  );

  const settleManualScroll = useCallback(() => {
    const rail = railRef.current;

    if (!rail || projects.length === 0) {
      return;
    }

    const alignment = getRailAlignment();
    const alignmentPoint =
      alignment === "start"
        ? rail.scrollLeft
        : rail.scrollLeft + rail.clientWidth / 2;

    let nearestRenderIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, renderIndex) => {
      if (!card) {
        return;
      }

      const position = getCardPosition(card, rail);
      const cardAlignmentPoint =
        alignment === "start"
          ? position.left
          : position.center;
      const distance = Math.abs(
        cardAlignmentPoint - alignmentPoint,
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestRenderIndex = renderIndex;
      }
    });

    const nearestItem = railProjects[nearestRenderIndex];

    if (!nearestItem) {
      return;
    }

    const accepted = onSelect(nearestItem.projectIndex);

    if (!accepted) {
      return;
    }

    centeredRenderIndexRef.current = nearestRenderIndex;
    skipActiveEffectRef.current = nearestItem.projectIndex;
    alignCard(nearestRenderIndex, "auto");

    if (
      nearestItem.copyIndex === 0 ||
      nearestItem.copyIndex === RAIL_COPY_COUNT - 1
    ) {
      rebaseToCenterCopy(
        nearestRenderIndex,
        nearestItem.projectIndex,
      );
    }
  }, [
    getCardPosition,
    getRailAlignment,
    onSelect,
    projects.length,
    railProjects,
    rebaseToCenterCopy,
    alignCard,
  ]);

  const finishProgrammaticScroll = useCallback(() => {
    const target = programmaticTargetRef.current;

    if (!target) {
      return;
    }

    programmaticTargetRef.current = null;
    centeredRenderIndexRef.current = target.renderIndex;
    alignCard(target.renderIndex, "auto");

    const targetItem = railProjects[target.renderIndex];

    if (
      targetItem &&
      (targetItem.copyIndex === 0 ||
        targetItem.copyIndex === RAIL_COPY_COUNT - 1)
    ) {
      rebaseToCenterCopy(
        target.renderIndex,
        target.projectIndex,
      );
    }
  }, [alignCard, railProjects, rebaseToCenterCopy]);

  const handleScroll = useCallback(() => {
    if (suppressScrollRef.current) {
      return;
    }

    clearScrollTimer();

    scrollTimerRef.current = setTimeout(() => {
      scrollTimerRef.current = null;

      if (programmaticTargetRef.current) {
        finishProgrammaticScroll();
        return;
      }

      settleManualScroll();
    }, SCROLL_SETTLE_DELAY_MS);
  }, [
    clearScrollTimer,
    finishProgrammaticScroll,
    settleManualScroll,
  ]);

  const beginProgrammaticScroll = useCallback(
    (
      projectIndex: number,
      renderIndex: number,
      shouldSelect: boolean,
    ) => {
      if (shouldSelect && !onSelect(projectIndex)) {
        return false;
      }

      clearScrollTimer();

      programmaticTargetRef.current = {
        projectIndex,
        renderIndex,
      };
      centeredRenderIndexRef.current = renderIndex;

      if (shouldSelect) {
        skipActiveEffectRef.current = projectIndex;
      }

      alignCard(renderIndex);
      return true;
    },
    [alignCard, clearScrollTimer, onSelect],
  );

  const selectRenderItem = useCallback(
    (projectIndex: number, renderIndex: number) => {
      beginProgrammaticScroll(
        projectIndex,
        renderIndex,
        true,
      );
    },
    [beginProgrammaticScroll],
  );

  const selectProject = useCallback(
    (projectIndex: number) => {
      selectRenderItem(
        projectIndex,
        findNearestRenderIndex(projectIndex),
      );
    },
    [findNearestRenderIndex, selectRenderItem],
  );

  const handleUserInteraction = useCallback(() => {
    programmaticTargetRef.current = null;
    clearScrollTimer();
  }, [clearScrollTimer]);

  useEffect(() => {
    if (projects.length === 0) {
      return;
    }

    const startRenderIndex =
      CENTER_COPY_INDEX * projects.length + activeIndexRef.current;

    initializedRef.current = false;
    programmaticTargetRef.current = null;
    skipActiveEffectRef.current = activeIndexRef.current;
    centeredRenderIndexRef.current = startRenderIndex;
    alignCard(startRenderIndex, "auto");
    initializedRef.current = true;

    return () => {
      clearScrollTimer();
      programmaticTargetRef.current = null;
    };
  }, [alignCard, clearScrollTimer, projects.length]);

  useEffect(() => {
    if (!initializedRef.current) {
      return;
    }

    if (skipActiveEffectRef.current === activeIndex) {
      skipActiveEffectRef.current = null;
      return;
    }

    skipActiveEffectRef.current = null;

    const targetRenderIndex =
      findNearestRenderIndex(activeIndex);

    beginProgrammaticScroll(
      activeIndex,
      targetRenderIndex,
      false,
    );
  }, [
    activeIndex,
    beginProgrammaticScroll,
    findNearestRenderIndex,
  ]);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      alignCard(centeredRenderIndexRef.current, "auto");
    });

    observer.observe(rail);

    return () => observer.disconnect();
  }, [alignCard]);

  return {
    railRef,
    cardRefs,
    railProjects,
    handleScroll,
    handleUserInteraction,
    selectProject,
    selectRenderItem,
  };
}
