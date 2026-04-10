# 🔥 RoastChain

**RoastChain** is a decentralized Web3 application where users submit roasts and vote on others — all powered by blockchain for transparent, tamper-proof results.

---

## 🧠 Overview

RoastChain transforms social content competition into a **trustless, on-chain experience**.

* Submit roasts (on-chain)
* Vote using wallet (1 vote per user)
* View leaderboard (real-time)
* Fully decentralized — no backend

---

## 🚀 Features

* 🔌 Wallet connection (MetaMask via RainbowKit)
* ✍️ Submit roasts to blockchain
* 🗳️ Vote on roasts (anti double-vote)
* 🏆 Dynamic leaderboard
* ⚡ Real-time UI updates
* 🎨 Minimal brutalist black & white design
* 🧪 Dummy data fallback for smooth demo

---

## 🏗️ Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* TailwindCSS
* shadcn/ui

### Web3

* wagmi
* viem
* RainbowKit

### Smart Contract

* Solidity (Ethereum)

---

## 📁 Project Structure

```
app/
  page.tsx              # Landing page
  dashboard/page.tsx    # Main dApp UI

components/
  web3/                 # Wallet + provider
  roast/                # Roast UI components

lib/
  web3/
    config.ts           # wagmi config
    contract.ts         # contract address + ABI
    hooks.ts            # read/write hooks

  mock/
    roasts.ts           # dummy data fallback
```

---

## ⚙️ Smart Contract

The contract handles:

* Roast storage
* Voting logic
* Double-vote prevention

### Core Functions:

* `submitRoast(string)`
* `vote(uint256)`
* `getAllRoasts()`

---

## 🔗 How It Works

```
Frontend (Next.js)
    ↓
wagmi / viem
    ↓
Ethereum Network (Sepolia / Local)
    ↓
Smart Contract (RoastChain)
```

---

## 🧪 Running the Project

### 1. Install dependencies

```bash
npm install
```

---

### 2. Run frontend

```bash
npm run dev
```

---

### 3. Connect Wallet

* Open http://localhost:3000
* Click **Connect Wallet**
* Use MetaMask

---

## 🌐 Smart Contract Deployment

### Option A: Sepolia (Recommended)

1. Open Remix IDE
2. Paste contract
3. Deploy using MetaMask
4. Copy contract address
5. Paste into:

```ts
lib/web3/contract.ts
```

---

### Option B: Local (Hardhat)

```bash
npx hardhat node
```

Deploy contract locally and update address.

---

## 🧪 Testing Flow

* Connect wallet
* Submit a roast
* Switch account
* Vote on roast
* Verify vote count updates
* Check leaderboard

---

## ⚠️ Edge Cases Handled

* Prevent empty submissions
* Prevent double voting
* Disable buttons during transactions
* Handle wallet not connected
* Fallback to dummy data if blockchain empty

---

## 🎤 Demo Flow

1. Connect wallet
2. Submit a roast
3. Switch wallet
4. Vote
5. Show leaderboard update

---

## 🚫 Limitations

* Text stored directly on-chain (gas heavy)
* No pagination (for simplicity)
* No media uploads (text only)

---

## 🔮 Future Improvements

* IPFS for content storage
* NFT rewards for winners
* Token-based voting
* Time-limited battles
* Multi-room arenas

---

## 🧠 Philosophy

> No servers. No manipulation. Just pure, decentralized chaos.

---

## 👨‍💻 Author

Built for hackathon by Akshat 🚀

---

## 📜 License

MIT
