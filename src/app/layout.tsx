import type { Metadata } from "next";
import { Instrument_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({ variable: "--font-nexus-sans", subsets: ["latin"] });
const mono = Spline_Sans_Mono({ variable: "--font-nexus-mono", subsets: ["latin"] });
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { LangProvider } from "@/components/lang-provider";
import { htmlLang } from "@/lib/i18n/core";
import { getLang } from "@/lib/i18n/server";
export const metadata: Metadata = {
  metadataBase: new URL("https://nexus-saas-dashboard-tawny.vercel.app"),
  title: {
    default: "Nexus — SaaS revenue intelligence",
    template: "%s · Nexus",
  },
  description:
    "A production-minded SaaS operations workspace for revenue, customers, subscriptions and growth.",
  applicationName: "Nexus",
  authors: [{ name: "Vitor", url: "https://github.com/vitorgamer778" }],
  creator: "Vitor",
  keywords: [
    "SaaS dashboard",
    "revenue intelligence",
    "Next.js",
    "Supabase",
    "analytics",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Nexus",
    title: "Nexus — SaaS revenue intelligence",
    description:
      "Revenue, customers and product intelligence in a secure multi-workspace command center.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus — SaaS revenue intelligence",
    description:
      "Revenue, customers and product intelligence in one focused workspace.",
  },
  icons: { icon: "/icon.svg" },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLang();
  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning data-scroll-behavior="smooth" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>
          <LangProvider lang={lang}>{children}</LangProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
