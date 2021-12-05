async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  // Compile it
  const waveContractFactory = await hre.ethers.getContractFactory(
    "WaveContract"
  );
  // Deploy it
  const waveContract = await waveContractFactory.deploy();
  // Wait for it to be mined;
  await waveContract.deployed();

  console.log(
    "🚀 Contract Deployed to this address : %s",
    waveContract.address
  );

  console.log(`🧑‍🎤 Deployed by ${owner.address}`);

  let waveTxn = await waveContract.connect(randomPerson).wave();

  await waveTxn.wait();

  waveTxn = await waveContract.connect(randomPerson).wave();

  await waveTxn.wait();

  await waveContract.wave();

  await waveContract.getTotalWaves();

  const randomWaves = await waveContract
    .connect(randomPerson)
    .getAddressInfos();

  console.log("Random personn wave", randomWaves);

  const ownerWave = await waveContract.getAddressInfos();

  console.log("Owner Wave", ownerWave);
}

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error("😩 Oula ça sent la boulette:", error);
    porcess.exit(1);
  }
}

runMain();
