

import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { ArticleCard } from '@/components/ArticleCard';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { companies, getArticles } from '@/lib/data';


export default async function CompanyPage({ params }: { params: { slug: string } }) {
  const company = companies.find(c => c.slug === params.slug);

  if (!company) {
    notFound();
  }

  const allArticles = await getArticles();
  const companyArticles = allArticles.filter(a => a.company === company.id);

  return (
    <>
      <Header title={company.name} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Card className="mb-8 p-6 flex flex-col md:flex-row items-center gap-6 bg-card/50">
          <Image
            src={company.logoUrl}
            alt={`${company.name} logo`}
            width={80}
            height={80}
            className="rounded-lg bg-white p-2"
            data-ai-hint={company.logoHint}
          />
          <div>
            <h1 className="text-4xl font-headline font-bold">{company.name}</h1>
            <p className="flex items-center gap-2 text-muted-foreground mt-1">
              <Building2 className="h-4 w-4" />
              {company.industry}
            </p>
          </div>
        </Card>
        
        <h2 className="text-2xl font-headline font-bold mb-4">Latest News</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companyArticles.length > 0 ? (
            companyArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">No articles found for {company.name}.</p>
          )}
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  return companies.map(company => ({
    slug: company.slug,
  }));
}
