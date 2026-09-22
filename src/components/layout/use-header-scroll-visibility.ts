"use client";

import { useEffect, useState } from "react";

import { headerConfig } from "@/data/header";

export function useHeaderScrollVisibility() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId: number | null = null;

    function updateHeader() {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= headerConfig.topRevealOffsetPx) {
        setHidden(false);
        lastScrollY = currentScrollY;
      } else if (
        delta >= headerConfig.scrollDirectionThresholdPx
      ) {
        setHidden(true);
        lastScrollY = currentScrollY;
      } else if (
        delta <= -headerConfig.scrollDirectionThresholdPx
      ) {
        setHidden(false);
        lastScrollY = currentScrollY;
      }

      frameId = null;
    }

    function handleScroll() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateHeader);
      }
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return hidden;
}
