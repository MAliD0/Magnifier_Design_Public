"use client";

import { useMemo, useState } from "react";

export type DebugHudField = {
  id: string;
  label: string;
  value: string;
};

export type DebugHudToggle = {
  id: string;
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export type DebugHudAction = {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

type DebugHudProps = {
  title?: string;
  fields: readonly DebugHudField[];
  toggles?: readonly DebugHudToggle[];
  actions?: readonly DebugHudAction[];
};

export function DebugHud({
  title = "Debug",
  fields,
  toggles = [],
  actions = [],
}: DebugHudProps) {
  const [open, setOpen] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [visibleFieldIds, setVisibleFieldIds] = useState<Set<string>>(
    () => new Set(fields.map((field) => field.id)),
  );

  const visibleFields = useMemo(
    () => fields.filter((field) => visibleFieldIds.has(field.id)),
    [fields, visibleFieldIds],
  );

  const hiddenFields = useMemo(
    () => fields.filter((field) => !visibleFieldIds.has(field.id)),
    [fields, visibleFieldIds],
  );

  function removeField(fieldId: string) {
    setVisibleFieldIds((current) => {
      const next = new Set(current);
      next.delete(fieldId);
      return next;
    });
  }

  function addField(fieldId: string) {
    setVisibleFieldIds((current) => {
      const next = new Set(current);
      next.add(fieldId);
      return next;
    });
    setShowAddMenu(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[100] border border-border bg-background px-3 py-2 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-foreground shadow-lg transition-opacity hover:opacity-70"
        aria-label="Open debug HUD"
      >
        Debug
      </button>
    );
  }

  return (
    <aside className="fixed bottom-4 right-4 z-[100] w-[min(20rem,calc(100vw-2rem))] border border-border bg-background/95 text-foreground shadow-xl backdrop-blur-sm">
      <div className="relative flex items-center justify-between border-b border-border px-3 py-2">
        <p className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted">
          {title}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowAddMenu((current) => !current)}
            disabled={hiddenFields.length === 0}
            className="grid size-7 place-items-center text-sm transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-25"
            aria-label="Add debug field"
            aria-expanded={showAddMenu}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAddMenu(false);
              setOpen(false);
            }}
            className="grid size-7 place-items-center text-sm transition-opacity hover:opacity-60"
            aria-label="Close debug HUD"
          >
            ×
          </button>
        </div>

        {showAddMenu && hiddenFields.length > 0 ? (
          <div className="absolute right-3 top-full z-10 mt-1 min-w-40 border border-border bg-background p-1 shadow-lg">
            {hiddenFields.map((field) => (
              <button
                key={field.id}
                type="button"
                onClick={() => addField(field.id)}
                className="block w-full px-2 py-2 text-left text-xs transition-colors hover:bg-surface"
              >
                + {field.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <dl>
        {visibleFields.map((field) => (
          <div
            key={field.id}
            className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_1.5rem] items-center gap-3 border-b border-border px-3 py-2 last:border-b-0"
          >
            <dt className="truncate text-[0.625rem] uppercase tracking-[0.1em] text-muted">
              {field.label}
            </dt>
            <dd className="min-w-0 truncate text-right text-xs tabular-nums">
              {field.value}
            </dd>
            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="grid size-6 place-items-center text-xs text-muted transition-opacity hover:opacity-60"
              aria-label={`Hide ${field.label} field`}
            >
              ×
            </button>
          </div>
        ))}
      </dl>

      {toggles.length > 0 ? (
        <div className="border-t border-border">
          {toggles.map((toggle) => (
            <label
              key={toggle.id}
              className="flex cursor-pointer items-center justify-between gap-3 border-b border-border px-3 py-2 last:border-b-0"
            >
              <span className="text-[0.625rem] uppercase tracking-[0.1em] text-muted">
                {toggle.label}
              </span>
              <input
                type="checkbox"
                checked={toggle.enabled}
                onChange={(event) =>
                  toggle.onChange(event.target.checked)
                }
                className="size-4"
              />
            </label>
          ))}
        </div>
      ) : null}

      {actions.length > 0 ? (
        <div className="border-t border-border p-2">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              className="block w-full border border-border px-3 py-2 text-left text-[0.625rem] uppercase tracking-[0.1em] transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
