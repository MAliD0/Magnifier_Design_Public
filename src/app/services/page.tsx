import type { Metadata } from "next";

import { ServicesPageSection } from "@/components/sections/services-page";
import {
  servicesPageIntro,
  servicesPageItems,
} from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential, hospitality, styling, procurement and design supervision services from Magnifier Design.",
};

export default function ServicesPage() {
  return (
    <ServicesPageSection
      eyebrow={servicesPageIntro.eyebrow}
      title={servicesPageIntro.title}
      description={servicesPageIntro.description}
      services={servicesPageItems}
    />
  );
}
