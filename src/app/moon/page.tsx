"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Moon, Sun, Zap } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

// Moon phase calculation based on synodic period
// Known new moon: January 6, 2000
function calculateMoonPhase(date: Date) {
  const KNOWN_NEW_MOON = new Date(2000, 0, 6); // January 6, 2000
  const SYNODIC_PERIOD = 29.53058867; // days

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysSinceKnown = (date.getTime() - KNOWN_NEW_MOON.getTime()) / millisecondsPerDay;

  const phase = (daysSinceKnown % SYNODIC_PERIOD) / SYNODIC_PERIOD;
  const illumination = Math.round((Math.sin(phase * Math.PI * 2 - Math.PI / 2) + 1) / 2 * 100);

  const phaseNames = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent",
  ];

  const phaseIndex = Math.floor(phase * 8) % 8;
  const phaseName = phaseNames[phaseIndex];

  return { phase, illumination, phaseName, phaseIndex };
}

// Calculate moon sign based on date
function getMoonSign(date: Date): string {
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  // Simple calculation: moon sign changes roughly every 2.5 days
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const dayOfYear =
    Math.floor((date.getTime() - jan1.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  const moonSignIndex = Math.floor((dayOfYear / 365.25) * 12 * 30) % 12;
  return signs[moonSignIndex];
}

const MOON_INTERPRETATIONS: Record<string, string> = {
  "New Moon":
    "A time of new beginnings and introspection. Plant seeds for what you wish to manifest.",
  "Waxing Crescent":
    "Energy is building. Focus on intention-setting and taking small steps forward.",
  "First Quarter":
    "Time for action and overcoming challenges. Your willpower is strongest now.",
  "Waxing Gibbous":
    "Refinement and adjustment phase. Fine-tune your plans and seek clarity.",
  "Full Moon":
    "Maximum illumination and culmination. Celebrate achievements and release what no longer serves you.",
  "Waning Gibbous":
    "Share your wisdom. This is a time of gratitude and giving back.",
  "Last Quarter":
    "Introspection and letting go. Prepare for the new cycle ahead.",
  "Waning Crescent":
    "Rest and reflect. Quiet time for inner work and healing.",
};

interface AstroEvent {
  date: Date;
  type: "full" | "new" | "retrograde" | "eclipse";
  title: string;
  description: string;
}

// Hardcoded realistic upcoming events for 2026
const UPCOMING_EVENTS: AstroEvent[] = [
  {
    date: new Date(2026, 2, 15),
    type: "full",
    title: "Full Moon in Virgo",
    description: "A time for clarity, organization, and practical insights.",
  },
  {
    date: new Date(2026, 3, 1),
    type: "new",
    title: "New Moon in Aries",
    description: "Fresh starts and bold new initiatives. Time for courage.",
  },
  {
    date: new Date(2026, 3, 9),
    type: "retrograde",
    title: "Mercury Retrograde Begins",
    description: "Review, revise, and reconsider communications and tech.",
  },
  {
    date: new Date(2026, 4, 15),
    type: "full",
    title: "Full Moon in Scorpio",
    description: "Deep transformation and emotional release.",
  },
  {
    date: new Date(2026, 8, 19),
    type: "eclipse",
    title: "Solar Eclipse in Virgo",
    description: "New cycle of change and unexpected opportunities.",
  },
];

interface Retrograde {
  planet: string;
  status: "retrograde" | "direct";
  startDate: Date;
  endDate?: Date;
}

const CURRENT_RETROGRADES: Retrograde[] = [
  {
    planet: "Mercury",
    status: "retrograde",
    startDate: new Date(2026, 3, 9),
    endDate: new Date(2026, 3, 29),
  },
  {
    planet: "Venus",
    status: "direct",
    startDate: new Date(2026, 0, 1),
  },
  {
    planet: "Mars",
    status: "direct",
    startDate: new Date(2026, 0, 1),
  },
];

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

export default function MoonPage() {
  const today = new Date();
  const { phase, illumination, phaseName, phaseIndex } =
    useMemo(() => calculateMoonPhase(today), []);
  const moonSign = useMemo(() => getMoonSign(today), []);

  const upcomingEvents = useMemo(
    () =>
      UPCOMING_EVENTS.filter((event) => event.date > today).slice(0, 5),
    [today]
  );

  const interpretation = MOON_INTERPRETATIONS[phaseName];

  return (
    <div className="relative min-h-screen bg-cosmic-gradient pb-24">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 stars opacity-30" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-20 glass-strong border-b border-aurora-400/10 safe-top">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-aurora-400 to-rose-400 bg-clip-text text-transparent">
              Moon Phase Tracker
            </h1>
            <p className="text-white/60 mt-1">
              Align with lunar rhythms and cosmic events
            </p>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 space-y-10">
          {/* Current Moon Phase */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="glass-strong rounded-2xl p-8 border border-aurora-300/40 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-500/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <p className="text-white/70 text-sm uppercase tracking-wide text-center">
                Current Moon Phase
              </p>

              {/* Moon Visual */}
              <div className="flex justify-center my-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative w-40 h-40"
                >
                  {/* Moon circle */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-100 shadow-2xl">
                    {/* Moon shadow overlay to create phase effect */}
                    <div
                      className="absolute inset-0 rounded-full bg-cosmic-900"
                      style={{
                        clipPath: `polygon(
                          ${50 + 50 * Math.cos(phase * Math.PI * 2)}% 0%,
                          ${50 + 50 * Math.cos(phase * Math.PI * 2)}% 100%,
                          100% 100%,
                          100% 0%
                        )`,
                      }}
                    />
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-yellow-300/30 blur-3xl" />

                  {/* Illumination percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-white/80 font-semibold">
                        {illumination}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Phase Name and Details */}
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-white">{phaseName}</h2>
                <p className="text-white/60 leading-relaxed">{interpretation}</p>

                <div className="flex items-center justify-center gap-2 text-aurora-300 text-sm font-medium pt-2">
                  <Moon className="w-4 h-4" />
                  <span>Moon in {moonSign}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Retrograde Alerts */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <h2 className="text-lg font-semibold text-white mb-4">
              Planetary Status
            </h2>
            <div className="space-y-3">
              {CURRENT_RETROGRADES.map((retrograde, idx) => {
                const isRetrograde = retrograde.status === "retrograde";

                return (
                  <motion.div
                    key={retrograde.planet}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`glass rounded-lg p-4 border ${
                      isRetrograde
                        ? "border-rose-400/40 bg-rose-500/10"
                        : "border-jade-400/40 bg-jade-500/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isRetrograde ? "bg-rose-400" : "bg-jade-400"
                          } animate-pulse`}
                        />
                        <div>
                          <p className="font-semibold text-white">
                            {retrograde.planet}
                          </p>
                          <p className="text-xs text-white/60">
                            {isRetrograde
                              ? `Retrograde until ${retrograde.endDate?.toLocaleDateString()}`
                              : "Direct motion"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          isRetrograde
                            ? "bg-rose-500/30 text-rose-300"
                            : "bg-jade-500/30 text-jade-300"
                        }`}
                      >
                        {retrograde.status === "retrograde" ? "R" : "D"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-lg p-4 border border-orange-400/30 bg-orange-500/10 mt-3 flex gap-3 items-start"
            >
              <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-300">
                <p className="font-semibold">Mercury Retrograde Alert</p>
                <p className="text-orange-300/80 mt-1">
                  Mercury retrograde begins March 9. Review communications,
                  avoid major tech purchases, and double-check important
                  messages.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Upcoming Astro Events */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <h2 className="text-lg font-semibold text-white mb-4">
              Upcoming Events
            </h2>
            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => {
                const daysDiff = Math.ceil(
                  (event.date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
                );
                const issoon = daysDiff <= 7;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`glass rounded-lg p-4 border ${
                      issoon
                        ? "border-amber-400/40 bg-amber-500/10"
                        : "border-aurora-400/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {event.type === "full"
                              ? "🌕"
                              : event.type === "new"
                                ? "🌑"
                                : event.type === "eclipse"
                                  ? "🌑"
                                  : "↻"}
                          </span>
                          <p className="font-semibold text-white">
                            {event.title}
                          </p>
                        </div>
                        <p className="text-sm text-white/60">
                          {event.description}
                        </p>
                        <p className="text-xs text-white/40 mt-2">
                          {event.date.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      {issoon && (
                        <span className="text-xs font-semibold px-2 py-1 bg-amber-500/30 text-amber-300 rounded-full whitespace-nowrap">
                          {daysDiff} days
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Moon Astrology Info */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="glass rounded-2xl p-6 border border-aurora-400/20 bg-gradient-to-r from-aurora-500/10 to-rose-500/5"
          >
            <div className="space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Moon className="w-5 h-5" />
                About Lunar Cycles
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                The Moon completes its cycle every 29.5 days, from New Moon
                through Full Moon and back. Each phase carries distinct energy
                that influences us emotionally and spiritually. Track these
                natural rhythms to enhance your intuition and manifest your
                intentions.
              </p>
            </div>
          </motion.div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
