"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Heart, ArrowRight, Star, Zap, Shield, MessageCircle, RefreshCw } from "lucide-react";
import { getSunSign } from "@/lib/astrology";

const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const SIGN_EMOJIS: Record<string, string> = { Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓" };

const COMPATIBILITY_DATA: Record<string, Record<string, { score: number; vibe: string; strengths: string[]; challenges: string[]; advice: string }>> = {
  Aries: {
    Aries: { score: 75, vibe: "Fire meets fire", strengths: ["Shared energy and ambition", "Never a dull moment"], challenges: ["Power struggles", "Both want to lead"], advice: "Take turns being the hero." },
    Leo: { score: 92, vibe: "Royal power couple", strengths: ["Mutual admiration", "Shared confidence", "Creative sparks"], challenges: ["Ego clashes possible"], advice: "Keep cheering each other on." },
    Cancer: { score: 55, vibe: "Push and pull", strengths: ["Aries protects, Cancer nurtures"], challenges: ["Different emotional speeds", "Aries can feel smothered"], advice: "Meet in the middle on emotional pace." },
    Libra: { score: 70, vibe: "Opposites attract", strengths: ["Balance each other beautifully"], challenges: ["Different decision-making styles"], advice: "Libra, decide faster. Aries, slow down sometimes." },
  },
  Cancer: {
    Cancer: { score: 85, vibe: "Deep ocean of feelings", strengths: ["Emotional understanding", "Home-building energy"], challenges: ["Can amplify moods"], advice: "Create rituals that ground you both." },
    Scorpio: { score: 95, vibe: "Soul-level connection", strengths: ["Intense emotional bond", "Unwavering loyalty", "Intuitive understanding"], challenges: ["Jealousy potential"], advice: "Trust each other fully or not at all." },
    Capricorn: { score: 88, vibe: "Builder couple", strengths: ["Security-oriented", "Complementary strengths"], challenges: ["Cap can seem emotionally distant"], advice: "Cancer, be patient. Cap shows love through action." },
  },
  Leo: {
    Leo: { score: 80, vibe: "Double spotlight", strengths: ["Shared generosity", "Theatrical romance"], challenges: ["Who gets more attention?"], advice: "The world has room for two stars." },
    Sagittarius: { score: 90, vibe: "Adventure mode activated", strengths: ["Shared optimism", "Love of life", "Growth-oriented"], challenges: ["Sag needs freedom, Leo needs devotion"], advice: "Travel together. Grow together." },
    Aquarius: { score: 72, vibe: "Creative tension", strengths: ["Both are strong individuals"], challenges: ["Leo wants warmth, Aquarius wants space"], advice: "Respect each other's fundamentally different wiring." },
  },
};

function getCompatibility(sign1: string, sign2: string) {
  const data = COMPATIBILITY_DATA[sign1]?.[sign2] || COMPATIBILITY_DATA[sign2]?.[sign1];
  if (data) return data;
  // Generate fallback
  const elements: Record<string, string> = { Aries: "fire", Taurus: "earth", Gemini: "air", Cancer: "water", Leo: "fire", Virgo: "earth", Libra: "air", Scorpio: "water", Sagittarius: "fire", Capricorn: "earth", Aquarius: "air", Pisces: "water" };
  const e1 = elements[sign1], e2 = elements[sign2];
  const sameElement = e1 === e2;
  const compatible = (e1 === "fire" && e2 === "air") || (e1 === "air" && e2 === "fire") || (e1 === "earth" && e2 === "water") || (e1 === "water" && e2 === "earth");
  return {
    score: sameElement ? 82 : compatible ? 78 : sign1 === sign2 ? 80 : 65,
    vibe: sameElement ? "Kindred spirits" : compatible ? "Natural harmony" : "Growth through difference",
    strengths: sameElement ? ["Deep understanding", "Shared values"] : compatible ? ["Complementary energies", "Natural balance"] : ["Push each other to grow", "Never boring"],
    challenges: sameElement ? ["Can amplify blind spots"] : compatible ? ["May take each other for granted"] : ["Fundamentally different needs", "Requires more effort"],
    advice: sameElement ? "Don't forget to challenge each other." : compatible ? "Keep the spark alive with novelty." : "Your differences are features, not bugs.",
  };
}

export default function CompatibilityPage() {
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");
  const [result, setResult] = useState<ReturnType<typeof getCompatibility> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCheck = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setResult(getCompatibility(sign1, sign2));
      setIsCalculating(false);
    }, 1500);
  };

  const handleReset = () => {
    setSign1("");
    setSign2("");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-cosmic-gradient">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-float" style={{ background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)", top: "10%", right: "-5%", filter: "blur(80px)" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)", bottom: "20%", left: "-5%", filter: "blur(60px)", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5">
        {/* Nav */}
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Astra<span className="text-aurora-400">Pulse</span></span>
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-aurora-500 flex items-center justify-center mx-auto mb-4 glow-aurora">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Compatibility Check</h1>
          <p className="text-white/40 text-sm">How do your stars align? Pick two signs to find out.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result && !isCalculating && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* Sign 1 */}
              <div className="space-y-2">
                <label className="text-xs text-white/30 font-medium uppercase tracking-wider">Your sign</label>
                <div className="grid grid-cols-4 gap-2">
                  {SIGNS.map((sign) => (
                    <button key={sign} onClick={() => setSign1(sign)} className={`glass rounded-xl py-3 text-center transition-all ${sign1 === sign ? "border-aurora-500/40 bg-aurora-500/10" : "hover:bg-white/5"}`}>
                      <div className="text-lg">{SIGN_EMOJIS[sign]}</div>
                      <div className="text-[10px] text-white/40 mt-1">{sign}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sign 2 */}
              <div className="space-y-2">
                <label className="text-xs text-white/30 font-medium uppercase tracking-wider">Their sign</label>
                <div className="grid grid-cols-4 gap-2">
                  {SIGNS.map((sign) => (
                    <button key={sign} onClick={() => setSign2(sign)} className={`glass rounded-xl py-3 text-center transition-all ${sign2 === sign ? "border-rose-500/40 bg-rose-500/10" : "hover:bg-white/5"}`}>
                      <div className="text-lg">{SIGN_EMOJIS[sign]}</div>
                      <div className="text-[10px] text-white/40 mt-1">{sign}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleCheck} disabled={!sign1 || !sign2} className="w-full bg-gradient-to-r from-rose-500 to-aurora-500 hover:opacity-90 disabled:opacity-30 text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" /> Check Compatibility
              </button>
            </motion.div>
          )}

          {isCalculating && (
            <motion.div key="calc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-strong rounded-3xl p-12 text-center space-y-6">
              <div className="flex items-center justify-center gap-6">
                <div className="text-4xl animate-pulse-soft">{SIGN_EMOJIS[sign1]}</div>
                <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
                <div className="text-4xl animate-pulse-soft">{SIGN_EMOJIS[sign2]}</div>
              </div>
              <p className="text-sm text-white/40">Reading the cosmic chemistry...</p>
            </motion.div>
          )}

          {result && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Score */}
              <div className="glass-strong rounded-3xl p-6 text-center glow-aurora">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-4xl">{SIGN_EMOJIS[sign1]}</div>
                  <div className="text-rose-400 text-2xl">+</div>
                  <div className="text-4xl">{SIGN_EMOJIS[sign2]}</div>
                </div>
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-aurora-400">
                  {result.score}%
                </div>
                <p className="text-lg font-medium text-white/70 mb-1">{result.vibe}</p>
                <p className="text-xs text-white/30">{sign1} + {sign2}</p>
              </div>

              {/* Details */}
              <div className="bg-card-gradient rounded-2xl p-5">
                <div className="text-xs text-jade-400 font-medium mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3 h-3" /> Strengths
                </div>
                {result.strengths.map((s, i) => (
                  <p key={i} className="text-sm text-white/60 mb-1.5">{s}</p>
                ))}
              </div>

              <div className="bg-card-gradient rounded-2xl p-5">
                <div className="text-xs text-ember-400 font-medium mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3 h-3" /> Challenges
                </div>
                {result.challenges.map((c, i) => (
                  <p key={i} className="text-sm text-white/60 mb-1.5">{c}</p>
                ))}
              </div>

              <div className="glass-strong rounded-2xl p-5">
                <div className="text-xs text-aurora-300 font-medium mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-3 h-3" /> Cosmic Advice
                </div>
                <p className="text-sm text-white/70 font-medium">{result.advice}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={handleReset} className="flex-1 glass rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                  <RefreshCw className="w-4 h-4" /> Try another pair
                </button>
                <Link href="/onboarding" className="flex-1 bg-aurora-500 hover:bg-aurora-400 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all">
                  <Star className="w-4 h-4" /> Go deeper
                </Link>
              </div>

              <p className="text-xs text-white/15 text-center">
                Sun sign compatibility is a starting point. AstraPulse uses Moon, Venus, and lived experience for deeper insights.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
