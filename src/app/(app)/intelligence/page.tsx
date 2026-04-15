'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Article } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, ChevronRight, RefreshCw, ChevronDown, Clock } from 'lucide-react';
import Link from 'next/link';
import { ThreeBackground } from '@/components/ThreeBackground';

const CAT_COLORS: Record<string, string> = {
  'AI':            'cat-ai',
  'Big Tech':      'cat-bigtech',
  'Security':      'cat-sec',
  'Hardware':      'cat-default',
  'Quantum':       'cat-ai',
  'Tech':          'cat-default',
};

const getImg = (article: Article) => {
  if (article.imageUrl && article.imageUrl.startsWith('http')) return article.imageUrl;
  const seed = article.id || article.title.replace(/\s+/g, '').slice(0, 15);
  return `https://picsum.photos/seed/${seed}/800/450`;
};

const PAGE_SIZE = 20;

export default function IntelligencePage() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = useCallback(async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      // Use the API route so it works from the client side reliably
      const res = await fetch(`/api/articles?limit=100`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Article[] = await res.json();
      setAllArticles(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      setError('Failed to load articles. Check your connection.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory]);

  const categories = ['All', 'AI', 'Big Tech', 'Security', 'Hardware'];

  const filtered = activeCategory === 'All'
    ? allArticles
    : allArticles.filter(a => a.categories.includes(activeCategory));

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main className="min-h-screen relative pb-24">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <ThreeBackground variant="sphere" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10">
            <Brain size={14} className="text-[var(--primary)]" />
            <span className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest">AI Intelligence Feed</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-[var(--on-surface)] mb-3">
            AI-Curated Intelligence
          </h1>
          <p className="text-[var(--on-surface-variant)] max-w-xl mx-auto text-sm md:text-base">
            Every article auto-analyzed and categorized by AI. Browse by topic or read the full summary below each story.
          </p>
        </motion.div>

        {/* Category Filter + Refresh row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider border transition-all duration-150
                  ${activeCategory === cat
                    ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)] shadow-[0_0_12px_var(--primary)]'
                    : 'border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {lastUpdated && (
              <span className="flex items-center gap-1 text-[9px] font-mono text-[var(--on-surface-variant)]">
                <Clock size={9} />
                {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <button
              onClick={() => loadArticles(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)]/15 hover:shadow-[0_0_12px_rgba(0,242,255,0.2)] text-xs font-mono font-bold uppercase tracking-wider transition-all"
            >
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Loading...' : 'Refresh Feed'}
            </button>
          </div>
        </div>

        {/* Count + error */}
        {!loading && !error && (
          <div className="text-[10px] font-mono text-[var(--on-surface-variant)] mb-4 text-center">
            Showing <span className="text-[var(--primary)] font-bold">{visible.length}</span> of{' '}
            <span className="text-[var(--on-surface)] font-bold">{filtered.length}</span> stories
            {activeCategory !== 'All' && <span> in <span className="text-[var(--primary)]">{activeCategory}</span></span>}
          </div>
        )}
        {error && (
          <div className="text-center py-8 px-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-mono mb-6">
            {error}
            <button onClick={() => loadArticles()} className="ml-3 underline hover:no-underline">Retry</button>
          </div>
        )}

        {/* Articles */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-56 rounded-xl bg-[var(--surface-container)] animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {visible.map((article, idx) => {
                  const catClass = CAT_COLORS[article.categories[0]] || 'cat-default';
                  const summaryText = Array.isArray(article.summary) ? article.summary : [article.summary];
                  const imgSrc = getImg(article);

                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                      className="group relative overflow-hidden rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] hover:border-[var(--primary)]/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200"
                    >
                      {/* Article image */}
                      <div className="relative w-full h-40 overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={article.title}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/fallback/800/450`; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-container-low)] via-[var(--surface-container-low)]/40 to-transparent" />
                        <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold font-mono uppercase tracking-wider border backdrop-blur-md ${catClass}`}>
                          <Zap size={8} />
                          {article.categories[0] || 'Tech'}
                        </span>
                        {article.readTime && (
                          <span className="absolute top-3 right-3 text-[9px] font-mono text-white/60 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                            {article.readTime}m
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="px-5 pt-3 pb-2">
                        <h3 className="font-headline font-bold text-base md:text-lg text-[var(--on-surface)] leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-2 mb-3">
                          {article.title}
                        </h3>
                      </div>

                      {/* AI Summary */}
                      <div className="mx-5 mb-4 p-4 rounded-lg bg-[var(--surface-container)] border border-[var(--primary)]/15">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
                          </span>
                          <span className="text-[9px] font-mono text-[var(--primary)] uppercase tracking-widest">AI Summary</span>
                        </div>
                        <ul className="space-y-1.5">
                          {summaryText.slice(0, 3).map((point, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="text-[var(--primary)] font-mono text-xs shrink-0 mt-0.5">›</span>
                              <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed line-clamp-2">{point}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tags + CTA */}
                      <div className="px-5 pb-5 flex items-center justify-between">
                        <div className="flex gap-1.5 flex-wrap">
                          {article.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--surface-container-highest)] text-[var(--on-surface-variant)]">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        {article.url ? (
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] font-mono text-[var(--primary)] hover:underline flex-shrink-0"
                          >
                            Read <ChevronRight size={10} />
                          </a>
                        ) : (
                          <Link
                            href={`/article/${article.slug}`}
                            className="flex items-center gap-1 text-[10px] font-mono text-[var(--primary)] hover:underline flex-shrink-0"
                          >
                            Full Brief <ChevronRight size={10} />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {filtered.length === 0 && !loading && (
                  <div className="col-span-full text-center py-20 text-[var(--on-surface-variant)]">
                    <Brain size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-mono text-sm">No intelligence data for this category yet.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)]/15 hover:shadow-[0_0_20px_rgba(0,242,255,0.2)] text-sm font-bold font-mono uppercase tracking-wider transition-all duration-150"
                >
                  <ChevronDown size={16} />
                  Load More ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
