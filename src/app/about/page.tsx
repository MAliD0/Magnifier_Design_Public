import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Magnifier Design, its approach, philosophy, and interior design practice.",
};

export default function AboutPage() {
  return (
    <PageIntro
      eyebrow="Studio"
      title="About"
      description="This page will introduce the studio, its design philosophy, team, and the principles behind each project."
    />
  );
}
