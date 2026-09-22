import type { ReactNode } from "react";

import styles from "./contact-field-shell.module.css";

type ContactFieldShellProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function ContactFieldShell({
  label,
  error,
  children,
}: ContactFieldShellProps) {
  return (
    <div className={styles.field}>
      <h1 className={styles.label}>{label}</h1>

      <div className={styles.control}>{children}</div>

      <p
        className={styles.error}
        role={error ? "alert" : undefined}
        aria-hidden={!error}
      >
        {error ?? "\u00a0"}
      </p>
    </div>
  );
}
