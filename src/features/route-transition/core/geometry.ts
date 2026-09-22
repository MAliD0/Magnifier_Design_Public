import { getCubicBezierProgress } from "./bezier";
import type { RouteTransitionConfig } from "./types";

export function getOutgoingCameraX(
  progress: number,
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const easedProgress = getCubicBezierProgress(
    progress,
    config.motion.bezier,
  );

  return -viewportWidth * easedProgress;
}

export function getIncomingCameraX(
  progress: number,
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const easedProgress = getCubicBezierProgress(
    progress,
    config.motion.bezier,
  );

  return viewportWidth * (1 - easedProgress);
}

export function getOutgoingScanX(
  progress: number,
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const lockProgress = config.scan.centerLockProgress;
  const centerProgress = config.scan.centerViewportProgress;

  if (lockProgress <= 0 || progress >= lockProgress) {
    return viewportWidth * centerProgress;
  }

  return (
    viewportWidth *
    centerProgress *
    (progress / lockProgress)
  );
}

export function getIncomingScanX(
  progress: number,
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const lockProgress = config.scan.centerLockProgress;
  const centerProgress = config.scan.centerViewportProgress;
  const releaseProgress = 1 - lockProgress;

  if (lockProgress <= 0) {
    return viewportWidth;
  }

  if (progress <= releaseProgress) {
    return viewportWidth * centerProgress;
  }

  const release =
    (progress - releaseProgress) / lockProgress;

  return (
    viewportWidth *
    (centerProgress +
      (1 - centerProgress) * release)
  );
}
