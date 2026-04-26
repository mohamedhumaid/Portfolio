import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Capabilities from "@/components/sections/Capabilities";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { CinematicFooter } from "@/components/motion-footer";

export default function Home() {
  return (
    <div className="relative">
      <main className="relative z-10 bg-[#0a0a0f] rounded-b-3xl shadow-2xl">
        <NavBar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Capabilities />
        <Projects />
        <Contact />
      </main>
      <CinematicFooter />
    </div>
  );
}
