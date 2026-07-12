"use client";

import { useCallback, useEffect, useState } from "react";
import { track } from "../analytics";

function ShareIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}

/** Shared share/copy behaviour for every share affordance on the page.
    `surface` distinguishes the hero button from the module from the mobile FAB —
    without it we'd know shares happened but not which affordance earned them,
    and the hero button is the one we're deliberately protecting. */
function useShare(name: string, snapshot: string, surface: string, dyn?: string) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const share = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://www.staysteady.io";
    const text = `We got ${name} — ${snapshot} What's your dynamic?`;
    const nav = typeof navigator !== "undefined" ? (navigator as Navigator) : undefined;

    /* Fire on intent, not outcome. The native sheet gives us no callback telling
       us whether the user actually sent it, so "shared" here honestly means
       "opened the share sheet". Naming the method keeps that distinction visible
       in the data rather than hiding it. */
    if (nav && typeof nav.share === "function") {
      track("share_clicked", { surface, method: "native", dyn: dyn ?? null });
      try {
        await nav.share({ title: `Our dynamic: ${name}`, text, url });
        return;
      } catch {
        /* user dismissed — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      track("share_clicked", { surface, method: "clipboard", dyn: dyn ?? null });
      setCopied(true);
    } catch {
      /* clipboard blocked — nothing else to do */
    }
  }, [name, snapshot, surface, dyn]);

  const copyLink = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://www.staysteady.io";
    try {
      await navigator.clipboard.writeText(url);
      track("share_clicked", { surface, method: "copy_link", dyn: dyn ?? null });
      setCopied(true);
    } catch {
      /* ignore */
    }
  }, [surface, dyn]);

  return { share, copyLink, copied };
}

/** Primary CTA in the hero — above the fold. */
export function ShareButton({
  name,
  snapshot,
  dyn,
}: {
  name: string;
  snapshot: string;
  dyn?: string;
}) {
  const { share, copied } = useShare(name, snapshot, "hero", dyn);
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={share}
        className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-clay px-8 py-4 text-base font-bold text-cream shadow-md transition-all hover:bg-clayDeep hover:shadow-lg active:translate-y-px sm:w-auto"
      >
        <ShareIcon />
        Share your result
      </button>
      <span
        className={`text-sm text-clayDeep transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}
        role="status"
        aria-live="polite"
      >
        Link copied
      </span>
    </div>
  );
}

/** The share module lower on the page. */
export function ShareRow({
  name,
  snapshot,
  imageUrl,
  dyn,
}: {
  name: string;
  snapshot: string;
  imageUrl: string;
  dyn?: string;
}) {
  const { share, copyLink, copied } = useShare(name, snapshot, "module", dyn);
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full border border-line bg-cream px-5 py-3 text-sm font-bold text-inkSoft transition-colors hover:border-clay hover:text-clayDeep";
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={share}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-base font-bold text-cream shadow-sm transition-all hover:bg-clayDeep hover:shadow-md active:translate-y-px"
      >
        <ShareIcon />
        Share
      </button>
      <div className="flex flex-wrap gap-2.5">
        <a
          href={imageUrl}
          download="steady-dynamic.png"
          className={base}
          onClick={() =>
            track("share_clicked", { surface: "module", method: "download_image", dyn: dyn ?? null })
          }
        >
          Download image
        </a>
        <button onClick={copyLink} className={base}>
          {copied ? "Link copied ✦" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

/** Mobile floating share button — appears once the hero scrolls away. */
export function ShareFab({
  name,
  snapshot,
  dyn,
}: {
  name: string;
  snapshot: string;
  dyn?: string;
}) {
  const { share } = useShare(name, snapshot, "fab", dyn);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={share}
      aria-label="Share your result"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-clay text-cream shadow-lg transition-all duration-300 hover:bg-clayDeep active:translate-y-px sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ShareIcon className="h-6 w-6" />
    </button>
  );
}
