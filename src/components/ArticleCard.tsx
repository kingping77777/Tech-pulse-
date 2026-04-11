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

  // Fallback image pool — different image for each article based on hash
  const fallbackImages = [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1531297172864-45d0614f8111?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
  ];

  // Use article.imageUrl if available, otherwise pick a consistent fallback
  const hash = article.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const imageUrl = article.imageUrl || fallbackImages[hash % fallbackImages.length];

  const inner = (
    <motion.div
      className="group relative w-full rounded-xl overflow-hidden cursor-pointer border border-white/8"
      style={{ aspectRatio: '16/9' }}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Full background image */}
      <img
        alt={article.title}
        src={imageUrl}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImages[0];
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

  if (isExternal) {
    return (
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return (
    <Link href={`/article/${article.slug}`} className="block">
      {inner}
    </Link>
  );
}

ArticleCard.Skeleton = function ArticleCardSkeleton() {
  return (
    <div className="rounded-xl bg-[var(--surface-container)] animate-pulse border border-[var(--outline-variant)] overflow-hidden" style={{ aspectRatio: '16/9' }} />
  );
};
