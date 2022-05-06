var ProductRepo = artifacts.require("./ProductRepo.sol");

module.exports = function(deployer) {
  // Demo is the contract's name
  deployer.deploy(ProductRepo);
};
