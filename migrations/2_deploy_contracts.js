const FundMyMusicianToken = artifacts.require("FundMyMusicianToken");

module.exports = function(deployer){
  const totalSupply = 1000000;
  const tokenPrice = 300000000000000;     // 0.0003 Eth
  deployer.deploy(FundMyMusicianToken, totalSupply, tokenPrice);
};