const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const TruffleContract = require('@truffle/contract');
const peershareArtifact = require('../build/contracts/Peershare.json');

// const mnemonic = process.env.MNEMONIC;
// const infuraAPIKey = process.env.ETHEREUM_NETWORK;
// const myPrivateKeys = [];
// myPrivateKeys.push(process.env.SIGNER_PRIVATE_KEY);

//creating testnet provider
let provider = new HDWalletProvider({
    mnemonic:{
        phrase: process.env.MNEMONIC
    },
    //privateKeys: process.env.SIGNER_PRIVATE_KEY,
    providerOrUrl: 'https://goerli.infura.io/v3/c68b12f2513d4d8797525633ccc1ffbd',
})

module.exports = {
    web3Provider : null,
    contracts : {},
    signer: null,

    //initialize peershare contract
    init: function() {

        // Check if web3 has already been provided
        if (typeof web3 !== 'undefined') {
            this.web3Provider = web3.currentProvider;
        } else {
            this.web3Provider = provider;
        }

        // Create web3 object to connect to blockchain
        web3 = new Web3(this.web3Provider);

        // Add contract
        this.contracts.Peershare = TruffleContract(peershareArtifact);
        this.contracts.Peershare.setProvider(this.web3Provider);

        // Signing account with private ekey
        // this.signer = web3.eth.accounts.privateKeyToAccount(
        //     process.env.SIGNER_PRIVATE_KEY
        // );
        web3.eth.accounts.wallet.add(signer);
    },

    verifyAccount: function(ethAccount, privateKey) {
        //console.log("PeerContract -> verify account and private key");
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        if (account.address == ethAccount) {
            return true;
        } else {
            return false;
        }
    },

    addUser: async function(userHash, ethAccount, privateKey) {
        //console.log("PeerContract -> Calling smart contract addUser to insert new block");
        let instance = await this.contracts.Peershare.deployed();

        // web3.eth.accounts.sign is used to sign the hashed data with private key
        const signedHash = web3.eth.accounts.sign(userHash, privateKey);

        // Get the signature
        const signature = signedHash.signature;

        // return await instance.addUser(
        //     ethAccount, signedHash, signature,
        //     { from: ethAccount, gas: 3000000 }
        // );
        return true;
    },

    getUser: async function(ethAccount) {
        //console.log("PeerContract -> Calling smart contract getUser to check if already registered");
        let instance = await this.contracts.Peershare.deployed();
        let i = -1;
        //i = await instance.getUser(ethAccount);
        return i;
    }, 

    addCar: async function (carHash,ethAccount,privateKey) {

        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();
        console.log(carHash);
        console.log(ethAccount);
        // return await instance.addCar(carHash,web3.eth.accounts.sign('0x'+ ethereumjsAbi.soliditySHA3(
        //     ['bytes32', 'address'],
        //     [carHash, ethAccount]
        // ).toString('hex'), privateKey).signature,{ from: ethAccount, gas: 3000000 });
        return true;
    },

    rentCar: async function (carHash,ownerEthAccount,ethAccount,privateKey) {
        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();
        console.log(carHash);
        console.log(ownerEthAccount);
        // return await instance.rentCar(carHash,ownerEthAccount,web3.eth.accounts.sign('0x' + ethereumjsAbi.soliditySHA3(
        //     ['bytes32', 'address'],
        //     [carHash, ethAccount]
        // ).toString('hex'), privateKey).signature,{ from: ethAccount, gas: 3000000 });
        return true;
    },

    returnCar: async function (carHash,ownerEthAccount,ethAccount) {
        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();
        // return await instance.returnCar(carHash,
        // ownerEthAccount,
        // { 
        //     from: ethAccount,
        //     gas: 300000 
        // });
        return true;
    },

    transferMoney: async function(sender, receiver, amount){
        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();
        const tx = true //await instance.transferFrom(sender, receiver, amount);

        console.log("Transaction::",tx);

        // const receipt = await tx
        //     .send({
        //         from: signer.address,
        //         gas: 1000000,
        //         value:1000000
        //     }) 
        //     .once("transactionHash", (txhash) => {
        //         console.log(`Mining transaction ...`);
        //     });

        // // The transaction is now on chain!
        // console.log(`Mined in block ${receipt.blockNumber}`);

        // console.log(receipt);

        // await instance.getBalance(sender)
        // .then((err, balance) => {
        //     console.log(web3.utils.fromWei(balance, 'ether'));
        // });
    }
}