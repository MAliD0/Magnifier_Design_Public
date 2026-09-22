export const smoothScrollConfig = {
  enabled: true,

  // 0 = never reaches target, 1 = immediate. Lower values feel smoother.
  lerpFactor: 0.12,
  wheelMultiplier: 1,
  stopThresholdPx: 0.5,

  // Used only for browsers/devices that report wheel input in lines.
  wheelLineHeightPx: 16,
} as const;
