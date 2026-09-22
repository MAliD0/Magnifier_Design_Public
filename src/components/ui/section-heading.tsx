type SectionHeadingProps = {
  index: string;
  title: string;
  className?: string;
};

export function SectionHeading({
  index,
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 border-t border-border pt-4 ${className}`}
    >
      <span className="text-xs uppercase tracking-[0.16em] text-muted">
        {index}
      </span>
      <h2 className="text-sm font-medium uppercase tracking-[0.14em]">
        {title}
      </h2>
    </div>
  );
}
