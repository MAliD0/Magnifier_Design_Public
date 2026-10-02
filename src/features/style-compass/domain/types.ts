export type StyleCompassCategoryId =
  | "colour"
  | "form"
  | "texture"
  | "feeling";

export type StyleCompassOptionId =
  `${"C" | "F" | "T" | "H"}${string}`;

export type StyleCompassStyleId =
  | "WC"
  | "AM"
  | "OM"
  | "JA"
  | "AD"
  | "PA"
  | "EH"
  | "MC"
  | "CO"
  | "ME"
  | "MM"
  | "EC";

export type StyleCompassTone =
  | "sand"
  | "sage"
  | "clay"
  | "stone"
  | "ink";

export type StyleCompassShape =
  | "square"
  | "arch"
  | "rounded";

export type StyleCompassAssetStatus =
  | "to_produce"
  | "ready";

export type StyleCompassMedia = {
  src: string;
  status: StyleCompassAssetStatus;
};

export type StyleCompassOption = {
  id: StyleCompassOptionId;
  category: StyleCompassCategoryId;
  label: string;
  brief: string;
  hex: readonly string[];
  media: StyleCompassMedia | null;
};

export type StyleCompassCategory = {
  id: StyleCompassCategoryId;
  label: string;
  question: string;
  hint: string | null;
  tone: StyleCompassTone;
  shape: StyleCompassShape;
  options: readonly [
    StyleCompassOption,
    ...StyleCompassOption[],
  ];
};

export type StyleCompassSelections = {
  [K in StyleCompassCategoryId]:
    | StyleCompassOptionId
    | null;
};

export type StyleCompassCompleteSelections = {
  [K in StyleCompassCategoryId]: StyleCompassOptionId;
};

export type StyleCompassStatus =
  | "empty"
  | "partial"
  | "complete";

export type StyleCompassContribution = {
  category: StyleCompassCategoryId;
  optionId: StyleCompassOptionId;
  label: string;
  points: number;
  weighted: number;
};

export type StyleCompassRankedStyle = {
  id: StyleCompassStyleId;
  name: string;
  score: number;
  contributions: readonly StyleCompassContribution[];
};

export type StyleCompassResultMode =
  | "leading"
  | "blend"
  | "explore";

export type StyleCompassResult = {
  version: string;
  answers: StyleCompassCompleteSelections;
  mode: StyleCompassResultMode;
  display: readonly StyleCompassRankedStyle[];
  alsoExplore: StyleCompassRankedStyle | null;
  ranked: readonly StyleCompassRankedStyle[];
};

export type StyleCompassCompleteHandler = (
  selections: StyleCompassCompleteSelections,
) => void;

export type StyleCompassAnalyzeHandler = (
  result: StyleCompassResult,
) => void;
