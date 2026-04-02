"use client";

import { motion } from "framer-motion";
import { GitBranch, Clock, Sparkles } from "lucide-react";

const upcomingOrgs = [
  {
    name: "AsyncAPI Initiative",
    description:
      "4 months of active contributions — maintenance, bug fixes, PR reviews, and infrastructure improvements across the AsyncAPI website.",
    tags: ["React", "Next.js", "TypeScript"],
    prs: "7 PRs Merged + 3 Reviews",
    gradient: "from-accent-primary/20 to-accent-secondary/20",
    borderColor: "border-accent-primary/30",
    accentColor: "text-accent-primary",
  },
  {
    name: "More Coming Soon",
    description:
      "This section will grow as I continue contributing to open source projects and communities.",
    tags: ["Open Source", "Community"],
    prs: "Stay tuned",
    gradient: "from-accent-tertiary/20 to-accent-primary/20",
    borderColor: "border-accent-tertiary/30",
    accentColor: "text-accent-tertiary",
  },
];

export default function ComingSoon() {
  return (
    <section className="relative py-32 px-4 md:px-8 bg-bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(198,120,221,0.06)_0%,transparent_60%)] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-white">
          Other{" "}
          <span className="font-bold text-accent-tertiary">Contributions</span>
        </h2>
        <div className="w-24 h-1 bg-accent-tertiary mx-auto rounded-full" />
        <p className="text-gray-400 mt-6 max-w-xl mx-auto">
          More open source work and community contributions — details coming
          soon.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {upcomingOrgs.map((org, index) => (
          <motion.div
            key={org.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative group p-8 rounded-3xl bg-white/5 border-2 ${org.borderColor} hover:border-white/20 transition-all duration-500 overflow-hidden`}
          >
            {/* Hover gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${org.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
            />

            <div className="relative z-10">
              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${org.accentColor}`}
                >
                  {index === 0 ? (
                    <GitBranch className="w-5 h-5" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{org.name}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {org.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {org.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-black/20 text-gray-300 rounded-md text-xs border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 text-sm">
                <Clock className={`w-4 h-4 ${org.accentColor}`} />
                <span className="text-gray-300">{org.prs}</span>
              </div>
            </div>

            {/* Corner Glow */}
            <div
              className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${org.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
