const Web3 = require("web3");
// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const { response } = require("express");
const { abi } = JSON.parse(fs.readFileSync("./contractsjson/TestContract.json"));
require("dotenv").config();
module.exports = {

    performPayment: async (req) => {
       
        console.log(req);
        const network = process.env.ETHEREUM_NETWORK;
        console.log(network);
        const web3 = new Web3(
          new Web3.providers.HttpProvider(
            `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
          )
        );
       
        // Signing account with private ekey
        const signer = web3.eth.accounts.privateKeyToAccount(
          process.env.SIGNER_PRIVATE_KEY
        );
        web3.eth.accounts.wallet.add(signer);
        const contract = new web3.eth.Contract(
          abi,
          // Contract address
          process.env.DEMO_CONTRACT
        );

        const tx = await contract.methods.transferFrom("0x4d262315d1A1228CBBD8516B8DB095E226a837Df","0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E",1000000);
 
  console.log("Transaction::",tx);
  
  const receipt = await tx
    .send({
      from: signer.address,
      gas: 1000000,
      value:req.amount
    }) 
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });

    
  // // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);

  console.log(receipt);
 
   return 'Transaction Posted Successfully';   

    },
}