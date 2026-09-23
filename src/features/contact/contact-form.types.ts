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

export type ContactPhoneValue = {
  region: string;
  number: string;
};

export type ContactSizeUnit = "sqm" | "sqft";

export type ContactSizeValue = {
  amount: string;
  unit: ContactSizeUnit;
};

export type ContactSizeQuickValues = {
  sqm: readonly number[];
  sqft: readonly number[];
};

export type ContactFieldValue =
  | string
  | string[]
  | ContactPhoneValue
  | ContactSizeValue;

export type ContactFormValues = Partial<
  Record<ContactFieldId, ContactFieldValue>
>;

export type ContactFieldOption = {
  value: string;
  label: string;
};

export type ContactFieldValidation = {
  minDigits?: number;
  maxDigits?: number;
  maxTotalDigits?: number;
  maxRegionDigits?: number;
  requireAtSymbol?: boolean;
};

export type ContactFieldDefinition = {
  id: ContactFieldId;
  type: ContactFieldType;
  label: string;
  placeholder?: string;
  regionPlaceholder?: string;
  suggestionLimit?: number;
  sizeQuickValues?: ContactSizeQuickValues;
  options?: readonly ContactFieldOption[];
  customOptionValue?: string;
  customOptionPlaceholder?: string;
  multiple?: boolean;
  validation?: ContactFieldValidation;
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
