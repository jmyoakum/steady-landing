// ─────────────────────────────────────────────────────────────
// Steady — quiz + scoring engine (18 questions: 10 self · 8 partner)
//
// Self archetypes come from three dimensions, three questions each:
//   Engagement  E1–E3 → Connector ↔ Reflector
//   Certainty   C1–C3 → Decoder   ↔ Flow
//   Investment  I1–I3 → Builder   ↔ Wander
//   Recharge    R1    → contact / solitude   (domain signal, not an archetype)
//
// Partner: P1–P5 → observed archetype · P6/P7/P8 → partner domain poles.
//
// Preserved deliberately: dynamic slugs, partner slugs, `framework`,
// and the export names the /result page already depends on.
// ─────────────────────────────────────────────────────────────

export type YouStyle =
  | "decoder"
  | "builder"
  | "connector"
  | "reflector"
  | "flow"
  | "wander";

export type PartnerStyle = "engager" | "processor" | "redirector" | "fluctuator";

export type DynamicSlug =
  | "pursue-pause"
  | "quiet-drift"
  | "direct-process"
  | "clarify-flex"
  | "build-wander"
  | "reassure-space";

/* Tie-break order for dynamics: style engine (denser evidence) before domain. */
export const dynamicOrder: DynamicSlug[] = [
  "pursue-pause",
  "quiet-drift",
  "direct-process",
  "clarify-flex",
  "build-wander",
  "reassure-space",
];

export const youOrder: YouStyle[] = [
  "connector",
  "reflector",
  "decoder",
  "flow",
  "builder",
  "wander",
];

export const partnerOrder: PartnerStyle[] = [
  "engager",
  "processor",
  "redirector",
  "fluctuator",
];

export function isYouStyle(x: string): x is YouStyle {
  return (youOrder as string[]).includes(x);
}
export function isPartnerStyle(x: string): x is PartnerStyle {
  return (partnerOrder as string[]).includes(x);
}
export function isDynamicSlug(x: string): x is DynamicSlug {
  return (dynamicOrder as string[]).includes(x);
}

// ── Framework (unchanged — used by the homepage) ──────────────
export type FrameworkItem = {
  key: string;
  name: string;
  tagline: string;
  body: string;
  art: string;
  app: string;
  accentText: string;
  accentBg: string;
};

export const framework: FrameworkItem[] = [
  {
    key: "signal",
    name: "Signal",
    tagline: "Make sense of what happened.",
    body:
      "Get the moment out of your head and onto the page — the facts, the feeling, what you noticed — so you can actually see it.",
    art: "/img/fw-signal.jpg",
    app: "/img/app-signal.jpg",
    accentText: "text-clayDeep",
    accentBg: "bg-clay/15",
  },
  {
    key: "reach",
    name: "Reach",
    tagline: "Figure out what to say.",
    body:
      "Say it raw, just for you. No performance, no perfect wording — just what you mean, before you talk yourself out of it.",
    art: "/img/fw-reach.jpg",
    app: "/img/app-reach.jpg",
    accentText: "text-lavender",
    accentBg: "bg-lavender/15",
  },
  {
    key: "steady",
    name: "Steady",
    tagline: "See your patterns.",
    body:
      "Watch what keeps showing up over time — the distance, the push and pull — so you can choose your next move instead of repeating it.",
    art: "/img/fw-steady.jpg",
    app: "/img/app-steady.jpg",
    accentText: "text-sage",
    accentBg: "bg-sage/20",
  },
];

// ── Quiz ─────────────────────────────────────────────────────
export type QuizKind = "self" | "recharge" | "partner" | "pdomain";
export type QuizOption = { t: string; v: string };
export type QuizQuestion = {
  id: string;
  part: 1 | 2;
  kind: QuizKind;
  q: string;
  options: QuizOption[];
};

export const partMeta: Record<1 | 2, { label: string; title: string; blurb: string }> = {
  1: {
    label: "Part 1 · You",
    title: "How you tend to move",
    blurb: "A few questions about what you usually do in the relationships that matter.",
  },
  2: {
    label: "Part 2 · What you notice",
    title: "What you observe in them",
    blurb:
      "Not a diagnosis — just what you consistently see the other person do. Go with your honest read.",
  },
};

/* Display order: dimensions interleaved so it never feels repetitive. */
export const quiz: QuizQuestion[] = [
  {
    id: "E1",
    part: 1,
    kind: "self",
    q: "When something between you and someone you love feels off, your first move is usually to…",
    options: [
      { t: "Reach out and talk it through", v: "connector" },
      { t: "Bring it up, even if it's a little awkward", v: "connector" },
      { t: "Take some quiet time to sort out what you feel first", v: "reflector" },
      { t: "Sit with it a while before you say anything", v: "reflector" },
    ],
  },
  {
    id: "C1",
    part: 1,
    kind: "self",
    q: "When a relationship is still taking shape, you feel steadiest when…",
    options: [
      { t: "You've talked about where it's going and what it is", v: "decoder" },
      { t: "The important things have been named out loud", v: "decoder" },
      { t: "You can feel it's good, even if nothing's been defined yet", v: "flow" },
      { t: "You let it become what it is without rushing to label it", v: "flow" },
    ],
  },
  {
    id: "I1",
    part: 1,
    kind: "self",
    q: "You feel most connected in a relationship when…",
    options: [
      { t: "You're building toward something together", v: "builder" },
      { t: "You've got plans and things to look forward to", v: "builder" },
      { t: "You're fully present in what you already have", v: "wander" },
      { t: "You're just enjoying how things are right now", v: "wander" },
    ],
  },
  {
    id: "E2",
    part: 1,
    kind: "self",
    q: "When you're going through something stressful, you tend to feel better when…",
    options: [
      { t: "The people close to you are nearby", v: "connector" },
      { t: "You let someone in and talk about it", v: "connector" },
      { t: "You get some space to process it on your own", v: "reflector" },
      { t: "You work it out in your own head first", v: "reflector" },
    ],
  },
  {
    id: "C2",
    part: 1,
    kind: "self",
    q: "When something between you feels unclear, you'd rather…",
    options: [
      { t: "Have a conversation and get clear on it", v: "decoder" },
      { t: "Ask directly, so you know where you stand", v: "decoder" },
      { t: "Give it time and see how it actually plays out", v: "flow" },
      { t: "Trust what you're experiencing more than what's been said", v: "flow" },
    ],
  },
  {
    id: "I2",
    part: 1,
    kind: "self",
    q: "When you think about a relationship's future, you tend to…",
    options: [
      { t: "Like having a clear sense of where it's headed", v: "builder" },
      { t: "Feel closer when you're making plans together", v: "builder" },
      { t: "Prefer to let the future arrive on its own", v: "wander" },
      { t: "Focus more on the present than on what's next", v: "wander" },
    ],
  },
  {
    id: "E3",
    part: 1,
    kind: "self",
    q: "In your closest relationships, you feel most like yourself when…",
    options: [
      { t: "You're in regular contact and stay close", v: "connector" },
      { t: "You check in and reach out often", v: "connector" },
      { t: "You've got plenty of your own space", v: "reflector" },
      { t: "You can feel close without being in constant contact", v: "reflector" },
    ],
  },
  {
    id: "C3",
    part: 1,
    kind: "self",
    q: "Leaving something important unspoken feels…",
    options: [
      { t: "Uncomfortable — you'd rather name it", v: "decoder" },
      { t: "Like a loose end you want to tie up", v: "decoder" },
      { t: "Fine, as long as the thing itself feels solid", v: "flow" },
      { t: "Natural — not everything needs to be said to be real", v: "flow" },
    ],
  },
  {
    id: "I3",
    part: 1,
    kind: "self",
    q: "A really good stretch in a relationship, to you, looks like…",
    options: [
      { t: "Momentum — you're growing and moving forward together", v: "builder" },
      { t: "Making progress on things that matter to you both", v: "builder" },
      { t: "A run of really good, ordinary days together", v: "wander" },
      { t: "Being fully in the moment, not thinking about what's next", v: "wander" },
    ],
  },
  {
    id: "R1",
    part: 1,
    kind: "recharge",
    q: "After a long day — even a good one — you usually want to…",
    options: [
      { t: "Be close — talk it through and unwind together", v: "contact" },
      { t: "Spend it together, nothing heavy", v: "contact" },
      { t: "Have some quiet time to yourself first", v: "solitude" },
      { t: "Fully recharge on your own before reconnecting", v: "solitude" },
    ],
  },

  {
    id: "P1",
    part: 2,
    kind: "partner",
    q: "When tension shows up between you, they usually…",
    options: [
      { t: "Lean into the conversation", v: "engager" },
      { t: "Ask for a bit of time before talking", v: "processor" },
      { t: "Change the subject or keep it light", v: "redirector" },
      { t: "Go distant — and you're never sure for how long", v: "fluctuator" },
    ],
  },
  {
    id: "P2",
    part: 2,
    kind: "partner",
    q: "When you bring up something you need, they usually…",
    options: [
      { t: "Engage with it and take it seriously", v: "engager" },
      { t: "Need space to think it over, then come back", v: "processor" },
      { t: "Brush it off or make a joke of it", v: "redirector" },
      { t: "Respond differently every time", v: "fluctuator" },
    ],
  },
  {
    id: "P3",
    part: 2,
    kind: "partner",
    q: "When conflict happens, they usually…",
    options: [
      { t: "Want to work it out right away", v: "engager" },
      { t: "Cool off first, then come back to it", v: "processor" },
      { t: "Avoid it altogether", v: "redirector" },
      { t: "Get defensive, then go cold", v: "fluctuator" },
    ],
  },
  {
    id: "P4",
    part: 2,
    kind: "partner",
    q: "When things are going well, they usually…",
    options: [
      { t: "Stay consistent and present", v: "engager" },
      { t: "Stay connected while still keeping their own space", v: "processor" },
      { t: "Keep it light and avoid going deep", v: "redirector" },
      { t: "Become a little harder to read", v: "fluctuator" },
    ],
  },
  {
    id: "P5",
    part: 2,
    kind: "partner",
    q: "After a disagreement, they usually…",
    options: [
      { t: "Reconnect and check that you're okay", v: "engager" },
      { t: "Take time, then come back to it properly", v: "processor" },
      { t: "Act like nothing happened", v: "redirector" },
      { t: "Run warm, then cold", v: "fluctuator" },
    ],
  },
  {
    id: "P6",
    part: 2,
    kind: "pdomain",
    q: "When they're drained and nothing's wrong, they…",
    options: [
      { t: "Want to be close — unwind together", v: "p_contact" },
      { t: "Reach for company; they refill around people", v: "p_contact" },
      { t: "Want some quiet time to themselves", v: "p_solitude" },
      { t: "Disappear into their own space until they're topped up", v: "p_solitude" },
    ],
  },
  {
    id: "P7",
    part: 2,
    kind: "pdomain",
    q: "When the “what are we?” question comes up, they…",
    options: [
      { t: "Want it defined clearly", v: "p_define" },
      { t: "Are happy to name it out loud", v: "p_define" },
      { t: "Would rather leave it open for now", v: "p_open" },
      { t: "Prefer not to put a label on it at all", v: "p_open" },
    ],
  },
  {
    id: "P8",
    part: 2,
    kind: "pdomain",
    q: "When bigger plans come up — a trip, moving in, timelines — they…",
    options: [
      { t: "Are all in — they like building toward things", v: "p_build" },
      { t: "Get excited and start planning with you", v: "p_build" },
      { t: "Prefer to let bigger plans unfold gradually", v: "p_present" },
      { t: "Prefer to just enjoy what you have now", v: "p_present" },
    ],
  },
];

// ── Scoring ──────────────────────────────────────────────────
export type QuizResult = {
  you: YouStyle;
  you2?: YouStyle;
  them: PartnerStyle;
  dyn: DynamicSlug;
  dyn2?: DynamicSlug;
  conf: number;
};

type Dim = { pole: YouStyle; strength: number };

/** picks: one option value per question, in `quiz` order. */
export function computeResult(picks: string[]): QuizResult {
  const t: Record<string, number> = {
    connector: 0,
    reflector: 0,
    decoder: 0,
    flow: 0,
    builder: 0,
    wander: 0,
    contact: 0,
    solitude: 0,
    engager: 0,
    processor: 0,
    redirector: 0,
    fluctuator: 0,
    p_contact: 0,
    p_solitude: 0,
    p_define: 0,
    p_open: 0,
    p_build: 0,
    p_present: 0,
  };
  picks.forEach((v) => {
    if (v in t) t[v] += 1;
  });

  // per-dimension pole + strength (3 questions each → 3-0 or 2-1; never tied)
  const dim = (a: YouStyle, b: YouStyle): Dim => {
    const pole = t[a] >= t[b] ? a : b;
    const top = Math.max(t[a], t[b]);
    return { pole, strength: top >= 3 ? 1 : 0.33 };
  };
  const E = dim("connector", "reflector");
  const C = dim("decoder", "flow");
  const I = dim("builder", "wander");

  // primary + secondary self archetype (tie-break: Engagement → Certainty → Investment)
  const dims: Dim[] = [E, C, I];
  const strong = dims.filter((d) => d.strength === 1);
  const you: YouStyle = (strong[0] ?? E).pole;
  const you2: YouStyle | undefined = strong.length >= 2 ? strong[1].pole : undefined;
  const selfClarity = strong.length > 0 ? 1 : 0.33;

  const userRecharge = t.contact >= t.solitude ? "contact" : "solitude";

  // observed partner archetype
  const pCounts: Record<PartnerStyle, number> = {
    engager: t.engager,
    processor: t.processor,
    redirector: t.redirector,
    fluctuator: t.fluctuator,
  };
  const pMax = Math.max(...partnerOrder.map((k) => pCounts[k]));
  const distinct = partnerOrder.filter((k) => pCounts[k] > 0).length;
  let them: PartnerStyle;
  let partnerClarity: number;
  if (pMax <= 2 && distinct >= 3) {
    them = "fluctuator";
    partnerClarity = 0.5;
  } else {
    them = partnerOrder[0];
    for (const k of partnerOrder) if (pCounts[k] > pCounts[them]) them = k;
    partnerClarity = Math.min(1, pMax / 3);
  }

  // domain mismatches (binary)
  const partnerRecharge = t.p_contact >= t.p_solitude ? "contact" : "solitude";
  const mRecharge = userRecharge !== partnerRecharge ? 1 : 0;

  const partnerDefine = t.p_define >= t.p_open ? "define" : "open";
  const userDefine = C.pole === "decoder" ? "define" : "open";
  const mCertainty = userDefine !== partnerDefine ? 1 : 0;

  const partnerBuild = t.p_build >= t.p_present ? "build" : "present";
  const userBuild = I.pole === "builder" ? "build" : "present";
  const mInvestment = userBuild !== partnerBuild ? 1 : 0;

  // dynamic scores
  const s: Record<DynamicSlug, number> = {
    "pursue-pause": 0,
    "quiet-drift": 0,
    "direct-process": 0,
    "clarify-flex": 0,
    "build-wander": 0,
    "reassure-space": 0,
  };
  const withdraws = them === "processor" || them === "redirector" || them === "fluctuator";

  if (E.pole === "connector" && withdraws) s["pursue-pause"] += 2 * E.strength;
  if (C.pole === "decoder" && (them === "redirector" || them === "fluctuator"))
    s["pursue-pause"] += 2 * C.strength;

  if (E.pole === "reflector" && (them === "processor" || them === "redirector"))
    s["quiet-drift"] += 2 * E.strength;
  if (E.pole === "reflector" && them === "fluctuator") s["quiet-drift"] += 1 * E.strength;
  if (userRecharge === "solitude" && partnerRecharge === "solitude") s["quiet-drift"] += 0.5;

  if (C.pole === "decoder" && them === "processor") s["direct-process"] += 2 * C.strength;
  if (E.pole === "reflector" && them === "engager") s["direct-process"] += 2 * E.strength;
  if (C.pole === "decoder" && them === "engager") s["direct-process"] += 1 * C.strength;
  if (E.pole === "connector" && them === "engager") s["direct-process"] += 0.5;

  s["reassure-space"] += 2 * mRecharge;
  s["clarify-flex"] += 2 * mCertainty * C.strength;
  s["build-wander"] += 2 * mInvestment * I.strength;

  // rank (ties break by dynamicOrder: style before domain)
  const ranked = [...dynamicOrder].sort((a, b) => {
    if (s[b] !== s[a]) return s[b] - s[a];
    return dynamicOrder.indexOf(a) - dynamicOrder.indexOf(b);
  });
  const dyn = ranked[0];
  const runnerUp = ranked[1];
  const dyn2 = s[runnerUp] > 0 && s[runnerUp] >= 0.5 * s[dyn] ? runnerUp : undefined;

  // Confidence must fall when the primary barely beats the runner-up — otherwise a
  // 4-way tie broken by array order would still report "High".
  const s1 = s[dyn];
  const s2 = s[runnerUp];
  const gapRatio = s1 > 0 ? (s1 - s2) / s1 : 0; // 1 = clean win · 0 = dead tie
  const gapFactor = 0.55 + 0.45 * gapRatio;
  const globalClarity = (selfClarity + partnerClarity) / 2;
  const conf = Math.max(
    1,
    Math.min(99, Math.round(100 * (s1 / 2.5) * globalClarity * gapFactor))
  );

  return { you, you2, them, dyn, dyn2, conf };
}

// ── Profiles ─────────────────────────────────────────────────
export type YouProfile = {
  slug: YouStyle;
  name: string;
  tagline: string;
  blurb: string;
  signs: string[];
};

export const youProfiles: Record<YouStyle, YouProfile> = {
  connector: {
    slug: "connector",
    name: "The Connector",
    tagline: "You move toward the people you care about.",
    blurb:
      "Closeness is how you stay grounded. You reach out, you initiate, you keep things warm — and when distance shows up, your instinct is to close it.",
    signs: [
      "You usually reach out first.",
      "Distance makes you want to reconnect, not retreat.",
      "You put real energy into keeping things alive.",
    ],
  },
  reflector: {
    slug: "reflector",
    name: "The Reflector",
    tagline: "You need a little room to know what you feel.",
    blurb:
      "You process on the inside first. Before you can talk something through, you need space to sort out what's actually going on for you — and being rushed makes that harder.",
    signs: [
      "You go quiet while you work something out.",
      "You need time before you can respond well.",
      "Space helps you come back clearer, not colder.",
    ],
  },
  decoder: {
    slug: "decoder",
    name: "The Decoder",
    tagline: "Understanding is how you relax.",
    blurb:
      "You like knowing where you stand. When something's unclear, you move toward it — you'd rather name the thing than let it hang in the air. Clarity is how the ground goes solid.",
    signs: [
      "You'd rather ask than assume.",
      "Unanswered questions sit heavy with you.",
      "Once it's named, you can stop wondering and enjoy it.",
    ],
  },
  flow: {
    slug: "flow",
    name: "The Flow",
    tagline: "You trust what you're living more than the label on it.",
    blurb:
      "You find your certainty by living something, not by naming it. It isn't indecision — you often know exactly how you feel. You'd just rather let it become what it is.",
    signs: [
      "You don't need a label to know something's real.",
      "Naming things too early can feel like freezing them.",
      "You trust what's actually happening between you.",
    ],
  },
  builder: {
    slug: "builder",
    name: "The Builder",
    tagline: "Building toward something is how you feel close.",
    blurb:
      "You feel a relationship most when it's going somewhere. Plans aren't logistics to you — they're a kind of intimacy, proof you're pointed the same way.",
    signs: [
      "You turn “someday” into a date on the calendar.",
      "A future you can picture makes the present feel solid.",
      "Momentum is how you love.",
    ],
  },
  wander: {
    slug: "wander",
    name: "The Wander",
    tagline: "You don't want to miss the life that's already happening.",
    blurb:
      "You feel the relationship most in the living of it. It's not that you don't care about the future — your attention just settles into the now, where it's actually happening.",
    signs: [
      "You notice the good thing while it's happening.",
      "A good today is the strongest promise there is.",
      "You'd rather be in the moment than looking past it.",
    ],
  },
};

export type PartnerProfile = {
  slug: PartnerStyle;
  name: string;
  tagline: string;
  blurb: string;
  notice: string[];
};

export const partnerProfiles: Record<PartnerStyle, PartnerProfile> = {
  engager: {
    slug: "engager",
    name: "Leans In",
    tagline: "They move toward the conversation.",
    blurb:
      "From what you've described, when something comes up they tend to stay present and engage. They'd rather work it out than let it sit.",
    notice: [
      "They stay in the room when it's hard.",
      "They respond to needs fairly directly.",
      "They want to resolve things sooner than later.",
    ],
  },
  processor: {
    slug: "processor",
    name: "Needs Space First",
    tagline: "They go inward before they come back.",
    blurb:
      "What you're noticing is someone who needs time before they can talk — not absence, but a slower internal clock. They tend to return once they've processed.",
    notice: [
      "They ask for time before the big talks.",
      "They get quiet, then re-engage later.",
      "Space seems to steady them, not signal the end.",
    ],
  },
  redirector: {
    slug: "redirector",
    name: "Steers Around It",
    tagline: "They keep things light when it gets heavy.",
    blurb:
      "From your observations, they tend to change the subject, keep it easy, or let hard conversations quietly drop rather than stepping into them.",
    notice: [
      "They redirect when a topic gets heavy.",
      "Hard subjects tend to evaporate.",
      "They keep things pleasant on the surface.",
    ],
  },
  fluctuator: {
    slug: "fluctuator",
    name: "Runs Hot & Cold",
    tagline: "Warm one stretch, hard to read the next.",
    blurb:
      "What you're describing is inconsistency — close and engaged one week, distant or unreadable the next. The mixed signal is the thing you keep noticing.",
    notice: [
      "Warmth comes and goes without a clear reason.",
      "You often feel unsure where you stand.",
      "Closeness is frequently followed by a pull-back.",
    ],
  },
};
