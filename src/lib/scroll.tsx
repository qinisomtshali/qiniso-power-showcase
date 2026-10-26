import React, { useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import { ScrollContext, type ScrollApi } from "./scroll-context";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and
 * Lenis share a single clock. Falls back to native scrolling when the
 * visitor prefers reduced motion.
 */
export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  // Children's layout effects (the intro loader) can call lock() before this
  // provider's effect has created Lenis, so remember the request.
  const lockedRef = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    // Hand a pending lock over to Lenis (its own stopped class replaces the
    // inline overflow fallback, which would otherwise outlive unlock()).
    if (lockedRef.current) {
      document.documentElement.style.removeProperty("overflow");
      lenis.stop();
    }

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo<ScrollApi>(
    () => ({
      scrollTo: (target, opts = {}) => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target as never, { offset: 0, duration: 1.5, ...opts });
          return;
        }
        if (typeof target === "number") window.scrollTo({ top: target });
        else {
          const el = typeof target === "string" ? document.querySelector(target) : target;
          el?.scrollIntoView();
        }
      },
      lock: () => {
        lockedRef.current = true;
        if (lenisRef.current) lenisRef.current.stop();
        else document.documentElement.style.overflow = "hidden";
      },
      unlock: () => {
        lockedRef.current = false;
        document.documentElement.style.removeProperty("overflow");
        lenisRef.current?.start();
      },
    }),
    []
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
};
