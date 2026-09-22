import type { Metadata } from "next";

import { ProjectGallerySection } from "@/components/sections/project-gallery";
import { PageIntro } from "@/components/ui/page-intro";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected residential and commercial interior design projects by Magnifier Design.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Projects"
        description="A curated collection of interior spaces. Explore each project through its images, details and design direction."
      />

      {projects.map((project) => (
        <ProjectGallerySection
          key={project.id}
          project={project}
        />
      ))}
    </>
  );
}
