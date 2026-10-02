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

            <div className={styles.experience}>
              <h2 className={styles.sectionTitle}>
                {content.experience.title}
              </h2>

              <div className={styles.sectionCopy}>
                {content.experience.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className={styles.approachBlock}>
              <div className={styles.sectionMarker}>
                <span>02</span>
                <span>Approach</span>
              </div>

              <h2 className={styles.sectionTitle}>
                {content.approach.title}
              </h2>

              <div className={styles.sectionCopy}>
                {content.approach.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
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
              <h2 className={styles.sectionTitle}>
                {content.practice.title}
              </h2>

              <div className={styles.sectionCopy}>
                {content.practice.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <PlaceholderImage
              label={content.media.process.label}
              tone={content.media.process.tone}
              className={styles.processMedia}
            />
          </div>
        </Container>
      </section>

      <section className={styles.actionsSection}>
        <Container>
          <div className={styles.actionLinks}>
            <Link href="/projects" className={styles.actionLink}>
              <span>{content.actions.projects}</span>
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/contact" className={styles.actionLink}>
              <span>{content.actions.contact}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
