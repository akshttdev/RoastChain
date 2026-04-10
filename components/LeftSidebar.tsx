'use client';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { usePathname } from 'next/navigation';

export default function LeftSidebar() {
  const { address } = useAccount();
  const pathname = usePathname();

  const formattedAddress = address 
    ? `${address.substring(0,6)}...${address.substring(address.length-4)}`.toUpperCase()
    : '0X...0000';

  const isArena = pathname === '/dashboard';
  const isMyRoasts = pathname === '/dashboard/my-roasts';

  return (
    <aside className="w-[280px] h-screen bg-[#0a0a0a] border-r border-white/10 flex flex-col fixed left-0 top-0 z-10">
      {/* Brand */}
      <div className="p-8 pb-12">
        <Link href="/" className="text-xl font-black tracking-tight uppercase hover:opacity-80 transition-opacity block leading-none">
          ROASTCHAIN
        </Link>
        <div className="text-[9px] font-bold text-white/40 tracking-[0.2em] mt-2 uppercase">
          THE VOID
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col">
        <Link href="/dashboard" className={`flex items-center gap-4 px-8 py-4 font-bold text-xs uppercase tracking-[0.15em] transition-all ${isArena ? 'bg-white/10 text-white border-l-2 border-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 19L19 5M5 5l14 14" strokeLinecap="square" />
          </svg>
          ARENA
        </Link>
        <Link href="/dashboard/my-roasts" className={`flex items-center gap-4 px-8 py-4 font-bold text-xs uppercase tracking-[0.15em] transition-all ${isMyRoasts ? 'bg-white/10 text-white border-l-2 border-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          MY ROASTS
        </Link>
      </nav>

      {/* Action / Wallet Bottom */}
      <div className="p-6 mb-4">
        <div className="bg-[#141414] border border-white/10 p-4 w-full">
          <div className="text-[8px] font-bold tracking-[0.15em] text-white/40 uppercase mb-1">WALLET</div>
          <div className="font-mono text-xs text-white/80 tracking-widest">{formattedAddress}</div>
        </div>
      </div>
    </aside>
  );
}
