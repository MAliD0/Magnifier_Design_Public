import Link from "next/link";

import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function HomeHero() {
  return (
    <section className="pb-[var(--section-space)] pt-6">
      <Container>
        <div className="grid min-h-[calc(100svh-7rem)] gap-6 lg:grid-cols-2">
          <PlaceholderImage
            label="Hero project image"
            tone="sand"
            className="min-h-[56svh] lg:min-h-full"
          />

          <div className="flex flex-col justify-between border-t border-border pt-4 lg:border-t-0 lg:pt-0">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              Magnifier Design Studio · Residential & Hospitality
            </p>

            <div className="py-14 lg:py-20">
              <h1 className="max-w-[10ch] text-balance text-5xl font-medium leading-[0.92] tracking-[-0.04em] sm:text-7xl xl:text-8xl">
                Interior design for living well.
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Test copy: we bring layout, materials and furniture into one
                considered design with warmth, character and a clear purpose
                for every space.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/contact"
                className="font-medium uppercase tracking-[0.12em]"
              >
                Tell us about your project →
              </Link>
              <Link
                href="/projects"
                className="text-muted transition-colors hover:text-foreground"
              >
                Explore our projects
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
