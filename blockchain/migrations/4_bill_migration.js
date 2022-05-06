var BillRepo = artifacts.require("./BillRepo.sol");

module.exports = function(deployer) {
	// Demo is the contract's name
  deployer.deploy(BillRepo);
};
