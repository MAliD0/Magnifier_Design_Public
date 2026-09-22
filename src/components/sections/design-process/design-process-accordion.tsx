"use client";

import styles from "./design-process.module.css";
import { DesignProcessMediaView } from "./design-process-media";
import type { DesignProcessStage } from "./types";

type DesignProcessAccordionProps = {
  stages: readonly DesignProcessStage[];
  openStage: number | null;
  onToggleStage: (stageIndex: number) => void;
};

export function DesignProcessAccordion({
  stages,
  openStage,
  onToggleStage,
}: DesignProcessAccordionProps) {
  return (
    <div className={styles.accordion}>
      {stages.map((stage, stageIndex) => {
        const open = stageIndex === openStage;
        const panelId = `design-process-panel-${stage.number}`;
        const buttonId = `design-process-trigger-${stage.number}`;

        return (
          <article key={stage.number} className={styles.stage}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => onToggleStage(stageIndex)}
              className={styles.trigger}
              data-open={open}
            >
              <span className={styles.stageNumber}>
                {stage.number}
              </span>

              <span>
                <span className={styles.stageTitle}>
                  {stage.title}
                </span>
                <span
                  className={styles.stageSubtitle}
                  data-open={open}
                >
                  {stage.subtitle}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={styles.chevron}
                data-open={open}
              >
                ›
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              data-open={open}
            >
              <div className={styles.panelClip}>
                <div className={styles.desktopDetail}>
                  <p className={styles.stageDescription}>
                    {stage.description}
                  </p>

                  <div className={styles.result}>
                    <p className={styles.resultLabel}>
                      You receive
                    </p>
                    <p className={styles.resultText}>
                      {stage.result}
                    </p>
                  </div>
                </div>

                <div className={styles.mobileDetail}>
                  <div className={styles.mobileMedia}>
                    <DesignProcessMediaView media={stage.media} />
                  </div>

                  <div className={styles.mobileTint} />
                  <div className={styles.mobileGradient} />

                  <div className={styles.mobileCopy}>
                    <div>
                      <p className={styles.mobileLabel}>
                        Stage {stage.number}
                      </p>
                      <p className={styles.mobileDescription}>
                        {stage.description}
                      </p>
                    </div>

                    <div className={styles.mobileResult}>
                      <p className={styles.mobileLabel}>
                        You receive
                      </p>
                      <p className={styles.mobileResultText}>
                        {stage.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
