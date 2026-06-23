"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

function SignupForm({ cta }: { cta: string }) {
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
      <p className="font-display italic text-xl text-clayDeep py-2" role="status">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-label="Email address"
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-sm border border-line bg-paper px-4 py-3.5 font-body text-lg text-ink placeholder:text-inkFaint outline-none transition-colors focus:border-clay"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="whitespace-nowrap rounded-sm bg-ink px-7 py-3.5 font-display font-medium tracking-wide text-paper transition-colors hover:bg-clayDeep active:translate-y-px disabled:opacity-60"
        >
          {status === "loading" ? "…" : cta}
        </button>
      </div>
      {message && status === "error" ? (
        <p className="font-display italic text-clayDeep" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}

export default function Home() {
  return (
    <div className="relative z-[2]">
      {/* Header */}
      <header className="pt-10">
        <div className="mx-auto w-full max-w-read px-6">
          <div className="font-display text-xl font-medium uppercase tracking-[0.16em]">
            Steady<span className="text-clay">.</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pb-16 pt-20 sm:pt-24">
        <div className="mx-auto w-full max-w-read">
          <p className="mb-6 font-display text-base italic text-clayDeep">
            Field notes for the hot &amp; cold
          </p>
          <h1 className="mb-7 font-display text-[2.7rem] font-normal leading-[1.04] tracking-tight sm:text-[3.6rem] lg:text-[4.2rem]">
            When someone keeps pulling away, you don&apos;t have to{" "}
            <em className="italic text-clayDeep">disappear</em> with them.
          </h1>
          <p className="mb-10 max-w-[32rem] text-xl leading-relaxed text-inkSoft">
            Steady helps you understand avoidant relationship behavior and
            navigate the patterns — so you don&apos;t lose yourself in the
            process.
          </p>
          <SignupForm cta="Join the beta" />
          <p className="mt-3 text-sm leading-relaxed text-inkFaint">
            Early access, no spam, leave whenever. We&apos;ll only write when
            there&apos;s something worth saying.
          </p>
        </div>
      </section>

      {/* Atmosphere */}
      <div className="px-6">
        <svg
          className="mx-auto block w-full max-w-3xl opacity-90"
          viewBox="0 0 800 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0 120 C 120 80, 200 80, 320 120 S 540 160, 660 120 S 760 90, 800 110" stroke="#A8694C" strokeOpacity="0.55" strokeWidth="1.4" />
          <path d="M0 140 C 140 110, 220 110, 340 140 S 560 172, 680 140 S 770 118, 800 132" stroke="#8B9A86" strokeOpacity="0.5" strokeWidth="1.2" />
          <path d="M0 100 C 120 70, 210 70, 330 100 S 540 132, 660 100 S 765 80, 800 96" stroke="#211C17" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx="400" cy="118" r="3.2" fill="#A8694C" />
        </svg>
      </div>

      {/* Essay */}
      <section className="px-6 py-10">
        <div className="mx-auto w-full max-w-read">
          <p className="dropcap mb-6">
            You know the feeling. The conversation that flowed for days, then
            went quiet for no reason you can name. The plans that get softer the
            closer they get. The sense that you&apos;re somehow always the one
            reaching — and that reaching is starting to cost you.
          </p>
          <p className="mb-6">
            It isn&apos;t that you&apos;re too much. And it usually isn&apos;t
            that they don&apos;t care. Avoidance has its own grammar: closeness,
            then distance; warmth, then a wall. Once you can read it, the mixed
            signals stop feeling like a verdict on you.
          </p>
          <p className="my-10 border-l-2 border-clay pl-6 font-display text-2xl font-normal italic leading-snug text-ink">
            Steady isn&apos;t here to fix them. It&apos;s here so you can stay
            yourself while you figure out what you actually want.
          </p>
          <p className="mb-6">
            That&apos;s the whole idea. Not advice that sounds like a clinic. Not
            vibes that go nowhere. Something in between — clear, honest, and on
            your side.
          </p>

          <div className="my-10">
            {[
              {
                n: "01",
                t: "Name the pattern",
                d: "Put language to the push and pull, the silence, the breadcrumbs — so it stops living rent-free in your head.",
              },
              {
                n: "02",
                t: "Read the moment",
                d: "Understand what's likely happening underneath hot-and-cold behavior, situationships, and the slow fade.",
              },
              {
                n: "03",
                t: "Keep your footing",
                d: "Steady, grounded next steps that protect your sense of self — whether you stay, leave, or just need to breathe.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="flex items-baseline gap-4 border-t border-line py-5 last:border-b"
              >
                <span className="min-w-[1.6rem] font-display text-base italic text-clay">
                  {item.n}
                </span>
                <div className="flex-1">
                  <strong className="mb-1 block font-display text-lg font-medium">
                    {item.t}
                  </strong>
                  <span className="text-base leading-relaxed text-inkSoft">
                    {item.d}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup */}
      <section className="mt-12 bg-paperDeep py-14" id="join">
        <div className="mx-auto w-full max-w-[34rem] px-6">
          <h2 className="mb-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
            The beta is opening soon.
          </h2>
          <p className="mb-7 text-lg text-inkSoft">
            Leave your email and you&apos;ll be among the first in. No pressure,
            no noise — just a note when it&apos;s ready for you.
          </p>
          <SignupForm cta="Save my spot" />
          <p className="mt-3 text-sm leading-relaxed text-inkFaint">
            We&apos;ll use your email only to tell you about the Steady beta.
            Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-14 pt-8">
        <div className="mx-auto flex w-full max-w-read flex-wrap items-center justify-between gap-3 border-t border-line pt-7">
          <div className="font-display text-base font-medium uppercase tracking-[0.16em]">
            Steady<span className="text-clay">.</span>
          </div>
          <div className="text-sm text-inkFaint">
            © {new Date().getFullYear()} Steady · staysteady.io
          </div>
        </div>
      </footer>
    </div>
  );
}
