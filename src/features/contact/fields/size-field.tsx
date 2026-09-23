import type { KeyboardEvent } from "react";

import type {
  ContactFieldProps,
  ContactSizeUnit,
  ContactSizeValue,
} from "../contact-form.types";
import styles from "./contact-field-shell.module.css";
import { ContactFieldShell } from "./contact-field-shell";

const SQM_TO_SQFT = 10.7639;

function getUnitLabel(unit: ContactSizeUnit) {
  return unit === "sqm" ? "sq.m." : "sq.ft.";
}

function convertAmount(
  amount: string,
  from: ContactSizeUnit,
  to: ContactSizeUnit,
) {
  const numeric = Number(amount);

  if (
    !amount.trim() ||
    !Number.isFinite(numeric) ||
    numeric <= 0 ||
    from === to
  ) {
    return amount;
  }

  const converted =
    from === "sqm"
      ? numeric * SQM_TO_SQFT
      : numeric / SQM_TO_SQFT;

  return String(Math.round(converted));
}

export function SizeField({
  field,
  value,
  error,
  onChange,
  onComplete,
}: ContactFieldProps<ContactSizeValue>) {
  const quickValues =
    field.sizeQuickValues?.[value.unit] ?? [];
  const unitLabel = getUnitLabel(value.unit);

  function setUnit(unit: ContactSizeUnit) {
    if (unit === value.unit) {
      return;
    }

    onChange({
      unit,
      amount: convertAmount(
        value.amount,
        value.unit,
        unit,
      ),
    });
  }

  function handleKeyDown(
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
      headerAction={
        <div
          className={styles.unitSwitch}
          data-unit={value.unit}
          role="group"
          aria-label="Size measurement unit"
        >
          <span
            className={styles.unitSwitchIndicator}
            aria-hidden="true"
          />
          <button
            type="button"
            className={styles.unitSwitchButton}
            data-selected={value.unit === "sqm"}
            aria-pressed={value.unit === "sqm"}
            onClick={() => setUnit("sqm")}
          >
            sq.m.
          </button>
          <button
            type="button"
            className={styles.unitSwitchButton}
            data-selected={value.unit === "sqft"}
            aria-pressed={value.unit === "sqft"}
            onClick={() => setUnit("sqft")}
          >
            sq.ft.
          </button>
        </div>
      }
    >
      <div className={styles.sizeControl}>
        <div className={styles.sizeQuickArea}>
          <span className={styles.sizeAreaLabel}>
            Quick select
          </span>

          <div className={styles.sizeQuickOptions}>
            {quickValues.map((quickValue) => {
              const selected =
                value.amount === String(quickValue);

              return (
                <button
                  key={quickValue}
                  type="button"
                  className={styles.sizeQuickButton}
                  data-selected={selected}
                  aria-pressed={selected}
                  onClick={() =>
                    onChange({
                      ...value,
                      amount: String(quickValue),
                    })
                  }
                >
                  {quickValue}
                  <span>{unitLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.sizeManualArea}>
          <span className={styles.sizeAreaLabel}>
            Manual size
          </span>

          <div className={styles.sizeInputWrap}>
            <input
              type="number"
              name={field.id}
              value={value.amount}
              onChange={(event) =>
                onChange({
                  ...value,
                  amount: event.target.value,
                })
              }
              onKeyDown={handleKeyDown}
              placeholder={field.placeholder}
              min="1"
              step="1"
              inputMode="decimal"
              className={styles.input + " " + styles.sizeInput}
              aria-label={field.label + " in " + unitLabel}
              aria-invalid={Boolean(error)}
            />
            <span
              className={styles.sizeInputUnit}
              aria-hidden="true"
            >
              {unitLabel}
            </span>
          </div>
        </div>
      </div>
    </ContactFieldShell>
  );
}
