"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children?: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function GlassCard({
  children,
  className,
  glow,
  hover,
  onClick,
  style,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl glass",
        glow && "glow-violet",
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      onClick={onClick}
      style={style}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0047AB]/[0.04] to-cyan-500/[0.04] pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
}
