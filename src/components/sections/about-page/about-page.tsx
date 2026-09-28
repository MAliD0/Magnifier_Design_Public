import Link from "next/link";

import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { aboutPageContent } from "@/data/about";

import styles from "./about-page.module.css";

export function AboutPageSection() {
  const content = aboutPageContent;

  return (
    <main className={styles.page} data-site-section="about-page">
      <section className={styles.hero}>
        <Container className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroHeading}>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h1 className={styles.title}>
                {content.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
            </div>

            <p className={styles.founder}>{content.founder}</p>

            <blockquote className={styles.heroQuote}>
              <p>“{content.quote}”</p>
            </blockquote>

            <PlaceholderImage
              label={content.media.portrait.label}
              tone={content.media.portrait.tone}
              className={styles.portrait}
            />
          </div>
        </Container>
      </section>

      <section className={styles.story}>
        <Container>
          <div className={styles.storyGrid}>
            <div className={styles.sectionMarker}>
              <span>01</span>
              <span>Experience</span>
            </div>

            <PlaceholderImage
              label={content.media.project.label}
              tone={content.media.project.tone}
              className={styles.projectMedia}
            />

            <p className={styles.experience}>{content.experience}</p>

            <div className={styles.philosophyBlock}>
              <div className={styles.sectionMarker}>
                <span>02</span>
                <span>Approach</span>
              </div>

              <p className={styles.philosophy}>
                {content.philosophy}
              </p>
            </div>

            <PlaceholderImage
              label={content.media.detail.label}
              tone={content.media.detail.tone}
              className={styles.detailMedia}
            />
          </div>
        </Container>
      </section>

      <section className={styles.practice}>
        <Container>
          <div className={styles.practiceGrid}>
            <div className={styles.sectionMarker}>
              <span>03</span>
              <span>Magnifier Design Today</span>
            </div>

            <div className={styles.practiceCopy}>
              {content.practice.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <PlaceholderImage
              label={content.media.process.label}
              tone={content.media.process.tone}
              className={styles.processMedia}
            />
          </div>
        </Container>
      </section>

      <section className={styles.contact}>
        <Container>
          <Link href="/contact" className={styles.contactLink}>
            <span>{content.cta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </Container>
      </section>
    </main>
  );
}
