import Link from "next/link";

import { Container } from "@/components/ui/container";

import styles from "./contact-cta-section.module.css";

export function ContactCtaSection() {
  return (
    <section
      id="contact"
      data-site-section="contact"
      className={styles.section}
    >
      <Container>
        <div className={styles.frame}>
          <p className={styles.eyebrow}>Start a conversation</p>

          <div className={styles.layout}>
            <h2 className={styles.title}>
              What would you like your space to become?
            </h2>

            <div className={styles.copy}>
              <p className={styles.description}>
                Test copy: tell us where your project is, what you have in mind
                and where you need help. You do not need a finished brief to
                begin.
              </p>
              <Link href="/contact" className={styles.link}>
                Tell us about your project →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
