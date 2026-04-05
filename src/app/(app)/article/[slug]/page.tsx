
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowUpRight, FileText } from 'lucide-react';
import * as data from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Since we only have mock articles now, we fetch from there.
  const articles = data.getMockArticles();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Display different content for external (Hacker News) vs internal (mock) articles
  if (article.url) {
     return (
      <>
        <Header title={article.company || 'External Article'} />
        <main className="flex-1 overflow-y-auto">
           <div className="relative aspect-[16/7] w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              priority
              className="object-cover"
              data-ai-hint={article.imageHint}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
           <div className="container max-w-4xl mx-auto px-4 md:px-6 -mt-20 md:-mt-32 relative pb-16">
              <div className="flex gap-2 mb-4">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
             <h1 className="text-3xl md:text-5xl font-headline font-bold mb-8">{article.title}</h1>
             <p className="text-muted-foreground mb-8">This is an external article from Hacker News. Click the button below to read the full story on its original website.</p>
             <Button asChild size="lg" className="w-full">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read Full Story on Source
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
             </Button>
            </div>
        </main>
      </>
     )
  }
  
  // Render full mock article content
  return (
    <>
      <Header title={article.company || 'Article'} />
      <main className="flex-1 overflow-y-auto">
        <div className="relative aspect-[16/7] w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
            data-ai-hint={article.imageHint}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="container max-w-4xl mx-auto px-4 md:px-6 -mt-20 md:-mt-32 relative pb-16">
          <div className="flex gap-2 mb-4">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-headline font-bold mb-8">{article.title}</h1>
          
          <article className="prose prose-lg dark:prose-invert max-w-none mx-auto">
            <p className="lead text-xl text-muted-foreground">{article.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        </div>
      </main>
    </>
  );
}

// Generate static paths for mock articles to improve build times and performance
export async function generateStaticParams() {
  const articles = data.getMockArticles();
  return articles.filter(a => !a.url).map(article => ({
    slug: article.slug,
  }));
}
