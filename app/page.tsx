import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { CandidatesSection } from "@/components/sections/CandidatesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EmployersSection } from "@/components/sections/EmployersSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { LegalLinksSection } from "@/components/sections/LegalLinksSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { TrustSafetySection } from "@/components/sections/TrustSafetySection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HomeSection />
        <AboutSection />
        <EmployersSection />
        <CandidatesSection />
        <IndustriesSection />
        <LocationsSection />
        <HowItWorksSection />
        <WhyChooseSection />
        <FaqSection />
        <ContactSection />
        <TrustSafetySection />
      </main>
      <FooterSection />
      <LegalLinksSection />
    </>
  );
}
