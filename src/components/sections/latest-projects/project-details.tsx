import Link from "next/link";

import styles from "./latest-projects.module.css";
import type { LatestProjectItem } from "./types";

type ProjectDetailsProps = {
  project: LatestProjectItem;
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const metadata = [
    ["Type", project.type],
    ["Area", project.area],
    ["Location", project.location],
    ["Year", project.year],
  ] as const;

  return (
    <aside className={styles.details}>
      <p className={styles.selectedLabel}>Selected project</p>

      <h3 className={styles.projectTitle}>{project.title}</h3>

      <dl className={styles.metadata}>
        {metadata.map(([label, value]) =>
          value ? (
            <div key={label} className={styles.metadataRow}>
              <dt className={styles.metadataLabel}>{label}</dt>
              <dd className={styles.metadataValue}>{value}</dd>
            </div>
          ) : null,
        )}
      </dl>

      {project.description ? (
        <p className={styles.description}>{project.description}</p>
      ) : null}

      <div className={styles.projectLinkWrap}>
        <Link href={project.href} className={styles.projectLink}>
          View project →
        </Link>
      </div>
    </aside>
  );
}
