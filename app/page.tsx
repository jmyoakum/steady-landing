"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/* ---------- Email capture (wired to Kit via /api/subscribe) ---------- */
function WaitlistForm({
  cta,
  id,
  tone = "light",
}: {
  cta: string;
  id?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
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
    <form id={id} onSubmit={onSubmit} noValidate className="w-full">
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

/* ---------- Image slot: shows your art when present, a tidy placeholder until then ---------- */
function Slot({
  src,
  alt,
  className,
  ratio,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
}) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`slot ${className ?? ""}`} style={{ aspectRatio: ratio ?? "4 / 5" }}>
      {ok ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="slot-img"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="slot-ph">
          <span className="text-2xl text-clay" aria-hidden="true">✦</span>
          <span className="text-sm font-medium">{alt}</span>
          <code>{src}</code>
        </div>
      )}
    </div>
  );
}

function TrustItem({
  color,
  label,
  children,
}: {
  color: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color}`}
        aria-hidden="true"
      >
        {children}
      </span>
      <span className="text-base font-semibold text-ink">{label}</span>
    </div>
  );
}

export default function Home() {
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

  const steps = [
    {
      n: "01",
      t: "See the pattern",
      d: "Recognize the push and pull, the distance, the breadcrumbs, and the mixed signals before they pull you back into the same cycle.",
      img: "/img/step-01.png",
      tint: "from-lavender/15",
    },
    {
      n: "02",
      t: "Understand what's happening",
      d: "Make sense of hot and cold behavior, situationships, mixed signals, and emotional distance without guessing what they mean.",
      img: "/img/step-02.png",
      tint: "from-coral/15",
    },
    {
      n: "03",
      t: "Choose your next move",
      d: "Decide how to respond before confusion, hope, and emotion start making decisions for you.",
      img: "/img/step-03.png",
      tint: "from-gold/15",
    },
  ];

  return (
    <div className="relative z-[2]">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 14 C 7 8, 9 8, 12 12 S 17 16, 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-tight">Steady</span>
          </div>
          <a
            href="#join"
            className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition-colors hover:bg-clayDeep"
          >
            Join Waitlist
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 pb-10 pt-12 sm:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* copy */}
          <div data-reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-clay">
              Understand the pattern · Break the cycle · Make better decisions
            </p>
            <h1 className="text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              When someone keeps pulling away, you don&apos;t have to{" "}
              <span className="text-clayDeep">disappear</span> with them.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-inkSoft">
              Steady helps you understand avoidant relationship behavior and
              navigate the patterns so you don&apos;t lose yourself in the
              process.
            </p>

            <div className="mt-7 max-w-md">
              <WaitlistForm cta="Join the Waitlist" />
              <p className="mt-2.5 text-sm text-inkFaint">
                Early access, no spam, leave whenever.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <TrustItem color="bg-lavender/20" label="No mind-reading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 1 5 3 3 0 0 0 3 3M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-1 5 3 3 0 0 1-3 3M12 4v16" stroke="#6F62B8" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </TrustItem>
              <TrustItem color="bg-coral/20" label="No relationship hacks">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 20s-7-4.5-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.5-7 9-7 9Z" stroke="#C96A57" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M11 7l-2 4h3l-2 4" stroke="#C96A57" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </TrustItem>
              <TrustItem color="bg-gold/25" label="No false hope">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" stroke="#B07F1E" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </TrustItem>
            </div>

            <p className="mt-5 font-hand text-2xl text-lavender">
              Just clarity when things feel confusing.
            </p>
          </div>

          {/* hero art */}
          <div data-reveal className="relative">
            <div className="floaty-slow absolute -left-2 top-4 z-10 hidden rounded-2xl bg-cream px-3 py-2 text-sm shadow-md sm:block">
              Should I text? Wait? Move on?
            </div>
            <div className="floaty absolute -right-1 top-24 z-10 hidden rounded-2xl bg-cream px-3 py-2 text-sm shadow-md sm:block">
              Why do I keep getting pulled back in?
            </div>
            <Slot
              src="/img/hero.png"
              alt="Hero scene — two people back to back, phones, thought bubbles"
              ratio="4 / 5"
            />
          </div>
        </div>
      </section>

      {/* Narrative body */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-read">
          <div data-reveal className="space-y-4 text-lg leading-relaxed text-inkSoft">
            <p className="text-2xl font-semibold leading-snug text-ink">
              The hardest relationships aren&apos;t always the ones that end.
              Sometimes they&apos;re the ones that never fully begin. The ones
              filled with almosts.
            </p>
          </div>

          <p data-reveal className="my-9 text-center font-hand text-3xl text-clayDeep">
            Almost together. Almost certain. Almost clear.
          </p>

          <div data-reveal className="space-y-5 text-lg leading-relaxed text-inkSoft">
            <p>
              Enough connection to keep you invested… enough distance to keep
              you questioning everything. So you start thinking again. You reread
              the messages. You replay the conversations. You tell yourself
              you&apos;re done checking your phone… then check it anyway. You
              search for meaning in every text, every delay, every tiny sign.
            </p>
            <p>
              Not because you&apos;re obsessed. Because you&apos;re trying to
              make sense of something that doesn&apos;t make sense.
            </p>
          </div>

          <blockquote
            data-reveal
            className="my-10 border-l-[3px] border-clay pl-5 text-2xl font-semibold leading-snug text-ink sm:text-[1.7rem]"
          >
            And somewhere in the middle of all that… you realize you&apos;re
            spending more time trying to understand the relationship than
            actually experiencing it.
          </blockquote>

          <div data-reveal className="space-y-5 text-lg leading-relaxed text-inkSoft">
            <p>
              Avoidant behavior follows patterns. Once you can recognize those
              patterns, the confusion starts to make sense. The mixed signals
              stop feeling random. The push and pull becomes predictable.
            </p>
          </div>

          <blockquote
            data-reveal
            className="my-10 rounded-2xl bg-paperDeep px-6 py-7 text-2xl font-bold leading-snug text-ink sm:text-[1.7rem]"
          >
            And when you can see the pattern… you can decide how to navigate it
            instead of getting pulled back into it.
          </blockquote>

          <div data-reveal className="space-y-5 text-lg leading-relaxed text-inkSoft">
            <p>
              Steady isn&apos;t here to tell you what they&apos;re thinking.
              It&apos;s here to help you recognize the pattern, understand your
              reactions, and make decisions before the cycle starts making them
              for you.
            </p>
          </div>

          <div data-reveal className="mt-8">
            <p className="text-xl font-bold text-ink">
              No mind-reading. No relationship hacks. No false hope.
            </p>
            <p className="mt-1 font-hand text-3xl text-clayDeep">
              Just clarity when things feel confusing.
            </p>
          </div>
        </div>
      </section>

      {/* How Steady helps */}
      <section className="bg-paper px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <p data-reveal className="text-center font-hand text-3xl text-clayDeep">
            How Steady helps
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} data-reveal className="flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-cream">
                    {s.n}
                  </span>
                  <h3 className="text-xl font-extrabold leading-tight text-ink">
                    {s.t}
                  </h3>
                </div>
                <p className="mb-5 text-base leading-relaxed text-inkSoft">
                  {s.d}
                </p>
                <Slot src={s.img} alt={`Step ${s.n} — ${s.t}`} ratio="1 / 1" className="mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="px-5 py-16">
        <div data-reveal className="mx-auto max-w-read text-center">
          <div className="mb-5 flex justify-center -space-x-3">
            <span className="h-12 w-12 rounded-full border-2 border-cream bg-lavender/40" aria-hidden="true" />
            <span className="h-12 w-12 rounded-full border-2 border-cream bg-coral/40" aria-hidden="true" />
          </div>
          <p className="text-2xl font-semibold leading-snug text-ink sm:text-[1.7rem]">
            <span className="font-hand text-4xl text-clay">“</span>Steady
            doesn&apos;t tell you what they&apos;re thinking. It helps you
            recognize the pattern, understand your reactions, and make decisions
            before the cycle starts making them for you.
          </p>
          <p className="mt-4 font-hand text-3xl text-lavender">with you, not at you ♡</p>
        </div>
      </section>

      {/* Final CTA */}
      <section id="join" className="px-5 pb-20">
        <div
          data-reveal
          className="mx-auto max-w-3xl rounded-3xl bg-ink px-6 py-12 text-center text-cream sm:px-12"
        >
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            Understand the pattern. Break the cycle.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-cream/80">
            The beta is opening soon. Leave your email and you&apos;ll be among
            the first in — no pressure, no noise.
          </p>
          <div className="mx-auto mt-7 max-w-md">
            <WaitlistForm cta="Join the Waitlist" tone="dark" />
            <p className="mt-2.5 text-sm text-cream/60">
              We&apos;ll only email you about the Steady beta. Unsubscribe
              anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 pb-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line pt-7">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 14 C 7 8, 9 8, 12 12 S 17 16, 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="font-extrabold tracking-tight">Steady</span>
          </div>
          <div className="text-sm text-inkFaint">
            © {new Date().getFullYear()} Steady · staysteady.io
          </div>
        </div>
      </footer>
    </div>
  );
}
