import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="pb-8 pt-4">
      <Container>
        <div className="grid gap-8 border-t border-border pt-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm font-medium uppercase tracking-[0.12em]">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              Test footer copy for an international interior design studio.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:col-span-3"
          >
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-2 text-sm text-muted md:col-span-4 md:text-right">
            <p>contact@magnifierdesign.com</p>
            <p>International projects</p>
            <p>Instagram · Pinterest</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© 2026 Magnifier Design</p>
          <p>Privacy · Test link</p>
        </div>
      </Container>
    </footer>
  );
}
