import Link from "next/link";
import { Bell, LayoutDashboard, PlugZap, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/onboarding", label: "Onboarding", icon: PlugZap },
  { href: "/dashboard#alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard#settings", label: "Settings", icon: Settings },
];

export function AppShell({
  children,
  title = "StackIt",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[var(--background)]/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-[family-name:var(--font-display)] text-xl text-slate-50">
              {title}
            </Link>
            <Badge>v0.1</Badge>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button variant="ghost" className="gap-2 text-slate-300">
                  <Icon className="size-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
