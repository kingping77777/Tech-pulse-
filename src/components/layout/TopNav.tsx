'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Search, X, Menu, Brain } from 'lucide-react';

// ── Nav links ──────────────────────────────────────────────
const NAV_LINKS = [
  { href: '/',             label: 'Home',       match: (p: string) => p === '/' },
  { href: '/trends',       label: 'Trends',     match: (p: string) => p.startsWith('/trends') },
  { href: '/live',         label: 'Live News',  match: (p: string) => p.startsWith('/live') },
  { href: '/intelligence', label: 'AI Feed',    match: (p: string) => p.startsWith('/intelligence') },
  { href: '/liked',        label: 'Liked',      match: (p: string) => p.startsWith('/liked') },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Breaking: New AI model released by Anthropic', time: '2m ago', unread: true, searchQuery: 'Anthropic AI model' },
  { id: 2, title: 'Trending: Bitcoin surges past $90K', time: '18m ago', unread: true, searchQuery: 'Bitcoin BTC' },
  { id: 3, title: 'Apple announces WWDC 2026 keynote date', time: '45m ago', unread: false, searchQuery: 'Apple WWDC' },
  { id: 4, title: 'Live: Hacker News top story updated', time: '2h ago', unread: false, searchQuery: '' },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); setNotifOpen(false); }, [pathname]);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    } else {
      router.push('/');
    }
  }, [searchQuery, router]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotifClick = (notif: typeof MOCK_NOTIFICATIONS[0]) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    setNotifOpen(false);
    // Navigate to related content
    if (notif.searchQuery) {
      router.push(`/?q=${encodeURIComponent(notif.searchQuery)}`);
    } else {
      router.push('/live');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#05050A]/90 backdrop-blur-xl border-b border-white/5 shadow-none">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 gap-2">

        {/* ── Left: Logo + Nav ──────── */}
        <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <Link href="/" className="flex-shrink-0 group">
            <span className="text-xl font-black tracking-tighter font-headline whitespace-nowrap">
              <span className="text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors">Tech</span>
              <span className="text-[var(--primary)]"> News</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5 overflow-hidden">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1.5 rounded-md font-body font-semibold text-[13px] tracking-tight transition-all duration-150 whitespace-nowrap flex items-center gap-1 flex-shrink-0
                  ${link.match(pathname)
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                    : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container)]'
                  }`}
              >
                {link.href === '/intelligence' && <Brain size={11} />}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right: Controls ──────── */}
        <div className="flex items-center gap-1 flex-shrink-0">

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="relative hidden sm:flex items-center">
            <span className="absolute left-3 text-[var(--on-surface-variant)] pointer-events-none">
              <Search size={13} />
            </span>
            <input
              ref={searchRef}
              className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-full pl-8 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-[var(--primary)]/40 focus:outline-none focus:border-[var(--primary)]/50 w-36 focus:w-52 transition-[width] duration-200 text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]"
              placeholder="Search..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile search toggle */}
          <button
            className="sm:hidden p-2 rounded-full text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container)]"
            onClick={() => setSearchOpen(s => !s)}
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(o => !o)}
              className="relative p-2 rounded-full text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-150"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--primary)] rounded-full shadow-[0_0_6px_var(--primary)]" />
              )}
            </button>

            {notifOpen && (
              <div className="notif-dropdown fixed right-4 top-16 w-80 bg-[#16161F] border border-[var(--outline-variant)] rounded-xl shadow-2xl overflow-hidden z-[200]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--outline-variant)]">
                  <span className="text-sm font-bold text-[var(--on-surface)]">Notifications</span>
                  <span className="text-[10px] font-mono text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full">{unreadCount} NEW</span>
                </div>
                <div className="divide-y divide-[var(--outline-variant)] max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <button
                      key={n.id}
                      onClick={() => handleNotifClick(n)}
                      className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[var(--surface-container)] cursor-pointer transition-colors ${!n.unread ? 'opacity-60' : ''}`}
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.unread ? 'bg-[var(--primary)] shadow-[0_0_4px_var(--primary)]' : 'bg-transparent'}`} />
                      <div className="min-w-0">
                        <p className="text-xs text-[var(--on-surface)] font-medium leading-snug text-left">{n.title}</p>
                        <p className="text-[10px] font-mono text-[var(--on-surface-variant)] mt-1">{n.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-[var(--outline-variant)]">
                  <button onClick={markAllRead} className="w-full text-center text-[10px] font-mono text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors py-1">
                    MARK ALL AS READ
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden p-2 rounded-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="sm:hidden px-4 pb-3 pt-2 border-t border-[var(--outline-variant)] bg-[#05050A]">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Search size={14} className="text-[var(--on-surface-variant)] flex-shrink-0" />
            <input
              ref={searchRef}
              className="flex-1 bg-transparent border-b border-[var(--outline-variant)] py-1 text-sm text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)] focus:outline-none focus:border-[var(--primary)]"
              placeholder="Search tech news..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="text-[var(--primary)] text-xs font-mono font-bold">GO</button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--outline-variant)] bg-[#05050A] animate-slide-down">
          <div className="flex flex-col py-2">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-3 font-body font-semibold text-sm flex items-center gap-2 transition-all
                  ${link.match(pathname)
                    ? 'text-[var(--primary)] bg-[var(--primary)]/5'
                    : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'
                  }`}
              >
                {link.href === '/intelligence' && <Brain size={14} />}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
