import Image from "next/image";

import { PlaceholderImage } from "@/components/ui/placeholder-image";

import type { DesignProcessMedia } from "./types";

type DesignProcessMediaProps = {
  media: DesignProcessMedia;
};

export function DesignProcessMediaView({
  media,
}: DesignProcessMediaProps) {
  if (media.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 42vw, 100vw"
        className="object-cover"
      />
    );
  }

  return (
    <PlaceholderImage
      label={media.label}
      tone={media.tone}
      className="absolute inset-0 h-full w-full [&>span]:hidden"
    />
  );
}
