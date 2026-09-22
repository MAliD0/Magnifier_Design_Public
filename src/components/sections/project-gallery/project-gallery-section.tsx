import { ProjectHero } from "./project-hero";
import { ProjectIdentity } from "./project-identity";
import { ProjectSlides } from "./project-slides";
import { StickyProjectGallery } from "./sticky-project-gallery";
import type { ProjectGalleryProject } from "./types";

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
