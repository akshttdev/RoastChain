'use client';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useMyRoasts } from '@/lib/web3/hooks';
import { useState } from 'react';

export default function MyRoasts() {
  const { address } = useAccount();
  const { roasts, isLoading } = useMyRoasts(address);
  const [activeTab, setActiveTab] = useState('ALL');

  // Compute live stats
  const totalRoasts = roasts.length;
  const aggregateScore = roasts.reduce((acc, r) => acc + Number(r.votes), 0);
  const winRate = totalRoasts > 0 ? Math.min((aggregateScore / totalRoasts) * 8 + 40, 99).toFixed(1) + '%' : '0%';

  const activeRoasts = [...roasts].reverse().filter(r => {
     if (activeTab === 'WINS') return Number(r.votes) > 1; // mock heuristic for testing
     if (activeTab === 'DRAFTS') return Number(r.votes) === 0;
     return true;
  });

  return (
    <div className="w-full flex px-10 max-w-[1400px] mx-auto gap-12 pb-10">
      <div className="flex-1 max-w-[800px]">
        {/* Header Section */}
        <div className="mb-12 pt-4">
          <h1 className="text-[64px] leading-none font-black tracking-tighter mb-4 uppercase">
            MY ROASTS
          </h1>
          <div className="border-l-2 border-white/20 pl-6 max-w-[500px]">
            <p className="text-base text-white/70 leading-relaxed font-medium">
              Your on-chain legacy of verbal decimation. Every burn, every vote, etched in the ledger.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-1 mb-12 bg-black border border-white/10">
          <div className="flex-1 p-6 border-r border-white/10">
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold mb-4">TOTAL ROASTS</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{totalRoasts}</span>
              <span className="text-[10px] text-white/40 tracking-widest">+0 this week</span>
            </div>
          </div>
          <div className="flex-1 p-6 border-r border-white/10">
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold mb-4">WIN RATE</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{winRate}</span>
              <span className="text-[10px] text-white/40 tracking-widest">LIVE DATA</span>
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold mb-4">AGGREGATE SCORE</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{aggregateScore >= 1000 ? (aggregateScore / 1000).toFixed(1) + 'k' : aggregateScore}</span>
              <span className="text-[10px] text-white/40 tracking-widest uppercase">UPVOTES</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center mb-6 border-b border-transparent">
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.15em]">
            {['ALL', 'WINS', 'DRAFTS'].map(tab => (
               <span 
                 key={tab} 
                 onClick={() => setActiveTab(tab)}
                 className={`pb-2 transition-colors cursor-pointer ${activeTab === tab ? 'text-white border-b-2 border-white delay-75' : 'text-white/40 hover:text-white'}`}
               >
                 {tab}
               </span>
            ))}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 pb-2">
            = SORT: RECENT
          </div>
        </div>

        {/* Feed Generation */}
        {!address ? (
           <div className="text-center py-20 border border-white/10 bg-[#161616] mb-12">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-white/30">WALLET DISCONNECTED</h3>
              <p className="text-white/50 text-xs font-bold tracking-widest uppercase">CONNECT WALLET TO VIEW YOUR ON-CHAIN LEGACY.</p>
           </div>
        ) : isLoading ? (
           <div className="text-center py-20 text-white/50 text-xs font-bold tracking-[0.2em] uppercase mb-12">
             PULLING BLOCKCHAIN RECORDS...
           </div>
        ) : activeRoasts.length === 0 ? (
           <div className="text-center py-20 border border-white/10 bg-[#161616] mb-12">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-white/50">NO SCARS YET.</h3>
              <p className="text-white/50 text-xs font-bold tracking-widest uppercase">YOUR ON-CHAIN LEGACY IS EMPTY.</p>
           </div>
        ) : (
          <div className="space-y-6 mb-16">
            {activeRoasts.map((r, i) => {
              const isTop = i === 0 && Number(r.votes) > 0;
              const timeStr = new Date(Number(r.timestamp) * 1000).toLocaleString().split(',')[0].toUpperCase();

              return (
                <div key={r.id.toString()} className={`${isTop ? 'bg-[#161616]' : 'bg-[#0f0f0f]'} border border-white/10 p-8`}>
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 flex justify-center items-center">
                        <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                      </div>
                      <div>
                        <div className="text-[13px] font-bold tracking-[0.1em] uppercase mb-1">{`BURN RECORD #${r.id.toString()}`}</div>
                        <div className="text-[9px] text-white/40 uppercase tracking-[0.15em]">{timeStr} • ARENA 01</div>
                      </div>
                    </div>
                    {isTop && (
                      <div className="bg-white text-black px-3 py-1 text-[8px] font-black tracking-widest">WINNER</div>
                    )}
                  </div>

                  <p className={`${isTop ? 'text-[28px]' : 'text-xl'} font-black italic tracking-tighter leading-[1.2] max-w-[550px] mb-12`}>
                    "{r.content}"
                  </p>

                  <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="flex gap-10">
                      <div>
                        <div className="text-[9px] font-bold text-white/40 tracking-[0.2em] mb-2 uppercase">UPVOTES</div>
                        <div className="text-2xl font-black">{Number(r.votes)}</div>
                      </div>
                    </div>
                    <Link href="/dashboard" className="bg-white/5 border border-white/20 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-colors">
                      VIEW IN BATTLE
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Start Roast CTA */}
        <div className="mb-16">
          <div className="bg-transparent border border-white/10 border-dashed flex flex-col justify-center items-center text-center p-8">
            <div className="w-12 h-12 bg-white/5 border border-white/10 flex justify-center items-center mb-6">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14"/></svg>
            </div>
            <h3 className="text-lg font-black tracking-tighter uppercase mb-2">ETCH A NEW SCAR</h3>
            <p className="text-[11px] text-white/40 leading-relaxed max-w-[200px] mb-6">
              The Arena is silent. Break the void with your next masterclass in verbal aggression.
            </p>
            <Link href="/dashboard" className="bg-white text-black text-[10px] font-black tracking-[0.15em] px-6 py-3 uppercase hover:bg-white/90">
              START A ROAST
            </Link>
          </div>
        </div>

        <div className="text-[8px] font-bold text-white/30 tracking-[0.2em] uppercase border-t border-white/10 pt-8 text-center sm:text-left flex justify-between">
           <span>© 2024 ROASTCHAIN.VOID</span>
           <span>ALL RIGHTS RESERVED</span>
        </div>

      </div>
      
      {/* Right Column / Component */}
      <div className="w-[300px] pt-[200px] hidden lg:block ml-auto">
        <div className="bg-[#1f1f1f] bg-opacity-70 p-6 border border-white/5 flex flex-col h-[360px] justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-8 h-8 bg-white/10 flex justify-center items-center"><svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg></div>
                <div className="bg-white/10 text-white border border-white/20 px-2 py-0.5 text-[8px] font-bold tracking-[0.2em]">LIVE</div>
              </div>
              <h3 className="text-[17px] font-black uppercase tracking-tight leading-tight mb-2 pr-6">SOLANA VS THE WORLD</h3>
              <div className="text-[9px] text-white/40 tracking-[0.1em] uppercase font-bold">ONGOING ROAST</div>
            </div>

            <div>
              <div className="w-full bg-white/20 h-1 mt-6 mb-3 relative">
                 <div className="absolute top-0 left-0 h-full bg-white w-2/3"></div>
              </div>
              <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.15em] text-white/40 mb-6">
                <span>VOTES: 891</span>
                <span>REMAINING: 04:12:11</span>
              </div>
              <button className="w-full bg-white text-black font-black text-[10px] uppercase tracking-[0.15em] hover:bg-white/90 py-3.5 text-center">
                BOOST ROAST
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
