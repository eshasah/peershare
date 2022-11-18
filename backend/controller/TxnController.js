const PeerContract = require("../blockchain/scripts/PeerContract");

const performPayment = async (req) => {
    PeerContract.init();
    PeerContract.transferMoney("0x4d262315d1A1228CBBD8516B8DB095E226a837Df","0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E",1000000)
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