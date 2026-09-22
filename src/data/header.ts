export const headerConfig = {
  topRevealOffsetPx: 16,
  scrollDirectionThresholdPx: 6,
  hideTransitionMs: 500,

  // Initial content reveal. Opacity only.
  contentRevealDelayMs: 3400,
  contentRevealDurationMs: 900,
  contentRevealStaggerMs: 120,

  // The section crossing this viewport position becomes the active section.
  sectionActivationPointPercent: 28,
} as const;
