
'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

type RefreshIndicatorProps = {
  lastUpdated: Date | null;
};

export function RefreshIndicator({ lastUpdated }: RefreshIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!lastUpdated) {
      setTimeAgo('');
      return;
    }

    const update = () => {
      setTimeAgo(formatDistanceToNow(lastUpdated, { addSuffix: true }));
    };

    update(); // Initial update
    const intervalId = setInterval(update, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [lastUpdated]);

  if (!timeAgo) {
    return null;
  }

  return (
    <div className="text-xs text-muted-foreground pr-2">
      Last updated {timeAgo}
    </div>
  );
}
