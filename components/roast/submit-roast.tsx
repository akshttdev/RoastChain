'use client';
import { useState, useEffect } from 'react';
import { useSubmitRoast } from '@/lib/web3/hooks';
import { useAccount } from 'wagmi';

export function SubmitRoast({ onSubmitted }: { onSubmitted: () => void }) {
  const [content, setContent] = useState('');
  const { address } = useAccount();
  const { submitRoast, isPending, isSuccess } = useSubmitRoast();

  // Reset after success and notify list
  useEffect(() => {
    if (isSuccess) {
      setContent('');
      onSubmitted();
    }
  }, [isSuccess, onSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !address || isPending) return;
    submitRoast(content);
  };

  return (
    <div className="mb-14">
      <div className="flex justify-between items-end mb-6 border-b border-white/20 pb-4">
        <h2 className="text-3xl font-black uppercase tracking-tight">SUBMIT YOUR ROAST</h2>
        <div className="text-[10px] tracking-widest text-white/40 font-bold uppercase">V1.0_WEB3</div>
      </div>
      
      <form onSubmit={handleSubmit} className="relative w-full border-2 border-white bg-[#0f0f0f]">
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-48 bg-transparent p-6 text-xl tracking-tight leading-relaxed placeholder:text-white/20 focus:outline-none focus:ring-0 resize-none font-medium text-white/90 disabled:opacity-50"
          placeholder={address ? "TYPE_YOUR_VIOLENCE_HERE..." : "CONNECT WALLET TO SUBMIT..."}
          disabled={isPending || !address}
        />
        <div className="absolute bottom-6 right-6">
          <button 
            type="submit"
            disabled={!content.trim() || isPending || !address}
            className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.15em] hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </div>
  );
}
