"use client";

import { useLayoutEffect, useRef } from "react";

import {
  getIncomingCameraX,
  getIncomingScanX,
  getOutgoingCameraX,
  getOutgoingScanX,
} from "../core/geometry";
import {
  getRouteTransitionDurationMs,
  getRouteTransitionProgress,
  getRouteTransitionTextOpacity,
} from "../core/timeline";
import type {
  RouteTransitionConfig,
  RouteTransitionPhase,
} from "../core/types";
import {
  clearRouteTransitionMedia,
  measureRouteTransitionMedia,
  setRouteTransitionMediaHiddenForReveal,
  setRouteTransitionMediaVisible,
  updateRouteTransitionMediaReveal,
  updateRouteTransitionMediaWipe,
} from "../effects/media-effect";
import {
  clearRouteTransitionText,
  measureRouteTransitionText,
  setRouteTransitionTextOpacity,
} from "../effects/text-effect";

const GLOBAL_OUTGOING_X_PROPERTY =
  "--route-camera-x-global";
const GLOBAL_INCOMING_X_PROPERTY =
  "--route-incoming-x-global";

type UseTransitionEngineOptions = {
  phase: RouteTransitionPhase;
  config: RouteTransitionConfig;
  onPhaseComplete: (
    phase: "exit" | "enter",
  ) => void;
};

export function useTransitionEngine({
  phase,
  config,
  onPhaseComplete,
}: UseTransitionEngineOptions) {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const root = document.documentElement;

    if (!stage) {
      return;
    }

    if (phase === "idle") {
      clearRouteTransitionMedia();
      clearRouteTransitionText();
      stage.style.setProperty("--route-camera-x", "0px");
      stage.style.setProperty("--route-scan-x", "0px");
      root.style.setProperty(
        GLOBAL_OUTGOING_X_PROPERTY,
        "0px",
      );
      root.style.setProperty(
        GLOBAL_INCOMING_X_PROPERTY,
        "0px",
      );
      return;
    }

    if (phase === "cover") {
      stage.style.setProperty(
        "--route-camera-x",
        `${window.innerWidth}px`,
      );
      return;
    }

    const viewportWidth = Math.max(window.innerWidth, 1);
    const media = measureRouteTransitionMedia(stage);
    const textElements = measureRouteTransitionText(stage);
    const durationMs = getRouteTransitionDurationMs(
      viewportWidth,
      config,
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      stage.style.setProperty("--route-camera-x", "0px");
      setRouteTransitionMediaVisible(media);
      setRouteTransitionTextOpacity(textElements, 1);

      const frame = window.requestAnimationFrame(() => {
        onPhaseComplete(phase);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const startedAt = performance.now();
    let animationFrameId = 0;

    if (phase === "exit") {
      setRouteTransitionTextOpacity(textElements, 1);
    } else {
      setRouteTransitionMediaHiddenForReveal(media);
      setRouteTransitionTextOpacity(textElements, 0);
      stage.style.setProperty(
        "--route-camera-x",
        `${viewportWidth}px`,
      );
      root.style.setProperty(
        GLOBAL_INCOMING_X_PROPERTY,
        `${viewportWidth}px`,
      );
    }

    const update = (now: number) => {
      const progress = getRouteTransitionProgress(
        now - startedAt,
        durationMs,
      );
      const textOpacity =
        getRouteTransitionTextOpacity(
          phase,
          progress,
          config,
        );

      if (phase === "exit") {
        const cameraX = getOutgoingCameraX(
          progress,
          viewportWidth,
          config,
        );
        const scanX = getOutgoingScanX(
          progress,
          viewportWidth,
          config,
        );
        const cameraValue =
          `${cameraX.toFixed(3)}px`;

        stage.style.setProperty(
          "--route-camera-x",
          cameraValue,
        );
        stage.style.setProperty(
          "--route-scan-x",
          `${scanX.toFixed(3)}px`,
        );
        root.style.setProperty(
          GLOBAL_OUTGOING_X_PROPERTY,
          cameraValue,
        );

        updateRouteTransitionMediaWipe(
          media,
          scanX,
          cameraX,
        );
      } else {
        const cameraX = getIncomingCameraX(
          progress,
          viewportWidth,
          config,
        );
        const scanX = getIncomingScanX(
          progress,
          viewportWidth,
          config,
        );
        const cameraValue =
          `${cameraX.toFixed(3)}px`;

        stage.style.setProperty(
          "--route-camera-x",
          cameraValue,
        );
        stage.style.setProperty(
          "--route-scan-x",
          `${scanX.toFixed(3)}px`,
        );
        root.style.setProperty(
          GLOBAL_INCOMING_X_PROPERTY,
          cameraValue,
        );

        updateRouteTransitionMediaReveal(
          media,
          scanX,
          cameraX,
        );
      }

      setRouteTransitionTextOpacity(
        textElements,
        textOpacity,
      );

      if (progress >= 1) {
        if (phase === "enter") {
          stage.style.setProperty(
            "--route-camera-x",
            "0px",
          );
          root.style.setProperty(
            GLOBAL_INCOMING_X_PROPERTY,
            "0px",
          );
          setRouteTransitionMediaVisible(media);
          setRouteTransitionTextOpacity(textElements, 1);
        }

        onPhaseComplete(phase);
        return;
      }

      animationFrameId =
        window.requestAnimationFrame(update);
    };

    animationFrameId =
      window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [config, onPhaseComplete, phase]);

  return stageRef;
}
