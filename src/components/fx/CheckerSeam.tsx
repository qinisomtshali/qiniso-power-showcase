import { useMemo, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const COLS = 24;
const ROWS = 5;

/**
 * The light ground of the previous section carries into the top of a dark
 * block as solid rows, breaks into a chequerboard, and burns off as you
 * scroll — revealing the dark surface underneath.
 */
const CheckerSeam = ({ color = "#f6f8f9" }: { color?: string }) => {
  const root = useRef<HTMLDivElement>(null);

  const cells = useMemo(() => {
    const out: { key: string; row: number; filled: boolean }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Top two rows are solid; below that only alternate squares remain.
        out.push({ key: `${r}-${c}`, row: r, filled: r < 2 || (r + c) % 2 === 0 });
      }
    }
    return out;
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const items = root.current.querySelectorAll<HTMLElement>("[data-cell]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current.parentElement,
          start: "top 88%",
          end: "top 12%",
          scrub: true,
        },
      });
      items.forEach((el) => {
        const row = Number(el.dataset.row);
        // Lower rows burn off first; every square gets a random jitter.
        const t = ((ROWS - 1 - row) / (ROWS - 1)) * 0.5 + Math.random() * 0.42;
        tl.to(el, { opacity: 0, duration: 0.08, ease: "none" }, t);
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-20 grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
    >
      {cells.map((cell) => (
        <div
          key={cell.key}
          data-cell
          data-row={cell.row}
          className="aspect-square"
          style={{ background: cell.filled ? color : "transparent" }}
        />
      ))}
    </div>
  );
};

export default CheckerSeam;
