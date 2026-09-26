import {
  type ChangeEvent,
  type KeyboardEvent,
  useRef,
} from "react";

import type {
  ContactFieldProps,
  ContactPhoneValue,
} from "../contact-form.types";
import styles from "./contact-field-shell.module.css";
import { ContactFieldShell } from "./contact-field-shell";

function normalizeRegionCode(
  value: string,
  maxDigits: number,
) {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, maxDigits);

  return digits ? `+${digits}` : "";
}

export function PhoneField({
  field,
  value,
  error,
  onChange,
  onComplete,
  embedded = false,
}: ContactFieldProps<ContactPhoneValue> & { embedded?: boolean }) {
  const numberRef = useRef<HTMLInputElement>(null);
  const maxRegionDigits =
    field.validation?.maxRegionDigits ?? 4;

  function handleRegionChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    onChange({
      ...value,
      region: normalizeRegionCode(
        event.target.value,
        maxRegionDigits,
      ),
    });
  }

  function handleRegionKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    numberRef.current?.focus();
  }

  function handleNumberKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      onComplete();
    }
  }

  return (
    <ContactFieldShell
      label={field.label}
      error={error}
      embedded={embedded}
    >
      <div className={styles.phoneControl}>
        <label className={styles.phoneSubfield}>
          <span className={styles.subfieldLabel}>Region</span>
          <input
            type="tel"
            name="phone-region"
            value={value.region}
            onChange={handleRegionChange}
            onKeyDown={handleRegionKeyDown}
            placeholder={field.regionPlaceholder}
            autoComplete="tel-country-code"
            inputMode="tel"
            maxLength={maxRegionDigits + 1}
            className={styles.input}
            aria-label="Phone region code"
            aria-invalid={Boolean(error)}
          />
        </label>

        <label className={styles.phoneSubfield}>
          <span className={styles.subfieldLabel}>Number</span>
          <input
            ref={numberRef}
            type="tel"
            name={field.id}
            value={value.number}
            onChange={(event) =>
              onChange({
                ...value,
                number: event.target.value,
              })
            }
            onKeyDown={handleNumberKeyDown}
            placeholder={field.placeholder}
            autoComplete="tel-national"
            inputMode="tel"
            className={styles.input}
            aria-label="Phone number"
            aria-invalid={Boolean(error)}
          />
        </label>
      </div>
    </ContactFieldShell>
  );
}
