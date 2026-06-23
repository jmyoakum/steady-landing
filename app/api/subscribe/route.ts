import { NextResponse } from "next/server";

export const runtime = "edge";

// Subscribes an email to a Kit (ConvertKit) form.
// Set KIT_FORM_ID in your environment (Vercel project settings).
// Optionally set KIT_API_KEY to use the authenticated v3 endpoint.
export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = (body?.email ?? "").toString().trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const formId = process.env.KIT_FORM_ID;
  if (!formId) {
    return NextResponse.json(
      { error: "Signup is not configured yet." },
      { status: 500 }
    );
  }

  const apiKey = process.env.KIT_API_KEY;

  try {
    let res: Response;
    if (apiKey) {
      // Authenticated ConvertKit v3 endpoint
      res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey, email }),
      });
    } else {
      // Public Kit form subscription endpoint (no secret required)
      res = await fetch(`https://app.kit.com/forms/${formId}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email_address: email }),
      });
    }

    if (!res.ok) {
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
