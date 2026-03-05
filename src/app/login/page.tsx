"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-cosmic-gradient flex items-center justify-center px-5">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-white/40 text-sm mb-8">Continue your cosmic journey</p>
        <Link href="/onboarding" className="block w-full bg-aurora-500 hover:bg-aurora-400 text-white font-semibold py-4 rounded-2xl transition-all text-center">
          Sign in with Phone
        </Link>
        <p className="text-xs text-white/20 mt-4">
          New here? <Link href="/onboarding" className="text-aurora-400 hover:underline">Get your first reading</Link>
        </p>
      </div>
    </main>
  );
}
