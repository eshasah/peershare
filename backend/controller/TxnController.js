const { response } = require("express");
const Web3 = require('web3');
const PeerContract = require("../blockchain/scripts/PeerContractTest");
const performPayment = async (senderWalletId,receiverWalletId,amount) => {

  //const sender = "0x4d262315d1A1228CBBD8516B8DB095E226a837Df";
  //const receiver = "0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E";
  //const amount = 1000000;
  //PeerContract.init();
  PeerContract.transferMoney(senderWalletId, receiverWalletId, amount)
  .then(
      async transactionResult => {
        //  res.status(200).json({ data: transactionResult })
      }).catch(err => {
              console.log(err);
          });
  
 // console.log(receipt); 
//  return 'Transaction Posted Successfully';   

},
getBalance= async (req,res)=>{
  const walletId=req.query.walletId;
  console.log(walletId);

  PeerContract.getBalance(walletId).then(response=>{console.log(response);
    res.status(200).json({
      balance:response/1000000000000000000
    });
  });
 
  

}

module.exports = {
    performPayment,
    getBalance
}