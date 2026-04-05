
'use client';

import { Header } from '@/components/layout/Header';
import { ArticleCard } from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Loader, RefreshCw } from 'lucide-react';
import { getHackerNewsArticles } from '@/lib/data';
import type { Article } from '@/lib/types';
import { useState, useEffect, useTransition } from 'react';

export default function LiveNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, startRefresh] = useTransition();

  const fetchLiveArticles = async () => {
    if (!isRefreshing) setIsLoading(true);
    setError(null);
    try {
      const fetchedArticles = await getHackerNewsArticles(50);
      setArticles(fetchedArticles);
    } catch (e) {
      setError('Failed to fetch live news from Hacker News.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveArticles();
  }, []);

  const handleRefresh = () => {
    startRefresh(() => {
      fetchLiveArticles();
    });
  };

  return (
    <>
      <Header title="Live from Hacker News" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Card className="mb-8 text-center p-6 bg-card/80">
          <CardContent className="p-0">
            <h2 className="text-2xl font-headline font-bold mb-2">Real-Time from Hacker News</h2>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              The latest top stories from Hacker News. Click refresh to get the latest updates.
            </p>
            <Button onClick={handleRefresh} disabled={isRefreshing || isLoading} size="lg">
              {isRefreshing || isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                 <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh News
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Card className="p-4 max-w-md mx-auto col-span-full mb-4 bg-destructive/10 border-destructive">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <p className="text-destructive-foreground">{error}</p>
            </div>
          </Card>
        )}

        {(isLoading) && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(12)].map((_, i) => (
              <ArticleCard.Skeleton key={i} />
            ))}
          </div>
        )}
        
        {!isLoading && articles.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
