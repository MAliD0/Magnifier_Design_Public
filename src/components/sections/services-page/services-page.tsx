import Link from "next/link";

import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionLink } from "@/components/ui/section-link";
import type { ServicesPageItem } from "@/data/services";

import styles from "./services-page.module.css";

type ServicesPageSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  services: readonly ServicesPageItem[];
};

export function ServicesPageSection({
  eyebrow,
  title,
  description,
  services,
}: ServicesPageSectionProps) {
  return (
    <div className={styles.page} data-site-section="services-page">
      <section id="services-top" className={styles.intro}>
        <Container>
          <p className={styles.eyebrow}>{eyebrow}</p>

          <div className={styles.introGrid}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <p className={styles.pageDescription}>{description}</p>
          </div>

          <nav aria-label="Service index" className={styles.indexList}>
            {services.map((service) => (
              <SectionLink
                key={service.id}
                href={`#${service.id}`}
                className={styles.indexLink}
              >
                <span className={styles.indexNumber}>{service.number}</span>
                <span className={styles.indexTitle}>{service.title}</span>
                <span className={styles.indexArrow} aria-hidden="true">
                  ↓
                </span>
              </SectionLink>
            ))}
          </nav>
        </Container>
      </section>

      <div className={styles.chapters}>
        {services.map((service) => (
          <section
            id={service.id}
            key={service.id}
            className={styles.chapter}
            data-layout={service.layout}
          >
            <Container>
              <div className={styles.chapterGrid}>
                <div className={styles.chapterMeta}>
                  <span className={styles.chapterNumber}>{service.number}</span>
                  <p className={styles.chapterName}>{service.title}</p>
                </div>

                <div className={styles.chapterBody}>
                  <h2 className={styles.tagline}>
                    {service.tagline.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>

                  <PlaceholderImage
                    label={service.media.label}
                    tone={service.media.tone}
                    className={styles.heroMedia}
                  />

                  <div className={styles.introduction}>
                    {service.introduction.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className={styles.processGrid}>
                    <h3 className={styles.processTitle}>
                      {service.processTitle}
                    </h3>

                    <div className={styles.processCopy}>
                      {service.process.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <SectionLink
                    href="#services-top"
                    className={styles.backToTop}
                  >
                    <span>Back to services</span>
                    <span aria-hidden="true">↑</span>
                  </SectionLink>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section className={styles.finalCta}>
        <Container>
          <div className={styles.finalCtaFrame}>
            <p className={styles.finalCtaEyebrow}>Start a project</p>
            <Link href="/contact" className={styles.finalCtaLink}>
              <span>Tell us about your project</span>
              <span className={styles.finalCtaArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
