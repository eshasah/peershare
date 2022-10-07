const Peershare = artifacts.require('Peershare');

module.exports = function(_deployer) {
    _deployer.deploy(Peershare);
};
