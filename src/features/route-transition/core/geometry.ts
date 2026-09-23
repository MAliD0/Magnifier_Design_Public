import { getCubicBezierProgress } from "./bezier";
import { getRouteTransitionMotionProgress } from "./timeline";
import type { RouteTransitionConfig } from "./types";

function getEasedProgress(
  progress: number,
  config: RouteTransitionConfig,
) {
  return getCubicBezierProgress(
    progress,
    config.motion.bezier,
  );
}

export function getOutgoingCameraX(
  progress: number,
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const motionProgress = getRouteTransitionMotionProgress(
    "exit",
    progress,
    config,
  );
  const easedProgress = getEasedProgress(
    motionProgress,
    config,
  );

  return -viewportWidth * easedProgress;
}

export function getIncomingCameraX(
  progress: number,
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const motionProgress = getRouteTransitionMotionProgress(
    "enter",
    progress,
    config,
  );
  const easedProgress = getEasedProgress(
    motionProgress,
    config,
  );

  return viewportWidth * (1 - easedProgress);
}

export function getOutgoingScanX(
  progress: number,
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const motionProgress = getRouteTransitionMotionProgress(
    "exit",
    progress,
    config,
  );
  const lockProgress = config.scan.centerLockProgress;
  const centerProgress = config.scan.centerViewportProgress;

  if (
    lockProgress <= 0 ||
    motionProgress >= lockProgress
  ) {
    return viewportWidth * centerProgress;
  }

  const localProgress = getEasedProgress(
    motionProgress / lockProgress,
    config,
  );

  return (
    viewportWidth *
    centerProgress *
    localProgress
  );
}

export function getIncomingScanX(
  progress: number,
  viewportWidth: number,
  config: RouteTransitionConfig,
) {
  const motionProgress = getRouteTransitionMotionProgress(
    "enter",
    progress,
    config,
  );
  const lockProgress = config.scan.centerLockProgress;
  const centerProgress = config.scan.centerViewportProgress;
  const releaseProgress = 1 - lockProgress;

  if (lockProgress <= 0) {
    return viewportWidth;
  }

  if (motionProgress <= releaseProgress) {
    return viewportWidth * centerProgress;
  }

  const localProgress = getEasedProgress(
    (motionProgress - releaseProgress) / lockProgress,
    config,
  );

  return (
    viewportWidth *
    (centerProgress +
      (1 - centerProgress) * localProgress)
  );
}
