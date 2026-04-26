import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Humaid — Portfolio",
  description:
    "Software Engineer & Full Stack Developer based in Dubai. Building scalable web applications with modern technologies.",
  keywords: ["software engineer", "full stack developer", "React", "Next.js", "Dubai"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, spaceGrotesk.variable, "font-sans", "dark")}>
      <body className="bg-[#0a0a0f] text-slate-300 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
