import type { Metadata } from "next";

import "@/app/globals.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { AppProviders } from "@/components/providers/app-providers";
import { geist, geistMono, instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "StackIt",
  description: "Personal business assistant for small business owners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          geist.variable,
          geistMono.variable,
          instrumentSerif.variable,
          "min-h-screen bg-[var(--background)] font-sans text-[var(--text-primary)] antialiased",
        )}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
