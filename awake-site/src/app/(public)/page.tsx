import Hero from "@/components/public/hero";
import Marquee from "@/components/public/marquee";
import About from "@/components/public/about";
import MethodPillars from "@/components/public/method-pillars";
import Touchpoints from "@/components/public/touchpoints";
import PlaybookForm from "@/components/public/playbook-form";
import PodcastSection from "@/components/public/podcast-section";
import Community from "@/components/public/community";
import Speaking from "@/components/public/speaking";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <MethodPillars />
      <Touchpoints />
      <PlaybookForm />
      <PodcastSection />
      <Community />
      <Speaking />
    </>
  );
}
