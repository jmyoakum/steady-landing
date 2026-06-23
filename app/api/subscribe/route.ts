import { NextResponse } from "next/server";

// Node runtime so we can send a Referer header (edge/web fetch drops it),
// which MailerLite's embedded-form endpoint needs to treat the request as a
// real form submission and apply the form's group.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://staysteady.io";

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = (body?.email ?? "").toString().trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  const account = process.env.MAILERLITE_ACCOUNT_ID;
  const formId = process.env.MAILERLITE_FORM_ID;

  try {
    // Preferred: official MailerLite API — reliably assigns the group.
    if (apiKey) {
      const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          ...(groupId ? { groups: [groupId] } : {}),
        }),
      });
      if (res.ok) return NextResponse.json({ ok: true });
      return NextResponse.json(
        { error: "Could not subscribe right now. Please try again." },
        { status: 502 }
      );
    }

    // Fallback: public embedded-form endpoint (no secret required).
    if (account && formId) {
      const params = new URLSearchParams();
      params.set("fields[email]", email);
      params.set("ml-submit", "1");
      params.set("anticsrf", "true");

      const res = await fetch(
        `https://assets.mailerlite.com/jsonp/${account}/forms/${formId}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Referer: `${SITE}/`,
            Origin: SITE,
          },
          body: params.toString(),
        }
      );

      let ok = res.ok;
      try {
        const d = await res.json();
        if (typeof d?.success !== "undefined") ok = !!d.success;
      } catch {
        // non-JSON response — fall back to HTTP status
      }
      if (ok) return NextResponse.json({ ok: true });
      return NextResponse.json(
        { error: "Could not subscribe right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Signup is not configured yet." },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 502 }
    );
  }
}
