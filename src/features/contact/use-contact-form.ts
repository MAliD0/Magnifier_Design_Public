"use client";

import { useCallback, useMemo, useState } from "react";

import { debugSettingKeys } from "@/components/dev/debug-settings";
import { useDebugSetting } from "@/components/dev/use-debug-setting";

import {
  contactFormFieldById,
  contactFormFields,
  contactFormSteps,
} from "./contact-form.config";
import { isKnownCountry } from "./data/countries";
import type {
  ContactFieldDefinition,
  ContactFieldId,
  ContactFieldValue,
  ContactFormValues,
  ContactPhoneValue,
  ContactSizeValue,
} from "./contact-form.types";

function isPhoneValue(
  value: ContactFieldValue | undefined,
): value is ContactPhoneValue {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "region" in value &&
    "number" in value
  );
}

function isSizeValue(
  value: ContactFieldValue | undefined,
): value is ContactSizeValue {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "amount" in value &&
    "unit" in value
  );
}

function hasValue(value: ContactFieldValue | undefined) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (isPhoneValue(value)) {
    return Boolean(
      value.region.trim() && value.number.trim(),
    );
  }

  if (isSizeValue(value)) {
    return Boolean(value.amount.trim());
  }

  return Boolean(value?.trim());
}

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

function validatePhone(
  field: ContactFieldDefinition,
  value: ContactFieldValue | undefined,
) {
  if (!isPhoneValue(value)) {
    return "Enter a region code and phone number.";
  }

  const regionDigits = countDigits(value.region);
  const numberDigits = countDigits(value.number);
  const validation = field.validation;

  if (!value.region.startsWith("+") || regionDigits === 0) {
    return "Add a region code, for example +48.";
  }

  if (
    validation?.maxRegionDigits &&
    regionDigits > validation.maxRegionDigits
  ) {
    return `Region code can contain up to ${validation.maxRegionDigits} digits.`;
  }

  if (
    validation?.minDigits &&
    numberDigits < validation.minDigits
  ) {
    return `Phone number must contain at least ${validation.minDigits} digits.`;
  }

  if (
    validation?.maxDigits &&
    numberDigits > validation.maxDigits
  ) {
    return `Phone number can contain up to ${validation.maxDigits} digits.`;
  }

  if (
    validation?.maxTotalDigits &&
    regionDigits + numberDigits >
      validation.maxTotalDigits
  ) {
    return `International phone number can contain up to ${validation.maxTotalDigits} digits in total.`;
  }

  return null;
}

function validateField(
  field: ContactFieldDefinition,
  value: ContactFieldValue | undefined,
) {
  if (field.type === "phone") {
    return validatePhone(field, value);
  }

  if (!hasValue(value)) {
    return "This field is required.";
  }

  if (field.type === "size") {
    if (!isSizeValue(value)) {
      return "Enter a valid project size.";
    }

    const numericSize = Number(value.amount);

    if (
      !Number.isFinite(numericSize) ||
      numericSize <= 0
    ) {
      return "Enter a valid project size.";
    }

    return null;
  }

  if (
    Array.isArray(value) ||
    isPhoneValue(value) ||
    isSizeValue(value)
  ) {
    return null;
  }

  if (typeof value !== "string") {
    return "This field is required.";
  }

  const normalized = value.trim();

  if (
    field.type === "type-selection" &&
    field.customOptionValue &&
    normalized === field.customOptionValue
  ) {
    return "Write the project type.";
  }

  if (
    field.type === "type-selection" &&
    field.customOptionValue &&
    normalized.startsWith(
      field.customOptionValue + ":",
    ) &&
    !normalized
      .slice(field.customOptionValue.length + 1)
      .trim()
  ) {
    return "Write the project type.";
  }

  if (
    field.type === "email" &&
    field.validation?.requireAtSymbol &&
    !normalized.includes("@")
  ) {
    return "Email must include @.";
  }

  if (
    field.type === "email" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
  ) {
    return "Enter a valid email address.";
  }

  if (
    field.type === "country" &&
    !isKnownCountry(normalized)
  ) {
    return "Select a country from the list.";
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

  const validFieldIds = new Set(
    contactFormFields.flatMap((field) =>
      validateField(field, values[field.id]) === null
        ? [field.id]
        : [],
    ),
  );

  const completedStepIndices = contactFormSteps.flatMap(
    (step, index) =>
      step.fieldIds.every((fieldId) =>
        validFieldIds.has(fieldId),
      )
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
    completedCount: validFieldIds.size,
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
