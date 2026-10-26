import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion, hasFinePointer } from "@/lib/gsap";
import { useReveals } from "@/lib/reveal";
import { useMagnetic } from "@/components/fx/useMagnetic";
import { FEATURED_PROJECTS, MORE_PROJECTS, type FeaturedProject } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

const VisitLink = ({ project }: { project: FeaturedProject }) => {
  const ref = useMagnetic<HTMLAnchorElement>(0.3);
  return (
    <a
      ref={ref}
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Visit"
      className="pill w-fit text-ink"
      style={{ background: project.theme.accent }}
    >
      Visit live site <ArrowUpRight size={16} />
    </a>
  );
};

const Panel = ({ project, index, total }: { project: FeaturedProject; index: number; total: number }) => (
  <article
    data-panel
    className="relative p-2 md:p-3 lg:sticky lg:top-0 lg:h-svh"
    aria-labelledby={`project-${project.id}`}
  >
    <div
      data-panel-inner
      className="relative h-full origin-center overflow-hidden rounded-[1.75rem] text-white md:rounded-[2.25rem]"
      style={{ background: project.theme.bg }}
    >
      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-25 blur-[120px]"
        style={{ background: project.theme.accent }}
      />

      <div className="relative mx-auto grid h-full max-w-[96rem] items-center gap-10 px-6 py-12 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-10">
        {/* Copy */}
        <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-[clamp(0.9rem,2.4svh,1.75rem)]">
          <div className="flex items-center justify-between">
            <span className="display text-[2.6rem] leading-none" style={{ color: project.theme.accent }}>
              {pad(index + 1)}
              <span className="ml-1 text-base text-white/40">/ {pad(total)}</span>
            </span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-white/75">
              {project.category}
            </span>
          </div>

          <h3
            id={`project-${project.id}`}
            data-reveal="lines"
            className="display rv-pending text-[clamp(2.8rem,min(6.2vw,10svh),6.4rem)] leading-[0.9]"
          >
            {project.title}
          </h3>

          <p data-fade className="max-w-[34rem] text-[0.98rem] leading-relaxed text-white/70">
            {project.summary}
          </p>

          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-full border border-white/15 px-3 py-1 text-[0.66rem] font-medium uppercase tracking-[0.14em] text-white/70">
                {tech}
              </li>
            ))}
          </ul>

          <ul className="grid gap-2 text-[0.88rem] text-white/80">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: project.theme.accent }} />
                {feature}
              </li>
            ))}
          </ul>

          <VisitLink project={project} />
        </div>

        {/* Browser frame: hover to scroll the real site, tilt with the pointer */}
        <div className="lg:col-span-7" style={{ perspective: "1600px" }}>
          <a
            data-frame
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Visit"
            aria-label={`Open ${project.domain}`}
            className="block"
          >
            <div
              data-tilt
              className="mx-auto w-full max-w-[54rem] overflow-hidden rounded-xl border border-white/15 bg-[#0c0e11] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.75)] will-change-transform"
            >
              <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
                <span className="flex gap-1.5">
                  <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </span>
                <span className="mx-auto rounded-full bg-white/10 px-5 py-1 text-[0.7rem] tracking-wide text-white/60">{project.domain}</span>
                <span className="w-9" />
              </div>
              <div data-viewport className="relative aspect-[7/4] overflow-hidden bg-black">
                <img
                  data-shot
                  src={project.image}
                  alt={`${project.title} website, scrolled through`}
                  loading="lazy"
                  width={1200}
                  height={3083}
                  className="absolute left-0 top-0 block w-full"
                />
              </div>
            </div>
            <p className="mt-4 text-center text-[0.68rem] uppercase tracking-[0.22em] text-white/40">Hover to scroll the live site</p>
          </a>
        </div>
      </div>

      {/* Dim layer while the next panel covers this one */}
      <div data-panel-dim aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black opacity-0" />
    </div>
  </article>
);

const Projects = () => {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The stack: each pinned panel recedes as the next one rises over it.
      mm.add("(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        panels.forEach((panel, i) => {
          const next = panels[i + 1];
          if (!next) return;
          const trigger = { trigger: next, start: "top bottom", end: "top top", scrub: true };
          gsap.to(panel.querySelector("[data-panel-inner]"), { scale: 0.9, ease: "none", scrollTrigger: trigger });
          gsap.to(panel.querySelector("[data-panel-dim]"), { opacity: 0.55, ease: "none", scrollTrigger: trigger });
        });
      });

      // Browser frames: scroll the page on hover + 3D tilt.
      if (!prefersReducedMotion() && hasFinePointer()) {
        gsap.utils.toArray<HTMLElement>("[data-frame]").forEach((frame) => {
          const tilt = frame.querySelector<HTMLElement>("[data-tilt]")!;
          const viewport = frame.querySelector<HTMLElement>("[data-viewport]")!;
          const shot = frame.querySelector<HTMLImageElement>("[data-shot]")!;
          const rx = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3" });
          const ry = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3" });

          const enter = () => {
            const distance = shot.offsetHeight - viewport.offsetHeight;
            if (distance <= 0) return;
            gsap.to(shot, { y: -distance, duration: Math.min(14, distance / 140), ease: "power1.inOut", overwrite: true });
          };
          const leave = () => {
            gsap.to(shot, { y: 0, duration: 1.1, ease: "power3.out", overwrite: true });
            rx(0);
            ry(0);
          };
          const move = (e: PointerEvent) => {
            const r = frame.getBoundingClientRect();
            rx(((e.clientX - r.left) / r.width - 0.5) * 7);
            ry(((e.clientY - r.top) / r.height - 0.5) * -6);
          };

          frame.addEventListener("pointerenter", enter);
          frame.addEventListener("pointerleave", leave);
          frame.addEventListener("pointermove", move);
        });
      }
    },
    { scope: root }
  );

  const earlierStart = MORE_PROJECTS.findIndex((p) => p.earlier);

  return (
    <section ref={root} id="work" className="relative z-10 bg-ice">
      <div className="mx-auto max-w-[96rem] px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-44">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow" data-fade>
              Selected work
            </p>
            <h2 data-reveal="lines" className="display rv-pending mt-6 text-[clamp(3.2rem,10.5vw,11rem)] leading-[0.92]">
              Shipped to the real world
            </h2>
          </div>
          <p data-fade data-delay="0.2" className="max-w-xs text-[0.98rem] leading-relaxed text-ink/65 md:mb-3">
            Four production websites for healthcare, wellness and technology clients — each one designed, built and deployed end to end.
          </p>
        </div>
      </div>

      <div>
        {FEATURED_PROJECTS.map((project, i) => (
          <Panel key={project.id} project={project} index={i} total={FEATURED_PROJECTS.length} />
        ))}
      </div>

      {/* More builds */}
      <div className="relative mx-auto max-w-[96rem] px-5 pb-28 pt-28 md:px-10 md:pb-40 md:pt-44">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h3 data-reveal="lines" className="display rv-pending text-[clamp(2.4rem,6vw,6rem)] leading-[0.9]">
            More builds
          </h3>
          <p className="hidden text-[0.72rem] font-medium uppercase tracking-[0.2em] text-steel sm:block">Web apps · AI · Low-code</p>
        </div>

        <ul data-fade="children" data-stagger="0.08" className="[&>li:last-child]:border-b">
          {MORE_PROJECTS.map((project, i) => (
            <li key={project.id} className="group relative border-t border-ink/15">
              {i === earlierStart && (
                <p className="px-2 pb-3 pt-8 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-steel md:px-4">
                  Earlier work — Power Platform years
                </p>
              )}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 overflow-hidden px-2 py-7 md:grid-cols-[4rem_1.3fr_1fr_3.5rem] md:gap-8 md:px-4"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-y-100"
                />
                <span className="relative text-sm text-steel transition-colors duration-300 group-hover:text-ice/50">{pad(i + 1)}</span>
                <div className="relative">
                  <h4 className="display text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.05] transition-colors duration-300 group-hover:text-ice">
                    {project.title}
                  </h4>
                  <p className="mt-2 max-w-xl text-[0.88rem] leading-relaxed text-ink/60 transition-colors duration-300 group-hover:text-ice/65">
                    {project.summary}
                  </p>
                </div>
                <ul className="relative hidden flex-wrap content-center gap-1.5 md:flex">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-ink/15 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ink/60 transition-colors duration-300 group-hover:border-ice/25 group-hover:text-ice/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <span className="relative grid h-11 w-11 place-items-center justify-self-end rounded-full border border-ink/20 transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
