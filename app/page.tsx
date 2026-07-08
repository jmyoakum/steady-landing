import type { ReactNode } from "react";
import { SiteHeader, Footer, WaitlistForm, RevealScript } from "./shared";
import { framework } from "./data";

function TrustItem({
  color,
  label,
  children,
}: {
  color: string;
  label: string;
  children: ReactNode;
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
  return (
    <div className="relative z-[2]">
      <SiteHeader joinHref="#join" />

      {/* Hero */}
      <section className="px-5 pb-10 pt-12 sm:pt-16">
        <div data-reveal className="mx-auto max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-clay">
            Every relationship has a dynamic · Learn to read yours
          </p>
          <h1 className="text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            When someone keeps pulling away, you don&apos;t have to{" "}
            <span className="text-clayDeep">disappear</span> with them.
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-inkSoft">
            Every relationship has a dynamic. Steady helps you recognize yours —
            so you can understand each other better and navigate it with
            confidence.
          </p>

          <div className="mt-6 max-w-md">
            <WaitlistForm cta="Join the Waitlist" />
            <p className="mt-2.5 text-sm text-inkFaint">
              Early access, no spam, leave whenever.
            </p>
          </div>

          {/* Quiz CTA — prominent, above the fold */}
          <div className="mt-6 rounded-3xl border border-clay/30 bg-paper px-6 py-7 text-center shadow-sm sm:px-10">
            <p className="font-hand text-3xl text-clayDeep">
              Discover your relationship dynamic.
            </p>
            <a
              href="/quiz"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-clay px-8 py-4 text-lg font-bold text-cream shadow-md transition-all hover:bg-clayDeep hover:shadow-lg active:translate-y-px"
            >
              Take the Quiz →
            </a>
            <p className="mt-3 text-sm text-inkFaint">
              It only takes a few minutes · no sign-up to see your result
            </p>
          </div>

          {/* Emotional visual — below the CTAs */}
          <div className="relative mt-10">
            <div className="floaty-slow absolute -left-1 -top-3 z-10 rounded-2xl bg-cream px-3 py-2 text-xs shadow-md sm:text-sm">
              What&apos;s really going on here?
            </div>
            <div className="floaty absolute -right-1 bottom-4 z-10 rounded-2xl bg-cream px-3 py-2 text-xs shadow-md sm:text-sm">
              Why do we keep doing this?
            </div>
            <div className="group overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <img
                src="/img/hero-door.jpg"
                alt="A boy and a girl on either side of a closed door, hands gently pressed to it"
                loading="eager"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
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
            Recognize the pattern. Choose what happens next.
          </p>
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
              Enough connection to feel real, enough distance to keep you guessing. So you start looking for the pattern — in the texts, the timing, the little things. Not because you&apos;re overthinking it, but because there&apos;s usually something real underneath the mixed signals.
            </p>
          </div>

          <blockquote
            data-reveal
            className="my-10 border-l-[3px] border-clay pl-5 text-2xl font-semibold leading-snug text-ink sm:text-[1.7rem]"
          >
            And somewhere in there, a better question shows up — not “what are they thinking?” but “what’s the pattern between us?”
          </blockquote>

          {/* Visual break — clarity emerging from confusion */}
          <div data-reveal className="my-12">
            <img
              src="/img/break-walk.jpg"
              alt="A couple walking side by side down a rain-lit street at dusk"
              loading="lazy"
              className="mx-auto w-full max-w-xl rounded-2xl"
            />
          </div>

          <div data-reveal className="space-y-5 text-lg leading-relaxed text-inkSoft">
            <p>
              Every relationship runs on patterns. Once you can see yours, the mixed signals stop feeling random — the push and pull starts to make sense.
            </p>
          </div>

          <blockquote
            data-reveal
            className="my-10 rounded-2xl bg-paperDeep px-6 py-7 text-2xl font-bold leading-snug text-ink sm:text-[1.7rem]"
          >
            And once you can see the pattern, you can work with it — together — instead of guessing your way through.
          </blockquote>

          <div data-reveal className="space-y-5 text-lg leading-relaxed text-inkSoft">
            <p>
              Steady isn&apos;t here to tell you what they&apos;re thinking. It&apos;s here to help you see the pattern, understand your own side of it, and figure out what you both actually need.
            </p>
          </div>

          <div data-reveal className="mt-8">
            <p className="text-xl font-bold text-ink">
              No mind-reading. No relationship hacks. No false hope.
            </p>
            <p className="mt-1 font-hand text-3xl text-clayDeep">
              Recognize the pattern. Choose what happens next.
            </p>
          </div>
        </div>
      </section>

      {/* Signal / Reach / Steady framework */}
      <section className="bg-paper px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p data-reveal className="text-center font-hand text-3xl text-clayDeep">
            How Steady works
          </p>
          <p data-reveal className="mx-auto mt-2 max-w-xl text-center text-lg text-inkSoft">
            Three simple moves — the same three that live inside the app.
          </p>

          <div className="mt-12 flex flex-col gap-16 sm:gap-20">
            {framework.map((item, i) => (
              <div
                key={item.key}
                data-reveal
                className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
              >
                <div
                  className={`overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={item.art}
                    alt={`${item.name} — ${item.tagline}`}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${item.accentBg} ${item.accentText}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-3xl font-extrabold leading-tight text-ink">
                    {item.name}
                  </h3>
                  <p className={`mt-1 text-xl font-semibold ${item.accentText}`}>
                    {item.tagline}
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-inkSoft">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-14 text-center">
            <a
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-bold text-cream shadow-sm transition-all hover:bg-clayDeep hover:shadow-md"
            >
              Which pattern is yours? Take the quiz →
            </a>
          </div>
        </div>
      </section>

      {/* App proof band (product support, used sparingly) */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <p data-reveal className="text-center font-hand text-3xl text-clayDeep">
            A peek inside the app
          </p>
          <div data-reveal className="mt-10 grid grid-cols-3 gap-3 sm:gap-6">
            {framework.map((item) => (
              <figure key={item.key} className="flex flex-col items-center">
                <div className="overflow-hidden rounded-[1.4rem] border-[3px] border-ink/10 bg-cream shadow-lg">
                  <img
                    src={item.app}
                    alt={`${item.name} screen in the Steady app`}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className={`mt-3 text-sm font-bold ${item.accentText}`}>
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="px-5 py-16">
        <div data-reveal className="mx-auto max-w-read text-center">
          <div className="mx-auto mb-7 max-w-md overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
            <img
              src="/img/hero.jpg"
              alt="Two people at dusk, finally seeing clearly"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
          <p className="text-2xl font-semibold leading-snug text-ink sm:text-[1.7rem]">
            <span className="font-hand text-4xl text-clay">“</span>Steady doesn&apos;t tell you what they&apos;re thinking. It helps you see your dynamic, understand your own reactions, and figure out what you both need.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section id="join" className="px-5 pb-20">
        <div
          data-reveal
          className="mx-auto max-w-3xl rounded-3xl bg-ink px-6 py-12 text-center text-cream sm:px-12"
        >
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            Understand your dynamic.
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

      <Footer />
      <RevealScript />
    </div>
  );
}
