"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Star, Heart, Brain, ChevronDown, ChevronUp,
  Share2, Flame, Send, SkipForward, Lock, RefreshCw,
} from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";
import { useStore } from "@/store/useStore";
import { getQuestionForDay, QUESTION_BANK } from "@/lib/questions";
import { getDailyTransits, computeChart } from "@/lib/astrology";

// ============================================================
// TODAY SCREEN — The heart of the product
// ============================================================

const SAMPLE_READINGS = [
  {
    theme: "Softness is strength today",
    leanInto: [
      "You recharge through warmth and familiarity — let yourself be playful.",
      "The people who tease you are often the ones who see you most clearly.",
    ],
    watchFor: [
      "Taking feedback too personally.",
      "Overthinking a message that was meant with love.",
    ],
    tinyAction: "Send a 10-second voice note to someone you love. Keep it light.",
    reflectionPrompt: "What would it look like to let people in a little more this week?",
    explainAstro: [
      "Moon in Cancer emphasizes family and emotional roots",
      "Venus trine supports warmth in relationships today",
    ],
    explainYou: [
      "You light up when people you trust bring you back to yourself",
      "You said connection is what recharges you most",
    ],
  },
  {
    theme: "Trust the slow build",
    leanInto: [
      "You don't need to have it all figured out today.",
      "Small, consistent steps are building something real.",
    ],
    watchFor: [
      "Comparing your progress to someone else's highlight reel.",
      "Trying to force clarity before it's ready.",
    ],
    tinyAction: "Write down one thing that's working, even if it feels small.",
    reflectionPrompt: "Where in your life are you closer than you think?",
    explainAstro: [
      "Saturn rewards patience and consistent effort right now",
      "Mercury helps you organize scattered thoughts",
    ],
    explainYou: [
      "You've mentioned career growth is your focus area",
      "Your analytical side sometimes needs permission to trust the process",
    ],
  },
];

export default function TodayPage() {
  const { user, astroChart, hasAnsweredToday, setHasAnsweredToday, checkins, birthProfile } = useStore();
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showReading, setShowReading] = useState(hasAnsweredToday);
  const [showExplainer, setShowExplainer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const dayNumber = checkins.length + 1;
  const streak = user?.streak || dayNumber;
  const question = getQuestionForDay(dayNumber, checkins.map(c => c.questionId));
  const reading = SAMPLE_READINGS[dayNumber % SAMPLE_READINGS.length];
  const transits = getDailyTransits(new Date().toISOString());

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  })();

  const userName = user?.phone ? `+91 ${user.phone.slice(0, 4)}...` : "Explorer";

  const handleSubmit = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReading(true);
      setHasAnsweredToday(true);
    }, 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: `AstraPulse · ${reading.theme}`,
      text: `${reading.theme}\n\n${reading.tinyAction}\n\nGet your reading: astrapulse.app`,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(
        `✨ ${reading.theme}\n\n${reading.tinyAction}\n\nGet your reading at astrapulse.app`
      );
    }
  };

  return (
    <main className="min-h-screen bg-cosmic-gradient pb-24">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)", top: "-5%", right: "-10%", filter: "blur(80px)" }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5">
        {/* Header */}
        <div className="pt-6 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{greeting}</h1>
              <p className="text-sm text-white/40">{new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs">
                <Flame className="w-3.5 h-3.5 text-ember-400" />
                <span className="text-ember-400 font-bold">{streak}</span>
              </div>
            </div>
          </div>

          {/* Transit bar */}
          <div className="glass rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-aurora-500/15 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 text-aurora-400" />
            </div>
            <div className="text-xs text-white/40 leading-relaxed">
              {transits.highlights[0]}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Question Card */}
          {!showReading && !isGenerating && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="glass-strong rounded-3xl p-6 glow-aurora">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-aurora-300 font-medium uppercase tracking-wider">
                    Day {dayNumber} · Daily Question
                  </div>
                  <div className="text-xs text-white/20">
                    {question.category.replace("_", " & ")}
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-6 leading-relaxed">
                  {question.text}
                </h2>

                {question.answerType === "mcq" && question.options ? (
                  <div className="space-y-2.5 mb-6">
                    {question.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full text-left glass rounded-xl p-4 text-sm transition-all hover:bg-white/5 ${
                          selectedOption === opt
                            ? "border-aurora-500/40 bg-aurora-500/10 text-white"
                            : "text-white/60"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : question.answerType === "slider" ? (
                  <div className="space-y-4 mb-6">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={answer || "3"}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full accent-aurora-500"
                    />
                    <div className="flex justify-between text-xs text-white/30">
                      <span>Not at all</span>
                      <span>Very much</span>
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-aurora-500/30 resize-none mb-4"
                  />
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSubmit}
                    disabled={!answer && !selectedOption}
                    className="flex-1 flex items-center justify-center gap-2 bg-aurora-500 hover:bg-aurora-400 disabled:opacity-30 text-white font-semibold py-3.5 rounded-xl transition-all"
                  >
                    <Send className="w-4 h-4" /> Submit
                  </button>
                  <button
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isPrivate ? "glass-strong text-aurora-400" : "glass text-white/30"
                    }`}
                    title="Mark as private"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                </div>

                {/* Secondary actions */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button className="text-xs text-white/20 hover:text-white/40 flex items-center gap-1 transition-colors">
                    <SkipForward className="w-3 h-3" /> Skip
                  </button>
                  <button className="text-xs text-white/20 hover:text-white/40 flex items-center gap-1 transition-colors">
                    <RefreshCw className="w-3 h-3" /> Different question
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Generating Animation */}
          {isGenerating && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-strong rounded-3xl p-12 text-center space-y-6"
            >
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-aurora-500/30 animate-spin-slow" />
                <div className="absolute inset-2 rounded-full border-2 border-ember-400/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-aurora-400 animate-pulse-soft" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-glow">Reading the stars...</h3>
                <p className="text-sm text-white/30 mt-1">Weaving your answer into today&apos;s reading</p>
              </div>
            </motion.div>
          )}

          {/* Reading */}
          {showReading && !isGenerating && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Theme card */}
              <div className="glass-strong rounded-3xl p-6 glow-aurora">
                <div className="text-xs text-ember-400 font-medium mb-2">
                  {astroChart ? `${astroChart.western.sunSign}` : "♈"} · Day {dayNumber}
                </div>
                <h2 className="text-2xl font-bold text-glow mb-1">
                  {reading.theme}
                </h2>
              </div>

              {/* Lean into */}
              <div className="bg-card-gradient rounded-2xl p-5">
                <div className="text-xs text-jade-400 font-medium mb-3 uppercase tracking-wider">Lean into</div>
                <div className="space-y-2.5">
                  {reading.leanInto.map((item, i) => (
                    <p key={i} className="text-sm text-white/70 leading-relaxed">{item}</p>
                  ))}
                </div>
              </div>

              {/* Watch for */}
              <div className="bg-card-gradient rounded-2xl p-5">
                <div className="text-xs text-ember-400 font-medium mb-3 uppercase tracking-wider">Watch for</div>
                <div className="space-y-2.5">
                  {reading.watchFor.map((item, i) => (
                    <p key={i} className="text-sm text-white/70 leading-relaxed">{item}</p>
                  ))}
                </div>
              </div>

              {/* Tiny action */}
              <div className="glass-strong rounded-2xl p-5 border border-aurora-500/10">
                <div className="text-xs text-aurora-300 font-medium mb-3 uppercase tracking-wider">Try this today</div>
                <p className="text-sm text-white/80 leading-relaxed font-medium">{reading.tinyAction}</p>
              </div>

              {/* Reflection */}
              <div className="glass rounded-2xl p-5">
                <div className="text-xs text-white/30 font-medium mb-3 uppercase tracking-wider">Reflect</div>
                <p className="text-sm text-white/50 leading-relaxed italic">{reading.reflectionPrompt}</p>
              </div>

              {/* Explainability */}
              <button
                onClick={() => setShowExplainer(!showExplainer)}
                className="w-full glass rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Brain className="w-4 h-4 text-aurora-400" />
                  Why this reading?
                </div>
                {showExplainer ? (
                  <ChevronUp className="w-4 h-4 text-white/30" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/30" />
                )}
              </button>

              <AnimatePresence>
                {showExplainer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass rounded-2xl p-5 space-y-4 overflow-hidden"
                  >
                    <div className="space-y-2.5">
                      <div className="text-xs text-aurora-300 font-medium uppercase tracking-wider">Astrology factors</div>
                      {reading.explainAstro.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                          <Star className="w-3.5 h-3.5 mt-0.5 shrink-0 text-aurora-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="space-y-2.5">
                      <div className="text-xs text-rose-400 font-medium uppercase tracking-wider">About you</div>
                      {reading.explainYou.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                          <Heart className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Share */}
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 glass-strong rounded-2xl py-4 text-sm font-medium text-aurora-400 hover:bg-white/5 transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share today&apos;s card
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </main>
  );
}
