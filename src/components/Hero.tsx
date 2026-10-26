import { useRef } from "react";
import { ArrowDown, Download } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion, hasFinePointer } from "@/lib/gsap";
import { useReveals } from "@/lib/reveal";
import { useIntro } from "@/lib/intro";
import { useScroll } from "@/lib/scroll-context";
import ContourField from "@/components/fx/ContourField";
import LocalTime from "@/components/fx/LocalTime";
import { useMagnetic } from "@/components/fx/useMagnetic";
import { SITE } from "@/data/site";

const META = [
  { k: "Role", v: "Full Stack Developer | Software Engineer" },
  { k: "Based", v: "Johannesburg, South Africa" },
  { k: "Now", v: "Junior Software Engineer — HearConnect SA" },
];

const Hero = () => {
  const { ready } = useIntro();
  const { scrollTo } = useScroll();
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const dim = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const workBtn = useMagnetic<HTMLButtonElement>(0.3);

  useReveals(root, ready);

  // Initial hidden state + scroll-linked "covered" effect.
  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      if (!reduced) gsap.set(portrait.current, { clipPath: "inset(100% 0% 0% 0%)" });
      if (!reduced) gsap.set(photo.current, { scale: 1.35 });

      const mm = gsap.matchMedia();
      // Scoped contexts resolve selector strings inside this component only,
      // so the next section is passed as an element.
      const next = document.getElementById("about");
      if (!next) return;

      // Parallax on the portrait while the next section rises over the hero.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(photo.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        });
        gsap.to(nameRef.current, {
          xPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        });
      });

      // The hero recedes (scale + dim) as About slides over it.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: next, start: "top bottom", end: "top top", scrub: true };
        gsap.to(inner.current, { scale: 0.92, borderRadius: "2.5rem", ease: "none", scrollTrigger: trigger });
        gsap.to(dim.current, { opacity: 0.6, ease: "none", scrollTrigger: trigger });
      });

      // Pointer parallax on the portrait.
      if (!reduced && hasFinePointer()) {
        const rx = gsap.quickTo(portrait.current, "rotationY", { duration: 0.9, ease: "power3" });
        const ry = gsap.quickTo(portrait.current, "rotationX", { duration: 0.9, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          rx(((e.clientX / window.innerWidth) * 2 - 1) * 5);
          ry(((e.clientY / window.innerHeight) * 2 - 1) * -4);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
          window.removeEventListener("pointermove", onMove);
          mm.revert();
        };
      }
      return () => mm.revert();
    },
    { scope: root }
  );

  // Intro choreography once the curtain lifts.
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: "expo.inOut" } })
        .to(portrait.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 }, 0.15)
        .to(photo.current, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.15);
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative z-0 min-h-svh overflow-hidden bg-ice lg:sticky lg:top-0 lg:h-svh"
    >
      <div ref={inner} className="relative flex h-full min-h-[40rem] origin-center flex-col overflow-hidden bg-ice">
        <ContourField className="absolute inset-0" accent="rgba(0,184,204,0.35)" />

        <div className="relative mx-auto flex w-full max-w-[96rem] flex-1 flex-col px-5 pb-8 pt-24 md:px-10 md:pb-9 md:pt-24">
          {/* Meta row */}
          <div
            data-fade
            data-gate
            data-fade-y="16"
            data-delay="0.3"
            className="flex items-center justify-between text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink/70"
          >
            <span>[ 01 ] Portfolio — {SITE.year}</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <LocalTime />
            </span>
          </div>

          <div className="grid flex-1 items-center gap-10 py-6 lg:grid-cols-12 lg:py-3">
            {/* Copy */}
            <div className="flex flex-col gap-5 lg:col-span-7 lg:gap-[clamp(0.9rem,2.2svh,1.5rem)]">
              <dl data-fade="children" data-gate data-stagger="0.12" data-delay="0.5" className="max-w-xl divide-y divide-ink/10 border-y border-ink/10 text-[0.74rem] uppercase tracking-[0.14em]">
                {META.map((m) => (
                  <div key={m.k} className="grid grid-cols-[5rem_1fr] gap-4 py-2">
                    <dt className="text-steel">{m.k}</dt>
                    <dd className="font-medium text-ink">{m.v}</dd>
                  </div>
                ))}
              </dl>

              <h2
                data-reveal="lines"
                data-gate
                data-delay="0.45"
                className="display rv-pending max-w-[16ch] text-[clamp(2.4rem,min(4.6vw,7.4svh),4.8rem)]"
              >
                Production web platforms — built end to end.
              </h2>

              <p data-fade data-gate data-delay="0.9" className="max-w-[34rem] text-base leading-relaxed text-ink/70 md:text-lg [@media(min-width:1024px)_and_(max-height:790px)]:hidden">
                React front ends, the APIs and data behind them, shipped on Azure — with a creative edge from years of game, VR and
                multimedia work.
              </p>

              <div data-fade data-gate data-delay="1" className="flex flex-wrap items-center gap-3">
                <button
                  ref={workBtn}
                  type="button"
                  onClick={() => scrollTo("#work")}
                  data-cursor="Work"
                  className="pill bg-ink text-ice hover:bg-signal hover:text-ink"
                >
                  View selected work <ArrowDown size={16} />
                </button>
                <a href={SITE.cv} download className="pill border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-ice">
                  <Download size={15} /> Download CV
                </a>
              </div>
            </div>

            {/* Portrait */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end" style={{ perspective: "1200px" }}>
              <div ref={portrait} className="relative aspect-[4/5] h-[min(54svh,35rem)] max-w-full will-change-transform">
                <div className="brackets absolute -inset-3 z-10 text-ink/60" />
                <div className="h-full w-full overflow-hidden bg-ink/5">
                  <img
                    ref={photo}
                    src="/my-photo2.jpg"
                    alt="Qiniso Mtshali at his laptop"
                    className="h-full w-full object-cover object-[50%_28%]"
                    fetchPriority="high"
                  />
                </div>

                <div className="absolute inset-x-3 bottom-3 z-10 rounded-xl bg-ink/55 px-4 py-3 text-ice backdrop-blur-md">
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-ice/60">Currently</p>
                  <p className="text-sm font-medium">Software Engineer · HearConnect SA</p>
                </div>

                <div className="absolute -right-6 -top-6 z-10 hidden h-28 w-28 sm:block">
                  <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow text-ink" aria-hidden="true">
                    <defs>
                      <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                    </defs>
                    <text className="fill-current text-[10.5px] font-medium uppercase tracking-[0.28em]">
                      <textPath href="#badge-circle">Full Stack • Engineer • Creator •</textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-signal text-ink">
                      <ArrowDown size={16} />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Giant name */}
          <h1
            ref={nameRef}
            data-reveal="words"
            data-gate
            data-stagger="0.14"
            data-duration="1.3"
            className="display rv-pending relative z-20 -mx-1 select-none whitespace-nowrap text-[13.2vw] leading-[0.84] md:text-[14vw] lg:text-[min(14.8vw,14.5rem)] text-white mix-blend-difference"
          >
            Qiniso Mtshali
          </h1>
        </div>
      </div>

      {/* Dim layer used while the next section covers the hero */}
      <div ref={dim} className="pointer-events-none absolute inset-0 z-30 bg-ink opacity-0" aria-hidden="true" />
    </section>
  );
};

export default Hero;
