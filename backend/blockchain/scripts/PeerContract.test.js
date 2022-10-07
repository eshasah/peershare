//const { contracts } = require("./PeerContract");

const Peershare = artifacts.require('../contracts/Peershare.sol');

contract("Peershare", (accounts) => {
    before(asyn () => {
        instance = await Peershare.deployed()
    })

    it('check current users', async () => {
        let userCount = await instance.getUsersInSystem()
        assert.equal(userCount, 0, "the initial count should be zero.")
    })
})