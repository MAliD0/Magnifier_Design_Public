import Image from "next/image";

import { PlaceholderImage } from "@/components/ui/placeholder-image";

import type { LatestProjectMedia } from "./types";

type ProjectMediaProps = {
  media: LatestProjectMedia;
  selected: boolean;
};

export function ProjectMedia({ media, selected }: ProjectMediaProps) {
  const stateClass = selected
    ? "scale-100 opacity-100"
    : "scale-[0.975] opacity-55 group-hover:opacity-85";

  if (media.kind === "image") {
    return (
      <div
        className={`relative aspect-[5/4] lg:aspect-[4/5] overflow-hidden transition-[transform,opacity] duration-500 ${stateClass}`}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 26vw, (min-width: 640px) 42vw, 72vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <PlaceholderImage
      label={media.label}
      tone={media.tone}
      className={`aspect-[5/4] lg:aspect-[4/5] transition-[transform,opacity] duration-500 ${stateClass}`}
    />
  );
}
