'use client';

import { useMemo } from 'react';
import { useLikes } from '@/hooks/use-likes';
import type { Article } from '@/lib/types';
import Link from 'next/link';

export function PersonalizedFeed({ allArticles }: { allArticles: Article[] }) {
  const { likes } = useLikes();
  
  const likedArticles = useMemo(() => {
    const likedArticleIds = new Set(likes.map(l => l.id));
    return allArticles.filter(a => likedArticleIds.has(a.id));
  }, [likes, allArticles]);

  return (
    <div className="space-y-6">
        <div className="bg-surface-container-low p-6 rounded-sm border border-outline-variant/15">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold headline-font tracking-widest uppercase text-on-surface">Bookmarked Nodes</h2>
                <span className="flex h-2 w-2 rounded-full bg-primary-container animate-pulse"></span>
            </div>
            
            {likedArticles.length === 0 ? (
                <div className="text-center py-8 opacity-50">
                    <span className="material-symbols-outlined text-3xl mb-2 flex justify-center text-on-surface-variant">favorite</span>
                    <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase">No Bookmarks Synced</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {likedArticles.map(article => (
                        <Link href={article.url || `/article/${article.slug}`} key={article.id} className="flex gap-4 group cursor-pointer">
                            <div className="w-20 h-20 shrink-0 bg-surface-container-highest overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all border border-outline-variant/10">
                                <img 
                                    alt={article.title} 
                                    className="w-full h-full object-cover" 
                                    src={article.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCI9zxls0lWXLmMcKWRX-5MUPqkc7VhkOpvzMOx9-KPHrqMuMt6Y6Rm94YAe_vBXnwCdu_caPZneyfvygV_oo6QvgL4Bj_NoQjzug6XPOF2NfRkK6Op6tGPpN2W8YbMBykWN1t-1jdNPTahw8oQNxUY5JOXIFj1g7lEnWq-5JuVNTtcFm9FcXxQoBTNrGN9w2INAvagNcgzAyW1Od8odRyUhXjBSF7LwOHurZg8c9nc1RH7f-Cj7ldyynIPXU6qilvBN1_z-qgr-J0"} 
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-[9px] font-mono text-primary-container uppercase mb-1">
                                    {article.readTime ? `${article.readTime} MIN READ` : '5 MIN READ'}
                                </span>
                                <h4 className="text-sm font-bold headline-font leading-tight group-hover:text-primary-container transition-colors line-clamp-2">
                                    {article.title}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>

        <div className="bg-surface-container-low p-6 rounded-sm border border-outline-variant/15">
            <h3 className="text-xs font-bold headline-font uppercase tracking-widest text-primary-container mb-4">Network Status</h3>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-[10px] mb-1 font-mono uppercase text-on-surface-variant">
                        <span>Database Memory</span>
                        <span>{allArticles.length} Nodes</span>
                    </div>
                    <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container w-[100%] shadow-[0_0_8px_rgba(0,242,255,0.4)]"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-[10px] mb-1 font-mono uppercase text-on-surface-variant">
                        <span>Personal Buffer</span>
                        <span>{likedArticles.length} Saved</span>
                    </div>
                    <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-container shadow-[0_0_8px_rgba(206,93,255,0.4)] transition-all" style={{width: `${Math.min((likedArticles.length / 10) * 100, 100)}%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
