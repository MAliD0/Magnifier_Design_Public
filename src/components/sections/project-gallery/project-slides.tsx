import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

import type { ProjectGallerySlide } from "./types";

type ProjectSlidesProps = {
  slides: readonly ProjectGallerySlide[];
};

export function ProjectSlides({
  slides,
}: ProjectSlidesProps) {
  return (
    <Container className="space-y-[18svh] py-[18svh] sm:space-y-[24svh] sm:py-[24svh]">
      {slides.map((slide, index) => (
        <figure
          key={slide.label}
          className={
            index % 2 === 0
              ? "mr-auto w-full lg:w-[82%]"
              : "ml-auto w-full lg:w-[82%]"
          }
        >
          <PlaceholderImage
            label={slide.label}
            tone={slide.tone}
            className="aspect-[4/5] shadow-2xl sm:aspect-[16/10]"
          />

          <figcaption className="mt-3 bg-background/90 px-3 py-2 text-xs uppercase tracking-[0.12em] text-muted backdrop-blur-sm">
            {slide.caption}
          </figcaption>
        </figure>
      ))}
    </Container>
  );
}
