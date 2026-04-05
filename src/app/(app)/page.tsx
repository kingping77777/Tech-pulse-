
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { BookOpen, Flame } from 'lucide-react';
import Link from 'next/link';
import { getArticles, trends } from '@/lib/data';
import { HomePageClientContent } from './HomePageClientContent';
import type { Article } from '@/lib/types';
import { PersonalizedFeed } from '@/components/PersonalizedFeed';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  let allArticles: Article[] = [];
  try {
    // This function now safely fetches from Hacker News with a mock data fallback.
    allArticles = await getArticles(50);
  } catch (error) {
    console.error('Error fetching articles for homepage:', error);
    // In case of an unexpected error in getArticles, we default to an empty array.
    // The client component is designed to handle this gracefully.
    allArticles = [];
  }
  
  const dailyBriefing = "Explore the latest in tech, from AI breakthroughs to startup drama. Your one-stop shop for what matters now.";

  return (
    <>
      <Header title="Home" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
               <HomePageClientContent articles={allArticles} />
            </div>
            <aside className="lg:col-span-1 space-y-8">
               <Card className="p-6 bg-card/80 border-primary/30">
                <h2 className="text-xl font-headline font-bold flex items-center gap-2 mb-3">
                  <BookOpen className="text-primary" />
                  Daily Briefing
                </h2>
                <p className="text-muted-foreground text-sm">{dailyBriefing}</p>
              </Card>

              <div className="space-y-4">
                 <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                    <Flame className="text-primary" />
                    Trending Topics
                 </h2>
                 <div className="space-y-3">
                  {trends.map(trend => (
                    <Link key={trend.keyword} href="#" className="block group">
                      <div className="font-semibold group-hover:text-primary transition-colors">{trend.keyword}</div>
                      <div className="text-xs text-muted-foreground">{trend.score}k+ readers</div>
                    </Link>
                  ))}
                 </div>
              </div>
            </aside>
          </div>
          
          <PersonalizedFeed allArticles={allArticles} />

        </div>
      </main>
    </>
  );
}
