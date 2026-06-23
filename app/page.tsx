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
            The hardest relationships aren&apos;t always the ones that end.
            Sometimes they&apos;re the ones that never fully begin — the ones
            built out of almosts.
          </p>

          <p className="my-8 text-center font-display text-2xl italic text-clayDeep">
            Almost together. Almost certain. Almost clear.
          </p>

          <p className="mb-6">
            Enough connection to keep you all in. Enough distance to keep you
            questioning everything. So you start overthinking. You reread the
            texts. You replay the conversations. You swear you&apos;re done
            checking your phone — then check it anyway, hunting for meaning in
            every delay, every dry reply, every little sign.
          </p>

          <p className="mb-6">
            Not because you&apos;re obsessive. Because you&apos;re trying to make
            sense of something that refuses to make sense.
          </p>

          <p className="my-10 border-l-2 border-clay pl-6 font-display text-2xl font-normal italic leading-snug text-ink">
            Somewhere in the middle of it, you catch yourself spending more time
            trying to understand the relationship than actually being in it.
          </p>

          <p className="mb-6">
            Here&apos;s the part nobody tells you: avoidant behavior runs on
            patterns. Once you can spot them, the confusion starts to click. The
            mixed signals stop feeling random. The push and pull becomes
            something you can see coming.
          </p>

          <p className="my-10 border-l-2 border-clay pl-6 font-display text-2xl font-normal italic leading-snug text-ink">
            And once you can see the pattern, you get to decide how to handle it
            — instead of getting pulled back into it.
          </p>

          <p className="mb-6">
            Steady isn&apos;t here to tell you what they&apos;re thinking.
            It&apos;s here to help you spot the pattern, understand your own
            reactions, and make the call before the cycle makes it for you.
          </p>

          <p className="mb-1 font-display text-xl italic text-inkSoft">
            No mind-reading. No relationship hacks. No false hope.
          </p>
          <p className="mb-2 font-display text-2xl italic text-clayDeep">
            Just clarity when everything else feels like a guessing game.
          </p>

          <div className="my-10">
            {[
              {
                n: "01",
                t: "Spot the pattern",
                d: "Put words to the push-pull, the breadcrumbs, the slow fade — so it stops living rent-free in your head.",
              },
              {
                n: "02",
                t: "Understand your reactions",
                d: "See why you reread, replay, and refresh — and what's quietly pulling you back in each time.",
              },
              {
                n: "03",
                t: "Decide before the cycle does",
                d: "Make the call that's yours — stay, walk, or just breathe — instead of letting the pattern choose for you.",
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
