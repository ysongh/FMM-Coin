const Token = artifacts.require("Token");
const FundMyMusicianToken = artifacts.require("FundMyMusicianToken");

module.exports = async function(deployer){
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(FundMyMusicianToken, token.address);
  const fundMyMusicianToken = await FundMyMusicianToken.deployed();

  await token.transfer(fundMyMusicianToken.address, '1000000000000000000000000');
};