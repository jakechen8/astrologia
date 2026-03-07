"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Lock, Unlock, Heart } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  progress?: { current: number; total: number };
}

const ALL_BADGES: Badge[] = [
  {
    id: "first-light",
    name: "First Light",
    emoji: "✨",
    description: "Completed your first reading",
    unlocked: true,
  },
  {
    id: "week-warrior",
    name: "Week Warrior",
    emoji: "🔥",
    description: "7 day streak",
    unlocked: true,
  },
  {
    id: "lunar-cycle",
    name: "Lunar Cycle",
    emoji: "🌙",
    description: "28 day streak",
    unlocked: false,
    progress: { current: 12, total: 28 },
  },
  {
    id: "cosmic-veteran",
    name: "Cosmic Veteran",
    emoji: "🌟",
    description: "90 day streak",
    unlocked: false,
    progress: { current: 12, total: 90 },
  },
  {
    id: "century-star",
    name: "Century Star",
    emoji: "💯",
    description: "100 readings completed",
    unlocked: false,
    progress: { current: 47, total: 100 },
  },
  {
    id: "night-owl",
    name: "Night Owl",
    emoji: "🦉",
    description: "Check-in after midnight",
    unlocked: true,
  },
  {
    id: "early-bird",
    name: "Early Bird",
    emoji: "🐦",
    description: "Check-in before 7am",
    unlocked: false,
    progress: { current: 0, total: 1 },
  },
  {
    id: "soul-searcher",
    name: "Soul Searcher",
    emoji: "🔮",
    description: "50 deep questions answered",
    unlocked: false,
    progress: { current: 23, total: 50 },
  },
  {
    id: "share-light",
    name: "Share the Light",
    emoji: "💫",
    description: "10 cards shared",
    unlocked: false,
    progress: { current: 3, total: 10 },
  },
  {
    id: "stargazer",
    emoji: "🌠",
    name: "Stargazer",
    description: "Used compatibility checker 5 times",
    unlocked: false,
    progress: { current: 1, total: 5 },
  },
  {
    id: "truth-teller",
    name: "Truth Teller",
    emoji: "💬",
    description: "Answered 10 private questions",
    unlocked: true,
  },
  {
    id: "cosmic-connector",
    name: "Cosmic Connector",
    emoji: "🌌",
    description: "Referred 3 friends",
    unlocked: false,
    progress: { current: 1, total: 3 },
  },
];

interface CheckinDay {
  date: Date;
  type: "active" | "missed" | "today";
}

function generateCheckinCalendar(): CheckinDay[] {
  const today = new Date();
  const days: CheckinDay[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    if (i === 0) {
      days.push({ date, type: "today" });
    } else if (Math.random() > 0.15) {
      days.push({ date, type: "active" });
    } else {
      days.push({ date, type: "missed" });
    }
  }

  return days;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function AchievementsPage() {
  const [checkinCalendar] = useState(generateCheckinCalendar());
  const unlockedCount = useMemo(
    () => ALL_BADGES.filter((b) => b.unlocked).length,
    []
  );

  const stats = {
    totalCheckIns: 47,
    longestStreak: 12,
    badgesEarned: unlockedCount,
  };

  return (
    <div className="relative min-h-screen bg-cosmic-gradient pb-24">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 stars opacity-30" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-20 glass-strong border-b border-aurora-400/10 safe-top">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-aurora-400 to-ember-400 bg-clip-text text-transparent">
              Your Achievements
            </h1>
            <p className="text-white/60 mt-1">
              Track your cosmic journey and unlock badges
            </p>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 space-y-10">
          {/* Stats Summary */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4"
          >
            {[
              {
                label: "Check-ins",
                value: stats.totalCheckIns,
                icon: "📊",
              },
              {
                label: "Longest Streak",
                value: stats.longestStreak,
                icon: "🔥",
              },
              {
                label: "Badges Earned",
                value: stats.badgesEarned,
                icon: "🏆",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass rounded-xl p-4 text-center border border-aurora-400/20"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-aurora-300 mt-1">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Current Streak */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="glass-strong rounded-2xl p-8 border border-ember-400/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-ember-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10 text-center">
              <p className="text-white/70 text-sm uppercase tracking-wide">
                Current Streak
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <Flame className="w-8 h-8 text-ember-400 animate-pulse" />
                <p className="text-6xl font-bold bg-gradient-to-r from-ember-400 to-orange-400 bg-clip-text text-transparent">
                  12
                </p>
              </div>
              <p className="text-xl text-white/80 mt-2">Day Streak</p>
              <p className="text-white/50 text-sm mt-3">
                Keep it going! You're on fire! 🔥
              </p>
            </div>
          </motion.div>

          {/* Streak Calendar */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <h2 className="text-lg font-semibold text-white mb-4">
              Last 30 Days
            </h2>
            <div className="glass rounded-2xl p-6 border border-aurora-400/20">
              <div className="grid grid-cols-7 gap-2">
                {checkinCalendar.map((day, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                      day.type === "active"
                        ? "bg-jade-500/30 border border-jade-400 text-jade-300"
                        : day.type === "today"
                          ? "bg-aurora-500/40 border border-aurora-300 text-aurora-200 ring-2 ring-aurora-400/50"
                          : "bg-white/5 border border-white/10 text-white/40"
                    }`}
                    title={day.date.toLocaleDateString()}
                  >
                    {day.type === "today" ? (
                      <Zap className="w-4 h-4" />
                    ) : day.type === "active" ? (
                      "✓"
                    ) : (
                      "−"
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-xs text-white/60 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-jade-500/30 border border-jade-400" />
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-white/5 border border-white/10" />
                  <span>Missed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-aurora-500/40 border border-aurora-300" />
                  <span>Today</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badges Grid */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <h2 className="text-lg font-semibold text-white mb-4">
              All Badges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {ALL_BADGES.map((badge, idx) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`relative group cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                      badge.unlocked
                        ? "glass-strong border border-aurora-300/40 hover:border-aurora-300/60 hover:glow-aurora"
                        : "glass border border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {badge.unlocked && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-aurora-500/10 to-transparent pointer-events-none" />
                    )}

                    <div className="relative z-10 text-center space-y-2">
                      <div className="text-4xl mb-2">{badge.emoji}</div>
                      <p className="text-sm font-semibold text-white">
                        {badge.name}
                      </p>
                      <p className="text-xs text-white/50 line-clamp-2">
                        {badge.description}
                      </p>

                      {badge.unlocked ? (
                        <div className="flex items-center justify-center gap-1 text-aurora-300 text-xs font-medium mt-2">
                          <Unlock className="w-3 h-3" />
                          Unlocked
                        </div>
                      ) : (
                        <div className="mt-3 space-y-1">
                          {badge.progress && (
                            <>
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${(badge.progress.current / badge.progress.total) * 100}%`,
                                  }}
                                  transition={{ duration: 0.6, delay: 0.1 }}
                                  className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                                />
                              </div>
                              <p className="text-xs text-white/40 text-center">
                                {badge.progress.current}/{badge.progress.total}
                              </p>
                            </>
                          )}
                          <div className="flex items-center justify-center gap-1 text-white/40 text-xs mt-2">
                            <Lock className="w-3 h-3" />
                            Locked
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Encouragement Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="glass rounded-2xl p-6 border border-aurora-400/20 bg-gradient-to-r from-aurora-500/10 to-rose-500/5"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💫</span>
              <div>
                <p className="text-white font-semibold">
                  You're Making Amazing Progress!
                </p>
                <p className="text-white/60 text-sm mt-1">
                  Keep checking in daily and unlock more badges. Every day
                  brings you closer to cosmic mastery.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
