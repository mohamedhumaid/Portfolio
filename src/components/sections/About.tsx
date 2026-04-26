"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
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
    <section ref={sectionRef} id="about" className="relative py-24 overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0047AB]/5 blur-[100px]" />
      </motion.div>
      <div className="relative z-10 max-w-5xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-14">
          <span className="text-[#4d8fe0] font-mono text-xs tracking-[0.2em] uppercase">
            About Me
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
            Who I Am
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-14 items-start">
        {/* Avatar */}
        <ScrollReveal direction="left">
          <div className="flex justify-center lg:justify-start">
            <motion.div className="relative" style={{ y: avatarY }}>

              {/* Animated gradient border ring */}
              <motion.div
                className="absolute -inset-[3px] rounded-3xl pointer-events-none z-[-1]"
                style={{
                  background:
                    "linear-gradient(135deg, #0047AB 0%, #06b6d4 50%, #0047AB 100%)",
                  backgroundSize: "200% 200%",
                }}
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              />

              {/* Photo */}
              <div className="relative w-[340px] h-[430px] rounded-3xl overflow-hidden border border-[#0047AB]/30">
                <Image
                  src="/mohammed-humaid.jpg"
                  alt="Mohammed Humaid"
                  width={340}
                  height={430}
                  priority
                  className="w-full h-full object-cover object-top"
                />
                {/* Bottom gradient — lets badge float cleanly over the photo */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0a0f]/75 to-transparent pointer-events-none" />
                {/* Subtle cobalt tint to tie the bright photo into the dark theme */}
                <div className="absolute inset-0 bg-[#0047AB]/8 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Floating "Open to Work" badge */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-xl bg-[#0047AB] text-white text-sm font-medium shadow-lg shadow-[#0047AB]/40"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                Open to Work ✦
              </motion.div>

              {/* Experience pill — top-right corner */}
              <motion.div
                className="absolute -top-3 -right-4 px-3 py-1.5 rounded-xl bg-[#0047AB] text-white text-xs font-mono font-bold shadow-lg shadow-[#0047AB]/40"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                8+ yrs
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Bio + stats */}
        <ScrollReveal direction="right">
          <div className="space-y-5">
            <p className="text-slate-400 text-lg leading-relaxed">{profile.bio}</p>

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

