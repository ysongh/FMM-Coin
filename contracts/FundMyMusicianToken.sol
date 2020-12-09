pragma solidity >=0.4.21 <0.7.0;

import "./Token.sol";

contract FundMyMusicianToken {
  uint public rate = 100;
  Token public token;

  event TokenBought(
    address account,
    address token,
    uint amount
  );

  constructor(Token _token) public {
    token = _token;
  }
  
  function buyToken() public payable{
    uint tokenAmount = msg.value * rate;

    require(token.balanceOf(address(this)) >= tokenAmount);

    token.transfer(msg.sender, tokenAmount);

    emit TokenBought(msg.sender, address(token), tokenAmount);
  }

  // function likesMusician() public returns (bool success){
  //   require(balanceOf[msg.sender] > 0);

  //   balanceOf[admin] += 1;
  //   balanceOf[msg.sender] -= 1;

  //   return true;
  // }
}