"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(navItems[index].href.substring(1));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-[9%] py-4",
        scrolled ? "bg-bg-dark/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <nav className="flex justify-between items-center">
        {/* Animated Logo */}
        <Link href="#home">
          <div className="group cursor-pointer">
            <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
              <motion.path
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                stroke="#ff4b4b"
                strokeWidth="4"
                fill="transparent"
                initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
                animate={{ pathLength: 1, opacity: 1, rotate: 360 }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="group-hover:stroke-[#ffa828] transition-colors duration-500"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="15"
                fill="#ff4b4b"
                initial={{ scale: 0 }}
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
                className="group-hover:fill-[#ffa828] transition-colors duration-500"
              />
            </svg>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-lg font-medium transition-all duration-300 border-b-2 pb-1",
                activeSection === item.href.substring(1)
                  ? "text-accent-primary border-accent-primary"
                  : "text-white border-transparent hover:text-accent-secondary hover:border-accent-secondary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-accent-primary text-3xl z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[70%] h-screen bg-[#161616] border-l-4 border-accent-primary rounded-bl-3xl md:hidden"
            >
              <div className="flex flex-col gap-8 mt-24 px-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-medium transition-all duration-300 py-3 rounded-lg",
                      activeSection === item.href.substring(1)
                        ? "text-accent-primary bg-accent-primary/10 px-4"
                        : "text-white hover:text-accent-secondary hover:bg-accent-secondary/5 hover:px-4"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
