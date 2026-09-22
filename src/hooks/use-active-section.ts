"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type HeaderVariant = "default" | "transparent";

export type ActiveSection = {
  id: string;
  headerVariant: HeaderVariant;
};

type UseActiveSectionOptions = {
  activationPointPercent?: number;
};

type ActiveSectionState = {
  activeSection: ActiveSection | null;
  isResolved: boolean;
};

const SECTION_SELECTOR = "[data-site-section]";

function getSectionMetadata(
  element: HTMLElement,
): ActiveSection | null {
  const id = element.dataset.siteSection;

  if (!id) {
    return null;
  }

  return {
    id,
    headerVariant:
      element.dataset.headerVariant === "transparent"
        ? "transparent"
        : "default",
  };
}

function resolveActiveSection(
  sections: readonly HTMLElement[],
  activationPointPercent: number,
) {
  const activationY =
    window.innerHeight * (activationPointPercent / 100);

  const containingSection = sections.find((section) => {
    const rect = section.getBoundingClientRect();

    return rect.top <= activationY && rect.bottom > activationY;
  });

  if (containingSection) {
    return getSectionMetadata(containingSection);
  }

  const nearestVisibleSection = sections
    .map((section) => {
      const rect = section.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;

      return {
        section,
        visible,
        distance: Math.min(
          Math.abs(rect.top - activationY),
          Math.abs(rect.bottom - activationY),
        ),
      };
    })
    .filter(({ visible }) => visible)
    .sort((a, b) => a.distance - b.distance)[0]?.section;

  return nearestVisibleSection
    ? getSectionMetadata(nearestVisibleSection)
    : null;
}

export function useActiveSection({
  activationPointPercent = 28,
}: UseActiveSectionOptions = {}): ActiveSectionState {
  const pathname = usePathname();
  const [activeSection, setActiveSection] =
    useState<ActiveSection | null>(null);
  const [resolvedPathname, setResolvedPathname] =
    useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR),
    );

    if (sections.length === 0) {
      setActiveSection(null);
      setResolvedPathname(pathname);
      return;
    }

    const activationPoint = Math.min(
      Math.max(activationPointPercent, 1),
      98,
    );
    const bottomMargin = 99 - activationPoint;

    function updateActiveSection() {
      const nextSection = resolveActiveSection(
        sections,
        activationPoint,
      );

      setActiveSection((current) => {
        if (
          current?.id === nextSection?.id &&
          current?.headerVariant === nextSection?.headerVariant
        ) {
          return current;
        }

        return nextSection;
      });
      setResolvedPathname(pathname);
    }

    const observer = new IntersectionObserver(
      updateActiveSection,
      {
        rootMargin:
          `-${activationPoint}% 0px -${bottomMargin}% 0px`,
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [activationPointPercent, pathname]);

  return {
    activeSection,
    isResolved: resolvedPathname === pathname,
  };
}
