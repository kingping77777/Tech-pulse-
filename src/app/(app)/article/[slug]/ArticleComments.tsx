
'use client';

import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import * as data from '@/lib/data';
import { MessageCircle } from 'lucide-react';

export function ArticleComments({ articleId }: { articleId: string }) {
  const articleComments = data.comments.filter(c => c.articleId === articleId);
  const currentUser = data.users[0];
  const getAuthor = (id:string) => data.users.find(u => u.id === id);

  return (
    <section>
      <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="h-6 w-6 text-primary" />
        Comments ({articleComments.length})
      </h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
           <Avatar>
             <AvatarImage src={currentUser.photoUrl} data-ai-hint={currentUser.photoHint} />
             <AvatarFallback>{currentUser.displayName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
           </Avatar>
           <div className="w-full">
             <Textarea placeholder="Write a comment..." className="mb-2"/>
             <Button>Post Comment</Button>
           </div>
        </div>

        {articleComments.map(comment => {
          const commentAuthor = getAuthor(comment.userId);
          return (
            <div key={comment.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={commentAuthor?.photoUrl} data-ai-hint={commentAuthor?.photoHint} />
                <AvatarFallback>{commentAuthor?.displayName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold">{commentAuthor?.displayName}</p>
                  <p className="text-xs text-muted-foreground">{format(comment.createdAt, 'MMM d, yyyy')}</p>
                </div>
                <p className="text-muted-foreground mt-1">{comment.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}
