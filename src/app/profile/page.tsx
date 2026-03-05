"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun, Moon, Star, Edit3, ChevronRight, Sparkles,
  Heart, Zap, Shield, Compass, Brain, Eye,
} from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";
import { useStore } from "@/store/useStore";

// ============================================================
// PROFILE / LIFEPRINT — The living user model
// ============================================================

const DEFAULT_TRAITS = [
  { name: "Autonomy", score: 0.7, confidence: 0.4, icon: <Compass className="w-4 h-4" />, color: "aurora" },
  { name: "Warmth", score: 0.8, confidence: 0.6, icon: <Heart className="w-4 h-4" />, color: "rose" },
  { name: "Ambition", score: 0.6, confidence: 0.35, icon: <Zap className="w-4 h-4" />, color: "ember" },
  { name: "Risk Tolerance", score: 0.45, confidence: 0.3, icon: <Shield className="w-4 h-4" />, color: "jade" },
  { name: "Intuition", score: 0.75, confidence: 0.5, icon: <Brain className="w-4 h-4" />, color: "aurora" },
  { name: "Openness", score: 0.65, confidence: 0.45, icon: <Eye className="w-4 h-4" />, color: "ember" },
];

const MEMORIES = [
  { type: "Favorite song", value: "Tum Hi Ho — Arijit Singh", date: "Day 3" },
  { type: "Comfort food", value: "Mom's rajma chawal", date: "Day 5" },
  { type: "Happy place", value: "Marine Drive at sunset", date: "Day 7" },
  { type: "Recharge activity", value: "Long walks with music", date: "Day 9" },
  { type: "Current goal", value: "Start my own thing by 30", date: "Day 11" },
];

function RadarChart({ traits }: { traits: typeof DEFAULT_TRAITS }) {
  const size = 200;
  const center = size / 2;
  const levels = 4;
  const angleSlice = (Math.PI * 2) / traits.length;

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Grid circles */}
      {Array.from({ length: levels }).map((_, i) => {
        const r = ((i + 1) / levels) * (size / 2 - 20);
        return (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axes */}
      {traits.map((_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = center + Math.cos(angle) * (size / 2 - 20);
        const y = center + Math.sin(angle) * (size / 2 - 20);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        points={traits
          .map((t, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const r = t.score * (size / 2 - 20);
            return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
          })
          .join(" ")}
        fill="rgba(124, 91, 240, 0.15)"
        stroke="rgba(124, 91, 240, 0.6)"
        strokeWidth="2"
      />

      {/* Data points */}
      {traits.map((t, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const r = t.score * (size / 2 - 20);
        return (
          <circle
            key={i}
            cx={center + Math.cos(angle) * r}
            cy={center + Math.sin(angle) * r}
            r="4"
            fill="#7c5bf0"
            stroke="white"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Labels */}
      {traits.map((t, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const labelR = size / 2 - 5;
        const x = center + Math.cos(angle) * labelR;
        const y = center + Math.sin(angle) * labelR;
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white/40 text-[9px]"
          >
            {t.name}
          </text>
        );
      })}
    </svg>
  );
}

export default function ProfilePage() {
  const { astroChart, lifeprint, birthProfile } = useStore();
  const [activeTab, setActiveTab] = useState<"chart" | "lifeprint" | "memories">("lifeprint");

  const chart = astroChart || {
    western: { sunSign: "Aries", moonSign: "Cancer", risingSign: "Libra" },
    vedic: { rashi: "Meena", nakshatra: "Revati", lagna: "Tula" },
  };

  return (
    <main className="min-h-screen bg-cosmic-gradient pb-24">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)", top: "5%", left: "-10%", filter: "blur(70px)" }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5">
        {/* Header */}
        <div className="pt-6 pb-4">
          <h1 className="text-2xl font-bold mb-1">Your Profile</h1>
          <p className="text-sm text-white/40">What we&apos;ve learned about you</p>
        </div>

        {/* Chart Summary */}
        <div className="glass-strong rounded-2xl p-5 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-aurora-300 font-medium mb-3 uppercase tracking-wider">Western</div>
              <div className="space-y-2">
                {[
                  { label: "Sun", value: chart.western.sunSign, icon: <Sun className="w-3.5 h-3.5 text-gold-400" /> },
                  { label: "Moon", value: chart.western.moonSign, icon: <Moon className="w-3.5 h-3.5 text-aurora-300" /> },
                  { label: "Rising", value: chart.western.risingSign, icon: <Star className="w-3.5 h-3.5 text-ember-400" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {item.icon}
                    <span className="text-white/40">{item.label}</span>
                    <span className="font-medium ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-ember-400 font-medium mb-3 uppercase tracking-wider">Vedic</div>
              <div className="space-y-2">
                {[
                  { label: "Rashi", value: chart.vedic.rashi },
                  { label: "Nakshatra", value: chart.vedic.nakshatra },
                  { label: "Lagna", value: chart.vedic.lagna || "—" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-white/40">{item.label}</span>
                    <span className="font-medium ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 glass rounded-xl p-1 mb-4">
          {(["lifeprint", "chart", "memories"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab ? "bg-aurora-500/15 text-aurora-400" : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab === "lifeprint" ? "Lifeprint" : tab === "chart" ? "Birth Chart" : "Memories"}
            </button>
          ))}
        </div>

        {/* Lifeprint Tab */}
        {activeTab === "lifeprint" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Radar */}
            <div className="glass-strong rounded-2xl p-6 glow-aurora">
              <div className="text-xs text-aurora-300 font-medium mb-4 uppercase tracking-wider text-center">
                Your Lifeprint
              </div>
              <RadarChart traits={DEFAULT_TRAITS} />
            </div>

            {/* Current state */}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-white/30 font-medium mb-3 uppercase tracking-wider">Current State</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Mood", value: "Good", emoji: "😊" },
                  { label: "Energy", value: "Medium", emoji: "⚡" },
                  { label: "Stress", value: "Low", emoji: "🧘" },
                ].map((item, i) => (
                  <div key={i} className="text-center glass rounded-xl p-3">
                    <div className="text-xl mb-1">{item.emoji}</div>
                    <div className="text-xs font-medium">{item.value}</div>
                    <div className="text-[10px] text-white/30">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trait bars */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/30 font-medium uppercase tracking-wider">Stable Traits</div>
                <button className="text-xs text-aurora-400 flex items-center gap-1">
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>
              {DEFAULT_TRAITS.map((trait, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      {trait.icon}
                      <span>{trait.name}</span>
                    </div>
                    <span className="text-xs text-white/20">{Math.round(trait.confidence * 100)}% confident</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        trait.color === "aurora" ? "bg-aurora-500" :
                        trait.color === "rose" ? "bg-rose-500" :
                        trait.color === "ember" ? "bg-ember-500" :
                        "bg-jade-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${trait.score * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chart Tab */}
        {activeTab === "chart" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-xs text-aurora-300 font-medium mb-4 uppercase tracking-wider">Full Birth Chart</div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Sun Sign", value: chart.western.sunSign, icon: <Sun className="w-5 h-5 text-gold-400" /> },
                  { label: "Moon Sign", value: chart.western.moonSign, icon: <Moon className="w-5 h-5 text-aurora-300" /> },
                  { label: "Rising", value: chart.western.risingSign, icon: <Star className="w-5 h-5 text-ember-400" /> },
                ].map((item, i) => (
                  <div key={i} className="text-center glass rounded-xl p-4 space-y-2">
                    <div className="mx-auto">{item.icon}</div>
                    <div className="font-bold">{item.value}</div>
                    <div className="text-xs text-white/30">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="text-xs text-ember-400 font-medium mb-4 uppercase tracking-wider">Vedic Details</div>
              <div className="space-y-3">
                {[
                  { label: "Moon Sign (Rashi)", value: chart.vedic.rashi, desc: "Your emotional nature in Vedic astrology" },
                  { label: "Birth Star (Nakshatra)", value: chart.vedic.nakshatra, desc: "Your birth constellation — reveals deeper patterns" },
                  { label: "Ascendant (Lagna)", value: chart.vedic.lagna || "Need birth time", desc: "How the world sees you" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between glass rounded-xl p-4">
                    <div>
                      <div className="text-sm font-medium">{item.value}</div>
                      <div className="text-xs text-white/30">{item.label}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </div>
                ))}
              </div>
            </div>

            {birthProfile && (
              <div className="glass rounded-2xl p-5 text-xs text-white/30 space-y-1">
                <div>Born: {new Date(birthProfile.dob).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</div>
                <div>Place: {birthProfile.birthPlaceName}</div>
                <div>Time confidence: {birthProfile.birthTimeConfidence}</div>
              </div>
            )}
          </motion.div>
        )}

        {/* Memories Tab */}
        {activeTab === "memories" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-white/30 font-medium mb-3 uppercase tracking-wider">
                Your Library · {MEMORIES.length} memories
              </div>
              <div className="space-y-3">
                {MEMORIES.map((mem, i) => (
                  <motion.div
                    key={i}
                    className="glass rounded-xl p-4 flex items-center justify-between group hover:bg-white/[0.04] transition-all"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div>
                      <div className="text-xs text-aurora-300 mb-1">{mem.type}</div>
                      <div className="text-sm">{mem.value}</div>
                    </div>
                    <div className="text-xs text-white/20">{mem.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/20 text-center px-4">
              These memories help your readings feel personal. You can edit or delete any of them.
            </p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
