import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers.js";

describe("RoastChain Contract Stress & Vulnerability Suite", function () {
  
  async function deployRoastChainFixture() {
    const [owner, nonOwner, addr1, addr2, spammer] = await hre.ethers.getSigners();
    const RoastChain = await hre.ethers.getContractFactory("RoastChain");
    const roastChain = await RoastChain.deploy();
    return { roastChain, owner, nonOwner, addr1, addr2, spammer };
  }

  describe("Core Integrity", function () {
    it("Should organically save a submitted roast", async function () {
      const { roastChain, addr1 } = await loadFixture(deployRoastChainFixture);
      const burnContent = "This is a strictly tested burn.";
      
      await roastChain.connect(addr1).submitRoast(burnContent);
      const allRoasts = await roastChain.getAllRoasts();
      
      expect(allRoasts.length).to.equal(1);
      expect(allRoasts[0].author).to.equal(addr1.address);
      expect(allRoasts[0].content).to.equal(burnContent);
    });
  });

  describe("Voter Exploitation and Resistance", function () {
    it("Should prevent dual-voting on identical resources", async function () {
      const { roastChain, addr1, spammer } = await loadFixture(deployRoastChainFixture);
      
      await roastChain.connect(addr1).submitRoast("Exploit target alpha.");
      
      // Spammer votes once successfully
      await roastChain.connect(spammer).vote(0);
      
      // Secondary spam attempt should strictly revert
      await expect(roastChain.connect(spammer).vote(0))
        .to.be.revertedWith("You have already voted on this roast");
        
      const allRoasts = await roastChain.getAllRoasts();
      expect(allRoasts[0].votes).to.equal(1);
    });

    it("Should throw exceptions when attempting to target a voided index", async function () {
      const { roastChain, addr1 } = await loadFixture(deployRoastChainFixture);
      await expect(roastChain.connect(addr1).vote(999))
        .to.be.revertedWith("Invalid roast index");
    });
  });

  describe("Memory Array Mapping Consistency", function () {
    it("Must route identity correctly across getRoastsByAuthor", async function () {
      const { roastChain, addr1, addr2 } = await loadFixture(deployRoastChainFixture);
      
      await roastChain.connect(addr1).submitRoast("Alpha Burn from 1");
      await roastChain.connect(addr2).submitRoast("Beta Burn from 2");
      await roastChain.connect(addr1).submitRoast("Gamma Burn from 1");
      
      const identityRoasts = await roastChain.getRoastsByAuthor(addr1.address);
      expect(identityRoasts.length).to.equal(2);
      expect(identityRoasts[0].content).to.equal("Alpha Burn from 1");
      expect(identityRoasts[1].content).to.equal("Gamma Burn from 1");
    });
  });

});
