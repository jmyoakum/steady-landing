import type { Metadata } from "next";
import { SiteHeader, Footer, WaitlistForm, RevealScript } from "../shared";
import {
  youProfiles,
  partnerProfiles,
  isYouStyle,
  isPartnerStyle,
  isDynamicSlug,
  type DynamicSlug,
} from "../data";
import { resultContent } from "./content";
import { ShareButton, ShareRow, ShareFab } from "./ShareControls";

const SITE = "https://www.staysteady.io";
const OG_V = "2"; // bump on any share-card change

type SP = { [key: string]: string | string[] | undefined };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

function read(searchParams: SP) {
  const you = one(searchParams.you);
  const them = one(searchParams.them);
  const dyn = one(searchParams.dyn);
  if (!isYouStyle(you) || !isPartnerStyle(them) || !isDynamicSlug(dyn)) return null;
  return { you, them, dyn };
}

export function generateMetadata({ searchParams }: { searchParams: SP }): Metadata {
  const r = read(searchParams);
  if (!r) return { title: "Your relationship dynamic — Steady" };
  const c = resultContent[r.dyn as DynamicSlug];
  // OG cards are served immutable/1yr — bump OG_V whenever the card art or labels change
  // so social scrapers fetch a fresh cache key instead of a stale card.
  const image = `${SITE}/api/og?dyn=${r.dyn}&v=${OG_V}`;
  return {
    title: `${c.name} — your relationship dynamic`,
    description: c.snapshot,
    openGraph: {
      title: `We got ${c.name}`,
      description: c.snapshot,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `We got ${c.name}`,
      description: c.snapshot,
      images: [image],
    },
  };
}

/* Tailwind needs complete class strings — never interpolate colour names. */
const KICKER_TONE = {
  clay: "text-clay",
  clayDeep: "text-clayDeep",
  sage: "text-sage",
  lavender: "text-lavender",
} as const;

function Kicker({
  tone = "clay",
  children,
}: {
  tone?: keyof typeof KICKER_TONE;
  children: React.ReactNode;
}) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.16em] ${KICKER_TONE[tone]}`}>
      {children}
    </p>
  );
}

export default function ResultPage({ searchParams }: { searchParams: SP }) {
  const r = read(searchParams);

  if (!r) {
    return (
      <div className="relative z-[2] min-h-screen">
        <SiteHeader joinHref="/#join" />
        <div className="mx-auto max-w-md px-5 py-24 text-center">
          <p className="font-hand text-3xl text-clayDeep">Let&apos;s find your dynamic</p>
          <p className="mt-4 text-lg text-inkSoft">
            We couldn&apos;t read your result. Take the quiz and it&apos;ll land right here.
          </p>
          <a
            href="/quiz"
            className="mt-8 inline-block rounded-full bg-ink px-8 py-4 text-base font-bold text-cream shadow-sm transition-all hover:bg-clayDeep"
          >
            Take the quiz →
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const c = resultContent[r.dyn as DynamicSlug];
  const you = youProfiles[r.you];
  const them = partnerProfiles[r.them];
  const imageUrl = `/api/og?dyn=${r.dyn}&v=${OG_V}`;

  return (
    <div className="relative z-[2]">
      <SiteHeader joinHref="#join" />

      {/* 1 · The reveal */}
      <section className="flex min-h-[86vh] items-center px-5 pb-10 pt-8 sm:min-h-[88vh] sm:pt-12">
        <div className="mx-auto w-full max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-clay sm:text-xs">
            Your relationship dynamic
          </p>

          <h1 className="mt-3.5 text-[2.35rem] font-extrabold leading-[1.03] tracking-tight text-ink sm:text-6xl">
            {c.name}
          </h1>

          <p className="mt-4 inline-block rounded-full bg-paperDeep px-4 py-1.5 text-[13px] font-semibold text-inkSoft sm:text-[15px]">
            {c.poles}
          </p>

          <p className="mx-auto mt-5 max-w-md font-hand text-[1.45rem] leading-snug text-clayDeep sm:mt-6 sm:max-w-lg sm:text-3xl">
            {c.snapshot}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:mt-9 sm:flex-row sm:justify-center sm:gap-7">
            <ShareButton name={c.name} snapshot={c.snapshot} />
            <a
              href="#breakdown"
              className="text-base font-semibold text-clayDeep underline-offset-4 hover:underline"
            >
              Read the full breakdown ↓
            </a>
          </div>

          <p className="mt-6 text-[13px] text-inkFaint">Based on your 2-minute quiz</p>
        </div>
      </section>

      {/* 2 · What's happening between you */}
      <section id="breakdown" className="scroll-mt-20 px-5 py-14 sm:py-20">
        <div data-reveal className="mx-auto max-w-read">
          <Kicker>What&apos;s happening between you</Kicker>
          <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-inkSoft sm:text-lg">
            {c.whatsHappening.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · The two of you */}
      <section className="px-5 pb-14 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <p data-reveal className="text-center font-hand text-[1.75rem] text-clayDeep sm:text-3xl">
            The two sides of it
          </p>

          <div className="mt-7 grid gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5">
            <div data-reveal className="rounded-2xl border border-line bg-cream p-5 shadow-sm sm:p-6">
              <Kicker>Your side</Kicker>
              <h2 className="mt-2 text-xl font-extrabold text-ink sm:text-2xl">{you.name}</h2>
              <p className="mt-3 leading-relaxed text-inkSoft">{c.yourSide}</p>
            </div>

            <div data-reveal className="rounded-2xl border border-line bg-cream p-5 shadow-sm sm:p-6">
              <Kicker tone="lavender">What you&apos;re noticing in them</Kicker>
              <h2 className="mt-2 text-xl font-extrabold text-ink sm:text-2xl">{them.name}</h2>
              <p className="mt-3 leading-relaxed text-inkSoft">{c.theirSide}</p>
              <p className="mt-4 text-xs text-inkFaint">
                A working read from your side — not a label. It can shift as you see more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Shines / gets stuck */}
      <section className="px-5 pb-14 sm:pb-20">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-5">
          <div data-reveal className="rounded-2xl bg-sage/10 p-5 ring-1 ring-sage/25 sm:p-6">
            <Kicker tone="sage">Where it shines</Kicker>
            <p className="mt-3 leading-relaxed text-inkSoft">{c.shines}</p>
          </div>
          <div data-reveal className="rounded-2xl bg-clay/10 p-5 ring-1 ring-clay/25 sm:p-6">
            <Kicker tone="clayDeep">Where it gets stuck</Kicker>
            <div className="mt-3 space-y-3 leading-relaxed text-inkSoft">
              {c.stuck.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 · What tends to help */}
      <section className="px-5 pb-14 sm:pb-20">
        <div
          data-reveal
          className="mx-auto max-w-read rounded-2xl border-l-[3px] border-clay bg-cream p-5 shadow-sm sm:p-7"
        >
          <Kicker>What tends to help</Kicker>
          <div className="mt-3 space-y-4 text-[1.0625rem] leading-relaxed text-ink sm:text-lg">
            {c.helps.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Talk about it together */}
      <section className="px-5 pb-16 sm:pb-24">
        <div
          data-reveal
          className="mx-auto max-w-read rounded-3xl bg-paperDeep px-6 py-8 text-center sm:px-10 sm:py-10"
        >
          <Kicker>Talk about it together</Kicker>
          <p className="mt-4 font-hand text-2xl leading-snug text-ink sm:text-[2rem]">
            “{c.question}”
          </p>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-inkSoft">
            {c.questionNote}
          </p>
        </div>
      </section>

      {/* 7 · Share your dynamic */}
      <section className="bg-paper px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p data-reveal className="text-center font-hand text-[1.75rem] text-clayDeep sm:text-3xl">
            Send this to them
          </p>

          <div
            data-reveal
            className="mt-7 grid gap-6 sm:mt-9 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8"
          >
            <div className="rounded-2xl border border-line bg-cream px-6 py-8 text-center shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay">
                Our relationship dynamic
              </p>
              <p className="mt-2 text-[1.6rem] font-extrabold leading-tight text-ink sm:text-3xl">
                {c.name}
              </p>
              <p className="mt-2.5 inline-block rounded-full bg-paperDeep px-3 py-1 text-xs font-semibold text-inkSoft">
                {c.poles}
              </p>
              <p className="mx-auto mt-4 max-w-xs font-hand text-lg leading-snug text-clayDeep">
                {c.snapshot}
              </p>
              <p className="mt-5 text-xs font-bold text-inkFaint">
                What&apos;s your dynamic? · staysteady.io
              </p>
            </div>

            <div className="sm:w-52">
              <ShareRow name={c.name} snapshot={c.snapshot} imageUrl={imageUrl} />
              <p className="mt-3 text-[13px] leading-relaxed text-inkFaint">
                Most people send it straight to the person it&apos;s about.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Save + deeper read */}
      <section className="px-5 py-14 sm:py-20">
        <div data-reveal className="mx-auto max-w-read text-center">
          <h2 className="text-[1.75rem] font-extrabold leading-tight text-ink sm:text-4xl">
            Save your result.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-inkSoft sm:text-lg">
            We&apos;ll send you {c.name} to keep — plus the deeper read on each of you when
            it&apos;s ready.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <WaitlistForm cta="Send it to me" />
            <p className="mt-2.5 text-sm text-inkFaint">
              Only your result and the Steady beta. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 9 · Steady is built for this */}
      <section id="join" className="px-5 pb-16 sm:pb-20">
        <div
          data-reveal
          className="mx-auto max-w-3xl rounded-3xl bg-ink px-6 py-12 text-center text-cream sm:px-12 sm:py-14"
        >
          <h2 className="text-[1.75rem] font-extrabold leading-tight sm:text-4xl">
            Steady is built for exactly this.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-cream/80">
            Catch the pattern in the moment, figure out what to say, and watch it change over time.
          </p>
          <div className="mx-auto mt-7 max-w-md">
            <WaitlistForm cta="Join the beta" tone="dark" />
            <p className="mt-2.5 text-sm text-cream/60">
              Be first in when the beta opens — no pressure, no noise.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-3xl text-center">
          <a
            href="/quiz"
            className="text-base font-semibold text-clayDeep underline-offset-4 hover:underline"
          >
            Retake the quiz →
          </a>
        </div>
      </section>

      <Footer />
      <ShareFab name={c.name} snapshot={c.snapshot} />
      <RevealScript />
    </div>
  );
}
