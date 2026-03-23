import { LandingFinalCta } from "@/components/landing/LandingFinalCta";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingHero } from "@/components/landing/LandingHero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustLine } from "@/components/landing/TrustLine";
import { ValueSection } from "@/components/landing/ValueSection";

/**
 * Marketing landing — modular sections, conversion-focused CTAs to /signup and /login.
 */
export function LandingPage() {
  return (
    <div className="landing-page-bg">
      <LandingHero />
      <TrustLine />
      <LandingFeatures />
      <HowItWorks />
      <ValueSection />
      <LandingFinalCta />
    </div>
  );
}
