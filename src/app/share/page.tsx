"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Download,
  Share2,
  Check,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

// ============================================================
// SHAREABLE DAILY CARDS PAGE
// ============================================================

interface CardTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Just the theme and sign on a gradient",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "full",
    name: "Full",
    description: "Theme, action, and cosmic pattern",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: "story",
    name: "Story",
    description: "Full-bleed vertical format for Instagram",
    icon: <Heart className="w-4 h-4" />,
  },
];

const SAMPLE_DATA = {
  theme: "Softness is strength today",
  sign: "♈ Aries",
  action: "Send a 10-second voice note to someone you love. Keep it light.",
  date: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }),
};

const GRADIENT_STYLES = {
  gradient1: "from-aurora-500 via-cosmic-600 to-ember-500",
  gradient2: "from-cosmic-700 via-aurora-400 to-cosmic-800",
  gradient3: "from-ember-500 to-aurora-500",
};

function MinimalCard() {
  return (
    <div className={`w-full aspect-square rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-br ${GRADIENT_STYLES.gradient1} relative overflow-hidden`}>
      {/* Cosmic pattern background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl bg-white" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl bg-aurora-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-white/70 text-sm uppercase tracking-widest font-medium mb-3">
              Today's Theme
            </p>
            <h2 className="text-3xl font-bold text-white leading-tight">
              {SAMPLE_DATA.theme}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-1 w-12 bg-white/30 rounded-full" />
          <p className="text-white text-2xl font-semibold">{SAMPLE_DATA.sign}</p>
          <p className="text-white/80 text-xs">AstraPulse</p>
        </div>
      </div>
    </div>
  );
}

function FullCard() {
  return (
    <div className={`w-full aspect-square rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-br ${GRADIENT_STYLES.gradient2} relative overflow-hidden border border-white/10`}>
      {/* Cosmic pattern border */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <circle cx="50" cy="50" r="2" fill="white" opacity="0.3" />
          <circle cx="350" cy="50" r="2" fill="white" opacity="0.3" />
          <circle cx="50" cy="350" r="2" fill="white" opacity="0.3" />
          <circle cx="350" cy="350" r="2" fill="white" opacity="0.3" />
          <path d="M 50 50 L 350 50 L 350 350 L 50 350 Z" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
        </svg>
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full blur-3xl bg-aurora-400/20" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl bg-ember-500/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-4">
            {SAMPLE_DATA.date}
          </p>
          <h2 className="text-2xl font-bold text-white leading-tight mb-6">
            {SAMPLE_DATA.theme}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            <p className="text-white/70 text-xs uppercase tracking-wide mb-1 font-semibold">
              Today's Action
            </p>
            <p className="text-white text-sm leading-relaxed">
              {SAMPLE_DATA.action}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-lg font-semibold">{SAMPLE_DATA.sign}</p>
            <p className="text-white/50 text-xs">AstraPulse</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard() {
  return (
    <div className={`w-full aspect-[9/16] rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br ${GRADIENT_STYLES.gradient3} relative overflow-hidden`}>
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-40 h-40 rounded-full blur-3xl bg-aurora-400/30 animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full blur-3xl bg-white/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full text-center">
        <div className="pt-4">
          <p className="text-white/70 text-xs uppercase tracking-widest font-medium mb-2">
            {SAMPLE_DATA.date}
          </p>
          <h1 className="text-3xl font-bold text-white leading-tight">
            {SAMPLE_DATA.theme}
          </h1>
        </div>

        <div className="space-y-4 py-6">
          <div className="inline-block">
            <p className="text-5xl font-bold text-white drop-shadow-lg">
              {SAMPLE_DATA.sign}
            </p>
          </div>

          <div className="bg-black/30 rounded-2xl p-4 backdrop-blur-md mx-2 border border-white/10">
            <p className="text-white/90 text-sm font-medium leading-relaxed">
              {SAMPLE_DATA.action.substring(0, 50)}...
            </p>
          </div>
        </div>

        <div className="pb-4">
          <p className="text-white/60 text-xs uppercase tracking-widest">
            AstraPulse
          </p>
        </div>
      </div>
    </div>
  );
}

function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-aurora-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SharePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopyShare = async () => {
    const text = `${SAMPLE_DATA.theme}\n\n${SAMPLE_DATA.sign}\n\n${SAMPLE_DATA.action}\n\nGet personalized daily guidance with AstraPulse`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Daily Cosmic Reading",
          text: text,
        });
      } catch (err) {
        // User cancelled share dialog
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(text);
      showToastMessage("Copied to clipboard!");
    }
  };

  const handleDownload = () => {
    showToastMessage("Screenshot this card to save!");
  };

  const getCardComponent = () => {
    switch (selectedTemplate) {
      case "minimal":
        return <MinimalCard />;
      case "full":
        return <FullCard />;
      case "story":
        return <StoryCard />;
      default:
        return <MinimalCard />;
    }
  };

  return (
    <main className="min-h-screen bg-cosmic-900 overflow-x-hidden pb-24">
      {/* Header */}
      <div className="relative z-10 max-w-lg mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Share Your Reading</h1>
            <p className="text-white/50 text-sm">Beautiful cards for Instagram & WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Card Preview */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <motion.div
          key={selectedTemplate}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="group"
        >
          {getCardComponent()}
        </motion.div>
      </div>

      {/* Template Selector */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <p className="text-white/60 text-sm font-medium uppercase tracking-wide mb-3">
          Choose Style
        </p>
        <div className="grid grid-cols-3 gap-3">
          {CARD_TEMPLATES.map((template) => (
            <motion.button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-2xl transition-all ${
                selectedTemplate === template.id
                  ? "bg-gradient-to-br from-aurora-500/30 to-ember-500/20 border border-aurora-400/60 glow-aurora"
                  : "bg-white/5 border border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={selectedTemplate === template.id ? "text-aurora-300" : "text-white/60"}>
                  {template.icon}
                </div>
                <span className="text-xs font-semibold text-white">
                  {template.name}
                </span>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 rounded-2xl border border-aurora-400/30 animate-pulse" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 max-w-lg mx-auto px-4 space-y-3 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyShare}
          className="w-full bg-gradient-to-r from-aurora-500 to-ember-500 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow glow-aurora"
        >
          <Share2 className="w-5 h-5" />
          Copy to Share
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Card
        </motion.button>
      </div>

      {/* Info Card */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <div className="glass rounded-2xl p-4 space-y-3">
          <p className="text-white/70 text-sm leading-relaxed">
            <span className="font-semibold text-aurora-300">Pro tip:</span> Use these cards to share your cosmic reading with friends on Instagram Stories, WhatsApp, or Twitter.
          </p>
          <p className="text-white/50 text-xs">
            New cards generated daily. Each one is uniquely yours.
          </p>
        </div>
      </div>

      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 animate-float"
          style={{
            background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)",
            top: "10%",
            right: "-10%",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-10 animate-float"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
            bottom: "10%",
            left: "-5%",
            animationDelay: "2s",
          }}
        />
      </div>

      <Toast message={toastMessage} show={showToast} />
      <BottomNav />
    </main>
  );
}
