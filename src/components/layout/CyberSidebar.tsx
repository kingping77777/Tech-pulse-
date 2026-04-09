import React from 'react';

export function CyberSidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 bg-surface w-64 border-r border-outline-variant/10 pt-20">
        <div className="px-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-primary-container/30">
                    <img 
                      alt="Avatar" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZRs7ilExyHZurEEiT_lPog8gS7qyBapPp7qY60mucIpIdKzXSNZYtH4Nu33IVPo-wkxes55oWp5iBa_Ty1siWS0qjz2spJqVWKuSijk3vFBhgc44TVp1HeYpg_gTHzghRRMd5LKc0IuZLp8uosPMPPE_fCw1J2m4A-PEkemvCAZYbYzJmSQwDpOrcKvE3iYNFyUyIu0Zj3ru5iQf0oc8IIaGs7-ZAZNTXd8jkgX0EOY9ucC_mZB4eeRKExflm3zRqvWv2dOGr8RM"
                    />
                </div>
                <div>
                    <p className="text-[10px] font-mono text-primary-container uppercase tracking-wider">Synthetic Curator</p>
                    <p className="text-[9px] text-on-surface-variant">Scanning global nodes</p>
                </div>
            </div>
        </div>
        <nav className="flex-1 space-y-1">
            <div className="bg-primary-container/5 text-primary-container border-r-2 border-primary-container px-6 py-3 flex items-center gap-3 cursor-pointer">
                <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
                <span className="font-sans text-xs uppercase tracking-widest">AI Intelligence</span>
            </div>
            <div className="text-on-surface/50 px-6 py-3 flex items-center gap-3 hover:bg-surface-container/50 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">rocket_launch</span>
                <span className="font-sans text-xs uppercase tracking-widest">Venture Stream</span>
            </div>
            <div className="text-on-surface/50 px-6 py-3 flex items-center gap-3 hover:bg-surface-container/50 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">memory</span>
                <span className="font-sans text-xs uppercase tracking-widest">Neural Hardware</span>
            </div>
            <div className="text-on-surface/50 px-6 py-3 flex items-center gap-3 hover:bg-surface-container/50 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">terminal</span>
                <span className="font-sans text-xs uppercase tracking-widest">System Software</span>
            </div>
        </nav>
        <div className="p-6 mt-auto space-y-4 border-t border-outline-variant/10">
            <div className="text-on-surface/40 flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-lg">analytics</span>
                <span className="font-mono text-[10px] uppercase">System Logs</span>
            </div>
            <div className="text-on-surface/40 flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-lg">settings</span>
                <span className="font-mono text-[10px] uppercase">Settings</span>
            </div>
        </div>
    </aside>
  );
}
