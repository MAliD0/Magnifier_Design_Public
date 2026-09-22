export type RouteTransitionPhase =
  | "idle"
  | "exit"
  | "cover"
  | "enter";

export type RouteTransitionContent = {
  id: string;
  eyebrow?: string;
  lines: readonly string[];
};

export type RouteTransitionContentMap = Readonly<
  Record<string, RouteTransitionContent>
>;

export type RouteTransitionBezier =
  readonly [number, number, number, number];

export type RouteTransitionConfig = {
  motion: {
    referenceViewportWidthPx: number;
    referenceDurationMs: number;
    bezier: RouteTransitionBezier;
  };
  scan: {
    centerLockProgress: number;
    centerViewportProgress: number;
  };
  text: {
    fadeMidpointProgress: number;
  };
  coverHoldMs: number;
};

export type RouteTransitionPublicValue = {
  phase: RouteTransitionPhase;
  targetPath: string | null;
  content: RouteTransitionContent | null;
  isTransitioning: boolean;
  startTransition: (targetPath: string) => void;
};

export type RouteTransitionRuntimeValue =
  RouteTransitionPublicValue & {
    config: RouteTransitionConfig;
    completePhase: (
      completedPhase: "exit" | "enter",
    ) => void;
  };
