"use client";

import { createContext } from "react";

import type { RouteTransitionRuntimeValue } from "../core/types";

export const RouteTransitionContext =
  createContext<RouteTransitionRuntimeValue | null>(null);
