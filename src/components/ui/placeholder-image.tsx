export type PlaceholderTone = "sand" | "sage" | "clay" | "stone" | "ink";

type PlaceholderImageProps = {
  label: string;
  tone?: PlaceholderTone;
  className?: string;
};

const toneClasses = {
  sand: "bg-[var(--image-sand)]",
  sage: "bg-[var(--image-sage)]",
  clay: "bg-[var(--image-clay)]",
  stone: "bg-[var(--image-stone)]",
  ink: "bg-[var(--image-ink)] text-[var(--image-ink-foreground)]",
} as const;

export function PlaceholderImage({
  label,
  tone = "stone",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-end p-4 text-xs uppercase tracking-[0.16em] transition-colors duration-200 ${toneClasses[tone]} ${className}`}
    >
      <span>{label}</span>
    </div>
  );
}
