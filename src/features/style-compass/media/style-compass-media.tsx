"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import type {
  StyleCompassOption,
  StyleCompassTone,
} from "../domain/types";
import {
  getStyleCompassImageSrc,
  isStyleCompassImageLoaded,
  preloadStyleCompassImage,
} from "./style-compass-media-cache";

import styles from "./style-compass-media.module.css";

type StyleCompassMediaProps = {
  option: StyleCompassOption;
  fallbackTone: StyleCompassTone;
  active: boolean;
  className?: string;
};

export function StyleCompassMedia({
  option,
  fallbackTone,
  active,
  className = "",
}: StyleCompassMediaProps) {
  const src = getStyleCompassImageSrc(option);
  const [loadedSrc, setLoadedSrc] = useState<
    string | null
  >(() =>
    src && isStyleCompassImageLoaded(src)
      ? src
      : null,
  );

  useEffect(() => {
    if (!src) {
      setLoadedSrc(null);
      return;
    }

    if (isStyleCompassImageLoaded(src)) {
      setLoadedSrc(src);
      return;
    }

    if (!active) {
      setLoadedSrc(null);
      return;
    }

    let cancelled = false;

    void preloadStyleCompassImage(src).then(
      (loaded) => {
        if (!cancelled && loaded) {
          setLoadedSrc(src);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [active, src]);

  return (
    <div
      role="img"
      aria-label={option.label}
      data-tone={fallbackTone}
      data-transition-media
      className={`${styles.media} ${className}`}
    >
      {option.hex.length > 0 ? (
        <div
          className={styles.palette}
          data-transition-media-content
          aria-hidden="true"
        >
          {option.hex.map((colour) => (
            <span
              key={colour}
              style={
                {
                  "--style-compass-colour": colour,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}

      {loadedSrc ? (
        <div
          className={styles.image}
          style={{
            backgroundImage: `url("${loadedSrc}")`,
          }}
          data-transition-media-content
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
