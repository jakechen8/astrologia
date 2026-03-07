"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles, ArrowRight, ArrowLeft, Phone, Mail, MapPin,
  Calendar, Clock, Sun, Moon, Star, Check, ChevronRight,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { computeChart } from "@/lib/astrology";

// ============================================================
// ONBOARDING — Multi-step flow
// ============================================================

const FOCUS_OPTIONS = [
  { label: "Love & Relationships", icon: "💕", value: "love" },
  { label: "Career & Growth", icon: "🚀", value: "career" },
  { label: "Money & Stability", icon: "💰", value: "money" },
  { label: "Family & Home", icon: "🏠", value: "family" },
  { label: "Self & Wellness", icon: "🧘", value: "self" },
];

const MOOD_LABELS = ["Rough", "Low", "Okay", "Good", "Great"];

const TONE_OPTIONS = [
  { label: "Gentle", desc: "Warm and nurturing", icon: "🌸", value: "gentle" },
  { label: "Direct", desc: "Clear and honest", icon: "⚡", value: "direct" },
  { label: "Playful", desc: "Fun and light", icon: "✨", value: "playful" },
  { label: "Spiritual", desc: "Deep and reflective", icon: "🕉️", value: "spiritual" },
];

const STEPS = ["Welcome", "Email", "Birth Data", "Focus", "Mood", "Tone", "Your Chart"];

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 w-full max-w-xs mx-auto">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-aurora-500 to-aurora-400"
            initial={{ width: 0 }}
            animate={{ width: i <= step ? "100%" : "0%" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          />
        </div>
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { setUser, setBirthProfile, setAstroChart, setLifeprint } = useStore();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [dob, setDob] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthTimeConfidence, setBirthTimeConfidence] = useState<"exact" | "approx" | "unknown">("exact");
  const [birthPlace, setBirthPlace] = useState("");
  const [focus, setFocus] = useState("");
  const [mood, setMood] = useState(3);
  const [tone, setTone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chart, setChart] = useState<ReturnType<typeof computeChart> | null>(null);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), []);
  const prev = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  const handleSendCode = () => {
    setCodeSent(true);
    // In production: POST /api/auth/magic-link with action "send"
  };

  const handleVerifyCode = () => {
    // In production: POST /api/auth/magic-link with action "verify"
    setUser({
      id: crypto.randomUUID(),
      email,
      phone: "",
      createdAt: new Date(),
      languagePref: "en",
      tonePref: "gentle",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      streak: 0,
      onboardingComplete: false,
    });
    next();
  };

  const handleBirthSubmit = () => {
    const chartData = computeChart(dob, birthTime || undefined);
    setChart(chartData);

    setBirthProfile({
      userId: "",
      dob,
      birthTime: birthTime || undefined,
      birthTimeConfidence,
      birthPlaceName: birthPlace,
      birthPlaceLat: 28.6139, // Default Delhi
      birthPlaceLng: 77.209,
    });

    setAstroChart({
      userId: "",
      western: chartData.western,
      vedic: chartData.vedic,
      chartJson: {},
      vedicJson: {},
      computedAt: new Date(),
    });

    next();
  };

  const handleComplete = () => {
    setIsLoading(true);
    setLifeprint({
      userId: "",
      traits: [
        { name: "autonomy", label: "Autonomy", score: 0.5, confidence: 0.2, evidencePointers: [], userEdited: false },
        { name: "warmth", label: "Warmth", score: 0.5, confidence: 0.2, evidencePointers: [], userEdited: false },
        { name: "ambition", label: "Ambition", score: 0.5, confidence: 0.2, evidencePointers: [], userEdited: false },
        { name: "risk_tolerance", label: "Risk Tolerance", score: 0.5, confidence: 0.2, evidencePointers: [], userEdited: false },
        { name: "intuition", label: "Intuition", score: 0.5, confidence: 0.2, evidencePointers: [], userEdited: false },
      ],
      currentState: {
        mood,
        energy: 3,
        stress: 3,
        focusArea: focus as "love" | "career" | "money" | "family" | "self",
      },
      updatedAt: new Date(),
    });

    setTimeout(() => {
      router.push("/today");
    }, 2000);
  };

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <main className="min-h-screen bg-cosmic-gradient relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-float" style={{ background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)", top: "10%", right: "-5%", filter: "blur(80px)" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", bottom: "20%", left: "-5%", filter: "blur(60px)", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button onClick={prev} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/5 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-10" />
            )}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold">AstraPulse</span>
            </div>
            <div className="w-10 text-xs text-white/30 text-right">
              {step + 1}/{STEPS.length}
            </div>
          </div>
          <ProgressBar step={step} total={STEPS.length} />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-5 pb-10">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {/* Step 0: Welcome */}
              {step === 0 && (
                <motion.div key="welcome" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="text-center space-y-8">
                  <div className="space-y-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center mx-auto glow-aurora">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">Welcome to AstraPulse</h1>
                    <p className="text-white/40 leading-relaxed max-w-sm mx-auto">
                      In 60 seconds, we&apos;ll create your personalized cosmic profile. It gets better every day.
                    </p>
                  </div>
                  <div className="space-y-3 text-left">
                    {["Your birth chart + first reading", "A daily 30-second ritual", "Readings that learn who you are"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 glass rounded-xl p-4">
                        <div className="w-8 h-8 rounded-lg bg-aurora-500/15 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-aurora-400" />
                        </div>
                        <span className="text-sm text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={next} className="w-full group flex items-center justify-center gap-2 bg-aurora-500 hover:bg-aurora-400 text-white font-semibold py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-aurora-500/25">
                    Let&apos;s begin <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-xs text-white/20">For reflection & entertainment · Privacy-first</p>
                </motion.div>
              )}

              {/* Step 1: Email Magic Link */}
              {step === 1 && (
                <motion.div key="email" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-xl bg-aurora-500/15 flex items-center justify-center mx-auto">
                      <Mail className="w-6 h-6 text-aurora-400" />
                    </div>
                    <h2 className="text-2xl font-bold">Quick sign in</h2>
                    <p className="text-white/40 text-sm">We&apos;ll send you a magic code</p>
                  </div>

                  {!codeSent ? (
                    <div className="space-y-4">
                      <div className="glass rounded-xl p-1 flex items-center">
                        <Mail className="w-4 h-4 text-white/30 ml-4" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 bg-transparent px-4 py-4 text-white outline-none text-sm placeholder:text-white/20"
                        />
                      </div>
                      <button onClick={handleSendCode} disabled={!email || !email.includes("@")} className="w-full bg-aurora-500 hover:bg-aurora-400 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all">
                        Send magic code
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-center text-sm text-white/40">Enter the 6-digit code sent to {email}</p>
                      <div className="flex gap-2 justify-center">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <input
                            key={i}
                            type="text"
                            maxLength={1}
                            value={code[i] || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (/^\d?$/.test(val)) {
                                const newCode = code.split("");
                                newCode[i] = val;
                                setCode(newCode.join(""));
                                if (val && i < 5) {
                                  const nextInput = e.target.parentElement?.children[i + 1] as HTMLInputElement;
                                  nextInput?.focus();
                                }
                              }
                            }}
                            className="w-12 h-14 glass rounded-xl text-center text-lg font-semibold outline-none focus:border-aurora-500 focus:ring-1 focus:ring-aurora-500/30 transition-all"
                          />
                        ))}
                      </div>
                      <button onClick={handleVerifyCode} disabled={code.length < 6} className="w-full bg-aurora-500 hover:bg-aurora-400 disabled:opacity-30 text-white font-semibold py-4 rounded-2xl transition-all">
                        Verify & Continue
                      </button>
                      <button onClick={() => { setCodeSent(false); setCode(""); }} className="text-xs text-white/30 hover:text-white/50 transition-colors mx-auto">
                        Didn&apos;t receive code? Resend
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Birth Data */}
              {step === 2 && (
                <motion.div key="birth" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-xl bg-ember-500/15 flex items-center justify-center mx-auto">
                      <Calendar className="w-6 h-6 text-ember-400" />
                    </div>
                    <h2 className="text-2xl font-bold">Your birth details</h2>
                    <p className="text-white/40 text-sm">This is the foundation of your chart</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-white/40 mb-1.5 block">Date of birth *</label>
                      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full glass rounded-xl px-4 py-3.5 text-white outline-none text-sm focus:ring-1 focus:ring-aurora-500/30 bg-transparent" />
                    </div>

                    <div>
                      <label className="text-xs text-white/40 mb-1.5 block">Place of birth *</label>
                      <div className="glass rounded-xl flex items-center">
                        <MapPin className="w-4 h-4 text-white/30 ml-4" />
                        <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="e.g., Mumbai, Delhi, Chennai" className="flex-1 bg-transparent px-3 py-3.5 text-white outline-none text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-white/40 mb-1.5 flex items-center gap-2 justify-between">
                        <span>Time of birth</span>
                        <select value={birthTimeConfidence} onChange={(e) => setBirthTimeConfidence(e.target.value as "exact" | "approx" | "unknown")} className="bg-transparent text-aurora-400 text-xs outline-none cursor-pointer">
                          <option value="exact" className="bg-cosmic-800">I know the exact time</option>
                          <option value="approx" className="bg-cosmic-800">Approximate</option>
                          <option value="unknown" className="bg-cosmic-800">I don&apos;t know</option>
                        </select>
                      </label>
                      {birthTimeConfidence !== "unknown" ? (
                        <div className="glass rounded-xl flex items-center">
                          <Clock className="w-4 h-4 text-white/30 ml-4" />
                          <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="flex-1 bg-transparent px-3 py-3.5 text-white outline-none text-sm" />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {["Morning", "Afternoon", "Evening", "Late Night"].map((t) => (
                            <button key={t} onClick={() => setBirthTime(t === "Morning" ? "08:00" : t === "Afternoon" ? "13:00" : t === "Evening" ? "18:00" : "23:00")} className={`glass rounded-xl py-3 text-sm hover:bg-white/5 transition-all ${birthTime && "border-aurora-500/30"}`}>
                              {t}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button onClick={handleBirthSubmit} disabled={!dob || !birthPlace} className="w-full bg-aurora-500 hover:bg-aurora-400 disabled:opacity-30 text-white font-semibold py-4 rounded-2xl transition-all">
                    Calculate my chart
                  </button>
                </motion.div>
              )}

              {/* Step 3: Focus */}
              {step === 3 && (
                <motion.div key="focus" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold">What are you focusing on?</h2>
                    <p className="text-white/40 text-sm">This helps us personalize from day one</p>
                  </div>

                  <div className="space-y-3">
                    {FOCUS_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => setFocus(opt.value)} className={`w-full flex items-center gap-4 glass rounded-xl p-4 text-left transition-all hover:bg-white/5 ${focus === opt.value ? "border-aurora-500/40 bg-aurora-500/5" : ""}`}>
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="text-sm font-medium">{opt.label}</span>
                        {focus === opt.value && <Check className="w-4 h-4 text-aurora-400 ml-auto" />}
                      </button>
                    ))}
                  </div>

                  <button onClick={next} disabled={!focus} className="w-full bg-aurora-500 hover:bg-aurora-400 disabled:opacity-30 text-white font-semibold py-4 rounded-2xl transition-all">
                    Continue
                  </button>
                </motion.div>
              )}

              {/* Step 4: Mood */}
              {step === 4 && (
                <motion.div key="mood" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold">How are you feeling today?</h2>
                    <p className="text-white/40 text-sm">No wrong answers</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between px-2">
                      {MOOD_LABELS.map((label, i) => (
                        <button key={i} onClick={() => setMood(i + 1)} className={`flex flex-col items-center gap-2 transition-all ${mood === i + 1 ? "scale-110" : "opacity-40 hover:opacity-70"}`}>
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${mood === i + 1 ? "glass-strong glow-aurora" : "glass"}`}>
                            {["😔", "😐", "🙂", "😊", "✨"][i]}
                          </div>
                          <span className="text-xs">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={next} className="w-full bg-aurora-500 hover:bg-aurora-400 text-white font-semibold py-4 rounded-2xl transition-all">
                    Continue
                  </button>
                </motion.div>
              )}

              {/* Step 5: Tone */}
              {step === 5 && (
                <motion.div key="tone" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold">How should your readings feel?</h2>
                    <p className="text-white/40 text-sm">You can change this anytime</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {TONE_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => setTone(opt.value)} className={`glass rounded-2xl p-5 text-left transition-all hover:bg-white/5 ${tone === opt.value ? "border-aurora-500/40 bg-aurora-500/5" : ""}`}>
                        <span className="text-2xl block mb-3">{opt.icon}</span>
                        <span className="text-sm font-semibold block">{opt.label}</span>
                        <span className="text-xs text-white/40">{opt.desc}</span>
                      </button>
                    ))}
                  </div>

                  <button onClick={next} disabled={!tone} className="w-full bg-aurora-500 hover:bg-aurora-400 disabled:opacity-30 text-white font-semibold py-4 rounded-2xl transition-all">
                    See my chart
                  </button>
                </motion.div>
              )}

              {/* Step 6: Chart Reveal */}
              {step === 6 && (
                <motion.div key="chart" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8 text-center">
                  {!isLoading ? (
                    <>
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold">Your Cosmic Blueprint</h2>
                        <p className="text-white/40 text-sm">Here&apos;s what the stars say about you</p>
                      </div>

                      {chart && (
                        <div className="space-y-4">
                          {/* Western Big 3 */}
                          <div className="glass-strong rounded-2xl p-6 glow-aurora">
                            <div className="text-xs text-aurora-300 font-medium mb-4 uppercase tracking-wider">Western · Your Big 3</div>
                            <div className="grid grid-cols-3 gap-4">
                              {[
                                { label: "Sun", value: chart.western.sunSign, icon: <Sun className="w-5 h-5" />, color: "text-gold-400" },
                                { label: "Moon", value: chart.western.moonSign, icon: <Moon className="w-5 h-5" />, color: "text-aurora-300" },
                                { label: "Rising", value: chart.western.risingSign, icon: <Star className="w-5 h-5" />, color: "text-ember-400" },
                              ].map((item, i) => (
                                <motion.div key={i} className="text-center space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
                                  <div className={`${item.color} mx-auto`}>{item.icon}</div>
                                  <div className="text-lg font-bold">{item.value}</div>
                                  <div className="text-xs text-white/40">{item.label}</div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Vedic */}
                          <div className="glass-strong rounded-2xl p-6">
                            <div className="text-xs text-ember-400 font-medium mb-4 uppercase tracking-wider">Vedic · Your Roots</div>
                            <div className="grid grid-cols-3 gap-4">
                              {[
                                { label: "Rashi", value: chart.vedic.rashi },
                                { label: "Nakshatra", value: chart.vedic.nakshatra },
                                { label: "Lagna", value: chart.vedic.lagna || "—" },
                              ].map((item, i) => (
                                <motion.div key={i} className="text-center space-y-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.2 }}>
                                  <div className="text-lg font-bold">{item.value}</div>
                                  <div className="text-xs text-white/40">{item.label}</div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <button onClick={handleComplete} className="w-full group flex items-center justify-center gap-2 bg-aurora-500 hover:bg-aurora-400 text-white font-semibold py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-aurora-500/25">
                        Get my first reading <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </>
                  ) : (
                    <div className="space-y-6 py-12">
                      <div className="w-16 h-16 rounded-full border-2 border-aurora-500 border-t-transparent animate-spin mx-auto" />
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-glow">Reading the stars...</h3>
                        <p className="text-sm text-white/40">Generating your personalized reading</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
