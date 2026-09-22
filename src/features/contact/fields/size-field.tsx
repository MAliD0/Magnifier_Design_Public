import type { KeyboardEvent } from "react";

import type { ContactFieldProps } from "../contact-form.types";
import styles from "./contact-field-shell.module.css";
import { ContactFieldShell } from "./contact-field-shell";

export function SizeField({
  field,
  value,
  error,
  onChange,
  onComplete,
}: ContactFieldProps<string>) {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      onComplete();
    }
  }

  return (
    <ContactFieldShell label={field.label} error={error}>
      <input
        type="number"
        name={field.id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={field.placeholder}
        min="1"
        step="1"
        inputMode="decimal"
        className={styles.input}
        aria-label={field.label}
      />
    </ContactFieldShell>
  );
}
