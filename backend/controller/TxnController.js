const PeerContract = require("../blockchain/scripts/PeerContractTest");

const performPayment = async (req) => {
    const sender = "0x4d262315d1A1228CBBD8516B8DB095E226a837Df";
    const receiver = "0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E";
    const amount = 1000000;
    //PeerContract.init();
    PeerContract.transferMoney(sender, receiver, amount)
    .then(
        async transactionResult => {
            res.status(200).json({ data: transactionResult })
        }).catch(err => {
                console.log(err);
            });
    
    console.log(receipt); 
    return 'Transaction Posted Successfully';   

}

module.exports = {
    performPayment,
}