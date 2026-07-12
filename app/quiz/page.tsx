"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader, Footer } from "../shared";
import { quiz, partMeta, computeResult } from "../data";
import { track, trackBeacon } from "../analytics";

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
  const [orders] = useState<number[][]>(() => {
    // ?fixed=1 disables the shuffle so answers can be tested by position (QA only).
    const fixed =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("fixed") === "1";
    return quiz.map((q) =>
      fixed ? q.options.map((_, i) => i) : shuffled(q.options.length)
    );
  });

  /* HOVER ARMING.
     The quiz has no "selected" state — answering advances immediately. But the
     physical cursor stays where it was, so on the next question the button that
     happens to sit under it picks up :hover styling and *looks* pre-selected.
     Fix: hover styles are suppressed until the pointer actually moves again. */
  const [armed, setArmed] = useState(true);

  useEffect(() => {
    if (armed) return;
    const arm = () => setArmed(true);
    window.addEventListener("pointermove", arm, { once: true, passive: true });
    window.addEventListener("keydown", arm, { once: true });
    // touch/pen have no hover at all — re-arm quickly so nothing feels dead
    const t = window.setTimeout(arm, 350);
    return () => {
      window.removeEventListener("pointermove", arm);
      window.removeEventListener("keydown", arm);
      window.clearTimeout(t);
    };
  }, [armed]);

  /* ── Analytics state ──────────────────────────────────────────
     Refs, not state: these are read inside event handlers and inside the
     pagehide listener, and must never trigger a re-render. */
  const startedAt = useRef(0); // ms at quiz_started
  const questionAt = useRef(0); // ms the current question rendered
  const completed = useRef(false); // suppresses quiz_abandoned on the way out
  const part2Fired = useRef(false);
  const stepRef = useRef(0); // pagehide handler needs the *current* step
  stepRef.current = step;

  /* quiz_abandoned — the single most valuable event here. It's what tells us
     WHERE the quiz dies. Fires on pagehide, which (unlike beforeunload) is
     reliable on mobile Safari. sendBeacon or the request is killed with the page. */
  useEffect(() => {
    if (!started) return;
    function bail() {
      if (completed.current || document.visibilityState !== "hidden") return;
      completed.current = true; // once only
      trackBeacon("quiz_abandoned", {
        last_step: stepRef.current + 1,
        last_question_id: quiz[stepRef.current]?.id ?? null,
        part: quiz[stepRef.current]?.part ?? null,
        answered: stepRef.current,
        total_questions: quiz.length,
        ms_elapsed: Date.now() - startedAt.current,
      });
    }
    window.addEventListener("pagehide", bail);
    document.addEventListener("visibilitychange", bail);
    return () => {
      window.removeEventListener("pagehide", bail);
      document.removeEventListener("visibilitychange", bail);
    };
  }, [started]);

  /* quiz_part2_reached — Part 2 is where the quiz stops asking about YOU and
     starts asking you to characterise your PARTNER. That's the hardest ask in
     the funnel and my prime suspect for the drop-off cliff. Measure it directly. */
  useEffect(() => {
    if (!started || part2Fired.current) return;
    if (quiz[step]?.part !== 2) return;
    part2Fired.current = true;
    track("quiz_part2_reached", {
      step: step + 1,
      question_id: quiz[step].id,
      ms_elapsed: Date.now() - startedAt.current,
    });
  }, [started, step]);

  /* Reset the per-question timer whenever the question changes. */
  useEffect(() => {
    questionAt.current = Date.now();
  }, [step, started]);

  function begin() {
    startedAt.current = Date.now();
    questionAt.current = Date.now();
    track("quiz_started", {
      referrer: document.referrer || "direct",
      total_questions: quiz.length,
    });
    setStarted(true);
  }

  /* Same stationary-cursor geometry means a fast double-click could land on the
     NEXT question's button and answer it unseen. Ignore a second fire <250ms. */
  const lastChoiceAt = useRef(0);

  function choose(v: string) {
    const now = Date.now();
    if (now - lastChoiceAt.current < 250) return;
    lastChoiceAt.current = now;

    const q = quiz[step];
    track("quiz_question_answered", {
      question_id: q.id,
      step: step + 1,
      part: q.part,
      kind: q.kind,
      value: v,
      ms_on_question: now - questionAt.current,
    });

    const next = [...picks, v];
    if (step + 1 >= quiz.length) {
      const r = computeResult(next);
      completed.current = true; // don't also fire quiz_abandoned on navigation

      track("quiz_completed", {
        total_ms: now - startedAt.current,
        you: r.you,
        you2: r.you2 ?? null,
        them: r.them,
        dyn: r.dyn,
        dyn2: r.dyn2 ?? null,
        conf: r.conf,
      });

      /* Lets /result tell a real quiz-taker apart from someone opening a shared
         link. Averaging those two together would make every result-page metric
         meaningless. */
      try {
        sessionStorage.setItem("steady_quiz_done", "1");
      } catch {
        /* private mode — entry just reads as shared_link, which is acceptable */
      }

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
    setArmed(false);
  }

  function back() {
    if (step === 0) {
      setStarted(false);
      return;
    }
    track("quiz_back_pressed", { step: step + 1, question_id: quiz[step]?.id });
    setPicks(picks.slice(0, -1));
    setStep(step - 1);
    setArmed(false);
  }

  const q = quiz[step];
  const progress = Math.round((step / quiz.length) * 100);
  const meta = partMeta[q?.part ?? 1];
  const isPartStart = step === 0 || quiz[step - 1]?.part !== q?.part;
  const shown = orders[step].map((i) => q.options[i]);

  const optionBase =
    "rounded-2xl border border-line bg-cream px-5 py-4 text-left text-lg text-ink shadow-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-clay active:translate-y-px";
  const optionHover = armed ? " hover:border-clay hover:bg-paper hover:shadow-md" : "";

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
                Two parts: how you tend to move, and what you notice in them.{" "}
                {/* Say the real number. "A few minutes" primes people for 6–8
                    questions; being shown "1 of 18" straight after the click is
                    an expectation break at the worst possible moment. */}
                <strong className="font-semibold text-ink">
                  {quiz.length} quick questions, about two minutes.
                </strong>{" "}
                Free, and no sign-up to see your result.
              </p>
              <button
                onClick={begin}
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
                    className={optionBase + optionHover}
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
