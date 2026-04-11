
'use client';

import { Header } from '@/components/layout/Header';
import { ArticleCard } from '@/components/ArticleCard';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Loader, RefreshCw, Zap } from 'lucide-react';
import { getHackerNewsArticles } from '@/lib/data';
import type { Article } from '@/lib/types';
import { useState, useEffect, useTransition } from 'react';
import { ThreeBackground } from '@/components/ThreeBackground';
import { motion } from 'framer-motion';

export default function LiveNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, startRefresh] = useTransition();

  const fetchLiveArticles = async () => {
    if (!isRefreshing) setIsLoading(true);
    setError(null);
    try {
      const fetchedArticles = await getHackerNewsArticles(50);
      setArticles(fetchedArticles);
    } catch (e) {
      setError('Failed to fetch live news from Hacker News.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveArticles();
  }, []);

  const handleRefresh = () => {
    startRefresh(() => {
      fetchLiveArticles();
    });
  };

  return (
    <>
      <Header title="Live from Hacker News" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">

        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
          <ThreeBackground variant="torus" />
        </div>

        <div className="relative z-10">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-8 text-center p-8 md:p-12 bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,242,255,0.08),transparent_70%)] pointer-events-none" />
            
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f2ff]" />
              </span>
              <span className="text-[10px] font-mono text-[#00f2ff] uppercase tracking-widest">Live Intelligence Stream</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-2 text-white">
              Real-Time from Hacker News
            </h2>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto text-sm">
              The latest top stories, AI-curated from Hacker News. Refresh to stream new intelligence.
            </p>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
              className={`
                inline-flex items-center gap-2 px-8 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-widest
                transition-all duration-150
                ${isRefreshing || isLoading
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                  : 'bg-[#00f2ff]/10 border border-[#00f2ff]/40 text-[#00f2ff] hover:bg-[#00f2ff]/20 hover:border-[#00f2ff]/70 hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] active:scale-95'
                }
              `}
            >
              {isRefreshing || isLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Refresh News
                </>
              )}
            </button>
          </motion.div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 max-w-lg mx-auto mb-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(12)].map((_, i) => (
                <ArticleCard.Skeleton key={i} />
              ))}
            </div>
          )}

          {/* Articles Grid */}
          {!isLoading && articles.length > 0 && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
              className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {articles.map(article => (
                <motion.div
                  key={article.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && articles.length === 0 && (
            <div className="text-center py-20 text-zinc-500">
              <span className="material-symbols-outlined text-5xl mb-4 block opacity-40">wifi_off</span>
              <p className="font-mono text-sm">No stories loaded. Try refreshing.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
