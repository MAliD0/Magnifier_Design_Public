export const homeHeroConfig = {
  videoSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/hero.mp4`,

  headlineSize: "clamp(2.8rem, 8.8vw, 8.75rem)",
  secondLineOffset: "clamp(1.4rem, 12.5vw, 12.5rem)",
  secondLineVerticalOffset:
    "clamp(-0.02em, calc(5.953vw - 4.903rem), 0.12em)",

  videoRevealDelayMs: 0,
  videoRevealDurationMs: 1000,
  videoRevealStartOpacity: 0.8,
  videoRevealEndOpacity: 0,

  introDelayMs: 1000,
  firstLineRevealDurationMs: 1200,
  secondLineRevealDurationMs: 1200,
  lineStaggerMs: 1500,

  characterMotionDurationMs: 320,
  characterEntryOffset: "-0.01em",
  characterOvershoot: "0.03em",
} as const;
