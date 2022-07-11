const hre = require("hardhat");

async function main() {

  const HMSend = await hre.ethers.getContractFactory("HMSend");
  const hmsend = await HMSend.deploy();

  await hmsend.deployed();

  console.log("HMSend deployed to:", hmsend.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
