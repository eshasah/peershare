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
        console.log("PeerContract -> verify account and private key");
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        if (account.address == ethAccount) {
            return true;
        } else {
            return false;
        }
    },

    addUser: async function(userHash, ethAccount, privateKey) {
        console.log("PeerContract -> Calling smart contract addUser to insert new block");
        let instance = await this.contracts.Peershare.deployed();

        // web3.eth.accounts.sign is used to sign the hashed data with private key
        const signedHash = web3.eth.accounts.sign(userHash, privateKey);

        // Get the signature
        const signature = signedHash.signature;

        return await instance.addUser(
            ethAccount,
            { from: ethAccount, gas: 3000000 }
        );

    },

    getUser: async function(userHash, ethAccount) {
        console.log("PeerContract -> Calling smart contract getUser to check if already registered");
        let instance = await this.contracts.Peershare.deployed();

        var i = await instance.getUser(
            ethAccount, 
            { from: ethAccount, gas: 3000000 }
        );

        return i;
    }, 

    addCar: async function (carHash,ethAccount,privateKey) {

        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();
        console.log(carHash);
        console.log(ethAccount);
        return await instance.addCar(carHash,web3.eth.accounts.sign('0x'+ ethereumjsAbi.soliditySHA3(
            ['bytes32', 'address'],
            [carHash, ethAccount]
        ).toString('hex'), privateKey).signature,{ from: ethAccount, gas: 3000000 });
    },
    rentCar: async function (carHash,ownerEthAccount,ethAccount,privateKey) {

        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();
        console.log(carHash);
        console.log(ownerEthAccount);
        return await instance.rentCar(carHash,ownerEthAccount,web3.eth.accounts.sign('0x' + ethereumjsAbi.soliditySHA3(
            ['bytes32', 'address'],
            [carHash, ethAccount]
        ).toString('hex'), privateKey).signature,{ from: ethAccount, gas: 3000000 });

    },
    returnCar: async function (carHash,ownerEthAccount,ethAccount) {

        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();

        return await instance.returnCar(carHash,
        ownerEthAccount,
        { 
            from: ethAccount,
            gas: 300000 
        });

    }
}