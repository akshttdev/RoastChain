'use client';
import { useVote } from '@/lib/web3/hooks';
import { useAccount } from 'wagmi';

export function RoastCard({ roast }: { roast: any }) {
  const { vote, isPending } = useVote();
  const { address } = useAccount();

  // Extract variables safely
  const id = roast.id;
  const author = roast.author;
  const content = roast.content;
  const votes = roast.votes;
  const timestamp = roast.timestamp;
  
  const timeStr = typeof timestamp === 'bigint' || typeof timestamp === 'number'
    ? new Date(Number(timestamp) * 1000).toLocaleString() 
    : 'Just now';

  const shortAuthor = author ? `${author.substring(0,6)}...${author.substring(author.length-4)}` : 'UNKNOWN';

  const handleVote = () => {
    if (!address || isPending) return;
    vote(id);
  };

  return (
    <div className="border border-white/10 bg-[#161616] p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
        <div>AUTH: {shortAuthor}</div>
        <div>{timeStr}</div>
      </div>
      <p className="text-[26px] font-black uppercase leading-[1.2] tracking-tight text-white break-words">
        {content}
      </p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-3 text-xl font-bold tracking-tight">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          {Number(votes || 0)}
        </div>
        <button 
          onClick={handleVote}
          disabled={!address || isPending}
          className="border border-white/30 text-[10px] px-8 py-2.5 uppercase tracking-[0.15em] hover:border-white transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'VOTING...' : 'VOTE'}
        </button>
      </div>
    </div>
  );
}
