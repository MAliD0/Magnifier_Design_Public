import { PlaceholderImage } from "@/components/ui/placeholder-image";

import type { ProjectGalleryProject } from "./types";

type ProjectHeroProps = {
  hero: ProjectGalleryProject["hero"];
};

export function ProjectHero({ hero }: ProjectHeroProps) {
  return (
    <PlaceholderImage
      label={hero.label}
      tone={hero.tone}
      className="absolute inset-0 h-full w-full [&>span]:hidden"
    />
  );
}
