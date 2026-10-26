import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useReveals } from "@/lib/reveal";
import CheckerSeam from "@/components/fx/CheckerSeam";

const STATEMENT =
  "I'm a Full Stack Developer and Software Engineer who builds production web platforms end to end — from the React front end to the APIs and data behind it.";

const FACTS = [
  { k: "Base", v: "Johannesburg, South Africa" },
  { k: "Certified", v: "PL-400 · PL-200 · MB-210 · AZ-900" },
  { k: "Background", v: "Game dev · VR · Multimedia engineering" },
  { k: "Focus", v: "Clean architecture, automation & accessible design" },
];

const STATS = [
  { value: 2, suffix: "+", label: "Years engineering" },
  { value: 10, suffix: "+", label: "Projects built" },
  { value: 4, suffix: "", label: "Microsoft certifications" },
];

const About = () => {
  const root = useRef<HTMLElement>(null);
  const statement = useRef<HTMLParagraphElement>(null);
  const ghost = useRef<HTMLDivElement>(null);

  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Words light up as you scroll through the statement.
      const split = SplitText.create(statement.current!, { type: "words", wordsClass: "about-word" });
      gsap.set(split.words, { opacity: 0.14 });
      gsap.to(split.words, {
        opacity: 1,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: {
          trigger: statement.current,
          start: "top 78%",
          end: "bottom 48%",
          scrub: true,
        },
      });

      // Ghost type drifts sideways.
      gsap.fromTo(
        ghost.current,
        { xPercent: 6 },
        { xPercent: -14, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
      );

      // Count-up stats.
      root.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(state.v) + suffix),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="relative z-10 overflow-hidden bg-ink text-ice">
      <CheckerSeam />

      {/* Ghost word */}
      <div
        ref={ghost}
        aria-hidden="true"
        className="display pointer-events-none absolute bottom-10 left-0 select-none whitespace-nowrap text-[clamp(10rem,30vw,32rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(246,248,249,0.08)]"
      >
        Engineer
      </div>

      <div className="relative mx-auto max-w-[96rem] px-5 pb-28 pt-44 md:px-10 md:pb-40 md:pt-64">
        <p className="eyebrow text-ice/60" data-fade>
          About
        </p>

        <p
          ref={statement}
          className="display mt-8 max-w-[24ch] text-[clamp(2rem,4.6vw,5rem)] leading-[1.04] md:max-w-[28ch]"
        >
          {STATEMENT}
        </p>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12">
          <div data-fade="children" data-stagger="0.15" className="max-w-md space-y-5 text-[1.02rem] leading-relaxed text-ice/65 lg:col-span-5">
            <p>
              My path runs from multimedia engineering and VR to low-code, and now full-stack software engineering. That mix gives me a
              distinctive eye for building user-centric products.
            </p>
            <p>
              My Power Platform years taught me how businesses really run. Today I build and ship web platforms, internal systems and
              integrations — and I bring the same care for motion, accessibility and performance to every one.
            </p>
          </div>

          <div className="lg:col-span-7">
            <dl data-fade="children" data-stagger="0.1" className="divide-y divide-ice/12 border-y border-ice/12 text-[0.78rem] uppercase tracking-[0.14em]">
              {FACTS.map((f) => (
                <div key={f.k} className="grid grid-cols-[7rem_1fr] gap-4 py-3.5 sm:grid-cols-[9rem_1fr]">
                  <dt className="text-ice/45">{f.k}</dt>
                  <dd className="font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>

            <dl className="mt-12 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="brackets p-4 text-signal sm:p-5">
                  <dd className="display text-[clamp(2.6rem,6vw,5.5rem)] leading-none text-ice">
                    <span data-count={s.value} data-suffix={s.suffix}>
                      0{s.suffix}
                    </span>
                  </dd>
                  <dt className="mt-3 text-[0.64rem] uppercase tracking-[0.18em] text-ice/55 sm:text-[0.7rem]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
