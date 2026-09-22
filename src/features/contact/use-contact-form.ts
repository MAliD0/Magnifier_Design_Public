"use client";

import { useCallback, useMemo, useState } from "react";

import { debugSettingKeys } from "@/components/dev/debug-settings";
import { useDebugSetting } from "@/components/dev/use-debug-setting";

import {
  contactFormFieldById,
  contactFormFields,
  contactFormSteps,
} from "./contact-form.config";
import type {
  ContactFieldDefinition,
  ContactFieldId,
  ContactFieldValue,
  ContactFormValues,
} from "./contact-form.types";

function hasValue(
  value: ContactFieldValue | undefined,
): value is ContactFieldValue {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value?.trim());
}

function validateField(
  field: ContactFieldDefinition,
  value: ContactFieldValue | undefined,
) {
  if (!hasValue(value)) {
    return "This field is required.";
  }

  if (Array.isArray(value)) {
    return null;
  }

  const normalized = value.trim();

  if (
    field.type === "email" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
  ) {
    return "Enter a valid email address.";
  }

  if (
    field.type === "size" &&
    (!Number.isFinite(Number(normalized)) || Number(normalized) <= 0)
  ) {
    return "Enter a valid project size.";
  }

  return null;
}

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>({});
  const [errors, setErrors] = useState<
    Partial<Record<ContactFieldId, string>>
  >({});
  const [completedFieldIds, setCompletedFieldIds] = useState<
    Set<ContactFieldId>
  >(() => new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const [allowIncompleteNavigation] = useDebugSetting(
    debugSettingKeys.allowIncompleteContactNavigation,
  );

  const activeStep = contactFormSteps[activeIndex];
  const activeFields = activeStep.fieldIds.flatMap((fieldId) => {
    const field = contactFormFieldById.get(fieldId);
    return field ? [field] : [];
  });

  const fieldIndexById = useMemo(
    () =>
      new Map(
        contactFormFields.map((field, index) => [field.id, index]),
      ),
    [],
  );

  const updateValue = useCallback(
    (fieldId: ContactFieldId, value: ContactFieldValue) => {
      setValues((current) => ({
        ...current,
        [fieldId]: value,
      }));

      setErrors((current) => {
        if (!current[fieldId]) {
          return current;
        }

        const next = { ...current };
        delete next[fieldId];
        return next;
      });

      if (!hasValue(value)) {
        setCompletedFieldIds((current) => {
          if (!current.has(fieldId)) {
            return current;
          }

          const next = new Set(current);
          next.delete(fieldId);
          return next;
        });
      }
    },
    [],
  );

  const completeField = useCallback(
    (fieldId: ContactFieldId) => {
      const fieldIndex = fieldIndexById.get(fieldId);

      if (fieldIndex === undefined) {
        return false;
      }

      const field = contactFormFields[fieldIndex];
      const error = validateField(field, values[fieldId]);

      if (error) {
        setErrors((current) => ({
          ...current,
          [fieldId]: error,
        }));
        return false;
      }

      setErrors((current) => {
        if (!current[fieldId]) {
          return current;
        }

        const next = { ...current };
        delete next[fieldId];
        return next;
      });

      setCompletedFieldIds((current) => {
        const next = new Set(current);
        next.add(fieldId);
        return next;
      });

      return true;
    },
    [fieldIndexById, values],
  );

  const completeActiveStep = useCallback(() => {
    const results = activeStep.fieldIds.map((fieldId) =>
      completeField(fieldId),
    );

    return results.every(Boolean);
  }, [activeStep.fieldIds, completeField]);

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => Math.max(current - 1, 0));
  }, []);

  const goNext = useCallback(() => {
    if (allowIncompleteNavigation) {
      setActiveIndex((current) =>
        Math.min(current + 1, contactFormSteps.length - 1),
      );
      return true;
    }

    if (!completeActiveStep()) {
      return false;
    }

    setActiveIndex((current) =>
      Math.min(current + 1, contactFormSteps.length - 1),
    );

    return true;
  }, [allowIncompleteNavigation, completeActiveStep]);

  const goToField = useCallback((fieldId: ContactFieldId) => {
    const stepIndex = contactFormSteps.findIndex((step) =>
      (step.fieldIds as readonly ContactFieldId[]).includes(fieldId),
    );

    if (stepIndex >= 0) {
      setActiveIndex(stepIndex);
    }
  }, []);

  const completedStepIndices = contactFormSteps.flatMap(
    (step, index) =>
      step.fieldIds.every((fieldId) => completedFieldIds.has(fieldId))
        ? [index]
        : [],
  );

  return {
    activeIndex,
    activeStep,
    activeFields,
    values,
    errors,
    completedFieldIds,
    completedStepIndices,
    completedCount: completedFieldIds.size,
    totalFields: contactFormFields.length,
    totalSteps: contactFormSteps.length,
    allowIncompleteNavigation,
    updateValue,
    completeField,
    completeActiveStep,
    goPrevious,
    goNext,
    goToField,
  };
}
