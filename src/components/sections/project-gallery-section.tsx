import { ProjectHero } from "@/components/sections/project-gallery/project-hero";
import { ProjectIdentity } from "@/components/sections/project-gallery/project-identity";
import { ProjectSlides } from "@/components/sections/project-gallery/project-slides";
import type { ProjectGalleryProject } from "@/components/sections/project-gallery/types";
import { StickyProjectGallery } from "@/components/sections/sticky-project-gallery";

type ProjectGallerySectionProps = {
  project: ProjectGalleryProject;
};

export function ProjectGallerySection({
  project,
}: ProjectGallerySectionProps) {
  return (
    <StickyProjectGallery
      id={project.id}
      aria-label={`${project.title} project gallery`}
      hero={<ProjectHero hero={project.hero} />}
      overlay={
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/20"
        />
      }
      stickyForeground={<ProjectIdentity project={project} />}
    >
      <ProjectSlides slides={project.slides} />
    </StickyProjectGallery>
  );
}
