import { AnimatedTextLine } from "@/components/ui/animated-text-line";
import { homeHeroConfig } from "@/data/home";

import styles from "./home-hero.module.css";

type HeroLineProps = {
  text: string;
  variant: "first" | "second";
  delayMs: number;
  revealDurationMs: number;
};

export function HeroLine({
  text,
  variant,
  delayMs,
  revealDurationMs,
}: HeroLineProps) {
  const variantClass =
    variant === "first" ? styles.firstLine : styles.secondLine;

  return (
    <AnimatedTextLine
      text={text}
      delayMs={delayMs}
      revealDurationMs={revealDurationMs}
      characterDurationMs={homeHeroConfig.characterMotionDurationMs}
      entryOffset={homeHeroConfig.characterEntryOffset}
      overshoot={homeHeroConfig.characterOvershoot}
      className={`${styles.line} ${variantClass}`}
    />
  );
}
