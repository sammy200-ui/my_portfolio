import Dock from "@/components/Dock";
import HeroSpotlight from "@/components/HeroSpotlight";
import Skills from "@/components/Skills";
import BentoGridProjects from "@/components/BentoGridProjects";
import Journey from "@/components/Journey";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <HeroSpotlight />
      <Skills />
      <BentoGridProjects />
      <Journey />
      <ContactSection />
      <Footer />
      <Dock />
    </main>
  );
}
