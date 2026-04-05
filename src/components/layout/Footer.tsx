import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Fresh, focused coverage of AI, Big Tech, and global tech trends.
            </p>
             <p className="text-sm text-muted-foreground mt-4">
              © {new Date().getFullYear()} TechPulse. All rights reserved.
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-headline text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest tech news, analysis, and insights delivered straight to your inbox.
            </p>
            <form className="flex w-full max-w-md items-center space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button type="submit">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
