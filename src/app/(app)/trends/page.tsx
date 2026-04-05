
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { getArticles, trends } from '@/lib/data';

export default async function TrendsPage() {
  const allArticles = await getArticles();

  // Sort articles by published date, newest first
  const sortedArticles = allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <>
      <Header title="Trending Topics" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-6">
          {trends.sort((a, b) => b.score - a.score).map((trend, index) => {
            // Find related articles by checking if the trend keyword is in the article title or tags
            const relatedArticles = sortedArticles
              .filter(article => 
                article.title.toLowerCase().includes(trend.keyword.toLowerCase()) || 
                article.tags.some(tag => tag.toLowerCase().includes(trend.keyword.toLowerCase()))
              )
              .slice(0, 3);

            return (
              <Card key={trend.keyword}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-headline">
                      <span className="text-muted-foreground mr-2">#{index + 1}</span>
                      {trend.keyword}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Trend Score</span>
                      <Badge className="bg-accent text-accent-foreground text-lg py-1">{trend.score}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Related Articles</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {relatedArticles.map(article => article && (
                       <Link key={article.id} href={article.url || `/article/${article.slug}`} className="group" target={article.url ? "_blank" : "_self"} rel="noopener noreferrer">
                        <div className="flex gap-4">
                           <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-md">
                             <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={article.imageHint} />
                           </div>
                           <div>
                             <h4 className="font-semibold leading-snug group-hover:text-primary transition-colors">{article.title}</h4>
                             <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.summary}</p>
                           </div>
                         </div>
                       </Link>
                    ))}
                     {relatedArticles.length === 0 && (
                      <p className="text-sm text-muted-foreground">No recent articles found for this trend.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </>
  );
}
