// SPDX-License-Identifier: MIT

/**
    ## Disclaimer
    These contracts are not audited.  Please review this code on your own before
    using any of the following code for production.  I will not be responsible or
    liable for all loss or damage caused from this project.
*/

pragma solidity >=0.4.21 <0.7.0;

contract Token {
  string public name = 'Fund My Musician Token';
  string public symbol = 'FMM';
  uint256 public totalSupply = 1000000000000000000000000;   // 1 million tokens
  uint8 public decimals = 18;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value,
    uint date
  );

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success){
    require(balanceOf[msg.sender] >= _value);

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender, _to, _value, now);

    return true;
  }

  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);

    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(_value <= balanceOf[_from]);
    require(_value <= allowance[_from][msg.sender]);

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender] -= _value;

    emit Transfer(_from, _to, _value, now);

    return true;
  }
}
