import type { CSSProperties } from "react";

import { DesignProcessExperience } from "@/components/sections/design-process/design-process-experience";
import type { DesignProcessStage } from "@/components/sections/design-process/types";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { designProcessConfig } from "@/data/home";

import styles from "./design-process.module.css";

export type { DesignProcessStage } from "@/components/sections/design-process/types";

type DesignProcessSectionProps = {
  stages: readonly DesignProcessStage[];
  index?: string;
  title?: string;
};

type DesignProcessCssVariables = CSSProperties & {
  "--design-process-media-transition": string;
  "--design-process-accordion-transition": string;
};

const sectionStyle: DesignProcessCssVariables = {
  "--design-process-media-transition":
    `${designProcessConfig.mediaTransitionMs}ms`,
  "--design-process-accordion-transition":
    `${designProcessConfig.accordionTransitionMs}ms`,
};

export function DesignProcessSection({
  stages,
  index = "03",
  title = "Design Process",
}: DesignProcessSectionProps) {
  return (
    <Section
      id="design-process"
      data-site-section="design-process"
      className={styles.section}
      style={sectionStyle}
    >
      <Container>
        <SectionHeading index={index} title={title} />

        <div className={styles.sectionContent}>
          <DesignProcessExperience stages={stages} />
        </div>
      </Container>
    </Section>
  );
}
