import { redirect } from "next/navigation";

// The quiz now produces a full relationship-dynamic result at /result.
// Old individual-profile links are kept alive by redirecting to the quiz.
export default function LegacyProfileRedirect() {
  redirect("/quiz");
}
