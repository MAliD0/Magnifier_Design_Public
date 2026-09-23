import type { ReactNode } from "react";

import styles from "./contact-field-shell.module.css";

type ContactFieldShellProps = {
  label: string;
  error?: string;
  headerAction?: ReactNode;
  children: ReactNode;
};

export function ContactFieldShell({
  label,
  error,
  headerAction,
  children,
}: ContactFieldShellProps) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldHeader}>
        <h1 className={styles.label}>{label}</h1>

        {headerAction ? (
          <div className={styles.headerAction}>
            {headerAction}
          </div>
        ) : null}
      </div>

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
