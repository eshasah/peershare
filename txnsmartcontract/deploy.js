const Web3 = require("web3");

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
//const { abi, bytecode } = JSON.parse(fs.readFileSync("Demo.json"));
const { abi, bytecode } = JSON.parse(fs.readFileSync("TestContract.json"));

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY_1
  );
  web3.eth.accounts.wallet.add(signer);

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: 1000000,
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });


  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${deployedContract.options.address}`);
  console.log(
    `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`
  );
//   const sender="0x4d262315d1A1228CBBD8516B8DB095E226a837Df";
//   const receiver="0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E";
//   web3.eth.sendTransaction({to:receiver, from:sender, value:web3.utils.toWei("0.000005", "ether"),gas:21000})

}

require("dotenv").config();
main();