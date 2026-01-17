"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Trophy, Globe, Code, BookOpen, School } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface JourneyItem {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    icon: any;
}

const journeyData: JourneyItem[] = [
    {
        year: "2025",
        title: "Google Summer of Code (GSoC)",
        subtitle: "AsyncAPI Initiative",
        description: "Contributing for GSoC 2026 with AsyncAPI. Working on open-source tooling and enhancing the event-driven architecture ecosystem.",
        icon: Code,
    },
    {
        year: "2024 - Present",
        title: "B.Tech in CS & AI/ML",
        subtitle: "Newton School of Technology, Pune",
        description: "Pursuing a 4-year undergraduate degree specialized in Computer Science and Artificial Intelligence. Gaining hands-on experience with modern tech stacks.",
        icon: GraduationCap,
    },
    {
        year: "2023 - 2024",
        title: "Intermediate (Class XII)",
        subtitle: "T.R High School",
        description: "Completed Higher Secondary education with a focus on Science/Mathematics. Achieved a grade of 85.5%.",
        icon: BookOpen,
    },
    {
        year: "2021 - 2022",
        title: "Matriculation (Class X)",
        subtitle: "Rajiv Gandhi International School",
        description: "Completed secondary education with a strong foundation in academics. Achieved a grade of 73.33%.",
        icon: School,
    },
];

export default function Journey() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animate the central line growing
        gsap.fromTo(lineRef.current,
            { height: "0%" },
            {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                }
            }
        );

        // Animate each item
        const items = gsap.utils.toArray(".journey-item");
        items.forEach((item: any, index) => {
            const isEven = index % 2 === 0;

            gsap.fromTo(item,
                {
                    opacity: 0,
                    x: isEven ? -50 : 50,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="journey" className="relative py-32 px-4 md:px-8 bg-bg-dark overflow-hidden">
            {/* Header */}
            <div className="text-center mb-24 relative z-10">
                <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-white">
                    My <span className="font-bold text-accent-secondary">Journey</span>
                </h2>
                <div className="w-24 h-1 bg-accent-primary mx-auto rounded-full" />
            </div>

            <div className="relative max-w-5xl mx-auto">
                {/* Central Line */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 md:translate-x-0">
                    <div ref={lineRef} className="w-full bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary shadow-[0_0_15px_rgba(255,75,75,0.5)]" />
                </div>

                {/* Journey Items */}
                <div className="relative z-10 flex flex-col gap-12 md:gap-24">
                    {journeyData.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className={`journey-item flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Side */}
                                <div className={`flex-1 pl-12 ${isEven ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"}`}>
                                    <span className="text-accent-primary font-bold text-lg mb-2 block">{item.year}</span>
                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-accent-secondary text-sm font-medium mb-4">{item.subtitle}</p>
                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-bg-dark border-2 border-accent-secondary flex items-center justify-center z-20 shadow-[0_0_20px_rgba(255,168,40,0.3)]">
                                        <item.icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
