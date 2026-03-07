"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Share2,
  Check,
  Award,
  Users,
  Sparkles,
  Star,
  Crown,
  MessageCircle,
  Twitter,
} from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

// ============================================================
// REFERRAL PAGE — Share and earn cosmic rewards
// ============================================================

const REFERRAL_CODE = "STAR-7429";
const INVITE_URL = `https://astrapulse.app?ref=${REFERRAL_CODE}`;

interface RewardTier {
  id: string;
  threshold: number;
  name: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
  unlocked: boolean;
  reward: string;
}

const REWARD_TIERS: RewardTier[] = [
  {
    id: "explorer",
    threshold: 3,
    name: "Cosmic Explorer",
    description: "Invite 3 friends",
    badge: "🌌",
    icon: <Sparkles className="w-5 h-5" />,
    unlocked: true,
    reward: "Custom avatar frame",
  },
  {
    id: "whisper",
    threshold: 10,
    name: "Star Whisperer",
    description: "Invite 10 friends",
    badge: "⭐",
    icon: <Star className="w-5 h-5" />,
    unlocked: true,
    reward: "Unlock premium features preview",
  },
  {
    id: "guide",
    threshold: 25,
    name: "Galaxy Guide",
    description: "Invite 25 friends",
    badge: "👑",
    icon: <Crown className="w-5 h-5" />,
    unlocked: false,
    reward: "Early access to new features",
  },
];

interface InvitedFriend {
  id: string;
  initials: string;
  name: string;
  status: "joined" | "pending";
  joinedAt?: string;
}

const SAMPLE_FRIENDS: InvitedFriend[] = [
  { id: "1", initials: "SA", name: "Sarah A.", status: "joined", joinedAt: "2 days ago" },
  { id: "2", initials: "MJ", name: "Mike J.", status: "joined", joinedAt: "1 week ago" },
  { id: "3", initials: "EP", name: "Emma P.", status: "pending" },
  { id: "4", initials: "RC", name: "Rachel C.", status: "joined", joinedAt: "3 days ago" },
  { id: "5", initials: "DK", name: "David K.", status: "pending" },
  { id: "6", initials: "TL", name: "Tom L.", status: "joined", joinedAt: "5 days ago" },
  { id: "7", initials: "NB", name: "Nina B.", status: "pending" },
];

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

export default function ReferralPage() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const referredCount = 7;

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(REFERRAL_CODE);
    showToastMessage("Code copied!");
  };

  const handleCopyLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join AstraPulse",
          text: "Get personalized daily cosmic readings. Use my referral code!",
          url: INVITE_URL,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(INVITE_URL);
      showToastMessage("Link copied!");
    }
  };

  const handleShareWhatsApp = () => {
    const message = `Hey! I'm using AstraPulse for daily astrology guidance and it's amazing. Use my code ${REFERRAL_CODE} to get started. https://astrapulse.app`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const handleShareTwitter = () => {
    const message = `I'm getting hyper-personalized daily cosmic readings with AstraPulse ✨ Get your personalized guidance using my referral code ${REFERRAL_CODE} #Astrology #AstraPulse`;
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(twitterURL, "_blank");
  };

  return (
    <main className="min-h-screen bg-cosmic-900 overflow-x-hidden pb-24">
      {/* Header */}
      <div className="relative z-10 max-w-lg mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Invite Friends</h1>
            <p className="text-white/50 text-sm">Unlock cosmic rewards together</p>
          </div>
        </div>
      </div>

      {/* Referral Code Card */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-aurora-500/20 to-ember-500/10 border border-aurora-400/30 rounded-3xl p-8 text-center glow-aurora"
        >
          <p className="text-white/70 text-sm uppercase tracking-widest font-medium mb-4">
            Your Referral Code
          </p>
          <div className="text-4xl font-bold text-white mb-2 font-mono tracking-wider">
            {REFERRAL_CODE}
          </div>
          <p className="text-white/60 text-sm mb-6">
            Share this code with friends to unlock rewards
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyCode}
            className="w-full bg-aurora-500 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-aurora-600 transition-colors"
          >
            <Copy className="w-5 h-5" />
            Copy Code
          </motion.button>
        </motion.div>
      </div>

      {/* Sharing Options */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <p className="text-white/60 text-sm font-medium uppercase tracking-wide mb-3">
          Share Invite Link
        </p>
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            className="bg-white/10 border border-white/20 text-white p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/15 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-xs font-medium">Copy Link</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShareWhatsApp}
            className="bg-white/10 border border-white/20 text-white p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/15 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs font-medium">WhatsApp</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShareTwitter}
            className="bg-white/10 border border-white/20 text-white p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/15 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            <span className="text-xs font-medium">Twitter/X</span>
          </motion.button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <div className="glass rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-white/70 font-medium">Progress to Star Whisperer</p>
            <p className="text-aurora-400 font-semibold">{referredCount}/10</p>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(referredCount / 10) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-aurora-500 to-ember-500 rounded-full"
            />
          </div>

          <p className="text-white/50 text-xs">
            Invite {10 - referredCount} more friends to reach the next tier
          </p>
        </div>
      </div>

      {/* Reward Tiers */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <p className="text-white/60 text-sm font-medium uppercase tracking-wide mb-4">
          Reward Tiers
        </p>
        <div className="space-y-3">
          {REWARD_TIERS.map((tier, index) => {
            const isReached = referredCount >= tier.threshold;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border p-4 transition-all ${
                  isReached
                    ? "bg-gradient-to-r from-aurora-500/20 to-ember-500/10 border-aurora-400/40 glow-aurora"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {/* Locked state */}
                {!isReached && (
                  <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-white/30" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="text-3xl">{tier.badge}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-sm truncate">
                        {tier.name}
                      </h3>
                      {isReached && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex-shrink-0 w-5 h-5 rounded-full bg-jade-500 flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <p className={`text-xs mb-2 ${isReached ? "text-white/70" : "text-white/50"}`}>
                      {tier.description}
                    </p>
                    <p className={`text-xs font-medium ${isReached ? "text-aurora-300" : "text-white/40"}`}>
                      Reward: {tier.reward}
                    </p>
                  </div>
                </div>

                {isReached && (
                  <div className="absolute top-2 right-2">
                    <Award className="w-4 h-4 text-aurora-300" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Invited Friends Section */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <p className="text-white/60 text-sm font-medium uppercase tracking-wide mb-4">
          Invited Friends ({referredCount})
        </p>

        <div className="grid grid-cols-2 gap-3">
          {SAMPLE_FRIENDS.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aurora-500/40 to-ember-500/40 flex items-center justify-center mx-auto mb-3 border border-aurora-400/30">
                <span className="font-bold text-sm text-white">
                  {friend.initials}
                </span>
              </div>
              <p className="text-white text-sm font-medium truncate mb-1">
                {friend.name}
              </p>
              <div className="flex items-center justify-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    friend.status === "joined" ? "bg-jade-500" : "bg-white/30"
                  }`}
                />
                <p className="text-white/50 text-xs">
                  {friend.status === "joined" ? `Joined ${friend.joinedAt}` : "Pending"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="relative z-10 max-w-lg mx-auto px-4 mb-8">
        <div className="glass rounded-2xl p-4 space-y-3">
          <p className="text-white/70 text-sm leading-relaxed">
            <span className="font-semibold text-aurora-300">Every referral counts!</span> When your friends join and complete their first reading, they unlock your tier rewards.
          </p>
          <p className="text-white/50 text-xs">
            Both you and your friend get special perks when they join.
          </p>
        </div>
      </div>

      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 animate-float"
          style={{
            background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
            top: "20%",
            right: "-5%",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-10 animate-float"
          style={{
            background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)",
            bottom: "5%",
            left: "-10%",
            animationDelay: "2s",
          }}
        />
      </div>

      <Toast message={toastMessage} show={showToast} />
      <BottomNav />
    </main>
  );
}
