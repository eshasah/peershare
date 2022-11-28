const { response } = require("express");
const PeerContract = require("../blockchain/scripts/PeerContractTest");
const performPayment = async (senderWalletId,receiverWalletId,amount) => {

  //const sender = "0x4d262315d1A1228CBBD8516B8DB095E226a837Df";
  //const receiver = "0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E";
  //const amount = 1000000;
  //PeerContract.init();
  //amount *= 1000000;
  const tx = await PeerContract.transferMoney(senderWalletId, receiverWalletId, amount)
  console.log('tx', tx); 
  return tx;   

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