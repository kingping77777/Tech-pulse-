
'use client';

import { useEffect, useRef } from 'react';

/**
 * A custom React hook that sets up an interval to call a function repeatedly.
 * It safely handles the interval setup and cleanup to prevent memory leaks and
 * ensures the callback function is always up-to-date without re-creating the interval.
 *
 * @param callback The function to call on each interval.
 * @param delay The delay in milliseconds between each call. If null, the interval is paused.
 */
export function useAutoRefresh(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
