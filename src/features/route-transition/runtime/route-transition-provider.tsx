"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { defaultRouteTransitionConfig } from "../core/config";
import type {
  RouteTransitionConfig,
  RouteTransitionContent,
  RouteTransitionContentMap,
  RouteTransitionPhase,
} from "../core/types";
import { clearRouteTransitionMedia } from "../effects/media-effect";
import { clearRouteTransitionText } from "../effects/text-effect";
import { getInternalTransitionTarget } from "./internal-navigation";
import { RouteTransitionContext } from "./route-transition-context";

type RouteTransitionProviderProps = {
  children: ReactNode;
  contentByPath?: RouteTransitionContentMap;
  fallbackContent?: RouteTransitionContent | null;
  config?: RouteTransitionConfig;
  interceptLinks?: boolean;
};

function getPathname(targetPath: string) {
  return new URL(
    targetPath,
    window.location.origin,
  ).pathname;
}

function resolveContent(
  targetPath: string,
  contentByPath: RouteTransitionContentMap | undefined,
  fallbackContent: RouteTransitionContent | null | undefined,
) {
  const pathname = getPathname(targetPath);

  return contentByPath?.[pathname] ?? fallbackContent ?? null;
}

export function RouteTransitionProvider({
  children,
  contentByPath,
  fallbackContent = null,
  config = defaultRouteTransitionConfig,
  interceptLinks = true,
}: RouteTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] =
    useState<RouteTransitionPhase>("idle");
  const [targetPath, setTargetPath] =
    useState<string | null>(null);
  const [content, setContent] =
    useState<RouteTransitionContent | null>(null);
  const phaseRef = useRef<RouteTransitionPhase>("idle");

  const setTransitionPhase = useCallback(
    (nextPhase: RouteTransitionPhase) => {
      phaseRef.current = nextPhase;
      setPhase(nextPhase);
    },
    [],
  );

  useEffect(() => {
    if (phase === "idle") {
      delete document.documentElement.dataset.routeTransition;
      document.body.style.overflow = "";
      return;
    }

    document.documentElement.dataset.routeTransition = phase;
    document.body.style.overflow = "hidden";
  }, [phase]);

  useEffect(
    () => () => {
      clearRouteTransitionMedia();
      clearRouteTransitionText();
      delete document.documentElement.dataset.routeTransition;
      document.body.style.overflow = "";
    },
    [],
  );

  const startTransition = useCallback(
    (nextTargetPath: string) => {
      if (phaseRef.current !== "idle") {
        return;
      }

      const url = new URL(
        nextTargetPath,
        window.location.href,
      );

      if (url.origin !== window.location.origin) {
        window.location.assign(url.href);
        return;
      }

      if (url.pathname === window.location.pathname) {
        return;
      }

      clearRouteTransitionMedia();
      clearRouteTransitionText();

      const normalizedTarget =
        `${url.pathname}${url.search}${url.hash}`;

      setTargetPath(normalizedTarget);
      setContent(
        resolveContent(
          normalizedTarget,
          contentByPath,
          fallbackContent,
        ),
      );
      setTransitionPhase("exit");
    },
    [
      contentByPath,
      fallbackContent,
      setTransitionPhase,
    ],
  );

  const completePhase = useCallback(
    (completedPhase: "exit" | "enter") => {
      if (phaseRef.current !== completedPhase) {
        return;
      }

      if (completedPhase === "exit") {
        if (!targetPath) {
          setTransitionPhase("idle");
          return;
        }

        setTransitionPhase("cover");
        router.push(targetPath);
        return;
      }

      clearRouteTransitionMedia();
      clearRouteTransitionText();
      setTransitionPhase("idle");
      setTargetPath(null);
      setContent(null);
    },
    [router, setTransitionPhase, targetPath],
  );

  useEffect(() => {
    if (phase !== "cover" || !targetPath) {
      return;
    }

    if (pathname !== getPathname(targetPath)) {
      return;
    }

    let firstFrame = 0;
    let secondFrame = 0;
    let holdTimer = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        holdTimer = window.setTimeout(() => {
          if (phaseRef.current === "cover") {
            setTransitionPhase("enter");
          }
        }, config.coverHoldMs);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(holdTimer);
    };
  }, [
    config.coverHoldMs,
    pathname,
    phase,
    setTransitionPhase,
    targetPath,
  ]);

  useEffect(() => {
    if (!interceptLinks) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const nextTarget = getInternalTransitionTarget(event);

      if (!nextTarget) {
        return;
      }

      event.preventDefault();

      if (phaseRef.current !== "idle") {
        return;
      }

      startTransition(nextTarget);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [interceptLinks, startTransition]);

  const value = useMemo(
    () => ({
      phase,
      targetPath,
      content,
      isTransitioning: phase !== "idle",
      startTransition,
      config,
      completePhase,
    }),
    [
      completePhase,
      config,
      content,
      phase,
      startTransition,
      targetPath,
    ],
  );

  return (
    <RouteTransitionContext.Provider value={value}>
      {children}
    </RouteTransitionContext.Provider>
  );
}
