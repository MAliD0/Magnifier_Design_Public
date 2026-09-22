import Link from "next/link";

import type { LatestProjectItem } from "./types";

type ProjectDetailsProps = {
  project: LatestProjectItem;
  className?: string;
};

export function ProjectDetails({
  project,
  className = "",
}: ProjectDetailsProps) {
  const metadata = [
    ["Type", project.type],
    ["Area", project.area],
    ["Location", project.location],
    ["Year", project.year],
  ] as const;

  return (
    <aside
      className={`border-t border-border pt-5 lg:sticky lg:top-24 ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.16em] text-muted">
        Selected project
      </p>

      <h3 className="mt-4 text-4xl font-medium leading-[0.95] tracking-[-0.035em] sm:text-5xl">
        {project.title}
      </h3>

      <dl className="mt-8 space-y-2 text-sm">
        {metadata.map(([label, value]) =>
          value ? (
            <div
              key={label}
              className="flex justify-between gap-4 border-b border-border pb-2"
            >
              <dt className="text-muted">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ) : null,
        )}
      </dl>

      {project.description ? (
        <p className="mt-7 text-sm leading-6 text-muted">
          {project.description}
        </p>
      ) : null}

      <div className="mt-8 border-t border-border pt-4">
        <Link
          href={project.href}
          className="inline-block text-xs font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
        >
          View project →
        </Link>
      </div>
    </aside>
  );
}
