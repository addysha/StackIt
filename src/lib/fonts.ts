import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

export const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const instrumentSerif = Instrument_Serif({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
