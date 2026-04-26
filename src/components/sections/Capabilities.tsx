"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Zap, ShieldCheck, GitMerge } from "lucide-react";

const CapabilitiesPlayer = dynamic(
  () => import("./CapabilitiesPlayer"),
  { ssr: false, loading: () => (
    <div className="w-full aspect-video rounded-2xl bg-[#050505] border border-[#0047AB]/10 animate-pulse" />
  )}
);

const highlights = [
  {
    icon: Zap,
    title: "AI-Assisted Development",
    description:
      "Leveraging modern AI tooling to accelerate delivery, reduce errors, and produce cleaner, more maintainable code.",
    color: "text-[#4d8fe0]",
    bg: "bg-[#0047AB]/10",
  },
  {
    icon: GitMerge,
    title: "Seamless API Integrations",
    description:
      "Connecting WordPress to any external system — CRMs, payment gateways, automation platforms, and data pipelines.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Performance & Security",
    description:
      "Every site is hardened and optimised — load-time tuning, security audits, and scalable infrastructure by default.",
    color: "text-[#4d8fe0]",
    bg: "bg-[#0047AB]/10",
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} id="capabilities" className="relative py-24 overflow-hidden">
      {/* Ambient parallax glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/4 blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#0047AB]/5 blur-[100px]" />
      </motion.div>

      <div className="relative z-10 max-w-[75rem] mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0047AB]/30 bg-[#0047AB]/8 text-[#4d8fe0] text-xs font-mono tracking-widest uppercase mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4d8fe0] animate-pulse" />
              AI-Powered Workflow
            </motion.div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
              Capabilities & Tools
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto text-base">
              A glimpse into the modern tools, dashboards, and workflows that power every project I deliver.
            </p>
          </div>
        </ScrollReveal>

        {/* InfiniteBentoPan showcase */}
        <ScrollReveal delay={0.1}>
          <div className="relative mb-14">
            {/* Scan-line overlay for AI feel */}
            <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
                }}
              />
            </div>
            {/* Corner brackets — AI HUD aesthetic */}
            {[
              "top-0 left-0 border-t border-l",
              "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((pos) => (
              <div
                key={pos}
                className={`absolute w-6 h-6 ${pos} border-[#0047AB]/50 z-20 rounded-sm`}
              />
            ))}
            <CapabilitiesPlayer />
          </div>
        </ScrollReveal>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {highlights.map(({ icon: Icon, title, description, color, bg }, i) => (
            <ScrollReveal key={title} delay={i * 0.1} direction="up">
              <GlassCard className="p-5 h-full" glow hover>
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color} mb-4`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-heading font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
