// Deployed contract addresses per network
export const CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  31337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // Hardhat localhost
  11155111: "0x49F31F15a92CC7d5B36249E77A5aA81f92Ee94F8",  // Sepolia
};

// Legacy fallback — used by hooks before chain detection
export const CONTRACT_ADDRESS = CONTRACT_ADDRESSES[31337];

export const ROAST_CHAIN_ABI = [
  {
    type: "function",
    name: "submitRoast",
    inputs: [{ name: "_content", type: "string" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "vote",
    inputs: [{ name: "_id", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "getAllRoasts",
    inputs: [],
    outputs: [{
      type: "tuple[]",
      components: [
        { name: "id", type: "uint256" },
        { name: "author", type: "address" },
        { name: "content", type: "string" },
        { name: "votes", type: "uint256" },
        { name: "timestamp", type: "uint256" }
      ]
    }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getRoastsByAuthor",
    inputs: [{ name: "_author", type: "address" }],
    outputs: [{
      type: "tuple[]",
      components: [
        { name: "id", type: "uint256" },
        { name: "author", type: "address" },
        { name: "content", type: "string" },
        { name: "votes", type: "uint256" },
        { name: "timestamp", type: "uint256" }
      ]
    }],
    stateMutability: "view"
  },
  {
    type: "event",
    name: "RoastSubmitted",
    inputs: [
      { name: "id", type: "uint256", indexed: true },
      { name: "author", type: "address", indexed: true },
      { name: "content", type: "string", indexed: false }
    ]
  },
  {
    type: "event",
    name: "Voted",
    inputs: [
      { name: "id", type: "uint256", indexed: true },
      { name: "voter", type: "address", indexed: true },
      { name: "newVoteCount", type: "uint256", indexed: false }
    ]
  }
] as const;
