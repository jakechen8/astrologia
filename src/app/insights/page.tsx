"use client";

import { motion } from "framer-motion";
import { TrendingUp, Flame, Heart, Zap, Target, Calendar } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

// ============================================================
// INSIGHTS — Patterns, streaks, summaries
// ============================================================

const WEEKLY_THEMES = [
  { week: "This week", theme: "Connection & warmth", emoji: "💕" },
  { week: "Last week", theme: "Career momentum", emoji: "🚀" },
  { week: "2 weeks ago", theme: "Self-discovery", emoji: "🔍" },
  { week: "3 weeks ago", theme: "Rest & recharge", emoji: "🌙" },
];

const PATTERNS = [
  { label: "Your happiest days correlate with social connection", confidence: 78 },
  { label: "You're most productive in the evening hours", confidence: 65 },
  { label: "Family topics boost your mood more than career topics", confidence: 72 },
  { label: "You tend to feel stressed mid-week", confidence: 58 },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-cosmic-gradient pb-24">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)", top: "20%", right: "-10%", filter: "blur(70px)" }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5">
        <div className="pt-6 pb-4">
          <h1 className="text-2xl font-bold mb-1">Insights</h1>
          <p className="text-sm text-white/40">Patterns emerging from your journey</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Streak", value: "12", icon: <Flame className="w-4 h-4 text-ember-400" />, sub: "days" },
            { label: "Check-ins", value: "28", icon: <Calendar className="w-4 h-4 text-aurora-400" />, sub: "total" },
            { label: "Personal", value: "87%", icon: <Target className="w-4 h-4 text-jade-400" />, sub: "accuracy" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-strong rounded-2xl p-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mx-auto mb-2">{stat.icon}</div>
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-[10px] text-white/30">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Mood trend */}
        <div className="glass-strong rounded-2xl p-5 mb-4 glow-aurora">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-jade-400" />
            <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Mood Trend · Last 7 Days</span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {[3, 4, 3, 5, 4, 4, 5].map((val, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-aurora-500/30 to-aurora-500/60 relative group"
                initial={{ height: 0 }}
                animate={{ height: `${(val / 5) * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-white/40">
                  {["😔", "😐", "🙂", "😊", "✨"][val - 1]}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-white/20">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        {/* Weekly themes */}
        <div className="glass rounded-2xl p-5 mb-4">
          <div className="text-xs text-white/30 font-medium mb-3 uppercase tracking-wider">Weekly Themes</div>
          <div className="space-y-3">
            {WEEKLY_THEMES.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 glass rounded-xl p-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-xl">{item.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.theme}</div>
                  <div className="text-xs text-white/30">{item.week}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detected patterns */}
        <div className="glass rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Detected Patterns</span>
          </div>
          <div className="space-y-3">
            {PATTERNS.map((pattern, i) => (
              <motion.div
                key={i}
                className="space-y-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">{pattern.label}</span>
                  <span className="text-xs text-white/20">{pattern.confidence}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-aurora-500 to-jade-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${pattern.confidence}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category coverage */}
        <div className="glass rounded-2xl p-5">
          <div className="text-xs text-white/30 font-medium mb-3 uppercase tracking-wider">What we know about</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { cat: "Joy & Taste", pct: 80, color: "bg-ember-400" },
              { cat: "Values", pct: 60, color: "bg-aurora-400" },
              { cat: "Relationships", pct: 45, color: "bg-rose-400" },
              { cat: "Work Style", pct: 35, color: "bg-jade-400" },
              { cat: "Stress", pct: 50, color: "bg-gold-400" },
              { cat: "Identity", pct: 25, color: "bg-aurora-300" },
            ].map((item, i) => (
              <div key={i} className="glass rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">{item.cat}</span>
                  <span className="text-white/20">{item.pct}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ opacity: 0.6 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
