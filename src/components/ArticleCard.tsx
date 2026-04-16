'use client';

import Link from 'next/link';
import type { Article } from '@/lib/types';
import { useLikes } from '@/hooks/use-likes';
import { MouseEvent } from 'react';
import { motion } from 'framer-motion';

// Category → color class mapping
const CAT_COLORS: Record<string, { accent: string; bg: string; text: string }> = {
  'AI':            { accent: '#00f2ff', bg: 'bg-cyan-400/15',   text: 'text-cyan-400' },
  'Crypto':        { accent: '#f59e0b', bg: 'bg-amber-400/15',  text: 'text-amber-400' },
  'Startups':      { accent: '#10b981', bg: 'bg-emerald-400/15',text: 'text-emerald-400' },
  'Big Tech':      { accent: '#f97316', bg: 'bg-orange-400/15', text: 'text-orange-400' },
  'Market Trends': { accent: '#8b5cf6', bg: 'bg-violet-400/15', text: 'text-violet-400' },
  'Security':      { accent: '#ef4444', bg: 'bg-red-400/15',    text: 'text-red-400' },
  'Hardware':      { accent: '#38bdf8', bg: 'bg-sky-400/15',    text: 'text-sky-400' },
  'Web3':          { accent: '#ec4899', bg: 'bg-pink-400/15',   text: 'text-pink-400' },
  'Quantum':       { accent: '#818cf8', bg: 'bg-indigo-400/15', text: 'text-indigo-400' },
  'Tech':          { accent: '#94a3b8', bg: 'bg-slate-400/15',  text: 'text-slate-400' },
};

type ArticleCardProps = { article: Article };

export function ArticleCard({ article }: ArticleCardProps) {
  const isExternal = !!article.url;
  const { isLiked, addLike, removeLike } = useLikes();
  const liked = isLiked(article.id);
  const cat = article.categories?.[0] || 'Tech';
  const colors = CAT_COLORS[cat] || CAT_COLORS['Tech'];

  const handleLikeToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    liked ? removeLike(article.id) : addLike(article);
  };

  // Use article.imageUrl if available, otherwise pick a consistent deterministic fallback image
  const imageUrl = article.imageUrl && article.imageUrl.startsWith('http') 
    ? article.imageUrl 
    : `https://picsum.photos/seed/${article.id}/800/450`;

  const inner = (
    <motion.div
      className="group relative w-full rounded-xl overflow-hidden cursor-pointer border border-[var(--outline-variant)] hover:border-[var(--primary)]/40 hover:shadow-[0_20px_40px_-15px_rgba(0,242,255,0.2)] transition-all duration-500 ease-out"
      style={{ aspectRatio: '16/9' }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
    >
      {/* Full background image */}
      <img
        alt={article.title}
        src={imageUrl}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          if ((e.target as HTMLImageElement).src !== 'https://picsum.photos/seed/fallback/800/450') {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/800/450';
          }
        }}
      />

      {/* Dark gradient overlay — like the screenshot */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
      {/* Subtle hover glow tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at bottom, ${colors.accent}40, transparent 70%)` }}
      />

      {/* Top: Category badge + Like */}
      <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold font-mono uppercase tracking-wider backdrop-blur-md border border-white/10 ${colors.bg} ${colors.text}`}
        >
          {cat}
        </span>
        <button
          onClick={handleLikeToggle}
          className={`material-symbols-outlined text-sm p-1.5 rounded-full backdrop-blur-md transition-all border
            ${liked
              ? 'text-red-400 bg-red-500/25 border-red-500/40'
              : 'text-white/70 hover:text-red-400 border-white/15 bg-black/30'
            }`}
          style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
          aria-label="Like"
        >favorite</button>
      </div>

      {/* Bottom: Title + source (matches the screenshot style) */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className={`text-sm md:text-base font-bold font-headline leading-snug line-clamp-3 text-white group-hover:${colors.text} transition-colors mb-2`}>
          {article.title}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {isExternal ? (
              <>
                <span className="w-4 h-4 rounded-sm bg-[#ff6600] text-white flex items-center justify-center font-bold text-[9px] flex-shrink-0">Y</span>
                <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider">Hacker News</span>
              </>
            ) : (
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider">Tech News</span>
            )}
          </div>
          {article.readTime && (
            <span className="text-[9px] font-mono text-white/40">{article.readTime}m read</span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <Link href={`/article/${article.slug || article.id}`} className="block">
      {inner}
    </Link>
  );
}

ArticleCard.Skeleton = function ArticleCardSkeleton() {
  return (
    <div className="rounded-xl bg-[var(--surface-container)] animate-pulse border border-[var(--outline-variant)] overflow-hidden" style={{ aspectRatio: '16/9' }} />
  );
};
