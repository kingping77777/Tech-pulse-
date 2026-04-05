
'use client';

import { Header } from '@/components/layout/Header';
import { ArticleCard } from '@/components/ArticleCard';
import { useLikes } from '@/hooks/use-likes';
import { HeartCrack } from 'lucide-react';

export default function LikedArticlesPage() {
  const { likes } = useLikes();

  return (
    <>
      <Header title="Bookmarked Articles" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {likes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {likes.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground mt-16">
            <HeartCrack className="h-16 w-16 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Bookmarked Articles</h2>
            <p className="max-w-md">You haven't bookmarked any articles yet. Click the heart icon on an article to save it here.</p>
          </div>
        )}
      </main>
    </>
  );
}
