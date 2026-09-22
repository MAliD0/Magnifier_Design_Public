"use client";

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
    <div className="border-b border-border">
      {stages.map((stage, stageIndex) => {
        const open = stageIndex === openStage;
        const panelId = `design-process-panel-${stage.number}`;
        const buttonId = `design-process-trigger-${stage.number}`;

        return (
          <article key={stage.number} className="border-t border-border">
            <button
              id={buttonId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => onToggleStage(stageIndex)}
              className={`grid w-full grid-cols-[2.5rem_minmax(0,1fr)_2rem] items-start gap-3 py-5 text-left transition-colors sm:grid-cols-[3.5rem_minmax(0,1fr)_2.5rem] sm:gap-4 sm:py-6 ${
                open
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <span className="pt-1 text-xs tabular-nums text-muted">
                {stage.number}
              </span>

              <span>
                <span className="block text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
                  {stage.title}
                </span>
                <span
                  className={`mt-1 block text-sm leading-6 transition-colors ${
                    open ? "text-foreground/70" : "text-muted"
                  }`}
                >
                  {stage.subtitle}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={`justify-self-end text-3xl leading-none text-accent transition-transform duration-300 ${
                  open ? "rotate-90" : ""
                }`}
              >
                ›
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                open
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-6 pb-8 pl-[3.25rem] sm:pl-[4.5rem] lg:grid-cols-[minmax(0,1fr)_minmax(12rem,0.7fr)] lg:gap-10">
                  <p className="max-w-2xl text-base leading-7 text-muted">
                    {stage.description}
                  </p>

                  <div className="border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      You receive
                    </p>
                    <p className="mt-3 text-sm leading-6">
                      {stage.result}
                    </p>
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
