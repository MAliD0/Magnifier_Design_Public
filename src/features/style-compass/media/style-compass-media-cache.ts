import type { StyleCompassOption } from "../domain/types";

const loadedImages = new Set<string>();
const pendingImages = new Map<
  string,
  Promise<boolean>
>();

function isAllowedStyleCompassImage(src: string) {
  return /^\/style-compass\/(form|texture|feeling)\/[FTH]\d{2}\.avif$/.test(
    src,
  );
}

export function getStyleCompassImageSrc(
  option: StyleCompassOption,
) {
  if (
    option.media?.status !== "ready" ||
    !isAllowedStyleCompassImage(option.media.src)
  ) {
    return null;
  }

  return option.media.src;
}

export function isStyleCompassImageLoaded(
  src: string,
) {
  return loadedImages.has(src);
}

export function preloadStyleCompassImage(
  src: string,
): Promise<boolean> {
  if (
    typeof window === "undefined" ||
    !isAllowedStyleCompassImage(src)
  ) {
    return Promise.resolve(false);
  }

  if (loadedImages.has(src)) {
    return Promise.resolve(true);
  }

  const existing = pendingImages.get(src);

  if (existing) {
    return existing;
  }

  const pending = new Promise<boolean>((resolve) => {
    const image = new Image();
    image.decoding = "async";

    image.onload = async () => {
      try {
        await image.decode();
      } catch {
        // The loaded image remains usable if decode() rejects.
      }

      loadedImages.add(src);
      pendingImages.delete(src);
      resolve(true);
    };

    image.onerror = () => {
      pendingImages.delete(src);
      resolve(false);
    };

    image.src = src;
  });

  pendingImages.set(src, pending);

  return pending;
}

export function preloadStyleCompassOptionMedia(
  option: StyleCompassOption,
) {
  const src = getStyleCompassImageSrc(option);

  return src
    ? preloadStyleCompassImage(src)
    : Promise.resolve(false);
}
