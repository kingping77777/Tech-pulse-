
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Article } from '@/lib/types';
import { useToast } from './use-toast';

const LIKES_KEY = 'techpulse-likes';

export function useLikes() {
  const [likes, setLikes] = useState<Article[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem(LIKES_KEY);
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
    localStorage.setItem(LIKES_KEY, JSON.stringify(updatedLikes));
  };

  const addLike = useCallback((article: Article) => {
    const updatedLikes = [...likes, article];
    saveLikes(updatedLikes);
    toast({
      title: "Article Liked",
      description: `"${article.title}" has been added to your liked articles.`,
    });
  }, [likes, toast]);

  const removeLike = useCallback((articleId: string) => {
    const articleToUnlike = likes.find(b => b.id === articleId);
    const updatedLikes = likes.filter(like => like.id !== articleId);
    saveLikes(updatedLikes);
    if (articleToUnlike) {
      toast({
        title: "Article Unliked",
        description: `"${articleToUnlike.title}" has been removed from your liked articles.`,
      });
    }
  }, [likes, toast]);

  return { likes, addLike, removeLike };
}
