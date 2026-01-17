"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  size: "small" | "wide" | "tall" | "large";
  gradient: string;
}

const projects: Project[] = [
  {
    title: "SiliconSage",
    description: "Hybrid AI PC builder with real-time analytics and performance predictions.",
    tags: ["Next.js", "FastAPI", "Python", "ML"],
    github: "https://github.com/sammy200-ui/SiliconSage",
    live: "#",
    size: "wide",
    gradient: "from-accent-primary/20 to-accent-tertiary/20",
  },
  {
    title: "Gaming News",
    description: "Global gaming hub with live stats, reviews, and community forums.",
    tags: ["HTML", "CSS", "Python"],
    github: "https://github.com/mrgear111/Gaming-News",
    live: "https://gaming-news-nine.vercel.app/",
    size: "small",
    gradient: "from-accent-primary/20 to-accent-secondary/20",
  },
  {
    title: "NextOnList",
    description: "Modern discovery platform for movies, TV shows, and anime.",
    tags: ["React", "Vite", "APIs"],
    github: "https://github.com/sammy200-ui/NextOnList",
    live: "https://next-on-list.vercel.app/",
    size: "small",
    gradient: "from-accent-secondary/20 to-accent-tertiary/20",
  },
  {
    title: "Let's Collab",
    description: "Real-time collaborative whiteboard for teams and designers.",
    tags: ["Next.js", "Socket.IO", "Excalidraw", "MySQL"],
    github: "https://github.com/IronwallxR5/Let-s_Collab",
    live: "https://let-s-collab.vercel.app/",
    size: "wide",
    gradient: "from-accent-tertiary/20 to-accent-primary/20",
  },
  {
    title: "NotesApp",
    description: "Secure MERN stack note-taking with JWT authentication.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/sammy200-ui/NotesApp",
    live: "https://notes-app-two-taupe.vercel.app/",
    size: "wide",
    gradient: "from-accent-primary/20 to-accent-secondary/20",
  },
  {
    title: "GlobeGuard",
    description: "Community-driven scam reporting map for traveler safety.",
    tags: ["React Native", "Firebase"],
    github: "https://github.com/sammy200-ui/GlobeGuard-application",
    live: "#",
    size: "small",
    gradient: "from-accent-tertiary/20 to-accent-primary/20",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    wide: "col-span-1 md:col-span-2 row-span-1",
    tall: "col-span-1 row-span-1 md:row-span-2",
    large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
  };

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseMove = contextSafe((e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
    gsap.to(contentRef.current, {
      scale: 1,
      duration: 0.3
    });
  });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(contentRef.current, {
      scale: 1.02,
      duration: 0.3
    });
  });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative group ${sizeClasses[project.size]} rounded-3xl perspective-1000`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full w-full rounded-3xl transition-all duration-300 transform-style-3d bg-bg-dark border border-white/5 hover:border-accent-primary/50 shadow-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Content Container */}
        <div ref={contentRef} className="relative h-full p-6 flex flex-col justify-between bg-white/5 rounded-3xl backdrop-blur-sm overflow-hidden">

          {/* Warm Gradient Hover Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

          {/* Top Section */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-200 transition-colors line-clamp-3">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-black/20 text-gray-300 rounded-md text-xs border border-white/5 group-hover:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Section - Links */}
          <div className="relative z-10 flex gap-4 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group/link"
            >
              <Github className="w-4 h-4 group-hover/link:text-accent-secondary transition-colors" />
              Code
            </a>
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group/link"
              >
                <ExternalLink className="w-4 h-4 group-hover/link:text-accent-secondary transition-colors" />
                Live
              </a>
            )}
          </div>

          {/* Hover Arrow */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
            <ArrowUpRight className="w-5 h-5 text-accent-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BentoGridProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".project-card-wrapper > div > div", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    gsap.from(".section-header", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="relative py-32 px-4 md:px-8 overflow-hidden">

      {/* Section Header */}
      <div className="section-header text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-white">
          Selected <span className="font-bold text-accent-secondary">Work</span>
        </h2>
        <div className="w-24 h-1 bg-accent-primary mx-auto rounded-full" />
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto project-card-wrapper relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      {/* View All Projects */}
      <div className="text-center mt-20 section-header">
        <a
          href="https://github.com/sammy200-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-secondary transition-colors duration-300 group"
        >
          <span className="text-lg">View Full Archive</span>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
