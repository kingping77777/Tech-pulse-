import { getArticleBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const awaitedParams = await params;
  const article = await getArticleBySlug(awaitedParams.slug);

  if (!article) {
    notFound();
  }

  const publishedDate = new Date(article.publishedAt);
  const formattedDate = format(publishedDate, 'MMM dd, yyyy');
  const formattedTime = format(publishedDate, 'HH:mm');

  return (
    <>
      <Header title="Intelligence Feed" />
      <main className="flex-1 overflow-y-auto w-full pb-24">
        {/* Fullscreen Hero Image */}
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-surface-container">
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 w-full p-6 md:p-12 lg:px-24">
             <div className="flex gap-3 mb-4">
               {article.categories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-primary-container/30 border border-primary-container/20 text-primary-container text-xs font-bold uppercase tracking-widest backdrop-blur-md rounded-sm">
                      {category}
                  </span>
               ))}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-headline leading-tight max-w-4xl tracking-tighter text-on-surface">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 mt-8 md:mt-12 flex flex-col md:flex-row gap-12">
            
            {/* Metadata Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0 order-2 md:order-1 pt-2">
                <div className="sticky top-32 space-y-8 bg-surface-container-high/30 p-6 rounded-2xl border border-white/5">
                  <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest mb-2">Source</span>
                      <div className="flex items-center gap-2">
                         <span className="w-6 h-6 rounded-sm bg-[#ff6600] text-white flex items-center justify-center font-bold text-sm">Y</span>
                         <span className="font-mono text-sm text-on-surface font-semibold">Hacker News</span>
                      </div>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest mb-2">Published</span>
                      <span className="font-mono text-sm text-on-surface font-semibold">{formattedDate}</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest mb-2">Time Local</span>
                      <span className="font-mono text-sm text-on-surface font-semibold">{formattedTime}</span>
                  </div>
                  {article.readTime && (
                     <div className="flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest mb-2">Metric</span>
                        <span className="font-mono text-sm text-primary font-bold">{article.readTime} MIN READ</span>
                     </div>
                  )}
                </div>
            </aside>

            {/* Main Content Area */}
            <article className="flex-1 order-1 md:order-2 max-w-none font-sans leading-relaxed text-on-surface/80">
              
              <div className="relative p-6 md:p-8 bg-surface-container-high/40 backdrop-blur-xl border border-primary/30 rounded-xl mb-12 shadow-[0_0_30px_rgba(0,242,255,0.05)]">
                 <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-on-primary font-mono text-[10px] font-bold tracking-widest uppercase rounded flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-primary opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-on-primary"></span>
                    </span>
                    AI Intelligence Summary
                 </div>
                 
                 <div className="mt-4 space-y-4">
                   {Array.isArray(article.summary) ? (
                     <ul className="space-y-4">
                       {article.summary.map((point, index) => (
                         <li key={index} className="flex gap-4">
                           <span className="text-secondary font-mono text-lg shrink-0 mt-1">{`>`}</span>
                           <p className="text-lg md:text-xl text-on-surface font-medium leading-snug">{point}</p>
                         </li>
                       ))}
                     </ul>
                   ) : (
                     <p className="text-xl md:text-2xl text-on-surface font-medium leading-snug">
                       {article.summary}
                     </p>
                   )}
                 </div>
              </div>

              {article.url && (
                  <div className="mt-16 flex justify-start md:justify-center">
                      <Link href={article.url} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-background text-primary font-mono font-bold rounded overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_40px_rgba(0,242,255,0.6)] hover:-translate-y-1 transition-all duration-300 border border-primary/50">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                          <span className="relative z-10 tracking-widest">READ ORIGINAL ARTICLE</span>
                          <span className="material-symbols-outlined text-lg relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">open_in_new</span>
                      </Link>
                  </div>
              )}
            </article>
        </div>
      </main>
    </>
  );
}
