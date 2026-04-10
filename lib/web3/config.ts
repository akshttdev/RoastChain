import { http } from 'wagmi'
import { hardhat, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'RoastChain',
  projectId: 'YOUR_PROJECT_ID', // Replaced in production
  chains: [hardhat, sepolia],
  transports: {
    [hardhat.id]: http('http://127.0.0.1:8545'),
    [sepolia.id]: http(),
  },
  ssr: true, // required for Next.js App Router
})
