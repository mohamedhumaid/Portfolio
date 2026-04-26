import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <footer className="text-center py-10 text-slate-600 text-sm border-t border-white/[0.04]">
        <p>
          © {new Date().getFullYear()} Mohammed Humaid.{" "}
          <span className="text-gradient">Built with passion.</span>
        </p>
      </footer>
    </main>
  );
}
