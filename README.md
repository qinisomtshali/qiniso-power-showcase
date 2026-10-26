# Qiniso Mtshali — Portfolio

Personal portfolio of **Qiniso Mtshali**, Full Stack Developer | Software Engineer, based in Johannesburg, South Africa.

**Live:** https://qiniso-power-showcase.vercel.app

An editorial, animation-led single-page site: an intro curtain, a sticky hero that recedes under the next section, a stacked project showcase with live-site captures, a scroll-driven career timeline, velocity-reactive stack marquees and a working contact form.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 18, TypeScript, Vite 5 (SWC) |
| Styling | Tailwind CSS 3.4, shadcn/ui tokens, Oswald + Space Grotesk |
| Motion | GSAP 3.15 (ScrollTrigger, SplitText), `@gsap/react`, Lenis smooth scroll |
| Contact form | EmailJS (`@emailjs/browser`) |
| Analytics | Vercel Analytics |
| Hosting | Vercel, deployed from `main` |

## Getting started

Requires Node.js 18 or newer.

```sh
git clone https://github.com/qinisomtshali/qiniso-power-showcase.git
cd qiniso-power-showcase
npm install
npm run dev
```

The dev server runs on http://localhost:8080.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Environment variables

The contact form sends mail through EmailJS. Create a `.env.local` file (git-ignored) with:

```sh
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Your EmailJS template should use these variables: `{{from_name}}`, `{{from_email}}` and `{{message}}`.

The same three variables must be set in the Vercel project settings, because Vite inlines them at build time. Without them the form cannot send.

## Editing the content

All copy lives in typed data files, so most updates do not touch any component:

| File | Content |
| --- | --- |
| [src/data/site.ts](src/data/site.ts) | Name, role, contact details, CV path, social links, nav |
| [src/data/projects.ts](src/data/projects.ts) | Featured projects (stacked panels) and the "More builds" list |
| [src/data/experience.ts](src/data/experience.ts) | Career timeline |
| [src/data/skills.ts](src/data/skills.ts) | Skill groups and marquee words |
| [src/data/certifications.ts](src/data/certifications.ts) | Certifications and additional credentials |

Assets live in `public/`:

- **CV:** replace the PDF and update `cv` in `src/data/site.ts` if the filename changes.
- **Project captures:** tall full-page screenshots at `public/Images/projects/<name>-long.webp`. On hover they scroll inside the project card.
- **Social preview:** `public/og-image.jpg` (1200 × 630), referenced from `index.html`.

## Project structure

```
src/
  components/     Page sections: Loader, Header, Hero, About, Projects,
                  Experience, TechStack, Certifications, Contact, Footer
    fx/           Visual effects: ContourField, CheckerSeam, Cursor, Marquee,
                  ProgressBar, LocalTime, useMagnetic
    ui/           shadcn/ui primitives
  data/           Typed site content (see above)
  lib/
    gsap.ts       Registers GSAP plugins; reduced-motion / pointer helpers
    scroll.tsx    Lenis smooth scroll driven by the GSAP ticker
    reveal.ts     Declarative text and fade reveals
    intro.tsx     Context that gates animations until the loader lifts
  pages/Index.tsx Composes the page
```

### Reveal system

Text and block animations are declared with data attributes and wired up by `useReveals` in [src/lib/reveal.ts](src/lib/reveal.ts):

```tsx
<h2 className="rv-pending" data-reveal="lines">Selected work</h2>
<p data-fade>Fades up when scrolled into view.</p>
<p data-fade="children" data-gate>Waits for the intro curtain first.</p>
```

`data-reveal` accepts `lines`, `words` or `chars`. Add `rv-pending` to text that is split so it stays hidden until its animation is ready.

## Behaviour worth knowing

- **Intro loader** plays once per browser tab. Add `?intro` to the URL to replay it.
- **Reduced motion:** with `prefers-reduced-motion`, the loader, smooth scrolling and scroll animations are switched off and all content is shown immediately.
- **Custom cursor and magnetic buttons** only run on devices with a fine pointer.
- **Sticky project stack** is enabled at 1024 px wide and 680 px tall or larger; smaller screens get a regular stacked list.
- Sections are plain `#about`, `#work`, `#experience`, `#stack`, `#credentials` and `#contact` anchors, scrolled to through Lenis.

## Deployment

Pushing to `main` triggers a Vercel build (`npm run build`, output `dist/`). Set the EmailJS environment variables in the Vercel project settings before the first deploy.

## Contact

- LinkedIn: https://www.linkedin.com/in/qiniso-mtshali-532394173/
- GitHub: https://github.com/qinisomtshali
