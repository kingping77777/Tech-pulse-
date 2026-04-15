import { getArticles, trends } from '@/lib/data';
import TrendsClientContent from './TrendsClientContent';

export const revalidate = 60; // Cache for 60 seconds (ISR pattern for Vercel)

export default async function TrendsPage() {
  const allArticles = await getArticles(100);
  const sortedArticles = allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  return <TrendsClientContent initialArticles={sortedArticles} trends={trends} />;
}
