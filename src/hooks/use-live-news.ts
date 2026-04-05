'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateNewsArticles } from '@/ai/flows/generate-news-articles';
import type { GenerateNewsArticlesInput } from '@/ai/flows/generate-news-articles';
import type { Article } from '@/lib/types';
import { getArticles } from '@/lib/data';
import { differenceInHours } from 'date-fns';

const STALE_THRESHOLD_HOURS = 24;
const LIVE_NEWS_STORAGE_KEY = 'liveNewsData';

type StoredNews = {
  articles: Article[];
  timestamp: string;
};

type UseLiveNewsOptions = {
  autoGenerate?: boolean;
};

export function useLiveNews(options: UseLiveNewsOptions = {}) {
  const { autoGenerate = false } = options;
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNews = useCallback(async (input: GenerateNewsArticlesInput): Promise<Article[] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateNewsArticles(input);
      if (result.articles && result.articles.length > 0) {
        const freshArticles = result.articles;
        setArticles(freshArticles);
        if (typeof window !== 'undefined') {
          const storedData: StoredNews = {
            articles: freshArticles,
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem(LIVE_NEWS_STORAGE_KEY, JSON.stringify(storedData));
        }
        return freshArticles;
      } else {
        // Fallback to static data if AI fails
        console.warn('AI article generation failed or returned no articles. Falling back to fetched articles.');
        const fallbackArticles = await getArticles();
        setArticles(fallbackArticles.slice(0, input.count));
        setError('AI is unavailable. Showing top stories instead.');
        return null;
      }
    } catch (e: any) {
      console.error(e);
      // Fallback to static data on error
      console.warn('An error occurred during AI article generation. Falling back to fetched articles.');
      const fallbackArticles = await getArticles();
      setArticles(fallbackArticles.slice(0, input.count));
      const errorMessage =
        e.message && e.message.includes('overloaded')
          ? 'The AI service is currently busy. Showing top stories instead.'
          : 'An error occurred while fetching news. Showing top stories instead.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadNews = async () => {
      let storedData: StoredNews | null = null;
      if (typeof window !== 'undefined') {
        const storedJson = localStorage.getItem(LIVE_NEWS_STORAGE_KEY);
        if (storedJson) {
          try {
            storedData = JSON.parse(storedJson);
          } catch {
             // ignore parsing error
          }
        }
      }

      if (storedData) {
        const dataAgeHours = differenceInHours(new Date(), new Date(storedData.timestamp));
        if (dataAgeHours < STALE_THRESHOLD_HOURS) {
          setArticles(storedData.articles);
          return; 
        }
      }

      if (autoGenerate) {
        await generateNews({
          topics: ['AI/ML developments', 'Cryptocurrency & Blockchain', 'Cybersecurity', 'Startup funding & launches', 'Product releases', 'Developer tools', 'Gaming tech', 'Cloud computing'],
          count: 12,
        });
      } else {
        setIsLoading(true);
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
        setIsLoading(false);
      }
    };

    loadNews();
  }, [autoGenerate, generateNews]);

  return { articles, isLoading, error, generateNews };
}
