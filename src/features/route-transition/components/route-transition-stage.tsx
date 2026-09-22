"use client";

import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";

import styles from "./route-transition.module.css";
import { useRouteTransitionRuntime } from "../runtime/use-route-transition-runtime";
import { useTransitionEngine } from "../runtime/use-transition-engine";

type RouteTransitionStageProps = {
  children: ReactNode;
  mediaFill: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

type StageStyle = CSSProperties & {
  "--route-camera-x": string;
  "--route-scan-x": string;
  "--route-transition-media-fill": string;
};

export function RouteTransitionStage({
  children,
  mediaFill,
  className = "",
  style,
  ...props
}: RouteTransitionStageProps) {
  const {
    phase,
    config,
    completePhase,
  } = useRouteTransitionRuntime();
  const stageRef = useTransitionEngine({
    phase,
    config,
    onPhaseComplete: completePhase,
  });

  const stageStyle: StageStyle = {
    "--route-camera-x": "0px",
    "--route-scan-x": "0px",
    "--route-transition-media-fill": mediaFill,
    ...style,
  };

  return (
    <div
      {...props}
      ref={stageRef}
      className={`${styles.stage} ${className}`}
      data-route-transition-stage
      data-phase={phase}
      style={stageStyle}
    >
      {children}
    </div>
  );
}
