import React from 'react';

export function StitchPage() {
    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen">
            
<header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/10">
<div className="flex items-center gap-8">
<span className="text-2xl font-bold tracking-tighter text-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.4)] headline-font">TechPulse</span>
<nav className="hidden md:flex gap-6 font-['Space_Grotesk'] text-sm tracking-tight">
<a className="text-[#00f2ff] border-b-2 border-[#00f2ff] pb-1 shadow-[0_4px_10px_rgba(0,242,255,0.2)]" href="#">AI</a>
<a className="text-[#e1e0fb]/70 hover:text-[#00f2ff] transition-colors" href="#">Startups</a>
<a className="text-[#e1e0fb]/70 hover:text-[#00f2ff] transition-colors" href="#">Hardware</a>
<a className="text-[#e1e0fb]/70 hover:text-[#00f2ff] transition-colors" href="#">Software</a>
</nav>
</div>
<div className="flex items-center gap-6">
<div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-sm border border-outline-variant/20">
<span className="material-symbols-outlined text-[14px] text-primary-container" style={{fontVariationSettings: "'FILL' 1"}}>schedule</span>
<span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Synced: 2m ago</span>
</div>
<div className="flex items-center gap-4">
<button className="text-[#e1e0fb]/70 hover:text-[#00f2ff] text-sm font-medium transition-all">Sign In</button>
<button className="px-5 py-1.5 bg-gradient-to-br from-primary to-primary-container text-on-primary text-sm font-bold rounded-sm hover:scale-105 active:scale-95 transition-all">Subscribe</button>
</div>
</div>
</header>
<aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 bg-surface w-64 border-r border-outline-variant/10 pt-20">
<div className="px-6 mb-8">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-primary-container/30">
<img alt="Avatar" className="w-full h-full object-cover" data-alt="Close up portrait of a futuristic robotic bust with glowing internal cyan light circuits and polished metallic finish." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZRs7ilExyHZurEEiT_lPog8gS7qyBapPp7qY60mucIpIdKzXSNZYtH4Nu33IVPo-wkxes55oWp5iBa_Ty1siWS0qjz2spJqVWKuSijk3vFBhgc44TVp1HeYpg_gTHzghRRMd5LKc0IuZLp8uosPMPPE_fCw1J2m4A-PEkemvCAZYbYzJmSQwDpOrcKvE3iYNFyUyIu0Zj3ru5iQf0oc8IIaGs7-ZAZNTXd8jkgX0EOY9ucC_mZB4eeRKExflm3zRqvWv2dOGr8RM"/>
</div>
<div>
<p className="text-[10px] font-mono text-primary-container uppercase tracking-wider">Synthetic Curator</p>
<p className="text-[9px] text-on-surface-variant">Scanning 14.2k nodes</p>
</div>
</div>
</div>
<nav className="flex-1 space-y-1">
<div className="bg-[#00f2ff]/5 text-[#00f2ff] border-r-2 border-[#00f2ff] px-6 py-3 flex items-center gap-3 cursor-pointer">
<span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
<span className="font-['Inter'] text-xs uppercase tracking-widest">AI Intelligence</span>
</div>
<div className="text-[#e1e0fb]/50 px-6 py-3 flex items-center gap-3 hover:bg-surface-container/50 transition-all cursor-pointer">
<span className="material-symbols-outlined text-xl">rocket_launch</span>
<span className="font-['Inter'] text-xs uppercase tracking-widest">Venture Stream</span>
</div>
<div className="text-[#e1e0fb]/50 px-6 py-3 flex items-center gap-3 hover:bg-surface-container/50 transition-all cursor-pointer">
<span className="material-symbols-outlined text-xl">memory</span>
<span className="font-['Inter'] text-xs uppercase tracking-widest">Neural Hardware</span>
</div>
<div className="text-[#e1e0fb]/50 px-6 py-3 flex items-center gap-3 hover:bg-surface-container/50 transition-all cursor-pointer">
<span className="material-symbols-outlined text-xl">terminal</span>
<span className="font-['Inter'] text-xs uppercase tracking-widest">System Software</span>
</div>
</nav>
<div className="p-6 mt-auto space-y-4 border-t border-outline-variant/10">
<div className="text-[#e1e0fb]/40 flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined text-lg">analytics</span>
<span className="font-mono text-[10px] uppercase">System Logs</span>
</div>
<div className="text-[#e1e0fb]/40 flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined text-lg">settings</span>
<span className="font-mono text-[10px] uppercase">Settings</span>
</div>
</div>
</aside>
<main className="lg:pl-64 pt-20 px-6 pb-12 min-h-screen">
<div className="grid grid-cols-12 gap-6 mt-6">
<section className="col-span-12 lg:col-span-8 space-y-6">
<div className="relative group overflow-hidden bg-surface-container-low rounded-sm border border-outline-variant/10">
<div className="aspect-[16/9] w-full overflow-hidden">
<img alt="AI Logic" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50" data-alt="Futuristic data visualization with complex blue glowing neural networks and floating geometric shapes in a dark digital space." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDmAR7GtZ8CMNwwZP6qUlObOeZzX4qIlySCq5dmcfyPaYgzAMZQJv4ap2ldi86WTDcJZxpGeDfoNt2lyDZ_g2_DQihPyJvriv890fV1VQ9wMY4D9_pBDm8fJ-OUhgGdMwHkWJYhiQrtxZW7idPgyJVY8iCD8FWFyFpXH9ZCVv5HYQi7pUVrbfKE1rEtTGPOXqSH6qq4Ne1r8pj6z-_mwIMKLN_jz-e5zcYELk0nUC86acWlnQUcRzQI_q9neG4SmaHo7d73orLVbI"/>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent flex flex-col justify-end p-8">
<div className="flex gap-3 mb-4">
<span className="px-2 py-1 bg-primary-container/20 border border-primary-container/30 text-primary-container text-[10px] font-bold uppercase tracking-tighter headline-font backdrop-blur-md">
                                Genkit Analysis: Critical Story
                            </span>
<span className="px-2 py-1 bg-secondary-container/20 border border-secondary-container/30 text-secondary-container text-[10px] font-bold uppercase tracking-tighter headline-font backdrop-blur-md">
                                Real-Time Intelligence
                            </span>
</div>
<h1 className="text-4xl lg:text-6xl font-bold headline-font leading-[0.95] tracking-tighter mb-4 max-w-2xl text-primary drop-shadow-[0_4px_12px_rgba(0,242,255,0.2)]">
                            AI Surpasses Human Performance in Real-Time Logic
                        </h1>
<p className="text-on-surface-variant text-base max-w-xl mb-6">
                            Breakthrough neural architecture demonstrates cognitive speeds 1000x faster than biological synapses in deductive reasoning tests.
                        </p>
<div className="flex items-center gap-4">
<button className="px-6 py-2 bg-primary-container text-on-primary text-sm font-bold rounded-sm flex items-center gap-2 hover:brightness-110 transition-all">
                                READ FULL BRIEF
                                <span className="material-symbols-outlined text-sm">north_east</span>
</button>
<span className="text-xs font-mono text-on-surface-variant/80">BY ELARA VANCE • 4M AGO</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-surface-container p-6 rounded-sm border-l-2 border-secondary-container transition-all hover:bg-surface-container-high group border border-outline-variant/10">
<div className="flex justify-between items-start mb-4">
<span className="text-[10px] font-mono text-secondary tracking-widest uppercase">Venture stream</span>
<span className="material-symbols-outlined text-secondary-container text-sm">trending_up</span>
</div>
<h3 className="text-xl font-bold headline-font mb-3 group-hover:text-secondary transition-colors">Seed Round: NeuroCore Raises $450M for Edge AI</h3>
<p className="text-on-surface-variant text-sm mb-4 leading-relaxed">Infrastructure giants pivot toward decentralized silicon synthesis in latest funding surge.</p>
<div className="flex justify-between items-center text-[10px] font-mono opacity-40">
<span>12 MIN READ</span>
<span>#HARDWARE</span>
</div>
</div>
<div className="bg-surface-container p-6 rounded-sm border-l-2 border-primary-container transition-all hover:bg-surface-container-high group border border-outline-variant/10">
<div className="flex justify-between items-start mb-4">
<span className="text-[10px] font-mono text-primary-container tracking-widest uppercase">Software patch</span>
<span className="material-symbols-outlined text-primary-container text-sm">terminal</span>
</div>
<h3 className="text-xl font-bold headline-font mb-3 group-hover:text-primary-container transition-colors">Kernel 0.9.4: The End of Buffer Overflows?</h3>
<p className="text-on-surface-variant text-sm mb-4 leading-relaxed">New memory-safe architecture implemented at the hardware-abstraction layer shows promise.</p>
<div className="flex justify-between items-center text-[10px] font-mono opacity-40">
<span>8 MIN READ</span>
<span>#SECURITY</span>
</div>
</div>
</div>
</section>
<aside className="col-span-12 lg:col-span-4 space-y-6">
<div className="bg-surface-container-low p-6 rounded-sm border border-outline-variant/15">
<div className="flex items-center justify-between mb-6">
<h2 className="text-sm font-bold headline-font tracking-widest uppercase text-on-surface">Neural Feed</h2>
<span className="flex h-2 w-2 rounded-full bg-primary-container animate-pulse"></span>
</div>
<div className="space-y-8">
<div className="flex gap-4 group cursor-pointer">
<div className="w-20 h-20 shrink-0 bg-surface-container-highest overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all border border-outline-variant/10">
<img alt="Hardware" className="w-full h-full object-cover" data-alt="Macro photography of a sleek microchip circuit board with intricate copper pathways and glowing gold accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_OCv3zo0X8mTYdXuormD-g6FQ7R2OcSjBV2Yks8QBPOf9Jsf3kiucUfrgEMd8LnmlfMwZE_rsaHNpsIgP53Kstxbw7b00vBI5L8Bv3s_qmSnliN9jd0pIEhXep0KvvaCyDQEgmczpBHjXPvCshoeShcqgj97s4Pj4G9KeKykY9UyBkD83STKvFnituQQ1SYE6hrw69hFZUj44rUFAeIhKOsvAoiaHBp3u_I9VDJY6XY4-KRHf5oKI5ByZ0G9GFoL9LJ5_u6_3A5s"/>
</div>
<div className="flex flex-col justify-center">
<span className="text-[9px] font-mono text-primary-container uppercase mb-1">10 MIN READ</span>
<h4 className="text-sm font-bold headline-font leading-tight group-hover:text-primary-container transition-colors">Photonics: The light-speed chip race heats up</h4>
<p className="text-[10px] text-on-surface-variant mt-1">2 hours ago</p>
</div>
</div>
<div className="flex gap-4 group cursor-pointer">
<div className="w-20 h-20 shrink-0 bg-surface-container-highest overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all border border-outline-variant/10">
<img alt="Cybersecurity" className="w-full h-full object-cover" data-alt="Digital encryption concept with glowing green binary code flowing like a matrix waterfall on a dark screen." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM45hLVKthptPkTFQIpxJXSqAlYYW9f0qEMOPcINzvGBHL_eakjXUCTgVAe0bFY6vTn2A4BsmoqWpek_q1SdN1jTT62mckD6IoWmuDLV2nn_yEe4Ffe5GXrYTy9k7RC9u2rwLtJbmJ_tJyjIwe7RI8uHCatqZg1EeT0hWtqtQt9Q6Nn37m_Te8JbXiSdPgvlMD6-IgPHoY2qdL7_-kdKOJxoTz8wwC8Yk1_Y8R6bRcJzjo3W886Su8lrSBVPpBJ0_InUNPONOotKA"/>
</div>
<div className="flex flex-col justify-center">
<span className="text-[9px] font-mono text-primary-container uppercase mb-1">15 MIN READ</span>
<h4 className="text-sm font-bold headline-font leading-tight group-hover:text-primary-container transition-colors">Encrypted Reality: VR Privacy at Risk</h4>
<p className="text-[10px] text-on-surface-variant mt-1">4 hours ago</p>
</div>
</div>
<div className="flex gap-4 group cursor-pointer">
<div className="w-20 h-20 shrink-0 bg-surface-container-highest overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all border border-outline-variant/10">
<img alt="Global Tech" className="w-full h-full object-cover" data-alt="Satellite view of Earth at night with glowing city lights and atmospheric blue haze around the horizon." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDbMzSXhAd8i0DGbenbjgdN7q6O4dxniYsEFr8C4sDtSsM5HjzzhSb1KXPoPnOQMZ842abBH3DVtWhluWLo9pI_hGohyuBnRIUi8DZReHJxJjlcI4kuhmNdQndIidkvAI3o4ApIv3IoUb-4fT7pernuW3V1_MXzLiDS83stcmi3gkJSOXcjMuXLwxCm9pkShtG-bXmOxoyzcGLOX72fFOnyQG9wpCdiPpYuHrebemUcnxITMi3t9E-rOX2JzGRVrt-G6XdCW-Gipw"/>
</div>
<div className="flex flex-col justify-center">
<span className="text-[9px] font-mono text-primary-container uppercase mb-1">6 MIN READ</span>
<h4 className="text-sm font-bold headline-font leading-tight group-hover:text-primary-container transition-colors">Satellite Mesh: Connecting the Unreachable</h4>
<p className="text-[10px] text-on-surface-variant mt-1">5 hours ago</p>
</div>
</div>
</div>
<button className="w-full mt-8 py-3 border border-outline-variant/30 hover:border-primary-container/50 text-[10px] font-mono uppercase tracking-widest transition-all hover:text-primary-container">
                        Initialize Full Archive
                    </button>
</div>
<div className="bg-surface-container p-6 rounded-sm border border-outline-variant/15">
<h3 className="text-xs font-bold headline-font uppercase tracking-widest text-primary-container mb-4">Neural Sentiment</h3>
<div className="space-y-4">
<div>
<div className="flex justify-between text-[10px] mb-1 font-mono uppercase text-on-surface-variant">
<span>AI Optimism</span>
<span>94%</span>
</div>
<div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container w-[94%] shadow-[0_0_8px_rgba(0,242,255,0.4)]"></div>
</div>
</div>
<div>
<div className="flex justify-between text-[10px] mb-1 font-mono uppercase text-on-surface-variant">
<span>Market Volatility</span>
<span>12%</span>
</div>
<div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary-container w-[12%] shadow-[0_0_8px_rgba(206,93,255,0.4)]"></div>
</div>
</div>
</div>
</div>
</aside>
</div>
<section className="mt-12">
<div className="flex items-center gap-4 mb-8">
<h2 className="text-2xl font-bold headline-font tracking-tighter">Deep Stream Analysis</h2>
<div className="h-px flex-1 bg-gradient-to-r from-outline-variant/50 to-transparent"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
<div className="aspect-square bg-surface-container-low group cursor-pointer relative overflow-hidden border border-outline-variant/10 rounded-sm">
<img alt="Topic 1" className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" data-alt="Abstract render of floating neon purple and cyan geometric particles in a dark void with soft motion blur." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_vuOg9nsDH5PIPbVmKpZuOwXUHvc1ndpGfJ7Mw_Bcz3BiUPzjx3F3CeGI_f6iSuLB2c7l3-_ELbRdNLUrc_rNFb5kEfwPQ-Tab3vATqliN1wugl0glIZiBimXqLjmv7IMiyF60xjAMOEUe5JwQrDVUrPd9XnIdIaJOgrpZYgHkmkfoMoznYCMNbFrahNeRMCu0G962nNP4gWBA-yu-GovsFPyj0rbNEbENBU_GHDgPgZbg6G-jN3R9TpUjIvNYgtguLzl5jesquQ"/>
<div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-surface to-transparent">
<span className="material-symbols-outlined text-primary-container">science</span>
<h4 className="text-lg font-bold headline-font leading-tight">Quantum Entanglement in Consumer CPUs</h4>
</div>
</div>
<div className="aspect-square bg-surface-container-low group cursor-pointer relative overflow-hidden border border-outline-variant/10 rounded-sm">
<img alt="Topic 2" className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" data-alt="Sophisticated humanoid robot hands performing delicate surgical tasks with precision in a high-tech lab setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfUBmLC_bJqZgLzo2KCo44-KTls9S7DTCKGIWY5RZbpF3aSYDoQmN-5KYC1jP1eGpIldFyklqEzlnh-Bh_D7PK3XR4vR0kraPWvlgwP5YYiYBmY1wOVq8P-D0RnSlpsNKnRVoeqWyFJ4EFym6s4PeAHYOObMvHkKWVjxQlLIyYYJ7LKIGJCqv77UFXBX9bKRaU9yjUaJWaleh2ZeCT9-R9tfqoFPdvTcjWbkjiGWsf_93_8UV8vI6sJOiDNjbIuXabI94GETF0JX4"/>
<div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-surface to-transparent">
<span className="material-symbols-outlined text-primary-container">precision_manufacturing</span>
<h4 className="text-lg font-bold headline-font leading-tight">Robotic Precision Reaches Nano-Scale</h4>
</div>
</div>
<div className="aspect-square bg-surface-container-low group cursor-pointer relative overflow-hidden border border-outline-variant/10 rounded-sm">
<img alt="Topic 3" className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" data-alt="Collection of vintage 80s gaming consoles and neon lights reflected in polished dark glass surfaces." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUogkSChqK6M4VxCr84mQpbSFWGnMWueh4BCNDyLCUXIGzYl787H8bIQO8BN2tohgfV3dP7_v_gzpWT-5mmPO5t5LAndysqvf6WmggvCs0WQ4ZrQQDrDUjsRv3s9wSF8ZrqnIFR8K56uJcdVsIZlx_-fVM-P0mnOt7DLVa_XQZCAdfapj8gxk92Fxx7F5U50PnM3nxSlXsdL-RLzFOwHkXBJmdfIRo_NJZaNh30hmFH8UDSFQwfgQQp8isr5D3-85Z5BAQekLtd_w"/>
<div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-surface to-transparent">
<span className="material-symbols-outlined text-primary-container">videogame_asset</span>
<h4 className="text-lg font-bold headline-font leading-tight">Legacy Silicon: The Retro-Hardware Boom</h4>
</div>
</div>
<div className="aspect-square bg-surface-container-low group cursor-pointer relative overflow-hidden border border-outline-variant/10 rounded-sm">
<img alt="Topic 4" className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" data-alt="Futuristic financial charts and graphs glowing in 3D holographic display over a dark grid background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI9zxls0lWXLmMcKWRX-5MUPqkc7VhkOpvzMOx9-KPHrqMuMt6Y6Rm94YAe_vBXnwCdu_caPZneyfvygV_oo6QvgL4Bj_NoQjzug6XPOF2NfRkK6Op6tGPpN2W8YbMBykWN1t-1jdNPTahw8oQNxUY5JOXIFj1g7lEnWq-5JuVNTtcFm9FcXxQoBTNrGN9w2INAvagNcgzAyW1Od8odRyUhXjBSF7LwOHurZg8c9nc1RH7f-Cj7ldyynIPXU6qilvBN1_z-qgr-J0"/>
<div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-surface to-transparent">
<span className="material-symbols-outlined text-primary-container">monitoring</span>
<h4 className="text-lg font-bold headline-font leading-tight">Predictive Markets: AI as the New Broker</h4>
</div>
</div>
</div>
</section>
</main>
<footer className="w-full border-t border-outline-variant/10 bg-surface py-8 px-6 lg:pl-72 flex flex-col md:flex-row justify-between items-center gap-4">
<div className="flex flex-col gap-1">
<span className="text-[#00f2ff] text-lg font-bold headline-font tracking-tighter">TechPulse</span>
<span className="text-[#e1e0fb]/40 font-mono text-[10px] uppercase">© 2024 TechPulse Intelligence</span>
</div>
<div className="flex flex-wrap justify-center gap-8">
<a className="text-[#e1e0fb]/40 hover:text-[#00f2ff] font-mono text-[10px] uppercase transition-colors" href="#">Genkit Status: Scanning</a>
<a className="text-[#e1e0fb]/40 hover:text-[#00f2ff] font-mono text-[10px] uppercase transition-colors" href="#">API Access</a>
<a className="text-[#e1e0fb]/40 hover:text-[#00f2ff] font-mono text-[10px] uppercase transition-colors" href="#">Neural Privacy</a>
<a className="text-[#e1e0fb]/40 hover:text-[#00f2ff] font-mono text-[10px] uppercase transition-colors" href="#">Terminals</a>
</div>
</footer>

        </div>
    );
}
