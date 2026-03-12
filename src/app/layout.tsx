import type { Metadata } from "next";

import "@/app/globals.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"


import { AppProviders } from "@/components/providers/app-providers";
import { geist, geistMono, instrumentSerif, lora, nunito } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "StackIt",
  description: "Personal business assistant for small business owners.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(lora.variable, nunito.variable)}
    >
      <body
        className={cn(
          geist.variable,
          geistMono.variable,
          instrumentSerif.variable,
          "min-h-screen bg-[var(--background)] font-sans text-[var(--text-primary)] antialiased",
        )}
      >
        <AppProviders>{children}</AppProviders>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
