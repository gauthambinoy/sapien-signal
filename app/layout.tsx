import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const jetMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sapien-signal.vercel.app"),
  title: {
    default: "Sapien Signal — The Pulse of Human Civilization",
    template: "%s · Sapien Signal",
  },
  description:
    "A real-time, editorial dashboard of our world. 200+ free APIs streaming weather, earthquakes, markets, forex, energy, space, and the human story — through a 3D interactive Earth.",
  applicationName: "Sapien Signal",
  authors: [{ name: "Gautham Binoy", url: "https://github.com/gauthambinoy" }],
  keywords: [
    "real-time dashboard",
    "global data",
    "earth visualization",
    "open data",
    "next.js",
    "live world stats",
  ],
  openGraph: {
    type: "website",
    title: "Sapien Signal — The Pulse of Human Civilization",
    description:
      "Real-time global intelligence dashboard with 200+ APIs, 3D Earth, and editorial design.",
    siteName: "Sapien Signal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sapien Signal",
    description: "The pulse of human civilization, in real time.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#1F1E1C" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${sourceSerif.variable} ${jetMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
