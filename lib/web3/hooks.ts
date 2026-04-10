import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain, useWatchContractEvent } from 'wagmi';
import { CONTRACT_ADDRESSES, ROAST_CHAIN_ABI } from './contract';
import { sepolia, hardhat } from 'wagmi/chains';

const SUPPORTED_CHAINS = [hardhat.id, sepolia.id];

function useContractAddress() {
  const chainId = useChainId();
  return CONTRACT_ADDRESSES[chainId] ?? CONTRACT_ADDRESSES[hardhat.id];
}

export function useRoasts() {
  const chainId = useChainId();
  const address = useContractAddress();
  const { data, isError, isLoading, refetch } = useReadContract({
    address,
    abi: ROAST_CHAIN_ABI,
    functionName: 'getAllRoasts',
    chainId: chainId as any,
    query: {
      refetchInterval: 5000, // poll every 5s for live updates
    }
  });

  // Also instantly refetch when a new roast is submitted
  useWatchContractEvent({
    address,
    abi: ROAST_CHAIN_ABI,
    eventName: 'RoastSubmitted',
    onLogs: () => { refetch(); },
    chainId: chainId as any,
  });

  // And when votes change
  useWatchContractEvent({
    address,
    abi: ROAST_CHAIN_ABI,
    eventName: 'Voted',
    onLogs: () => { refetch(); },
    chainId: chainId as any,
  });

  return {
    roasts: (data as any[]) || [],
    isLoading,
    isError,
    refetch
  };
}

export function useNetworkStatus() {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  const isWrongNetwork = !SUPPORTED_CHAINS.includes(chainId as any);
  // Prefer Sepolia for switching if unsupported network
  return { isWrongNetwork, switchToTarget: () => switchChain({ chainId: sepolia.id }), isPending };
}

export function useSubmitRoast() {
  const address = useContractAddress();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const submitRoast = (content: string) => {
    writeContract({
      address,
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
  const address = useContractAddress();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const vote = (roastId: bigint | number) => {
    const id = typeof roastId === 'number' ? BigInt(roastId) : roastId;
    writeContract({
      address,
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

export function useMyRoasts(authorAddress?: `0x${string}` | string) {
  const chainId = useChainId();
  const address = useContractAddress();
  const { data, isError, isLoading, refetch } = useReadContract({
    address,
    abi: ROAST_CHAIN_ABI,
    functionName: 'getRoastsByAuthor',
    chainId: chainId as any,
    args: authorAddress ? [authorAddress as `0x${string}`] : undefined,
    query: {
       enabled: !!authorAddress,
       refetchInterval: 5000,
    }
  });

  return {
    roasts: (data as any[]) || [],
    isLoading,
    isError,
    refetch
  };
}
