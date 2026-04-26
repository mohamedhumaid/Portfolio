"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { profile } from "@/data/profile";

const contactLinks = [
  {
    Icon: Mail,
    label: "Email",
    value: profile.social.email,
    href: `mailto:${profile.social.email}`,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
  },
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    value: "Mohammed Humaid",
    href: profile.social.linkedin,
    color: "text-cyan-400",
    bg: "bg-cyan-500/15",
  },
  {
    Icon: GitHubIcon,
    label: "GitHub",
    value: "@mshumaid5",
    href: profile.social.github,
    color: "text-slate-300",
    bg: "bg-slate-500/15",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 800);
  };

  return (
    <section id="contact" className="py-28 max-w-5xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="text-violet-400 font-mono text-xs tracking-[0.2em] uppercase">
            Let's Talk
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
            Get In Touch
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-base">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Contact links */}
        <ScrollReveal direction="left">
          <div className="space-y-4">
            {contactLinks.map(({ Icon, label, value, href, color, bg }) => (
              <GlassCard key={label} className="p-5 flex items-center gap-4 group" hover glow>
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center ${color} shrink-0`}>
                  <Icon size={19} />
                </div>
                <div className="min-w-0">
                  <p className="text-slate-500 text-xs mb-0.5">{label}</p>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`${color} hover:underline text-sm font-medium truncate block transition-colors`}
                  >
                    {value}
                  </a>
                </div>
              </GlassCard>
            ))}

            <div className="pt-4 text-slate-600 text-sm leading-relaxed">
              <p>Remote · MENA Region 🌍</p>
              <p className="mt-1">Usually responds within 24 hours.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal direction="right">
          <GlassCard className="p-6" glow>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-slate-400 text-sm">
                  Name
                </label>
                <motion.input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-slate-600 text-sm outline-none focus:border-violet-500/50 transition-colors"
                  whileFocus={{ scale: 1.01 }}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-slate-400 text-sm">
                  Email
                </label>
                <motion.input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-slate-600 text-sm outline-none focus:border-violet-500/50 transition-colors"
                  whileFocus={{ scale: 1.01 }}
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-slate-400 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-slate-600 text-sm outline-none focus:border-violet-500/50 transition-colors resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || sent}
                className={`w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all ${
                  sent
                    ? "bg-green-600"
                    : "bg-violet-600 hover:bg-violet-500 disabled:opacity-70"
                }`}
                whileHover={!sent && !loading ? { scale: 1.02 } : undefined}
                whileTap={!sent && !loading ? { scale: 0.98 } : undefined}
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={16} />
                    Message Sent!
                  </>
                ) : loading ? (
                  <motion.span
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
