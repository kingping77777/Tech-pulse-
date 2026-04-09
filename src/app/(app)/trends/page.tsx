'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { getArticles, trends } from '@/lib/data';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ThreeBackground } from '@/components/ThreeBackground';
import type { Article } from '@/lib/types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function TrendsPage() {
  const [sortedArticles, setSortedArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadData() {
      const allArticles = await getArticles(50);
      setSortedArticles(allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
    }
    loadData();
  }, []);

  const top10Trends = trends.sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <>
      <Header title="Top 10 Trending Datastreams" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <ThreeBackground variant="icosahedron" />
        </div>
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid gap-6 max-w-5xl mx-auto"
        >
          {top10Trends.map((trend, index) => {
            const relatedArticles = sortedArticles
              .filter(article => 
                article.title.toLowerCase().includes(trend.keyword.toLowerCase()) || 
                article.tags.some(tag => tag.toLowerCase().includes(trend.keyword.toLowerCase()))
              )
              .slice(0, 3);

            const displayIndex = (index + 1).toString().padStart(2, '0');

            return (
              <motion.div variants={itemVariants} key={trend.keyword}>
                <Card className="bg-surface-container/40 backdrop-blur-md border-white/5 shadow-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <CardTitle className="text-2xl md:text-3xl font-headline flex items-center">
                        <span className="font-mono text-primary text-xl md:text-2xl mr-4 bg-primary/10 px-3 py-1 rounded-sm border border-primary/20">{displayIndex}</span>
                        <span className="text-on-surface">{trend.keyword}</span>
                      </CardTitle>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant">Momentum</span>
                        <Badge className="bg-gradient-to-r from-secondary to-primary text-on-primary text-sm font-mono px-3 py-1 font-bold">{trend.score}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="mb-4 text-xs font-mono uppercase tracking-widest text-on-surface-variant">Linked Artifacts</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {relatedArticles.map((article, idx) => (
                         <Link key={article.id} href={`/article/${article.slug || article.id}`} rel="noopener noreferrer">
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex gap-4 group p-2 rounded-md hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/10"
                          >
                             <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-md border border-outline-variant/10">
                               <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                             </div>
                             <div className="flex flex-col justify-center">
                               <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 text-on-surface">{article.title}</h4>
                               <p className="text-[10px] uppercase font-mono text-on-surface-variant mt-2">{article.categories[0] || 'TECH'}</p>
                             </div>
                           </motion.div>
                         </Link>
                      ))}
                      {relatedArticles.length === 0 && (
                        <p className="text-sm font-mono text-on-surface-variant/50 p-4 border border-dashed border-outline-variant/20 rounded-md">
                           No artifacts currently match this signature.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </main>
    </>
  );
}
