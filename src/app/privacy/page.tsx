"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cosmic-gradient">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/50">
          <p className="text-white/70 text-base">Last updated: March 2026</p>

          <p>AstraPulse is built with privacy at its core. We believe your personal reflections and cosmic journey belong to you.</p>

          <h2 className="text-white text-lg font-semibold">What We Collect</h2>
          <p>We collect only what&apos;s needed to give you a personalized experience: your phone number for authentication, birth details for chart calculation, daily answers for personalization, and your reading preferences.</p>

          <h2 className="text-white text-lg font-semibold">How We Use It</h2>
          <p>Your data powers your Lifeprint — the personal model that makes readings feel like they truly know you. We never sell your data. We never share your answers. Your private answers are encrypted and only visible to you.</p>

          <h2 className="text-white text-lg font-semibold">Your Controls</h2>
          <p>You can mark any answer as private, delete specific answers, export all your data, or completely erase your account — all from Settings. Withdrawal of consent is as easy as giving it.</p>

          <h2 className="text-white text-lg font-semibold">DPDP Compliance</h2>
          <p>We comply with India&apos;s Digital Personal Data Protection Act. Consent is clear and in plain language. Users under 18 are not permitted. You can access all data we hold about you at any time.</p>

          <h2 className="text-white text-lg font-semibold">Data Storage</h2>
          <p>Your data is stored securely on Firebase (Google Cloud) with encryption at rest and in transit. We retain data only as long as your account is active.</p>

          <h2 className="text-white text-lg font-semibold">Contact</h2>
          <p>Questions? Reach us at privacy@astrapulse.app</p>
        </div>
      </div>
    </main>
  );
}
