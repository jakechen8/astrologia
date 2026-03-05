"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Palette, Shield, Download, Trash2, ChevronRight,
  Moon, Bell, Eye, LogOut, HelpCircle, MessageSquare,
} from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";
import { useStore } from "@/store/useStore";

// ============================================================
// SETTINGS — Privacy, language, tone, controls
// ============================================================

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "bn", label: "বাংলা" },
  { code: "mr", label: "मराठी" },
];

const TONES = [
  { value: "gentle", label: "Gentle", desc: "Warm and nurturing", icon: "🌸" },
  { value: "direct", label: "Direct", desc: "Clear and honest", icon: "⚡" },
  { value: "playful", label: "Playful", desc: "Fun and light", icon: "✨" },
  { value: "spiritual", label: "Spiritual", desc: "Deep and reflective", icon: "🕉️" },
];

export default function SettingsPage() {
  const { user } = useStore();
  const [language, setLanguage] = useState("en");
  const [tone, setTone] = useState("gentle");
  const [astroMode, setAstroMode] = useState<"vedic" | "western" | "blend">("blend");
  const [notifications, setNotifications] = useState(true);
  const [showPrivateAnswers, setShowPrivateAnswers] = useState(false);

  return (
    <main className="min-h-screen bg-cosmic-gradient pb-24">
      <div className="relative z-10 max-w-lg mx-auto px-5">
        <div className="pt-6 pb-4">
          <h1 className="text-2xl font-bold mb-1">Settings</h1>
          <p className="text-sm text-white/40">Customize your experience</p>
        </div>

        <div className="space-y-4">
          {/* Language */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-aurora-400" />
              <span className="text-sm font-medium">Language</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
                    language === lang.code
                      ? "bg-aurora-500/15 text-aurora-400 border border-aurora-500/30"
                      : "glass text-white/40 hover:text-white/60"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-4 h-4 text-ember-400" />
              <span className="text-sm font-medium">Reading Tone</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    tone === t.value
                      ? "bg-aurora-500/10 border border-aurora-500/30"
                      : "glass hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="text-lg block mb-1">{t.icon}</span>
                  <span className="text-xs font-medium block">{t.label}</span>
                  <span className="text-[10px] text-white/30">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Astrology Mode */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-medium">Astrology System</span>
            </div>
            <div className="flex gap-2">
              {(["vedic", "western", "blend"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAstroMode(mode)}
                  className={`flex-1 py-3 rounded-xl text-xs font-medium transition-all capitalize ${
                    astroMode === mode
                      ? "bg-aurora-500/15 text-aurora-400 border border-aurora-500/30"
                      : "glass text-white/40"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="glass rounded-2xl divide-y divide-white/5">
            {[
              { icon: <Bell className="w-4 h-4 text-aurora-400" />, label: "Morning notifications", desc: "Daily check-in reminder", value: notifications, toggle: () => setNotifications(!notifications) },
              { icon: <Eye className="w-4 h-4 text-jade-400" />, label: "Show private answers", desc: "In timeline & insights", value: showPrivateAnswers, toggle: () => setShowPrivateAnswers(!showPrivateAnswers) },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-white/30">{item.desc}</div>
                  </div>
                </div>
                <button
                  onClick={item.toggle}
                  className={`w-11 h-6 rounded-full transition-all relative ${
                    item.value ? "bg-aurora-500" : "bg-white/10"
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    item.value ? "left-6" : "left-1"
                  }`} />
                </button>
              </div>
            ))}
          </div>

          {/* Privacy & Data */}
          <div className="glass rounded-2xl divide-y divide-white/5">
            <div className="px-5 py-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-400" />
                <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Privacy & Data</span>
              </div>
            </div>
            {[
              { icon: <Download className="w-4 h-4" />, label: "Export my data", desc: "Download all your answers & readings" },
              { icon: <Trash2 className="w-4 h-4 text-rose-400" />, label: "Delete all data", desc: "Permanently erase everything" },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div className="text-left">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-white/30">{item.desc}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20" />
              </button>
            ))}
          </div>

          {/* Other */}
          <div className="glass rounded-2xl divide-y divide-white/5">
            {[
              { icon: <HelpCircle className="w-4 h-4" />, label: "Help & FAQ" },
              { icon: <MessageSquare className="w-4 h-4" />, label: "Send feedback" },
              { icon: <LogOut className="w-4 h-4 text-rose-400" />, label: "Log out" },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20" />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-6 text-xs text-white/15 space-y-1">
            <p>AstraPulse v1.0.0</p>
            <p>For reflection & entertainment purposes</p>
            <p>DPDP compliant · Your data stays private</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
