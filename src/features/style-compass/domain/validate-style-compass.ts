import { styleCompassCategories } from "@/data/style-compass";

import type {
  StyleCompassCategoryId,
  StyleCompassOption,
  StyleCompassOptionId,
  StyleCompassSelections,
} from "./types";

const categoryIds = styleCompassCategories.map(
  (category) => category.id,
) as readonly StyleCompassCategoryId[];

const optionByCategory = new Map<
  StyleCompassCategoryId,
  Map<StyleCompassOptionId, StyleCompassOption>
>();

for (const category of styleCompassCategories) {
  optionByCategory.set(
    category.id,
    new Map<StyleCompassOptionId, StyleCompassOption>(
      category.options.map((option) => [
        option.id,
        option,
      ]),
    ),
  );
}

export function createEmptyStyleCompassSelections(): StyleCompassSelections {
  return {
    colour: null,
    form: null,
    texture: null,
    feeling: null,
  };
}

export function getStyleCompassOption(
  categoryId: StyleCompassCategoryId,
  optionId: StyleCompassOptionId | null,
): StyleCompassOption | null {
  if (!optionId) {
    return null;
  }

  return (
    optionByCategory
      .get(categoryId)
      ?.get(optionId) ?? null
  );
}

export function isStyleCompassSelections(
  value: unknown,
): value is StyleCompassSelections {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);

  if (
    keys.length !== categoryIds.length ||
    keys.some(
      (key) =>
        !categoryIds.includes(
          key as StyleCompassCategoryId,
        ),
    )
  ) {
    return false;
  }

  return categoryIds.every((categoryId) => {
    const optionId = record[categoryId];

    if (optionId === null) {
      return true;
    }

    return (
      typeof optionId === "string" &&
      optionByCategory
        .get(categoryId)
        ?.has(optionId as StyleCompassOptionId) ===
        true
    );
  });
}
