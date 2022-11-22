const Web3 = require("web3");
// const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require("fs");
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
        let i = -1;
        i = await contract.methods.getUser(ethAccount).call();

        console.log(await i);
        return i;
    }

const getUserCount = async () => {
    //let instance = await this.contracts.Peershare.deployed();
    var count = await contract.methods.getUserCount().call();
    console.log(await count);
}

const addUser = async (userHash, ethAccount, privateKey) => {
        //console.log("PeerContract -> Calling smart contract addUser to insert new block");
        //let instance = await this.contracts.Peershare.deployed();

        // web3.eth.accounts.sign is used to sign the hashed data with private key
        const signedHash = web3.eth.accounts.sign(userHash, privateKey);

        // Get the signature
        const signature = signedHash.signature;

        const tx = await contract.methods.addUser(
            ethAccount, signedHash, signature
        ).call();
        
        await tx;
        console.log(tx);
        // const receipt = await tx
        // .send({
        //     from: signer.address,
        //     gas: await tx.estimateGas(),
        // })
        // .once("transactionHash", (txhash) => {
        //     console.log(`Mining transaction ...`);
        //     console.log(`https://goerli.etherscan.io/tx/${txhash}`);
        // });
        // //The transaction is now on chain!
        // connsole.log(`Mined in block ${receipt.blockNumber}`);
        return true;
    }

const printReceipt =  () => {

}
module.exports = {
    verifyAccount,
    getUserCount,
    getUser,
    addUser,
}

// let provider = new HDWalletProvider({
//     mnemonic:{
//         phrase: process.env.MNEMONIC
//     },
//     //privateKeys: process.env.SIGNER_PRIVATE_KEY,
//     providerOrUrl: 'https://goerli.infura.io/v3/c68b12f2513d4d8797525633ccc1ffbd',
// })

// var web3Provider = null;

// async function init() {
//     web3Provider = new Web3(provider);
// }

// const PeerContract = artifact.require("PeerContract");

// contract("PeerContract", () => {
//     it("has been deployed successfully", async () => {
//         const peershare = await PeerContract.deployed();
//         AuthenticatorAssertionResponse(peershare, "contract was not deployed");
//     });
// });

// describe("getUserCount()", () => {
//     it("returns 0", async () => {
//         const peershare = await PeerContract.deployed();
//         const expected = 0;
//         const actual = await peershare.getUserCount();
//         assert.equal(actual, expected, "return a value of 10 ether'");
//     });
// });