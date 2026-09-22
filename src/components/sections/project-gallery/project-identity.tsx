import { Container } from "@/components/ui/container";

import type { ProjectGalleryProject } from "./types";

type ProjectIdentityProps = {
  project: Pick<
    ProjectGalleryProject,
    "title" | "eyebrow" | "type" | "location" | "year"
  >;
};

export function ProjectIdentity({
  project,
}: ProjectIdentityProps) {
  const details = [
    project.eyebrow,
    project.type,
    project.location,
    project.year,
  ];

  return (
    <div className="relative h-full text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/55 via-black/20 to-transparent"
      />

      <Container className="relative flex h-full flex-col justify-end py-5 sm:py-7">
        <div>
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(2.25rem,5.5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.04em] drop-shadow-sm">
            {project.title}
          </h2>

          <div className="mt-6 grid gap-x-8 gap-y-2 border-t border-white/55 pt-4 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/85 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
