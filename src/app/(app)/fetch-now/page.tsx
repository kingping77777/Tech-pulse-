'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader, Download, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';
import { clearCache } from '@/lib/data';
import Link from 'next/link';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export default function FetchNowPage() {
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleFetch = async () => {
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/fetch-news');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch news.');
      }
      
      setStatus('success');
      setMessage(data.message || 'Successfully fetched latest news.');

      toast({
        title: 'Success!',
        description: data.message || 'Successfully fetched latest news.',
      });
      
      clearCache();

    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Could not fetch news.');
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not fetch news.',
      });
    }
  };

  useEffect(() => {
    // Automatically trigger the fetch when the page loads
    handleFetch();
  }, []);

  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle>Manual News Fetch</CardTitle>
          <CardDescription>
            This page manually triggers the news fetching process to update your Firestore database.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4">
              <Loader className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium">Fetching latest news...</p>
              <p className="text-muted-foreground">Please wait, this may take a moment.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="text-lg font-medium">Fetch Successful!</p>
              <p className="text-muted-foreground">{message}</p>
              <Button asChild>
                <Link href="/">Go to Homepage to see updates</Link>
              </Button>
            </div>
          )}
          
          {status === 'error' && (
             <div className="flex flex-col items-center gap-4">
              <AlertTriangle className="h-12 w-12 text-destructive" />
              <p className="text-lg font-medium">Fetch Failed</p>
              <p className="text-destructive">{message}</p>
               <Button onClick={handleFetch} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}

          {(status === 'success' || status === 'error') && (
            <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground flex items-center gap-3">
                <Trash2 className="h-5 w-5 shrink-0" />
                <div>
                    <span className="font-semibold">Action Required:</span> This is a one-time use page. Please delete the file <code className="bg-muted px-1 py-0.5 rounded-sm">src/app/(app)/fetch-now/page.tsx</code> after use.
                </div>
            </div>
          )}

        </CardContent>
      </Card>
    </main>
  );
}
