'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 font-headline">Tech Pulse</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link 
              className={`font-headline font-bold text-sm tracking-tight transition-opacity duration-300 pb-1 border-b-2 ${pathname === '/' ? 'text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50' : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-800 dark:hover:text-zinc-200'}`} 
              href="/"
            >
              Home
            </Link>
            <Link 
              className={`font-headline font-bold text-sm tracking-tight transition-opacity duration-300 pb-1 border-b-2 ${pathname.startsWith('/trends') ? 'text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50' : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-800 dark:hover:text-zinc-200'}`} 
              href="/trends"
            >
              Trends
            </Link>
            <Link 
              className={`font-headline font-bold text-sm tracking-tight transition-opacity duration-300 pb-1 border-b-2 ${pathname.startsWith('/live') ? 'text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50' : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-800 dark:hover:text-zinc-200'}`} 
              href="/live"
            >
              Live News
            </Link>
            <Link 
              className={`font-headline font-bold text-sm tracking-tight transition-opacity duration-300 pb-1 border-b-2 ${pathname.startsWith('/liked') ? 'text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50' : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-800 dark:hover:text-zinc-200'}`} 
              href="/liked"
            >
              Liked
            </Link>

          </div>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative group hidden sm:block">
            <input 
              className="bg-zinc-100 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-300 dark:border-white/20 shadow-sm rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:bg-zinc-200 dark:focus:bg-zinc-800 transition-all duration-300 w-48 focus:w-64 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500" 
              placeholder="Search insights..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-800 h-[1px] w-full"></div>
    </nav>
  );
}
