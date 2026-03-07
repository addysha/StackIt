import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  "30 seconds of clarity each morning",
  "Shopify + bank feeds in one assistant",
  "Trust metadata on every number",
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 md:px-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg">StackIt</p>
            <p className="text-sm text-slate-400">Personal business assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/dashboard">
            <Button>
              Open dashboard
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Badge className="w-fit">v0.1 MVP</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-tight text-slate-50 md:text-6xl">
              Every small business owner deserves a personal assistant that knows their numbers.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              StackIt brings Shopify, banking, sync trust, and a drag-and-drop morning dashboard
              into one calm dark-mode workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {highlights.map((item) => (
              <Badge key={item} className="bg-white/5 px-4 py-2 text-sm text-slate-300">
                {item}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/onboarding">
              <Button size="lg">Start onboarding</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                Preview live dashboard
              </Button>
            </Link>
          </div>
        </div>

        <Card className="overflow-hidden border-white/10">
          <CardContent className="space-y-5 p-6">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="mb-2 text-sm text-slate-400">This morning</p>
              <p className="font-[family-name:var(--font-display)] text-4xl">$14,250</p>
              <p className="text-sm text-emerald-300">+12% vs last month</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Wallet className="mb-3 size-5 text-indigo-300" />
                <p className="text-sm text-slate-400">Cash in bank</p>
                <p className="mt-2 text-2xl font-semibold">$38,600</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="mb-3 size-5 text-emerald-300" />
                <p className="text-sm text-slate-400">Trust metadata</p>
                <p className="mt-2 text-2xl font-semibold">Synced 6m ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
