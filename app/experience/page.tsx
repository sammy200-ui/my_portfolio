import { Metadata } from "next";
import ExperienceHero from "@/components/experience/ExperienceHero";
import HermetoProposal from "@/components/experience/HermetoProposal";
import ComingSoon from "@/components/experience/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Open Source Experience — Sameer Pawar",
  description:
    "My open source journey: GSoC 2026 contributor to Hermeto, AsyncAPI contributor, and more. Explore my GSoC proposal for adding native uv package manager support.",
  keywords: [
    "gsoc",
    "open source",
    "hermeto",
    "uv",
    "asyncapi",
    "sameer pawar",
    "portfolio",
  ],
};

export default function ExperiencePage() {
  return (
    <main className="relative">
      <ExperienceHero />
      <HermetoProposal />
      <ComingSoon />
      <Footer />
    </main>
  );
}
