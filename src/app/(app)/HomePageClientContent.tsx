'use client';

import { useState, useEffect, useMemo, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { useAutoRefresh } from '@/hooks/use-auto-refresh';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThreeBackground } from '@/components/ThreeBackground';

const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;

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
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export function HomePageClientContent({ articles: initialArticles }: { articles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isRefreshing, startRefresh] = useTransition();

  useAutoRefresh(() => {
    window.location.reload();
  }, SIX_HOURS_IN_MS);

  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;
    if (query) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      );
    }
    return filtered;
  }, [articles, query]);

  const hasContent = filteredArticles && filteredArticles.length > 0;
  
  const heroArticle = filteredArticles[0];
  const highlightArticles = filteredArticles.slice(1, 4);
  const remainingArticles = filteredArticles.slice(4);

  return (
    <div className="space-y-12 relative pb-20">

      {!hasContent && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
          <Card className="text-center p-12 bg-surface-container/40 backdrop-blur-xl border-white/10 rounded-xl overflow-hidden relative">
            <CardContent className="p-0 flex flex-col items-center">
              <motion.span 
                animate={{ rotate: [0, -10, 10, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="material-symbols-outlined text-6xl text-on-surface-variant mb-6 opacity-50"
              >
                search_off
              </motion.span>
              <h3 className="font-bold headline-font text-2xl text-primary-container mb-2">No Data Streams Found</h3>
              <p className="text-on-surface-variant text-base max-w-md">
                Awaiting neural node response for <span className="text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">"{query}"</span>. Try different routing parameters to re-establish connection.
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
            className="relative group overflow-hidden bg-surface-container-low rounded-xl border border-white/10 shadow-2xl"
          >
            <ThreeBackground />
            <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden relative z-0">
                <img 
                    alt={heroArticle.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-overlay" 
                    src={heroArticle.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDmAR7GtZ8CMNwwZP6qUlObOeZzX4qIlySCq5dmcfyPaYgzAMZQJv4ap2ldi86WTDcJZxpGeDfoNt2lyDZ_g2_DQihPyJvriv890fV1VQ9wMY4D9_pBDm8fJ-OUhgGdMwHkWJYhiQrtxZW7idPgyJVY8iCD8FWFyFpXH9ZCVv5HYQi7pUVrbfKE1rEtTGPOXqSH6qq4Ne1r8pj6z-_mwIMKLN_jz-e5zcYELk0nUC86acWlnQUcRzQI_q9neG4SmaHo7d73orLVbI"}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent flex flex-col justify-end p-8 md:p-12 z-10">
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-3xl">
                    <motion.div variants={itemVariants} className="flex gap-3 mb-6">
                        <span className="px-3 py-1 bg-primary-container/20 border border-primary-container/30 text-primary-container text-[11px] font-bold uppercase tracking-widest headline-font backdrop-blur-md rounded-sm">
                            {heroArticle.categories[0] || 'Genkit Analysis'}
                        </span>
                        <span className="px-3 py-1 bg-secondary-container/20 border border-secondary-container/30 text-secondary-container text-[11px] font-bold uppercase tracking-widest headline-font backdrop-blur-md rounded-sm">
                            Real-Time Intelligence
                        </span>
                    </motion.div>
                    <motion.h1 
                      variants={itemVariants} 
                      className="text-4xl md:text-5xl lg:text-7xl font-bold headline-font leading-[1] tracking-tighter mb-6 text-primary drop-shadow-[0_4px_12px_rgba(0,242,255,0.3)]"
                    >
                        {heroArticle.title}
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-on-surface-variant text-base md:text-lg max-w-xl mb-8 leading-relaxed">
                        {heroArticle.summary}
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex items-center gap-4">
                        <Link href={`/article/${heroArticle.slug || heroArticle.id}`} className="px-8 py-3 bg-primary-container text-on-primary text-sm font-bold rounded-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all">
                            READ FULL BRIEF
                            <span className="material-symbols-outlined text-sm">north_east</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
          </motion.div>
      )}

      {hasContent && highlightArticles.length > 0 && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {highlightArticles.map((article, idx) => (
                <div 
                  key={article.id} 
                  className="h-full animate-in fade-in fill-mode-both slide-in-from-bottom-8 duration-700" 
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className={`h-full bg-surface-container-low/40 backdrop-blur-xl p-6 rounded-xl border-t-2 transition-all hover:bg-surface-container/80 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,242,255,0.15)] group border-l border-r border-b border-white/5 ${idx === 0 ? 'border-t-secondary-container' : 'border-t-primary-container'}`}>
                      <div className="flex justify-between items-start mb-4">
                          <span className={`text-[10px] font-mono tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded-sm ${idx === 0 ? 'text-secondary' : 'text-primary-container'}`}>
                              {article.categories[0] || 'Venture Stream'}
                          </span>
                      </div>
                      <Link href={`/article/${article.slug || article.id}`}>
                        <h3 className={`text-xl font-bold headline-font leading-snug mb-3 transition-colors ${idx === 0 ? 'group-hover:text-secondary' : 'group-hover:text-primary-container'}`}>
                            {article.title}
                        </h3>
                      </Link>
                      <p className="text-on-surface-variant text-sm mb-4 leading-relaxed line-clamp-3 opacity-80">{Array.isArray(article.summary) ? article.summary.join(' ') : article.summary}</p>
                      <div className="flex justify-between items-center text-[10px] font-mono opacity-40 mt-auto pt-4 border-t border-white/5">
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
                <h2 className="text-3xl font-bold headline-font tracking-tighter text-on-surface">Deep Stream Analysis</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-outline-variant/50 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {remainingArticles.map((article, idx) => (
                   <div 
                     key={article.id} 
                     className="animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-500 fill-mode-both"
                     style={{ animationDelay: `${idx * 50}ms` }}
                   >
                      <ArticleCard article={article} />
                   </div>
               ))}
            </div>
         </section>
      )}
    </div>
  )
}
