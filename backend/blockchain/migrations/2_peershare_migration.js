const Peershare = artifacts.require('Peershare');
const ECDSA = artifacts.require('ECDSA');
module.exports = function(_deployer) {
    _deployer.deploy(Peershare);
    _deployer.deploy(ECDSA);
};
