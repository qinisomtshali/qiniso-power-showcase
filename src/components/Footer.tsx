import { ArrowUp } from "lucide-react";
import { useScroll } from "@/lib/scroll-context";
import LocalTime from "@/components/fx/LocalTime";
import { NAV, SITE } from "@/data/site";

const Footer = () => {
  const { scrollTo } = useScroll();

  return (
    <footer className="relative mx-auto mt-24 max-w-[96rem] px-5 pb-8 md:mt-36 md:px-10">
      <div className="flex flex-col gap-8 border-t border-ice/15 pt-8 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ice/70">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
              className="transition-colors hover:text-signal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => scrollTo(0, { duration: 2 })}
          data-cursor="Top"
          className="group inline-flex w-fit items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ice/70 transition-colors hover:text-signal"
        >
          Back to top
          <span className="grid h-10 w-10 place-items-center rounded-full border border-ice/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
            <ArrowUp size={16} />
          </span>
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-ice/40 md:flex-row md:justify-between">
        <p>
          © {SITE.year} {SITE.name}. All rights reserved.
        </p>
        <p>
          Johannesburg · <LocalTime />
        </p>
        <p>Built with React, GSAP &amp; Lenis</p>
      </div>
    </footer>
  );
};

export default Footer;
