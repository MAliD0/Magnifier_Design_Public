import {
  CountryField,
  EmailField,
  PhoneField,
  SizeField,
  TypeSelectionField,
} from "./fields";
import type {
  ContactFieldDefinition,
  ContactFieldValue,
  ContactPhoneValue,
  ContactSizeValue,
} from "./contact-form.types";

type ContactFieldRendererProps = {
  field: ContactFieldDefinition;
  value: ContactFieldValue | undefined;
  error?: string;
  onChange: (value: ContactFieldValue) => void;
  onComplete: () => void;
  embedded?: boolean;
};

const emptyPhoneValue: ContactPhoneValue = {
  region: "",
  number: "",
};

const emptySizeValue: ContactSizeValue = {
  amount: "",
  unit: "sqm",
};

export function ContactFieldRenderer({
  field,
  value,
  error,
  onChange,
  onComplete,
  embedded = false,
}: ContactFieldRendererProps) {
  switch (field.type) {
    case "phone": {
      const phoneValue =
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        "region" in value &&
        "number" in value
          ? value
          : emptyPhoneValue;

      return (
        <PhoneField
          field={field}
          embedded={embedded}
          value={phoneValue}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );
    }

    case "email":
      return (
        <EmailField
          field={field}
          embedded={embedded}
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );

    case "country":
      return (
        <CountryField
          field={field}
          embedded={embedded}
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );

    case "size": {
      const sizeValue =
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        "amount" in value &&
        "unit" in value
          ? value
          : emptySizeValue;

      return (
        <SizeField
          field={field}
          value={sizeValue}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );
    }

    case "type-selection": {
      const selectionValue =
        typeof value === "string" || Array.isArray(value)
          ? value
          : field.multiple
            ? []
            : "";

      return (
        <TypeSelectionField
          field={field}
          value={selectionValue}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );
    }
  }
}
