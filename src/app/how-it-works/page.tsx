"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, MessageCircle, Brain, Star, Share2, Zap, Heart } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Sign up in 30 seconds",
      desc: "Phone OTP, birth date, birth place. That's it. We calculate your Vedic and Western chart instantly.",
      icon: <Zap className="w-8 h-8" />,
      color: "aurora",
    },
    {
      num: "02",
      title: "Answer one daily question",
      desc: "Fun at first — your favorite song, comfort food, weekend vibe. Over time, questions get deeper: your values, fears, what makes you light up.",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "ember",
    },
    {
      num: "03",
      title: "Your Lifeprint grows",
      desc: "Every answer becomes a memory, a trait signal, a snapshot of who you are right now. This living model is what makes AstraPulse different.",
      icon: <Brain className="w-8 h-8" />,
      color: "jade",
    },
    {
      num: "04",
      title: "Get readings that see you",
      desc: "Not generic Sun sign content. Readings that cite your life context, explain their logic, and give you one actionable thing to try today.",
      icon: <Star className="w-8 h-8" />,
      color: "gold",
    },
    {
      num: "05",
      title: "Understand the 'why'",
      desc: "Every reading shows what astrology influenced it and what about YOU influenced it. Full transparency. Full trust.",
      icon: <Heart className="w-8 h-8" />,
      color: "rose",
    },
    {
      num: "06",
      title: "Share your cosmic card",
      desc: "Beautiful, shareable daily cards for WhatsApp and Instagram. Just your theme — no personal data exposed.",
      icon: <Share2 className="w-8 h-8" />,
      color: "aurora",
    },
  ];

  return (
    <main className="min-h-screen bg-cosmic-gradient">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center mx-auto mb-6 glow-aurora">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">How AstraPulse Works</h1>
          <p className="text-white/40 max-w-lg mx-auto">A daily 30-second ritual that compounds into something extraordinary.</p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 sm:p-8 flex gap-6 items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                step.color === "aurora" ? "bg-aurora-500/15 text-aurora-400" :
                step.color === "ember" ? "bg-ember-500/15 text-ember-400" :
                step.color === "jade" ? "bg-jade-500/15 text-jade-400" :
                step.color === "gold" ? "bg-gold-500/15 text-gold-400" :
                "bg-rose-500/15 text-rose-400"
              }`}>
                {step.icon}
              </div>
              <div>
                <div className="text-xs text-white/20 font-mono mb-1">{step.num}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <Link href="/onboarding" className="group inline-flex items-center justify-center gap-2 bg-aurora-500 hover:bg-aurora-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-aurora-500/25">
            Start your ritual
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
