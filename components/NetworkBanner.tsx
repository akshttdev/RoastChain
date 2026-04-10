'use client';
import { useNetworkStatus } from '@/lib/web3/hooks';
import { useAccount } from 'wagmi';

export function NetworkBanner() {
  const { address } = useAccount();
  const { isWrongNetwork, switchToTarget, isPending } = useNetworkStatus();

  if (!address || !isWrongNetwork) return null;

  return (
    <div className="w-full bg-[#1a0a00] border-b border-orange-500/40 px-10 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        <span className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
          WRONG NETWORK — Contract requires Sepolia Testnet
        </span>
      </div>
      <button
        onClick={switchToTarget}
        disabled={isPending}
        className="bg-orange-500 text-black text-[9px] font-black uppercase tracking-[0.15em] px-4 py-2 hover:bg-orange-400 transition-colors disabled:opacity-50"
      >
        {isPending ? 'SWITCHING...' : 'SWITCH TO SEPOLIA'}
      </button>
    </div>
  );
}
