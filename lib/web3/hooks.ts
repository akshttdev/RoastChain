import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, ROAST_CHAIN_ABI } from './contract';

export function useRoasts() {
  const { data, isError, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ROAST_CHAIN_ABI,
    functionName: 'getAllRoasts',
  });

  return {
    roasts: (data as any[]) || [],
    isLoading,
    isError,
    refetch
  };
}

export function useSubmitRoast() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const submitRoast = (content: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ROAST_CHAIN_ABI,
      functionName: 'submitRoast',
      args: [content],
    });
  };

  return {
    submitRoast,
    isPending: isPending || isWaiting,
    isSuccess,
    error
  };
}

export function useVote() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const vote = (roastId: bigint | number) => {
    // In Wagmi viem, numbers should be exactly passed (BigInt usually)
    const id = typeof roastId === 'number' ? BigInt(roastId) : roastId;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ROAST_CHAIN_ABI,
      functionName: 'vote',
      args: [id],
    });
  };

  return {
    vote,
    isPending: isPending || isWaiting,
    isSuccess,
    error
  };
}
