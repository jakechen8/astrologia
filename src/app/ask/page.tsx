"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Send, Star, ArrowLeft, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SAMPLE_PROMPTS = [
  "What does Mercury retrograde actually mean for me?",
  "Is today a good day to start something new?",
  "Why am I feeling so emotional lately?",
  "What should a Scorpio Moon focus on this week?",
];

const SAMPLE_RESPONSES: Record<string, string> = {
  default: `Great question. Let me connect the cosmic dots for you.\n\nBased on current transits, the Moon is highlighting themes of introspection and emotional honesty today. If you've been feeling pulled between what you want and what feels safe — that tension is the transit talking.\n\n**What the stars say:** The current planetary alignment supports honest conversations and small acts of courage. It's not about grand gestures — it's about showing up as yourself.\n\n**Try this:** Before the day ends, say one thing you've been holding back. Keep it small. Keep it real.\n\n*For a reading that weaves in your actual birth chart and personal context, create your free AstraPulse profile.*`,
  retrograde: `Mercury retrograde gets a bad rap, but here's what it actually means:\n\nMercury appears to move backward in the sky about 3-4 times per year, each lasting roughly 3 weeks. It doesn't *actually* go backward — it's an optical illusion from Earth's perspective.\n\n**What it affects:** Communication, technology, travel plans, contracts, and reconnections with the past.\n\n**What it doesn't mean:** That everything will go wrong. That's fear-mongering.\n\n**What to actually do:**\n- Double-check important messages before sending\n- Back up your devices\n- Be patient with delays\n- Use the energy for *re-*words: reflect, revisit, reconnect, review\n\n**The real insight:** Retrograde periods are excellent for finishing things rather than starting them. If something from your past resurfaces, pay attention — there might be unfinished business worth addressing.\n\n*Want to know how Mercury retrograde specifically affects YOUR chart? Create your AstraPulse profile for personalized transit alerts.*`,
  emotional: `Feeling extra emotional? The Moon might have something to do with it.\n\nRight now, lunar transits are activating water sign energy — which amplifies feelings, intuition, and sensitivity. If you've been more tearful, nostalgic, or easily moved, you're literally feeling the pull of the Moon.\n\n**This isn't weakness — it's awareness.** Your emotional system is picking up signals that your logical mind hasn't processed yet.\n\n**What might help:**\n- Let yourself feel without trying to fix or explain it\n- Water helps: a shower, a walk by a river, even just drinking more water\n- Write down what keeps surfacing — your emotions are trying to tell you something\n\n**The bigger picture:** Emotional waves often precede breakthroughs. The feelings that feel "too much" are usually the ones that matter most.\n\n*AstraPulse tracks your mood patterns alongside cosmic transits — over time, you'll start to see which planetary movements affect YOU most.*`,
};

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: "user", content: messageText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lower = messageText.toLowerCase();
      let response = SAMPLE_RESPONSES.default;
      if (lower.includes("retrograde")) response = SAMPLE_RESPONSES.retrograde;
      if (lower.includes("emotional") || lower.includes("feeling")) response = SAMPLE_RESPONSES.emotional;

      const assistantMessage: Message = { role: "assistant", content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-cosmic-gradient flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)", top: "10%", right: "-5%", filter: "blur(70px)" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 glass-strong px-5 py-4 flex items-center gap-3">
        <Link href="/" className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">Ask the Stars</div>
            <div className="text-[10px] text-white/30">Powered by cosmic intelligence</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 relative z-10 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center space-y-8 py-12">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">Ask anything cosmic</h2>
              <p className="text-sm text-white/40 max-w-sm">
                Questions about transits, your sign, timing, relationships — the stars are listening.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              {SAMPLE_PROMPTS.map((prompt, i) => (
                <button key={i} onClick={() => handleSend(prompt)} className="w-full text-left glass rounded-xl px-4 py-3 text-sm text-white/50 hover:text-white/70 hover:bg-white/5 transition-all">
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              msg.role === "user"
                ? "bg-aurora-500 text-white"
                : "glass-strong text-white/70"
            }`}>
              {msg.role === "assistant" ? (
                <div className="space-y-2 text-sm leading-relaxed">
                  {msg.content.split('\n').map((line, j) => {
                    if (line.startsWith('**') && line.includes(':**')) {
                      const parts = line.split(':**');
                      return <p key={j}><strong className="text-white">{parts[0].replace(/\*\*/g, '')}:</strong>{parts[1]?.replace(/\*\*/g, '')}</p>;
                    }
                    if (line.startsWith('- ')) return <p key={j} className="pl-3 border-l border-aurora-500/20 text-white/50">{line.slice(2)}</p>;
                    if (line.startsWith('*') && line.endsWith('*')) return <p key={j} className="text-xs text-aurora-300 mt-2">{line.slice(1, -1)}</p>;
                    if (line.trim() === '') return <br key={j} />;
                    return <p key={j}>{line.replace(/\*\*/g, '')}</p>;
                  })}
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-white/30 text-sm">
            <Loader2 className="w-4 h-4 animate-spin text-aurora-400" />
            <span>Reading the stars...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative z-10 px-5 pb-6 pt-2">
        <div className="glass-strong rounded-2xl flex items-center p-1.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask the stars anything..."
            className="flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none"
          />
          <button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="w-10 h-10 rounded-xl bg-aurora-500 hover:bg-aurora-400 disabled:opacity-30 flex items-center justify-center transition-all">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-[10px] text-white/15 text-center mt-2">For reflection & entertainment. Not professional advice.</p>
      </div>
    </main>
  );
}
