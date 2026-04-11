import { Header } from '@/components/layout/Header';

export default function Loading() {
  return (
    <>
      <Header title="Loading Intelligence..." />
      <main className="flex-1 overflow-y-auto w-full pb-24">
        {/* Skeleton Hero Image */}
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-surface-container animate-pulse">
           <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
           <div className="absolute bottom-0 w-full p-6 md:p-12 lg:px-24">
              <div className="flex gap-3 mb-4">
                 <div className="h-6 w-24 bg-primary/20 rounded animate-pulse" />
                 <div className="h-6 w-24 bg-primary/20 rounded animate-pulse" />
              </div>
              <div className="h-8 md:h-12 w-3/4 max-w-4xl bg-surface-container-high/50 rounded animate-pulse mb-4" />
              <div className="h-8 md:h-12 w-1/2 max-w-2xl bg-surface-container-high/50 rounded animate-pulse" />
           </div>
        </div>
        
        {/* Skeleton Content Layout */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 mt-8 md:mt-12 flex flex-col md:flex-row gap-12">
            {/* Sidebar Skeleton */}
            <aside className="w-full md:w-64 flex-shrink-0 order-2 md:order-1 pt-2">
                <div className="sticky top-32 space-y-8 bg-surface-container-high/30 p-6 rounded-2xl border border-white/5 animate-pulse">
                    <div className="h-10 w-full bg-surface-container/50 rounded" />
                    <div className="h-10 w-full bg-surface-container/50 rounded" />
                    <div className="h-10 w-full bg-surface-container/50 rounded" />
                </div>
            </aside>

            {/* Main Content Skeleton */}
            <article className="flex-1 order-1 md:order-2 max-w-none space-y-6 pt-2">
                <div className="h-64 w-full bg-surface-container-high/40 rounded-xl animate-pulse" />
                <div className="h-6 w-1/3 bg-surface-container-high/30 rounded ml-4 mt-12" />
                <div className="h-16 w-48 bg-primary/20 rounded mx-auto mt-16" />
            </article>
        </div>
      </main>
    </>
  );
}
