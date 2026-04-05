
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Article } from '@/lib/types';
import { useToast } from './use-toast';

const LIKES_KEY = 'techpulse-likes';

export function useLikes() {
  const [likes, setLikes] = useState<Article[]>([]);
  const { toast } = useToast();

  // Load likes from localStorage on initial client-side render
  useEffect(() => {
    try {
      const storedLikes = window.localStorage.getItem(LIKES_KEY);
      if (storedLikes) {
        setLikes(JSON.parse(storedLikes));
      }
    } catch (error) {
      console.error('Failed to parse likes from localStorage', error);
      setLikes([]);
    }
  }, []);

  const saveLikes = (updatedLikes: Article[]) => {
    setLikes(updatedLikes);
    try {
      window.localStorage.setItem(LIKES_KEY, JSON.stringify(updatedLikes));
    } catch (error) {
      console.error('Failed to save likes to localStorage', error);
    }
  };

  const addLike = useCallback((article: Article) => {
    if (likes.some(l => l.id === article.id)) return; // Already liked
    const updatedLikes = [...likes, article];
    saveLikes(updatedLikes);
    toast({
      title: "Article Bookmarked",
      description: `"${article.title}" has been added to your bookmarks.`,
    });
  }, [likes, toast]);

  const removeLike = useCallback((articleId: string) => {
    const articleToUnlike = likes.find(b => b.id === articleId);
    if (!articleToUnlike) return;
    
    const updatedLikes = likes.filter(like => like.id !== articleId);
    saveLikes(updatedLikes);
    
    toast({
      title: "Bookmark Removed",
      description: `"${articleToUnlike.title}" has been removed from your bookmarks.`,
    });
  }, [likes, toast]);

  const isLiked = useCallback((articleId: string) => {
    return likes.some(like => like.id === articleId);
  }, [likes]);

  return { likes, addLike, removeLike, isLiked };
}
