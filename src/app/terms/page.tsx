"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function TermsPage() {
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
          <h1 className="text-2xl font-bold">Terms of Service</h1>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/50">
          <p className="text-white/70 text-base">Last updated: March 2026</p>

          <h2 className="text-white text-lg font-semibold">Nature of Service</h2>
          <p>AstraPulse provides astrological readings and personal reflections for entertainment and self-reflection purposes only. Our readings are not professional advice — medical, financial, legal, or otherwise.</p>

          <h2 className="text-white text-lg font-semibold">Eligibility</h2>
          <p>You must be 18 years or older to use AstraPulse. By creating an account, you confirm you meet this requirement.</p>

          <h2 className="text-white text-lg font-semibold">Your Data</h2>
          <p>You retain ownership of all data you provide. We use it solely to personalize your experience. See our Privacy Policy for full details.</p>

          <h2 className="text-white text-lg font-semibold">Acceptable Use</h2>
          <p>Use AstraPulse for personal reflection and growth. Do not use readings to make consequential decisions about others, including hiring, lending, or relationship decisions that affect third parties without their knowledge.</p>

          <h2 className="text-white text-lg font-semibold">No Guarantees</h2>
          <p>Astrological readings are interpretive. We make no claims about predictive accuracy. AstraPulse is a tool for self-reflection, not prediction.</p>

          <h2 className="text-white text-lg font-semibold">Safety</h2>
          <p>If our system detects potential distress, we may show supportive resources. We are not a substitute for professional mental health support. If you&apos;re in crisis, please contact a qualified professional.</p>

          <h2 className="text-white text-lg font-semibold">Contact</h2>
          <p>Questions about these terms? Reach us at legal@astrapulse.app</p>
        </div>
      </div>
    </main>
  );
}
