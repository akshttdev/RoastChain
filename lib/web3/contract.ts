export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
