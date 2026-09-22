import { PlaceholderImage } from "@/components/ui/placeholder-image";

import type {
  StyleCompassCategory,
  StyleCompassCategoryId,
  StyleCompassSelections,
} from "./types";

type StyleCompassGridProps = {
  categories: readonly StyleCompassCategory[];
  selections: StyleCompassSelections;
  activeCategoryId: StyleCompassCategoryId | null;
  onOpen: (
    categoryId: StyleCompassCategoryId,
    source: HTMLButtonElement,
  ) => void;
};

const toneClasses = {
  sand: "bg-[var(--brand-taupe-light)] text-[var(--brand-dark)]",
  sage: "bg-[var(--brand-premium)] text-[var(--brand-light)]",
  clay: "bg-[var(--brand-taupe)] text-[var(--brand-dark)]",
  stone: "bg-[var(--brand-dark-mid)] text-[var(--brand-light)]",
  ink: "bg-[var(--brand-premium-dark)] text-[var(--brand-light)]",
} as const;

const selectedTextClasses = {
  sand: "text-foreground",
  sage: "text-foreground",
  clay: "text-foreground",
  stone: "text-foreground",
  ink: "text-[var(--brand-light)]",
} as const;

export function StyleCompassGrid({
  categories,
  selections,
  activeCategoryId,
  onOpen,
}: StyleCompassGridProps) {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-3">
      {categories.map((category) => {
        const isTexture = category.id === "texture";
        const isActive = category.id === activeCategoryId;
        const selectedOptionId = selections[category.id];
        const selectedOption = category.options.find(
          (option) => option.id === selectedOptionId,
        );

        return (
          <button
            key={category.id}
            type="button"
            data-style-compass-category={category.id}
            onClick={(event) =>
              onOpen(category.id, event.currentTarget)
            }
            aria-pressed={isActive}
            className={`group relative min-h-0 overflow-hidden p-5 text-left sm:p-6 ${
              isActive
                ? "pointer-events-none z-0 scale-100 shadow-none transition-none"
                : "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:scale-[1.025] hover:shadow-2xl focus-visible:z-10 focus-visible:scale-[1.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            } ${
              selectedOption
                ? selectedTextClasses[selectedOption.tone]
                : isTexture
                  ? isActive
                    ? "border border-foreground/30 bg-transparent text-foreground"
                    : "border border-foreground/30 bg-transparent text-foreground hover:border-foreground/70 focus-visible:border-foreground/70"
                  : toneClasses[category.tone]
            } ${category.shapeClassName}`}
          >
            {selectedOption ? (
              <PlaceholderImage
                label={selectedOption.label}
                tone={selectedOption.tone}
                className="pointer-events-none absolute inset-0 h-full w-full p-0 [&>span]:hidden"
              />
            ) : null}

            <span className="absolute bottom-5 left-5 z-10 text-xl tracking-[-0.03em] sm:bottom-6 sm:left-6 sm:text-2xl">
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
