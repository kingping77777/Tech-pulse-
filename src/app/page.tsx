import React, { Suspense } from 'react';
import { getArticles } from '@/lib/data';
import { HomePageClientContent } from '@/app/(app)/HomePageClientContent';

export default async function HomePage() {
  // Fetch up to 50 articles to ensure there's plenty of news on the front page
  const allArticles = await getArticles(50);
  
  // Sort articles by published date, newest first
  const sortedArticles = allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-[1400px] mx-auto">
      <Suspense fallback={<div className="text-primary mt-20 text-center animate-pulse">Establishing secure connection...</div>}>
         <HomePageClientContent articles={sortedArticles} />
      </Suspense>
    </div>
  );
}
