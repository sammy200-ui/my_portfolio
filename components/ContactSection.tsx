"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Send, ExternalLink } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sameer.pawar@adypu.edu.in",
    href: "mailto:sameer.pawar@adypu.edu.in",
    color: "accent-primary",
    isExternal: false,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9699065624",
    href: "tel:+919699065624",
    color: "accent-secondary",
    isExternal: false,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    color: "accent-tertiary",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "sammy200-ui",
    href: "https://github.com/sammy200-ui",
    color: "accent-primary",
    isExternal: true,
  },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/sameer-pawar-a545b0358/", label: "LinkedIn", color: "blue" },
  { icon: Github, href: "https://github.com/sammy200-ui", label: "GitHub", color: "gray" },
  { icon: Instagram, href: "https://www.instagram.com/the.samatrix/", label: "Instagram", color: "pink" },
  { icon: Mail, href: "mailto:pawar96sameer@gmail.com", label: "Email", color: "red" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 px-4 md:px-8 bg-bg-dark overflow-hidden">
      {/* Radial Gradient Background - Add pointer-events-none to fix bug */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,75,75,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-6xl md:text-8xl font-black mb-6">
          <span className="text-white">LET'S</span>{" "}
          <span className="text-accent-primary">CONNECT</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Let's build something amazing together
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactInfo.map((item, index) => {

            const getColorClass = (colorName: string, type: 'border' | 'bg' | 'text' | 'hoverText' | 'hoverBorder') => {
              const base = colorName.startsWith('accent-') ? colorName : `accent-${colorName}`; // basic normalizer
              // In this customized version, we just blindly return tailwind classes assuming the colors exist or map them.
              // Ideally we map them based on the 'color' prop in contactInfo.

              // Simpler manual map since we defined specific string literals above
              if (type === 'border') return colorName === 'accent-primary' ? 'border-accent-primary/50' : colorName === 'accent-secondary' ? 'border-accent-secondary/50' : 'border-accent-tertiary/50';
              if (type === 'bg') return colorName === 'accent-primary' ? 'bg-accent-primary/10' : colorName === 'accent-secondary' ? 'bg-accent-secondary/10' : 'bg-accent-tertiary/10';
              if (type === 'text') return colorName === 'accent-primary' ? 'text-accent-primary' : colorName === 'accent-secondary' ? 'text-accent-secondary' : 'text-accent-tertiary';
              if (type === 'hoverText') return 'group-hover:text-white';
              return '';
            }

            const content = (
              <>
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl ${getColorClass(item.color, 'bg')} border ${getColorClass(item.color, 'border')} flex items-center justify-center ${getColorClass(item.color, 'text')} ${getColorClass(item.color, 'hoverText')} group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">{item.label}</h3>
                    <p className="text-white text-xl font-bold">{item.value}</p>
                  </div>
                  {item.href && item.isExternal && (
                    <ExternalLink className={`w-5 h-5 ml-auto ${getColorClass(item.color, 'text')} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  )}
                </div>
                <div className="absolute inset-0 rounded-3xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
              </>
            );

            return item.href ? (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`relative p-8 rounded-3xl bg-white/5 border-2 ${getColorClass(item.color, 'border')} hover:border-white/20 transition-all duration-300 cursor-pointer group block`}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 rounded-3xl bg-white/5 border-2 ${getColorClass(item.color, 'border')} transition-all duration-300 group`}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        {/* Social Links - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Follow My Journey</h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((social) => {
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-2xl bg-white/5 border-2 border-white/10 flex items-center justify-center transition-all duration-300 group hover:bg-accent-primary/20 hover:border-accent-primary hover:text-accent-primary text-gray-400"
                  aria-label={social.label}
                >
                  <social.icon className="w-7 h-7" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
