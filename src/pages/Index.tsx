import { useCallback, useEffect, useState } from "react";
import { ScrollProvider } from "@/lib/scroll";
import { IntroContext } from "@/lib/intro";
import { ScrollTrigger } from "@/lib/gsap";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Cursor from "@/components/fx/Cursor";
import ProgressBar from "@/components/fx/ProgressBar";

const Index = () => {
  const [ready, setReady] = useState(false);
  const reveal = useCallback(() => setReady(true), []);

  // Layout shifts (fonts, images) move ScrollTrigger start points: re-measure.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <ScrollProvider>
      <IntroContext.Provider value={{ ready }}>
        <a
          href="#work"
          className="sr-only z-[300] rounded-full bg-signal px-5 py-3 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Loader onReveal={reveal} />
        <Cursor />
        <ProgressBar />
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <TechStack />
          <Certifications />
          <Contact />
        </main>
      </IntroContext.Provider>
    </ScrollProvider>
  );
};

export default Index;
