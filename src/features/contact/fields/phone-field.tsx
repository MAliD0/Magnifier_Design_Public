import type { KeyboardEvent } from "react";

import type { ContactFieldProps } from "../contact-form.types";
import styles from "./contact-field-shell.module.css";
import { ContactFieldShell } from "./contact-field-shell";

export function PhoneField({
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
        type="tel"
        name={field.id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={field.placeholder}
        autoComplete="tel"
        inputMode="tel"
        className={styles.input}
        aria-label={field.label}
      />
    </ContactFieldShell>
  );
}
