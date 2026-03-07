"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight, Sparkles } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

interface Affirmation {
  text: string;
  category: "love" | "career" | "self-worth" | "courage" | "peace" | "all";
  emoji: string;
}

const AFFIRMATIONS: Affirmation[] = [
  {
    text: "The stars aligned to create you. Trust in their design.",
    category: "self-worth",
    emoji: "✨",
  },
  {
    text: "Your intuition is your inner compass — the cosmos speaks through it.",
    category: "courage",
    emoji: "🧭",
  },
  {
    text: "Love flows through you like moonlight through the night sky.",
    category: "love",
    emoji: "🌙",
  },
  {
    text: "Every challenge is a cosmic opportunity to grow stronger.",
    category: "courage",
    emoji: "💪",
  },
  {
    text: "You are worthy of all the abundance the universe can offer.",
    category: "self-worth",
    emoji: "👑",
  },
  {
    text: "Your career path is written in the stars—trust the journey.",
    category: "career",
    emoji: "🌟",
  },
  {
    text: "In this moment, you are exactly where you need to be.",
    category: "peace",
    emoji: "🕉️",
  },
  {
    text: "The universe supports your boldest dreams and highest visions.",
    category: "courage",
    emoji: "🚀",
  },
  {
    text: "Your love is a beacon that lights up the entire cosmos.",
    category: "love",
    emoji: "💫",
  },
  {
    text: "Peace flows through me like solar wind across the galaxies.",
    category: "peace",
    emoji: "☄️",
  },
  {
    text: "I attract success, joy, and meaningful connections effortlessly.",
    category: "career",
    emoji: "🎯",
  },
  {
    text: "My soul is ancient, wise, and infinitely capable.",
    category: "self-worth",
    emoji: "🌌",
  },
  {
    text: "Love expands me. I give it freely and receive it gratefully.",
    category: "love",
    emoji: "🔥",
  },
  {
    text: "I radiate confidence that mirrors the strength of the sun.",
    category: "courage",
    emoji: "☀️",
  },
  {
    text: "My work creates ripples of positive change in the world.",
    category: "career",
    emoji: "🌊",
  },
  {
    text: "I am grounded, centered, and aligned with my highest purpose.",
    category: "peace",
    emoji: "🌍",
  },
  {
    text: "My potential is limitless, like the infinite expanse of space.",
    category: "self-worth",
    emoji: "♾️",
  },
  {
    text: "I embrace vulnerability as a strength, not a weakness.",
    category: "courage",
    emoji: "🫂",
  },
  {
    text: "My relationships are mirrors of the love I hold within myself.",
    category: "love",
    emoji: "💎",
  },
  {
    text: "I trust my talents and share them with unwavering confidence.",
    category: "career",
    emoji: "🎨",
  },
  {
    text: "Stillness within me reveals profound cosmic truths.",
    category: "peace",
    emoji: "🌸",
  },
  {
    text: "Every cell of my being vibrates with divine energy.",
    category: "self-worth",
    emoji: "⚡",
  },
  {
    text: "I choose courage over comfort, growth over stagnation.",
    category: "courage",
    emoji: "🦅",
  },
  {
    text: "My heart knows the language of deep, authentic love.",
    category: "love",
    emoji: "🕊️",
  },
  {
    text: "I am a magnet for opportunities aligned with my soul purpose.",
    category: "career",
    emoji: "🧲",
  },
  {
    text: "I release what I cannot control and find peace in surrender.",
    category: "peace",
    emoji: "🍃",
  },
  {
    text: "I am enough. I have always been enough.",
    category: "self-worth",
    emoji: "💚",
  },
  {
    text: "My voice matters. The world needs what I have to say.",
    category: "courage",
    emoji: "🎤",
  },
  {
    text: "Intimacy and connection flow naturally from my authentic self.",
    category: "love",
    emoji: "🌹",
  },
  {
    text: "I am a conscious co-creator of my destiny and future.",
    category: "career",
    emoji: "🎭",
  },
];

type Category = "all" | "love" | "career" | "self-worth" | "courage" | "peace";

const CATEGORY_LABELS: Record<Category, string> = {
  all: "All",
  love: "Love",
  career: "Career",
  "self-worth": "Self-Worth",
  courage: "Courage",
  peace: "Peace",
};

const CATEGORY_COLORS: Record<Category, string> = {
  all: "from-aurora-400 to-rose-400",
  love: "from-rose-400 to-rose-600",
  career: "from-gold-400 to-ember-500",
  "self-worth": "from-aurora-400 to-jade-400",
  courage: "from-ember-400 to-amber-500",
  peace: "from-jade-400 to-emerald-500",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

export default function AffirmationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [favoriteIndices, setFavoriteIndices] = useState<Set<number>>(
    new Set()
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get today's affirmation based on day of year
  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (24 * 60 * 60 * 1000));
  }, []);

  // Filter affirmations by category
  const filteredAffirmations = useMemo(() => {
    if (selectedCategory === "all") {
      return AFFIRMATIONS;
    }
    return AFFIRMATIONS.filter(
      (aff) => aff.category === selectedCategory || aff.category === "all"
    );
  }, [selectedCategory]);

  // Get initial affirmation for today
  useEffect(() => {
    const todayAffirmationIndex = dayOfYear % filteredAffirmations.length;
    setCurrentIndex(todayAffirmationIndex);
  }, [dayOfYear, filteredAffirmations]);

  const currentAffirmation = filteredAffirmations[currentIndex];
  const isFavorited = favoriteIndices.has(currentIndex);

  const toggleFavorite = () => {
    const newFavorites = new Set(favoriteIndices);
    if (newFavorites.has(currentIndex)) {
      newFavorites.delete(currentIndex);
    } else {
      newFavorites.add(currentIndex);
    }
    setFavoriteIndices(newFavorites);
  };

  const nextAffirmation = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredAffirmations.length);
  };

  const favoriteAffirmations = useMemo(() => {
    return filteredAffirmations.filter((_, idx) => favoriteIndices.has(idx));
  }, [filteredAffirmations, favoriteIndices]);

  return (
    <div className="relative min-h-screen bg-cosmic-gradient pb-24 overflow-hidden">
      {/* Floating particles effect */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 stars opacity-40" />
        {/* Animated particle orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-aurora-500/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-rose-500/15 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: "20%", right: "10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-jade-500/10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "50%", right: "5%" }}
        />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-20 glass-strong border-b border-aurora-400/10 safe-top">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-aurora-400 to-rose-400 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-8 h-8" />
              Daily Affirmations
            </h1>
            <p className="text-white/60 mt-1">
              Align with cosmic truth and elevate your vibration
            </p>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 space-y-10">
          {/* Category Pills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2"
          >
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => (
              <motion.button
                key={category}
                variants={itemVariants}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${CATEGORY_COLORS[category]} text-white shadow-lg glow-aurora`
                    : "glass border border-aurora-400/20 text-white/70 hover:text-white hover:border-aurora-400/40"
                }`}
              >
                {CATEGORY_LABELS[category]}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Affirmation Display */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="glass-strong rounded-3xl p-12 border border-aurora-300/40 relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-500/15 to-transparent pointer-events-none" />

            <div className="relative z-10 text-center space-y-8 w-full">
              {/* Affirmation Text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Emoji */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="text-6xl"
                  >
                    {currentAffirmation?.emoji}
                  </motion.div>

                  {/* Affirmation Text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold leading-relaxed text-white text-glow"
                  >
                    {currentAffirmation?.text}
                  </motion.p>

                  {/* Category Tag */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${CATEGORY_COLORS[currentAffirmation?.category || "all"]} text-white`}
                  >
                    {CATEGORY_LABELS[
                      currentAffirmation?.category as Category
                    ] || "All"}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFavorite}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isFavorited
                      ? "bg-rose-500/30 border border-rose-300"
                      : "glass border border-aurora-400/20 hover:border-aurora-400/40"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorited ? "text-rose-300 fill-current" : "text-white/60"
                    }`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextAffirmation}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-aurora-400 to-rose-400 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:glow-aurora transition-all"
                >
                  Next Affirmation
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Affirmation Info */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="glass rounded-2xl p-6 border border-aurora-400/20 bg-gradient-to-r from-aurora-500/10 to-jade-500/5"
          >
            <p className="text-white/70 text-sm leading-relaxed">
              Today's affirmation shifts as the sun rises. Each day brings a new
              cosmic message aligned with universal rhythms. Return daily to
              receive your personalized affirmation and amplify your vibration.
            </p>
          </motion.div>

          {/* Favorites Section */}
          {favoriteAffirmations.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                My Favorites ({favoriteAffirmations.length})
              </h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {favoriteAffirmations.map((aff, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="glass rounded-lg p-4 border border-rose-400/30 bg-rose-500/10 hover:border-rose-400/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {aff.emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm leading-relaxed">
                            {aff.text}
                          </p>
                          <p className="text-xs text-white/50 mt-1">
                            {CATEGORY_LABELS[aff.category as Category]}
                          </p>
                        </div>
                        <Heart className="w-5 h-5 text-rose-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Empty Favorites State */}
          {favoriteAffirmations.length === 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="glass rounded-2xl p-8 border border-aurora-400/20 text-center"
            >
              <Heart className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/60">
                Heart affirmations to save your favorites and return to them
                anytime.
              </p>
            </motion.div>
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
