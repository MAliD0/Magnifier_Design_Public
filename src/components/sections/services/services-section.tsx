import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import styles from "./services-section.module.css";

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
    <Section id="services" data-site-section="services">
      <Container>
        <SectionHeading index={index} title={title} />

        <div className={styles.list}>
          {services.map((service, serviceIndex) => (
            <Link
              href={service.href}
              key={service.title}
              className={styles.service}
            >
              <span className={styles.index}>
                {String(serviceIndex + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.text}</p>
              <span className={styles.arrow}>→</span>
            </Link>
          ))}
          <div className={styles.endRule} />
        </div>
      </Container>
    </Section>
  );
}
