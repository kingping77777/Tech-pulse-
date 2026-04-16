'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThreeBackground } from '@/components/ThreeBackground';
import { RefreshCw, TrendingUp } from 'lucide-react';

// Fuzzy search — tolerates typos up to 2 chars off
function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  const words = q.split(/\s+/);
  return words.some(word => {
    if (t.includes(word)) return true;
    if (word.length < 3) return false;
    // Sliding window Levenshtein
    for (let i = 0; i <= t.length - Math.max(1, word.length - 2); i++) {
      const slice = t.slice(i, i + word.length + 1);
      if (levenshtein(word, slice) <= 2) return true;
    }
    return false;
  });
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

// Trending topics to show in sidebar
const TRENDING_TOPICS = [
  { keyword: 'Gemini 2.5', score: 98, cat: 'AI' },
  { keyword: 'Bitcoin ETF', score: 95, cat: 'Crypto' },
  { keyword: 'OpenAI', score: 92, cat: 'AI' },
  { keyword: 'Nvidia Blackwell', score: 90, cat: 'Hardware' },
  { keyword: 'Web3 DeFi', score: 87, cat: 'Crypto' },
  { keyword: 'Vision Pro 2', score: 85, cat: 'Big Tech' },
  { keyword: 'Quantum Computing', score: 82, cat: 'Hardware' },
  { keyword: 'Y Combinator', score: 79, cat: 'Startups' },
];

const FIVE_MINUTES_MS = 5 * 60 * 1000;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 28 } },
};

export function HomePageClientContent({ articles: initialArticles }: { articles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const autoRefresh = () => {
      router.refresh();
      setLastUpdated(new Date());
    };

    intervalRef.current = setInterval(autoRefresh, FIVE_MINUTES_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [router]);

  const handleManualRefresh = useCallback(async () => {
    setIsRefreshing(true);
    router.refresh();
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 1200);
  }, [router]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;
    if (query) {
      filtered = filtered.filter(article =>
        fuzzyMatch(query, article.title) ||
        (article.tags && article.tags.some(tag => fuzzyMatch(query, tag))) ||
        (article.categories && article.categories.some(cat => fuzzyMatch(query, cat)))
      );
    }
    return filtered;
  }, [articles, query]);

  const hasContent = filteredArticles && filteredArticles.length > 0;

  const heroArticle = filteredArticles[0];
  const highlightArticles = filteredArticles.slice(1, 4);
  const remainingArticles = filteredArticles.slice(4);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-12 relative pb-20">

      {!hasContent && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
          <Card className="text-center p-12 bg-[var(--surface-container)] border-white/10 rounded-xl overflow-hidden relative">
            <CardContent className="p-0 flex flex-col items-center">
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="material-symbols-outlined text-6xl text-on-surface-variant mb-6 opacity-50"
              >
                search_off
              </motion.span>
              <h3 className="font-bold font-headline text-2xl text-[var(--primary)] mb-2">No Data Streams Found</h3>
              <p className="text-[var(--on-surface-variant)] text-base max-w-md">
                No results for <span className="text-[var(--primary)] font-mono bg-[var(--primary)]/10 px-2 py-0.5 rounded">"{query}"</span>. Try a different search.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {hasContent && heroArticle && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
          className="relative group overflow-hidden bg-[var(--surface-container-low)] rounded-xl border border-white/10 shadow-2xl"
        >
          <div className="min-h-[480px] md:min-h-[550px] aspect-auto md:aspect-[21/9] w-full overflow-hidden relative z-0 bg-zinc-950">
            <img
              alt={heroArticle.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50"
              src={heroArticle.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200'}
              loading="eager"
            />
          </div>
          <ThreeBackground />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 md:via-zinc-950/60 to-transparent flex flex-col justify-end p-5 sm:p-8 md:p-12 z-10">
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-3xl">
              <motion.div variants={itemVariants} className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                <span className="px-2 sm:px-3 py-1 bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest font-headline backdrop-blur-md rounded-sm">
                  {heroArticle.categories[0] || 'Tech News'}
                </span>
                <span className="px-2 sm:px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest font-headline backdrop-blur-md rounded-sm">
                  Breaking News
                </span>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-headline leading-[1.1] md:leading-[1] tracking-tighter mb-4 sm:mb-6 text-[var(--primary)] drop-shadow-[0_4px_12px_rgba(0,242,255,0.3)] line-clamp-3 md:line-clamp-none"
              >
                {heroArticle.title}
              </motion.h1>
              <motion.p variants={itemVariants} className="text-[var(--on-surface-variant)] text-sm sm:text-base md:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                {Array.isArray(heroArticle.summary) ? heroArticle.summary[0] : heroArticle.summary}
              </motion.p>
              <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap">
                <Link href={`/article/${heroArticle.slug || heroArticle.id}`} className="px-8 py-3 bg-[var(--primary-container)] text-[var(--on-primary)] text-sm font-bold rounded-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all">
                  READ FULL BRIEF
                  <span className="material-symbols-outlined text-sm">north_east</span>
                </Link>
                {/* Refresh button */}
                <button
                  onClick={handleManualRefresh}
                  className="flex items-center gap-2 px-4 py-3 rounded-sm border border-white/10 text-[var(--on-surface-variant)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)] text-xs font-mono font-bold uppercase tracking-wider transition-all"
                  disabled={isRefreshing}
                >
                  <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                  {isRefreshing ? 'Refreshing...' : `Updated ${mounted ? formatTime(lastUpdated) : ''}`}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}



      {hasContent && highlightArticles.length > 0 && (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-2">
            {highlightArticles.map((article, idx) => (
                <div
                  key={article.id}
                  className="h-full animate-in fade-in fill-mode-both slide-in-from-bottom-8 duration-500"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className={`h-full bg-zinc-900/40 backdrop-blur-xl p-5 rounded-xl border-t-2 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,242,255,0.12)] group border border-white/5 transition-[transform,box-shadow] duration-150 ${idx === 0 ? 'border-t-purple-500' : 'border-t-[#00f2ff]'}`}>
                    <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-sm ${idx === 0 ? 'text-purple-300 bg-purple-500/10' : 'text-[#00f2ff] bg-[#00f2ff]/10'}`}>
                            {article.categories[0] || 'Tech News'}
                        </span>
                    </div>
                    <Link href={`/article/${article.slug || article.id}`}>
                      <h3 className={`text-lg font-bold font-headline leading-snug mb-3 transition-colors ${idx === 0 ? 'group-hover:text-purple-300' : 'group-hover:text-[#00f2ff]'}`}>
                          {article.title}
                      </h3>
                    </Link>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed line-clamp-3">{Array.isArray(article.summary) ? article.summary[0] : article.summary}</p>
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600 mt-auto pt-3 border-t border-white/5">
                        <span>{article.readTime ? `${article.readTime} MIN READ` : '5 MIN READ'}</span>
                        <span>#{article.tags?.[0]?.toUpperCase() || 'TECH'}</span>
                    </div>
                  </div>
                </div>
            ))}
         </div>
      )}

      {hasContent && remainingArticles.length > 0 && (
         <section className="mt-16">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold font-headline tracking-tighter text-zinc-100">More Tech News</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-[#00f2ff]/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
               {remainingArticles.map((article, idx) => (
                   <motion.div
                     key={article.id}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: '-50px' }}
                     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (idx % 4) * 0.1 }}
                   >
                      <ArticleCard article={article} />
                   </motion.div>
               ))}
            </div>
         </section>
      )}
    </div>
  )
}
