"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Sparkles, ArrowRight, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function BlogPostPage() {
  const params = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <Link href="/blog" className="text-aurora-400 text-sm hover:underline">Back to blog</Link>
        </div>
      </main>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.description,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="min-h-screen bg-cosmic-gradient">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #7c5bf0 0%, transparent 70%)", top: "5%", right: "-10%", filter: "blur(80px)" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5">
        {/* Nav */}
        <div className="flex items-center justify-between py-6">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Blog
          </Link>
          <Link href="/onboarding" className="bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all">
            Get your reading
          </Link>
        </div>

        {/* Article */}
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-20">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{post.emoji}</span>
              <span className="text-xs text-aurora-300 font-medium uppercase tracking-wider">{post.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-lg text-white/40 leading-relaxed mb-4">{post.description}</p>
            <div className="flex items-center gap-4 text-sm text-white/30">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime} min read</span>
              <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
              <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-aurora-400 transition-colors ml-auto">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>

          <div className="h-px bg-white/5 mb-8" />

          {/* Content */}
          <div className="prose prose-invert prose-sm max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-h1:text-2xl prose-h1:mb-6
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-aurora-300
            prose-p:text-white/60 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-aurora-400 prose-a:no-underline hover:prose-a:underline
            prose-li:text-white/50
            prose-blockquote:border-aurora-500/30 prose-blockquote:text-white/40
            prose-table:text-sm
            prose-th:text-white/60 prose-th:font-medium
            prose-td:text-white/40
          ">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
              if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
              if (line.startsWith('**') && line.endsWith('**')) return <p key={i}><strong>{line.slice(2, -2)}</strong></p>;
              if (line.startsWith('---')) return <hr key={i} className="border-white/5 my-8" />;
              if (line.startsWith('- ')) return <p key={i} className="pl-4 border-l-2 border-aurora-500/20">{line.slice(2)}</p>;
              if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) return <p key={i} className="italic text-white/40">{line.slice(1, -1)}</p>;
              if (line.trim() === '') return null;
              if (line.startsWith('|')) return null; // Skip table rows for now
              return <p key={i}>{line}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="mt-10 flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-white/20" />
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full glass text-xs text-white/40">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 glass-strong rounded-2xl p-6 sm:p-8 text-center glow-aurora">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-aurora-500 to-ember-500 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Your stars have something to tell you</h3>
            <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
              AstraPulse turns astrology into daily guidance that actually knows you. 30 seconds. Free forever.
            </p>
            <Link href="/onboarding" className="group inline-flex items-center gap-2 bg-aurora-500 hover:bg-aurora-400 text-white font-semibold px-6 py-3 rounded-xl transition-all">
              Get your free reading <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Related */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xs text-white/30 font-medium uppercase tracking-wider mb-4">Related articles</h3>
              <div className="space-y-3">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block glass rounded-xl p-4 hover:bg-white/[0.04] transition-all group">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{rp.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium group-hover:text-aurora-300 transition-colors line-clamp-1">{rp.title}</h4>
                        <span className="text-xs text-white/20">{rp.readTime} min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </main>
  );
}
