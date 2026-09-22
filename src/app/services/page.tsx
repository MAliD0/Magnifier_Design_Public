import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interior design services offered by Magnifier Design for residential and commercial spaces.",
};

export default function ServicesPage() {
  return (
    <PageIntro
      eyebrow="What we do"
      title="Services"
      description="The final service offering, process, and scope will be defined here before we build the complete service presentation."
    />
  );
}
