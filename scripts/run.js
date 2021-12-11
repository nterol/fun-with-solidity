async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  // Compile it
  const waveContractFactory = await hre.ethers.getContractFactory(
    "WaveContract"
  );
  // Deploy it
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  // Wait for it to be mined;
  await waveContract.deployed();

  console.log(
    "🚀 Contract Deployed to this address : %s",
    waveContract.address
  );
  console.log(`🧑‍🎤 Deployed by ${owner.address}`);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  console.log(
    `💸, This contract a balance of ${hre.ethers.utils.formatEther(
      contractBalance
    )}`
  );

  /* Operations */

  let waveTxn = await waveContract
    .connect(randomPerson)
    .wave("Here's a message");

  await waveTxn.wait();

  waveTxn = await waveContract.connect(randomPerson).wave("Gang let's go");

  await waveTxn.wait();

  waveTxn = await waveContract.connect(randomPerson).wave("Spamming the shit");

  await waveTxn.wait();

  await waveContract.wave("Bonjour je suis le propriétaire");

  await waveContract.getTotalWaves();

  const randomWaves = await waveContract
    .connect(randomPerson)
    .getAddressInfos();

  console.log(`Random person has waved ${randomWaves} times`);

  const ownerWave = await waveContract.getAddressInfos();

  console.log(`Owner has waves ${ownerWave} times`);

  const allWaves = await waveContract.getAllWaves();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

  console.log(
    `💸, After all transactions, the balance is:  ${hre.ethers.utils.formatEther(
      contractBalance
    )}`
  );

  console.log(allWaves);
}

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error("😩 Oula ça sent la boulette:", error);
    process.exit(1);
  }
}

runMain();
