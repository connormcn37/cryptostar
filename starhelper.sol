pragma solidity ^0.4.19;

contract StarHelper is StarFactory {
  
  event StarNamed(uint starId, string name);

  function changeName(uint _starId, string _newName) external {
    require(msg.sender == starToOwner[_starId]);
    stars[_starId].name = _newName;
    StarNamed(_starId,_newName);
  }

  function getStarsByOwner(address _owner) external view returns(uint[]) {
    uint[] memory result = new uint[](ownerStarCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < stars.length; i++) {
      if (starToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function transferStar(uint _starId, address _newOwner, address _currentOwner) external {
    require(msg.sender == _currentOwner);
    require(starToOwner[_starId] == msg.sender);
    starToOwner[starId] = _newOwner;
  }

}
