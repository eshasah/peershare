const Web3 = require("web3");
// const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require("fs");
const ethereumAbi = require('ethereumjs-abi')
//  const artifact = require('../build/contracts/Peershare.json');
const { abi } = JSON.parse(fs.readFileSync('blockchain/build/contracts/Peershare.json'));

const web3 = new Web3(
    new Web3.providers.HttpProvider(
        `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
);

const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(signer);

const contract = new web3.eth.Contract(
    abi,
    process.env.CONTRACT_ADDRESS
);

const verifyAccount = (ethAccount, privateKey) => {
    //console.log("PeerContract -> verify account and private key");
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    if (account.address == ethAccount) {
        return true;
    } else {
        return false;
    }
}

const getUser = async (ethAccount) => {
        //console.log("PeerContract -> Calling smart contract getUser to check if already registered");
        //let instance = await this.contracts.Peershare.deployed();
        let i = await contract.methods.getUser(ethAccount).call();
        console.log("getUser of peercontracttest ->")
        console.log(await i);
        return i;
    }

const getUserCount = async () => {
    //let instance = await this.contracts.Peershare.deployed();
    var count = await contract.methods.getUserCount().call();
    console.log("getUserCount of peercontracttest ->")
    console.log(await count);
}

const addUser = async (userHash, ethAccount) => {
    console.log("addUser calling.")
    const tx = await contract.methods.addUser(
        ethAccount, userHash
    ).send({ from: process.env.SIGNER_ADDRESS, gas: 3000000 })
    .once("transaction", (txhash) =>{
        console.log('Miningtransaction....');
        console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
    
    await tx;
    console.log("addUser returned.")
    console.log('tx:', tx);
    
    return tx.transactionHash;
}

const getCarCount = async () => {
    //let instance = await this.contracts.Peershare.deployed();
    var count = await contract.methods.getCarCount().call();
    console.log("getCarCount of peercontracttest ->")
    console.log(await count);
}

const addCar = async (carHash, ethAccount) => {
    console.log("addCar calling.")
    console.log('carhash:', carHash);
    console.log('owner:', ethAccount);
    const tx = await contract.methods.addCar(
        carHash, ethAccount
    ).send({ from: process.env.SIGNER_ADDRESS, gas: 3000000 })
    .once("transaction", (txhash) =>{
        console.log('Miningtransaction....');
        console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
    
    await tx;
    console.log("addCar returned.")
    console.log(tx);
    
    return tx.transactionHash;
}

const rentCar = async (carHash, ethAccount) => {
    console.log("rentCar calling.")
    const tx = await contract.methods.rentCar(
        carHash, ethAccount
    ).send({ from: process.env.SIGNER_ADDRESS, gas: 3000000 })
    .once("transaction", (txhash) =>{
        console.log('Miningtransaction....');
        console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
    
    await tx;
    console.log("rentCar returned.")
    console.log(tx);
    
    return tx.transactionHash;
}

const returnCar = async (carHash, ethAccount) => {
    console.log("rentCar calling.")
    const tx = await contract.methods.returnCar(carHash, ethAccount)
    .send({ from: process.env.SIGNER_ADDRESS, gas: 3000000 })
    .once("transaction", (txhash) =>{
        console.log('Miningtransaction....');
        console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
    
    await tx;
    console.log("rentCar returned.")
    console.log(tx);
    
    return tx.transactionHash;
}

const transferMoney = async (sender, receiver, amount) => {
    console.log("rentCar calling.")
    const tx = await contract.methods.transferFrom(sender, receiver, amount)
    .send({ from: process.env.SIGNER_ADDRESS, gas: 3000000 })
    .once("transaction", (txhash) =>{
        console.log('Miningtransaction....');
        console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
    
    return tx;
}
const getBalance = async function(walletId){
    console.log(walletId);
    
    const balance = await contract.methods.getBalance(walletId).call();
    const inwei=web3.utils.toWei(balance);
    console.log('wei',inwei);
    return balance;
}

module.exports = {
    verifyAccount,
    getUserCount,
    getUser,
    addUser,
    addCar,
    rentCar,
    returnCar,
    transferMoney,
    getBalance,
    getCarCount
}
