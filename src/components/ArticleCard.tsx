
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Article } from '@/lib/types';
import { format } from 'date-fns';
import { users } from '@/lib/data';
import { Skeleton } from './ui/skeleton';
import { Clock, ExternalLink, Heart } from 'lucide-react';
import { useLikes } from '@/hooks/use-likes';
import { Button } from './ui/button';
import { MouseEvent, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const author = users.find(u => u.id === article.authorId);
  const isExternal = !!article.url;
  const { isLiked, addLike, removeLike } = useLikes();
  
  const liked = isLiked(article.id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLikeToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      removeLike(article.id);
    } else {
      addLike(article);
    }
  };

  const CardLink = ({children}: {children: React.ReactNode}) => isExternal ? (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      {children}
    </a>
  ) : (
    <Link href={`/article/${article.slug}`} className="group block h-full">
      {children}
    </Link>
  )

  return (
    <CardLink>
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 bg-secondary/30 hover:bg-secondary/50">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={article.imageHint}
              unoptimized={true} // For picsum.photos
            />
             <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/70 hover:bg-background"
                onClick={handleLikeToggle}
                aria-label={liked ? 'Remove bookmark' : 'Bookmark article'}
              >
                <Heart className={cn('h-4 w-4', liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
              </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <div className="flex gap-1.5 mb-3">
            {article.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="px-1.5 py-0.5 text-xs font-medium">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-base font-headline font-semibold leading-snug group-hover:text-primary">
            {article.title}
          </CardTitle>
          
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {author && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.photoUrl} alt={author.displayName} data-ai-hint={author.photoHint} />
                <AvatarFallback>
                  {author.displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="text-sm">
              <p className="font-medium text-xs">{author?.displayName || 'TechPulse Author'}</p>
              {isMounted ? (
                <p className="text-muted-foreground text-xs">
                  {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                </p>
              ) : (
                <Skeleton className="h-3 w-16 mt-1" />
              )}
            </div>
          </div>
          {isExternal ? (
             <span className="flex items-center gap-1 text-xs text-muted-foreground">
                Source <ExternalLink className="h-3 w-3" />
            </span>
          ) : article.readTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{article.readTime} min read</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </CardLink>
  );
}

ArticleCard.Skeleton = function ArticleCardSkeleton() {
  return (
    <Card className="h-full flex flex-col bg-secondary/30">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full rounded-t-lg" />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="text-sm w-32">
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
