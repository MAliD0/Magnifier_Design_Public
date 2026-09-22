"use client";

import { useEffect } from "react";

import { smoothScrollConfig } from "@/data/smooth-scroll";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getMaxScrollY() {
  return Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    0,
  );
}

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === 1) {
    return event.deltaY * smoothScrollConfig.wheelLineHeightPx;
  }

  if (event.deltaMode === 2) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

function canElementScroll(
  element: HTMLElement,
  deltaY: number,
) {
  const { overflowY } = window.getComputedStyle(element);
  const scrollableOverflow =
    overflowY === "auto" || overflowY === "scroll";

  if (
    !scrollableOverflow ||
    element.scrollHeight <= element.clientHeight
  ) {
    return false;
  }

  if (deltaY < 0) {
    return element.scrollTop > 0;
  }

  return (
    element.scrollTop + element.clientHeight <
    element.scrollHeight - 1
  );
}

function shouldUseNativeScroll(
  target: EventTarget | null,
  deltaY: number,
) {
  if (!(target instanceof Element)) {
    return false;
  }

  let element: HTMLElement | null =
    target instanceof HTMLElement
      ? target
      : target.parentElement;

  while (
    element &&
    element !== document.body &&
    element !== document.documentElement
  ) {
    if (canElementScroll(element, deltaY)) {
      return true;
    }

    element = element.parentElement;
  }

  return false;
}

export function SmoothScroll() {
  useEffect(() => {
    if (!smoothScrollConfig.enabled) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let reducedMotion = reducedMotionQuery.matches;
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let frameId: number | null = null;

    function cancelAnimation() {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }

      currentY = window.scrollY;
      targetY = currentY;
    }

    function animate() {
      targetY = clamp(targetY, 0, getMaxScrollY());

      const distance = targetY - currentY;

      if (
        Math.abs(distance) <=
        smoothScrollConfig.stopThresholdPx
      ) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        frameId = null;
        return;
      }

      currentY += distance * smoothScrollConfig.lerpFactor;
      window.scrollTo(0, currentY);
      frameId = window.requestAnimationFrame(animate);
    }

    function handleWheel(event: WheelEvent) {
      if (
        reducedMotion ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      const deltaY = normalizeWheelDelta(event);

      if (
        deltaY === 0 ||
        shouldUseNativeScroll(event.target, deltaY)
      ) {
        return;
      }

      event.preventDefault();

      if (frameId === null) {
        currentY = window.scrollY;
        targetY = currentY;
      }

      targetY = clamp(
        targetY +
          deltaY * smoothScrollConfig.wheelMultiplier,
        0,
        getMaxScrollY(),
      );

      if (frameId === null) {
        frameId = window.requestAnimationFrame(animate);
      }
    }

    function handleReducedMotionChange(
      event: MediaQueryListEvent,
    ) {
      reducedMotion = event.matches;

      if (reducedMotion) {
        cancelAnimation();
      }
    }

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    window.addEventListener("pointerdown", cancelAnimation);
    window.addEventListener("touchstart", cancelAnimation, {
      passive: true,
    });
    window.addEventListener("keydown", cancelAnimation);
    window.addEventListener("resize", cancelAnimation);
    reducedMotionQuery.addEventListener(
      "change",
      handleReducedMotionChange,
    );

    return () => {
      cancelAnimation();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointerdown", cancelAnimation);
      window.removeEventListener("touchstart", cancelAnimation);
      window.removeEventListener("keydown", cancelAnimation);
      window.removeEventListener("resize", cancelAnimation);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
    };
  }, []);

  return null;
}
