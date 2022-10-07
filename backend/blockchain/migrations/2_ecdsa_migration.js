const ECDSA = artifacts.require("ECDSA");

module.exports = function(deployer) {
    deployer.deploy(ECDSA);
};
