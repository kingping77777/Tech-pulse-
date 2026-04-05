
'use client';

import { useState, useEffect, useMemo, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Newspaper, Search, AlertCircle, RefreshCw, Loader } from 'lucide-react';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAutoRefresh } from '@/hooks/use-auto-refresh';
import { RefreshIndicator } from '@/components/RefreshIndicator';

const categories = ['All', 'AI', 'Crypto', 'Startups', 'Tech'];
const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;

export function HomePageClientContent({ articles: initialArticles }: { articles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isRefreshing, startRefresh] = useTransition();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Set up the 6-hour auto-refresh
  useAutoRefresh(() => {
    // A simple page reload is the most effective way to re-trigger server-side data fetching
    window.location.reload();
  }, SIX_HOURS_IN_MS);
  
  const handleRefresh = () => {
    startRefresh(() => {
        window.location.reload();
    });
  };

  useEffect(() => {
    setArticles(initialArticles);
    // Set the last updated time when the component mounts with fresh data
    setLastUpdated(new Date());
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article =>
        article.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    return filtered;
  }, [articles, searchQuery, selectedCategory]);

  const hasContent = filteredArticles && filteredArticles.length > 0;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-headline font-bold">
          Latest Stories
        </h2>
        <div className="flex items-center gap-2">
            <RefreshIndicator lastUpdated={lastUpdated} />
            <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm">
              {isRefreshing ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                 <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {!hasContent && (
        <Card className="text-center p-8 bg-secondary/30">
          <CardContent className="p-0 flex flex-col items-center">
            <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg">No Articles Found</h3>
            <p className="text-muted-foreground mt-1 max-w-md">
              No articles match your current filter. Try a different category or search term.
            </p>
          </CardContent>
        </Card>
      )}

      {hasContent && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {initialArticles.length === 0 && (
          <Card className="p-4 col-span-full mt-6 bg-destructive/10 border-destructive text-center">
            <div className="flex items-center gap-3 justify-center">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-destructive-foreground">Could not fetch live news. Displaying mock data.</p>
            </div>
          </Card>
      )}
    </section>
  )
}
