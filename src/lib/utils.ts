import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "NZD") {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-NZ").format(value);
}

export function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function timeAgo(date: Date | string) {
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
}

export function toTitleCase(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const NAVBAR_OFFSET = 64; // fixed navbar height + small padding
const SCROLL_DURATION = 900; // ms
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function smoothScrollTo(targetY: number) {
  const startY = window.scrollY ?? document.documentElement.scrollTop;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION, 1);
    const eased = easeOutCubic(progress);
    const currentY = startY + distance * eased;
    window.scrollTo(0, currentY);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * Smooth-scroll to an in-page section by hash with eased deceleration.
 * Use as onClick for anchor links so scrolling works reliably in Next.js.
 */
export function scrollToHash(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (href?.startsWith("#")) {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - NAVBAR_OFFSET;
      smoothScrollTo(Math.max(0, targetY));
      window.history.pushState(null, "", href);
    }
  }
}
