import React from 'react';
import Link from 'next/link';

export function CyberHeader() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold tracking-tighter text-primary-container drop-shadow-[0_0_8px_rgba(0,242,255,0.4)] headline-font">
          TechPulse
        </span>
        <nav className="hidden md:flex gap-6 font-['Space_Grotesk'] text-sm tracking-tight">
          <Link href="/" className="text-primary-container border-b-2 border-primary-container pb-1 shadow-[0_4px_10px_rgba(0,242,255,0.2)]">
            Intelligence Feed
          </Link>
          <Link href="#" className="text-on-surface/70 hover:text-primary-container transition-colors">
            Startups
          </Link>
          <Link href="#" className="text-on-surface/70 hover:text-primary-container transition-colors">
            Hardware
          </Link>
          <Link href="#" className="text-on-surface/70 hover:text-primary-container transition-colors">
            Software
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-sm border border-outline-variant/20">
          <span className="material-symbols-outlined text-[14px] text-primary-container" style={{fontVariationSettings: "'FILL' 1"}}>schedule</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Live Syncing</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface/70 hover:text-primary-container text-sm font-medium transition-all">Console</button>
          <button className="px-5 py-1.5 bg-gradient-to-br from-primary to-primary-container text-on-primary text-sm font-bold rounded-sm hover:scale-105 active:scale-95 transition-all">
            Initialize
          </button>
        </div>
      </div>
    </header>
  );
}
