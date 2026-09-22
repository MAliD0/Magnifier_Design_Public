export type ContactFieldId =
  | "phone"
  | "email"
  | "country"
  | "size"
  | "project-type"
  | "service-type"
  | "conditions"
  | "timeline";

export type ContactFieldType =
  | "phone"
  | "email"
  | "country"
  | "size"
  | "type-selection";

export type ContactFieldValue = string | string[];

export type ContactFormValues = Partial<
  Record<ContactFieldId, ContactFieldValue>
>;

export type ContactFieldOption = {
  value: string;
  label: string;
};

export type ContactFieldDefinition = {
  id: ContactFieldId;
  type: ContactFieldType;
  label: string;
  placeholder?: string;
  options?: readonly ContactFieldOption[];
  multiple?: boolean;
};

export type ContactFormStepDefinition = {
  id: string;
  fieldIds: readonly ContactFieldId[];
};

export type ContactFieldProps<TValue extends ContactFieldValue> = {
  field: ContactFieldDefinition;
  value: TValue;
  error?: string;
  onChange: (value: TValue) => void;
  onComplete: () => void;
};
