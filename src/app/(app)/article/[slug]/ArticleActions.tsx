
'use client';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Linkedin, MessageSquare } from 'lucide-react';
import type { Article } from '@/lib/types';

export function ArticleActions({ article }: { article: Article }) {
  const [articleUrl, setArticleUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setArticleUrl(window.location.href);
    }
  }, [article.slug]);

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this article from TechPulse: "${article.title}"`);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Check out this article from TechPulse: "${article.title}" ${articleUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={shareOnTwitter}>
          <Twitter className="mr-2 h-4 w-4" />
          <span>Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnLinkedIn}>
          <Linkedin className="mr-2 h-4 w-4" />
          <span>LinkedIn</span>
        </DropdownMenuItem>
         <DropdownMenuItem onClick={shareOnWhatsApp}>
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>WhatsApp</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
