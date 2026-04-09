'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { useLikes } from '@/hooks/use-likes';
import { MouseEvent, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const isExternal = !!article.url;
  const { isLiked, addLike, removeLike } = useLikes();
  
  const liked = isLiked(article.id);

  const handleLikeToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      removeLike(article.id);
    } else {
      addLike(article);
    }
  };

  const CardLink = ({children}: {children: React.ReactNode}) => isExternal ? (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      {children}
    </a>
  ) : (
    <Link href={`/article/${article.slug}`} className="group block h-full">
      {children}
    </Link>
  )

  // Map first category to an icon
  const getIcon = (cat: string) => {
      const catLower = cat?.toLowerCase() || '';
      if (catLower.includes('hardware')) return 'memory';
      if (catLower.includes('startup') || catLower.includes('venture')) return 'rocket_launch';
      if (catLower.includes('software') || catLower.includes('patch')) return 'terminal';
      if (catLower.includes('game')) return 'videogame_asset';
      if (catLower.includes('security')) return 'shield';
      return 'science';
  };

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      
      x.set(xPct);
      y.set(yPct);
  };
  
  const onMouseLeave = () => {
      x.set(0);
      y.set(0);
  };

  return (
    <CardLink>
      <div 
         ref={ref} 
         onMouseMove={onMouseMove} 
         onMouseLeave={onMouseLeave} 
         className="aspect-square group cursor-pointer relative"
         style={{ perspective: 1000 }}
      >
        <motion.div 
          style={{
             rotateX,
             rotateY,
             transformStyle: "preserve-3d"
          }}
          className="w-full h-full bg-surface-container/30 backdrop-blur-xl relative overflow-hidden border border-white/5 rounded-xl shadow-lg transition-colors hover:shadow-[0_8px_30px_rgb(0,242,255,0.2)]"
        >
          <img 
            alt={article.title} 
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" 
            src={article.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCI9zxls0lWXLmMcKWRX-5MUPqkc7VhkOpvzMOx9-KPHrqMuMt6Y6Rm94YAe_vBXnwCdu_caPZneyfvygV_oo6QvgL4Bj_NoQjzug6XPOF2NfRkK6Op6tGPpN2W8YbMBykWN1t-1jdNPTahw8oQNxUY5JOXIFj1g7lEnWq-5JuVNTtcFm9FcXxQoBTNrGN9w2INAvagNcgzAyW1Od8odRyUhXjBSF7LwOHurZg8c9nc1RH7f-Cj7ldyynIPXU6qilvBN1_z-qgr-J0"}
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-surface to-transparent">
            <div className="flex justify-between items-start">
               <span className="material-symbols-outlined text-primary-container">
                    {getIcon(article.categories[0] || article.tags[0])}
               </span>
               <button 
                  onClick={handleLikeToggle}
                  className={`material-symbols-outlined text-sm z-10 p-2 rounded-full backdrop-blur-md transition-colors ${liked ? 'text-red-400 bg-red-400/10 border border-red-400/20' : 'text-on-surface/40 hover:text-primary-container border border-outline-variant/20 bg-surface/40'}`}
                  style={{fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0"}}
                >
                  favorite
               </button>
            </div>
            <h4 
               style={{ transform: "translateZ(80px)" }}
               className="text-lg font-bold headline-font leading-tight text-on-surface group-hover:text-primary-container transition-colors"
            >
                {article.title}
            </h4>
        </div>
        </motion.div>
      </div>
    </CardLink>
  );
}

ArticleCard.Skeleton = function ArticleCardSkeleton() {
  return (
    <div className="aspect-square bg-surface-container/50 animate-pulse border border-outline-variant/5 rounded-sm"></div>
  )
}
