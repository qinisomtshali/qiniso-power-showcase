import { useRef } from "react";
import { useReveals } from "@/lib/reveal";
import Marquee from "@/components/fx/Marquee";
import { SKILL_GROUPS, MARQUEE_TOP, MARQUEE_BOTTOM } from "@/data/skills";

const TechStack = () => {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="stack" className="relative z-10 overflow-hidden bg-ice py-28 md:py-44">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        <p className="eyebrow" data-fade>
          Stack
        </p>
        <h2 data-reveal="lines" className="display rv-pending mt-6 text-[clamp(3.2rem,10.5vw,11rem)] leading-[0.92]">
          Tools of the trade
        </h2>
      </div>

      {/* Scroll-velocity tickers */}
      <div className="mt-16 space-y-3 text-ink md:mt-24" aria-hidden="true">
        <Marquee items={MARQUEE_TOP} speed={80} />
        <Marquee items={MARQUEE_BOTTOM} speed={80} reverse />
      </div>

      <div className="mx-auto mt-20 max-w-[96rem] px-5 md:mt-32 md:px-10">
        <ul data-fade="children" data-stagger="0.1" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <li
              key={group.title}
              className="group brackets relative flex min-h-[15rem] flex-col justify-between overflow-hidden p-6 text-ink transition-colors duration-500 hover:bg-ink hover:text-ice md:p-8"
            >
              <div className="flex items-start justify-between">
                <h3 className="display text-[clamp(1.7rem,2.4vw,2.4rem)] leading-none">{group.title}</h3>
                <span className="text-[0.7rem] font-medium tracking-[0.2em] text-steel transition-colors duration-500 group-hover:text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink/15 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-ink/70 transition-colors duration-500 group-hover:border-ice/25 group-hover:text-ice/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TechStack;
