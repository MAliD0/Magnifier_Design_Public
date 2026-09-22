import type { Metadata } from "next";

import { ContactForm } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Magnifier Design to discuss a residential or commercial interior design project.",
};

export default function ContactPage() {
  return <ContactForm />;
}
