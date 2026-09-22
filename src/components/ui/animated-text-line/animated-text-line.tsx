import type { CSSProperties } from "react";

import styles from "./animated-text-line.module.css";

type AnimatedTextLineProps = {
  text: string;
  delayMs: number;
  revealDurationMs: number;
  characterDurationMs: number;
  entryOffset: string;
  overshoot: string;
  className?: string;
};

type LineStyle = CSSProperties & {
  "--animated-character-duration": string;
  "--animated-character-entry-offset": string;
  "--animated-character-overshoot": string;
};

type CharacterStyle = CSSProperties & {
  "--animated-character-delay": string;
};

function getCharacterDelay(
  characterIndex: number,
  characterCount: number,
  lineDelayMs: number,
  revealDurationMs: number,
  characterDurationMs: number,
) {
  const availableStaggerTime = Math.max(
    revealDurationMs - characterDurationMs,
    0,
  );
  const staggerStep =
    characterCount > 1
      ? availableStaggerTime / (characterCount - 1)
      : 0;

  return lineDelayMs + characterIndex * staggerStep;
}

export function AnimatedTextLine({
  text,
  delayMs,
  revealDurationMs,
  characterDurationMs,
  entryOffset,
  overshoot,
  className = "",
}: AnimatedTextLineProps) {
  const characters = Array.from(text);
  const lineStyle: LineStyle = {
    "--animated-character-duration": `${characterDurationMs}ms`,
    "--animated-character-entry-offset": entryOffset,
    "--animated-character-overshoot": overshoot,
  };

  return (
    <span
      className={`${styles.line} ${className}`}
      style={lineStyle}
      aria-hidden="true"
    >
      {characters.map((character, index) => {
        const characterStyle: CharacterStyle = {
          "--animated-character-delay": `${getCharacterDelay(
            index,
            characters.length,
            delayMs,
            revealDurationMs,
            characterDurationMs,
          )}ms`,
        };

        return (
          <span
            className={styles.character}
            style={characterStyle}
            key={`${character}-${index}`}
          >
            {character === " " ? "\u00A0" : character}
          </span>
        );
      })}
    </span>
  );
}
