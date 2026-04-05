
'use client';

import { useState, useEffect, useMemo } from 'react';
import { User, HeartCrack } from 'lucide-react';
import { useLikes } from '@/hooks/use-likes';
import { ArticleCard } from './ArticleCard';
import type { Article } from '@/lib/types';
import { Card, CardContent } from './ui/card';

export function PersonalizedFeed({ allArticles }: { allArticles: Article[] }) {
  const { likes } = useLikes();
  
  const likedArticles = useMemo(() => {
    const likedArticleIds = new Set(likes.map(l => l.id));
    // Filter the main articles list to find the full data for liked articles
    return allArticles.filter(a => likedArticleIds.has(a.id));
  }, [likes, allArticles]);

  if (likedArticles.length === 0) {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                    <User className="text-primary" />
                    Your Bookmarks
                </h2>
            </div>
            <Card className="text-center p-8 bg-secondary/30">
                <CardContent className="p-0">
                    <HeartCrack className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg">Bookmark articles to see them here</h3>
                    <p className="text-muted-foreground mt-1">
                        Your personal feed will appear here once you've bookmarked some articles.
                    </p>
                </CardContent>
            </Card>
        </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
          <User className="text-primary" />
          Your Bookmarks
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {likedArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
