import Image from "next/image";

import { PlaceholderImage } from "@/components/ui/placeholder-image";

import styles from "./design-process.module.css";
import type { DesignProcessMedia } from "./types";

type DesignProcessMediaProps = {
  media: DesignProcessMedia;
};

export function DesignProcessMediaView({
  media,
}: DesignProcessMediaProps) {
  if (media.kind === "image") {
    return (
      <div
        className={styles.mediaPlaceholder}
        data-transition-media
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1280px) 40vw, (min-width: 768px) 44vw, 100vw"
          className={styles.mediaImage}
        />
      </div>
    );
  }

  return (
    <PlaceholderImage
      label={media.label}
      tone={media.tone}
      className={styles.mediaPlaceholder}
    />
  );
}
