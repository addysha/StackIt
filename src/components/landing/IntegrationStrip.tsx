"use client";

import Image from "next/image";

const LOGOS: { name: string; src: string; icon?: string }[] = [
  { name: "Shopify", src: "/icons/ShopifyLogo.svg" },
  { name: "PayPal", src: "/icons/paypalLarge.svg", icon: "/icons/PaypalSymbol.svg" },
  { name: "Stripe", src: "/icons/Stripe.svg", icon: "/icons/stripe-icon-logo.svg" },
  { name: "Xero", src: "/icons/xeroLarge.svg", icon: "/icons/xero.svg" },
  { name: "Sqaure", src: "/icons/Square_Logo_2025_White.svg" }
];

const REPEATED = [
  ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS,
  ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS,
];

function LogoCard({ name, src, icon }: { name: string; src: string; icon?: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center gap-1.5 border border-[var(--integration-strip-border)] rounded-lg h-14 w-44 md:w-48 px-4 py-2 bg-white">
      {icon && (
        <Image
          alt=""
          loading="lazy"
          width={28}
          height={28}
          decoding="async"
          className="h-6 w-6 object-contain rounded"
          src={icon}
          style={{ color: "transparent" }}
        />
      )}
      <Image
        alt={name}
        loading="lazy"
        width={240}
        height={120}
        decoding="async"
        className="h-6 w-auto max-w-full object-contain"
        src={src}
        style={{ color: "transparent" }}
      />
    </div>
  );
}

export function IntegrationStrip() {
  return (
    <div className="relative overflow-hidden max-w-full lg:max-w-4xl xl:max-w-7xl mx-auto">
      <div className="absolute left-0 w-1/3 h-full bg-gradient-to-r from-[var(--w)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 w-1/3 h-full bg-gradient-to-l from-[var(--w)] to-transparent z-10 pointer-events-none" />

      <div
        className="marquee"
        style={{ "--gap": "1rem", "--duration": "90s" } as React.CSSProperties}
      >
        <div className="marquee__content">
          {REPEATED.map((logo, i) => (
            <LogoCard key={`a-${i}`} name={logo.name} src={logo.src} icon={logo.icon} />
          ))}
        </div>
        <div className="marquee__content" aria-hidden>
          {REPEATED.map((logo, i) => (
            <LogoCard key={`b-${i}`} name={logo.name} src={logo.src} icon={logo.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
