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
} from "./contact-form.types";

type ContactFieldRendererProps = {
  field: ContactFieldDefinition;
  value: ContactFieldValue | undefined;
  error?: string;
  onChange: (value: ContactFieldValue) => void;
  onComplete: () => void;
};

export function ContactFieldRenderer({
  field,
  value,
  error,
  onChange,
  onComplete,
}: ContactFieldRendererProps) {
  switch (field.type) {
    case "phone":
      return (
        <PhoneField
          field={field}
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );

    case "email":
      return (
        <EmailField
          field={field}
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
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );

    case "size":
      return (
        <SizeField
          field={field}
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );

    case "type-selection":
      return (
        <TypeSelectionField
          field={field}
          value={value ?? (field.multiple ? [] : "")}
          error={error}
          onChange={onChange}
          onComplete={onComplete}
        />
      );
  }
}
