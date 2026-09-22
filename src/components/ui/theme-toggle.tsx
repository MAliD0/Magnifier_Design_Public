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

  const targetTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
      aria-label={`Switch to ${targetTheme} mode`}
      title={`Switch to ${targetTheme} mode`}
    >
      <span
        aria-hidden="true"
        className="size-2.5 rounded-full border border-current bg-current dark:bg-transparent"
      />
      <span>{targetTheme}</span>
    </button>
  );
}
