import { Component, Suspense, lazy, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ScrollProvider } from "@/lib/scroll";
import { IntroContext } from "@/lib/intro";
import { ScrollTrigger } from "@/lib/gsap";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Cursor from "@/components/fx/Cursor";
import ProgressBar from "@/components/fx/ProgressBar";

const CHUNK_RETRY_KEY = "qm-chunk-retry";

// Everything below the fold is its own chunk. Starting the download here, at
// module load, overlaps it with the first render and the intro curtain.
const sectionsLoad = import("@/components/Sections").then(
  (module) => {
    try {
      sessionStorage.removeItem(CHUNK_RETRY_KEY);
    } catch {
      /* private mode */
    }
    return module;
  },
  (error) => {
    // A redeploy retires old hashed chunks, so a tab opened before it can point
    // at a 404. Reload once to pick up the new build; a second failure is real.
    try {
      if (!sessionStorage.getItem(CHUNK_RETRY_KEY)) {
        sessionStorage.setItem(CHUNK_RETRY_KEY, "1");
        window.location.reload();
        return new Promise<never>(() => {});
      }
    } catch {
      /* storage unavailable: fall through */
    }
    throw error;
  }
);
const Sections = lazy(() => sectionsLoad);

class SectionsBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex flex-col items-center gap-5 px-5 py-32 text-center">
        <p className="display text-3xl">The rest of the page didn't load</p>
        <button type="button" onClick={() => window.location.reload()} className="pill bg-ink text-ice hover:bg-signal hover:text-ink">
          Reload
        </button>
      </div>
    );
  }
}

const Index = () => {
  const [ready, setReady] = useState(false);
  const reveal = useCallback(() => setReady(true), []);
  const [sectionsReady, setSectionsReady] = useState(false);
  const onSections = useCallback(() => setSectionsReady(true), []);
  const intro = useMemo(() => ({ ready }), [ready]);

  // Layout shifts (fonts, images) move ScrollTrigger start points: re-measure.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <ScrollProvider>
      <IntroContext.Provider value={intro}>
        <a
          href="#work"
          className="sr-only z-[300] rounded-full bg-signal px-5 py-3 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Loader onReveal={reveal} waitFor={sectionsLoad} />
        <Cursor />
        <ProgressBar />
        <Header sectionsReady={sectionsReady} />
        <main id="main">
          <Hero />
          <About />
          <SectionsBoundary>
            <Suspense fallback={<div aria-hidden className="min-h-[200svh]" />}>
              <Sections onMount={onSections} />
            </Suspense>
          </SectionsBoundary>
        </main>
      </IntroContext.Provider>
    </ScrollProvider>
  );
};

export default Index;
