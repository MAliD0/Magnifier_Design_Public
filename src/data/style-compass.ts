import type { StyleCompassCategory } from "@/components/sections/style-compass/types";

export const styleCompassCategories = [
  {
    id: "colour",
    label: "Colour",
    tone: "sand",
    shape: "square",
    options: [
      { id: "colour_01", label: "Colour direction 01", tone: "sand" },
      { id: "colour_02", label: "Colour direction 02", tone: "clay" },
      { id: "colour_03", label: "Colour direction 03", tone: "sage" },
      { id: "colour_04", label: "Colour direction 04", tone: "stone" },
    ],
  },
  {
    id: "form",
    label: "Form",
    tone: "stone",
    shape: "arch",
    options: [
      { id: "form_01", label: "Form direction 01", tone: "stone" },
      { id: "form_02", label: "Form direction 02", tone: "ink" },
      { id: "form_03", label: "Form direction 03", tone: "sand" },
      { id: "form_04", label: "Form direction 04", tone: "sage" },
    ],
  },
  {
    id: "texture",
    label: "Texture",
    tone: "ink",
    shape: "square",
    options: [
      { id: "texture_01", label: "Texture direction 01", tone: "ink" },
      { id: "texture_02", label: "Texture direction 02", tone: "stone" },
      { id: "texture_03", label: "Texture direction 03", tone: "clay" },
      { id: "texture_04", label: "Texture direction 04", tone: "sand" },
    ],
  },
  {
    id: "feeling",
    label: "Feeling",
    tone: "sage",
    shape: "rounded",
    options: [
      { id: "feeling_01", label: "Feeling direction 01", tone: "sage" },
      { id: "feeling_02", label: "Feeling direction 02", tone: "sand" },
      { id: "feeling_03", label: "Feeling direction 03", tone: "ink" },
      { id: "feeling_04", label: "Feeling direction 04", tone: "clay" },
    ],
  },
] as const satisfies readonly StyleCompassCategory[];
