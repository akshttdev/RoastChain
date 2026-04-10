'use client';
import Link from 'next/link';
import { useAccount } from 'wagmi';

export default function LeftSidebar() {
  const { address } = useAccount();

  const formattedAddress = address 
    ? `${address.substring(0,6)}...${address.substring(address.length-4)}`.toUpperCase()
    : '0X...0000';

  const userName = address 
    ? `BURNER_${address.substring(2,6).toUpperCase()}` 
    : 'ANONYMOUS_ROASTER';

  return (
    <aside className="w-[280px] h-screen bg-[#0a0a0a] border-r border-white/10 flex flex-col fixed left-0 top-0 z-10">
      {/* Brand */}
      <div className="p-6">
        <Link href="/" className="text-xl font-black tracking-tight uppercase hover:opacity-80 transition-opacity block">
          ROASTCHAIN
        </Link>
      </div>

      {/* User */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-white/10 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-800 to-amber-600 border border-white/20 shadow-inner flex shrink-0 justify-center items-center">
          <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-white overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
            {userName}
          </div>
          <div className="text-[9px] text-white/40 tracking-widest mt-0.5">{formattedAddress}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col mt-2">
        <Link href="/dashboard" className="flex items-center gap-4 px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.15em]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 19L19 5M5 5l14 14" strokeLinecap="square" />
          </svg>
          ARENA
        </Link>
        <Link href="#" className="flex items-center gap-4 px-8 py-4 text-white/50 hover:text-white font-bold text-xs uppercase tracking-[0.15em] transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
          </svg>
          MY_ROASTS
        </Link>
        <Link href="#" className="flex items-center gap-4 px-8 py-4 text-white/50 hover:text-white font-bold text-xs uppercase tracking-[0.15em] transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          VAULT
        </Link>
        <Link href="#" className="flex items-center gap-4 px-8 py-4 text-white/50 hover:text-white font-bold text-xs uppercase tracking-[0.15em] transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.8.96 1.41.97H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
          SETTINGS
        </Link>
      </nav>

      {/* Action */}
      <div className="p-6 mb-8">
        <button className="w-full bg-transparent border border-white text-white font-bold text-xs uppercase tracking-[0.15em] py-4 hover:bg-white hover:text-black transition-all">
          START_BATTLE
        </button>
      </div>
    </aside>
  );
}
