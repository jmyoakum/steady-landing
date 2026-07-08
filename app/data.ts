export type ProfileSlug = "decoder" | "chaser" | "waiter" | "self-abandoner";

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
    art: "/img/art-reach.svg",
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

export type QuizOption = { t: string; p: ProfileSlug };
export type QuizQuestion = { q: string; options: QuizOption[] };

export const quiz: QuizQuestion[] = [
  {
    q: "They were warm all week, then went cold out of nowhere. Your first instinct?",
    options: [
      { t: "Reread every recent text to find what changed.", p: "decoder" },
      { t: "Send something to reconnect and lighten it.", p: "chaser" },
      { t: "Say nothing and wait for them to reach out.", p: "waiter" },
      { t: "Assume it was you, and try to be easier to be around.", p: "self-abandoner" },
    ],
  },
  {
    q: "A text you sent has been on “read” for hours. You're…",
    options: [
      { t: "Analyzing the timestamp and when they were last online.", p: "decoder" },
      { t: "Tempted to send another so it's not weird.", p: "chaser" },
      { t: "Refreshing — but you won't text again.", p: "waiter" },
      { t: "Telling yourself you're being needy and should chill.", p: "self-abandoner" },
    ],
  },
  {
    q: "When plans get vague, you tend to…",
    options: [
      { t: "Look for the “real” reason in how they phrased it.", p: "decoder" },
      { t: "Offer three options to make it easy for them to say yes.", p: "chaser" },
      { t: "Wait to see if they actually lock it in.", p: "waiter" },
      { t: "Go along with whatever, even if it doesn't work for you.", p: "self-abandoner" },
    ],
  },
  {
    q: "Your friends hear about this person…",
    options: [
      { t: "In forensic detail — every message dissected.", p: "decoder" },
      { t: "Every time you reach out and what they said back.", p: "chaser" },
      { t: "Less than they should; you keep it in.", p: "waiter" },
      { t: "As “it's fine, I'm probably overthinking it.”", p: "self-abandoner" },
    ],
  },
  {
    q: "A really good night together — then silence. You feel…",
    options: [
      { t: "Confused; you need to figure out what it meant.", p: "decoder" },
      { t: "An urge to keep the momentum going.", p: "chaser" },
      { t: "Frozen, waiting to see what they do next.", p: "waiter" },
      { t: "Like you should pretend the silence doesn't sting.", p: "self-abandoner" },
    ],
  },
  {
    q: "Your phone habit with them is mostly…",
    options: [
      { t: "Re-reading and comparing their tone message to message.", p: "decoder" },
      { t: "Draft-and-send; you usually text first.", p: "chaser" },
      { t: "Watching for “typing…” and not much else.", p: "waiter" },
      { t: "Muting your own reactions so you don't seem like a lot.", p: "self-abandoner" },
    ],
  },
  {
    q: "When they pull away, your body…",
    options: [
      { t: "Spins into analysis mode.", p: "decoder" },
      { t: "Leans in — you close the gap.", p: "chaser" },
      { t: "Goes still; you hold your breath and wait.", p: "waiter" },
      { t: "Starts editing yourself to win them back.", p: "self-abandoner" },
    ],
  },
  {
    q: "Your biggest fear in this situation:",
    options: [
      { t: "That you're missing an obvious sign.", p: "decoder" },
      { t: "That if you stop trying, it just ends.", p: "chaser" },
      { t: "That reaching out will push them further away.", p: "waiter" },
      { t: "That the real you is “too much” for them.", p: "self-abandoner" },
    ],
  },
  {
    q: "They give you a vague answer about where things stand. You…",
    options: [
      { t: "Replay it later to decode what they meant.", p: "decoder" },
      { t: "Ask again, gently, to get some certainty.", p: "chaser" },
      { t: "Let it go and hope it gets clearer on its own.", p: "waiter" },
      { t: "Decide their comfort matters more than your clarity.", p: "self-abandoner" },
    ],
  },
  {
    q: "When it comes to your own needs here, you…",
    options: [
      { t: "Second-guess whether they're even reasonable.", p: "decoder" },
      { t: "Bring them up — then over-explain and soften them.", p: "chaser" },
      { t: "Wait for a “safe” moment that rarely comes.", p: "waiter" },
      { t: "Bury them so you don't rock the boat.", p: "self-abandoner" },
    ],
  },
  {
    q: "You finally get a warm text back. First reaction?",
    options: [
      { t: "Relief — then you re-read it for sincerity.", p: "decoder" },
      { t: "A rush — and you text back fast.", p: "chaser" },
      { t: "Calm for a second, already bracing for the next sign.", p: "waiter" },
      { t: "Grateful, like you earned it by being patient and easy.", p: "self-abandoner" },
    ],
  },
  {
    q: "The story you quietly tell yourself is usually…",
    options: [
      { t: "“If I can just understand it, I can fix it.”", p: "decoder" },
      { t: "“If I keep showing up, they'll come around.”", p: "chaser" },
      { t: "“If I don't push, they won't leave.”", p: "waiter" },
      { t: "“If I'm easier to love, they'll stay.”", p: "self-abandoner" },
    ],
  },
  {
    q: "What you want most right now:",
    options: [
      { t: "To finally make sense of the mixed signals.", p: "decoder" },
      { t: "To stop being the only one trying.", p: "chaser" },
      { t: "To stop feeling stuck, waiting.", p: "waiter" },
      { t: "To feel like yourself again.", p: "self-abandoner" },
    ],
  },
];

export const profileOrder: ProfileSlug[] = ["decoder", "chaser", "waiter", "self-abandoner"];

export function scoreQuiz(picks: ProfileSlug[]): ProfileSlug {
  const tally = { decoder: 0, chaser: 0, waiter: 0, "self-abandoner": 0 } as Record<ProfileSlug, number>;
  for (const p of picks) tally[p] = (tally[p] ?? 0) + 1;
  let best: ProfileSlug = profileOrder[0];
  for (const s of profileOrder) if (tally[s] > tally[best]) best = s;
  return best;
}

export type Profile = {
  slug: ProfileSlug;
  name: string;
  tagline: string;
  intro: string[];
  trap: string;
  signs: string[];
  help: { signal: string; reach: string; steady: string };
};

export const profiles: Record<ProfileSlug, Profile> = {
  decoder: {
    slug: "decoder",
    name: "The Decoder",
    tagline: "You read between every line.",
    intro: [
      "When someone runs hot and cold, your mind turns into a detective. You screenshot, re-read, compare timestamps, and hunt for the hidden meaning in a dry “ok.” You're not crazy — you're trying to make something inconsistent feel predictable.",
      "The catch: the more you analyze, the more the relationship lives in your head instead of in real life.",
    ],
    trap: "You mistake analysis for closeness. Understanding why they pulled away won't make them stay — but it can quietly cost you weeks of peace.",
    signs: [
      "You re-read old texts for tone.",
      "You narrate the whole timeline to friends in detail.",
      "A delayed reply can hijack your entire afternoon.",
    ],
    help: {
      signal: "Get the facts out of your head and onto the page, so the loop stops.",
      reach: "Say what you actually mean instead of decoding what they meant.",
      steady: "Watch your patterns over time so you stop re-solving the same puzzle.",
    },
  },
  chaser: {
    slug: "chaser",
    name: "The Chaser",
    tagline: "You close the gap the second they pull away.",
    intro: [
      "When distance shows up, you move toward it. You double-text, plan the dates, keep the spark alive, carry the whole thing. It comes from a good place — you're loyal and you show up.",
      "But you've become the only one reaching, and the effort has started to cost you.",
    ],
    trap: "The more you chase, the more room they have to pull back. You end up managing the connection alone.",
    signs: [
      "You almost always text first.",
      "You make it easy for them, even when it's hard for you.",
      "You feel responsible for keeping it going.",
    ],
    help: {
      signal: "Notice the push-pull before you sprint to fix it.",
      reach: "Figure out what to say without over-giving.",
      steady: "See how often you're the one reaching — and decide what you actually want.",
    },
  },
  waiter: {
    slug: "waiter",
    name: "The Waiter",
    tagline: "You freeze and wait for them to come back.",
    intro: [
      "When they go quiet, you go still. You won't text again, you won't push — you hold your breath and wait for a sign. It looks like patience, but underneath it's anxious stillness.",
      "You're scared any move will make it worse, so you make none — and end up living in the pause.",
    ],
    trap: "Waiting feels safer than reaching, but it leaves you stuck in someone else's timing.",
    signs: [
      "You watch for “typing…” more than you text.",
      "You keep how you feel to yourself.",
      "You tell yourself not to be “too much.”",
    ],
    help: {
      signal: "Name what you're actually feeling in the wait.",
      reach: "Get the words ready for when you're ready to use them.",
      steady: "See the pattern of waiting so you can choose a move instead of freezing.",
    },
  },
  "self-abandoner": {
    slug: "self-abandoner",
    name: "The Self-Abandoner",
    tagline: "You shrink yourself to keep them.",
    intro: [
      "To keep the peace, you make yourself smaller. You mute your reactions, drop your needs, and go along with whatever works for them — telling yourself you're just being easygoing.",
      "But somewhere in the “almosts,” you've started to lose track of what you want.",
    ],
    trap: "Being easier to love isn't the same as being loved. The more you abandon yourself, the less of you is actually in the relationship.",
    signs: [
      "You bury your needs to avoid rocking the boat.",
      "You assume the problem is that you're “too much.”",
      "You feel like you're auditioning to be kept.",
    ],
    help: {
      signal: "Get honest about what you actually felt, not what was convenient.",
      reach: "Say it raw, for you, before you edit it away.",
      steady: "Track how often you disappear, so you don't lose yourself in the process.",
    },
  },
};
