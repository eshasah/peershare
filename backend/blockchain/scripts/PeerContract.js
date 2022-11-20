const Web3 = require('web3');
const fs = require('fs');
const TruffleContract = require('@truffle/contract');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const peershareArtifact = require('../build/contracts/Peershare.json');
const ethereumjsAbi = require('ethereumjs-abi');
//const myAddress = '0xc847e0982395f37650302263f5b825a6df516d29';
// const myPrivateKey = '0x50701c16dc03d77bed2c1536fac3067d89225e5fab2445c90f232225a13bc1a1';
//const network = process.env.ETHEREUM_NETWORK;
let contract = null;

module.exports = {
    web3Provider : null,
    contracts : {},
    ethereumServer: process.env.ETH_SERVER,
    signer: null,
    //initialize peershare contract
    init: function() {

        // Check if web3 has already been provided
        // if (typeof web3 !== 'undefined') {
        //     this.web3Provider = web3.currentProvider;
        // } else {
        //     this.web3Provider = new HDWalletProvider(
        //         myPrivateKey,
        //         'https://goerli.infura.io/v3/c68b12f2513d4d8797525633ccc1ffbd'
        //     );
        // }
        if (typeof web3 !== 'undefined') {
            this.web3Provider = web3.currentProvider;
        } else {
            this.web3Provider = new Web3.providers.HttpProvider(this.ethereumServer);
        }
        // Create web3 object to connect to blockchain
        web3 = new Web3(this.web3Provider);

        // Add contract
        //contract = await contract.deploy({data: peershareArtifact.bytecode}).send({from: process.env.SIGNER_ADDRESS});

        this.contracts.Peershare = TruffleContract(peershareArtifact);
        this.contracts.Peershare.setProvider(this.web3Provider);

        // Signing account with private ekey
        // this.signer = web3.eth.accounts.privateKeyToAccount(
        //     process.env.SIGNER_PRIVATE_KEY
        // );
        // web3.eth.accounts.wallet.add(signer);
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
        // let instance = await this.contracts.Peershare.deployed();

        // // web3.eth.accounts.sign is used to sign the hashed data with private key
        // const signedHash = web3.eth.accounts.sign(userHash, privateKey);

        // // Get the signature
        // const signature = signedHash.signature;

        // return await instance.addUser(
        //     ethAccount, signedHash, signature,
        //     { from: ethAccount, gas: 3000000 }
        // );
        let instance = await this.contracts.Peershare.deployed();
        
        return await instance.addUser(ethAccount,userHash,web3.eth.accounts.sign('0x'+ ethereumjsAbi.soliditySHA3(
            ['bytes32', 'address'],
            [userHash, ethAccount]
        ).toString('hex'), privateKey).signature,{ from: ethAccount, gas: 3000000 });
    },

    getUser: async function(ethAccount) {
        //console.log("PeerContract -> Calling smart contract getUser to check if already registered");
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
        // console.log(carHash);
        // console.log(ethAccount);
        return await instance.addCar(carHash,web3.eth.accounts.sign('0x'+ ethereumjsAbi.soliditySHA3(
            ['bytes32', 'address'],
            [carHash, ethAccount]
        ).toString('hex'), privateKey).signature,{ from: ethAccount, gas: 3000000 });
    },

    rentCar: async function (carHash,ownerEthAccount,ethAccount,privateKey) {

        // Deploy contract
        let instance = await this.contracts.Peershare.deployed();
        // console.log(carHash);
        // console.log(ownerEthAccount);
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

    },

    transferMoney: async function(sender, receiver, amount){
        const tx = await contract.methods.transferFrom(sender, receiver, amount);

        console.log("Transaction::",tx);

        const receipt = await tx
            .send({
                from: signer.address,
                gas: 1000000,
                value:1000000
            }) 
            .once("transactionHash", (txhash) => {
                console.log(`Mining transaction ...`);
            });

        // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);

        console.log(receipt);

        web3.eth.getBalance("sender", (err, balance) => {
            console.log(web3.utils.fromWei(balance, 'ether'));
        });
    }
}