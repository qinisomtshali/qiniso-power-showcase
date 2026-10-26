import React, { useRef, useState } from "react";
import { ArrowUpRight, CheckCircle, AlertCircle, Loader, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useReveals } from "@/lib/reveal";
import ContourField from "@/components/fx/ContourField";
import Footer from "@/components/Footer";
import { useMagnetic } from "@/components/fx/useMagnetic";
import { SITE, SOCIALS } from "@/data/site";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const fieldClass =
  "w-full border-0 border-b border-ice/25 bg-transparent px-0 py-4 text-lg text-ice transition-colors placeholder:text-ice/40 focus:border-signal focus:outline-none focus:ring-0";
const labelClass = "text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ice/50";

const Contact = () => {
  const root = useRef<HTMLElement>(null);
  const send = useMagnetic<HTMLButtonElement>(0.25);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useReveals(root);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={root} id="contact" className="relative z-10 bg-signal p-3 md:p-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink text-ice md:rounded-[2.5rem]">
        <ContourField className="absolute inset-0" color="rgba(246,248,249,0.07)" accent="rgba(0,212,230,0.2)" />

        <div className="relative mx-auto max-w-[96rem] px-5 pt-28 md:px-10 md:pt-44">
          <p className="eyebrow text-ice/60" data-fade>
            Get in touch
          </p>
          <h2 data-reveal="lines" className="display rv-pending mt-6 text-[clamp(3.4rem,12.5vw,13.5rem)] leading-[0.9]">
            Let&apos;s build something good.
          </h2>

          <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12">
            {/* Details */}
            <div className="flex flex-col gap-10 lg:col-span-5">
              <a
                href={`mailto:${SITE.email}`}
                data-cursor="Email"
                data-fade
                className="group display w-fit max-w-full break-words text-[clamp(1.15rem,2.05vw,2.3rem)] leading-[1.1] [overflow-wrap:anywhere]"
              >
                <span className="bg-gradient-to-r from-signal to-signal bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                  {SITE.email}
                </span>
                <ArrowUpRight className="ml-2 inline-block h-[0.8em] w-[0.8em] text-signal transition-transform duration-300 group-hover:rotate-45" />
              </a>

              <dl data-fade="children" data-stagger="0.1" className="divide-y divide-ice/12 border-y border-ice/12 text-[0.78rem] uppercase tracking-[0.14em]">
                <div className="grid grid-cols-[6rem_1fr] gap-4 py-3.5">
                  <dt className="text-ice/45">Phone</dt>
                  <dd>
                    <a href={SITE.phoneHref} className="font-medium transition-colors hover:text-signal">
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 py-3.5">
                  <dt className="text-ice/45">Location</dt>
                  <dd className="font-medium">{SITE.location}</dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 py-3.5">
                  <dt className="text-ice/45">Elsewhere</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1 font-medium">
                    {SOCIALS.filter((s) => s.label !== "Email").map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-signal">
                        {s.label} <ArrowUpRight size={13} />
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} data-fade className="lg:col-span-7" noValidate={false}>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your name
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Alex Rivera" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" className={fieldClass} />
                </div>
              </div>
              <div className="mt-8">
                <label htmlFor="message" className={labelClass}>
                  What are you building?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the project, the timeline, and what success looks like…"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                  ref={send}
                  type="submit"
                  disabled={status === "loading"}
                  data-cursor="Send"
                  className="pill bg-signal text-ink hover:bg-ice disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Send size={15} />
                    </>
                  )}
                </button>

                <p role="status" aria-live="polite" className="text-sm">
                  {status === "success" && (
                    <span className="inline-flex items-center gap-2 text-signal">
                      <CheckCircle size={18} /> Message sent — I&apos;ll get back to you soon.
                    </span>
                  )}
                  {status === "error" && (
                    <span className="inline-flex items-center gap-2 text-[#ff8a7a]">
                      <AlertCircle size={18} /> Something went wrong. Please email me directly.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Contact;
