import type { CSSProperties } from "react";

import { HeroLine } from "@/components/sections/home-hero/hero-line";
import { Container } from "@/components/ui/container";
import { homeHeroConfig } from "@/data/home";

import styles from "./home-hero.module.css";

type HeroCssVariables = CSSProperties & {
  "--hero-headline-size": string;
  "--hero-second-line-offset": string;
  "--hero-second-line-vertical-offset": string;
  "--hero-character-entry-offset": string;
  "--hero-character-overshoot": string;
  "--hero-character-duration": string;
  "--hero-video-reveal-delay": string;
  "--hero-video-reveal-duration": string;
  "--hero-video-reveal-start-opacity": string;
  "--hero-video-reveal-end-opacity": string;
};

function getHeroCssVariables(): HeroCssVariables {
  return {
    "--hero-headline-size": homeHeroConfig.headlineSize,
    "--hero-second-line-offset": homeHeroConfig.secondLineOffset,
    "--hero-second-line-vertical-offset":
      homeHeroConfig.secondLineVerticalOffset,
    "--hero-character-entry-offset": homeHeroConfig.characterEntryOffset,
    "--hero-character-overshoot": homeHeroConfig.characterOvershoot,
    "--hero-character-duration":
      `${homeHeroConfig.characterMotionDurationMs}ms`,
    "--hero-video-reveal-delay":
      `${homeHeroConfig.videoRevealDelayMs}ms`,
    "--hero-video-reveal-duration":
      `${homeHeroConfig.videoRevealDurationMs}ms`,
    "--hero-video-reveal-start-opacity":
      String(homeHeroConfig.videoRevealStartOpacity),
    "--hero-video-reveal-end-opacity":
      String(homeHeroConfig.videoRevealEndOpacity),
  };
}

export function HomeHero() {
  const firstLineDelay = homeHeroConfig.introDelayMs;
  const secondLineDelay =
    firstLineDelay + homeHeroConfig.lineStaggerMs;

  return (
    <section
      id="hero"
      data-site-section="hero"
      data-header-variant="transparent"
      className={styles.hero}
      data-transition-media
      style={getHeroCssVariables()}
    >
      <div
        className={styles.fallbackBackground}
        data-transition-media-content
      />

      <video
        className={styles.video}
        data-transition-media-content
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={homeHeroConfig.videoSrc} type="video/mp4" />
      </video>

      <div
        className={styles.videoOverlay}
        data-transition-media-content
      />
      <div
        className={styles.videoReveal}
        data-transition-media-content
        aria-hidden="true"
      />

      <Container className={styles.content}>
        <h1
          className={styles.headline}
          aria-label="Shaping Spaces, Inspiring Lives."
        >
          <HeroLine
            text="Shaping Spaces,"
            variant="first"
            delayMs={firstLineDelay}
            revealDurationMs={homeHeroConfig.firstLineRevealDurationMs}
          />

          <HeroLine
            text="Inspiring Lives."
            variant="second"
            delayMs={secondLineDelay}
            revealDurationMs={homeHeroConfig.secondLineRevealDurationMs}
          />
        </h1>
      </Container>
    </section>
  );
}
