"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

import type { ContactFieldProps } from "../contact-form.types";
import {
  getCountrySuggestions,
  isKnownCountry,
} from "../data/countries";
import styles from "./contact-field-shell.module.css";
import { ContactFieldShell } from "./contact-field-shell";

const SUGGESTION_ANIMATION_MS = 180;

export function CountryField({
  field,
  value,
  error,
  onChange,
  onComplete,
}: ContactFieldProps<string>) {
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const suggestionLimit = field.suggestionLimit ?? 6;

  const suggestions = useMemo(
    () => getCountrySuggestions(value, suggestionLimit),
    [suggestionLimit, value],
  );

  const hasQuery = value.trim().length > 0;

  useEffect(() => {
    if (open && hasQuery && suggestions.length > 0) {
      setMounted(true);
      return;
    }

    if (!mounted) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setMounted(false);
    }, SUGGESTION_ANIMATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [hasQuery, mounted, open, suggestions.length]);

  function selectCountry(country: string) {
    onChange(country);
    setOpen(false);
    setActiveIndex(0);
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const nextValue = event.target.value;

    onChange(nextValue);
    setOpen(nextValue.trim().length > 0);
    setActiveIndex(0);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        Math.min(current + 1, suggestions.length - 1),
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        Math.max(current - 1, 0),
      );
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (open && suggestions[activeIndex]) {
      selectCountry(suggestions[activeIndex]);
      return;
    }

    if (isKnownCountry(value)) {
      onComplete();
      return;
    }

    setOpen(true);
  }

  function handleBlur(
    event: FocusEvent<HTMLDivElement>,
  ) {
    const nextFocus = event.relatedTarget;

    if (
      nextFocus instanceof Node &&
      event.currentTarget.contains(nextFocus)
    ) {
      return;
    }

    setOpen(false);
  }

  return (
    <ContactFieldShell label={field.label} error={error}>
      <div
        className={styles.countryPicker}
        onBlur={handleBlur}
      >
        <input
          type="text"
          name={field.id}
          value={value}
          onChange={handleChange}
          onFocus={() => setOpen(hasQuery)}
          onKeyDown={handleKeyDown}
          placeholder={field.placeholder}
          autoComplete="country-name"
          className={styles.input}
          role="combobox"
          aria-label={field.label}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={
            open && suggestions[activeIndex]
              ? `${listboxId}-${activeIndex}`
              : undefined
          }
          aria-invalid={Boolean(error)}
        />

        {mounted && hasQuery && suggestions.length > 0 ? (
          <div
            id={listboxId}
            className={styles.countrySuggestions}
            data-open={open}
            role="listbox"
            aria-label="Country suggestions"
          >
            {suggestions.map((country, index) => (
              <button
                key={country}
                id={`${listboxId}-${index}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                data-active={index === activeIndex}
                className={styles.countrySuggestion}
                onMouseDown={(event) =>
                  event.preventDefault()
                }
                onClick={() => selectCountry(country)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {country}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </ContactFieldShell>
  );
}
