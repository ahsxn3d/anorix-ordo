import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MenuBar from "@/components/MenuBar";
import Terminal from "@/components/Terminal";
import { CartProvider } from "@/lib/commerce/cart";

const display = localFont({ src: "../public/fonts/archivo-latin-wdth-normal.woff2", variable: "--f-display", weight: "100 900", display: "swap", adjustFontFallback: "Arial", declarations: [{ prop: "font-stretch", value: "62% 125%" }] });
const sans = localFont({ src: "../public/fonts/inter-latin-wght-normal.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../public/fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--f-mono", weight: "100 800", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Helm — The agent OS for web builders",
  description: "Helm is a layered agent OS for web designers and vibe-coders: a mission loop that plans, builds, checks and ships, with approvals and a kill switch. By Anorix.",
  openGraph: { title: "Helm — The agent OS for web builders", description: "A layered agent OS with a mission loop, approvals and a kill switch. By Anorix.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#0c0d0f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <CartProvider storeKey="helm-cart"><SmoothScroll /><MenuBar />{children}<Terminal /></CartProvider>
      </body>
    </html>
  );
}
