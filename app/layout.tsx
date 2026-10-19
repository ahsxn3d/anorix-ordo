import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = localFont({ src: "../public/fonts/archivo-latin-wdth-normal.woff2", variable: "--f-display", weight: "100 900", display: "swap", adjustFontFallback: "Arial", declarations: [{ prop: "font-stretch", value: "62% 125%" }] });
const sans = localFont({ src: "../public/fonts/inter-latin-wght-normal.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../public/fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--f-mono", weight: "100 800", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Ordo — Revenue that runs itself",
  description: "Ordo deploys AI agents that run pipeline hygiene, billing, collections, forecasting and renewals inside the stack you already have. A concept by Anorix.",
  openGraph: { title: "Ordo — Revenue that runs itself", description: "Agentic AI for revenue operations. A concept by Anorix.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#0c0d0f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
