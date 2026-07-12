"use client";

import { useEffect, useState } from "react";

/* The homepage is ~6 screens on a phone. Without this, a reader who scrolls past
   the hero has no path to the quiz for thousands of pixels — intent forms
   mid-page and has nowhere to go.

   The bar exists to cover the GAPS, not to compete. It stands down whenever a
   real quiz CTA is already on screen (or the footer waitlist is), so the reader
   never sees two identical asks at once.

   No tracking code here on purpose: AnalyticsProvider already delegates clicks
   on any a[href^="/quiz"], so this link reports itself as quiz_cta_click with
   label "See your pattern — free". That label is what distinguishes it from the
   hero and section CTAs in PostHog — it's how you'll learn whether the bar is
   actually earning its keep. If it isn't, delete it. */
const QUIZ_CTA = 'a[href^="/quiz"]:not([data-sticky])';
const COMPETING = `${QUIZ_CTA}, #join`;

export function StickyQuizBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pastHero = false;
    const onScreen = new Set<Element>();

    const render = () => setVisible(pastHero && onScreen.size === 0);

    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.9;
      if (next !== pastHero) {
        pastHero = next;
        render();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) onScreen.add(en.target);
            else onScreen.delete(en.target);
          });
          render();
        },
        /* rootMargin trims the bottom of the viewport by roughly the bar's own
           height, so a CTA sitting *underneath* the bar doesn't count as
           visible — otherwise the bar would hide itself for a button the reader
           can't actually see. */
        { threshold: 0.5, rootMargin: "0px 0px -80px 0px" }
      );
      document.querySelectorAll(COMPETING).forEach((el) => io!.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-cream/90 px-4 pt-3 backdrop-blur transition-transform duration-300 motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <a
        href="/quiz"
        data-sticky=""
        tabIndex={visible ? 0 : -1}
        className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-clay text-[17px] font-bold text-cream shadow-md transition-colors hover:bg-clayDeep active:translate-y-px"
      >
        See your pattern — free
      </a>
    </div>
  );
}
