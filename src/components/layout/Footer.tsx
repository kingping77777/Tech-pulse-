import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-10 px-6 mt-20 border-t border-[var(--outline-variant)] bg-[var(--surface-container-low)]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <Link href="/" className="font-headline font-black text-xl tracking-tighter">
            <span className="text-[var(--on-surface)]">Tech</span>
            <span className="text-[var(--primary)]"> News</span>
          </Link>
          <p className="text-sm text-[var(--on-surface-variant)]">
            © {new Date().getFullYear()} Tech News. AI, Crypto, Startups &amp; More.
          </p>
        </div>

        <div className="flex gap-6">
          {['About', 'Privacy Policy', 'Contact', 'RSS Feed'].map(label => (
            <a
              key={label}
              className="text-sm text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors duration-150"
              href="#"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            href="/intelligence"
            className="px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-[var(--primary)] border border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 transition-colors"
          >
            AI Feed
          </Link>
          <Link
            href="/live"
            className="px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-[var(--on-surface-variant)] border border-[var(--outline-variant)] hover:text-[var(--on-surface)] transition-colors"
          >
            Live
          </Link>
        </div>
      </div>
    </footer>
  );
}
