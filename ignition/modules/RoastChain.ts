import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("RoastChainModule", (m) => {
  const roastChain = m.contract("RoastChain", []);
  return { roastChain };
});
