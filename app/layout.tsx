import type { Metadata } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const siteUrl = "https://staysteady.io";
const title = "Steady — Find your footing in love that runs hot and cold";
const description =
  "Steady helps you understand avoidant relationship behavior and navigate the patterns — so you don't lose yourself in the process. Join the beta.";

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
    <html lang="en" className={`${fraunces.variable} ${newsreader.variable}`}>
      <body className="font-body text-[1.0625rem] leading-relaxed sm:text-[1.15rem]">
        {children}
      </body>
    </html>
  );
}
