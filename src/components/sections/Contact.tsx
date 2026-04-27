"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
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
    color: "text-[#4d8fe0]",
    bg: "bg-[#0047AB]/15",
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
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+20 101 879 3733",
    href: profile.social.whatsapp,
    color: "text-green-400",
    bg: "bg-green-500/15",
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
    <section id="contact" className="py-24 max-w-5xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-14">
          <span className="text-[#4d8fe0] font-mono text-xs tracking-[0.2em] uppercase">
            Let&apos;s Talk
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
            Get In Touch
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-base">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
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
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-slate-600 text-sm outline-none focus:border-[#0047AB]/50 transition-colors"
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
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-slate-600 text-sm outline-none focus:border-[#0047AB]/50 transition-colors"
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
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder:text-slate-600 text-sm outline-none focus:border-[#0047AB]/50 transition-colors resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || sent}
                className={`w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all ${
                  sent
                    ? "bg-green-600"
                    : "bg-[#0047AB] hover:bg-[#003d96] disabled:opacity-70"
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
