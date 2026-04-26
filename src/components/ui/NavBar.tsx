"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div
        className={`mx-auto max-w-5xl rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled ? "glass glow-violet" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="font-heading text-xl font-bold text-white"
            whileHover={{ scale: 1.04 }}
          >
            MH<span className="text-violet-400">.</span>
          </motion.a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors relative group"
                whileHover={{ y: -1 }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.a>
          </nav>

          {/* Mobile toggle */}
          <motion.button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="md:hidden pt-4 pb-2 flex flex-col gap-3 border-t border-white/[0.06] mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-white py-1 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-1 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium text-center"
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
