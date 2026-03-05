"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MessageCircle, Lock } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

// ============================================================
// TIMELINE — Calendar view + history
// ============================================================

const SAMPLE_HISTORY = [
  { date: "2026-03-04", question: "What song have you had on repeat lately?", answer: "Tum Hi Ho by Arijit Singh — it never gets old", theme: "Let familiar comfort anchor you", private: false },
  { date: "2026-03-03", question: "Pick your ideal weekend vibe:", answer: "With close friends", theme: "Connection fuels your spark", private: false },
  { date: "2026-03-02", question: "What's a comfort food that always hits?", answer: "Mom's rajma chawal, obviously", theme: "Roots give you wings", private: false },
  { date: "2026-03-01", question: "Morning person or night owl?", answer: "Night owl — my best ideas come at 2am", theme: "Honor your natural rhythm", private: true },
  { date: "2026-02-28", question: "What's a place that makes you feel most alive?", answer: "Marine Drive at sunset, watching the waves", theme: "Nature resets your soul", private: false },
  { date: "2026-02-27", question: "What matters more to you — freedom or stability?", answer: "Freedom, but I'm realizing I need some stability too", theme: "Balance isn't compromise, it's wisdom", private: false },
  { date: "2026-02-26", question: "How do you usually show love to people closest to you?", answer: "Quality time — just being there", theme: "Presence is your superpower", private: false },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function TimelinePage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // March
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const activeDates = SAMPLE_HISTORY.map(h => h.date);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const selectedEntry = SAMPLE_HISTORY.find(h => h.date === selectedDate);

  return (
    <main className="min-h-screen bg-cosmic-gradient pb-24">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", bottom: "20%", right: "-5%", filter: "blur(60px)" }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5">
        {/* Header */}
        <div className="pt-6 pb-4">
          <h1 className="text-2xl font-bold mb-1">Timeline</h1>
          <p className="text-sm text-white/40">Your journey, day by day</p>
        </div>

        {/* Calendar */}
        <div className="glass-strong rounded-2xl p-5 mb-4">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/5 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold">
              {MONTHS[month]} {year}
            </span>
            <button onClick={nextMonth} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/5 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] text-white/20 font-medium">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isActive = activeDates.includes(dateStr);
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === new Date().toISOString().split("T")[0];

              return (
                <button
                  key={day}
                  onClick={() => isActive ? setSelectedDate(dateStr) : null}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs transition-all relative ${
                    isSelected ? "bg-aurora-500 text-white font-bold" :
                    isActive ? "glass text-white hover:bg-white/5 cursor-pointer" :
                    "text-white/15 cursor-default"
                  }`}
                >
                  {day}
                  {isActive && !isSelected && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-aurora-400" />
                  )}
                  {isToday && !isSelected && (
                    <div className="absolute inset-0 rounded-lg border border-aurora-500/30" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-white/20">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-aurora-400" />
              Check-in day
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded border border-aurora-500/30" />
              Today
            </div>
          </div>
        </div>

        {/* Selected day detail */}
        <AnimatePresence mode="wait">
          {selectedEntry ? (
            <motion.div
              key={selectedDate}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-strong rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-aurora-300 font-medium">
                  {new Date(selectedEntry.date).toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
                </span>
                {selectedEntry.private && (
                  <span className="flex items-center gap-1 text-xs text-white/20">
                    <Lock className="w-3 h-3" /> Private
                  </span>
                )}
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-aurora-400 mt-0.5 shrink-0" />
                  <div className="text-sm text-white/50">{selectedEntry.question}</div>
                </div>
                <div className="text-sm font-medium ml-6">{selectedEntry.answer}</div>
              </div>

              <div className="bg-card-gradient rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs text-ember-400 font-medium mb-2">
                  <Star className="w-3.5 h-3.5" />
                  Reading Theme
                </div>
                <p className="text-sm text-white/70">{selectedEntry.theme}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-white/20 text-sm"
            >
              Tap a highlighted day to see your check-in
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weekly recap */}
        <div className="mt-4 glass rounded-2xl p-5">
          <div className="text-xs text-jade-400 font-medium mb-3 uppercase tracking-wider">This week in you</div>
          <div className="space-y-3 text-sm text-white/50">
            <p>You checked in 5 out of 7 days this week. Your mood has been trending upward, and connection themes keep surfacing.</p>
            <p>Pattern spotted: You light up when talking about family and close friends. Your readings have been leaning into that warmth.</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
