"use client";

import type {
  CSSProperties,
  ReactNode,
} from "react";

import styles from "./route-transition.module.css";
import { useRouteTransition } from "../runtime/use-route-transition";

type RouteTransitionLayerProps = {
  children?: ReactNode;
  screenClassName?: string;
  screenStyle?: CSSProperties;
};

export function RouteTransitionLayer({
  children,
  screenClassName = "",
  screenStyle,
}: RouteTransitionLayerProps) {
  const { phase } = useRouteTransition();

  return (
    <div
      className={styles.layer}
      data-phase={phase}
      aria-hidden={phase === "idle"}
    >
      <div
        className={`${styles.screen} ${screenClassName}`}
        data-phase={phase}
        style={screenStyle}
      >
        {children}
      </div>
    </div>
  );
}
