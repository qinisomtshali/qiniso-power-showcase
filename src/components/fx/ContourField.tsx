import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface ContourFieldProps {
  className?: string;
  /** Stroke colour of the contour lines. */
  color?: string;
  /** Every fourth line is drawn in this colour instead. */
  accent?: string;
  levels?: number;
  /** Drift speed multiplier. */
  speed?: number;
  /** Let the cursor push the field. */
  interactive?: boolean;
}

/**
 * A slowly drifting topographic map. A scalar field is sampled on a grid and
 * iso-lines are extracted with marching squares each frame; the cursor adds a
 * soft bump so the lines swell around it. Pauses when off screen.
 */
const ContourField = ({
  className = "",
  color = "rgba(11,12,15,0.09)",
  accent,
  levels = 10,
  speed = 1,
  interactive = true,
}: ContourFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let cs = 16;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);
    let visible = true;
    let last = 0;
    let t = 0;
    const ptr = { x: -9999, y: -9999, a: 0, targetA: 0 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cs = w < 700 ? 22 : 16;
      cols = Math.ceil(w / cs) + 1;
      rows = Math.ceil(h / cs) + 1;
      field = new Float32Array((cols + 1) * (rows + 1));
      draw();
    };

    const sample = (x: number, y: number) => {
      const s = 1 / 260;
      let v =
        Math.sin(x * s + t * 0.35 + Math.sin(y * s * 0.8 - t * 0.22) * 1.4) +
        Math.sin(y * s * 1.3 - t * 0.28 + Math.cos(x * s * 0.7 + t * 0.18) * 1.2) * 0.8 +
        Math.sin((x + y) * s * 0.55 + t * 0.15) * 0.6 +
        Math.cos((x - y) * s * 1.7 - t * 0.2) * 0.3;
      if (ptr.a > 0.001) {
        const dx = x - ptr.x;
        const dy = y - ptr.y;
        v += 1.7 * ptr.a * Math.exp(-(dx * dx + dy * dy) / (2 * 190 * 190));
      }
      return v;
    };

    const draw = () => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const stride = cols + 1;
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) field[j * stride + i] = sample(i * cs, j * cs);
      }
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";

      for (let k = 0; k < levels; k++) {
        const level = -1.9 + (3.8 * k) / (levels - 1);
        ctx.strokeStyle = accent && k % 4 === 0 ? accent : color;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const a = field[j * stride + i];
            const b = field[j * stride + i + 1];
            const c = field[(j + 1) * stride + i + 1];
            const d = field[(j + 1) * stride + i];
            const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x0 = i * cs;
            const y0 = j * cs;
            // edge crossings (linear interpolation)
            const topX = x0 + ((level - a) / (b - a)) * cs;
            const bottomX = x0 + ((level - d) / (c - d)) * cs;
            const leftY = y0 + ((level - a) / (d - a)) * cs;
            const rightY = y0 + ((level - b) / (c - b)) * cs;
            const seg = (ax: number, ay: number, bx: number, by: number) => {
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
            };
            const T = [topX, y0] as const;
            const B = [bottomX, y0 + cs] as const;
            const L = [x0, leftY] as const;
            const R = [x0 + cs, rightY] as const;
            switch (idx) {
              case 1: case 14: seg(L[0], L[1], B[0], B[1]); break;
              case 2: case 13: seg(B[0], B[1], R[0], R[1]); break;
              case 3: case 12: seg(L[0], L[1], R[0], R[1]); break;
              case 4: case 11: seg(T[0], T[1], R[0], R[1]); break;
              case 5: seg(T[0], T[1], R[0], R[1]); seg(L[0], L[1], B[0], B[1]); break;
              case 6: case 9: seg(T[0], T[1], B[0], B[1]); break;
              case 7: case 8: seg(T[0], T[1], L[0], L[1]); break;
              case 10: seg(T[0], T[1], L[0], L[1]); seg(B[0], B[1], R[0], R[1]); break;
            }
          }
        }
        ctx.stroke();
      }
    };

    const tick = (time: number) => {
      if (!visible) return;
      ptr.a += (ptr.targetA - ptr.a) * 0.06;
      ptr.targetA *= 0.985;
      if (time - last < 1 / 30) return;
      t += (time - last > 0.2 ? 0.033 : time - last) * 0.9 * speed;
      last = time;
      draw();
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      ptr.x += (x - ptr.x) * (ptr.a > 0.05 ? 0.35 : 1);
      ptr.y += (y - ptr.y) * (ptr.a > 0.05 ? 0.35 : 1);
      ptr.targetA = 1;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (!reduced) {
      gsap.ticker.add(tick);
      if (interactive) window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      ro.disconnect();
    };
  }, [color, accent, levels, speed, interactive]);

  return <canvas ref={canvasRef} className={`pointer-events-none block h-full w-full ${className}`} aria-hidden="true" />;
};

export default ContourField;
