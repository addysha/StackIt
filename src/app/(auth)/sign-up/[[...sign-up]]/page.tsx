import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <SignUp
        appearance={{
          elements: {
            card: "surface-card rounded-3xl bg-[var(--surface)] text-slate-50 shadow-none",
            formButtonPrimary:
              "bg-indigo-500 text-slate-950 hover:bg-indigo-400 rounded-xl shadow-none",
          },
        }}
      />
    </main>
  );
}
