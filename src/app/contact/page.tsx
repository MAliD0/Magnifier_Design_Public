import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Magnifier Design to discuss a residential or commercial interior design project.",
};

export default function ContactPage() {
  return (
    <PageIntro
      eyebrow="Start a project"
      title="Contact"
      description="Project inquiry details and the contact form will be added once the required fields and submission flow are approved."
    />
  );
}
