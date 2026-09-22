import Link from "next/link";

import { Container } from "@/components/ui/container";

export function ContactCtaSection() {
  return (
    <section className="py-[calc(var(--section-space)*1.15)]">
      <Container>
        <div className="border-y border-border py-12 sm:py-16">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            Start a conversation
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="max-w-[12ch] text-5xl font-medium leading-[0.92] tracking-[-0.04em] sm:text-7xl lg:col-span-8">
              What would you like your space to become?
            </h2>

            <div className="lg:col-span-4">
              <p className="mb-6 max-w-md text-sm leading-6 text-muted">
                Test copy: tell us where your project is, what you have in mind
                and where you need help. You do not need a finished brief to
                begin.
              </p>
              <Link
                href="/contact"
                className="inline-block text-sm font-medium uppercase tracking-[0.12em]"
              >
                Tell us about your project →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
