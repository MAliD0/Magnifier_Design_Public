"use client";

import { useEffect, useState } from "react";

import {
  DebugHud,
  type DebugHudField,
} from "@/components/dev/debug-hud";
import { debugSettingKeys } from "@/components/dev/debug-settings";
import { useDebugSetting } from "@/components/dev/use-debug-setting";
import { headerConfig } from "@/data/header";
import { useRouteTransition } from "@/features/route-transition";
import { useActiveSection } from "@/hooks/use-active-section";

type ViewportSize = {
  width: number;
  height: number;
};

function getResponsiveLayout(width: number) {
  if (width >= 1024) {
    return {
      layout: "Desktop",
      range: "≥ 1024px · lg+",
    };
  }

  if (width >= 768) {
    return {
      layout: "Tablet",
      range: "768–1023px · md",
    };
  }

  return {
    layout: "Mobile",
    range: "< 768px · <md",
  };
}

export function ViewportDebugHud() {
  const [viewport, setViewport] =
    useState<ViewportSize | null>(null);
  const [
    allowIncompleteContactNavigation,
    setAllowIncompleteContactNavigation,
  ] = useDebugSetting(
    debugSettingKeys.allowIncompleteContactNavigation,
  );
  const { phase, startTransition } = useRouteTransition();
  const { activeSection } = useActiveSection({
    activationPointPercent:
      headerConfig.sectionActivationPointPercent,
  });

  useEffect(() => {
    let frameId: number | null = null;

    function measureViewport() {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      frameId = null;
    }

    function handleResize() {
      if (frameId === null) {
        frameId =
          window.requestAnimationFrame(measureViewport);
      }
    }

    measureViewport();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const responsiveLayout = viewport
    ? getResponsiveLayout(viewport.width)
    : {
        layout: "Detecting…",
        range: "—",
      };

  const fields: readonly DebugHudField[] = [
    {
      id: "viewport",
      label: "Viewport size",
      value: viewport
        ? `${viewport.width} × ${viewport.height}px`
        : "—",
    },
    {
      id: "layout-mode",
      label: "Responsive layout",
      value: responsiveLayout.layout,
    },
    {
      id: "breakpoint",
      label: "Breakpoint range",
      value: responsiveLayout.range,
    },
    {
      id: "active-section",
      label: "Active section",
      value: activeSection
        ? `${activeSection.id} · ${activeSection.headerVariant}`
        : "—",
    },
    {
      id: "route-transition",
      label: "Route transition",
      value: phase,
    },
  ];

  return (
    <DebugHud
      title="Responsive Debug"
      fields={fields}
      toggles={[
        {
          id: "contact-validation",
          label: "Allow incomplete contact steps",
          enabled: allowIncompleteContactNavigation,
          onChange: setAllowIncompleteContactNavigation,
        },
      ]}
      actions={[
        {
          id: "transition-to-contact",
          label: "Go to contact with transition",
          onClick: () => startTransition("/contact"),
          disabled: phase !== "idle",
        },
      ]}
    />
  );
}
