import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

/**
 * Everything below the hero + about fold, as one lazily loaded chunk. The first
 * paint and the intro only need the sections above; these arrive while the
 * loader plays. `onMount` fires once they are in the DOM so scroll positions
 * and the header's section tracking can be re-measured.
 */
const Sections = ({ onMount }: { onMount: () => void }) => {
  useEffect(() => {
    ScrollTrigger.refresh();
    onMount();
  }, [onMount]);

  return (
    <>
      <Projects />
      <Experience />
      <TechStack />
      <Certifications />
      <Contact />
    </>
  );
};

export default Sections;
