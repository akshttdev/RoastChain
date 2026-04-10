# RoastChain Stress Testing Protocols

## Overview
This architectural guide exists to systematically verify the blockchain constraints on `RoastChain` and establish methodologies for intentional breaking/load-testing prior to Mainnet launch. 

## Automated CI/CD Testing
The root repository features an impenetrable local benchmarking suite.
To execute it, run:
```bash
HARDHAT_IGNORE_NODE_VERSION=1 npx hardhat test
```
This suite automatically constructs an ephemeral runtime network and blasts the `submitRoast()` and `vote()` functions to mathematically prove:
- Impossible double-spend voting conditions (Revert Validation).
- Out-of-bounds memory array accesses.
- Accurate ledger mapping under concurrent simulated network traffic.

## Manual Localhost Stress Operations

If you wish to simulate peak load conditions inside the React UI (simulating a "crypto-twitter stampede" event), follow these exact parameters:

1. **Activate Network Daemon**: Boot the Hardhat standard blockchain utilizing `$ HARDHAT_IGNORE_NODE_VERSION=1 npx hardhat node`. This keeps the local RPC open on port `8545`.
2. **Blast Seed Packets**: Run `$ npx hardhat run scripts/seed.ts --network localhost` consecutively *multiple times* in a split terminal. Because each user execution drops 3 roasts and 8 structural votes, spamming this command realistically generates massive blockchain congestion and bloats the central array rapidly.
3. **Monitor Client Lag**: Open `http://localhost:3000/dashboard/leaderboard`. Observe how React mathematically charts and sorts hundreds of distinct simulated payloads via the mapping pipeline.

## Mainnet Production Hardening Notes
Before migrating configuration from `localhost` to `Sepolia` or `Base`:
1. Modify `submitRoast` within `RoastChain.sol` to charge a nominal anti-spam threshold fee (`msg.value > 0.001 ether`) if absolute bot resistance is desired.
2. Monitor gas consumption caps via `npx hardhat-gas-reporter` (already enabled natively inside Toolbox) to ensure large variable string arrays don't unintentionally softlock the deployment.
