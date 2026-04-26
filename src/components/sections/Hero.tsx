"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Mail, Star, Target } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";

import { Boxes } from "@/components/ui/background-boxes";
const HeroScene3D = dynamic(() => import("@/components/ui/HeroScene3D"), { ssr: false });

// ── Inline brand icons ──────────────────────────────────────────────────────
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── Stats card ──────────────────────────────────────────────────────────────
function StatsCard() {
  return (
    <div className="glass rounded-3xl p-5 space-y-4 w-full">
      {/* Projects delivered */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#0047AB]/20 border border-[#0047AB]/25 flex items-center justify-center shrink-0">
          <Target size={17} className="text-[#4d8fe0]" />
        </div>
        <div>
          <div className="text-2xl font-heading font-bold text-white leading-none">50+</div>
          <div className="text-slate-500 text-xs mt-0.5">Projects Delivered</div>
        </div>
      </motion.div>

      {/* Satisfaction bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-500">Client Satisfaction</span>
          <span className="text-white font-medium">98%</span>
        </div>
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#0047AB] to-[#06b6d4]"
            initial={{ width: 0 }}
            animate={{ width: "98%" }}
            transition={{ delay: 1.4, duration: 1.6, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>
      </motion.div>

      {/* Stats 2x2 grid */}
      <motion.div
        className="grid grid-cols-2 gap-2.5 border-t border-white/[0.06] pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {[
          { label: "YEARS", value: "8+" },
          { label: "COMPANIES", value: "6" },
          { label: "QUALITY", value: "100%" },
          { label: "REMOTE", value: "✓" },
        ].map(({ label, value }, i) => (
          <motion.div
            key={label}
            className="text-center py-3 px-2 rounded-xl bg-white/[0.03] border border-white/[0.04]"
            whileHover={{ scale: 1.04, backgroundColor: "rgba(0,71,171,0.08)" }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="text-white font-heading font-bold text-xl leading-none">{value}</div>
            <div className="text-slate-600 text-[9px] tracking-[0.15em] uppercase mt-1">{label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Status badges */}
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Available
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0047AB]/10 border border-[#0047AB]/25 text-[#4d8fe0] text-xs">
          <Star size={9} fill="currentColor" />
          WordPress Expert
        </span>
      </motion.div>
    </div>
  );
}

// ── Main hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  // Mouse tracking → spring-smoothed motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 45, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 45, damping: 18 });

  // Parallax layers: text moves one way, card the other (depth illusion)
  const textX = useTransform(springX, [-1, 1], [-18, 18]);
  const textY = useTransform(springY, [-1, 1], [-10, 10]);
  const cardX = useTransform(springX, [-1, 1], [18, -18]);
  const cardY = useTransform(springY, [-1, 1], [10, -10]);
  const glowX = useTransform(springX, [-1, 1], [-50, 50]);
  const glowY = useTransform(springY, [-1, 1], [-35, 35]);

  // Raw values for 3D scene
  const [mouse3D, setMouse3D] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(x);
      rawY.set(y);
      setMouse3D({ x, y });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [rawX, rawY]);

  // GSAP heading word stagger + typewriter
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll(".hero-word") ?? [];
      gsap.from(words, {
        opacity: 0,
        y: 90,
        skewY: 4,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        delay: 0.3,
      });

      const roles = profile.roles;
      let idx = 0;
      const cycle = () => {
        if (!roleRef.current) return;
        gsap.to(roleRef.current, {
          duration: 0.4,
          text: { value: "", delimiter: "" },
          ease: "none",
          onComplete: () => {
            gsap.to(roleRef.current!, {
              duration: 1.0,
              text: { value: roles[idx % roles.length], delimiter: "" },
              ease: "none",
              onComplete: () => { idx++; setTimeout(cycle, 2400); },
            });
          },
        });
      };
      setTimeout(cycle, 1600);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { Icon: LinkedInIcon, href: profile.social.linkedin, label: "LinkedIn" },
    { Icon: GitHubIcon, href: profile.social.github, label: "GitHub" },
    { Icon: Mail, href: `mailto:${profile.social.email}`, label: "Email", size: 16 },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Boxes grid background */}
      <Boxes />

      {/* Radial mask — fades boxes toward center so content reads clearly */}
      <div className="absolute inset-0 w-full h-full bg-[#0a0a0f] z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,transparent_30%,white_100%)] pointer-events-none" />

      {/* Mouse-tracked ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0047AB]/10 blur-[140px] pointer-events-none z-10"
        style={{ x: glowX, y: glowY }}
      />

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-20" />

      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 pt-28 pb-16">

        {/* Top badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-slate-400 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Star size={13} className="text-yellow-400" fill="currentColor" />
          6+ Years of WordPress Excellence
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_300px] gap-10 items-center">

          {/* ── LEFT: Copy ── */}
          <motion.div style={{ x: textX, y: textY }}>
            {/* Heading — word-by-word GSAP */}
            <div ref={headingRef} className="mb-6 overflow-hidden">
              {["Building", "WordPress", "Experiences", "That Deliver"].map((word, i) => (
                <div key={i} className="overflow-hidden leading-[1.1]">
                  <span
                    className={`hero-word block font-heading font-bold text-5xl md:text-6xl xl:text-[5rem] leading-[1.1] ${
                      i === 2 ? "text-[#0047AB]" : "text-white"
                    }`}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>

            {/* Typewriter role */}
            <div className="flex items-center gap-2 text-lg mb-5 h-8">
              <span className="text-[#4d8fe0] font-mono select-none">{"// "}</span>
              <span ref={roleRef} className="text-slate-300 font-mono min-w-[2px]" />
              <motion.span
                className="text-[#4d8fe0] font-mono"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1] }}
              >|</motion.span>
            </div>

            <p className="text-slate-500 text-base leading-relaxed max-w-md mb-8">
              {profile.bio.slice(0, 145)}…
            </p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mb-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <motion.a
                href="#projects"
                className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#0047AB] text-white font-medium hover:bg-[#003d96] transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View Portfolio →
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center gap-2 px-7 py-3 rounded-2xl glass text-white font-medium hover:bg-white/[0.08] transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass text-slate-400 hover:text-[#4d8fe0] hover:border-[#0047AB]/30 transition-colors"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── CENTER: 3D Scene ── */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative w-[280px] h-[280px]">
              {/* Glow behind the 3D object */}
              <div className="absolute inset-8 rounded-full bg-[#0047AB]/20 blur-3xl pointer-events-none" />
              <HeroScene3D mouseX={mouse3D.x} mouseY={mouse3D.y} />
            </div>
          </motion.div>

          {/* ── RIGHT: Stats card ── */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <StatsCard />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 z-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
