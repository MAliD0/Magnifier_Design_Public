"use client";

import { useCallback, useEffect, useState } from "react";

import {
  debugSettingsChangedEvent,
  readDebugSetting,
  writeDebugSetting,
} from "./debug-settings";

export function useDebugSetting(key: string) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function syncSetting() {
      setEnabled(readDebugSetting(key));
    }

    syncSetting();
    window.addEventListener("storage", syncSetting);
    window.addEventListener(debugSettingsChangedEvent, syncSetting);

    return () => {
      window.removeEventListener("storage", syncSetting);
      window.removeEventListener(debugSettingsChangedEvent, syncSetting);
    };
  }, [key]);

  const setValue = useCallback(
    (value: boolean) => {
      writeDebugSetting(key, value);
      setEnabled(value);
    },
    [key],
  );

  return [enabled, setValue] as const;
}
