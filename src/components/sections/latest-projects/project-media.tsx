import Image from "next/image";

import { PlaceholderImage } from "@/components/ui/placeholder-image";

import styles from "./latest-projects.module.css";
import type { LatestProjectMedia } from "./types";

type ProjectMediaProps = {
  media: LatestProjectMedia;
  selected: boolean;
};

export function ProjectMedia({ media, selected }: ProjectMediaProps) {
  const stateClass = selected
    ? styles.mediaSelected
    : styles.mediaIdle;
  const mediaClass = `${styles.media} ${stateClass}`;

  if (media.kind === "image") {
    return (
      <div className={mediaClass} data-transition-media>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 26vw, (min-width: 640px) 42vw, 72vw"
          className={styles.mediaImage}
        />
      </div>
    );
  }

  return (
    <PlaceholderImage
      label={media.label}
      tone={media.tone}
      className={mediaClass}
    />
  );
}
