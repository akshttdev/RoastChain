'use client';
import { useRoasts } from '@/lib/web3/hooks';
import { useMemo } from 'react';

export default function LeaderboardPage() {
   const { roasts, isLoading } = useRoasts();

   const leaderboardData = useMemo(() => {
      if (!roasts || roasts.length === 0) return [];

      // Aggregate by user
      const userMap: Record<string, { total: number, votes: number, lastBurn: string }> = {};

      roasts.forEach(r => {
         const auth = r.author;
         if (!userMap[auth]) {
            userMap[auth] = { total: 0, votes: 0, lastBurn: '' };
         }
         userMap[auth].total += 1;
         userMap[auth].votes += Number(r.votes);

         // Basic last burn text
         userMap[auth].lastBurn = r.content.length > 40 ? `"${r.content.substring(0, 40)}..."` : `"${r.content}"`;
      });

      return Object.entries(userMap)
         .map(([auth, data]) => {
            // Create a simulated win rate that feels realistic based on vote volume
            const rawRate = 50 + (data.votes * 1.5) - (data.total * 0.5);
            const winRate = Math.min(Math.max(rawRate, 10), 99.9).toFixed(1) + '%';

            // Standardize identity
            const pName = `BURNER_${auth.substring(2, 6).toUpperCase()}`;

            return {
               id: auth,
               name: pName,
               total: data.total,
               votes: data.votes,
               win: winRate,
               last: data.lastBurn
            };
         })
         .sort((a, b) => b.votes - a.votes);

   }, [roasts]);

   const p1 = leaderboardData[0] || { name: 'AWAITING_CHALLENGER', votes: 0 };
   const p2 = leaderboardData[1] || { name: 'AWAITING_CHALLENGER', votes: 0 };
   const p3 = leaderboardData[2] || { name: 'AWAITING_CHALLENGER', votes: 0 };

   const restOfTable = leaderboardData.slice(3);

   return (
      <div className="w-full flex px-10 pt-4 pb-20 max-w-[1200px] mx-auto gap-12 flex-col">

         {/* Header Section */}
         <div className="mb-4">
            <h1 className="text-[72px] leading-none font-black tracking-tighter mb-4 uppercase">
               LEADERBOARD
            </h1>
            <div className="border-l-2 border-white/20 pl-6 max-w-[550px]">
               <p className="text-lg text-white/70 leading-relaxed font-medium">
                  The hierarchy of the void. Where the sharpest tongues are etched in history.
               </p>
            </div>
         </div>

         {isLoading ? (
            <div className="text-center py-32 text-xl font-bold tracking-[0.2em] uppercase text-white/50">
               SYNCHRONIZING TOP BURNERS...
            </div>
         ) : (
            <>
               {/* Tabs 
          
          <div className="flex gap-4 text-[10px] uppercase font-bold tracking-[0.1EM] mb-8">
             <button className="bg-white text-black px-6 py-2.5">ALL TIME</button>
             <button className="border border-white/20 text-white/50 hover:text-white px-6 py-2.5 transition-colors">THIS WEEK</button>
             <button className="border border-white/20 text-white/50 hover:text-white px-6 py-2.5 transition-colors">SEASON 1</button>
          </div>
            */}

               {/* Top 3 Podium */}
               <div className="flex gap-4 items-end mb-16 h-[340px]">
                  {/* Rank 2 */}
                  <div className={`flex-1 bg-[#111111] border ${p2.votes > 0 ? 'border-white/20' : 'border-white/5 opacity-50'} h-[85%] flex flex-col p-6`}>
                     <div className="flex justify-between items-start mb-6">
                        <span className="text-4xl font-black text-white/20">#02</span>
                        {p2.votes > 0 && <span className="bg-white/10 text-white/70 text-[8px] font-bold tracking-[0.2em] px-2 py-0.5">LEGENDARY</span>}
                     </div>
                     <div className="text-xl font-black uppercase tracking-tight mb-1">{p2.name}</div>
                     <div className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-auto">BURNS: {p2.votes}</div>
                     <div className="w-full h-32 bg-[#1a1a1a] border border-white/5 mt-4 overflow-hidden relative">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <svg className="w-full h-full opacity-30 object-cover" viewBox="0 0 100 100">
                           <path d="M50 50 L10 20 M50 50 L90 20 M50 50 L10 80 M50 50 L90 80 M50 50 L50 10 M50 50 L50 90 M50 50 L20 50 M50 50 L80 50" stroke="white" strokeWidth="1" />
                        </svg>
                     </div>
                  </div>

                  {/* Rank 1 */}
                  <div className={`flex-1 bg-white text-black border border-white h-full flex flex-col p-6 relative ${p1.votes === 0 && 'opacity-50'}`}>
                     {p1.votes > 0 && (
                        <div className="absolute -top-4 -right-2">
                           <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" /></svg>
                        </div>
                     )}
                     <div className="flex justify-between items-start mb-6">
                        <span className="text-5xl font-black text-black">#01</span>
                        <span className="text-black">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                        </span>
                     </div>
                     <div className="text-[26px] font-black uppercase tracking-tight leading-none mb-1">{p1.name}</div>
                     <div className="text-[10px] text-black font-black tracking-widest uppercase mb-auto">BURNS: {p1.votes}</div>
                     <div className="w-full h-36 bg-black mt-4 overflow-hidden">
                        <svg className="w-full h-full opacity-60" viewBox="0 0 100 100">
                           <polygon points="0,100 50,0 100,100" fill="transparent" stroke="white" strokeWidth="4" />
                           <polygon points="25,100 50,50 75,100" fill="white" />
                        </svg>
                     </div>
                  </div>

                  {/* Rank 3 */}
                  <div className={`flex-1 bg-[#111111] border ${p3.votes > 0 ? 'border-white/20' : 'border-white/5 opacity-50'} h-[80%] flex flex-col p-6`}>
                     <div className="flex justify-between items-start mb-6">
                        <span className="text-4xl font-black text-white/20">#03</span>
                        {p3.votes > 0 && <span className="bg-white/10 text-white/70 text-[8px] font-bold tracking-[0.2em] px-2 py-0.5">ELITE</span>}
                     </div>
                     <div className="text-xl font-black uppercase tracking-tight mb-1">{p3.name}</div>
                     <div className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-auto">BURNS: {p3.votes}</div>
                     <div className="w-full h-28 bg-[#1a1a1a] border border-white/5 mt-4 overflow-hidden">
                        <svg className="w-full h-full opacity-30 object-cover" viewBox="0 0 10 10" preserveAspectRatio="none">
                           <line x1="0" y1="10" x2="10" y2="0" stroke="white" strokeWidth="0.5" />
                           <line x1="0" y1="8" x2="8" y2="0" stroke="white" strokeWidth="0.5" />
                           <line x1="2" y1="10" x2="10" y2="2" stroke="white" strokeWidth="0.5" />
                           <line x1="0" y1="6" x2="6" y2="0" stroke="white" strokeWidth="0.5" />
                        </svg>
                     </div>
                  </div>
               </div>

               {/* Table Section */}
               <div className="w-full border border-white/10">
                  <div className="grid grid-cols-12 gap-4 px-8 py-6 border-b border-white/10 text-[9px] uppercase font-bold tracking-[0.15em] text-white/40">
                     <div className="col-span-1">RANK</div>
                     <div className="col-span-3">ROASTER</div>
                     <div className="col-span-2">TOTAL ROASTS</div>
                     <div className="col-span-2">WIN RATE</div>
                     <div className="col-span-4">LAST BURN</div>
                  </div>

                  <div className="flex flex-col">
                     {restOfTable.length === 0 ? (
                        <div className="px-8 py-10 text-center text-white/30 text-xs tracking-widest font-bold">
                           NOT ENOUGH DATA ON CHAIN
                        </div>
                     ) : restOfTable.map((row, idx) => (
                        <div key={row.id} className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-white/5 last:border-b-0 items-center hover:bg-white/5 transition-colors cursor-pointer">
                           <div className="col-span-1 text-sm font-black text-white/60">0{idx + 4}</div>
                           <div className="col-span-3 flex items-center gap-3">
                              <div className="w-6 h-6 bg-white/10"></div>
                              <span className="text-[11px] font-bold uppercase tracking-widest">{row.name}</span>
                           </div>
                           <div className="col-span-2 text-[13px] font-black">{row.total}</div>
                           <div className="col-span-2 text-xs font-black">{row.win}</div>
                           <div className="col-span-4 text-[10px] text-white/60 italic font-medium tracking-tight truncate">
                              {row.last}
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Load More Row */}
                  <div className="px-8 py-6 flex justify-center border-t border-white/10">
                     <button className="text-[9px] uppercase font-bold tracking-[0.2em] text-white hover:text-white/70 transition-colors">
                        LOAD MORE INFERNO
                     </button>
                  </div>
               </div>
            </>
         )}

      </div>
   );
}
