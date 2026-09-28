import type { Metadata } from "next";

import { AboutPageSection } from "@/components/sections/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Roza Goseling, founder of Magnifier Design, and discover the studio’s approach to interiors, furniture, materials and detail.",
};

export default function AboutPage() {
  return <AboutPageSection />;
}
