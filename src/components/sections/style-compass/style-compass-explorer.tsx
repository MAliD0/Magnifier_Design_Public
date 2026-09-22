import { useEffect, useState } from "react";

import { PlaceholderImage } from "@/components/ui/placeholder-image";

import type {
  StyleCompassCategory,
  StyleCompassOptionId,
} from "./types";

type StyleCompassExplorerProps = {
  category: StyleCompassCategory;
  optionIndex: number;
  open: boolean;
  collapsedBox: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  collapsedBorderRadius: string;
  expandedBorderRadius: string;
  selectedOptionId: StyleCompassOptionId | null;
  onSelect: (optionId: StyleCompassOptionId) => void;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
};

export function StyleCompassExplorer({
  category,
  optionIndex,
  open,
  collapsedBox,
  collapsedBorderRadius,
  expandedBorderRadius,
  selectedOptionId,
  onSelect,
  onPrevious,
  onNext,
  onClose,
}: StyleCompassExplorerProps) {
  const [hasOpened, setHasOpened] = useState(open);
  const option = category.options[optionIndex] ?? category.options[0];
  const position = String(optionIndex + 1).padStart(2, "0");
  const total = String(category.options.length).padStart(2, "0");
  const isSelected = selectedOptionId === option.id;
  const isInk = option.tone === "ink";
  const closing = hasOpened && !open;

  const foregroundClass = isInk
    ? "text-[var(--brand-light)]"
    : "text-foreground";
  const mutedClass = isInk
    ? "text-white/70"
    : "text-foreground/70";
  const subtleClass = isInk
    ? "text-white/75"
    : "text-foreground/75";
  const backClass = isInk
    ? "border-white/55"
    : "border-foreground/55";
  const dividerClass = isInk
    ? "border-white/35"
    : "border-foreground/35";
  const controlClass = isInk
    ? "border-white/45 hover:bg-white/10"
    : "border-foreground/45 hover:bg-foreground/10";
  const selectedControlClass = isInk
    ? "border-white bg-white text-[var(--brand-dark)]"
    : "border-foreground bg-foreground text-background";
  const progressActiveClass = isInk
    ? "bg-white"
    : "bg-foreground";
  const progressIdleClass = isInk
    ? "bg-white/25"
    : "bg-foreground/25";

  useEffect(() => {
    if (open) {
      setHasOpened(true);
    }
  }, [open]);

  return (
    <div
      className={`absolute z-20 overflow-hidden transition-[left,top,width,height,border-radius] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        open ? "" : "pointer-events-none"
      }`}
      style={{
        left: open ? 0 : collapsedBox.left,
        top: open ? 0 : collapsedBox.top,
        width: open ? "100%" : collapsedBox.width,
        height: open ? "100%" : collapsedBox.height,
        borderRadius: open
          ? expandedBorderRadius
          : collapsedBorderRadius,
      }}
    >
      <div
        className={`absolute inset-0 transition-opacity ease-out motion-reduce:transition-none ${
          closing
            ? "opacity-0 delay-[360ms] duration-200"
            : "opacity-100 delay-0 duration-0"
        }`}
      >
        <PlaceholderImage
          key={option.id}
          label={option.label}
          tone={option.tone}
          className="absolute inset-0 h-full w-full [&>span]:hidden"
        />
      </div>

      <div
        className={`pointer-events-none absolute bottom-5 left-5 z-10 text-xl tracking-[-0.03em] sm:bottom-6 sm:left-6 sm:text-2xl ${foregroundClass}`}
      >
        {category.label}
      </div>

      <div
        className={`relative flex h-full flex-col justify-between p-5 transition-[opacity,transform] ease-out motion-reduce:transition-none sm:p-6 ${foregroundClass} ${
          open
            ? "translate-y-0 opacity-100 delay-[180ms] duration-300"
            : "translate-y-4 opacity-0 delay-0 duration-150"
        }`}
      >
        <div className="flex items-start justify-between gap-6">
          <p
            className={`text-[0.65rem] uppercase tracking-[0.16em] ${mutedClass}`}
          >
            Style Compass
          </p>

          <button
            type="button"
            onClick={onClose}
            className={`select-none border-b pb-1 text-[0.65rem] uppercase tracking-[0.14em] transition-opacity hover:opacity-60 ${backClass}`}
          >
            Back ↑
          </button>
        </div>

        <div className="pb-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className={`text-sm ${mutedClass}`}>
                Explore the options and notice what you keep coming back to.
              </p>
              <p className="mt-2 text-lg">{option.label}</p>
            </div>

            <p
              className={`shrink-0 text-xs tabular-nums tracking-[0.14em] ${subtleClass}`}
            >
              {position} / {total}
            </p>
          </div>

          <div
            className={`mt-5 flex flex-wrap items-center gap-2 border-t pt-4 ${dividerClass}`}
          >
            <button
              type="button"
              onClick={onPrevious}
              className={`grid size-11 select-none place-items-center border transition-colors ${controlClass}`}
              aria-label={`Previous ${category.label} option`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNext}
              className={`grid size-11 select-none place-items-center border transition-colors ${controlClass}`}
              aria-label={`Next ${category.label} option`}
            >
              →
            </button>

            <button
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`h-11 select-none border px-4 text-[0.65rem] uppercase tracking-[0.12em] transition-colors ${
                isSelected
                  ? selectedControlClass
                  : controlClass
              }`}
            >
              {isSelected ? "Selected ✓" : "Select option"}
            </button>

            <div className="min-w-28 flex-1 basis-32 sm:ml-3">
              <div className="flex gap-1.5">
                {category.options.map((item, index) => (
                  <span
                    key={item.id}
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      index === optionIndex
                        ? progressActiveClass
                        : progressIdleClass
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
