"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Brain,
  Heart,
  Zap,
  Star,
  ChevronDown,
  MessageCircle,
  Share2,
} from "lucide-react";

// ============================================================
// LANDING PAGE — World-class, conversion-focused
// ============================================================

const DEMO_READINGS = [
  {
    theme: "Softness is strength today",
    sign: "♈ Aries",
    action: "Send a 10-second voice note to someone you love. Keep it light.",
    why: "Moon emphasizes warmth · You recharge through connection",
  },
  {
    theme: "Trust your quiet knowing",
    sign: "♋ Cancer",
    action: "Write one thing you're sure about, even if no one else sees it.",
    why: "Mercury meets intuition · You said you trust your gut",
  },
  {
    theme: "Progress without pressure",
    sign: "♑ Capricorn",
    action: "Do one small thing toward that goal. No need to finish today.",
    why: "Saturn rewards patience · Your focus: career growth",
  },
];

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 animate-float"
        style={{
          background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-float"
        style={{
          background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          bottom: "10%",
          left: "-5%",
          filter: "blur(80px)",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-float"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          top: "40%",
          left: "50%",
          filter: "blur(60px)",
          animationDelay: "5s",
        }}
      />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Astra<span className="text-aurora-400">Pulse</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <Link href="/compatibility" className="hover:text-white transition-colors">Compatibility</Link>
          <Link href="/moon" className="hover:text-white transition-colors">Moon</Link>
          <Link href="/memes" className="hover:text-white transition-colors">Memes</Link>
          <Link href="/astrologers" className="hover:text-white transition-colors">Astrologers</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/pricing" className="text-aurora-400 hover:text-aurora-300 transition-colors">Pro</Link>
        </div>

        <Link
          href="/onboarding"
          className="bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-aurora-500/20 active:scale-95"
        >
          Get your reading
        </Link>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const [currentReading, setCurrentReading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReading((p) => (p + 1) % DEMO_READINGS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 pt-20 stars">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-aurora-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
            Vedic + Western astrology, powered by AI
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            Astrology that
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aurora-400 via-aurora-300 to-ember-400">
              actually knows you
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-lg leading-relaxed">
            A 30-second daily ritual that learns who you are, then turns your
            birth chart into guidance so personal it feels like magic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/onboarding"
              className="group inline-flex items-center justify-center gap-2 bg-aurora-500 hover:bg-aurora-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-aurora-500/25 active:scale-[0.98]"
            >
              Get your free reading
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 glass hover:bg-white/5 text-white/70 font-medium px-8 py-4 rounded-2xl transition-all"
            >
              See how it works
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/30">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Private & secure
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> 30 seconds daily
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" /> Free forever
            </div>
          </div>
        </motion.div>

        {/* Right — Demo card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative rounded-[2.5rem] overflow-hidden glass-strong p-6 glow-aurora">
              <div className="flex items-center justify-between mb-6 text-xs text-white/40">
                <span>9:41</span>
                <div className="w-4 h-2 rounded-sm border border-white/30" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <div className="text-xs text-ember-400 font-medium">
                    {DEMO_READINGS[currentReading].sign} · Today
                  </div>
                  <h3 className="text-2xl font-bold leading-tight text-glow">
                    {DEMO_READINGS[currentReading].theme}
                  </h3>
                  <div className="bg-card-gradient rounded-2xl p-4 space-y-3">
                    <div className="text-xs text-aurora-300 font-medium uppercase tracking-wider">
                      Try this today
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {DEMO_READINGS[currentReading].action}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-white/30">
                    <Brain className="w-3.5 h-3.5 mt-0.5 shrink-0 text-aurora-400" />
                    <span>{DEMO_READINGS[currentReading].why}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2 mt-6">
                {DEMO_READINGS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === currentReading ? "w-6 bg-aurora-400" : "w-1 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-3 text-xs"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-jade-500/20 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-jade-400" />
                </div>
                <div>
                  <div className="text-jade-400 font-semibold">Day 12</div>
                  <div className="text-white/30">Streak active</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: <MessageCircle className="w-6 h-6" />, title: "Answer one question", desc: "30 seconds. Fun at first, deeper over time. Your answers build a living portrait of who you are.", color: "aurora" },
    { icon: <Brain className="w-6 h-6" />, title: "We learn you", desc: "Not just your birth chart — your values, your mood, your dreams. A Lifeprint that grows with you.", color: "ember" },
    { icon: <Star className="w-6 h-6" />, title: "Get a reading that sees you", desc: "Not generic horoscope energy. Guidance that cites your life, explains its logic, and respects your agency.", color: "jade" },
    { icon: <Share2 className="w-6 h-6" />, title: "Share your card", desc: "Beautiful daily cards for WhatsApp and Instagram. No personal data — just your cosmic theme.", color: "rose" },
  ];

  return (
    <section id="how-it-works" className="relative py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-aurora-400 text-sm font-medium mb-3 uppercase tracking-wider">How it works</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            30 seconds. Every morning.<br />
            <span className="text-white/40">That&apos;s the whole ritual.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div key={i} className="relative group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="glass rounded-2xl p-6 h-full hover:bg-white/[0.04] transition-all duration-300">
                <div className="text-xs text-white/20 font-mono mb-4">0{i + 1}</div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  step.color === "aurora" ? "bg-aurora-500/15 text-aurora-400" :
                  step.color === "ember" ? "bg-ember-500/15 text-ember-400" :
                  step.color === "jade" ? "bg-jade-500/15 text-jade-400" :
                  "bg-rose-500/15 text-rose-400"
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompoundingSection() {
  return (
    <section className="relative py-32 px-5">
      <div className="max-w-4xl mx-auto">
        <motion.div className="glass-strong rounded-3xl p-8 sm:p-12 overflow-hidden relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(124, 91, 240, 0.15), transparent 70%)" }} />
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold leading-tight">
                Day 1 is decent.<br />
                Day 30 is <span className="text-aurora-400">scary accurate</span>.<br />
                Day 180 is <span className="text-ember-400">&quot;how do you know me?&quot;</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Every answer becomes a memory, a trait signal, a state update. Your readings get impossibly specific because we earn that understanding one question at a time.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { day: "Day 1", level: 20, label: "Birth chart + basics" },
                { day: "Day 7", level: 40, label: "Knows your vibe" },
                { day: "Day 30", level: 70, label: "Knows your patterns" },
                { day: "Day 90", level: 90, label: "Knows your soul" },
              ].map((item, i) => (
                <motion.div key={i} className="space-y-2" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{item.day}</span>
                    <span className="text-white/30 text-xs">{item.label}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-aurora-500 to-ember-500" initial={{ width: 0 }} whileInView={{ width: `${item.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.15 + 0.3 }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: "🕉️", title: "Vedic + Western", desc: "Rashi, Nakshatra, Lagna alongside Sun, Moon, Rising. Choose your lens or blend both." },
    { icon: "🧠", title: "Lifeprint Memory", desc: "A living model of who you are — your values, patterns, and what matters to you right now." },
    { icon: "💡", title: "Explainable Readings", desc: "Every insight tells you why. What's the astrology? What about you influenced it?" },
    { icon: "🔒", title: "You own your data", desc: "Mark answers private, delete anything, export everything. DPDP compliant from day one." },
    { icon: "🌙", title: "Tone that fits you", desc: "Gentle, direct, spiritual, or playful — readings in your voice, your language." },
    { icon: "📲", title: "Made for India", desc: "Phone OTP login, WhatsApp sharing, multilingual, mobile-first PWA. Zero friction." },
  ];

  return (
    <section id="features" className="relative py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-ember-400 text-sm font-medium mb-3 uppercase tracking-wider">Features</div>
          <h2 className="text-3xl sm:text-4xl font-bold">Not another horoscope app</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <motion.div key={i} className="glass rounded-2xl p-6 hover:bg-white/[0.04] transition-all group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="text-2xl mb-4">{feat.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feat.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="relative py-32 px-5">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-jade-400 text-sm font-medium mb-3 uppercase tracking-wider">See it in action</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What a real reading feels like</h2>
          <p className="text-white/40 max-w-lg mx-auto">This is from Day 12. The user mentioned their mom earlier that week.</p>
        </motion.div>

        <motion.div className="glass-strong rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto glow-aurora" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="mb-8">
            <div className="text-xs text-aurora-300 font-medium mb-3 uppercase tracking-wider">Today&apos;s question</div>
            <p className="text-xl font-medium">What was the last moment that made you smile — and why?</p>
            <div className="mt-4 glass rounded-xl p-4 text-white/60 text-sm italic">
              &ldquo;My mom sent me a voice note teasing me about how serious I&apos;ve become.&rdquo;
            </div>
          </div>

          <div className="h-px bg-white/5 my-8" />

          <div className="space-y-6">
            <div>
              <div className="text-xs text-ember-400 font-medium mb-2">♋ CANCER MOON · DAY 12</div>
              <h3 className="text-2xl font-bold text-glow">Softness is strength today</h3>
            </div>

            <div className="grid gap-4">
              <div className="bg-card-gradient rounded-xl p-4">
                <div className="text-xs text-jade-400 font-medium mb-2">LEAN INTO</div>
                <p className="text-sm text-white/70 leading-relaxed">You recharge through warmth and familiarity — let yourself be playful. The people who tease you are often the ones who see you most clearly.</p>
              </div>
              <div className="bg-card-gradient rounded-xl p-4">
                <div className="text-xs text-ember-400 font-medium mb-2">WATCH FOR</div>
                <p className="text-sm text-white/70 leading-relaxed">Taking feedback too personally. Not every observation about you is a criticism.</p>
              </div>
              <div className="bg-card-gradient rounded-xl p-4">
                <div className="text-xs text-aurora-300 font-medium mb-2">TRY THIS</div>
                <p className="text-sm text-white/70 leading-relaxed">Send a 10-second voice note back. Keep it light.</p>
              </div>
            </div>

            <div className="glass rounded-xl p-4 space-y-3">
              <div className="text-xs text-white/30 font-medium uppercase tracking-wider">Why this reading?</div>
              <div className="flex items-start gap-2.5 text-sm text-white/40">
                <Star className="w-4 h-4 mt-0.5 shrink-0 text-aurora-400" />
                <span>Moon in Cancer emphasizes family and emotional roots</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-white/40">
                <Heart className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" />
                <span>You light up when people you trust bring you back to yourself</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExploreSection() {
  const tools = [
    { href: "/compatibility", emoji: "💞", title: "Compatibility Checker", desc: "See how your signs vibe together.", color: "from-rose-500/20 to-ember-500/20" },
    { href: "/ask", emoji: "✨", title: "Ask the Stars", desc: "Got a question? Get cosmic guidance.", color: "from-aurora-500/20 to-jade-500/20" },
    { href: "/moon", emoji: "🌙", title: "Moon Phase Tracker", desc: "Real-time phases & retrograde alerts.", color: "from-aurora-500/20 to-rose-500/20" },
    { href: "/memes", emoji: "😂", title: "Zodiac Memes", desc: "Hilarious, shareable zodiac humor.", color: "from-ember-500/20 to-gold-500/20" },
    { href: "/affirmations", emoji: "🙏", title: "Daily Affirmations", desc: "Cosmic affirmations for your soul.", color: "from-jade-500/20 to-aurora-500/20" },
    { href: "/blog", emoji: "📖", title: "Cosmic Blog", desc: "Deep dives on Nakshatras & more.", color: "from-ember-500/20 to-rose-500/20" },
  ];

  return (
    <section className="relative py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-rose-400 text-sm font-medium mb-3 uppercase tracking-wider">Explore</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Beyond your daily reading</h2>
          <p className="text-white/40 max-w-lg mx-auto">Free tools and guides to deepen your cosmic journey.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link href={tool.href} className="block glass rounded-2xl p-6 hover:bg-white/[0.04] transition-all group h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-xl mb-3`}>
                  {tool.emoji}
                </div>
                <h3 className="text-base font-semibold mb-1 group-hover:text-aurora-300 transition-colors">{tool.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{tool.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional feature links */}
        <motion.div className="mt-12 flex flex-wrap items-center justify-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {[
            { href: "/achievements", label: "Achievements & Badges" },
            { href: "/weekly", label: "Weekly Recap" },
            { href: "/share", label: "Share Cards" },
            { href: "/referral", label: "Invite Friends" },
            { href: "/astrologers", label: "Talk to an Astrologer" },
            { href: "/pricing", label: "Go Premium" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="glass rounded-full px-4 py-2 text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-all">
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 px-5">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Your stars have something<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aurora-400 to-ember-400">to tell you today</span>
          </h2>
          <p className="text-lg text-white/40 max-w-lg mx-auto">It takes less than a minute. No app download needed.</p>
          <Link href="/onboarding" className="group inline-flex items-center justify-center gap-3 bg-aurora-500 hover:bg-aurora-400 text-white font-semibold px-10 py-5 rounded-2xl text-lg transition-all hover:shadow-lg hover:shadow-aurora-500/25 active:scale-[0.98]">
            Get your free reading
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-white/20">For reflection and entertainment purposes. Your data stays private.</p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-xs text-white/20 uppercase tracking-wider mb-4 font-medium">Features</div>
            <div className="space-y-2.5">
              <Link href="/compatibility" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Compatibility</Link>
              <Link href="/ask" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Ask the Stars</Link>
              <Link href="/moon" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Moon Phases</Link>
              <Link href="/affirmations" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Affirmations</Link>
              <Link href="/memes" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Zodiac Memes</Link>
            </div>
          </div>
          <div>
            <div className="text-xs text-white/20 uppercase tracking-wider mb-4 font-medium">Community</div>
            <div className="space-y-2.5">
              <Link href="/astrologers" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Astrologers</Link>
              <Link href="/blog" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Blog</Link>
              <Link href="/referral" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Invite Friends</Link>
              <Link href="/share" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Share Cards</Link>
            </div>
          </div>
          <div>
            <div className="text-xs text-white/20 uppercase tracking-wider mb-4 font-medium">Product</div>
            <div className="space-y-2.5">
              <Link href="/how-it-works" className="block text-sm text-white/40 hover:text-white/60 transition-colors">How it works</Link>
              <Link href="/pricing" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Pricing</Link>
              <Link href="/achievements" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Achievements</Link>
              <Link href="/weekly" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Weekly Recap</Link>
            </div>
          </div>
          <div>
            <div className="text-xs text-white/20 uppercase tracking-wider mb-4 font-medium">Legal</div>
            <div className="space-y-2.5">
              <Link href="/privacy" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-white/40 hover:text-white/60 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span>AstraPulse</span>
          </div>
          <span>© 2026 AstraPulse. For reflection & entertainment.</span>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-cosmic-gradient">
      <FloatingOrbs />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <HowItWorksSection />
        <CompoundingSection />
        <FeaturesSection />
        <DemoSection />
        <ExploreSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
