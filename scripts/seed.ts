import hre from "hardhat";

async function main() {
  const ContractAddress = process.env.CONTRACT_ADDRESS;
  if (!ContractAddress) {
      console.error("Please set CONTRACT_ADDRESS env var using 'export CONTRACT_ADDRESS=0x...'");
      process.exit(1);
  }

  const signers = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("RoastChain", ContractAddress);

  console.log("Seeding Database...");

  const tx1 = await contract.connect(signers[1]).submitRoast("Your smart contract is so bloated it has its own zip code, and yet the only thing decentralized about your project is the development team's accountability.");
  await tx1.wait();
  console.log("User 1 seeded.");

  const tx2 = await contract.connect(signers[2]).submitRoast("If gas fees were a person, they'd have a portrait of your UI in their wallet to feel better about themselves.");
  await tx2.wait();
  console.log("User 2 seeded.");

  const tx3 = await contract.connect(signers[3]).submitRoast("Calling you a mid-wit is an insult to half the bell curve.");
  await tx3.wait();
  console.log("User 3 seeded.");

  console.log("Generating Votes...");

  // Generate 5 votes for roast 1
  for(let i=4; i<9; i++) {
     const v = await contract.connect(signers[i]).vote(0);
     await v.wait();
  }
  // Generate 2 votes for roast 2
  for(let i=9; i<11; i++) {
     const v = await contract.connect(signers[i]).vote(1);
     await v.wait();
  }
  // Generate 1 vote for roast 3
  for(let i=11; i<12; i++) {
     const v = await contract.connect(signers[i]).vote(2);
     await v.wait();
  }

  console.log("Seeding complete!");
}

main().catch(console.error);
