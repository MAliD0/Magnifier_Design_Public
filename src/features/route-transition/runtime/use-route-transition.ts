"use client";

import type { RouteTransitionPublicValue } from "../core/types";
import { useRouteTransitionRuntime } from "./use-route-transition-runtime";

export function useRouteTransition(): RouteTransitionPublicValue {
  const {
    phase,
    targetPath,
    content,
    isTransitioning,
    startTransition,
  } = useRouteTransitionRuntime();

  return {
    phase,
    targetPath,
    content,
    isTransitioning,
    startTransition,
  };
}
