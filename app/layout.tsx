import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl = "https://staysteady.io";
const title = "Steady — Understand the pattern. Break the cycle.";
const description =
  "Steady helps you understand avoidant relationship behavior and navigate the patterns so you don't lose yourself in the process. Join the waitlist.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Steady",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable}`}>
      <body className="bg-cream font-body text-[1.0625rem] leading-relaxed text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
