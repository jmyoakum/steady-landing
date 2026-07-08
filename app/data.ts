// ─────────────────────────────────────────────────────────────
// Steady — Relationship Dynamic model
//
// The quiz answers three things, in three layers:
//   1. YOU      — how you tend to operate      → YouStyle
//   2. THEM     — what you consistently observe → PartnerStyle
//   3. PATTERN  — what happens between you      → DynamicSlug (the hero)
//
// Scoring is intentionally dimensional so future versions can compare
// two completed quizzes, personalize Signal/Reach/Steady, and track how
// a dynamic shifts over time. See computeResult() at the bottom.
// ─────────────────────────────────────────────────────────────

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

// ── Layer types ───────────────────────────────────────────────
export type YouStyle = "clarifier" | "connector" | "reflector" | "adapter";
export type PartnerStyle = "engager" | "processor" | "redirector" | "fluctuator";
export type DynamicSlug =
  | "pursue-pause"
  | "reassure-space"
  | "direct-process"
  | "clarify-flex"
  | "build-wander"
  | "quiet-drift";

export type QuizKind = "you" | "partner" | "pattern";

export type QuizOption = { t: string; v: string }; // v = a YouStyle | PartnerStyle | DynamicSlug
export type QuizQuestion = {
  section: 1 | 2 | 3;
  kind: QuizKind;
  q: string;
  options: QuizOption[];
};

export const sectionMeta: Record<
  1 | 2 | 3,
  { label: string; title: string; blurb: string }
> = {
  1: {
    label: "Part 1 · You",
    title: "How you tend to move",
    blurb: "A few questions about what you usually do when a relationship gets uncertain.",
  },
  2: {
    label: "Part 2 · What you notice",
    title: "What you observe in them",
    blurb:
      "Not a diagnosis — just what you consistently see the other person do. Go with your honest read.",
  },
  3: {
    label: "Part 3 · The pattern",
    title: "What happens between you",
    blurb: "The interaction itself — the thing that keeps repeating.",
  },
};

// ── The quiz (18 questions: 9 you · 5 partner · 4 pattern) ─────
export const quiz: QuizQuestion[] = [
  // ── Section 1 · YOU ──────────────────────────────────────────
  {
    section: 1,
    kind: "you",
    q: "When something between you feels off, your first instinct is to…",
    options: [
      { t: "Figure out what it means and where things stand.", v: "clarifier" },
      { t: "Reach out and try to reconnect.", v: "connector" },
      { t: "Sit with it a while before you say anything.", v: "reflector" },
      { t: "Adjust yourself so things feel smooth again.", v: "adapter" },
    ],
  },
  {
    section: 1,
    kind: "you",
    q: "In a hard conversation, you're most likely to…",
    options: [
      { t: "Want it named clearly so you both understand it.", v: "clarifier" },
      { t: "Keep engaging until you feel close again.", v: "connector" },
      { t: "Need a pause before you can respond well.", v: "reflector" },
      { t: "Soften your side to keep the peace.", v: "adapter" },
    ],
  },
  {
    section: 1,
    kind: "you",
    q: "When you need reassurance, you tend to…",
    options: [
      { t: "Ask a direct question to get clarity.", v: "clarifier" },
      { t: "Move closer and look for connection.", v: "connector" },
      { t: "Go quiet and wait to feel steady on your own.", v: "reflector" },
      { t: "Tell yourself not to make it a thing.", v: "adapter" },
    ],
  },
  {
    section: 1,
    kind: "you",
    q: "How you process emotions is mostly…",
    options: [
      { t: "Out loud — talking it through helps it make sense.", v: "clarifier" },
      { t: "Together — I feel better when we're connected.", v: "connector" },
      { t: "Internally — I need space before I know what I feel.", v: "reflector" },
      { t: "Quietly — I tend to set my own feelings aside.", v: "adapter" },
    ],
  },
  {
    section: 1,
    kind: "you",
    q: "When plans or expectations get vague, you…",
    options: [
      { t: "Want to define them so you both know the deal.", v: "clarifier" },
      { t: "Offer options to keep things moving.", v: "connector" },
      { t: "Hold back and see how it plays out.", v: "reflector" },
      { t: "Go along with whatever works for them.", v: "adapter" },
    ],
  },
  {
    section: 1,
    kind: "you",
    q: "A whole day passes with barely a word from them. You…",
    options: [
      { t: "Want to check in and clear the air.", v: "clarifier" },
      { t: "Feel the pull to reach out and reconnect.", v: "connector" },
      { t: "Give it space and wait for a natural moment.", v: "reflector" },
      { t: "Assume you did something and try to fix it.", v: "adapter" },
    ],
  },
  {
    section: 1,
    kind: "you",
    q: "The thing you most want from a relationship is…",
    options: [
      { t: "To know where you actually stand.", v: "clarifier" },
      { t: "To feel close and connected.", v: "connector" },
      { t: "To feel free to be yourself, at your own pace.", v: "reflector" },
      { t: "To feel like things are easy and harmonious.", v: "adapter" },
    ],
  },
  {
    section: 1,
    kind: "you",
    q: "When you're upset, the risk you fall into is…",
    options: [
      { t: "Over-analyzing until it lives in your head.", v: "clarifier" },
      { t: "Reaching so much it starts to feel one-sided.", v: "connector" },
      { t: "Withdrawing so far they can't reach you.", v: "reflector" },
      { t: "Disappearing your own needs entirely.", v: "adapter" },
    ],
  },
  {
    section: 1,
    kind: "you",
    q: "The quiet story you tell yourself is usually…",
    options: [
      { t: "“If I can understand it, I can handle it.”", v: "clarifier" },
      { t: "“If I keep showing up, we'll be okay.”", v: "connector" },
      { t: "“If I don't push, nothing will blow up.”", v: "reflector" },
      { t: "“If I'm easy to be with, they'll stay.”", v: "adapter" },
    ],
  },

  // ── Section 2 · WHAT YOU OBSERVE ─────────────────────────────
  {
    section: 2,
    kind: "partner",
    q: "When tension shows up, the other person usually…",
    options: [
      { t: "Leans into the conversation.", v: "engager" },
      { t: "Wants time before talking.", v: "processor" },
      { t: "Changes the subject.", v: "redirector" },
      { t: "Pulls away for a while.", v: "fluctuator" },
    ],
  },
  {
    section: 2,
    kind: "partner",
    q: "When you express a need, they usually…",
    options: [
      { t: "Engage with it and take it seriously.", v: "engager" },
      { t: "Need some space to think it over.", v: "processor" },
      { t: "Brush it off or make it light.", v: "redirector" },
      { t: "Respond differently each time.", v: "fluctuator" },
    ],
  },
  {
    section: 2,
    kind: "partner",
    q: "When conflict happens, they usually…",
    options: [
      { t: "Want to work it out right away.", v: "engager" },
      { t: "Revisit it once they've cooled off.", v: "processor" },
      { t: "Avoid it altogether.", v: "redirector" },
      { t: "Get defensive, then go distant.", v: "fluctuator" },
    ],
  },
  {
    section: 2,
    kind: "partner",
    q: "When things are going well, they usually…",
    options: [
      { t: "Stay consistent and present.", v: "engager" },
      { t: "Keep some of their independence.", v: "processor" },
      { t: "Keep it light and avoid going deep.", v: "redirector" },
      { t: "Become a little harder to read.", v: "fluctuator" },
    ],
  },
  {
    section: 2,
    kind: "partner",
    q: "After a disagreement, they usually…",
    options: [
      { t: "Reconnect and check that you're okay.", v: "engager" },
      { t: "Take time, then come back to it.", v: "processor" },
      { t: "Act like nothing happened.", v: "redirector" },
      { t: "Run warm, then cold.", v: "fluctuator" },
    ],
  },

  // ── Section 3 · THE PATTERN ──────────────────────────────────
  {
    section: 3,
    kind: "pattern",
    q: "Which feels most familiar between you two?",
    options: [
      { t: "One of us reaches while the other needs room.", v: "pursue-pause" },
      { t: "We both tend to avoid the hard conversations.", v: "quiet-drift" },
      { t: "One wants things defined; the other wants to keep it open.", v: "clarify-flex" },
      { t: "One wants to talk it out now; the other needs time.", v: "direct-process" },
    ],
  },
  {
    section: 3,
    kind: "pattern",
    q: "When the relationship feels uncertain, you two tend to…",
    options: [
      { t: "Move in opposite directions — one closer, one back.", v: "pursue-pause" },
      { t: "Both go quiet and let it sit.", v: "quiet-drift" },
      { t: "One pushes for reassurance, the other for space.", v: "reassure-space" },
      { t: "One keeps investing while the other keeps options open.", v: "build-wander" },
    ],
  },
  {
    section: 3,
    kind: "pattern",
    q: "When something good happens, the pattern is usually…",
    options: [
      { t: "One wants to define what it means; the other stays easy about it.", v: "clarify-flex" },
      { t: "One celebrates close; the other needs a beat to themselves.", v: "reassure-space" },
      { t: "We ride it together for a while, then one drifts.", v: "build-wander" },
      { t: "One talks it through; the other needs to sit with it.", v: "direct-process" },
    ],
  },
  {
    section: 3,
    kind: "pattern",
    q: "The thing that most often trips you up:",
    options: [
      { t: "Reaching gets read as pressure; space gets read as distance.", v: "pursue-pause" },
      { t: "Conversations tend to end unresolved.", v: "quiet-drift" },
      { t: "Reassurance runs out before it lands.", v: "reassure-space" },
      { t: "One wants a plan; the other wants to stay open.", v: "clarify-flex" },
    ],
  },
];

// ── Ordering (also used for deterministic tie-breaks) ─────────
export const youOrder: YouStyle[] = ["clarifier", "connector", "reflector", "adapter"];
export const partnerOrder: PartnerStyle[] = ["engager", "processor", "redirector", "fluctuator"];
export const dynamicOrder: DynamicSlug[] = [
  "pursue-pause",
  "reassure-space",
  "direct-process",
  "clarify-flex",
  "build-wander",
  "quiet-drift",
];

// ── you × partner → a base dynamic (a prior the pattern section refines) ──
export const dynamicMatrix: Record<YouStyle, Record<PartnerStyle, DynamicSlug>> = {
  clarifier: {
    engager: "direct-process",
    processor: "direct-process",
    redirector: "clarify-flex",
    fluctuator: "build-wander",
  },
  connector: {
    engager: "reassure-space",
    processor: "pursue-pause",
    redirector: "pursue-pause",
    fluctuator: "pursue-pause",
  },
  reflector: {
    engager: "direct-process",
    processor: "quiet-drift",
    redirector: "quiet-drift",
    fluctuator: "build-wander",
  },
  adapter: {
    engager: "clarify-flex",
    processor: "quiet-drift",
    redirector: "quiet-drift",
    fluctuator: "clarify-flex",
  },
};

// ── Result shape (dimensional — room for partner comparison later) ──
export type QuizResult = {
  you: YouStyle;
  them: PartnerStyle;
  dyn: DynamicSlug;
  // raw tallies kept for future personalization / two-quiz comparison
  scores: {
    you: Record<YouStyle, number>;
    them: Record<PartnerStyle, number>;
    dyn: Record<DynamicSlug, number>;
  };
};

function argmax<T extends string>(tally: Record<T, number>, order: T[]): T {
  let best = order[0];
  for (const k of order) if ((tally[k] ?? 0) > (tally[best] ?? 0)) best = k;
  return best;
}

/**
 * Turn the ordered picks (one string per question, in quiz order) into a result.
 * Kind is inferred from the quiz definition so the caller just passes values.
 */
export function computeResult(picks: string[]): QuizResult {
  const you = Object.fromEntries(youOrder.map((k) => [k, 0])) as Record<YouStyle, number>;
  const them = Object.fromEntries(partnerOrder.map((k) => [k, 0])) as Record<PartnerStyle, number>;
  const dyn = Object.fromEntries(dynamicOrder.map((k) => [k, 0])) as Record<DynamicSlug, number>;

  picks.forEach((v, i) => {
    const kind = quiz[i]?.kind;
    if (kind === "you") you[v as YouStyle] = (you[v as YouStyle] ?? 0) + 1;
    else if (kind === "partner") them[v as PartnerStyle] = (them[v as PartnerStyle] ?? 0) + 1;
    else if (kind === "pattern") dyn[v as DynamicSlug] = (dyn[v as DynamicSlug] ?? 0) + 1;
  });

  const youStyle = argmax(you, youOrder);
  const partnerStyle = argmax(them, partnerOrder);

  // Anchor with the observed you×them interaction (weight 2), let the
  // pattern section (up to 4 votes) confirm or override it.
  const base = dynamicMatrix[youStyle][partnerStyle];
  dyn[base] += 2;
  const dynamic = argmax(dyn, dynamicOrder);

  return {
    you: youStyle,
    them: partnerStyle,
    dyn: dynamic,
    scores: { you, them, dyn },
  };
}

// Convenience for building/validating result URLs
export function isYouStyle(x: string): x is YouStyle {
  return (youOrder as string[]).includes(x);
}
export function isPartnerStyle(x: string): x is PartnerStyle {
  return (partnerOrder as string[]).includes(x);
}
export function isDynamicSlug(x: string): x is DynamicSlug {
  return (dynamicOrder as string[]).includes(x);
}

// ── Content: YOU styles ───────────────────────────────────────
export type YouProfile = {
  slug: YouStyle;
  name: string;
  tagline: string;
  blurb: string;
  signs: string[];
};

export const youProfiles: Record<YouStyle, YouProfile> = {
  clarifier: {
    slug: "clarifier",
    name: "The Clarifier",
    tagline: "You feel steadier when things are clear.",
    blurb:
      "You like knowing where you stand. When something's ambiguous, you want to name it and talk it through — not to control it, but because clarity is how you feel safe and close.",
    signs: [
      "You'd rather name the awkward thing than let it linger.",
      "Unanswered questions sit heavy with you.",
      "You often think in terms of “where are we?”",
    ],
  },
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
  adapter: {
    slug: "adapter",
    name: "The Adapter",
    tagline: "You flex to keep things smooth.",
    blurb:
      "You're attuned to the other person and quick to adjust. You'd often rather bend a little than create friction — which keeps the peace, but can leave your own read of things unspoken.",
    signs: [
      "You adjust to what the moment seems to need.",
      "You downplay small wants to avoid friction.",
      "You track everyone's comfort before your own.",
    ],
  },
};

// ── Content: PARTNER styles (observational — never a diagnosis) ──
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

// ── Content: DYNAMICS (the hero of the result) ────────────────
export type Dynamic = {
  slug: DynamicSlug;
  name: string;
  poles: string;
  tagline: string;
  whatHappens: string;
  protect: { label: string; text: string }[];
  strengths: string;
  friction: string;
  watchFor: string;
  help: { signal: string; reach: string; steady: string };
};

export const dynamics: Record<DynamicSlug, Dynamic> = {
  "pursue-pause": {
    slug: "pursue-pause",
    name: "Pursue & Pause",
    poles: "One reaches ↔ One needs room",
    tagline: "When one moves closer, the other needs space — and both moves get misread.",
    whatHappens:
      "One of you tends to close the distance when things feel uncertain; the other tends to open it. The reach and the retreat feed each other — the more one pursues, the more the other steps back, and the more one steps back, the more the other reaches.",
    protect: [
      {
        label: "The one who reaches",
        text: "is usually protecting the connection — trying to keep it from quietly slipping away.",
      },
      {
        label: "The one who pauses",
        text: "is usually protecting their footing — trying not to react before they feel steady.",
      },
    ],
    strengths:
      "At its best, this pair balances each other: the reacher brings warmth and momentum, the pauser brings calm and perspective. You can be both close and grounded.",
    friction:
      "Under stress, the timing collides. Reaching lands as pressure; needing space lands as rejection. Neither is the intent — but that's how it gets felt.",
    watchFor:
      "Notice the exact moment the chase or the retreat kicks in. Naming it out loud — “I think I'm reaching and you're needing room” — usually defuses it faster than solving the surface issue.",
    help: {
      signal: "Catch the push-pull in the moment, before it spirals.",
      reach: "Put words to the reach or the retreat so it stops getting misread.",
      steady: "Watch how often the cycle repeats — and where it tends to start.",
    },
  },
  "reassure-space": {
    slug: "reassure-space",
    name: "Reassure & Reset",
    poles: "One seeks closeness ↔ One recharges alone",
    tagline: "Same care, opposite settings: one feels close through contact, the other through space.",
    whatHappens:
      "One of you feels secure through connection and reassurance; the other feels secure through independence and time alone. Both are ways of caring — they just pull in opposite directions when stress shows up.",
    protect: [
      {
        label: "The one seeking reassurance",
        text: "is protecting the bond — making sure you're still okay with each other.",
      },
      {
        label: "The one taking space",
        text: "is protecting their capacity — recharging so they can actually show up.",
      },
    ],
    strengths:
      "You can offer each other what neither does naturally — one models steady closeness, the other models self-sufficiency. In balance, you get intimacy without losing yourselves in it.",
    friction:
      "Reassurance can feel never-enough to one and demanding to the other. Space can feel restorative to one and abandoning to the other.",
    watchFor:
      "Reassurance lands better when it's specific and freely given, not pulled out under stress. Space lands better when it comes with a return time. Watch for one person always asking while the other always withdraws.",
    help: {
      signal: "Name what you actually need — contact or a breather — instead of guessing.",
      reach: "Ask for reassurance or space in a way the other can actually receive.",
      steady: "See whether the ask-and-withdraw loop is easing or tightening over time.",
    },
  },
  "direct-process": {
    slug: "direct-process",
    name: "Direct & Process",
    poles: "One talks it out now ↔ One needs time",
    tagline: "The gap isn't how much you care — it's timing.",
    whatHappens:
      "One of you wants to address things in the moment; the other needs time before they can engage well. When a hard topic lands, one leans in and the other needs to step back first.",
    protect: [
      {
        label: "The direct one",
        text: "is protecting against things festering — wanting to clear the air while it's fresh.",
      },
      {
        label: "The one who processes",
        text: "is protecting the quality of their response — not wanting to say something half-formed.",
      },
    ],
    strengths:
      "Direct energy keeps issues from being buried; processing keeps reactions from running the show. Together you can be both honest and considered.",
    friction:
      "Pressing for resolution now can overwhelm the processor. Needing time can feel like stonewalling to the direct one.",
    watchFor:
      "A simple agreement helps: name the issue now, set a time to finish it. Watch for the reach-during-a-pause moment — that's usually where it goes sideways.",
    help: {
      signal: "Get the issue out of your head so it can wait without festering.",
      reach: "Say the hard thing cleanly — and ask for the timing you each need.",
      steady: "Notice whether “later” actually comes, or quietly never does.",
    },
  },
  "clarify-flex": {
    slug: "clarify-flex",
    name: "Clarify & Flex",
    poles: "One wants it defined ↔ One wants it open",
    tagline: "One finds safety in a plan; the other finds safety in keeping options open.",
    whatHappens:
      "One of you wants things named, defined, and settled. The other prefers to keep things open and go with how it feels. Certainty versus flexibility becomes the quiet tug-of-war.",
    protect: [
      {
        label: "The one wanting clarity",
        text: "is protecting against uncertainty — needing to know it's real.",
      },
      {
        label: "The one wanting flexibility",
        text: "is protecting freedom — not wanting to be boxed in before they're ready.",
      },
    ],
    strengths:
      "The clarifier keeps things from drifting; the flexible one keeps things from going rigid. Together you can commit without over-controlling it.",
    friction:
      "Pushing for definition can feel like pressure; staying open can feel like avoidance. Each can read the other as “too much” or “not enough.”",
    watchFor:
      "Look for the topics where one always pushes to define and the other always keeps it loose. Naming what each of you needs certainty about — and where you can stay flexible — beats forcing one mode.",
    help: {
      signal: "Get clear on what you actually need defined versus what can stay open.",
      reach: "Ask for clarity — or for room — without it sounding like an ultimatum.",
      steady: "Track where the certainty-vs-open tension keeps showing up.",
    },
  },
  "build-wander": {
    slug: "build-wander",
    name: "Build & Wander",
    poles: "One builds ↔ One keeps options open",
    tagline: "One wants to build something steady; the other pulls toward open road.",
    whatHappens:
      "One of you is oriented toward building — consistency, plans, a shared direction. The other is oriented toward independence and keeping options open. You're often moving at different speeds toward different horizons.",
    protect: [
      {
        label: "The one building",
        text: "is protecting the future — investing in something meant to last.",
      },
      {
        label: "The one wandering",
        text: "is protecting autonomy — not wanting to lose themselves inside it.",
      },
    ],
    strengths:
      "The builder brings stability and follow-through; the wanderer brings freshness and keeps things from going stale. In balance, you grow without stagnating.",
    friction:
      "Investment can feel like a cage to one; independence can feel like one foot out the door to the other. It usually shows up around commitment and consistency.",
    watchFor:
      "Watch whether investment and independence are trending toward each other or away. The question worth sitting with: are you building the same thing, at a pace you can both live with?",
    help: {
      signal: "See what you're each actually reaching for — roots or room.",
      reach: "Say what you want out loud instead of hoping it becomes obvious.",
      steady: "Watch the gap between your pace and theirs over time.",
    },
  },
  "quiet-drift": {
    slug: "quiet-drift",
    name: "The Quiet Drift",
    poles: "Both tend to step back",
    tagline: "When neither of you steps toward the hard conversation, things go unspoken.",
    whatHappens:
      "Neither of you loves conflict, so hard topics get set aside “for later” — and later rarely comes. Things stay pleasant on the surface while small unspoken things quietly accumulate.",
    protect: [
      {
        label: "Both of you",
        text: "are protecting the peace — avoiding the friction a hard conversation might bring.",
      },
      {
        label: "Underneath",
        text: "the cost is distance: what goes unsaid slowly becomes what goes unfelt.",
      },
    ],
    strengths:
      "You're rarely explosive and you give each other a lot of room. Calm is a real gift — as long as it isn't quietly doing the job of avoidance.",
    friction:
      "Resentment builds in the gaps. Because nothing gets named, nothing gets resolved, and the connection can cool without a clear reason.",
    watchFor:
      "The pattern to watch is the conversation that keeps getting postponed. One low-stakes, on-purpose hard conversation can reverse a surprising amount of drift.",
    help: {
      signal: "Get the unspoken thing onto the page where you can actually see it.",
      reach: "Draft the conversation you keep putting off — for you, first.",
      steady: "Notice how much is going unsaid, before it becomes unfelt.",
    },
  },
};
