import type { DynamicSlug } from "../data";

/**
 * Rich result content for the /result page — the approved final copy.
 * Keyed by the dynamic slugs the quiz already produces.
 */
export type ResultContent = {
  name: string;
  poles: string;
  snapshot: string;
  whatsHappening: string[];
  yourSide: string;
  theirSide: string;
  shines: string;
  stuck: string[];
  helps: string[];
  question: string;
  questionNote: string;
};

export const resultContent: Record<DynamicSlug, ResultContent> = {
  "pursue-pause": {
    name: "Pursue & Pause",
    poles: "one reaches ↔ one needs room",
    snapshot:
      "The more you reach for them, the more they seem to pull back — so you reach harder, and they pull back further. You know this loop by heart.",
    whatsHappening: [
      "It usually starts with something small — a shift in their tone, a slower reply, a night that felt a little off. You feel the distance before anything's even been said, and your instinct is to close it: reach out, check in, name what feels wrong.",
      "But the reaching tends to be the exact moment they start to need room. So they pull back a little. Which makes the distance you sensed feel real — so you reach a little harder. Which gives them a little more to step back from.",
      "Neither move is wrong on its own. Together, they form a loop that feeds itself: every reach invites a retreat, and every retreat invites a bigger reach. The closer you try to get, the further away they end up — not because either of you wants that, but because the pattern has started running the conversation for you.",
    ],
    yourSide:
      "When you sense distance, you move toward it. You send the follow-up text, suggest the talk, try to name what feels off. Sitting in the not-knowing is the hard part, so you close the gap the fastest way you know — by reaching. You're often the one keeping the thread alive: initiating, checking in, carrying the connection when it goes quiet.",
    theirSide:
      "From what you've noticed, when things feel tense they go the other way — they get quiet, take space, need time before they can talk. It can look like pulling away, but what you're seeing is someone who slows down at the exact moment you speed up. From the outside, space seems to be how they find their footing — and in this loop, it tends to arrive right when you're reaching for the opposite.",
    shines:
      "This pairing has something a lot of couples quietly envy: it never goes cold from neglect. Someone here always cares enough to reach, to tend it, to refuse to let it drift — and someone here brings a steadiness that keeps things from boiling over. One of you carries the warmth and the momentum; the other carries the calm and the perspective. When the loop isn't running, you get closeness and groundedness in the same relationship.",
    stuck: [
      "Here's the quiet cruelty of it: the two moves that come most naturally to each of you are the two moves most likely to set off the other.",
      "Your reaching — which is really about closing the distance — lands on them as pressure. Their space — which tends to be about finding their own footing, not about shutting you out — lands on you as rejection. So you reach again to undo the rejection, and they step back again to escape the pressure. Each of you is trying to make it better, and each attempt makes the other person's instinct stronger.",
      "That's why you can't argue your way out of it. The problem was never the topic you got stuck on. It's that reaching and retreating have quietly become each other's triggers — and the harder you both try, the tighter the loop pulls.",
    ],
    helps: [
      "The loop runs on speed and silence, so the thing that helps most is to slow it down and name it — out loud, while it's happening. Not to solve whatever's underneath, but just to point at the pattern itself: “I think I'm reaching and you're needing room right now.” The moment you can both see the loop, it stops being invisible, and it loses most of its grip.",
      "The other thing that quietly changes everything is a return time. When space comes with a “give me an hour and I'll come find you,” it stops reading as disappearance — which means the reaching side doesn't have to chase it. Space with an endpoint isn't distance. It's a pause you both agreed to.",
    ],
    question:
      "When the distance shows up, what does each of us actually need in that moment — closeness, or a little room — and how could we let the other know?",
    questionNote:
      "Ask it when things are calm, not mid-loop. And answer it for yourself, too — half of this pattern is never quite saying what you need before the reaching or the retreating says it for you.",
  },

  "quiet-drift": {
    name: "The Quiet Drift",
    poles: "both of you step back",
    snapshot:
      "You don't fight. You've just slowly stopped saying the real things — and neither of you could say exactly when it started.",
    whatsHappening: [
      "There's no blowup here, no villain, no big unresolved fight. What's happening is quieter than that.",
      "Something small comes up — a feeling, a frustration, a “we should talk about that.” One of you decides it isn't worth it right now. The moment passes. It happens again the next week, and passes again. None of it is dramatic. But the unsaid things don't disappear; they settle underneath, and the longer they sit, the heavier it feels to bring any of them up. So you bring up less. And the pattern quietly keeps itself going.",
      "On the surface, everything looks fine. Underneath, it's getting thinner.",
    ],
    yourSide:
      "You tend to let things go to keep things easy. In the moment it rarely feels worth a whole conversation — the timing's off, it's minor, you don't want to make it a thing. So you file it away and move on.",
    theirSide:
      "From what you've noticed, they tend to keep things light too — steering around the heavier stuff, letting the harder topics fade rather than pick them up. Neither of you is doing this on purpose. You're both just… not the one to step in. And because neither steps in, no one does.",
    shines:
      "This pattern gets a bad reputation, and it shouldn't — not entirely. You give each other real room. There's no hovering, no scorekeeping, no walking on eggshells. You're steady in a way a lot of couples aren't; the small storms that rattle other people don't rattle you. And underneath the quiet, there's usually genuine ease — you actually like being around each other. That calm is real, and it's worth keeping.",
    stuck: [
      "The trouble isn't conflict. It's that nothing gets finished, because nothing gets started.",
      "Because the small things never get said, they never get settled — they accumulate. And the pattern protects itself: the longer something goes unspoken, the bigger it feels to finally say, so it stays unspoken. One quiet week at a time, “we're fine” starts to mean “we're not really talking,” and the closeness cools by a degree that no one chose and no one noticed.",
      "The risk in this pattern was never a fight. It's the slow, comfortable distance.",
    ],
    helps: [
      "The drift doesn't turn around with one big, clear-the-air conversation. It turns around with one small, on-purpose one.",
      "Pick something low-stakes you've been letting slide — genuinely minor — and say it out loud this week. Not to solve anything. Just to break the surface and prove the surface is breakable. In this pattern the danger was never the one huge unsaid thing; it's the hundred small ones. Lower the bar for what counts as worth mentioning. That's the whole move.",
    ],
    question:
      "What's one small thing you've let slide lately because it didn't feel worth a whole conversation?",
    questionNote:
      "Ask it with real curiosity — and answer it yourself, too. It's a small door. But in this pattern, small doors are the ones that open.",
  },

  "direct-process": {
    name: "Direct & Process",
    poles: "one talks it out now ↔ one needs time",
    snapshot:
      "One of you wants to work it out right now. The other needs time before they can even start. You're not on different pages — you're on different clocks.",
    whatsHappening: [
      "Something comes up — a disagreement, a worry, a conversation that needs having. And in that moment, the two of you need opposite things.",
      "One of you wants to turn toward it right away. Talking it through is how you find your footing; leaving it open feels like leaving a door banging in the wind. The other needs to step back first — not to avoid it, but because they can't say anything real until they've had time to sort out what they actually think.",
      "So one of you leans in while the other goes quiet, and each of you starts to read the other's move as the problem. But nothing's actually broken here. You're two people who process at different speeds — and once the slower clock catches up, you usually do find your way through it. The gap was never about how much you care. It's about when each of you is ready.",
    ],
    yourSide:
      "When something's unresolved, you feel it everywhere until it's talked through. So you want to go straight at it — name it, understand it, get to the other side of it. Sitting with it open is the uncomfortable part; you'd rather have the hard conversation tonight than carry the tension into tomorrow.",
    theirSide:
      "From what you've noticed, they can't do their best thinking on the spot. When a hard topic lands, they go quiet — and that quiet isn't the door closing, it's them working. They tend to come back later, sometimes a day later, with something clearer and more considered than anything they could have said in the heat of it.",
    shines:
      "On paper, two different speeds look like a mismatch. In practice this is a genuinely strong pairing, because you cover each other's blind spots. Your directness means things don't get buried — hard stuff actually gets raised instead of quietly rotting. Their processing means the conversation doesn't get run by whatever you were both feeling in the first hot ten minutes. When it's working, you get the rare combination of honest and considered.",
    stuck: [
      "The trouble is that each of your instincts reads, to the other, like the exact wrong thing.",
      "When you press to resolve it now, they experience being asked to perform a conversation they're not ready for, which makes them go quieter. And when they go quiet, you don't experience someone thinking — you experience a door shut in your face, which makes you push harder to pry it open. The more you push for now, the more they need later.",
      "Neither of you is stonewalling, and neither of you is attacking. But in the gap between your two clocks, that's exactly what it starts to feel like — and the argument quietly stops being about the actual thing and starts being about the timing.",
    ],
    helps: [
      "The fix isn't for one of you to convert to the other's speed. It's to stop making the raising and the resolving happen in the same moment.",
      "Split them in two. Name it right away — “hey, this is bothering me and I want to talk about it” — so the direct one knows it isn't being buried. Then set a real time to finish it — “can we get into it after dinner?” — so the one who processes gets the runway to show up with something true. The one rule that makes it work: later has to actually come.",
    ],
    question:
      "When something hard comes up, how much time does each of us really need before we can talk about it well — and how do we make sure “later” actually comes?",
    questionNote:
      "Ask it on a calm day, not in the middle of one of these. The goal isn't to agree on a single speed — it's to build a version of “we'll finish this later” that both of you can actually relax into.",
  },

  "reassure-space": {
    name: "Reassure & Reset",
    poles: "one seeks closeness ↔ one recharges alone",
    snapshot:
      "Nothing's wrong. It's been a perfectly good day. And still — one of you wants to come close, and the other wants to be left alone for a while.",
    whatsHappening: [
      "This one doesn't show up in the middle of a fight. It shows up on an ordinary evening, when everything is actually fine.",
      "You feel closest and steadiest through contact — a proper catch-up, a bit of reassurance that you're good. They feel steadiest through space — a quiet hour, some time in their own head. Neither of those is a reaction to a problem. They're simply how each of you refills the tank.",
      "The catch is that your two ways of feeling okay ask for opposite things at the same moment. This isn't one person chasing while the other flees — it isn't that they're pulling away from you. They'd need that same quiet hour if they were completely happy. You're just two people who recharge on opposite settings, trying to share the same evening.",
    ],
    yourSide:
      "You feel connection by staying in contact with it. A real check-in, a catch-up at the end of the day, the small confirmations that you're on solid ground — these aren't neediness, they're how you top up your sense of we're good. Closeness is the thing that settles you.",
    theirSide:
      "From what you've noticed, they refill by being alone for a bit. After a long day — even a genuinely good one — they need a stretch of quiet before they've got much to give. And when they take it, they usually come back more present, not less interested — the space seems to be what makes the closeness possible for them.",
    shines:
      "There's a real gift buried in this difference: you each carry something the other doesn't come by naturally. You bring the warmth that keeps a relationship from quietly going cold. They bring a self-sufficiency that keeps it from becoming airless. When it's balanced, you get the rare thing a lot of couples miss: real closeness and two people who are still whole on their own.",
    stuck: [
      "The friction here is quiet, and it usually runs like this.",
      "You reach for a little reassurance, and to them it can land as a demand — one more thing to give when their tank is already low — so they lean toward their quiet. Their leaning toward quiet lands on you as distance, which makes you want a little more reassurance to feel steady again. What started as two ordinary needs slowly becomes a tug: you feeling like the reassurance never quite lands and stays, them feeling like the space never quite comes without a side of guilt.",
      "The trap is that you can both be entirely well-meaning and still walk away from an easy evening feeling unmet — one of you a little too reached-for, the other a little too alone.",
    ],
    helps: [
      "Reassurance lands best when it's given freely, before it's asked for. A quick “we're good — I just need to zone out for a bit” offered up front does more than an hour of reassurance pulled out under strain. Given on its own, it sticks. Extracted, it never quite counts.",
      "And space works far better with an edge on it. “I need about an hour, then I'm all yours” turns solitude from something that reads like a door closing into something with a clear other side. You're not asking either person to want something different — just to hand the other a small map of what's happening.",
    ],
    question:
      "On an ordinary, nothing's-wrong evening — what helps each of us feel close, and what helps each of us feel like ourselves again?",
    questionNote:
      "Ask it as a genuine question, not a negotiation. You're trying to learn the two different things that make each of you feel okay, so you can stop accidentally offering the other person the opposite.",
  },

  "clarify-flex": {
    name: "Decoder & Flow",
    poles: "one wants it defined ↔ one wants it open",
    snapshot:
      "One of you feels steadier once you can name what this is. The other feels steadier letting it become what it is. You're both after the same certainty — you just build it in opposite directions.",
    whatsHappening: [
      "On the surface it can look like you want different things from the relationship. You almost never do. You want the same thing — to feel sure of it — you just arrive at sure from opposite directions.",
      "You get there through definition. When something is named and understood between you, the ground goes solid. They get there through experience. They trust what they can feel happening, and a name placed on it too early can feel like a box drawn around something that's still taking shape.",
      "This has nothing to do with how much either of you wants it; two people fully in it can still stand on opposite sides of this. You're not arguing about what you are. You're arguing about when and how each of you gets to feel certain of it.",
    ],
    yourSide:
      "You feel most settled when things are named. Knowing where you stand, having the words for what this is, hearing it said out loud — these aren't about control, they're how the ground becomes solid under you. Once it's named, you can stop wondering and actually enjoy it.",
    theirSide:
      "From what you've noticed, they get their certainty from living it rather than labeling it. It's not that they're dodging the definition — it's that the definition isn't the thing that makes them feel secure. Given room, they usually arrive at the very same clarity you're after; they just get there by watching it unfold.",
    shines:
      "These two instincts need each other more than they look like they do. Left to only your way, a relationship can get over-defined — named and pinned before it's had the chance to surprise you. Left to only theirs, it can stay pleasantly vague long past the point where a little clarity would help. You bring definition; they bring patience. Together you get a relationship that's both clear and unhurried.",
    stuck: [
      "The friction is almost always about timing, and it runs in a loop.",
      "You reach for a definition to feel steady — and being asked to name something before it feels ready can land on them as pressure, so they ease off and ask for a little more time. Their easing off reads to you as vagueness, which makes the open question louder — so you reach for the definition again, a bit more firmly.",
      "And here's the part that stings: you can both be completely certain of the relationship and still get caught in exactly this. It was never a fight about whether you're in it. It's a quiet standoff over whether it has to be said to be real.",
    ],
    helps: [
      "The move that helps most isn't for one of you to win the timing. It's to stop treating “define it” and “let it breathe” as an all-or-nothing choice — because they almost never actually are.",
      "Try separating the few things that genuinely need to be named from the many that can keep unfolding. Usually only a small handful of things actually call for a shared answer right now — and naming those out loud gives the one who needs definition real ground to stand on. Everything else can be left to develop.",
    ],
    question:
      "What's one thing about us you'd feel steadier if we just said out loud — and one thing you'd rather we let keep taking shape?",
    questionNote:
      "Ask it with real curiosity, and answer both halves yourself too. The point isn't to prove that naming things is better, or that letting them breathe is — it's to find the line, together.",
  },

  "build-wander": {
    name: "Build & Wander",
    poles: "one builds ↔ one stays present",
    snapshot:
      "One of you feels closest when you're building toward what's next. The other feels closest when you're fully in what's already here. You both love this — you just live in different time zones of it.",
    whatsHappening: [
      "You're not standing on opposite sides of whether you want this. You're standing on opposite sides of where your attention naturally goes.",
      "You feel most connected when the relationship is moving toward something — a next step, a plan, a shared thing on the horizon. They feel most connected when you're fully here in what already exists — this evening, this version of things, no eye on what's next.",
      "So one of you keeps glancing forward and the other keeps settling in, and it can start to feel like a mismatch in how much you each want the relationship. It almost never is. You both want it just as much. You're only disagreeing about how much of your attention belongs on what's coming versus what's already good.",
    ],
    yourSide:
      "You feel the relationship most when it's going somewhere. Talking about the next trip, the next step, the life you might build — that's not you being restless; it's how you love. Plans, to you, aren't logistics; they're a kind of intimacy. A future you can picture together makes the present feel more solid, not less.",
    theirSide:
      "From what you've noticed, they feel the relationship most right where it is. It's not that they don't care about the future — it's that they don't need to be moving toward it to feel sure of you. Given the choice, they'd rather deepen the present than map the future. For them, a good today is the strongest promise there is.",
    shines:
      "Each of you protects something the other could lose sight of. You keep the relationship from stalling — you make sure it grows, that “someday” doesn't quietly turn into “never.” They keep it from becoming all runway and no landing — they make sure you actually live in the life you're building. Together you get both: a relationship that's going somewhere and one that's fully lived in along the way.",
    stuck: [
      "The friction has a loop to it, and it usually turns like this.",
      "You bring up what's next to feel close — and being pulled toward the future can land on them as the present isn't enough, so they settle harder into the here-and-now. Their settling in reads to you as no momentum, maybe even no interest in where this goes — which makes you want to talk about the future a little more.",
      "And the ache underneath it: you can both be completely, happily in this and still get caught in the loop. One of you hears “let's plan the future” and feels loved. The other hears it and feels a little unmet in the present. Neither of you is wrong.",
    ],
    helps: [
      "The move that helps most isn't for one of you to care more about the future or less about the present. It's to stop letting the two compete for the same moments.",
      "Give each its own space on purpose. Set aside dedicated time for the future talk — so it doesn't keep leaking into ordinary evenings. And just as deliberately, protect some time that's off-limits to planning entirely: present, unhurried, no horizon in view. When the future has a place to live, it stops crowding the present.",
    ],
    question:
      "What makes you feel most connected to me — building toward what's next, or being fully in what we already have?",
    questionNote:
      "Ask it with real curiosity, and answer it for yourself too. You're trying to learn where each of you naturally feels the love — so you can start offering the other a little more of theirs.",
  },
};
