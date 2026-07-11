import { ImageResponse } from "next/og";
import { isDynamicSlug, type DynamicSlug } from "../../data";
import { resultContent } from "../../result/content";

export const runtime = "edge";

/** The share card. Also what unfurls when someone posts their result link. */
export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("dyn") ?? "";
  const dyn = (isDynamicSlug(raw) ? raw : "pursue-pause") as DynamicSlug;
  const c = resultContent[dyn];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF8F2",
          padding: "60px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#C06B4A",
            fontWeight: 700,
          }}
        >
          {"OUR RELATIONSHIP DYNAMIC"}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            color: "#241F1A",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {c.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            background: "#EFE7D9",
            color: "#574E44",
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          {c.poles.replace(/\u2194/g, "\u00b7")}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            maxWidth: 880,
            fontSize: 31,
            lineHeight: 1.35,
            color: "#9F4F2E",
            textAlign: "center",
          }}
        >
          {c.snapshot}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 24,
            fontWeight: 700,
            color: "#8C8275",
          }}
        >
          {"What's your dynamic?  ·  staysteady.io"}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
