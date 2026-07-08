import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader, Footer, WaitlistForm, RevealScript } from "../../shared";
import { profiles, profileOrder, framework, type ProfileSlug } from "../../data";

export function generateStaticParams() {
  return profileOrder.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = profiles[params.slug as ProfileSlug];
  if (!p) return { title: "Your dynamic — Steady" };
  return {
    title: `${p.name} — your Steady dynamic`,
    description: p.tagline,
    openGraph: {
      title: `${p.name} — ${p.tagline}`,
      description: p.intro[0],
    },
  };
}

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const p = profiles[params.slug as ProfileSlug];
  if (!p) notFound();

  return (
    <div className="relative z-[2]">
      <SiteHeader joinHref="#join" />

      {/* Result hero */}
      <section className="px-5 pb-10 pt-12 sm:pt-16">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-clay">
            Your dynamic
          </p>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            {p.name}
          </h1>
          <p className="mt-4 font-hand text-3xl text-clayDeep">{p.tagline}</p>
        </div>
      </section>

      {/* Read */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-read">
          <div data-reveal className="space-y-5 text-lg leading-relaxed text-inkSoft">
            {p.intro.map((para, i) => (
              <p key={i} className={i === 0 ? "text-ink" : ""}>
                {para}
              </p>
            ))}
          </div>

          <blockquote
            data-reveal
            className="my-10 border-l-[3px] border-clay pl-5 text-2xl font-semibold leading-snug text-ink sm:text-[1.7rem]"
          >
            {p.trap}
          </blockquote>

          <div data-reveal className="my-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-clay">
              Sounds like you if…
            </p>
            <ul className="space-y-2.5">
              {p.signs.map((s, i) => (
                <li key={i} className="flex gap-3 text-lg text-inkSoft">
                  <span className="mt-1 text-clay" aria-hidden="true">
                    ✦
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How Steady helps YOUR pattern */}
      <section className="bg-paper px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <p data-reveal className="text-center font-hand text-3xl text-clayDeep">
            How Steady helps you
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
                  {(p.help as Record<string, string>)[item.key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="join" className="px-5 py-16">
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
              We&apos;ll only email you about the Steady beta. Unsubscribe
              anytime.
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
      <RevealScript />
    </div>
  );
}
