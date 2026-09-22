"use client";

import { ProjectMedia } from "./project-media";
import type { LatestProjectItem } from "./types";
import { useProjectRail } from "./use-project-rail";

type ProjectRailProps = {
  projects: readonly LatestProjectItem[];
  activeIndex: number;
  onSelect: (projectIndex: number) => boolean;
  title: string;
  className?: string;
};

export function ProjectRail({
  projects,
  activeIndex,
  onSelect,
  title,
  className = "",
}: ProjectRailProps) {
  const {
    railRef,
    cardRefs,
    railProjects,
    handleScroll,
    handleUserInteraction,
    selectProject,
    selectRenderItem,
  } = useProjectRail({
    projects,
    activeIndex,
    onSelect,
  });

  return (
    <div className={`min-w-0 overflow-hidden ${className}`}>
      <div
        ref={railRef}
        onScroll={handleScroll}
        onWheel={handleUserInteraction}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [--project-align:start] [--project-card-basis:calc((100%_-_1rem)_/_1.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:[--project-card-basis:calc((100%_-_1.5rem)_/_1.5)] lg:[--project-card-basis:calc((100%_-_3rem)_/_2)] xl:[--project-align:center] xl:[--project-card-basis:calc((100%_-_3rem)_/_3)]"
        aria-label={title}
      >
        {railProjects.map(
          ({ project, projectIndex, copyIndex }, renderIndex) => {
            const selected = projectIndex === activeIndex;

            return (
              <button
                key={`${copyIndex}-${project.id}`}
                ref={(node) => {
                  cardRefs.current[renderIndex] = node;
                }}
                type="button"
                onClick={() =>
                  selectRenderItem(projectIndex, renderIndex)
                }
                aria-pressed={selected}
                className="group basis-[var(--project-card-basis)] shrink-0 snap-start select-none text-left xl:snap-center"
              >
                <ProjectMedia
                  media={project.media}
                  selected={selected}
                />

                <div className="mt-3 flex items-center justify-between gap-4 border-t border-border pt-3">
                  <span
                    className={`text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                      selected ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {project.title}
                  </span>
                  <span className="text-xs tabular-nums text-muted">
                    {String(projectIndex + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            );
          },
        )}
      </div>

      <div
        className="mt-6 hidden gap-3 lg:flex"
        aria-label="Project selector"
      >
        {projects.map((project, projectIndex) => {
          const selected = projectIndex === activeIndex;

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => selectProject(projectIndex)}
              aria-label={`Show ${project.title}`}
              aria-current={selected ? "true" : undefined}
              className="group/selector flex h-6 flex-1 select-none items-center"
            >
              <span
                className={`block w-full transition-[height,background-color,opacity] duration-300 ${
                  selected
                    ? "h-1 bg-accent opacity-100"
                    : "h-0.5 bg-border opacity-80 group-hover/selector:bg-foreground group-hover/selector:opacity-70"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
