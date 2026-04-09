import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-zinc-950/50 backdrop-blur-md w-full py-12 px-6 mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <span className="font-headline font-extrabold text-zinc-100 text-xl tracking-tighter">Tech Pulse</span>
          <p className="font-body italic text-base text-zinc-400">© {new Date().getFullYear()} Tech Pulse. The Digital Atelier.</p>
        </div>
        <div className="flex gap-8">
          <a className="font-body italic text-base text-zinc-500 hover:text-zinc-100 transition-colors duration-200" href="#">About</a>
          <a className="font-body italic text-base text-zinc-500 hover:text-zinc-100 transition-colors duration-200" href="#">Privacy Policy</a>
          <a className="font-body italic text-base text-zinc-500 hover:text-zinc-100 transition-colors duration-200" href="#">Contact</a>
          <a className="font-body italic text-base text-zinc-500 hover:text-zinc-100 transition-colors duration-200" href="#">RSS Feed</a>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-zinc-800 transition-all scale-95 active:scale-90 active:duration-100 text-zinc-100">
            <span className="material-symbols-outlined text-sm">language</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-zinc-800 transition-all scale-95 active:scale-90 active:duration-100 text-zinc-100">
            <span className="material-symbols-outlined text-sm">share</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
