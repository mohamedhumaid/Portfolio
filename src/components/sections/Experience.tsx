"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { profile } from "@/data/profile";
import { MapPin, Calendar } from "lucide-react";

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "bottom 40%",
              scrub: 1.2,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 bg-white/[0.01] overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-[#0047AB]/4 blur-[100px]" />
      </motion.div>
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-violet-400 font-mono text-xs tracking-[0.2em] uppercase">
              Career
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
              Experience
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-violet-500/10 hidden md:block" />
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-violet-400/30 to-transparent hidden md:block origin-top"
          />

          <div className="space-y-14">
            {profile.experience.map((exp, i) => (
              <motion.div
                key={i}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center top-8">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-violet-500 border-2 border-violet-300 z-10"
                    style={{ boxShadow: "0 0 14px rgba(0,71,171,0.7)" }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                  />
                </div>

                {/* Card side */}
                <div
                  className={`md:w-[calc(50%-2.5rem)] ${
                    i % 2 === 0 ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <GlassCard className="p-6" glow hover>
                    <div className="mb-3">
                      <h3 className="font-heading font-bold text-white text-xl">{exp.role}</h3>
                      <p className="text-violet-400 font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {exp.dates}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-slate-400 text-sm flex items-start gap-2">
                          <span className="text-violet-400 mt-0.5 shrink-0">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>{/* /relative z-10 */}
    </section>
  );
}
