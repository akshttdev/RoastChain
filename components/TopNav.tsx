'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomConnectButton } from "@/components/web3/connect-button";

export function TopNav() {
  const pathname = usePathname();

  const isArena = pathname === '/dashboard';
  const isLeaderboard = pathname === '/dashboard/leaderboard';

  return (
    <div className="flex justify-between items-center w-full pt-8 px-10 pb-6 mb-8 uppercase text-xs font-bold tracking-[0.1em] border-b border-transparent max-w-[1400px] mx-auto">
      <div className="flex gap-8">
        <Link href="/dashboard" className={`pb-1 transition-colors ${isArena ? 'text-white border-b border-white' : 'text-white/60 hover:text-white'}`}>BATTLES</Link>
        <Link href="/dashboard/leaderboard" className={`pb-1 transition-colors ${isLeaderboard ? 'text-white border-b border-white' : 'text-white/60 hover:text-white'}`}>LEADERBOARD</Link>
      </div>
      
      <div className="flex items-center gap-6">
        <CustomConnectButton />
      </div>
    </div>
  );
}
