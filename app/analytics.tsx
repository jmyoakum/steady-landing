"use client";

/* ─────────────────────────────────────────────────────────────
   Steady — analytics
   PostHog, loaded via the official snippet rather than the npm package.

   Why the snippet and not `posthog-js`:
   adding a dependency we cannot install or build-test locally risks a failed
   Vercel build taking the live site down. The snippet needs no package.json
   change, queues events fired before the script finishes loading, and is
   functionally identical for capture(). Worst case here is "no events",
   never "no site".

   FAIL-SAFE BY DESIGN: with no NEXT_PUBLIC_POSTHOG_KEY set, nothing loads,
   every track() call is a silent no-op, and the site behaves exactly as it
   does today. Add the key in Vercel and events start flowing on next deploy.

   Debugging on production: append ?debug_analytics=1 to any URL and every
   event will be logged to the console as it fires.
   ───────────────────────────────────────────────────────────── */

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

type Props = Record<string, unknown>;

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, props?: Props, opts?: Props) => void;
      [k: string]: unknown;
    };
    __steadyDebug?: boolean;
  }
}

/** Fire an event. Safe no-op if PostHog isn't configured or hasn't loaded. */
export function track(event: string, props: Props = {}, opts?: Props) {
  if (typeof window === "undefined") return;
  if (window.__steadyDebug) {
    // eslint-disable-next-line no-console
    console.log("%c[steady:analytics]", "color:#C06B4A;font-weight:bold", event, props);
  }
  try {
    window.posthog?.capture(event, props, opts);
  } catch {
    /* analytics must never break the page */
  }
}

/** pagehide/visibilitychange events must use sendBeacon or they're dropped. */
export function trackBeacon(event: string, props: Props = {}) {
  track(event, props, { transport: "sendBeacon" });
}

/* The official PostHog stub. It queues capture() calls made before the real
   library arrives, so nothing fired early is lost. */
const SNIPPET = `
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${KEY}',{api_host:'${HOST}',person_profiles:'identified_only',capture_pageview:true,capture_pageleave:true,autocapture:false});
`;

/* ── Global provider. Mount once, in the root layout. ───────── */
export function AnalyticsProvider() {
  const pathname = usePathname();
  const landingFired = useRef(false);

  /* ?debug_analytics=1 turns on console logging, on production too. */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("debug_analytics") === "1") {
      window.__steadyDebug = true;
      // eslint-disable-next-line no-console
      console.log(
        "%c[steady:analytics] debug on · posthog:",
        "color:#C06B4A;font-weight:bold",
        KEY ? "configured" : "NO KEY — events are no-ops"
      );
    }
  }, []);

  /* landing_view — homepage only, once per mount. */
  useEffect(() => {
    if (pathname !== "/" || landingFired.current) return;
    landingFired.current = true;
    const p = new URLSearchParams(window.location.search);
    track("landing_view", {
      referrer: document.referrer || "direct",
      utm_source: p.get("utm_source"),
      utm_medium: p.get("utm_medium"),
      utm_campaign: p.get("utm_campaign"),
    });
  }, [pathname]);

  /* Delegated clicks. Doing it this way means page.tsx needs no edits at all —
     any link to /quiz anywhere on the site is tracked automatically, including
     ones we add later. */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      const quizLink = el.closest<HTMLAnchorElement>('a[href^="/quiz"]');
      if (quizLink) {
        track("quiz_cta_click", {
          label: (quizLink.textContent ?? "").trim().slice(0, 60),
          href: quizLink.getAttribute("href"),
          from_path: window.location.pathname,
        });
        return;
      }

      const appCta = el.closest<HTMLElement>("[data-app-cta]");
      if (appCta && el.closest("a,button")) {
        track("app_cta_clicked", {
          location: appCta.dataset.appCta,
          dyn: appCta.dataset.dyn ?? null,
          from_path: window.location.pathname,
        });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!KEY) return null; // no key → nothing loads, everything no-ops
  return (
    <Script id="ph" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
  );
}

/* ── /result island. The result page is a server component, so the events
      that need the browser live here. ────────────────────────── */
export function ResultAnalytics({
  dyn,
  dyn2,
  you,
  you2,
  them,
  conf,
}: {
  dyn: string;
  dyn2?: string;
  you: string;
  you2?: string;
  them: string;
  conf?: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    /* Did they just take the quiz, or did they open someone else's shared link?
       These are completely different people and must never be averaged together:
       one is a funnel step, the other is organic reach. */
    let entry: "quiz" | "shared_link" = "shared_link";
    try {
      if (sessionStorage.getItem("steady_quiz_done") === "1") {
        entry = "quiz";
        sessionStorage.removeItem("steady_quiz_done");
      }
    } catch {
      /* private mode */
    }

    track("result_viewed", {
      dyn,
      dyn2: dyn2 ?? null,
      you,
      you2: you2 ?? null,
      them,
      conf: conf ? Number(conf) : null,
      has_dyn2: Boolean(dyn2),
      has_you2: Boolean(you2),
      entry,
      referrer: document.referrer || "direct",
    });
  }, [dyn, dyn2, you, you2, them, conf]);

  /* result_scroll_depth — 25/50/75/100, each at most once.
     This is the event that will tell us how many people ever physically reach
     the email capture at the bottom of the page. I expect the answer to be bleak. */
  useEffect(() => {
    const marks = [25, 50, 75, 100];
    const hit = new Set<number>();
    let ticking = false;

    function measure() {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const m of marks) {
        if (pct >= m && !hit.has(m)) {
          hit.add(m);
          track("result_scroll_depth", { depth: m, dyn });
        }
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    measure(); // short viewports can already be at 100%
    return () => window.removeEventListener("scroll", onScroll);
  }, [dyn]);

  return null;
}
