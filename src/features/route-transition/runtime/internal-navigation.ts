function stripBasePath(pathname: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!basePath) {
    return pathname;
  }

  if (pathname === basePath) {
    return "/";
  }

  if (pathname.startsWith(`${basePath}/`)) {
    return pathname.slice(basePath.length) || "/";
  }

  return pathname;
}

export function getInternalTransitionTarget(
  event: MouseEvent,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }

  const target =
    event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>("a[href]")
      : null;

  if (
    !target ||
    target.dataset.routeTransition === "off" ||
    target.hasAttribute("download") ||
    (target.target && target.target !== "_self")
  ) {
    return null;
  }

  const href = target.getAttribute("href");

  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return null;
  }

  const url = new URL(target.href, window.location.href);

  if (url.origin !== window.location.origin) {
    return null;
  }

  // Hash and query updates within the same route should keep their
  // normal browser/Next behavior instead of running a full-screen
  // route transition.
  if (url.pathname === window.location.pathname) {
    return null;
  }

  const pathname = stripBasePath(url.pathname);

  return `${pathname}${url.search}${url.hash}`;
}
