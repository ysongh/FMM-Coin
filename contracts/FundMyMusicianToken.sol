pragma solidity >=0.4.21 <0.7.0;

contract FundMyMusicianToken {
  string public name = 'Fund My Musician Token';
  string public symbol = 'FMM';

  uint256 public totalSupply;

  mapping(address => uint256) public balanceOf;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint _value
  );

  constructor(uint256 _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success){
    require(balanceOf[msg.sender] >= _value);

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender, _to, _value);

    return true;
  }
}