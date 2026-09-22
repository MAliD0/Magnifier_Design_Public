const TEXT_ATTRIBUTE = "data-transition-text";
const MEDIA_SELECTOR = "[data-transition-media]";
const MEDIA_CONTENT_SELECTOR = "[data-transition-media-content]";
const PRIMARY_TEXT_SELECTOR =
  "h1, h2, h3, h4, h5, h6, p, a, button, label, li, dt, dd, figcaption";
const FALLBACK_TEXT_SELECTOR = "span, strong, em, small";

function isVisibleTextElement(element: HTMLElement) {
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

function hasMeaningfulText(element: HTMLElement) {
  return Boolean(element.textContent?.trim());
}

function containsTransitionMedia(element: HTMLElement) {
  return Boolean(element.querySelector(MEDIA_SELECTOR));
}

function canMarkText(element: HTMLElement) {
  return (
    hasMeaningfulText(element) &&
    isVisibleTextElement(element) &&
    !element.closest(MEDIA_CONTENT_SELECTOR) &&
    !containsTransitionMedia(element) &&
    !element.closest(`[${TEXT_ATTRIBUTE}]`)
  );
}

export function clearRouteTransitionText() {
  document
    .querySelectorAll<HTMLElement>(`[${TEXT_ATTRIBUTE}]`)
    .forEach((element) => {
      element.removeAttribute(TEXT_ATTRIBUTE);
      element.style.removeProperty("opacity");
      element.style.removeProperty("will-change");
    });
}

export function measureRouteTransitionText(
  stage: HTMLElement,
) {
  clearRouteTransitionText();

  stage
    .querySelectorAll<HTMLElement>(PRIMARY_TEXT_SELECTOR)
    .forEach((element) => {
      if (canMarkText(element)) {
        element.setAttribute(TEXT_ATTRIBUTE, "");
      }
    });

  stage
    .querySelectorAll<HTMLElement>(FALLBACK_TEXT_SELECTOR)
    .forEach((element) => {
      if (canMarkText(element)) {
        element.setAttribute(TEXT_ATTRIBUTE, "");
      }
    });

  return Array.from(
    stage.querySelectorAll<HTMLElement>(
      `[${TEXT_ATTRIBUTE}]`,
    ),
  );
}

export function setRouteTransitionTextOpacity(
  textElements: readonly HTMLElement[],
  opacity: number,
) {
  const normalizedOpacity = Math.min(
    Math.max(opacity, 0),
    1,
  );

  textElements.forEach((element) => {
    element.style.opacity = normalizedOpacity.toFixed(3);
    element.style.willChange = "opacity";
  });
}
