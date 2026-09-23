import type {
  ContactFieldDefinition,
  ContactFormStepDefinition,
} from "./contact-form.types";

export const contactFormFields = [
  {
    id: "phone",
    type: "phone",
    label: "Phone",
    regionPlaceholder: "+48",
    placeholder: "123 456 789",
    validation: {
      minDigits: 6,
      maxDigits: 14,
      maxTotalDigits: 15,
      maxRegionDigits: 4,
    },
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "email@mail.com",
    validation: {
      requireAtSymbol: true,
    },
  },
  {
    id: "country",
    type: "country",
    label: "Country",
    placeholder: "Country",
    suggestionLimit: 4,
  },
  {
    id: "size",
    type: "size",
    label: "Size",
    placeholder: "Enter size",
    sizeQuickValues: {
      sqm: [50, 75, 100, 150, 200, 300],
      sqft: [500, 750, 1000, 1500, 2000, 3000],
    },
  },
  {
    id: "project-type",
    type: "type-selection",
    label: "Type of project",
    options: [
      { value: "residential", label: "Residential" },
      { value: "room", label: "Room" },
      { value: "commercial", label: "Commercial" },
      { value: "other", label: "Other" },
    ],
    customOptionValue: "other",
    customOptionPlaceholder: "Write project type",
  },
  {
    id: "service-type",
    type: "type-selection",
    label: "Type of service",
    options: [
      { value: "interior-design", label: "Interior design" },
      { value: "styling", label: "Styling" },
      { value: "consultation", label: "Consultation" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "conditions",
    type: "type-selection",
    label: "Conditions",
    multiple: true,
    options: [
      { value: "white-walls", label: "White walls" },
      { value: "change-design", label: "Change design" },
      { value: "renovation", label: "Renovation" },
    ],
  },
  {
    id: "timeline",
    type: "type-selection",
    label: "Time requirements",
    options: [
      { value: "very-urgent", label: "Very urgent" },
      { value: "regular", label: "Regular" },
      { value: "planning", label: "Planning" },
    ],
  },
] as const satisfies readonly ContactFieldDefinition[];

export const contactFormSteps = [
  {
    id: "contact-details",
    fieldIds: ["phone", "email"],
  },
  {
    id: "country",
    fieldIds: ["country"],
  },
  {
    id: "size",
    fieldIds: ["size"],
  },
  {
    id: "project-type",
    fieldIds: ["project-type"],
  },
  {
    id: "service-type",
    fieldIds: ["service-type"],
  },
  {
    id: "conditions",
    fieldIds: ["conditions"],
  },
  {
    id: "timeline",
    fieldIds: ["timeline"],
  },
] as const satisfies readonly ContactFormStepDefinition[];

export const contactFormFieldById = new Map(
  contactFormFields.map((field) => [field.id, field]),
);
