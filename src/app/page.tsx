import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { DesignProcessSection } from "@/components/sections/design-process-section";
import { HomeHero } from "@/components/sections/home-hero";
import { LatestProjects } from "@/components/sections/latest-projects";
import { ServicesSection } from "@/components/sections/services-section";
import { StyleCompassSection } from "@/components/sections/style-compass-section";
import {
  designProcessStages,
  homeServices,
} from "@/data/home";
import { homeLatestProjects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <LatestProjects
        projects={homeLatestProjects}
        index="01"
        title="Latest Projects"
      />

      <ServicesSection
        services={homeServices}
        index="02"
        title="Services"
      />

      <DesignProcessSection
        stages={designProcessStages}
        index="03"
        title="Design Process"
      />

      <StyleCompassSection index="04" title="Style Compass" />

      <ContactCtaSection />
    </>
  );
}
