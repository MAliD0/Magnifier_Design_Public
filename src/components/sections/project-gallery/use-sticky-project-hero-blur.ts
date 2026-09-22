"use client";

import {
  type RefObject,
  useEffect,
} from "react";

type UseStickyProjectHeroBlurOptions<
  TSection extends HTMLElement,
  THero extends HTMLElement,
> = {
  sectionRef: RefObject<TSection | null>;
  heroRef: RefObject<THero | null>;
  maxBlurPx: number;
  distanceInHeroHeights: number;
};

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function useStickyProjectHeroBlur<
  TSection extends HTMLElement,
  THero extends HTMLElement,
>({
  sectionRef,
  heroRef,
  maxBlurPx,
  distanceInHeroHeights,
}: UseStickyProjectHeroBlurOptions<TSection, THero>) {
  useEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;

    if (!section || !hero) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      hero.style.setProperty(
        "--project-gallery-hero-blur",
        "0px",
      );
      return;
    }

    let frameId: number | null = null;

    const update = () => {
      frameId = null;

      const sectionTop =
        section.getBoundingClientRect().top;
      const heroHeight = Math.max(
        hero.getBoundingClientRect().height,
        1,
      );
      const blurDistance = Math.max(
        heroHeight * distanceInHeroHeights,
        1,
      );
      const progress = clamp01(
        -sectionTop / blurDistance,
      );
      const blurPx = maxBlurPx * progress;

      hero.style.setProperty(
        "--project-gallery-hero-blur",
        `${blurPx.toFixed(2)}px`,
      );
    };

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [
    distanceInHeroHeights,
    heroRef,
    maxBlurPx,
    sectionRef,
  ]);
}
