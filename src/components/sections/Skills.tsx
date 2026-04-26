"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Globe,
  Code2,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Gauge,
  LayoutDashboard,
  GitMerge,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import ScrollReveal from "@/components/ui/ScrollReveal";

const skillsData = [
  {
    id: 1,
    title: "WordPress",
    date: "6+ Years",
    content:
      "Custom theme and plugin engineering across the full WordPress ecosystem — from headless setups to complex multi-site networks.",
    category: "CMS",
    icon: Globe,
    relatedIds: [2, 3, 8],
    status: "completed" as const,
    energy: 98,
  },
  {
    id: 2,
    title: "PHP / MySQL",
    date: "6+ Years",
    content:
      "Server-side logic, custom REST endpoints, database optimisation, and secure plugin architecture for high-traffic sites.",
    category: "Backend",
    icon: Code2,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 3,
    title: "WooCommerce",
    date: "5+ Years",
    content:
      "End-to-end e-commerce builds — custom product types, payment gateways, subscription flows, and checkout optimisation.",
    category: "E-Commerce",
    icon: ShoppingCart,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 94,
  },
  {
    id: 4,
    title: "API Integrations",
    date: "6+ Years",
    content:
      "Connecting WordPress to CRMs, payment processors, marketing automation, and third-party data pipelines via REST & webhooks.",
    category: "Integration",
    icon: Zap,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 96,
  },
  {
    id: 5,
    title: "JavaScript",
    date: "5+ Years",
    content:
      "Modern ES6+, jQuery, and lightweight frontend scripting for interactive UX, AJAX-driven interfaces, and Gutenberg blocks.",
    category: "Frontend",
    icon: GitMerge,
    relatedIds: [4, 8],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 6,
    title: "Security & SEO",
    date: "4+ Years",
    content:
      "Website hardening, malware removal, SSL configuration, on-page SEO, and structured data for protected, rank-ready sites.",
    category: "Security",
    icon: ShieldCheck,
    relatedIds: [7, 1],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 7,
    title: "Performance",
    date: "5+ Years",
    content:
      "Core Web Vitals tuning, server-side and object caching, CDN setup, and image optimisation for sub-2s load times.",
    category: "Optimisation",
    icon: Gauge,
    relatedIds: [6, 3],
    status: "completed" as const,
    energy: 91,
  },
  {
    id: 8,
    title: "Elementor / ACF",
    date: "5+ Years",
    content:
      "Page builder mastery and Advanced Custom Fields for flexible, editor-friendly content architectures without code lock-in.",
    category: "CMS Tools",
    icon: LayoutDashboard,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 93,
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={sectionRef} id="skills" className="relative overflow-hidden bg-white/[0.01]">
      {/* Parallax ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#0047AB]/5 blur-[130px]" />
      </motion.div>

      {/* Section header */}
      <div className="relative z-10 pt-24 pb-0 max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-[#4d8fe0] font-mono text-xs tracking-[0.2em] uppercase">
              Expertise
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-2">
              Skills
            </h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Click any node to explore — connections show how skills work together.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Orbital timeline — transparent bg so site bg shows */}
      <div className="relative z-10 [&>div]:bg-transparent [&>div]:!h-[620px]">
        <RadialOrbitalTimeline timelineData={skillsData} />
      </div>
    </section>
  );
}
