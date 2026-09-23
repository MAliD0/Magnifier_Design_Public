const MEDIA_SELECTOR = "[data-transition-media]";
const MEDIA_WIPE_LEFT_PROPERTY = "--route-media-wipe-left";
const MEDIA_WIPE_RIGHT_PROPERTY = "--route-media-wipe-right";

export type RouteTransitionMediaMeasurement = {
  element: HTMLElement;
  left: number;
  width: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smootherstep(value: number) {
  const progress = clamp(value, 0, 1);

  return (
    progress *
    progress *
    progress *
    (progress * (progress * 6 - 15) + 10)
  );
}

function isRenderableMedia(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
    return false;
  }

  const style = window.getComputedStyle(element);

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    Number(style.opacity) !== 0
  );
}

function setMediaInsets(
  element: HTMLElement,
  leftProgress: number,
  rightProgress: number,
) {
  element.style.setProperty(
    MEDIA_WIPE_LEFT_PROPERTY,
    `${(clamp(leftProgress, 0, 1) * 100).toFixed(3)}%`,
  );
  element.style.setProperty(
    MEDIA_WIPE_RIGHT_PROPERTY,
    `${(clamp(rightProgress, 0, 1) * 100).toFixed(3)}%`,
  );
}

export function measureRouteTransitionMedia(
  stage: HTMLElement,
) {
  const stageRect = stage.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  return Array.from(
    stage.querySelectorAll<HTMLElement>(MEDIA_SELECTOR),
  )
    .filter(isRenderableMedia)
    .map<RouteTransitionMediaMeasurement | null>((element) => {
      const rect = element.getBoundingClientRect();
      const left = rect.left - stageRect.left;
      const right = left + rect.width;

      if (
        right <= 0 ||
        left >= viewportWidth ||
        rect.bottom <= 0 ||
        rect.top >= viewportHeight
      ) {
        return null;
      }

      return {
        element,
        left,
        width: Math.max(rect.width, 1),
      };
    })
    .filter(
      (
        item,
      ): item is RouteTransitionMediaMeasurement =>
        item !== null,
    );
}

export function setRouteTransitionMediaVisible(
  media: readonly RouteTransitionMediaMeasurement[],
) {
  media.forEach(({ element }) => {
    setMediaInsets(element, 0, 0);
  });
}

export function setRouteTransitionMediaHiddenForReveal(
  media: readonly RouteTransitionMediaMeasurement[],
) {
  media.forEach(({ element }) => {
    setMediaInsets(element, 0, 1);
  });
}

export function updateRouteTransitionMediaWipe(
  media: readonly RouteTransitionMediaMeasurement[],
  scanX: number,
  cameraX: number,
) {
  media.forEach(({ element, left, width }) => {
    const currentLeft = left + cameraX;
    const wipeProgress = smootherstep(
      (scanX - currentLeft) / width,
    );

    setMediaInsets(element, wipeProgress, 0);
  });
}

export function updateRouteTransitionMediaReveal(
  media: readonly RouteTransitionMediaMeasurement[],
  scanX: number,
  cameraX: number,
) {
  media.forEach(({ element, left, width }) => {
    const currentLeft = left + cameraX;
    const crossedProgress = smootherstep(
      (scanX - currentLeft) / width,
    );

    setMediaInsets(element, 0, 1 - crossedProgress);
  });
}

export function clearRouteTransitionMedia() {
  document
    .querySelectorAll<HTMLElement>(MEDIA_SELECTOR)
    .forEach((element) => {
      element.style.removeProperty(MEDIA_WIPE_LEFT_PROPERTY);
      element.style.removeProperty(MEDIA_WIPE_RIGHT_PROPERTY);
    });
}
