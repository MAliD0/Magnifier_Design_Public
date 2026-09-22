import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
export type ServiceItem = {
  title: string;
  text: string;
  href: string;
};

type ServicesSectionProps = {
  services: readonly ServiceItem[];
  index?: string;
  title?: string;
};

export function ServicesSection({
  services,
  index = "02",
  title = "Services",
}: ServicesSectionProps) {
  return (
    <Section>
      <Container>
        <SectionHeading index={index} title={title} />

        <div className="mt-10">
          {services.map((service, serviceIndex) => (
            <Link
              href={service.href}
              key={service.title}
              className="grid gap-4 border-t border-border py-6 transition-opacity hover:opacity-60 md:grid-cols-12"
            >
              <span className="text-xs text-muted md:col-span-1">
                {String(serviceIndex + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-medium tracking-[-0.02em] md:col-span-4">
                {service.title}
              </h3>
              <p className="max-w-xl text-sm leading-6 text-muted md:col-span-6">
                {service.text}
              </p>
              <span className="text-right md:col-span-1">→</span>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>
      </Container>
    </Section>
  );
}
