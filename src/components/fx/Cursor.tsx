import { useRef } from "react";
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

/**
 * A lagging ring that follows the pointer (difference-blended so it reads on
 * both light and dark sections). Anything with `data-cursor="Label"` turns it
 * into a labelled badge. Desktop / fine pointers only.
 */
const Cursor = () => {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const r = ring.current!;
    const d = dot.current!;
    const b = badge.current!;

    gsap.set([r, d, b], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(b.firstElementChild, { scale: 0 });

    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });
    const bx = gsap.quickTo(b, "x", { duration: 0.35, ease: "power3" });
    const by = gsap.quickTo(b, "y", { duration: 0.35, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "none" });

    let shown = false;
    let mode: "idle" | "link" | "label" = "idle";

    const setMode = (next: typeof mode, text = "") => {
      if (next === mode && next !== "label") return;
      mode = next;
      if (next === "label") {
        if (label.current) label.current.textContent = text;
        gsap.to(b.firstElementChild, { scale: 1, duration: 0.45, ease: "back.out(1.7)", overwrite: true });
        gsap.to(r, { scale: 0, duration: 0.25, overwrite: true });
        gsap.to(d, { scale: 0, duration: 0.2, overwrite: true });
      } else {
        gsap.to(b.firstElementChild, { scale: 0, duration: 0.3, ease: "power3.in", overwrite: true });
        gsap.to(r, { scale: next === "link" ? 1.8 : 1, duration: 0.35, ease: "power3.out", overwrite: true });
        gsap.to(d, { scale: next === "link" ? 0 : 1, duration: 0.25, overwrite: true });
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        gsap.set([r, d, b], { x: e.clientX, y: e.clientY });
        gsap.to([r, d, b], { opacity: 1, duration: 0.3 });
        shown = true;
      }
      rx(e.clientX);
      ry(e.clientY);
      bx(e.clientX);
      by(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const labelled = target.closest?.("[data-cursor]") as HTMLElement | null;
      if (labelled) return setMode("label", labelled.dataset.cursor || "");
      if (target.closest?.("a, button, input, textarea, select, [role='button']")) return setMode("link");
      setMode("idle");
    };

    const onLeave = () => {
      shown = false;
      gsap.to([r, d, b], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[190] hidden h-9 w-9 rounded-full border border-white mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[190] hidden h-1.5 w-1.5 rounded-full bg-white mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block"
      />
      <div
        ref={badge}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[191] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div className="grid h-24 w-24 place-items-center rounded-full bg-signal text-ink">
          <span ref={label} className="text-[0.7rem] font-medium uppercase tracking-[0.18em]" />
        </div>
      </div>
    </>
  );
};

export default Cursor;
