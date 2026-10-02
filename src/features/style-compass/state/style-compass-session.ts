import { STYLE_COMPASS_VERSION } from "@/data/style-compass";

import type { StyleCompassSelections } from "../domain/types";
import { isStyleCompassSelections } from "../domain/validate-style-compass";

const STORAGE_KEY = "magnifier:style-compass";

type StoredStyleCompassSession = {
  version: string;
  selections: StyleCompassSelections;
};

export function readStyleCompassSession():
  | StyleCompassSelections
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw =
      window.sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(
      raw,
    ) as Partial<StoredStyleCompassSession>;

    if (
      parsed.version !== STYLE_COMPASS_VERSION ||
      !isStyleCompassSelections(parsed.selections)
    ) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed.selections;
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function writeStyleCompassSession(
  selections: StyleCompassSelections,
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: StoredStyleCompassSession = {
    version: STYLE_COMPASS_VERSION,
    selections,
  };

  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(payload),
    );
  } catch {
    // Persistence is optional; the Compass still works without it.
  }
}
