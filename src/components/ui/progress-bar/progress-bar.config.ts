export const progressBarConfig = {
  layout: {
    gapRem: 0.4,
    segmentHeightRem: 0.18,
    activeHeightRem: 0.32,
  },
  motion: {
    durationMs: 420,
    leadingEasing: "cubic-bezier(0.22, 1, 0.36, 1)",
    trailingEasing: "cubic-bezier(0.45, 0, 0.2, 1)",
  },
} as const;
