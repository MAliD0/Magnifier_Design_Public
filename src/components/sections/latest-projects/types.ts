import type { PlaceholderTone } from "@/components/ui/placeholder-image";

export type LatestProjectMedia =
  | {
      kind: "placeholder";
      label: string;
      tone?: PlaceholderTone;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
    };

export type LatestProjectItem = {
  id: string;
  title: string;
  href: string;
  media: LatestProjectMedia;
  type?: string;
  area?: string;
  location?: string;
  year?: string;
  description?: string;
};

