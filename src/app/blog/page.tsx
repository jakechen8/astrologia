"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Search } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog-data";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = BLOG_POSTS.filter((p) => p.featured);

  return (
    <main className="min-h-screen bg-cosmic-gradient">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-float" style={{ background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)", top: "-5%", right: "-10%", filter: "blur(80px)" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", bottom: "20%", left: "-5%", filter: "blur(60px)", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        {/* Nav */}
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Astra<span className="text-aurora-400">Pulse</span></span>
          </Link>
          <Link href="/onboarding" className="bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all">
            Get your reading
          </Link>
        </div>

        {/* Header */}
        <motion.div className="text-center py-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            The Cosmic <span className="bg-clip-text text-transparent bg-gradient-to-r from-aurora-400 to-ember-400">Journal</span>
          </h1>
          <p className="text-white/40 max-w-lg mx-auto mb-8">
            Vedic wisdom meets modern insight. Deep guides, sign breakdowns, and content that makes astrology actually useful.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto glass rounded-xl flex items-center px-4">
            <Search className="w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, signs, topics..."
              className="flex-1 bg-transparent px-3 py-3.5 text-sm text-white outline-none"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeCategory === "all" ? "bg-aurora-500 text-white" : "glass text-white/40 hover:text-white/60"
            }`}
          >
            All Posts
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === cat.slug ? "bg-aurora-500 text-white" : "glass text-white/40 hover:text-white/60"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Featured — only on "all" */}
        {activeCategory === "all" && searchQuery === "" && (
          <div className="mb-12">
            <h2 className="text-xs text-aurora-300 font-medium mb-4 uppercase tracking-wider">Featured</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {featured.slice(0, 2).map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/blog/${post.slug}`} className="block glass-strong rounded-2xl p-6 hover:bg-white/[0.04] transition-all group h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{post.emoji}</span>
                      <span className="text-xs text-aurora-300 font-medium uppercase tracking-wider">{post.category}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-aurora-300 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-white/20">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-aurora-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All posts */}
        <div className="space-y-4 pb-20">
          <h2 className="text-xs text-white/30 font-medium uppercase tracking-wider">
            {activeCategory === "all" ? "All Articles" : BLOG_CATEGORIES.find((c) => c.slug === activeCategory)?.label} · {filtered.length} posts
          </h2>
          {filtered.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/blog/${post.slug}`} className="block glass rounded-2xl p-5 hover:bg-white/[0.04] transition-all group">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">{post.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 group-hover:text-aurora-300 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/40 line-clamp-1 mb-2">{post.description}</p>
                    <div className="flex items-center gap-3 text-xs text-white/20">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                      <div className="flex gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-aurora-400 shrink-0 mt-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
