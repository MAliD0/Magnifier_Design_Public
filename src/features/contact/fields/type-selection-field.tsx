import type { ContactFieldProps } from "../contact-form.types";
import styles from "./contact-field-shell.module.css";
import { ContactFieldShell } from "./contact-field-shell";

export function TypeSelectionField({
  field,
  value,
  error,
  onChange,
}: ContactFieldProps<string | string[]>) {
  const selectedValues = Array.isArray(value)
    ? value
    : value
      ? [value]
      : [];

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

  return (
    <ContactFieldShell label={field.label} error={error}>
      <div
        className={styles.options}
        role={field.multiple ? "group" : "radiogroup"}
        aria-label={field.label}
      >
        {field.options?.map((option) => {
          const selected = selectedValues.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              className={styles.option}
              data-selected={selected}
              aria-pressed={field.multiple ? selected : undefined}
              role={field.multiple ? undefined : "radio"}
              aria-checked={field.multiple ? undefined : selected}
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
