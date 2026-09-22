import type { PlaceholderTone } from "@/components/ui/placeholder-image";

export type ProjectGallerySlide = {
  label: string;
  tone: PlaceholderTone;
  caption: string;
};

export type ProjectGalleryProject = {
  id: string;
  title: string;
  eyebrow: string;
  type: string;
  location: string;
  year: string;
  hero: {
    label: string;
    tone: PlaceholderTone;
  };
  slides: readonly ProjectGallerySlide[];
};
