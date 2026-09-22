"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/data/site";

const TOP_REVEAL_OFFSET = 16;
const DIRECTION_THRESHOLD = 6;

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId: number | null = null;

    function updateHeader() {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;

      if (menuOpen || currentScrollY <= TOP_REVEAL_OFFSET) {
        setHidden(false);
        lastScrollY = currentScrollY;
      } else if (delta >= DIRECTION_THRESHOLD) {
        setHidden(true);
        lastScrollY = currentScrollY;
      } else if (delta <= -DIRECTION_THRESHOLD) {
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-40 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative z-20 bg-background">
        <Container className="grid h-20 grid-cols-[1fr_auto] items-center gap-5 border-b border-border md:grid-cols-3">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="block w-32 sm:w-36"
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
              className="h-auto w-full dark:hidden"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/magnifier-logo-light.svg`}
              alt=""
              width={541}
              height={276}
              priority
              unoptimized
              aria-hidden="true"
              className="hidden h-auto w-full dark:block"
            />
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="header-menu-panel"
            onClick={() => setMenuOpen((open) => !open)}
            className="hidden justify-self-center select-none text-xs uppercase tracking-[0.16em] md:block"
          >
            Menu
          </button>

          <div className="flex items-center justify-self-end gap-5">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden text-xs font-medium uppercase tracking-[0.12em] sm:inline"
            >
              Tell us about your project
            </Link>
          </div>
        </Container>
      </div>

      <div
        className={`absolute inset-x-0 top-20 z-10 hidden md:block ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          id="header-menu-panel"
          className={`border-b border-border bg-background will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Container className="grid gap-10 py-10 md:grid-cols-2">
            <nav aria-label="Primary navigation">
              <ul className="space-y-2">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="text-3xl font-medium tracking-[-0.03em] transition-opacity hover:opacity-55"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col justify-between gap-8 border-t border-border pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="max-w-sm text-sm leading-6 text-muted">
                Prototype menu area for service routes, contact details and
                future navigation refinements.
              </p>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="text-sm font-medium uppercase tracking-[0.12em]"
              >
                Tell us about your project →
              </Link>
            </div>
          </Container>
        </div>
      </div>

      <div className="relative z-20 bg-background md:hidden">
        <Container>
          <nav
            aria-label="Primary navigation"
            className="flex gap-5 overflow-x-auto border-b border-border py-3 text-xs uppercase tracking-[0.12em]"
          >
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="shrink-0">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="shrink-0 font-medium">
              Tell us about your project
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
