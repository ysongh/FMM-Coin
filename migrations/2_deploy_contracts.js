const FundMyMusicianToken = artifacts.require("FundMyMusicianToken");

module.exports = function(deployer){
  deployer.deploy(FundMyMusicianToken, 1000000);
};