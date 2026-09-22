import type { PlaceholderTone } from "@/components/ui/placeholder-image";

export type DesignProcessMedia =
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

export type DesignProcessStage = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  result: string;
  media: DesignProcessMedia;
};
