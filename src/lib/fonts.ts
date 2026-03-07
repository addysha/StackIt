import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";

export const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

export const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
