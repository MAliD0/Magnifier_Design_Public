export const debugSettingKeys = {
  allowIncompleteContactNavigation:
    "debug:allow-incomplete-contact-navigation",
} as const;

export const debugSettingsChangedEvent = "magnifier:debug-settings-changed";

export function readDebugSetting(key: string) {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(key) === "true";
}

export function writeDebugSetting(key: string, value: boolean) {
  window.localStorage.setItem(key, String(value));
  window.dispatchEvent(
    new CustomEvent(debugSettingsChangedEvent, {
      detail: { key, value },
    }),
  );
}
