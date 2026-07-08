"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader, Footer, WaitlistForm, RevealScript } from "../shared";
import {
  framework,
  dynamics,
  youProfiles,
  partnerProfiles,
  isYouStyle,
  isPartnerStyle,
  isDynamicSlug,
} from "../data";

function ResultInner() {
  const sp = useSearchParams();
  const youParam = sp.get("you") ?? "";
  const themParam = sp.get("them") ?? "";
  const dynParam = sp.get("dyn") ?? "";

  // Guard: if the URL is missing or malformed, send people back to the quiz.
  if (!isYouStyle(youParam) || !isPartnerStyle(themParam) || !isDynamicSlug(dynParam)) {
    return (
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
    );
  }

  const you = youProfiles[youParam];
  const them = partnerProfiles[themParam];
  const dyn = dynamics[dynParam];

  return (
    <>
      {/* ── Hero: the dynamic ── */}
      <section className="px-5 pb-8 pt-12 sm:pt-16">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-clay">
            Your relationship dynamic
          </p>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            {dyn.name}
          </h1>
          <p className="mt-4 inline-block rounded-full bg-paperDeep px-4 py-1.5 text-base font-semibold text-inkSoft">
            {dyn.poles}
          </p>
          <p className="mt-5 font-hand text-3xl text-clayDeep">{dyn.tagline}</p>
        </div>
      </section>

      {/* ── The dynamic, unpacked (the hero of the page) ── */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-read">
          <div data-reveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-clay">
              What tends to happen
            </p>
            <p className="text-lg leading-relaxed text-ink">{dyn.whatHappens}</p>
          </div>

          <div data-reveal className="mt-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-clay">
              What each of you may be protecting
            </p>
            <div className="space-y-3">
              {dyn.protect.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-paper px-5 py-4 ring-1 ring-black/5"
                >
                  <p className="text-lg leading-relaxed text-inkSoft">
                    <span className="font-bold text-ink">{p.label}</span> {p.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-inkFaint">
              No mind-reading — just two honest reads on the same moment.
            </p>
          </div>

          <div data-reveal className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-sage/10 p-5 ring-1 ring-sage/20">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-sage">
                Where it shines
              </p>
              <p className="leading-relaxed text-inkSoft">{dyn.strengths}</p>
            </div>
            <div className="rounded-2xl bg-clay/10 p-5 ring-1 ring-clay/20">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-clayDeep">
                Where it creates friction
              </p>
              <p className="leading-relaxed text-inkSoft">{dyn.friction}</p>
            </div>
          </div>

          <div
            data-reveal
            className="mt-8 rounded-2xl border-l-[3px] border-clay bg-cream px-5 py-5 shadow-sm"
          >
            <p className="mb-1 text-sm font-bold uppercase tracking-[0.12em] text-clay">
              What to pay attention to
            </p>
            <p className="text-lg leading-relaxed text-ink">{dyn.watchFor}</p>
          </div>
        </div>
      </section>

      {/* ── The two of you ── */}
      <section className="bg-paper px-5 py-14">
        <div className="mx-auto max-w-3xl">
          <p data-reveal className="text-center font-hand text-3xl text-clayDeep">
            The two sides of it
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {/* You */}
            <div
              data-reveal
              className="rounded-2xl bg-cream p-6 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-clay">
                Your side
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-ink">{you.name}</h3>
              <p className="mt-1 font-hand text-2xl text-clayDeep">{you.tagline}</p>
              <p className="mt-3 leading-relaxed text-inkSoft">{you.blurb}</p>
              <ul className="mt-4 space-y-2">
                {you.signs.map((s, i) => (
                  <li key={i} className="flex gap-2.5 text-[15px] text-inkSoft">
                    <span className="mt-1 text-clay" aria-hidden="true">
                      ✦
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Them */}
            <div
              data-reveal
              className="rounded-2xl bg-cream p-6 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-lavender">
                What you&apos;re noticing in them
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-ink">{them.name}</h3>
              <p className="mt-1 font-hand text-2xl text-clayDeep">{them.tagline}</p>
              <p className="mt-3 leading-relaxed text-inkSoft">{them.blurb}</p>
              <ul className="mt-4 space-y-2">
                {them.notice.map((s, i) => (
                  <li key={i} className="flex gap-2.5 text-[15px] text-inkSoft">
                    <span className="mt-1 text-lavender" aria-hidden="true">
                      ✦
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-inkFaint">
                Based on what you observe — a working read, not a label. It can
                shift as you see more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How Steady helps this dynamic ── */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <p data-reveal className="text-center font-hand text-3xl text-clayDeep">
            How Steady helps with this
          </p>
          <div className="mt-10 space-y-5">
            {framework.map((item) => (
              <div
                key={item.key}
                data-reveal
                className="flex items-start gap-4 rounded-2xl bg-cream p-5 shadow-sm ring-1 ring-black/5"
              >
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${item.accentBg} ${item.accentText}`}
                >
                  {item.name}
                </span>
                <p className="text-lg leading-relaxed text-inkSoft">
                  {(dyn.help as Record<string, string>)[item.key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Waitlist CTA ── */}
      <section id="join" className="px-5 pb-16">
        <div
          data-reveal
          className="mx-auto max-w-3xl rounded-3xl bg-ink px-6 py-12 text-center text-cream sm:px-12"
        >
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            Steady is built for exactly this.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-cream/80">
            Join the beta and be first in when it opens — no pressure, no noise.
          </p>
          <div className="mx-auto mt-7 max-w-md">
            <WaitlistForm cta="Join the Waitlist" tone="dark" />
            <p className="mt-2.5 text-sm text-cream/60">
              We&apos;ll only email you about the Steady beta. Unsubscribe anytime.
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

      {/* Mounted with the content (after Suspense resolves) so the reveal
          observer actually sees these elements. */}
      <RevealScript />
    </>
  );
}

export default function ResultPage() {
  return (
    <div className="relative z-[2]">
      <SiteHeader joinHref="#join" />
      <Suspense
        fallback={
          <div className="px-5 py-24 text-center text-inkFaint">Reading your result…</div>
        }
      >
        <ResultInner />
      </Suspense>
      <Footer />
    </div>
  );
}
