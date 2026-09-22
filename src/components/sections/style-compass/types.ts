import type { PlaceholderTone } from "@/components/ui/placeholder-image";

export type StyleCompassCategoryId =
  | "colour"
  | "form"
  | "texture"
  | "feeling";

export type StyleCompassOptionId =
  `${StyleCompassCategoryId}_${string}`;

export type StyleCompassOption = {
  id: StyleCompassOptionId;
  label: string;
  tone: PlaceholderTone;
};

export type StyleCompassShape =
  | "square"
  | "arch"
  | "rounded";

export type StyleCompassCategory = {
  id: StyleCompassCategoryId;
  label: string;
  tone: PlaceholderTone;
  shape: StyleCompassShape;
  options: readonly [StyleCompassOption, ...StyleCompassOption[]];
};

export type StyleCompassSelections = {
  [K in StyleCompassCategoryId]: StyleCompassOptionId | null;
};

export type StyleCompassCompleteSelections = {
  [K in StyleCompassCategoryId]: StyleCompassOptionId;
};

export type StyleCompassStatus =
  | "empty"
  | "partial"
  | "complete";

export type StyleCompassCompleteHandler = (
  selections: StyleCompassCompleteSelections,
) => void;

export type StyleCompassAnalyzeHandler = (
  selections: StyleCompassCompleteSelections,
) => void;
