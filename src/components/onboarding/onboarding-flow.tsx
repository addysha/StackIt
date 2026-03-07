"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Business name is required"),
  digestTime: z.string().min(4, "Digest time is required"),
  timezone: z.string().min(3, "Timezone is required"),
  tools: z.array(z.string()).min(1, "Choose at least one tool"),
});

type FormValues = z.infer<typeof schema>;

const toolOptions = ["Shopify", "Square", "Stripe", "Xero", "MYOB", "Other"];

async function patchOrganization(payload: Partial<FormValues>) {
  const response = await fetch("/api/organizations/demo-org", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update organization");
  }

  return response.json();
}

export function OnboardingFlow() {
  const [step, setStep] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Harbour Matcha",
      digestTime: "07:00",
      timezone: "Pacific/Auckland",
      tools: ["Shopify", "Other"],
    },
  });

  const mutation = useMutation({
    mutationFn: patchOrganization,
  });
  const watchedTools = useWatch({
    control: form.control,
    name: "tools",
  });

  const steps = useMemo(
    () => [
      {
        title: "Name your business",
        description: "One clear label so the dashboard feels like it belongs to them from day one.",
      },
      {
        title: "Tell us about your setup",
        description: "This keeps onboarding light while capturing the tools and digest timing we need.",
      },
      {
        title: "Connect your tools",
        description: "Step 4 keeps the OAuth moment big, calm, and obvious.",
      },
      {
        title: "Tutorial and first sync",
        description: "Tooltips stay skippable and the first live dashboard arrives as fast as possible.",
      },
    ],
    [],
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-3">
        <Badge className="w-fit bg-indigo-500/15 text-indigo-200">Self-serve onboarding</Badge>
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-slate-50">
          Under five minutes from sign-up to first live dashboard.
        </h1>
        <p className="max-w-3xl text-lg text-slate-300">
          The onboarding flow is already wired for steps 1 through 7, with the premium dark-mode
          treatment and a clean handoff into Shopify and Akahu connection screens.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[28px] border-white/10">
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-display)] text-3xl">
              Step {step} of 4
            </CardTitle>
            <CardDescription>{steps[step - 1]?.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 ? (
              <div className="space-y-3">
                <Label htmlFor="name">What&apos;s your business called?</Label>
                <Input id="name" {...form.register("name")} />
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Which tools do you use?</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {toolOptions.map((tool) => {
                      const selected = watchedTools.includes(tool);
                      return (
                        <button
                          key={tool}
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-indigo-400/40 bg-indigo-500/10 text-slate-50"
                              : "border-white/10 bg-white/[0.03] text-slate-300"
                          }`}
                          onClick={() => {
                            const current = form.getValues("tools");
                            form.setValue(
                              "tools",
                              selected ? current.filter((item) => item !== tool) : [...current, tool],
                            );
                          }}
                          type="button"
                        >
                          {tool}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="digestTime">Morning digest time</Label>
                    <Input id="digestTime" type="time" {...form.register("digestTime")} />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" {...form.register("timezone")} />
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4">
                <Card className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-100">Shopify</p>
                      <p className="text-sm text-slate-400">Connect storefront orders, products, and customers</p>
                    </div>
                    <Button>Connect</Button>
                  </div>
                </Card>
                <Card className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-100">Akahu</p>
                      <p className="text-sm text-slate-400">Bring in NZ bank transactions and cash position</p>
                    </div>
                    <Button variant="secondary">Connect</Button>
                  </div>
                </Card>
                <p className="text-sm text-slate-500">
                  Calendly handoff can live here for manual onboarding support during pilot mode.
                </p>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4">
                {[
                  "This is a block. Each one shows a key number from your business.",
                  "Drag any block from the sidebar onto your dashboard.",
                  "This tells you when your data last updated and where it came from.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 text-indigo-300" />
                    <p className="text-sm text-slate-300">{item}</p>
                  </div>
                ))}
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  Connected. Your first sync is running now, and the preset dashboard will fill in as soon as
                  the first Shopify and Akahu jobs complete.
                </div>
              </div>
            ) : null}

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="ghost"
                disabled={step === 1}
                onClick={() => setStep((current) => Math.max(1, current - 1))}
                type="button"
              >
                Back
              </Button>
              {step < 4 ? (
                <Button
                  onClick={async () => {
                    const payload = form.getValues();
                    await mutation.mutateAsync(payload);
                    setStep((current) => Math.min(4, current + 1));
                  }}
                  type="button"
                >
                  Continue
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              ) : (
                <Link href="/dashboard">
                  <Button>
                    Go to dashboard
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {steps.map((item, index) => (
            <Card
              key={item.title}
              className={`rounded-3xl p-5 ${
                index + 1 === step ? "border-indigo-400/30" : "border-white/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-indigo-500/15 p-3 text-indigo-300">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-100">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
