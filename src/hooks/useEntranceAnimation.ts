import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref.
 * If the element is already in the viewport when the effect mounts it is made
 * visible immediately (two rAF ticks so the initial CSS has been applied).
 * For elements below the fold the observer fires on scroll – once only.
 */
export function useEntranceAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-visible");

    // Already in viewport on mount – show after the browser has painted the
    // initial opacity:0 state so the transition can play from there.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(() => requestAnimationFrame(show));
      return;
    }

    // Below the fold – use IntersectionObserver.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
