"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

import { Container } from "@/components/ui/container";
import { SectionLink } from "@/components/ui/section-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { headerConfig } from "@/data/header";
import { siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";

import styles from "./header.module.css";
import { useHeaderScrollVisibility } from "./use-header-scroll-visibility";

type HeaderCssVariables = CSSProperties & {
  "--header-hide-transition": string;
  "--header-content-reveal-delay": string;
  "--header-content-reveal-duration": string;
  "--header-content-reveal-stagger": string;
};

const headerStyle: HeaderCssVariables = {
  "--header-hide-transition":
    `${headerConfig.hideTransitionMs}ms`,
  "--header-content-reveal-delay":
    `${headerConfig.contentRevealDelayMs}ms`,
  "--header-content-reveal-duration":
    `${headerConfig.contentRevealDurationMs}ms`,
  "--header-content-reveal-stagger":
    `${headerConfig.contentRevealStaggerMs}ms`,
};

export function Header() {
  const pathname = usePathname();
  const hidden = useHeaderScrollVisibility();
  const { activeSection, isResolved } = useActiveSection({
    activationPointPercent:
      headerConfig.sectionActivationPointPercent,
  });

  const initialVariant =
    pathname === "/" ? "transparent" : "default";
  const variant = isResolved
    ? activeSection?.headerVariant ?? "default"
    : initialVariant;

  return (
    <header
      className={styles.header}
      data-hidden={hidden}
      data-variant={variant}
      data-section-ready={isResolved}
      data-active-section={activeSection?.id}
      style={headerStyle}
    >
      <div className={styles.surface}>
        <Container className={styles.primaryRow}>
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className={`${styles.logo} ${styles.revealLogo}`}
          >
            <span className="sr-only">{siteConfig.name}</span>

            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/magnifier-logo-dark.svg`}
              alt=""
              width={541}
              height={276}
              priority
              unoptimized
              aria-hidden="true"
              className={`${styles.logoImage} ${styles.logoDark}`}
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/magnifier-logo-light.svg`}
              alt=""
              width={541}
              height={276}
              priority
              unoptimized
              aria-hidden="true"
              className={`${styles.logoImage} ${styles.logoLight}`}
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className={`${styles.desktopNavigation} ${styles.revealNavigation}`}
          >
            {siteConfig.navigation.map((item) =>
              pathname === "/" && item.href.startsWith("/#") ? (
                <SectionLink
                  key={item.href}
                  href={item.href.slice(1) as `#${string}`}
                  className={styles.navigationLink}
                >
                  {item.label}
                </SectionLink>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navigationLink}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className={`${styles.actions} ${styles.revealActions}`}>
            <ThemeToggle />
            <Link
              href="/contact"
              className={styles.contactLink}
            >
              Tell us about your project
            </Link>
          </div>
        </Container>
      </div>

      <div className={`${styles.surface} ${styles.mobileSurface}`}>
        <Container>
          <nav
            aria-label="Primary navigation"
            className={`${styles.mobileNavigation} ${styles.revealNavigation}`}
          >
            {siteConfig.navigation.map((item) =>
              pathname === "/" && item.href.startsWith("/#") ? (
                <SectionLink
                  key={item.href}
                  href={item.href.slice(1) as `#${string}`}
                  className={styles.mobileNavigationLink}
                >
                  {item.label}
                </SectionLink>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.mobileNavigationLink}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/contact"
              className={`${styles.mobileNavigationLink} ${styles.mobileContactLink}`}
            >
              Tell us about your project
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
