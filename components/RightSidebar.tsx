'use client';
import { Leaderboard } from './roast/leaderboard';

export default function RightSidebar() {
  return (
    <aside className="w-[320px] pb-10 flex flex-col gap-6">
      
      {/* Top Nav Replacements for matching */}
      <div className="flex justify-end gap-12 font-bold text-[10px] uppercase tracking-[0.1em] opacity-0 pointer-events-none mb-6">
         &nbsp;
      </div>

      {/* Leaderboard and Burners Dynamic Data */}
      <Leaderboard />

      {/* System Active Illustration */}
      <div className="bg-[#0f0f0f] border border-white/10 flex flex-col items-center justify-between min-h-[260px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
        <div className="relative z-0 opacity-40 group-hover:opacity-60 transition-opacity mt-8 w-full flex justify-center items-center h-40">
           <svg className="w-40 h-40 object-cover" viewBox="0 0 100 100" fill="currentColor" opacity="0.3">
               <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" stroke="white" strokeWidth="2" fill="none"/>
               <polygon points="50,20 80,35 50,50 20,35" stroke="white" strokeWidth="2" fill="none"/>
               <polygon points="50,50 80,35 80,65 50,80" stroke="white" strokeWidth="2" fill="none"/>
               <polygon points="50,50 20,35 20,65 50,80" stroke="white" strokeWidth="2" fill="none"/>
           </svg>
        </div>
        <div className="relative z-20 text-[8px] tracking-[0.3em] uppercase text-white/30 mt-auto w-full pt-4 pb-6 px-6 text-left border-t border-white/5">
          SYSTEM_ACTIVE
        </div>
      </div>

    </aside>
  );
}
