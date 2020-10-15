pragma solidity >=0.4.21 <0.7.0;

contract FundMyMusicianToken {
  string public name = 'Fund My Musician Token';
  string public symbol = 'FMM';

  uint256 public totalSupply;

  mapping(address => uint256) public balanceOf;

  constructor(uint256 _initialSupply) public {
      balanceOf[msg.sender] = _initialSupply;
      totalSupply = _initialSupply;
  }
}