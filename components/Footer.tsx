"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Instagram, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sameer-pawar-a545b0358/",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/sammy200-ui",
    label: "GitHub",
  },
  {
    icon: Mail,
    href: "mailto:pawar96sameer@gmail.com",
    label: "Email",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/the.samatrix/",
    label: "Instagram",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-bg-dark/95 backdrop-blur-md py-8 px-4 md:px-[9%] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-400"
        >
          <p className="flex items-center justify-center gap-2 text-sm md:text-base">
            © {currentYear} Sameer Pawar. Made with{" "}
            <Heart className="w-4 h-4 text-accent-primary fill-accent-primary animate-pulse" />{" "}
            using Next.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
