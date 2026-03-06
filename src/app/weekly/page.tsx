"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Share2, ArrowRight, TrendingUp, Heart, Zap, Star, Calendar } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

export default function WeeklyRecapPage() {
  const weekData = {
    weekOf: "Feb 28 – Mar 6",
    checkIns: 5,
    streak: 12,
    moodTrend: "upward",
    topTheme: "Connection & Warmth",
    topEmoji: "💕",
    highlights: [
      { day: "Monday", theme: "Fresh starts", emoji: "🌱", mood: 4 },
      { day: "Tuesday", theme: "Deep conversation", emoji: "💬", mood: 5 },
      { day: "Wednesday", theme: "Rest needed", emoji: "🌙", mood: 3 },
      { day: "Thursday", theme: "Creative spark", emoji: "✨", mood: 4 },
      { day: "Friday", theme: "Softness is strength", emoji: "💕", mood: 5 },
    ],
    patterns: [
      "Your happiest moments this week involved people you trust",
      "You mentioned family more than usual — something shifting there?",
      "Evening energy > morning energy this week",
    ],
    lifeprint: [
      { trait: "Warmth", change: "+0.05", direction: "up" },
      { trait: "Intuition", change: "+0.03", direction: "up" },
      { trait: "Risk Tolerance", change: "-0.02", direction: "down" },
    ],
    nextWeekPreview: "Jupiter highlights expansion and optimism. Good week to start conversations you've been postponing.",
  };

  const handleShare = async () => {
    const text = `My AstraPulse Week ✨\n\nTheme: ${weekData.topTheme}\nStreak: ${weekData.streak} days\nCheck-ins: ${weekData.checkIns}/7\n\nGet your weekly recap: astrapulse.app`;
    if (navigator.share) {
      await navigator.share({ title: "My AstraPulse Week", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <main className="min-h-screen bg-cosmic-gradient pb-24">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)", top: "10%", left: "-5%", filter: "blur(70px)" }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5">
        <div className="pt-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Your Week</h1>
              <p className="text-sm text-white/40">{weekData.weekOf}</p>
            </div>
            <button onClick={handleShare} className="glass rounded-xl px-4 py-2 text-xs flex items-center gap-1.5 hover:bg-white/5 transition-all">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        {/* Hero stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Check-ins", value: `${weekData.checkIns}/7`, icon: <Calendar className="w-4 h-4 text-aurora-400" /> },
            { label: "Streak", value: weekData.streak, icon: <Zap className="w-4 h-4 text-ember-400" /> },
            { label: "Mood", value: "↑ Upward", icon: <TrendingUp className="w-4 h-4 text-jade-400" /> },
          ].map((stat, i) => (
            <motion.div key={i} className="glass-strong rounded-2xl p-4 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="mx-auto mb-2">{stat.icon}</div>
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-[10px] text-white/30">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Theme of the week */}
        <motion.div className="glass-strong rounded-2xl p-6 mb-4 glow-aurora text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="text-3xl mb-2">{weekData.topEmoji}</div>
          <div className="text-xs text-aurora-300 font-medium mb-1 uppercase tracking-wider">Theme of the week</div>
          <h2 className="text-xl font-bold">{weekData.topTheme}</h2>
        </motion.div>

        {/* Day by day */}
        <div className="glass rounded-2xl p-5 mb-4">
          <div className="text-xs text-white/30 font-medium mb-4 uppercase tracking-wider">Day by day</div>
          <div className="space-y-3">
            {weekData.highlights.map((day, i) => (
              <motion.div key={i} className="flex items-center gap-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                <span className="text-xl w-8 text-center">{day.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{day.theme}</div>
                  <div className="text-xs text-white/30">{day.day}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < day.mood ? "bg-aurora-400" : "bg-white/10"}`} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Patterns */}
        <div className="glass rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-gold-400" />
            <div className="text-xs text-white/30 font-medium uppercase tracking-wider">Patterns we noticed</div>
          </div>
          <div className="space-y-3">
            {weekData.patterns.map((p, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/50">
                <div className="w-1 h-1 rounded-full bg-aurora-400 mt-2 shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Lifeprint changes */}
        <div className="glass rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-rose-400" />
            <div className="text-xs text-white/30 font-medium uppercase tracking-wider">Lifeprint updates</div>
          </div>
          <div className="space-y-2">
            {weekData.lifeprint.map((l, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-white/50">{l.trait}</span>
                <span className={l.direction === "up" ? "text-jade-400" : "text-ember-400"}>
                  {l.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next week preview */}
        <div className="bg-card-gradient rounded-2xl p-5 mb-4">
          <div className="text-xs text-aurora-300 font-medium mb-2 uppercase tracking-wider">Next week preview</div>
          <p className="text-sm text-white/60 leading-relaxed">{weekData.nextWeekPreview}</p>
        </div>

        {/* CTA */}
        <Link href="/onboarding" className="block glass-strong rounded-2xl p-5 text-center hover:bg-white/[0.04] transition-all">
          <p className="text-sm text-white/40 mb-2">Want readings that know you even better?</p>
          <span className="text-aurora-400 font-medium text-sm flex items-center justify-center gap-1">
            Keep your streak going <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      <BottomNav />
    </main>
  );
}
