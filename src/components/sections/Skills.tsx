"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { profile } from "@/data/profile";

// ── Floating 3D torus knot ──────────────────────────────────────────────────
function FloatingKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.7, 0.22, 120, 16]} />
        <meshStandardMaterial
          color="#0047AB"
          emissive="#0047AB"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.3, 0.012, 8, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
        />
      </mesh>
    </>
  );
}

function Skills3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={2} color="#0047AB" />
      <pointLight position={[-2, -1, 1]} intensity={1} color="#06b6d4" />
      <FloatingKnot />
    </Canvas>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
const categories = [
  { key: "frontend" as const, label: "Frontend", emoji: "⚡" },
  { key: "backend" as const, label: "Backend", emoji: "🔧" },
  { key: "devops" as const, label: "DevOps & Cloud", emoji: "☁️" },
  { key: "tools" as const, label: "Tools", emoji: "🛠️" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const knotY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} id="skills" className="relative py-28 overflow-hidden">
      {/* Parallax background accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0047AB]/4 blur-[120px]" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-violet-400 font-mono text-xs tracking-[0.2em] uppercase">
              Expertise
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
              Skills
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_200px] gap-10 items-start">
          {/* Skill cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {categories.map(({ key, label, emoji }, catIdx) => (
              <ScrollReveal key={key} delay={catIdx * 0.1} direction="up">
                <GlassCard className="p-6 h-full" glow>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">{emoji}</span>
                    <h3 className="font-heading font-bold text-white text-lg">{label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills[key].map((skill, i) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl text-sm font-medium glass text-slate-300 hover:border-violet-500/40 hover:text-violet-300 hover:shadow-[0_0_14px_rgba(0,71,171,0.25)] transition-all cursor-default"
                        initial={{ opacity: 0, scale: 0.75 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: catIdx * 0.08 + i * 0.05, ease: "backOut" }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          {/* 3D floating knot */}
          <ScrollReveal direction="right">
            <motion.div
              className="relative h-[200px] lg:h-full min-h-[240px]"
              style={{ y: knotY }}
            >
              <div className="absolute inset-0 rounded-full bg-[#0047AB]/10 blur-2xl" />
              <Skills3D />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
