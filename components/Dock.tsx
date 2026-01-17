"use client";

import { useMotionValue, motion, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Home, User, Briefcase, Map, Mail, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
    { id: "home", icon: Home, label: "Home", href: "#home" },
    { id: "skills", icon: Monitor, label: "Skills", href: "#skills" },
    { id: "projects", icon: Briefcase, label: "Projects", href: "#projects" },
    { id: "journey", icon: Map, label: "Journey", href: "#journey" },
    { id: "contact", icon: Mail, label: "Contact", href: "#contact" },
];

export default function Dock() {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="mx-auto flex h-16 items-center gap-6 rounded-2xl bg-white/5 border border-white/10 px-6 backdrop-blur-md">
                {items.map((item) => (
                    <DockIcon key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

function DockIcon({
    item,
}: {
    item: { icon: any; label: string; href: string };
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={item.href}>
            <div className="relative group flex flex-col items-center">
                {/* Tooltip */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: -15, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="absolute -top-[140%] left-1/2 -translate-x-1/2 px-3 py-1 whitespace-nowrap rounded-md bg-gray-900/90 border border-accent-primary/30 text-xs text-white shadow-xl backdrop-blur-sm pointer-events-none"
                        >
                            {item.label}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    className="w-10 h-10 rounded-full border border-transparent hover:border-accent-primary hover:bg-accent-primary/10 flex items-center justify-center transition-all duration-300"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-accent-primary transition-colors duration-300" />
                </div>
            </div>
        </Link>
    );
}
