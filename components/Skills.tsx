"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiCss3, SiExpress, SiFirebase, SiHtml5, SiHuggingface,
  SiJavascript, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs,
  SiPandas, SiPrisma, SiPython, SiReact, SiSupabase,
  SiThreedotjs, SiTypescript
} from "react-icons/si";
import { FaBrain, FaDatabase, FaLock } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  // Frontend Core
  { name: "HTML/CSS", icon: SiHtml5, category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend" },
  { name: "React", icon: SiReact, category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  { name: "React Native", icon: SiReact, category: "Frontend" },
  { name: "Three.js", icon: SiThreedotjs, category: "Frontend" },

  // Backend
  { name: "Node.js", icon: SiNodedotjs, category: "Backend" },
  { name: "Express.js", icon: SiExpress, category: "Backend" },
  { name: "Python", icon: SiPython, category: "Backend" },
  { name: "Supabase", icon: SiSupabase, category: "Backend" },
  { name: "Firebase", icon: SiFirebase, category: "Backend" },
  { name: "Prisma ORM", icon: SiPrisma, category: "Backend" },
  { name: "OAuth 2.0", icon: FaLock, category: "Backend" },

  // Data/ML
  { name: "MongoDB", icon: SiMongodb, category: "Data" },
  { name: "MySQL", icon: SiMysql, category: "Data" },
  { name: "NoSQL", icon: FaDatabase, category: "Data" },
  { name: "Pandas", icon: SiPandas, category: "Data" },
  { name: "Hugging Face", icon: SiHuggingface, category: "Data" },
  { name: "Data Structures", icon: FaBrain, category: "Data" },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const skillCardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Set initial state
    gsap.set(headerRef.current, { opacity: 0, y: 50 });
    gsap.set(".skill-card", { opacity: 0, y: 50 });

    tl.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    })
      .to(".skill-card", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.5)"
      }, "-=0.4");

  }, { scope: containerRef });

  return (
    <section id="skills" className="py-32 px-4 md:px-[9%] bg-bg-dark relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Tech <span className="text-accent-secondary">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My arsenal of tools and technologies for building robust applications.
          </p>
        </div>

        <div ref={skillCardsRef} className="flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card group relative p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-300 cursor-default"
            >
              <skill.icon className="w-6 h-6 text-gray-400 group-hover:text-accent-primary transition-colors duration-300" />
              <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
