import { Geist, Geist_Mono, Instrument_Serif, Lora, Nunito } from "next/font/google";

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

export const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
