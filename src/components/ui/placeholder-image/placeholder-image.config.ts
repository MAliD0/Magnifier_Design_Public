export const placeholderImageConfig = {
  useRemoteImages: true,
  providerBaseUrl: "https://picsum.photos/seed",
  requestWidth: 1400,
  requestHeight: 1000,
} as const;

function getPlaceholderImageSeed(label: string) {
  const normalizedSeed = label
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalizedSeed || "magnifier-placeholder";
}

export function getPlaceholderImageUrl(label: string) {
  if (!placeholderImageConfig.useRemoteImages) {
    return null;
  }

  const seed = getPlaceholderImageSeed(label);

  return (
    `${placeholderImageConfig.providerBaseUrl}/${seed}/` +
    `${placeholderImageConfig.requestWidth}/` +
    `${placeholderImageConfig.requestHeight}`
  );
}
