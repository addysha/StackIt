"use client";

const LOGOS: { name: string; src: string; icon?: string; invert?: boolean }[] = [
  { name: "Shopify", src: "/icons/ShopifyLogo.svg" },
  { name: "PayPal", src: "/icons/paypalLarge.svg", icon: "/icons/PaypalSymbol.svg" },
  { name: "Stripe", src: "/icons/Stripe.svg", icon: "/icons/stripe-icon-logo.svg" },
  { name: "Xero", src: "/icons/xeroLarge.svg", icon: "/icons/xero.svg" },
  { name: "Square", src: "/icons/Square_Logo_2025_White.svg", invert: true },
  { name: "Anz", src: "/icons/anz.svg" },
];

const REPEATED = [
  ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS,
  ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS,
];

function LogoCard({ name, src, icon, invert }: { name: string; src: string; icon?: string; invert?: boolean }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center gap-1.5 border border-[var(--integration-strip-border)] rounded-lg h-14 w-44 md:w-48 px-4 py-2 bg-white">
      {icon && (
        <img
          alt=""
          loading="lazy"
          decoding="async"
          className="h-6 w-6 object-contain rounded"
          src={icon}
        />
      )}
      <img
        alt={name}
        loading="lazy"
        decoding="async"
        className={`h-6 w-auto max-w-full object-contain${invert ? " brightness-0 opacity-80" : ""}`}
        src={src}
      />
    </div>
  );
}

export function IntegrationStrip() {
  return (
    <div className="relative overflow-hidden max-w-full lg:max-w-4xl xl:max-w-7xl mx-auto integration-strip-dots">
      <div className="absolute left-0 w-1/3 h-full bg-gradient-to-r from-[var(--w)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 w-1/3 h-full bg-gradient-to-l from-[var(--w)] to-transparent z-10 pointer-events-none" />

      {/* --duration: lower = faster (e.g. 45s), higher = slower (e.g. 120s) */}
      <div
        className="marquee"
        style={{ "--gap": "1rem", "--duration": "200s" } as React.CSSProperties}
      >
        <div className="marquee__content">
          {REPEATED.map((logo, i) => (
            <LogoCard key={`a-${i}`} name={logo.name} src={logo.src} icon={logo.icon} invert={logo.invert} />
          ))}
        </div>
        <div className="marquee__content" aria-hidden>
          {REPEATED.map((logo, i) => (
            <LogoCard key={`b-${i}`} name={logo.name} src={logo.src} icon={logo.icon} invert={logo.invert} />
          ))}
        </div>
      </div>
    </div>
  );
}
