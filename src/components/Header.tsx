import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useScroll } from "@/lib/scroll-context";
import { useIntro } from "@/lib/intro";
import { useMagnetic } from "@/components/fx/useMagnetic";
import { NAV, SITE, SOCIALS } from "@/data/site";

const Header = () => {
  const { ready } = useIntro();
  const { scrollTo, lock, unlock } = useScroll();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const bar = useRef<HTMLElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuOpen = useRef(false);
  const cv = useMagnetic<HTMLAnchorElement>(0.3);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (menuOpen.current) toggleMenu(false);
    scrollTo(href, { offset: 0 });
  };

  const { contextSafe } = useGSAP(
    () => {
      const el = bar.current!;
      if (!prefersReducedMotion()) gsap.set(el, { yPercent: -140, opacity: 0 });

      // Slim down + hide on scroll-down, return on scroll-up.
      let hidden = false;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          pill.current?.classList.toggle("is-solid", y > 40);
          if (menuOpen.current) return;
          const down = self.direction === 1;
          if (down && y > 260 && !hidden) {
            hidden = true;
            gsap.to(el, { yPercent: -140, duration: 0.5, ease: "power3.inOut", overwrite: "auto" });
          } else if ((!down || y <= 260) && hidden) {
            hidden = false;
            gsap.to(el, { yPercent: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          }
        },
      });

      // Highlight the section in view.
      NAV.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(href),
        });
      });
    },
    { scope: bar }
  );

  // Slide in once the intro curtain lifts.
  useEffect(() => {
    if (!ready) return;
    if (prefersReducedMotion()) return;
    gsap.to(bar.current, { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.5 });
  }, [ready]);

  const toggleMenu = contextSafe((next: boolean) => {
    const panel = menu.current;
    if (!panel) return;
    menuOpen.current = next;
    setOpen(next);

    if (next) {
      lock();
      gsap.set(panel, { display: "flex" });
      gsap
        .timeline()
        .fromTo(panel, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
        .from(panel.querySelectorAll("[data-menu-line]"), { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.07 }, "-=0.35")
        .from(panel.querySelectorAll("[data-menu-fade]"), { opacity: 0, y: 16, duration: 0.7, stagger: 0.06 }, "-=0.6");
    } else {
      unlock();
      gsap.to(panel, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }
  });

  // Escape closes the menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen.current) toggleMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleMenu]);

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 md:px-5 md:pt-4">
        <div
          ref={pill}
          className="group/pill mx-auto flex max-w-[96rem] items-center justify-between rounded-full border border-transparent px-4 py-2.5 transition-[background-color,border-color,backdrop-filter] duration-500 md:px-6 [&.is-solid]:border-line [&.is-solid]:bg-ice/80 [&.is-solid]:backdrop-blur-xl"
        >
          <a href="#home" onClick={(e) => go(e, "#home")} className="flex items-center gap-3" aria-label="Qiniso Mtshali — back to top">
            <span className="display grid h-9 w-9 place-items-center rounded-full bg-ink text-[0.95rem] text-ice">QM</span>
            <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.2em] sm:block">{SITE.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ label, href }, i) => (
              <a
                key={href}
                href={href}
                onClick={(e) => go(e, href)}
                aria-current={active === href ? "true" : undefined}
                className="group relative overflow-hidden rounded-full px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em]"
              >
                <span className="mr-1.5 text-steel">{String(i + 1).padStart(2, "0")}</span>
                {label}
                <span
                  className={`absolute inset-x-4 bottom-1 h-px origin-left bg-ink transition-transform duration-500 ${
                    active === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              ref={cv}
              href={SITE.cv}
              download
              data-cursor="CV"
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ice transition-colors duration-300 hover:bg-signal hover:text-ink sm:inline-flex"
            >
              <Download size={14} />
              CV
            </a>
            <button
              type="button"
              onClick={() => toggleMenu(!menuOpen.current)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-ink/90 text-ice lg:hidden"
            >
              <span className={`absolute h-px w-4 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-4 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <div
        ref={menu}
        id="site-menu"
        data-lenis-prevent
        style={{ display: "none", clipPath: "inset(0% 0% 100% 0%)" }}
        className="fixed inset-0 z-[65] flex-col justify-between overflow-y-auto bg-ink px-6 pb-8 pt-28 text-ice md:px-10"
      >
        <ul className="flex flex-col gap-1">
          {NAV.map(({ label, href }, i) => (
            <li key={href} className="overflow-hidden">
              <a
                href={href}
                onClick={(e) => go(e, href)}
                data-menu-line
                className="display flex items-baseline gap-4 text-[clamp(2.6rem,12vw,5.5rem)] leading-[1.05] transition-colors duration-300 hover:text-signal"
              >
                <span className="text-[0.7rem] font-sans tracking-[0.2em] text-steel">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div data-menu-fade className="mt-10 flex flex-col gap-6 border-t border-ice/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={SITE.cv}
            download
            className="inline-flex w-fit items-center gap-2 rounded-full bg-signal px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-ink"
          >
            <Download size={15} /> Download CV
          </a>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ice/70">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-ice">
                  {s.label} <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
