"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { latestProjectsConfig } from "@/data/home";

import styles from "./latest-projects.module.css";
import { ProjectDetails } from "./project-details";
import { ProjectRail } from "./project-rail";
import type { LatestProjectItem } from "./types";

export type {
  LatestProjectItem,
  LatestProjectMedia,
} from "./types";

type LatestProjectsProps = {
  projects: readonly LatestProjectItem[];
  index?: string;
  title?: string;
  selectionDelayMs?: number;
  className?: string;
};

type LatestProjectsCssVariables = CSSProperties & {
  "--latest-project-media-transition": string;
};

const sectionStyle: LatestProjectsCssVariables = {
  "--latest-project-media-transition":
    `${latestProjectsConfig.mediaTransitionMs}ms`,
};

export function LatestProjects({
  projects,
  index = "01",
  title = "Latest Projects",
  selectionDelayMs = latestProjectsConfig.selectionDelayMs,
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
    <Section
      id="projects"
      data-site-section="projects"
      className={className}
      style={sectionStyle}
    >
      <Container>
        <SectionHeading index={index} title={title} />

        <div className={styles.layout}>
          <ProjectRail
            projects={projects}
            activeIndex={activeIndex}
            onSelect={requestSelect}
            title={title}
          />

          <ProjectDetails project={activeProject} />
        </div>
      </Container>
    </Section>
  );
}
