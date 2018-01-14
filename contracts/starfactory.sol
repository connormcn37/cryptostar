pragma solidity ^0.4.19;

import "./ownable.sol";

contract StarFactory is Ownable {

    //enum Race { Organic, Inorganic, Energy, Empty };

    struct Star {
        string name;
        uint latitude;
        uint longitude;
        uint minerals;
        uint troops;
    }

    //event NewStar(id, _name, _latitude, _longitude, _minerals);

    Star[] public stars;

    // mapping is like a dictionary, and address an eth address type
    mapping (uint => address) public starToOwner;
    mapping (address => uint) ownerStarCount;
    //mapping (address => Race)
    // note: external (not used here) can only be called outside the contract
    function createStar(string _name, uint _latitude, uint _longitude, uint _minerals, uint _troops) external onlyOwner {
        uint id = stars.push(Star(_name, _latitude, _longitude, _minerals, _troops));
        // msg.sender is the address of the caller
        starToOwner[id] = msg.sender;
        ownerStarCount[msg.sender]++;
        // call the event, so the listeners will get the notice of a new created star
        //NewStar(id, _name, _latitude, _longitude);
    }

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

  function transferStar(uint _starId, address _newOwner) public {
    //require(msg.sender == _currentOwner);
    require(starToOwner[_starId] == msg.sender || starToOwner[_starId] == owner);
    starToOwner[_starId] = _newOwner;
  }

  function trainTroops(uint _starId, uint _troopAmount) external {
      require(starToOwner[_starId] == msg.sender);
      require(stars[_starId].minerals >= _troopAmount);
      stars[_starId].minerals -= _troopAmount;
      stars[_starId].troops = _troopAmount;
  }

  function attackStar(uint _fromStarId, uint _toStarId){
      require(starToOwner[_fromStarId] == msg.sender);
      require(stars[_fromStarId].minerals > 0 && stars[_fromStarId].troops > 0);
      stars[_fromStarId].minerals--;
      if(stars[_fromStarId].troops > stars[_toStarId].troops){
          stars[_fromStarId].troops -= stars[_toStarId].troops;
          stars[_toStarId].troops = 0;
          transferStar(_toStarId, msg.sender);
          starToOwner[_starId] = msg.sender;
      }
  }

}
