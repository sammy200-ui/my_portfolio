"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, GitBranch, Calendar } from "lucide-react";
import Link from "next/link";

export default function ExperienceHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".exp-fade-in",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-bg-dark pt-10 pb-16 md:pb-24"
    >
      {/* Subtle bg glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-accent-secondary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/"
          className="exp-fade-in inline-flex items-center gap-2 text-gray-500 hover:text-accent-primary transition-colors duration-300 group mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm tracking-wide">Back to Home</span>
        </Link>

        {/* Page header */}
        <div className="exp-fade-in mb-6">
          <p className="text-accent-primary text-sm font-medium tracking-widest uppercase mb-3">
            Open Source
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Experience &{" "}
            <span className="text-accent-secondary">Contributions</span>
          </h1>
        </div>

        <p className="exp-fade-in text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed mb-8">
          From contributing to AsyncAPI to proposing a native{" "}
          <span className="text-white font-medium">uv</span> package manager
          backend for Hermeto under GSoC 2026.
        </p>

        {/* Quick stats */}
        <div className="exp-fade-in flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/[0.06] text-sm">
            <GitBranch className="w-4 h-4 text-accent-primary" />
            <span className="text-gray-300">
              <span className="text-white font-semibold">8+</span> PRs Merged
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/[0.06] text-sm">
            <Calendar className="w-4 h-4 text-accent-secondary" />
            <span className="text-gray-300">
              GSoC <span className="text-white font-semibold">2026</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-secondary/10 border border-accent-secondary/20 text-sm">
            <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
            <span className="text-accent-secondary font-medium">
              Active Contributor
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
