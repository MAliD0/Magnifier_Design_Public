import { ContactCtaSection } from "@/components/sections/contact-cta";
import { DesignProcessSection } from "@/components/sections/design-process";
import { HomeHero } from "@/components/sections/home-hero";
import { LatestProjects } from "@/components/sections/latest-projects";
import { ServicesSection } from "@/components/sections/services";
import { StyleCompassSection } from "@/components/sections/style-compass";
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
        index=""
        title="Projects"
      />

      <ServicesSection
        services={homeServices}
        index=""
        title="Services"
      />

      <DesignProcessSection
        stages={designProcessStages}
        index=""
        title="Design Process"
      />

      <StyleCompassSection index="" title="Style Compass" />

      <ContactCtaSection />
    </>
  );
}
