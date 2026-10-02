import { styleCompassModel } from "@/data/style-compass-model";

import type {
  StyleCompassCategoryId,
  StyleCompassCompleteSelections,
  StyleCompassContribution,
  StyleCompassOptionId,
  StyleCompassRankedStyle,
  StyleCompassResult,
  StyleCompassResultMode,
  StyleCompassStyleId,
} from "./types";

type ScoringStyle = {
  id: StyleCompassStyleId;
  name: string;
};

type ScoringOption = {
  id: StyleCompassOptionId;
  category: StyleCompassCategoryId;
  label: string;
  scores: Readonly<Record<string, number>>;
};

const config = styleCompassModel as unknown as {
  version: string;
  weights: Readonly<
    Record<StyleCompassCategoryId, number>
  >;
  thresholds: {
    min_top_score: number;
    close_gap: number;
    secondary_min_score: number;
  };
  styles: readonly ScoringStyle[];
  options: readonly ScoringOption[];
};

const categoryOrder: readonly StyleCompassCategoryId[] = [
  "colour",
  "form",
  "texture",
  "feeling",
];

export function calculateStyleDirection(
  answers: StyleCompassCompleteSelections,
): StyleCompassResult {
  const picked = categoryOrder.map((category) => {
    const option = config.options.find(
      (candidate) =>
        candidate.id === answers[category] &&
        candidate.category === category,
    );

    if (!option) {
      throw new Error(
        `Invalid Style Compass option for ${category}`,
      );
    }

    return option;
  });

  const ranked = config.styles
    .map((style): StyleCompassRankedStyle => {
      const contributions = picked.map(
        (option): StyleCompassContribution => {
          const points = option.scores[style.id] ?? 0;

          return {
            category: option.category,
            optionId: option.id,
            label: option.label,
            points,
            weighted:
              (points / 3) *
              config.weights[option.category],
          };
        },
      );

      return {
        id: style.id,
        name: style.name,
        score: contributions.reduce(
          (sum, contribution) =>
            sum + contribution.weighted,
          0,
        ),
        contributions,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.id.localeCompare(b.id),
    );

  const [first, second, third] = ranked;
  const epsilon = 1e-9;
  let mode: StyleCompassResultMode;
  let display: readonly StyleCompassRankedStyle[];

  if (
    first.score + epsilon <
    config.thresholds.min_top_score
  ) {
    mode = "explore";
    display = ranked.slice(0, 2);
  } else if (
    first.score - third.score <
    config.thresholds.close_gap - epsilon
  ) {
    mode = "explore";
    display = ranked.slice(0, 3);
  } else if (
    first.score - second.score <
    config.thresholds.close_gap - epsilon
  ) {
    mode = "blend";
    display = ranked.slice(0, 2);
  } else {
    mode = "leading";
    display = ranked.slice(0, 1);
  }

  return {
    version: config.version,
    answers,
    mode,
    display,
    alsoExplore:
      mode === "leading" &&
      second.score + epsilon >=
        config.thresholds.secondary_min_score
        ? second
        : null,
    ranked,
  };
}
