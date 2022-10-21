const Web3 = require('web3');
const fs = require('fs');
const TruffleContract = require('@truffle/contract');

module.exports = {
    web3Provider : null,
    contracts : {},
    ethereumServer: process.env.ETH_SERVER,

    //initialize peershare contract
    init: function() {

        // Check if web3 has already been provided
        if (typeof web3 !== 'undefined') {
            this.web3Provider = web3.currentProvider;
        } else {
            this.web3Provider = new Web3.providers.HttpProvider(this.ethereumServer);
        }

        // Create web3 object to connect to blockchain
        web3 = new Web3(this.web3Provider);

        // Get artifact from Peershare contract
        var peershareArtifact = JSON.parse(fs.readFileSync('blockchain/build/contracts/Peershare.json'));

        // Add contract
        this.contracts.Peershare = TruffleContract(peershareArtifact);
        this.contracts.Peershare.setProvider(this.web3Provider);

    },

    verifyAccount: function(ethAccount, privateKey) {

        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        if (account.address == ethAccount) {
            return true;
        } else {
            return false;
        }

    },
    addCar: async function (user_id,eth_account) {

        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();

        return await instance.addCar(user_id,{ from: eth_account, gas: 3000000 });

    }
}