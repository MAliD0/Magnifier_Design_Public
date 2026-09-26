import type { ReactNode } from "react";

import styles from "./contact-field-shell.module.css";

type ContactFieldShellProps = {
  label?: string;
  error?: string;
  headerAction?: ReactNode;
  embedded?: boolean;
  compact?: boolean;
  children: ReactNode;
};

export function ContactFieldShell({
  label,
  error,
  headerAction,
  embedded = false,
  compact = false,
  children,
}: ContactFieldShellProps) {
  const showHeader = Boolean(label || headerAction);

  return (
    <div
      className={embedded ? styles.embeddedField : styles.field}
      data-compact={compact || undefined}
    >
      {showHeader ? (
        <div className={styles.fieldHeader}>
          {label ? (
            embedded ? (
              <p className={styles.embeddedLabel}>{label}</p>
            ) : (
              <h1 className={styles.label}>{label}</h1>
            )
          ) : null}

          {headerAction ? (
            <div className={styles.headerAction}>
              {headerAction}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={styles.control}>{children}</div>

      {embedded || error ? (
        <p
          className={styles.error}
          role={error ? "alert" : undefined}
          aria-hidden={!error}
        >
          {error ?? "\u00a0"}
        </p>
      ) : null}
    </div>
  );
}
