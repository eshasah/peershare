const Web3 = require("web3");
// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const { response } = require("express");
const { abi } = JSON.parse(fs.readFileSync("TestContract.json"));

async function main() {

 
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
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
    process.env.DEMO_CONTRACT_2
  );
  
console.log(contract.methods);
//const tx = await contract.methods.createUser("0x4d262315d1A1228CBBD8516B8DB095E226a837Df",123,)
  const tx = await contract.methods.transferFrom("0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E","0x4d262315d1A1228CBBD8516B8DB095E226a837Df",1000000);
 
  console.log("Transaction::",tx);
  
  const receipt = await tx
    .send({
      from: signer.address,
      gas: 1000000,
      value:1000000
    }) 
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });

    
  // // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);

  console.log(receipt);


  // const signer1 = web3.eth.accounts.privateKeyToAccount(
  //   process.env.SIGNER_PRIVATE_KEY_1
  // );
  // web3.eth.accounts.wallet.add(signer1);

  // const tx1 = await contract.methods.transferToOwner();
 
  // console.log("Transaction::",tx1);
  
  // const receipt1 = await tx1
  //   .send({
  //     from: signer1.address,
  //     gas: 1000000,
  //     value:1000000
  //   }) 
  //   .once("transactionHash", (txhash) => {
  //     console.log(`Mining transaction ...`);
  //     console.log(`https://${network}.etherscan.io/tx/${txhash}`);
  //   });

    
  // // // The transaction is now on chain!
  // console.log(`Mined in block ${receipt.blockNumber}`);

  // console.log(receipt1);

  // const tx1 = {
  //   // this could be provider.addresses[0] if it exists
  //   from: '0x4d262315d1A1228CBBD8516B8DB095E226a837Df', 
  //   // target address, this could be a smart contract address
  //   to: '0x2022F317e4925A387Fc186BeEa334076251D33b4', 
  //   // optional if you want to specify the gas limit 
  //   gas: 1000000, 
  //   // optional if you are invoking say a payable function 
  //   value: 1000000,
  //   // this encodes the ABI of the method and the arguements
  //   data: await contract.methods.sendViaCall("0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E").encodeABI() 
  // };

  // const signPromise = web3.eth.accounts.signTransaction(tx1,  process.env.SIGNER_PRIVATE_KEY);

  // signPromise.then((signedTx) => {
  //   // raw transaction string may be available in .raw or 
  //   // .rawTransaction depending on which signTransaction
  //   // function was called
  //   const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
  //   sentTx.on("receipt", receipt => {
  //     console.log(receipt);
  //   });
  //   sentTx.on("error", err => {
  //     // do something on transaction error
  //   });
  // }).catch((err) => {
  //  console.log(err);
  // });
  // const receipt1 = await tx1
  // .send({
  //   from: signer.address,
  // }) 
  // .once("transactionHash", (txhash) => {
  //   console.log(`Mining transaction ...`);
  //   console.log(`https://${network}.etherscan.io/tx/${txhash}`);
  // });
  // console.log(receipt1);

//  const tx1 = contract.methods.sendViaCall("0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E");
//   const receipt1 = await tx1
//   .send({
//     from: "0x2022F317e4925A387Fc186BeEa334076251D33b4",
//     gas: 1000000
//   }) 
//   .once("transactionHash", (txhash) => {
//     console.log(`Mining transaction ...`);
//     console.log(`https://${network}.etherscan.io/tx/${txhash}`);
//   });

//   console.log(receipt1);

web3.eth.getBalance("0x4d262315d1A1228CBBD8516B8DB095E226a837Df", (err, balance) => {
  console.log(web3.utils.fromWei(balance, 'ether'));
});

  // const tx2 = contract.methods.getBalance("0x4d262315d1A1228CBBD8516B8DB095E226a837Df");
  // console.log(tx2);
  // const receipt2 = await tx2
  // .send({
  //   from: signer.address,
  //   gas: 1000000
  // }) 
  // .once("transactionHash", (txhash) => {
  //   console.log(`Mining transaction ...`);
  //   console.log(`https://${network}.etherscan.io/tx/${txhash}`);
  // });

  // console.log(receipt2);
}

require("dotenv").config();
main();