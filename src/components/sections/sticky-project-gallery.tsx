import type { ComponentPropsWithoutRef, ReactNode } from "react";

type StickyProjectGalleryProps = ComponentPropsWithoutRef<"section"> & {
  hero: ReactNode;
  children: ReactNode;
  overlay?: ReactNode;
  stickyForeground?: ReactNode;
  heroClassName?: string;
  contentClassName?: string;
};

export function StickyProjectGallery({
  hero,
  children,
  overlay,
  stickyForeground,
  className = "",
  heroClassName = "",
  contentClassName = "",
  ...props
}: StickyProjectGalleryProps) {
  return (
    <section
      className={`relative isolate ${className}`}
      {...props}
    >
      <div
        className={`sticky top-0 h-svh overflow-hidden ${heroClassName}`}
      >
        {hero}
        {overlay}
      </div>

      {stickyForeground ? (
        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="sticky top-0 h-svh overflow-hidden">
            {stickyForeground}
          </div>
        </div>
      ) : null}

      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}
