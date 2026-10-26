import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface MarqueeProps {
  items: string[];
  /** Pixels per second at rest. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  /** Alternate filled / outlined words. */
  outline?: boolean;
}

/**
 * Endless ticker. Scrolling the page pushes it faster, and scrolling back up
 * flips its direction, then it eases back to its resting pace.
 */
const Marquee = ({ items, speed = 70, reverse = false, className = "", outline = true }: MarqueeProps) => {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || prefersReducedMotion()) return;

      const base = reverse ? 1 : -1; // normal rows travel left
      let half = el.scrollWidth / 2;
      let x = reverse ? -half : 0;
      let extra = 0;

      const measure = () => {
        half = el.scrollWidth / 2;
      };
      window.addEventListener("resize", measure);

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          extra = self.direction * Math.min(Math.abs(self.getVelocity()) / 450, 6);
        },
      });

      const tick = (_time: number, deltaMs: number) => {
        extra *= 0.93;
        x += base * speed * (1 + extra) * (deltaMs / 1000);
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        el.style.transform = `translate3d(${x}px,0,0)`;
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("resize", measure);
        st.kill();
      };
    },
    { dependencies: [speed, reverse] }
  );

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b" ? "true" : undefined}>
      {items.map((word, i) => (
        <span key={word} className="flex items-center">
          <span
            className={`display px-[0.35em] text-[clamp(3.5rem,9vw,9rem)] leading-[1.05] ${
              outline && i % 2 === 1 ? "text-transparent [-webkit-text-stroke:1.5px_currentColor]" : ""
            }`}
          >
            {word}
          </span>
          <span className="h-[0.12em] w-[0.12em] rotate-45 bg-signal text-[clamp(3.5rem,9vw,9rem)]" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
};

export default Marquee;
