"use client";

import { useContext } from "react";

import { RouteTransitionContext } from "./route-transition-context";

export function useRouteTransitionRuntime() {
  const context = useContext(RouteTransitionContext);

  if (!context) {
    throw new Error(
      "Route transition components must be used inside RouteTransitionProvider.",
    );
  }

  return context;
}
