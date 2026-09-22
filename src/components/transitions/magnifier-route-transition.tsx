"use client";

import { AnimatedTextLine } from "@/components/ui/animated-text-line";
import { Container } from "@/components/ui/container";
import {
  RouteTransitionLayer,
  useRouteTransition,
} from "@/features/route-transition";

import styles from "./magnifier-route-transition.module.css";

const headlineConfig = {
  revealDelayMs: 220,
  lineStaggerMs: 180,
  lineRevealDurationMs: 650,
  characterDurationMs: 360,
} as const;

export function MagnifierRouteTransition() {
  const { content } = useRouteTransition();

  return (
    <RouteTransitionLayer screenClassName={styles.screen}>
      {content ? (
        <Container
          className={styles.content}
          key={content.id}
        >
          {content.eyebrow ? (
            <p className={styles.eyebrow}>
              {content.eyebrow}
            </p>
          ) : null}

          <h2
            className={styles.headline}
            aria-label={content.lines.join(" ")}
          >
            {content.lines.map((line, lineIndex) => (
              <AnimatedTextLine
                key={`${content.id}-${lineIndex}`}
                text={line}
                delayMs={
                  headlineConfig.revealDelayMs +
                  lineIndex *
                    headlineConfig.lineStaggerMs
                }
                revealDurationMs={
                  headlineConfig.lineRevealDurationMs
                }
                characterDurationMs={
                  headlineConfig.characterDurationMs
                }
                entryOffset="0em"
                overshoot="0em"
                className={styles.headlineLine}
              />
            ))}
          </h2>
        </Container>
      ) : null}
    </RouteTransitionLayer>
  );
}
