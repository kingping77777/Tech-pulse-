
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader, Download } from 'lucide-react';

export function FetchNewsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsLoading(true);
    toast({
      title: 'Refreshing...',
      description: 'Fetching latest stories from Hacker News.',
    });
    
    // In this new architecture, we just need to reload the page.
    // The server component will re-fetch the data.
    window.location.reload();
  };
  
  // This button will only be rendered in the development environment
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Button onClick={handleRefresh} disabled={isLoading} variant="outline" size="sm">
      {isLoading ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Refreshing...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Refresh Data
        </>
      )}
    </Button>
  );
}
