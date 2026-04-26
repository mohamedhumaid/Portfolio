"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { profile } from "@/data/profile";

const stats = [
  { label: "Years Exp.", key: "yearsExp" as const },
  { label: "Projects", key: "projects" as const },
  { label: "Companies", key: "companies" as const },
];

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const avatarY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current?.querySelectorAll(".stat-counter").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") ?? "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val) + "+";
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0047AB]/5 blur-[100px]" />
      </motion.div>
      <div className="relative z-10 max-w-5xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="text-violet-400 font-mono text-xs tracking-[0.2em] uppercase">
            About Me
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
            Who I Am
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-14 items-center">
        {/* Avatar */}
        <ScrollReveal direction="left">
          <div className="flex justify-center lg:justify-start">
            <motion.div className="relative" style={{ y: avatarY }}>
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-4 rounded-[2.5rem] border border-violet-500/20 pointer-events-none"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-violet-600/25 to-cyan-600/15 border border-violet-500/20 flex items-center justify-center backdrop-blur-xl">
                <div className="w-52 h-52 rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-600/10 flex items-center justify-center">
                  <span className="font-heading text-6xl font-bold text-gradient select-none">
                    MH
                  </span>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-5 -right-5 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium shadow-lg shadow-violet-500/30"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                Open to Work ✦
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Bio + stats */}
        <ScrollReveal direction="right">
          <div className="space-y-5">
            <p className="text-slate-400 text-lg leading-relaxed">{profile.bio}</p>
            <p className="text-slate-500 leading-relaxed">
              Working remotely across the MENA region. I thrive on solving complex problems and
              turning ideas into elegant digital experiences. Always learning, always building.
            </p>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3 pt-4">
              {stats.map(({ label, key }) => (
                <GlassCard key={label} className="p-4 text-center" glow>
                  <div
                    className="stat-counter text-3xl font-heading font-bold text-white"
                    data-target={profile.stats[key]}
                  >
                    0+
                  </div>
                  <div className="text-slate-500 text-xs mt-1">{label}</div>
                </GlassCard>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-3 pt-2">
              {profile.education.map((edu, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 text-sm shrink-0">
                    🎓
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{edu.degree}</p>
                    <p className="text-slate-500 text-xs">
                      {edu.institution} · {edu.dates}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>{/* /grid */}
      </div>{/* /relative z-10 */}
    </section>
  );
}

