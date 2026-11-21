import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactBentoGrid } from "@/components/sections/ImpactBentoGrid";
import { FlagshipEnterprise } from "@/components/sections/FlagshipEnterprise";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ArchitectureExplorer } from "@/components/sections/ArchitectureExplorer";
import { WritingPreview } from "@/components/sections/WritingPreview";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactBentoGrid />
      <FlagshipEnterprise />
      <ProjectsShowcase />
      <ArchitectureExplorer />
      <WritingPreview />
      <ExperienceTimeline />
      <SkillsMatrix />
      <ContactSection />
    </>
  );
}
