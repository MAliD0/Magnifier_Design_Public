"use client";

import { useState } from "react";

import { DesignProcessAccordion } from "./design-process-accordion";
import { DesignProcessMediaView } from "./design-process-media";
import type { DesignProcessStage } from "./types";

type DesignProcessExperienceProps = {
  stages: readonly DesignProcessStage[];
};

export function DesignProcessExperience({
  stages,
}: DesignProcessExperienceProps) {
  const [openStage, setOpenStage] = useState<number | null>(0);
  const [activeStage, setActiveStage] = useState(0);

  function toggleStage(stageIndex: number) {
    if (openStage === stageIndex) {
      setOpenStage(null);
      return;
    }

    setActiveStage(stageIndex);
    setOpenStage(stageIndex);
  }

  const active = stages[activeStage] ?? stages[0];

  if (!active) {
    return null;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 xl:gap-20">
      <div className="lg:sticky lg:top-24">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-auto lg:h-[min(72svh,46rem)] lg:min-h-[34rem]">
          {stages.map((stage, stageIndex) => {
            const activeMedia = stageIndex === activeStage;

            return (
              <div
                key={stage.number}
                aria-hidden={!activeMedia}
                className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                  activeMedia
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[1.015] opacity-0"
                }`}
              >
                <DesignProcessMediaView media={stage.media} />
              </div>
            );
          })}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-xs uppercase tracking-[0.16em] text-white/80 sm:p-6">
            <span>Stage {active.number}</span>
            <span>{active.title}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6 lg:p-8">
            <p className="max-w-[22ch] text-2xl font-medium leading-[1.08] tracking-[-0.025em] sm:text-3xl xl:text-4xl">
              How you spend your mornings. Where you work, unwind and welcome
              people.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
              What you want to keep, and what no longer works. These details
              shape a home as much as its style. We develop the interior through
              four connected stages.
            </p>
          </div>
        </div>
      </div>

      <DesignProcessAccordion
        stages={stages}
        openStage={openStage}
        onToggleStage={toggleStage}
      />
    </div>
  );
}
