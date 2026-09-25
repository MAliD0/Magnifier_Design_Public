"use client";

import type {
  ComponentPropsWithoutRef,
  MouseEvent,
} from "react";

type SectionLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href"
> & {
  href: `#${string}`;
};

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function SectionLink({
  href,
  onClick,
  target,
  ...props
}: SectionLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      isModifiedClick(event) ||
      (target && target !== "_self")
    ) {
      return;
    }

    const targetId = decodeURIComponent(href.slice(1));
    const section = document.getElementById(targetId);

    if (!section) {
      return;
    }

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    section.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    if (window.location.hash !== href) {
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${href}`,
      );
    }
  }

  return (
    <a
      {...props}
      href={href}
      target={target}
      data-route-transition="off"
      onClick={handleClick}
    />
  );
}
