import { RefObject, useEffect, useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "./gsap";

type By = "lines" | "words" | "chars";

export interface RevealController {
  play: () => void;
  revert: () => void;
}

interface RevealOptions {
  by?: By;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  /** Start offset in percent of the line height. */
  y?: number;
  start?: string;
  /** Wait for play() instead of reacting to scroll. */
  manual?: boolean;
}

/**
 * Clip-mask text reveal: every line / word / character slides up out of
 * its own overflow mask. Re-splits on resize and font load (autoSplit).
 */
export function splitReveal(el: HTMLElement, options: RevealOptions = {}): RevealController {
  const by = options.by ?? "lines";
  const {
    stagger = by === "lines" ? 0.12 : by === "words" ? 0.07 : 0.03,
    duration = 1.1,
    delay = 0,
    ease = "expo.out",
    y = 115,
    start = "top 88%",
    manual = false,
  } = options;

  if (prefersReducedMotion()) {
    el.classList.remove("rv-pending");
    return { play() {}, revert() {} };
  }

  let started = !manual;
  let anim: gsap.core.Tween | null = null;

  const split = SplitText.create(el, {
    type: by === "chars" ? "chars,words" : by,
    mask: by,
    linesClass: "split-line",
    wordsClass: "split-word",
    charsClass: "split-char",
    autoSplit: true,
    onSplit(self) {
      const targets = by === "lines" ? self.lines : by === "words" ? self.words : self.chars;
      anim = gsap.from(targets, {
        yPercent: y,
        duration,
        delay,
        ease,
        stagger,
        paused: manual && !started,
        scrollTrigger: manual ? undefined : { trigger: el, start, once: true },
      });
      el.classList.remove("rv-pending");
      return anim;
    },
  });

  return {
    play() {
      started = true;
      anim?.play();
    },
    revert() {
      split.revert();
    },
  };
}

/**
 * Declarative reveals. Inside `scope`:
 *   data-reveal="lines|words|chars"  clip-mask text reveal on scroll
 *   data-gate                        …but wait for `ready` (intro) instead
 *   data-fade ["children"]           fade + rise (optionally each child)
 *   data-delay / data-stagger / data-duration / data-fade-y   tuning
 * Add the `rv-pending` class to text elements so they stay hidden until armed.
 */
export function useReveals(scope: RefObject<HTMLElement>, ready = true) {
  const gated = useRef<RevealController[]>([]);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      gated.current = [];

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const d = el.dataset;
        const controller = splitReveal(el, {
          by: (d.reveal as By) || "lines",
          stagger: d.stagger ? parseFloat(d.stagger) : undefined,
          duration: d.duration ? parseFloat(d.duration) : undefined,
          delay: d.delay ? parseFloat(d.delay) : 0,
          manual: d.gate !== undefined,
        });
        if (d.gate !== undefined) gated.current.push(controller);
      });

      if (!prefersReducedMotion()) {
        root.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
          const d = el.dataset;
          const gate = d.gate !== undefined;
          const targets = d.fade === "children" ? Array.from(el.children) : [el];
          const tween = gsap.from(targets, {
            y: d.fadeY ? parseFloat(d.fadeY) : 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: d.delay ? parseFloat(d.delay) : 0,
            stagger: d.stagger ? parseFloat(d.stagger) : 0.1,
            paused: gate,
            scrollTrigger: gate ? undefined : { trigger: el, start: "top 90%", once: true },
          });
          if (gate) gated.current.push({ play: () => tween.play(), revert: () => tween.revert() });
        });
      }

      return () => gated.current.forEach((c) => c.revert());
    },
    { scope }
  );

  useEffect(() => {
    if (ready) gated.current.forEach((c) => c.play());
  }, [ready]);
}
