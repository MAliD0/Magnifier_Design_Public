import type { RouteTransitionBezier } from "./types";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function cubicBezierCoordinate(
  t: number,
  point1: number,
  point2: number,
) {
  const oneMinusT = 1 - t;

  return (
    3 * oneMinusT * oneMinusT * t * point1 +
    3 * oneMinusT * t * t * point2 +
    t * t * t
  );
}

function cubicBezierDerivative(
  t: number,
  point1: number,
  point2: number,
) {
  const oneMinusT = 1 - t;

  return (
    3 * oneMinusT * oneMinusT * point1 +
    6 * oneMinusT * t * (point2 - point1) +
    3 * t * t * (1 - point2)
  );
}

export function getCubicBezierProgress(
  progress: number,
  bezier: RouteTransitionBezier,
) {
  const [x1, y1, x2, y2] = bezier;
  const targetX = clamp(progress, 0, 1);
  let t = targetX;

  for (let iteration = 0; iteration < 5; iteration += 1) {
    const currentX = cubicBezierCoordinate(t, x1, x2);
    const derivative = cubicBezierDerivative(t, x1, x2);

    if (Math.abs(derivative) < 0.000001) {
      break;
    }

    t = clamp(
      t - (currentX - targetX) / derivative,
      0,
      1,
    );
  }

  return cubicBezierCoordinate(t, y1, y2);
}
