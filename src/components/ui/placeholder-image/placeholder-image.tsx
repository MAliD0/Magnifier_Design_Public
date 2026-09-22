import type { CSSProperties } from "react";

import { getPlaceholderImageUrl } from "./placeholder-image.config";
import styles from "./placeholder-image.module.css";

export type PlaceholderTone =
  | "sand"
  | "sage"
  | "clay"
  | "stone"
  | "ink";

type PlaceholderImageProps = {
  label: string;
  tone?: PlaceholderTone;
  className?: string;
};

const toneClasses = {
  sand: "bg-[var(--image-sand)]",
  sage: "bg-[var(--image-sage)]",
  clay: "bg-[var(--image-clay)]",
  stone: "bg-[var(--image-stone)]",
  ink: "bg-[var(--image-ink)] text-[var(--image-ink-foreground)]",
} as const;

type RemoteImageStyle = CSSProperties & {
  backgroundImage?: string;
};

export function PlaceholderImage({
  label,
  tone = "stone",
  className = "",
}: PlaceholderImageProps) {
  const imageUrl = getPlaceholderImageUrl(label);
  const imageStyle: RemoteImageStyle = imageUrl
    ? {
        backgroundImage: `url("${imageUrl}")`,
      }
    : {};

  return (
    <div
      role="img"
      aria-label={label}
      data-transition-media
      className={`${styles.root} flex items-end p-4 text-xs uppercase tracking-[0.16em] transition-colors duration-200 ${toneClasses[tone]} ${className}`}
    >
      {imageUrl ? (
        <div
          className={styles.image}
          style={imageStyle}
          data-transition-media-content
          aria-hidden="true"
        />
      ) : null}

      <span
        className={styles.label}
        data-transition-media-content
      >
        {label}
      </span>
    </div>
  );
}
