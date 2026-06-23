import { NextResponse } from "next/server";

export const runtime = "edge";

// Subscribes an email to MailerLite via the public embedded-form endpoint.
// The form (MAILERLITE_FORM_ID) is assigned to the "Steady Beta Waitlist"
// group in MailerLite, so submissions land directly in that group.
// No API secret is required — only public identifiers.
//
// Environment variables (set in Vercel):
//   MAILERLITE_ACCOUNT_ID  – e.g. 2465542
//   MAILERLITE_FORM_ID     – e.g. 191073181595862891
export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = (body?.email ?? "").toString().trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const account = process.env.MAILERLITE_ACCOUNT_ID;
  const formId = process.env.MAILERLITE_FORM_ID;
  if (!account || !formId) {
    return NextResponse.json(
      { error: "Signup is not configured yet." },
      { status: 500 }
    );
  }

  try {
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
        },
        body: params.toString(),
      }
    );

    let ok = res.ok;
    try {
      const data = await res.json();
      if (data && typeof data.success !== "undefined") ok = !!data.success;
    } catch {
      // non-JSON response — fall back to HTTP status
    }

    if (!ok) {
      return NextResponse.json(
        { error: "Could not subscribe right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 502 }
    );
  }
}
