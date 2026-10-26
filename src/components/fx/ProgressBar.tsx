import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Hairline reading-progress bar pinned to the top edge. */
const ProgressBar = () => {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      }
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px]" aria-hidden="true">
      <div ref={bar} className="h-full origin-left bg-signal" />
    </div>
  );
};

export default ProgressBar;
