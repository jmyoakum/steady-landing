"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/* Scroll-reveal activator — drop once per page that uses [data-reveal]. */
export function RevealScript() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/* Email capture — wired to MailerLite via /api/subscribe. */
export function WaitlistForm({
  cta,
  tone = "light",
}: {
  cta: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    const value = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setStatus("error");
      setMessage("That email looks off — mind checking it?");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("success");
      setMessage("You're on the list. We'll be in touch soon. ✦");
    } catch {
      setStatus("error");
      setMessage("Something hiccuped — try again in a moment?");
    }
  }

  if (status === "success") {
    return (
      <p
        className={`font-hand text-2xl ${dark ? "text-gold" : "text-clayDeep"}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-label="Email address"
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-full border border-line bg-cream px-5 py-3.5 text-base text-ink shadow-sm outline-none transition-colors placeholder:text-inkFaint focus:border-clay"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`whitespace-nowrap rounded-full px-7 py-3.5 text-base font-bold text-cream shadow-sm transition-all hover:shadow-md active:translate-y-px disabled:opacity-60 ${
            dark ? "bg-clay hover:bg-coral" : "bg-ink hover:bg-clayDeep"
          }`}
        >
          {status === "loading" ? "…" : cta}
        </button>
      </div>
      {message && status === "error" ? (
        <p
          className={`mt-2 font-hand text-xl ${dark ? "text-coral" : "text-clayDeep"}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Wordmark({ size = "text-lg" }: { size?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 14 C 7 8, 9 8, 12 12 S 17 16, 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className={`${size} font-extrabold tracking-tight`}>Steady</span>
    </div>
  );
}

export function SiteHeader({ joinHref = "#join" }: { joinHref?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="/" aria-label="Steady home">
          <Wordmark />
        </a>
        <a
          href={joinHref}
          className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition-colors hover:bg-clayDeep"
        >
          Join Waitlist
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line pt-7">
        <a href="/" aria-label="Steady home">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 14 C 7 8, 9 8, 12 12 S 17 16, 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="font-extrabold tracking-tight">Steady</span>
          </div>
        </a>
        <div className="text-sm text-inkFaint">
          © {new Date().getFullYear()} Steady · staysteady.io
        </div>
      </div>
    </footer>
  );
}
