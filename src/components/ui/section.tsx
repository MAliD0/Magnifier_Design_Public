import type { ComponentPropsWithoutRef } from "react";

import styles from "./section.module.css";

export type SectionVariant = "default" | "interactive";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  variant?: SectionVariant;
};

export function Section({
  className = "",
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={`py-[var(--section-space)] ${styles.section} ${className}`}
      data-section-variant={variant}
      {...props}
    />
  );
}
