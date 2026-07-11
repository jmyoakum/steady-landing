"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader, Footer } from "../shared";
import { quiz, partMeta, computeResult } from "../data";

/** Fisher–Yates — used once per session, then frozen. */
function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);

  /* One shuffled option order per question, computed once and frozen for the
     whole session — so going Back shows the same order it did the first time. */
  const [orders] = useState<number[][]>(() => quiz.map((q) => shuffled(q.options.length)));

  function choose(v: string) {
    const next = [...picks, v];
    if (step + 1 >= quiz.length) {
      const r = computeResult(next);
      const p = new URLSearchParams({
        you: r.you,
        them: r.them,
        dyn: r.dyn,
        conf: String(r.conf),
      });
      if (r.you2) p.set("you2", r.you2);
      if (r.dyn2) p.set("dyn2", r.dyn2);
      router.push(`/result?${p.toString()}`);
      return;
    }
    setPicks(next);
    setStep(step + 1);
  }

  function back() {
    if (step === 0) {
      setStarted(false);
      return;
    }
    setPicks(picks.slice(0, -1));
    setStep(step - 1);
  }

  const q = quiz[step];
  const progress = Math.round((step / quiz.length) * 100);
  const meta = partMeta[q?.part ?? 1];
  const isPartStart = step === 0 || quiz[step - 1]?.part !== q?.part;
  const shown = orders[step].map((i) => q.options[i]);

  return (
    <div className="relative z-[2] min-h-screen">
      <SiteHeader joinHref="/#join" />

      <section className="px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-xl">
          {!started ? (
            <div className="text-center">
              <p className="mb-4 font-hand text-3xl text-clayDeep">
                A quick read on your dynamic
              </p>
              <h1 className="text-[2.2rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                What&apos;s the dynamic between you?
              </h1>
              <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-inkSoft">
                Two parts: how you tend to move, and what you notice in them. It only takes a few
                minutes. No sign-up to see your result.
              </p>
              <button
                onClick={() => setStarted(true)}
                className="mt-8 rounded-full bg-ink px-8 py-4 text-base font-bold text-cream shadow-sm transition-all hover:bg-clayDeep hover:shadow-md"
              >
                Start the quiz →
              </button>
              <p className="mt-4 text-sm text-inkFaint">
                Honest answers give you the truest read.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm text-inkFaint">
                  <button
                    onClick={back}
                    className="font-semibold text-clayDeep hover:underline"
                  >
                    ← Back
                  </button>
                  <span>
                    {step + 1} of {quiz.length}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-paperDeep">
                  <div
                    className="h-full rounded-full bg-clay transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-clay">
                {meta.label}
              </p>

              {isPartStart && (
                <div className="mb-5 rounded-2xl bg-paper px-5 py-4 text-inkSoft ring-1 ring-black/5">
                  <p className="font-semibold text-ink">{meta.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed">{meta.blurb}</p>
                </div>
              )}

              <h2 className="text-2xl font-extrabold leading-snug text-ink sm:text-[1.7rem]">
                {q.q}
              </h2>

              <div className="mt-6 flex flex-col gap-3">
                {shown.map((opt, idx) => (
                  <button
                    key={`${step}-${idx}`}
                    onClick={(e) => {
                      e.currentTarget.blur();
                      choose(opt.v);
                    }}
                    className="rounded-2xl border border-line bg-cream px-5 py-4 text-left text-lg text-ink shadow-sm outline-none transition-all hover:border-clay hover:bg-paper hover:shadow-md focus-visible:ring-2 focus-visible:ring-clay active:translate-y-px"
                  >
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
