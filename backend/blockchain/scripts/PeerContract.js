const Web3 = require('web3');
const fs = require('fs');
const TruffleContract = require('@truffle/contract');

//const { abi } = JSON.parse(fs.readFileSync("../build/contracts/Peershare.json"))

async function main(){
    const ethNetwork = process.env.ETHEREUM_NETWORK;
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

    
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);

    console.log(receipt);

    web3.eth.getBalance("0x4d262315d1A1228CBBD8516B8DB095E226a837Df", (err, balance) => {
        console.log(web3.utils.fromWei(balance, 'ether'));
    });
}

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
            this.web3Provider = new Web3(
                new Web3.providers.HttpProvider(
                    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
                )
            );
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

        return await instance.addUser(
            ethAccount, signedHash, signature,
            { from: ethAccount, gas: 3000000 }
        );

    },

    getUser: async function(userHash, ethAccount) {
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

    },

    transferMoney: async function(){
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

        // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);

        console.log(receipt);

        web3.eth.getBalance("0x4d262315d1A1228CBBD8516B8DB095E226a837Df", (err, balance) => {
            console.log(web3.utils.fromWei(balance, 'ether'));
        });
    }
}