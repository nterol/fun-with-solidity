async function deployer() {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(`🧑‍🎤 Deployed by ${deployer.address}`);
  console.log("💰 Current account : ", accountBalance.toString());

  const Token = await hre.ethers.getContractFactory("WaveContract");
  const portal = await Token.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await portal.deployed();

  console.log(`🚀 Contract Deployed to this address: ${portal.address}`);
}

async function runDeployer() {
  try {
    await deployer();
    process.exit(0);
  } catch (error) {
    console.log("Abort Mission !!", error);

    process.exit(1);
  }
}

runDeployer();
