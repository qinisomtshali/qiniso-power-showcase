import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReveals } from "@/lib/reveal";
import { CERTIFICATIONS, ADDITIONAL_CERTIFICATIONS } from "@/data/certifications";

const Certifications = () => {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="credentials" className="relative z-10 bg-ice pb-28 md:pb-44">
      <div className="mx-auto max-w-[96rem] border-t border-ink/15 px-5 pt-24 md:px-10 md:pt-36">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow" data-fade>
              Credentials
            </p>
            <h2 data-reveal="lines" className="display rv-pending mt-6 text-[clamp(3rem,8vw,8.5rem)] leading-[0.92]">
              Microsoft certified
            </h2>
          </div>
          <p data-fade data-delay="0.15" className="max-w-xs text-[0.98rem] leading-relaxed text-ink/65">
            Validated expertise in Microsoft technologies and cloud platforms. Every badge links to its public verification.
          </p>
        </div>

        <ul data-fade="children" data-stagger="0.1" className="[&>li:last-child]:border-b">
          {CERTIFICATIONS.map((cert, i) => (
            <li key={cert.code} className="group relative border-t border-ink/15">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Verify"
                className="relative grid grid-cols-[2.5rem_3.5rem_1fr_auto] items-center gap-4 overflow-hidden px-2 py-6 md:grid-cols-[4rem_4.5rem_1.1fr_1fr_9.5rem_3.5rem] md:gap-8 md:px-4 md:py-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-y-100"
                />
                <span className="relative text-sm text-steel transition-colors duration-300 group-hover:text-ice/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img
                  src={cert.badge}
                  alt=""
                  loading="lazy"
                  className="relative h-12 w-12 object-contain transition-transform duration-500 group-hover:rotate-[12deg] group-hover:scale-110 md:h-14 md:w-14"
                />
                <div className="relative">
                  <h3 className="display text-[clamp(1.6rem,3vw,2.8rem)] leading-none transition-colors duration-300 group-hover:text-signal">
                    {cert.code}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] text-ink/70 transition-colors duration-300 group-hover:text-ice">{cert.name}</p>
                </div>
                <p className="relative hidden text-[0.88rem] leading-snug text-ink/55 transition-colors duration-300 group-hover:text-ice/65 md:block">
                  {cert.description}
                </p>
                <p className="relative hidden text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink/60 transition-colors duration-300 group-hover:text-ice/70 md:block">
                  {cert.issuer} · {cert.year}
                </p>
                <span className="relative grid h-11 w-11 place-items-center justify-self-end rounded-full border border-ink/20 transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div data-fade className="mt-12 flex flex-wrap items-center gap-3">
          <span className="mr-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-steel">Also</span>
          {ADDITIONAL_CERTIFICATIONS.map((cert) => (
            <a
              key={cert.label}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/20 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ice"
            >
              {cert.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
