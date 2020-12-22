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

  event TokenSold(
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

  function sellToken(uint _amount) public {
    require(token.balanceOf(msg.sender) >= _amount);
    
    uint ethAmount = _amount / rate;

    require(address(this).balance >= ethAmount);

    token.transferFrom(msg.sender, address(this), _amount);

    msg.sender.transfer(ethAmount);

    emit TokenSold(msg.sender, address(token), _amount);
  }
}