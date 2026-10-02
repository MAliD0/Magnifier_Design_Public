"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

export function useStyleCompassMediaActivation(
  compassRef: RefObject<HTMLDivElement | null>,
) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const compass = compassRef.current;

    if (!compass || active) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some(
            (entry) =>
              entry.isIntersecting ||
              entry.intersectionRatio > 0,
          )
        ) {
          setActive(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100% 0px",
      },
    );

    observer.observe(compass);

    return () => observer.disconnect();
  }, [active, compassRef]);

  return active;
}
