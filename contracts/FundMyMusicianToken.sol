pragma solidity >=0.4.21 <0.7.0;

contract FundMyMusicianToken {
  string public name = 'Fund My Musician Token';
  string public symbol = 'FMM';

  uint256 public totalSupply;
  uint256 public tokenPrice;
  address payable admin;

  mapping(address => uint256) public balanceOf;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint _value
  );

  event Sell(address _buyer, uint256 _amount);

  constructor(uint256 _initialSupply, uint256 _tokenPrice) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
    tokenPrice = _tokenPrice;
    admin = msg.sender;
  }

  function transfer(address _to, uint256 _value) public returns (bool success){
    require(balanceOf[msg.sender] >= _value);
    require(_value >= 1);

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender, _to, _value);

    return true;
  }

  function buyToken(uint256 _numberOfTokens) public payable{
    require(balanceOf[admin] >= _numberOfTokens);
    require(admin != msg.sender);

    admin.transfer(msg.value);

    balanceOf[admin] -= _numberOfTokens;
    balanceOf[msg.sender] += _numberOfTokens;

    emit Sell(msg.sender, _numberOfTokens);
  }

  function likesMusician() public returns (bool success){
    require(balanceOf[msg.sender] > 0);

    balanceOf[admin] += 1;
    balanceOf[msg.sender] -= 1;

    return true;
  }
}