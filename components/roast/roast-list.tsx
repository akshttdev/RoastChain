'use client';
import { useRoasts } from '@/lib/web3/hooks';
import { RoastCard } from './roast-card';
import { useEffect } from 'react';

export function RoastList({ refetchTrigger }: { refetchTrigger: number }) {
  const { roasts, isLoading, isError, refetch } = useRoasts();

  // Watch for external trigger (like successful submission) to refetch
  useEffect(() => {
    refetch();
  }, [refetchTrigger, refetch]);

  if (isLoading) return <div className="text-white/50 uppercase text-xs font-bold tracking-widest text-center py-20">SYNCHRONIZING_WITH_CHAIN...</div>;
  
  const validRoasts = roasts ? [...roasts].reverse() : [];

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tight">ROAST_FEED</h2>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      {isError ? (
        <div className="text-red-500 uppercase text-xs font-bold tracking-widest text-center py-20 bg-red-900/10 border border-red-500/20">
          NETWORK_ERROR: UNABLE TO CONNECT TO BLOCKCHAIN.
        </div>
      ) : validRoasts.length === 0 ? (
         <div className="text-center py-20 border border-white/10 bg-[#161616]">
            <h3 className="text-4xl font-black uppercase tracking-tight mb-4">NO ROASTS YET.</h3>
            <p className="text-white/50 tracking-widest font-bold">BE THE FIRST TO DRAW BLOOD.</p>
         </div>
      ) : (
        <div className="space-y-6">
          {validRoasts.map((roast, index) => (
            <RoastCard key={roast.id?.toString() || index} roast={roast} />
          ))}
        </div>
      )}
    </div>
  );
}
