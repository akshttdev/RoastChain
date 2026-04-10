'use client';
import { useRoasts } from '@/lib/web3/hooks';
import { useMemo } from 'react';

export function Leaderboard() {
  const { roasts, isLoading } = useRoasts();

  const { topRoast, topBurners } = useMemo(() => {
    if (!roasts || roasts.length === 0) return { topRoast: null, topBurners: [] };
    
    // Sort roasts by votes descending
    const sorted = [...roasts].sort((a, b) => Number(b.votes) - Number(a.votes));
    const best = sorted[0];

    // Calculate sum of votes per author for top burners
    const burnerMap: Record<string, number> = {};
    roasts.forEach(r => {
      const auth = r.author;
      burnerMap[auth] = (burnerMap[auth] || 0) + Number(r.votes);
    });

    const topBurnersList = Object.entries(burnerMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([address, score], index) => {
        const shortAuth = `${address.substring(0,6)}...${address.substring(address.length-4)}`;
        return {
          rank: `0${index + 1}`,
          addy: shortAuth,
          score: Math.floor(score)
        };
      });

    return { topRoast: best, topBurners: topBurnersList };
  }, [roasts]);

  if (isLoading) {
      return <div className="text-white/50 text-[10px] tracking-widest font-bold">CALCULATING_LEADERBOARD...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Leaderboard Card */}
      <div className="bg-white text-black p-6 border border-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black tracking-tight">LEADERBOARD</h2>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v2H5C3.34 5 2 6.34 2 8v1c0 1.95 1.25 3.61 3 4.22V15a3 3 0 003 3h1v2H7v2h10v-2h-2v-2h1a3 3 0 003-3v-1.78c1.75-.61 3-2.27 3-4.22V8c0-1.66-1.34-3-3-3zM4 9V7h3v6.05C5.17 12.39 4 10.82 4 9zm16 0c0 1.82-1.17 3.39-2.95 4.05V7h3v2z" />
          </svg>
        </div>
        
        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.1em] text-black mb-4 border-b border-black pb-2">
          <div>TOP_ROAST</div>
          <div className="bg-black text-white px-2 py-0.5 text-[8px] tracking-widest">WINNER</div>
        </div>

        {topRoast && Number(topRoast.votes) > 0 ? (
          <>
            <blockquote className="text-2xl font-black italic tracking-tighter mb-8 leading-[1.1] break-words line-clamp-3">
              "{topRoast.content.length > 50 ? topRoast.content.substring(0, 50) + '...' : topRoast.content}"
            </blockquote>

            <div className="flex justify-between items-end border-t border-black/20 pt-4">
              <div>
                <div className="text-[8px] font-bold tracking-[0.15em] text-black/50 uppercase mb-1">CHAMPION</div>
                <div className="font-bold text-xs uppercase text-black">
                  {topRoast.author.substring(0,6)}...{topRoast.author.substring(topRoast.author.length-4)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[8px] font-bold tracking-[0.15em] text-black/50 uppercase mb-1">TOTAL_VOTES</div>
                <div className="font-black text-[22px] leading-none text-black">{Number(topRoast.votes)}</div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-black/50 font-black italic tracking-tighter text-xl my-8">NO_VICTORS_YET</div>
        )}
      </div>

      {/* Top Burners Card */}
      <div className="bg-[#1a1a1a] p-6 border border-white/10">
        <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/50 mb-6 pb-4 border-b border-white/10">
          TOP_BURNERS_24H
        </h3>
        
        <div className="space-y-4">
          {topBurners.length > 0 ? topBurners.map((user) => (
            <div key={user.rank} className="flex justify-between items-center text-sm font-bold">
              <div className="flex gap-4 items-center">
                <span className="text-white/30 text-[10px]">{user.rank}</span>
                <span className="uppercase text-white/80 text-xs tracking-widest">{user.addy}</span>
              </div>
              <span className="text-sm font-bold">{user.score}</span>
            </div>
          )) : (
             <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
               WAITING_FOR_BLOOD
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
