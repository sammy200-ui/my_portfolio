"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Linkedin, Github, Mail, Instagram, ArrowDown } from "lucide-react";

export default function HeroSpotlight() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const roles = ["MERN Stack Developer", "GSoC '26 Contributor", "AI/ML Enthusiast", "Open Source Developer"];

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.substring(0, text.length + 1));
          if (text === currentRole) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setText(currentRole.substring(0, text.length - 1));
          if (text === "") {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 120
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial fade in
    tl.fromTo(".hero-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );

    // Name animation
    tl.fromTo(".letter",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Social icons
    tl.fromTo(".social-icon",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Cursor blink
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut"
    });

  }, { scope: containerRef });

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/sameer-pawar-a545b0358/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/sammy200-ui", label: "GitHub" },
    { icon: Mail, href: "mailto:pawar96sameer@gmail.com", label: "Email" },
    { icon: Instagram, href: "https://www.instagram.com/the.samatrix/", label: "Instagram" },
  ];

  return (
    <section ref={containerRef} id="home" className="relative h-screen w-full overflow-hidden bg-bg-dark flex items-center justify-center">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-[#2a2928] to-bg-dark" />

      {/* Decorative Circle */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="hero-content mb-6">
          <h1 ref={nameRef} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-2 overflow-hidden">
            <span className="inline-block">
              {"SAMEER".split("").map((char, i) => (
                <span key={`first-${i}`} className="letter inline-block">{char}</span>
              ))}
            </span>
            <span className="inline-block w-4 sm:w-8" />
            <span className="inline-block text-accent-primary">
              {"PAWAR".split("").map((char, i) => (
                <span key={`last-${i}`} className="letter inline-block">{char}</span>
              ))}
            </span>
          </h1>
        </div>

        <div className="hero-content h-12 md:h-16 mb-8 flex items-center justify-center gap-2 text-xl sm:text-3xl md:text-4xl text-gray-300 font-light">
          <span>I am a</span>
          <span className="font-semibold text-white min-w-[10px]">{text}</span>
          <span ref={cursorRef} className="w-0.5 h-8 bg-accent-primary block" />
        </div>

        <p className="hero-content text-gray-400 max-w-2xl mx-auto mb-12 text-base md:text-lg leading-relaxed">
          MERN Stack Developer & AI/ML Undergrad.
          <br className="hidden md:block" />
          <span className="text-accent-tertiary font-medium">Passionate about creating intuitive and dynamic user experiences.</span>
          <br className="hidden md:block" />
          Building scalable, full-stack web applications with modern technologies.
        </p>

        <div className="hero-content flex justify-center gap-6 mb-16">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon group p-3 rounded-full border border-gray-700 hover:border-accent-primary hover:bg-accent-primary/10 transition-colors duration-300"
            >
              <social.icon className="w-6 h-6 text-gray-400 group-hover:text-accent-primary transition-colors" />
            </a>
          ))}
        </div>

        <div className="hero-content">
          <a
            href="#skills"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-primary transition-colors duration-300"
          >
            <span className="uppercase tracking-widest">Scroll Down</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-accent-primary" />
          </a>
        </div>
      </div>
    </section>
  );
}
