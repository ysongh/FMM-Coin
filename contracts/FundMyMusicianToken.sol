pragma solidity >=0.4.21 <0.7.0;

import "./Token.sol";

contract FundMyMusicianToken {
  Token public token;

  constructor(Token _token) public {
    token = _token;
  }
  
  // function buyToken(uint256 _numberOfTokens) public payable{
  //   require(balanceOf[admin] >= _numberOfTokens);
  //   require(admin != msg.sender);

  //   admin.transfer(msg.value);

  //   balanceOf[admin] -= _numberOfTokens;
  //   balanceOf[msg.sender] += _numberOfTokens;

  //   emit Sell(msg.sender, _numberOfTokens);
  // }

  // function likesMusician() public returns (bool success){
  //   require(balanceOf[msg.sender] > 0);

  //   balanceOf[admin] += 1;
  //   balanceOf[msg.sender] -= 1;

  //   return true;
  // }
}