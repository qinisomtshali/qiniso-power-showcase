import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useReveals } from "@/lib/reveal";
import ContourField from "@/components/fx/ContourField";
import { EXPERIENCE } from "@/data/experience";

const Experience = () => {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLDivElement>(null);

  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const splits: SplitText[] = [];

      // Progress thread + a square marker that turns five quarter-turns on its way down.
      gsap.set(marker.current, { xPercent: -50 });
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: list.current, start: "top 60%", end: "bottom 60%", scrub: true, invalidateOnRefresh: true },
        })
        .to(thread.current, { scaleY: 1 }, 0)
        .to(marker.current, { y: () => (list.current?.offsetHeight ?? 0) - 12, rotation: 450 }, 0);

      rows.forEach((row) => {
        const plate = row.querySelector("[data-plate]");
        const yearBox = row.querySelector("[data-year]");
        const yearNum = row.querySelector<HTMLElement>("[data-year-num]")!;
        const meta = row.querySelectorAll("[data-meta]");

        // Years assemble letter by letter, then settle back to 40%.
        const split = SplitText.create(yearNum, { type: "chars", mask: "chars", charsClass: "split-char" });
        splits.push(split);
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 72%", once: true } })
          .from(split.chars, { yPercent: 115, duration: 1, ease: "expo.out", stagger: 0.07 })
          .from(meta, { opacity: 0, y: 14, duration: 0.7, stagger: 0.08 }, 0.35)
          .to(yearNum, { opacity: 0.4, duration: 0.9, ease: "power2.out" }, ">-0.1")
          .fromTo(
            plate,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", clearProps: "clipPath" },
            0.1
          );

        // Three parallax layers per row.
        const scrub = { trigger: row, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo(yearBox, { y: 70 }, { y: -70, ease: "none", scrollTrigger: scrub });
        gsap.fromTo(plate, { y: 18 }, { y: -18, ease: "none", scrollTrigger: scrub });
      });

      return () => splits.forEach((s) => s.revert());
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" className="relative z-10 overflow-hidden bg-ink text-ice">
      <ContourField
        className="absolute inset-0 opacity-90"
        color="rgba(246,248,249,0.055)"
        accent="rgba(0,212,230,0.16)"
        interactive={false}
        speed={0.7}
      />

      <div className="relative mx-auto max-w-[96rem] px-5 py-28 md:px-10 md:py-44">
        <p className="eyebrow text-ice/60" data-fade>
          Experience
        </p>
        <h2 data-reveal="lines" className="display rv-pending mt-6 text-[clamp(3.2rem,10.5vw,11rem)] leading-[0.92]">
          From VR to full stack
        </h2>
        <p data-fade data-delay="0.15" className="mt-8 max-w-md text-[0.98rem] leading-relaxed text-ice/60">
          Seven chapters across game development, multimedia, manufacturing, low-code and software engineering.
        </p>

        <div className="relative mt-20 md:mt-32">
          {/* Rail, progress thread and marker */}
          <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-ice/20 lg:left-1/2" />
          <div
            ref={thread}
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px origin-top scale-y-0 bg-ice lg:left-1/2"
          />
          <div
            ref={marker}
            aria-hidden="true"
            className="absolute left-4 top-0 z-10 h-3 w-3 bg-signal shadow-[0_0_0_4px_#0b0c0f] lg:left-1/2"
          />

          <ol ref={list} className="group/list space-y-20 lg:space-y-28">
            {EXPERIENCE.map((role, i) => {
              const yearLeft = i % 2 === 0;
              return (
                <li
                  key={`${role.company}-${role.year}`}
                  data-row
                  className="relative grid gap-5 pl-12 transition-opacity duration-500 group-hover/list:[&:not(:hover)]:opacity-40 lg:grid-cols-2 lg:gap-28 lg:pl-0"
                >
                  {/* Rail node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-6 z-[5] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-ice/50 bg-ink lg:left-1/2"
                  />

                  {/* Year */}
                  <div
                    data-year
                    className={`${yearLeft ? "lg:order-1 lg:text-right" : "lg:order-2 lg:text-left"} flex flex-col`}
                  >
                    <span
                      data-year-num
                      aria-label={role.year}
                      className="display block text-[clamp(4.5rem,12vw,12rem)] leading-[0.85]"
                    >
                      {role.year}
                    </span>
                    <span data-meta className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ice/50">
                      {role.range}
                    </span>
                  </div>

                  {/* Plate */}
                  <div data-plate className={`${yearLeft ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="plate bg-[#535450] p-px">
                      <div className="plate bg-[#101216] p-6 md:p-8">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-white">
                              <img src={`/Images/logos/${role.logo}`} alt="" className="h-5 w-5 object-contain" loading="lazy" />
                            </span>
                            <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ice/80">{role.company}</span>
                          </div>
                          <span className="flex items-center gap-2 rounded-full border border-ice/20 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ice/70">
                            {role.current && <span className="h-1.5 w-1.5 rounded-full bg-signal" />}
                            {role.current ? "Now" : role.type}
                          </span>
                        </div>

                        <h3 className="display mt-6 text-[clamp(1.7rem,2.6vw,2.6rem)] leading-[1]">{role.title}</h3>
                        <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-ice/45">
                          {role.type} · {role.location}
                        </p>

                        <p className="mt-5 text-[0.92rem] leading-relaxed text-ice/65">{role.description}</p>

                        <ul className="mt-5 grid gap-2 border-t border-ice/10 pt-5 text-[0.84rem] text-ice/80">
                          {role.achievements.map((a) => (
                            <li key={a} className="flex items-start gap-3">
                              <span className="mt-[0.5rem] h-1 w-1 shrink-0 bg-signal" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
