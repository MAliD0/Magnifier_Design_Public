"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const currentTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    setTheme(currentTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The visual theme can still change when storage is unavailable.
    }

    setTheme(nextTheme);
  }

  const isDark = theme === "dark";
  const targetTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      data-transition-fade
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={`Switch to ${targetTheme} mode`}
      title={`Switch to ${targetTheme} mode`}
      className="inline-flex h-9 w-12 select-none items-center justify-center transition-opacity hover:opacity-70"
    >
      <span
        aria-hidden="true"
        className="relative h-5 w-9 overflow-hidden rounded-full border border-foreground/35 bg-foreground/10"
      >
        <span
          className={`absolute left-0.5 top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-foreground transition-transform duration-200 ease-out ${
            isDark ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
