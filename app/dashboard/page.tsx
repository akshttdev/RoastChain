'use client';
import RightSidebar from "@/components/RightSidebar";
import Link from "next/link";
import { SubmitRoast } from "@/components/roast/submit-roast";
import { RoastList } from "@/components/roast/roast-list";
import { CustomConnectButton } from "@/components/web3/connect-button";
import { useState } from 'react';

export default function Dashboard() {
  const [refetchCounter, setRefetchCounter] = useState(0);

  return (
    <div className="w-full h-full flex px-10 py-6 max-w-[1400px] mx-auto gap-12">
      
      {/* Main Content (Center) */}
      <div className="flex-1 max-w-[700px] pt-4">
        {/* Dashboard Top Nav Bar */}
        <div className="flex justify-between items-center mb-16 uppercase text-xs font-bold tracking-[0.1em] border-b border-transparent pb-4">
          <div className="flex gap-8">
            <Link href="/dashboard" className="text-white border-b border-white pb-1">BATTLES</Link>
            <Link href="#" className="text-white/60 hover:text-white pb-1 transition-colors">VOTE</Link>
            <Link href="#" className="text-white/60 hover:text-white pb-1 transition-colors">LEADERBOARD</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <CustomConnectButton />
          </div>
        </div>

        {/* Dynamic Roast Components */}
        <SubmitRoast onSubmitted={() => setRefetchCounter(prev => prev + 1)} />

        <RoastList refetchTrigger={refetchCounter} />
        
        {/* Footer */}
        <div className="mt-24 mb-10 border-t border-white/10 pt-10 flex justify-between items-center text-[9px] font-bold text-white/40 tracking-[0.15em] uppercase">
          <div>©2024 ROASTCHAIN. UNCOMPROMISING_ON_CHAIN_VIOLENCE.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">SMART_CONTRACT</Link>
            <Link href="#" className="hover:text-white transition-colors">DOCS</Link>
            <Link href="#" className="hover:text-white transition-colors">TWITTER</Link>
          </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block pt-[11px] ml-auto">
        <RightSidebar />
      </div>

    </div>
  );
}
