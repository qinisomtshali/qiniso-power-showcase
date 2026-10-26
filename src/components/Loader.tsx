import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useScroll } from "@/lib/scroll-context";
import { SITE } from "@/data/site";

const SEEN_KEY = "qm-intro-seen";

const shouldPlay = () => {
  try {
    if (prefersReducedMotion()) return false;
    if (new URLSearchParams(window.location.search).has("intro")) return true;
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
};

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Intro curtain. A counter and hairline meter fill while fonts and the page
 * load (never shorter than ~1.4s, never longer than ~3s), then the curtain
 * lifts and `onReveal` lets the hero animate in underneath it.
 * Played once per browser tab; add ?intro to the URL to replay it.
 * `waitFor` (the below-the-fold chunk) holds the curtain until it has arrived,
 * within the same ~3s cap, so sections are mounted by the time it lifts.
 */
const Loader = ({ onReveal, waitFor }: { onReveal: () => void; waitFor?: Promise<unknown> }) => {
  const [active, setActive] = useState(shouldPlay);
  const { lock, unlock } = useScroll();
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const name = useRef<HTMLDivElement>(null);

  // Nothing to play: reveal straight away.
  useEffect(() => {
    if (!active) onReveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      if (!active) return;
      lock();
      let cancelled = false;

      const progress = { p: 0 };
      const paint = () => {
        if (count.current) count.current.textContent = String(Math.round(progress.p)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${progress.p / 100})`;
      };

      gsap.from(name.current!.children, { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.1 });
      const toNinety = gsap.to(progress, { p: 90, duration: 1.4, ease: "power2.inOut", onUpdate: paint });

      const loaded = new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      });
      const ready = Promise.race([
        Promise.all([document.fonts?.ready ?? Promise.resolve(), loaded, wait(1400), waitFor?.catch(() => undefined)]),
        wait(3200),
      ]);

      const finish = contextSafe(() => {
        if (cancelled) return;
        toNinety.kill();
        gsap
          .timeline()
          .to(progress, { p: 100, duration: 0.35, ease: "power1.out", onUpdate: paint })
          .add(() => onReveal(), "+=0.1")
          .to(root.current, { yPercent: -105, duration: 1, ease: "expo.inOut" }, "<")
          .to(name.current, { yPercent: -30, opacity: 0, duration: 0.8, ease: "power2.in" }, "<")
          .add(() => {
            try {
              sessionStorage.setItem(SEEN_KEY, "1");
            } catch {
              /* private mode */
            }
            setActive(false);
            unlock();
            ScrollTrigger.refresh();
          });
      });

      ready.then(finish);
      return () => {
        cancelled = true;
      };
    },
    { scope: root, dependencies: [active] }
  );

  if (!active) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink p-6 text-ice md:p-10"
    >
      <div className="flex items-start justify-between text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ice/60">
        <span>Portfolio — {SITE.year}</span>
        <span>Johannesburg, ZA</span>
      </div>

      <div ref={name} className="flex flex-col items-center gap-3 text-center">
        <div className="overflow-hidden">
          <div className="display text-[clamp(2.6rem,8vw,7rem)] leading-[1] text-ice">Qiniso Mtshali</div>
        </div>
        <div className="overflow-hidden">
          <div className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-signal">{SITE.role}</div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-6">
        <span ref={count} className="display text-[clamp(4rem,12vw,10rem)] leading-[0.8] tabular-nums text-ice">
          000
        </span>
        <div className="mb-2 h-px w-40 bg-ice/20 sm:w-64">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-signal" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
