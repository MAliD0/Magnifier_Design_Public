"use client";

import { Container } from "@/components/ui/container";
import {
  RouteTransitionLayer,
  useRouteTransition,
} from "@/features/route-transition";

import styles from "./magnifier-route-transition.module.css";

export function MagnifierRouteTransition() {
  const { content, phase } = useRouteTransition();

  return (
    <RouteTransitionLayer screenClassName={styles.screen}>
      {content ? (
        <Container
          className={styles.content}
          data-phase={phase}
          key={content.id}
        >
          {content.eyebrow ? (
            <p className={styles.eyebrow}>
              {content.eyebrow}
            </p>
          ) : null}

          <h2 className={styles.headline}>
            {content.lines.map((line, lineIndex) => (
              <span
                className={styles.headlineLine}
                key={content.id + "-" + lineIndex}
              >
                {line}
              </span>
            ))}
          </h2>
        </Container>
      ) : null}
    </RouteTransitionLayer>
  );
}
