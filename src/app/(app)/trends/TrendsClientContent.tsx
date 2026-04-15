'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ThreeBackground } from '@/components/ThreeBackground';
import type { Article } from '@/lib/types';
import { TrendingUp, ExternalLink, Search } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 380, damping: 26 } },
};

export default function TrendsClientContent({
  initialArticles,
  trends
}: {
  initialArticles: Article[];
  trends: { keyword: string; score: number }[];
}) {
  const top10Trends = [...trends].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <>
      <Header title="Trending Topics" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-screen pointer-events-none">
          <ThreeBackground variant="icosahedron" />
        </div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mb-8 flex items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="text-[#00f2ff] h-5 w-5" />
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tight">Trending Tech Topics</h1>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#00f2ff]/20 to-transparent" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">Top 10 • Live Rankings</span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-5 max-w-6xl mx-auto relative z-10"
        >
          {top10Trends.map((trend, index) => {
            // Filter articles to find related ones
            const relatedArticles = initialArticles
              .filter(
                article =>
                  article.title.toLowerCase().includes(trend.keyword.toLowerCase()) ||
                  article.tags.some(tag => tag.toLowerCase().includes(trend.keyword.toLowerCase())) ||
                  article.categories.some(cat => cat.toLowerCase().includes(trend.keyword.toLowerCase()))
              )
              .slice(0, 3);

            const displayIndex = (index + 1).toString().padStart(2, '0');
            const intensity = Math.max(0.3, trend.score / 100);

            return (
              <motion.div variants={itemVariants} key={trend.keyword}>
                <div className="bg-zinc-900/50 dark:bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden hover:border-[#00f2ff]/20 transition-all duration-150 shadow-lg hover:shadow-[0_4px_24px_rgba(0,242,255,0.07)]">
                  {/* Trend Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-white/5">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-[#00f2ff] text-sm font-bold bg-[#00f2ff]/10 border border-[#00f2ff]/20 px-2.5 py-1 rounded-md flex-shrink-0">
                        {displayIndex}
                      </span>
                      <h2 className="text-lg md:text-xl font-headline font-bold text-white truncate">
                        {trend.keyword}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Momentum</span>
                        <Badge className="bg-gradient-to-r from-[#00f2ff]/20 to-purple-500/20 border border-[#00f2ff]/30 text-[#00f2ff] text-xs font-mono px-2.5 py-0.5 font-bold">
                          {trend.score}
                        </Badge>
                      </div>
                      {/* Momentum bar */}
                      <div className="hidden sm:flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all ${i < Math.round(intensity * 5) ? 'h-4 bg-[#00f2ff]' : 'h-2 bg-zinc-700'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Articles for this trend */}
                  <div className="p-4 md:p-5">
                    {relatedArticles.length > 0 ? (
                      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {relatedArticles.map(article => (
                          <Link key={article.id} href={`/article/${article.slug || article.id}`}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              className="flex gap-3 group p-3 rounded-lg hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-[#00f2ff]/10"
                            >
                              <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-md border border-white/5">
                                {article.imageUrl ? (
                                  <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    fill
                                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-zinc-600 text-lg">image</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col justify-center min-w-0">
                                <h4 className="font-bold text-xs leading-snug group-hover:text-[#00f2ff] transition-colors line-clamp-2 text-zinc-200">
                                  {article.title}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <span className="text-[9px] uppercase font-mono text-zinc-600">
                                    {article.categories[0] || 'TECH'}
                                  </span>
                                  {article.readTime && (
                                    <span className="text-[9px] font-mono text-zinc-700">• {article.readTime}m</span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      /* No match — show search shortcut */
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border border-dashed border-zinc-700/50 rounded-lg">
                        <div>
                          <p className="text-sm text-zinc-500 font-mono mb-1">
                            No cached stories for <span className="text-zinc-300 font-bold">{trend.keyword}</span>
                          </p>
                          <p className="text-[10px] text-zinc-600 font-mono">Search for the latest stories</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Link
                            href={`/?q=${encodeURIComponent(trend.keyword)}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-[#00f2ff]/10 border border-zinc-700 hover:border-[#00f2ff]/30 text-zinc-400 hover:text-[#00f2ff] rounded-md text-[10px] font-mono uppercase tracking-wider transition-all duration-150"
                          >
                            <Search size={10} />
                            Search
                          </Link>
                          <Link
                            href="/live"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-purple-500/10 border border-zinc-700 hover:border-purple-500/30 text-zinc-400 hover:text-purple-300 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all duration-150"
                          >
                            <ExternalLink size={10} />
                            Live Feed
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </>
  );
}
