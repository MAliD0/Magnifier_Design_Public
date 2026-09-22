"use client";

import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  useRef,
} from "react";

import { projectGalleryConfig } from "./project-gallery.config";
import { useStickyProjectHeroBlur } from "./use-sticky-project-hero-blur";

type StickyProjectGalleryProps =
  ComponentPropsWithoutRef<"section"> & {
    hero: ReactNode;
    children: ReactNode;
    overlay?: ReactNode;
    stickyForeground?: ReactNode;
    heroClassName?: string;
    contentClassName?: string;
  };

type HeroBlurStyle = CSSProperties & {
  "--project-gallery-hero-blur": string;
};

const heroBlurStyle: HeroBlurStyle = {
  "--project-gallery-hero-blur": "0px",
  filter: "blur(var(--project-gallery-hero-blur))",
  willChange: "filter",
};

export function StickyProjectGallery({
  hero,
  children,
  overlay,
  stickyForeground,
  className = "",
  heroClassName = "",
  contentClassName = "",
  ...props
}: StickyProjectGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useStickyProjectHeroBlur({
    sectionRef,
    heroRef,
    maxBlurPx:
      projectGalleryConfig.stickyHeroBlur.maxBlurPx,
    distanceInHeroHeights:
      projectGalleryConfig.stickyHeroBlur
        .distanceInHeroHeights,
  });

  return (
    <section
      ref={sectionRef}
      className={`relative isolate ${className}`}
      {...props}
    >
      <div
        className={`sticky top-0 h-svh overflow-hidden ${heroClassName}`}
      >
        <div
          ref={heroRef}
          className="absolute inset-0"
          style={heroBlurStyle}
        >
          {hero}
        </div>

        {overlay}
      </div>

      {stickyForeground ? (
        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="sticky top-0 h-svh overflow-hidden">
            {stickyForeground}
          </div>
        </div>
      ) : null}

      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}
