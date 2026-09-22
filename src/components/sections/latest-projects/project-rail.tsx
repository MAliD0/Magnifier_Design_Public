"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

import styles from "./latest-projects.module.css";
import { ProjectMedia } from "./project-media";
import type { LatestProjectItem } from "./types";
import { useProjectRail } from "./use-project-rail";

type ProjectRailProps = {
  projects: readonly LatestProjectItem[];
  activeIndex: number;
  onSelect: (projectIndex: number) => boolean;
  title: string;
};

export function ProjectRail({
  projects,
  activeIndex,
  onSelect,
  title,
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
    <div className={styles.railShell}>
      <div
        ref={railRef}
        onScroll={handleScroll}
        onWheel={handleUserInteraction}
        className={styles.rail}
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
                className={styles.card}
              >
                <ProjectMedia
                  media={project.media}
                  selected={selected}
                />

                <div className={styles.cardMeta}>
                  <span
                    className={styles.cardTitle}
                    data-selected={selected}
                  >
                    {project.title}
                  </span>
                  <span className={styles.cardNumber}>
                    {String(projectIndex + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            );
          },
        )}
      </div>

      <div className={styles.selector}>
        <ProgressBar
          currentIndex={activeIndex}
          totalItems={projects.length}
          ariaLabel="Project selector"
          onSelect={selectProject}
          getItemLabel={(projectIndex) =>
            `Show ${projects[projectIndex]?.title ?? "project"}`
          }
        />
      </div>
    </div>
  );
}
