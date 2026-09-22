"use client";

import { useState } from "react";

import { designProcessConfig } from "@/data/home";

import styles from "./design-process.module.css";
import { DesignProcessAccordion } from "./design-process-accordion";
import { DesignProcessMediaView } from "./design-process-media";
import type { DesignProcessStage } from "./types";

type DesignProcessExperienceProps = {
  stages: readonly DesignProcessStage[];
};

export function DesignProcessExperience({
  stages,
}: DesignProcessExperienceProps) {
  const [openStage, setOpenStage] = useState<number | null>(
    designProcessConfig.initialStageIndex,
  );
  const [activeStage, setActiveStage] = useState<number>(
    designProcessConfig.initialStageIndex,
  );

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
    <div className={styles.layout}>
      <div className={styles.desktopMedia}>
        <div className={styles.mediaFrame}>
          {stages.map((stage, stageIndex) => {
            const activeMedia = stageIndex === activeStage;

            return (
              <div
                key={stage.number}
                aria-hidden={!activeMedia}
                className={styles.mediaLayer}
                data-active={activeMedia}
              >
                <DesignProcessMediaView media={stage.media} />
              </div>
            );
          })}

          <div className={styles.mediaGradient} />

          <div className={styles.mediaHeader}>
            <span>Stage {active.number}</span>
            <span>{active.title}</span>
          </div>

          <div className={styles.mediaCopy}>
            <p className={styles.mediaLead}>
              How you spend your mornings. Where you work, unwind and welcome
              people.
            </p>

            <p className={styles.mediaDescription}>
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
