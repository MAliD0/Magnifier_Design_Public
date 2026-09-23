"use client";

import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
} from "react";

import type { ContactFieldProps } from "../contact-form.types";
import styles from "./contact-field-shell.module.css";
import { ContactFieldShell } from "./contact-field-shell";

const CUSTOM_VALUE_SEPARATOR = ":";

function isCustomValue(
  value: string,
  customOptionValue: string,
) {
  return (
    value === customOptionValue ||
    value.startsWith(
      customOptionValue + CUSTOM_VALUE_SEPARATOR,
    )
  );
}

function getCustomText(
  value: string,
  customOptionValue: string,
) {
  const prefix =
    customOptionValue + CUSTOM_VALUE_SEPARATOR;

  return value.startsWith(prefix)
    ? value.slice(prefix.length)
    : "";
}

export function TypeSelectionField({
  field,
  value,
  error,
  onChange,
  onComplete,
}: ContactFieldProps<string | string[]>) {
  const customInputRef = useRef<HTMLInputElement>(null);
  const selectedValues = Array.isArray(value)
    ? value
    : value
      ? [value]
      : [];
  const singleValue =
    typeof value === "string" ? value : "";
  const customOptionValue = field.customOptionValue;
  const customSelected =
    !field.multiple &&
    Boolean(customOptionValue) &&
    isCustomValue(singleValue, customOptionValue!);

  useEffect(() => {
    if (!customSelected) {
      return;
    }

    requestAnimationFrame(() => {
      customInputRef.current?.focus();
    });
  }, [customSelected]);

  function handleSelect(optionValue: string) {
    if (!field.multiple) {
      onChange(optionValue);
      return;
    }

    const selected = new Set(selectedValues);

    if (selected.has(optionValue)) {
      selected.delete(optionValue);
    } else {
      selected.add(optionValue);
    }

    onChange(Array.from(selected));
  }

  function handleCustomChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    if (!customOptionValue) {
      return;
    }

    onChange(
      customOptionValue +
        CUSTOM_VALUE_SEPARATOR +
        event.target.value,
    );
  }

  function handleCustomKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      onComplete();
    }
  }

  return (
    <ContactFieldShell label={field.label} error={error}>
      <div
        className={styles.options}
        role={field.multiple ? "group" : "radiogroup"}
        aria-label={field.label}
      >
        {field.options?.map((option) => {
          const isCustomOption =
            !field.multiple &&
            customOptionValue === option.value;
          const selected = isCustomOption
            ? customSelected
            : selectedValues.includes(option.value);

          if (isCustomOption && selected) {
            return (
              <div
                key={option.value}
                className={
                  styles.option +
                  " " +
                  styles.customOption
                }
                data-selected="true"
                role="radio"
                aria-checked="true"
              >
                <span className={styles.customOptionLabel}>
                  {option.label}
                </span>
                <input
                  ref={customInputRef}
                  type="text"
                  value={getCustomText(
                    singleValue,
                    option.value,
                  )}
                  onChange={handleCustomChange}
                  onKeyDown={handleCustomKeyDown}
                  placeholder={
                    field.customOptionPlaceholder ??
                    "Write your own"
                  }
                  maxLength={20}
                  className={styles.customOptionInput}
                  aria-label={
                    field.customOptionPlaceholder ??
                    "Custom option"
                  }
                />
              </div>
            );
          }

          return (
            <button
              key={option.value}
              type="button"
              className={styles.option}
              data-selected={selected}
              aria-pressed={
                field.multiple ? selected : undefined
              }
              role={field.multiple ? undefined : "radio"}
              aria-checked={
                field.multiple ? undefined : selected
              }
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </ContactFieldShell>
  );
}
