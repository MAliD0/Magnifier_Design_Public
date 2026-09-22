export { defaultRouteTransitionConfig } from "./core/config";
export { RouteTransitionLayer } from "./components/route-transition-layer";
export { RouteTransitionStage } from "./components/route-transition-stage";
export { RouteTransitionProvider } from "./runtime/route-transition-provider";
export { useRouteTransition } from "./runtime/use-route-transition";

export type {
  RouteTransitionConfig,
  RouteTransitionContent,
  RouteTransitionContentMap,
  RouteTransitionPhase,
} from "./core/types";
