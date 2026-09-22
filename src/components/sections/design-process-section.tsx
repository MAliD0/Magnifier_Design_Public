import { DesignProcessExperience } from "@/components/sections/design-process/design-process-experience";
import type { DesignProcessStage } from "@/components/sections/design-process/types";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export type { DesignProcessStage } from "@/components/sections/design-process/types";

type DesignProcessSectionProps = {
  stages: readonly DesignProcessStage[];
  index?: string;
  title?: string;
};

export function DesignProcessSection({
  stages,
  index = "03",
  title = "Design Process",
}: DesignProcessSectionProps) {
  return (
    <Section>
      <Container>
        <SectionHeading index={index} title={title} />

        <div className="mt-10">
          <DesignProcessExperience stages={stages} />
        </div>
      </Container>
    </Section>
  );
}
