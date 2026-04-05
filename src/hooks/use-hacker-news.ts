'use client';

import { useState, useEffect, useCallback } from 'react';
import type { HackerNewsStory } from '@/lib/types';
import { differenceInHours } from 'date-fns';

const TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const ITEM_URL_BASE = 'https://hacker-news.firebaseio.com/v0/item/';
const CACHE_KEY = 'hackerNewsTopStories';
const CACHE_STALE_HOURS = 6;

type StoredStories = {
  stories: HackerNewsStory[];
  timestamp: string;
};

type UseHackerNewsOptions = {
  limit?: number;
};

export function useHackerNews(options: UseHackerNewsOptions = {}) {
  const { limit = 10 } = options;
  const [stories, setStories] = useState<HackerNewsStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStories = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);

    // Check cache first
    if (!forceRefresh && typeof window !== 'undefined') {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        try {
          const { stories: cachedStories, timestamp }: StoredStories = JSON.parse(cachedData);
          const dataAgeHours = differenceInHours(new Date(), new Date(timestamp));
          if (dataAgeHours < CACHE_STALE_HOURS) {
            setStories(cachedStories.slice(0, limit));
            setLastUpdated(new Date(timestamp));
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.error("Failed to parse cached Hacker News stories:", e);
          localStorage.removeItem(CACHE_KEY);
        }
      }
    }
    
    // Fetch new stories
    try {
      const response = await fetch(TOP_STORIES_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch top stories: ${response.statusText}`);
      }
      const storyIds: number[] = await response.json();
      
      const storyPromises = storyIds.slice(0, limit) 
        .map(id => fetch(`${ITEM_URL_BASE}${id}.json`).then(res => res.json()));

      const fetchedStories: HackerNewsStory[] = (await Promise.all(storyPromises))
        .filter(story => story && story.url && !story.dead && !story.deleted);

      setStories(fetchedStories);
      const now = new Date();
      setLastUpdated(now);
      setIsLoading(false);

      if (typeof window !== 'undefined') {
        const dataToCache: StoredStories = { stories: fetchedStories, timestamp: now.toISOString() };
        localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
      }

    } catch (e: any) {
      console.error("Failed to fetch Hacker News stories:", e);
      setError("Could not load top stories. Please try again later.");
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const refresh = () => {
    fetchStories(true);
  };

  return { stories, isLoading, error, lastUpdated, refresh };
}
