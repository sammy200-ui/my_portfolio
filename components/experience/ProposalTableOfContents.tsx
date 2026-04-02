"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "lucide-react";

interface TOCSection {
  id: string;
  label: string;
}

const sections: TOCSection[] = [
  { id: "synopsis", label: "Synopsis" },
  { id: "understanding", label: "Understanding the Problem" },
  { id: "implementation", label: "Implementation Plan" },
  { id: "contributions", label: "Contributions" },
  { id: "benefits", label: "Benefits" },
  { id: "about-me", label: "About Me" },
  { id: "availability", label: "Availability" },
  { id: "post-gsoc", label: "Post GSoC" },
];

export default function ProposalTableOfContents() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            return (
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
            );
          });

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop — Fixed sidebar */}
      <nav className="hidden xl:block fixed top-32 w-48 shrink-0" style={{ left: 'max(1.5rem, calc((100vw - 72rem) / 2 - 12rem))' }}>
        <div className="relative">
          {/* Track line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />

          <div className="pl-4 space-y-0.5">
            <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-3 font-semibold">
              On this page
            </p>
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative block w-full text-left text-[13px] py-1.5 transition-all duration-200 ${
                    isActive
                      ? "text-accent-primary font-medium"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-accent-primary rounded-full" />
                  )}
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile — Floating TOC */}
      <div className="xl:hidden fixed bottom-24 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300"
        >
          {isOpen ? <X className="w-4 h-4" /> : <List className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-14 right-0 w-52 p-3 rounded-xl bg-bg-dark/95 border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <div className="space-y-0.5">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "text-accent-primary bg-accent-primary/10 font-medium"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
