const { expect } = require("chai");
const { ethers } = require("hardhat");

async function InitWaveContract() {
  const WaveFactory = await ethers.getContractFactory("WaveContract");
  const waveContract = await WaveFactory.deploy();
  await waveContract.deployed();

  return waveContract;
}

describe("Waver", () => {
  it("Should deploy wave contract and wave correctly", async function () {
    const waveContract = await InitWaveContract();

    const waveTrxn = await waveContract.wave();
    expect(await waveTrxn.wait(), "Someone just waved !, 1");
  });
  it("Should return correct number of wave", async function () {
    const waveContract = await InitWaveContract();
    const waveTrxn = await waveContract.wave();
    waveTrxn.wait();
    expect(waveContract.getTotalWaves(), 1);
  });
});
