"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import { ProjectDetails } from "./latest-projects/project-details";
import { ProjectRail } from "./latest-projects/project-rail";
import type { LatestProjectItem } from "./latest-projects/types";

export type {
  LatestProjectItem,
  LatestProjectMedia,
} from "./latest-projects/types";

type LatestProjectsProps = {
  projects: readonly LatestProjectItem[];
  index?: string;
  title?: string;
  selectionDelayMs?: number;
  className?: string;
};

export function LatestProjects({
  projects,
  index = "01",
  title = "Latest Projects",
  selectionDelayMs = 500,
  className = "",
}: LatestProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const selectionLockedRef = useRef(false);
  const selectionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  activeIndexRef.current = activeIndex;

  const requestSelect = useCallback(
    (projectIndex: number) => {
      if (
        selectionLockedRef.current ||
        projectIndex === activeIndexRef.current
      ) {
        return false;
      }

      selectionLockedRef.current = true;
      setActiveIndex(projectIndex);

      selectionTimerRef.current = setTimeout(() => {
        selectionLockedRef.current = false;
        selectionTimerRef.current = null;
      }, selectionDelayMs);

      return true;
    },
    [selectionDelayMs],
  );

  useEffect(
    () => () => {
      if (selectionTimerRef.current) {
        clearTimeout(selectionTimerRef.current);
      }
    },
    [],
  );

  if (projects.length === 0) {
    return null;
  }

  const activeProject = projects[activeIndex] ?? projects[0];

  return (
    <section className={`py-[var(--section-space)] ${className}`}>
      <Container>
        <SectionHeading index={index} title={title} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,2.2fr)] lg:items-start xl:gap-14">
          <ProjectRail
            projects={projects}
            activeIndex={activeIndex}
            onSelect={requestSelect}
            title={title}
            className="lg:col-start-2 lg:row-start-1"
          />

          <ProjectDetails
            project={activeProject}
            className="lg:col-start-1 lg:row-start-1"
          />
        </div>
      </Container>
    </section>
  );
}
