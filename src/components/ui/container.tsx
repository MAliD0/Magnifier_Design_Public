import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--content-max-width)] px-[var(--page-gutter)] ${className}`}
      {...props}
    />
  );
}
